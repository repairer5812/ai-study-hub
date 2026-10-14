---
part: C
type: blank
no: 1
points: 12
topic: gradient-descent
concepts: [gd-update-rule]
title: Why a gradient step lowers the loss
---

<section data-q="stem">

We minimize a differentiable loss $\ell(\mathbf{w})$ with $\mathbf{w} \in \mathbb{R}^d$. Let $g(\mathbf{w}_t)$ be the gradient at the current point $\mathbf{w}_t$ and let $\alpha > 0$ be the step size. Fill in the blanks to see why one step of gradient descent lowers the loss.

For a step $\mathbf{s}$, the first-order Taylor approximation is

$$
\ell(\mathbf{w}_t + \mathbf{s}) \approx \ell(\mathbf{w}_t) + \blank{1}
$$

This approximation is accurate only when $\mathbf{s}$ is $\blank{2}$. Gradient descent takes the step $\mathbf{s} = \blank{3}$. Substituting this step,

$$
\begin{aligned}
\ell(\mathbf{w}_t + \mathbf{s})
&\approx \ell(\mathbf{w}_t) + \blank{4} \\
&\le \ell(\mathbf{w}_t)
\end{aligned}
$$

The inequality holds because $g(\mathbf{w}_t)^T g(\mathbf{w}_t) = \lVert g(\mathbf{w}_t) \rVert_2^2 \ge \blank{5}$ and $\alpha > 0$. The resulting update rule is

$$
\mathbf{w}_{t+1} \leftarrow \blank{6}
$$

The update is repeated until convergence, for example until the gradient is close to the zero vector, that is, until $\blank{7} \le \epsilon$ for a small $\epsilon > 0$.

</section>

<section data-q="ko">

미분 가능한 손실 $\ell(\mathbf{w})$ 를 최소화합니다. $g(\mathbf{w}_t)$ 는 지금 위치 $\mathbf{w}_t$ 에서의 gradient이고 $\alpha > 0$ 는 step size입니다. 빈칸을 채워 gradient descent 한 걸음이 손실을 줄이는 이유를 보이세요. (2)에는 근사가 잘 맞는 조건을 한 낱말로, (3)에는 gradient descent가 택하는 이동량을, (5)에는 수를, (7)에는 gradient가 0에 가까운지 재는 양을 씁니다.

</section>

<section data-q="answer">

- (1) $g(\mathbf{w}_t)^T \mathbf{s}$
- (2) small (작을 때)
- (3) $-\alpha\, g(\mathbf{w}_t)$
- (4) $-\alpha\, g(\mathbf{w}_t)^T g(\mathbf{w}_t)$. $-\alpha \lVert g(\mathbf{w}_t) \rVert_2^2$ 도 같은 답입니다.
- (5) $0$
- (6) $\mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$
- (7) $\lVert g(\mathbf{w}_t) \rVert_2$

1차 테일러 근사는 지금 위치에서의 값에 "기울기와 이동량의 내적"을 더한 것입니다(1). 함수를 접평면으로 바꿔 본 것이라 이동량이 작을 때만 믿을 수 있습니다(2).

이동량을 gradient의 반대 방향으로 잡는 것이 요점입니다(3). 그것을 (1)에 넣으면 더해지는 항이 $-\alpha\, g(\mathbf{w}_t)^T g(\mathbf{w}_t)$ 가 됩니다(4). 자기 자신과의 내적은 노름의 제곱이라 음수가 될 수 없습니다(5). $\alpha$ 는 양수이므로 더해지는 항은 0 이하입니다. 그래서 손실이 줄거나 그대로입니다. gradient가 영벡터가 아니면 실제로 줄어듭니다.

갱신식 (6)은 $\mathbf{w}_{t+1} = \mathbf{w}_t + \mathbf{s}$ 에 (3)을 넣은 것입니다. gradient 방향으로 가면 손실이 가장 빨리 커지므로 그 반대로 갑니다. 빼기 부호를 더하기로 쓰면 손실을 키우는 방향이 됩니다.

이 논증은 근사가 맞는 범위에서만 성립합니다. $\alpha$ 가 크면 이동량이 커져 (2)의 조건이 깨집니다.

정지 기준은 (7) 말고도 있습니다. 손실의 변화 $\lvert \ell(\mathbf{w}_{t+1}) - \ell(\mathbf{w}_t) \rvert$ 나 위치의 변화 $\lVert \mathbf{w}_{t+1} - \mathbf{w}_t \rVert_2$ 가 $\epsilon$ 이하가 되면 멈추기도 합니다.

</section>

<section data-q="rubric">

