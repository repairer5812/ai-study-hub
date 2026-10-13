---
part: C
type: blank
no: 2
points: 12
topic: logistic-regression
concepts: [logreg-map]
title: MAP objective of logistic regression
---

<section data-q="stem">

Let $y_i \in \{-1, +1\}$, and let $\ell(\mathbf{w})$ denote the objective that the MLE of logistic regression minimizes, that is, the negative log-likelihood $-\log P(D ; \mathbf{w})$ with the terms that do not depend on $\mathbf{w}$ removed. Now treat $\mathbf{w}$ as a random variable with the prior

$$
P(\mathbf{w}) \propto \exp\!\left( -\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \right)
$$

Fill in the blanks to obtain the MAP objective. Here $\lambda > 0$ is a constant.

$$
\begin{aligned}
&\hat{\mathbf{w}} = \arg\max_{\mathbf{w}} P(\mathbf{w} \mid D) \\
&= \arg\max_{\mathbf{w}} \blank{1} \\
&= \arg\max_{\mathbf{w}} \Big[ \log P(D \mid \mathbf{w}) + \blank{2} \Big] \\
&= \arg\min_{\mathbf{w}} \Big[ \ell(\mathbf{w}) + \blank{3} \Big] \\
&= \arg\min_{\mathbf{w}} \Big[ \ell(\mathbf{w}) + \lambda \, \blank{4} \Big]
\end{aligned}
$$

Between the first and second lines, the denominator $\blank{5}$ of Bayes' rule is dropped because it does not depend on $\mathbf{w}$. The prior above is a zero-mean $\blank{6}$ distribution. In MAP we write $P(D \mid \mathbf{w})$ with a bar instead of a semicolon because $\mathbf{w}$ is now treated as a $\blank{7}$.

</section>

<section data-q="ko">

레이블은 $y_i \in \{-1, +1\}$ 입니다. $\ell(\mathbf{w})$ 는 로지스틱 회귀의 MLE가 최소화하는 목적함수입니다(음의 로그우도에서 $\mathbf{w}$ 와 무관한 항을 뺀 것). 이제 $\mathbf{w}$ 를 확률변수로 보고 위와 같은 prior를 둡니다. 빈칸을 채워 MAP의 목적함수를 구하세요. $\lambda > 0$ 는 상수입니다. (5)에는 Bayes rule의 분모를, (6)에는 이 prior가 어떤 분포인지를, (7)에는 MAP에서 세미콜론 대신 막대를 쓰는 이유가 되는 낱말을 씁니다.

</section>

<section data-q="answer">

- (1) $P(D \mid \mathbf{w})\, P(\mathbf{w})$
- (2) $\log P(\mathbf{w})$
- (3) $\dfrac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$
- (4) $\mathbf{w}^T\mathbf{w}$. $\lVert \mathbf{w} \rVert_2^2$ 도 같은 답입니다.
- (5) $P(D)$
- (6) Gaussian (가우시안, 정규)
- (7) random variable (확률변수)

Bayes rule로 $P(\mathbf{w} \mid D) = P(D \mid \mathbf{w})\, P(\mathbf{w}) / P(D)$ 입니다. 분모는 $\mathbf{w}$ 와 무관하므로 분자만 최대화하면 됩니다(1, 5). 로그를 취하면 곱이 합으로 바뀝니다(2).

넷째 줄에서 부호를 뒤집습니다. $-\log P(D \mid \mathbf{w})$ 는 상수를 빼면 $\ell(\mathbf{w})$ 입니다. 이 부분은 MLE 때 전개한 것을 그대로 가져옵니다. prior 쪽은 $-\log P(\mathbf{w}) = \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} + \text{const}$ 입니다(3). 계수 $\frac{1}{2\tau^2}$ 을 $\lambda$ 로 부르면 마지막 줄이 됩니다(4).

MLE의 목적함수와 견주면 우도에서 나온 $\ell(\mathbf{w})$ 는 꼴이 그대로이고 마지막에 $\lambda\,\mathbf{w}^T\mathbf{w}$ 한 항만 붙었습니다. 선형회귀에 같은 prior를 두었을 때 붙는 항과 같습니다. prior는 모형이 무엇이든 같은 방식으로 들어갑니다.

표기도 함께 바뀝니다. MLE에서는 $\mathbf{w}$ 가 고정된 미지의 값이라 $P(D ; \mathbf{w})$ 로 씁니다. MAP에서는 $\mathbf{w}$ 가 분포를 가진 확률변수라 조건을 거는 막대를 써서 $P(D \mid \mathbf{w})$ 로 씁니다(7).

</section>

<section data-q="rubric">

모두 12점. (1), (2), (3), (5), (7)은 2점씩, (4)와 (6)은 1점씩.

- (1) 2점: $P(D \mid \mathbf{w})\, P(\mathbf{w})$. 우도를 표본별 곱으로 풀어 쓴 꼴에 $P(\mathbf{w})$ 를 곱한 것도 정답. 막대 대신 세미콜론을 써도 정답. prior가 빠지면 0점.
- (2) 2점: $\log P(\mathbf{w})$. 로그가 없으면 0점. $-\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 처럼 이미 전개한 꼴을 써도 정답(상수를 함께 적어도 됨).
- (3) 2점: $\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$. $\frac{\lVert\mathbf{w}\rVert_2^2}{2\tau^2}$ 도 정답. $-\log P(\mathbf{w})$ 라고 전개하지 않고 써도 그 줄의 등식은 성립하므로 2점. 부호가 음수면 1점. 분모가 빠지면 1점.
- (4) 1점: $\mathbf{w}^T\mathbf{w}$ 또는 $\lVert\mathbf{w}\rVert_2^2$. $\lVert\mathbf{w}\rVert_1$ 이나 제곱 없는 $\lVert\mathbf{w}\rVert_2$ 는 0점.
- (5) 2점: $P(D)$. "the evidence", "the marginal likelihood"도 정답. $P(\mathbf{w})$ 는 0점.
- (6) 1점: Gaussian. "normal", "가우시안", "정규"도 정답. Laplace 는 0점.
- (7) 2점: random variable. "확률변수"도 정답. "a variable with a distribution"처럼 같은 뜻이면 인정. parameter 라고만 쓰면 0점.

</section>
