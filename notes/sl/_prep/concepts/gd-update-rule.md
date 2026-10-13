---
title: "갱신식: 테일러 전개에서 나온다"
en: Update rule from the Taylor expansion
parent: gradient-descent
order: 10
summary: 손실을 지금 자리 근처에서 1차식으로 근사하면 gradient의 반대 방향으로 조금 옮길 때 손실이 줄어든다는 것이 식으로 보입니다. 갱신식과 멈추는 기준 셋이 여기서 나옵니다.
signal: none
related: [logreg-no-closed-form]
---

## 왜 필요한가

"gradient의 반대 방향으로 간다"는 말은 그럴듯하지만 두 가지가 비어 있습니다. 그 방향으로 가면 손실이 줄어든다는 보장이 어디서 오는지, 그리고 왜 조금씩만 가야 하는지입니다.

1차 테일러 근사가 두 물음에 한꺼번에 답합니다. 갱신식은 외우는 식이 아니라 이 근사에서 한 줄로 나오는 식입니다.

## 정의와 수식

### 테일러 전개

여러 번 미분할 수 있는 함수 $f$ 는 한 점 $x$ 근처에서 다항식으로 근사할 수 있습니다.

$$
\begin{aligned}
f(x + s) \approx{}& f(x) + \frac{f^{(1)}(x)}{1!}\,s + \frac{f^{(2)}(x)}{2!}\,s^2 \\
& + \cdots + \frac{f^{(k)}(x)}{k!}\,s^k
\end{aligned}
$$

1차 항까지만 남기면 직선으로 근사한 것이 됩니다. $s$ 가 작을수록 잘 맞습니다.

$$
\begin{aligned}
f(x + s) &\approx f(x) + g(x)\,s \\
g(x) &= f^{(1)}(x)
\end{aligned}
$$

변수가 여러 개이면 미분 자리에 gradient가 들어가고 곱은 내적이 됩니다.

$$
f(\mathbf{x} + \mathbf{s}) \approx f(\mathbf{x}) + g(\mathbf{x})^T\mathbf{s}
$$

2차 항까지 쓰면 2차 편미분을 모은 행렬인 Hessian이 나오지만 경사하강법은 1차 항까지만 씁니다.

### 근사에서 갱신식까지

풀려는 문제는 $\min_{\mathbf{w}} \ell(\mathbf{w})$ 입니다. 지금 자리 $\mathbf{w}_t$ 에서 $\mathbf{s}$ 만큼 옮긴 곳의 손실을 1차로 근사합니다.

$$
\ell(\mathbf{w}_t + \mathbf{s}) \approx \ell(\mathbf{w}_t) + g(\mathbf{w}_t)^T\mathbf{s}
$$

여기에 $\mathbf{s} = -\alpha\, g(\mathbf{w}_t)$ 를 넣습니다. $\alpha$ 는 양수입니다.

$$
\begin{aligned}
\ell\big(\mathbf{w}_t - \alpha\, g(\mathbf{w}_t)\big)
&\approx \ell(\mathbf{w}_t) - \alpha\, g(\mathbf{w}_t)^T g(\mathbf{w}_t) \\
&= \ell(\mathbf{w}_t) - \alpha \lVert g(\mathbf{w}_t) \rVert_2^2 \\
&\le \ell(\mathbf{w}_t)
\end{aligned}
$$

1. 첫째 줄: 근사식의 $\mathbf{s}$ 자리에 $-\alpha\, g(\mathbf{w}_t)$ 를 넣습니다.
2. 둘째 줄: 벡터를 자기 자신과 내적하면 길이의 제곱입니다.
3. 셋째 줄: $\alpha$ 가 양수이고 길이의 제곱은 0 이상이라 빼는 양이 0 이상입니다. 등호는 gradient가 영벡터일 때만 성립합니다.

gradient가 0이 아닌 한 손실이 줄어든다는 뜻입니다. 이 이동을 그대로 규칙으로 삼은 것이 갱신식입니다.

$$
\mathbf{w}_{t+1} \leftarrow \mathbf{w}_t - \alpha\, g(\mathbf{w}_t)
$$

$\alpha$ 를 step size 또는 learning rate라고 부릅니다. 길이가 같은 $\mathbf{s}$ 가운데 $g(\mathbf{w}_t)^T\mathbf{s}$ 를 가장 작게 만드는 방향이 $g(\mathbf{w}_t)$ 의 정반대라서 이 방향을 가장 가파른 내리막(steepest descent)이라고 합니다.

