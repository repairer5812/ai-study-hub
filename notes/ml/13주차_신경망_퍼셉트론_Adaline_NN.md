# 기계학습 13주차

# 신경망 (Neural Networks): McCulloch-Pitts · Perceptron · Adaline · 경사 하강법 · 단층 신경망

12주차 매니폴드 학습으로 비지도학습을 마치고, **마지막 차시**는 다시 분류(지도학습)로 돌아와 **인공신경망(Neural Networks)의 기원과 학습 원리**를 다룹니다. 뇌의 뉴런을 본뜬 **McCulloch-Pitts 뉴런(1943)** 에서 출발해, 스스로 가중치를 학습하는 **퍼셉트론(Perceptron, 1958)**, 연속 손실과 경사 하강법을 도입한 **Adaline(1959)**, 그리고 이를 일반화한 **단층 신경망(Single-Layer NN)** 까지 이어집니다. 손실 함수(MSE vs BCE), 소프트맥스, 체인 룰 기반 역전파의 뼈대를 정리하고, 단층의 한계(XOR)로 다음(MLP·딥러닝)을 예고합니다.

> 💡 **교수님 출제 포인트 (강의 전사 기반)**: ① McCulloch-Pitts vs Perceptron의 결정적 차이(**가중치 학습 여부**), ② Perceptron 오차항 $(y-\hat{y})$의 **두 역할(방향·강도)**, ③ Perceptron vs Adaline의 차이(**에러 계산 시점**: 임계값 통과 전/후), ④ 분류에서 MSE 대신 **BCE를 쓰는 이유**, ⑤ BCE = **Bernoulli MLE의 음의 로그우도(NLL)**, ⑥ Softmax의 **두 역할(지수화·정규화)**, ⑦ 단층의 한계(**XOR·선형 분리**). 기말 포맷은 중간과 거의 동일하되 **난이도 상향**. **체인 룰 미분 유도 과정은 출제하지 않음** — 수식의 **개념적 의미**를 물음. 한 챕터당 4~5문제, 기말 범위 약 5개 챕터(9~13주차).

---

## 1. 🧠 McCulloch-Pitts 뉴런 (1943)

### 1.1. 기원 (슬라이드 직접 인용)
> Modern neural networks trace their roots back to simple linear models shaped by ideas from neuroscience. A notable early example is the **McCulloch-Pitts neuron** proposed in 1943, which offered one of the first abstractions of brain function.

- 머신러닝의 목적(데이터를 주면 스스로 학습해 태스크 수행)을 **사람의 뇌(brain)** 에서 본뜨자는 동기에서 출발.
- 💬 (전사) 가장 첫 형태의 인공신경망 모델. 신호전달 세포(뉴런)를 수학적으로 모사.

### 1.2. 생물학적 구조와의 매핑 (슬라이드 직접 인용)
> McCulloch and Pitts described the nerve cell as a **simple logic gate with binary outputs**. Multiple signals arrive at the **dendrites**, are integrated in the **cell body**, and if the combined signal exceeds a **threshold**, an output is generated and transmitted along the **axon**.

| 생물학적 구조 | 역할 | 인공 모델 대응 |
|------|------|------|
| Dendrite (수상돌기) | 다른 뉴런의 입력 신호 수신 | 입력 $x_1, x_2, x_3$ |
| Cell Body / Soma (세포체) | 신호 통합(합산) | Weighted summation $\sum$ |
| Axon (축삭돌기) | 임계값 넘으면 출력 전달 | Step function 출력 |

### 1.3. 수학적 모델링 (슬라이드 직접 인용)
> The inputs $x$ represent the observed features, while the weights $w$ reflect their relative importance. Each input is multiplied by its weight, the results are summed, and if the total exceeds a certain threshold, the neuron produces an output.

