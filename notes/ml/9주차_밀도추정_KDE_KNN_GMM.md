# 기계학습 9주차

# 비지도학습과 밀도 추정 (Density Estimation): KDE, KNN, GMM

8주차는 중간고사로 수업이 없었으며, 9주차부터 지도학습에서 비지도학습으로 패러다임이 전환됩니다. 이번 주차는 비지도학습의 출발점인 **밀도 추정(Density Estimation)** 의 수학적 기초와 두 가지 비모수적 방법(**KDE, KNN**), 그리고 모수적 방법인 **GMM** 까지 다룹니다. 다음 주차에서 다룰 EM 알고리즘의 동기 부여로 마무리됩니다.

---

## 1. 🧭 비지도학습 (Unsupervised Learning) 개요

### 지도학습 리마인드
- 레이블(정답) 정보가 있는 인풋 데이터를 다룸. 인풋이 어떤 클래스/카테고리에 속하는지 예측하는 것이 목적.

### 비지도학습 정의 (슬라이드 직접 인용)
- 슬라이드 원문: "we are confronted with data that do not come with labeled outcomes."
- 목표: target variable을 예측하는 것이 아니라 **데이터 자체에 내재된 underlying structure를 발견**.
- 즉, input → label 매핑을 배우는 대신, 관측 데이터 안의 **patterns, regularities, hidden organization** 을 식별.

### 💡 교수님 예시
- 인풋이 이미지일 때 "강아지인지 고양이인지" 정답이 없으므로, 인풋 피처만 가지고 다른 인풋과 어떻게 다른지 추론해야 함.
- **핵심 목표**: 인풋 데이터의 **데이터 분포(Distribution)** 를 추정하는 것 (A와 B가 어떻게 다른지 레이블 없이 파악).

### 슬라이드 비교 그림
- 좌측(Supervised): 빨강 ▲ vs 파랑 ■ — 새 점이 들어왔을 때 어느 쪽인지 예측.
- 우측(Unsupervised): 색·모양 정보 없이 점만 있고, 그것들이 자연스럽게 형성하는 그룹(클러스터)을 발견.

---

## 2. 🎯 밀도 추정 (Density Estimation) 의 정의와 직관

### 정의 (슬라이드 직접 인용)
> Density estimation involves learning an approximation of the true underlying data distribution $p(\mathbf{x})$ from a finite sample by constructing a probabilistic model that **assigns high probability to regions where data are concentrated** and **low probability to regions where data are sparse**.

### 핵심 한 줄
- 어떤 한 지점에 대해 데이터가 얼마나 밀집되어 분포하는가(밀도)를 유한 샘플로부터 추정하는 기법.
- 슬라이드 그림: 빨간 막대(데이터 1점씩)가 분포된 위로 점선(true density)과 실선(estimated density)이 그려져 있음. 데이터 많은 곳은 봉우리(peak), 적은 곳은 골짜기(trough).

---

## 3. 🧮 밀도 추정의 수학적 유도 (★★★ 시험 매우 중요)

이 챕터의 유도 4단계는 KDE와 KNN의 공통 출발점입니다. **모든 표기는 슬라이드 그대로** 가져왔습니다.

### Step 1. 지역(Region) $R$ 설정
- $D$차원 공간의 어느 점 $\mathbf{x}$ 주변에 작은 지역 $R$을 잡고, 데이터가 그 안에 떨어질 확률을 대문자 $P$로 표기.
$$P = \int_R p(\mathbf{x})\,d\mathbf{x}$$

### Step 2. 이항 분포 (Binomial Distribution) 적용
- 분포 $p(\mathbf{x})$로부터 $N$개의 독립 관측 데이터를 뽑을 때, 각 데이터가 $R$ 안에 들어갈 확률은 $P$, 밖으로 나갈 확률은 $1-P$.
- $R$ 안에 들어가는 데이터 개수를 $K$라 하면 $K$는 이항 분포를 따름:
$$\text{Bin}(K\mid N, P) = \binom{N}{K} P^K (1-P)^{N-K}$$

