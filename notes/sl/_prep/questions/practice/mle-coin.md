---
part: D
type: calc
no: 1
points: 10
topic: mle-map
concepts: [mle-coin-toss, coin-pseudo-counts]
title: MLE and pseudo-counts for a coin
---

<section data-q="stem">

We toss a coin $10$ times and observe $7$ heads. Let $\theta$ be the probability of heads.

(a) Write the likelihood $P(D ; \theta)$.

(b) Derive the maximum likelihood estimate $\hat{\theta}_{\text{MLE}}$.

(c) We believe the coin is close to fair and express this belief by adding imaginary tosses to the data: $m_H = 2$ heads and $m_T = 2$ tails. Compute the estimate of $\theta$ that uses these pseudo-counts, and explain in one sentence why it differs from the MLE.

</section>

<section data-q="ko">

동전을 10번 던져 앞면이 7번 나왔습니다. 앞면이 나올 확률을 $\theta$ 라 합니다. (a) 우도를 쓰세요. (b) MLE를 유도하세요. (c) 동전이 공정한 쪽에 가깝다고 믿고 그 믿음을 가상의 던지기 횟수(앞면 $m_H = 2$ 번, 뒷면 $m_T = 2$ 번)를 더하는 것으로 나타냅니다. 이 가상 횟수를 쓴 $\theta$ 의 추정값을 계산하고 MLE와 다른 이유를 한 문장으로 설명하세요.

</section>

<section data-q="answer">

(a) $P(D ; \theta) = \theta^{7}(1-\theta)^{3}$. 순서를 무시하고 이항계수 $\binom{10}{7}$ 을 붙여도 됩니다. $\theta$ 와 무관한 상수라 결과가 같습니다.

(b) 로그를 취하면 $7\log\theta + 3\log(1-\theta)$ 입니다. 미분해서 0으로 두면

$$
\frac{7}{\theta} - \frac{3}{1-\theta} = 0 \;\Rightarrow\; \hat{\theta}_{\text{MLE}} = \frac{7}{10} = 0.7
$$

(c) 가상의 횟수를 실제 횟수에 더해 같은 식에 넣습니다.

$$
\begin{aligned}
\hat{\theta} &= \frac{n_H + m_H}{n_H + n_T + m_H + m_T} \\[0.4em]
&= \frac{7 + 2}{10 + 4} = \frac{9}{14} \approx 0.643
\end{aligned}
$$

앞면 9번, 뒷면 5번을 본 것으로 치고 $\theta^{9}(1-\theta)^{5}$ 를 (b)와 같은 방법으로 최대화해도 같은 값이 나옵니다.

가상의 횟수가 "동전은 공정한 쪽에 가깝다"는 믿음을 더하므로 추정값이 0.7에서 0.5 쪽으로 당겨집니다. 실제로 던진 횟수가 많아질수록 가상 횟수 4번의 몫은 작아지고 추정값은 MLE에 가까워집니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 2점: $\theta^{7}(1-\theta)^{3}$ 꼴. 이항계수 유무는 상관없음. 지수가 틀리면 0점.
- (b) 4점: 로그우도를 쓰고(1점), 미분해 0으로 둔 식(2점), 답 $0.7$ (1점). 로그 없이 $\theta^{7}(1-\theta)^{3}$ 을 직접 미분해 풀어도 만점. 유도 없이 답만 쓰면 1점.
- (c) 4점: 가상 횟수를 분자와 분모에 모두 더한 식 $\frac{7+2}{10+4}$ (2점), 답 $9/14$ 또는 약 $0.643$ (1점), 가상 횟수가 공정하다는 믿음을 더해 추정값을 0.5 쪽으로 당긴다는 설명(1점). 우도를 $\theta^{9}(1-\theta)^{5}$ 로 두고 미분해 풀어도 식 점수 2점. 분모에 4를 더하지 않아 $9/10$ 을 답하거나 분자에 2를 더하지 않아 $7/14$ 을 답하면 식과 답 점수 0점, 설명 점수만 인정.

</section>

<section data-q="checks">

@ (a) 우도
- 2 | $\theta^{7}(1-\theta)^{3}$ 꼴로 썼다(이항계수는 있어도 없어도 된다. 지수가 틀리면 안 된다)

@ (b) MLE
- 1 | 로그우도 $7\log\theta + 3\log(1-\theta)$ 를 썼다(로그 없이 우도를 직접 미분해 옳게 풀었으면 이 항목도 체크한다)
- 2 | 미분해 0으로 둔 식 $\frac{7}{\theta} - \frac{3}{1-\theta} = 0$ 을 썼다(우도를 직접 미분해 0으로 둔 식도 된다)
- 1 | 답 $0.7$ 을 얻었다

@ (c) 가상 횟수
- 2 | 가상 횟수를 분자와 분모에 모두 더한 식 $\frac{7+2}{10+4}$ 를 썼다(우도를 $\theta^{9}(1-\theta)^{5}$ 로 두고 미분해 풀어도 된다)
- 1 | 답 $9/14$ 또는 약 $0.643$ 을 얻었다
- 1 | 가상 횟수가 공정하다는 믿음을 더해 추정값을 0.5 쪽으로 당긴다는 설명을 썼다

</section>
