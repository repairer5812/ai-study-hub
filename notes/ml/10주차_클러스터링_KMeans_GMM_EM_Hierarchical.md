# 기계학습 10주차

# 클러스터링 (Clustering): K-Means · GMM/EM · Hierarchical

9주차에서 밀도 추정(KDE·KNN·GMM)으로 비지도학습의 첫발을 뗐다면, 10주차는 비지도학습의 또 다른 핵심 과제인 **클러스터링(Clustering)** 을 다룹니다. 밀도 추정이 데이터 분포 $p(\mathbf{x})$ 자체를 모델링했다면, 클러스터링은 데이터를 **의미 있는 그룹으로 묶어 구조를 발견**합니다. 세 가지 대표 방법을 배웁니다: ① **K-Means**(비확률적·하드 할당), ② **GMM + EM**(확률적·소프트 할당, 9주차에서 못 푼 MLE를 EM으로 해결), ③ **Hierarchical Clustering**(군집 수를 미리 정하지 않는 트리 기반). 특히 9주차 끝에서 예고된 **EM 알고리즘**이 이번 주차에서 완성됩니다.

> 💡 **교수님 출제 경향 (강의 전사 기반)**
> - 기말고사 포맷은 **중간고사와 거의 동일**하게 유지됨 (조금 더 헷갈리게 낼 수도, 비슷한 난이도일 수도).
> - **정의(Definition)를 묻는 문제가 다수** 출제 → 각 용어의 정확한 개념과 **차이점**을 완벽히 숙지할 것.
> - 본 노트는 **강의 슬라이드 + 수업 녹음 전사 서브노트**를 교차 통합해 작성됨.

---

## 1. 🧭 클러스터링 개요

### 정의 (슬라이드 직접 인용)
> Clustering is another fundamental task in unsupervised learning. While density estimation seeks to model the underlying probability distribution of data, clustering focuses on **discovering meaningful structure within the dataset by organizing data points into groups**.

- 밀도 추정 vs 클러스터링: 둘 다 비지도학습이지만, 밀도 추정은 **분포**를 추정, 클러스터링은 **그룹(군집)** 을 발견.
- 슬라이드 그림: 색·모양 정보 없이 흩어진 점들이 자연스럽게 Group A / B / C로 묶임.

### 💡 클러스터링의 본질적 특성 (출제 포인트)
> Importantly, clustering results depend on **how similarity is defined, the choice of algorithm, and its underlying assumptions about the data** (e.g., cluster shape, scale, or density). As a result, **different methods may produce different groupings on the same dataset**.

- 즉, **정답이 하나로 정해지지 않는다.** 같은 데이터라도 유사도 정의·알고리즘·가정에 따라 다른 군집이 나옴.
- 슬라이드 예: 같은 과일들을 "색 기준"으로 묶으면 노란 그룹/초록 그룹/빨강 그룹, "종류 기준"으로 묶으면 바나나/포도/사과 그룹 — 둘 다 타당.

---

## 2. 🎯 K-Means Clustering

### 2.1. 핵심 발상 (슬라이드 직접 인용)
> Among the many clustering techniques, K-means is one of the **simplest, most widely used, and computationally efficient** algorithms. The central idea behind K-means is straightforward: **represent each cluster by its center (called a centroid or a prototype) and assign each data point to the nearest centroid.**

- 💬 (전사) 교수님: **이름에 'K'가 들어가는 기법(KNN · K-Means)** 은 대체로 단순·직관적이며 계산적으로 매우 효율적(빠름)이다.

### 2.2. 문제 설정 (표기 슬라이드 그대로)
- 데이터셋: $N$개 관측치, 각 관측치는 $D$차원 벡터
$$\mathbf{x}^{(n)} \in \mathbb{R}^D, \quad n=1,\dots,N$$
- 목표: 데이터를 $K$개 군집으로 조직화.
- 군집을 정의하기 위해 **프로토타입(중심, centroid)** 도입:
$$\boldsymbol{\mu}_k \in \mathbb{R}^D, \quad k=1,\dots,K$$
- $\boldsymbol{\mu}_k$ = $k$번째 군집의 중심.

