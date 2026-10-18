---
title: convex 함수와 수렴
en: Convexity and convergence
parent: gradient-descent
order: 20
summary: 경사하강법은 gradient가 0인 곳에서 멈출 뿐 그곳이 가장 낮은 곳인지는 모릅니다. 함수가 convex이면 그 걱정이 없고 반복 횟수에 반비례해 줄어드는 오차의 상한도 얻습니다.
signal: none
related: []
---

<div class="cal extra">

**수렴 정리는 뜻을 중심으로 읽습니다**

수업에서는 유도 자체보다 정리가 말하는 바를 강조했습니다. convex, gradient의 매끄러움, 알맞은 학습률이 어떤 보장에 필요한지 봅니다. 반복 횟수가 늘 때 오차 상한이 줄어든다는 뜻을 이해하고, 증명을 외우는 데 복습 시간을 쓰지 않습니다.

</div>

## 왜 필요한가

경사하강법은 gradient가 0에 가까워지면 멈춥니다. 그런데 골짜기가 여러 개인 함수라면 가까운 골짜기의 바닥에 멈출 수 있습니다. 그 바닥은 주변보다 낮은 local minimum일 뿐 전체에서 가장 낮은 global minimum이 아닐 수 있습니다. 알고리즘은 둘을 구별하지 못합니다.

구별이 필요 없는 경우가 있습니다. 함수가 convex이면 local minimum은 global minimum입니다. 최솟값을 주는 점이 여러 개일 수도 있으므로 최적점이 하나뿐이라는 뜻은 아닙니다. 로지스틱 회귀의 목적함수가 그런 함수입니다. 그래서 gradient가 0인 점을 찾으면 그 점이 최적입니다.

## 정의와 수식

### convex의 정의

함수 $f: \mathbb{R}^d \to \mathbb{R}$ 가 convex라는 것은 모든 두 점 $\mathbf{u}$, $\mathbf{v}$ 와 모든 $0 \le t \le 1$ 에 대해 다음이 성립한다는 뜻입니다.

$$
f\big(t\mathbf{u} + (1-t)\mathbf{v}\big) \le t f(\mathbf{u}) + (1-t) f(\mathbf{v})
$$

왼쪽은 두 점 사이의 한 지점에서 잰 함수의 높이입니다. 오른쪽은 같은 지점에서 잰, 두 점을 이은 선분의 높이입니다. 그래프 위의 어느 두 점을 이어도 선분이 그래프 아래로 내려가지 않는다는 말입니다.

여기서 $t$ 는 두 점을 섞는 비율입니다. 갱신식의 반복 번호와 겹치지 않도록 이 노드에서는 반복 번호를 $k$ 로 씁니다.

### 예 둘

$f(x) = \lvert x \rvert$ 는 convex입니다. 정의에 넣어 확인합니다.

$$
\begin{aligned}
f\big(tu + (1-t)v\big) &= \lvert tu + (1-t)v \rvert \\
&\le \lvert tu \rvert + \lvert (1-t)v \rvert \\
&= t\lvert u \rvert + (1-t)\lvert v \rvert \\
&= t f(u) + (1-t) f(v)
\end{aligned}
$$

1. 첫째 줄: $f$ 의 정의를 씁니다.
2. 둘째 줄: 삼각부등식 $\lvert a + c \rvert \le \lvert a \rvert + \lvert c \rvert$ 입니다.
3. 셋째 줄: $t$ 와 $1-t$ 가 0 이상이라 절댓값 밖으로 나옵니다.
4. 넷째 줄: 다시 $f$ 의 정의입니다.

$f(x) = x^3$ 은 convex가 아닙니다. 정의는 모든 두 점에서 성립해야 하므로 어긋나는 경우를 하나만 보이면 됩니다. $u = -1$, $v = 0$, $t = \frac{1}{2}$ 을 넣습니다.

$$
f\big(-\tfrac{1}{2}\big) = -\tfrac{1}{8}, \qquad \tfrac{1}{2} f(-1) + \tfrac{1}{2} f(0) = -\tfrac{1}{2}
$$

$-\frac{1}{8} \le -\frac{1}{2}$ 은 거짓입니다. 음수 구간에서 그래프가 선분 위로 올라갑니다.

convex임을 보일 때는 모든 경우를 덮는 증명이 필요하고 아님을 보일 때는 반례 하나면 됩니다.

### 수렴 정리

$f$ 가 convex이고 gradient가 $L$-Lipschitz 연속이라고 합시다. 최솟값을 주는 점을 $\mathbf{w}^* = \arg\min_{\mathbf{w}} f(\mathbf{w})$ 라 쓰면 경사하강법을 $k$ 번 되풀이한 뒤의 오차는 다음을 넘지 않습니다.

