---
title: "MAP: 우도에 prior를 곱한다"
en: MAP and the posterior
parent: mle-map
order: 60
summary: MAP는 데이터를 본 뒤의 매개변수 분포인 posterior를 가장 크게 하는 값을 고릅니다. posterior는 우도와 prior의 곱에 비례하므로 음의 로그우도에 prior에서 온 항 하나가 더해집니다.
signal: emph
related: [ridge-map-gaussian-prior, lasso-map-laplace-prior, logreg-map]
---

## 왜 필요한가

MLE는 "어떤 매개변수에서 이 데이터가 가장 잘 나오는가"를 묻습니다. 정작 알고 싶은 것은 방향이 반대인 "이 데이터를 봤을 때 어떤 매개변수가 가장 그럴듯한가"일 수 있습니다. 두 질문은 같지 않습니다. 둘째 질문에 답하려면 데이터를 보기 전에 매개변수를 어떻게 생각하고 있었는지가 필요합니다.

그 사전 믿음을 분포로 적은 것이 prior(사전 분포)입니다. prior를 우도에 곱해서 최대화하는 방법이 maximum a posteriori estimation(MAP)입니다. 표본이 적어 MLE가 극단으로 갈 때나 계수가 지나치게 커질 때 prior가 추정값을 붙잡아 줍니다. 선형회귀의 ridge와 lasso가 이 방법에서 나옵니다.

## 정의와 수식

### Bayes rule

매개변수를 확률변수로 보면 $\boldsymbol{\theta}$ 와 $D$ 의 결합 확률을 두 가지로 쓸 수 있습니다.

$$
P(\boldsymbol{\theta}, D) = P(\boldsymbol{\theta} \mid D)\, P(D) = P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})
$$

양변을 $P(D)$ 로 나누면 Bayes rule입니다.

$$
P(\boldsymbol{\theta} \mid D) = \frac{P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})}{P(D)}
$$

| 식 | 이름 | 뜻 |
|---|---|---|
| $P(\boldsymbol{\theta} \mid D)$ | posterior(사후 분포) | 데이터를 본 뒤의 매개변수 분포 |
| $P(D \mid \boldsymbol{\theta})$ | likelihood(우도) | 그 매개변수에서 이 데이터가 나올 확률 |
| $P(\boldsymbol{\theta})$ | prior(사전 분포) | 데이터를 보기 전의 매개변수 분포 |
| $P(D)$ | evidence | 데이터가 나올 확률. $\boldsymbol{\theta}$ 와 무관하다 |

매개변수 앞에 세미콜론 대신 막대를 쓴 것은 $\boldsymbol{\theta}$ 를 확률변수로 보기 때문입니다. 이 구분은 [빈도주의와 베이지안](map.html?s=sl&n=frequentist-vs-bayesian)에서 다룹니다.

### MAP 추정

posterior를 가장 크게 하는 매개변수를 고릅니다.

$$
\begin{aligned}
\hat{\boldsymbol{\theta}}_{\text{MAP}}
&= \arg\max_{\boldsymbol{\theta}} P(\boldsymbol{\theta} \mid D) \\
&= \arg\max_{\boldsymbol{\theta}} P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})
\end{aligned}
$$

둘째 줄에서 분모 $P(D)$ 가 빠졌습니다. $P(D)$ 는 가능한 모든 $\boldsymbol{\theta}$ 에 걸쳐 평균을 낸 값이라서 $\boldsymbol{\theta}$ 의 함수가 아닙니다. 양의 상수로 나누는 일은 최댓값의 위치를 바꾸지 않습니다. 그래서 $P(\boldsymbol{\theta} \mid D) \propto P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})$ 라고 쓰고 계산에서는 분자만 봅니다.

### 음의 로그 posterior

MLE에서 했듯이 로그를 취하고 부호를 뒤집습니다.

$$
\begin{aligned}
&\mathcal{L}^{\text{MAP}}_D(\boldsymbol{\theta}) = -\log P(\boldsymbol{\theta} \mid D) \\
&\quad = -\log \frac{P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})}{P(D)} \\
&\quad = -\log P(D \mid \boldsymbol{\theta}) - \log P(\boldsymbol{\theta}) + \log P(D) \\
&\quad = \mathcal{L}_D(\boldsymbol{\theta}) - \log P(\boldsymbol{\theta}) + \text{const.}
\end{aligned}
$$

1. 첫째 줄: 정의입니다.
2. 둘째 줄: Bayes rule을 넣습니다.
3. 셋째 줄: 로그의 성질로 세 항으로 가릅니다. 분모에 있던 $P(D)$ 는 부호가 바뀌어 $+\log P(D)$ 가 됩니다.
4. 넷째 줄: 첫 항은 [음의 로그우도](map.html?s=sl&n=mle-nll) 그대로입니다. $\log P(D)$ 는 $\boldsymbol{\theta}$ 와 무관한 상수입니다.

상수를 버리면 MAP가 푸는 문제가 나옵니다.

$$
\hat{\boldsymbol{\theta}}_{\text{MAP}} = \arg\min_{\boldsymbol{\theta}} \Big[ \mathcal{L}_D(\boldsymbol{\theta}) - \log P(\boldsymbol{\theta}) \Big]
$$

