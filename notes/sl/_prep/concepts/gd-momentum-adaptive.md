---
title: momentum, 적응형 방법, mini-batch
en: Momentum, adaptive methods, mini-batch SGD
parent: gradient-descent
order: 40
summary: 고정된 step size 하나를 모든 반복과 모든 매개변수에 쓰는 약점을 고친 네 방법과, 데이터의 일부만으로 gradient를 구해 계산을 줄이는 mini-batch를 정리합니다.
signal: none
related: []
---

## 왜 필요한가

기본 경사하강법에는 불편한 점이 둘 있습니다.

첫째는 [step size](map.html?s=sl&n=gd-step-size)입니다. 하나의 $\alpha$ 를 처음부터 끝까지, 모든 매개변수에 똑같이 씁니다. 어떤 방향은 비탈이 가팔라 진동하고 어떤 방향은 완만해 느린데도 같은 걸음으로 갑니다. 아래의 네 방법은 "고정된 step size를 모든 반복과 모든 성분에 쓰지 않는다"는 한 가지 생각을 서로 다르게 구현한 것입니다.

둘째는 계산량입니다. gradient 한 번을 구하려면 데이터 전체를 훑어야 합니다. mini-batch가 이 문제를 다룹니다.

## 정의와 수식

$g_t = g(\mathbf{w}_t)$ 로 줄여 씁니다. 벡터끼리의 곱 $\odot$, 제곱, 제곱근, 나눗셈은 모두 성분별로 계산합니다. 분모의 $\epsilon$ 은 0으로 나누는 일을 막는 아주 작은 수이고 멈추는 기준의 $\epsilon$ 과는 다른 것입니다.

### Momentum

$$
\begin{aligned}
\mathbf{s}_t &\leftarrow \beta\,\mathbf{s}_{t-1} + \alpha\, g_t \\
\mathbf{w}_{t+1} &\leftarrow \mathbf{w}_t - \mathbf{s}_t
\end{aligned}
$$

직전에 움직인 방향 $\mathbf{s}_{t-1}$ 을 $\beta$ 의 비율로 남겨 이번 이동에 보탭니다. 관성을 흉내 낸 것입니다. 걸음마다 방향이 뒤집히는 성분은 서로 지워져 진동이 줄고 같은 방향이 이어지는 성분은 쌓여서 빨라집니다. $\beta = 0$ 이면 기본 경사하강법과 같습니다.

### AdaGrad

$$
\begin{aligned}
\mathbf{s}_t &\leftarrow \mathbf{s}_{t-1} + g_t \odot g_t \\
\mathbf{w}_{t+1} &\leftarrow \mathbf{w}_t - \alpha\,\frac{g_t}{\sqrt{\mathbf{s}_t + \epsilon}}
\end{aligned}
$$

gradient의 제곱을 성분마다 계속 더해 둡니다. 그 합이 큰 성분은 작게 움직이고 합이 작은 성분은 크게 움직입니다. 매개변수마다 다른 step size를 쓰는 셈입니다. 약점은 $\mathbf{s}_t$ 가 더해지기만 한다는 데 있습니다. 반복이 늘수록 실제로 움직이는 폭 $\frac{\alpha}{\sqrt{\mathbf{s}_t + \epsilon}}$ 이 계속 줄어서 나중에는 거의 움직이지 못합니다.

### RMSProp

$$
\begin{aligned}
E[g^2]_t &\leftarrow 0.9\,E[g^2]_{t-1} + 0.1\,g_t^2 \\
\mathbf{w}_{t+1} &\leftarrow \mathbf{w}_t - \alpha\,\frac{g_t}{\sqrt{E[g^2]_t + \epsilon}}
\end{aligned}
$$

누적합 대신 평균을 씁니다. $E[g^2]_t$ 는 기댓값이 아니라 gradient 제곱의 지수 가중 평균을 적는 이름입니다. 새 값에 0.1, 지금까지의 평균에 0.9를 곱해 섞으므로 오래된 gradient는 차츰 잊힙니다. 분모가 끝없이 커지지 않아서 AdaGrad처럼 움직임이 멎지 않습니다.

### Adam

$$
\begin{aligned}
\mathbf{m}_t &\leftarrow \beta_1\,\mathbf{m}_{t-1} + (1-\beta_1)\,g_t \\
\mathbf{v}_t &\leftarrow \beta_2\,\mathbf{v}_{t-1} + (1-\beta_2)\,g_t^2 \\
\hat{\mathbf{m}}_t &= \frac{\mathbf{m}_t}{1-\beta_1^t}, \qquad \hat{\mathbf{v}}_t = \frac{\mathbf{v}_t}{1-\beta_2^t} \\
\mathbf{w}_{t+1} &\leftarrow \mathbf{w}_t - \alpha\,\frac{\hat{\mathbf{m}}_t}{\sqrt{\hat{\mathbf{v}}_t} + \epsilon}
\end{aligned}
$$

