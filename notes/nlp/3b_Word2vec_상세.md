# 3.5 (보충) Word2Vec 상세 — 공기 행렬부터 Negative Sampling까지

> **이 보충 노트의 목적**
> 3장 임베딩의 Word2Vec를 **수식 흐름 위주로 더 깊게** 본다. 핵심: ① 공기 행렬 → 밀집 임베딩으로 가는 **두 접근(SVD vs Skip-gram)**과 그 **수학적 등가성**, ② Skip-gram 목적함수를 **softmax → sigmoid(negative sampling)**로 근사하는 과정, ③ gradient descent 알고리즘.

---

## 1. 워드 임베딩 = 임베딩 테이블

- 워드 임베딩 = **각 행이 한 단어의 밀집 벡터**인 행렬 (크기: 어휘 |V| × 임베딩 차원 d)
- 어휘 공간 → 벡터 공간으로의 **매핑(embedding table)**

## 2. 단어-단어 공기 정보 구성

- 윈도우 크기 = 타깃 단어 좌우 문맥 단어의 최대 수
- 예("Taylor releases a new pop album…", 윈도우=2): (Taylor, releases), (Taylor, a), (releases, Taylor), (releases, a), (releases, new) …
- 이를 **V × V 공기 행렬**로 집계. 각 원소 = 행 단어와 열 단어가 윈도우 내 함께 등장한 횟수
- 이 행 벡터는 분포 가설을 반영하지만 **희소하고 너무 고차원** → 밀집화 필요

## 3. 밀집 임베딩을 얻는 두 접근 — 시험 포인트

> **핵심**: 두 접근은 **수학적으로 등가**임이 알려져 있다(Levy & Goldberg, *Neural Word Embedding as Implicit Matrix Factorization*, NeurIPS 2014).

| 접근 | 방법 |
|---|---|
| **① 차원 축소** | 공기 행렬을 정규화 후 **Truncated SVD**로 차원 축소. 각 행(선택적으로 특이값 스케일)이 임베딩 |
| **② Skip-gram 학습** | 행렬 분해 대신 **(단어, 문맥) 쌍에서 직접 학습**. 타깃 단어로 문맥 단어를 예측. → Word2Vec |

---

## 4. Skip-gram 목적함수 유도

### 4.1 기본 목적
$$\max_{\theta} \prod_{(w,c)\in \mathcal{D}} p_\theta(c \mid w)$$
- D = 전체 공기 쌍 집합, θ = 학습할 임베딩 $\{\mathbf{v}_w, \mathbf{v}_c\}$
- 각 단어는 **두 벡터**: 중심단어 역할용 + 문맥단어 역할용 (Word2Vec의 두 임베딩 철학)
- 로그 확률 ∝ 내적: $\log p(c\mid w) \propto \mathbf{v}_w \cdot \mathbf{v}_c$

### 4.2 Softmax로 분포화
$$p_\theta(c \mid w) = \frac{\exp(\mathbf{v}_w \cdot \mathbf{v}_c)}{\sum_{c' \in V} \exp(\mathbf{v}_w \cdot \mathbf{v}_{c'})}$$
- 분모는 **어휘 전체에 대한 정규화** → 유효 확률분포를 만들지만 **계산이 비쌈**
- (참고) Softmax: $\text{softmax}(x_i) = \dfrac{\exp x_i}{\sum_j \exp x_j}$, 합 1

### 4.3 음의 로그 손실 (최소화 형태)
$$\min_{\theta} \mathcal{L}(\theta) = -\sum_{(w,c)\in\mathcal{D}} \log p_\theta(c \mid w)$$
- (Taylor, release) 같은 **양성 쌍은 내적 최대화**, zebra/panda 같은 **음성 쌍은 내적 최소화**

---

## 5. Gradient Descent (배경)

> 목적함수 $\mathcal{L}(\theta)$를 최소화하는 반복 최적화. 현재 θ에서 그래디언트를 구해 **음의 그래디언트 방향으로 작은 한 걸음**, 반복.

```
알고리즘
  θ 랜덤 초기화
  수렴할 때까지 반복:
      θ ← θ − η ∇_θ L(θ)
```
- θ: 학습 파라미터, η: step size(학습률, 하이퍼파라미터)
- $\nabla_\theta \mathcal{L}(\theta)$는 **손실을 가장 크게 증가**시키는 방향 → 그 반대로 이동

---

## 6. Negative Sampling — softmax를 sigmoid로 근사

> **동기**: softmax 분모의 **어휘 전체 합이 비싸다.** → 소수의 negative 단어만 샘플링해 업데이트.

### 6.1 이진 분류로 재정식화
- (w, c)가 **진짜 쌍인지** 예측하는 이진 분류. **sigmoid** 사용:
  $$p_\theta(\text{True} \mid c, w) = \sigma(\mathbf{v}_w \cdot \mathbf{v}_c) = \frac{1}{1 + \exp(-\mathbf{v}_w \cdot \mathbf{v}_c)}$$
  $$p_\theta(\text{False} \mid c, w) = 1 - \sigma(\mathbf{v}_w \cdot \mathbf{v}_c) = \sigma(-\mathbf{v}_w \cdot \mathbf{v}_c)$$
  - 유용한 성질: $1 - \sigma(z) = \sigma(-z)$

### 6.2 근사 목적함수
$$\min_{\theta} \mathcal{L}(\theta) = -\sum_{(w,c)\in\mathcal{D}} \Big[ \log\sigma(\mathbf{v}_w\cdot\mathbf{v}_c) + \sum_{c'\in\mathcal{N}} \log\sigma(-\mathbf{v}_w\cdot\mathbf{v}_{c'}) \Big]$$
- **양성 쌍**(실제 공기) 확률 최대화 + **음성 쌍**(랜덤 노이즈) 확률 최소화
- N = 랜덤 샘플링한 negative 집합, |N| ≪ |V| (보통 5~10)

### Softmax vs. Sigmoid 관점 — 핵심 비교

| | **Softmax** | **Sigmoid (negative sampling)** |
|---|---|---|
| 질문 | 모든 가능한 쌍 중 **무엇이 가장 그럴듯한가?** | 이 특정 쌍이 **진짜인가 가짜인가?** |
| 정규화 | 어휘 전체 합(비쌈) | 소수 negative만(효율적) |

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **공기 행렬(Co-occurrence matrix)** | V×V, 단어 쌍의 윈도우 내 공기 횟수 |
| **Truncated SVD** | 공기 행렬 차원 축소로 임베딩 획득(접근 ①) |
| **SVD ≡ Skip-gram** | 두 접근은 수학적으로 등가(Levy & Goldberg 2014) |
| **Softmax 목적** | 어휘 전체 정규화, 정확하나 비쌈 |
| **Negative Sampling** | sigmoid 이진분류로 근사, 소수 negative |
| **Gradient Descent** | θ ← θ − η∇L, 음의 그래디언트로 이동 |
