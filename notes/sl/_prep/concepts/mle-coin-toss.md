---
title: 동전 던지기의 MLE
en: MLE for a coin
parent: mle-map
order: 30
summary: 앞면과 뒷면이 나온 횟수로 앞면 확률을 추정하면 앞면의 비율이 나옵니다. 가정에서 풀이까지 네 걸음을 손으로 끝까지 밟아 보는 가장 작은 예입니다.
signal: emph
related: []
---

## 왜 필요한가

동전은 네 걸음을 처음부터 끝까지 손으로 밟아 볼 수 있는 가장 작은 예입니다. 매개변수가 하나이고 미분도 쉽습니다. 열 번 던져 앞면이 네 번이면 0.4라는 짐작이 MLE의 답과 같다는 것을 확인해 두면 짐작이 통하지 않는 모형에서도 같은 순서를 믿고 쓸 수 있습니다.

풀이는 두 가지입니다. 우도를 그대로 미분하는 길과 로그를 먼저 취하는 길입니다. 둘 다 써 봐야 로그가 무엇을 덜어 주는지 보입니다.

## 정의와 수식

### 가정과 우도

앞면 확률은 $\theta$, 뒷면 확률은 $1-\theta$ 입니다. 던지기는 서로 독립이고 매번 같은 $\theta$ 를 따릅니다. 앞면이 $n_H$ 번, 뒷면이 $n_T$ 번 나온 결과열 $D$ 의 확률은 각 던지기의 확률을 곱한 값입니다.

$$
P(D ; \theta) = \theta^{n_H}(1-\theta)^{n_T}
$$

찾는 값은 이 우도를 가장 크게 하는 $\hat{\theta}_{\text{MLE}} = \arg\max_{\theta} P(D ; \theta)$ 입니다.

### 풀이 1: 그대로 미분한다

열 번 던져 앞면 4번, 뒷면 6번이 나온 경우로 풉니다.

$$
\begin{aligned}
\frac{d}{d\theta}\,\theta^{4}(1-\theta)^{6}
&= 4\theta^{3}(1-\theta)^{6} - 6\theta^{4}(1-\theta)^{5} \\
&= \theta^{3}(1-\theta)^{5}\,\big[\,4(1-\theta) - 6\theta\,\big] \\
&= \theta^{3}(1-\theta)^{5}\,(4 - 10\theta)
\end{aligned}
$$

1. 첫째 줄: 곱의 미분입니다. $(1-\theta)^{6}$ 을 미분하면 $-6(1-\theta)^{5}$ 이라서 둘째 항에 빼기가 붙습니다.
2. 둘째 줄: 공통 인수 $\theta^{3}(1-\theta)^{5}$ 으로 묶습니다.
3. 셋째 줄: 괄호 안을 정리합니다.

이 값이 0이 되는 곳은 $\theta = 0$, $\theta = 1$, $\theta = \frac{4}{10}$ 셋입니다. 양 끝에서는 우도 자체가 0입니다. $\theta = 0$ 이면 앞면 네 번이 나올 수 없고 $\theta = 1$ 이면 뒷면 여섯 번이 나올 수 없기 때문입니다. 0과 1 사이에서는 우도가 양수이므로 최댓값은 안쪽의 점에서 납니다.

$$
\hat{\theta}_{\text{MLE}} = \frac{4}{10} = 0.4
$$

### 풀이 2: 로그를 먼저 취한다

이번에는 일반적인 $n_H$, $n_T$ 로 풉니다. 로그는 최댓값의 위치를 바꾸지 않습니다([음의 로그우도](map.html?s=sl&n=mle-nll)).

$$
\begin{aligned}
\log P(D ; \theta) &= n_H \log\theta + n_T \log(1-\theta) \\
\frac{d}{d\theta}\log P(D ; \theta) &= \frac{n_H}{\theta} - \frac{n_T}{1-\theta}
\end{aligned}
$$

1. 첫째 줄: 곱이 합으로, 지수가 계수로 바뀝니다.
2. 둘째 줄: $\log(1-\theta)$ 를 미분하면 $-\frac{1}{1-\theta}$ 입니다. 안쪽의 $1-\theta$ 를 미분한 $-1$ 이 곱해집니다.

미분한 값을 0으로 두고 풉니다.

$$
\begin{aligned}
\frac{n_H}{\theta} - \frac{n_T}{1-\theta} &= 0 \\
n_H(1-\theta) &= n_T\,\theta \\
n_H &= (n_H + n_T)\,\theta \\
\hat{\theta}_{\text{MLE}} &= \frac{n_H}{n_H + n_T}
\end{aligned}
$$

답은 앞면이 나온 비율입니다. $n_H = 4$, $n_T = 6$ 을 넣으면 풀이 1과 같은 $0.4$ 입니다. 한 번 더 미분하면 $-\frac{n_H}{\theta^{2}} - \frac{n_T}{(1-\theta)^{2}} < 0$ 이라서 이 점은 최대점입니다.

풀이 1은 곱의 미분과 인수 묶기가 필요했고 풀이 2는 항별 미분으로 끝났습니다. 인수가 둘뿐인 동전에서도 차이가 납니다. 인수가 표본 수만큼 있는 모형에서는 로그 없이 풀기 어렵습니다.

