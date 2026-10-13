---
title: 다변량 선형회귀와 닫힌 해
en: Multivariate regression and the normal equation
parent: linear-regression
order: 50
summary: 입력이 벡터가 되어도 가정과 유도는 그대로입니다. gradient가 영벡터인 점을 행렬로 풀면 닫힌 해가 나오지만 역행렬이 있어야 하고 계산이 무거워서 실제로는 반복법으로 풉니다.
signal: none
related: [logreg-no-closed-form]
---

## 왜 필요한가

실제 데이터는 입력이 하나가 아닙니다. 입력이 $d$ 개면 편미분도 $d$ 개이고 풀어야 할 식도 $d$ 줄입니다. [단변량](map.html?s=sl&n=lr-closed-form-univariate)에서 한 것처럼 하나씩 소거하기는 어렵습니다. 벡터와 행렬로 묶어 한 번에 다룹니다.

이 노드에서 챙길 것은 전개가 아니라 세 가지입니다. gradient가 무엇인지, 닫힌 해가 어떻게 생겼는지, 그 해를 실제로는 왜 잘 쓰지 않는지입니다.

## 정의와 수식

입력을 벡터 $\mathbf{x} \in \mathbb{R}^d$ 로 두고 선형식을 내적으로 씁니다.

$$
y = \mathbf{w}^T\mathbf{x} + \epsilon, \qquad \epsilon \sim \mathcal{N}(0, \sigma^2)
$$

입력 벡터 맨 앞에 1을 하나 붙여 두면 절편이 $\mathbf{w}$ 의 한 성분으로 들어갑니다. 그래서 절편을 따로 쓰지 않습니다. 이 노드에서 $d$ 는 그 1까지 센 길이입니다. $\mathbf{w}^T\mathbf{x}$ 는 실수 하나이고 $y$ 도 여전히 실수 하나입니다. 가우시안의 꼴은 그대로이고 평균만 내적으로 바뀝니다.

$$
y_i \mid \mathbf{x}_i \sim \mathcal{N}(\mathbf{w}^T\mathbf{x}_i, \, \sigma^2)
$$

[가우시안 노이즈 유도](map.html?s=sl&n=lr-gaussian-noise-mse)의 다섯 줄에서 $w_1 x_i + w_0$ 을 $\mathbf{w}^T\mathbf{x}_i$ 로 바꾸면 같은 결론에 닿습니다.

$$
\begin{aligned}
\hat{\mathbf{w}} &= \arg\min_{\mathbf{w}} \ell(\mathbf{w}) \\
\ell(\mathbf{w}) &= \frac{1}{n} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2
\end{aligned}
$$

**gradient.** $\ell$ 을 $\mathbf{w}$ 의 성분마다 편미분해 세로로 모은 벡터입니다.

$$
\nabla_{\mathbf{w}} \ell(\mathbf{w}) = \left[ \frac{\partial \ell}{\partial w_1}, \, \dots, \, \frac{\partial \ell}{\partial w_d} \right]^T
$$

gradient가 영벡터라는 것은 성분별 편미분이 모두 0이라는 뜻입니다. 식 하나처럼 보여도 조건은 $d$ 개입니다. 단변량에서 $w_0$ 과 $w_1$ 으로 따로 미분해 두 식을 얻은 것이 $d = 2$ 인 경우입니다.

**닫힌 해.** 표본을 행으로 쌓아 $\mathbf{X} = [\mathbf{x}_1, \dots, \mathbf{x}_n]^T \in \mathbb{R}^{n \times d}$ 와 $\mathbf{y} = [y_1, \dots, y_n]^T$ 를 만듭니다. gradient를 영벡터로 두면 다음 식이 나옵니다.

$$
\mathbf{X}^T\mathbf{X}\,\hat{\mathbf{w}} = \mathbf{X}^T\mathbf{y}
$$

이 식을 normal equation이라고 부릅니다. $\mathbf{X}^T\mathbf{X}$ 의 역행렬이 있으면 양변에 곱해 해를 얻습니다.

$$
\hat{\mathbf{w}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}
$$

미분에서 이 식까지 가는 전개는 [닫힌 해의 행렬 미분 전개](map.html?s=sl&n=lr-closed-form-derivation)에 따로 두었습니다. 여기서는 결과가 단변량과 맞는지만 확인합니다. 앞 노드의 점 $(0, 1)$, $(1, 1)$, $(2, 4)$ 에 1을 붙이면 다음과 같습니다.

