---
title: 선형회귀와 무엇이 다른가
en: Logistic vs linear regression
parent: logistic-regression
order: 80
summary: 두 모형의 MLE 유도에서 갈라지는 곳은 가정을 넣는 한 줄입니다. 레이블의 조건부 확률을 가우시안으로 두느냐 로지스틱 함수로 두느냐입니다. 손실의 모양과 푸는 방법은 그 한 줄에서 따라 나옵니다.
signal: emph
related: []
---

## 왜 필요한가

선형회귀의 유도와 로지스틱 회귀의 유도를 따로 외우면 긴 유도가 두 벌입니다. 둘을 나란히 놓으면 대부분의 줄이 같고 갈라지는 곳은 한 줄입니다.

그 한 줄을 정확히 짚을 수 있으면 "선형회귀는 MSE를 쓰는데 로지스틱 회귀는 왜 다른 손실을 쓰는가"라는 물음에 바로 답할 수 있습니다. 답은 최적화 방법이나 데이터의 크기에 있지 않고 가정에 있습니다.

## 정의와 수식

두 모형 모두 MLE에서 출발합니다. i.i.d. 가정으로 곱을 만들고 로그로 합을 만들고 $\mathbf{w}$ 와 무관한 $P(\mathbf{x}_i)$ 를 버립니다. 부호를 뒤집어 최소화로 적으면 두 모형은 같은 식에 닿습니다.

$$
\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \sum_{i=1}^{n} \Big[ -\log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \Big]
$$

갈라지는 곳은 대괄호 안에 무엇을 넣느냐입니다.

선형회귀는 실수 레이블 $y_i$ 가 평균 $\mathbf{w}^T\mathbf{x}_i$ 인 가우시안을 따른다고 가정합니다. 밀도의 지수 안에 제곱이 있어서 제곱 오차가 남습니다.

$$
\begin{aligned}
& -\log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&= \frac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2} + \text{const}
\end{aligned}
$$

로지스틱 회귀는 레이블 $y_i \in \{-1, +1\}$ 의 확률이 로지스틱 함수로 정해진다고 가정합니다. 분모에 있던 식이 로그 안에 남습니다.

$$
\begin{aligned}
& -\log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&= \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big)
\end{aligned}
$$

전체 유도는 [가우시안 노이즈와 MSE](map.html?s=sl&n=lr-gaussian-noise-mse)와 [로지스틱 회귀의 MLE 목적함수](map.html?s=sl&n=logreg-mle-objective)에 있습니다. 두 노드의 줄을 하나씩 맞대어 보면 아래 표가 나옵니다.

