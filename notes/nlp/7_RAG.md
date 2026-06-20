# 7. Retrieval-Augmented Generation (RAG)

> **이 챕터 한 줄 요약**
> LLM의 **파라미터 지식(parametric knowledge)**만으로는 **환각(hallucination)**·최신성·검증가능성 문제가 있다. 외부 지식을 **검색(retrieval)**해 프롬프트에 붙여주는 **RAG**로 이를 보완해 사실성을 높인다.

---

## 1. Question Answering (QA)의 세 가지 분류축

QA는 "사람이 자연어로 던진 질문에 자동으로 답하는 시스템". 세 축으로 분류한다.

### 축 1) 도메인 범위
- **Closed-domain QA**: 특정 도메인(의료·법률·기술)에 한정. 전문 지식 학습 → 도메인 내 고정확도
- **Open-domain QA**: 모든 도메인. 웹·대형 코퍼스 등 **방대한 외부 지식** 의존. **대부분의 LLM 응용이 여기에 해당**

### 축 2) 모델링 방식
- **Extractive QA(추출형)**: 주어진 context에서 **텍스트 span을 그대로 추출**. 독해(reading comprehension)에 해당하는 **이해(NLU)** 태스크. **인코더(BERT)**로 가능
  - 예: context "human brain ~ 86 billion neurons" / Q "뉴런 수?" / A "**86 billion**"
- **Abstractive QA(생성형)**: 답을 **자기 말로 합성**(재구성·요약). **생성형 LM(GPT)** 필요
  - 예: Einstein context → A "특수상대성이론에 기여, 에너지와 질량의 관계를 규명…"

### 축 3) 외부 자료 접근 여부
- **Closed-book QA**: 외부 정보 없이 답함. 정확도는 **학습 데이터가 해당 정보를 얼마나 다뤘는지**에 좌우. (사람이 기억만으로 답하는 것과 유사)
- **Open-book QA**: 신뢰할 만한 외부 소스를 **검색(retrieval)**해 답함. (사람이 책/인터넷을 찾아보는 것과 유사)

---

## 2. 파라미터 지식 (Parametric Knowledge)

> **정의**: LLM이 **사전학습 데이터로부터 파라미터 안에 저장한 지식**. 프롬프트만으로 factoid 질문에 답하는 것(= closed-book QA)은 이 지식에만 의존한다.

### LM을 지식베이스(Knowledge Base)로 보기 — 진짜 KB와 비교

| 구분 | **LM (파라미터 지식)** | **진짜 Knowledge Base** |
|---|---|---|
| 획득(Acquisition) | 방대한 사전학습 데이터로부터 | 사람이 **수작업** 구축 |
| 접근(Access) | **자연어 프롬프트** | 특정 형식의 쿼리 |
| 갱신(Update) | 재학습/파인튜닝 | 사람이 항목 추가·수정·삭제 |
| 장점 | 자연어 처리, 미지 쿼리 일반화 | **정확·검증 가능** |
| 단점 | **틀리거나 오래된 정보**, 해석 불가 | 자연어 불가, 막대한 인력 필요 |

### FFN = 신경 메모리 (Neural Memories) — 심화 포인트
- Transformer의 **FFN은 2층 네트워크**($\text{FFN}(x_i)=\text{ReLU}(x_i W_1)W_2$)이며 **전체 파라미터의 약 2/3**를 차지
- **Key-Value 메모리 관점**: $\text{FFN}(x_i)=\text{ReLU}(x_i K)V$로 보면
  - **Key 벡터** = 입력 시퀀스에 대한 **패턴 탐지기**
  - **Value 벡터** = 출력 어휘에 대한 **분포**
- **Memory aggregation**: 활성(active) 메모리는 보통 **희소(sparse)**하며, **residual connection**이 층을 거치며 토큰 예측을 점진적으로 정제

> **핵심**: "지식이 파라미터 어디에 사는가?"에 대한 답 → 주로 **FFN**. 이 관점이 모델 지식 편집(knowledge editing) 연구의 기반.

---

## 3. 환각 (Hallucination) — 챕터 핵심 문제

> **정의**: LM이 **사실과 다르거나, 오해를 부르거나, 날조된 정보**를 그럴듯하고 설득력 있게 생성하는 현상.

