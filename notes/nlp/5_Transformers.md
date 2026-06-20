# 5. Transformer Language Models (트랜스포머 언어 모델)

> **이 챕터 한 줄 요약**
> Transformer는 RNN의 순환을 **Self-Attention**으로 대체해 **병렬 처리·장기 의존성·양방향성**을 얻은, 거의 모든 LLM의 기반 아키텍처다. **QKV 어텐션 + 멀티헤드 + 위치 인코딩 + FFN + 잔차/LayerNorm**으로 구성되며, **서브워드 토큰화(BPE)**와 **사전학습(Encoder/Decoder/Encoder-Decoder)**까지 이어진다.

> 보충 강의 정리는 같은 폴더의 **`5.5 — Transformer & BERT 상세`** 노트를 함께 보세요.

---

## 1. Transformer 개요와 동기

> Transformer는 **어텐션으로 RNN의 순환 연산을 대체**한 시퀀스 모델링 아키텍처. 언어 모델링에서 가장 중요한 구조(거의 모든 LLM의 기반).

### RNN 대비 장점 — 시험 단골

| 측면 | RNN | **Transformer** |
|---|---|---|
| 토큰 처리 | 한 번에 하나(이전 토큰에 의존) | **모든 토큰 병렬 처리** |
| 장기 의존성 | 먼 토큰에 약함(기울기 소실) | **위치 무관하게 임의 토큰 직접 접근** |
| 양방향성 | 한 방향만 | **어텐션으로 본질적 양방향 가능** |

### Transformer 층 구성요소
**Self-attention + Feedforward network + Residual connection + Layer Norm**

---

## 2. Self-Attention — 챕터 핵심

> **어텐션**: 특정 단어를 처리할 때 시퀀스 내 다른 단어들의 **중요도를 가중**. "이 단어를 볼 때, 더 잘 이해하려면 어떤 다른 단어에 주목해야 하나?"
> **Self-attention**: 각 단어가 **같은 시퀀스 내** 다른 단어들에 주목.

- 예: "The quick brown fox jumps over the lazy dog"에서 "jumps"는 "fox"(주어)·"over"(전치사)에 높은 어텐션, "the"·"lazy"엔 낮게
- **중심 단어 표현 = 문맥 표현들의 가중합**: $\mathbf{a}_i = \sum_j \alpha_{ij}\mathbf{x}_j,\quad \sum_j \alpha_{ij}=1$

### 어텐션 점수 계산
$$\alpha_{ij} = \text{Softmax}(\mathbf{x}_i \cdot \mathbf{x}_j)$$
- **왜 두 벌의 표현을 쓰나?** 단어가 갖는 **다른 역할**(비교 대상인 타깃 vs 비교되는 문맥)을 반영하기 위해. 같은 벡터를 쓰면 자기 자신과의 내적이 커서 **거의 항상 자기 자신에만 주목**하게 됨

### Query, Key, Value (QKV) — 가장 중요
> 각 단어를 **세 벡터**로 표현해 토큰 간 다양한 관계를 유연하게 포착.

| 벡터 | 역할 |
|---|---|
| **Query (Q)** | 정보를 **찾는 현재 단어** |
| **Key (K)** | 쿼리와 **비교되는 참조(문맥)** |
| **Value (V)** | 각 토큰의 **실제 내용**, 최종 출력으로 집계 |

각 단어 벡터에 세 가중치 행렬을 곱해 얻는다:
$$\mathbf{q}_i = \mathbf{x}_i W_Q,\quad \mathbf{k}_i = \mathbf{x}_i W_K,\quad \mathbf{v}_i = \mathbf{x}_i W_V$$

### 전체 계산 (Scaled Dot-Product)
$$\alpha_{ij} = \text{Softmax}\!\left(\frac{\mathbf{q}_i \cdot \mathbf{k}_j}{\sqrt{d}}\right),\qquad \mathbf{a}_i = \sum_j \alpha_{ij}\mathbf{v}_j$$
- **√d로 나누는 이유**: 내적의 기대 크기가 √d에 비례 → 나눠서 softmax 입력이 **극단적으로 커지는 것 방지**(d는 q,k 차원)
- **행렬형**: $A = \text{Softmax}\!\left(\dfrac{QK^\top}{\sqrt{d}}\right)V$, where $Q=XW_Q, K=XW_K, V=XW_V$

