---
part: D
type: calc
no: 2
points: 10
topic: linear-regression
concepts: [lr-closed-form-univariate]
title: Fitting a line to four points
---

<section data-q="stem">

We fit the univariate model $h(x) = w_1 x + w_0$ to the four samples

$$
(x_i, y_i): \quad (0, 1), \quad (2, 3), \quad (4, 4), \quad (6, 4)
$$

using the closed-form MLE solution under Gaussian noise.

(a) Compute the sample means $\bar{x}$ and $\bar{y}$.

(b) Compute $\hat{w}_1$ and $\hat{w}_0$. Show the formula you use.

(c) Compute the predictions $\hat{y}_i = \hat{w}_1 x_i + \hat{w}_0$ and the residuals $\hat{y}_i - y_i$ for the four samples. What do the four residuals add up to? Then predict $y$ for a new input $x = 10$.

</section>

<section data-q="ko">

단변량 모형 $h(x) = w_1 x + w_0$ 를 위의 표본 네 개에 맞춥니다. 가우시안 노이즈를 가정한 MLE의 닫힌 해를 씁니다.

(a) 표본평균 $\bar{x}$, $\bar{y}$ 를 구하세요.

(b) $\hat{w}_1$ 과 $\hat{w}_0$ 를 구하세요. 사용한 식을 함께 쓰세요.

(c) 네 표본의 예측 $\hat{y}_i = \hat{w}_1 x_i + \hat{w}_0$ 와 residual $\hat{y}_i - y_i$ 를 구하세요. residual 네 개를 더하면 얼마입니까? 이어서 새 입력 $x = 10$ 에서의 예측을 구하세요.

</section>

<section data-q="answer">

(a) $\bar{x} = \frac{0 + 2 + 4 + 6}{4} = 3$, $\bar{y} = \frac{1 + 3 + 4 + 4}{4} = 3$ 입니다.

(b) 닫힌 해는 다음과 같습니다.

$$
\begin{aligned}
\hat{w}_1 &= \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n} (x_i - \bar{x})^2} \\[0.6em]
\hat{w}_0 &= \bar{y} - \hat{w}_1 \bar{x}
\end{aligned}
$$

평균에서 벗어난 정도를 표로 만듭니다.

| $x_i$ | $y_i$ | $x_i - \bar{x}$ | $y_i - \bar{y}$ | 곱 | $(x_i - \bar{x})^2$ |
|---|---|---|---|---|---|
| $0$ | $1$ | $-3$ | $-2$ | $6$ | $9$ |
| $2$ | $3$ | $-1$ | $0$ | $0$ | $1$ |
| $4$ | $4$ | $1$ | $1$ | $1$ | $1$ |
| $6$ | $4$ | $3$ | $1$ | $3$ | $9$ |

분자는 $6 + 0 + 1 + 3 = 10$, 분모는 $9 + 1 + 1 + 9 = 20$ 입니다.

$$
\hat{w}_1 = \frac{10}{20} = 0.5, \qquad \hat{w}_0 = 3 - 0.5 \times 3 = 1.5
$$

같은 값을 $\hat{w}_1 = \frac{\sum_i x_i y_i - n\bar{x}\bar{y}}{\sum_i x_i^2 - n\bar{x}^2} = \frac{46 - 36}{56 - 36}$ 으로 구해도 됩니다.

(c) 예측은 $1.5,\ 2.5,\ 3.5,\ 4.5$ 입니다. residual 은 $0.5,\ -0.5,\ -0.5,\ 0.5$ 이고 모두 더하면 0입니다.

합이 0인 것은 우연이 아닙니다. 목적함수를 $w_0$ 로 미분해 0으로 둔 조건이 바로 "residual 의 합이 0"이라는 식입니다. 닫힌 해로 구한 직선은 늘 이 성질을 가지므로 계산을 검산할 때 쓸 수 있습니다.

새 입력에서의 예측은 $\hat{y} = 0.5 \times 10 + 1.5 = 6.5$ 입니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 2점: $\bar{x} = 3$ (1점), $\bar{y} = 3$ (1점).
- (b) 6점: $\hat{w}_1$ 의 식(1점), 분자 10(1점), 분모 20(1점), $\hat{w}_1 = 0.5$ (1점), $\hat{w}_0 = \bar{y} - \hat{w}_1\bar{x}$ 의 식(1점), $\hat{w}_0 = 1.5$ (1점). $\hat{w}_1$ 의 식은 편차 곱의 합을 편차 제곱의 합으로 나눈 꼴과 $\frac{\sum_i x_i y_i - n\bar{x}\bar{y}}{\sum_i x_i^2 - n\bar{x}^2}$ 꼴을 모두 인정한다. 뒤의 꼴을 썼다면 분자 $46 - 36 = 10$, 분모 $56 - 36 = 20$ 으로 채점한다. 두 편미분을 0으로 둔 연립방정식을 직접 풀어 $0.5$ 와 $1.5$ 를 얻었어도 만점. $\hat{w}_1$ 이 틀렸더라도 그 값을 $\hat{w}_0$ 의 식에 옳게 넣었으면 $\hat{w}_0$ 의 식 점수 1점은 준다.
- (c) 2점: 예측 네 개 $1.5,\ 2.5,\ 3.5,\ 4.5$ 와 residual $0.5,\ -0.5,\ -0.5,\ 0.5$, 그 합 0 (1점. 정답에서 예측을 뺀 반대 부호의 residual 을 써도 합이 0이면 정답), 새 입력의 예측 $6.5$ (1점). (b)의 틀린 계수로 일관되게 계산했으면 각 0.5점.

</section>
