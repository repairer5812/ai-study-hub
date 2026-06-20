# 1. Introduction to Language Modeling & N-gram Language Models

> **이 챕터 한 줄 요약**
> NLP의 핵심 문제는 **단어 시퀀스에 확률을 부여하는 언어 모델링(Language Modeling)**이다. 가장 고전적인 방법인 **N-gram**은 "직전 N−1개 단어"만 본다는 단순화로 확률을 추정하지만 **희소성(sparsity)** 문제를 겪고, 이를 **스무딩**으로 보완하며, **Perplexity**로 평가한다.

---

## 1. 언어 모델링이란

> **목표**: 단어 시퀀스에 확률을 부여한다.
> - **이해**: p("The cat is on the mat") ≫ p("Truck the earth on") (말이 되는 문장에 높은 확률)
> - **생성**: p(w | "The cat is on the") → "mat" (다음 단어 예측)

> **핵심 명제**: 모든 NLP 태스크는 **text-to-text(텍스트→텍스트)** 문제로 바꿀 수 있고, 따라서 **언어 모델링 문제로 환원**된다.
> - 감성분석: "The movie's closing scene is attractive; it was ___" → (good)
> - 기계번역: "'Hello world' in French is ___" → (Bonjour le monde)
> - QA: "Which city is KU located in? ___" → (Seoul)

### 확률 분해 (Probability Decomposition)
- **자기회귀 가정(Autoregressive assumption)**: 각 단어의 확률은 **이전 토큰들에만** 의존
  $$p(w_1, w_2, \ldots, w_n) = \prod_{i} p(w_i \mid w_1, \ldots, w_{i-1})$$
- 유효한 확률 분포 조건: **비음수(non-negative)** + **합이 1**(어휘 전체에 대해)

### 언어 모델 = 생성 모델
- $p(w_i \mid \ldots)$ 추정값이 있으면 **다음 토큰을 하나씩 생성**할 수 있다 (샘플링 또는 greedy)
- 언제 멈추나? → **[EOS]**(end-of-sequence) 특수 토큰을 생성하면 종료. 시작은 **[BOS]**(beginning-of-sequence)
- 모델은 어떻게 얻나? → **학습 코퍼스에서 확률 분포를 학습**(텍스트에는 풍부한 분포 통계가 담겨 있음)

### 언어 모델의 역사 (시대 구분 — 시험 포인트)

| 시기 | 모델 | 특징 |
|---|---|---|
| ~2000s 이전 | **통계적 LM** (n-gram) | 희소성, 빈약한 일반화 |
| 2000s–2018 | **단순/얕은 신경망 LM** (word2vec, RNN, CNN) | 희소성 완화·일반화 개선, 그러나 태스크별 구조 필요 |
| 2018–2022 | **(작은) 사전학습 신경망** (BERT, GPT-2, T5) | Transformer 확장성, 단 태스크별 fine-tuning 여전히 필요 |
| 2022–현재 | **범용 LLM** (ChatGPT, GPT-5…) | 단일 모델이 범용 태스크 해결사 |

---

## 2. N-gram 언어 모델

> **핵심 단순화**: 모든 이전 토큰을 추적하는 건 어렵다 → 단어 확률이 **직전 N−1개 단어에만** 의존한다고 가정(N-gram assumption).

- **Unigram (N=1)**: 이전 단어와 무관
- **Bigram (N=2)**: 직전 1개 단어에 의존
- **Trigram (N=3)**: 직전 2개 단어에 의존

예) p("The cat is on the mat")
- Bigram: p(The)·p(cat|The)·p(is|cat)·p(on|is)·p(the|on)·p(mat|the)

### N-gram 학습 = 빈도 기반 (최대우도추정, MLE)
$$p(w_i \mid w_{i-1}) = \frac{\text{count}(w_{i-1}, w_i)}{\text{count}(w_{i-1})}$$
코퍼스에서 시퀀스가 등장한 **횟수(count)**로 추정한다.

### N-gram의 근본 문제

| 모델 | 문제 |
|---|---|
| **Unigram** | 단어 간 **관계를 무시** → 시퀀스 확률 추정이 비신뢰적 |
| **Bigram 이상** | **희소성(Sparsity)**: 유효한 N-gram도 코퍼스에 안 나타나면 확률 0 |

> **핵심 트레이드오프 (N-gram Properties)**: N이 커질수록
> - (+) 더 많은 문맥 → 단어 상관관계를 더 잘 모델링
> - (−) **희소성 증가** + **파라미터 수가 지수적으로 폭증**
>
> 예) 어휘 10K → unigram 10K개, bigram (10K)²=100M개, trigram (10K)³=1T개. 문맥이 구체적일수록 그 N-gram을 데이터에서 만날 확률이 낮아진다.

---

## 3. 스무딩 (Smoothing) — 희소성 해결

> **직관**: count가 0이어도 **모든 N-gram에 0이 아닌 확률**을 보장한다. (시퀀스 확률은 곱셈이라 한 항이 0이면 전체가 0이 되므로 치명적)

