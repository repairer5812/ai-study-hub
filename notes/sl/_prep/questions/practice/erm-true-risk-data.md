---
part: A
type: tf
no: 1
points: 2
topic: erm
concepts: [true-risk]
answer: F
---

<section data-q="stem">

Once a training set $D$ is given, the true risk $R(h)$ of a hypothesis $h$ can be computed exactly from $D$.

</section>

<section data-q="ko">

학습 데이터 $D$ 가 주어지면 가설 $h$ 의 true risk $R(h)$ 를 $D$ 로부터 정확히 계산할 수 있다.

</section>

<section data-q="answer">

**거짓.** true risk는 데이터 분포에 대한 기댓값입니다.

$$
R(h) = \mathbb{E}_{(\mathbf{x}, y) \sim P_{XY}}\big[\ell(y, h(\mathbf{x}))\big]
$$

이 기댓값을 계산하려면 $P_{XY}$ 를 알아야 하는데 우리는 그 분포를 모릅니다. 가진 것은 그 분포에서 뽑힌 표본 $n$ 개뿐입니다.

$D$ 로 정확히 계산할 수 있는 것은 empirical risk $\mathcal{L}(h; D)$ 입니다. 손실의 표본 평균이고 true risk의 추정값입니다. 진술의 "the true risk $R(h)$"를 "the empirical risk $\mathcal{L}(h; D)$"로 고치면 참이 됩니다.

</section>
