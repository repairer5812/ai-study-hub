---
title: "다항 회귀: 입력을 비선형으로 바꾼다"
en: Polynomial regression
parent: linear-regression
order: 70
summary: 과제 2의 다항회귀를 복습합니다. 특성 행렬과 닫힌 해를 코드로 옮기고, K와 차수의 차이 및 학습 오차와 validation 오차를 확인합니다.
signal: hw
related: [generalization, complexity-tradeoff]
---

<div class="cal key">

**과제 2에서 확인할 것**

특성 행렬을 만들고 닫힌 해를 코드로 옮깁니다. K는 항의 개수이고 차수는 K-1입니다. 서로 다른 K에서 학습 오차와 validation 오차를 비교합니다. 행렬 미분 전개를 제외한다는 안내가 닫힌 해 사용과 코드까지 제외하는 것은 아닙니다. 모의시험 D2와 연결됩니다.

</div>

## 왜 필요한가

점들이 곡선을 따라 놓여 있으면 어떤 직선도 잘 맞지 않습니다. 그렇다고 지금까지 쌓은 유도를 버릴 필요는 없습니다. 모형을 바꾸는 대신 입력을 바꿉니다. $x$ 하나를 $x$, $x^2$, $x^3$ 같은 여러 값으로 늘려 놓고 그 값들의 선형 결합으로 $y$ 를 설명합니다.

이렇게 하면 표현할 수 있는 함수가 늘어납니다. 늘어난 만큼 [과적합](map.html?s=sl&n=generalization)이라는 값을 치릅니다. 이 노드는 두 가지를 함께 봅니다.

## 정의와 수식

실수 입력 $x$ 를 길이 $K$ 인 벡터로 바꾸는 변환을 둡니다.

$$
\boldsymbol{\phi}(x) = \begin{bmatrix} 1 \\ x \\ x^2 \\ \vdots \\ x^{K-1} \end{bmatrix} \in \mathbb{R}^K
$$

모형은 선형회귀에서 $\mathbf{x}$ 자리에 $\boldsymbol{\phi}(x)$ 를 넣은 것입니다.

$$
\begin{aligned}
y &= \mathbf{w}^T\boldsymbol{\phi}(x) + \epsilon \\
&= \sum_{k=0}^{K-1} w_k\, x^k + \epsilon, \qquad \epsilon \sim \mathcal{N}(0, \sigma^2)
\end{aligned}
$$

**$K$ 는 차수가 아니라 항의 개수입니다.** $\mathbf{w}$ 의 길이가 $K$ 이고 다항식의 차수는 $K - 1$ 입니다. $K = 2$ 면 직선이고 $K = 3$ 이면 2차 곡선입니다.

**왜 여전히 선형 모형인가.** $w_2 x^2 + w_1 x + w_0$ 은 $x$ 의 함수로 보면 곡선입니다. 그런데 $z_1 = x$ 와 $z_2 = x^2$ 을 서로 다른 입력 변수로 보면 $w_2 z_2 + w_1 z_1 + w_0$ 이라는 [다변량 선형회귀](map.html?s=sl&n=lr-multivariate-normal-equation)입니다. 선형회귀의 "선형"은 계수 $\mathbf{w}$ 에 대해 선형이라는 뜻입니다. 유도에서 쓰인 성질도 그것뿐입니다.

그래서 MLE를 다시 유도할 필요가 없습니다. 학습 입력마다 $\boldsymbol{\phi}(x_i)^T$ 를 행으로 쌓아 feature 행렬을 만듭니다.

$$
\boldsymbol{\Phi} = \begin{bmatrix}
1 & x_1 & \cdots & x_1^{K-1} \\
\vdots & \vdots & & \vdots \\
1 & x_n & \cdots & x_n^{K-1}
\end{bmatrix} \in \mathbb{R}^{n \times K}
$$

[닫힌 해](map.html?s=sl&n=lr-multivariate-normal-equation)의 $\mathbf{X}$ 를 $\boldsymbol{\Phi}$ 로 바꾸면 끝입니다.

$$
\hat{\mathbf{w}} = (\boldsymbol{\Phi}^T\boldsymbol{\Phi})^{-1}\boldsymbol{\Phi}^T\mathbf{y}
$$

**$K$ 를 키우면 생기는 일.** $K$ 가 커지면 곡선이 학습 점들에 더 가까이 붙습니다. 서로 다른 $x$ 가 $n$ 개일 때 $K = n$ 이면 모든 점을 지나는 다항식이 정해져 학습 오차가 0이 됩니다. 잡음까지 맞추면 점 사이에서 곡선이 크게 출렁이고 새 입력에서 오차가 커질 수 있습니다. 보간 자체가 좋은 일반화를 보장하지는 않습니다.

$K$ 가 작으면 반대로 곡선이 뻣뻣해서 데이터의 모양을 따라가지 못합니다. $K$ 는 [가설 집합의 크기](map.html?s=sl&n=complexity-tradeoff)를 정하는 손잡이입니다. 키우면 가능한 최적 approximation error는 커지지 않지만, 유한한 표본에서는 estimation error가 커질 수 있습니다.

**$K$ 는 validation으로 고릅니다.** $K$ 는 MLE가 정해 주는 값이 아닙니다. 항이 $K + 1$ 개인 모형은 마지막 계수를 0으로 두면 항이 $K$ 개인 모형이 됩니다. 그래서 학습 손실은 $K$ 를 키울수록 줄거나 그대로입니다. 학습 손실로 고르면 언제나 가장 큰 $K$ 가 뽑힙니다. $K$ 를 바꿔 가며 학습한 뒤 학습에 쓰지 않은 validation 데이터의 손실이 가장 작은 $K$ 를 고릅니다.

