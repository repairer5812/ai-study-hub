---
part: D
type: calc
no: 1
points: 10
topic: linear-regression
concepts: [noise-prior-combination]
title: Pairing a noise model with a prior
---

<section data-q="stem">

In linear regression $y = \mathbf{w}^T\mathbf{x} + \epsilon$, the objective obtained by MLE or MAP depends on two separate modeling choices: the distribution of the noise $\epsilon$ and the prior on $\mathbf{w}$.

(a) Which noise distribution and which prior lead to the objective below? Answer with the two distribution names.

$$
\frac{1}{n}\sum_{i=1}^{n} \lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert + \lambda \lVert \mathbf{w} \rVert_1
$$

(b) Next, consider a different pair of assumptions. The noise has density $f(\epsilon) = \frac{1}{2b}\exp\!\left(-\frac{\lvert\epsilon\rvert}{b}\right)$ with scale $b > 0$, and the prior is $P(\mathbf{w}) \propto \exp\!\left(-\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}\right)$. Derive the objective that the MAP estimate $\hat{\mathbf{w}} = \arg\max_{\mathbf{w}} P(\mathbf{w} \mid D)$ minimizes. You may collect constants into a single $\lambda > 0$.

(c) In one sentence, say which part of the objective is decided by the noise assumption and which part by the prior.

</section>

<section data-q="ko">

선형회귀 $y = \mathbf{w}^T\mathbf{x} + \epsilon$ 에서 MLE나 MAP로 얻는 목적함수는 서로 다른 두 가지 선택에 달려 있습니다. 노이즈 $\epsilon$ 의 분포와 $\mathbf{w}$ 의 prior입니다.

(a) 위의 목적함수는 어떤 노이즈 분포와 어떤 prior에서 나옵니까? 두 분포의 이름으로 답하세요.

(b) 이번에는 다른 조합입니다. 노이즈의 밀도가 척도 $b$ 인 위의 $f(\epsilon)$ 이고 prior가 위의 $P(\mathbf{w})$ 일 때, MAP 추정값이 최소화하는 목적함수를 유도하세요. 상수는 $\lambda > 0$ 하나로 묶어도 됩니다.

(c) 목적함수의 어느 부분이 노이즈 가정으로 정해지고 어느 부분이 prior로 정해지는지 한 문장으로 쓰세요.

</section>

<section data-q="answer">

(a) 노이즈는 라플라스(Laplace), prior도 라플라스입니다. 절댓값 손실은 노이즈의 밀도가 $\exp(-\lvert\epsilon\rvert / b)$ 꼴일 때 나옵니다. L1 벌점은 prior의 밀도가 $\exp(-\lVert\mathbf{w}\rVert_1 / \tau)$ 꼴일 때 나옵니다.

(b) 노이즈가 라플라스이므로 $y_i$ 의 조건부 밀도는

$$
P(y_i \mid \mathbf{x}_i ; \mathbf{w}) = \frac{1}{2b} \exp\!\left( -\frac{\lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert}{b} \right)
$$

입니다. Bayes rule로 posterior를 우도와 prior의 곱으로 바꾸고 로그를 취합니다.

$$
\begin{aligned}
&\hat{\mathbf{w}} = \arg\max_{\mathbf{w}} P(D \mid \mathbf{w})\, P(\mathbf{w}) \\
&= \arg\max_{\mathbf{w}} \Big[ \sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&\qquad\qquad\quad + \log P(\mathbf{w}) \Big] \\
&= \arg\max_{\mathbf{w}} \Big[ \sum_{i=1}^{n} \Big( \log\frac{1}{2b} - \frac{\lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert}{b} \Big) \\
&\qquad\qquad\quad - \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \Big] \\
&= \arg\min_{\mathbf{w}} \Big[ \frac{1}{b} \sum_{i=1}^{n} \lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert \\
&\qquad\qquad\quad + \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} \Big] \\
&= \arg\min_{\mathbf{w}} \Big[ \frac{1}{n} \sum_{i=1}^{n} \lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert \\
&\qquad\qquad\quad + \lambda \lVert \mathbf{w} \rVert_2^2 \Big]
\end{aligned}
$$

셋째 등호에서 prior의 정규화 상수는 $\mathbf{w}$ 와 무관해서 적지 않았습니다. 넷째 등호에서는 상수 $\log\frac{1}{2b}$ 를 버리고 부호를 뒤집었습니다. 다섯째 등호는 전체에 양의 상수 $\frac{b}{n}$ 을 곱한 것입니다. 남은 계수는 $\lambda$ 로 묶었습니다. 절댓값 손실의 평균(MAE)에 L2 벌점이 붙은 꼴입니다.

