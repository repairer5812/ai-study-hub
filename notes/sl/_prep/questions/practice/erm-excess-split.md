---
part: C
type: blank
no: 2
points: 12
topic: erm
concepts: [estimation-approximation-error]
title: Splitting the gap to the best possible risk
---

<section data-q="stem">

Let $\mathcal{H}$ be a hypothesis class of functions from $\mathcal{X}$ to $\mathcal{Y}$, and let $R(h)$ denote the true risk. Empirical risk minimization over $\mathcal{H}$ returns

$$
\hat{h}^*_{\mathcal{H}} = \arg\min_{h \in \mathcal{H}} \blank{1}
$$

Let $R^*$ be the smallest true risk over $\blank{2}$, and let $R^*_{\mathcal{H}}$ be the smallest true risk over the functions in $\mathcal{H}$. Fill in the blanks to split the gap between $R(\hat{h}^*_{\mathcal{H}})$ and $R^*$ into two parts.

$$
\begin{aligned}
&R(\hat{h}^*_{\mathcal{H}}) - R^* \\
&= R(\hat{h}^*_{\mathcal{H}}) - \blank{3} \\
&\quad + \blank{3} - R^* \\[0.4em]
&= \underbrace{\big( R(\hat{h}^*_{\mathcal{H}}) - \blank{3} \big)}_{\text{(A)}} \\
&\quad + \underbrace{\big( \blank{3} - R^* \big)}_{\text{(B)}}
\end{aligned}
$$

The left-hand side is called the $\blank{4}$ error. Part (A) is called the $\blank{5}$ error and part (B) is called the $\blank{6}$ error.

</section>

<section data-q="ko">

$\mathcal{H}$ 는 $\mathcal{X}$ 에서 $\mathcal{Y}$ 로 가는 함수들로 이루어진 가설 집합이고 $R(h)$ 는 true risk 입니다. 빈칸을 채워 $R(\hat{h}^*_{\mathcal{H}})$ 와 $R^*$ 의 차이를 두 부분으로 나누세요. 같은 번호의 빈칸에는 같은 식이 들어갑니다. (1)에는 ERM 이 최소화하는 것을, (2)에는 $R^*$ 를 정의할 때 살펴보는 함수의 범위를 씁니다. (4), (5), (6)에는 오차의 이름을 씁니다.

</section>

<section data-q="answer">

- (1) $\mathcal{L}(h; D)$. 풀어 쓰면 $\dfrac{1}{n}\sum_{i=1}^{n} \ell(y_i, h(\mathbf{x}_i))$
- (2) all functions $h: \mathcal{X} \to \mathcal{Y}$ (가설 집합으로 좁히지 않은 모든 함수)
- (3) $R^*_{\mathcal{H}}$
- (4) excess
- (5) estimation. sample 도 같은 답입니다.
- (6) approximation

세 가지 값을 구별하는 문제입니다. $R^*$ 는 어떤 함수든 쓸 수 있을 때의 최소 true risk입니다. $R^*_{\mathcal{H}}$ 는 $\mathcal{H}$ 안에서의 최소 true risk입니다. $R(\hat{h}^*_{\mathcal{H}})$ 는 표본으로 실제로 고른 함수의 true risk입니다.

가운데 값 $R^*_{\mathcal{H}}$ 를 빼고 더하면 차이가 둘로 갈립니다.

1. (A)는 $\mathcal{H}$ 안에서 가장 좋은 함수 대신 표본으로 고른 함수를 쓰기 때문에 생깁니다. true risk를 모르니 empirical risk를 최소화했습니다. 그 차이가 여기에 나타납니다.
2. (B)는 찾는 범위를 $\mathcal{H}$ 로 좁혔기 때문에 생깁니다. 표본과는 관계가 없고 $\mathcal{H}$ 가 무엇이냐로만 정해집니다.

두 부분은 모두 0 이상입니다. $\hat{h}^*_{\mathcal{H}}$ 는 $\mathcal{H}$ 의 원소이므로 $R(\hat{h}^*_{\mathcal{H}}) \ge R^*_{\mathcal{H}}$ 입니다. $\mathcal{H}$ 는 모든 함수의 부분집합이므로 $R^*_{\mathcal{H}} \ge R^*$ 입니다. 이 값들은 실제로 계산할 수 없습니다. true risk를 모르기 때문입니다. 오차가 어디서 오는지 나눠 생각하는 틀로 씁니다.

</section>

<section data-q="rubric">

빈칸마다 2점, 모두 12점.

- (1) 2점: empirical risk. $\mathcal{L}(h; D)$, $\frac{1}{n}\sum_{i=1}^{n}\ell(y_i, h(\mathbf{x}_i))$, "the empirical risk of $h$" 모두 정답. true risk $R(h)$ 를 쓰면 0점(그것은 $R^*_{\mathcal{H}}$ 를 주는 함수의 정의다).
- (2) 2점: 모든 함수라는 뜻이면 정답. "all functions $h: \mathcal{X} \to \mathcal{Y}$", "all possible functions", "the entire function space" 인정. "$\mathcal{H}$" 나 "the hypothesis class"는 0점.
- (3) 2점: $R^*_{\mathcal{H}}$. 정의를 풀어 쓴 $\min_{h \in \mathcal{H}} R(h)$ 도 정답. $\min$ 대신 $\inf$ 를 써도 정답. $R^*$ 나 $\mathcal{L}(\hat{h}^*_{\mathcal{H}}; D)$ 는 0점.
- (4) 2점: excess. generalization 이라고 쓰면 0점.
- (5) 2점: estimation 또는 sample. 한국어로 "추정"이라 써도 정답. (5)와 (6)을 서로 바꿔 쓰면 둘 다 0점.
- (6) 2점: approximation. 한국어로 "근사" 또는 "어림"이라 써도 정답.

</section>
