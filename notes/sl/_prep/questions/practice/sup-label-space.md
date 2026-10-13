---
part: B
type: mc
no: 1
points: 3
topic: supervised-learning
concepts: [dataset-iid]
answer: b
---

<section data-q="stem">

Three prediction problems use the same input $\mathbf{x} \in \mathbb{R}^d$, a patient record: (i) whether the patient has a certain disease, (ii) which of four blood types the patient has, (iii) the patient's systolic blood pressure. Which choice gives the correct label space $\mathcal{Y}$ and task for each problem?

- (a) (i) $\{0, 1\}$, regression; (ii) $\{1, 2, 3, 4\}$, 4-way classification; (iii) $\mathbb{R}$, binary classification
- (b) (i) $\{0, 1\}$, binary classification; (ii) $\{1, 2, 3, 4\}$, 4-way classification; (iii) $\mathbb{R}$, regression
- (c) (i) $\{0, 1\}$, binary classification; (ii) $\mathbb{R}$, regression; (iii) $\{1, 2, 3, 4\}$, 4-way classification
- (d) (i) $\mathbb{R}$, regression; (ii) $\{0, 1\}$, binary classification; (iii) $\{1, 2, 3, 4\}$, 4-way classification

</section>

<section data-q="ko">

환자 기록 $\mathbf{x} \in \mathbb{R}^d$ 를 입력으로 쓰는 예측 문제가 셋 있습니다. (i) 어떤 병이 있는지 없는지, (ii) 네 가지 혈액형 가운데 무엇인지, (iii) 수축기 혈압이 얼마인지. 문제마다 레이블 공간 $\mathcal{Y}$ 와 과제를 옳게 짝지은 것은 무엇입니까?

- (a) (i) $\{0, 1\}$, 회귀. (ii) $\{1, 2, 3, 4\}$, 4-way 분류. (iii) $\mathbb{R}$, 이진 분류
- (b) (i) $\{0, 1\}$, 이진 분류. (ii) $\{1, 2, 3, 4\}$, 4-way 분류. (iii) $\mathbb{R}$, 회귀
- (c) (i) $\{0, 1\}$, 이진 분류. (ii) $\mathbb{R}$, 회귀. (iii) $\{1, 2, 3, 4\}$, 4-way 분류
- (d) (i) $\mathbb{R}$, 회귀. (ii) $\{0, 1\}$, 이진 분류. (iii) $\{1, 2, 3, 4\}$, 4-way 분류

</section>

<section data-q="answer">

**(b).** 과제의 이름은 레이블 공간이 정합니다. 두 값 가운데 하나를 맞히면 binary classification, $K$ 개 범주 가운데 하나를 맞히면 $K$-way classification, 실수 값을 맞히면 regression입니다. 병의 유무는 $\{0, 1\}$, 혈액형 네 가지는 $\{1, 2, 3, 4\}$, 혈압은 $\mathbb{R}$ 입니다.

- (a)는 (i)과 (iii)의 과제 이름이 서로 바뀌었습니다. 레이블을 숫자 0과 1로 적어도 크기를 재는 값이 아니므로 회귀가 아닙니다.
- (c)는 혈액형을 실수로, 혈압을 범주로 보았습니다. 혈액형에 붙인 번호는 이름표일 뿐이고 크기나 순서의 뜻이 없습니다.
- (d)는 세 문제의 레이블 공간이 한 칸씩 밀렸습니다.

세 문제의 입력 $\mathbf{x}$ 는 같습니다. 과제를 가르는 것은 입력의 차원이 아니라 $\mathcal{Y}$ 입니다.

</section>