### Step 3. 큰 $N$ 극한에서 경험적 추정
- 기댓값과 분산:
$$\mathbb{E}\!\left[\frac{K}{N}\right] = P, \quad \text{var}\!\left[\frac{K}{N}\right] = \frac{P(1-P)}{N}$$
- 💡 **$N$이 매우 크면** 분산이 0으로 수렴 → $K/N$이 $P$에 매우 가까워짐:
$$P \approx \frac{K}{N}$$

### Step 4. 작은 $R$ 극한에서 밀도 근사
- 지역 $R$이 매우 작으면 그 안에서 $p(\mathbf{x})$를 상수로 취급 가능 → 적분이 단순 곱으로 근사:
$$P \approx p(\mathbf{x}) \cdot V$$
- 여기서 $V$는 $R$의 부피(1D면 길이, 2D면 면적, 3D면 부피, $D$차원이면 $h^D$).

### 💡 최종 공식 (★★★ 반드시 암기)
두 근사식을 결합:
$$\boxed{p(\mathbf{x}) \approx \frac{K}{NV}}$$

해석: 어떤 포인트의 밀도 함수 값은, 랜덤으로 뽑은 $N$개 중 그 지역($V$)에 속하는 데이터 개수($K$)의 비율로 추정 가능.

---

## 4. 🔱 밀도 추정의 두 갈래 (출제 포인트 💡)

공식 $p(\mathbf{x}) \approx K/(NV)$에서 $N$은 전체 데이터 개수로 고정이므로, **$K$ 와 $V$ 중 무엇을 고정하느냐**에 따라 방법이 갈립니다.

| 방법 | 고정 | 변하는 값 | 설명 |
|------|------|---------|------|
| **Kernel Density Estimation (KDE)** | $V$ (지역 크기) | $K$ (그 안 데이터 수) | "박스 사이즈를 정해놓고 안에 몇 개 들었는지 센다" |
| **K-Nearest Neighbors (KNN) Density Estimator** | $K$ (이웃 개수) | $V$ (그만큼 모일 때까지 영역 확장) | "$K$개를 채울 때까지 영역을 부풀린다" |

> 📝 두 방법은 **같은 공식의 양면**입니다. 어느 쪽을 변수로 두느냐가 차이일 뿐.

---

## 5. 🧊 Kernel Density Estimation (KDE)

### 5.1. 히스토그램 (Histogram) — KDE의 가장 단순한 특수 케이스
- 슬라이드: "The histogram can be viewed as a special case of the first approach."
- $V$가 고정 너비의 bin이고, 각 bin 내 관측 수를 카운트한 뒤 부피로 나눠 정규화.
- **한계**: bin 경계가 고정 → 결과가 **불연속(discrete)**, 경계 위치에 따라 모양이 크게 흔들림.

### 5.2. KDE의 발상
- 슬라이드: 고정된 박스에 갇히지 않고, 모든 점 $\mathbf{x}$를 따라 **윈도우를 부드럽게 슬라이딩**시키며 그 위치에서의 밀도를 계산.
- 이를 형식화하기 위해 **커널 함수 (Kernel Function)** 도입.

### 5.3. ① Box (Uniform) Kernel — 슬라이드 직접 인용 수식
- 변의 길이가 $h$ (Bandwidth, 대역폭)인 $D$차원 하이퍼큐브.
- 데이터 점 $\mathbf{x}^{(n)}$이 큐브 내부에 있는지 판정:
$$k\!\left(\frac{\mathbf{x}-\mathbf{x}^{(n)}}{h}\right) = \begin{cases} 1, & |x_i - x_i^{(n)}| \le h/2,\ i=1,\dots,D \\ 0, & \text{otherwise} \end{cases}$$
- 큐브 내 데이터 수:
$$K = \sum_{n=1}^{N} k\!\left(\frac{\mathbf{x}-\mathbf{x}^{(n)}}{h}\right)$$
- 최종 밀도 추정:
$$p(\mathbf{x}) = \frac{K}{NV} = \frac{1}{N}\sum_{n=1}^{N} \frac{1}{h^D}\,k\!\left(\frac{\mathbf{x}-\mathbf{x}^{(n)}}{h}\right) \quad (V = h^D)$$

