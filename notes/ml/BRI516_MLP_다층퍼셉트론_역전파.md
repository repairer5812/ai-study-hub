# BRI516 — 다층 퍼셉트론 (MLP) · 역전파 (Backpropagation)

> **과목**: BRI516 Introduction to Neural Networks (Ph.D. Hojin Jang)
> **⚠️ 주의**: 이 내용은 BRI507 기말 범위 외(reference용). BRI516 별도 수강 참고자료.
> **연결**: BRI507 13주차 단층 NN의 한계(XOR) → 이를 해결하는 MLP 아키텍처

---

## 1. 왜 MLP가 필요한가?

단층 신경망(Single-layer NN)의 결정적 한계: **선형 분리 불가(non-linearly separable)** 문제를 풀지 못한다. 대표적 예시: **XOR 문제**.

### 시도 1: 고차 비선형 활성화 함수 (비실용)
- 이론적으로 고차 다항식 활성화로 비선형 결정 경계를 만들 수 있다.
- 하지만 **계산 복잡도 폭발 + 과적합(overfitting) 위험** → 비실용적.

### 실용적 해법: **레이어를 추가한다**
> "The practical solution is to introduce additional layers. By stacking hidden layers, the network can progressively transform the input space, making it possible to separate classes that a single layer cannot."

- **다층 퍼셉트론(MLP)**: 완전 연결 레이어(Fully Connected Layer)를 쌓은 구조.
  - 입력층(Input layer *in*)
  - 은닉층(Hidden layer *h*) — 1개 이상 가능
  - 출력층(Output layer *out*)
- 각 레이어의 출력이 다음 레이어의 입력.

---

## 2. 비선형성(Nonlinearity)의 핵심 역할

### 2.1 선형 레이어만 쌓으면 의미 없다

두 레이어로 비선형 활성화 없이 쌓으면:

$$a^{(1)} = W^{(1)} a^{(0)} + b^{(1)}$$
$$a^{(2)} = W^{(2)} a^{(1)} + b^{(2)} = (W^{(2)}W^{(1)}) a^{(0)} + (W^{(2)}b^{(1)} + b^{(2)})$$

→ 결국 **단일 선형 변환과 동일**. 레이어를 아무리 쌓아도 비선형 활성화 없이는 표현력 증가 없음.

> "No matter how many layers you stack, without introducing non-linearity, the entire network is equivalent to a single linear transformation."

### 2.2 비선형 활성화 함수 종류

| 함수 | 수식 | 사용처 |
|------|------|--------|
| Linear | $\sigma(z) = z$ | Adaline, 선형 회귀 |
| Unit step (Heaviside) | $0\;(z<0),\;0.5\;(z=0),\;1\;(z>0)$ | Perceptron 변형 |
| Sign (signum) | $-1\;(z<0),\;0\;(z=0),\;1\;(z>0)$ | Perceptron 변형 |
| Piece-wise linear | $0\;(z\leq-\tfrac{1}{2}),\;z+\tfrac{1}{2}\;(\text{중간}),\;1\;(z\geq\tfrac{1}{2})$ | SVM |
| Logistic (sigmoid) | $\sigma(z) = \dfrac{1}{1+e^{-z}}$ | 로지스틱 회귀, MLP |
| Tanh | $\sigma(z) = \dfrac{e^z - e^{-z}}{e^z + e^{-z}}$ | MLP, RNN |
| **ReLU** | $\sigma(z) = \max(0, z)$ | **MLP, CNN (현대 딥러닝 표준)** |

> "Different types of nonlinear functions (ReLU, sigmoid, tanh) have different characteristics, such as sparsity or the ability to handle vanishing or exploding gradients."

---

## 3. 역전파(Backpropagation)

### 3.1 기본 아이디어

MLP 학습 = **경사 하강법**. 하지만 레이어가 여러 개라서 에러 신호를 각 레이어의 가중치에 배분해야 함.

**순전파(Forward pass)** → **에러 계산** → **역전파(Backward pass)**: 에러를 출력층 → 은닉층 순으로 거꾸로 흘려 각 가중치의 기울기(gradient)를 계산.

### 3.2 순전파 예시 (단일 은닉층)

$$Z^{(h)} = X^{(in)} W^{(h)T} + b^{(h)}$$
$$A^{(h)} = \sigma\!\left(Z^{(h)}\right)$$
$$Z^{(out)} = A^{(h)} W^{(out)T} + b^{(out)}$$
$$A^{(out)} = \sigma\!\left(Z^{(out)}\right)$$
$$L = \|y - A^{(out)}\|^2$$

### 3.3 역전파: 체인 룰 적용

출력층 가중치 $W^{(out)}$에 대한 그래디언트:

$$\frac{dL}{dW^{(out)}} = \frac{dL}{dA^{(out)}} \cdot \frac{dA^{(out)}}{dZ^{(out)}} \cdot \frac{dZ^{(out)}}{dA^{(h)}} \cdot \frac{dA^{(h)}}{dZ^{(h)}} \cdot \frac{dZ^{(h)}}{dW^{(h)}}$$

