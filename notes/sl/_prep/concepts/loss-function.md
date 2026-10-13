---
title: "손실 함수: zero-one, squared, absolute"
en: Loss functions
parent: supervised-learning
order: 30
summary: 정답과 예측을 받아 틀린 정도를 수 하나로 내는 함수입니다. 어떤 손실을 고르느냐에 따라 큰 오차를 얼마나 무겁게 벌하는지가 달라집니다.
signal: none
related: [lr-laplace-noise-mae]
---

## 왜 필요한가

지도학습의 목표는 $h(\mathbf{x})$ 가 $y$ 와 같거나 가까운 함수를 찾는 것이었습니다. 가깝다는 말은 아직 수가 아닙니다. 가설 집합 안의 함수를 서로 비교하려면 틀린 정도가 수 하나로 나와야 합니다. 그 수를 내는 것이 손실 함수(loss function)입니다. 값이 작으면 잘 맞춘 것이고 크면 못 맞춘 것입니다.

손실을 고르는 일은 취향의 문제가 아닙니다. 어떤 실수를 더 나쁘게 볼지를 정하는 일이고 그 선택에 따라 학습된 함수가 달라집니다.

## 정의와 수식

손실 함수는 정답과 예측을 받아 실수 하나를 냅니다. 이 지도에서는 정답을 먼저 쓰고 예측을 뒤에 씁니다.

$$
\ell(y, h(\mathbf{x})) \in \mathbb{R}
$$

많이 쓰는 세 가지입니다.

| 이름 | 식 | 쓰는 곳 |
|---|---|---|
| zero-one loss | $\mathbf{1}[y \neq h(\mathbf{x})]$ | 분류 |
| squared loss | $(h(\mathbf{x}) - y)^2$ | 회귀 |
| absolute loss | $\lvert h(\mathbf{x}) - y \rvert$ | 회귀 |

$\mathbf{1}[\cdot]$ 는 괄호 안이 참이면 1, 거짓이면 0입니다. 수업 자료는 같은 것을 $\delta$ 로 적습니다.

**zero-one loss**

틀리면 1, 맞으면 0입니다. 얼마나 크게 틀렸는지는 묻지 않습니다. 데이터 전체에서 평균을 내면 틀린 표본의 비율인 error rate가 됩니다. 값이 0과 1 사이를 건너뛰므로 연속이 아니고 미분으로 줄여 갈 수 없습니다. 분류 모형을 실제로 학습할 때 다른 손실을 쓰는 까닭입니다. 그 손실은 [로지스틱 회귀의 MLE](map.html?s=sl&n=logreg-mle-objective)에서 얻습니다.

**squared loss와 absolute loss: 오차가 커질 때**

둘 다 0 이상이고 예측이 정답과 같을 때만 0입니다. 다른 점은 오차가 커질 때 손실이 느는 속도입니다.

| 오차의 크기 $\lvert h(\mathbf{x}) - y \rvert$ | 0.5 | 1 | 2 | 10 |
|---|---|---|---|---|
| squared loss | 0.25 | 1 | 4 | 100 |
| absolute loss | 0.5 | 1 | 2 | 10 |

squared loss는 오차의 제곱으로 늘고 absolute loss는 오차에 비례해 늡니다. 오차가 1보다 작을 때는 오히려 squared loss가 더 작습니다. squared loss는 작은 오차를 봐주고 큰 오차를 무겁게 벌하는 손실입니다.

이 차이는 이상치(outlier)가 있을 때 드러납니다. 표본 네 개의 오차 크기가 1, 1, 1, 10이라고 합시다.

| | 표본별 손실 | 합 | 마지막 표본의 몫 |
|---|---|---|---|
| squared loss | 1, 1, 1, 100 | 103 | 약 97% |
| absolute loss | 1, 1, 1, 10 | 13 | 약 77% |

squared loss를 줄이려는 학습은 사실상 마지막 표본 하나를 맞추는 데 매달립니다. 그래서 squared loss는 이상치에 민감하고 absolute loss는 덜 민감합니다.