$$
f(\mathbf{w}_k) - f(\mathbf{w}^*) \le \frac{L\,\lVert \mathbf{w}^* - \mathbf{w}_0 \rVert^2}{2k}
$$

읽는 법은 세 가지입니다.

- 분모의 $k$: 반복을 두 배로 하면 오차의 상한이 절반이 됩니다.
- 분자의 거리: 시작점이 최적점에서 멀수록 상한이 큽니다. 거리가 제곱으로 들어갑니다.
- 분자의 $L$: gradient가 급하게 변하는 함수일수록 상한이 큽니다.

조건에 나온 $L$-Lipschitz 연속은 $f$ 의 gradient $\nabla f$ 에 대한 조건입니다.

$$
\lVert \nabla f(\mathbf{u}) - \nabla f(\mathbf{v}) \rVert \le L\,\lVert \mathbf{u} - \mathbf{v} \rVert
$$

두 점이 가까우면 두 점의 gradient도 가깝다는 뜻입니다. $f(x) = x^2$ 이면 $\nabla f(x) = 2x$ 이고 $\lvert 2u - 2v \rvert = 2\lvert u - v \rvert$ 이므로 $L = 2$ 입니다.

이 상한은 step size를 알맞게 잡았을 때의 결과이고 보통 $\alpha = \frac{1}{L}$ 로 둡니다. 증명은 다루지 않습니다. 결과가 말하는 것만 가져갑니다.

<div class="cal key">

**보장은 알고리즘이 아니라 함수에서 옵니다**

경사하강법이 하는 일은 어떤 함수에서나 같습니다. 멈춘 점이 global minimum이라는 보장과 오차의 상한은 함수가 convex이고 gradient가 급하게 변하지 않는다는 성질에서 나옵니다.

</div>

## 흔한 오해

<div class="cal trap">

**경사하강법은 도달한 점이 global minimum인지 스스로 안다**

알고리즘이 아는 것은 그 자리의 gradient가 0에 가깝다는 것뿐입니다. 그 점이 전체에서 가장 낮은 점인지는 함수가 convex인지를 따로 알아야 말할 수 있습니다.

</div>

<div class="cal trap">

**$x^3$ 은 $x > 0$ 에서 아래로 볼록하므로 convex 함수다**

convex의 정의는 정의역의 모든 두 점에서 성립해야 합니다. 음수 쪽의 두 점 $-1$ 과 $0$ 에서 부등식이 깨지므로 실수 전체에서는 convex가 아닙니다.

</div>

## 확인 질문

<div class="cal q">

$f(x) = x^2$ 이 convex임을 정의로 보이세요. $t u^2 + (1-t) v^2$ 에서 $\big(tu + (1-t)v\big)^2$ 을 뺀 값이 0 이상임을 보이면 됩니다.

</div>

<details class="solve">
<summary>답 보기</summary>

$$
\begin{aligned}
& t u^2 + (1-t) v^2 - \big(tu + (1-t)v\big)^2 \\
&= t(1-t)\,u^2 + t(1-t)\,v^2 \\
&\quad - 2t(1-t)\,uv \\
&= t(1-t)\,(u - v)^2 \\
&\ge 0
\end{aligned}
$$

첫째 등호에서 $u^2$ 의 계수는 $t - t^2 = t(1-t)$ 이고 $v^2$ 의 계수는 $(1-t) - (1-t)^2 = t(1-t)$ 입니다. $0 \le t \le 1$ 이면 $t(1-t) \ge 0$ 이고 제곱은 0 이상이므로 전체가 0 이상입니다. 따라서 $f\big(tu + (1-t)v\big) \le t f(u) + (1-t) f(v)$ 입니다.

</details>

<div class="cal q">

수렴 정리에서 $L = 2$, $\lVert \mathbf{w}^* - \mathbf{w}_0 \rVert = 3$ 이라고 합시다. 오차의 상한이 0.1 이하가 되려면 몇 번 되풀이해야 합니까. 시작점을 최적점까지의 거리가 절반인 곳으로 옮기면 그 횟수는 어떻게 됩니까.

</div>

<details class="solve">
<summary>답 보기</summary>

상한은 $\frac{2 \cdot 3^2}{2k} = \frac{9}{k}$ 입니다. $\frac{9}{k} \le 0.1$ 이려면 $k \ge 90$ 입니다.

거리가 $1.5$ 이면 상한은 $\frac{2 \cdot 1.5^2}{2k} = \frac{2.25}{k}$ 이고 $k \ge 22.5$ 이므로 23번입니다. 거리가 제곱으로 들어가서 거리를 절반으로 줄이면 필요한 횟수가 약 4분의 1이 됩니다.

</details>
