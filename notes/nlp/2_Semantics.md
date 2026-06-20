# 2. Word Senses & Semantics (단어 의미와 의미론)

> **이 챕터 한 줄 요약**
> 단어의 **의미(semantics)**는 다면적이고 복잡하다(다의어, 다양한 관계). 초기 NLP는 수작업 사전 **WordNet**으로 이를 다뤘고, 이후 **벡터 공간 모델**로 단어를 벡터화해 **공기(co-occurrence) 통계 + TF-IDF/PMI 가중**으로 의미 유사도를 계산했다.

---

## 1. 왜 단어 의미를 다루나

> N-gram의 희소성 문제를 떠올려보자. count 기반 측정은 **단어 의미를 반영하지 못한다.** 만약 "cat"이 "dog"과 의미적으로 유사함을 안다면, 미관측 bigram도 더 잘 추정할 수 있다. → **의미 이해는 더 좋은 언어 모델을 만든다.**

### 단어 의미 관계 (Lexical Semantics) — 시험 단골

| 관계 | 정의 | 예시 |
|---|---|---|
| **동의어(Synonym)** | 비슷한 의미 | happy & joyful |
| **반의어(Antonym)** | 반대 의미 | hot & cold |
| **하의어/상의어(Hyponym/Hypernym)** | 구체 ↔ 일반(포함 관계) | rose는 flower의 하의어 / flower는 상의어 |
| **다의어(Polysemy)** | 한 단어가 여러 관련 의미 | mouse(쥐 / 마우스) |

- **Lemma(표제어)**: 단어의 기본형. run/runs/ran/running → 표제어 "run", better/best → "good". **Lemmatization**(표제어화)은 초기 NLP의 중요 전처리. 현대 LLM은 **tokenization**으로 어느 정도 대체.

### 관계의 세부 구분
- **동의어**: 완벽한 동의어는 매우 드물다 (정중함·함축·문체 차이). "child"(격식) vs "kid"(비격식), "big sister"는 되지만 "large sister"는 안 됨
- **반의어**: ① 정도 반의어(gradable, hot↔cold) ② 상보 반의어(complementary, alive↔dead, 하나가 다른 하나를 배제) ③ 관계 반의어(relational, teacher↔student, buyer↔seller)
- **하의어/상의어**: 보통 **이행적(transitive)**. car/bicycle/airplane은 vehicle의 하의어
- **다의어 & Sense(어의)**: sense는 특정 문맥에서의 의미. **단어 관계는 단어가 아니라 어의(sense) 사이에 정의됨**

### 어의 중의성 해소 (Word Sense Disambiguation, WSD)
- **정의**: 특정 문맥에서 단어가 어떤 sense로 쓰였는지 결정
  - "She went to the **bank** to deposit money" (은행) vs "She lives by the river **bank**" (강둑)
- 문맥이 짧거나 부족하면 어렵다 ("mouse info" → 애완동물? 도구?). 강력한 멀티모달 LLM에게도 도전적인 테스트 케이스

### 의미 유사도·관련성·함축
- **Word similarity**: 완벽한 동의어는 적어도 "유사한" 단어는 많다(cat-dog). 0~10 척도로 사람이 주석 → 다음 장 **워드 임베딩**으로 자동 학습
- **Relatedness(관련성) & Semantic field(의미장)**: 유사성 외의 관계. 기능적(doctor-hospital), 주제적(bread-butter), 개념적(teacher-chalkboard). 의미장 = 한 의미 영역을 덮는 단어 집합(병원: surgeon, nurse, scalpel…)
- **Connotation(함축)**: 문자적 의미를 넘는 주관적·감정적 연상. 3차원으로 표현 — **Valence**(쾌-불쾌), **Arousal**(감정 강도), **Dominance**(통제 정도). → **단어를 다차원 벡터로 표현한 최초의 연구**

---

## 2. 고전적 단어 표현: WordNet

> **WordNet**: 수작업으로 구축한 대규모 어휘 데이터베이스.

- 명사/동사/형용사·부사 **3개의 별도 DB**
- 각 DB는 표제어(lemma) 집합, 각 표제어는 여러 sense로 주석
- **Synset(synonym set)**: 한 sense에 대한 근접 동의어 집합
- 단어 관계(상의어·하의어·반의어)는 **synset 사이에** 정의 → 그래프 구조
- **WSD 활용**: 모든 단어를 WordNet sense로 매핑. 강력한 baseline = **첫 번째(가장 빈번한) sense로 매핑**

### WordNet의 한계 — 시험 포인트
- 구축·유지에 **막대한 인력** → 빠르게 변하는 언어를 따라가기 어려움
- 도메인 특화 용어(의료·법률·기술)·저자원 언어 커버리지 부족
- **개별 단어**만 지원(관용구·구동사·연어 미지원)
- → **더 자동적이고 확장 가능하며 문맥적인 의미 학습**이 필요!

---

## 3. 벡터 공간 모델 (Vector Space Model)