### 5.4. ② Gaussian Kernel — 슬라이드 직접 인용 수식
- Box Kernel은 경계에서 1↔0이 끊기지만, Gaussian은 거리에 따라 **부드럽게(smooth) 감소**.
$$p(\mathbf{x}) = \frac{1}{N}\sum_{n=1}^{N} \frac{1}{(2\pi h^2)^{1/2}}\exp\!\left(-\frac{\|\mathbf{x}-\mathbf{x}^{(n)}\|^2}{2h^2}\right)$$
- 여기서 $h$ = **표준편차(σ)** 역할 → 대역폭이 곧 가우시안의 spread를 결정.

### 5.5. 다양한 커널 함수
- 슬라이드는 sklearn의 6가지 커널을 보여줌: **Gaussian, Tophat(Box), Epanechnikov, Exponential, Linear, Cosine**.
- 어떤 커널을 쓰느냐는 결과의 부드러움(smoothness)에 영향.

### 💡 5.6. Bandwidth 파라미터 $h$의 중요성 (★★★ 시험 단골)
| $h$ | 결과 |
|-----|------|
| 너무 작음 ($h$ 작음) | **노이즈 심함(spiky)** — 데이터 1점 1점에 뾰족한 봉우리. 슬라이드 예: $h=0.005$. |
| 적절 | **best density model** — 슬라이드 예: $h=0.07$. |
| 너무 큼 ($h$ 큼) | **Over-smoothing** — bimodal(두 봉우리)인 진짜 분포가 하나로 뭉뚱그려짐. 슬라이드 예: $h=0.2$. |

### KDE의 근본적 한계 (다음 절 KNN의 등장 이유)
> 슬라이드 인용: "$h$ is the same for all kernels, regardless of how the data is spread out."
- 데이터 밀집 지역과 희소 지역에 **동일한 $h$** 를 사용 → 한쪽에서는 oversmooth, 다른 쪽에서는 noisy.
- 즉, **공간에 따라 최적 $h$가 다르다** 는 점이 KDE의 약점.

---

## 6. 🔘 K-Nearest Neighbors (KNN) Density Estimator

### 6.1. 발상의 전환
- KDE: 영역 크기 $V$ 고정, 데이터 수 $K$ 카운트 → 밀집 지역과 희소 지역에 같은 잣대.
- KNN: **$K$를 고정**하고, 그 $K$개를 채울 때까지 **$V$를 늘림** → 밀집한 곳은 작은 영역으로, 희소한 곳은 큰 영역으로 자동 적응.

### 6.2. 작동 원리 (슬라이드 직접 인용)
- For a given point $\mathbf{x}$, expand a region (예: 구) until it contains exactly $K$ data points.
$$p(\mathbf{x}) \approx \frac{K}{NV}$$
- 데이터 밀집 지역 → $V$ 작음 → $p(\mathbf{x})$ 큼.
- 데이터 희소 지역 → $V$ 큼 → $p(\mathbf{x})$ 작음.

### 💡 6.3. 파라미터 $K$의 영향 (출제 포인트)
| $K$ | 결과 (슬라이드 예) |
|-----|-------------------|
| $K=1$ | **매우 노이지(noisy)**, 각 데이터 위로 비정상적으로 뾰족한 패턴 |
| $K=5$ | 적절한 추정 |
| $K=30$ | **Over-smoothed**, 진짜 분포의 bimodal 디테일 사라짐 |

