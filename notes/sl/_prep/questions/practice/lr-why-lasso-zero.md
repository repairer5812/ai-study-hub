---
part: D
type: essay
no: 1
points: 10
topic: linear-regression
concepts: [ridge-vs-lasso]
title: Slopes of the two penalties
---

<section data-q="stem">

Consider a single weight $w > 0$ under two penalties with $\lambda > 0$: the L2 penalty $\lambda w^2$ and the L1 penalty $\lambda \lvert w \rvert$.

Write the slope (the derivative with respect to $w$) of each penalty. Then use the slopes to explain in two or three sentences which penalty can push a weight exactly to $0$ and which one only shrinks it toward $0$. Also give the name of the regression method that uses each penalty.

</section>

<section data-q="ko">

가중치 하나 $w > 0$ 에 두 가지 벌점을 생각합니다($\lambda > 0$). L2 벌점 $\lambda w^2$ 과 L1 벌점 $\lambda \lvert w \rvert$ 입니다.

두 벌점을 $w$ 로 미분한 기울기를 쓰세요. 그 기울기를 근거로 가중치를 정확히 0으로 만들 수 있는 벌점은 어느 쪽이고 0 쪽으로 줄이기만 하는 벌점은 어느 쪽인지 두세 문장으로 설명하세요. 각 벌점을 쓰는 회귀 방법의 이름도 쓰세요.

</section>

<section data-q="answer">

$$
\begin{aligned}
\frac{d}{dw}\, \lambda w^2 &= 2\lambda w \\[0.4em]
\frac{d}{dw}\, \lambda \lvert w \rvert &= \lambda \quad (w > 0)
\end{aligned}
$$

L2 벌점의 기울기는 $w$ 에 비례합니다. $w$ 가 크면 세게 밀지만 0에 가까워질수록 미는 힘도 0으로 줄어듭니다. 그래서 가중치를 0 가까이로 모으기는 해도 정확히 0에 닿게 하지는 못합니다. 이 벌점을 쓰는 것이 ridge regression입니다.

L1 벌점의 기울기는 $w$ 의 크기와 무관하게 $\lambda$ 로 일정합니다. $w$ 가 아무리 작아져도 같은 힘으로 계속 밉니다. 이 힘은 $w$ 가 0이 되어야 멈춥니다. 그래서 일부 가중치가 정확히 0이 됩니다. 이 벌점을 쓰는 것이 lasso regression입니다.

가중치가 0이 된 변수는 모형에서 빠진 것과 같습니다. 어떤 변수가 필요한지 고르는 변수 선택에는 lasso가 알맞습니다. ridge는 변수를 빼지는 않고 계수가 지나치게 커지는 것을 눌러 줍니다.

</section>

<section data-q="rubric">

모두 10점.

- L2 벌점의 기울기 2점: $2\lambda w$. 계수 2가 빠져 $\lambda w$ 라고 쓰거나 $\lambda$ 가 빠져 $2w$ 라고 쓰면 1점.
- L1 벌점의 기울기 2점: $\lambda$. 일반형 $\lambda\,\text{sign}(w)$ 도 정답. $\lambda$ 를 빼고 1 또는 $\text{sign}(w)$ 라고만 쓰면 1점(문제의 벌점은 $\lambda \lvert w \rvert$ 이므로 기울기에 $\lambda$ 가 남는다).
- 요점 하나 2점: L2 쪽 기울기는 $w$ 가 0에 가까워질수록 0으로 줄어든다. 그래서 0에 닿지 못한다는 설명까지 있으면 만점, 기울기가 $w$ 에 비례한다고만 쓰면 1점.
- 요점 둘 2점: L1 쪽 기울기는 $w$ 의 크기와 무관하게 일정하다. 그래서 0이 될 때까지 계속 민다는 설명까지 있으면 만점, 일정하다고만 쓰면 1점.
- 결론과 이름 2점: 정확히 0으로 만들 수 있는 것은 L1 벌점이고 L2 벌점은 0 쪽으로 줄이기만 한다(1점). L2 벌점은 ridge, L1 벌점은 lasso(1점. 둘 다 맞아야 하고 "릿지", "라쏘"도 정답). 0이 되는 쪽을 반대로 답하면 결론 점수는 0점이고 요점 하나와 요점 둘도 각각 1점까지만 준다.

변수 선택에 관한 언급은 없어도 감점하지 않는다.

</section>

<section data-q="checks">

@ L2 벌점의 기울기
- 1 | 기울기를 $2\lambda w$, $\lambda w$, $2w$ 가운데 하나로 썼다
- 1 | 계수 2와 $\lambda$ 가 모두 들어간 $2\lambda w$ 를 썼다

@ L1 벌점의 기울기
- 1 | 기울기를 $\lambda$, $\lambda\,\text{sign}(w)$, 1, $\text{sign}(w)$ 가운데 하나로 썼다
- 1 | $\lambda$ 가 들어간 $\lambda$ 또는 $\lambda\,\text{sign}(w)$ 를 썼다

@ 요점 하나
- 1 | L2 쪽 기울기가 $w$ 에 비례한다는 것을 썼다($w$ 가 0에 가까워질수록 0으로 줄어든다고 써도 된다)
- 1 | 거기에 더해 그래서 0에 닿지 못한다는 설명까지 썼다(0이 되는 쪽을 반대로 답했으면 체크하지 않는다)

@ 요점 둘
- 1 | L1 쪽 기울기가 $w$ 의 크기와 무관하게 일정하다는 것을 썼다
- 1 | 거기에 더해 그래서 0이 될 때까지 계속 민다는 설명까지 썼다(0이 되는 쪽을 반대로 답했으면 체크하지 않는다)

@ 결론과 이름
- 1 | 정확히 0으로 만들 수 있는 것은 L1 벌점이고 L2 벌점은 0 쪽으로 줄이기만 한다고 썼다
- 1 | L2 벌점은 ridge, L1 벌점은 lasso라고 썼다(둘 다 맞아야 한다. "릿지", "라쏘"도 된다)

</section>
