---
part: D
type: calc
no: 1
points: 10
topic: supervised-learning
concepts: [loss-function]
title: Three losses on four samples
---

<section data-q="stem">

A model $h$ is evaluated on four samples. The pairs $(y_i, h(\mathbf{x}_i))$ of true label and prediction are

$$
(3, 3), \quad (5, 4), \quad (2, 3), \quad (9, 3)
$$

(a) Compute the empirical risk $\mathcal{L}(h; D)$ under the zero-one loss, under the squared loss and under the absolute loss.

(b) For the squared loss and for the absolute loss, what fraction of the total loss (the sum over the four samples) comes from the fourth sample alone?

(c) The fourth label turns out to be a recording error; the correct label is $4$. Recompute the three empirical risks with $(4, 3)$ in place of $(9, 3)$. Which of the three risks changed the most, and which one did not change at all?

</section>

<section data-q="ko">

모형 $h$ 를 표본 네 개로 평가합니다. 정답과 예측의 쌍 $(y_i, h(\mathbf{x}_i))$ 는 위와 같습니다.

(a) zero-one loss, squared loss, absolute loss 각각으로 empirical risk 를 계산하세요.

(b) squared loss 와 absolute loss 각각에서, 네 표본의 손실 합 가운데 넷째 표본 하나가 차지하는 비율은 얼마입니까?

(c) 넷째 레이블은 기록 오류였고 옳은 값은 4입니다. $(9, 3)$ 을 $(4, 3)$ 으로 바꿔 세 empirical risk 를 다시 계산하세요. 셋 가운데 가장 크게 바뀐 것과 전혀 바뀌지 않은 것은 무엇입니까?

</section>

<section data-q="answer">

표본별 손실을 먼저 표로 만듭니다.

| $(y_i, h(\mathbf{x}_i))$ | $h(\mathbf{x}_i) - y_i$ | zero-one | squared | absolute |
|---|---|---|---|---|
| $(3, 3)$ | $0$ | $0$ | $0$ | $0$ |
| $(5, 4)$ | $-1$ | $1$ | $1$ | $1$ |
| $(2, 3)$ | $1$ | $1$ | $1$ | $1$ |
| $(9, 3)$ | $-6$ | $1$ | $36$ | $6$ |

(a) empirical risk는 표본 평균입니다.

$$
\begin{aligned}
\text{zero-one:} \quad & \frac{0 + 1 + 1 + 1}{4} = \frac{3}{4} = 0.75 \\[0.4em]
\text{squared:} \quad & \frac{0 + 1 + 1 + 36}{4} = \frac{38}{4} = 9.5 \\[0.4em]
\text{absolute:} \quad & \frac{0 + 1 + 1 + 6}{4} = \frac{8}{4} = 2
\end{aligned}
$$

(b) squared loss에서는 $36/38 = 18/19 \approx 0.947$, absolute loss에서는 $6/8 = 0.75$ 입니다. 같은 표본 하나가 squared loss의 합에서는 약 95%를, absolute loss의 합에서는 75%를 차지합니다.

(c) 넷째 표본의 손실이 zero-one 1, squared 1, absolute 1로 바뀝니다.

$$
\begin{aligned}
\text{zero-one:} \quad & \frac{0 + 1 + 1 + 1}{4} = \frac{3}{4} \\[0.4em]
\text{squared:} \quad & \frac{0 + 1 + 1 + 1}{4} = \frac{3}{4} \\[0.4em]
\text{absolute:} \quad & \frac{0 + 1 + 1 + 1}{4} = \frac{3}{4}
\end{aligned}
$$

squared loss의 risk가 9.5에서 0.75로 가장 크게 바뀌었습니다(약 12.7분의 1). absolute loss의 risk는 2에서 0.75로 바뀌었습니다. zero-one loss의 risk는 0.75 그대로입니다. 예측 3은 레이블이 9든 4든 틀린 것이기 때문입니다.

오차가 6일 때 squared loss는 36, absolute loss는 6입니다. 오차가 커질수록 squared loss가 제곱으로 불어나므로 멀리 떨어진 표본 하나가 평균을 끌고 갑니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 3점: zero-one $3/4$ (1점), squared $38/4 = 9.5$ (1점), absolute $8/4 = 2$ (1점). 평균을 내지 않고 합(3, 38, 8)만 쓰면 각 0.5점.
- (b) 2점: squared $36/38$ (1점), absolute $6/8$ (1점). $18/19$, 약 $0.947$, 약 95%와 $3/4$, $0.75$, 75%는 모두 정답. (a)에서 계산을 틀렸더라도 그 값과 맞게 비율을 냈으면 각 0.5점.
- (c) 5점: 다시 계산한 값 zero-one $3/4$ (1점), squared $3/4$ (1점), absolute $3/4$ (1점). 가장 크게 바뀐 것이 squared loss의 risk라는 답(1점). 바뀌지 않은 것이 zero-one loss의 risk라는 답(1점). 바뀐 정도를 차이(8.75와 1.25)로 비교하든 비율로 비교하든 정답.

</section>
