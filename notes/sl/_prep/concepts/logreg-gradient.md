---
title: 로지스틱 회귀의 gradient
en: Gradient of logistic regression
parent: gradient-descent
order: 50
summary: 레이블을 0과 1로 두면 표본 하나의 gradient가 예측 확률에서 정답을 뺀 값에 입력을 곱한 꼴로 정리됩니다. 이것을 갱신식에 넣으면 로지스틱 회귀의 학습 알고리즘이 됩니다.
signal: none
related: [logreg-mle-objective]
---

## 왜 필요한가

갱신식 $\mathbf{w}_{t+1} \leftarrow \mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$ 는 어떤 목적함수에나 쓰는 틀입니다. 로지스틱 회귀를 실제로 학습시키려면 $g(\mathbf{w})$ 자리에 들어갈 식을 구해야 합니다.

이 노드에서는 레이블을 $\{0, 1\}$ 로 둡니다. 그렇게 쓰면 gradient가 "예측 확률에서 정답을 뺀 값 곱하기 입력"이라는 읽기 쉬운 꼴이 됩니다. [MLE의 유도](map.html?s=sl&n=logreg-mle-objective)에서 쓴 부호 레이블의 목적함수와 같은 것이라는 점도 끝에서 확인합니다.

## 정의와 수식

### 레이블 0, 1 꼴의 목적함수

$y_i \in \{0, 1\}$ 이고 모형이 낸 클래스 1의 확률을 $\hat{y}_i$ 라 씁니다.

$$
\hat{y}_i = P(y = 1 \mid \mathbf{x}_i ; \mathbf{w}) = \frac{1}{1+e^{-\mathbf{w}^T\mathbf{x}_i}}
$$

관측된 레이블의 확률은 $y_i = 1$ 이면 $\hat{y}_i$ 이고 $y_i = 0$ 이면 $1 - \hat{y}_i$ 입니다. 둘을 한 줄로 쓰면 $\hat{y}_i^{\,y_i}(1-\hat{y}_i)^{1-y_i}$ 이고 여기에 음의 로그를 취한 것이 표본 하나의 손실입니다.

$$
\ell_i(\mathbf{w}) = -y_i \log \hat{y}_i - (1-y_i)\log(1-\hat{y}_i)
$$

$y_i$ 와 $1 - y_i$ 가운데 하나는 반드시 0이라서 두 항 중 하나만 살아남습니다. 이 꼴을 이진 cross-entropy라고 부릅니다. 목적함수는 표본별 손실의 평균입니다. $\frac{1}{n}$ 은 양의 상수라 최솟값의 위치를 바꾸지 않습니다.

$$
\ell(\mathbf{w}) = \frac{1}{n}\sum_{i=1}^{n} \ell_i(\mathbf{w})
$$

### 표본 손실을 정리한다

$z_i = \mathbf{w}^T\mathbf{x}_i$ 로 줄여 씁니다. 로지스틱 함수의 두 꼴에서 $\hat{y}_i = \frac{e^{z_i}}{1+e^{z_i}}$ 이고 $1 - \hat{y}_i = \frac{1}{1+e^{z_i}}$ 입니다.

$$
\begin{aligned}
\ell_i(\mathbf{w})
&= -y_i \log \hat{y}_i - (1-y_i)\log(1-\hat{y}_i) \\
&= -y_i \log\frac{e^{z_i}}{1+e^{z_i}} \\
&\quad - (1-y_i)\log\frac{1}{1+e^{z_i}} \\
&= -y_i z_i + y_i\log(1+e^{z_i}) \\
&\quad + (1-y_i)\log(1+e^{z_i}) \\
&= \log(1+e^{z_i}) - y_i z_i
\end{aligned}
$$

1. 첫째 등호: 손실의 정의입니다.
2. 둘째 등호: $\hat{y}_i$ 와 $1 - \hat{y}_i$ 를 $z_i$ 로 쓴 식을 넣습니다. 두 항 앞의 음수 부호가 그대로 따라옵니다.
3. 셋째 등호: 로그를 풉니다. $\log\frac{e^{z_i}}{1+e^{z_i}} = z_i - \log(1+e^{z_i})$ 이고 $\log\frac{1}{1+e^{z_i}} = -\log(1+e^{z_i})$ 입니다.
4. 넷째 등호: $\log(1+e^{z_i})$ 의 계수가 $y_i + (1 - y_i) = 1$ 로 합쳐집니다.

