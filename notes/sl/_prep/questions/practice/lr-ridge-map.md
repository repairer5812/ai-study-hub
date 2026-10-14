---
part: C
type: blank
no: 2
points: 12
topic: linear-regression
concepts: [ridge-map-gaussian-prior]
title: MAP with a prior on the weights
---

<section data-q="stem">

Consider $y = \mathbf{w}^T\mathbf{x} + \epsilon$ with $\epsilon \sim \mathcal{N}(0, \sigma^2)$ and i.i.d. samples $D = \{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$. In addition, treat $\mathbf{w}$ as a random variable with the prior

$$
P(\mathbf{w}) \propto \exp\!\left( -\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \right)
$$

Fill in the blanks to derive the objective that the MAP estimate minimizes. Here $c_1$ and $c_2$ stand for terms that do not depend on $\mathbf{w}$, and $\lambda > 0$ collects the remaining constants.

$$
\begin{aligned}
&\hat{\mathbf{w}} = \arg\max_{\mathbf{w}} P(\mathbf{w} \mid D) \\
&= \arg\max_{\mathbf{w}} \blank{1} \\
&= \arg\max_{\mathbf{w}} \Big[ \log P(D \mid \mathbf{w}) + \blank{2} \Big] \\
&= \arg\max_{\mathbf{w}} \Big[ \sum_{i=1}^{n} \big( c_1 - \blank{3} \big) \\
&\qquad\qquad\quad + c_2 - \blank{4} \Big] \\
&= \arg\min_{\mathbf{w}} \Big[ \frac{1}{n} \sum_{i=1}^{n} \blank{5} \\
&\qquad\qquad\quad + \lambda \, \blank{6} \Big]
\end{aligned}
$$

This objective is known as $\blank{7}$ regression.

</section>

<section data-q="ko">

선형회귀 $y = \mathbf{w}^T\mathbf{x} + \epsilon$ 에서 노이즈는 평균 0, 분산 $\sigma^2$ 인 가우시안이고 표본은 i.i.d.입니다. 여기에 더해 $\mathbf{w}$ 를 확률변수로 보고 위와 같은 prior를 둡니다. 빈칸을 채워 MAP 추정값이 최소화하는 목적함수를 유도하세요. $c_1$, $c_2$ 는 $\mathbf{w}$ 와 무관한 항이고 $\lambda > 0$ 는 남은 상수를 묶은 것입니다. (7)에는 이 목적함수로 학습하는 회귀의 이름을 씁니다.

</section>

<section data-q="answer">

- (1) $P(D \mid \mathbf{w})\, P(\mathbf{w})$
- (2) $\log P(\mathbf{w})$
- (3) $\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$
- (4) $\dfrac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$
- (5) $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- (6) $\lVert \mathbf{w} \rVert_2^2$. $\mathbf{w}^T\mathbf{w}$ 도 같은 답입니다.
- (7) ridge

1. (1)은 Bayes rule입니다. $P(\mathbf{w} \mid D) = P(D \mid \mathbf{w})\, P(\mathbf{w}) / P(D)$ 이고 분모 $P(D)$ 는 $\mathbf{w}$ 와 무관해서 최대점에 영향이 없습니다.
2. (2)는 로그입니다. 곱의 로그가 합이 되어 로그우도에 로그 prior가 더해집니다.
3. (3)은 MLE 때와 같은 전개입니다. 가우시안 밀도의 로그에서 상수를 떼어 내면 지수 안의 항이 남습니다. 입력의 확률처럼 $\mathbf{w}$ 가 없는 것은 모두 $c_1$ 에 들어 있습니다.
4. (4)는 prior의 로그입니다. $\log P(\mathbf{w}) = c_2 - \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 입니다.
5. 마지막 줄에서는 상수 $c_1$, $c_2$ 를 버리고 부호를 뒤집어 최소화로 바꿉니다. 이어서 전체에 양의 상수 $\frac{2\sigma^2}{n}$ 을 곱하면 앞 항은 residual 제곱의 평균이 되고 뒤 항의 계수가 $\lambda$ 로 묶입니다.

MLE와 달라진 곳은 prior에서 온 항 하나입니다. 우도 쪽 전개는 한 글자도 바뀌지 않습니다. 더해진 항은 계수의 크기에 벌점을 주어 $\mathbf{w}$ 를 0 가까이에 묶어 둡니다. 이 벌점을 L2 penalty라고도 부릅니다.

</section>

<section data-q="rubric">

모두 12점. (1) 2점, (2) 1점, (3) 2점, (4) 2점, (5) 2점, (6) 1점, (7) 2점.

- (1) 2점: $P(D \mid \mathbf{w})\, P(\mathbf{w})$. 우도를 표본별 곱으로 풀어 쓴 $\prod_{i=1}^{n} P(y_i \mid \mathbf{x}_i ; \mathbf{w})\, P(\mathbf{w})$ 도 정답. 분모 $P(D)$ 를 남겨 둔 $\frac{P(D \mid \mathbf{w}) P(\mathbf{w})}{P(D)}$ 도 정답. prior가 빠져 $P(D \mid \mathbf{w})$ 만 쓰면 0점.
- (2) 1점: $\log P(\mathbf{w})$. 로그가 없으면 0점.
- (3) 2점: $\frac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$. 제곱 안의 순서가 반대여도 정답. 분모가 빠지면 1점. 앞에 이미 빼기 부호가 있으므로 음수 부호를 한 번 더 붙이면 1점.
- (4) 2점: $\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$. $\frac{\lVert\mathbf{w}\rVert_2^2}{2\tau^2}$ 도 정답. 분모에 $\sigma^2$ 를 쓰면 1점. 분모가 빠지면 1점. $\lVert\mathbf{w}\rVert_1$ 을 쓰면 0점.
- (5) 2점: $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$. $(\hat{y}_i - y_i)^2$ 도 정답. 분모 $2\sigma^2$ 을 남겨 두면 1점(앞에 $\frac{1}{n}$ 이 이미 있다). 절댓값이면 0점.
- (6) 1점: $\lVert\mathbf{w}\rVert_2^2$ 또는 $\mathbf{w}^T\mathbf{w}$. 제곱이 없는 $\lVert\mathbf{w}\rVert_2$ 나 $\lVert\mathbf{w}\rVert_1$ 은 0점.
- (7) 2점: ridge. "릿지", "L2-regularized linear"도 정답. lasso 는 0점.

</section>

<section data-q="options">

(1) 2
= $P(D \mid \mathbf{w})\, P(\mathbf{w})$
- $P(D \mid \mathbf{w})$
- $P(\mathbf{w})$
- $P(D \mid \mathbf{w}) + P(\mathbf{w})$
- $P(D)\, P(\mathbf{w})$

(2) 1
= $\log P(\mathbf{w})$
- $P(\mathbf{w})$
- $-\log P(\mathbf{w})$
- $\log P(D)$
- $\log P(\mathbf{w} \mid D)$

(3) 2
= $\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$
- $-\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$
- $\dfrac{|\mathbf{w}^T\mathbf{x}_i - y_i|}{\sigma}$
- $\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\tau^2}$
- $\dfrac{\mathbf{w}^T\mathbf{w}}{2\sigma^2}$

(4) 2
= $\dfrac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$
- $-\dfrac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$
- $\dfrac{\mathbf{w}^T\mathbf{w}}{2\sigma^2}$
- $\dfrac{\lVert \mathbf{w} \rVert_1}{\tau}$
- $\exp\!\left( -\dfrac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \right)$

(5) 2
= $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- $|\mathbf{w}^T\mathbf{x}_i - y_i|$
- $\mathbf{w}^T\mathbf{x}_i - y_i$
- $-(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- $\log\!\left(1 + e^{-y_i \mathbf{w}^T\mathbf{x}_i}\right)$

(6) 1
= $\lVert \mathbf{w} \rVert_2^2$
- $\lVert \mathbf{w} \rVert_1$
- $\lVert \mathbf{w} \rVert_2$
- $-\lVert \mathbf{w} \rVert_2^2$
- $\dfrac{1}{\lVert \mathbf{w} \rVert_2^2}$

(7) 2
= $\text{ridge}$
- $\text{lasso}$
- $\text{logistic}$
- $\text{polynomial}$
- $\text{ordinary least squares}$

</section>
