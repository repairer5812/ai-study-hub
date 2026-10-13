---
part: A
type: tf
no: 1
points: 2
topic: supervised-learning
concepts: [hypothesis-class]
answer: F
---

<section data-q="stem">

The No Free Lunch theorem states that a sufficiently large neural network achieves the best performance on every dataset.

</section>

<section data-q="ko">

No Free Lunch 정리는 충분히 큰 신경망이면 모든 데이터셋에서 가장 좋은 성능을 낸다는 뜻이다.

</section>

<section data-q="answer">

**거짓.** No Free Lunch 정리가 말하는 것은 반대입니다. 모든 설정에서 가장 잘 작동하는 단일 학습 알고리즘은 없습니다. 잘 작동하는 알고리즘은 저마다 데이터에 대한 가정을 두고 있습니다. 데이터가 그 가정에 맞을 때 성능이 좋습니다.

큰 신경망도 가정을 둔 가설 집합 가운데 하나입니다. 데이터에 따라 로지스틱 회귀가 더 나을 때도 있고 트리 계열 모형이 더 나을 때도 있습니다. 그래서 여러 모형을 돌려 보고 고릅니다.

진술을 "no single learning algorithm achieves the best performance on every dataset"으로 고치면 참입니다.

</section>