> **핵심 아이디어**: 단어를 **다차원 의미 공간의 한 점(벡터)**으로 표현. 바람직한 공간 = **의미가 비슷한 단어가 공간상 가까이** 위치.

### 벡터 기초
- **내적(dot product)**: $\mathbf{a}\cdot\mathbf{b} = \sum_i a_i b_i$
- **노름(length/norm)**: $\|\mathbf{a}\| = \sqrt{\sum_i a_i^2}$
- **코사인 유사도**: $\cos(\mathbf{a},\mathbf{b}) = \dfrac{\mathbf{a}\cdot\mathbf{b}}{\|\mathbf{a}\|\,\|\mathbf{b}\|}$
  - **가장 흔히 쓰이는 유사도 지표**: 대칭적, **벡터 길이에 영향받지 않음**, 정규화된 범위 [−1, 1], 기하학적 직관

### 단어를 벡터로 — 표현 방법의 발전
1. **One-hot 벡터**: 단어를 인덱스로. 한 차원만 1, 나머지 0. 각 단어가 고유 차원. (의미 정보 없음)
2. **Term-Document 행렬**: 문서별 단어 빈도. 셰익스피어 4개 희곡에서 battle/good/fool/wit 빈도 → 문서 벡터. 코미디 d₁, d₂는 fool·wit이 많음 → **빈도가 문서 의미 유사도를 반영**. 역으로 단어를 "등장하는 문서들"로 표현 가능(거친 문맥)
3. **Word-Word 행렬 (공기 행렬)**: 문서 대신 **단어를 문맥으로**. 중심 단어 주변 ±4 단어 윈도우에서 공기 횟수 카운트. "digital"·"information"은 둘 다 "computer"·"data"와 자주 공기 → 의미 유사. **문제: 희소성**

### Raw 빈도의 문제와 가중치 — 핵심
> Raw 빈도는 좋은 표현이 아니다. 높은 빈도가 유사성을 시사하기도 하지만, **the·good처럼 보편적으로 빈번한 단어**가 문제. → 변별력 있는 고빈도 단어를 강조하도록 **재가중(reweight)**이 필요.

#### TF-IDF
- **TF (Term Frequency)**: 100번 나온 단어가 100배 중요한 건 아님 → **log 스케일로 squash**
- **DF (Document Frequency)**: 단어가 등장한 **문서 수**. (전체 등장 횟수인 collection frequency와 다름! 예: Romeo는 collection 113이지만 DF=1)
- **IDF (Inverse DF)**: 변별력 있는(DF 낮은) 단어 강조. $\text{idf} = \log(N/\text{df})$. (Romeo idf 1.57 높음, good idf 0)
- **TF-IDF 가중값** = 문서 내 단어의 **"중요도(salience)"** 를 특징화

#### PMI (Pointwise Mutual Information)
> **직관**: 두 단어의 연관성은 **우연히 기대되는 것보다 얼마나 더 자주 함께 등장하는가**로 측정.

- 독립이면 $p(A,B)=p(A)p(B)$. 우연보다 자주 공기하면 연관 있음
- $$\text{PMI}(w, c) = \log \frac{p(w, c)}{p(w)\,p(c)}$$
  - PMI = 0: 우연 수준(연관 없음) / PMI > 0: 우연보다 자주(강한 연관) / PMI < 0: 우연보다 드묾(부정 연관, 실용성 낮음)
- **PPMI (Positive PMI)**: 음수 PMI를 모두 0으로 대체
- **문제**: 희귀 사건에 편향(희귀 단어가 매우 높은 PMI) → **Power smoothing**(확률을 α=0.75 제곱으로 부스트) 또는 **Add-k smoothing**으로 완화

#### TF-IDF vs. PMI — 시험 포인트

| 구분 | **TF-IDF** | **PMI** |
|---|---|---|
| 측정 대상 | 문서 내 단어의 **중요도**(코퍼스 대비) | 두 단어의 **연관 강도** |
| 문맥 단위 | **문서 레벨** | **단어 쌍**(보통 지역 윈도우) |
| 근거 | 휴리스틱 | 확률(독립 가정) |
| 높은 값의 의미 | 한 문서엔 빈번하나 코퍼스 전반엔 드묾 | 우연보다 훨씬 자주 공기 |

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **Lemma / Lemmatization** | 단어 기본형 / 기본형으로 환원 |
| **Synonym/Antonym/Hyponym/Hypernym** | 동의/반의/하의/상의어 |
| **Polysemy / Sense / WSD** | 다의어 / 어의 / 어의 중의성 해소 |
| **Connotation** | 함축. Valence·Arousal·Dominance 3차원 |
| **WordNet** | 수작업 어휘 DB, synset 그래프 |
| **Cosine similarity** | 벡터 유사도 표준 지표, 길이 무관 |
| **Term-Document / Word-Word 행렬** | 공기 통계 기반 단어/문서 벡터 |
| **TF-IDF** | 문서 내 단어 중요도(휴리스틱) |
| **PMI / PPMI** | 단어 쌍 연관 강도(확률 기반) / 음수 0 처리 |
