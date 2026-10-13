---
title: 가우시안 prior를 두면 ridge가 나온다
en: Ridge as MAP with a Gaussian prior
parent: linear-regression
order: 100
summary: 계수가 0 근처에 있을 것이라는 믿음을 가우시안 prior로 적고 MAP로 풉니다. 우도 쪽 유도는 그대로이고 손실 뒤에 계수 제곱합에 비례하는 벌점 하나가 붙습니다.
signal: emph
related: [map-posterior, logreg-map]
---

## 왜 필요한가

데이터를 똑같이 잘 맞추는 계수가 여럿일 때가 있습니다. 학습 표본이 $\mathbf{x} = (1, 1)^T$, $y = 2$ 하나뿐이라고 합시다. $w_1 + w_2 = 2$ 이기만 하면 손실은 0입니다. $(1, 1)$ 도 되고 $(51, -49)$ 도 되고 $(1001, -999)$ 도 됩니다.

새 입력에서 첫째 변수가 조금 달라져 $\mathbf{x} = (1.1, 1)^T$ 이 들어오면 세 계수의 예측이 갈라집니다.

| 계수 $(w_1, w_2)$ | 학습 표본의 예측 | 새 입력의 예측 |
|---|---|---|
| $(1, 1)$ | $2$ | $2.1$ |
| $(51, -49)$ | $2$ | $7.1$ |
| $(1001, -999)$ | $2$ | $102.1$ |

입력이 0.1 움직였을 때 예측은 $0.1 \times w_1$ 만큼 움직입니다. 계수가 크면 입력의 작은 흔들림이 예측에서 크게 불어납니다. 그래서 맞추는 정도가 같다면 작은 계수를 고르고 싶습니다. MLE에는 이 선호를 적어 넣을 자리가 없습니다. [MAP](map.html?s=sl&n=map-posterior)에는 prior라는 자리가 있습니다.

## 정의와 수식

**prior.** "계수는 0 근처에 있다"를 평균이 0인 가우시안으로 적습니다. 성분마다 독립으로 $w_j \sim \mathcal{N}(0, \tau^2)$ 이라고 두고 밀도를 모두 곱하면 다음과 같습니다.

$$
P(\mathbf{w}) \propto \exp\!\left( -\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \right)
$$

$\mathbf{w}^T\mathbf{w} = \sum_j w_j^2$ 입니다. 앞에 곱해지는 정규화 상수는 $\mathbf{w}$ 와 무관해서 곧 사라지므로 비례 기호로만 적습니다. 지수의 분모에 들어가는 것은 노이즈의 $\sigma^2$ 이 아니라 prior의 $\tau^2$ 입니다.

**출발점.** [MAP와 posterior](map.html?s=sl&n=map-posterior)에서 본 대로 posterior를 최대화하는 일은 음의 로그우도에 $-\log P(\mathbf{w})$ 를 더한 것을 최소화하는 일입니다.

$$
\begin{aligned}
\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \Big[ & \underbrace{-\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w})}_{\text{likelihood term}} \\
& \underbrace{- \log P(\mathbf{w})}_{\text{prior term}} \Big]
\end{aligned}
$$

두 항은 서로 다른 가정에서 나옵니다. 따로 전개해서 더합니다.

**우도 쪽.** 노이즈가 가우시안이면 [MSE를 얻은 유도](map.html?s=sl&n=lr-gaussian-noise-mse)와 같습니다. 상수를 버리기 직전의 모습은 다음과 같습니다.

$$
\begin{aligned}
& -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&\quad = \frac{1}{2\sigma^2} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \text{const.}
\end{aligned}
$$

**prior 쪽.** 정규화 상수를 $C$ 라고 쓰고 음의 로그를 취합니다.

$$
\begin{aligned}
-\log P(\mathbf{w})
&= -\log \left[ C \exp\!\left( -\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \right) \right] \\
&= -\log C + \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}
\end{aligned}
$$

**더하고 정리합니다.** $\mathbf{w}$ 와 무관한 상수를 모두 지웁니다.

