---
title: 가설 집합을 키우면 한쪽이 줄고 한쪽이 는다
en: Estimation-approximation trade-off
parent: erm
order: 55
summary: 가설 집합을 키우면 approximation error는 줄고 estimation error는 늡니다. 표본을 늘리면 estimation error만 줍니다. 두 손잡이가 움직이는 항이 다르다는 것이 모형 선택의 출발점입니다.
signal: emph
related: [polynomial-regression]
---

## 왜 필요한가

앞 노드에서 excess error를 두 항으로 나눴습니다. 나누기만 해서는 쓸모가 없습니다. 우리가 실제로 돌릴 수 있는 손잡이는 둘입니다. 가설 집합 $\mathcal{H}$ 의 크기와 표본 수 $n$ 입니다. 손잡이를 돌렸을 때 어느 항이 어느 쪽으로 움직이는지 알아야 처방을 고를 수 있습니다.

결론을 먼저 적으면 이렇습니다. $\mathcal{H}$ 는 두 항을 반대쪽으로 움직입니다. $n$ 은 한 항만 움직입니다.

## 정의와 수식

기준이 되는 식은 앞 노드의 분해입니다. $R^*$ 를 오른쪽으로 넘겨 적습니다.

$$
\begin{aligned}
R(\hat{h}^*_{\mathcal{H}}) &= R^* \\
&\quad + \underbrace{R^*_{\mathcal{H}} - R^*}_{\text{approximation error}} \\
&\quad + \underbrace{R(\hat{h}^*_{\mathcal{H}}) - R^*_{\mathcal{H}}}_{\text{estimation error}}
\end{aligned}
$$

$R^*$ 는 분포가 정하는 값입니다. $\mathcal{H}$ 와도 $n$ 과도 무관합니다. 손잡이로 움직일 수 있는 것은 뒤의 두 항입니다.

**손잡이와 방향**

| 돌리는 손잡이 | approximation error | estimation error | excess error |
|---|---|---|---|
| $\mathcal{H}$ 를 키운다. $n$ 은 그대로 | 준다 | 는다 | 알 수 없다 |
| $\mathcal{H}$ 를 줄인다. $n$ 은 그대로 | 는다 | 준다 | 알 수 없다 |
| $n$ 을 늘린다. $\mathcal{H}$ 는 그대로 | 그대로 | 준다. $n \to \infty$ 이면 0으로 간다 | 준다 |
| $\mathcal{H}$ 를 키우면서 $n$ 도 크게 늘린다 | 준다 | 느는 것을 표본이 누른다 | 둘 다 낮출 수 있다 |

$\mathcal{H}$ 를 키운다는 것은 표현할 수 있는 함수를 늘린다는 뜻입니다. 선형 모형을 신경망으로 바꾸는 것, 신경망의 층과 노드를 늘리는 것, 다항식의 차수를 올리는 것이 모두 여기에 듭니다.

**왜 그 방향인가**

- $\mathcal{H}$ 를 키우면 approximation error가 주는 이유: 후보가 늘면 $\mathcal{H}$ 안의 최선 $R^*_{\mathcal{H}}$ 가 $R^*$ 에 가까워집니다. 후보를 더했는데 최솟값이 커질 수는 없으므로 이 항은 줄거나 그대로입니다.
- $\mathcal{H}$ 를 키우면 estimation error가 느는 이유: 후보가 많을수록 학습점에서는 맞고 그 밖에서는 어긋나는 함수가 많이 섞여 있습니다. 같은 표본으로는 그런 함수와 좋은 함수를 가려내기 어렵습니다. 과적합이 쉬워집니다.
- $n$ 을 늘려도 approximation error가 그대로인 이유: 식 $R^*_{\mathcal{H}} - R^*$ 안에 데이터가 없습니다. 표본을 아무리 모아도 $\mathcal{H}$ 가 담지 못하는 함수는 여전히 못 담습니다.
- $n$ 을 늘리면 estimation error가 주는 이유: 표본이 많을수록 $\mathcal{H}$ 안 함수들의 empirical risk가 true risk에 가까워집니다. 그러면 empirical risk로 고른 함수가 true risk로 고른 함수에 가까워집니다. 얼마나 빨리 0으로 가는지는 $\mathcal{H}$ 의 크기에 달려 있습니다. 큰 $\mathcal{H}$ 일수록 표본이 많이 필요합니다.

**저울질**

$\mathcal{H}$ 를 키우는 것도 줄이는 것도 답이 아닙니다. 키우면 estimation error가 튀어 오르고 줄이면 approximation error가 남습니다. 한쪽을 낮춘 만큼 다른 쪽이 오르므로 합이 어느 쪽으로 갈지는 해 봐야 압니다. 복잡도를 유지한 채 estimation error를 낮추는 길은 좋은 표본을 많이 모으는 것입니다.

표본이 적던 시절에는 approximation error를 받아들이고 선형 모형 같은 작은 $\mathcal{H}$ 를 썼습니다. 지금의 딥러닝은 반대쪽에서 접근합니다. 큰 $\mathcal{H}$ 로 approximation error를 낮추고 큰 데이터로 estimation error가 오르지 못하게 합니다. 표의 마지막 줄입니다.

**복잡도 그래프**

가로축에 모형의 복잡도($\mathcal{H}$ 의 크기)를, 세로축에 예측 오차를 둡니다. 표본 수는 고정입니다. 곡선이 둘 그려집니다.

| | empirical risk | true risk |
|---|---|---|
| 모양 | 오른쪽으로 갈수록 계속 내려간다 | 내려가다가 다시 올라간다. U자 모양 |
| 왼쪽 끝(단순한 모형) | 크다 | 크다. underfitting |
| 가운데 | 중간 | 가장 작다. 여기가 가장 좋은 모형 |
| 오른쪽 끝(복잡한 모형) | 0에 가깝다 | 크다. overfitting |

