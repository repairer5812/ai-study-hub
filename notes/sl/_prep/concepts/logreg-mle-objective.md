---
title: MLE로 얻는 목적함수
en: MLE objective of logistic regression
parent: logistic-regression
order: 60
summary: 통합 확률식에서 출발해 우도를 최대화하면 로그 안에 지수가 든 합을 최소화하는 문제가 남습니다. 앞의 여섯 줄은 선형회귀와 같고 로지스틱이라는 가정은 일곱째 줄에서 처음 들어옵니다.
signal: emph
related: [lr-gaussian-noise-mse, lr-laplace-noise-mae, conditional-likelihood, logreg-gradient]
---

## 왜 필요한가

모형의 가정은 끝났습니다. 레이블의 확률은 [통합식](map.html?s=sl&n=label-pm1-unified) 한 줄로 주어집니다. 남은 일은 $\mathbf{w}$ 를 데이터로 정하는 것이고 방법은 선형회귀 때와 같은 MLE입니다.

이 유도는 처음부터 끝까지 손으로 쓸 수 있어야 합니다. 열두 줄이라 길어 보이지만 구조는 단순합니다. 앞의 여섯 줄은 어떤 모형에서나 똑같이 쓰는 줄입니다. 로지스틱 회귀만의 내용은 가운데 두 줄입니다. 나머지 네 줄은 로그와 부호를 정리합니다. 어느 줄이 어느 묶음인지 알고 쓰면 중간에 길을 잃지 않습니다.

## 정의와 수식

데이터는 $D = \{(\mathbf{x}_i, y_i)\}_{i=1}^{n}$ 이고 레이블은 $y_i \in \{-1, +1\}$ 입니다. 식 왼쪽의 작은 번호가 줄 번호이고 아래 설명의 번호와 짝을 이룹니다.

### 첫째 묶음: 무엇을 최대화하나

$$
\begin{aligned}
{\scriptstyle (1)}\;\; \hat{\mathbf{w}} &= \arg\max_{\mathbf{w}} P(D ; \mathbf{w}) \\
{\scriptstyle (2)}\;\; \hphantom{\hat{\mathbf{w}}} &= \arg\max_{\mathbf{w}} \log P(D ; \mathbf{w})
\end{aligned}
$$

1. MLE의 정의입니다. 데이터 $D$ 가 관측될 확률을 가장 크게 만드는 $\mathbf{w}$ 를 고릅니다. 세미콜론은 $\mathbf{w}$ 가 확률변수가 아니라 값이 정해져 있는 미지수라는 표시입니다.
2. 로그를 씌웁니다. 로그는 증가함수라서 최댓값의 위치가 바뀌지 않습니다.

### 둘째 묶음: 로그우도를 표본별 합으로

$$
\begin{aligned}
& \log P(D ; \mathbf{w}) \\
{\scriptstyle (3)}\;\; &= \log \prod_{i=1}^{n} P(\mathbf{x}_i, y_i ; \mathbf{w}) \\
{\scriptstyle (4)}\;\; &= \sum_{i=1}^{n} \log P(\mathbf{x}_i, y_i ; \mathbf{w}) \\
{\scriptstyle (5)}\;\; &= \sum_{i=1}^{n} \log \big[ P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \, P(\mathbf{x}_i) \big] \\
{\scriptstyle (6)}\;\; &= \sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&\quad + \sum_{i=1}^{n} \log P(\mathbf{x}_i)
\end{aligned}
$$

3. i.i.d. 가정을 씁니다. 표본들이 같은 분포에서 서로 독립으로 뽑혔으므로 전체 확률은 표본별 확률의 곱입니다.
4. 곱의 로그는 로그의 합입니다.
5. 결합확률을 조건부확률과 입력의 확률로 나눕니다. 입력의 분포 $P(\mathbf{x}_i)$ 는 $\mathbf{w}$ 에 달려 있지 않다고 가정합니다.
6. 로그 안의 곱을 다시 합으로 풉니다. 둘째 합에는 $\mathbf{w}$ 가 없습니다.