- **Input**: $x_1, x_2, x_3$ — 관측된 피처.
- **Weight**: $w_1, w_2, w_3$ — 커넥션의 강도(얼마나 강하게 연결되어 있는지).
- **Bias**: 입력 $1$에 가중치 $w_0$를 곱해 구성. 선형 결합 $z = \mathbf{w}^T\mathbf{x} + b$.
- 결과값이 임계값(threshold)보다 높으면 **Positive class (1)**, 낮으면 **Negative class (0)** — **Step Function** 사용.

> 💡 **Bias의 중요성 (교수님 강조)**: 바이어스를 무시하면 안 됨. 바이어스가 없으면 결정 경계(decision boundary)가 **항상 원점(0,0)을 지나야** 하므로 정확한 분류 선을 그리기 힘든 경우가 생김. 기본 베이스라인 강도를 설정해 줌.

### 1.4. 결정 경계 (슬라이드 직접 인용)
> The point where the weighted sum $f(x, w)$ equals the threshold defines the **decision boundary**, which separates the input space into regions corresponding to the two classes.

- $\sigma(z)\geq 0 \Rightarrow$ Class 1, $\sigma(z)<0 \Rightarrow$ Class 0. (여기서 $z=\mathbf{w}^T\mathbf{x}+b$)

### 💡 1.5. 예시 — 콘서트 참석 결정 (★ 계산형 출제 가능)
| Criteria | Input | Weight |
|------|------|------|
| Artist is good | $x_1=1$ | $w_1=0.7$ |
| Weather is good | $x_2=0$ | $w_2=0.6$ |
| Friend will come | $x_3=1$ | $w_3=0.5$ |
| Food is served | $x_4=0$ | $w_4=0.3$ |
| Alcohol is served | $x_5=1$ | $w_5=0.4$ |

- 가중합: $0.7(1)+0.6(0)+0.5(1)+0.3(0)+0.4(1) = 1.6$.
- 임계값(threshold) $1.5$와 비교: $1.6 > 1.5$ → 출력 "true" → **콘서트에 간다(1)**.

### 💡 1.6. McCulloch-Pitts의 한계 (★★★ 출제 1순위)
> The McCulloch-Pitts neuron was an important first step, but its major limitation was that it **could not adjust its own weights** and instead relied on a **human operator to set them manually**.

- 가중치 $w$를 사람(실험자)이 **수동으로** 정해야 함 → 데이터로부터 스스로 학습하는 '머신러닝의 철학'과 대조됨(엄밀히 머신러닝 모델이라 부르기 애매).

---

## 2. ⚡ 퍼셉트론 (Perceptron, Rosenblatt 1958)

### 2.1. 개념 (슬라이드 직접 인용)
> The perceptron, introduced by Rosenblatt (1958, 1962), was the **first model capable of learning to adjust its own weights** based on examples, allowing it to classify inputs into different categories.

- McCulloch-Pitts의 단점(수동 가중치)을 보완 — **가중치를 데이터로부터 스스로 자동 학습**하는 최초의 머신러닝 신경망 모델.

### 2.2. 하드웨어 구현 — Mark I Perceptron (슬라이드 직접 인용)
> The Mark I Perceptron, the first implementation of the perceptron algorithm, used a **20×20 cadmium sulfide photocell camera to capture 400-pixel images**. Its key feature was a plugboard that configured input feature combinations.

- $20\times 20 = 400$ 픽셀 이미지를 입력받아 알파벳 등을 분류하는 거대한 기계 장치. 구조 자체는 McCulloch-Pitts와 유사(입력·가중치·편향·선형 결합·임계값 함수).

### 💡 2.3. 퍼셉트론 학습 규칙 (★★★ 핵심)
> The perceptron learning process begins by initializing the weights and bias to either zero or small random values. For each training sample, the model computes the output $\hat{y}$ and updates the weights and bias based on the error between the true class label $y$ and the predicted class label $\hat{y}$.