$$
\mathbf{X} = \begin{bmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{bmatrix}, \qquad \mathbf{y} = \begin{bmatrix} 1 \\ 1 \\ 4 \end{bmatrix}
$$

$$
\mathbf{X}^T\mathbf{X} = \begin{bmatrix} 3 & 3 \\ 3 & 5 \end{bmatrix}, \qquad \mathbf{X}^T\mathbf{y} = \begin{bmatrix} 6 \\ 9 \end{bmatrix}
$$

normal equation을 풀어 쓰면 $3w_0 + 3w_1 = 6$ 과 $3w_0 + 5w_1 = 9$ 입니다. 풀면 $w_1 = \frac{3}{2}$, $w_0 = \frac{1}{2}$ 로 단변량 공식의 답과 같습니다. 두 식은 단변량에서 $w_0$ 과 $w_1$ 으로 편미분해 얻은 두 조건과 같은 식입니다.

**역행렬이 있을 조건.** $\mathbf{X}^T\mathbf{X}$ 는 $\mathbf{X}$ 의 열들이 서로 선형독립일 때만 역행렬을 가집니다. 다음과 같은 경우에 깨집니다.

- 같은 변수가 두 번 들어 있다.
- 한 변수가 다른 변수들의 합이나 상수배로 만들어진다.
- 변수의 수 $d$ 가 표본의 수 $n$ 보다 많다.

이럴 때는 같은 손실 값을 내는 $\mathbf{w}$ 가 여럿이라 해가 하나로 정해지지 않습니다.

**실제로는 반복법으로 풉니다.** 닫힌 해가 있는데도 gradient를 따라 조금씩 내려가는 방법을 쓰는 이유는 세 가지입니다.

1. 역행렬 계산은 변수가 늘수록 빠르게 무거워집니다.
2. 역행렬이 없거나 없는 것에 가까운 데이터에서는 닫힌 해의 값이 불안정하게 튑니다.
3. 닫힌 해가 아예 없는 모형이 더 많습니다. [로지스틱 회귀](map.html?s=sl&n=logreg-no-closed-form)가 그렇습니다. [경사하강법](map.html?s=sl&n=gd-update-rule)은 그런 모형에도 같은 방식으로 쓸 수 있습니다.

## 흔한 오해

<div class="cal trap">

**닫힌 해는 $\mathbf{X}$ 의 역행렬을 구하는 식이다**

$\mathbf{X}$ 는 $n \times d$ 행렬이라 보통 정사각이 아니고 역행렬이 없습니다. 역행렬을 구하는 대상은 $d \times d$ 행렬 $\mathbf{X}^T\mathbf{X}$ 입니다. $(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ 를 $\mathbf{X}^{-1}$ 로 줄여 쓸 수 없습니다.

</div>

<div class="cal trap">

**닫힌 해가 있으니 선형회귀는 늘 그 식으로 계산한다**

식이 있다는 것과 그 식으로 계산한다는 것은 다릅니다. 역행렬이 있어야 하고 계산이 무겁기 때문에 실제로는 gradient 기반의 반복법을 많이 씁니다.

</div>

## 확인 질문

<div class="cal q">

점 네 개 $(0, 0)$, $(1, 2)$, $(2, 2)$, $(3, 4)$ 에 1을 붙여 $\mathbf{X}$ 를 만들고 $\mathbf{X}^T\mathbf{X}$ 와 $\mathbf{X}^T\mathbf{y}$ 를 구하세요. normal equation 두 줄을 풀어 $\hat{w}_0$, $\hat{w}_1$ 을 구하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$\mathbf{X}$ 의 첫째 열은 모두 1이고 둘째 열은 $0, 1, 2, 3$ 입니다. 필요한 합은 $\sum_i 1 = 4$, $\sum_i x_i = 6$, $\sum_i x_i^2 = 14$, $\sum_i y_i = 8$, $\sum_i x_i y_i = 0 + 2 + 4 + 12 = 18$ 입니다.

$$
\mathbf{X}^T\mathbf{X} = \begin{bmatrix} 4 & 6 \\ 6 & 14 \end{bmatrix}, \qquad \mathbf{X}^T\mathbf{y} = \begin{bmatrix} 8 \\ 18 \end{bmatrix}
$$

normal equation은 $4w_0 + 6w_1 = 8$ 과 $6w_0 + 14w_1 = 18$ 입니다. 첫 식에서 $w_0 = 2 - 1.5w_1$ 입니다. 둘째 식에 넣으면 $12 - 9w_1 + 14w_1 = 18$ 이므로 $\hat{w}_1 = 1.2$ 이고 $\hat{w}_0 = 0.2$ 입니다.

단변량 공식으로 검산합니다. $\bar{x} = 1.5$, $\bar{y} = 2$ 이고 분자는 $(-1.5)(-2) + (-0.5)(0) + (0.5)(0) + (1.5)(2) = 6$, 분모는 $2.25 + 0.25 + 0.25 + 2.25 = 5$ 입니다. $\hat{w}_1 = 1.2$ 로 같습니다.

</details>

<div class="cal q">

같은 변수를 실수로 두 번 넣어 $\mathbf{X}$ 의 둘째 열과 셋째 열이 같아졌습니다. 해가 하나로 정해지지 않는 이유를 예측식 $\mathbf{w}^T\mathbf{x}$ 를 써서 설명하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

두 열이 같으면 그 변수의 값을 $x$ 라 할 때 예측식에서 두 계수는 $(w_2 + w_3)\,x$ 로만 나타납니다. 합 $w_2 + w_3$ 이 같기만 하면 $(1, 1)$ 이든 $(51, -49)$ 든 모든 표본에서 예측이 같고 손실도 같습니다.

손실을 가장 작게 만드는 $\mathbf{w}$ 가 끝없이 많으므로 normal equation의 해가 하나로 정해지지 않습니다. $\mathbf{X}^T\mathbf{X}$ 의 역행렬도 없습니다. 이 가운데 하나를 고르는 기준을 더하는 것이 [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)입니다.

</details>
