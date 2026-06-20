# 3. Word Embeddings (워드 임베딩)

> **이 챕터 한 줄 요약**
> 희소하고 긴 count 기반 벡터 대신, **분포 가설(Distributional Hypothesis)**에 기반해 **밀집(dense) 벡터**를 학습한다. 대표 방법 **Word2Vec(Skip-gram)**은 "중심 단어로 문맥 단어를 예측"하는 **자기지도 학습**으로 임베딩을 얻고, **negative sampling**으로 효율화한다.

> 보충 강의 정리는 같은 폴더의 **`3.5 — Word2Vec 상세`** 노트를 함께 보세요.

---

## 1. Sparse vs. Dense 벡터

### Count 기반(Sparse) 벡터의 한계
- **희소(sparse)**: 0이 대부분 → 0 값은 의미를 못 담음
- **김(long)**: 차원 = 어휘 크기(보통 >10K) → **차원의 저주(curse of dimensionality)**: 고차원에서 코사인 등 지표가 덜 유의미

### Dense(밀집) 벡터 = 분산 표현(Distributed Representation)
- 대부분 차원이 **0이 아닌 실수**(양수/음수), 차원이 훨씬 작음(≪10K)
- **분산 표현**: 정보가 여러 차원에 **분산** 저장, 각 차원이 여러 정보에 기여. (한 뉴런이 한 개념을 담는 게 아니라 네트워크 전체에 분산되는 뇌와 유사)
  - 예: 한 차원이 동물 vs 차량 구분에 부분 기여, 다른 차원이 크기/격식 등에 부분 기여 → **함께 모여 풍부한 표현**

| 구분 | Sparse (count) | Dense (embedding) |
|---|---|---|
| 차원 | 어휘 크기(>10K) | 작음(100~300) |
| 값 | 대부분 0 | 대부분 비-0 실수 |
| 장점 | 해석 가능 | **압축성·강건성·확장성·일반화** |
| 단점 | 희소·고차원 | **해석 어려움**(차원별 의미 불명확) |

---

## 2. 분포 가설과 워드 임베딩

> **분포 가설(Distributional Hypothesis)**: **비슷한 문맥에 등장하는 단어는 비슷한 의미를 갖는다.** "단어의 의미는 그 단어가 어울리는 무리(its company)로 정의된다."

- 예: "Ong choy"의 뜻을 몰라도 "delicious sautéed with garlic", "superb over rice", "leaves with salty sauces" 같은 문맥을 보면 → spinach/chard/collard greens와 같은 문맥 → **Ong choy = water spinach(공심채)!**

> **워드 임베딩의 일반 아이디어**: 분포 가설에 따라 밀집 벡터를 학습. 비슷한 문맥의 단어는 비슷한 벡터를 갖는다. **Embedding = 한 공간(어휘)의 원소를 다른 공간(벡터)으로 매핑.**

### 학습 방식 = 예측 태스크 (자기지도)
- 큰 코퍼스에서 **중심 단어 임베딩으로 그 문맥을 예측**하도록 학습
- 직관: 두 단어가 비슷한 임베딩 → 비슷한 문맥 예측 → 의미적으로 유사
- **자기지도 학습(Self-Supervised)**: 사람 라벨 없이, 데이터 구조 자체로 지도 신호 생성. 입력 "Ong choy is superb over rice"에서 일부로 나머지를 예측
- 워드 임베딩은 RNN·Transformer 등 언어 모델의 **입력 특징(feature)**으로 흔히 사용

---

## 3. Word2Vec 학습 (Skip-gram) — 챕터 핵심

> **Word2Vec**: 가장 초기·유명한 임베딩 학습법(2013). 두 변형 — **Skip-gram**과 **CBOW**. 본 강의는 Skip-gram 중심.

### 세팅
- 입력: 코퍼스 D (클수록 좋음)
- 학습 데이터: **(중심단어 w, 문맥단어 c) 쌍**. 문맥 = 지역 윈도우(±l 단어) 내 이웃 단어
- 파라미터: $\theta = \{\mathbf{v}_w, \mathbf{v}_c\}$ — 각 단어가 **두 벡터**(중심단어용·문맥단어용). 최종 임베딩은 보통 **중심단어 벡터** 사용
- 저장 파라미터 수: $d \times |V|$ (d=임베딩 차원 100~300, |V|=어휘)

