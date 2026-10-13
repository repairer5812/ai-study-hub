---
part: A
type: tf
no: 2
points: 2
topic: supervised-learning
concepts: [loss-function]
answer: T
---

<section data-q="stem">

The zero-one loss of a single prediction is $\ell(y, h(\mathbf{x})) = \mathbf{1}[y \neq h(\mathbf{x})]$. Its average over the $n$ samples in $D$ equals the fraction of samples that $h$ gets wrong, that is, the error rate of $h$ on $D$.

</section>

<section data-q="ko">

예측 하나의 zero-one loss 는 $\ell(y, h(\mathbf{x})) = \mathbf{1}[y \neq h(\mathbf{x})]$ 이다. 이것을 $D$ 의 표본 $n$ 개에 대해 평균한 값은 $h$ 가 틀린 표본의 비율, 곧 $D$ 위에서의 error rate 와 같다.

</section>

<section data-q="answer">

**참.** zero-one loss는 예측이 정답과 다르면 1, 같으면 0입니다. 평균을 내면

$$
\mathcal{L}(h; D) = \frac{1}{n}\sum_{i=1}^{n} \mathbf{1}[y_i \neq h(\mathbf{x}_i)]
$$

합은 틀린 표본의 개수입니다. 그것을 $n$ 으로 나누었으니 틀린 비율, error rate입니다.

두 가지를 함께 기억해 둡니다. 이 손실은 얼마나 크게 틀렸는지를 구별하지 않습니다. 그리고 값이 0과 1 사이를 건너뛰는 불연속 함수라 미분할 수 없습니다.

</section>
