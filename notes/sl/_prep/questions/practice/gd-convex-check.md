---
part: D
type: calc
no: 1
points: 10
topic: gradient-descent
concepts: [gd-convexity-convergence]
title: Checking convexity by definition
---

<section data-q="stem">

A function $f: \mathbb{R} \to \mathbb{R}$ is convex if, for all $x, y \in \mathbb{R}$ and all $t \in [0, 1]$,

$$
f(t x + (1 - t) y) \le t f(x) + (1 - t) f(y)
$$

(a) Show that $f(x) = \lvert x \rvert$ is convex. Name the inequality you use.

(b) Show that $f(x) = x^3$ is not convex by giving specific values of $x$, $y$ and $t$ for which the definition fails.

(c) In one sentence, state what convexity guarantees about a local minimum and why this matters for gradient descent.

</section>

<section data-q="ko">

함수 $f: \mathbb{R} \to \mathbb{R}$ 가 모든 $x, y$ 와 모든 $t \in [0, 1]$ 에 대해 위의 부등식을 만족하면 convex 라고 합니다.

(a) $f(x) = \lvert x \rvert$ 가 convex 임을 보이세요. 사용한 부등식의 이름을 쓰세요.

(b) $f(x) = x^3$ 이 convex 가 아님을, 정의가 깨지는 $x$, $y$, $t$ 의 값을 구체적으로 들어 보이세요.

(c) convex 이면 local minimum 에 대해 무엇이 보장되는지, 그것이 gradient descent 에 왜 중요한지 한 문장으로 쓰세요.

</section>

<section data-q="answer">

(a) 정의의 좌변에서 시작합니다.

$$
\begin{aligned}
f(t x + (1 - t) y) &= \lvert t x + (1 - t) y \rvert \\
&\le \lvert t x \rvert + \lvert (1 - t) y \rvert \\
&= t \lvert x \rvert + (1 - t) \lvert y \rvert \\
&= t f(x) + (1 - t) f(y)
\end{aligned}
$$

둘째 줄이 삼각부등식(triangle inequality)입니다. 셋째 줄에서는 $t \ge 0$ 이고 $1 - t \ge 0$ 이라 절댓값 밖으로 그대로 나옵니다. 모든 $x$, $y$, $t$ 에서 성립하므로 convex입니다.

(b) 반례 하나면 충분합니다. $x = -1$, $y = 0$, $t = \frac{1}{2}$ 로 둡니다.

$$
f\!\left( -\tfrac{1}{2} \right) = -\frac{1}{8}, \qquad \tfrac{1}{2} f(-1) + \tfrac{1}{2} f(0) = -\frac{1}{2}
$$

$-\frac{1}{8} \le -\frac{1}{2}$ 은 거짓입니다. 좌변이 우변보다 크므로 정의가 깨집니다. $x^3$ 은 convex가 아닙니다. $x^3$ 은 음수 쪽에서 위로 볼록하게 휘어 있어서 두 점을 이은 선분이 그래프 아래로 내려갑니다. 그래서 0 이하의 서로 다른 두 점과 0과 1 사이의 $t$ 를 고르면 언제나 반례가 됩니다.

(c) convex 함수에서는 local minimum이 곧 global minimum입니다. gradient descent는 기울기가 0인 점에서 멈춥니다. convex라면 그 점이 가장 좋은 해라고 믿을 수 있습니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 4점: 좌변을 $\lvert t x + (1 - t) y \rvert$ 로 쓴 줄(1점), 삼각부등식으로 $\lvert t x \rvert + \lvert (1 - t) y \rvert$ 이하임을 보인 줄(2점. 이름 "triangle inequality" 또는 "삼각부등식"을 쓰지 않았으면 1점), $t$ 와 $1 - t$ 가 0 이상이라 $t\lvert x \rvert + (1 - t)\lvert y \rvert$ 가 된다는 줄(1점). 그래프가 V자라는 그림 설명만 있으면 1점.
- (b) 4점: 구체적인 $x$, $y$, $t$ 를 제시(1점), 좌변 $f(t x + (1 - t) y)$ 의 값(1점), 우변 $t f(x) + (1 - t) f(y)$ 의 값(1점), 좌변이 우변보다 커서 정의가 깨진다는 결론(1점). 답안의 값이 모범 답안과 달라도 된다. 채점할 때는 답안이 든 값을 $f(x) = x^3$ 에 직접 넣어 좌변이 우변보다 큰지 확인한다. 예를 들어 $x = -2$, $y = 0$, $t = \frac{1}{2}$ 이면 좌변 $-1$, 우변 $-4$ 로 옳은 반례다. 반대로 $x = -1$, $y = 1$, $t = \frac{1}{2}$ 은 좌변 0, 우변 0 이라 반례가 아니다. 반례가 아닌 값을 들었으면 제시 점수 1점만 주고 나머지는 0점. 이계도함수 $6x$ 가 $x < 0$ 에서 음수라는 논증만 쓰면 2점.
- (c) 2점: local minimum이 global minimum이라는 보장(1점), 그래서 gradient descent가 찾은 기울기 0인 점이 최적해라는 연결(1점). "나쁜 local minimum에 갇히지 않는다"는 표현도 연결 점수로 인정.

</section>
