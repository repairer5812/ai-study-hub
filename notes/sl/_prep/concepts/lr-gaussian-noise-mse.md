---
title: 가우시안 노이즈를 가정하면 MSE가 나온다
en: MLE under Gaussian noise gives the squared loss
parent: linear-regression
order: 20
summary: 선형 모형에 가우시안 노이즈를 가정하고 우도를 최대화하면 상수와 분산이 떨어져 나가고 제곱 오차의 평균을 최소화하는 문제만 남습니다.
signal: emph
related: [lr-laplace-noise-mae, logreg-mle-objective, mle-distribution-parameters, conditional-likelihood]
---

## 왜 필요한가

"회귀에는 MSE를 쓴다"를 외운 상태와, 왜 MSE인지 한 줄씩 쓸 수 있는 상태는 다릅니다. 이 유도를 손에 익혀 두면 노이즈의 분포가 바뀌었을 때도 같은 순서로 새 손실을 만들 수 있습니다.

## 정의와 수식

모형과 가정은 다음과 같습니다.

$$
y = w_1 x + w_0 + \epsilon, \qquad \epsilon \sim \mathcal{N}(0, \sigma^2)
$$

노이즈가 가우시안이므로 $x_i$ 가 주어졌을 때 $y_i$ 도 가우시안입니다. 평균만 $w_1 x_i + w_0$ 으로 옮겨 갑니다.

$$
\begin{aligned}
& P(y_i \mid x_i ; w_1, w_0) \\
&\quad = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( -\frac{(w_1 x_i + w_0 - y_i)^2}{2\sigma^2} \right)
\end{aligned}
$$

이 밀도를 넣고 MLE를 다섯 줄로 전개합니다.

$$
\begin{aligned}
\hat{w}_1, \hat{w}_0
&= \arg\max_{w_1, w_0} \prod_{i=1}^{n} P(y_i \mid x_i ; w_1, w_0) \\
&= \arg\max_{w_1, w_0} \sum_{i=1}^{n} \log P(y_i \mid x_i ; w_1, w_0) \\
&= \arg\max_{w_1, w_0} \sum_{i=1}^{n} \bigg[ \log \frac{1}{\sqrt{2\pi\sigma^2}} \\
&\qquad\qquad\qquad - \frac{(w_1 x_i + w_0 - y_i)^2}{2\sigma^2} \bigg] \\
&= \arg\min_{w_1, w_0} \frac{1}{2\sigma^2} \sum_{i=1}^{n} (w_1 x_i + w_0 - y_i)^2 \\
&= \arg\min_{w_1, w_0} \frac{1}{n} \sum_{i=1}^{n} (w_1 x_i + w_0 - y_i)^2
\end{aligned}
$$

1. 첫째 줄: 표본이 i.i.d. 이므로 전체 우도는 표본별 확률의 곱입니다.
2. 둘째 줄: 로그는 증가함수라 최댓값의 위치를 바꾸지 않습니다. 곱이 합이 됩니다.
3. 셋째 줄: 가우시안 밀도를 넣고 로그를 풉니다. 길어서 대괄호 안을 두 줄에 나눠 적었습니다.
4. 넷째 줄: $w$ 와 무관한 상수항을 지우고 음수 부호를 떼면서 최대화를 최소화로 바꿉니다.
5. 다섯째 줄: 양의 상수 $\frac{1}{2\sigma^2}$ 을 $\frac{1}{n}$ 으로 바꿔도 최솟값의 위치는 같습니다.

마지막 식이 제곱 오차의 평균(MSE)이고 이렇게 푸는 방법을 ordinary least squares라고 부릅니다.

<div class="cal key">

**가우시안 가정이 남긴 것은 제곱 하나입니다**

다섯 줄 가운데 가우시안이라는 가정이 쓰인 곳은 셋째 줄뿐입니다. 밀도의 지수 안에 제곱이 있었기 때문에 손실에 제곱이 남았습니다. 다른 분포를 가정하면 새로 쓰는 줄은 셋째 줄뿐입니다. 넷째, 다섯째 줄은 거기서 나온 항을 그대로 받습니다.

</div>

## 흔한 오해

<div class="cal trap">

**$\sigma^2$ 을 모르면 $w$ 를 못 구한다**

아닙니다. $\sigma^2$ 은 넷째 줄과 다섯째 줄에서 떨어져 나갑니다. 상수항 안의 것은 넷째 줄에서, 계수 $\frac{1}{2\sigma^2}$ 은 다섯째 줄에서 빠집니다. $w_1$, $w_0$ 의 MLE는 노이즈의 분산이 얼마든 같습니다.

</div>

<div class="cal trap">

**MSE를 쓰면 가우시안을 가정하지 않은 것이다**

반대입니다. MLE 관점에서 보면 MSE를 최소화한다는 것은 노이즈가 가우시안이라고 가정했다는 뜻입니다. 손실을 고르는 일과 노이즈 분포를 고르는 일은 같은 선택입니다.

</div>

## 확인 질문

<div class="cal q">

둘째 줄에서 셋째 줄로 갈 때 로그 안의 지수 함수가 사라집니다. 그 한 줄을 직접 쓰고 넷째 줄에서 $\arg\max$ 가 $\arg\min$ 으로 바뀌는 이유를 한 문장으로 말해 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$\log(ab) = \log a + \log b$ 이고 $\log e^{z} = z$ 이므로

$$
\begin{aligned}
& \log\!\left[ \frac{1}{\sqrt{2\pi\sigma^2}} \, e^{-\frac{(w_1 x_i + w_0 - y_i)^2}{2\sigma^2}} \right] \\
&\quad = \log \frac{1}{\sqrt{2\pi\sigma^2}} - \frac{(w_1 x_i + w_0 - y_i)^2}{2\sigma^2}
\end{aligned}
$$

입니다. 남은 항 앞에 음수 부호가 있어서 이 값을 가장 크게 만드는 $w$ 는 부호를 뗀 제곱합을 가장 작게 만드는 $w$ 와 같습니다.

</details>