- 업데이트 수식:
$$w_j \leftarrow w_j + \Delta w_j, \qquad b \leftarrow b + \Delta b$$
$$\Delta w_j = \eta\,(y^{(i)} - \hat{y}^{(i)})\,x_j^{(i)}, \qquad \Delta b = \eta\,(y^{(i)} - \hat{y}^{(i)})$$
- 기호: $\eta$ = 학습률(learning rate, 보통 0~1 상수), $y^{(i)}$ = 실제 라벨(정답), $\hat{y}^{(i)}$ = 예측값. 경사 하강법과 형태가 매우 유사.

> 💡 오차항 $(y-\hat{y})$ 의 **두 가지 핵심 역할** (★★★ 교수님 강조)
> 1. **방향(Direction)**: 예측 $\hat{y}$이 너무 크면 가중치를 줄이는 방향으로, 너무 낮으면 늘리는 방향으로 조절.
> 2. **강도(Magnitude)**: 오차가 작으면 $\Delta w$도 작고, 오차가 크면 더 많이 업데이트. ("A larger error leads to a larger adjustment.")

### 💡 2.4. 학습 예시 (Step-by-step) (★ 계산형 출제 가능)
- **초기화**: 가중치 벡터 $\mathbf{w} = [w_0, w_1, w_2] = [0, 1, 0.5]$, $\eta = 0.2$, step function 사용.
- 판별 함수(discriminant): $0 = w_0 x_0 + w_1 x_1 + w_2 x_2 = 0 + x_1 + 0.5 x_2 \Rightarrow x_2 = -2x_1$.

**데이터 A**: $x_1=1, x_2=1$, 정답 $y=+1$.
- $\mathbf{w}^T\mathbf{x} = 0 + 1(1) + 0.5(1) = 1.5 > 0 \Rightarrow \hat{y}=+1$. 정답과 일치 → **업데이트 불필요**($\Delta w = 0$).

**데이터 B**: $x_1=2, x_2=-2$, 정답 $y=-1$.
- $\mathbf{w}^T\mathbf{x} = 0 + 1(2) + 0.5(-2) = 1 > 0 \Rightarrow \hat{y}=+1$. 정답은 $-1$ → **오분류 → 업데이트**.
- $w_0 = 0 - 0.2\times 1 = -0.2$
- $w_1 = 1 - 0.2\times 2 = 0.6$
- $w_2 = 0.5 - 0.2\times(-2) = 0.9$
- 새 판별 함수가 A와 B를 모두 올바르게 분류.

### 💡 2.5. 해결 가능/불가능 문제와 수렴 보장 (★★★)
- **해결 가능**: AND, OR — 직선 하나로 두 클래스를 완벽히 나눌 수 있는 **선형 분리 가능(linearly separable)** 문제.
- **해결 불가능**: **XOR 문제** — 직선 하나로 0과 1을 절대 구분 못 함(비선형 분리, non-linearly separable).
> A limitation of single-layer perceptrons is that their **convergence is guaranteed only when the two classes are linearly separable**.

---

## 3. ❄️ 첫 번째 AI 겨울 (AI Winter, 1974~1980)

> During the period from 1974 to 1980 (so-called the first AI winter), research into simple, single-layer artificial neural networks was largely abandoned. This was partly influenced by **Marvin Minsky and Seymour Papert**, who highlighted the limitations of perceptrons.

- **Minsky & Papert (1969), 《Perceptrons》**: 단층 퍼셉트론이 XOR 같은 단순 문제도 못 푼다고 비판.
- 💬 다층 퍼셉트론(MLP)이 한계를 극복할 수 있음은 알려졌으나, **1960년대엔 MLP를 학습시키는 방법(역전파)이 없었음.**
- **DARPA** 등 펀딩 기관이 방향성 없는 AI 연구 지원을 대거 중단. → 1980년대엔 **전문가 시스템(Expert System)** 등 지식 기반 접근이 주류로 이동.

---

## 4. 📉 Adaline (Adaptive Linear Neuron, Widrow & Hoff 1959)