### 6.4. KDE vs KNN 비교
| 항목 | KDE | KNN Density |
|------|-----|------------|
| 고정 변수 | $V$ (또는 $h$) | $K$ |
| 적응성 | 모든 위치에 동일 $h$ → 비적응적 | 위치마다 $V$ 자동 조정 → **적응적** |
| 의존 파라미터 | bandwidth $h$ | $K$ |
| 약점 | 밀집/희소 지역 동시 처리 어려움 | $K$ 고정 시에도 끝점 처리 등 한계 |

---

## 7. 🏷️ KNN Density Estimator를 분류기로 확장

슬라이드는 KNN density estimator를 **classification rule**로 자연스럽게 확장하는 과정을 보여줍니다.

### 7.1. 설정 (슬라이드 그림)
- 클래스 $C_c$ (예: $C_1$, $C_2$). 각 클래스에 속한 데이터 수 $N_c$. 전체 $\sum_c N_c = N$.
- 새 점 $\mathbf{x}$ 주변으로 영역(예: hypersphere)을 확장해 정확히 **$K$ 최근접 이웃**을 포함시킴. 그 영역의 부피를 $V$라 함.
- 그 $K$개 중 클래스 $C_c$에 속한 개수를 $K_c$.

### 7.2. 클래스 조건부 밀도, prior, posterior — 슬라이드 직접 인용
- **Class-conditional density**:
$$p(\mathbf{x}\mid C_c) \approx \frac{K_c}{N_c V}$$
- **Unconditional density**:
$$p(\mathbf{x}) = \frac{K}{NV}$$
- **Class prior**:
$$p(C_c) = \frac{N_c}{N}$$

### 💡 7.3. Bayes' Theorem 적용 → 매우 단순한 분류 규칙
- Posterior:
$$p(C_c \mid \mathbf{x}) = \frac{p(\mathbf{x}\mid C_c)\,p(C_c)}{p(\mathbf{x})} = \frac{K_c}{K}$$
- 의미: $\mathbf{x}$가 클래스 $C_c$에 속할 사후확률은 **$K$개의 최근접 이웃 중 $C_c$에 속한 비율** 일 뿐.
- 슬라이드: "Although this leads naturally to a simple classification rule, the underlying principle is still **density estimation**."

> 📝 즉, 우리가 흔히 아는 "**KNN 다수결 분류**" 가 알고 보면 밀도 추정 + Bayes 룰의 자연스러운 귀결이라는 점이 9주차의 통찰.

---

## 8. ⚖️ Parametric vs Non-Parametric — 사고 전환

### 8.1. Non-Parametric (지금까지의 KDE, KNN)
- 데이터가 특정 수학적 분포를 따른다고 가정하지 않음.
- **데이터 포인트 자체에 의존**해 분포 추정.
- 모델 복잡도가 데이터셋 크기에 비례해 커짐 (저장·계산량 부담).
- 지역 파라미터 ($h$ 또는 $K$)에 강하게 의존.

### 8.2. Parametric (다음 절 GMM)
- 분포가 특정 형태 (예: 정규분포)를 따른다고 가정.
- **소수의 파라미터** (평균, 분산 등) 만으로 표현.
- 모델 복잡도가 고정 (데이터셋 크기와 무관).

### 슬라이드의 시각적 비교
- 같은 데이터에 대해 KDE / Nearest-Neighbor / Mixture Models 세 가지가 서로 다른 형태의 추정을 만들어내는 그림.

---

## 9. 🧬 Gaussian Mixture Model (GMM) — Parametric의 대표

### 9.1. Mixture Model 개념 (슬라이드 직접 인용)
> An alternative strategy is to assume that the unknown density can be approximated by a **weighted combination of simpler parametric distributions**.
> Rather than placing one kernel at every data point, we represent the distribution using a **finite number of components** whose parameters are learned from the data.

### 9.2. GMM 정의 (슬라이드 직접 인용)
- "all the data points are generated from a mixture of a finite number of Gaussian distributions with unknown parameters."

