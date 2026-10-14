---
part: C
type: blank
no: 1
points: 12
topic: linear-regression
concepts: [lr-gaussian-noise-mse]
title: Gaussian noise in the multivariate model
---

<section data-q="stem">

Consider multivariate linear regression $y = \mathbf{w}^T\mathbf{x} + \epsilon$ with $\epsilon \sim \mathcal{N}(0, \sigma^2)$ and i.i.d. samples $D = \{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$. Fill in the blanks to find the objective that the MLE minimizes.

$$
\begin{aligned}
&P(y_i \mid \mathbf{x}_i ; \mathbf{w}) = \blank{1} \\[0.8em]
&\hat{\mathbf{w}} \\
&= \arg\max_{\mathbf{w}} \prod_{i=1}^{n} P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&= \arg\max_{\mathbf{w}} \sum_{i=1}^{n} \Big[ \blank{2} - \blank{3} \Big] \\
&= \arg\min_{\mathbf{w}} \; \blank{4} \sum_{i=1}^{n} \blank{5} \\
&= \arg\min_{\mathbf{w}} \; \frac{1}{n} \sum_{i=1}^{n} \blank{5}
\end{aligned}
$$

The term $\blank{2}$ disappears because the $\arg\max$ is taken over $\blank{6}$ and this term does not contain it. The factor $\blank{4}$ may be replaced by $\frac{1}{n}$ because both are $\blank{7}$ constants, so the value of $\sigma^2$ does not change $\hat{\mathbf{w}}$.

</section>

<section data-q="ko">

다변량 선형회귀 $y = \mathbf{w}^T\mathbf{x} + \epsilon$ 에서 노이즈가 평균 0, 분산 $\sigma^2$ 인 가우시안이고 표본은 i.i.d.입니다. 빈칸을 채워 MLE가 최소화하는 목적함수를 구하세요. 같은 번호의 빈칸에는 같은 식이 들어갑니다. (6)에는 arg max 를 무엇에 대해 취하는지(그래서 그것이 들어 있지 않은 (2)가 사라집니다)를, (7)에는 (4)와 $\frac{1}{n}$ 이 공통으로 어떤 상수인지를 한 낱말로 씁니다.

</section>

<section data-q="answer">

- (1) $\dfrac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( -\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2} \right)$
- (2) $\log \dfrac{1}{\sqrt{2\pi\sigma^2}}$
- (3) $\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$
- (4) $\dfrac{1}{2\sigma^2}$
- (5) $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- (6) $\mathbf{w}$
- (7) positive (양의)

가우시안 노이즈에 $\mathbf{w}^T\mathbf{x}_i$ 를 더한 것이 $y_i$ 이므로 $y_i$ 는 평균이 $\mathbf{w}^T\mathbf{x}_i$, 분산이 $\sigma^2$ 인 가우시안을 따릅니다. 그 밀도가 (1)입니다. 다변량이어도 $y_i$ 는 실수 하나라서 밀도는 1차원 가우시안이고 평균만 내적으로 바뀝니다.

곱의 로그는 로그의 합입니다. 밀도 하나의 로그는 상수 (2)와 지수 안의 항으로 갈립니다. 지수 안이 음수이므로 빼기 꼴 (3)이 됩니다.

상수와 $\sigma^2$ 가 빠지는 두 줄이 이 유도의 요점입니다.

1. (2)는 $\mathbf{w}$ 가 들어 있지 않습니다. $\mathbf{w}$ 를 바꿔도 값이 같으므로 최대점을 찾는 데 영향이 없습니다.
2. 남은 것은 $-\frac{1}{2\sigma^2}\sum_i (\cdot)^2$ 입니다. 음수가 붙은 것을 최대화하는 일은 부호를 떼고 최소화하는 일과 같습니다. 그래서 $\arg\max$ 가 $\arg\min$ 으로 바뀝니다.
3. $\frac{1}{2\sigma^2}$ 는 양의 상수입니다. 양수를 곱해도 최소가 되는 위치는 그대로이므로 $\frac{1}{n}$ 으로 바꿔 써도 됩니다. $\sigma^2$ 가 얼마든 $\hat{\mathbf{w}}$ 는 같습니다.

마지막 줄은 residual 제곱의 평균입니다. 노이즈를 가우시안으로 가정했기 때문에 제곱이 나왔습니다.