### 학습 데이터 예시 ("there is a cat on the mat", 윈도우=2)
- (cat, is), (cat, a), (cat, on), (cat, the) … 중심단어 cat의 ±2 이웃
- **"Skip-gram" = 일부 문맥을 건너뛰며 예측**. 데이터는 **raw 코퍼스에서 전부 자동 도출**(사람 라벨 없음)

### 목적함수
중심 단어 w로 문맥 c를 예측할 확률을 최대화:
$$\max_{\theta} \prod_{(w,c)\in D} p(c \mid w)$$

- 로그 확률(logit)을 **벡터 내적에 비례**한다고 가정: $\log p(c\mid w) \propto \mathbf{v}_w \cdot \mathbf{v}_c$
  - 왜 코사인이 아닌 내적? 코사인은 비선형이라 최적화가 더 복잡(내적이 단순)
- **Softmax**로 확률 분포화:
  $$p(c \mid w) = \frac{\exp(\mathbf{v}_w \cdot \mathbf{v}_c)}{\sum_{c' \in V} \exp(\mathbf{v}_w \cdot \mathbf{v}_{c'})}$$

### Negative Sampling — 핵심 효율화
> **문제**: softmax 분모가 **어휘 전체에 대한 합** → 매우 비쌈.

- 어휘에서 **소수의 negative(랜덤) 단어**를 샘플링해 negative set N 구성
- 샘플링 분포: **power-smoothed unigram 분포** (희귀 단어에 약간의 부스트)
- 목적을 **이진 분류**로 재정식화: (w, c)가 진짜 문맥 쌍인지 예측 (sigmoid σ 사용)
  - **진짜 쌍은 확률 최대화, negative 쌍은 최소화**

### 최적화: SGD
- 파라미터를 랜덤 d차원 벡터로 초기화 → 각 스텝에서 **목적함수 그래디언트 방향**으로 업데이트(학습률 η만큼)

### 하이퍼파라미터 — 시험 포인트

| 하이퍼파라미터 | 범위 | 효과 |
|---|---|---|
| 임베딩 차원 d | 100~300 | 클수록 풍부하나 과도하면 비효율·차원의 저주 |
| 윈도우 크기 l | 5~10 | **작으면 통사(syntactic), 크면 의미/주제(semantic)** 정보 |
| Negative 수 k | 5~10 | 클수록 안정적이나 비쌈 |
| 학습률 η | 0.02~0.05 | — |

---

## 4. 임베딩 속성 & 평가

### Intrinsic 평가
- **단어 유사도(Word Similarity)**: 임베딩 간 코사인 유사도가 **사람 판단과 얼마나 상관**되는지. 데이터셋 예: **WordSim353**(353쌍). 지표: **Spearman 순위 상관**(두 순위 변수의 상관)
- **단어 유추(Word Analogy)**: 임베딩이 의미·통사 유추를 반영. **man : woman :: king : ?** → queen. a:b::c:? 를 만족하는 단어를 코사인 유사도 최대화로 탐색. 지표: **정확도(accuracy)**

> **핵심**: $\mathbf{v}_{king} - \mathbf{v}_{man} + \mathbf{v}_{woman} \approx \mathbf{v}_{queen}$ 같은 선형 구조가 임베딩 공간에 나타난다.

### Extrinsic 평가
- 임베딩을 태스크별 NLP 모델의 **입력 특징**으로 사용
- 예1) **텍스트 분류**(주제/감성): 워드 임베딩 위에 시퀀스 모델 → 문장/문서 임베딩, 지표 accuracy
- 예2) **NER(개체명 인식)**: 인명·기관·장소 등 개체 추출, 임베딩 연결로 span 표현, 지표 Precision/Recall/F1

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **Distributional Hypothesis** | 비슷한 문맥의 단어는 비슷한 의미 |
| **Dense / Distributed representation** | 작은 차원, 정보가 여러 차원에 분산 |
| **Word2Vec / Skip-gram** | 중심단어로 문맥 예측해 임베딩 학습 |
| **Negative Sampling** | 소수 랜덤 단어로 이진분류, softmax 합 회피 |
| **자기지도 학습** | 사람 라벨 없이 데이터 구조로 지도 신호 생성 |
| **Word Analogy** | king−man+woman≈queen 선형 유추 |
| **Spearman 상관** | 임베딩 유사도 평가(순위 상관) |
