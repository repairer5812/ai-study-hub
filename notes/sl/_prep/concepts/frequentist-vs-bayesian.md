---
title: 빈도주의와 베이지안
en: Frequentist vs Bayesian
parent: mle-map
order: 80
summary: 매개변수를 모르지만 고정된 값으로 보느냐 분포를 가진 확률변수로 보느냐의 차이입니다. 앞의 관점에서는 세미콜론을 쓰고 뒤의 관점에서는 막대를 씁니다.
signal: none
related: []
---

## 왜 필요한가

MLE에서는 $P(D ; \theta)$ 라고 썼고 MAP에서는 $P(D \mid \theta)$ 라고 썼습니다. 같은 값을 가리키는데 기호가 다릅니다. 표기가 흔들린 것이 아니라 매개변수를 무엇으로 보는지가 다릅니다.

이 구분을 알면 prior라는 말이 한쪽에서만 성립하는 이유와 MLE와 MAP가 서로 다른 것을 최대화하는 이유가 함께 풀립니다.

## 정의와 수식

통계학에는 매개변수를 보는 관점이 둘 있습니다.

**빈도주의(frequentist).** 매개변수 $\theta$ 는 값을 모를 뿐 하나로 정해진 수입니다. 무작위인 것은 데이터뿐입니다. 정해진 수에는 분포가 없으므로 $P(\theta)$ 라는 식을 쓸 수 없고 prior도 없습니다. 할 수 있는 일은 데이터를 가장 잘 설명하는 값을 찾는 것입니다.

$$
\hat{\theta}_{\text{MLE}} = \arg\max_{\theta} P(D ; \theta)
$$

**베이지안(Bayesian).** 매개변수 $\theta$ 도 확률변수입니다. 데이터를 보기 전의 믿음을 prior $P(\theta)$ 로 적습니다. 데이터를 본 뒤에는 Bayes rule로 그 믿음을 posterior $P(\theta \mid D)$ 로 고칩니다.

$$
P(\theta \mid D) \propto P(D \mid \theta)\, P(\theta)
$$

### 세미콜론과 막대

두 관점은 기호로 구별합니다.

| | 빈도주의 | 베이지안 |
|---|---|---|
| 매개변수 | 모르지만 고정된 값 | 분포를 가진 확률변수 |
| 데이터의 확률 | $P(D ; \theta)$ | $P(D \mid \theta)$ |
| 구분 기호 | 세미콜론 | 막대 |
| prior $P(\theta)$ | 없다 | 있다 |
| posterior $P(\theta \mid D)$ | 쓸 수 없다 | 쓸 수 있다 |
| 이 가지의 추정 | [MLE](map.html?s=sl&n=mle-nll) | [MAP](map.html?s=sl&n=map-posterior) |

막대는 확률변수에 조건을 건다는 기호입니다. $\theta$ 가 확률변수일 때만 뜻이 있습니다. 세미콜론은 "이 분포의 모양을 정하는 수가 $\theta$ 다"라는 표시입니다. $\theta$ 와 $D$ 가 정해지면 $P(D ; \theta)$ 와 $P(D \mid \theta)$ 는 같은 수입니다.

한 식에 둘이 함께 나오기도 합니다. $P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 에서 입력 $\mathbf{x}_i$ 는 확률변수라서 막대 뒤에 있고 $\mathbf{w}$ 는 매개변수라서 세미콜론 뒤에 있습니다.

이 지도는 매개변수를 고정된 값으로 다룰 때 세미콜론을 쓰고 확률변수로 다룰 때 막대를 씁니다. MAP 유도 안에서도 표본 하나의 확률은 $P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 처럼 세미콜론으로 둡니다. MLE에서 쓴 식을 그대로 가져왔다는 표시이고 값은 같습니다.

### 동전으로 보는 차이

두 번 던져 두 번 다 앞면이면 빈도주의의 답은 $\hat{\theta}_{\text{MLE}} = 1$ 입니다. 데이터만 놓고 보면 틀린 답이 아닙니다. 베이지안은 동전이 공정한 쪽에 가깝다는 믿음을 prior로 넣을 수 있습니다. 그 prior 아래에서는 $\theta = 1$ 이 그럴듯하지 않으므로 추정값이 $1$ 에서 $0.5$ 쪽으로 물러납니다([가상의 횟수](map.html?s=sl&n=coin-pseudo-counts)).

### 같은 것과 다른 것

데이터가 어떤 분포에서 나왔는지에 대한 가정은 두 관점이 똑같이 씁니다. 노이즈가 가우시안이라는 가정이 그런 예입니다. 갈리는 곳은 매개변수에 분포를 주느냐 하나뿐입니다. 그래서 우도 쪽 식은 양쪽이 같고 베이지안 쪽에만 prior 항이 더 붙습니다([MLE와 MAP는 무엇이 다른가](map.html?s=sl&n=mle-vs-map)).

빈도주의에서는 계수가 커지지 않도록 벌점 항을 따로 더합니다. 베이지안에서는 같은 항이 prior에서 나옵니다. 출발점은 달라도 최소화하는 식은 같은 꼴입니다([가우시안 prior를 두면 ridge가 나온다](map.html?s=sl&n=ridge-map-gaussian-prior)).

## 흔한 오해

<div class="cal trap">

**$P(D \mid \theta)$ 는 조건부 확률이고 $P(D ; \theta)$ 는 조건부 확률이 아니다**

둘 다 "매개변수가 $\theta$ 일 때 데이터가 나올 확률"입니다. 차이는 조건부냐 아니냐가 아니라 $\theta$ 가 확률변수냐 아니냐입니다. 막대를 쓰면 $\theta$ 에도 분포가 있다고 보는 것이고 세미콜론을 쓰면 $\theta$ 를 정해진 수로 보는 것입니다.

</div>

<div class="cal trap">

**빈도주의에서도 매개변수에 prior를 줄 수 있다**

줄 수 없습니다. prior는 매개변수의 분포인데 빈도주의에서 매개변수는 분포가 없는 고정된 수입니다. prior와 posterior는 베이지안 관점에서만 쓸 수 있는 말입니다.

</div>

## 확인 질문

<div class="cal q">

다음 네 식 가운데 빈도주의 관점에서 쓸 수 없는 것을 모두 고르고 이유를 적으세요. 첫째 $P(D ; \theta)$, 둘째 $P(\theta)$, 셋째 $P(\theta \mid D)$, 넷째 $\arg\max_{\theta} P(D ; \theta)$. 그리고 $P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 에서 막대와 세미콜론이 각각 무엇을 구분하는지 한 문장씩 쓰세요.

</div>

<details class="solve">
<summary>답 보기</summary>

쓸 수 없는 것은 둘째와 셋째입니다. 둘 다 $\theta$ 의 분포입니다. 빈도주의에서 $\theta$ 는 고정된 수라서 분포를 가질 수 없습니다. 첫째와 넷째는 데이터의 확률과 그것을 가장 크게 하는 값이라서 쓸 수 있습니다.

$P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 에서 막대는 확률변수인 입력 $\mathbf{x}_i$ 에 조건을 건다는 표시입니다. 세미콜론은 $\mathbf{w}$ 가 확률변수가 아니라 이 분포의 모양을 정하는 매개변수라는 표시입니다.

</details>
