---
part: C
type: blank
no: 1
points: 12
topic: logistic-regression
concepts: [odds-logit, decision-boundary]
title: When does the model predict class 1?
---

<section data-q="stem">

A univariate logistic regression model for labels $y \in \{0, 1\}$ sets

$$
p(x) = P(y = 1 \mid x) = \frac{e^{w_1 x + w_0}}{1 + e^{w_1 x + w_0}}
$$

Fill in the blanks to find when class $1$ is at least as likely as class $0$.

$$
\begin{aligned}
1 - p(x) &= \blank{1} \\[0.6em]
\frac{p(x)}{1 - p(x)} &= \blank{2} \\[0.6em]
\log \frac{p(x)}{1 - p(x)} &= \blank{3}
\end{aligned}
$$

The ratio $\frac{p(x)}{1 - p(x)}$ is called the $\blank{4}$, and its logarithm is called the $\blank{5}$.

$$
\begin{aligned}
&p(x) \ge 1 - p(x) \\[0.4em]
&\Leftrightarrow\; \frac{p(x)}{1 - p(x)} \ge \blank{6} \\[0.4em]
&\Leftrightarrow\; \blank{3} \ge \blank{7}
\end{aligned}
$$

On the decision boundary the two classes are equally likely, so $p(x) = \blank{8}$ there.

</section>

<section data-q="ko">

레이블이 $y \in \{0, 1\}$ 인 단변량 로지스틱 회귀 모형이 $p(x) = P(y = 1 \mid x)$ 를 위와 같이 둡니다. 빈칸을 채워 클래스 1의 확률이 클래스 0의 확률보다 크거나 같아지는 조건을 구하세요. 같은 번호의 빈칸에는 같은 식이 들어갑니다. (4)와 (5)에는 이름을, (6), (7), (8)에는 수를 씁니다.

</section>

<section data-q="answer">

- (1) $\dfrac{1}{1 + e^{w_1 x + w_0}}$
- (2) $e^{w_1 x + w_0}$
- (3) $w_1 x + w_0$
- (4) odds
- (5) logit. log odds 도 같은 답입니다.
- (6) $1$
- (7) $0$
- (8) $0.5$

(1)은 통분입니다. $1 - \frac{e^{a}}{1 + e^{a}} = \frac{1}{1 + e^{a}}$ 입니다. (2)에서는 $p(x)$ 와 $1 - p(x)$ 의 분모가 같아서 상쇄되고 분자끼리의 비만 남습니다. (3)은 양변에 로그를 취한 것입니다. 로그와 지수가 서로 지워져 $x$ 의 일차식이 남습니다.

부등식 쪽은 이렇게 읽습니다. 양수 $1 - p(x)$ 로 양변을 나누면 odds가 1 이상이라는 조건이 됩니다(6). 로그는 단조 증가이므로 양변에 로그를 취해도 부등호의 방향이 그대로이고 $\log 1 = 0$ 입니다(7). 그래서 클래스 1로 예측하는 조건은 $w_1 x + w_0 \ge 0$ 입니다.

확률 $p(x)$ 는 $x$ 에 대해 S자 곡선입니다. $x$ 에 선형인 것은 logit입니다. 결정 경계 $w_1 x + w_0 = 0$ 이 선형으로 나오기 때문에 로지스틱 회귀를 선형 모형이라 부릅니다. 경계 위에서는 $p(x) = 1 - p(x)$ 이므로 $p(x) = 0.5$ 입니다(8). 이때 odds는 1, logit은 0입니다.

</section>

<section data-q="rubric">

모두 12점. (1), (2), (3), (8)은 2점씩, (4), (5), (6), (7)은 1점씩.

- (1) 2점: $\frac{1}{1 + e^{w_1 x + w_0}}$. 분자와 분모에 $e^{-(w_1 x + w_0)}$ 를 곱한 $\frac{e^{-(w_1 x + w_0)}}{1 + e^{-(w_1 x + w_0)}}$ 도 정답. $1 - \frac{e^{w_1 x + w_0}}{1 + e^{w_1 x + w_0}}$ 처럼 정리하지 않고 두면 1점. 분모의 지수 부호를 틀려 $\frac{1}{1 + e^{-(w_1 x + w_0)}}$ 이라 쓰면 0점(그것은 $p(x)$ 자신이다).
- (2) 2점: $e^{w_1 x + w_0}$. $\exp(w_1 x + w_0)$ 도 정답. 지수의 부호가 반대면 0점.
- (3) 2점: $w_1 x + w_0$. 항의 순서가 바뀌어도 정답. 부호가 반대면 0점.
- (4) 1점: odds. "오즈", "odds ratio"도 인정.
- (5) 1점: logit 또는 log odds. "로짓"도 정답.
- (6) 1점: $1$.
- (7) 1점: $0$. (6)을 틀렸더라도 (7)이 $\log$ 를 취한 값으로 일관되면 0.5점.
- (8) 2점: $0.5$ 또는 $\frac{1}{2}$. 1이라고 쓰면 0점(1은 경계 위에서의 odds다).

</section>

<section data-q="options">

(1) 2
= $\dfrac{1}{1 + e^{w_1 x + w_0}}$
- $\dfrac{1}{1 + e^{-(w_1 x + w_0)}}$
- $1 + e^{w_1 x + w_0}$
- $\dfrac{-e^{w_1 x + w_0}}{1 + e^{w_1 x + w_0}}$
- $e^{-(w_1 x + w_0)}$

(2) 2
= $e^{w_1 x + w_0}$
- $e^{-(w_1 x + w_0)}$
- $w_1 x + w_0$
- $1 + e^{w_1 x + w_0}$
- $\dfrac{1}{1 + e^{w_1 x + w_0}}$

(3) 2
= $w_1 x + w_0$
- $-(w_1 x + w_0)$
- $e^{w_1 x + w_0}$
- $\log(w_1 x + w_0)$
- $w_1 x$

(4) 1
= $\text{odds}$
- $\text{logit}$
- $\text{likelihood}$
- $\text{prior}$
- $\text{risk}$

(5) 1
= $\text{logit}$
- $\text{odds}$
- $\text{log-likelihood}$
- $\text{entropy}$
- $\text{sigmoid}$

(6) 1
= $1$
- $0$
- $0.5$
- $e$
- $2$

(7) 1
= $0$
- $1$
- $0.5$
- $-1$
- $e$

(8) 2
= $0.5$
- $0$
- $1$
- $e^{-1}$
- $0.25$

</section>
