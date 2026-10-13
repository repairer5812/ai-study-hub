---
part: A
type: tf
no: 2
points: 2
topic: erm
concepts: [data-augmentation-vrm]
answer: F
---

<section data-q="stem">

In data augmentation, making the transformations stronger always improves the generalization of the model.

</section>

<section data-q="ko">

데이터 증강에서는 변형을 강하게 할수록 모형의 일반화 성능이 항상 좋아진다.

</section>

<section data-q="answer">

**거짓.** 증강이 도움이 되는 것은 변형한 뒤에도 레이블이 그대로일 때입니다. 사진을 조금 돌리거나 잘라도 햄스터는 햄스터입니다. 이런 변형은 가진 표본의 주변에서 새 표본을 뽑는 효과를 내고 과적합을 줄여 줍니다.

변형이 지나치면 의미가 망가집니다. 무엇인지 알아볼 수 없게 된 사진에 원래 레이블을 붙이면 틀린 표본을 학습시키는 셈이라 성능이 오히려 떨어집니다. 표 데이터에서 나이나 성별 값을 바꾸는 것도 같은 이유로 조심해야 합니다.

진술을 "transformations that preserve the label can improve generalization, but transformations that are too strong can hurt it"으로 고치면 참입니다.

</section>