### 병렬 계산
- 각 토큰의 self-attention 계산은 **다른 토큰과 독립** → N개 단어를 **GPU 행렬곱으로 병렬** 처리 (RNN의 순차성을 깬 핵심 이점)

### Multi-Head Self-Attention
> 각 self-attention 모듈에서 **여러 어텐션 헤드**를 사용. 각 헤드가 **다른 목적·언어적 관계**(다른 패턴)에 주목하도록 특화 → 헤드 출력들을 **연결(concat)**

### 양방향 vs. 단방향 어텐션 — 시험 포인트

| 종류 | 접근 범위 | 모델 | 용도 |
|---|---|---|---|
| **양방향(Bidirectional)** | 모든 위치가 모든 위치에 주목 | **Transformer Encoder** (BERT) | NLU(분류·NER) |
| **단방향/인과(Causal)** | 각 위치는 **이전 위치(자신 포함)만** | **Transformer Decoder** (GPT) | NLG(순차 생성) |

- 단방향은 어텐션 행렬의 **상삼각 부분을 −∞로** 마스킹해 미래를 못 보게 함

### 위치 인코딩 (Position Encoding)
> 어텐션 자체는 순서를 모름 → **위치 정보를 입력 벡터에 주입**해야 함.

| 방식 | 특징 |
|---|---|
| **절대 위치(Absolute)** | 위치마다 임베딩 학습(원조 Transformer). 학습보다 긴 시퀀스에 일반화 약함 |
| **상대 위치(Relative)** | 단어 간 **상대 거리** 인코딩 → 길이 변화에 더 강함 |
| **RoPE(Rotary)** | 위치 기반 **회전 행렬** 적용, 절대+상대 모두 반영, 긴 시퀀스에 효과적. **최신 LLM에서 널리 사용** |

---

## 3. 토큰화 (Tokenization)

> **토큰화**: 문자열을 토큰 시퀀스로 분할. 공백 기반(단어=토큰)은 **현대 LLM이 쓰지 않는다.**

### 분할 단위의 트레이드오프

| 방식 | 문제 |
|---|---|
| **단어 기반** | OOV 문제, 서브워드 정보 손실(unhappiness=un+happy+ness), 어휘 폭증·희소성 |
| **문자 기반** | OOV 없고 어휘 작지만, **시퀀스 길이 폭증**(어텐션은 길이에 **제곱 복잡도**!) + 단어 의미 손실 |
| **서브워드(Subword)** | **균형점** — 의미 있는 서브워드 포착 + OOV 대응 + 효율적 |

- 서브워드 알고리즘: **BPE**, **WordPiece**, **SentencePiece**. 보통 **token learner**(어휘 학습) + **token segmenter**(분할)로 구성

### BPE (Byte-Pair Encoding) — 핵심
> 현대 LLM에서 가장 흔한 토큰화. **문자 어휘에서 시작해 가장 빈번한 쌍을 반복 병합.**

1. **초기화**: 어휘 = 모든 문자 집합
2. **빈도 카운트**: 인접 심볼 쌍 빈도 집계
3. **쌍 병합**: 가장 빈번한 쌍 병합 (예: 't','h' → "th")
4. **코퍼스 갱신**: 병합된 쌍을 새 토큰으로 치환, 빈도 갱신
5. **반복**: 정해진 병합 횟수(또는 어휘 크기)까지

- 예: "low low … newer … new" → 가장 빈번 "er"(9회) 병합 → "er_"(9회) → "ne"(8회) … 
- **Token segmenter**: 학습한 병합 규칙을 테스트 문장에 **탐욕적으로** 적용. 미관측 "lower_"는 "low"+"er_"로 분할

---

## 4. 그 외 Transformer 모듈

### Layer Normalization
- **동기**: 학습 중 DNN 입력 분포가 변함(**internal covariate shift**) → 학습 지연
- **해법**: 입력 벡터를 **차원 방향 평균·표준편차로 정규화** 후, 학습 가능한 scale γ·shift β 적용
  $$\text{LayerNorm}(x) = \gamma \cdot \frac{x - \mu}{\sigma} + \beta$$

### FFN
- Transformer의 FFN은 **2층 네트워크**: $\text{FFN}(x_i) = \text{ReLU}(x_i W_1)W_2$
- 모든 토큰에 같은 가중치, 단 **층마다 다른 가중치**

