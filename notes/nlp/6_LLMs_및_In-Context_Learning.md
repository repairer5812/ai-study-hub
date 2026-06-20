# 6. LLMs & In-Context Learning (대규모 언어모델과 인컨텍스트 러닝)

> **이 챕터 한 줄 요약**
> Transformer 디코더를 **방대한 데이터로 사전학습**하고 **규모를 키우면(scaling)**, 별도 파라미터 업데이트 없이 프롬프트만으로 다양한 작업을 푸는 **In-Context Learning** 능력과 **창발적 능력(Emergent Ability)**이 나타난다.

---

## 1. (복습) 사전학습 패러다임

### 왜 사전학습인가
과거 NLP는 각 downstream 태스크마다 **scratch부터 학습**했는데, 세 가지 근본 문제가 있었다.

- **데이터 부족(Data scarcity)**: 라벨링된 데이터셋 확보 비용이 큼
- **빈약한 일반화(Poor generalization)**: 특정 태스크에만 맞춰져 미지의 데이터/태스크에 약함
- **노이즈·무작위성 민감**: spurious correlation(가짜 상관관계)이나 어노테이션 오류에 휘둘림

> **핵심**: 웹에는 언어적 특징과 세계 지식이 풍부한 텍스트가 무한정 존재한다. 이 **얻기 쉬운 데이터로 먼저 학습**하면 여러 downstream 태스크에 크게 도움이 된다.

### 사전학습의 본질 = 자기지도학습(Self-Supervised Learning)
입력의 일부를 가린 뒤(Mask/Corrupt), **나머지로 가린 부분을 복원/예측**한다. → **사람의 라벨링이 필요 없다(No Human Supervision Needed).**

이것이 곧 **멀티태스크 학습**이기도 하다. 다음 단어 예측 하나만으로 문법, 어휘 의미, 세계 지식, 감성 분석, 번역, 수학까지 암묵적으로 학습된다.
- 예: "The capital of Denmark is {**Copenhagen**, London}" → 세계 지식
- 예: "3 + 8 + 4 = {15, **11**}" → 수학

### 사전학습 + 파인튜닝
- **사전학습(Pretraining)**: 대규모 코퍼스에서 pretext task로 학습
- **파인튜닝(Fine-tuning)**: 사전학습된 가중치를 태스크 데이터로 조정
- 파인튜닝 데이터 형태: 태스크별 라벨 데이터(감성분류, NER 등) 또는 **(멀티턴) 대화 데이터(= instruction tuning)**

---

## 2. (복습) Transformer 아키텍처

Transformer가 사전학습의 공통 백본인 이유:
- **효율성(Efficiency)**: 시퀀스의 모든 토큰을 동시에 처리 → 대규모 데이터 학습에 빠름
- **확장성(Scalability)**: 모델/데이터 크기를 키울수록 성능이 향상되는 scaling 특성
- **범용성(Versatility)**: 텍스트뿐 아니라 vision, audio 등 멀티모달로 확장 가능

### Encoder vs. Decoder (self-attention 방향이 핵심 차이)

| 구분 | Encoder (예: BERT) | Decoder (예: GPT, 현대 LLM) |
|---|---|---|
| Self-attention | **양방향(Bidirectional)** | **단방향(Unidirectional)** |
| 학습 방식 | Masked LM (MLM) | 다음 토큰 예측 |
| 강점 작업 | 자연어 **이해(NLU)** | 자연어 **생성(NLG)** |
| 예시 태스크 | 분류, NER, 관계추출, 감성분석 | 요약, 번역, 대화, QA |

- **Decoder 사전학습**: GPT(generative pretraining)에서 처음 도입. 표준 언어모델링(cross-entropy) 목적함수
  $$L(\theta) = -\frac{1}{N}\sum_{i=1}^{N}\log p_\theta(x_i \mid x_1, x_2, \ldots, x_{i-1})$$
- **BERT 사전학습**: **MLM**(15% 단어 마스킹 후 양방향 문맥으로 예측) + **NSP**(Next Sentence Prediction, 두 문장이 실제 인접 문장인지 판별)

> **핵심**: BERT는 NLU 태스크에서 GPT-1을 능가했다(양방향 문맥이 더 풍부한 이해를 만듦). 하지만 **현대 LLM은 거대한 모델 크기 + 막대한 사전학습 데이터로 단방향의 한계를 상쇄**하여 NLU에서도 인코더에 필적/우월하다("Can ChatGPT Understand Too?").

