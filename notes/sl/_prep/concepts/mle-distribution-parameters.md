---
title: 분포의 매개변수를 MLE로 구하기
en: MLE for distribution parameters
parent: mle-map
order: 40
summary: 가우시안, 라플라스, 지수분포의 매개변수를 같은 네 걸음으로 구합니다. 가우시안의 평균은 표본평균, 라플라스의 위치는 중앙값이 되며 이 차이가 뒤에서 MSE와 MAE의 차이로 이어집니다.
signal: emph
related: [lr-gaussian-noise-mse, lr-laplace-noise-mae]
---

## 왜 필요한가

[동전](map.html?s=sl&n=mle-coin-toss)은 결과가 둘뿐이었습니다. 실수 값을 내는 데이터에도 같은 네 걸음이 통하는지 확인할 차례입니다. 확률이 밀도로 바뀔 뿐 순서는 같습니다.

세 분포를 고른 데는 이유가 있습니다. 가우시안의 평균을 구하는 문제는 제곱합을 줄이는 문제가 되고 라플라스의 위치를 구하는 문제는 절댓값 합을 줄이는 문제가 됩니다. 선형회귀에서 [가우시안 노이즈가 MSE를](map.html?s=sl&n=lr-gaussian-noise-mse), [라플라스 노이즈가 MAE를](map.html?s=sl&n=lr-laplace-noise-mae) 낳는 계산을 입력 없이 미리 해 보는 셈입니다. 지수분포는 매개변수가 하나라서 동전 다음으로 손풀이 연습에 알맞습니다.

## 정의와 수식

데이터는 레이블이 없는 실수 표본 $D = \{x_1, \dots, x_n\}$ 이고 i.i.d. 라고 가정합니다. 어느 분포든 출발점은 [음의 로그우도](map.html?s=sl&n=mle-nll)의 넷째 줄입니다.

$$
\mathcal{L}_D(\theta) = -\sum_{i=1}^{n} \log P(x_i ; \theta)
$$

여기에 밀도의 식을 넣고 매개변수로 미분해서 0인 점을 찾습니다. 세 분포에서 달라지는 것은 밀도를 넣는 줄뿐입니다.

### 가우시안: 평균과 분산

밀도는 다음과 같습니다. 매개변수는 평균 $\mu$ 와 분산 $\sigma^{2}$ 둘입니다.

$$
P(x ; \mu, \sigma^{2}) = \frac{1}{\sqrt{2\pi\sigma^{2}}} \exp\!\left(-\frac{(x-\mu)^{2}}{2\sigma^{2}}\right)
$$

음의 로그우도를 전개합니다.

$$
\begin{aligned}
\mathcal{L}_D(\mu, \sigma^{2})
&= -\sum_{i=1}^{n} \log P(x_i ; \mu, \sigma^{2}) \\
&= -\sum_{i=1}^{n} \left[ -\frac{1}{2}\log(2\pi\sigma^{2}) - \frac{(x_i-\mu)^{2}}{2\sigma^{2}} \right] \\
&= \frac{n}{2}\log(2\pi\sigma^{2}) + \frac{1}{2\sigma^{2}}\sum_{i=1}^{n}(x_i-\mu)^{2}
\end{aligned}
$$

1. 첫째 줄: 출발점에 가우시안을 넣습니다.
2. 둘째 줄: 로그가 지수 함수를 벗깁니다. $\log\frac{1}{\sqrt{2\pi\sigma^{2}}} = -\frac{1}{2}\log(2\pi\sigma^{2})$ 입니다.
3. 셋째 줄: 부호를 정리하고 $i$ 와 무관한 항은 $n$ 번 더합니다.

**평균.** $\mu$ 가 들어 있는 곳은 둘째 항뿐입니다. $\mu$ 를 구하는 일은 제곱합 $\sum_i (x_i-\mu)^{2}$ 을 가장 작게 하는 일입니다.