(6)의 둘째 합은 $\mathbf{w}$ 를 바꿔도 변하지 않습니다. 최댓값의 위치에 영향을 주지 않으므로 버립니다. 남는 문제는 다음과 같습니다.

$$
\hat{\mathbf{w}} = \arg\max_{\mathbf{w}} \sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w})
$$

여기까지 로지스틱이라는 말은 한 번도 나오지 않았습니다. 선형회귀의 유도가 출발한 식이 바로 이것입니다. 일반형은 [MLE와 음의 로그우도](map.html?s=sl&n=mle-nll)와 [조건부 우도](map.html?s=sl&n=conditional-likelihood)에 있습니다.

### 셋째 묶음: 로지스틱 회귀의 가정

$$
\begin{aligned}
{\scriptstyle (7)}\;\; & P(y_i = +1 \mid \mathbf{x}_i ; \mathbf{w}) = \frac{1}{1+e^{-(\mathbf{w}^T\mathbf{x}_i+b)}} \\
& P(y_i = -1 \mid \mathbf{x}_i ; \mathbf{w}) = \frac{1}{1+e^{+(\mathbf{w}^T\mathbf{x}_i+b)}} \\
{\scriptstyle (8)}\;\; & P(y_i \mid \mathbf{x}_i ; \mathbf{w}) = \frac{1}{1+e^{-y_i(\mathbf{w}^T\mathbf{x}_i+b)}}
\end{aligned}
$$

7. 모형의 가정을 넣습니다. 레이블이 $+1$ 일 확률은 선형식을 로지스틱 함수에 넣은 값이고 $-1$ 일 확률은 1에서 그 값을 뺀 것입니다.
8. 두 식은 지수 앞의 부호만 다릅니다. 지수에 $-y_i$ 를 곱해 한 줄로 합칩니다.

### 넷째 묶음: 대입하고 부호를 정리한다

$$
\begin{aligned}
& \sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
{\scriptstyle (9)}\;\; &= \sum_{i=1}^{n} \log \frac{1}{1+e^{-y_i(\mathbf{w}^T\mathbf{x}_i+b)}} \\
&= \sum_{i=1}^{n} \Big[ \log 1 - \log\big(1+e^{-y_i(\mathbf{w}^T\mathbf{x}_i+b)}\big) \Big] \\
{\scriptstyle (10)}\;\; &= -\sum_{i=1}^{n} \log\big(1+e^{-y_i(\mathbf{w}^T\mathbf{x}_i+b)}\big)
\end{aligned}
$$

$$
\begin{aligned}
{\scriptstyle (11)}\;\; \hat{\mathbf{w}} &= \arg\min_{\mathbf{w}} \sum_{i=1}^{n} \log\big(1+e^{-y_i(\mathbf{w}^T\mathbf{x}_i+b)}\big) \\
{\scriptstyle (12)}\;\; \hat{\mathbf{w}} &= \arg\min_{\mathbf{w}} \sum_{i=1}^{n} \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big)
\end{aligned}
$$

9. (8)을 대입합니다. 분수의 로그는 분자의 로그에서 분모의 로그를 뺀 것입니다.
10. $\log 1 = 0$ 이라 첫 항이 사라지고 합 앞에 음수 부호가 남습니다.
11. 음수가 붙은 식을 최대화하는 일은 부호를 뗀 식을 최소화하는 일과 같습니다. $\arg\max$ 가 $\arg\min$ 으로 바뀝니다.
12. $b$ 를 $\mathbf{w}$ 안으로 흡수해 식을 줄입니다. 입력의 맨 앞에 1을 붙이고 $\mathbf{w}$ 의 맨 앞에 $b$ 를 붙이면 $\mathbf{w}^T\mathbf{x}_i + b$ 가 내적 하나로 써집니다. 방법은 [가설과 가설 집합](map.html?s=sl&n=hypothesis-class)에 있습니다. 이 뒤의 노드에서는 $b$ 를 따로 쓰지 않습니다.