### 💡 4.1. 퍼셉트론과의 결정적 차이 — 에러 계산 시점 (★★★ 출제 1순위)
> The Adaline was introduced in 1959, shortly after Rosenblatt's perceptron, by **Bernard Widrow and Ted Hoff** at Stanford. Unlike the perceptron, Adaline **does not use the thresholded class prediction directly to update the weights**. Instead, it uses a **linear activation function** $\sigma(z)$, which is simply the **identity function** of the net input: $\sigma(z) = z$.

| 항목 | Perceptron | Adaline |
|------|-----------|---------|
| 에러 계산 시점 | 임계값 함수(step) **통과 후** 클래스 라벨로 | 임계값 **통과 전** 연속 선형값 $\sigma(z)=z$로 |
| 미분 가능성 | step은 미분 0/불가 → 경사하강 불가 | 연속값 → **미분 가능 → 경사하강 사용 가능** |
| 손실 | (오분류 여부 기반) | **MSE 최소화** |

> 💡 핵심: "어느 시점에서 에러를 계산해 가중치를 업데이트하는가?" Perceptron은 step 통과 후의 **클래스 예측**으로, Adaline은 step 통과 전의 **연속 선형 출력**으로 에러를 계산.

### 4.2. 학습과 분류의 분리 (슬라이드 직접 인용)
> Note that the threshold function is **still used, but only after learning**, to convert the linear output into a class label for the final prediction. In this sense, Adaline **separates the learning step from the classification step**.

- 즉 임계값 함수가 사라진 게 아니라, **학습 때만 안 쓰고** 최종 분류 예측 때는 사용. (학습 ↔ 분류 구별)

### 4.3. 학습 규칙 — 경사 하강법 도입
> Instead of updating the weights only based on whether a sample is misclassified, as in the perceptron, Adaline adjusts its parameters **in the direction that reduces the loss**.
$$\mathbf{w} \leftarrow \mathbf{w} + \Delta\mathbf{w}, \quad b \leftarrow b + \Delta b, \qquad \Delta\mathbf{w} = -\eta\nabla_{\mathbf{w}} L(\mathbf{w}, b), \quad \Delta b = -\eta\nabla_{b} L(\mathbf{w}, b)$$
- 💡 연속 손실 함수를 정의하고 경사 하강법으로 최소화 → **현대 신경망으로 가는 디딤돌(stepping stone)**.

---

## 5. ⛰️ 경사 하강법 (Gradient-Based Optimization)

### 5.1. 목적 함수(Objective/Loss Function) (슬라이드 직접 인용)
> The objective function, often called the **loss function or cost function**, is a mathematical way of measuring how well a model is performing... This type of function measures how far off the model is from its target.

- 산을 내려가는 비유: 산의 높이 = 목적 함수 값. 일부 도메인은 보상·이익을 **최대화**(maximize)하지만, 보통은 **손실(loss)** 을 **최소화**(minimize).

### 5.2. "Gradient" + "Descent"의 의미 (슬라이드 직접 인용)
> The gradient is a **vector of partial derivatives** that tells us the slope of the objective function with respect to each parameter... it shows both the **direction and steepness** of the slope.

- **Descent**: 그래디언트 **반대 방향**으로 이동하면 목적 함수 값이 낮아짐(step by step).
- 💬 그래디언트는 **현재 위치의 기울기만** 알려주므로 작은 이웃에서만 신뢰 가능 → 그래서 한 번에 안 가고 단계적으로 진행.

### 5.3. 업데이트 규칙 (Cauchy 1847)
$$\mathbf{w} \leftarrow \mathbf{w} + \Delta\mathbf{w}, \quad b \leftarrow b + \Delta b, \qquad \Delta\mathbf{w} = -\eta\nabla_{\mathbf{w}} L(\mathbf{w}, b), \quad \Delta b = -\eta\nabla_{b} L(\mathbf{w}, b)$$

