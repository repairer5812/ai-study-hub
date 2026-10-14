---
part: C
type: blank
no: 2
points: 12
topic: gradient-descent
concepts: [logreg-gradient]
title: Gradient of the logistic loss
---

<section data-q="stem">

For labels $y_i \in \{0, 1\}$, logistic regression predicts $\hat{y}_i = P(y = 1 \mid \mathbf{x}_i) = \frac{1}{1 + e^{-\mathbf{w}^T\mathbf{x}_i}}$, and the loss of one sample is

$$
\ell_i(\mathbf{w}) = -y_i \log \hat{y}_i - (1 - y_i) \log (1 - \hat{y}_i)
$$

Write $z_i = \mathbf{w}^T\mathbf{x}_i$. Fill in the blanks to simplify $\ell_i(\mathbf{w})$ and to compute its gradient.

$$
\begin{aligned}
\hat{y}_i &= \frac{e^{z_i}}{1 + e^{z_i}} \\[0.4em]
1 - \hat{y}_i &= \blank{1} \\[0.4em]
\log \hat{y}_i &= z_i - \blank{2} \\[0.4em]
\log (1 - \hat{y}_i) &= -\,\blank{2}
\end{aligned}
$$

Substituting the two logarithms,

$$
\begin{aligned}
&\ell_i(\mathbf{w}) \\
&= -y_i \big( z_i - \blank{2} \big) \\
&\quad + (1 - y_i)\, \blank{2} \\
&= \blank{2} - \blank{3}
\end{aligned}
$$

Differentiating with respect to $\mathbf{w}$,

$$
\begin{aligned}
\frac{\partial \ell_i(\mathbf{w})}{\partial \mathbf{w}}
&= \blank{4}\, \mathbf{x}_i - y_i\, \mathbf{x}_i \\
&= \big( \blank{5} \big)\, \mathbf{x}_i
\end{aligned}
$$

For the full objective $\ell(\mathbf{w}) = \frac{1}{n}\sum_{i=1}^{n} \ell_i(\mathbf{w})$, the gradient is $g(\mathbf{w}) = \blank{6}$.

</section>

<section data-q="ko">

레이블이 $y_i \in \{0, 1\}$ 일 때 로지스틱 회귀의 예측 확률 $\hat{y}_i$ 와 표본 하나의 손실 $\ell_i(\mathbf{w})$ 는 위와 같습니다. $z_i = \mathbf{w}^T\mathbf{x}_i$ 로 줄여 씁니다. 빈칸을 채워 $\ell_i(\mathbf{w})$ 를 정리하고 gradient를 구하세요. 같은 번호의 빈칸에는 같은 식이 들어갑니다. (6)에는 전체 목적함수의 gradient를 씁니다.

</section>

<section data-q="answer">

- (1) $\dfrac{1}{1 + e^{z_i}}$
- (2) $\log(1 + e^{z_i})$
- (3) $y_i z_i$
- (4) $\dfrac{e^{z_i}}{1 + e^{z_i}}$. $\dfrac{1}{1 + e^{-z_i}}$ 과 $\hat{y}_i$ 도 같은 답입니다.
- (5) $\hat{y}_i - y_i$
- (6) $\dfrac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)\, \mathbf{x}_i$

먼저 두 로그를 같은 조각으로 맞춥니다. $\hat{y}_i$ 의 분자와 분모에 $e^{z_i}$ 를 곱하면 $\frac{e^{z_i}}{1 + e^{z_i}}$ 입니다. 이것을 1에서 빼면 (1)이 됩니다. 로그를 취하면 두 식 모두에 $\log(1 + e^{z_i})$ 가 나옵니다(2).

손실에 넣고 전개합니다.

$$
\begin{aligned}
&\ell_i(\mathbf{w}) \\
&= -y_i z_i + y_i \log(1 + e^{z_i}) \\
&\quad + (1 - y_i) \log(1 + e^{z_i}) \\
&= \log(1 + e^{z_i}) - y_i z_i
\end{aligned}
$$

$y_i$ 가 곱해진 로그 항이 서로 지워지고 로그 하나와 $y_i z_i$ 만 남습니다(3). 부호를 놓치기 쉬운 곳입니다. 손실의 정의에 붙은 빼기 부호를 둘째 줄까지 그대로 가져가야 합니다.

