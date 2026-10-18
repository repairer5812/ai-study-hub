---
title: 라플라스 prior를 두면 lasso가 나온다
en: Lasso as MAP with a Laplace prior
parent: linear-regression
order: 110
summary: prior만 라플라스로 바꾸면 prior 쪽 두 줄이 달라져 벌점이 계수 절댓값의 합으로 바뀝니다. 우도 쪽과 손실은 그대로입니다. 일반적인 다변량 문제에서는 단순한 행렬 닫힌 해 대신 반복 알고리즘으로 풉니다.
signal: emph
related: [map-posterior]
---

## 왜 필요한가

[ridge 유도](map.html?s=sl&n=ridge-map-gaussian-prior)에서 벌점의 모양은 prior의 지수 안에서 왔습니다. 그렇다면 prior를 바꾸면 벌점이 바뀌어야 합니다. 노이즈를 가우시안에서 라플라스로 바꿨을 때 손실이 [제곱에서 절댓값으로](map.html?s=sl&n=lr-laplace-noise-mae) 바뀌었습니다. 같은 실험을 이번에는 prior 쪽에서 합니다.

결과로 나오는 lasso는 ridge와 성질이 다릅니다. 일부 계수를 정확히 0으로 만듭니다. 그 차이는 [다음 노드](map.html?s=sl&n=ridge-vs-lasso)에서 보고 여기서는 유도에 집중합니다.

## 정의와 수식

**prior.** 계수의 성분마다 독립으로 가운데가 0이고 척도가 $\tau$ 인 라플라스를 둡니다. 성분 하나의 밀도는 $\frac{1}{2\tau} \exp\!\left( -\frac{\lvert w_j \rvert}{\tau} \right)$ 이고 모두 곱하면 다음과 같습니다.

$$
P(\mathbf{w}) \propto \exp\!\left( -\frac{\lVert \mathbf{w} \rVert_1}{\tau} \right), \qquad \lVert \mathbf{w} \rVert_1 = \sum_{j} \lvert w_j \rvert
$$

가우시안 prior처럼 0에서 가장 높고 멀어질수록 낮아집니다. 지수 안이 제곱합이 아니라 절댓값의 합이라는 점만 다릅니다.

**출발점은 ridge와 같습니다.**

$$
\begin{aligned}
\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \Big[ & \underbrace{-\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w})}_{\text{likelihood term}} \\
& \underbrace{- \log P(\mathbf{w})}_{\text{prior term}} \Big]
\end{aligned}
$$

**우도 쪽.** 노이즈는 여전히 가우시안이므로 ridge 때와 글자 하나 다르지 않습니다.

$$
\begin{aligned}
& -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&\quad = \frac{1}{2\sigma^2} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \text{const.}
\end{aligned}
$$

**prior 쪽.** 달라지는 곳은 여기입니다.

$$
\begin{aligned}
-\log P(\mathbf{w})
&= -\log \left[ C \exp\!\left( -\frac{\lVert \mathbf{w} \rVert_1}{\tau} \right) \right] \\
&= -\log C + \frac{\lVert \mathbf{w} \rVert_1}{\tau}
\end{aligned}
$$

**더하고 정리합니다.**

$$
\begin{aligned}
\hat{\mathbf{w}}
&= \arg\min_{\mathbf{w}} \frac{1}{2\sigma^2} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \frac{1}{\tau} \lVert \mathbf{w} \rVert_1 \\
&= \arg\min_{\mathbf{w}} \frac{1}{n} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \lambda \lVert \mathbf{w} \rVert_1
\end{aligned}
$$

둘째 줄은 ridge 때처럼 전체에 $\frac{2\sigma^2}{n}$ 을 곱한 것입니다. 벌점 앞의 상수는 $\lambda = \frac{2\sigma^2}{n\tau}$ 로 묶였습니다. 이 목적함수가 lasso regression이고 뒤에 붙은 항이 L1 벌점입니다.

**ridge와 나란히 놓습니다.** 달라진 줄은 셋입니다.

| | ridge | lasso |
|---|---|---|
| prior의 지수 안 | $-\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ | $-\frac{\lVert \mathbf{w} \rVert_1}{\tau}$ |
| $-\log P(\mathbf{w})$ 에 남는 항 | $\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ | $\frac{\lVert \mathbf{w} \rVert_1}{\tau}$ |
| 벌점 | $\lambda \lVert \mathbf{w} \rVert_2^2$ | $\lambda \lVert \mathbf{w} \rVert_1$ |
| 우도 쪽과 손실 | 제곱 오차의 평균 | 같다 |