| 기법 | 핵심 |
|---|---|
| **Add-one (Laplace)** | 모든 count에 1을 더함. 분모에 어휘 크기 \|V\| 보정. **단점: over-smoothing** (미관측 N-gram에 확률을 과하게 줌) |
| **Add-k** | 1 대신 분수 k(k<1)를 더함. **k는 validation set으로 선택** |
| **Interpolation (보간)** | 여러 차수 N-gram을 가중합. 저차수(덜 희소)+고차수(문맥 풍부)의 장점 결합, **가중치 합=1**, validation set으로 선택 |
| **Backoff** | 최고차 N-gram이 있으면 사용, count 0이면 **저차로 후퇴(back off)**. 할인계수 α(<1)로 저차 확률 조정 |

> **Add-one 공식 (참고)**: $p_{\text{add-1}}(w_i \mid w_{i-1}) = \dfrac{\text{count}(w_{i-1}, w_i) + 1}{\text{count}(w_{i-1}) + |V|}$

### OOV (Out-of-Vocabulary) 단어 처리
- 학습에 없던 단어는 unigram 확률이 0 → 특수 토큰 **[UNK]** 예약
- **학습 시**: 희귀 단어(빈도 임계값 이하)를 모두 [UNK]로 치환해 [UNK] 확률을 정상 단어처럼 추정
- **테스트 시**: 모르는 단어를 [UNK]로 변환해 그 확률 사용. (예: 상위 빈도 10K 단어만 어휘로, 나머지는 [UNK])

> **참고 (Validation set 복습)**: 학습 데이터에서 떼어낸 held-out 집합으로, **테스트셋을 직접 쓰지 않고** 하이퍼파라미터를 튜닝하는 "모의 테스트". 개발 사이클: 데이터 분할 → (train으로 학습 + valid로 평가)·하이퍼파라미터 튜닝 반복 → 최종 test 평가.

---

## 4. 언어 모델 평가 (Evaluation)

### 좋은 언어 모델이란
- 코퍼스의 모든 단어를 잘 예측 = **다음 단어에 높은 확률**을 부여 = **"덜 놀라는(less surprised)"** 모델

### 코퍼스 분리가 중요한 이유
- **학습 코퍼스로 평가하면 안 됨** → 오해를 부르는 높은 확률 (train-test 데이터 누수)
- **테스트 코퍼스**: 학습과 겹치지 않는 held-out, **일반화 능력** 측정. 하이퍼파라미터 튜닝에 반복 사용 금지(간접적으로 테스트셋을 학습하게 됨)
- **Validation/development 코퍼스**(선택): 테스트 전 하이퍼파라미터·설계 결정용

### Perplexity (PPL) — 핵심 지표

> **정의**: 테스트 시퀀스에 대한 **단어당 역확률(per-word inverse probability)**. 모델이 다음 단어에 대해 얼마나 **혼란스러워(confused)** 하는지를 측정.
> $$\text{PPL}(W) = p(w_1 w_2 \cdots w_N)^{-1/N}$$

- **낮을수록 좋다** (덜 놀람 = 더 좋은 모델)
- LLM 같은 일반 언어 모델 평가에도 사용 가능
- **로그 스케일 계산**: 작은 확률을 많이 곱하면 **underflow**(예: (1/10)^100 = 10⁻¹⁰⁰ → 0으로 반올림) 위험. 그래서 실무에선 **로그 확률**로 계산(수치적으로 안정, 예: log(1/10)=−2.3)

### Intrinsic vs. Extrinsic 평가 — 시험 포인트

| 구분 | 정의 | 용도 |
|---|---|---|
| **Intrinsic** (예: Perplexity) | 응용과 무관하게 **언어 모델링 품질 자체**를 직접 측정 | 개발 중 빠른 반복·특성 파악 |
| **Extrinsic** (예: accuracy) | 특정 태스크/응용에서의 성능(분류·번역 등) | 실제 응용 개선 검증에 필수 |

> 둘 다 흔히 사용되지만 **항상 양의 상관은 아니다.** SOTA LLM은 수학 추론·QA·일반지식 이해 등 extrinsic 평가로 벤치마킹된다.

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **Language Modeling** | 단어 시퀀스에 확률 부여 (NLP의 핵심 문제) |
| **Autoregressive 가정** | 각 단어는 이전 토큰들에만 의존 |
| **N-gram 가정** | 직전 N−1개 단어에만 의존 |
| **Sparsity** | 유효한 N-gram도 미관측 시 확률 0이 되는 문제 |
| **Smoothing** | 모든 N-gram에 0 아닌 확률 보장 (Add-one/k, 보간, Backoff) |
| **[UNK]** | OOV 단어용 특수 토큰 |
| **Perplexity** | 단어당 역확률, 낮을수록 좋음 (intrinsic) |
| **Intrinsic / Extrinsic** | 모델링 품질 자체 / 응용 태스크 성능 |