모두 12점. (1), (3), (4), (6), (7)은 2점씩, (2)와 (5)는 1점씩.

- (1) 2점: $g(\mathbf{w}_t)^T \mathbf{s}$. 순서를 바꾼 $\mathbf{s}^T g(\mathbf{w}_t)$, 내적 기호를 쓴 $g(\mathbf{w}_t) \cdot \mathbf{s}$, $\nabla \ell(\mathbf{w}_t)^T \mathbf{s}$ 모두 정답. 전치 없이 $g(\mathbf{w}_t)\,\mathbf{s}$ 라고 쓰면 1점. $\mathbf{s}$ 가 빠지면 0점.
- (2) 1점: small. "작다", "충분히 작을 때", "0에 가까울 때"도 정답.
- (3) 2점: $-\alpha\, g(\mathbf{w}_t)$. 빼기 부호가 없으면 0점. $\alpha$ 가 빠져 $-g(\mathbf{w}_t)$ 라고 쓰면 1점.
- (4) 2점: $-\alpha\, g(\mathbf{w}_t)^T g(\mathbf{w}_t)$ 또는 $-\alpha \lVert g(\mathbf{w}_t) \rVert_2^2$. 부호가 양수면 0점. (3)에서 $\alpha$ 를 빠뜨린 답과 일관되게 $-\lVert g(\mathbf{w}_t)\rVert_2^2$ 라고 썼으면 1점.
- (5) 1점: $0$.
- (6) 2점: $\mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$. $\mathbf{w}_t + \mathbf{s}$ 라고만 쓰면 1점. 더하기 부호로 $\mathbf{w}_t + \alpha\, g(\mathbf{w}_t)$ 라고 쓰면 0점.
- (7) 2점: $\lVert g(\mathbf{w}_t) \rVert_2$. 아래 첨자 2가 없는 $\lVert g(\mathbf{w}_t) \rVert$ 도 정답. 노름의 제곱 $\lVert g(\mathbf{w}_t)\rVert_2^2$ 도 정답. 갱신한 뒤의 점에서 잰 $\lVert g(\mathbf{w}_{t+1}) \rVert_2$ 와 gradient를 다른 기호로 쓴 $\lVert \nabla \ell(\mathbf{w}_t) \rVert_2$ 도 정답. 노름 없이 $g(\mathbf{w}_t)$ 만 쓰면 1점(벡터를 수와 견줄 수 없다). 손실의 변화나 위치의 변화를 쓴 답은 정지 기준으로는 맞지만 "gradient가 영벡터에 가깝다"는 문장과 맞지 않으므로 1점.

</section>

<section data-q="options">

(1) 2
= $g(\mathbf{w}_t)^T \mathbf{s}$
- $g(\mathbf{w}_t)$
- $\mathbf{s}^T \mathbf{s}$
- $-g(\mathbf{w}_t)^T \mathbf{s}$
- $\alpha\, g(\mathbf{w}_t)^T \mathbf{s}$

(2) 1
= $\text{small}$
- $\text{large}$
- $\text{orthogonal to the gradient}$
- $\text{a unit vector}$
- $\text{parallel to } \mathbf{w}_t$

(3) 2
= $-\alpha\, g(\mathbf{w}_t)$
- $\alpha\, g(\mathbf{w}_t)$
- $-g(\mathbf{w}_t)$
- $-\alpha\, \mathbf{w}_t$
- $-\dfrac{g(\mathbf{w}_t)}{\alpha}$

(4) 2
= $-\alpha\, g(\mathbf{w}_t)^T g(\mathbf{w}_t)$
- $\alpha\, g(\mathbf{w}_t)^T g(\mathbf{w}_t)$
- $-\alpha\, g(\mathbf{w}_t)$
- $-\alpha^2\, g(\mathbf{w}_t)^T g(\mathbf{w}_t)$
- $-g(\mathbf{w}_t)^T \mathbf{w}_t$

(5) 1
= $0$
- $1$
- $\alpha$
- $\epsilon$
- $\lVert \mathbf{w}_t \rVert_2^2$

(6) 2
= $\mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$
- $\mathbf{w}_t + \alpha\, g(\mathbf{w}_t)$
- $-\alpha\, g(\mathbf{w}_t)$
- $\alpha\, \mathbf{w}_t - g(\mathbf{w}_t)$
- $\mathbf{w}_t - \alpha\, \ell(\mathbf{w}_t)$

(7) 2
= $\lVert g(\mathbf{w}_t) \rVert_2$
- $g(\mathbf{w}_t)$
- $\ell(\mathbf{w}_t)$
- $\lVert \mathbf{w}_t \rVert_2$
- $\alpha$

</section>
