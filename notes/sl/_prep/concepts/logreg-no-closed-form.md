---
title: 닫힌 해가 없다
en: No closed-form solution
parent: logistic-regression
order: 90
summary: 로지스틱 회귀의 목적함수는 미분할 수 있지만 미분을 0으로 둔 식을 계수에 대해 풀 수 없습니다. 계수가 지수 안에 들어 있기 때문이고 표본이 여러 개인 것과는 상관이 없습니다.
signal: none
related: [lr-multivariate-normal-equation, gd-update-rule]
---

## 왜 필요한가

목적함수를 얻었으니 선형회귀 때처럼 미분해서 0으로 놓고 풀면 될 것 같습니다. 미분까지는 됩니다. 막히는 곳은 그다음이고 0으로 놓은 식을 "$\mathbf{w}$ 는 얼마다" 꼴로 정리할 수가 없습니다.

어디서 왜 막히는지를 식으로 봐 두면 다음 가지인 경사하강법이 왜 필요한지가 분명해집니다. 닫힌 해(closed-form solution)는 답을 유한한 식 하나로 바로 적을 수 있는 경우를 가리키는 말입니다.

## 정의와 수식

목적함수는 다음과 같고 레이블은 $y_i \in \{-1, +1\}$ 입니다.

$$
\ell(\mathbf{w}) = \sum_{i=1}^{n} \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big)
$$

한 항을 $\mathbf{w}$ 로 미분합니다.

$$
\begin{aligned}
& \frac{\partial}{\partial\mathbf{w}} \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big) \\
&= \frac{e^{-y_i\mathbf{w}^T\mathbf{x}_i}}{1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}} \cdot (-y_i\,\mathbf{x}_i) \\
&= -\frac{y_i\,\mathbf{x}_i}{1+e^{y_i\mathbf{w}^T\mathbf{x}_i}}
\end{aligned}
$$

1. 첫째 등호: chain rule입니다. $\log(1+e^{u})$ 를 $u$ 로 미분하면 $\frac{e^{u}}{1+e^{u}}$ 이고 $u = -y_i\mathbf{w}^T\mathbf{x}_i$ 를 $\mathbf{w}$ 로 미분하면 $-y_i\mathbf{x}_i$ 입니다.
2. 둘째 등호: 분자와 분모에 $e^{y_i\mathbf{w}^T\mathbf{x}_i}$ 를 곱해 정리합니다.

모든 표본에 대해 더하면 gradient가 나옵니다. 여기까지는 아무 문제가 없습니다.

$$
g(\mathbf{w}) = \frac{\partial \ell(\mathbf{w})}{\partial \mathbf{w}} = -\sum_{i=1}^{n} \frac{y_i\,\mathbf{x}_i}{1+e^{y_i\mathbf{w}^T\mathbf{x}_i}}
$$

이제 이것을 영벡터로 둡니다.

$$
\sum_{i=1}^{n} \frac{y_i\,\mathbf{x}_i}{1+e^{y_i\mathbf{w}^T\mathbf{x}_i}} = \mathbf{0}
$$

구하려는 $\mathbf{w}$ 가 표본마다 지수 안에, 그것도 분모에 들어 있습니다. 항을 옮기거나 역행렬을 곱해서 $\mathbf{w}$ 를 한쪽으로 모을 방법이 없습니다.

선형회귀와 견주면 차이가 한눈에 들어옵니다. [다변량 선형회귀](map.html?s=sl&n=lr-multivariate-normal-equation)에서는 같은 자리에 $\mathbf{w}$ 의 1차식이 나왔습니다.

| | 선형회귀 | 로지스틱 회귀 |
|---|---|---|
| gradient를 0으로 둔 식 | $\mathbf{X}^T\mathbf{X}\mathbf{w} = \mathbf{X}^T\mathbf{y}$ | $\sum_i \frac{y_i\mathbf{x}_i}{1+e^{y_i\mathbf{w}^T\mathbf{x}_i}} = \mathbf{0}$ |
| $\mathbf{w}$ 가 놓인 자리 | 행렬에 곱해진 1차 항 | 지수함수 안 |
| 식의 종류 | 연립일차방정식 | 일차방정식이 아니다 |
| 푸는 법 | 역행렬을 곱해 한 번에 | 반복해서 찾는다 |

