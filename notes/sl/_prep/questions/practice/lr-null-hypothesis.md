---
part: B
type: mc
no: 1
points: 3
topic: linear-regression
concepts: [coefficient-inference]
answer: a
---

<section data-q="stem">

After fitting $h(x) = \hat{w}_1 x + \hat{w}_0$ by MLE, we test whether the slope is statistically meaningful. Which statement describes the test correctly?

- (a) The null hypothesis is $H_0: w_1 = 0$, meaning that $x$ has no relationship with $y$. If the observed $\hat{w}_1$ would be very unlikely under $H_0$, we reject $H_0$.
- (b) The null hypothesis is $H_0: w_1 \neq 0$. If the observed $\hat{w}_1$ would be very unlikely under $H_0$, we conclude that $x$ has no relationship with $y$.
- (c) The null hypothesis is $H_0: w_1 = 0$. If the observed $\hat{w}_1$ would be very likely under $H_0$, we reject $H_0$.
- (d) No test is needed: whenever $\hat{w}_1 \neq 0$ the slope is meaningful, no matter how close to $0$ it is.

</section>

<section data-q="ko">

MLE로 $h(x) = \hat{w}_1 x + \hat{w}_0$ 를 구한 뒤, 기울기가 통계적으로 의미 있는지 검정합니다. 검정을 옳게 설명한 것은 무엇입니까?

- (a) 귀무가설은 $H_0: w_1 = 0$ 이고 $x$ 가 $y$ 와 관계없다는 뜻이다. 관측한 $\hat{w}_1$ 이 $H_0$ 아래에서 나올 확률이 아주 작으면 $H_0$ 를 기각한다.
- (b) 귀무가설은 $H_0: w_1 \neq 0$ 이다. 관측한 $\hat{w}_1$ 이 $H_0$ 아래에서 나올 확률이 아주 작으면 $x$ 가 $y$ 와 관계없다고 결론 내린다.
- (c) 귀무가설은 $H_0: w_1 = 0$ 이다. 관측한 $\hat{w}_1$ 이 $H_0$ 아래에서 나올 확률이 아주 크면 $H_0$ 를 기각한다.
- (d) 검정은 필요 없다. $\hat{w}_1 \neq 0$ 이기만 하면 0에 얼마나 가깝든 기울기는 의미가 있다.

</section>

<section data-q="answer">

**(a).** 확인하고 싶은 것은 "$x$ 가 $y$ 에 영향을 준다"는 쪽이지만 이것을 직접 검정하기는 어렵습니다. 그래서 반대 상황인 $w_1 = 0$ 을 귀무가설로 세웁니다. 그 가정 아래에서 지금 구한 $\hat{w}_1$ 같은 값이 나올 확률이 아주 작다면 가정이 틀렸다고 보는 편이 맞습니다. 그때 귀무가설을 기각하고 기울기가 통계적으로 유의하다고 말합니다.

- (b) 귀무가설의 내용이 뒤집혔습니다. $w_1 \neq 0$ 은 대립가설 $H_1$ 입니다.
- (c) 기각의 방향이 뒤집혔습니다. 귀무가설 아래에서 흔히 나올 값이 나왔다면 귀무가설을 버릴 근거가 없습니다.
- (d) 추정값은 표본으로 구한 것이라 진짜 기울기가 0이어도 우연히 0이 아닌 값이 나옵니다. 0에서 얼마나 멀리 떨어졌는지를 봐야 합니다.

</section>