</section>

<section data-q="rubric">

모두 12점. (1)부터 (5)까지 2점씩, (6)과 (7)은 1점씩.

- (1) 2점: 지수 안이 $-(\mathbf{w}^T\mathbf{x}_i - y_i)^2 / (2\sigma^2)$ 이고 앞의 계수가 $\frac{1}{\sqrt{2\pi\sigma^2}}$. 제곱 안의 순서가 반대($(y_i - \mathbf{w}^T\mathbf{x}_i)^2$)여도 정답. $\mathcal{N}(y_i ; \mathbf{w}^T\mathbf{x}_i, \sigma^2)$ 처럼 기호로만 쓰면 1점. 계수만 빠졌으면 1점. 평균을 0으로 두어 지수 안이 $-y_i^2/(2\sigma^2)$ 이면 0점. 제곱 대신 절댓값이면 0점.
- (2) 2점: $\log\frac{1}{\sqrt{2\pi\sigma^2}}$. $-\frac{1}{2}\log(2\pi\sigma^2)$ 도 정답. 로그 없이 $\frac{1}{\sqrt{2\pi\sigma^2}}$ 만 쓰면 1점.
- (3) 2점: $\frac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$. 앞에 이미 빼기 부호가 있으므로 음수 부호를 한 번 더 붙이면 1점. 분모 $2\sigma^2$ 이 빠지면 1점.
- (4) 2점: $\frac{1}{2\sigma^2}$. $\frac{1}{\sigma^2}$ 처럼 2가 빠지면 1점. 음수 부호를 붙이면 1점.
- (5) 2점: $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$. $(\hat{y}_i - y_i)^2$ 나 $(y_i - \mathbf{w}^T\mathbf{x}_i)^2$ 도 정답. 절댓값이면 0점.
- (6) 1점: $\mathbf{w}$. "the parameter", "the weights"도 정답. $\sigma^2$ 나 $\mathbf{x}_i$ 는 0점.
- (7) 1점: positive. "양의", "양수"도 정답. "$\mathbf{w}$ 와 무관한 양의 상수"처럼 풀어 써도 정답. constant 라고만 쓰면 0점(음의 상수를 곱하면 최소점이 바뀐다).

</section>

<section data-q="options">

(1) 2
= $\dfrac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( -\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2} \right)$
- $\dfrac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( -\dfrac{y_i^2}{2\sigma^2} \right)$
- $\dfrac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( \dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2} \right)$
- $\dfrac{1}{2\sigma} \exp\!\left( -\dfrac{|\mathbf{w}^T\mathbf{x}_i - y_i|}{\sigma} \right)$
- $\dfrac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left( -\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{\sigma} \right)$

(2) 2
= $\log \dfrac{1}{\sqrt{2\pi\sigma^2}}$
- $\dfrac{1}{\sqrt{2\pi\sigma^2}}$
- $\log \sqrt{2\pi\sigma^2}$
- $\log \dfrac{1}{2\sigma^2}$
- $\log (2\pi\sigma^2)$

(3) 2
= $\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$
- $-\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2}$
- $\dfrac{|\mathbf{w}^T\mathbf{x}_i - y_i|}{2\sigma^2}$
- $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- $\dfrac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{\sqrt{2\pi\sigma^2}}$

(4) 2
= $\dfrac{1}{2\sigma^2}$
- $-\dfrac{1}{2\sigma^2}$
- $-2\sigma^2$
- $\log \dfrac{1}{\sqrt{2\pi\sigma^2}}$
- $-\dfrac{1}{\sqrt{2\pi\sigma^2}}$

(5) 2
= $(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- $|\mathbf{w}^T\mathbf{x}_i - y_i|$
- $\mathbf{w}^T\mathbf{x}_i - y_i$
- $-(\mathbf{w}^T\mathbf{x}_i - y_i)^2$
- $\log (\mathbf{w}^T\mathbf{x}_i - y_i)^2$

(6) 1
= $\mathbf{w}$
- $\sigma^2$
- $\mathbf{x}_i$
- $y_i$
- $n$

(7) 1
= $\text{positive}$
- $\text{negative}$
- $\text{integer}$
- $\text{arbitrary}$
- $\text{random}$

</section>
