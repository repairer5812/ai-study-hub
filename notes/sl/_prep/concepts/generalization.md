---
title: 일반화와 과적합
en: Generalization and overfitting
parent: erm
order: 40
summary: empirical risk가 작다고 true risk가 작은 것은 아닙니다. 학습점에서만 맞는 함수가 그 반례이고 가설 집합을 좁히는 것이 첫째 처방입니다.
signal: emph
related: [polynomial-regression]
---

## 왜 필요한가

ERM을 풀어 empirical risk가 가장 작은 함수를 얻었습니다. empirical risk를 믿어도 된다는 근거도 둘 있었습니다. 그러면 일은 끝난 것일까요. 그렇지 않습니다.

두 근거는 데이터를 보기 전에 정해 둔 함수에 대한 것이었습니다. ERM은 데이터를 본 뒤에 함수를 고릅니다. 고른 함수의 empirical risk는 작게 나오도록 골라진 값입니다. 그 값이 true risk를 대신해 준다는 보장이 사라집니다. 이 틈을 다루는 것이 일반화(generalization)입니다.

## 정의와 수식

**학습점에서만 맞는 함수**

가설 집합을 제한하지 않고 모든 함수 가운데서 empirical risk를 최소화한다고 합시다. 회귀 문제라면 이런 함수가 후보에 들어옵니다.

$$
h(x) = \begin{cases} y_i & \text{if } x = x_i \text{ for some } i \\ 100 & \text{otherwise} \end{cases}
$$

학습 데이터에 있던 입력이 들어오면 외워 둔 정답을 냅니다. 그 밖의 입력에는 무조건 100을 냅니다. 학습 입력이 서로 겹치지 않는다고 하면 두 risk는 다음과 같습니다.

| | 값 | 이유 |
|---|---|---|
| empirical risk $\mathcal{L}(h; D)$ | 0 | 모든 학습점에서 예측이 정답과 같다 |
| true risk $R(h)$ | 0보다 훨씬 크다 | 새 입력이 학습점과 정확히 겹치는 일은 거의 없다. 거의 언제나 100을 낸다 |

손실은 0보다 작을 수 없으므로 empirical risk 0은 가능한 최솟값입니다. ERM의 기준으로는 이 함수가 가장 좋은 답입니다. 실제로는 쓸모가 없습니다.

**점과 영역**

두 risk가 이렇게 벌어지는 이유는 보는 곳이 다르기 때문입니다. true risk는 $(\mathbf{x}, y)$ 가 놓일 수 있는 영역 전체에서 손실을 평균합니다. empirical risk는 그 영역 안에 찍힌 점 $n$ 개에서만 평균합니다. 점에서 손실이 작다는 사실은 점과 점 사이에 대해 아무것도 약속하지 않습니다. 가설 집합이 클수록 점에서는 맞추고 점 사이에서는 제멋대로인 함수가 많이 들어 있습니다.

**generalization error**

한 함수의 두 risk의 차이를 generalization error라고 부릅니다.

$$
\text{generalization error} = \mathcal{L}(h; D) - R(h)
$$

빼는 순서는 empirical risk에서 true risk를 빼는 쪽입니다. 그래서 부호를 이렇게 읽습니다.

| 상황 | 부호와 크기 |
|---|---|
| 데이터와 무관하게 정해 둔 함수 | 양수도 음수도 될 수 있다. 평균은 0이다 |
| 과적합한 함수 | 음수이고 절댓값이 크다 |
| 위의 외운 함수 | $0 - R(h)$ |

책에 따라 빼는 순서를 뒤집거나 절댓값을 씌우기도 합니다. 이 지도에서는 위의 순서를 씁니다.

관련된 말을 정리합니다.

| 말 | 뜻 |
|---|---|
| 일반화가 잘 된다 | 학습에 쓴 표본과 쓰지 않은 표본에서 성능이 비슷하다 |
| 과적합(overfitting) | 학습 데이터에서는 잘 맞고 새 데이터에서는 못 맞는다. empirical risk는 작고 true risk는 크다 |
| training error | 학습 데이터 위의 empirical risk |

**처방 셋**