$$
\begin{aligned}
\hat{\mathbf{w}}
&= \arg\min_{\mathbf{w}} \frac{1}{2\sigma^2} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \frac{1}{2\tau^2}\, \mathbf{w}^T\mathbf{w} \\
&= \arg\min_{\mathbf{w}} \frac{1}{n} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \lambda \lVert \mathbf{w} \rVert_2^2
\end{aligned}
$$

둘째 줄은 전체에 양의 상수 $\frac{2\sigma^2}{n}$ 을 곱한 것입니다. 최솟값의 위치는 바뀌지 않습니다. 벌점 앞의 상수는 $\lambda = \frac{\sigma^2}{n\tau^2}$ 로 묶였고 $\lVert \mathbf{w} \rVert_2^2 = \mathbf{w}^T\mathbf{w}$ 입니다. 실제로는 $\sigma$ 와 $\tau$ 를 따로 정하지 않고 $\lambda$ 하나를 validation으로 고릅니다.

이 목적함수를 ridge regression이라고 부릅니다. 뒤에 붙은 항은 L2 벌점입니다.

<div class="cal key">

**prior가 바꾸는 것은 prior 쪽 두 줄뿐입니다**

우도 쪽은 MLE 때의 유도 그대로입니다. 가우시안 prior의 지수 안에 있던 $\mathbf{w}^T\mathbf{w}$ 가 로그를 지나 벌점으로 남았습니다. 노이즈의 지수 안에 있던 제곱이 손실로 남은 것과 같은 일이 prior 쪽에서 한 번 더 일어났습니다.

</div>

**닫힌 해와 $\lambda\mathbf{I}$.** ridge의 목적함수도 $\mathbf{w}$ 의 2차식이라 미분해서 풀 수 있습니다. $\lVert \mathbf{X}\mathbf{w} - \mathbf{y} \rVert_2^2 + \lambda \lVert \mathbf{w} \rVert_2^2$ 을 최소화하는 해는 다음과 같습니다.