### 💡 2.3. 목적 함수 (Objective Function) — ★★★ 핵심 수식
- K-means는 각 점을 가장 가까운 프로토타입에 할당. 이를 형식화한 목적 함수 $J$(총 군집 내 분산, total within-cluster variance):
$$\boxed{J = \sum_{n=1}^{N}\sum_{k=1}^{K} r_{nk}\,\big\|\mathbf{x}^{(n)} - \boldsymbol{\mu}_k\big\|^2}$$
- $\|\mathbf{x}^{(n)} - \boldsymbol{\mu}_k\|^2$ = 점 $\mathbf{x}^{(n)}$과 중심 $\boldsymbol{\mu}_k$ 사이의 **제곱 유클리드 거리**.
- $r_{nk}$ = **지시 변수(indicator variable)**:
$$r_{nk} = \begin{cases} 1, & \mathbf{x}^{(n)}\text{이 군집 }k\text{에 할당됨} \\ 0, & \text{otherwise} \end{cases}$$
- 따라서 클러스터링은 **최소화 문제**: $J$를 최소화하는 $r_{nk}$ 와 $\boldsymbol{\mu}_k$ 를 찾는다.

### 💡 2.4. 좌표 하강 (Coordinate Descent) — 2단계 반복 (★★★ 출제 매우 유력)
> K-means solves this minimization problem using an iterative two-step procedure, often called **coordinate descent**, which is an optimization method that minimizes a function by **alternately updating one set of variables while keeping the others fixed.**

변수가 두 종류($r_{nk}$, $\boldsymbol{\mu}_k$)이므로 하나를 고정하고 다른 하나를 최적화하는 것을 번갈아 반복.

#### Step 1 — 할당 단계 (Assignment): $\boldsymbol{\mu}_k$ 고정, $r_{nk}$ 갱신
- 각 점 $\mathbf{x}^{(n)}$을 가장 가까운 중심의 군집에 할당:
$$r_{nk} = \begin{cases} 1, & k = \arg\min_{k}\big\|\mathbf{x}^{(n)} - \boldsymbol{\mu}_k\big\|^2 \\ 0, & \text{otherwise} \end{cases}$$
- 즉, 각 점은 **가장 가까운 중심**의 군집에 배정.

#### Step 2 — 갱신 단계 (Update): $r_{nk}$ 고정, $\boldsymbol{\mu}_k$ 갱신
- $J$는 $\boldsymbol{\mu}_k$에 대해 이차식(quadratic)이므로 미분해서 0으로:
$$\frac{\partial J}{\partial \boldsymbol{\mu}_k} = 2\sum_{n=1}^{N} r_{nk}\big(\mathbf{x}^{(n)} - \boldsymbol{\mu}_k\big) = 0$$
- 풀면:
$$\boxed{\boldsymbol{\mu}_k = \frac{\sum_n r_{nk}\,\mathbf{x}^{(n)}}{\sum_n r_{nk}}}$$
- 해석: **각 군집 중심은 그 군집에 할당된 모든 점들의 평균(mean).** ← 알고리즘 이름이 "K-**means**"인 이유.

#### 수렴 (Convergence)
> These two steps are repeated until the assignments $r_{nk}$ and centers $\boldsymbol{\mu}_k$ no longer change, meaning the algorithm has converged.

- 비용 함수 $J$는 매 단계 **단조 감소**(할당 단계도, 갱신 단계도 $J$를 줄임) → 반드시 수렴. 단, **전역 최적(global optimum) 보장은 아님**(초기값에 따라 지역 최적에 빠질 수 있음).

### 2.5. 응용: 이미지 분할 (Image Segmentation)
- 슬라이드: K-means로 이미지 픽셀 색을 $K$개 대표색으로 군집화. $K=2,3,10$으로 갈수록 원본에 가까워짐(색 압축/분할).

### 💡 2.6. 군집 개수 $K$ 정하기 (★★★ 출제 단골)
> In K-means clustering, $K$ is a hyperparameter... There is **no single universally correct value of $K$**, because clustering is usually unsupervised.

비지도학습이라 정답 $K$가 없음. 두 가지 실용적 방법:

> 💬 (전사) 교수님 농담: 데이터가 90개인데 $K=90$으로 잡으면 $J\to0$이 되겠지만, 그러면 **클러스터링을 하는 목적 자체가 사라진다.** (적절한 $K$ 선택의 중요성)

#### ① Elbow Method (엘보우 기법)
- 여러 $K$에 대해 K-means를 돌려 **군집 내 제곱합(within-cluster sum of squares)** 계산:
$$W(K) = \sum_{k=1}^{K}\sum_{\mathbf{x}_i \in C_k} \big\|\mathbf{x}_i - \boldsymbol{\mu}_k\big\|^2$$
- $W(K)$ vs $K$ 그래프에서 **감소가 급격히 완만해지는 지점("팔꿈치", elbow)** 을 $K$로 선택.

