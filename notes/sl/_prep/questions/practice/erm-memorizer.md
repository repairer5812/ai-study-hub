---
part: D
type: essay
no: 1
points: 10
topic: erm
concepts: [generalization]
title: A function that memorizes the training set
---

<section data-q="stem">

Consider regression with the squared loss. The input $x$ follows a continuous distribution, so a new input coincides with a training input with probability $0$, and every label satisfies $0 \le y \le 10$. Given a training set $D = \{(x_i, y_i)\}_{i=1}^{n}$ with distinct $x_i$, define

$$
h(x) = \begin{cases} y_i & \text{if } x = x_i \text{ for some } i \\ 1000 & \text{otherwise} \end{cases}
$$

In two or three sentences, state the empirical risk $\mathcal{L}(h; D)$ and say whether the true risk $R(h)$ is close to $0$ or far from it, giving a reason for each. Then name one way to keep empirical risk minimization from returning such a function.

</section>

<section data-q="ko">

squared loss 를 쓰는 회귀 문제입니다. 입력 $x$ 는 연속 분포를 따르므로 새 입력이 학습 입력과 같을 확률은 0입니다. 모든 레이블은 0 이상 10 이하입니다. 서로 다른 $x_i$ 로 이루어진 학습 데이터 $D$ 에 대해 위와 같이 $h$ 를 정의합니다(학습점에서는 $y_i$, 그 밖에서는 1000).

empirical risk $\mathcal{L}(h; D)$ 의 값을 쓰고 true risk $R(h)$ 가 0에 가까운지 먼지를 각각 이유와 함께 두세 문장으로 답하세요. 이어서 ERM 이 이런 함수를 내놓지 않게 하는 방법을 하나 쓰세요.

</section>

<section data-q="answer">

empirical risk는 0입니다. 모든 학습점에서 $h(x_i) = y_i$ 이므로 손실이 하나도 없습니다.

true risk는 0에서 멉니다. 새 입력은 확률 1로 학습점이 아닙니다. 그때 $h$ 는 1000을 냅니다. 레이블은 10 이하이므로 손실이 적어도 $(1000 - 10)^2 = 980100$ 이고 $R(h) \ge 980100$ 입니다.

empirical risk가 낮다는 사실만으로는 true risk가 낮다고 말할 수 없습니다. 학습 데이터에서는 완벽하고 새 데이터에서는 틀리는 이 현상이 과적합(overfitting)입니다. empirical risk는 학습점 몇 개에서만 손실을 재고 true risk는 입력이 나올 수 있는 모든 곳에서 재기 때문에 생기는 차이입니다.

처방은 모든 함수가 아니라 더 작은 가설 집합 $\mathcal{H}$ 안에서 최소화하는 것입니다. 단순한 모형을 고르는 것이 그 방법입니다. 정규화 항을 넣어 매개변수가 학습 데이터에 과하게 맞춰지지 않게 하는 것도 같은 방향입니다.

</section>

<section data-q="rubric">

모두 10점.

- empirical risk 4점: 값이 0이라는 답(2점), 모든 학습점에서 예측이 레이블과 같기 때문이라는 이유(2점).
- true risk 4점: 0에서 멀다 또는 크다는 답(2점), 새 입력에서는 1000을 내는데 레이블은 10 이하이기 때문이라는 이유(2점). 새 입력에서 1000을 낸다는 것만 쓰고 레이블의 범위와 견주지 않았으면 이유 점수 1점. 하한 $990^2 = 980100$ 을 구하지 않아도 이유가 맞으면 만점. "true risk도 0이다"라고 답하면 이 항목 0점.
- 처방 2점: 더 작은 가설 집합에서 찾는다, 단순한 모형을 쓴다, 정규화를 넣는다 가운데 하나면 2점. Occam's razor 를 들어도 인정. "데이터를 더 모은다"만 쓰면 1점(모든 함수 가운데에서 고르는 한, 표본이 늘어도 이런 함수는 여전히 empirical risk가 0이다).

과적합(overfitting)이라는 낱말이나 "empirical risk가 낮아도 true risk가 낮다는 보장이 없다"는 해석은 문제가 묻지 않았으므로 없어도 감점하지 않는다.

</section>

<section data-q="checks">

@ empirical risk
- 2 | empirical risk의 값이 0이라고 썼다
- 2 | 모든 학습점에서 예측이 레이블과 같기 때문이라는 이유를 썼다

@ true risk
- 2 | true risk가 0에서 멀다 또는 크다고 썼다("true risk도 0이다"라고 답했으면 이 묶음은 모두 체크하지 않는다)
- 1 | 새 입력에서는 $h$ 가 1000을 낸다는 것을 이유로 썼다
- 1 | 거기에 더해 레이블은 10 이하라는 것과 견주었다(하한 $990^2 = 980100$ 은 구하지 않아도 된다)

@ 처방
- 1 | 처방을 썼다. 더 작은 가설 집합에서 찾는다, 단순한 모형을 쓴다, 정규화를 넣는다, Occam's razor, 데이터를 더 모은다 가운데 하나면 된다
- 1 | 그 처방이 "데이터를 더 모은다"만이 아니라 나머지 넷 가운데 하나를 담고 있다

</section>
