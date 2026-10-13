---
title: 선형회귀
en: Linear regression
parent: risk-minimization
order: 40
summary: 실수 레이블을 입력의 선형 함수로 맞추는 모형입니다. 노이즈의 분포를 가정하는 순간 손실 함수가 정해진다는 것을 처음으로 직접 유도해 보는 자리입니다.
---

## 왜 필요한가

앞 가지에서 MLE는 "분포의 매개변수를 데이터로 정하는 방법"이었습니다. 선형회귀는 그 방법을 처음으로 **입력이 있는 모형**에 씁니다. 평균이 고정된 숫자가 아니라 입력 $x$ 의 선형 함수 $w_1 x + w_0$ 로 움직이는 가우시안을 생각하면 됩니다.

이 가지에서는 가정을 두 번 바꿉니다. 노이즈의 분포를 바꾸면 손실이 바뀌고 계수의 prior를 바꾸면 벌점이 바뀝니다. 유도를 통째로 외우기보다 어느 가정이 어느 줄을 바꾸는지를 따라가면 됩니다.

## 이 가지의 흐름

1. [모형과 가정](map.html?s=sl&n=lr-model-assumption)을 적습니다. $y = w_1 x + w_0 + \epsilon$ 에서 직선은 $y$ 의 평균이고 관측값은 그 둘레에 퍼집니다.
2. 노이즈를 가우시안으로 두고 MLE를 전개하면 [MSE](map.html?s=sl&n=lr-gaussian-noise-mse)가 나옵니다.
3. 노이즈를 라플라스로 바꾸면 같은 다섯 줄에서 [MAE](map.html?s=sl&n=lr-laplace-noise-mae)가 나옵니다. 새로 쓰는 것은 밀도를 넣는 한 줄입니다.
4. MSE를 미분해 0으로 두면 [단변량의 닫힌 해](map.html?s=sl&n=lr-closed-form-univariate) $\hat{w}_0$, $\hat{w}_1$ 이 나옵니다.
5. 입력을 벡터로 넓히면 [normal equation과 닫힌 해](map.html?s=sl&n=lr-multivariate-normal-equation)가 됩니다. 역행렬이 있어야 쓸 수 있어서 실제로는 반복법으로 풉니다.
6. [닫힌 해의 행렬 미분 전개](map.html?s=sl&n=lr-closed-form-derivation)와 [projection으로 읽는 해석](map.html?s=sl&n=lr-projection)은 참고용으로 따로 두었습니다.
7. 입력을 비선형으로 바꾸면 [다항 회귀](map.html?s=sl&n=polynomial-regression)가 됩니다. 항을 늘릴수록 과적합이 생깁니다.
8. 구한 계수가 우연이 아닌지 [가설 검정](map.html?s=sl&n=coefficient-inference)으로 확인합니다.
9. 계수가 0 근처에 있다는 가우시안 prior를 더해 MAP로 풀면 [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)가 나옵니다.
10. prior를 라플라스로 바꾸면 [lasso](map.html?s=sl&n=lasso-map-laplace-prior)가 나옵니다. 바뀌는 것은 prior 쪽 두 줄입니다.
11. [ridge와 lasso의 차이](map.html?s=sl&n=ridge-vs-lasso)는 계수가 정확히 0이 되느냐에 있습니다.
12. 손실은 노이즈가 정하고 벌점은 prior가 정합니다. [두 가정의 조합](map.html?s=sl&n=noise-prior-combination)을 한 표로 봅니다.

<div class="cal key">

**이 가지에서 반드시 남겨야 할 한 문장**

제곱 손실은 누가 정해 준 것이 아닙니다. 노이즈가 가우시안이라고 가정하고 우도를 최대화하면 나오는 결과입니다.

</div>
