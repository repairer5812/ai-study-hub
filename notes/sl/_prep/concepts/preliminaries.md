---
title: "도구: 확률, 선형대수, 미분"
en: Preliminaries
parent: risk-minimization
order: 5
summary: 이 지도의 모든 유도는 확률, 선형대수, 미분 세 가지 도구로 쓰입니다. 도구가 손에 익어 있어야 개념에만 집중할 수 있습니다.
signal: none
related: []
---

## 왜 필요한가

이 지도의 유도는 세 가지 도구만 씁니다. 식이 낯설어 보여도 그 안에서 실제로 하는 일은 몇 가지뿐입니다. 기댓값을 풀어 씁니다. 로그로 곱을 합으로 바꿉니다. 미분해서 0이 되는 점을 찾습니다. 이 손놀림이 막히면 개념이 아니라 계산에서 시간을 잃습니다.

| 도구 | 쓸 줄 알아야 하는 것 | 처음 쓰이는 곳 |
|---|---|---|
| 확률 | 기댓값과 그 선형성, 독립이면 결합 확률이 곱이 된다는 것, 조건부 확률과 Bayes rule, 가우시안과 라플라스의 밀도 | [불편 추정량 증명](map.html?s=sl&n=empirical-risk-unbiased), [음의 로그우도](map.html?s=sl&n=mle-nll), [MAP](map.html?s=sl&n=map-posterior) |
| 선형대수 | 내적 $\mathbf{w}^T\mathbf{x}$, 행렬 곱과 전치, 역행렬, 노름 | [가설 집합의 선형 모형](map.html?s=sl&n=hypothesis-class), [다변량 선형회귀](map.html?s=sl&n=lr-multivariate-normal-equation) |
| 미분 | 로그와 지수의 미분, 연쇄법칙, gradient | [동전 던지기의 MLE](map.html?s=sl&n=mle-coin-toss), [경사하강법의 갱신식](map.html?s=sl&n=gd-update-rule) |

이 가지에는 내려갈 잎이 없습니다. 도구 하나하나의 정의와 손풀이 예제는 [Preliminaries 복습 노트](https://repairer5812.github.io/%EC%88%98%EC%97%85/stat-learning/preliminaries/)에 따로 정리해 두었습니다. 위 표에서 막히는 칸이 있으면 그 노트의 해당 파트를 먼저 보고 돌아오면 됩니다.