<div class="cal key">

**손실은 그대로이고 벌점만 바뀝니다**

라플라스 prior가 바꾼 것은 prior 쪽 두 줄과 그 결과인 벌점입니다. 손실은 여전히 MSE입니다. 손실을 정하는 것은 노이즈의 분포이고 벌점을 정하는 것은 prior의 분포입니다.

</div>

**일반적인 다변량 문제는 반복법으로 풉니다.** ridge에서는 벌점을 미분하면 $2\lambda\mathbf{w}$ 가 나와서 gradient를 0으로 둔 식이 $\mathbf{w}$ 의 1차 연립방정식이었습니다. L1 벌점은 다릅니다. $\lvert w_j \rvert$ 는 $w_j = 0$ 에서 꺾여 미분되지 않습니다. 0이 아닌 곳에서 미분하면 $\text{sign}(w_j)$ 가 나옵니다. 부호는 아직 모르는 해에 달려 있어서 역행렬 한 번으로 풀리는 식이 되지 않습니다. 그래서 lasso는 반복 알고리즘으로 풉니다.

## 흔한 오해

<div class="cal trap">

**라플라스 prior를 쓰면 손실도 절댓값 오차가 된다**

아닙니다. 라플라스가 노이즈의 분포일 때는 손실이 MAE가 되고 prior의 분포일 때는 벌점이 L1이 됩니다. 같은 분포라도 어디에 두었느냐에 따라 바뀌는 자리가 다릅니다. lasso의 손실은 MSE입니다.

</div>

<div class="cal trap">

**L1 벌점은 미분이 안 되니 lasso는 풀 수 없다**

각 계수의 절댓값은 $w_j=0$ 에서 꺾이지만 최적화가 불가능한 것은 아닙니다. 일반적인 다변량 문제는 반복 알고리즘으로 풀고, 계수가 하나인 경우처럼 직접 식으로 풀 수 있는 특별한 경우도 있습니다.

</div>

## 확인 질문

<div class="cal q">

$\mathbf{w} = (3, -4, 0)^T$ 일 때 $\lVert \mathbf{w} \rVert_1$ 과 $\lVert \mathbf{w} \rVert_2^2$ 을 구하세요. 이 $\mathbf{w}$ 에서 가우시안 prior와 라플라스 prior의 $-\log P(\mathbf{w})$ 를 상수 $-\log C$ 를 빼고 각각 쓰세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$\lVert \mathbf{w} \rVert_1 = 3 + 4 + 0 = 7$ 이고 $\lVert \mathbf{w} \rVert_2^2 = 9 + 16 + 0 = 25$ 입니다. L2 벌점에 들어가는 것은 노름 5가 아니라 그 제곱인 25입니다.

상수를 뺀 $-\log P(\mathbf{w})$ 는 가우시안 prior에서 $\frac{25}{2\tau^2}$ 이고 라플라스 prior에서 $\frac{7}{\tau}$ 입니다.

</details>

<div class="cal q">

ridge 유도를 옆에 두고 lasso 유도를 prior부터 최종 목적함수까지 직접 써 보세요. 글자가 달라지는 줄을 모두 찾고 우도 쪽에 달라지는 줄이 있는지 확인하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

달라지는 줄은 세 군데입니다.

1. prior의 밀도: 지수 안이 $-\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 에서 $-\frac{\lVert \mathbf{w} \rVert_1}{\tau}$ 로 바뀝니다.
2. prior 쪽 두 줄: 남는 항이 $\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 에서 $\frac{\lVert \mathbf{w} \rVert_1}{\tau}$ 로 바뀝니다.
3. 더한 뒤의 두 줄: 둘째 항이 $\frac{1}{2\tau^2}\,\mathbf{w}^T\mathbf{w}$ 에서 $\frac{1}{\tau} \lVert \mathbf{w} \rVert_1$ 로, $\lambda \lVert \mathbf{w} \rVert_2^2$ 에서 $\lambda \lVert \mathbf{w} \rVert_1$ 로 바뀝니다.

우도 쪽에는 달라지는 줄이 없습니다. 노이즈의 가정을 건드리지 않았기 때문입니다.

</details>
