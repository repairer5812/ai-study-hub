---
title: MLE를 orthogonal projection으로 읽기
en: Least squares as orthogonal projection
parent: linear-regression
order: 150
summary: 닫힌 해로 만든 예측은 레이블 벡터를 입력 행렬의 열들이 만드는 부분공간에 수직으로 내린 것입니다. 미분으로 얻은 해를 기하로 다시 읽는 해석입니다.
signal: none
related: []
---

<div class="cal extra">

**기하적 해석을 위한 참고 페이지입니다.**

과제 2의 코드와 수업에서 강조한 유도를 먼저 복습한 뒤 읽습니다. 이 참고 배치는 복습 순서를 정한 것이며, 별도의 시험 제외 안내로 해석하지 않습니다.

</div>

## 정의와 수식

[닫힌 해](map.html?s=sl&n=lr-multivariate-normal-equation)를 $\mathbf{X}$ 에 다시 곱하면 학습 표본에 대한 예측 벡터 $\mathbf{X}\hat{\mathbf{w}} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ 가 나옵니다. $\mathbf{X}\mathbf{w}$ 꼴로 만들 수 있는 벡터는 모두 $\mathbf{X}$ 의 열들이 만드는 부분공간 안에 있고 레이블 벡터 $\mathbf{y}$ 는 보통 그 밖에 있습니다. 제곱 손실을 최소화한다는 것은 그 부분공간 안에서 $\mathbf{y}$ 와 가장 가까운 점을 찾는다는 뜻입니다. 그 점이 $\mathbf{y}$ 를 부분공간에 수직으로 내린 orthogonal projection(직교 사영)입니다. $\mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ 가 사영 행렬이고 $\hat{\mathbf{w}}$ 는 사영된 점의 좌표입니다.

수직이라는 조건을 식으로 쓰면 잔차 벡터가 $\mathbf{X}$ 의 모든 열과 직교한다는 것입니다.

$$
\mathbf{X}^T (\mathbf{y} - \mathbf{X}\hat{\mathbf{w}}) = \mathbf{0}
$$

풀어 쓰면 normal equation $\mathbf{X}^T\mathbf{X}\,\hat{\mathbf{w}} = \mathbf{X}^T\mathbf{y}$ 와 같은 식입니다. 미분으로 얻은 해와 기하로 얻은 해가 같다는 것만 알아 두면 됩니다. 사영의 기본은 [도구](map.html?s=sl&n=preliminaries) 노드가 가리키는 복습 노트에 있습니다.