지도학습에서는 $\mathcal{L}_D$ 자리에 [조건부 우도](map.html?s=sl&n=conditional-likelihood)의 합이 들어갑니다.

$$
\begin{aligned}
\hat{\boldsymbol{\theta}}_{\text{MAP}} = \arg\min_{\boldsymbol{\theta}} \bigg[ &-\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta}) \\
&- \log P(\boldsymbol{\theta}) \bigg]
\end{aligned}
$$

<div class="cal key">

**MLE의 유도를 그대로 쓰고 항 하나만 붙입니다**

우도 쪽 전개는 MLE 때와 한 줄도 다르지 않습니다. 새로 할 일은 prior의 식에 음의 로그를 취해 뒤에 더하는 것뿐입니다. 데이터에 대한 가정이 바뀌면 앞 항이 바뀌고 prior가 바뀌면 뒤 항이 바뀝니다. 두 선택은 서로 영향을 주지 않습니다([노이즈 가정과 prior 가정은 따로 고른다](map.html?s=sl&n=noise-prior-combination)).

</div>

### 더해지는 항이 하는 일

$-\log P(\boldsymbol{\theta})$ 는 prior가 높게 보는 곳에서 작고 낮게 보는 곳에서 큽니다. prior가 0 근처에 몰려 있으면 이 항은 매개변수가 0에서 멀어질수록 커지는 벌점이 됩니다.

- 0을 중심으로 한 가우시안 prior에서는 제곱 벌점이 나옵니다. 선형회귀에 붙이면 [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)입니다.
- 0을 중심으로 한 라플라스 prior에서는 절댓값 벌점이 나옵니다. 선형회귀에 붙이면 [lasso](map.html?s=sl&n=lasso-map-laplace-prior)입니다.
- 로지스틱 회귀에도 같은 방식으로 붙습니다([prior를 더한 MAP 버전](map.html?s=sl&n=logreg-map)).

## 흔한 오해

<div class="cal trap">

**MAP를 구하려면 $P(D)$ 를 계산해야 한다**

계산하지 않습니다. $P(D)$ 는 $\boldsymbol{\theta}$ 에 따라 달라지지 않아서 어느 $\boldsymbol{\theta}$ 가 가장 좋은지 가리는 데 아무 영향이 없습니다. 음의 로그 posterior의 셋째 줄에서 상수로 떨어져 나갑니다.

</div>

<div class="cal trap">

**우도 $P(D \mid \boldsymbol{\theta})$ 와 posterior $P(\boldsymbol{\theta} \mid D)$ 는 같은 것을 다르게 쓴 것이다**

조건의 방향이 반대입니다. 우도는 매개변수가 주어졌을 때 데이터의 확률이고 posterior는 데이터가 주어졌을 때 매개변수의 확률입니다. MLE는 앞의 것을, MAP는 뒤의 것을 최대화합니다. 둘을 이어 주는 것이 prior입니다.

</div>

## 확인 질문

<div class="cal q">

음의 로그 posterior의 둘째 줄에서 셋째 줄로 가는 계산을 직접 쓰세요. $\log P(D)$ 앞의 부호가 무엇인지, 그리고 이 항을 버려도 $\hat{\boldsymbol{\theta}}_{\text{MAP}}$ 가 달라지지 않는 이유를 한 문장으로 적으세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$\log\frac{ab}{c} = \log a + \log b - \log c$ 이므로

$$
\begin{aligned}
&-\log \frac{P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})}{P(D)} \\
&= -\log P(D \mid \boldsymbol{\theta}) - \log P(\boldsymbol{\theta}) + \log P(D)
\end{aligned}
$$

입니다. 부호는 더하기입니다. $\log P(D)$ 에는 $\boldsymbol{\theta}$ 가 없어서 모든 후보에 같은 값이 더해지므로 가장 작은 곳의 위치는 그대로입니다.

</details>

<div class="cal q">

매개변수가 두 값 A와 B만 가질 수 있다고 합시다. 우도는 $P(D \mid \text{A}) = 0.02$, $P(D \mid \text{B}) = 0.05$ 이고 prior는 $P(\text{A}) = 0.8$, $P(\text{B}) = 0.2$ 입니다. MLE가 고르는 값과 MAP가 고르는 값을 각각 구하세요. $P(D)$ 와 두 posterior도 계산해서 $P(D)$ 로 나누기 전과 후에 순서가 같은지 확인하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

MLE는 우도만 봅니다. $0.05 > 0.02$ 이므로 B를 고릅니다.

MAP는 우도와 prior의 곱을 봅니다. A는 $0.02 \times 0.8 = 0.016$ 이고 B는 $0.05 \times 0.2 = 0.010$ 이므로 A를 고릅니다. 데이터는 B를 조금 더 지지하지만 prior가 A를 훨씬 높게 보고 있어서 결과가 뒤집혔습니다.

$P(D) = 0.016 + 0.010 = 0.026$ 입니다. posterior는

$$
\begin{aligned}
P(\text{A} \mid D) &= \frac{0.016}{0.026} \approx 0.615 \\
P(\text{B} \mid D) &= \frac{0.010}{0.026} \approx 0.385
\end{aligned}
$$

입니다. 둘 다 같은 수로 나눴으므로 순서는 나누기 전과 같습니다.

</details>