| | 선형회귀 | 로지스틱 회귀 |
|---|---|---|
| 레이블 | 실수 | 두 클래스 |
| 모형이 내는 것 | 예측값 $\mathbf{w}^T\mathbf{x}$ | 클래스의 확률 $\phi(\mathbf{w}^T\mathbf{x})$ |
| $P(y \mid \mathbf{x} ; \mathbf{w})$ 의 가정 | 평균이 $\mathbf{w}^T\mathbf{x}$ 인 가우시안 | 로지스틱 함수 |
| MLE가 남기는 손실 | 제곱 오차. 라플라스 노이즈면 절댓값 오차 | $\log(1+e^{-y\mathbf{w}^T\mathbf{x}})$ |
| 가우시안 prior를 더하면 | $\lambda\mathbf{w}^T\mathbf{w}$ 가 붙는다 | 같은 항이 붙는다 |
| 푸는 법 | 닫힌 해 $(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ | 닫힌 해가 없어 경사하강법 |
| 입력에 선형인 것 | 예측값 | logit과 결정 경계 |

표에서 원인은 셋째 줄 하나입니다. 넷째 줄의 손실은 셋째 줄의 식에 음의 로그를 취한 결과입니다. 여섯째 줄의 푸는 법은 그 손실을 미분한 식이 풀리느냐에 달려 있습니다.

같은 것을 따로 모으면 다음과 같습니다.

- i.i.d. 가정으로 우도를 표본별 확률의 곱으로 쓴다.
- 로그를 취해 곱을 합으로 바꾼다.
- 결합확률을 조건부확률과 입력의 확률로 나누고 $P(\mathbf{x}_i)$ 를 버린다.
- 음수 부호를 떼면서 최대화를 최소화로 바꾼다.
- prior를 더하면 끝에 벌점 항이 하나 붙는다.

이 골격은 선형 모형에만 통하는 것이 아닙니다. 로지스틱 함수에 넣는 값을 선형식 $\mathbf{w}^T\mathbf{x}$ 대신 신경망의 출력 $f_{\boldsymbol{\theta}}(\mathbf{x})$ 로 바꾸면 딥러닝의 이진 분류가 됩니다. 유도는 한 줄도 달라지지 않고 목적함수에서 그 자리만 바뀝니다.

$$
\hat{\boldsymbol{\theta}} = \arg\min_{\boldsymbol{\theta}} \sum_{i=1}^{n} \log\big(1+e^{-y_i f_{\boldsymbol{\theta}}(\mathbf{x}_i)}\big)
$$

<div class="cal key">

**다른 것은 조건부 확률을 무엇으로 두었느냐 하나입니다**

$P(y \mid \mathbf{x})$ 를 가우시안으로 두면 MSE가 나오고 로지스틱 함수로 두면 로지스틱 손실이 나옵니다. 손실을 고른 것이 아니라 가정을 골랐고 손실은 그 가정에서 계산돼 나왔습니다.

</div>

## 흔한 오해

<div class="cal trap">

**로지스틱 회귀가 MSE를 쓰지 않는 것은 경사하강법으로 풀기 때문이다**

순서가 반대입니다. 가정이 달라서 손실이 달라졌고 손실이 달라져서 닫힌 해가 없어졌고 그래서 경사하강법을 씁니다. 손실을 정한 것은 푸는 방법이 아니라 $P(y \mid \mathbf{x})$ 의 가정입니다.

</div>

<div class="cal trap">

**로지스틱 함수가 들어 있으므로 로지스틱 회귀는 선형 모형이 아니다**

확률은 입력에 선형이 아니지만 logit과 [결정 경계](map.html?s=sl&n=decision-boundary)가 입력의 선형식입니다. 그래서 선형 모형이라고 부릅니다.

</div>

## 확인 질문

<div class="cal q">

두 모형의 MLE 유도를 나란히 쓴다고 할 때 처음으로 달라지는 줄을 써 보세요. 그리고 다음 두 경우에 본문의 표에서 어느 줄이 바뀌는지 말해 보세요. 첫째, 선형회귀의 노이즈를 라플라스로 바꾼다. 둘째, 로지스틱 회귀의 선형식을 신경망으로 바꾼다.

</div>

<details class="solve">
<summary>답 보기</summary>

처음으로 달라지는 줄은 $P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 에 식을 넣는 줄입니다. 선형회귀는 가우시안 밀도를 넣고 로지스틱 회귀는 $\frac{1}{1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}}$ 를 넣습니다. 그 앞의 줄은 모두 같습니다.

첫째 경우에는 가정의 줄이 라플라스로 바뀌고 그에 따라 손실의 줄이 절댓값 오차로 바뀝니다. 유도는 [라플라스 노이즈와 MAE](map.html?s=sl&n=lr-laplace-noise-mae)에 있습니다.

둘째 경우에는 모형이 내는 것의 줄에서 $\mathbf{w}^T\mathbf{x}$ 가 $f_{\boldsymbol{\theta}}(\mathbf{x})$ 로 바뀌고 입력에 선형인 것의 줄이 더는 성립하지 않습니다. 가정의 줄과 손실의 꼴은 그대로입니다.

</details>
