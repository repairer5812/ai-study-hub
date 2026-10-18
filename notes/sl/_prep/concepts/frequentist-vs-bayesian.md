---
title: 빈도주의와 베이지안
en: Frequentist vs Bayesian
parent: mle-map
order: 80
summary: 매개변수를 모르지만 고정된 값으로 보느냐 분포를 가진 확률변수로 보느냐의 차이입니다. 같은 우도에서 출발하며 베이지안에서는 prior와 posterior로 매개변수의 불확실성을 나타냅니다.
signal: none
related: []
---

## 왜 필요한가

MLE와 MAP는 모두 우도 $p(D\mid\theta)$ 에서 출발합니다. 우도만 최대화할지, 매개변수에 prior를 두고 posterior를 최대화할지 이해하려면 두 관점을 구분해야 합니다.

이 구분을 알면 prior라는 말이 한쪽에서만 성립하는 이유와 MLE와 MAP가 서로 다른 것을 최대화하는 이유가 함께 풀립니다.

## 정의와 수식

통계학에는 매개변수를 보는 관점이 둘 있습니다.

**빈도주의(frequentist).** 매개변수 $\theta$ 는 값을 모를 뿐 하나로 정해진 수입니다. 무작위인 것은 데이터뿐입니다. 이 모형에서는 매개변수의 분포 $p(\theta)$ 나 prior를 두지 않습니다. 할 수 있는 일은 데이터를 가장 잘 설명하는 값을 찾는 것입니다.

$$
\hat{\theta}_{\text{MLE}} = \arg\max_{\theta} p(D \mid \theta)
$$

**베이지안(Bayesian).** 매개변수 $\theta$ 의 불확실성을 분포로 나타냅니다. 데이터를 보기 전의 믿음을 prior $p(\theta)$ 로 적습니다. 데이터를 본 뒤에는 Bayes rule로 그 믿음을 posterior $p(\theta \mid D)$ 로 고칩니다.

$$
p(\theta \mid D) \propto p(D \mid \theta)\, p(\theta)
$$

### 우도 표기와 두 관점

두 관점에서 우도는 같은 식으로 쓸 수 있습니다. 구별할 것은 매개변수를 다루는 방식입니다.

| | 빈도주의 | 베이지안 |
|---|---|---|
| 매개변수 | 모르지만 고정된 값 | 분포를 가진 확률변수 |
| 데이터의 우도 | $p(D \mid \theta)$ | $p(D \mid \theta)$ |
| prior $p(\theta)$ | 두지 않는다 | 둔다 |
| posterior $p(\theta \mid D)$ | 두지 않는다 | 데이터로 갱신한다 |
| 이 가지의 추정 | [MLE](map.html?s=sl&n=mle-nll) | [MAP](map.html?s=sl&n=map-posterior) |

수업처럼 $p(D\mid\theta)$ 를 쓰면 "매개변수가 $\theta$ 일 때 데이터의 확률 또는 밀도"로 읽습니다. 빈도주의에서도 이 표기를 쓸 수 있습니다. 자료에 따라 $p(D;\theta)$ 라고 쓰기도 하며, 이때 세미콜론은 $\theta$ 가 분포를 정하는 매개변수라는 표시입니다. 이 구분 기호만으로 빈도주의와 베이지안을 판정하지 않습니다.

입력과 레이블을 구분하는 $p(y_i\mid\mathbf x_i;\mathbf w)$ 는 입력 $\mathbf x_i$ 와 매개변수 $\mathbf w$ 가 주어졌을 때 레이블의 확률입니다. 우도의 값을 정하는 조건과 매개변수를 함께 나타낸 표기입니다.

### 동전으로 보는 차이

두 번 던져 두 번 다 앞면이면 빈도주의의 답은 $\hat{\theta}_{\text{MLE}} = 1$ 입니다. 데이터만 놓고 보면 틀린 답이 아닙니다. 베이지안은 동전이 공정한 쪽에 가깝다는 믿음을 prior로 넣을 수 있습니다. 그 prior 아래에서는 $\theta = 1$ 이 그럴듯하지 않으므로 추정값이 $1$ 에서 $0.5$ 쪽으로 물러납니다([가상의 횟수](map.html?s=sl&n=coin-pseudo-counts)).

### 같은 것과 다른 것

데이터가 어떤 분포에서 나왔는지에 대한 가정은 두 관점이 똑같이 씁니다. 노이즈가 가우시안이라는 가정이 그런 예입니다. 갈리는 곳은 매개변수에 분포를 주느냐 하나뿐입니다. 그래서 우도 쪽 식은 양쪽이 같고 베이지안 쪽에만 prior 항이 더 붙습니다([MLE와 MAP는 무엇이 다른가](map.html?s=sl&n=mle-vs-map)).

빈도주의에서는 계수가 커지지 않도록 벌점 항을 따로 더합니다. 베이지안에서는 같은 항이 prior에서 나옵니다. 출발점은 달라도 최소화하는 식은 같은 꼴입니다([가우시안 prior를 두면 ridge가 나온다](map.html?s=sl&n=ridge-map-gaussian-prior)).

## 흔한 오해

<div class="cal trap">

**$p(D\mid\theta)$ 라고 쓰면 베이지안이다**

우도의 막대만으로는 구분할 수 없습니다. MLE에서도 $p(D\mid\theta)$ 를 쓸 수 있습니다. 베이지안 관점인지 확인하려면 $\theta$ 에 prior를 두고 posterior로 갱신하는지를 봅니다.

</div>

<div class="cal trap">

**빈도주의에서도 매개변수에 prior를 줄 수 있다**

줄 수 없습니다. prior는 매개변수의 분포인데 빈도주의에서 매개변수는 분포가 없는 고정된 수입니다. prior와 posterior는 베이지안 관점에서만 쓸 수 있는 말입니다.

</div>

## 확인 질문

<div class="cal q">

고정된 모수를 추정하는 빈도주의 모형에서 다음 네 식의 역할을 구분하세요. 첫째 우도 $p(D\mid\theta)$, 둘째 prior $p(\theta)$, 셋째 posterior $p(\theta\mid D)$, 넷째 $\arg\max_{\theta}p(D\mid\theta)$. 이 모형에서 두지 않는 것은 무엇인가요? 우도에 막대를 쓴다는 이유만으로 베이지안이라고 할 수 있는지도 설명하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

이 빈도주의 모형에서는 둘째 prior와 셋째 posterior를 두지 않습니다. $\theta$ 를 고정된 모수로 보고 데이터의 무작위성을 통해 추정량을 평가하기 때문입니다. 첫째는 우도이고 넷째는 MLE입니다.

$p(D\mid\theta)$ 라는 표기는 두 관점에서 모두 쓸 수 있으므로 막대만으로 베이지안이라고 판단할 수 없습니다.

</details>
