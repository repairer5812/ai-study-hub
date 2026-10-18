---
title: 닫힌 해의 행렬 미분 전개
en: Matrix derivation of the closed form
parent: linear-regression
order: 55
summary: 제곱 손실의 행렬 미분에서 normal equation까지 이어지는 과제 복습입니다. 시험 범위 밖 표시는 유지하며, 가로 미분과 세로 gradient의 모양도 함께 확인합니다.
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

## 과제 복습: 제곱 손실의 미분

이 노드의 기존 시험 범위 밖 표시는 유지합니다. 다음 전개는 과제에서 다룬 계산을 복습하기 위한 것이며, 시험 범위가 바뀌었다는 뜻은 아닙니다.

$\mathbf{X}\in\mathbb R^{n\times d}$, $\mathbf y\in\mathbb R^{n\times1}$, $\mathbf w\in\mathbb R^{d\times1}$ 로 두고, 분산 $\sigma^2>0$ 은 알고 있다고 가정합니다. 입력은 고정합니다. 가우시안 오차의 음의 로그우도는 다음과 같습니다.

$$
L_D(\mathbf w)=\frac1{2\sigma^2}(\mathbf y-\mathbf X\mathbf w)^T(\mathbf y-\mathbf X\mathbf w)+C.
$$

$C$ 는 $\mathbf w$ 와 무관한 상수입니다. 괄호 안을 전개합니다.

$$
\begin{aligned}
&\mathbf y^T\mathbf y-\mathbf y^T\mathbf X\mathbf w-\mathbf w^T\mathbf X^T\mathbf y\\
&\quad+\mathbf w^T\mathbf X^T\mathbf X\mathbf w.
\end{aligned}
$$

가운데 두 항은 서로 전치인 스칼라이므로 값이 같습니다. $\mathbf X^T\mathbf X$ 는 대칭입니다. 이 두 사실을 써서 세로 gradient를 구합니다.

$$
\begin{aligned}
\nabla_{\mathbf w}L_D
&=\frac1{2\sigma^2}(-2\mathbf X^T\mathbf y+2\mathbf X^T\mathbf X\mathbf w)\\
&=\frac1{\sigma^2}\mathbf X^T(\mathbf X\mathbf w-\mathbf y).
\end{aligned}
$$

gradient는 $d\times1$ 입니다. 가로 미분 관례로 쓰면 같은 성분이 $-\frac1{\sigma^2}(\mathbf y-\mathbf X\mathbf w)^T\mathbf X$ 라는 $1\times d$ 모양이 됩니다. 계수와 부호가 같아도 전치 여부를 확인해야 합니다.

gradient를 0으로 놓고 양의 상수 $1/\sigma^2$ 를 제거하면 위의 normal equation이 나옵니다. $\mathbf X$ 의 열들이 독립이면 역행렬로 유일한 해를 구할 수 있습니다. 다항회귀에서는 $\mathbf X$ 자리에 feature 행렬 $\boldsymbol\Phi$ 를 넣습니다.

## 확인 질문

<div class="cal q">

$L(\mathbf w)=\frac1{2n}\lVert\mathbf y-\mathbf X\mathbf w\rVert_2^2$ 로 바꾸면 gradient의 계수는 어떻게 바뀝니까? 같은 열 독립 조건에서 최소점도 바뀝니까?

</div>

<details class="solve">
<summary>답 보기</summary>

gradient는 $\frac1n\mathbf X^T(\mathbf X\mathbf w-\mathbf y)$ 입니다. 원래 gradient와 양의 상수배 관계이므로 0이 되는 위치와 normal equation은 같습니다. 벌점이 따로 있는 목적함수에서는 손실 부분만 배율을 바꾸면 벌점과의 상대적 크기도 바뀐다는 점에 주의합니다.

</details>