(12)가 로지스틱 회귀의 목적함수입니다. 합 안의 한 항을 표본 하나의 손실이라 부르고 다음처럼 적습니다.

$$
\begin{aligned}
\ell(\mathbf{w}) &= \sum_{i=1}^{n} \ell_i(\mathbf{w}) \\
\ell_i(\mathbf{w}) &= \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big)
\end{aligned}
$$

<div class="cal key">

**로지스틱이라는 가정이 쓰인 곳은 (7)과 (8)뿐입니다**

(1)부터 (6)까지는 어떤 모형에서도 같습니다. (9)부터 (12)까지는 로그와 부호의 정리입니다. 가정을 바꾸면 (7)과 (8)에 넣는 식이 바뀌고 그 식의 로그가 어떤 모양이냐에 따라 끝에 남는 손실이 정해집니다.

</div>

### 선형회귀와 갈리는 줄

| 모형 | (1)부터 (6) | (7), (8)에 넣는 것 | 끝에 남는 손실 |
|---|---|---|---|
| [선형회귀, 가우시안 노이즈](map.html?s=sl&n=lr-gaussian-noise-mse) | 같다 | 가우시안 밀도 | 제곱 오차 |
| [선형회귀, 라플라스 노이즈](map.html?s=sl&n=lr-laplace-noise-mae) | 같다 | 라플라스 밀도 | 절댓값 오차 |
| 로지스틱 회귀 | 같다 | 로지스틱 함수로 쓴 확률 | $\log(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i})$ |

가우시안 밀도는 지수 안에 제곱이 있어서 로그를 취하면 제곱이 남았습니다. 로지스틱 함수는 분모에 $1+e^{(\cdot)}$ 이 있어서 로그를 취하면 $\log(1+e^{(\cdot)})$ 이 남습니다. 손실은 따로 고르는 것이 아닙니다. 가정한 확률식에 음의 로그를 취하면 정해집니다.

### 부호를 틀리기 쉬운 세 곳

1. (8)의 지수: $-y_i$ 입니다. 음수 부호를 빠뜨리면 두 클래스의 확률이 뒤바뀝니다.
2. (9)에서 (10): $\log\frac{1}{a} = -\log a$ 라서 합 앞에 음수 부호가 생깁니다. 이 부호를 놓치면 (11)에서 최소화로 넘어갈 이유가 사라집니다.
3. (10)에서 (11): 음수 부호를 떼는 일과 $\arg\max$ 를 $\arg\min$ 으로 바꾸는 일은 한 묶음입니다. 하나만 하면 틀립니다.

레이블의 집합도 함께 확인합니다. (8)은 $y_i \in \{-1, +1\}$ 일 때만 성립합니다.

### 손실 한 항이 말하는 것

$\ell_i(\mathbf{w})$ 는 $y_i\mathbf{w}^T\mathbf{x}_i$ 하나로 정해집니다. 이 값이 양수이면 선형식의 부호와 레이블이 같다는 뜻이고 표본이 맞는 쪽에 놓여 있습니다.

| $y_i\mathbf{w}^T\mathbf{x}_i$ | 표본의 자리 | $\ell_i(\mathbf{w})$ |
|---|---|---|
| 큰 양수 | 맞는 쪽 깊숙이 | 0에 가깝다 |
| $2$ | 맞는 쪽 | $\log(1+e^{-2}) \approx 0.127$ |
| $0$ | 경계 위 | $\log 2 \approx 0.693$ |
| $-2$ | 틀린 쪽 | $\log(1+e^{2}) \approx 2.127$ |
| 큰 음수 | 틀린 쪽 깊숙이 | 대략 $-y_i\mathbf{w}^T\mathbf{x}_i$ 만큼 크다 |

맞게 분류한 표본은 손실을 거의 내지 않고 틀린 쪽으로 멀리 간 표본일수록 손실이 큽니다. 이 합을 줄이는 $\mathbf{w}$ 는 관측된 레이블에 높은 확률을 주는 $\mathbf{w}$ 입니다.