### 💡 5.4. MSE와 그 그래디언트 (★ 개념 출제, 유도는 비출제)
$$L(\mathbf{w}, b) = \frac{1}{n}\sum_{i=1}^{n}\big(y^{(i)} - \sigma(z^{(i)})\big)^2$$
$$\frac{\partial L}{\partial w_j} = -\frac{2}{n}\sum_i \big(y^{(i)} - \sigma(z^{(i)})\big)x_j^{(i)}, \qquad \frac{\partial L}{\partial b} = -\frac{2}{n}\sum_i \big(y^{(i)} - \sigma(z^{(i)})\big)$$
- MSE는 음이 아니며(non-negative), 낮을수록 좋은 예측, 완벽한 모델은 손실 0.
- 💬 (교수님) **유도 과정 자체는 시험에 안 나옴.** 식의 의미만 파악할 것.

### 💡 5.5. 학습률(Learning Rate $\eta$) 조절 (★★★)
- **너무 작으면**(예: $\eta=0.00001$): 최솟값까지 가는 데 매우 많은 에폭 필요(수렴 느림).
- **너무 크면**: 최솟값을 지나쳐 튕김(**overshoot**) → 지그재그로 발산(**diverge**) → 학습 실패.
- 💬 **동적 학습률(Learning Rate Scheduler)**: 초반엔 크게, 최솟값 근처에선 점차 줄여 안정 수렴(실무 표준).
- 💬 (Q&A) "학습률은 꼭 0~1?" → 문제·입력 스케일에 따라 다르나, **입력을 정규화한 셋업에선 보통 0~1**.

### 💡 5.6. 데이터 표준화(Standardization)
> The standardization method shifts the mean of each feature so that it is **centered at zero (zero mean)** and each feature has a **standard deviation of 1 (unit variance)**.

- 입력 스케일이 크면 가중치도 비정상적으로 커져 학습 불안정. 표준화하면 경사 하강이 **지그재그 없이 빠르게 수렴**. 스케일 큰 피처가 업데이트를 지배하는 것을 방지.

---

## 6. 📦 배치 전략 (Full Batch · SGD · Mini-batch)

| 방식 | 업데이트 단위 | 장점 | 단점 |
|------|------|------|------|
| **Full Batch GD** | 전체 데이터(entire dataset) | 노이즈 없이 robust·다이렉트하게 최솟값 향함 | 한 번 업데이트에 막대한 리소스·시간 |
| **SGD (Stochastic)** | 단 하나의 샘플(single observation) | 업데이트 빠름, 얕은 local minima 탈출 유리(노이즈 덕) | 경로 불안정(noisy), 이상치에 취약 |
| **Mini-batch** | 데이터 부분집합(예: 32개) | 속도·안정성 절충, 벡터화로 효율↑ | (하이퍼파라미터 batch size 필요) |

> A compromise between full batch gradient descent and SGD is **mini-batch gradient descent**... for example, 32 training examples at a time... allows us to replace the for loop with **vectorized operations** leveraging linear algebra.

### 💡 6.1. 필수 용어 (★)
- **배치(Batch)**: 한 번 업데이트에 쓰는 데이터 부분집합의 크기.
- **에폭(Epoch)**: 전체 트레이닝 데이터셋을 처음부터 끝까지 **한 번** 다 학습한 상태. (예: 100개 데이터를 batch size 20으로 학습 → 5번 업데이트 = 1 에폭)
- 💬 SGD는 더 빈번한 업데이트로 보통 더 빨리 수렴, 노이즈가 커서 얕은 극솟값 탈출에 유리(비선형 손실에서 이점).

---

## 7. 🕸️ 단층 신경망 (Single-Layer Neural Networks)

> Note that **perceptron and Adaline are both special cases** of such single-layer networks. For each example $i$, the input is $\mathbf{x}^{(i)}$, the label is $y^{(i)}\in\{0,1\}$, and the model produces a prediction $\hat{y}^{(i)}\in\{0,1\}$.

