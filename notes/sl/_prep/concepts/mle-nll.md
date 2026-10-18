---
title: MLE와 음의 로그우도
en: MLE and negative log-likelihood
parent: mle-map
order: 20
summary: MLE는 우도를 가장 크게 하는 매개변수를 고릅니다. 실제로는 로그를 취하고 부호를 뒤집은 음의 로그우도를 최소화하며 i.i.d. 가정 덕분에 그 식이 표본별 항의 합이 됩니다.
signal: emph
related: [dataset-iid]
---

## 왜 필요한가

[우도](map.html?s=sl&n=likelihood)는 후보 값마다 점수를 매기는 기준이었습니다. MLE는 그 점수가 가장 높은 매개변수를 고릅니다. 그런데 우도를 그대로 최대화하기는 불편합니다. 표본이 $n$ 개면 확률 $n$ 개의 곱이라서 미분이 번거롭고 값도 금세 0에 가까워집니다.

그래서 로그를 취하고 부호를 뒤집은 음의 로그우도(negative log-likelihood, NLL)를 최소화합니다. 아래의 네 줄은 이 과목의 모든 유도가 거치는 첫 대목입니다. 뒤의 노드들은 이 네 줄을 다시 쓰지 않고 넷째 줄에서 출발합니다.

## 정의와 수식

MLE는 우도를 가장 크게 하는 매개변수입니다.

$$
\hat{\boldsymbol{\theta}}_{\text{MLE}} = \arg\max_{\boldsymbol{\theta}} p(D \mid \boldsymbol{\theta})
$$

수업 표기에 맞춰 전체 우도는 $p(D\mid\boldsymbol{\theta})$ 로 쓰고, 최소화할 음의 로그우도 손실은 다음과 같이 정의합니다.

$$
\mathcal{L}_D(\boldsymbol{\theta}) = -\log p(D \mid \boldsymbol{\theta})
$$

아래 첨자 $D$ 는 데이터가 고정돼 있고 $\boldsymbol{\theta}$ 만 움직인다는 표시입니다. empirical risk $\mathcal{L}(h; D)$ 와 글자가 같아서 첨자로 구별합니다. 우도를 가장 크게 하는 매개변수는 음의 로그우도를 가장 작게 하는 매개변수와 같습니다.

$$
\hat{\boldsymbol{\theta}}_{\text{MLE}} = \arg\min_{\boldsymbol{\theta}} \mathcal{L}_D(\boldsymbol{\theta})
$$

### 로그를 쓰는 세 이유

1. **최댓값의 위치가 그대로입니다.** 로그는 증가함수라서 $a > b > 0$ 이면 $\log a > \log b$ 입니다. 우도가 가장 큰 $\boldsymbol{\theta}$ 에서 로그우도도 가장 큽니다.
2. **곱이 합이 됩니다.** $\log(ab) = \log a + \log b$ 이므로 인수 $n$ 개의 곱이 항 $n$ 개의 합으로 바뀝니다. 합은 항마다 따로 미분할 수 있습니다.
3. **값이 0으로 사라지지 않습니다.** 확률은 1보다 작아서 곱할수록 작아집니다. $0.5$ 를 1,000번 곱하면 약 $10^{-301}$ 이고 100번쯤 더 곱하면 컴퓨터의 실수로는 0이 됩니다. 로그를 취하면 $1000 \times \log 0.5 \approx -693$ 이라는 다루기 쉬운 수가 됩니다.

앞에 붙인 음수 부호는 관습입니다. 손실은 줄이는 대상이라서 최대화 문제를 최소화 문제로 바꿔 적습니다. 로그의 밑은 무엇이든 최댓값의 위치가 같고 이 지도에서는 자연로그를 씁니다.

### 곱이 합이 되는 네 줄

