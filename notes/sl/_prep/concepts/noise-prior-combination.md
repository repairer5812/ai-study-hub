---
title: 노이즈 가정과 prior 가정은 따로 고른다
en: Combining noise and prior assumptions
parent: linear-regression
order: 130
summary: 목적함수의 손실은 노이즈의 분포에서 나오고 벌점은 계수의 prior에서 나옵니다. 두 가정은 서로 독립인 선택이라 어떤 조합이든 같은 순서로 유도할 수 있습니다.
signal: emph
related: []
---

## 왜 필요한가

지금까지 가정을 두 번 바꿔 봤습니다. 노이즈를 [가우시안](map.html?s=sl&n=lr-gaussian-noise-mse)에서 [라플라스](map.html?s=sl&n=lr-laplace-noise-mae)로 바꾸니 손실이 MSE에서 MAE로 바뀌었습니다. prior를 [가우시안](map.html?s=sl&n=ridge-map-gaussian-prior)에서 [라플라스](map.html?s=sl&n=lasso-map-laplace-prior)로 바꾸니 벌점이 L2에서 L1으로 바뀌었습니다.

두 번 모두 한쪽을 바꿀 때 다른 쪽은 건드리지 않았습니다. 우연이 아닙니다. 노이즈의 분포는 데이터가 직선 둘레에 어떻게 퍼지는지에 대한 가정입니다. prior는 계수가 어떻게 생겨야 하는지에 대한 가정입니다. 서로 다른 대상에 거는 가정이라 따로 고를 수 있습니다. 이 노드는 조합을 한 표에 모으고 앞에서 다루지 않은 조합도 같은 순서로 유도된다는 것을 확인합니다.

## 정의와 수식

[MAP](map.html?s=sl&n=map-posterior)의 목적함수는 두 조각의 합입니다.

$$
\begin{aligned}
\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \Big[ & \underbrace{-\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w})}_{\text{from the noise}} \\
& \underbrace{- \log P(\mathbf{w})}_{\text{from the prior}} \Big]
\end{aligned}
$$

앞 조각에는 노이즈의 밀도만 들어가고 뒤 조각에는 prior의 밀도만 들어갑니다. 노이즈 가정 둘과 prior 가정 셋을 짝지으면 여섯 가지입니다. 예측 빼기 정답을 $r_i = \mathbf{w}^T\mathbf{x}_i - y_i$ 로 줄여 씁니다.

| 노이즈 | prior | 최소화하는 목적함수 | 이름 |
|---|---|---|---|
| 가우시안 | 없음 | $\frac{1}{n} \sum_i r_i^2$ | MSE |
| 라플라스 | 없음 | $\frac{1}{n} \sum_i \lvert r_i \rvert$ | MAE |
| 가우시안 | 가우시안 | $\frac{1}{n} \sum_i r_i^2 + \lambda \lVert \mathbf{w} \rVert_2^2$ | ridge |
| 가우시안 | 라플라스 | $\frac{1}{n} \sum_i r_i^2 + \lambda \lVert \mathbf{w} \rVert_1$ | lasso |
| 라플라스 | 가우시안 | $\frac{1}{n} \sum_i \lvert r_i \rvert + \lambda \lVert \mathbf{w} \rVert_2^2$ | MAE에 L2 벌점 |
| 라플라스 | 라플라스 | $\frac{1}{n} \sum_i \lvert r_i \rvert + \lambda \lVert \mathbf{w} \rVert_1$ | MAE에 L1 벌점 |

prior가 없다는 것은 MLE로 푼다는 뜻입니다. 노이즈 열만 보면 손실이 정해지고 prior 열만 보면 벌점이 정해집니다. 아래 두 행에는 따로 붙은 이름이 없습니다. 가우시안과 라플라스가 로그를 지나며 무엇을 남기는지는 [두 노이즈를 나란히 놓은 표](map.html?s=sl&n=lr-laplace-noise-mae)에 있습니다.

<div class="cal key">

**손실은 노이즈가 정하고 벌점은 prior가 정합니다**

