---
part: A
type: tf
no: 1
points: 2
topic: logistic-regression
concepts: [logreg-no-closed-form]
answer: F
---

<section data-q="stem">

Whether the MLE of logistic regression can be written as a closed-form expression depends on the number of training samples: the difficulty comes from having many samples whose conditions cannot all be satisfied at once.

</section>

<section data-q="ko">

로지스틱 회귀의 MLE를 닫힌 식으로 쓸 수 있는지는 학습 표본의 수에 달려 있다. 표본이 여러 개라 표본마다 나오는 조건을 한꺼번에 만족시킬 수 없다는 데서 어려움이 생긴다.

</section>

<section data-q="answer">

**거짓.** 표본의 수와는 관계가 없습니다. 로지스틱 회귀에는 표본이 몇 개든 닫힌 해가 없습니다. 선형회귀는 표본이 여러 개여도 닫힌 해가 있습니다.

이유는 식의 꼴에 있습니다. 로지스틱 회귀의 목적함수는 미분할 수 있습니다. 그런데 미분을 0으로 둔 방정식에서 $\mathbf{w}$ 가 지수함수 안에 들어 있어서 "$\mathbf{w}$ 는 얼마"라는 꼴로 풀어낼 수 없습니다. 선형회귀에서는 같은 방정식이 $\mathbf{w}$ 의 일차식이라 역행렬로 풀렸습니다.

그래서 gradient descent처럼 기울기가 0인 점을 조금씩 찾아가는 반복 알고리즘을 씁니다.

진술을 "does not depend on the number of training samples: the difficulty is that the equation obtained by setting the gradient to zero cannot be solved for $\mathbf{w}$ analytically"로 고치면 참입니다.

</section>
