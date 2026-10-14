---
part: D
type: calc
no: 2
points: 10
topic: logistic-regression
concepts: [decision-boundary, logreg-mle-objective]
title: Boundary and loss in one variable
---

<section data-q="stem">

A univariate logistic regression model with labels $y \in \{-1, +1\}$ has $P(y = +1 \mid x) = \phi(w_1 x + w_0)$, where $\phi(z) = \frac{1}{1 + e^{-z}}$, $w_1 = \ln 3$ and $w_0 = -2\ln 3$. Throughout, $\ln$ and $\log$ both denote the natural logarithm.

(a) Find the decision boundary for the threshold $0.5$ and state the value of $P(y = +1 \mid x)$ on it.

(b) Without evaluating $\phi$, classify $x = 5$ and $x = 0.5$.

(c) The MLE of logistic regression minimizes a sum of per-sample losses. Write the loss of one sample $(x_i, y_i)$ for labels in $\{-1, +1\}$. Then evaluate it for the three samples $(x, y) = (2, +1)$, $(3, +1)$ and $(3, -1)$, leaving the answers as logarithms, and say which sample is penalized most and why.

</section>

<section data-q="ko">

레이블이 $y \in \{-1, +1\}$ 인 단변량 로지스틱 회귀 모형이 $P(y = +1 \mid x) = \phi(w_1 x + w_0)$ 이고 $w_1 = \ln 3$, $w_0 = -2\ln 3$ 입니다. $\ln$ 과 $\log$ 는 모두 자연로그입니다.

(a) 임계값 0.5에서의 결정 경계를 구하고 경계 위에서 $P(y = +1 \mid x)$ 의 값을 쓰세요.

(b) $\phi$ 의 값을 계산하지 말고 $x = 5$ 와 $x = 0.5$ 를 분류하세요.

(c) 로지스틱 회귀의 MLE는 표본별 손실의 합을 최소화합니다. 레이블이 $\{-1, +1\}$ 일 때 표본 하나 $(x_i, y_i)$ 의 손실을 쓰세요. 이어서 세 표본 $(x, y) = (2, +1)$, $(3, +1)$, $(3, -1)$ 에서 그 값을 로그 꼴로 구하고 어느 표본의 손실이 가장 큰지와 그 이유를 쓰세요.

</section>

<section data-q="answer">

선형식을 먼저 정리합니다. $w_1 x + w_0 = (x - 2)\ln 3$ 입니다.

(a) $+1$ 로 예측하는 조건은 $P(y = +1 \mid x) \ge 0.5$ 입니다. 이것은 선형식이 0 이상이라는 조건과 같습니다. 경계는 $(x - 2)\ln 3 = 0$, 곧 $x = 2$ 입니다. 경계 위에서 $P(y = +1 \mid x) = \phi(0) = 0.5$ 입니다.

(b) 선형식의 부호만 봅니다. $x = 5$ 에서는 $3\ln 3 > 0$ 이므로 $+1$, $x = 0.5$ 에서는 $-1.5\ln 3 < 0$ 이므로 $-1$ 입니다. $\ln 3 > 0$ 이라 경계의 오른쪽이 $+1$ 쪽입니다.

(c) 표본 하나의 손실은 그 표본의 레이블이 나올 확률의 음의 로그입니다.

$$
\ell_i(\mathbf{w}) = \log\!\left( 1 + e^{-y_i (w_1 x_i + w_0)} \right)
$$

세 표본에 넣습니다.

| $(x, y)$ | $w_1 x + w_0$ | 손실 | 근삿값 |
|---|---|---|---|
| $(2, +1)$ | $0$ | $\log(1 + e^{0}) = \log 2$ | $0.693$ |
| $(3, +1)$ | $\ln 3$ | $\log\!\left(1 + \frac{1}{3}\right) = \log\frac{4}{3}$ | $0.288$ |
| $(3, -1)$ | $\ln 3$ | $\log(1 + 3) = \log 4$ | $1.386$ |

