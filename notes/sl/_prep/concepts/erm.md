---
title: true risk와 empirical risk
en: True risk and empirical risk
parent: risk-minimization
order: 20
summary: 줄이고 싶은 것은 손실의 기댓값인 true risk인데 계산할 수 없습니다. 그래서 가설 집합으로 범위를 좁히고 기댓값을 표본평균으로 바꿔 풉니다.
signal: none
related: []
---

## 왜 필요한가

앞 가지에서 데이터, 가설 집합, 손실 함수를 정했습니다. 이제 "새 쌍에서도 잘 맞는 함수"라는 목표를 식으로 적을 수 있습니다. 손실의 기댓값인 true risk를 가장 작게 만드는 함수를 찾으면 됩니다.

$$
\begin{aligned}
h^* &= \arg\min_{h} R(h) \\
R(h) &= \mathbb{E}_{(\mathbf{x},y)\sim P_{XY}}\big[\ell(y, h(\mathbf{x}))\big]
\end{aligned}
$$

이 문제는 적을 수는 있어도 풀 수는 없습니다. 걸림돌이 둘입니다. $P_{XY}$ 를 몰라서 기댓값을 계산할 수 없습니다. 모든 함수를 후보로 두면 탐색할 수도 없습니다. 그래서 문제를 두 번 바꿉니다.

| | 이상적인 문제 | 바꾼 문제 | 바꾼 대가 |
|---|---|---|---|
| 어디서 찾나 | 모든 함수 | 가설 집합 $\mathcal{H}$ 안의 함수 | approximation error |
| 무엇으로 재나 | 기댓값(true risk) | 표본평균(empirical risk) | estimation error |

두 번 바꾼 결과가 실제로 푸는 문제인 empirical risk minimization(ERM)입니다.

$$
\hat{h}^*_{\mathcal{H}} = \arg\min_{h \in \mathcal{H}} \frac{1}{n}\sum_{i=1}^{n} \ell(y_i, h(\mathbf{x}_i))
$$

선형 모형이든 신경망이든 학습은 이 식의 꼴을 벗어나지 않습니다. 달라지는 것은 $\mathcal{H}$ 와 $\ell$ 입니다.

## 이 가지의 흐름

1. 이상적인 목표를 적습니다. true risk의 정의와 그것을 직접 최소화할 수 없는 이유입니다. [true risk](map.html?s=sl&n=true-risk)
2. 풀 수 있는 문제로 바꿉니다. 기댓값을 표본평균으로 바꾼 empirical risk와 그것을 최소화하는 ERM입니다. [empirical risk와 ERM](map.html?s=sl&n=empirical-risk)
3. 바꿔도 되는 근거를 댑니다. 고정된 함수의 empirical risk는 true risk의 불편 추정량입니다. [불편 추정량 증명](map.html?s=sl&n=empirical-risk-unbiased)
4. 그래도 남는 문제를 봅니다. 학습점에서만 맞는 함수는 empirical risk가 0이어도 true risk가 큽니다. [일반화와 과적합](map.html?s=sl&n=generalization)
5. 오차가 어디서 오는지 나눕니다. 얻은 함수와 가장 좋은 함수의 차이는 estimation error와 approximation error의 합입니다. [excess error의 분해](map.html?s=sl&n=estimation-approximation-error)
6. 손잡이 두 개를 돌려 봅니다. 가설 집합의 크기와 표본 수를 바꿀 때 두 오차가 어느 쪽으로 움직이는지 봅니다. [두 오차의 trade-off](map.html?s=sl&n=complexity-tradeoff)
7. estimation error의 크기를 식으로 재려는 이론의 이름을 알아 둡니다. [PAC learning과 VC dimension](map.html?s=sl&n=pac-vc-bound)
8. 가설 집합은 그대로 두고 데이터 쪽을 넓힙니다. 표본 하나가 아니라 그 주변에서 risk를 잽니다. [데이터 증강과 vicinal risk](map.html?s=sl&n=data-augmentation-vrm)

<div class="cal key">

**true risk는 목표이고 empirical risk는 수단입니다**

이 가지의 물음은 하나로 모입니다. 수단을 줄였을 때 목표도 함께 줄어드는가. 3번은 그렇다고 믿을 근거입니다. 4번은 그렇지 않을 수 있다는 경고입니다. 5번은 그 틈을 두 갈래로 나눠 이름을 붙입니다.

</div>