### 왜 발생하나
- **제한된 지식(Limited knowledge)**: 유한한 데이터로 학습 → 학습 범위 밖 질문에 그럴듯한 오답
- **과잉일반화(Overgeneralization)**: 한 맥락의 패턴을 안 맞는 맥락에 적용
- **상식 결여(Lack of common sense)**: 인간 같은 텍스트는 만들지만 상식 추론이 부족

### 예시 (원인별)
- (제한된 지식) iPhone 15 Pro Max 질문 → 2023 이전 학습 모델이 "홀로그램 디스플레이, 양자칩, 텔레파시 UI" 같은 날조 (← **knowledge cutoff**)
- (과잉일반화) 일본어 과거형 → "동사 끝에 '-ed' 붙인다"(영어 규칙 오적용)
- (상식 결여) 스마트폰에 테니스공 몇 개? → "15~20개"

> **시험 포인트**: 환각은 **현대 LLM에서도 여전히 우려되는 문제**(예: 법률 분야의 가짜 판례 인용). "환각은 LLM의 본질적 한계로 불가피하다"는 연구도 존재.

---

## 4. 비파라미터 지식 & 정보 검색(IR)

### 비파라미터 지식 (Non-parametric Knowledge)
> **정의**: 모델 파라미터에 저장되지 않고, **필요할 때 외부에서 접근·검색하는 정보**. (예: 외부 KB/그래프, 사전학습 코퍼스, 사용자 제공 문서)

- 보통 **검색을 통해 파라미터 지식을 보강**하여 더 정확한 factoid QA에 활용
- **장점**: ① 모델 크기를 안 키우고 정보 추가 ② 지식베이스 갱신·수정 용이 ③ **해석 가능성(interpretability) 향상**

### 정보 검색 (Information Retrieval, IR)
대량의 비구조 데이터에서 쿼리에 맞는 정보 찾기. 구성요소:
- **Query**: 사용자 입력(키워드/구절)
- **Documents/corpus**: 검색 대상 데이터 집합
- **Ranking**: 관련도(키워드 매칭, 의미 유사도 등)로 결과 정렬
- 웹 검색엔진(Google, Bing)이 대표적 IR 시스템

### Sparse vs. Dense Retrieval — 핵심 비교

| 구분 | **Sparse Retrieval** | **Dense Retrieval** |
|---|---|---|
| 표현 | 희소 벡터(대부분 0) | 밀집 임베딩(신경망) |
| 예시 | **TF-IDF**, BM25 | **BERT 기반 인코딩** |
| 장점 | 단순·**해석 가능** | **의미·문맥 이해** |
| 단점 | **의미 이해 부족** | 계산 비용 큼, 해석 어려움 |

---

## 5. Sparse Retrieval: TF-IDF

> **핵심 아이디어**: 문서를 **자주 등장하면서(frequent) 변별력 있는(distinctive) 단어**로 표현한다.

- **TF (Term Frequency)**: 100번 나온 단어가 100배 중요한 건 아님 → **raw count 대신 log scale로 squash**
- **IDF (Inverse Document Frequency)**: 변별력 있는(DF 낮은) 단어 강조. **전체 문서수 N ÷ DF**를 log scale로
  - 예(셰익스피어 37문서): "Romeo"(df=1) → idf 1.57 (높음), "good"(df=37) → idf 0 (모든 문서에 있어 변별력 0)
- **검색 점수**: 문서·쿼리 벡터(둘 다 TF-IDF 가중) 간 **코사인 유사도**
  - 예: cos(q, d₁)=0.747 (관련 높음) vs cos(q, d₂)=0.078

---

## 6. Dense Retrieval

> **동기**: TF-IDF 같은 sparse는 **단어의 정확한 겹침**에만 의존, **의미 유사도**를 못 본다. → LM으로 쿼리·문서의 **밀집 분산표현**을 얻자.

- 검색용 LM은 보통 **작은 텍스트 인코더(BERT)**. 검색은 NLU 태스크이고, 인코더가 LLM보다 효율적이기 때문.

### Bi-encoder vs. Cross-encoder — 핵심 비교

