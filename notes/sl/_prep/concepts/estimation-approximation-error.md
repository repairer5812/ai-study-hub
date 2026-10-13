---
title: excess error를 두 오차로 나눈다
en: Estimation and approximation error
parent: erm
order: 50
summary: 학습으로 얻은 함수가 가장 좋은 함수보다 얼마나 못한지를 두 항의 합으로 씁니다. 표본으로 추정해서 생기는 estimation error와 가설 집합으로 좁혀서 생기는 approximation error입니다.
signal: emph
related: []
---

## 왜 필요한가

학습이 끝나면 함수 $\hat{h}^*_{\mathcal{H}}$ 하나를 손에 쥡니다. 이 함수가 기대만큼 좋지 않을 때 무엇을 고쳐야 할까요. 데이터를 더 모아야 할 수도 있고 모형을 바꿔야 할 수도 있습니다. 둘은 전혀 다른 처방이므로 오차가 어디서 왔는지부터 갈라야 합니다.

이상적인 문제를 ERM으로 바꾸면서 두 가지를 바꿨습니다. 기댓값을 표본평균으로 바꿨고 모든 함수를 가설 집합으로 좁혔습니다. 오차도 정확히 그 두 군데에서 생깁니다. 이 노드는 그것을 식 한 줄로 적습니다.

## 정의와 수식

**세 함수**

비교할 함수가 셋입니다. 어디서 찾았는지와 무엇을 기준으로 찾았는지가 다릅니다.

| 함수 | 어디서 찾나 | 무엇을 최소화하나 | 그 함수의 true risk |
|---|---|---|---|
| $h^*$ | 모든 함수 | true risk | $R^*$ |
| $h^*_{\mathcal{H}}$ | 가설 집합 $\mathcal{H}$ | true risk | $R^*_{\mathcal{H}}$ |
| $\hat{h}^*_{\mathcal{H}}$ | 가설 집합 $\mathcal{H}$ | empirical risk | $R(\hat{h}^*_{\mathcal{H}})$ |

식으로 쓰면 다음과 같습니다.

$$
R^* = \min_{h} R(h), \qquad R^*_{\mathcal{H}} = \min_{h \in \mathcal{H}} R(h)
$$

$R^*$ 의 최소화 범위는 모든 함수입니다. 셋 가운데 실제로 구할 수 있는 함수는 모자가 붙은 마지막 하나뿐입니다. 나머지 둘은 true risk를 알아야 찾을 수 있습니다.

세 값에는 순서가 있습니다.

$$
R^* \le R^*_{\mathcal{H}} \le R(\hat{h}^*_{\mathcal{H}})
$$

왼쪽 부등호는 $\mathcal{H}$ 가 모든 함수의 부분집합이어서 성립합니다. 좁은 곳에서 찾은 최솟값이 넓은 곳에서 찾은 최솟값보다 작을 수 없습니다. 오른쪽 부등호는 $\hat{h}^*_{\mathcal{H}}$ 가 $\mathcal{H}$ 의 원소여서 성립합니다. $\mathcal{H}$ 안의 어떤 함수도 $\mathcal{H}$ 안의 최솟값보다 작은 true risk를 가질 수 없습니다.

**분해**

얻은 함수의 true risk가 가능한 최솟값보다 얼마나 큰지를 excess error라고 부릅니다. 가운데 값 $R^*_{\mathcal{H}}$ 를 빼고 더하면 둘로 나뉩니다.

$$
\begin{aligned}
&R(\hat{h}^*_{\mathcal{H}}) - R^* \\
&= R(\hat{h}^*_{\mathcal{H}}) - R^*_{\mathcal{H}} + R^*_{\mathcal{H}} - R^* \\
&= \underbrace{R(\hat{h}^*_{\mathcal{H}}) - R^*_{\mathcal{H}}}_{\text{estimation error}} \\
&\quad + \underbrace{R^*_{\mathcal{H}} - R^*}_{\text{approximation error}}
\end{aligned}
$$

1. 첫째 등호: 같은 값 $R^*_{\mathcal{H}}$ 를 한 번 빼고 한 번 더했습니다. 식의 값은 그대로입니다.
2. 둘째 등호: 앞의 두 항과 뒤의 두 항을 따로 묶어 이름을 붙였습니다. 식이 길어 두 줄에 나눠 적었습니다.

위의 순서 때문에 두 항은 모두 0 이상입니다. 이 식은 어떤 가정도 쓰지 않은 항등식입니다. 같은 값을 빼고 더했을 뿐입니다.