**미분으로 보면**

예측을 $\hat{y} = h(\mathbf{x})$ 라 쓰고 손실을 예측으로 미분합니다.

$$
\frac{\partial}{\partial \hat{y}} (\hat{y} - y)^2 = 2(\hat{y} - y)
$$

$$
\frac{\partial}{\partial \hat{y}} \lvert \hat{y} - y \rvert = \text{sign}(\hat{y} - y) \qquad (\hat{y} \neq y)
$$

squared loss의 기울기는 오차에 비례합니다. 멀리 벗어난 표본일수록 예측을 세게 끌어당깁니다. absolute loss의 기울기는 크기가 늘 1입니다. 어느 쪽으로 틀렸는지만 알려 주고 얼마나 틀렸는지는 반영하지 않습니다. 모든 표본이 같은 힘으로 당기므로 하나가 멀리 있어도 판이 기울지 않습니다.

**평균과 중앙값**

같은 입력에 정답이 여러 개 있고 예측은 수 하나만 낼 수 있다고 합시다. 이때 squared loss를 가장 작게 만드는 예측은 정답들의 평균이고 absolute loss를 가장 작게 만드는 예측은 중앙값입니다. 평균은 극단값 하나에 끌려가고 중앙값은 끌려가지 않습니다. 위의 이상치 이야기와 같은 사실을 다른 쪽에서 본 것입니다.

<div class="cal key">

**두 손실의 차이는 한 줄입니다**

squared loss는 오차가 클수록 더 세게 고치려 하고 absolute loss는 방향만 봅니다. 이상치에 대한 민감도, 평균과 중앙값의 차이가 모두 여기서 나옵니다. 선형회귀 가지에서는 이 두 손실이 각각 [가우시안 노이즈](map.html?s=sl&n=lr-gaussian-noise-mse)와 [라플라스 노이즈](map.html?s=sl&n=lr-laplace-noise-mae)를 가정한 결과로 다시 나옵니다.

</div>

## 흔한 오해

<div class="cal trap">

**absolute loss가 이상치에 강하니 언제나 더 좋은 손실이다**

아닙니다. 이상치가 없고 큰 오차가 실제로 더 나쁜 상황이라면 큰 오차를 무겁게 벌하는 squared loss가 맞는 선택입니다. 어느 손실이 옳은지는 데이터와 목적이 정합니다.

</div>

<div class="cal trap">

**zero-one loss의 값이 곧 error rate다**

표본 하나의 zero-one loss는 0 아니면 1입니다. error rate는 그것을 데이터 전체에서 평균한 값입니다. 손실은 표본 하나에 대한 것이고 그 평균을 내는 것은 다음 가지의 risk가 하는 일입니다.

</div>

## 확인 질문

<div class="cal q">

오차 $\hat{y} - y$ 가 0.5인 표본과 3인 표본이 있습니다. 두 표본에서 squared loss와 absolute loss의 값, 그리고 예측에 대한 기울기를 표로 채워 보세요. 오차가 6배가 될 때 각 손실의 값과 기울기는 몇 배가 됩니까.

</div>

<details class="solve">
<summary>답 보기</summary>

| | 오차 0.5 | 오차 3 | 몇 배 |
|---|---|---|---|
| squared loss의 값 | 0.25 | 9 | 36배 |
| squared loss의 기울기 $2(\hat{y} - y)$ | 1 | 6 | 6배 |
| absolute loss의 값 | 0.5 | 3 | 6배 |
| absolute loss의 기울기 $\text{sign}(\hat{y} - y)$ | 1 | 1 | 1배 |

오차가 6배가 되면 squared loss는 값이 36배, 기울기가 6배가 됩니다. absolute loss는 값이 6배가 되고 기울기는 그대로입니다. 오차가 큰 표본이 학습을 얼마나 끌고 가는지는 기울기가 정하므로 squared loss에서만 큰 오차의 발언권이 커집니다.

</details>