목적함수를 보고 가정을 거꾸로 읽을 수도 있습니다. 손실이 제곱이면 노이즈가 가우시안이고 절댓값이면 라플라스입니다. 벌점이 없으면 MLE이고 L2이면 가우시안 prior, L1이면 라플라스 prior입니다.

</div>

**노이즈와 prior가 모두 라플라스일 때.** 표의 마지막 행을 처음부터 유도합니다. 가정은 둘입니다. 노이즈의 척도는 $b$ 로 적고 prior의 척도는 $\tau$ 로 적어 구별합니다. $C$ 는 prior의 정규화 상수입니다.

$$
\begin{aligned}
P(y_i \mid \mathbf{x}_i ; \mathbf{w}) &= \frac{1}{2b} \exp\!\left( -\frac{\lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert}{b} \right) \\
P(\mathbf{w}) &= C \exp\!\left( -\frac{\lVert \mathbf{w} \rVert_1}{\tau} \right)
\end{aligned}
$$

유도는 일곱 걸음입니다. 다섯째 걸음은 길어서 두 줄에 나눠 적었습니다.

$$
\begin{aligned}
\hat{\mathbf{w}}
&= \arg\max_{\mathbf{w}} P(\mathbf{w} \mid D) \\
&= \arg\max_{\mathbf{w}} P(D \mid \mathbf{w})\, P(\mathbf{w}) \\
&= \arg\max_{\mathbf{w}} \prod_{i=1}^{n} P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \, P(\mathbf{w}) \\
&= \arg\max_{\mathbf{w}} \sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) + \log P(\mathbf{w}) \\
&= \arg\max_{\mathbf{w}} \sum_{i=1}^{n} \left[ \log \frac{1}{2b} - \frac{\lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert}{b} \right] \\
&\qquad\qquad + \log C - \frac{\lVert \mathbf{w} \rVert_1}{\tau} \\
&= \arg\min_{\mathbf{w}} \frac{1}{b} \sum_{i=1}^{n} \lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert + \frac{1}{\tau} \lVert \mathbf{w} \rVert_1 \\
&= \arg\min_{\mathbf{w}} \frac{1}{n} \sum_{i=1}^{n} \lvert \mathbf{w}^T\mathbf{x}_i - y_i \rvert + \lambda \lVert \mathbf{w} \rVert_1
\end{aligned}
$$

1. 첫째 걸음: MAP는 posterior를 최대화합니다.
2. 둘째 걸음: Bayes rule을 쓰고 $\mathbf{w}$ 와 무관한 $P(D)$ 를 뺍니다.
3. 셋째 걸음: i.i.d. 가정으로 우도를 표본별 밀도의 곱으로 씁니다. $\mathbf{w}$ 와 무관한 $P(\mathbf{x}_i)$ 는 뺐습니다. 근거는 [조건부 우도](map.html?s=sl&n=conditional-likelihood)에 있습니다.
4. 넷째 걸음: 로그를 취합니다. 곱이 합이 되면서 우도 쪽과 prior 쪽이 갈라집니다.
5. 다섯째 걸음: 두 밀도를 넣습니다. **대괄호 안이 노이즈 가정의 자리이고 그 아랫줄이 prior 가정의 자리입니다.**
6. 여섯째 걸음: 상수 $\log \frac{1}{2b}$ 과 $\log C$ 를 지우고 부호를 떼면서 최대화를 최소화로 바꿉니다.
7. 일곱째 걸음: 전체에 양의 상수 $\frac{b}{n}$ 을 곱합니다. 벌점 앞의 상수는 $\lambda = \frac{b}{n\tau}$ 로 묶입니다.

**한 자리만 바꾸면 다른 행이 나옵니다.** 다섯째 걸음에서 prior의 자리를 가우시안의 $\log C - \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}$ 로 바꾸면 여섯째 걸음의 둘째 항이 $\frac{1}{2\tau^2}\,\mathbf{w}^T\mathbf{w}$ 가 되고 마지막은 MAE에 L2 벌점이 붙은 꼴이 됩니다. 노이즈의 자리를 가우시안으로 되돌리면 lasso가 됩니다. 한쪽을 바꿀 때 다른 쪽 줄은 그대로입니다.

