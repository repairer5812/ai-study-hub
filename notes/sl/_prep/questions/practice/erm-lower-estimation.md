---
part: B
type: mc
no: 1
points: 3
topic: erm
concepts: [complexity-tradeoff]
answer: d
---

<section data-q="stem">

A neural network is trained by empirical risk minimization over a hypothesis class $\mathcal{H}$. Which of the following does NOT help to reduce the estimation error?

- (a) Collecting more training samples from the same distribution
- (b) Restricting the model to a smaller hypothesis class
- (c) Adding a regularization term that keeps the parameters from fitting the training data too closely
- (d) Adding more layers and more units to the network

</section>

<section data-q="ko">

신경망을 가설 집합 $\mathcal{H}$ 위에서 empirical risk minimization 으로 학습합니다. 다음 중 estimation error 를 줄이는 데 도움이 되지 않는 것은 무엇입니까?

- (a) 같은 분포에서 학습 표본을 더 모은다
- (b) 모형을 더 작은 가설 집합으로 제한한다
- (c) 매개변수가 학습 데이터에 지나치게 맞춰지지 않게 하는 정규화 항을 더한다
- (d) 신경망의 층과 유닛을 늘린다

</section>

<section data-q="answer">

**(d).** 층과 유닛을 늘리면 가설 집합이 커집니다. 표현할 수 있는 함수가 늘어 approximation error는 줄어듭니다. 그러나 같은 표본으로 골라야 할 후보가 많아져 과적합이 쉬워지고 estimation error는 커집니다.

- (a) 표본이 늘면 empirical risk가 true risk에 가까워집니다. 가설 집합을 그대로 둔 채 estimation error를 줄이는 방법입니다.
- (b) 가설 집합을 줄이면 estimation error가 줄어듭니다. 대신 approximation error가 커질 수 있습니다.
- (c) 정규화는 매개변수가 학습 데이터에 과하게 맞춰지는 것을 눌러 줍니다. 실제로 고를 수 있는 함수의 범위를 좁히는 효과라 (b)와 같은 방향입니다.

estimation error는 표본으로 추정하기 때문에 생기는 오차이고 approximation error는 가설 집합을 제한하기 때문에 생기는 오차입니다. 어떤 조치가 어느 쪽을 건드리는지로 판단합니다.

</section>
