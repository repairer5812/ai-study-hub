---
part: D
type: calc
no: 1
points: 10
topic: logistic-regression
concepts: [label-pm1-unified]
title: One formula for both classes
---

<section data-q="stem">

In logistic regression let $z = \mathbf{w}^T\mathbf{x} + b$. The model assigns the two classes the probabilities

$$
\begin{aligned}
P(\text{positive} \mid \mathbf{x}) &= \frac{1}{1 + e^{-z}} \\[0.6em]
P(\text{negative} \mid \mathbf{x}) &= \frac{1}{1 + e^{z}}
\end{aligned}
$$

(a) Show that these two probabilities add up to $1$.

(b) Encode the positive class as $y = +1$ and the negative class as $y = -1$. Write a single formula for $P(y \mid \mathbf{x})$ that covers both classes, and verify it by substituting $y = +1$ and $y = -1$.

(c) Suppose the negative class were encoded as $y = 0$ instead. What value does your formula from (b) give for $y = 0$, and why does this show that the formula cannot be used with labels in $\{0, 1\}$?

</section>

<section data-q="ko">

로지스틱 회귀에서 $z = \mathbf{w}^T\mathbf{x} + b$ 라 둡니다. 모형은 두 클래스에 위와 같은 확률을 줍니다.

(a) 두 확률의 합이 1임을 보이세요.

(b) 양의 클래스를 $y = +1$, 음의 클래스를 $y = -1$ 로 적기로 합니다. 두 클래스를 모두 나타내는 $P(y \mid \mathbf{x})$ 의 식 하나를 쓰고 $y = +1$ 과 $y = -1$ 을 넣어 확인하세요.

(c) 음의 클래스를 $y = 0$ 으로 적었다고 합시다. (b)의 식에 $y = 0$ 을 넣으면 어떤 값이 나옵니까? 이것이 레이블이 $\{0, 1\}$ 일 때 그 식을 쓸 수 없다는 뜻인 이유는 무엇입니까?

</section>

<section data-q="answer">

(a) 첫째 확률의 분자와 분모에 $e^{z}$ 를 곱하면 분모가 같아집니다.

$$
\begin{aligned}
\frac{1}{1 + e^{-z}} + \frac{1}{1 + e^{z}}
&= \frac{e^{z}}{1 + e^{z}} + \frac{1}{1 + e^{z}} \\[0.4em]
&= \frac{e^{z} + 1}{1 + e^{z}} = 1
\end{aligned}
$$

(b) 두 식은 지수의 부호만 다릅니다. 그 부호를 레이블이 정하게 하면 한 줄로 쓸 수 있습니다.

$$
P(y \mid \mathbf{x}) = \frac{1}{1 + e^{-y z}} = \frac{1}{1 + e^{-y(\mathbf{w}^T\mathbf{x} + b)}}
$$

$y = +1$ 이면 $\frac{1}{1 + e^{-z}}$ 로 양의 클래스의 확률입니다. $y = -1$ 이면 $\frac{1}{1 + e^{z}}$ 로 음의 클래스의 확률입니다. 로지스틱 함수 $\phi(z) = \frac{1}{1 + e^{-z}}$ 로 쓰면 $P(y \mid \mathbf{x}) = \phi(y z)$ 입니다.

(c) $y = 0$ 을 넣으면 지수가 0이 됩니다.

$$
\frac{1}{1 + e^{0}} = \frac{1}{2}
$$

입력이 무엇이든 $\frac{1}{2}$ 이 나옵니다. 음의 클래스의 확률은 $\frac{1}{1 + e^{z}}$ 이고 $z$ 에 따라 달라지는 값이므로 이 식은 그 확률을 나타내지 못합니다. 식 하나로 쓰려면 레이블이 지수의 부호를 뒤집어 주어야 하는데 0은 그 일을 하지 못합니다.

레이블을 $\{0, 1\}$ 로 부르든 $\{-1, +1\}$ 로 부르든 모형은 같습니다. 이름만 다릅니다. 식을 한 줄로 쓰기에는 $\{-1, +1\}$ 이 편합니다.

</section>

<section data-q="rubric">

모두 10점.

- (a) 3점: 두 분수의 분모를 같게 만든 단계(2점), 합이 1이라는 결론(1점). 통분해 $\frac{(1 + e^{z}) + (1 + e^{-z})}{(1 + e^{-z})(1 + e^{z})}$ 을 정리해 1을 얻어도 만점. $1 - \frac{1}{1 + e^{-z}} = \frac{1}{1 + e^{z}}$ 임을 보이는 방식도 만점. 계산 없이 "확률이므로 합이 1"이라고만 쓰면 0점.
- (b) 4점: 식 $\frac{1}{1 + e^{-y z}}$ 또는 $\frac{1}{1 + e^{-y(\mathbf{w}^T\mathbf{x} + b)}}$ (2점), $y = +1$ 대입 확인(1점), $y = -1$ 대입 확인(1점). $\phi(y z)$ 나 $\frac{e^{y z}}{1 + e^{y z}}$ 도 정답. 지수의 부호가 반대인 $\frac{1}{1 + e^{y z}}$ 은 식 점수 0점. 대입 결과가 주어진 확률과 어긋난다는 것을 스스로 적었으면 대입 점수는 준다. 경우를 나눠 두 식을 따로 적기만 하면 식 점수 0점.
- (c) 3점: 값 $\frac{1}{2}$ (2점), 그 값이 입력과 무관해 음의 클래스의 확률 $\frac{1}{1 + e^{z}}$ 과 다르다는 이유(1점). "0을 넣으면 $y$ 가 사라진다", "레이블이 부호를 바꾸지 못한다"처럼 같은 뜻이면 이유 점수 인정.

</section>

<section data-q="checks">

@ (a) 합이 1
- 2 | 두 분수의 분모를 같게 만드는 단계를 썼다(통분해 정리하거나 $1 - \frac{1}{1 + e^{-z}} = \frac{1}{1 + e^{z}}$ 임을 보이는 방식도 된다)
- 1 | 그 계산으로 합이 1이라는 결론을 얻었다(계산 없이 "확률이므로 합이 1"이라고만 쓴 것은 안 된다)

@ (b) 식 하나
- 2 | 식 $\frac{1}{1 + e^{-y z}}$ 또는 $\frac{1}{1 + e^{-y(\mathbf{w}^T\mathbf{x} + b)}}$ 를 썼다. $\phi(y z)$ 나 $\frac{e^{y z}}{1 + e^{y z}}$ 도 된다. 지수의 부호가 반대인 것, 경우를 나눠 두 식을 따로 적기만 한 것은 안 된다
- 1 | $y = +1$ 을 넣어 주어진 확률 $\frac{1}{1 + e^{-z}}$ 와 견주었다(식이 틀려 어긋난다는 것을 스스로 적었어도 된다)
- 1 | $y = -1$ 을 넣어 주어진 확률 $\frac{1}{1 + e^{z}}$ 와 견주었다(식이 틀려 어긋난다는 것을 스스로 적었어도 된다)

@ (c) 레이블 0
- 2 | $y = 0$ 을 넣은 값 $\frac{1}{2}$ 을 썼다
- 1 | 그 값이 입력과 무관해 음의 클래스의 확률 $\frac{1}{1 + e^{z}}$ 과 다르다는 이유를 썼다("0을 넣으면 $y$ 가 사라진다", "레이블이 부호를 바꾸지 못한다"처럼 같은 뜻이면 된다)

</section>