표본의 수는 두 모형이 다르지 않습니다. 선형회귀도 표본마다 항이 하나씩 생기지만 그 합이 $\mathbf{X}^T\mathbf{X}\mathbf{w}$ 라는 1차식 하나로 묶입니다. 로지스틱 회귀의 합은 그렇게 묶이지 않습니다. 차이를 만든 것은 손실이 $\log(1+e^{(\cdot)})$ 꼴이라는 점입니다.

식으로 못 푼다고 해서 답을 못 찾는 것은 아닙니다. gradient를 계산할 수 있으므로 gradient가 0에 가까워질 때까지 $\mathbf{w}$ 를 조금씩 고쳐 가면 됩니다. 그 방법이 [경사하강법의 갱신식](map.html?s=sl&n=gd-update-rule)입니다. 이 목적함수는 $\mathbf{w}$ 에 대해 [convex](map.html?s=sl&n=gd-convexity-convergence)라서 gradient가 0인 점을 찾으면 그 점이 가장 낮은 점입니다. convex라는 사실의 증명은 여기서 다루지 않습니다.

## 흔한 오해

<div class="cal trap">

**표본이 여러 개라서 모든 식을 한꺼번에 만족시킬 수 없어 닫힌 해가 없다**

표본이 여러 개인 것은 선형회귀도 같고 선형회귀에는 닫힌 해가 있습니다. 이유는 식의 꼴입니다. $\mathbf{w}$ 가 지수 안에 있어서 gradient를 0으로 둔 식을 $\mathbf{w}$ 에 대해 정리할 수 없습니다.

</div>

<div class="cal trap">

**닫힌 해가 없다는 것은 목적함수를 미분할 수 없다는 뜻이다**

미분은 됩니다. gradient를 식으로 쓸 수 있고 값도 계산할 수 있습니다. 못 하는 일은 그 식을 0으로 두고 $\mathbf{w}$ 에 대해 푸는 것 하나입니다.

</div>

## 확인 질문

<div class="cal q">

$\log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big)$ 를 $\mathbf{w}$ 로 직접 미분해 본문의 결과가 나오는지 확인하세요. 그다음 선형회귀와 로지스틱 회귀에서 gradient를 0으로 둔 식을 나란히 쓰고 $\mathbf{w}$ 가 놓인 자리에 표시해 보세요. "표본이 많아서 못 푼다"는 설명이 틀린 이유도 한 문장으로 적어 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$u = -y_i\mathbf{w}^T\mathbf{x}_i$ 로 두면 chain rule에서

$$
\begin{aligned}
\frac{e^{u}}{1+e^{u}} \cdot (-y_i\,\mathbf{x}_i)
&= -\frac{y_i\,\mathbf{x}_i}{1+e^{-u}} \\
&= -\frac{y_i\,\mathbf{x}_i}{1+e^{y_i\mathbf{w}^T\mathbf{x}_i}}
\end{aligned}
$$

입니다. 첫째 등호는 분자와 분모를 $e^{u}$ 로 나눈 것이고 둘째 등호는 $u$ 를 되돌려 넣은 것입니다.

선형회귀는 $\mathbf{X}^T\mathbf{X}\mathbf{w} = \mathbf{X}^T\mathbf{y}$ 이고 $\mathbf{w}$ 는 행렬에 곱해진 1차 항으로 한 번 나옵니다. 로지스틱 회귀는 $\sum_i \frac{y_i\mathbf{x}_i}{1+e^{y_i\mathbf{w}^T\mathbf{x}_i}} = \mathbf{0}$ 이고 $\mathbf{w}$ 는 항마다 지수 안에 나옵니다.

선형회귀도 표본이 많지만 닫힌 해가 있으므로 표본의 수는 이유가 될 수 없습니다.

</details>
