---
title: prior를 더한 MAP 버전
en: MAP objective with a Gaussian prior
parent: logistic-regression
order: 70
summary: 가우시안 prior를 두고 MAP로 풀면 MLE의 목적함수는 그대로이고 끝에 계수 제곱의 벌점 하나가 붙습니다. 매개변수 앞의 세미콜론이 막대로 바뀌는 이유도 여기서 정리합니다.
signal: emph
related: [map-posterior, ridge-map-gaussian-prior]
---

<div class="cal extra">

**MLE에서 MAP까지 전개합니다**

출제 예고가 있는 Logistic 전개에는 Gaussian prior를 더하는 MAP도 포함됩니다. -1/+1 레이블의 통합 확률, 음의 로그우도, 양의 L2 벌점이 연결돼야 합니다. 모의시험 C3에서 함께 확인합니다. prior 분산의 특정 숫자보다 평균 0인 Gaussian 가정과 벌점의 모양을 먼저 확인합니다.

</div>

## 왜 필요한가

MLE는 데이터가 관측될 확률만 보고 $\mathbf{w}$ 를 정합니다. 선형회귀에서는 여기에 "$\mathbf{w}$ 는 0 근처에 있을 것"이라는 prior를 더해 [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)를 얻었습니다. 로지스틱 회귀에도 같은 일을 할 수 있습니다.

새로 외울 것은 거의 없습니다. 우도에서 나오는 항은 MLE 때와 한 글자도 다르지 않고 prior에서 나오는 항이 끝에 하나 붙습니다.

## 정의와 수식

MAP는 $\mathbf{w}$ 를 확률변수로 보고 데이터를 본 뒤의 확률 $P(\mathbf{w} \mid D)$ 를 최대화합니다.

$$
\begin{aligned}
\hat{\mathbf{w}}
&= \arg\max_{\mathbf{w}} P(\mathbf{w} \mid D) \\
&= \arg\max_{\mathbf{w}} P(D \mid \mathbf{w})\, P(\mathbf{w})
\end{aligned}
$$

여기서 로그를 취하고 부호를 뒤집는 전개는 [MAP와 posterior](map.html?s=sl&n=map-posterior)에 줄 단위로 있습니다. 결과만 가져오면 최소화할 것은 두 항의 합입니다.

$$
\begin{aligned}
\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \Big[ & -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
& - \log P(\mathbf{w}) \Big]
\end{aligned}
$$

### 첫째 항은 그대로다

우도에서 온 항은 [MLE의 유도](map.html?s=sl&n=logreg-mle-objective)가 이미 정리해 두었습니다. 레이블은 $y_i \in \{-1, +1\}$ 입니다.

$$
\begin{aligned}
& -\sum_{i=1}^{n} \log P(y_i \mid \mathbf{x}_i ; \mathbf{w}) \\
&= \sum_{i=1}^{n} \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big)
\end{aligned}
$$

### 둘째 항만 새로 전개한다

평균이 0인 가우시안 prior를 둡니다.

$$
P(\mathbf{w}) \propto \exp\!\left(-\frac{\mathbf{w}^T\mathbf{w}}{2\tau^2}\right)
$$

음의 로그를 취하면 로그가 지수를 벗기고 음수 부호 둘이 만나 양수가 됩니다.

$$
-\log P(\mathbf{w}) = \frac{\mathbf{w}^T\mathbf{w}}{2\tau^2} + \text{const}
$$

두 항을 더하고 상수를 버리면 MAP의 목적함수가 나옵니다.

$$
\begin{aligned}
\hat{\mathbf{w}} = \arg\min_{\mathbf{w}} \Big[ & \sum_{i=1}^{n} \log\big(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i}\big) \\
& + \lambda\,\mathbf{w}^T\mathbf{w} \Big]
\end{aligned}
$$

여기서 $\lambda = \frac{1}{2\tau^2}$ 입니다. [ridge](map.html?s=sl&n=ridge-map-gaussian-prior)의 $\lambda$ 와 식이 다른 것은 거기서는 손실을 평균 꼴로 맞추느라 목적함수 전체에 상수를 곱했기 때문입니다. prior의 폭 $\tau$ 를 좁게 잡을수록 $\mathbf{w}$ 가 0 근처에 있다고 강하게 믿는 것이고 그만큼 $\lambda$ 가 커져 벌점이 세집니다. $\mathbf{w}^T\mathbf{w}$ 는 $\lVert\mathbf{w}\rVert_2^2$ 와 같은 값입니다.