### 💡 9.3. GMM의 수학적 정의 — ★★★ 핵심 수식
$$p(\mathbf{x}) = \sum_{k=1}^{K} \pi_k\,\mathcal{N}(\mathbf{x}\mid \boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)$$

GMM을 학습한다 = 다음 **3가지 파라미터** 를 찾는 것:
| 파라미터 | 이름 | 의미 |
|---------|------|------|
| $\pi_k$ | **Mixing coefficient (Prior)** | $k$번째 가우시안이 선택될 확률. $0 \le \pi_k \le 1$, $\sum_k \pi_k = 1$ |
| $\boldsymbol{\mu}_k$ | **Mean** | $k$번째 가우시안의 중심점 |
| $\boldsymbol{\Sigma}_k$ | **Covariance** | $k$번째 가우시안의 퍼짐(spread)과 방향 |

---

## 10. 🕵️ Latent Variable (잠재 변수) $\mathbf{z}$ 의 도입

### 10.1. 정의 (슬라이드 직접 인용)
> A latent variable, typically denoted by $\mathbf{z}$, is **not directly observed** but is assumed to influence how each data point $\mathbf{x}$ is generated.

### 💡 10.2. 교수님 비유 (구조방정식 모델 슬라이드)
- **Intelligence**(지능) 는 직접 측정 불가능한 잠재 변수 $\mathbf{z}$.
- 하지만 측정 가능한 SAT, 내신 GPA, ACT 점수 같은 **observable $\mathbf{x}$**에 영향을 줌.
- 슬라이드 그림에서 Intelligence → Academic Performance(0.8) → SAT/GPA/ACT 점수.

### 10.3. GMM에서의 $\mathbf{z}$ — 슬라이드 직접 인용
- 길이 $K$의 **One-hot 벡터**: $z_k = 1$이면 $k$번째 컴포넌트가 선택됨, 다른 $z_j = 0$ ($j \ne k$).
- Prior:
$$p(z_k = 1) = \pi_k, \quad 0 \le \pi_k \le 1, \quad \sum_{k=1}^{K} \pi_k = 1$$
- Conditional:
$$p(\mathbf{x}\mid z_k = 1) = \mathcal{N}(\mathbf{x}\mid \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)$$

### 10.4. Marginalization (주변화) → GMM 수식 복원
- Joint $p(\mathbf{x}, \mathbf{z})$를 $\mathbf{z}$에 대해 합산하면 관측 데이터의 분포 $p(\mathbf{x})$가 나옴:
$$p(\mathbf{x}) = \sum_{\mathbf{z}} p(\mathbf{x}, \mathbf{z}) = \sum_{\mathbf{z}} p(\mathbf{z})\,p(\mathbf{x}\mid \mathbf{z}) = \sum_{k=1}^{K} p(z_k=1)\,p(\mathbf{x}\mid z_k=1) = \sum_{k=1}^{K} \pi_k\,\mathcal{N}(\mathbf{x}\mid \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)$$
- 즉 GMM은 잠재 변수 $\mathbf{z}$를 marginalize한 결과로 자연스럽게 도출.

### 슬라이드 다이어그램 (Inference vs Generation)
- **Inference**: $\mathbf{x} \to \mathbf{z}$ via $p(\mathbf{z}\mid\mathbf{x})$ — 관측을 보고 어느 컴포넌트에서 왔는지 추론.
- **Generation**: $\mathbf{z} \to \mathbf{x}$ via $p(\mathbf{x}\mid\mathbf{z})$ — 컴포넌트를 정한 뒤 데이터를 생성.

---

## 11. 💥 GMM 학습의 어려움 — MLE의 두 가지 문제 (★★★ 출제 매우 유력)

GMM 파라미터를 일반적인 지도학습처럼 **MLE (Maximum Likelihood Estimation)** 로 풀려고 하면 두 가지 치명적 문제가 발생합니다.

