---
part: D
type: essay
no: 1
points: 10
topic: supervised-learning
concepts: [loss-function]
title: Slopes of the squared and absolute loss
---

<section data-q="stem">

Let $r = h(\mathbf{x}) - y$ be the residual of one prediction. The squared loss is $r^2$ and the absolute loss is $\lvert r \rvert$.

Write the derivative of each loss with respect to $r$ (for $r \neq 0$). Then explain in two or three sentences, using these derivatives, which of the two losses lets a single sample with a very large residual dominate training, and why the other one does not.

</section>

<section data-q="ko">

예측 하나의 residual 을 $r = h(\mathbf{x}) - y$ 라 합니다. squared loss 는 $r^2$, absolute loss 는 $\lvert r \rvert$ 입니다.

두 손실을 $r$ 로 미분한 식을 쓰세요($r \neq 0$). 그 미분을 근거로 residual 이 아주 큰 표본 하나가 학습을 좌우하게 되는 손실은 어느 쪽이고 다른 쪽은 왜 그렇지 않은지 두세 문장으로 설명하세요.

</section>

<section data-q="answer">

$$
\frac{d}{dr}\, r^2 = 2r, \qquad \frac{d}{dr}\, \lvert r \rvert = \text{sign}(r)
$$

squared loss의 기울기는 residual에 비례합니다. residual이 100인 표본은 residual이 1인 표본보다 100배 센 힘으로 모형을 끌어당깁니다. 그래서 이상치 하나가 전체 기울기를 좌우할 수 있습니다.

absolute loss의 기울기는 크기가 늘 1이고 부호만 알려 줍니다. residual이 아무리 커도 그 표본이 끌어당기는 힘은 다른 표본과 같습니다. 이상치의 영향이 한 표본 몫으로 제한됩니다.

모형의 매개변수 $\boldsymbol{\theta}$ 로 미분해도 결론은 같습니다. chain rule에 따라 squared loss는 $2\,(h(\mathbf{x}) - y)\,\nabla_{\boldsymbol{\theta}} h(\mathbf{x})$, absolute loss는 $\text{sign}(h(\mathbf{x}) - y)\,\nabla_{\boldsymbol{\theta}} h(\mathbf{x})$ 가 됩니다. 앞의 것은 벌어진 만큼 크게 고치고 뒤의 것은 방향만 알려 줍니다.

</section>

<section data-q="rubric">

모두 10점.

- squared loss의 미분 2점: $2r$. $2(h(\mathbf{x}) - y)$ 도 정답. 매개변수로 미분해 $2(h(\mathbf{x}) - y)$ 에 $h$ 의 미분을 곱한 꼴도 정답. 계수 2가 빠져 $r$ 이라고만 쓰면 1점.
- absolute loss의 미분 2점: $\text{sign}(r)$. "$r > 0$ 이면 $+1$, $r < 0$ 이면 $-1$", "$\pm 1$", $r / \lvert r \rvert$ 도 정답. 매개변수로 미분해 부호에 $h$ 의 미분을 곱한 꼴도 정답. 부호 구분 없이 1이라고만 쓰면 1점.
- 요점 하나 2점: squared loss는 기울기의 크기가 residual의 크기에 비례해 커진다. residual이 큰 표본일수록 모형을 더 세게 끌어당긴다는 뜻이면 표현이 달라도 인정.
- 요점 둘 2점: absolute loss는 기울기의 크기가 residual의 크기와 무관하게 일정하다. 방향(부호)만 알려 준다는 뜻이면 인정.
- 결론 2점: 큰 residual 하나가 학습을 좌우하는 쪽은 squared loss이고 absolute loss는 이상치에 덜 민감하다. 두 손실을 반대로 답하면 이 항목은 0점이고 요점 하나와 요점 둘도 각각 1점까지만 준다.

</section>
