---
part: B
type: mc
no: 2
points: 3
topic: mle-map
concepts: [conditional-likelihood]
answer: a
---

<section data-q="stem">

When the negative log-likelihood of a supervised model with parameter $\boldsymbol{\theta}$ is derived, the part that involves only the distribution of the inputs $\mathbf{x}_i$ is removed from the objective. Why is this allowed?

- (a) $\boldsymbol{\theta}$ describes only how $y$ depends on $\mathbf{x}$, so the distribution of the inputs is not a function of $\boldsymbol{\theta}$.
- (b) The inputs have been observed, so their probability is $1$ and its logarithm is $0$.
- (c) The samples are i.i.d., so the input terms of different samples cancel one another.
- (d) When $n$ is large the input part is much smaller than the label part, so it is ignored as an approximation.

</section>

<section data-q="ko">

매개변수 $\boldsymbol{\theta}$ 를 가진 지도학습 모형의 음의 로그우도를 유도할 때, 입력 $\mathbf{x}_i$ 의 분포만 들어 있는 부분은 목적함수에서 뺍니다. 왜 빼도 됩니까?

- (a) $\boldsymbol{\theta}$ 는 $y$ 가 $\mathbf{x}$ 에 어떻게 의존하는지만 나타내므로 입력의 분포는 $\boldsymbol{\theta}$ 의 함수가 아니다.
- (b) 입력은 이미 관측했으므로 그 확률이 1이고 로그는 0이다.
- (c) 표본이 i.i.d.이므로 서로 다른 표본의 입력 항이 상쇄된다.
- (d) $n$ 이 크면 입력 쪽 부분이 레이블 쪽 부분보다 훨씬 작으므로 근사로 무시한다.

</section>

<section data-q="answer">

**(a).** $\boldsymbol{\theta}$ 는 입력을 받아 레이블을 내는 예측 모형의 매개변수입니다. 입력이 어떻게 분포하는지는 이 모형이 설명하는 대상이 아닙니다. 그래서 입력 쪽 부분은 $\boldsymbol{\theta}$ 를 바꿔도 값이 그대로인 상수입니다. 상수를 빼도 최소가 되는 $\boldsymbol{\theta}$ 는 바뀌지 않습니다. 이것은 증명되는 사실이 아니라 모형을 그렇게 두겠다는 가정입니다.

- (b) 관측했다고 확률이 1이 되지는 않습니다. 그 논리라면 레이블도 관측했으니 우도 전체가 1이 됩니다.
- (c) i.i.d. 가정이 하는 일은 결합 확률을 표본별 곱으로 나누는 것입니다. 항끼리 상쇄시키지는 않습니다.
- (d) 근사가 아닙니다. 입력 쪽 부분이 얼마나 크든 $\boldsymbol{\theta}$ 와 무관하므로 최소점은 정확히 같습니다.

</section>
