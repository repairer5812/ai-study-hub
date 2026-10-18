---
title: 학습은 위험을 최소화하는 일이다
en: Learning as risk minimization
parent: null
order: 0
summary: 이번 수업의 출제 예고와 강조 내용, 과제 1과 2를 먼저 복습합니다. 위험과 추정의 원리에서 선형회귀와 Logistic 유도까지 연결하고 참고 내용은 뒤에 둡니다.
---

## 시험 준비는 여기부터

이번 수업의 교재와 과제 1, 2를 기준으로 복습합니다. 출제 예고, 수업에서의 강조, 과제의 요구 사항을 아래처럼 연결했습니다. 다른 과목 기출만으로 내용을 추가하지 않습니다.

| 먼저 확인할 내용 | 근거 | 직접 해 볼 것 |
|---|---|---|
| [위험과 ERM](map.html?s=sl&n=erm) | 수업 강조 | true risk와 empirical risk, [불편성](map.html?s=sl&n=empirical-risk-unbiased), [두 오차의 분해](map.html?s=sl&n=estimation-approximation-error)를 설명합니다. |
| [분포별 MLE](map.html?s=sl&n=mle-distribution-parameters) | 과제 1 | Gaussian 평균과 분산, Laplace 위치와 척도, Exponential rate를 구합니다. |
| [노이즈에서 손실로](map.html?s=sl&n=lr-gaussian-noise-mse) | 출제 예고 | 노이즈를 바꿔 MSE와 [MAE](map.html?s=sl&n=lr-laplace-noise-mae)를 유도합니다. |
| [prior에서 벌점으로](map.html?s=sl&n=map-posterior) | 수업 강조 | [Gaussian prior의 Ridge](map.html?s=sl&n=ridge-map-gaussian-prior)와 [Laplace prior의 Lasso](map.html?s=sl&n=lasso-map-laplace-prior)를 구분합니다. |
| [다항회귀](map.html?s=sl&n=polynomial-regression) | 과제 2 | 특성 행렬, NumPy 코드, K와 차수, 과적합을 확인합니다. |
| [계수의 가설검정](map.html?s=sl&n=coefficient-inference) | 수업 강조 | 귀무가설, 표준오차, t 통계량의 관계를 설명합니다. |
| [Logistic MLE](map.html?s=sl&n=logreg-mle-objective)와 [MAP](map.html?s=sl&n=logreg-map) | 출제 예고 | -1/+1 레이블의 확률에서 목적함수와 Gaussian prior 벌점까지 전개합니다. |
| [결정경계](map.html?s=sl&n=decision-boundary) | 출제 예고 | 경계를 구성하고 최소 오분류를 셉니다. 다항 특성으로 달라지는 분류도 확인합니다. |

복습한 뒤 [90분 모의시험](paper.html?s=sl&set=midterm-1)으로 확인합니다. 큰 문항은 14개이고 과제 1, 2가 각각 D1, D2에 포함돼 있습니다.

[경사하강법](map.html?s=sl&n=gradient-descent)은 Topic 4의 학습 방법입니다. 갱신 방향, 학습률, 종료 조건, 수렴 정리의 뜻을 이해합니다. 수렴 증명 전체를 외우는 순서로 공부할 필요는 없습니다.

## 참고로 뒤에 읽을 내용

[행렬 미분 전개](map.html?s=sl&n=lr-closed-form-derivation)와 [PAC/VC 이론](map.html?s=sl&n=pac-vc-bound)에는 시험 제외 안내가 있습니다. 다만 과제 2의 닫힌 해 사용과 코드는 그 안내에 포함시키지 않습니다. [Beta prior의 상세 전개](map.html?s=sl&n=map-coin-beta)는 수업에서 넘어간 부분이고, [projection 해석](map.html?s=sl&n=lr-projection)은 여기서 참고로 배치했습니다.

## 한 줄기

Topic 2부터 Topic 4까지 나오는 모형은 모두 같은 네 걸음으로 만들어집니다.

1. **가정을 세운다.** 데이터가 어떤 분포에서 나왔다고 볼지 정합니다. 예를 들어 "레이블은 선형 함수에 가우시안 노이즈가 더해진 값이다."
2. **우도를 쓴다.** 그 가정 아래에서 지금 가진 데이터가 관측될 확률을 매개변수의 함수로 적습니다.
3. **음의 로그우도를 손실로 바꾼다.** 곱을 합으로 바꾸고, 매개변수와 상관없는 항을 지우고, 부호를 뒤집어 최소화 문제로 만듭니다.
4. **푼다.** 미분해서 0이 되는 점이 식으로 나오면 그대로 쓰고, 안 나오면 경사하강법으로 찾습니다.

관측모형과 prior 가정에 따라 손실과 벌점이 달라집니다. 우도에 로그를 취하는 원리는 같고, 마지막에 식으로 풀지 반복해서 찾을지는 목적함수에 따라 달라집니다.

## 가정을 바꾸면 손실이 바뀐다

| 무엇을 가정하나 | 3번까지 가면 나오는 것 | 가지 |
|---|---|---|
| 노이즈가 가우시안이다 | 제곱 오차의 평균(MSE) | 선형회귀 |
| 노이즈가 라플라스다 | 절댓값 오차의 평균(MAE) | 선형회귀 |
| 레이블이 로지스틱 함수가 주는 확률로 정해진다 | 로지스틱 손실 | 로지스틱 회귀 |
| 매개변수가 0 근처에 있다는 가우시안 prior를 더한다 | 손실에 $\lambda \mathbf{w}^T\mathbf{w}$ 가 붙는다(ridge) | 선형회귀 |
| 매개변수에 라플라스 prior를 더한다 | 손실에 $\lambda \lVert \mathbf{w} \rVert_1$ 이 붙는다(lasso) | 선형회귀 |

<div class="cal key">

**어떤 가정에서 나온 항인지 구분합니다**

어느 손실이 "맞는" 손실인지 고르는 문제가 아닙니다. 손실을 고르는 일과 노이즈의 분포를 가정하는 일이 같은 일을 다른 쪽에서 본 것이라는 점이 핵심입니다.

</div>

## 이 지도를 쓰는 법

- 위의 시험 준비 표를 먼저 확인하고, 설명이 필요한 개념을 나무에서 찾아 읽습니다. 가지 뒤쪽의 참고 내용까지 같은 비중으로 읽을 필요는 없습니다.
- 확인 질문은 답을 펴기 전에 종이에 먼저 써 봅니다.
- <span class="ct-sig ct-sig-emph">강조</span>는 수업에서 강조한 내용, <span class="ct-sig ct-sig-hw">과제</span>는 이번 학기 과제의 핵심 개념입니다. 강조 표시 전체가 개별 문항의 출제 예고를 뜻하지는 않습니다.
- 다 본 개념은 "이 개념 확인함"을 눌러 두면 나무에 표시가 남습니다. 표시는 이 브라우저에만 저장됩니다.
