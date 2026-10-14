---
part: C
type: blank
no: 1
points: 12
topic: mle-map
concepts: [mle-nll, conditional-likelihood]
title: From the joint likelihood to the conditional one
---

<section data-q="stem">

Let $D = \{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$ be i.i.d. samples, and let $\boldsymbol{\theta}$ be the parameter of a supervised model. Fill in the blanks to reduce the negative log-likelihood $\mathcal{L}_D(\boldsymbol{\theta})$ to the form that is minimized in supervised learning.

$$
\begin{aligned}
\mathcal{L}_D(\boldsymbol{\theta}) &= -\log P(D ; \boldsymbol{\theta}) \\
&= -\log P\big( (\mathbf{x}_1, y_1), \dots, (\mathbf{x}_n, y_n) ; \boldsymbol{\theta} \big) \\
&= -\log \blank{1} \\
&= \blank{2}
\end{aligned}
$$

Next, the joint probability of one sample is factored by conditioning on the input:

$$
P(\mathbf{x}_i, y_i ; \boldsymbol{\theta}) = \blank{3}
$$

In supervised learning the factor that involves $\mathbf{x}_i$ alone is written without $\boldsymbol{\theta}$, as $\blank{4}$. Substituting,

$$
\mathcal{L}_D(\boldsymbol{\theta}) = \blank{5} - \sum_{i=1}^{n} \log \blank{4}
$$

Only the first term matters for the minimization, so $\arg\min_{\boldsymbol{\theta}} \mathcal{L}_D(\boldsymbol{\theta}) = \arg\min_{\boldsymbol{\theta}} \blank{5}$.

</section>

<section data-q="ko">

$D$ 는 i.i.d. 표본이고 $\boldsymbol{\theta}$ 는 지도학습 모형의 매개변수입니다. 빈칸을 채워 음의 로그우도 $\mathcal{L}_D(\boldsymbol{\theta})$ 를 지도학습에서 최소화하는 꼴로 줄이세요. 같은 번호의 빈칸에는 같은 식이 들어갑니다. (3)에는 표본 하나의 결합 확률을 입력에 조건을 걸어 나눈 식을, (4)에는 그 가운데 $\mathbf{x}_i$ 만 들어 있는 인수를 $\boldsymbol{\theta}$ 없이 쓴 것을 적습니다.

</section>

<section data-q="answer">

- (1) $\prod_{i=1}^{n} P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- (2) $-\sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- (3) $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i ; \boldsymbol{\theta})$
- (4) $P(\mathbf{x}_i)$
- (5) $-\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$

줄마다 쓰는 것은 하나씩입니다.

1. (1)은 i.i.d. 가정입니다. 표본이 독립이면 전체의 결합 확률이 표본별 확률의 곱이 됩니다. 같은 분포이므로 인수의 꼴도 모두 같습니다.
2. (2)는 로그의 성질입니다. 곱의 로그는 로그의 합입니다. 맨 앞의 빼기 부호는 그대로 둡니다.
3. (3)은 product rule입니다. 결합 확률을 "입력이 주어졌을 때 레이블의 확률"과 "입력의 확률"로 나눕니다.
4. (4)는 가정입니다. $\boldsymbol{\theta}$ 는 $\mathbf{x}$ 에서 $y$ 로 가는 관계만 나타내고 입력이 어떻게 분포하는지는 나타내지 않는다고 봅니다. 그래서 $P(\mathbf{x}_i ; \boldsymbol{\theta}) = P(\mathbf{x}_i)$ 입니다.
5. (5)는 (3)을 (2)에 넣고 로그를 둘로 가른 결과입니다. 입력 쪽 합은 $\boldsymbol{\theta}$ 를 바꿔도 변하지 않으므로 최소화에서 빠집니다.

남은 식 (5)가 지도학습의 출발점입니다. 여기서 $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$ 를 어떤 분포로 두느냐에 따라 모형마다 다른 목적함수가 나옵니다.

</section>

<section data-q="rubric">

모두 12점. (1) 2점, (2) 2점, (3) 3점, (4) 2점, (5) 3점.

- (1) 2점: $\prod_{i=1}^{n} P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$. 세미콜론 대신 막대나 쉼표를 써도 정답. 곱 기호 대신 합 기호를 쓰면 0점. 곱의 범위가 빠지면 1점.
- (2) 2점: $-\sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$. 맨 앞의 빼기 부호가 빠지면 1점. 로그가 합 밖에 있으면 0점.
- (3) 3점: $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i ; \boldsymbol{\theta})$. 둘째 인수를 처음부터 $P(\mathbf{x}_i)$ 로 써도 정답. 반대 방향으로 나눈 $P(\mathbf{x}_i \mid y_i ; \boldsymbol{\theta})\, P(y_i ; \boldsymbol{\theta})$ 는 식으로는 성립하지만 "입력에 조건을 건다"는 지시와 다르므로 1점.
- (4) 2점: $P(\mathbf{x}_i)$. $\boldsymbol{\theta}$ 를 남긴 $P(\mathbf{x}_i ; \boldsymbol{\theta})$ 는 1점. 1이나 0을 쓰면 0점.
- (5) 3점: $-\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$. 빼기 부호가 빠지면 2점. 조건부가 아닌 $P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$ 를 그대로 쓰면 0점. 합 기호가 빠지면 1점.

</section>

<section data-q="options">

(1) 2
= $\displaystyle\prod_{i=1}^{n} P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $\displaystyle\sum_{i=1}^{n} P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $\displaystyle\prod_{i=1}^{n} P(y_i ; \boldsymbol{\theta})$
- $P(\mathbf{x}_1, y_1 ; \boldsymbol{\theta})^{n}$
- $\displaystyle\prod_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$

(2) 2
= $-\displaystyle\sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $\displaystyle\sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $-\log \displaystyle\sum_{i=1}^{n} P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $-\displaystyle\prod_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $-\displaystyle\sum_{i=1}^{n} P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$

(3) 3
= $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i ; \boldsymbol{\theta})$
- $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta}) + P(\mathbf{x}_i ; \boldsymbol{\theta})$
- $P(y_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i ; \boldsymbol{\theta})$
- $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$
- $\dfrac{P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})}{P(\mathbf{x}_i ; \boldsymbol{\theta})}$

(4) 2
= $P(\mathbf{x}_i)$
- $P(\mathbf{x}_i ; \boldsymbol{\theta})$
- $P(y_i)$
- $1$
- $P(\mathbf{x}_i \mid y_i)$

(5) 3
= $-\displaystyle\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$
- $\displaystyle\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$
- $-\displaystyle\sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$
- $-\displaystyle\sum_{i=1}^{n} P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$
- $-\log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$

</section>