오른쪽 구간에서는 두 곡선이 반대로 움직입니다. 이 구간에서 empirical risk는 더 이상 true risk의 길잡이가 아닙니다.

true risk가 U자인 이유는 위의 식이 설명합니다. 복잡도를 올리면 approximation error는 내려가고 estimation error는 올라갑니다. 내려가는 곡선과 올라가는 곡선을 더하면 가운데가 꺼진 곡선이 됩니다. 왼쪽에서는 approximation error가 크고 오른쪽에서는 estimation error가 큽니다. 두 곡선 사이의 세로 간격은 generalization error의 크기입니다.

표본 수를 늘리면 그림이 달라집니다. estimation error의 곡선이 전체적으로 낮아지므로 true risk의 바닥이 오른쪽으로 옮겨 갑니다. 표본이 많을수록 더 복잡한 모형이 가장 좋은 모형이 됩니다.

**증상으로 가려내기**

true risk는 볼 수 없지만 학습에 쓰지 않은 데이터의 오차로 대신 볼 수 있습니다.

| training error | 새 데이터의 오차 | 진단 | 큰 쪽 | 처방 |
|---|---|---|---|---|
| 크다 | 크다 | underfitting | approximation error | $\mathcal{H}$ 를 키운다 |
| 작다 | 크다 | overfitting | estimation error | 표본을 늘린다. $\mathcal{H}$ 를 줄인다. 정규화를 건다 |

모형이 기대에 못 미칠 때 크기부터 키우면 안 되는 이유가 이 표에 있습니다. 둘째 줄의 상황이라면 키울수록 나빠집니다.

<div class="cal key">

**$\mathcal{H}$ 는 두 항을 맞바꾸고 $n$ 은 한 항만 낮춥니다**

approximation error는 $\mathcal{H}$ 만의 일입니다. 표본으로는 건드릴 수 없습니다. estimation error는 $\mathcal{H}$ 와 $n$ 둘 다의 일입니다. 이 두 문장으로 위의 표를 모두 다시 쓸 수 있습니다.

</div>

## 흔한 오해

<div class="cal trap">

**표본을 늘리면 approximation error도 0으로 간다**

가지 않습니다. 표본을 늘려서 0으로 가는 것은 estimation error입니다. approximation error는 가설 집합이 좋은 함수를 담고 있느냐의 문제라서 데이터와 무관합니다. 직선으로 곡선을 맞추려 한다면 표본이 백만 개여도 직선의 한계는 그대로입니다.

</div>

<div class="cal trap">

**가설 집합을 키우면 두 오차가 함께 줄어든다**

approximation error만 줍니다. 같은 표본 수에서는 estimation error가 늡니다. 그래서 excess error가 줄지 늘지는 정해져 있지 않습니다. empirical risk가 계속 내려간다는 사실을 excess error가 내려간다는 뜻으로 읽으면 안 됩니다.

</div>

## 확인 질문

<div class="cal q">

아래 네 가지 변화에서 approximation error와 estimation error가 각각 어느 쪽으로 움직이는지 적고 excess error의 방향을 말할 수 있는지 판단해 보세요.

- (가) 표본 수는 그대로 두고 선형 모형을 깊은 신경망으로 바꾼다.
- (나) 같은 신경망을 쓰고 표본을 10배로 늘린다.
- (다) 표본 수는 그대로 두고 9차 다항식을 2차 다항식으로 바꾼다.
- (라) 정규화를 세게 건다.

</div>

<details class="solve">
<summary>답 보기</summary>

| | approximation error | estimation error | excess error |
|---|---|---|---|
| (가) | 준다 | 는다 | 말할 수 없다 |
| (나) | 그대로 | 준다 | 준다 |
| (다) | 는다 | 준다 | 말할 수 없다 |
| (라) | 늘 수 있다 | 준다 | 말할 수 없다 |

(라)의 정규화는 매개변수가 커지지 못하게 눌러서 고를 수 있는 함수를 사실상 줄입니다. $\mathcal{H}$ 를 줄이는 것과 같은 방향으로 읽으면 됩니다. 방향을 말할 수 있는 것은 한 항만 움직이는 (나)뿐입니다.

</details>

<div class="cal q">

복잡도를 다섯 단계로 올리며 두 오차를 쟀더니 아래와 같았다고 합시다. 설명을 위해 지어낸 값입니다. 표본이 적을 때와 많을 때 각각 excess error를 계산하고 가장 좋은 복잡도를 고르세요. 두 답이 다른 이유를 한 문장으로 적어 보세요.

| 복잡도 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| approximation error | 0.30 | 0.15 | 0.06 | 0.02 | 0.00 |
| estimation error, 표본이 적을 때 | 0.01 | 0.03 | 0.08 | 0.20 | 0.45 |
| estimation error, 표본이 많을 때 | 0.00 | 0.01 | 0.02 | 0.05 | 0.12 |

</div>

<details class="solve">
<summary>답 보기</summary>

| 복잡도 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| excess error, 표본이 적을 때 | 0.31 | 0.18 | 0.14 | 0.22 | 0.45 |
| excess error, 표본이 많을 때 | 0.30 | 0.16 | 0.08 | 0.07 | 0.12 |

표본이 적을 때는 복잡도 3이, 많을 때는 복잡도 4가 가장 좋습니다. approximation error의 줄은 두 경우에 같습니다. 표본이 늘면 estimation error의 줄만 낮아지므로 복잡한 모형을 쓸 때 치르는 값이 싸지고 바닥이 오른쪽으로 옮겨 갑니다.

</details>