$$
\hat{\mathbf{w}} = (\mathbf{X}^T\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^T\mathbf{y}
$$

[prior가 없을 때의 해](map.html?s=sl&n=lr-multivariate-normal-equation)와 견주면 역행렬 안에 $\lambda\mathbf{I}$ 하나가 더 들어갔습니다. 손실 앞에 $\frac{1}{n}$ 을 붙인 꼴에서는 같은 자리에 $n\lambda\mathbf{I}$ 가 들어갑니다. 상수를 어디에 묶었느냐의 차이이고 모양은 같습니다.

$\lambda\mathbf{I}$ 는 $\mathbf{X}^T\mathbf{X}$ 의 대각선에 양수를 더합니다. 그러면 $\mathbf{X}^T\mathbf{X}$ 에 역행렬이 없던 경우에도 역행렬이 생깁니다. 맨 앞의 예처럼 해가 여럿이던 문제에서 ridge가 하나를 골라 준다는 것이 식에서는 이렇게 나타납니다.

**가정을 바꾸면 달라지는 줄은 다음과 같습니다.**

- prior를 라플라스로 바꾸면 prior 쪽 두 줄의 $\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 가 $\frac{\lVert \mathbf{w} \rVert_1}{\tau}$ 로 바뀝니다. [lasso](map.html?s=sl&n=lasso-map-laplace-prior)입니다.
- 노이즈를 라플라스로 바꾸면 우도 쪽의 제곱합이 절댓값의 합으로 바뀝니다. 벌점은 그대로입니다. [조합표](map.html?s=sl&n=noise-prior-combination)에 모아 두었습니다.
- 우도 쪽을 로지스틱 회귀의 것으로 바꿔도 prior 쪽은 그대로라 같은 벌점이 붙습니다. [로지스틱 회귀의 MAP](map.html?s=sl&n=logreg-map)입니다.

## 흔한 오해

<div class="cal trap">

**L2 벌점은 과적합을 막으려고 손실에 임의로 덧붙인 항이다**

MAP 관점에서는 유도되는 항입니다. 계수가 평균 0인 가우시안을 따른다는 prior를 두면 $-\log P(\mathbf{w})$ 가 정확히 이 꼴이 됩니다. 벌점의 모양을 고르는 일은 prior의 분포를 고르는 일입니다.

</div>

<div class="cal trap">

**prior를 넣었으니 우도 쪽 유도도 처음부터 다시 해야 한다**

우도 쪽은 한 글자도 바뀌지 않습니다. posterior는 우도와 prior의 곱에 비례하고 로그를 취하면 곱이 합이 됩니다. 그래서 두 쪽이 섞이지 않습니다.

</div>

## 확인 질문

<div class="cal q">

prior의 평균을 0이 아니라 어떤 벡터 $\mathbf{m}$ 으로 바꿉니다. $P(\mathbf{w})$ 와 prior 쪽 두 줄을 다시 쓰고 최종 목적함수의 벌점이 어떻게 달라지는지 쓰세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$$
P(\mathbf{w}) \propto \exp\!\left( -\frac{(\mathbf{w} - \mathbf{m})^T(\mathbf{w} - \mathbf{m})}{2\tau^2} \right)
$$

$$
\begin{aligned}
& -\log P(\mathbf{w}) \\
&\quad = -\log \left[ C \exp\!\left( -\frac{\lVert \mathbf{w} - \mathbf{m} \rVert_2^2}{2\tau^2} \right) \right] \\
&\quad = -\log C + \frac{\lVert \mathbf{w} - \mathbf{m} \rVert_2^2}{2\tau^2}
\end{aligned}
$$

벌점이 $\lambda \lVert \mathbf{w} - \mathbf{m} \rVert_2^2$ 가 됩니다. 계수를 0이 아니라 $\mathbf{m}$ 쪽으로 당깁니다. 우도 쪽은 그대로입니다. ridge가 계수를 0으로 당기는 까닭은 prior의 평균을 0으로 두었기 때문입니다.

</details>

<div class="cal q">

맨 앞의 예처럼 학습 표본이 $\mathbf{x} = (1, 1)^T$, $y = 2$ 하나뿐입니다. $\lVert \mathbf{X}\mathbf{w} - \mathbf{y} \rVert_2^2 + \lambda \lVert \mathbf{w} \rVert_2^2$ 을 최소화하는 해를 닫힌 해의 식으로 구하세요. $\lambda = 2$ 일 때의 해와 $\lambda$ 가 0에 가까울 때의 해는 각각 무엇입니까?

</div>

<details class="solve">
<summary>답 보기</summary>

$\mathbf{X}$ 는 행이 하나인 행렬 $\begin{bmatrix} 1 & 1 \end{bmatrix}$ 입니다.

$$
\begin{aligned}
\mathbf{X}^T\mathbf{X} + \lambda\mathbf{I} &= \begin{bmatrix} 1 + \lambda & 1 \\ 1 & 1 + \lambda \end{bmatrix} \\[0.4em]
\mathbf{X}^T\mathbf{y} &= \begin{bmatrix} 2 \\ 2 \end{bmatrix}
\end{aligned}
$$

풀 식은 $(1 + \lambda)\,w_1 + w_2 = 2$ 와 $w_1 + (1 + \lambda)\,w_2 = 2$ 입니다. 두 식을 빼면 $\lambda\,(w_1 - w_2) = 0$ 이므로 $w_1 = w_2$ 입니다. 다시 넣으면

$$
w_1 = w_2 = \frac{2}{2 + \lambda}
$$

입니다. $\lambda = 2$ 이면 $(0.5, 0.5)$ 입니다. $\lambda$ 가 0에 가까우면 $(1, 1)$ 에 가까워집니다.

$\lambda = 0$ 이면 행렬의 두 행이 같아 역행렬이 없습니다. $\lambda$ 가 조금이라도 양수이면 해가 하나로 정해집니다. 그 해는 $w_1 + w_2 = 2$ 를 만족하는 계수들 가운데 가장 작은 $(1, 1)$ 근처이고 $(51, -49)$ 같은 계수는 뽑히지 않습니다. $\lambda$ 를 키우면 해가 0 쪽으로 더 당겨집니다.

</details>