#### ② Silhouette Score (실루엣 점수)
- 각 점 $\mathbf{x}_i$에 대해:
  - $a_i$ = $\mathbf{x}_i$에서 **같은 군집** 내 다른 점들까지의 평균 거리 (응집도, 작을수록 좋음).
  - $b_i$ = $\mathbf{x}_i$에서 **가장 가까운 이웃 군집** 점들까지의 평균 거리 (분리도, 클수록 좋음).
- 점 하나의 실루엣 점수:
$$s_i = \frac{b_i - a_i}{\max(a_i, b_i)}$$
- 전체 실루엣 점수:
$$S(K) = \frac{1}{N}\sum_{i=1}^{N} s_i$$
- $s_i$는 $[-1, 1]$ 범위. 1에 가까울수록 잘 군집됨, 0 근처는 경계, 음수는 잘못 할당된 점.

### 2.7. K-Means 요약 (슬라이드 직접 인용)
> The K-means algorithm is a widely used, **non-probabilistic** clustering method that partitions data into $K$ clusters based on similarity, typically measured using Euclidean distance... This alternating two-step procedure closely resembles the structure of the **Expectation-Maximization (EM) algorithm**.

### 💡 2.8. K-Means ↔ EM 대응 관계 (★★★ 출제 매우 유력)
> The **assignment step** in K-means is analogous to the **E-step** (Expectation step), while the **update of the cluster centers** corresponds to the **M-step** (Maximization step).

| K-Means | EM (다음 절 GMM) |
|---------|-----------------|
| 할당 단계 (Assignment): 점을 가장 가까운 중심에 **하드 할당** | E-step: 각 컴포넌트의 **책임값(responsibility, 소프트 할당)** 계산 |
| 갱신 단계 (Update): 중심 = 할당된 점들의 평균 | M-step: 책임값으로 가중한 파라미터 갱신 |

> 📝 K-means는 GMM/EM의 **하드 할당 특수 케이스**로 볼 수 있음. 이 대응이 9주차 → 10주차를 잇는 핵심 통찰.

---

## 3. 🧬 Gaussian Mixture Model (GMM) — 클러스터링 관점

### 3.1. K-Means의 두 가지 한계 (★★★ GMM 등장 이유)
슬라이드는 K-means의 한계 두 가지를 명확히 제시합니다.

#### 한계 ① — 군집 모양 가정이 경직됨
> It implicitly assumes that clusters are **spherical, of similar size, and well separated.** ... This assumption can be **overly restrictive** for real-world datasets, where clusters may differ significantly in shape, size, or orientation.

- 💬 (전사) 예시: 데이터가 **대각선으로 길게 늘어선** 형태(슬라이드의 초록·파랑·노랑 데이터)일 때, K-Means는 그 길쭉한 구조를 무시하고 **위아래로 반토막** 내는 비정상적 결과를 낸다.

#### 한계 ② — 비확률적·하드 할당
> K-means is **not a probabilistic method.** It makes **hard assignments**, meaning that each data point is assigned definitively to exactly one cluster. This rigid assignment can be problematic **when clusters overlap** or when the data naturally exhibits uncertainty in cluster membership.

### 3.2. GMM = 클러스터링으로 재해석 (슬라이드 직접 인용)
> To overcome these limitations, we now turn to the **Gaussian mixture model (GMM)**, a more flexible and fully probabilistic approach to clustering. Although we previously introduced GMMs in the context of density estimation, we now **reinterpret them from a clustering perspective.** Instead of simply modeling the overall data distribution, we view **each Gaussian component as representing a cluster.**

- 9주차: GMM = 밀도 추정 도구. 10주차: **각 가우시안 컴포넌트 하나 = 하나의 군집(cluster).**

### 3.3. GMM vs K-Means 핵심 차이
| 항목 | K-Means | GMM |
|------|---------|-----|
| 군집 모양 | 구형(spherical), 동일 크기 가정 | 각 군집이 **고유 공분산** $\boldsymbol{\Sigma}_k$ → 모양·크기·방향 자유 |
| 할당 방식 | **하드 할당**(0/1) | **소프트 할당**(사후확률 = responsibility) |
| 확률 모델 | 아니오(거리 기반) | **예**(완전 확률 모델) |
| 겹치는 군집 | 처리 어려움 | 자연스럽게 처리 |

### 3.4. GMM 수식 (복습)
$$p(\mathbf{x}) = \sum_{k=1}^{K} \pi_k\,\mathcal{N}(\mathbf{x}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)$$
- $\pi_k$ = mixing coefficient (prior probability, $p(z_k=1)$), $0\le\pi_k\le1$, $\sum_k\pi_k=1$.
- 각 가우시안이 하나의 군집을 표현.

---