부호를 놓치기 쉬운 곳은 둘째 등호입니다. 로그 안의 식을 바꿔 넣을 때 맨 앞의 음수 부호를 함께 옮겨야 셋째 등호에서 $-y_i z_i$ 가 나옵니다.

### gradient

$z_i = \mathbf{w}^T\mathbf{x}_i$ 를 $\mathbf{w}$ 로 미분하면 $\mathbf{x}_i$ 입니다.

$$
\begin{aligned}
\frac{\partial \ell_i(\mathbf{w})}{\partial \mathbf{w}}
&= \frac{e^{z_i}}{1+e^{z_i}}\,\mathbf{x}_i - y_i\,\mathbf{x}_i \\
&= \frac{1}{1+e^{-z_i}}\,\mathbf{x}_i - y_i\,\mathbf{x}_i \\
&= (\hat{y}_i - y_i)\,\mathbf{x}_i
\end{aligned}
$$

1. 첫째 줄: $\log(1+e^{z_i})$ 는 chain rule로, $y_i z_i$ 는 그대로 미분합니다.
2. 둘째 줄: 첫 항의 분자와 분모를 $e^{z_i}$ 로 나눕니다.
3. 셋째 줄: $\frac{1}{1+e^{-z_i}}$ 가 $\hat{y}_i$ 입니다.

전체 gradient는 표본별 gradient의 평균입니다.

$$
g(\mathbf{w}) = \frac{1}{n}\sum_{i=1}^{n} (\hat{y}_i - y_i)\,\mathbf{x}_i
$$

<div class="cal key">

**예측 확률에서 정답을 뺀 값에 입력을 곱합니다**

$\hat{y}_i - y_i$ 는 그 표본에서 모형이 얼마나 틀렸는지를 나타냅니다. 정답에 가까운 확률을 낸 표본은 이 값이 0에 가까워 $\mathbf{w}$ 를 거의 움직이지 않습니다. 크게 틀린 표본일수록 $\mathbf{w}$ 를 세게 당깁니다.

</div>

### 알고리즘

1. $\mathbf{w}_0$ 을 정하고 $t = 0$ 으로 둔다.
2. 모든 표본에 대해 $\hat{y}_i = \phi(\mathbf{w}_t^T\mathbf{x}_i)$ 를 계산한다.
3. $g(\mathbf{w}_t) = \frac{1}{n}\sum_i (\hat{y}_i - y_i)\,\mathbf{x}_i$ 를 계산한다.
4. $\mathbf{w}_{t+1} \leftarrow \mathbf{w}_t - \alpha\, g(\mathbf{w}_t)$ 로 옮긴다.
5. 손실의 변화가 $\epsilon$ 보다 작아질 때까지 2부터 4를 되풀이한다. 다른 [멈추는 기준](map.html?s=sl&n=gd-update-rule)을 써도 된다.

### 두 레이블 꼴은 같은 목적함수다

부호 레이블을 $\tilde{y}_i = 2y_i - 1$ 이라 쓰면 $y_i = 1$ 은 $\tilde{y}_i = +1$, $y_i = 0$ 은 $\tilde{y}_i = -1$ 에 대응합니다. 부호 레이블로 쓴 표본 손실은 $\log(1+e^{-\tilde{y}_i z_i})$ 였습니다. 두 경우를 각각 넣어 봅니다.

| $y_i$ | $\tilde{y}_i$ | 0, 1 꼴 $\log(1+e^{z_i}) - y_i z_i$ | 부호 꼴 $\log(1+e^{-\tilde{y}_i z_i})$ |
|---|---|---|---|
| $1$ | $+1$ | $\log(1+e^{z_i}) - z_i = \log(1+e^{-z_i})$ | $\log(1+e^{-z_i})$ |
| $0$ | $-1$ | $\log(1+e^{z_i})$ | $\log(1+e^{z_i})$ |