| 구분 | **Bi-encoder** | **Cross-encoder** |
|---|---|---|
| 인코딩 | 쿼리·문서를 **독립적으로** 인코딩(2개 인코더) | 쿼리-문서 **쌍을 함께** 처리 |
| 점수 | 두 벡터의 **코사인 유사도** | 모델이 **직접 관련도 출력** |
| 장점 | **문서 벡터 사전계산 가능** → 대규모 검색에 적합 | **쿼리-문서 상호작용 포착** |
| 단점 | 상호작용 포착 못함 | **대규모 코퍼스에 확장 불가** |
| 용도 | 대규모 검색의 일반적 선택 | 작은 문서 집합 |

> **시험 포인트**: 대규모 = Bi-encoder(사전계산), 정밀 재랭킹 = Cross-encoder(상호작용). 실무에선 Bi-encoder로 후보를 좁히고 Cross-encoder로 재랭킹하는 조합이 흔함.

---

## 7. 검색 평가 (Evaluation of Retrieval)

각 반환 문서를 관련(relevant)/비관련으로 가정. 쿼리에 대해 시스템이 랭킹된 집합 $T$ 반환, 그중 관련은 $R$, 전체 코퍼스 내 관련 문서는 $U$.

- **Precision(정밀도)** = $|R|/|T|$ — 반환한 것 중 관련 비율
- **Recall(재현율)** = $|R|/|U|$ — 전체 관련 문서 중 반환된 비율
- **Precision/Recall @ k**: 상위 k개 기준. 관련 문서를 **상위에 랭크**하는지 반영
- **Average Precision (AP)**: 랭킹 리스트에서 **관련 문서가 검색되는 지점들의 precision 평균**
  $$AP = \frac{1}{|R|}\sum_{k=1}^{|T|}\big(\text{Precision@}k \times \mathbb{1}[d_k \text{ is relevant}]\big)$$

---

## 8. RAG for LLMs — 챕터 종착점

> **핵심**: RAG는 **LLM 생성의 사실성을 높이고 환각을 완화**하는 대표 기법. (예: ChatGPT가 시의성 있는 질문에 웹 검색을 트리거)

### RAG vs. Direct Prompting
- **Direct prompting**: LM의 **파라미터 지식만으로** 직접 답
- **RAG**: 검색기가 반환한 **관련 패시지들을 질문 앞에 붙여(prepend)** 생성

### 대표 연구
- **REALM**: RAG를 **인코더 사전학습(BERT 스타일)**에 처음 통합. 검색된 내용을 조건으로 한 **MLM loss**로 사전학습("knowledge-augmented encoder")
- **RAG (Lewis et al.)**: **텍스트 생성**을 위한 RAG를 처음 연구. **검색기(인코더 LM)와 생성기(LLM) 모두 학습**

### 잠재변수 모델 (Latent Variable Model)
검색된 문서를 **잠재변수 $z$**로 취급: 쿼리 $x$로 문서 $z$를 검색 → $z$와 $x$로 답 $y$ 생성.

| 모델 | 핵심 | 마진화(marginalization) |
|---|---|---|
| **RAG-Sequence** | **같은** 문서 하나로 **전체 시퀀스** 생성. 문서를 단일 잠재변수로 취급 | **시퀀스 수준**, top-K 근사 |
| **RAG-Token** | **토큰마다 다른** 문서 사용 가능 | **토큰마다** 수행 |

- 평가: open-domain QA 벤치마크 — Natural Questions(NQ), TriviaQA(TQA), WebQuestions(WQ), CuratedTrec(CT)

> **시험 포인트**: RAG-Sequence(문서 1개로 전 시퀀스) vs RAG-Token(토큰별 문서 가변)의 **마진화 수준 차이**를 구분할 것.

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **Parametric / Non-parametric knowledge** | 파라미터 내부 지식 / 외부 검색 지식 |
| **Hallucination** | 그럴듯하지만 틀리거나 날조된 생성 |
| **TF-IDF** | 자주+변별력 있는 단어로 문서 표현(sparse) |
| **Dense retrieval** | 신경망 임베딩 기반 의미 검색 |
| **Bi-encoder / Cross-encoder** | 독립 인코딩(사전계산) / 쌍 동시처리(상호작용) |
| **Precision / Recall / AP** | 반환 중 관련비율 / 관련 중 반환비율 / 관련지점 precision 평균 |
| **RAG** | 검색 패시지를 프롬프트에 붙여 사실성 향상 |
| **RAG-Sequence / RAG-Token** | 문서를 시퀀스 단위 / 토큰 단위로 사용 |