### 💡 7.1. MSE vs BCE — 분류엔 BCE (★★★ 출제 1순위)
- **MSE**: 회귀(연속값 예측)에 적합. 분류에선 정답과 예측이 정반대여도 오차가 작아 **그래디언트가 충분히 크지 않음**.
> For classification tasks, the mean squared error does not always provide gradients that are strong enough to guide learning effectively.

- **BCE (Binary Cross-Entropy)**:
$$L_{BCE} = -\frac{1}{N}\sum_{i=1}^{N}\Big[y^{(i)}\log\hat{y}^{(i)} + (1-y^{(i)})\log(1-\hat{y}^{(i)})\Big]$$
> Unlike MSE, cross-entropy places a **much higher penalty on confident but incorrect predictions**.

### 💡 7.2. BCE의 페널티 비교 (정답 $y=1$일 때) (★ 계산형)
| 예측 $\hat{y}$ | MSE | BCE |
|------|------|------|
| 0.9 (거의 정답) | 0.01 | 0.105 |
| 0.7 | 0.09 | 0.357 |
| 0.3 | 0.49 | 1.204 |
| 0.1 (완전히 틀린 확신) | 0.81 | **2.302** |

- 정답인데 0.1로 강하게 틀리면 BCE는 2.302로 **급격히** 커짐(MSE는 0.81). → 틀린 예측에 큰 로스를 줘 더 강하게 업데이트.

### 💡 7.3. BCE의 통계적 근거 — Bernoulli MLE = NLL (★★★)
> In fact, binary cross-entropy loss arises naturally from a probability perspective.

- 각 샘플이 **베르누이 분포**를 따른다 가정. 데이터셋의 우도(likelihood):
$$p(\mathbf{Y}|\mathbf{X}) = \prod_{i=1}^{N} (\hat{y}^{(i)})^{y^{(i)}}(1-\hat{y}^{(i)})^{1-y^{(i)}}$$
- 라벨이 **독립적으로** 추출되므로 곱(factorization) 가능. **최우추정(MLE)** 으로 우도 최대화 → 계산 편의 위해 **음의 로그우도(NLL)**:
$$-\log p(\mathbf{Y}|\mathbf{X}) = -\sum_{i=1}^{N} y^{(i)}\log\hat{y}^{(i)} + (1-y^{(i)})\log(1-\hat{y}^{(i)})$$
- 이 NLL이 **BCE와 완전히 동일**. (이진 분류에서 NLL = BCE)

### 7.4. 원-핫 인코딩 (One-hot Encoding)
> Instead of using a single scalar, we often encode the label as a vector using one-hot encoding.

- Sunny $[1,0,0]$, Rainy $[0,1,0]$, Windy $[0,0,1]$. 이진 분류는 $\mathbf{y}^{(i)}\in\{(1,0),(0,1)\}$.
- 라벨을 벡터로 표현하면 모델도 각 클래스 점수를 **독립적으로** 출력 가능. 다중 클래스 확장에 필수.

### 💡 7.5. 소프트맥스 (Softmax) (★★★)
- 원시 점수(raw score, logit) $\mathbf{z}^{(i)}\in\mathbb{R}^C$는 임의 실수라 확률이 아님. 확률로 바꾸려면:
$$\hat{y}_c^{(i)} = \text{softmax}(\mathbf{z}^{(i)})_c = \frac{\exp(z_c^{(i)})}{\sum_{c'}\exp(z_{c'}^{(i)})}$$
> 💡 **Softmax의 두 역할**: ① **지수화(Exponential)** — $e^{z}$로 모든 값을 양수로(음수 점수 방지), ② **정규화(Normalization)** — 전체 합으로 나눠 합을 1로(확률 분포).
- 특징: 지수 때문에 점수 차이를 **증폭(amplify)** → 가장 큰 점수가 압도적 확률, 나머지는 억제.

