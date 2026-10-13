---
title: 가설과 가설 집합
en: Hypothesis class
parent: supervised-learning
order: 20
summary: 찾으려는 함수의 꼴을 미리 정해 둔 후보 함수의 모임입니다. 모형의 종류를 고르면 가설 집합이 정해지고 그 뒤의 학습은 매개변수를 찾는 일이 됩니다.
signal: none
related: []
---

## 왜 필요한가

입력을 받아 출력을 내는 함수는 셀 수 없이 많습니다. 그 대부분은 식으로 적을 수도 없습니다. 이 모두를 후보로 두면 찾기를 시작할 수조차 없습니다. 그래서 먼저 어떤 꼴의 함수 가운데서 고를지를 정합니다. 그 범위가 가설 집합(hypothesis class) $\mathcal{H}$ 입니다. 선형 모형을 쓰겠다, 신경망을 쓰겠다고 정하는 순간 정해지는 것이 $\mathcal{H}$ 입니다.

범위를 정하면 얻는 것이 하나 더 있습니다. 함수를 찾는 문제가 숫자를 찾는 문제로 바뀝니다.

## 정의와 수식

가설(hypothesis) $h$ 는 입력을 레이블로 보내는 함수이고 가설 집합은 후보 함수의 모임입니다.

$$
h: \mathbb{R}^d \to \mathcal{Y}, \qquad h \in \mathcal{H}
$$

트리, 선형 함수, 신경망이 저마다 하나의 가설 집합입니다. 집합 안의 함수 하나하나는 매개변수 $\boldsymbol{\theta}$ 로 가리킵니다.

$$
h(\cdot\,; \boldsymbol{\theta}): \mathbb{R}^d \to \mathcal{Y}
$$

세미콜론은 "뒤에 오는 값에 따라 정해진다"는 표시입니다. $\boldsymbol{\theta}$ 를 하나 정하면 함수 하나가 정해집니다. $\boldsymbol{\theta}$ 를 가능한 값 전체에서 움직이면 $\mathcal{H}$ 를 모두 훑습니다. 그래서 $\mathcal{H}$ 안에서 좋은 $h$ 를 찾는 일은 좋은 $\boldsymbol{\theta}$ 를 찾는 일과 같습니다. 신경망 문헌에서는 같은 것을 $f_{\boldsymbol{\theta}}$ 로 적습니다.

**선형 모형과 절편 흡수**

입력의 성분을 $x_1, \dots, x_d$ 라 하면 선형 모형은 다음과 같습니다.

$$
h(\mathbf{x}; \boldsymbol{\theta}) = \theta_0 + \sum_{j=1}^{d} \theta_j x_j = \boldsymbol{\theta}^T \tilde{\mathbf{x}}
$$

$$
\boldsymbol{\theta} = [\theta_0, \theta_1, \dots, \theta_d]^T, \qquad \tilde{\mathbf{x}} = [1, x_1, \dots, x_d]^T
$$

입력 맨 앞에 1을 붙였습니다. 그러면 절편 $\theta_0$ 이 1에 곱해지는 가중치가 되어 내적 한 번으로 식이 끝납니다. 매개변수는 $d+1$ 개입니다. 뒤의 가지에서 선형식을 절편 없이 $\mathbf{w}^T\mathbf{x}$ 로만 쓰는 곳은 이렇게 1을 붙여 둔 것입니다.

예를 들어 $d = 2$, $\boldsymbol{\theta} = [1, 2, -1]^T$, $\mathbf{x} = [3, 4]^T$ 라고 합시다. $\tilde{\mathbf{x}} = [1, 3, 4]^T$ 이므로 예측은 $1 \cdot 1 + 2 \cdot 3 + (-1) \cdot 4 = 3$ 입니다.

이 꼴에서 $\boldsymbol{\theta}$ 를 바꿔 가며 만들 수 있는 함수 전부가 선형 모형의 가설 집합입니다.

**No Free Lunch**

어떤 가설 집합을 고르든 그 선택에는 가정이 들어 있습니다. 선형 모형을 고르면 입력과 출력의 관계가 선형에 가깝다고 가정한 것입니다. No Free Lunch 정리는 이 사정을 일반적으로 말합니다.

- 잘 되는 학습 알고리즘은 모두 가정을 두고 있다.
- 모든 문제에서 가장 잘 되는 알고리즘 하나는 없다.

데이터가 모형의 가정과 맞을 때 그 모형이 잘 됩니다. 어느 가정이 맞을지 미리 알 수 없으므로 여러 모형을 돌려 비교합니다.

## 흔한 오해

<div class="cal trap">

**선형 모형을 쓰기로 했다면 함수 하나를 고른 것이다**

고른 것은 집합입니다. 함수 하나는 $\boldsymbol{\theta}$ 의 값까지 정해져야 나옵니다. 모형의 종류를 고르는 일($\mathcal{H}$ 를 정한다)과 학습($\mathcal{H}$ 안에서 $\boldsymbol{\theta}$ 를 정한다)은 다른 단계입니다. 뒤에서 오차를 두 갈래로 나눌 때 이 두 단계가 각각 한 갈래를 만듭니다.

</div>

<div class="cal trap">

**No Free Lunch는 충분히 큰 신경망이면 어떤 데이터에서도 가장 낫다는 뜻이다**

반대입니다. 모든 설정에서 통하는 알고리즘은 없다는 것이 이 정리의 내용입니다. 큰 신경망도 나름의 가정을 가진 가설 집합 하나이고 표본이 적은 표 데이터에서는 단순한 모형에 질 수 있습니다.

</div>

## 확인 질문

<div class="cal q">

입력이 3차원인 선형 모형을 생각합니다.

- (가) 매개변수 $\boldsymbol{\theta}$ 의 성분은 몇 개입니까.
- (나) $\mathbf{x} = [2, 0, -1]^T$, $\boldsymbol{\theta} = [0.5, 1, 4, 3]^T$ 일 때 $\tilde{\mathbf{x}}$ 를 쓰고 예측을 계산해 보세요.
- (다) 입력을 그대로 쓰는 한 이 가설 집합에 들어가지 못하는 함수를 하나 적어 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

(가) 절편까지 4개입니다.

(나) $\tilde{\mathbf{x}} = [1, 2, 0, -1]^T$ 이고 예측은 다음과 같습니다.

$$
\begin{aligned}
\boldsymbol{\theta}^T \tilde{\mathbf{x}} &= 0.5 \cdot 1 + 1 \cdot 2 + 4 \cdot 0 + 3 \cdot (-1) \\
&= -0.5
\end{aligned}
$$

(다) $h(\mathbf{x}) = x_1^2$ 이나 $h(\mathbf{x}) = x_1 x_2$ 처럼 성분의 제곱이나 곱이 들어간 함수입니다. 어떤 $\boldsymbol{\theta}$ 를 골라도 $\boldsymbol{\theta}^T \tilde{\mathbf{x}}$ 로는 만들 수 없습니다. 입력에 $x_1^2$ 같은 성분을 새로 붙여 주면 다시 선형 모형으로 다룰 수 있는데 이것이 [다항 회귀](map.html?s=sl&n=polynomial-regression)입니다.

</details>