prior를 라플라스로 바꿔도 달라지는 것은 이 마지막 항뿐이고 그때는 $\lambda\lVert\mathbf{w}\rVert_1$ 이 붙습니다. 선형회귀에서 [lasso](map.html?s=sl&n=lasso-map-laplace-prior)가 나온 것과 같은 계산입니다.

### 세미콜론이 막대로 바뀐 이유

| | MLE | MAP |
|---|---|---|
| $\mathbf{w}$ 를 보는 눈 | 값이 정해져 있는 미지수 | 분포를 가진 확률변수 |
| 최대화하는 것 | $P(D ; \mathbf{w})$ | $P(\mathbf{w} \mid D)$ |
| 목적함수 | $\sum_i \log(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i})$ | 왼쪽에 $\lambda\mathbf{w}^T\mathbf{w}$ 를 더한 것 |

MLE에서 $\mathbf{w}$ 는 확률변수가 아니라서 조건으로 걸 수 없었고 그래서 세미콜론으로 구분했습니다. MAP에서는 $\mathbf{w}$ 가 분포 $P(\mathbf{w})$ 를 가진 확률변수입니다. $P(D \mid \mathbf{w})$ 와 $P(\mathbf{w} \mid D)$ 처럼 조건부확률의 막대를 쓰는 것이 그 표시입니다. 표본 하나의 확률 $P(y_i \mid \mathbf{x}_i ; \mathbf{w})$ 는 MLE에서 쓴 식을 그대로 가져온 것이라 같은 모양으로 둡니다.

<div class="cal key">

**바뀌는 것은 마지막 항 하나입니다**

MLE의 목적함수에 $\lambda\mathbf{w}^T\mathbf{w}$ 가 더해집니다. 이 항을 만든 가정은 $\mathbf{w}$ 의 prior가 평균 0인 가우시안이라는 것입니다.

</div>

## 흔한 오해

<div class="cal trap">

**MAP는 우도에 prior를 더한 값을 최대화한다**

확률끼리는 곱합니다. 최대화하는 것은 $P(D \mid \mathbf{w})\,P(\mathbf{w})$ 입니다. 덧셈이 되는 것은 로그를 취한 뒤이고 목적함수에서 벌점이 더해지는 꼴로 보이는 것도 그래서입니다.

</div>

<div class="cal trap">

**MAP로 바꾸면 우도에서 나온 항의 모양도 달라진다**

$\sum_i \log(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i})$ 는 그대로입니다. 달라지는 것은 끝에 붙는 항 하나입니다.

</div>

## 확인 질문

<div class="cal q">

레이블이 -1/+1인 Logistic 모형에서 시작합니다. i.i.d. 표본의 우도를 쓰고, 음의 로그를 취해 MLE 목적함수를 만드세요. 이어 평균이 0인 Gaussian prior를 곱해 MAP 목적함수를 쓰세요. 데이터 손실과 벌점은 각각 어느 가정에서 나왔습니까?

</div>

<details class="solve">
<summary>답 보기</summary>

$$
\begin{aligned}
P(y_i\mid\mathbf x_i;\mathbf w)&=\frac{1}{1+e^{-y_i\mathbf w^T\mathbf x_i}},\\
P(D;\mathbf w)&=\prod_{i=1}^n P(y_i\mid\mathbf x_i;\mathbf w),\\
J_{\mathrm{MLE}}(\mathbf w)&=\sum_{i=1}^n\log(1+e^{-y_i\mathbf w^T\mathbf x_i}).
\end{aligned}
$$

여기서는 입력을 고정했고, 편향은 가중치에 흡수했습니다. 평균 0인 Gaussian prior를 곱하고 음의 로그를 취하면

$$
J_{\mathrm{MAP}}(\mathbf w)=J_{\mathrm{MLE}}(\mathbf w)+\lambda\mathbf w^T\mathbf w
$$

가 됩니다. $\lambda>0$ 이고 prior의 분산으로 정해집니다. 데이터 손실은 Logistic 관측모형에서, L2 벌점은 Gaussian prior에서 나옵니다. prior만 바꾸면 데이터 손실은 바뀌지 않습니다.

</details>