### 7.6. 단층 신경망의 순전파(Feed Forward)
- 선형 변환: $z_1 = w_{21}x_2 + b_1$ (이후 편의상 bias 생략). 활성화(identity) 후 softmax:
$$\hat{y}_1 = \frac{e^{z_1}}{e^{z_1}+e^{z_2}}$$
- 손실(이진, one-hot): $L = -(y_1\log\hat{y}_1 + y_2\log\hat{y}_2)$.

### 💡 7.7. 역전파(Back Propagation)와 체인 룰 (개념만, 유도 비출제)
- 가중치 업데이트: $w_{21} = w_{21} - \eta\cdot\dfrac{\partial L}{\partial w_{21}}$.
- 체인 룰: $w_{21}$은 $z_1$을 바꾸고, $z_1$은 softmax를 통해 $\hat{y}_1$ **뿐 아니라** $\hat{y}_2$에도 영향 → 두 갈래를 모두 더해야 함.
$$\frac{\partial L}{\partial w_{21}} = \Big(\frac{\partial L}{\partial\hat{y}_1}\frac{\partial\hat{y}_1}{\partial z_1} + \frac{\partial L}{\partial\hat{y}_2}\frac{\partial\hat{y}_2}{\partial z_1}\Big)\frac{\partial z_1}{\partial w_{21}}$$
- 부분 결과: $\dfrac{\partial\hat{y}_1}{\partial z_1} = \hat{y}_1(1-\hat{y}_1)$ (같은 클래스), $\dfrac{\partial\hat{y}_2}{\partial z_1} = -\hat{y}_1\hat{y}_2$ (다른 클래스), $\dfrac{\partial z_1}{\partial w_{21}} = x_2$.
- 💡 **깔끔한 최종 결과**: $\dfrac{\partial L}{\partial w_{21}} = (\hat{y}_1 - y_1)x_2$ → 업데이트 $w_{21} = w_{21} - \eta(\hat{y}_1 - y_1)x_2$.
- 💬 (교수님) 이 체인 룰 유도·증명은 **시험에 안 나옴.** "예측 - 정답" 형태로 깔끔히 정리된다는 의미만 기억.

---

## 8. 🚧 단층 신경망의 한계 → MLP 예고

> A major drawback of single-layer neural networks is that they can typically solve **linearly separable problems**, meaning it struggles with tasks that require non-linear decision boundaries, such as the **XOR problem**. Another major limitation is its **restricted representational power**.

- **선형 분리 한계**: XOR 등 비선형 결정 경계 불가.
- **표현력 부족(restricted representational power)**: 레이어가 하나라 이미지 인식·자연어 처리 같은 **계층적(hierarchical) 특징** 학습 불가.
- → 다음 챕터(딥러닝): 레이어를 여러 개 쌓은 **다층 퍼셉트론(MLP)** 과 역전파로 극복.

---

## 9. 🎯 한눈 요약 (기말 직전 점검)

| 모델 | 연도 | 핵심 | 가중치 학습 | 한계 |
|------|------|------|------|------|
| McCulloch-Pitts | 1943 | logic gate, step | ❌ 수동 | 학습 불가 |
| Perceptron | 1958 | 오차 $(y-\hat{y})$로 자동 학습 | ✅ | XOR 불가, 선형 분리만 |
| Adaline | 1959 | 선형 활성·MSE·경사하강 | ✅ | 선형 한계 |
| 단층 NN | — | softmax·BCE 일반화 | ✅ | XOR·표현력 부족 |

- **핵심 대비표**: McCulloch-Pitts↔Perceptron(가중치 학습) / Perceptron↔Adaline(에러 시점) / MSE↔BCE(분류 페널티) / BCE↔NLL(동일) / Softmax(지수·정규화) / 단층 한계(XOR).

> 출처: BRI507 Introduction to Machine Learning, Neural Networks 슬라이드(67p, Ph.D. Hojin Jang) 전 범위 + 강의 전사.
