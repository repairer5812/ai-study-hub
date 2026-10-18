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

1. [모형과 가정](map.html?s=sl&n=lr-model-assumption)을 적고, Gaussian 노이즈에서 [MSE](map.html?s=sl&n=lr-gaussian-noise-mse)가 나오는 과정을 씁니다.
2. 노이즈를 Laplace로 바꿔 [MAE](map.html?s=sl&n=lr-laplace-noise-mae)를 얻습니다. 분포를 넣는 줄과 최종 손실이 함께 바뀝니다.
3. [단변량 닫힌 해](map.html?s=sl&n=lr-closed-form-univariate)와 [다변량 닫힌 해](map.html?s=sl&n=lr-multivariate-normal-equation)의 형태와 사용 조건을 확인합니다.
4. [과제 2의 다항회귀](map.html?s=sl&n=polynomial-regression)에서 특성 행렬, 코드, 차수, 과적합을 복습합니다.
5. 추정한 계수가 통계적으로 의미 있는지 [가설검정](map.html?s=sl&n=coefficient-inference)으로 확인합니다.
6. Gaussian prior의 [Ridge](map.html?s=sl&n=ridge-map-gaussian-prior)와 Laplace prior의 [Lasso](map.html?s=sl&n=lasso-map-laplace-prior)를 유도합니다. [두 방법의 차이](map.html?s=sl&n=ridge-vs-lasso)와 [노이즈와 prior의 역할](map.html?s=sl&n=noise-prior-combination)을 구분합니다.
7. [행렬 미분 전개](map.html?s=sl&n=lr-closed-form-derivation)는 시험 제외 안내가 있는 참고 자료입니다. [projection 해석](map.html?s=sl&n=lr-projection)도 복습 순서 뒤에 둡니다.

<div class="cal key">

**이 가지에서 반드시 남겨야 할 한 문장**

제곱 손실은 누가 정해 준 것이 아닙니다. 노이즈가 가우시안이라고 가정하고 우도를 최대화하면 나오는 결과입니다.

</div>