### Step 0. Log-Likelihood — 슬라이드 직접 인용
- iid 가정 하에 데이터셋 $\mathbf{X}$의 log-likelihood:
$$\ln p(\mathbf{X}\mid \boldsymbol{\pi}, \boldsymbol{\mu}, \boldsymbol{\Sigma}) = \sum_{n=1}^{N} \ln\!\left(\sum_{k=1}^{K} \pi_k\,\mathcal{N}(\mathbf{x}^{(n)}\mid \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)\right)$$

### 💡 문제 ① — 로그 안의 시그마 (수학적 복잡성)
- 단일 가우시안이라면 로그가 지수항을 깔끔히 풀어주지만, GMM은 **로그 안에 합(Sum)** 이 들어 있음.
- 슬라이드: "the logarithm is applied to a sum of Gaussian terms, taking derivatives leads to **nonlinear equations that cannot be solved analytically**."
- 즉, **해석적으로 닫힌 해(closed-form)를 구할 수 없음.**

### 💡 문제 ② — 특이점(Singularity)으로 인한 무한대 발산 (Unbounded)
가정: 어떤 가우시안의 평균이 정확히 어떤 데이터 포인트에 위치 → $\boldsymbol{\mu}_k = \mathbf{x}^{(n)}$.

- Isotropic 공분산 $\boldsymbol{\Sigma}_k = \sigma_k^2 \mathbf{I}$ 케이스의 가우시안 밀도:
$$\mathcal{N}(\mathbf{x}^{(n)}\mid \boldsymbol{\mu}_k, \sigma_k^2 \mathbf{I}) = \frac{1}{(2\pi)^{D/2}}\,\frac{1}{\sigma_k^D}$$
- 슬라이드: "As $\sigma_k$ approaches zero, the density term grows without bound, then **causing the log-likelihood to diverge to infinity**."
- 즉, 분산을 0으로 줄여 가우시안을 **바늘처럼 뾰족하게** 만들면 likelihood가 $\infty$ → MLE는 **하나의 데이터 점에 완벽 overfit**되어 버림.
- 결론: "maximum likelihood estimation for mixture models is **not well posed**, since such singular solutions can always occur."

### 슬라이드 시각 자료
- 빨간 곡선: bimodal density. 한 쪽 봉우리는 정상이지만 오른쪽에 한 점에 collapse한 **무한히 뾰족한** 가우시안.

---

## 12. 🔮 다음 수업 예고: EM 알고리즘

### 슬라이드 직접 인용
> Therefore, rather than attempting to solve the maximum likelihood problem directly, we turn to an alternative method known as the **Expectation-Maximization (EM) algorithm**, a general optimization framework designed for models with latent variables and widely applicable in probabilistic modeling.

- **MLE** 그림: 한 번에 정상까지 — 단일 가우시안 케이스.
- **EM** 그림: iterative steps (E-step ↔ M-step) → converge — 잠재 변수 있는 GMM 케이스.

### 다음 주차에서 다룰 것
1. EM 알고리즘 정확한 정의와 E/M-step.
2. GMM이 밀도 추정뿐 아니라 **클러스터링(Clustering)** 으로 확장되는 방식.

---

## 13. 🙋‍♂️ 교수님 Q&A (지엽적·시험 출제 가능)

### Q1. 박스가 슬라이딩할 때 겹치는 부분은? (Stride 문제)
- **A**: Stride(이동 간격)는 하이퍼파라미터.
  - 변의 길이가 1일 때 1씩 움직이면 → **히스토그램과 동일**.
  - 0.5 또는 0.1씩 촘촘히 → 해상도 ↑, 정확도 ↑, 그러나 **계산 시간 ↑**.