첫째 줄의 등호는 $\log(1+e^{z_i}) - \log e^{z_i} = \log\frac{1+e^{z_i}}{e^{z_i}}$ 에서 나옵니다. 두 경우 모두 값이 같으므로 표본 손실이 같습니다. 0, 1 꼴의 목적함수는 부호 꼴의 목적함수를 $n$ 으로 나눈 것이고 같은 $\hat{\mathbf{w}}$ 를 줍니다. 표본 손실이 같으니 표본별 gradient도 같습니다.

## 흔한 오해

<div class="cal trap">

**레이블을 0, 1 로 둔 손실과 $+1$, $-1$ 로 둔 손실은 서로 다른 목적함수다**

표본마다 값이 같습니다. 클래스의 이름을 다르게 붙였을 뿐이고 최소화하는 $\mathbf{w}$ 도 같습니다. 식의 겉모습이 다른 것은 한 줄로 묶는 방법이 다르기 때문입니다.

</div>

<div class="cal trap">

**표본의 gradient는 $(y_i - \hat{y}_i)\,\mathbf{x}_i$ 다**

부호가 반대입니다. gradient는 $(\hat{y}_i - y_i)\,\mathbf{x}_i$ 이고 갱신식에서 이것을 뺍니다. 그래서 $\mathbf{w}$ 가 실제로 움직이는 방향이 $(y_i - \hat{y}_i)\,\mathbf{x}_i$ 입니다. 정답이 1인데 확률을 낮게 냈다면 $\mathbf{x}_i$ 방향으로 옮겨 $\mathbf{w}^T\mathbf{x}_i$ 를 키웁니다.

</div>

## 확인 질문

<div class="cal q">

표본이 셋입니다. $\mathbf{x}_1 = (1, 2)^T$, $y_1 = 1$ 이고 $\mathbf{x}_2 = (1, 0)^T$, $y_2 = 0$ 이고 $\mathbf{x}_3 = (1, -2)^T$, $y_3 = 0$ 입니다. 입력의 첫 성분 1은 편향을 흡수하려고 붙인 것입니다. $\mathbf{w}_0 = (0, 0)^T$ 에서 세 표본의 $\hat{y}_i$ 와 $g(\mathbf{w}_0)$ 을 구하고 $\alpha = 3$ 으로 한 걸음 옮긴 $\mathbf{w}_1$ 을 계산하세요. 그다음 $\mathbf{w}_1$ 이 세 표본을 어떻게 분류하는지를 선형식의 부호로 확인해 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

$\mathbf{w}_0$ 이 영벡터이면 모든 표본에서 선형식이 0이므로 $\hat{y}_1 = \hat{y}_2 = \hat{y}_3 = \phi(0) = 0.5$ 입니다. 지수함수를 계산할 일이 없습니다.

$\hat{y}_i - y_i$ 는 차례로 $-0.5$, $0.5$, $0.5$ 입니다.

$$
\begin{aligned}
g(\mathbf{w}_0) &= \tfrac{1}{3}\big[ -0.5\,(1, 2)^T + 0.5\,(1, 0)^T \\
&\qquad + 0.5\,(1, -2)^T \big] \\
&= \tfrac{1}{3}\,(0.5, -2)^T = \big(\tfrac{1}{6}, -\tfrac{2}{3}\big)^T
\end{aligned}
$$

$$
\begin{aligned}
\mathbf{w}_1 &= (0, 0)^T - 3 \cdot \big(\tfrac{1}{6}, -\tfrac{2}{3}\big)^T \\
&= (-0.5, 2)^T
\end{aligned}
$$

$\mathbf{w}_1$ 에서 선형식은 $-0.5 + 2x$ 꼴입니다. 여기서 $x$ 는 입력의 둘째 성분입니다. 첫째 표본은 $-0.5 + 4 = 3.5$ 로 양수라 클래스 1, 둘째 표본은 $-0.5$ 로 음수라 클래스 0, 셋째 표본은 $-0.5 - 4 = -4.5$ 로 음수라 클래스 0입니다. 한 걸음 만에 세 표본을 모두 맞게 분류합니다.

</details>