## 4. 🔁 Expectation-Maximization (EM) Algorithm for GMM (★★★ 이번 주차 최대 핵심)

### 4.1. 왜 EM인가 — MLE 직접 풀기의 실패 (9주차 복습)
> Although, in the previous chapter, we formulated parameter estimation for GMMs using maximum likelihood estimation, **directly maximizing the likelihood turns out to be analytically intractable.** To address this difficulty, GMMs are typically trained using the **Expectation-Maximization (EM) algorithm**, which provides an efficient iterative solution.

- 로그 우도(log-likelihood):
$$\ln p(\mathbf{X}\mid\boldsymbol{\pi},\boldsymbol{\mu},\boldsymbol{\Sigma}) = \sum_{n=1}^{N}\ln\!\left(\sum_{k=1}^{K}\pi_k\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)\right)$$
- **로그 안에 합(sum)** 이 있어 미분이 비선형 → 닫힌 해 없음(9주차 문제 ①). 그래서 EM으로 우회.

### 💡 4.2. E-step — 책임값 (Responsibility) ★★★
> In the E-step, the current model parameters are treated as fixed, and we estimate the probability that each data point $\mathbf{x}$ was generated by a particular Gaussian component $k$. This probability is called the **responsibility**, denoted $\gamma(z_k)$.

- $\gamma(z_k)$ = 점 $\mathbf{x}$가 $k$번째 컴포넌트에서 생성됐을 **사후확률**(베이즈 정리):
$$\boxed{\gamma(z_k) = p(z_k=1\mid\mathbf{x}) = \frac{p(z_k=1)\,p(\mathbf{x}\mid z_k=1)}{\sum_{j=1}^{K} p(z_j=1)\,p(\mathbf{x}\mid z_j=1)} = \frac{\pi_k\,\mathcal{N}(\mathbf{x}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)}{\sum_{j=1}^{K}\pi_j\,\mathcal{N}(\mathbf{x}\mid\boldsymbol{\mu}_j,\boldsymbol{\Sigma}_j)}}$$
- 해석: $\gamma(z_k)$ = "컴포넌트 $k$가 점 $\mathbf{x}$를 설명하는 정도(책임)". K-means의 하드 할당 $r_{nk}$의 **소프트 버전**.
- 💬 (전사) Q&A: 분모 $\sum_j \pi_j\mathcal{N}(\cdots)$는 **베이즈 정리**에서 전체 확률(evidence)로 나눠 **정규화**하는 역할 → $\sum_k \gamma(z_k)=1$ 을 보장. (K-means에서 $r_{nk}$를 0/1로 정하던 단계와 같은 자리이지만, 여기서는 소프트 확률을 계산.)

### 💡 4.3. M-step — 파라미터 갱신 ★★★
> In the M-step, the responsibilities computed in the E-step are treated as fixed, and the parameters (means, covariances, and mixing coefficients) are updated accordingly.

E-step에서 구한 $\gamma(z_{nk})$를 상수로 고정하고 $\boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k, \pi_k$를 갱신.

#### (a) 평균 $\boldsymbol{\mu}_k$ 유도
- 로그 우도를 $\boldsymbol{\mu}_k$로 미분. 미분 규칙 $\frac{d}{dx}\ln f(x) = \frac{f'(x)}{f(x)}$ 사용:
$$\frac{\partial}{\partial\boldsymbol{\mu}_k}\ln p(\mathbf{X}\mid\boldsymbol{\pi},\boldsymbol{\mu},\boldsymbol{\Sigma}) = \sum_{n=1}^{N}\frac{1}{\sum_{j=1}^{K}\pi_j\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_j,\boldsymbol{\Sigma}_j)}\cdot\frac{\partial}{\partial\boldsymbol{\mu}_k}\Big(\pi_k\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)\Big)$$
- 가우시안 밀도: $\mathcal{N}(\mathbf{x}_n\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k) = \frac{1}{(2\pi)^{D/2}}\frac{1}{|\boldsymbol{\Sigma}_k|^{1/2}}\exp\!\left(-\frac{1}{2}(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)^T\boldsymbol{\Sigma}_k^{-1}(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)\right)$.
- $\frac{d}{dx}e^{f(x)} = e^{f(x)}f'(x)$ 적용:
$$\frac{\partial}{\partial\boldsymbol{\mu}_k}\Big(\pi_k\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)\Big) = \pi_k\cdot\Big(\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)\cdot\boldsymbol{\Sigma}_k^{-1}(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)\Big)$$
- 종합하면 분수가 정확히 책임값 $\gamma(z_{nk})$가 됨:
$$\frac{\partial}{\partial\boldsymbol{\mu}_k}\ln p = \sum_{n=1}^{N}\underbrace{\frac{\pi_k\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)}{\sum_{j=1}^{K}\pi_j\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_j,\boldsymbol{\Sigma}_j)}}_{=\,\gamma(z_{nk})}\boldsymbol{\Sigma}_k^{-1}(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k) = 0$$
- 양변에 $\boldsymbol{\Sigma}_k$ 곱하고 정리 → **평균 갱신식**:
$$\boxed{\boldsymbol{\mu}_k = \frac{1}{N_k}\sum_{n=1}^{N}\gamma(z_{nk})\,\mathbf{x}^{(n)}, \qquad N_k = \sum_{n=1}^{N}\gamma(z_{nk})}$$
- 해석: 군집 평균 = **책임값으로 가중평균한 데이터**. $N_k$ = 컴포넌트 $k$의 "유효 데이터 수(effective number of points)".