> "This systematic application of the chain rule, layer by layer, is precisely what we call backpropagation."

---

## 4. 역전파 계산 예시 (2입력 · 3은닉 · 2출력, sigmoid + MSE)

### 4.1 네트워크 구조

- 입력: $x_1, x_2$
- 은닉층(yellow): $a_1^{(h)}, a_2^{(h)}, a_3^{(h)}$, 활성화: sigmoid
- 출력층(pink): $a_1^{(out)}, a_2^{(out)}$, 활성화: sigmoid
- 손실: MSE — $L = \|y - A^{(out)}\|^2$

### 4.2 출력층 가중치 $w_{1,1}^{(out)}$의 그래디언트

체인 룰 3단계:

$$\frac{\partial L}{\partial w_{1,1}^{(out)}} = \frac{\partial L}{\partial a_1^{(out)}} \cdot \frac{\partial a_1^{(out)}}{\partial z_1^{(out)}} \cdot \frac{\partial z_1^{(out)}}{\partial w_{1,1}^{(out)}}$$

**① MSE 미분**: $\dfrac{\partial L}{\partial a_1^{(out)}} = 2(a_1^{(out)} - y_1)$

**② Sigmoid 미분** (핵심 성질 — 자기 자신으로 표현 가능):

$$\frac{\partial a_1^{(out)}}{\partial z_1^{(out)}} = a_1^{(out)}(1 - a_1^{(out)})$$

**③ 넷 입력의 가중치 미분**: $\dfrac{\partial z_1^{(out)}}{\partial w_{1,1}^{(out)}} = a_1^{(h)}$

**합치면**:

$$\frac{\partial L}{\partial w_{1,1}^{(out)}} = 2(a_1^{(out)} - y_1) \cdot a_1^{(out)}(1 - a_1^{(out)}) \cdot a_1^{(h)}$$

**가중치 업데이트**: $w_{1,1}^{(out)} \leftarrow w_{1,1}^{(out)} - \eta \dfrac{\partial L}{\partial w_{1,1}^{(out)}}$

### 4.3 은닉층 가중치 $w_{1,1}^{(h)}$의 그래디언트 (★ 핵심: 두 경로 합산)

$w_{1,1}^{(h)}$는 **두 출력 노드** 모두에 연결되어 있어 다변수 체인 룰(multi-variable chain rule)을 써야 함:

$$\frac{\partial L}{\partial w_{1,1}^{(h)}} = \underbrace{\frac{\partial L}{\partial a_1^{(out)}} \cdot \frac{\partial a_1^{(out)}}{\partial z_1^{(out)}} \cdot \frac{\partial z_1^{(out)}}{\partial a_1^{(h)}} \cdot \frac{\partial a_1^{(h)}}{\partial z_1^{(h)}} \cdot \frac{\partial z_1^{(h)}}{\partial w_{1,1}^{(h)}}}_{\text{경로 1: }a_1^{(out)} \text{ 통과}} + \underbrace{\frac{\partial L}{\partial a_2^{(out)}} \cdot \frac{\partial a_2^{(out)}}{\partial z_2^{(out)}} \cdot \frac{\partial z_2^{(out)}}{\partial a_1^{(h)}} \cdot \frac{\partial a_1^{(h)}}{\partial z_1^{(h)}} \cdot \frac{\partial z_1^{(h)}}{\partial w_{1,1}^{(h)}}}_{\text{경로 2: }a_2^{(out)} \text{ 통과}}$$

> "Since the weight $w_{1,1}^{(h)}$ is connected to both output nodes, we have to use the multi-variable chain rule to sum the two paths."

---

## 5. 시그모이드 미분의 핵심 성질

$$\frac{\partial a}{\partial z} = a(1-a)$$

> "A key advantage of the sigmoid function is that its derivative can be expressed in terms of its output, making it computationally convenient."

이 성질 덕분에 역전파 시 별도 미분 계산 없이 **순전파에서 이미 계산된 $a$ 값**을 재사용할 수 있다.

---

## 6. 한눈 요약

| 개념 | 핵심 |
|------|------|
| MLP 동기 | 단층은 선형 분리만 → 은닉층 추가로 비선형 결정 경계 |
| 비선형성 필수 이유 | 선형만 쌓으면 결국 단일 선형 변환과 동일 |
| 활성화 함수 | ReLU(현대 표준), sigmoid(출력층/역전파 예시), tanh(RNN) |
| 역전파 원리 | 체인 룰을 레이어마다 적용해 각 가중치의 기울기 계산 |
| 은닉층 그래디언트 | 해당 가중치가 연결된 모든 출력 경로를 **합산** |
| sigmoid 미분 | $a(1-a)$ — 순전파 출력 재사용 가능 |

---

> 출처: BRI516 Introduction to Neural Networks, "Multi-Layer Perceptrons and Backpropagation" (Ph.D. Hojin Jang). BRI507 기말 범위 외 — 참고용.
