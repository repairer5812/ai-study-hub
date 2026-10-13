---
part: A
type: tf
no: 1
points: 2
topic: gradient-descent
concepts: [gd-convexity-convergence]
answer: F
---

<section data-q="stem">

Gradient descent can tell by itself whether the point at which it stops is a global minimum of the loss.

</section>

<section data-q="ko">

gradient descent 는 자신이 멈춘 점이 손실의 global minimum 인지를 스스로 알 수 있다.

</section>

<section data-q="answer">

**거짓.** gradient descent가 보는 것은 지금 위치의 기울기뿐입니다. 기울기가 0에 가까워지면 멈출 뿐입니다. 그 점이 global minimum인지 local minimum인지는 알지 못합니다.

멈춘 점이 가장 좋은 해라고 말할 수 있는 근거는 알고리즘이 아니라 함수의 성질에서 나옵니다. 손실이 convex이면 local minimum이 곧 global minimum이므로 기울기가 0인 점을 찾으면 그것이 최적해입니다. 로지스틱 회귀의 목적함수가 이 경우에 해당합니다. convex가 아닌 손실에서는 시작점에 따라 다른 골짜기에 멈출 수 있습니다.

진술을 "gradient descent stops where the gradient is close to zero, and that point is guaranteed to be a global minimum only when the loss is convex"로 고치면 참입니다.

</section>