#### (b) 공분산 $\boldsymbol{\Sigma}_k$ 갱신
$$\boxed{\boldsymbol{\Sigma}_k = \frac{1}{N_k}\sum_{n=1}^{N}\gamma(z_{nk})\,(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)^T}$$
- 책임값으로 가중한 편차의 외적 → 새 평균 기준 퍼짐(spread).

#### (c) 혼합 계수 $\pi_k$ 갱신 — 라그랑주 승수 (★★★ 출제 유력)
- 제약 $\sum_{k=1}^{K}\pi_k = 1$ 하에서 최대화 → **라그랑주 승수 $\lambda$** 도입:
$$L = \ln p(\mathbf{X}\mid\boldsymbol{\pi},\boldsymbol{\mu},\boldsymbol{\Sigma}) + \lambda\!\left(\sum_{k=1}^{K}\pi_k - 1\right)$$
- $\pi_k$로 미분:
$$\frac{\partial L}{\partial \pi_k} = \sum_{n=1}^{N}\frac{\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)}{\sum_{j=1}^{K}\pi_j\,\mathcal{N}(\mathbf{x}^{(n)}\mid\boldsymbol{\mu}_j,\boldsymbol{\Sigma}_j)} + \lambda = 0$$
- 양변에 $\pi_k$ 곱하고 $k$에 대해 합산. 제약 $\sum_k\pi_k=1$에 의해 내부 합이 1로 정리되어 $\sum_{n=1}^{N}1 = N$:
$$N + \lambda = 0 \;\Rightarrow\; \boxed{\lambda = -N}$$
- $\lambda=-N$을 대입하고 다시 $\pi_k$ 곱해 정리 → **혼합 계수 갱신식**:
$$\boxed{\pi_k = \frac{N_k}{N}, \qquad N_k = \sum_{n=1}^{N}\gamma(z_{nk})}$$
- 해석: 컴포넌트 $k$의 prior = 전체 대비 그 컴포넌트가 책임진 유효 데이터 비율.

### 4.4. EM 요약 (슬라이드 직접 인용)
> In the **E-step**, it computes the responsibilities... using the current parameter estimates. In the **M-step**, it updates the model parameters (means, covariances, mixing coefficients) by maximizing the expected complete-data log-likelihood based on those responsibilities. These two steps are repeated until convergence. By reformulating the problem in this iterative manner, **EM avoids the direct maximization of the log of a sum and instead produces closed-form updates at each step.**

### 4.5. EM의 직관 (슬라이드 그림)
- 초기 가우시안 2개 → E-step(점들을 색으로 소프트 할당) ↔ M-step(타원 갱신) 반복 → $L=1,2,5,20$로 갈수록 두 타원이 데이터에 정확히 맞춰짐.
- Bishop Fig 9.5: (a) complete data(z 색칠), (b) incomplete data(z 무시, 관측만), (c) 책임값을 빨강·초록·파랑 잉크 비율로 표현(경계 점은 색이 섞임 = 소프트 할당).

### 💡 4.6. 닫힌 해처럼 보이지만 "순환 의존" 주의
- $\boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k, \pi_k$ 갱신식은 모두 $\gamma(z_{nk})$에 의존하고, $\gamma(z_{nk})$는 다시 파라미터에 의존 → **진짜 닫힌 해가 아니라 반복(iterative)** 이 필요한 이유. 각 step 안에서만 닫힌 형태.

---

## 5. 🌳 Hierarchical Clustering (계층적 군집화)

### 5.1. 정의 (슬라이드 직접 인용)
> Hierarchical clustering is a method of cluster analysis that seeks to **build a hierarchy of clusters.** It constructs a tree of clusters, called a **dendrogram**, which represents **nested groupings** of the data at different levels of granularity.