같은 원리는 선형회귀 밖에서도 통합니다. 우도 쪽을 로지스틱 회귀의 것으로 바꾸고 prior를 가우시안으로 두면 [로지스틱 손실에 L2 벌점이 붙습니다](map.html?s=sl&n=logreg-map).

## 흔한 오해

<div class="cal trap">

**L1 벌점은 라플라스 노이즈에서 나오고 L2 벌점은 가우시안 노이즈에서 나온다**

벌점은 노이즈가 아니라 prior에서 나옵니다. 노이즈가 정하는 것은 손실입니다. lasso는 가우시안 노이즈에 라플라스 prior를 둔 것이라 손실은 MSE이고 벌점만 L1입니다.

</div>

<div class="cal trap">

**MSE에는 L2가 짝이고 MAE에는 L1이 짝이라서 다른 조합은 유도할 수 없다**

두 가정은 독립이라 여섯 조합이 모두 같은 순서로 유도됩니다. 그 가운데 이름이 붙은 조합이 ridge와 lasso입니다.

</div>

## 확인 질문

<div class="cal q">

위 유도에서 노이즈만 가우시안 $\mathcal{N}(0, \sigma^2)$ 으로 되돌립니다. 다섯째, 여섯째, 일곱째 걸음을 다시 쓰고 어느 항이 바뀌었는지 표시하세요. 여섯째에서 일곱째로 갈 때 곱하는 상수도 달라집니까?

</div>

<details class="solve">
<summary>답 보기</summary>

$$
\begin{aligned}
& \hat{\mathbf{w}} \\
&= \arg\max_{\mathbf{w}} \sum_{i=1}^{n} \bigg[ \log \frac{1}{\sqrt{2\pi\sigma^2}} \\
&\qquad\qquad - \frac{(\mathbf{w}^T\mathbf{x}_i - y_i)^2}{2\sigma^2} \bigg] \\
&\qquad\qquad + \log C - \frac{\lVert \mathbf{w} \rVert_1}{\tau} \\
&= \arg\min_{\mathbf{w}} \frac{1}{2\sigma^2} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \frac{1}{\tau} \lVert \mathbf{w} \rVert_1 \\
&= \arg\min_{\mathbf{w}} \frac{1}{n} \sum_{i=1}^{n} (\mathbf{w}^T\mathbf{x}_i - y_i)^2 + \lambda \lVert \mathbf{w} \rVert_1
\end{aligned}
$$

바뀐 것은 대괄호 안과 거기서 나온 첫째 항뿐입니다. prior에서 온 항은 한 글자도 바뀌지 않았습니다. 곱하는 상수는 손실 앞의 계수를 $\frac{1}{n}$ 으로 맞추는 값이므로 $\frac{b}{n}$ 에서 $\frac{2\sigma^2}{n}$ 으로 달라집니다. 결과는 lasso입니다.

</details>

<div class="cal q">

같은 유도에서 이번에는 prior를 아예 없앱니다. 일곱 걸음 가운데 어느 걸음과 어느 항이 사라집니까? 남는 결과는 무엇입니까?

</div>

<details class="solve">
<summary>답 보기</summary>

첫째와 둘째 걸음이 $\arg\max_{\mathbf{w}} P(D ; \mathbf{w})$ 한 줄로 줄어듭니다. posterior와 Bayes rule을 쓸 일이 없기 때문입니다. 셋째 걸음부터는 $P(\mathbf{w})$ 에서 온 항이 모두 사라집니다. 셋째의 $P(\mathbf{w})$, 넷째의 $\log P(\mathbf{w})$, 다섯째의 $\log C - \frac{\lVert \mathbf{w} \rVert_1}{\tau}$, 여섯째의 $\frac{1}{\tau} \lVert \mathbf{w} \rVert_1$, 일곱째의 $\lambda \lVert \mathbf{w} \rVert_1$ 입니다.

남는 것은 [라플라스 노이즈의 MLE](map.html?s=sl&n=lr-laplace-noise-mae)이고 결과는 MAE입니다. MAP 유도는 MLE 유도에 prior에서 온 항을 얹은 것입니다.

</details>