### GPT 시리즈의 규모 변화
- GPT-1 (2018): 12 layers, **117M**, 학습 ~1주
- GPT-2 (2019): 48 layers, **1.5B**, 학습 ~1개월
- GPT-3 (2020): 96 layers, **175B**, 학습 수개월

---

## 3. 프롬프팅과 파라미터 효율적 파인튜닝(PEFT)

### 프롬프팅(Prompting)
- **Prompt**: 모델에게 주는 초기 입력/지시문. 텍스트 생성을 유도
- **Prompting**: 파인튜닝 없이 학습된 LM을 그대로 써서 생성. (단, 좋은 성능을 내려면 후속 강의의 **instruction tuning**이 필요)

### 프롬프트 엔지니어링 → 프롬프트 튜닝
- **Prompt Engineering**: 원하는 출력을 얻도록 프롬프트를 설계·개선. 특히 **작은 모델은 프롬프트 형식에 민감** → 같은 태스크라도 프롬프트에 따라 성능이 크게 다름
- **Prompt Tuning**: 수동 설계 대신 **프롬프트 토큰을 학습 가능한 파라미터("soft prompts")로** 취급. LM은 **freeze**하고 소수의 프롬프트 임베딩만 최적화 → **PEFT의 일종**

### PEFT의 핵심 동기
전체 파라미터 파인튜닝은 비싸다. 가중치 업데이트는 $W^* = W_0 + \Delta W$로 표현되는데, **소수의 파라미터만 업데이트**할 수 없을까?

### LoRA (Low-Rank Adaptation) — 가장 중요
- **가정**: 파라미터 업데이트는 **low-rank**다.
  - *Overparameterization*: LLM은 데이터를 맞추는 데 필요한 것보다 훨씬 많은 파라미터를 가짐
  - *경험적 관찰*: 실제 신경망의 업데이트는 low-rank 경향
- **해법**: 가중치 업데이트를 **저차원 분해(low-rank factorization)**로 근사
  $$\Delta W \approx BA,\quad B \in \mathbb{R}^{d\times r},\ A \in \mathbb{R}^{r\times d},\ r \ll d$$
- 사전학습 가중치는 **freeze**, 작은 $A, B$만 학습
- **최신 동향**: LoRA는 프런티어 LLM의 post-training(예: 강화학습)에도 효과적

> **시험 포인트**: PEFT 계열 = Prompt Tuning, Prefix-Tuning, **LoRA**. 공통 아이디어는 "대형 모델은 freeze, 소수 파라미터만 학습".

---

## 4. LLM을 이용한 텍스트 생성 (디코딩 전략)

### LLM의 정의 (2026 관점)
"large"의 기준은 계속 변해왔다(2018 BERT-large 340M → 2019 GPT-2 1.5B → 2020 GPT-3 175B). 일반적 정의:
- **Transformer-decoder** 구조(또는 변형)로 텍스트 생성
- 방대하고 다양한 **일반 도메인 코퍼스로 사전학습**
- **최소 수십억(billions) 파라미터**
- 광범위한 NLP 태스크의 **범용 해결사(general-purpose solver)**

### 디코딩(Decoding)
Transformer 표현을 자연어 토큰으로 변환. **자기회귀적(autoregressive)**으로 [EOS] 토큰이 나올 때까지 출력 분포에서 반복 샘플링.

| 전략 | 핵심 아이디어 | 장점 | 단점 |
|---|---|---|---|
| **Greedy** | 매 스텝 최고 확률 토큰 선택 | 단순·결정적·효율적 | 전역 최적 아님, 다양성 없음 |
| **Top-k 샘플링** | 상위 k개 토큰 중에서만 샘플링(k≈5~10) | 저확률 토큰 회피 | 분포 모양 무시 (k=1이면 greedy) |
| **Nucleus(Top-p)** | 누적 확률 p(≈0.9)까지의 최소 토큰 집합에서 샘플링 | **분포 모양에 적응** | — |
| **Temperature** | 온도 τ로 분포를 재조정 | 다양성 조절 | τ→0이면 greedy |

> **Top-p가 Top-k보다 나은 이유**: Top-k는 분포 모양을 무시한다. "the 46th US president Joe" 뒤(거의 확정적)에는 토큰을 과하게 고려하고, "the spacecraft" 뒤(다양)에는 너무 적게 고려한다. **Top-p는 확률 질량 기준이라 상황에 맞게 후보 수가 변한다.**

> **실무 가이드**: 단순·효율 + 다양성 불필요 → **greedy**. 같은 입력에 여러 응답 필요 → **샘플링**(보통 Top-p > Top-k, temperature 흔히 사용, Top-p + temperature 병용 가능).