(c) 손실 부분(제곱이냐 절댓값이냐)은 노이즈 가정에서 나오고 벌점 부분(L2냐 L1이냐)은 prior에서 나옵니다. 두 선택은 서로 독립이라 네 가지 조합이 모두 가능합니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 2점: 노이즈가 라플라스(1점), prior가 라플라스(1점). "Laplacian", "double exponential"도 정답. 가우시안이라고 답한 쪽은 0점.
- (b) 6점: 다음 여섯 단계에 1점씩.
  1. 조건부 밀도 $\frac{1}{2b}\exp(-\lvert\mathbf{w}^T\mathbf{x}_i - y_i\rvert / b)$ 를 썼다. 절댓값 안의 순서가 반대여도 정답. 제곱을 쓰면 0점.
  2. posterior를 우도와 prior의 곱 $P(D \mid \mathbf{w})\, P(\mathbf{w})$ 으로 바꿨다. 표본별 곱 $\prod_i P(y_i \mid \mathbf{x}_i ; \mathbf{w})\, P(\mathbf{w})$ 로 써도 정답.
  3. 로그를 취해 로그우도의 합과 로그 prior의 합으로 썼다.
  4. 우도 쪽에서 $-\lvert\mathbf{w}^T\mathbf{x}_i - y_i\rvert / b$ 가, prior 쪽에서 $-\mathbf{w}^T\mathbf{w} / (2\tau^2)$ 가 나왔다. 둘 가운데 하나만 맞으면 0.5점.
  5. $\mathbf{w}$ 와 무관한 상수를 버리고 부호를 뒤집어 $\arg\min$ 으로 바꿨다.
  6. 최종 꼴이 절댓값 손실의 합 또는 평균에 $\mathbf{w}^T\mathbf{w}$ (또는 $\lVert\mathbf{w}\rVert_2^2$)의 양의 상수배를 더한 것이다. $\frac{1}{b}\sum_i \lvert\cdot\rvert + \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 에서 멈춰도 정답. $\lambda$ 의 값을 구하지 않아도 감점하지 않는다.
- (c) 2점: 손실 항은 노이즈 가정에서 나온다(1점), 벌점 항은 prior에서 나온다(1점). 둘을 반대로 쓰면 0점.

유도 없이 (b)의 최종 꼴만 옳게 쓰면 (b)는 2점.

</section>

<section data-q="checks">

@ (a) 두 분포
- 1 | 노이즈가 라플라스라고 썼다("Laplacian", "double exponential"도 된다)
- 1 | prior가 라플라스라고 썼다("Laplacian", "double exponential"도 된다)

@ (b) MAP의 목적함수
- 1 | 조건부 밀도 $\frac{1}{2b}\exp(-\lvert\mathbf{w}^T\mathbf{x}_i - y_i\rvert / b)$ 를 썼다(절댓값 안의 순서가 반대여도 된다. 제곱을 쓰면 안 된다)
- 1 | posterior를 우도와 prior의 곱 $P(D \mid \mathbf{w})\, P(\mathbf{w})$ 으로 바꿔 썼다(표본별 곱 $\prod_i P(y_i \mid \mathbf{x}_i ; \mathbf{w})\, P(\mathbf{w})$ 로 써도 된다)
- 1 | 로그를 취해 로그우도의 합과 로그 prior의 합으로 썼다
- 0.5 | 우도 쪽에서 나온 항 $-\lvert\mathbf{w}^T\mathbf{x}_i - y_i\rvert / b$ 가 맞다
- 0.5 | prior 쪽에서 나온 항 $-\mathbf{w}^T\mathbf{w} / (2\tau^2)$ 가 맞다
- 1 | $\mathbf{w}$ 와 무관한 상수를 버리고 부호를 뒤집어 $\arg\min$ 으로 바꿔 썼다(유도 없이 최종 꼴만 옳게 썼으면 (b)에서는 이 항목과 아래 항목만 체크한다)
- 1 | 최종 꼴을 절댓값 손실의 합 또는 평균에 $\mathbf{w}^T\mathbf{w}$ (또는 $\lVert\mathbf{w}\rVert_2^2$)의 양의 상수배를 더한 것으로 썼다($\frac{1}{b}\sum_i \lvert\cdot\rvert + \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 에서 멈춰도 된다. $\lambda$ 의 값은 구하지 않아도 된다)

@ (c) 두 가정의 몫
- 1 | 손실 항은 노이즈 가정에서 나온다고 썼다
- 1 | 벌점 항은 prior에서 나온다고 썼다

</section>