### Q2. 밀도 함수 값 $p(\mathbf{x})$가 1을 넘을 수 있나요?
- 직관: "모든 확률 합 = 1" 이니까 못 넘어야 할 것 같다.
- **A**: **순간의 밀도(Density) 값 자체는 1을 초과 가능**.
  - 단, 전체 공간에 대해 **적분(Integral)** 했을 때 합은 반드시 1.
  - 예: 폭이 0.1인 작은 영역에 확률 0.5가 몰려 있다면, 밀도 ≈ 5 (≫ 1) 이지만 면적 = 0.5.
- 교수님 본인도 수업 중 잠시 헷갈리셨다가 정리하신 부분이라 출제 가능성 ↑.

---

## 14. 🎯 9주차 최종 암기 체크리스트

### 비지도학습 & 밀도 추정 기본
- [ ] 비지도 = 레이블 없이 **데이터 분포** 학습
- [ ] 밀도 = 한 지점에서 데이터가 얼마나 밀집되어 있는가

### 핵심 공식 (★★★)
- [ ] $P = \int_R p(\mathbf{x})\,d\mathbf{x}$
- [ ] 이항분포 → $P \approx K/N$ (큰 $N$)
- [ ] 작은 $R$ → $P \approx p(\mathbf{x})\,V$
- [ ] **$p(\mathbf{x}) \approx K/(NV)$** ★★★

### 두 갈래
- [ ] **KDE**: $V$ 고정, $K$ 카운트 → bandwidth $h$ 의존
- [ ] **KNN density**: $K$ 고정, $V$ 확장 → 적응적

### KDE
- [ ] Histogram = KDE의 special case
- [ ] **Box (Uniform) Kernel**: 안 = 1, 밖 = 0
- [ ] **Gaussian Kernel**: 부드러운 감쇠, $h$ = 표준편차
- [ ] Bandwidth 너무 작음 → noisy / 너무 큼 → over-smoothed
- [ ] 한계: 모든 위치에 같은 $h$ → 비적응적

### KNN
- [ ] $K$ 작음 → noisy (예: $K=1$)
- [ ] $K$ 큼 → over-smoothed (예: $K=30$)
- [ ] 분류기 확장: $p(C_c\mid\mathbf{x}) = K_c/K$
- [ ] **다수결 분류** ⊂ 밀도 추정 + Bayes 룰

### Parametric vs Non-Parametric
- [ ] Non-parametric: 데이터 자체 의존 (KDE, KNN)
- [ ] Parametric: 분포 가정 + 소수 파라미터 (GMM)

### GMM
- [ ] $p(\mathbf{x}) = \sum_k \pi_k\,\mathcal{N}(\mathbf{x}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)$
- [ ] 3 파라미터: **$\pi_k, \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k$**
- [ ] $\sum_k \pi_k = 1$, $0 \le \pi_k \le 1$

### Latent Variable
- [ ] $\mathbf{z}$ = one-hot of length $K$, $z_k=1$ → $k$번째 컴포넌트
- [ ] $p(z_k=1) = \pi_k$, $p(\mathbf{x}\mid z_k=1) = \mathcal{N}(\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)$
- [ ] Marginalization: $p(\mathbf{x}) = \sum_{\mathbf{z}} p(\mathbf{x},\mathbf{z})$ → GMM 복원
- [ ] 비유: 지능($\mathbf{z}$) → SAT/GPA($\mathbf{x}$)

### MLE for GMM의 두 문제 (★★★)
- [ ] **로그 안의 시그마** → nonlinear equations, 해석적 해 X
- [ ] **Singularity**: $\boldsymbol{\mu}_k = \mathbf{x}^{(n)}$ + $\sigma_k \to 0$ → likelihood $\infty$
- [ ] 결론: MLE는 **not well posed** → EM 등장

### Q&A 단골
- [ ] Stride: 작을수록 해상도 ↑ 시간 ↑ / 1이면 히스토그램과 동일
- [ ] 밀도 값 > 1 가능 (적분이 1이면 됨)

### 다음 주 예고
- [ ] EM 알고리즘 (E-step / M-step iteration) → GMM 학습
- [ ] GMM → 클러스터링 응용