---

## 5. In-Context Learning (ICL) — 챕터 핵심

> **정의**: 프롬프트 안에 **입력-출력 예시 몇 개(few-shot)**를 주면, 모델이 그 예시로부터 **새 입력의 출력을 추론**한다. **파라미터 업데이트가 전혀 없다.** GPT-3 논문에서 처음 연구됨.

### 왜 중요한가 (데모로 보는 직관)
- "pothyn의 두 번째와 끝에서 두 번째 글자 바꾸기" → **프롬프트만 주면 틀림**. 그러나 `tarehd -> thread, revir -> river, pothyn ->` 처럼 **예시를 주면 맞힘**
- "strawberry의 'r' 개수" → **그냥 물으면 틀림**. 그러나 `"red":1, "roar":2, "strawberry":` 처럼 **예시를 주면 맞힘**

> **핵심**: ICL은 few-shot 학습의 한 형태로, **모델을 재학습하지 않고도** 예시만으로 새 패턴을 즉석에서 학습하게 만든다. (참고: ICL을 암묵적 베이즈 추론으로 해석하는 연구 등 존재)

---

## 6. LLM 스케일업 (Scaling)

### 무엇을 키우나
- **사전학습 데이터**: 예) The Pile (22개 서브셋, >800GB)
- **모델 크기**: GPT-1(0.1B) → GPT-3(175B)

### 창발적 능력(Emergent Ability) — 시험 단골
> **정의**: 명시적으로 학습하지 않았는데 **모델 용량이 커지면서 갑자기 나타나는 능력**.

- **핵심 특징**: 모델 크기가 **특정 임계치(threshold)**를 넘어야 비로소 두드러진다. → **작은 모델의 성능으로는 예측 불가**
- 실험 세팅: few-shot ICL에서, 특정 규모까지는 **무작위 수준 성능**이다가 그 이후 무작위보다 한참 위로 급상승하면 "emergent"로 간주
- 테스트 능력 예: 산술(덧·뺄·곱), 음역(transliteration), 글자 순서 복원, 페르시아어 QA, 진실한 QA, 다중태스크 이해(수학·역사·법) 등

### 스케일링 법칙(Scaling Laws) — 시험 단골
> **핵심**: 사전학습 LLM의 성능은 주로 **3가지 요소**가 결정하며, 각각과 **거듭제곱(power-law) 관계**를 갖는다(나머지 둘에 병목이 없을 때).

세 요소:
1. **모델 크기(N)**: 파라미터 수
2. **데이터셋 크기(D)**: 학습 토큰 수
3. **컴퓨트(C)**: 학습에 쓴 FLOPs

각 요소에 대한 손실(cross-entropy)의 power-law (상수는 참고용):
- $L(N) = (N_c/N)^{\alpha_N},\quad \alpha_N \approx 0.076$ — 성능은 **규모에 강하게**, 모델 모양(깊이 vs 너비)에는 약하게 의존
- $L(D) = (D_c/D)^{\alpha_D},\quad \alpha_D \approx 0.095$
- $L(C) = (C_c/C)^{\alpha_C},\quad \alpha_C \approx 0.050$

**최적 모델 크기**: 고정된 컴퓨트 $C$에서 손실을 최소화하는 $N(C)$는 power-law로 적합 가능: $N(C_{min}) \propto (C_{min})^{0.73}$. → 모델 크기가 최적이 아니면 추가 컴퓨트가 낭비된다.

> **참고 토론**: "창발적 능력은 신기루(mirage)인가?"라는 반론 논문도 있음(평가 지표 선택의 문제일 수 있다는 시각).

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **Self-supervised learning** | 입력 일부를 가리고 나머지로 복원 → 라벨 불필요 |
| **MLM / NSP** | BERT 사전학습: 마스킹 단어 예측 / 인접 문장 판별 |
| **PEFT** | 대형 모델 freeze, 소수 파라미터만 학습 |
| **LoRA** | 가중치 업데이트를 저차원 분해 $\Delta W \approx BA$로 근사 |
| **Greedy / Top-k / Top-p / Temperature** | 디코딩 전략. Top-p는 분포 모양에 적응 |
| **In-Context Learning** | 프롬프트 내 예시로 추론, 파라미터 업데이트 없음 |
| **Emergent Ability** | 규모 임계치 초과 시 갑자기 나타나는 능력 |
| **Scaling Laws** | 성능 ∝ (모델·데이터·컴퓨트)의 power-law |