둘을 합친 방법입니다. $\mathbf{m}_t$ 는 gradient의 지수 가중 평균이라 momentum과 닮았고 $\mathbf{v}_t$ 는 gradient 제곱의 지수 가중 평균이라 RMSProp과 닮았습니다. 셋째 줄은 초반 보정입니다. 두 평균이 0에서 출발하기 때문에 처음 몇 걸음은 값이 0 쪽으로 치우치는데 $1 - \beta^t$ 로 나눠 그 치우침을 바로잡습니다. 여기의 모자는 추정값이 아니라 보정한 값이라는 표시입니다.

### 네 방법을 한 표로

| 방법 | 기억해 두는 것 | 고치려는 문제 | 눈여겨볼 점 |
|---|---|---|---|
| Momentum | 직전의 이동 방향 | 진동과 느린 전진 | $\beta = 0$ 이면 기본 경사하강법 |
| AdaGrad | gradient 제곱의 누적합 | 성분마다 다른 step size | 움직이는 폭이 계속 줄어든다 |
| RMSProp | gradient 제곱의 지수 가중 평균 | AdaGrad의 폭이 줄어드는 문제 | 오래된 값을 잊는다 |
| Adam | gradient의 평균과 제곱의 평균 | 앞의 두 생각을 합친다 | 초반 값을 보정한다 |

### Mini-batch

목적함수는 표본별 손실을 모은 것이라서 gradient도 표본별 gradient를 모은 것입니다. 한 번 옮길 때마다 $n$ 개를 모두 계산해야 하므로 데이터가 크면 느리고 메모리도 많이 듭니다.

mini-batch stochastic gradient descent는 표본의 일부 $B$ 만 뽑아 gradient를 구합니다.

$$
g_B(\mathbf{w}_t) = \frac{1}{\lvert B \rvert} \sum_{i \in B} \frac{\partial \ell_i(\mathbf{w}_t)}{\partial \mathbf{w}}
$$

한 번의 계산이 가벼워져 같은 시간에 매개변수를 훨씬 자주 고칩니다. 대신 이 gradient는 전체 gradient의 근사라서 걸음마다 방향이 조금씩 흔들립니다. 위의 네 방법은 $g_t$ 자리에 이 $g_B$ 를 넣어 그대로 씁니다.

## 흔한 오해

<div class="cal trap">

**AdaGrad에서 반복할수록 줄어드는 것은 분모다**

분모 $\sqrt{\mathbf{s}_t + \epsilon}$ 은 커집니다. 줄어드는 것은 분모로 나눈 결과인 움직이는 폭입니다. $\mathbf{s}_t$ 는 제곱을 더하기만 하므로 작아질 수 없습니다.

</div>

<div class="cal trap">

**mini-batch를 쓰면 gradient가 더 정확해진다**

일부 표본만 쓰므로 전체 gradient보다 덜 정확합니다. 얻는 것은 정확도가 아니라 속도입니다. 한 번의 계산이 싸서 자주 고칠 수 있습니다.

</div>

## 확인 질문

<div class="cal q">

매개변수가 하나이고 gradient가 매번 $g_t = 4$ 로 같다고 합시다. $\alpha = 1$, $\epsilon = 0$ 으로 두고 AdaGrad는 $s_0 = 0$, RMSProp은 $E[g^2]_0 = 0$ 에서 시작합니다. 이동 폭은 $\alpha\,g_t$ 를 분모로 나눈 값입니다. 두 방법에서 $t = 1$ 과 $t = 2$ 의 이동 폭을 계산하세요. 반복이 아주 많아지면 각 방법의 이동 폭은 어디로 갑니까.

</div>

<details class="solve">
<summary>답 보기</summary>

AdaGrad: $s_1 = 16$, $s_2 = 32$ 입니다. 이동 폭은 $\frac{4}{\sqrt{16}} = 1$, $\frac{4}{\sqrt{32}} \approx 0.707$ 입니다. 일반적으로 $s_t = 16t$ 이므로 이동 폭은 $\frac{1}{\sqrt{t}}$ 이고 0으로 갑니다.

RMSProp: $E[g^2]_1 = 0.1 \cdot 16 = 1.6$, $E[g^2]_2 = 0.9 \cdot 1.6 + 1.6 = 3.04$ 입니다. 이동 폭은 $\frac{4}{\sqrt{1.6}} \approx 3.16$, $\frac{4}{\sqrt{3.04}} \approx 2.29$ 입니다. 평균은 $16$ 으로 다가가므로 이동 폭은 $\frac{4}{\sqrt{16}} = 1$ 로 가고 0이 되지 않습니다.

gradient가 변하지 않는데도 AdaGrad는 걸음이 계속 짧아지고 RMSProp은 일정한 폭을 지킵니다. RMSProp의 첫 걸음이 3.16으로 큰 것은 평균이 0에서 출발해 아직 작기 때문입니다. Adam의 초반 보정이 바로 이 치우침을 고칩니다.

</details>
