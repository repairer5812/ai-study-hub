---
part: B
type: mc
no: 1
points: 3
topic: logistic-regression
concepts: [classification-probability-output]
answer: b
---

<section data-q="stem">

A classifier outputs $p(\mathbf{x}) = P(y = 1 \mid \mathbf{x})$ and predicts class $1$ when $p(\mathbf{x})$ exceeds a threshold. In which situation is it most reasonable to lower the threshold from $0.5$ to $0.1$?

- (a) When we want the highest possible accuracy on the training set
- (b) When missing a true case of class $1$ costs far more than a false alarm
- (c) When we want to reduce the computation needed for each prediction
- (d) When the model was trained with labels $\{-1, +1\}$ instead of $\{0, 1\}$

</section>

<section data-q="ko">

분류기가 $p(\mathbf{x}) = P(y = 1 \mid \mathbf{x})$ 를 내고 $p(\mathbf{x})$ 가 임계값을 넘으면 클래스 1로 예측합니다. 임계값을 0.5에서 0.1로 낮추는 것이 가장 알맞은 상황은 무엇입니까?

- (a) 학습 데이터에서 정확도를 가장 높이고 싶을 때
- (b) 클래스 1인 경우를 놓치는 비용이 잘못 울린 경보의 비용보다 훨씬 클 때
- (c) 예측 한 번에 드는 계산을 줄이고 싶을 때
- (d) 모형을 $\{0, 1\}$ 이 아니라 $\{-1, +1\}$ 레이블로 학습했을 때

</section>

<section data-q="answer">

**(b).** 채무 불이행 위험이 있는 고객을 가려내는 일이나 환자의 위중한 사건을 예측하는 일을 떠올리면 됩니다. 위험한 경우를 놓치는 쪽의 손해가 훨씬 크다면 확률이 10%만 되어도 클래스 1로 표시하는 보수적인 기준이 맞습니다.

- (a) 임계값을 낮추면 클래스 1로 예측하는 표본이 늘어납니다. 놓치는 경우는 줄지만 잘못 울리는 경보가 늘어납니다. 정확도가 오른다는 보장이 없습니다. 정확도를 올리려는 선택도 아닙니다.
- (c) 임계값은 확률을 낸 뒤에 견주는 수 하나입니다. 무엇으로 두든 계산량은 같습니다.
- (d) 레이블을 어떻게 부르느냐는 표기의 문제이고 모형이 내는 확률은 같습니다. 임계값을 고를 이유가 되지 않습니다.

이런 조절이 가능한 것은 모형이 클래스가 아니라 확률을 내기 때문입니다. 0 또는 1만 내는 모형이라면 기준을 옮길 수 없습니다.

</section>