다항식은 변환의 한 예입니다. $\boldsymbol{\phi}$ 자리에 다른 비선형 변환을 넣어도 $\mathbf{w}$ 에 선형이기만 하면 같은 방법이 통합니다.

## 과제 2의 식을 코드로 옮기기

입력 x와 레이블 y는 모양이 $(n,1)$ 인 NumPy 배열로 둡니다. 아래 코드는 과제에서 요구한 행렬 연산을 확인하는 구현입니다. $\boldsymbol\Phi$ 의 열들이 독립이어서 $\boldsymbol\Phi^T\boldsymbol\Phi$ 의 역행렬이 존재한다고 가정합니다.

```python
import numpy as np

def fit_poly(x, y, K):
    phi = np.zeros((len(x), K))
    for k in range(K):
        phi[:, [k]] = x ** k
    phi_T = np.transpose(phi)
    gram = np.matmul(phi_T, phi)
    return np.matmul(np.matmul(np.linalg.inv(gram), phi_T), y)
```

| 배열 | 모양 | 뜻 |
|---|---|---|
| phi | $(n,K)$ | 표본을 행으로, 다항 특성을 열로 쌓음 |
| phi_T | $(K,n)$ | 특성 행렬의 전치 |
| gram | $(K,K)$ | 역행렬을 구하는 대상 |
| 반환한 w | $(K,1)$ | 항별 계수 |

과제에서 비교하는 K=2, 3, 5, 10은 각각 1, 2, 4, 9차 다항식입니다. 같은 학습 자료에서 학습 오차가 줄었다는 사실만으로 K를 고르지 않습니다. validation 오차와 곡선이 잡음을 따라 출렁이는지도 확인합니다. 이 코드는 닫힌 해의 사용을 복습하는 것이며 행렬 미분 전개를 다시 요구하는 것은 아닙니다.

## 흔한 오해

<div class="cal trap">

**$x^2$ 항이 들어가면 선형회귀가 아니다**

계수에 대해 선형이면 선형회귀입니다. $x^2$ 은 미리 계산해 둔 입력 값일 뿐입니다. 추정할 대상인 $\mathbf{w}$ 의 성분들은 그 값에 한 번씩 곱해져 더해집니다. 닫힌 해도 그대로 있습니다.

</div>

<div class="cal trap">

**학습 오차가 가장 작은 $K$ 가 가장 좋은 모형이다**

학습 오차는 $K$ 를 키우면 줄거나 그대로이고 늘지 않습니다. 점의 수만큼 키우면 0이 됩니다. 좋은 모형의 기준은 보지 않은 데이터에서의 오차이고 그것을 대신 재는 것이 validation 손실입니다.

</div>

## 확인 질문

<div class="cal q">

$K = 3$ 이고 학습 입력이 $x_1 = -1$, $x_2 = 0$, $x_3 = 2$, 레이블이 차례로 $2, 1, 5$ 입니다. $\boldsymbol{\Phi}$ 를 쓰고 세 점을 모두 지나는 $\mathbf{w}$ 를 구하세요. 이때 학습 오차는 얼마입니까?

</div>

<details class="solve">
<summary>답 보기</summary>

$$
\boldsymbol{\Phi} = \begin{bmatrix} 1 & -1 & 1 \\ 1 & 0 & 0 \\ 1 & 2 & 4 \end{bmatrix}
$$

세 점을 지나려면 $\boldsymbol{\Phi}\mathbf{w} = \mathbf{y}$ 여야 합니다. 둘째 행에서 $w_0 = 1$ 입니다. 첫째 행은 $1 - w_1 + w_2 = 2$ 이고 셋째 행은 $1 + 2w_1 + 4w_2 = 5$ 입니다. 정리하면 $-w_1 + w_2 = 1$ 과 $w_1 + 2w_2 = 2$ 이고 두 식을 더하면 $3w_2 = 3$ 입니다. 따라서 $w_2 = 1$, $w_1 = 0$ 입니다.

구한 다항식은 $1 + x^2$ 이고 학습 오차는 0입니다. 점이 세 개이고 계수도 세 개라서 식 세 줄이 미지수 세 개를 정했습니다. $x$ 가 서로 다르고 $K = n$ 이면 늘 이렇게 됩니다. 학습 오차가 0이라는 사실은 모형이 좋다는 증거가 아닙니다.

</details>

<div class="cal q">

다음 두 모형 가운데 선형회귀의 닫힌 해로 풀 수 있는 것은 어느 쪽입니까? 이유를 쓰세요.

- (가) $y = w_0 + w_1 x + w_2 \sin x + \epsilon$
- (나) $y = w_0 + \sin(w_1 x) + \epsilon$

</div>

<details class="solve">
<summary>답 보기</summary>

(가)만 풀 수 있습니다. $\boldsymbol{\phi}(x) = (1, x, \sin x)^T$ 로 두면 $\mathbf{w}^T\boldsymbol{\phi}(x)$ 꼴입니다. $\sin x$ 는 입력에서 미리 계산되는 값이고 계수는 곱해져 더해질 뿐입니다.

(나)는 $w_1$ 이 $\sin$ 안에 들어 있어 계수에 대해 선형이 아닙니다. 제곱 손실을 미분해 0으로 둔 식이 $\mathbf{w}$ 의 1차 연립방정식이 되지 않으므로 닫힌 해의 식을 쓸 수 없습니다.

</details>
