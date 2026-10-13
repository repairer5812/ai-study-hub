---
part: D
type: calc
no: 2
points: 10
topic: gradient-descent
concepts: [gd-step-size]
title: Three step sizes on a parabola
---

<section data-q="stem">

We run gradient descent on $f(w) = w^2$ starting from $w_0 = 1$. The minimizer is $w = 0$.

(a) Write the gradient $g(w)$ and express $w_{t+1}$ in terms of $w_t$ and the step size $\alpha$.

(b) Compute $w_1$ and $w_2$ for each of $\alpha = 0.1$, $\alpha = 1$ and $\alpha = 1.1$.

(c) For each of the three step sizes, say whether the iterates approach the minimizer, keep jumping without making progress, or move away from it. Justify your answer with the factor that multiplies $w_t$ in (a).

</section>

<section data-q="ko">

$f(w) = w^2$ 에 대해 $w_0 = 1$ 에서 gradient descent 를 시작합니다. 최소점은 $w = 0$ 입니다.

(a) gradient $g(w)$ 를 쓰고 $w_{t+1}$ 을 $w_t$ 와 step size $\alpha$ 로 나타내세요.

(b) $\alpha = 0.1$, $\alpha = 1$, $\alpha = 1.1$ 각각에서 $w_1$ 과 $w_2$ 를 계산하세요.

(c) 세 step size 각각에서 $w_t$ 가 최소점에 다가가는지, 나아가지 못하고 오가기만 하는지, 멀어지는지 말하세요. (a)에서 $w_t$ 에 곱해지는 수를 근거로 설명하세요.

</section>

<section data-q="answer">

(a) $g(w) = 2w$ 입니다. 갱신식에 넣으면

$$
w_{t+1} = w_t - \alpha \cdot 2 w_t = (1 - 2\alpha)\, w_t
$$

한 걸음마다 $w_t$ 에 같은 수 $1 - 2\alpha$ 가 곱해집니다.

(b) 곱해지는 수는 차례로 $0.8$, $-1$, $-1.2$ 입니다.

| $\alpha$ | $1 - 2\alpha$ | $w_1$ | $w_2$ | $f(w_0),\ f(w_1),\ f(w_2)$ |
|---|---|---|---|---|
| $0.1$ | $0.8$ | $0.8$ | $0.64$ | $1,\ 0.64,\ 0.4096$ |
| $1$ | $-1$ | $-1$ | $1$ | $1,\ 1,\ 1$ |
| $1.1$ | $-1.2$ | $-1.2$ | $1.44$ | $1,\ 1.44,\ 2.0736$ |

(c) $\alpha = 0.1$ 에서는 곱해지는 수의 절댓값이 1보다 작아 $w_t$ 가 0으로 줄어듭니다. 최소점에 다가갑니다.

$\alpha = 1$ 에서는 곱해지는 수가 $-1$ 입니다. $w_t$ 가 $1$ 과 $-1$ 을 오가고 손실은 1에서 변하지 않습니다. 최소점을 건너뛰어 반대편 같은 높이에 내려앉기를 되풀이합니다.

$\alpha = 1.1$ 에서는 곱해지는 수의 절댓값이 1보다 큽니다. 부호가 바뀌면서 $\lvert w_t \rvert$ 가 걸음마다 1.2배로 커지고 손실도 커집니다. 최소점에서 멀어집니다.

기울기의 방향은 세 경우 모두 옳습니다. 달라진 것은 한 걸음의 크기뿐입니다. step size가 크면 최소점을 지나쳐 발산할 수 있습니다. 작으면 수렴은 하지만 걸음 수가 많이 듭니다. $\alpha = 0.1$ 은 두 걸음 뒤에도 $0.64$ 에 있습니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 2점: $g(w) = 2w$ (1점), $w_{t+1} = w_t - 2\alpha w_t$ 또는 $(1 - 2\alpha) w_t$ (1점). 부호를 더하기로 써서 $(1 + 2\alpha) w_t$ 라고 쓰면 갱신식 점수 0점.
- (b) 6점: 값 여섯 개에 1점씩. $\alpha = 0.1$ 에서 $w_1 = 0.8$, $w_2 = 0.64$. $\alpha = 1$ 에서 $w_1 = -1$, $w_2 = 1$. $\alpha = 1.1$ 에서 $w_1 = -1.2$, $w_2 = 1.44$. 분수 $\frac{4}{5}$, $\frac{16}{25}$, $-\frac{6}{5}$, $\frac{36}{25}$ 도 정답. $w_1$ 이 틀렸더라도 그 값에 옳은 인수를 곱해 $w_2$ 를 냈으면 $w_2$ 는 0.5점.
- (c) 2점: 세 경우의 판정이 모두 맞음(1점. $0.1$ 은 다가감, $1$ 은 오가기만 함, $1.1$ 은 멀어짐. 하나라도 틀리면 0점), 곱해지는 수 $1 - 2\alpha$ 의 절댓값이 1보다 작은지, 같은지, 큰지로 설명(1점). 손실 값 $f(w_t)$ 가 줄어드는지, 그대로인지, 커지는지로 설명해도 설명 점수 인정. 판정에서 "수렴", "진동", "발산"이라는 낱말을 써도 정답.

</section>
