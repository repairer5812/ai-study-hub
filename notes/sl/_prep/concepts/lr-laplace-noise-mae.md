---
title: 라플라스 노이즈를 가정하면 MAE가 나온다
en: MLE under Laplace noise gives the absolute loss
parent: linear-regression
order: 30
summary: 노이즈를 라플라스로 바꾸면 같은 다섯 줄 가운데 새로 쓰는 것은 밀도를 넣는 한 줄뿐입니다. 제곱 대신 절댓값 오차의 평균을 최소화하는 문제가 남습니다.
signal: emph
related: [lr-gaussian-noise-mse, logreg-mle-objective, mle-distribution-parameters, loss-function]
---

## 왜 필요한가

[가우시안 노이즈 유도](map.html?s=sl&n=lr-gaussian-noise-mse)는 "가우시안을 가정했더니 제곱이 나왔다"로 끝났습니다. 이 말이 맞는지 확인하는 가장 좋은 방법은 가정을 바꿔 보는 것입니다. 노이즈의 분포를 라플라스로 바꾸고 같은 순서를 밟으면 제곱이 있던 자리에 절댓값이 남습니다.

이 유도를 한 번 써 보면 두 가지를 얻습니다. 손실이 가정에서 나온다는 말이 분포 하나에만 해당하는 우연이 아님을 확인합니다. 그리고 처음 보는 분포가 주어져도 어느 줄만 고치면 되는지 알게 됩니다.

## 정의와 수식

라플라스 분포는 가운데 $\mu$ 와 척도 $b > 0$ 로 정해집니다.

$$
P(y ; \mu, b) = \frac{1}{2b} \exp\!\left( -\frac{\lvert y - \mu \rvert}{b} \right)
$$

가우시안과 견주면 지수 안이 제곱이 아니라 절댓값입니다. 척도를 $\tau$ 로 적는 자료도 있습니다. 이 지도에서는 뒤에 나오는 prior의 척도 $\tau$ 와 한 식에 같이 쓰일 때 헷갈리지 않도록 $b$ 로 적습니다.

모형에서는 노이즈의 분포만 바꿉니다.

$$
y = w_1 x + w_0 + \epsilon, \qquad \epsilon \sim \text{Laplace}(0, b)
$$

상수를 더하면 가운데만 옮겨지는 성질은 라플라스도 같습니다. 그래서 $x_i$ 가 주어졌을 때 $y_i$ 는 가운데가 $w_1 x_i + w_0$ 인 라플라스를 따릅니다.

$$
\begin{aligned}
& P(y_i \mid x_i ; w_1, w_0) \\
&\quad = \frac{1}{2b} \exp\!\left( -\frac{\lvert w_1 x_i + w_0 - y_i \rvert}{b} \right)
\end{aligned}
$$

이제 가우시안 때와 같은 다섯 줄을 씁니다.

$$
\begin{aligned}
\hat{w}_1, \hat{w}_0
&= \arg\max_{w_1, w_0} \prod_{i=1}^{n} P(y_i \mid x_i ; w_1, w_0) \\
&= \arg\max_{w_1, w_0} \sum_{i=1}^{n} \log P(y_i \mid x_i ; w_1, w_0) \\
&= \arg\max_{w_1, w_0} \sum_{i=1}^{n} \bigg[ \log \frac{1}{2b} \\
&\qquad\qquad\qquad - \frac{\lvert w_1 x_i + w_0 - y_i \rvert}{b} \bigg] \\
&= \arg\min_{w_1, w_0} \frac{1}{b} \sum_{i=1}^{n} \lvert w_1 x_i + w_0 - y_i \rvert \\
&= \arg\min_{w_1, w_0} \frac{1}{n} \sum_{i=1}^{n} \lvert w_1 x_i + w_0 - y_i \rvert
\end{aligned}
$$

1. 첫째 줄: 표본이 i.i.d. 이므로 전체 우도는 표본별 밀도의 곱입니다. 가우시안 때와 글자 하나 다르지 않습니다.
2. 둘째 줄: 로그를 취해 곱을 합으로 바꿉니다. 여기도 같습니다.
3. 셋째 줄: 라플라스 밀도를 넣고 로그를 풉니다. **가정이 쓰이는 곳은 이 줄뿐입니다.** 대괄호 안의 둘째 항이 제곱이 아니라 절댓값입니다. 길어서 대괄호 안을 두 줄에 나눠 적었습니다.
4. 넷째 줄: $w$ 와 무관한 $\log \frac{1}{2b}$ 을 지우고 음수 부호를 떼면서 최대화를 최소화로 바꿉니다.
5. 다섯째 줄: 양의 상수 $\frac{1}{b}$ 을 $\frac{1}{n}$ 으로 바꿔도 최솟값의 위치는 같습니다.

마지막 식이 절댓값 오차의 평균(MAE, mean absolute error)입니다. 다변량에서는 $w_1 x_i + w_0$ 자리에 $\mathbf{w}^T\mathbf{x}_i$ 를 넣으면 됩니다. 입력 없이 분포의 가운데 하나만 추정하는 같은 계산은 [분포의 매개변수를 MLE로 구하기](map.html?s=sl&n=mle-distribution-parameters)에 있습니다.

**가우시안과 나란히 놓습니다.** 예측 빼기 정답을 $r_i = w_1 x_i + w_0 - y_i$ 로 줄여 씁니다.