- **덴드로그램(Dendrogram)**: 데이터를 여러 granularity로 묶은 트리. 높이(height)는 병합 시점의 거리.

### 💡 5.2. K-Means/GMM과의 결정적 차이
> Instead of directly choosing a fixed number of clusters $K$, hierarchical clustering proceeds by **building clusters progressively.** Because the entire hierarchy is constructed before selecting a final partition, **the number of clusters can be determined afterward** by examining the resulting structure.

- K-means/GMM: $K$를 **미리** 정해야 함. 계층적: 전체 트리를 만든 뒤 **나중에** 덴드로그램을 잘라 $K$ 결정 → **탐색적 데이터 분석(exploratory analysis)** 에 적합.

### 5.3. 두 가지 방향 (슬라이드 직접 인용)
> Hierarchical clustering methods fall into two main types: **agglomerative** and **divisive**.

| 유형 | 방향 | 방식 | 비고 |
|------|------|------|------|
| **Agglomerative (병합형)** | Bottom-up | 각 점을 자기 군집으로 시작 → 가장 유사한 군집들을 반복 병합 | **더 흔히 사용**(단순) |
| **Divisive (분할형)** | Top-down | 모든 점을 한 군집으로 시작 → 재귀적으로 더 작게 분할 | |

### 5.4. 군집 간 거리 측정 — 2단계 (슬라이드 직접 인용)
> To decide which clusters should be merged (or split), we need a way to measure how different two groups of data points are. This is done in two steps:
> 1. Choose a **distance measure** between individual data points (e.g., Euclidean distance).
> 2. Choose a **linkage rule**, which defines how to measure the distance between two clusters using the distances between their points.

- 핵심 구분: **거리 측정(distance)** 은 점들 간 유사도를, **연결 규칙(linkage)** 은 군집 전체 간 비교를 정의.

### 💡 5.5. 연결 기준 (Linkage Criteria) — ★★★ 출제 유력
두 집합 $A$, $B$와 거리 $d$에 대해 자주 쓰이는 연결 기준:

| 이름 | 수식 | 특징 |
|------|------|------|
| **Complete (최대) linkage** | $\displaystyle\max_{a\in A,\,b\in B} d(a,b)$ | 가장 먼 쌍 기준 → 조밀한 군집 선호 |
| **Single (최소) linkage** | $\displaystyle\min_{a\in A,\,b\in B} d(a,b)$ | 가장 가까운 쌍 기준 → 사슬(chaining) 현상 |
| **Average (평균) linkage (UPGMA)** | $\displaystyle\frac{1}{\lvert A\rvert\cdot\lvert B\rvert}\sum_{a\in A}\sum_{b\in B} d(a,b)$ | 모든 쌍 평균 |
| **Centroid linkage (UPGMC)** | $\big\lVert\boldsymbol{\mu}_A - \boldsymbol{\mu}_B\big\rVert^2$ | 두 군집 중심 간 거리 |
| **Ward linkage (MISSQ)** | $\dfrac{\lvert A\rvert\cdot\lvert B\rvert}{\lvert A\cup B\rvert}\big\lVert\boldsymbol{\mu}_A-\boldsymbol{\mu}_B\big\rVert^2$ | 군집 내 분산 증가 최소화 |

> Different linkage choices can lead to **different clustering outcomes** on the same dataset.

### 5.6. Ward's Method 상세 (슬라이드 직접 인용)
> Ward's method merges clusters to **minimize the increase in within-cluster variance.**

- 군집 내 제곱합(within-cluster sum of squares):
$$W(C) = \sum_{\mathbf{x}\in C}\big\|\mathbf{x} - \boldsymbol{\mu}_C\big\|^2, \qquad \boldsymbol{\mu}_C = \frac{1}{|C|}\sum_{\mathbf{x}\in C}\mathbf{x}$$
- $C_a$와 $C_b$를 병합할 때 증가량 $\Delta$를 최소화하는 병합을 선택:
$$\Delta = W(C_a\cup C_b) - W(C_a) - W(C_b)$$
- 정리하면(증명 생략):
$$\Delta = \frac{|C_a||C_b|}{|C_a|+|C_b|}\big\|\boldsymbol{\mu}_{C_a} - \boldsymbol{\mu}_{C_b}\big\|^2$$
- 따라서 Ward 연결 거리:
$$\boxed{D_{\text{Ward}}(C_a, C_b) = \frac{|C_a||C_b|}{|C_a|+|C_b|}\big\|\boldsymbol{\mu}_{C_a} - \boldsymbol{\mu}_{C_b}\big\|^2}$$