미분이 0인 점을 식으로 풀어 답을 얻었습니다. 이런 답을 closed-form solution(닫힌 해)이라 부릅니다. 식으로 풀리지 않는 모형에서는 같은 점을 [경사하강법](map.html?s=sl&n=gradient-descent)으로 찾습니다.

### 이항계수를 붙여도 답은 같다

결과의 순서를 무시하고 "열 번 가운데 앞면이 네 번"일 확률로 쓰면 앞에 이항계수가 붙습니다.

$$
P(D ; \theta) = \binom{n_H + n_T}{n_H}\,\theta^{n_H}(1-\theta)^{n_T}
$$

$n_H = 4$, $n_T = 6$ 이면 $\binom{10}{4} = 210$ 입니다. 이 계수는 $\theta$ 와 무관합니다. 로그를 취하면 상수항 $\log 210$ 으로 떨어져 나오고 미분하면 사라집니다. 계수를 쓰든 쓰지 않든 $\hat{\theta}_{\text{MLE}}$ 는 같습니다.

### 끝점이 답이 되는 경우

앞면만 나오거나 뒷면만 나오면 안쪽에 미분이 0인 점이 없습니다. $D = \{H, H\}$ 이면 우도는 $\theta^{2}$ 이고 $\theta$ 가 클수록 커지므로 최댓값은 끝점 $\theta = 1$ 에서 납니다. 공식 $\frac{n_H}{n_H + n_T}$ 도 $1$ 을 줍니다. 표본 두 개로 뒷면은 나오지 않는다고 결론 내는 셈입니다. 이 문제는 [가상의 횟수](map.html?s=sl&n=coin-pseudo-counts)에서 다룹니다.

<div class="cal key">

**네 걸음으로 다시 읽기**

가정은 독립인 던지기와 앞면 확률 $\theta$ 입니다. 우도는 $\theta^{n_H}(1-\theta)^{n_T}$ 입니다. 로그로 곱을 합으로 바꿉니다. 미분해서 0인 점을 풉니다. 가정이 바뀌면 달라지는 것은 우도를 쓰는 줄뿐이고 뒤의 두 걸음은 그대로입니다. 동전 대신 가우시안이나 지수분포를 넣은 경우는 [분포의 매개변수를 MLE로 구하기](map.html?s=sl&n=mle-distribution-parameters)에 있습니다.

</div>

## 흔한 오해

<div class="cal trap">

**앞면 4번, 뒷면 6번이면 추정값은 $\frac{4}{6}$ 이다**

분모는 뒷면 횟수가 아니라 전체 횟수입니다. 답은 $\frac{4}{10}$ 입니다. $\frac{4}{6}$ 은 앞면 횟수와 뒷면 횟수의 비이고 확률이 아닙니다. 이 비는 [odds](map.html?s=sl&n=odds-logit)라고 부르는 다른 양입니다.

</div>

<div class="cal trap">

**$\log(1-\theta)$ 를 미분하면 $\frac{1}{1-\theta}$ 이다**

부호가 빠졌습니다. 이렇게 쓰면 풀어야 할 식이 $\frac{n_H}{\theta} + \frac{n_T}{1-\theta} = 0$ 이 됩니다. 0과 1 사이에서 두 항이 모두 양수라서 해가 없습니다. 해가 나오지 않으면 가운데 부호부터 확인합니다.

</div>

## 확인 질문

<div class="cal q">

동전을 여덟 번 던져 앞면이 5번, 뒷면이 3번 나왔습니다. 로그를 쓰지 않고 우도를 직접 미분해서 $\hat{\theta}_{\text{MLE}}$ 를 구하세요. 이어서 로그를 취한 풀이로 같은 답이 나오는지 확인하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

직접 미분하면

$$
\begin{aligned}
\frac{d}{d\theta}\,\theta^{5}(1-\theta)^{3}
&= 5\theta^{4}(1-\theta)^{3} - 3\theta^{5}(1-\theta)^{2} \\
&= \theta^{4}(1-\theta)^{2}\,\big[\,5(1-\theta) - 3\theta\,\big] \\
&= \theta^{4}(1-\theta)^{2}\,(5 - 8\theta)
\end{aligned}
$$

입니다. 안쪽에서 0이 되는 점은 $\theta = \frac{5}{8}$ 입니다.

로그를 취하면 $5\log\theta + 3\log(1-\theta)$ 이고 미분해서 0으로 두면 $\frac{5}{\theta} - \frac{3}{1-\theta} = 0$ 입니다. $5(1-\theta) = 3\theta$ 에서 $\hat{\theta}_{\text{MLE}} = \frac{5}{8} = 0.625$ 로 같습니다.

</details>

<div class="cal q">

세 번 던져 세 번 모두 뒷면이 나왔습니다. 로그우도를 쓰고 미분해 보세요. 0과 1 사이에 미분이 0인 점이 있습니까. 없다면 MLE는 어디입니까.

</div>

<details class="solve">
<summary>답 보기</summary>

우도는 $(1-\theta)^{3}$ 이고 로그우도는 $3\log(1-\theta)$ 입니다. 미분하면 $-\frac{3}{1-\theta}$ 이고 0과 1 사이에서 항상 음수입니다. 미분이 0인 점은 없습니다. 로그우도가 계속 줄어드는 함수이므로 최댓값은 왼쪽 끝점에서 나고 $\hat{\theta}_{\text{MLE}} = 0$ 입니다. 공식에 넣어도 $\frac{0}{0+3} = 0$ 입니다.

</details>
