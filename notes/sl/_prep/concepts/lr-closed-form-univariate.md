---
title: 단변량의 닫힌 해
en: Closed-form solution in one variable
parent: linear-regression
order: 40
summary: MSE를 절편과 기울기로 각각 편미분해 0으로 두면 두 추정값이 식으로 나옵니다. 절편은 직선이 평균점을 지나게 맞추고 기울기는 두 변수가 함께 움직인 정도를 입력의 퍼짐으로 나눈 값입니다.
signal: none
related: []
---

## 왜 필요한가

가정을 세우고 우도를 쓰고 손실로 바꾸는 데까지 왔습니다. 남은 걸음은 푸는 것입니다. [가우시안 노이즈 유도](map.html?s=sl&n=lr-gaussian-noise-mse)가 남긴 문제는 다음과 같습니다.

$$
\hat{w}_1, \hat{w}_0 = \arg\min_{w_1, w_0} \frac{1}{n} \sum_{i=1}^{n} (w_1 x_i + w_0 - y_i)^2
$$

이 손실은 $w_1$, $w_0$ 의 2차식이고 아래로 볼록한 그릇 모양입니다. 그래서 편미분이 모두 0인 점이 최솟값입니다. 변수가 둘뿐이라 그 점을 손으로 풀 수 있습니다. 이렇게 식으로 떨어지는 답을 닫힌 해(closed-form solution)라고 부릅니다.

## 정의와 수식

**먼저 $w_0$ 으로 편미분합니다.**

$$
\begin{aligned}
0 &= \frac{\partial}{\partial w_0} \, \frac{1}{n} \sum_{i=1}^{n} (w_1 x_i + w_0 - y_i)^2 \\
&= \frac{1}{n} \sum_{i=1}^{n} 2\,(w_1 x_i + w_0 - y_i) \\
&= \frac{2}{n} \left( w_1 \sum_{i=1}^{n} x_i + n w_0 - \sum_{i=1}^{n} y_i \right) \\
&= 2\,(w_1 \bar{x} + w_0 - \bar{y})
\end{aligned}
$$

1. 둘째 줄: 합과 미분의 순서를 바꾸고 chain rule을 씁니다. 괄호 안을 $w_0$ 으로 미분하면 1입니다.
2. 셋째 줄: 합을 항별로 나눕니다. $w_0$ 을 $n$ 번 더하면 $n w_0$ 입니다.
3. 넷째 줄: 표본평균 $\bar{x} = \frac{1}{n} \sum_i x_i$ 와 $\bar{y} = \frac{1}{n} \sum_i y_i$ 로 묶습니다.

따라서 절편의 추정값은 다음과 같습니다.

$$
\hat{w}_0 = \bar{y} - \hat{w}_1 \bar{x}
$$

옮겨 쓰면 $\bar{y} = \hat{w}_1 \bar{x} + \hat{w}_0$ 입니다. 구한 직선은 항상 평균점 $(\bar{x}, \bar{y})$ 를 지납니다.

**다음으로 $w_1$ 으로 편미분합니다.** 괄호 안을 $w_1$ 으로 미분하면 $x_i$ 가 나옵니다.

$$
\begin{aligned}
0 &= \frac{\partial}{\partial w_1} \, \frac{1}{n} \sum_{i=1}^{n} (w_1 x_i + w_0 - y_i)^2 \\
&= \frac{2}{n} \sum_{i=1}^{n} (w_1 x_i + w_0 - y_i)\, x_i \\
&= \frac{2}{n} \left( w_1 \sum_{i=1}^{n} x_i^2 + w_0\, n\bar{x} - \sum_{i=1}^{n} x_i y_i \right)
\end{aligned}
$$

괄호 안이 0이어야 합니다. 여기에 $w_0 = \bar{y} - w_1 \bar{x}$ 를 넣어 $w_0$ 을 없앱니다.

$$
\begin{aligned}
& w_1 \sum_{i=1}^{n} x_i^2 + (\bar{y} - w_1 \bar{x})\, n\bar{x} - \sum_{i=1}^{n} x_i y_i = 0 \\
& w_1 \left( \sum_{i=1}^{n} x_i^2 - n\bar{x}^2 \right) = \sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}
\end{aligned}
$$

양변을 나누면 기울기의 추정값이 나옵니다.

$$
\begin{aligned}
\hat{w}_1 &= \frac{\sum_{i=1}^{n} x_i y_i - n\bar{x}\bar{y}}{\sum_{i=1}^{n} x_i^2 - n\bar{x}^2} \\
&= \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n} (x_i - \bar{x})^2}
\end{aligned}
$$

둘째 줄은 $\sum_i (x_i - \bar{x})(y_i - \bar{y}) = \sum_i x_i y_i - n\bar{x}\bar{y}$ 와 $\sum_i (x_i - \bar{x})^2 = \sum_i x_i^2 - n\bar{x}^2$ 를 쓴 것입니다.