### Residual Connection (잔차 연결)
- 서브층 출력에 원래 입력을 더함: $y = x + f(x)$
- **이점**: 기울기 소실 완화, 정보 흐름 촉진, 모델 확장 지원

### Language Model Head
- 마지막 층에 LM head 추가, 보통 **weight tying**(입력 임베딩 ↔ 출력 임베딩 공유)
- 학습: RNN LM처럼 **교차 엔트로피 손실**

---

## 5. Transformer 사전학습 (Pretraining)

> **사전학습 = 자기지도 학습**: 입력 일부를 가리고(Mask/Corrupt) 나머지로 복원. 사람 라벨 불필요. 본질적으로 **멀티태스크 학습**(문법·의미·세계지식·감성·번역·수학을 암묵 학습).

- **사전학습 + Fine-tuning**: 대규모 코퍼스로 pretext task 학습 후, 태스크 데이터(라벨/대화)로 파라미터 조정
- Transformer가 백본인 이유: **효율성(병렬)·확장성(scaling)·범용성(멀티모달)**

### 세 가지 아키텍처 — 시험 핵심

| 아키텍처 | 어텐션 | 사전학습 | 대표 | 적합 태스크 |
|---|---|---|---|---|
| **Encoder** | 양방향 | **MLM + NSP** | BERT | NLU(분류·NER) |
| **Decoder** | 단방향 | 다음 토큰 예측(표준 LM) | GPT, Llama | NLG(생성) |
| **Encoder-Decoder** | 둘 다 | 노이징 복원 / span 생성 | BART, T5 | 입력 처리 후 출력 생성 |

### Decoder 사전학습
- LLM의 주류 선택. GPT(generative pretraining)에서 도입. 표준 LM 목적:
  $$L(\theta) = -\frac{1}{N}\sum_{i=1}^{N}\log p_\theta(x_i \mid x_1, \ldots, x_{i-1})$$
- GPT-1(2018, 117M) → GPT-2(2019, 1.5B) → GPT-3(2020, 175B). Llama 시리즈(7B~405B, 멀티모달)

### Encoder 사전학습: BERT
- **MLM(Masked LM)**: 15% 단어 마스킹 후 **양방향 문맥**으로 예측
- **NSP(Next Sentence Prediction)**: 두 문장이 실제 인접인지 판별
- **Fine-tuning**: LM head를 linear layer로 교체해 태스크 데이터로 학습
- **변형**: **RoBERTa**(더 오래·큰 배치·동적 마스킹, NSP 제거), **ELECTRA**(작은 MLM generator + main discriminator 공동학습 → 샘플 효율·낮은 연산)

### Encoder-Decoder: BART / T5
- **BART**: 입력에 노이징(마스크·삭제·순열) 후 원본 복원. NLU·NLG 모두
- **T5(Text-to-Text Transfer Transformer)**: 텍스트 span 마스킹 후 생성, **모든 태스크를 seq-to-seq로** 변환

### Encoder-Decoder vs. Decoder-Only — 시험 포인트
> 현대 LLM은 대부분 **decoder-only**. 이유:
> - **단순성**: decoder-only는 모델 하나(encoder-decoder는 둘)
> - **효율성**: 생성에 더 파라미터 효율적(encoder 부분은 생성에 기여 안 함)
> - **확장성**: 모델·데이터 규모에 매우 잘 확장(대규모에서 encoder-decoder가 더 낫지 않음)

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **Self-Attention** | 같은 시퀀스 단어들에 가중 주목, 문맥 표현=가중합 |
| **QKV** | Query(찾는 단어)·Key(참조)·Value(내용) |
| **Scaled dot-product** | √d로 나눈 내적에 softmax |
| **Multi-Head** | 여러 헤드가 다른 관계에 주목, concat |
| **Position Encoding** | 절대/상대/RoPE로 위치 주입 |
| **BPE** | 빈번한 문자쌍 반복 병합(서브워드) |
| **LayerNorm / Residual** | 분포 정규화 / x+f(x)로 기울기·정보 흐름 |
| **MLM / NSP** | BERT 사전학습(마스킹 예측 / 인접 문장 판별) |
| **Encoder/Decoder/Enc-Dec** | BERT / GPT / BART·T5 |