$$
\begin{aligned}
\frac{\partial \mathcal{L}_D}{\partial \mu}
&= -\frac{1}{\sigma^{2}}\sum_{i=1}^{n}(x_i-\mu) = 0 \\
\sum_{i=1}^{n} x_i &= n\mu \\
\hat{\mu} &= \frac{1}{n}\sum_{i=1}^{n} x_i
\end{aligned}
$$

답은 표본평균 $\bar{x}$ 입니다. 앞에 곱해진 $\frac{1}{\sigma^{2}}$ 은 0으로 두는 순간 사라지므로 $\hat{\mu}$ 는 분산이 얼마든 같습니다.

**분산.** $\sigma^{2}$ 을 하나의 변수 $v$ 로 보고 미분합니다. $\mu$ 자리에는 방금 구한 $\hat{\mu}$ 를 넣습니다.

$$
\begin{aligned}
\frac{\partial \mathcal{L}_D}{\partial v}
&= \frac{n}{2v} - \frac{1}{2v^{2}}\sum_{i=1}^{n}(x_i-\hat{\mu})^{2} = 0 \\
n\,v &= \sum_{i=1}^{n}(x_i-\hat{\mu})^{2} \\
\hat{\sigma}^{2} &= \frac{1}{n}\sum_{i=1}^{n}(x_i-\hat{\mu})^{2}
\end{aligned}
$$

둘째 줄은 첫째 줄의 양변에 $2v^{2}$ 을 곱한 것입니다. 답은 평균에서 벗어난 정도를 제곱해 평균 낸 값입니다. 유도에서 나오는 분모는 $n$ 입니다. $n-1$ 로 나누는 표본분산은 다른 기준에서 나온 식이고 MLE가 아닙니다.

### 라플라스: 위치와 척도

밀도는 다음과 같습니다. 매개변수는 위치 $\mu$ 와 척도 $b$ 입니다. 가우시안과 견주면 지수 안의 제곱이 절댓값으로 바뀌었습니다.

$$
P(x ; \mu, b) = \frac{1}{2b} \exp\!\left(-\frac{\lvert x-\mu\rvert}{b}\right)
$$

같은 순서로 전개합니다.

$$
\begin{aligned}
\mathcal{L}_D(\mu, b)
&= -\sum_{i=1}^{n} \left[ -\log(2b) - \frac{\lvert x_i-\mu\rvert}{b} \right] \\
&= n\log(2b) + \frac{1}{b}\sum_{i=1}^{n}\lvert x_i-\mu\rvert
\end{aligned}
$$

**위치.** $\mu$ 를 구하는 일은 절댓값 합 $S(\mu) = \sum_i \lvert x_i-\mu\rvert$ 을 가장 작게 하는 일입니다. 절댓값은 꺾인 점에서 미분되지 않으므로 $\mu$ 가 어느 표본과도 겹치지 않는 곳에서 기울기를 봅니다. 표본 하나의 몫은 이렇습니다.

- $x_i$ 가 $\mu$ 보다 오른쪽에 있으면 $\lvert x_i-\mu\rvert = x_i-\mu$ 이고 $\mu$ 로 미분하면 $-1$ 입니다.
- $x_i$ 가 $\mu$ 보다 왼쪽에 있으면 $\lvert x_i-\mu\rvert = \mu-x_i$ 이고 $\mu$ 로 미분하면 $+1$ 입니다.

모두 더하면 기울기는 왼쪽에 있는 표본의 수에서 오른쪽에 있는 표본의 수를 뺀 값입니다.

$$
\begin{aligned}
\frac{dS}{d\mu}
&= -\sum_{i=1}^{n} \text{sign}(x_i-\mu) \\
&= \#\{i : x_i < \mu\} - \#\{i : x_i > \mu\}
\end{aligned}
$$