1. 가설 집합을 좁힙니다. 모든 함수가 아니라 더 작은 $\mathcal{H}$ 안에서 최소화합니다. $\mathcal{H}$ 가 선형 모형이라면 위의 외운 함수는 후보에 없습니다.
2. 다른 조건이 같다면 단순한 모형을 고릅니다. Occam's razor라고 부르는 원칙입니다. 계수가 적은 모형처럼 단순한 가설이 더 잘 일반화하리라고 기대합니다.
3. 정규화를 겁니다. 가설 집합은 그대로 두고 매개변수가 지나치게 커지지 못하게 누르는 항을 손실에 더합니다. 선형회귀 가지의 [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)와 [lasso](map.html?s=sl&n=lasso-map-laplace-prior)가 이것입니다.

세 처방은 모두 학습점에만 매달리지 못하게 막는 방법입니다. 그렇다고 좁힐수록 좋은 것은 아닙니다. 지나치게 좁히면 좋은 함수까지 후보에서 빠집니다. 그 저울질은 [다음 노드](map.html?s=sl&n=estimation-approximation-error)가 식으로 적습니다. 차수를 올릴수록 과적합하는 구체적인 예는 [다항 회귀](map.html?s=sl&n=polynomial-regression)에 있습니다.

<div class="cal key">

**가정 하나가 달라졌을 뿐입니다**

고정된 함수에서는 empirical risk가 true risk를 대신합니다. 데이터를 보고 고른 함수에서는 그렇지 않을 수 있습니다. 과적합은 계산을 잘못해서 생기는 일이 아니라 ERM을 정확히 풀었을 때 생기는 일입니다.

</div>

## 흔한 오해

<div class="cal trap">

**empirical risk가 0이면 true risk도 0에 가깝다**

학습점에서만 맞는 함수가 반례입니다. empirical risk는 0이고 true risk는 큽니다. training error가 작다는 것만으로는 일반화에 대해 아무 말도 할 수 없습니다.

</div>

<div class="cal trap">

**큰 수의 법칙이 있으니 표본만 많으면 ERM이 고른 함수의 두 risk도 가까워진다**

큰 수의 법칙은 함수 하나를 정해 두었을 때의 이야기입니다. 모든 함수 가운데서 고른다면 표본이 아무리 많아도 그 표본을 외운 함수가 다시 후보에 있습니다. 그 함수의 empirical risk는 언제나 0입니다. 표본을 늘려 틈을 좁히려면 가설 집합이 먼저 제한되어 있어야 합니다.

</div>

## 확인 질문

<div class="cal q">

입력 $x$ 가 0과 1 사이에서 고르게 나오고 정답은 노이즈 없이 $y = 2x$ 라고 합시다. 손실은 squared loss입니다. 본문의 외운 함수 $h$ 와 상수 함수 $g(x) = 1$ 을 견줍니다.

- (가) $h$ 의 empirical risk, true risk, generalization error를 구하세요.
- (나) $g$ 의 true risk를 구하세요.
- (다) empirical risk만 보면 어느 함수가 낫고 true risk로 보면 어느 함수가 낫습니까.

</div>

<details class="solve">
<summary>답 보기</summary>

$x$ 가 0과 1 사이에서 고르게 나오면 $\mathbb{E}[x] = \frac{1}{2}$, $\mathbb{E}[x^2] = \frac{1}{3}$ 입니다.

(가) 학습점에서는 정답을 그대로 내므로 empirical risk는 0입니다. 새 입력이 학습점과 정확히 겹칠 확률은 0이므로 true risk는 100을 냈을 때의 제곱 오차의 기댓값입니다.

$$
\begin{aligned}
R(h) &= \mathbb{E}\big[(100 - 2x)^2\big] \\
&= 10000 - 400\,\mathbb{E}[x] + 4\,\mathbb{E}[x^2] \\
&= 10000 - 200 + \frac{4}{3} \approx 9801.3
\end{aligned}
$$

generalization error는 $0 - 9801.3 = -9801.3$ 입니다. 음수이고 절댓값이 큽니다.

(나) 상수 함수의 true risk는 다음과 같습니다.

$$
\begin{aligned}
R(g) &= \mathbb{E}\big[(1 - 2x)^2\big] \\
&= 1 - 4\,\mathbb{E}[x] + 4\,\mathbb{E}[x^2] \\
&= 1 - 2 + \frac{4}{3} = \frac{1}{3}
\end{aligned}
$$

(다) $g$ 는 학습점에서 정답과 어긋나므로 empirical risk가 0보다 큽니다. empirical risk만 보면 $h$ 가 낫습니다. true risk로 보면 $g$ 가 약 3만 배 낫습니다. 입력을 보지도 않는 함수가 ERM의 승자를 이깁니다.

</details>