미분은 chain rule입니다. $\log(1 + e^{z_i})$ 를 $\mathbf{w}$ 로 미분하면 $\frac{e^{z_i}}{1 + e^{z_i}}\, \mathbf{x}_i$ 이고(4), $y_i z_i$ 를 미분하면 $y_i\, \mathbf{x}_i$ 입니다. (4)는 $\hat{y}_i$ 와 같은 식이므로 묶으면 $(\hat{y}_i - y_i)\, \mathbf{x}_i$ 입니다(5).

gradient는 "예측 확률에서 정답을 뺀 값"에 입력을 곱한 것입니다. 예측이 정답과 같아질수록 그 표본이 gradient에 보태는 몫이 0에 가까워집니다. 전체 목적함수는 표본별 손실의 평균이므로 gradient도 평균입니다(6).

레이블을 $\{-1, +1\}$ 로 쓴 목적함수와 견주면 표본마다 손실의 값이 같습니다. 같은 우도를 다른 표기로 적은 것입니다.

</section>

<section data-q="rubric">

빈칸마다 2점, 모두 12점.

- (1) 2점: $\frac{1}{1 + e^{z_i}}$. $\frac{e^{-z_i}}{1 + e^{-z_i}}$ 도 정답. $z_i$ 대신 $\mathbf{w}^T\mathbf{x}_i$ 를 써도 정답(이하 같음). $\frac{1}{1 + e^{-z_i}}$ 은 0점(그것은 $\hat{y}_i$ 자신이다).
- (2) 2점: $\log(1 + e^{z_i})$. 지수의 부호가 반대인 $\log(1 + e^{-z_i})$ 는 0점. 로그가 없으면 0점.
- (3) 2점: $y_i z_i$. $y_i \mathbf{w}^T\mathbf{x}_i$ 도 정답. 앞에 이미 빼기 부호가 있으므로 음수 부호를 한 번 더 붙이면 1점. $y_i$ 가 빠지면 0점.
- (4) 2점: $\frac{e^{z_i}}{1 + e^{z_i}}$, $\frac{1}{1 + e^{-z_i}}$, $\hat{y}_i$ 가운데 어느 것이든 정답. $\frac{1}{1 + e^{z_i}}$ 은 0점.
- (5) 2점: $\hat{y}_i - y_i$. $\frac{1}{1 + e^{-z_i}} - y_i$ 처럼 풀어 써도 정답. 순서가 반대인 $y_i - \hat{y}_i$ 는 0점.
- (6) 2점: $\frac{1}{n}\sum_{i=1}^{n} (\hat{y}_i - y_i)\, \mathbf{x}_i$. $\hat{y}_i$ 를 풀어 쓴 꼴도 정답. $\frac{1}{n}$ 이 빠지면 1점. $\mathbf{x}_i$ 가 빠지면 0점. (5)를 반대 부호로 답하고 여기서도 같은 부호를 썼으면 1점.

</section>

<section data-q="options">

(1) 2
= $\dfrac{1}{1 + e^{z_i}}$
- $\dfrac{1}{1 + e^{-z_i}}$
- $1 + e^{z_i}$
- $e^{-z_i}$
- $\dfrac{-e^{z_i}}{1 + e^{z_i}}$

(2) 2
= $\log(1 + e^{z_i})$
- $\log(1 + e^{-z_i})$
- $1 + e^{z_i}$
- $\log(e^{z_i})$
- $-\log(1 + e^{z_i})$

(3) 2
= $y_i z_i$
- $-y_i z_i$
- $z_i$
- $y_i$
- $(1 - y_i)\, z_i$

(4) 2
= $\dfrac{e^{z_i}}{1 + e^{z_i}}$
- $\dfrac{1}{1 + e^{z_i}}$
- $e^{z_i}$
- $\log(1 + e^{z_i})$
- $z_i$

(5) 2
= $\hat{y}_i - y_i$
- $y_i - \hat{y}_i$
- $\hat{y}_i + y_i$
- $\hat{y}_i\, y_i$
- $1 - \hat{y}_i - y_i$

(6) 2
= $\dfrac{1}{n} \displaystyle\sum_{i=1}^{n} (\hat{y}_i - y_i)\, \mathbf{x}_i$
- $\dfrac{1}{n} \displaystyle\sum_{i=1}^{n} (y_i - \hat{y}_i)\, \mathbf{x}_i$
- $\dfrac{1}{n} \displaystyle\sum_{i=1}^{n} (\hat{y}_i - y_i)$
- $\displaystyle\sum_{i=1}^{n} (\hat{y}_i - y_i)\, \mathbf{x}_i$
- $\dfrac{1}{n} \displaystyle\sum_{i=1}^{n} (\hat{y}_i - y_i)\, \mathbf{w}$

</section>