$\mu$ 가 왼쪽 끝에 있으면 모든 표본이 오른쪽에 있어서 기울기가 $-n$ 입니다. $\mu$ 를 오른쪽으로 옮기면서 표본을 하나 지날 때마다 기울기가 2씩 커집니다. 기울기가 음수에서 양수로 넘어가는 곳에서 $S$ 가 가장 작습니다. 그곳은 왼쪽과 오른쪽의 표본 수가 같아지는 자리이고 그 자리가 중앙값입니다.

$$
\hat{\mu} = \text{median}(x_1, \dots, x_n)
$$

$n$ 이 홀수면 가운데 표본의 값입니다. $n$ 이 짝수면 가운데 두 표본 사이의 어느 값이든 $S$ 가 같아서 모두 최솟값을 줍니다. 그 가운데 중점을 고르는 것이 흔한 약속입니다.

**척도.** $b$ 로 미분합니다.

$$
\begin{aligned}
\frac{\partial \mathcal{L}_D}{\partial b}
&= \frac{n}{b} - \frac{1}{b^{2}}\sum_{i=1}^{n}\lvert x_i-\hat{\mu}\rvert = 0 \\
\hat{b} &= \frac{1}{n}\sum_{i=1}^{n}\lvert x_i-\hat{\mu}\rvert
\end{aligned}
$$

답은 중앙값에서 벗어난 거리의 평균입니다.

### 지수분포: 매개변수 하나

지수분포는 0 이상의 값에 정의되고 매개변수는 $\theta > 0$ 하나입니다.

$$
P(x ; \theta) = \theta e^{-\theta x}
$$

$$
\begin{aligned}
\mathcal{L}_D(\theta)
&= -\sum_{i=1}^{n} \big[ \log\theta - \theta x_i \big] \\
&= -n\log\theta + \theta\sum_{i=1}^{n} x_i
\end{aligned}
$$

$$
\begin{aligned}
\frac{d\mathcal{L}_D}{d\theta}
&= -\frac{n}{\theta} + \sum_{i=1}^{n} x_i = 0 \\
\hat{\theta}_{\text{MLE}} &= \frac{n}{\sum_{i=1}^{n} x_i} = \frac{1}{\bar{x}}
\end{aligned}
$$

답은 표본평균의 역수입니다. 한 번 더 미분하면 $\frac{n}{\theta^{2}} > 0$ 이라서 이 점에서 음의 로그우도가 가장 작습니다. 지수분포의 평균이 $\frac{1}{\theta}$ 이므로 "평균을 표본평균에 맞춘다"는 뜻으로 읽을 수 있습니다.

### 한눈에

| 분포 | 매개변수 | 줄여야 하는 것 | MLE |
|---|---|---|---|
| 가우시안 | 평균 $\mu$ | $\sum_i (x_i-\mu)^{2}$ | 표본평균 |
| 가우시안 | 분산 $\sigma^{2}$ | 음의 로그우도 전체 | $\frac{1}{n}\sum_i (x_i-\hat{\mu})^{2}$ |
| 라플라스 | 위치 $\mu$ | $\sum_i \lvert x_i-\mu\rvert$ | 표본 중앙값 |
| 라플라스 | 척도 $b$ | 음의 로그우도 전체 | $\frac{1}{n}\sum_i \lvert x_i-\hat{\mu}\rvert$ |
| 지수분포 | $\theta$ | 음의 로그우도 전체 | $\frac{1}{\bar{x}}$ |

<div class="cal key">

**밀도의 지수 안에 있던 모양이 그대로 남습니다**

로그를 취하면 지수 함수가 벗겨지고 그 안에 있던 식이 줄여야 할 대상이 됩니다. 가우시안은 제곱이 남아 평균이 답이 되고 라플라스는 절댓값이 남아 중앙값이 답이 됩니다. [손실 함수](map.html?s=sl&n=loss-function)에서 제곱 손실은 평균과, 절댓값 손실은 중앙값과 짝이라고 한 것이 여기서 유도됩니다. 평균 자리에 $\mathbf{w}^T\mathbf{x}_i$ 를 넣으면 같은 계산이 선형회귀의 MSE와 MAE가 됩니다.