### 5.7. Hierarchical 요약 (슬라이드 직접 인용)
> Hierarchical clustering is a **non-parametric, similarity-based** method that builds a **nested sequence of clusters** by iteratively merging (or splitting) groups according to a linkage criterion. It is useful **when the number of clusters is unknown** and when we want to explore the multi-scale structure of the data.

---

## 6. 🧠 세 방법 한눈 비교 (시험 직전 정리)

| 항목 | K-Means | GMM (EM) | Hierarchical |
|------|---------|----------|--------------|
| 군집 수 $K$ | 미리 지정 | 미리 지정 | 사후 결정(덴드로그램 절단) |
| 할당 | 하드(0/1) | 소프트(책임값) | 트리 구조 |
| 확률 모델 | X | O | X |
| 모수성 | 비모수적 분류기에 가깝지만 거리 기반 | **모수적**(가우시안 가정) | **비모수적**(유사도 기반) |
| 군집 모양 | 구형·동일 크기 | 임의 공분산(타원) | linkage에 따라 다양 |
| 최적화 | 좌표하강(2-step) | EM(E-step/M-step) | 탐욕적 병합/분할 |
| 핵심 약점 | 구형 가정·지역 최적 | 초기화 민감·특이점(9주차) | 계산량 큼·되돌릴 수 없는 병합 |

---

## 7. 🤔 슬라이드 기반 혼동 포인트 (자주 틀리는 부분)

> ⚠️ 아래는 강의 슬라이드 내용에 근거한 정리이며, 별도 강의 발언이 아님.

### Q1. K-means의 두 step 중 무엇이 E-step/M-step에 대응?
- **할당 단계(가까운 중심에 배정) = E-step**, **중심 갱신(평균) = M-step**. 헷갈리지 말 것: "할당=E, 갱신=M".

### Q2. $\pi_k = N_k/N$에서 $N_k$는 정수인가?
- 아니다. $N_k = \sum_n \gamma(z_{nk})$는 **책임값(소프트, 실수)의 합** → 일반적으로 정수가 아닌 "유효 데이터 수". (K-means라면 정수.)

### Q3. responsibility $\gamma(z_{nk})$와 indicator $r_{nk}$의 차이?
- $r_{nk}\in\{0,1\}$ (하드), $\gamma(z_{nk})\in[0,1]$ 이고 $\sum_k\gamma(z_{nk})=1$ (소프트, 확률). GMM은 $r$ 대신 $\gamma$를 쓴다.

### Q4. Centroid linkage와 Ward linkage 모두 $\|\boldsymbol{\mu}_A-\boldsymbol{\mu}_B\|^2$를 쓰는데 차이는?
- Centroid: 그대로 $\|\boldsymbol{\mu}_A-\boldsymbol{\mu}_B\|^2$. Ward: 앞에 **크기 가중치** $\frac{|A||B|}{|A|+|B|}$가 붙음 → 큰 군집끼리 병합을 더 억제, 분산 증가 최소화.

### Q5. 왜 GMM의 MLE는 직접 못 푸는가?
- 로그 안에 합(sum)이 있어 미분이 비선형(9주차 문제 ①), 그리고 특이점 발산(9주차 문제 ②). 그래서 EM이라는 반복법으로 우회.

---

## 8. 🗣️ 교수님 Q&A · 농담 · 공지 (강의 전사 기반)

> 아래는 수업 녹음 전사에서 가져온 실제 강의 디테일(슬라이드에 없는 내용).

### Q&A
- **Q. K-Means는 확률 분포로 결과를 주지 않나요?**
  - A. 네. $r_{nk}$가 0 또는 1로 딱 떨어지는 **하드 할당(Hard Assignment)** 이라 확률값을 계산하지 않습니다.
- **💡 교수님 실무 팁 (★ 출제·실무 모두 유용)**: 확률을 계산하지 않아 **매우 빠르다**. 그래서 실무에서는 데이터가 대략 어떻게 생겼는지 보려고 **"First Pass(첫 시도)"로 K-Means를 빠르게** 돌려보고, 이후 더 정밀한 **소프트(Soft) 군집화**가 필요하면 **GMM**을 사용한다.
- **Q. GMM에서 가우시안 개수는 어떻게 정하나요?**
  - A. K-Means와 똑같이 **사용자가 정해야 하는 하이퍼파라미터** $K$입니다.

### 농담·강조
- 데이터 90개에 $K=90$ → $J\to0$이지만 **클러스터링의 목적이 사라짐** (적절한 $K$의 중요성).
- "이름에 K가 들어가는 기법(KNN · K-Means)은 단순·직관·빠름."

