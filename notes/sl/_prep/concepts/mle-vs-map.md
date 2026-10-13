---
title: MLE와 MAP는 무엇이 다른가
en: MLE vs MAP
parent: mle-map
order: 90
summary: MLE는 우도를 최대화하고 MAP는 posterior를 최대화합니다. 식으로 보면 차이는 음의 로그우도 뒤에 붙는 prior 항 하나입니다.
signal: none
related: []
---

## 왜 필요한가

두 방법을 따로 배우면 서로 다른 유도 두 벌처럼 보입니다. 나란히 놓으면 겹치는 부분이 대부분이고 다른 곳은 한 군데입니다. 그 한 군데를 짚어 두면 선형회귀에서 MSE가 ridge로 넘어갈 때도 로지스틱 회귀의 목적함수가 MAP 버전으로 넘어갈 때도 새로 외울 것이 없습니다.

## 정의와 수식

| | MLE | MAP |
|---|---|---|
| 관점 | 빈도주의. 매개변수는 모르지만 고정된 값 | 베이지안. 매개변수는 확률변수 |
| 최대화하는 것 | 우도 $P(D ; \boldsymbol{\theta})$ | posterior $P(\boldsymbol{\theta} \mid D)$ |
| 묻는 것 | 어떤 $\boldsymbol{\theta}$ 에서 이 데이터가 가장 잘 나오는가 | 이 데이터를 봤을 때 어떤 $\boldsymbol{\theta}$ 가 가장 그럴듯한가 |
| prior | 쓰지 않는다 | 쓴다 |
| 최소화하는 식 | $\mathcal{L}_D(\boldsymbol{\theta})$ | $\mathcal{L}_D(\boldsymbol{\theta}) - \log P(\boldsymbol{\theta})$ |

관점의 차이는 [빈도주의와 베이지안](map.html?s=sl&n=frequentist-vs-bayesian)에 있습니다. 마지막 행이 두 방법의 관계를 한 줄로 보여 줍니다.

$$
\mathcal{L}^{\text{MAP}}_D(\boldsymbol{\theta}) = \mathcal{L}_D(\boldsymbol{\theta}) - \log P(\boldsymbol{\theta}) + \text{const.}
$$

앞 항은 [음의 로그우도](map.html?s=sl&n=mle-nll)이고 MLE 때와 같은 전개로 얻습니다. 뒤 항만 새로 붙습니다. 이 식의 유도는 [MAP](map.html?s=sl&n=map-posterior)에 있습니다.

### 항 하나가 만드는 차이

prior를 무엇으로 두느냐에 따라 뒤 항의 모양이 정해집니다.

| 모형 | MLE가 최소화하는 것 | prior | MAP에서 더해지는 항의 꼴 |
|---|---|---|---|
| 선형회귀, 가우시안 노이즈 | 제곱 오차의 합 | 가우시안 | $\lambda \lVert\mathbf{w}\rVert_2^2$ |
| 선형회귀, 가우시안 노이즈 | 제곱 오차의 합 | 라플라스 | $\lambda \lVert\mathbf{w}\rVert_1$ |
| 로지스틱 회귀 | 로지스틱 손실의 합 | 가우시안 | $\lambda \lVert\mathbf{w}\rVert_2^2$ |

$\lambda$ 는 벌점의 세기를 정하는 양의 상수입니다. 앞의 두 행이 [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)와 [lasso](map.html?s=sl&n=lasso-map-laplace-prior)이고 셋째 행이 [로지스틱 회귀의 MAP 버전](map.html?s=sl&n=logreg-map)입니다. 세 경우 모두 "MLE가 최소화하는 것" 열은 그대로이고 오른쪽 끝 열만 더해집니다.

동전에서도 같습니다. $D = \{H, H\}$ 의 MLE는 $1$ 입니다. 앞면과 뒷면을 한 번씩 미리 봤다는 믿음을 더하면 $\frac{3}{4}$ 입니다([가상의 횟수](map.html?s=sl&n=coin-pseudo-counts)). 데이터 쪽 계산은 같고 믿음에서 온 몫만 더해졌습니다.

<div class="cal key">

**MAP를 쓰라고 하면 MLE를 쓰고 한 항을 더합니다**

우도 쪽은 손대지 않습니다. prior의 식에 음의 로그를 취해 뒤에 붙이면 끝입니다.

</div>

## 흔한 오해

<div class="cal trap">

**MAP는 MLE와 다른 유도를 처음부터 다시 해야 한다**

우도를 쓰고 로그를 취해 합으로 바꾸는 과정은 두 방법이 같습니다. MAP에서 달라지는 것은 마지막에 $-\log P(\boldsymbol{\theta})$ 를 더한다는 것 하나입니다.

</div>

<div class="cal trap">

**MLE는 prior를 쓰지 않으므로 가정이 없는 방법이다**

MLE에도 가정이 있습니다. 표본이 i.i.d. 라는 것과 데이터가 어떤 분포를 따른다는 것입니다. MLE에 없는 것은 매개변수에 대한 가정입니다. 데이터에 대한 가정은 두 방법이 똑같이 씁니다.

</div>

## 확인 질문

<div class="cal q">

매개변수가 실수 $\theta$ 하나이고 음의 로그우도가 $\mathcal{L}_D(\theta) = (\theta - 3)^{2}$ 이라고 합시다. 첫째, MLE를 구하세요. 둘째, prior가 $P(\theta) \propto \exp\!\left(-\frac{\theta^{2}}{2}\right)$ 일 때 MAP를 구하세요. 셋째, prior가 $P(\theta) \propto \exp\!\left(-2\theta^{2}\right)$ 로 더 뾰족해지면 MAP가 어떻게 되는지 구하고 세 값을 비교하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

첫째. $(\theta - 3)^{2}$ 을 가장 작게 하는 값이므로 $\hat{\theta}_{\text{MLE}} = 3$ 입니다.

둘째. $-\log P(\theta) = \frac{\theta^{2}}{2} + \text{const.}$ 이므로 최소화할 식은 $(\theta - 3)^{2} + \frac{\theta^{2}}{2}$ 입니다. 미분해서 0으로 두면

$$
2(\theta - 3) + \theta = 0 \quad\Longrightarrow\quad \hat{\theta}_{\text{MAP}} = 2
$$

입니다.

셋째. $-\log P(\theta) = 2\theta^{2} + \text{const.}$ 이므로 최소화할 식은 $(\theta - 3)^{2} + 2\theta^{2}$ 입니다.

$$
2(\theta - 3) + 4\theta = 0 \quad\Longrightarrow\quad \hat{\theta}_{\text{MAP}} = 1
$$

세 값은 $3$, $2$, $1$ 입니다. 음의 로그우도는 세 경우 모두 같았고 더해진 항만 달랐습니다. prior가 0 근처에 더 몰려 있을수록 추정값이 0 쪽으로 더 당겨집니다.

</details>
