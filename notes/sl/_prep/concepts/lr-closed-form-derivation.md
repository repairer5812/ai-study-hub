---
title: 닫힌 해의 행렬 미분 전개
en: Matrix derivation of the closed form
parent: linear-regression
order: 55
summary: 제곱 손실을 행렬 꼴로 바꿔 쓰고 벡터로 미분해 normal equation에 닿는 전개입니다. 결과식이 어디서 나왔는지 확인하고 싶을 때 보는 참고 노드입니다.
signal: out
related: []
---

## 왜 필요한가

[다변량 선형회귀](map.html?s=sl&n=lr-multivariate-normal-equation)에서는 닫힌 해를 결과로만 썼습니다. 그 결과가 나오는 전개에 새로운 생각은 없습니다. [단변량](map.html?s=sl&n=lr-closed-form-univariate)에서 성분마다 하던 편미분을 벡터 표기로 한 번에 하는 것뿐입니다.

## 전개의 줄거리

1. 표본별 제곱의 합을 벡터 $\mathbf{X}\mathbf{w} - \mathbf{y}$ 의 노름 제곱으로 바꿔 씁니다.
2. 괄호를 풀어 $\mathbf{w}$ 의 이차식으로 정리합니다.
3. 벡터 미분 공식 두 개로 gradient를 구합니다.
4. gradient를 영벡터로 두면 normal equation이 나옵니다.

$$
\begin{aligned}
\mathbf{X}^T\mathbf{X}\,\hat{\mathbf{w}} &= \mathbf{X}^T\mathbf{y} \\
\hat{\mathbf{w}} &= (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}
\end{aligned}
$$

첫째 줄이 normal equation입니다. 둘째 줄은 $\mathbf{X}^T\mathbf{X}$ 의 역행렬이 있을 때만 쓸 수 있습니다.

줄 단위 전개는 지금 진행 중인 과제와 같은 계산이라서 과제 마감 뒤에 올립니다.
