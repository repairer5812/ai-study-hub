---
part: A
type: tf
no: 1
points: 2
topic: linear-regression
concepts: [polynomial-regression]
answer: F
---

<section data-q="stem">

The polynomial regression model $y = w_0 + w_1 x + w_2 x^2 + \epsilon$ is not a linear model, because the input enters through the term $x^2$.

</section>

<section data-q="ko">

다항 회귀 모형 $y = w_0 + w_1 x + w_2 x^2 + \epsilon$ 은 입력이 $x^2$ 항으로 들어가므로 선형 모형이 아니다.

</section>

<section data-q="answer">

**거짓.** 선형 모형이라는 말은 매개변수 $\mathbf{w}$ 에 대해 선형이라는 뜻입니다. 입력을 $\mathbf{z} = (1, x, x^2)^T$ 로 바꿔 놓으면 이 모형은 $y = \mathbf{w}^T\mathbf{z} + \epsilon$ 입니다. $\mathbf{z}$ 를 입력으로 받는 다변량 선형회귀와 똑같습니다.

비선형인 것은 $x$ 와 $y$ 의 관계입니다. $x$ 에 대해서는 곡선이지만 $\mathbf{w}$ 에 대해서는 일차식이므로 선형회귀의 MLE 유도와 닫힌 해를 그대로 쓸 수 있습니다. 입력 행렬 자리에 변환한 입력을 쌓은 행렬을 넣으면 됩니다.

진술을 "is still a linear model, because it is linear in the parameters $\mathbf{w}$"로 고치면 참입니다.

</section>
