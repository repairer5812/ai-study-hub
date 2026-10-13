---
title: "조건부 우도: 입력의 분포를 버려도 되는 이유"
en: Conditional likelihood
parent: mle-map
order: 50
summary: 지도학습에서는 입력과 레이블의 결합 확률을 조건부 확률과 입력의 분포로 나누고 조건부 쪽만 남깁니다. 입력의 분포가 매개변수와 무관하다는 가정이 있어서 가능한 일입니다.
signal: emph
related: [lr-gaussian-noise-mse, logreg-mle-objective]
---

## 왜 필요한가

[음의 로그우도](map.html?s=sl&n=mle-nll)의 넷째 줄에는 $P(\mathbf{x}_i, y_i ; \boldsymbol{\theta})$ 가 있습니다. 입력과 레이블이 함께 나올 결합 확률입니다. 그런데 지도학습에서 만들려는 것은 입력을 받아 레이블을 내는 predictor(예측기)입니다. 입력 자체가 어떻게 흩어져 있는지는 모형이 설명할 일이 아닙니다.

그래서 결합 확률을 둘로 나누고 predictor가 책임지는 쪽만 남깁니다. 이렇게 줄인 식이 선형회귀와 로지스틱 회귀 유도의 실제 출발점입니다. 줄이는 과정에 가정이 하나 들어갑니다. 그 한 줄이 확률의 법칙이 아니라 가정이라는 점을 이 노드에서 확인합니다.

## 정의와 수식

### 나누기

결합 확률은 곱의 법칙(product rule)으로 언제나 이렇게 쓸 수 있습니다.

$$
P(\mathbf{x}_i, y_i ; \boldsymbol{\theta}) = P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i ; \boldsymbol{\theta})
$$

앞의 인수가 조건부 우도(conditional likelihood)입니다. 입력 $\mathbf{x}_i$ 가 주어졌을 때 레이블이 $y_i$ 일 확률이고 predictor가 정하는 부분입니다. 뒤의 인수는 입력 $\mathbf{x}_i$ 가 나올 확률입니다.

### 가정

매개변수 $\boldsymbol{\theta}$ 는 입력과 레이블의 관계만 기술하고 입력의 분포에는 관여하지 않는다고 둡니다.

$$
P(\mathbf{x}_i ; \boldsymbol{\theta}) = P(\mathbf{x}_i)
$$

### 전개

음의 로그우도의 넷째 줄에서 이어 갑니다.

$$
\begin{aligned}
\mathcal{L}_D(\boldsymbol{\theta})
&= -\sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \boldsymbol{\theta}) \\
&= -\sum_{i=1}^{n} \log \big[ P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i ; \boldsymbol{\theta}) \big] \\
&= -\sum_{i=1}^{n} \log \big[ P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})\, P(\mathbf{x}_i) \big] \\
&= -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta}) - \sum_{i=1}^{n} \log P(\mathbf{x}_i)
\end{aligned}
$$

1. 첫째 줄: i.i.d. 가정으로 얻은 식입니다.
2. 둘째 줄: 곱의 법칙입니다. 가정 없이 성립합니다.
3. 셋째 줄: 위의 가정을 씁니다. 뒤의 인수에서 $\boldsymbol{\theta}$ 가 사라집니다.
4. 넷째 줄: 로그의 성질로 두 합으로 가릅니다.

### 버리는 항

둘째 합 $\sum_i \log P(\mathbf{x}_i)$ 에는 $\boldsymbol{\theta}$ 가 없습니다. $\boldsymbol{\theta}$ 를 어떻게 바꿔도 같은 값이므로 최솟값의 위치에 영향을 주지 않습니다. 이 항을 버리고 남은 것이 지도학습의 MLE가 실제로 푸는 문제입니다.

$$
\hat{\boldsymbol{\theta}}_{\text{MLE}} = \arg\min_{\boldsymbol{\theta}} \left[ -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta}) \right]
$$

지도학습에서 음의 로그우도 $\mathcal{L}_D(\boldsymbol{\theta})$ 라고 하면 이 조건부 합을 가리킵니다. 원래 정의와 상수만큼 다르지만 최소화의 답이 같기 때문입니다.

### 남은 일

이제 정할 것은 $P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta})$ 의 모양 하나입니다. 평균이 $\mathbf{w}^T\mathbf{x}_i$ 인 가우시안으로 두면 [선형회귀의 MSE](map.html?s=sl&n=lr-gaussian-noise-mse)가 나옵니다. 로지스틱 함수가 주는 확률로 두면 [로지스틱 회귀의 목적함수](map.html?s=sl&n=logreg-mle-objective)가 나옵니다. 두 유도 모두 위 식에서 시작합니다.

결합 확률은 $y_i$ 를 먼저 두고 $P(\mathbf{x}_i \mid y_i ; \boldsymbol{\theta})\, P(y_i ; \boldsymbol{\theta})$ 로도 나눌 수 있습니다. 곱의 법칙으로는 둘 다 맞습니다. 지도학습의 목표가 입력을 받아 레이블을 내는 것이어서 레이블을 조건부 쪽에 두는 방향을 고릅니다.