데이터가 $D = \{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$ 일 때 음의 로그우도를 풀어 씁니다.

$$
\begin{aligned}
\mathcal{L}_D(\boldsymbol{\theta})
&= -\log p(D \mid \boldsymbol{\theta}) \\
&= -\log p\big((\mathbf{x}_1, y_1), \dots, (\mathbf{x}_n, y_n) \mid \boldsymbol{\theta}\big) \\
&= -\log \prod_{i=1}^{n} p(\mathbf{x}_i, y_i \mid \boldsymbol{\theta}) \\
&= -\sum_{i=1}^{n} \log p(\mathbf{x}_i, y_i \mid \boldsymbol{\theta})
\end{aligned}
$$

1. 첫째 줄: 정의입니다.
2. 둘째 줄: $D$ 를 풀어 썼습니다. 표본 $n$ 개가 한꺼번에 관측될 결합 확률입니다.
3. 셋째 줄: 표본이 [i.i.d.](map.html?s=sl&n=dataset-iid) 라는 가정을 씁니다. 독립이므로 결합 확률이 표본별 확률의 곱으로 나뉩니다. 같은 분포에서 나왔으므로 모든 인수가 같은 함수이고 같은 $\boldsymbol{\theta}$ 를 씁니다.
4. 넷째 줄: 로그의 성질로 곱을 합으로 바꿉니다.

레이블이 없는 데이터 $D = \{x_i\}_{i=1}^{n}$ 에서도 똑같이 $\mathcal{L}_D(\theta) = -\sum_{i=1}^{n} \log p(x_i \mid \theta)$ 입니다.

수업 자료의 이 대목은 표본 수를 $N$ 으로, 표본 번호를 $n$ 으로 적습니다. 이 지도에서는 앞 가지와 맞춰 $n$ 과 $i$ 로 씁니다.

<div class="cal key">

**가정이 쓰인 줄은 셋째 줄 하나입니다**

i.i.d. 가 깨지면 셋째 줄로 넘어갈 수 없습니다. 한 시계열을 겹치게 잘라 만든 표본들은 서로 독립이 아니어서 결합 확률이 표본별 확률의 곱이 아닙니다. 나머지 세 줄은 정의와 로그의 성질이라 어떤 모형에서도 그대로입니다. 모형마다 달라지는 것은 넷째 줄의 $p(\mathbf{x}_i, y_i \mid \boldsymbol{\theta})$ 자리에 무엇을 넣느냐입니다.

</div>

넷째 줄에서 길이 둘로 갈립니다. 레이블이 없으면 분포의 식을 바로 넣습니다. [동전](map.html?s=sl&n=mle-coin-toss)과 [분포의 매개변수](map.html?s=sl&n=mle-distribution-parameters)가 그 경우입니다. 입력과 레이블이 있으면 먼저 [조건부 우도](map.html?s=sl&n=conditional-likelihood)로 줄입니다.

## 흔한 오해

<div class="cal trap">

**로그를 취하면 더 좋은 해가 나온다**

해는 같습니다. 로그는 함수의 값을 바꾸지만 가장 큰 곳의 위치는 바꾸지 않습니다. 로그가 주는 이득은 계산이 쉬워지고 수치가 안정된다는 것뿐입니다.

</div>

<div class="cal trap">

**곱이 합이 되는 것은 로그 덕분이므로 i.i.d. 가정은 없어도 된다**

로그가 하는 일은 이미 있는 곱을 합으로 바꾸는 것입니다. 결합 확률을 곱으로 쓸 수 있게 해 준 것은 i.i.d. 가정입니다. 셋째 줄과 넷째 줄은 근거가 다릅니다.

</div>

## 확인 질문

<div class="cal q">

표본이 세 개이고 어떤 $\boldsymbol{\theta}$ 에서 표본별 확률이 $0.5$, $0.2$, $0.1$ 입니다. 우도와 음의 로그우도를 구하세요. 표본마다 $-\log$ 를 구해 더한 값과 같은지도 확인해 보세요. $\log 2 \approx 0.693$, $\log 5 \approx 1.609$, $\log 10 \approx 2.303$ 을 씁니다.

</div>

<details class="solve">
<summary>답 보기</summary>

우도는 $0.5 \times 0.2 \times 0.1 = 0.01$ 입니다. 음의 로그우도는

$$
-\log 0.01 = \log 100 = 2\log 10 \approx 4.605
$$

입니다. 표본별로 구하면 $-\log 0.5 = \log 2$, $-\log 0.2 = \log 5$, $-\log 0.1 = \log 10$ 이고

$$
0.693 + 1.609 + 2.303 = 4.605
$$

로 같습니다. 넷째 줄이 말하는 내용이 이것입니다.

</details>

<div class="cal q">

네 줄을 보지 않고 다시 써 보세요. 그리고 i.i.d. 의 두 조건인 독립과 동일 분포가 셋째 줄의 어느 부분을 각각 만들어 주는지 한 문장씩 적어 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

독립은 곱 기호를 만들어 줍니다. 표본들이 서로 독립이어야 결합 확률이 표본별 확률의 곱으로 나뉩니다.

동일 분포는 곱해지는 인수를 하나의 함수로 통일해 줍니다. 모든 표본이 같은 분포에서 나왔으므로 인수마다 같은 식에 같은 $\boldsymbol{\theta}$ 를 씁니다. 독립이기만 하고 분포가 표본마다 다르다면 곱으로는 쓸 수 있어도 인수마다 다른 식을 넣어야 합니다.

</details>