손실이 가장 큰 것은 $(3, -1)$ 입니다. $x = 3$ 에서 모형은 $P(y = +1 \mid x) = \frac{3}{4}$ 이라고 보는데 실제 레이블은 $-1$ 입니다. 모형이 이 레이블에 준 확률이 $\frac{1}{4}$ 뿐이라 손실이 $-\log\frac{1}{4} = \log 4$ 로 큽니다. 경계 위의 표본은 확률이 $\frac{1}{2}$ 이라 $\log 2$, 옳은 쪽에 있는 표본은 확률이 $\frac{3}{4}$ 이라 $\log\frac{4}{3}$ 입니다. $y_i (w_1 x_i + w_0)$ 가 클수록 손실은 0에 가까워지고 음수로 갈수록 커집니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 2점: 경계 $x = 2$ (1점), 경계 위에서 확률 $0.5$ (1점). 경계를 $w_1 x + w_0 = 0$ 이라고만 쓰고 $x$ 의 값을 구하지 않으면 경계 점수 0.5점.
- (b) 2점: $x = 5$ 는 $+1$ (1점), $x = 0.5$ 는 $-1$ (1점). 선형식의 부호나 경계와의 위치로 판정했으면 정답. $\phi$ 의 값을 계산해 판정했더라도 결론이 맞으면 점수를 준다. 이유 없이 답만 쓰면 각 0.5점.
- (c) 6점: 손실의 식 $\log(1 + e^{-y_i(w_1 x_i + w_0)})$ (2점), 값 $\log 2$ (1점), $\log\frac{4}{3}$ (1점), $\log 4$ (1점), 가장 큰 것이 $(3, -1)$ 이고 모형이 그 레이블에 낮은 확률을 주었기 때문(틀린 쪽에 있기 때문)이라는 설명(1점). 손실의 식은 $-\log\phi(y_i(w_1 x_i + w_0))$, $-\log P(y_i \mid x_i)$, $\log(1 + e^{-y_i z_i})$ 꼴도 정답. 지수의 부호가 반대면 식 점수 0점. 그 식으로 일관되게 계산한 값은 각 0.5점. 값은 $\ln 2$, $\ln 4 - \ln 3$, $2\ln 2$ 처럼 같은 수면 정답이고 소수 $0.693$, $0.288$, $1.386$ 으로 써도 정답.

</section>

<section data-q="checks">

@ (a) 결정 경계
- 0.5 | 경계가 선형식이 0인 곳 $w_1 x + w_0 = 0$ 임을 썼다($x = 2$ 를 바로 썼어도 체크한다)
- 0.5 | 거기에 더해 $x = 2$ 를 구했다
- 1 | 경계 위에서 $P(y = +1 \mid x) = 0.5$ 라고 썼다

@ (b) 분류
- 0.5 | $x = 5$ 를 $+1$ 로 분류했다
- 0.5 | 거기에 더해 $x = 5$ 를 그렇게 분류한 이유를 썼다(선형식의 부호, 경계와의 위치, $\phi$ 의 값 가운데 어느 것이든 된다)
- 0.5 | $x = 0.5$ 를 $-1$ 로 분류했다
- 0.5 | 거기에 더해 $x = 0.5$ 를 그렇게 분류한 이유를 썼다(선형식의 부호, 경계와의 위치, $\phi$ 의 값 가운데 어느 것이든 된다)

@ (c) 표본별 손실
- 2 | 손실의 식 $\log(1 + e^{-y_i(w_1 x_i + w_0)})$ 를 썼다. $-\log\phi(y_i(w_1 x_i + w_0))$, $-\log P(y_i \mid x_i)$, $\log(1 + e^{-y_i z_i})$ 꼴도 된다. 지수의 부호가 반대면 안 된다
- 1 | $(2, +1)$ 의 손실 $\log 2$ 가 맞다($\ln 2$, $0.693$ 도 된다)
- 1 | $(3, +1)$ 의 손실 $\log\frac{4}{3}$ 이 맞다($\ln 4 - \ln 3$, $0.288$ 도 된다)
- 1 | $(3, -1)$ 의 손실 $\log 4$ 가 맞다($2\ln 2$, $1.386$ 도 된다)
- 1 | 손실이 가장 큰 것이 $(3, -1)$ 이고, 모형이 그 레이블에 낮은 확률을 주었기 때문(틀린 쪽에 있기 때문)이라고 썼다

</section>