### 📢 공지 (강의 외적)
- **다음 주 휴강**: 교수님 해외 학회 참석 (강의계획서상 10주차 Holiday와 일치).
- 휴강 대체: **MIT Quest의 Tom Mitchell 교수**(머신러닝 학과 최초 설립자·유명 교재 저자)의 **'The History of Machine Learning'** 강연 영상을 포털에 업로드 → **가볍게 시청 권장**(별도 체크 없음).
- 점수 관련 문의는 **이메일**로.

---

## 9. 🎯 10주차 최종 암기 체크리스트

### K-Means
- [ ] 목적 함수 $J = \sum_n\sum_k r_{nk}\|\mathbf{x}^{(n)}-\boldsymbol{\mu}_k\|^2$ (총 군집 내 분산) ★★★
- [ ] $r_{nk}$ = 하드 지시 변수(할당되면 1)
- [ ] **좌표 하강 2-step**: Step1 할당($\boldsymbol{\mu}$ 고정, $r$ 갱신, argmin 거리), Step2 갱신($r$ 고정, $\boldsymbol{\mu}$=할당점 평균) ★★★
- [ ] $\boldsymbol{\mu}_k = \frac{\sum_n r_{nk}\mathbf{x}^{(n)}}{\sum_n r_{nk}}$ = 평균 → 이름 "K-**means**"
- [ ] $J$ 단조 감소 → 수렴(전역 최적 보장 X)
- [ ] **K 선택**: Elbow $W(K)=\sum_k\sum_{x_i\in C_k}\|x_i-\mu_k\|^2$ / Silhouette $s_i=\frac{b_i-a_i}{\max(a_i,b_i)}$ ($a$=내부, $b$=이웃) ★★★
- [ ] 비확률적·하드 할당·유클리드 거리
- [ ] **할당=E-step, 갱신=M-step** 대응 ★★★

### K-Means 한계 → GMM
- [ ] 한계①: 구형·동일 크기·잘 분리 가정 (경직)
- [ ] 한계②: 비확률적·하드 할당 (겹침 처리 못함)
- [ ] GMM: 컴포넌트 1개 = 군집 1개, 고유 공분산, 소프트 할당

### EM for GMM ★★★
- [ ] 로그 우도 $\ln p(\mathbf{X})=\sum_n\ln(\sum_k\pi_k\mathcal{N}(\mathbf{x}^{(n)}|\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k))$ — 로그 안 합 → 직접 최적화 불가
- [ ] **E-step responsibility** $\gamma(z_k)=\frac{\pi_k\mathcal{N}(\mathbf{x}|\boldsymbol{\mu}_k,\boldsymbol{\Sigma}_k)}{\sum_j\pi_j\mathcal{N}(\mathbf{x}|\boldsymbol{\mu}_j,\boldsymbol{\Sigma}_j)}$ ★★★
- [ ] **M-step** $\boldsymbol{\mu}_k=\frac{1}{N_k}\sum_n\gamma(z_{nk})\mathbf{x}^{(n)}$, $N_k=\sum_n\gamma(z_{nk})$ ★★★
- [ ] $\boldsymbol{\Sigma}_k=\frac{1}{N_k}\sum_n\gamma(z_{nk})(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)(\mathbf{x}^{(n)}-\boldsymbol{\mu}_k)^T$
- [ ] $\pi_k=\frac{N_k}{N}$ — 라그랑주 승수로 유도, $\lambda=-N$ ★★★
- [ ] 갱신식들이 $\gamma$에 의존 → 반복 필요(step 내에서만 닫힌 형태)

### Hierarchical
- [ ] 덴드로그램 = nested 군집 트리, $K$ 사후 결정
- [ ] **Agglomerative**(bottom-up, 병합, 더 흔함) vs **Divisive**(top-down, 분할)
- [ ] 2단계: 점 간 distance + 군집 간 linkage
- [ ] **Linkage 5종**: Complete(max), Single(min), Average(UPGMA), Centroid(UPGMC), Ward(MISSQ) ★★★
- [ ] **Ward**: 군집 내 분산 증가 최소화, $D_{\text{Ward}}=\frac{|C_a||C_b|}{|C_a|+|C_b|}\|\boldsymbol{\mu}_{C_a}-\boldsymbol{\mu}_{C_b}\|^2$ ★★★
- [ ] 비모수적·유사도 기반, $K$ 모를 때·다중 스케일 탐색에 유용

### 9 → 10 연결
- [ ] 9주차 EM 예고가 10주차에서 완성
- [ ] K-means = GMM/EM의 하드 할당 특수 케이스