<div class="cal key">

**네 줄 가운데 새로 들어간 가정은 셋째 줄 하나입니다**

모형이 입력의 분포까지 기술한다면 셋째 줄이 성립하지 않습니다. 그때는 둘째 합이 $\sum_i \log P(\mathbf{x}_i ; \boldsymbol{\theta})$ 로 남아서 버릴 수 없고 함께 최소화해야 합니다. 선형회귀와 로지스틱 회귀는 입력의 분포를 기술하지 않는 모형이라 이 항을 버립니다.

</div>

## 흔한 오해

<div class="cal trap">

**$P(\mathbf{x}_i)$ 가 빠지는 것은 확률의 법칙에서 나온다**

곱의 법칙이 주는 것은 둘째 줄까지입니다. $P(\mathbf{x}_i ; \boldsymbol{\theta})$ 에서 $\boldsymbol{\theta}$ 를 지운 것은 "매개변수는 입력의 분포와 무관하다"는 모델링 가정입니다. 증명해서 얻는 결과가 아니고 모형을 그렇게 세우기로 정한 것입니다.

</div>

<div class="cal trap">

**$P(\mathbf{x}_i)$ 를 버리는 까닭은 그 값이 1이거나 표본이 i.i.d. 이기 때문이다**

값의 크기와는 상관없습니다. $\boldsymbol{\theta}$ 의 함수가 아니어서 버립니다. 로그를 취한 뒤에는 더해지는 상수가 되고 상수는 최솟값의 위치를 바꾸지 않습니다. i.i.d. 는 결합 확률을 표본별 곱으로 쪼개는 데 이미 쓰인 다른 가정입니다.

</div>

## 확인 질문

<div class="cal q">

전개의 네 줄을 보지 않고 쓰고 줄마다 근거를 적으세요. 근거가 언제나 성립하는 규칙인지 가정인지도 표시하세요. 그리고 $P(\mathbf{x}_i ; \boldsymbol{\theta})$ 가 $\boldsymbol{\theta}$ 에 따라 달라지는 모형이라면 최소화할 식이 무엇이 되는지 쓰세요.

</div>

<details class="solve">
<summary>답 보기</summary>

첫째 줄은 i.i.d. 라는 가정에서 왔습니다. 둘째 줄은 곱의 법칙이고 언제나 성립합니다. 셋째 줄은 $P(\mathbf{x}_i ; \boldsymbol{\theta}) = P(\mathbf{x}_i)$ 라는 가정입니다. 넷째 줄은 로그의 성질이고 언제나 성립합니다.

입력의 분포가 $\boldsymbol{\theta}$ 에 따라 달라지면 셋째 줄을 쓸 수 없습니다. 둘째 줄에서 바로 로그를 가르면

$$
\begin{aligned}
\mathcal{L}_D(\boldsymbol{\theta})
&= -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \boldsymbol{\theta}) \\
&\quad - \sum_{i=1}^{n} \log P(\mathbf{x}_i ; \boldsymbol{\theta})
\end{aligned}
$$

이고 두 합을 모두 최소화 대상에 넣어야 합니다.

</details>

<div class="cal q">

표본이 둘이고 $P(\mathbf{x}_1) = 0.2$, $P(\mathbf{x}_2) = 0.5$ 입니다. 매개변수 후보 A에서는 조건부 확률 $P(y_i \mid \mathbf{x}_i)$ 가 차례로 $0.9$, $0.4$ 이고 후보 B에서는 $0.6$, $0.7$ 입니다. 결합 확률로 만든 우도와 조건부 확률만으로 만든 우도를 각각 구해 두 후보를 비교하세요. 어느 쪽으로 비교해도 순서가 같은 이유를 식으로 설명하세요.

</div>

<details class="solve">
<summary>답 보기</summary>

결합 확률로 만든 우도부터 구합니다. 후보 A는 $(0.9 \times 0.2)(0.4 \times 0.5) = 0.18 \times 0.20 = 0.036$ 이고 후보 B는 $(0.6 \times 0.2)(0.7 \times 0.5) = 0.12 \times 0.35 = 0.042$ 입니다.

조건부 확률만으로 만든 우도는 A가 $0.9 \times 0.4 = 0.36$ 이고 B가 $0.6 \times 0.7 = 0.42$ 입니다. 어느 쪽으로 보든 B가 큽니다.

두 계산의 차이는 공통 인수 $P(\mathbf{x}_1)P(\mathbf{x}_2) = 0.1$ 을 곱했느냐뿐입니다. 이 인수는 후보가 바뀌어도 같으므로 두 후보의 비는 $\frac{0.042}{0.036} = \frac{0.42}{0.36}$ 로 같습니다. 로그를 취하면 이 인수가 양쪽에 똑같이 더해지는 상수 $\log 0.1$ 이 됩니다.

</details>