**두 이름**

| | estimation error | approximation error |
|---|---|---|
| 식 | $R(\hat{h}^*_{\mathcal{H}}) - R^*_{\mathcal{H}}$ | $R^*_{\mathcal{H}} - R^*$ |
| 다른 이름 | sample error | |
| 무엇과 무엇의 차이 | $\mathcal{H}$ 안에서 데이터로 찾은 함수와 $\mathcal{H}$ 안의 가장 좋은 함수 | $\mathcal{H}$ 안의 가장 좋은 함수와 전체에서 가장 좋은 함수 |
| 왜 생기나 | 기댓값을 모르고 표본으로 추정해서 | 모든 함수가 아니라 $\mathcal{H}$ 안에서만 찾아서 |
| 무엇에 달려 있나 | 뽑힌 데이터 $D$, 표본 수 $n$, $\mathcal{H}$ | $\mathcal{H}$ 와 $P_{XY}$. 데이터와는 무관하다 |
| 우리말 | 추정의 오차 | 어림의 오차 |

두 오차를 가르는 것은 가운데 함수 $h^*_{\mathcal{H}}$ 입니다. estimation error는 $\mathcal{H}$ 안에서 벌어지는 일이고 approximation error는 $\mathcal{H}$ 의 경계에서 벌어지는 일입니다.

**세 점 그림**

모든 함수의 공간을 큰 타원으로, $\mathcal{H}$ 를 그 안의 작은 타원으로 그립니다. $h^*$ 는 대개 작은 타원 밖에 있습니다. $h^*_{\mathcal{H}}$ 와 $\hat{h}^*_{\mathcal{H}}$ 는 작은 타원 안에 있습니다. 세 점을 이으면 선분마다 이름이 붙습니다.

| 잇는 두 점 | 선분의 이름 |
|---|---|
| $\hat{h}^*_{\mathcal{H}}$ 와 $h^*_{\mathcal{H}}$ | estimation error |
| $h^*_{\mathcal{H}}$ 와 $h^*$ | approximation error |
| $\hat{h}^*_{\mathcal{H}}$ 와 $h^*$ | excess error |

그림에서 선분의 길이는 두 함수의 true risk의 차이를 뜻합니다. 함수 사이의 거리가 아닙니다.

**수로 확인하기**

분포를 안다고 가정한 작은 문제로 세 값을 직접 계산합니다. 입력과 레이블이 모두 0 또는 1이고 손실은 zero-one loss입니다. 결합 확률과 함수 네 개의 true risk는 다음과 같습니다.

| | $y = 0$ | $y = 1$ |
|---|---|---|
| $x = 0$ | 0.4 | 0.1 |
| $x = 1$ | 0.2 | 0.3 |

| 함수 | $h_a(x) = 0$ | $h_b(x) = 1$ | $h_c(x) = x$ | $h_d(x) = 1 - x$ |
|---|---|---|---|---|
| true risk | 0.4 | 0.6 | 0.3 | 0.7 |

전체에서 가장 좋은 함수는 $h_c$ 이고 $R^* = 0.3$ 입니다. 가설 집합을 상수 함수 둘 $\mathcal{H} = \{h_a, h_b\}$ 로 잡으면 $R^*_{\mathcal{H}} = 0.4$ 입니다. 이제 표본 세 개 $D = \{(0, 1), (1, 1), (0, 0)\}$ 이 뽑혔다고 합시다. $h_a$ 는 둘을 틀리고 $h_b$ 는 하나를 틀리므로 ERM은 $h_b$ 를 고릅니다.

| | 계산 | 값 |
|---|---|---|
| estimation error | $R(h_b) - R^*_{\mathcal{H}} = 0.6 - 0.4$ | 0.2 |
| approximation error | $R^*_{\mathcal{H}} - R^* = 0.4 - 0.3$ | 0.1 |
| excess error | $R(h_b) - R^* = 0.6 - 0.3$ | 0.3 |

실제 문제에서는 이 계산을 할 수 없습니다. true risk를 모르고 모든 함수를 다룰 수도 없기 때문입니다. 분해는 값을 구하는 도구가 아니라 오차의 출처를 가려 생각하게 해 주는 틀입니다.

**조건이 바뀌면 어느 항이 바뀌나**