분자는 $x$ 와 $y$ 가 각자의 평균에서 같은 쪽으로 함께 벗어난 정도입니다. 분모는 $x$ 가 퍼진 정도입니다. $x$ 가 평균보다 클 때 $y$ 도 평균보다 크면 기울기가 양수가 됩니다.

순서에 주의합니다. $w_0$ 의 식을 먼저 구해 두어야 $w_1$ 의 식에서 $w_0$ 을 한 번에 없앨 수 있습니다.

**수치로 확인합니다.** 점 세 개 $(0, 1)$, $(1, 1)$, $(2, 4)$ 를 씁니다.

- $\bar{x} = 1$, $\bar{y} = 2$ 입니다.
- $x_i - \bar{x}$ 는 $-1, 0, 1$ 이고 $y_i - \bar{y}$ 는 $-1, -1, 2$ 입니다.
- 분자는 $(-1)(-1) + (0)(-1) + (1)(2) = 3$ 이고 분모는 $1 + 0 + 1 = 2$ 입니다.
- $\hat{w}_1 = \frac{3}{2}$ 이고 $\hat{w}_0 = 2 - \frac{3}{2} \cdot 1 = \frac{1}{2}$ 입니다.

직선은 $y = 1.5x + 0.5$ 입니다. 예측은 $0.5, 2, 3.5$ 이고 예측 빼기 정답은 $-0.5, 1, -0.5$ 입니다. 모두 더하면 0입니다. $w_0$ 으로 편미분한 조건이 바로 이 합이 0이라는 것이었습니다. $x_i$ 를 곱해 더한 $0 \cdot (-0.5) + 1 \cdot 1 + 2 \cdot (-0.5)$ 도 0입니다. 이것은 $w_1$ 으로 편미분한 조건입니다.

## 흔한 오해

<div class="cal trap">

**절편의 추정값은 $y$ 의 평균이다**

$\hat{w}_0 = \bar{y} - \hat{w}_1 \bar{x}$ 입니다. $\bar{y}$ 와 같아지는 것은 $\bar{x} = 0$ 이거나 기울기가 0일 때뿐입니다. 항상 성립하는 것은 직선이 $(\bar{x}, \bar{y})$ 를 지난다는 사실입니다.

</div>

<div class="cal trap">

**기울기 식의 분모는 $y$ 가 퍼진 정도다**

분모는 $\sum_i (x_i - \bar{x})^2$ 으로 $x$ 가 퍼진 정도입니다. 모든 $x_i$ 가 같은 값이면 분모가 0이 되어 기울기를 정할 수 없습니다. 세로로 한 줄에 선 점들에는 직선을 하나로 고를 수 없다는 뜻입니다. 다변량에서는 이 조건이 [역행렬이 있을 조건](map.html?s=sl&n=lr-multivariate-normal-equation)으로 바뀝니다.

</div>

## 확인 질문

<div class="cal q">

점 세 개 $(-1, 0)$, $(0, 1)$, $(1, 5)$ 에 대해 $\hat{w}_1$ 과 $\hat{w}_0$ 을 구하세요. 구한 직선의 예측 빼기 정답을 모두 더하면 얼마입니까?

</div>

<details class="solve">
<summary>답 보기</summary>

$\bar{x} = 0$, $\bar{y} = 2$ 입니다. $x_i - \bar{x}$ 는 $-1, 0, 1$ 이고 $y_i - \bar{y}$ 는 $-2, -1, 3$ 입니다.

분자는 $(-1)(-2) + (0)(-1) + (1)(3) = 5$ 이고 분모는 $1 + 0 + 1 = 2$ 입니다. 따라서 $\hat{w}_1 = \frac{5}{2}$ 이고 $\hat{w}_0 = 2 - \frac{5}{2} \cdot 0 = 2$ 입니다.

직선 $y = 2.5x + 2$ 의 예측은 $-0.5, 2, 4.5$ 이고 예측 빼기 정답은 $-0.5, 1, -0.5$ 입니다. 합은 0입니다. $w_0$ 으로 편미분해 0으로 둔 조건이므로 어떤 데이터에서도 0이 나와야 합니다.

</details>

<div class="cal q">

절편이 없는 모형 $y = w_1 x + \epsilon$ 으로 가정을 바꾸면 $\hat{w}_1$ 은 어떤 식이 됩니까? 미분한 줄부터 쓰세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$$
\begin{aligned}
0 &= \frac{\partial}{\partial w_1} \, \frac{1}{n} \sum_{i=1}^{n} (w_1 x_i - y_i)^2 \\
&= \frac{2}{n} \sum_{i=1}^{n} (w_1 x_i - y_i)\, x_i
\end{aligned}
$$

이므로

$$
\hat{w}_1 = \frac{\sum_{i=1}^{n} x_i y_i}{\sum_{i=1}^{n} x_i^2}
$$

입니다. 평균을 빼는 항이 사라졌습니다. 절편이 있는 식에서 $\bar{x} = 0$, $\bar{y} = 0$ 인 경우와 같은 꼴입니다. 절편은 데이터를 평균점 기준으로 옮겨 놓는 일을 맡고 있었습니다.

</details>