</div>

## 흔한 오해

<div class="cal trap">

**어느 분포든 위치 매개변수의 MLE는 표본평균이다**

가우시안에서만 그렇습니다. 라플라스에서는 중앙값입니다. 평균이 나온 것은 제곱합을 미분했기 때문이고 분포가 바뀌어 줄일 대상이 절댓값 합이 되면 답도 바뀝니다. 중앙값은 표본의 값이 아니라 순서로 정해지므로 멀리 떨어진 표본 하나에 끌려가지 않습니다.

</div>

<div class="cal trap">

**지수분포의 MLE는 표본평균이다**

표본평균의 역수입니다. 이 지도의 식 $\theta e^{-\theta x}$ 에서 $\theta$ 는 평균이 아니라 평균의 역수입니다. 값이 큰 표본이 많을수록 $\hat{\theta}$ 는 작아집니다.

</div>

## 확인 질문

<div class="cal q">

표본이 $D = \{2, 3, 7, 8, 30\}$ 입니다. 가우시안을 가정했을 때의 $\hat{\mu}$ 와 $\hat{\sigma}^{2}$, 라플라스를 가정했을 때의 $\hat{\mu}$ 와 $\hat{b}$ 를 구하세요. 그리고 마지막 표본 $30$ 을 $300$ 으로 바꾸면 두 $\hat{\mu}$ 가 각각 어떻게 되는지 답하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

가우시안: 합이 $50$ 이므로 $\hat{\mu} = 10$ 입니다. 편차는 $-8, -7, -3, -2, 20$ 이고 제곱은 $64, 49, 9, 4, 400$ 입니다.

$$
\hat{\sigma}^{2} = \frac{64 + 49 + 9 + 4 + 400}{5} = \frac{526}{5} = 105.2
$$

라플라스: 크기순으로 셋째인 $7$ 이 중앙값이므로 $\hat{\mu} = 7$ 입니다. 거리는 $5, 4, 0, 1, 23$ 입니다.

$$
\hat{b} = \frac{5 + 4 + 0 + 1 + 23}{5} = \frac{33}{5} = 6.6
$$

$30$ 을 $300$ 으로 바꾸면 가우시안의 $\hat{\mu}$ 는 $\frac{320}{5} = 64$ 로 옮겨 갑니다. 라플라스의 $\hat{\mu}$ 는 그대로 $7$ 입니다. 가운데 표본이 바뀌지 않았기 때문입니다.

</details>

<div class="cal q">

표본이 $D = \{1, 2, 6, 9\}$ 로 짝수 개입니다. $S(\mu) = \sum_i \lvert x_i-\mu\rvert$ 의 기울기를 구간마다 구해 표로 만들고 $S$ 가 가장 작아지는 $\mu$ 의 범위와 그때의 $S$ 값을 구하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

기울기는 왼쪽 표본 수에서 오른쪽 표본 수를 뺀 값입니다.

| $\mu$ 의 구간 | 왼쪽 | 오른쪽 | 기울기 |
|---|---|---|---|
| $\mu < 1$ | 0 | 4 | $-4$ |
| $1 < \mu < 2$ | 1 | 3 | $-2$ |
| $2 < \mu < 6$ | 2 | 2 | $0$ |
| $6 < \mu < 9$ | 3 | 1 | $+2$ |
| $\mu > 9$ | 4 | 0 | $+4$ |

기울기가 0인 구간 $2 \le \mu \le 6$ 전체에서 $S$ 가 가장 작습니다. 이 구간에서

$$
\begin{aligned}
S(\mu) &= (\mu-1) + (\mu-2) \\
&\quad + (6-\mu) + (9-\mu) = 12
\end{aligned}
$$

로 $\mu$ 와 무관하게 같은 값입니다. 중점을 고르는 약속을 따르면 $\hat{\mu} = 4$ 입니다.

</details>
