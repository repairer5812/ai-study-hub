---
part: C
type: blank
no: 1
points: 12
topic: erm
concepts: [empirical-risk-unbiased]
title: Expectation of the empirical risk
---

<section data-q="stem">

Let the samples in $D = \{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$ be drawn i.i.d. from $P_{XY}$, and let $h$ be a hypothesis that was fixed before looking at $D$. Fill in the blanks to compute the expectation, over the draw of $D$, of the empirical risk $\mathcal{L}(h; D)$.

$$
\begin{aligned}
&\mathbb{E}\big[\mathcal{L}(h; D)\big] \\
&= \mathbb{E}\Big[\, \blank{1} \,\Big] \\
&= \frac{1}{n} \sum_{i=1}^{n} \blank{2} \\
&= \frac{1}{n} \sum_{i=1}^{n} \int p(\mathbf{x}_i, y_i)\, \ell(y_i, h(\mathbf{x}_i))\, d\mathbf{x}_i\, dy_i \\
&= \frac{1}{n} \sum_{i=1}^{n} \blank{3} \\
&= \blank{3}
\end{aligned}
$$

The second equality uses the $\blank{4}$ of expectation. The fourth equality holds because every pair $(\mathbf{x}_i, y_i)$ is drawn from $\blank{5}$. Since the expectation of $\mathcal{L}(h; D)$ equals $\blank{3}$ itself, the empirical risk is called a(n) $\blank{6}$ estimate of the true risk.

</section>

<section data-q="ko">

$D$ 의 표본은 $P_{XY}$ 에서 i.i.d.로 뽑혔습니다. $h$ 는 $D$ 를 보기 전에 정해 둔 가설입니다. 빈칸을 채워 empirical risk $\mathcal{L}(h; D)$ 의 기댓값($D$ 를 뽑는 것에 대한 기댓값)을 계산하세요. 같은 번호의 빈칸에는 같은 식이 들어갑니다. (4)에는 둘째 등호에서 쓰는 기댓값의 성질을, (5)에는 넷째 등호가 성립하는 이유를, (6)에는 이런 추정량을 부르는 이름을 씁니다.

</section>

<section data-q="answer">

- (1) $\dfrac{1}{n} \sum_{i=1}^{n} \ell(y_i, h(\mathbf{x}_i))$
- (2) $\mathbb{E}\big[\ell(y_i, h(\mathbf{x}_i))\big]$
- (3) $R(h)$
- (4) linearity (선형성)
- (5) the same distribution $P_{XY}$ (같은 분포)
- (6) unbiased (불편)

줄마다 쓰는 성질은 하나씩입니다.

1. 첫째 등호는 empirical risk의 정의입니다. 손실의 표본 평균을 그대로 적습니다.
2. 둘째 등호는 기댓값의 선형성입니다. 상수 $\frac{1}{n}$ 과 합을 기댓값 밖으로 꺼냅니다.
3. 셋째 등호는 기댓값을 적분으로 쓴 것입니다.
4. 넷째 등호가 가정을 쓰는 줄입니다. 모든 표본이 같은 분포 $P_{XY}$ 에서 나왔으므로 $i$ 가 무엇이든 그 적분은 true risk $R(h)$ 입니다.
5. 다섯째 등호는 같은 값 $n$ 개의 평균입니다.

기댓값이 추정하려는 값과 같은 추정량을 불편 추정량이라 부릅니다. 이 증명에서 실제로 쓰인 가정은 "같은 분포"입니다. 표본이 서로 다른 분포에서 왔다면 넷째 줄이 성립하지 않습니다.

$h$ 가 고정이라는 조건도 필요합니다. 같은 $D$ 로 $h$ 를 고르면 $h$ 가 표본에 따라 달라집니다. 그러면 셋째 줄처럼 표본 하나에 대한 적분으로 쓸 수 없고 결론도 성립하지 않습니다.

</section>

<section data-q="rubric">

빈칸마다 2점, 모두 12점.

- (1) 2점: $\frac{1}{n}\sum_{i=1}^{n}\ell(y_i, h(\mathbf{x}_i))$. 손실의 인수 순서가 바뀐 $\ell(h(\mathbf{x}_i), y_i)$ 도 정답. $\frac{1}{n}$ 이 빠지면 1점. 합이 빠지고 손실 하나만 쓰면 0점.
- (2) 2점: $\mathbb{E}[\ell(y_i, h(\mathbf{x}_i))]$. 기댓값 아래에 $(\mathbf{x}_i, y_i) \sim P_{XY}$ 를 적어도 정답. 기댓값 기호 없이 $\ell(y_i, h(\mathbf{x}_i))$ 만 쓰면 0점.
- (3) 2점: $R(h)$. "true risk of $h$" 또는 정의를 풀어 쓴 $\mathbb{E}_{(\mathbf{x},y)\sim P_{XY}}[\ell(y, h(\mathbf{x}))]$ 도 정답. $\mathcal{L}(h; D)$ 나 0을 쓰면 0점.
- (4) 2점: linearity. 한국어로 "선형성"이라 써도 정답. "기댓값은 합과 상수배를 밖으로 꺼낼 수 있다"처럼 내용을 풀어 써도 정답. independence(독립)라고 쓰면 0점.
- (5) 2점: 같은 분포에서 나왔다는 뜻이면 정답. "the same distribution", "$P_{XY}$", "identically distributed" 모두 인정. "i.i.d."라고만 써도 2점. independent(독립)만 쓰면 1점.
- (6) 2점: unbiased. "불편"도 정답. consistent 나 approximate 는 0점.

</section>

<section data-q="options">

(1) 2
= $\dfrac{1}{n} \displaystyle\sum_{i=1}^{n} \ell(y_i, h(\mathbf{x}_i))$
- $\displaystyle\sum_{i=1}^{n} \ell(y_i, h(\mathbf{x}_i))$
- $\ell(y_i, h(\mathbf{x}_i))$
- $\dfrac{1}{n} \displaystyle\sum_{i=1}^{n} h(\mathbf{x}_i)$
- $\dfrac{1}{n} \displaystyle\prod_{i=1}^{n} \ell(y_i, h(\mathbf{x}_i))$

(2) 2
= $\mathbb{E}\big[\ell(y_i, h(\mathbf{x}_i))\big]$
- $\ell(y_i, h(\mathbf{x}_i))$
- $\mathbb{E}\big[h(\mathbf{x}_i)\big]$
- $\mathbb{E}\big[\mathcal{L}(h; D)\big]$
- $\log \ell(y_i, h(\mathbf{x}_i))$

(3) 2
= $R(h)$
- $\mathcal{L}(h; D)$
- $0$
- $R^*$
- $n\, R(h)$

(4) 2
= $\text{linearity}$
- $\text{independence}$
- $\text{monotonicity}$
- $\text{convexity}$
- $\text{symmetry}$

(5) 2
= $\text{the same distribution } P_{XY}$
- $\text{a different distribution for each } i$
- $\text{the hypothesis class } \mathcal{H}$
- $\text{a Gaussian distribution}$
- $\text{the empirical distribution of } D$

(6) 2
= $\text{unbiased}$
- $\text{biased}$
- $\text{consistent}$
- $\text{approximate}$
- $\text{maximum likelihood}$

</section>