## 흔한 오해

<div class="cal trap">

**$P(\mathbf{x}_i)$ 는 값이 0이라서 사라진다**

0이라서가 아니라 $\mathbf{w}$ 와 무관해서 버립니다. $\sum_i \log P(\mathbf{x}_i)$ 는 $\mathbf{w}$ 를 어떻게 바꿔도 같은 값이라 최댓값의 위치를 옮기지 못합니다.

</div>

<div class="cal trap">

**마지막 식은 $\arg\max_{\mathbf{w}} \sum_i \log(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i})$ 다**

최대화하는 것은 음수 부호가 붙은 (10)입니다. 부호를 뗐으면 최소화입니다. 부호 없는 합을 최대화하면 모든 표본을 틀린 쪽으로 멀리 보내는 $\mathbf{w}$ 를 찾게 됩니다.

</div>

## 확인 질문

<div class="cal q">

빈 종이에 (1)부터 (12)까지를 보지 않고 써 보세요. 다 쓴 뒤 세 가지를 표시합니다. i.i.d. 가정을 쓴 줄, $\mathbf{w}$ 와 무관해서 버린 항, 로지스틱 회귀의 가정이 처음 들어온 줄입니다.

</div>

<details class="solve">
<summary>답 보기</summary>

i.i.d. 가정은 (3)에서 씁니다. 전체 확률을 표본별 확률의 곱으로 쓰는 줄입니다.

버린 항은 (6)의 둘째 합 $\sum_{i=1}^{n} \log P(\mathbf{x}_i)$ 입니다.

로지스틱 회귀의 가정은 (7)에서 처음 들어옵니다. 그 앞의 여섯 줄은 선형회귀에서도 글자 그대로 같습니다.

쓰다가 막혔다면 어느 묶음에서 막혔는지를 봅니다. 첫째와 둘째 묶음이라면 [조건부 우도](map.html?s=sl&n=conditional-likelihood)를, 셋째 묶음이라면 [통합식](map.html?s=sl&n=label-pm1-unified)을 다시 봅니다.

</details>

<div class="cal q">

표본이 둘 있고 $\mathbf{w}^T\mathbf{x}_1 = \ln 4$, $y_1 = +1$ 이며 $\mathbf{w}^T\mathbf{x}_2 = \ln 4$, $y_2 = -1$ 입니다. 각 표본의 확률 $P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 와 손실 $\ell_i(\mathbf{w})$ 를 구하세요. 두 손실의 합이 두 확률의 곱에 음의 로그를 취한 값과 같은지도 확인해 보세요.

</div>

<details class="solve">
<summary>답 보기</summary>

첫째 표본은 $y_1\mathbf{w}^T\mathbf{x}_1 = \ln 4$ 입니다.

$$
\begin{aligned}
P(y_1 \mid \mathbf{x}_1 ; \mathbf{w}) &= \frac{1}{1+\frac{1}{4}} = \frac{4}{5} \\
\ell_1(\mathbf{w}) &= \log\frac{5}{4} \approx 0.223
\end{aligned}
$$

둘째 표본은 $y_2\mathbf{w}^T\mathbf{x}_2 = -\ln 4$ 입니다.

$$
\begin{aligned}
P(y_2 \mid \mathbf{x}_2 ; \mathbf{w}) &= \frac{1}{1+4} = \frac{1}{5} \\
\ell_2(\mathbf{w}) &= \log 5 \approx 1.609
\end{aligned}
$$

손실의 합은 $\log\frac{5}{4} + \log 5 = \log\frac{25}{4} \approx 1.833$ 입니다. 확률의 곱은 $\frac{4}{5} \cdot \frac{1}{5} = \frac{4}{25}$ 이고 음의 로그는 $\log\frac{25}{4}$ 로 같습니다. 목적함수가 음의 로그우도라는 것을 숫자로 본 것입니다. 같은 입력인데도 레이블이 선형식의 부호와 어긋난 둘째 표본이 손실의 대부분을 냅니다.

</details>