조금씩만 가야 하는 이유도 같은 식에 있습니다. 위의 부등식은 근사식에서 나온 것이고 근사는 $\mathbf{s}$ 가 작을 때만 믿을 수 있습니다. $\alpha$ 를 크게 잡으면 실제 손실은 오히려 늘 수 있습니다. 이 이야기는 [step size](map.html?s=sl&n=gd-step-size)에서 이어집니다.

### 알고리즘과 멈추는 기준

1. 시작점 $\mathbf{w}_0$ 을 정한다.
2. 지금 자리의 gradient $g(\mathbf{w}_t)$ 를 계산한다.
3. $\mathbf{w}_{t+1} \leftarrow \mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$ 로 옮긴다.
4. 멈추는 기준을 만족할 때까지 2와 3을 되풀이한다.

멈추는 기준은 작은 양수 $\epsilon$ 을 정해 두고 다음 가운데 하나를 씁니다.

| 기준 | 식 | 뜻 |
|---|---|---|
| gradient가 작다 | $\lVert g(\mathbf{w}_t) \rVert_2 \le \epsilon$ | 비탈이 거의 평평하다 |
| 손실이 거의 그대로다 | $\lvert \ell(\mathbf{w}_{t+1}) - \ell(\mathbf{w}_t) \rvert \le \epsilon$ | 더 가도 얻는 것이 없다 |
| 자리가 거의 그대로다 | $\lVert \mathbf{w}_{t+1} - \mathbf{w}_t \rVert_2 \le \epsilon$ | 한 걸음이 아주 짧다 |

갱신식에서 $\mathbf{w}_{t+1} - \mathbf{w}_t = -\alpha\, g(\mathbf{w}_t)$ 이므로 첫째 기준과 셋째 기준은 $\alpha$ 배만큼만 다른 같은 종류의 기준입니다.

## 흔한 오해

<div class="cal trap">

**갱신식은 $\mathbf{w}_t + \alpha\, g(\mathbf{w}_t)$ 다**

더하면 gradient 방향으로 올라갑니다. 근사식에 $\mathbf{s} = +\alpha\, g(\mathbf{w}_t)$ 를 넣으면 $\ell(\mathbf{w}_t) + \alpha \lVert g(\mathbf{w}_t) \rVert_2^2$ 가 되어 손실이 커집니다. 줄이려면 빼야 합니다.

</div>

<div class="cal trap">

**gradient의 반대 방향이기만 하면 얼마나 멀리 가든 손실이 줄어든다**

줄어든다는 보장은 1차 근사가 맞는 범위 안에서만 섭니다. 너무 멀리 가면 골짜기 건너편의 더 높은 곳에 닿을 수 있습니다.

</div>

## 확인 질문

<div class="cal q">

$\ell(\mathbf{w}) = w_1^2 + 2w_2^2$ 이고 시작점이 $\mathbf{w}_0 = (2, 1)^T$, step size가 $\alpha = 0.1$ 입니다. gradient를 구해 한 걸음 옮긴 $\mathbf{w}_1$ 을 계산하세요. 1차 근사가 예측한 손실 $\ell(\mathbf{w}_0) - \alpha \lVert g(\mathbf{w}_0) \rVert_2^2$ 과 실제 손실 $\ell(\mathbf{w}_1)$ 을 견줘 보고 둘이 다른 이유를 한 문장으로 적어 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

gradient는 $g(\mathbf{w}) = (2w_1, 4w_2)^T$ 이고 시작점에서 $g(\mathbf{w}_0) = (4, 4)^T$ 입니다.

$$
\begin{aligned}
\mathbf{w}_1 &= (2, 1)^T - 0.1 \cdot (4, 4)^T \\
&= (1.6, 0.6)^T
\end{aligned}
$$

시작점의 손실은 $\ell(\mathbf{w}_0) = 4 + 2 = 6$ 입니다. $\lVert g(\mathbf{w}_0) \rVert_2^2 = 16 + 16 = 32$ 이므로 1차 근사의 예측은 $6 - 0.1 \cdot 32 = 2.8$ 입니다.

실제 손실은 $\ell(\mathbf{w}_1) = 1.6^2 + 2 \cdot 0.6^2 = 2.56 + 0.72 = 3.28$ 입니다.

손실은 6에서 3.28로 줄었지만 예측한 2.8까지는 가지 못했습니다. 1차 근사는 비탈이 직선처럼 계속 내려간다고 봅니다. 실제 함수는 휘어 있어서 옮긴 거리가 길수록 근사와 실제의 차이가 벌어집니다.

</details>
