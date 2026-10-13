---
part: B
type: mc
no: 1
points: 3
topic: mle-map
concepts: [mle-nll]
answer: c
---

<section data-q="stem">

Which of the following is NOT a valid reason for maximizing the log-likelihood instead of the likelihood itself?

- (a) The logarithm is monotonically increasing, so the maximizing $\boldsymbol{\theta}$ is the same.
- (b) The logarithm turns the product over i.i.d. samples into a sum, which is easier to differentiate.
- (c) Taking the logarithm moves the maximizer to a $\boldsymbol{\theta}$ that fits the data better than the maximizer of the likelihood.
- (d) A product of many probabilities becomes so close to $0$ that a computer cannot represent it, and a sum of logarithms avoids this.

</section>

<section data-q="ko">

우도 대신 로그우도를 최대화하는 이유로 옳지 않은 것은 무엇입니까?

- (a) 로그는 단조 증가 함수라서 최대가 되는 $\boldsymbol{\theta}$ 가 같다.
- (b) 로그를 취하면 i.i.d. 표본에 대한 곱이 합으로 바뀌어 미분하기 쉽다.
- (c) 로그를 취하면 최대점이 우도의 최대점보다 데이터에 더 잘 맞는 $\boldsymbol{\theta}$ 로 옮겨 간다.
- (d) 확률을 많이 곱하면 0에 너무 가까워져 컴퓨터가 나타내지 못하는데 로그의 합은 이 문제를 피한다.

</section>

<section data-q="answer">

**(c).** 로그는 최대점을 옮기지 않습니다. 옮기지 않는다는 사실이 로그를 써도 되는 근거입니다. 더 나은 해가 나온다면 그것은 처음 풀려던 문제와 다른 문제를 푼 것입니다.

- (a)는 옳은 이유입니다. $a > b > 0$ 이면 $\log a > \log b$ 이므로 우도를 가장 크게 하는 $\boldsymbol{\theta}$ 가 로그우도도 가장 크게 합니다.
- (b)도 옳습니다. i.i.d. 가정에서 우도는 표본별 확률의 곱입니다. 곱은 미분하면 항이 불어나지만 합은 항마다 따로 미분하면 됩니다.
- (d)도 옳습니다. 1보다 작은 수를 수천 번 곱한 값은 컴퓨터가 0과 구별하지 못합니다. 로그를 취해 더하면 값이 다룰 수 있는 범위에 머뭅니다.

</section>
