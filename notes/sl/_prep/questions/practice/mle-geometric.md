---
part: D
type: calc
no: 2
points: 10
topic: mle-map
concepts: [mle-distribution-parameters]
title: MLE for the geometric distribution
---

<section data-q="stem">

A coin lands heads with probability $\theta$. We toss it until the first head appears and record the number of tosses $x \in \{1, 2, 3, \dots\}$, so that

$$
P(x ; \theta) = (1-\theta)^{x-1}\,\theta
$$

The experiment is repeated independently four times, giving $D = \{2, 5, 1, 4\}$.

(a) Write the likelihood $P(D ; \theta)$ as a function of $\theta$ in its simplest form.

(b) Write the log-likelihood and find $\hat{\theta}_{\text{MLE}}$ by setting its derivative to zero.

(c) For general data $D = \{x_1, \dots, x_n\}$, derive $\hat{\theta}_{\text{MLE}}$ and express it with the sample mean $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$.

</section>

<section data-q="ko">

앞면이 나올 확률이 $\theta$ 인 동전을 첫 앞면이 나올 때까지 던지고 던진 횟수 $x$ 를 기록합니다. 이 실험을 독립으로 네 번 되풀이해 $D = \{2, 5, 1, 4\}$ 를 얻었습니다.

(a) 우도 $P(D ; \theta)$ 를 $\theta$ 의 함수로 가장 간단하게 쓰세요.

(b) 로그우도를 쓰고 미분을 0으로 두어 $\hat{\theta}_{\text{MLE}}$ 를 구하세요.

(c) 일반적인 데이터 $D = \{x_1, \dots, x_n\}$ 에 대해 $\hat{\theta}_{\text{MLE}}$ 를 유도하고 표본평균 $\bar{x}$ 로 나타내세요.

</section>

<section data-q="answer">

(a) 실험이 서로 독립이므로 표본별 확률을 곱합니다.

$$
P(D ; \theta) = \prod_{i=1}^{4} (1-\theta)^{x_i - 1}\,\theta = \theta^{4}(1-\theta)^{8}
$$

$\theta$ 의 지수는 표본 수 4입니다. $(1-\theta)$ 의 지수는 $\sum_i (x_i - 1) = 12 - 4 = 8$ 입니다.

(b) 로그우도는 $\log P(D ; \theta) = 4\log\theta + 8\log(1-\theta)$ 입니다. 미분해서 0으로 두면

$$
\begin{aligned}
\frac{4}{\theta} - \frac{8}{1-\theta} &= 0 \\[0.4em]
4(1-\theta) &= 8\theta \\[0.4em]
\hat{\theta}_{\text{MLE}} &= \frac{1}{3}
\end{aligned}
$$

(c) 같은 순서를 문자로 밟습니다.

$$
\begin{aligned}
&\log P(D ; \theta) \\
&= n\log\theta + \Big( \sum_{i=1}^{n} x_i - n \Big) \log(1-\theta) \\[0.8em]
&\frac{n}{\theta} - \frac{\sum_{i} x_i - n}{1-\theta} = 0 \\[0.4em]
&n(1-\theta) = \theta \Big( \sum_{i=1}^{n} x_i - n \Big) \\[0.4em]
&\hat{\theta}_{\text{MLE}} = \frac{n}{\sum_{i=1}^{n} x_i} = \frac{1}{\bar{x}}
\end{aligned}
$$

(b)의 값으로 확인하면 $\bar{x} = 12/4 = 3$ 이고 $1/\bar{x} = 1/3$ 입니다.

뜻을 풀면 이렇습니다. 네 번의 실험에서 동전을 모두 12번 던졌고 그 가운데 앞면은 4번(실험마다 마지막 한 번)입니다. 앞면 4번, 뒷면 8번을 본 동전의 MLE $4/12$ 과 같은 값입니다. 우도를 쓰고 로그를 취한 뒤 미분해서 0으로 두는 순서는 분포가 바뀌어도 그대로입니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 3점: $\theta^{4}(1-\theta)^{8}$. 곱을 정리하지 않고 $(1-\theta)\theta \cdot (1-\theta)^{4}\theta \cdot \theta \cdot (1-\theta)^{3}\theta$ 처럼 인수만 옳게 나열했으면 2점. 지수 가운데 하나가 틀리면 1점, 둘 다 틀리면 0점.
- (b) 4점: 로그우도 $4\log\theta + 8\log(1-\theta)$ (1점), 미분해 0으로 둔 식 $\frac{4}{\theta} - \frac{8}{1-\theta} = 0$ (2점), 답 $1/3$ (1점). 둘째 항의 부호를 더하기로 쓰면 미분 점수 0점. 로그 없이 직접 미분해 옳게 풀어도 만점. (a)의 틀린 지수를 그대로 써서 일관되게 풀었으면 미분과 답 점수의 절반.
- (c) 3점: 일반형 로그우도 $n\log\theta + (\sum_i x_i - n)\log(1-\theta)$ (1점), 미분해 0으로 둔 식(1점), 답 $\hat{\theta}_{\text{MLE}} = n / \sum_i x_i = 1/\bar{x}$ (1점). $n / \sum_i x_i$ 까지만 쓰고 $1/\bar{x}$ 로 바꾸지 않았어도 답 점수 인정. 유도 없이 $1/\bar{x}$ 만 쓰면 1점.

</section>

<section data-q="checks">

@ (a) 우도
- 1 | $\theta$ 의 지수 4가 맞다(곱을 정리하지 않았으면 $\theta$ 가 모두 네 번 곱해져 있다)
- 1 | $(1-\theta)$ 의 지수 8이 맞다(곱을 정리하지 않았으면 $(1-\theta)$ 의 지수를 모두 더해 8이다)
- 1 | 곱을 정리해 $\theta^{4}(1-\theta)^{8}$ 으로 썼다

@ (b) 추정값
- 1 | 로그우도 $4\log\theta + 8\log(1-\theta)$ 를 썼다(로그 없이 우도를 직접 미분해 옳게 풀었으면 이 항목도 체크한다)
- 2 | 미분해 0으로 둔 식 $\frac{4}{\theta} - \frac{8}{1-\theta} = 0$ 을 썼다(둘째 항의 부호를 더하기로 쓰면 안 된다. 우도를 직접 미분해 0으로 둔 식도 된다)
- 1 | 답 $1/3$ 을 얻었다

@ (c) 일반형
- 1 | 일반형 로그우도 $n\log\theta + (\sum_i x_i - n)\log(1-\theta)$ 를 썼다
- 1 | 미분해 0으로 둔 식 $\frac{n}{\theta} - \frac{\sum_{i} x_i - n}{1-\theta} = 0$ 을 썼다
- 1 | 답 $\hat{\theta}_{\text{MLE}} = n / \sum_i x_i = 1/\bar{x}$ 를 얻었다($n / \sum_i x_i$ 까지만 써도 된다)

</section>
