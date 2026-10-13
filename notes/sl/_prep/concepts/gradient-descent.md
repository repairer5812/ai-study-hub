---
title: 경사하강법
en: Gradient descent
parent: risk-minimization
order: 60
summary: 닫힌 해가 없거나 계산이 무거울 때 쓰는 반복 알고리즘입니다. 지금 자리에서 gradient를 구해 그 반대 방향으로 조금 옮기는 일을 되풀이합니다.
signal: none
related: []
---

## 왜 필요한가

뿌리에서 말한 네 걸음의 마지막은 "푼다"였습니다. 선형회귀에서는 미분을 0으로 놓은 식이 $\mathbf{w}$ 에 대해 풀려서 답을 식으로 바로 썼습니다. 로지스틱 회귀에서는 [그 식이 풀리지 않습니다](map.html?s=sl&n=logreg-no-closed-form).

경사하강법(gradient descent)은 이런 때 쓰는 반복 알고리즘입니다. 답을 한 번에 적는 대신 아무 점에서나 시작해 손실이 줄어드는 쪽으로 조금씩 옮겨 갑니다. 필요한 조건은 목적함수가 연속이고 미분할 수 있다는 것입니다. 닫힌 해가 있더라도 그것을 계산하는 비용이 크면 이 방법을 씁니다.

낱말 둘을 먼저 정해 둡니다. 손실을 줄이도록 매개변수를 고쳐 가는 알고리즘을 통틀어 optimizer라고 부릅니다. gradient는 목적함수를 매개변수의 성분마다 편미분해 모은 벡터입니다.

$$
g(\mathbf{w}) = \frac{\partial \ell(\mathbf{w})}{\partial \mathbf{w}}
$$

gradient는 그 자리에서 함수가 가장 가파르게 커지는 방향을 가리킵니다. 길이가 길수록 비탈이 가파릅니다.

## 이 가지의 흐름

1. 1차 테일러 근사에서 [갱신식](map.html?s=sl&n=gd-update-rule) $\mathbf{w}_{t+1} \leftarrow \mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$ 를 얻습니다.
2. 멈춘 곳이 가장 낮은 곳인지는 함수가 [convex](map.html?s=sl&n=gd-convexity-convergence)인지에 달려 있습니다. 얼마나 빨리 가까워지는지도 봅니다.
3. [한 걸음의 크기](map.html?s=sl&n=gd-step-size) $\alpha$ 가 크면 발산하고 작으면 느립니다.
4. 고정된 $\alpha$ 의 약점을 고친 [방법 넷](map.html?s=sl&n=gd-momentum-adaptive)(momentum, AdaGrad, RMSProp, Adam)과 데이터의 일부만 쓰는 mini-batch를 봅니다.
5. [로지스틱 회귀의 gradient](map.html?s=sl&n=logreg-gradient)를 실제로 계산해 갱신식에 넣습니다.

<div class="cal key">

**이 가지에서 반드시 남겨야 할 한 문장**

갱신식의 부호는 빼기입니다. gradient는 손실이 커지는 방향이라서 손실을 줄이려면 그 반대로 갑니다.

</div>