| 조건 | estimation error | approximation error |
|---|---|---|
| $h^*$ 가 $\mathcal{H}$ 안에 있다 | 남는다 | 0 |
| 표본이 한없이 많다 | 0으로 간다 | 그대로 |
| $\mathcal{H}$ 를 모든 함수로 잡는다 | 커진다. 외운 함수가 후보에 든다 | 0 |

두 항을 움직이는 손잡이가 서로 다르다는 것이 [다음 노드](map.html?s=sl&n=complexity-tradeoff)의 주제입니다.

<div class="cal key">

**네 가지 차이를 식으로 구별합니다**

| 이름 | 식 | 한마디로 |
|---|---|---|
| generalization error | $\mathcal{L}(h; D) - R(h)$ | 한 함수의 두 risk의 차이 |
| estimation error | $R(\hat{h}^*_{\mathcal{H}}) - R^*_{\mathcal{H}}$ | 찾은 함수와 $\mathcal{H}$ 의 최선 |
| approximation error | $R^*_{\mathcal{H}} - R^*$ | $\mathcal{H}$ 의 최선과 전체의 최선 |
| excess error | $R(\hat{h}^*_{\mathcal{H}}) - R^*$ | 찾은 함수와 전체의 최선 |

empirical risk가 들어가는 것은 첫째 하나뿐입니다. 나머지 셋은 true risk끼리 뺀 값입니다.

</div>

## 흔한 오해

<div class="cal trap">

**분해식의 값은 0이다**

0은 바라는 목표이지 등식의 일부가 아닙니다. 자료에 따라 식 끝에 0이 붙어 있는 것은 excess error를 0으로 만들고 싶다는 뜻입니다. 두 항이 모두 0 이상이므로 excess error가 0이 되려면 두 항이 따로따로 0이어야 합니다.

</div>

<div class="cal trap">

**estimation error는 empirical risk와 true risk의 차이다**

그것은 generalization error입니다. estimation error는 두 함수의 true risk를 뺀 값이고 식 안에 empirical risk가 없습니다. empirical risk는 $\hat{h}^*_{\mathcal{H}}$ 를 고르는 데만 쓰였습니다.

</div>

## 확인 질문

<div class="cal q">

본문의 작은 문제를 이어서 풉니다. 가설 집합은 그대로 $\mathcal{H} = \{h_a, h_b\}$ 입니다.

- (가) 이번에는 $D' = \{(0, 0), (1, 0), (1, 1), (0, 0)\}$ 이 뽑혔습니다. ERM이 고르는 함수와 세 오차를 구하세요.
- (나) 본문의 $D$ 와 견주어 값이 달라진 항과 그대로인 항을 가르고 이유를 적으세요.
- (다) 가설 집합을 $\{h_a, h_b, h_c\}$ 로 넓히면 approximation error는 얼마가 됩니까. estimation error도 0이 된다고 말할 수 있습니까.

</div>

<details class="solve">
<summary>답 보기</summary>

(가) $h_a$ 는 $y = 1$ 인 표본 하나만 틀려서 empirical risk가 $\frac{1}{4}$ 입니다. $h_b$ 는 $y = 0$ 인 표본 셋을 틀려서 $\frac{3}{4}$ 입니다. ERM은 $h_a$ 를 고릅니다.

| | 계산 | 값 |
|---|---|---|
| estimation error | $R(h_a) - R^*_{\mathcal{H}} = 0.4 - 0.4$ | 0 |
| approximation error | $R^*_{\mathcal{H}} - R^* = 0.4 - 0.3$ | 0.1 |
| excess error | $R(h_a) - R^* = 0.4 - 0.3$ | 0.1 |

(나) estimation error가 0.2에서 0으로 바뀌었습니다. 어떤 데이터가 뽑혔느냐에 달린 값이기 때문입니다. approximation error는 0.1 그대로입니다. 식 안에 데이터가 없습니다.

(다) $h_c$ 가 전체에서 가장 좋은 함수이므로 $R^*_{\mathcal{H}} = R^* = 0.3$ 이 되어 approximation error는 0입니다. estimation error는 0이라고 말할 수 없습니다. 본문의 $D$ 에서는 $h_b$ 와 $h_c$ 가 똑같이 하나씩 틀려서 ERM이 $h_b$ 를 내놓을 수 있습니다. 그러면 estimation error는 $0.6 - 0.3 = 0.3$ 으로 오히려 커집니다. 가설 집합을 넓히면 approximation error는 줄지만 estimation error는 늘 수 있습니다.

</details>