| | 가우시안 노이즈 | 라플라스 노이즈 |
|---|---|---|
| 가정 | $\epsilon \sim \mathcal{N}(0, \sigma^2)$ | $\epsilon \sim \text{Laplace}(0, b)$ |
| 밀도 | $\frac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( -\frac{r_i^2}{2\sigma^2} \right)$ | $\frac{1}{2b} \exp\!\left( -\frac{\lvert r_i \rvert}{b} \right)$ |
| 지수 안의 항 | $-\frac{r_i^2}{2\sigma^2}$ | $-\frac{\lvert r_i \rvert}{b}$ |
| 지우는 상수 | $\log \frac{1}{\sqrt{2\pi\sigma^2}}$ 과 $\frac{1}{2\sigma^2}$ | $\log \frac{1}{2b}$ 과 $\frac{1}{b}$ |
| 남는 손실 | $\frac{1}{n} \sum_i r_i^2$ (MSE) | $\frac{1}{n} \sum_i \lvert r_i \rvert$ (MAE) |
| 이상치를 대하는 태도 | 먼 점은 거의 나올 수 없다고 봅니다. 그런 점 하나에 직선이 크게 끌려갑니다. | 먼 점도 가끔 나온다고 봅니다. 직선이 덜 끌려갑니다. |

<div class="cal key">

**바뀌는 줄은 하나이고 남는 것은 지수 안에 있던 모양입니다**

밀도의 지수 안에 있던 것이 로그를 지나 그대로 손실이 됩니다. 제곱이 있었으면 제곱이 남고 절댓값이 있었으면 절댓값이 남습니다. 앞에 곱해진 상수와 척도는 두 분포 모두에서 떨어져 나갑니다.

</div>

**이상치를 대하는 태도는 가정에서 나옵니다.** 두 가정은 직선에서 멀리 떨어진 점을 얼마나 이상하게 보느냐가 다릅니다. $\sigma = 1$, $b = 1$ 로 두고 잔차가 5인 점의 밀도를 잔차가 0인 점의 밀도로 나눠 봅니다. 가우시안은 $e^{-12.5} \approx 3.7 \times 10^{-6}$ 이고 라플라스는 $e^{-5} \approx 6.7 \times 10^{-3}$ 입니다.

가우시안 가정에서 먼 점은 거의 있을 수 없는 일입니다. 그런 점이 하나라도 있으면 우도가 크게 깎입니다. 그래서 직선이 그 점 쪽으로 끌려가 잔차를 줄이려 합니다. 라플라스는 꼬리가 두꺼워서 먼 점도 가끔 나온다고 봅니다. 이상치가 섞인 데이터에서 MAE가 덜 흔들리는 이유입니다. 같은 이야기를 손실의 모양으로 본 설명은 [손실 함수](map.html?s=sl&n=loss-function)에 있습니다.

## 흔한 오해

<div class="cal trap">

**MSE는 가우시안 가정에서 나오지만 MAE는 가정 없이 쓰는 손실이다**

둘 다 가정에서 나옵니다. MLE 관점에서 MAE를 최소화한다는 것은 노이즈가 라플라스라고 가정했다는 뜻입니다. 손실을 고르면 노이즈의 분포를 고른 것입니다.

</div>

<div class="cal trap">

**척도 $b$ 를 알아야 $w$ 를 구할 수 있다**

아닙니다. $b$ 는 넷째 줄에서 상수 $\log \frac{1}{2b}$ 로 한 번, 다섯째 줄에서 계수 $\frac{1}{b}$ 로 한 번 떨어져 나갑니다. 가우시안의 $\sigma^2$ 과 같은 처지입니다.

</div>

## 확인 질문

<div class="cal q">

노이즈의 가운데가 0이 아니라 $m$ 이라고 가정을 바꿉니다. $\epsilon \sim \text{Laplace}(m, b)$ 입니다. 다섯 줄 가운데 어느 줄이 어떻게 바뀌는지 쓰고 최종 손실을 쓰세요. 기울기 $w_1$ 의 추정값은 달라집니까?

</div>

<details class="solve">
<summary>답 보기</summary>

$y_i \mid x_i$ 의 가운데가 $w_1 x_i + w_0 + m$ 으로 옮겨집니다. 첫째, 둘째 줄은 그대로이고 셋째 줄부터 절댓값 안이 $w_1 x_i + w_0 + m - y_i$ 로 바뀝니다. 최종식은 다음과 같습니다.

$$
\arg\min_{w_1, w_0} \frac{1}{n} \sum_{i=1}^{n} \lvert w_1 x_i + (w_0 + m) - y_i \rvert
$$

$w_0 + m$ 을 새 절편으로 보면 원래 문제와 같은 꼴입니다. 기울기의 추정값은 그대로이고 절편의 추정값만 원래 값에서 $m$ 을 뺀 값이 됩니다. 절편이 있는 모형에서는 노이즈의 가운데를 0으로 두어도 잃는 것이 없습니다.

</details>

<div class="cal q">

잔차가 $r$ 인 표본 하나가 넷째 줄의 합에 더하는 값을 가우시안 가정과 라플라스 가정에서 각각 쓰세요. $\sigma = 1$, $b = 1$ 일 때 $r = 1$ 인 표본과 $r = 10$ 인 표본의 값을 견줘 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

가우시안에서는 $\frac{r^2}{2\sigma^2}$ 이고 라플라스에서는 $\frac{\lvert r \rvert}{b}$ 입니다.

| | $r = 1$ | $r = 10$ | 늘어난 배수 |
|---|---|---|---|
| 가우시안 | $0.5$ | $50$ | 100배 |
| 라플라스 | $1$ | $10$ | 10배 |

잔차가 10배가 되면 가우시안 쪽 값은 100배가 되고 라플라스 쪽 값은 10배가 됩니다. 먼 점 하나가 합에서 차지하는 몫이 가우시안에서 더 큽니다. 최소화할 때 그 점을 먼저 달래려고 직선이 움직이는 까닭입니다.

</details>
