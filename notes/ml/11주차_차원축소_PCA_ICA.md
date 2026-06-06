# 기계학습 11주차

# 차원 축소 (Dimension Reduction): PCA · ICA

10주차 클러스터링에 이어, 11주차는 비지도학습의 또 다른 핵심 과제인 **차원 축소(Dimension Reduction)** 를 다룹니다. 고차원 데이터(이미지·텍스트)의 **내재적 구조(intrinsic structure)** 만 남기고 **불필요한(redundant)** 부분을 버려, 데이터를 컴팩트하고 효율적으로 만듭니다. 두 대표 기법을 배웁니다: ① **PCA**(분산을 최대한 보존하는 비지도 차원 축소, 두 가지 등가 유도), ② **ICA**(섞인 신호를 독립 소스로 분리, 비가우시안성 기반).

> 💡 **교수님 출제 경향 (전사 기반)**: 기말 포맷은 중간과 유사하며 **정의(Definition)·개념 차이**를 묻는 문제가 다수. 본 노트는 **슬라이드 + 강의 녹음 전사**를 교차 통합해 작성됨.

---

## 1. 🧭 차원 축소 (Dimension Reduction) 개요

### 1.1. 정의와 목적 (슬라이드 직접 인용)
> Dimensionality reduction transforms data from a **high-dimensional space into a lower-dimensional one while preserving its essential structure**, ideally reflecting its **intrinsic dimension**.

- 핵심: 데이터의 **내재적 구조를 캡처**하고 **불필요한 정보(redundant)를 제거**.
- 슬라이드 예: 3D 공간의 점들이 사실상 **한 평면(2D)** 위에 놓여 있으면, 3개 좌표로 표현됐지만 본질은 2차원 → 그 평면 구조만 잡고 나머지는 버림.
- 💬 (전사) 교수님 예시: 파랑·빨강·초록 점이 큐브에 있을 때 X·Y축으로 잘 나뉘면 **Z축은 redundant** → 없애고 2D로 표현하면 효율적.
- 활용: ① 비지도학습으로 데이터 자체 파악, ② **지도학습 전 전처리(preprocessing)** 로 학습 효과 ↑.

### 💡 1.2. 차원의 저주 (Curse of Dimensionality) — ★★★ 출제 포인트
> The curse of dimensionality means that as the number of dimensions increases, the data becomes increasingly **sparse**, making learning, estimation, and generalization **much more difficult without exponentially more data**.

- 차원이 늘면 공간은 기하급수적으로 커지고 데이터는 **희소(sparse)** 해짐 → 학습·일반화 어려움.
- 💬 (전사) 교수님 비유: 강아지·고양이 데이터가 1D에선 촘촘(dense)하지만, 2D·3D로 가면 빈 공간이 폭증 → 애매한 입력이 강아지 공간인지 고양이 공간인지 판단 곤란.
- **트레이드오프**: 빈 공간을 채우려면 데이터도 기하급수적으로 늘어야 함 → **feature 차원 수 vs 데이터 개수** 균형 필요. 차원 축소가 이 저주를 완화.

### 1.3. 어떤 차원을 줄일까 — Projection (슬라이드 직접 인용)
> A key challenge in dimensionality reduction is finding the right **projection** from the original space to the lower-dimensional space. The choice of projection depends on the objective: **preserving class separability, maximizing variance, or identifying statistically independent components**.

### 💡 1.4. LDA vs PCA (★★★ 매우 중요)
| 항목 | LDA (Linear Discriminant Analysis) | PCA (Principal Component Analysis) |
|------|-----------------------------------|-----------------------------------|
| 학습 유형 | **지도학습(Supervised)** | **비지도학습(Unsupervised)** |
| 레이블 | 클래스 레이블 사용 | 레이블 없음 |
| 목적 | 클래스 간 **분리도(separability) 최대화** | 데이터 **분산(variance) 최대 보존** |
| 기준 | 클래스 평균은 멀게, 클래스 내 분산은 작게 | 투영된 데이터의 분산이 가장 큰 방향 |

> 이 챕터(PCA·ICA)는 **레이블이 없는 비지도 차원 축소**에 집중. (LDA는 4주차 지도학습에서 다룸)

---

## 2. 🎯 PCA — Maximum Variance Formulation (분산 최대화)

### 2.1. PCA의 두 가지 등가 정의 (슬라이드 직접 인용)
> PCA can be understood in two equivalent ways that lead to the same algorithm:
> 1. PCA is the **orthogonal projection** of the data onto a lower dimensional linear space, such that the **variance of the projected data is maximized**.
> 2. Equivalently, it is the linear projection that **minimizes the average projection cost** (mean squared distance between data points and their projections).

> 📝 두 방식은 철학이 다르지만 **최종 결과(고유벡터·고유값)는 완전히 동일**. 수식이 복잡하면 ①(분산 최대화)로 기억해도 무방(교수님).

### 2.2. 문제 설정
- 데이터셋 $\{\mathbf{x}^{(n)}\}$, $n=1,\dots,N$, 각 $\mathbf{x}^{(n)}$은 $D$차원.
- 목표: $M < D$ 차원으로 투영하되 **투영된 데이터의 분산을 최대화**. ($M$은 주어졌다고 가정)
- $M=1$부터: 방향을 단위 벡터 $\mathbf{u}_1$로 정의 ($\mathbf{u}_1^T\mathbf{u}_1 = 1$, 크기가 아닌 **방향만** 중요).
- 각 점의 투영(스칼라): $\mathbf{u}_1^T\mathbf{x}^{(n)}$.

### 💡 2.3. 투영 분산과 공분산 행렬 — ★★★ 핵심 수식
- 원래 데이터 평균: $\bar{\mathbf{x}} = \dfrac{1}{N}\sum_{n=1}^{N}\mathbf{x}^{(n)}$, 투영 평균: $\mathbf{u}_1^T\bar{\mathbf{x}}$.
- 투영된 데이터의 분산:
$$\frac{1}{N}\sum_{n=1}^{N}\big\{\mathbf{u}_1^T\mathbf{x}^{(n)} - \mathbf{u}_1^T\bar{\mathbf{x}}\big\}^2 = \frac{1}{N}\sum_{n=1}^{N}\mathbf{u}_1^T(\mathbf{x}^{(n)}-\bar{\mathbf{x}})(\mathbf{x}^{(n)}-\bar{\mathbf{x}})^T\mathbf{u}_1 = \mathbf{u}_1^T\mathbf{S}\mathbf{u}_1$$
- 여기서 $\mathbf{S}$ = **데이터 공분산 행렬(covariance matrix)**:
$$\boxed{\mathbf{S} = \frac{1}{N}\sum_{n=1}^{N}(\mathbf{x}^{(n)}-\bar{\mathbf{x}})(\mathbf{x}^{(n)}-\bar{\mathbf{x}})^T}$$
- 목표: **$\mathbf{u}_1^T\mathbf{S}\mathbf{u}_1$을 최대화**하는 $\mathbf{u}_1$ 찾기.

### 💡 2.4. 라그랑주 승수법 → 고유값 문제 (★★★ 출제 매우 유력)
- 제약 $\mathbf{u}_1^T\mathbf{u}_1 = 1$이 없으면 $\mathbf{u}_1$을 키워 분산을 무한정 키울 수 있음 → 정규화 제약 필요.
- 라그랑주 승수 $\lambda_1$ 도입:
$$\mathcal{L} = \mathbf{u}_1^T\mathbf{S}\mathbf{u}_1 + \lambda_1\big(1 - \mathbf{u}_1^T\mathbf{u}_1\big)$$
- $\mathbf{u}_1$로 미분해 0:
$$\frac{\partial\mathcal{L}}{\partial\mathbf{u}_1} = 2\mathbf{S}\mathbf{u}_1 - 2\lambda_1\mathbf{u}_1 = 0 \;\Rightarrow\; \boxed{\mathbf{S}\mathbf{u}_1 = \lambda_1\mathbf{u}_1}$$
- 💬 (전사) Q&A "미분할 때 2는 왜?": $\mathbf{u}_1^T\mathbf{S}\mathbf{u}_1$ 같은 **이차형식(제곱 형태)** 을 $\mathbf{u}_1$로 미분하면 2가 앞으로 빠져나옴.
- $\mathbf{u}_1^T$를 왼쪽 곱하고 $\mathbf{u}_1^T\mathbf{u}_1=1$ 사용 → 분산 = 고유값:
$$\mathbf{u}_1^T\mathbf{S}\mathbf{u}_1 = \lambda_1$$

### 💡 2.5. 고유벡터·고유값의 의미
- $\mathbf{S}\mathbf{u}_1 = \lambda_1\mathbf{u}_1$은 **고유값 문제(eigenvalue problem)** 와 정확히 일치.
- $\mathbf{u}_1$ = $\mathbf{S}$의 **고유벡터** → **주성분(principal component) 방향**.
- $\lambda_1$ = $\mathbf{S}$의 **고유값** → 그 방향의 **분산 값 그 자체**.
- 따라서 분산 최대화 = **가장 큰 고유값** $\lambda_1$을 갖는 고유벡터를 **제1주성분**으로 선택.

### 2.6. 두 번째 이후 주성분 — 직교성 (Orthogonality)
- 다음 주성분 $\mathbf{u}_2$는 $\mathbf{u}_1$과 **직교**해야 함. (비슷하게 뽑으면 중복 정보 → 새 정보를 못 담음)
> This orthogonality is **not arbitrary**; it arises naturally from the mathematics. A key property of **symmetric matrices** such as $\mathbf{S}$ is that **eigenvectors corresponding to different eigenvalues are orthogonal**.

- 💬 (전사): 공분산 행렬 $\mathbf{S}$는 **대칭 행렬**(1행3열 = 3행1열)이므로 고유벡터들이 자연스럽게 서로 직교. 랜덤하게 직교하는 게 아님!

### 💡 2.7. 일반 $M$차원 + 최종 절차
- 일반적으로 최적 투영은 $\mathbf{S}$의 **$M$개 최대 고유값** $\lambda_1,\dots,\lambda_M$에 대응하는 고유벡터 $\mathbf{u}_1,\dots,\mathbf{u}_M$.
- **PCA 절차 (암기)**:
  1. 공분산 행렬 $\mathbf{S}$ 계산
  2. $\mathbf{S}$의 고유벡터·고유값 계산 (총 $D$개)
  3. 고유값(분산) **내림차순 정렬**
  4. 큰 값부터 **$M$개 고유벡터 선택** → 그 방향으로 투영

---

## 3. 🔁 PCA — Minimum Error Formulation (투영 오차 최소화)

> 철학은 다르지만 결론은 동일(고유벡터·고유값). 두 방식이 **왜 같은 결과를 내는지** 가 💡핵심 출제 포인트.

### 3.1. 직관 (슬라이드 직접 인용)
> We now discuss an alternative formulation of PCA based on **projection error minimization**.

- 그림(슬라이드): 왼쪽 = **분산 최대화**(투영점들의 퍼짐을 크게), 오른쪽 = **잔차(residual) 최소화**(점과 직선 사이 수직 거리 제곱을 작게). 같은 직선이 답.

### 3.2. 정규 직교 기저 (Orthonormal Basis)
- 완전한 $D$차원 정규 직교 기저 $\{\mathbf{u}_i\}$ 도입:
$$\mathbf{u}_i^T\mathbf{u}_j = \delta_{ij} \quad (\delta_{ij} = 1\text{ if }i=j,\ 0\text{ otherwise})$$
- 직교(orthogonal) + 단위 길이(normal). 각 데이터를 기저의 선형 결합으로 표현(좌표계 **회전**):
$$\mathbf{x}^{(n)} = \sum_{i=1}^{D}\alpha_i^{(n)}\mathbf{u}_i, \qquad \alpha_i^{(n)} = \mathbf{u}_i^T\mathbf{x}^{(n)}$$
- ($\mathbf{u}_i^T\mathbf{x}^{(n)} = \sum_j \alpha_j(\mathbf{u}_i^T\mathbf{u}_j) = \alpha_i$, 직교성으로 유도)

### 💡 3.3. 차원 축소 근사 — $z_i$ vs $b_i$ (★★★ 매우 중요한 구분)
- $M$차원만으로 근사한 $\tilde{\mathbf{x}}^{(n)}$:
$$\tilde{\mathbf{x}}^{(n)} = \sum_{i=1}^{M} z_i^{(n)}\mathbf{u}_i + \sum_{i=M+1}^{D} b_i\mathbf{u}_i$$
| 파라미터 | 의미 |
|---------|------|
| $z_i^{(n)}$ | **살려두는 $M$개 차원**. 데이터마다 값이 다름(개별 특성 반영) |
| $b_i$ | **버려지는 $D-M$개 차원**. 모든 데이터 공통의 **고정 상수** |

- 💬 (전사) 비유: 3D 파란 점을 2D 평면(빨간 점)에 투영 → 평면상 분포 차이가 $z_i$, 버려지는 Z축(보라)은 어느 점이든 동일한 $b_i$로 통일.

### 💡 3.4. Distortion $J$ 최적화 (2단계)
- 목적 함수(distortion): 원본과 근사의 거리 제곱합
$$J = \frac{1}{N}\sum_{n=1}^{N}\big\|\mathbf{x}^{(n)} - \tilde{\mathbf{x}}^{(n)}\big\|^2$$
- 파라미터 3개($z_i, b_i, \mathbf{u}_i$)를 한 번에 풀기 어려워 **2단계**:
  - **Step 1**: $\mathbf{u}_i$ 고정 → $z_i, b_i$ 최적화. (proof omitted)
$$z_i^{(n)} = (\mathbf{x}^{(n)})^T\mathbf{u}_i, \qquad b_i = \bar{\mathbf{x}}^T\mathbf{u}_i$$
  - **Step 2**: $z_i, b_i$ 대입·정리 후 $\mathbf{u}_i$ 최적화.
- 대입해 정리하면 distortion이 **버려지는 차원의 분산 합**으로 단순화:
$$\boxed{J = \sum_{i=M+1}^{D}\mathbf{u}_i^T\mathbf{S}\mathbf{u}_i}$$
- 즉 **버려지는 쪽 분산을 최소화** = **살려두는 쪽 분산을 최대화**(2장과 동일 결론!).
- 정규 직교 제약 하 최소화 → 다시 **고유값 문제**:
$$\mathbf{S}\mathbf{u}_i = \lambda_i\mathbf{u}_i$$
- $J$를 최소화하려면 **가장 작은 $D-M$개 고유값**의 고유벡터를 버리고, **가장 큰 $M$개**를 보존. → 분산 최대화 방식과 완벽히 동일.

---

## 4. 🖼️ PCA의 응용 (Applications)

### 4.1. Eigen-spectrum & 차원 결정 (출제 포인트)
- 각 고유벡터는 원본 $D$차원 공간의 벡터 → **이미지로 시각화 가능**(MNIST 784차원이면 28×28 이미지).
- 슬라이드(MNIST 숫자 3): 평균 이미지 + 첫 고유벡터들($\lambda_1=3.4\cdot10^5$, $\lambda_2=2.8\cdot10^5$, …), 오른쪽엔 **고유값 스펙트럼**(내림차순).
- 💡 인덱스가 커질수록 고유값(분산)이 **급격히 작아짐** → 대부분 차원은 사실상 정보 없음. **스펙트럼이 꺾이는 지점**을 보고 $M$ 결정(예: 15~100개로 대부분 분산 설명).

### 4.2. 압축 (Compression)
- 중요한 $M$개 주성분 계수만 저장:
$$z_i^{(n)} = (\mathbf{x}^{(n)} - \bar{\mathbf{x}})^T\mathbf{u}_i, \qquad \mathbf{z}^{(n)} = \big(z_1^{(n)}, z_2^{(n)}, \dots, z_M^{(n)}\big)^T \in \mathbb{R}^M$$

### 💡 4.3. 재구축 (Reconstruction) — 평균 더하기 주의!
$$\boxed{\hat{\mathbf{x}}^{(n)} = \bar{\mathbf{x}} + \sum_{i=1}^{M} z_i^{(n)}\mathbf{u}_i}$$
- **평균 $\bar{\mathbf{x}}$를 반드시 더해야** 원래 위치로 복원됨.
- 슬라이드(숫자 3): $M=1$ 두루뭉술 → $M=10$ 형태 잡힘 → $M=50$ 디테일 → $M=250$ 원본과 거의 동일(나머지 ~500차원은 노이즈).
- **Eigenfaces**: 얼굴 데이터에 PCA. 첫 고유벡터는 전반적 얼굴 베이스, 뒤로 갈수록 미세 특징.

---

## 5. 🎙️ ICA — Independent Component Analysis (개요)

### 5.1. 목적: 소스 분리 (Source Separation) — PCA와 대비
> Independent Component Analysis (ICA) is a computational method for **separating a multivariate signal into statistically independent additive components**.

| 항목 | PCA | ICA |
|------|-----|-----|
| 주 목적 | 차원 축소·시각화·압축·전처리 | **소스 분리(Source Separation)** |
| 찾는 것 | 분산 최대 직교 방향 | 통계적으로 **독립인** 성분 |
| 직교성 | 요구함(직교 성분) | **요구 안 함** |

- 데이터가 여러 **소스(source)** 가 섞여 만들어졌다고 보고, 그 컴포넌트를 **분리**. 분리 후 노이즈 성분은 제거.

### 💡 5.2. 핵심 가정 1: 독립성 (Independence) vs 무상관 (Uncorrelatedness)
> Statistical independence is a **stronger** condition than mere uncorrelatedness. Two variables can be **uncorrelated** (no linear relationship) but still be related in some **nonlinear** way. If two variables are **independent**, knowing one gives **no information** about the other.

- **무상관(Uncorrelated)**: 선형 관계만 없음. 비선형 관계는 남을 수 있음. (예: $Y=X^2$는 무상관이지만 종속)
- **독립(Independent)**: 선형·비선형 모두 무관한 **더 강력한** 조건.
- **PCA의 한계**: PCA는 직교 성분을 뽑아 **무상관은 보장하지만 독립은 보장 못 함**.
- 💬 (전사) 'X자' 데이터: 두 소스 방향이 직교하지 않을 때 PCA는 억지로 직교·분산 최대 축을 뽑아 실제 소스 방향을 놓침. ICA는 **독립성만** 기준으로 X자 소스 방향을 잘 캡처.

### 💡 5.3. 핵심 가정 2: 비가우시안성 (Non-Gaussianity) — ★★★
> The critical assumption in ICA is that the original sources must be **non-Gaussian**.

- **왜 가우시안이면 안 되나**: 가우시안 소스를 선형 결합하면 그 결과도 **또 다른 가우시안** → 섞인 결과만 보고는 소스가 몇 개인지 구분 불가(분리 단서 사라짐, ambiguity).
- 따라서 소스 분리가 목적인 ICA에 **가우시안은 최악**. 비가우시안(Laplacian·Uniform·Exponential 등, 뾰족하거나 평평한 분포)이어야 섞여도 특징이 남아 분리 가능.

---

## 6. 🧮 ICA — 칵테일 파티 문제와 수학적 모델

### 6.1. 칵테일 파티 문제 (Cocktail Party / Blind Source Separation)
- 여러 사람이 동시에 말하고 여러 마이크가 **서로 다른 혼합 비율**로 녹음. 섞인 $\mathbf{x}$만으로 원래 목소리 소스 $\mathbf{s}$를 복원.

### 💡 6.2. Mixing / Unmixing — ★★★ 핵심 수식
$$\mathbf{x} = \mathbf{A}\mathbf{s} \qquad (\mathbf{A}: d\times d \text{ mixing matrix, 미지})$$
$$\boxed{\mathbf{s} = \mathbf{W}\mathbf{x}, \quad \mathbf{W} = \mathbf{A}^{-1} \text{ (unmixing matrix, 우리가 찾는 값!)}}$$
- $\mathbf{w}_i^T$ = $\mathbf{W}$의 $i$번째 행 → $s_i^{(n)} = \mathbf{w}_i^T\mathbf{x}^{(n)}$.
- 독립 가정으로 소스 결합 확률 = 곱:
$$p(\mathbf{s}) = p(s_1,\dots,s_d) = \prod_{i=1}^{d} p(s_i)$$

### 💡 6.3. 최대 우도 — Determinant 보정 (출제 포인트)
- $\mathbf{s}=\mathbf{W}\mathbf{x}$로 변환 시 공간의 부피(volume)가 변하므로, 확률 총합 1을 맞추려 **행렬식 $|\det(\mathbf{W})|$** 로 보정:
$$p(\mathbf{x}) = p(\mathbf{s})\,|\det(\mathbf{W})| = \prod_{i=1}^{d} p_s(\mathbf{w}_i^T\mathbf{x})\,|\det(\mathbf{W})|$$
- $|\det(\mathbf{W})| > 1$: 공간 팽창 → 밀도 감소 / $< 1$: 수축 → 밀도 증가 / $=1$: 부피 유지.
- 로그 우도:
$$L(\mathbf{W}) = \sum_{n=1}^{N}\log p(\mathbf{x}^{(n)}) = \sum_{n=1}^{N}\left(\sum_{i=1}^{d}\log p_s(\mathbf{w}_i^T\mathbf{x}^{(n)}) + \log|\det(\mathbf{W})|\right)$$

### 💡 6.4. 비가우시안 함수 = Sigmoid 도함수
- 소스 밀도 $p_s$로 가우시안을 못 쓰므로 비가우시안 함수 사용. 흔한 선택: **시그모이드의 도함수**:
$$p_s(s_i) \approx g'(s_i), \quad g(s) = \frac{1}{1+e^{-s}}, \quad g'(s) = g(s)\big(1-g(s)\big)$$
- 💬 모양은 가우시안과 비슷하지만 **수학적으로 가우시안이 아님**(계산 편의를 위한 선택).

### 💡 6.5. Gradient Ascent 학습 규칙
- 로그 우도를 $\mathbf{W}$로 미분(첫 항은 시그모이드 성질 $\frac{g''(s)}{g'(s)} = 1 - 2g(s)$, 둘째 항은 $\nabla_\mathbf{W}\log|\det\mathbf{W}| = (\mathbf{W}^{-1})^T$):
$$\mathbf{W} \leftarrow \mathbf{W} + \alpha\left(\frac{1}{N}\sum_{n=1}^{N}\mathbf{x}^{(n)}\big(\mathbf{1} - 2g(\mathbf{W}\mathbf{x}^{(n)})\big)^T + (\mathbf{W}^T)^{-1}\right)$$
- $\alpha$ = 학습률. 반복하면 $\mathbf{W}$가 독립 소스를 분리하는 해로 수렴.

---

## 7. ⚖️ ICA — 내재적 모호성과 응용

### 💡 7.1. 두 가지 모호성 (Ambiguities) — 출제 유력
> Even if ICA perfectly recovers $\mathbf{x} = \mathbf{A}\mathbf{s}$, some inherent ambiguities remain.

| 모호성 | 내용 | PCA와 대비 |
|--------|------|-----------|
| **Permutation (순서)** | 분리된 소스의 **순서**를 알 수 없음($\mathbf{A}$ 열 교환 = 소스 순서만 바뀜) | PCA는 고유값 크기 순 정렬 가능 |
| **Scaling (크기)** | 각 소스의 **절대 크기(scale)** 결정 안 됨(소스에 상수 곱하고 $\mathbf{A}$ 열을 나누면 동일) | PCA는 분산으로 크기 기준 있음 |

- 실제로는 절대 크기·순서가 해석·활용에 큰 문제 안 됨.

### 7.2. 응용
- **비디오 분리**: 4개 영상을 무작위 혼합 후 ICA → 순서는 뒤죽박죽(permutation)이지만 각 원본 영상으로 잘 분리.
- **fMRI/EEG**(교수님 분야): 뇌의 수많은 네트워크 중 태스크 관련 신호만 추출. 호흡·눈 깜빡임 등 **artifact(노이즈) 네트워크 분리·제거**에 전통적으로 많이 사용.

---

## 8. 🧠 PCA vs ICA 한눈 비교 (시험 직전)

| 항목 | PCA | ICA |
|------|-----|-----|
| 목적 | 차원 축소·분산 보존 | 소스 분리 |
| 최대화 대상 | **분산(variance)** | **비가우시안성(non-Gaussianity)** |
| 성분 관계 | 직교(orthogonal) → 무상관 | 통계적 독립(independent) |
| 분포 가정 | 특별한 가정 없음(공분산 기반) | 소스가 **비가우시안**이어야 함 |
| 최적화 | 공분산 고유값 문제(닫힌 해) | 로그 우도 Gradient Ascent(반복) |
| 순서·크기 | 고유값으로 정렬 가능 | permutation·scaling 모호성 |

---

## 9. 🗣️ 교수님 Q&A · 농담 · 공지 (강의 전사 기반)

> 슬라이드에 없는 실제 강의 디테일.

### Q&A (출제 가능성 ↑)
- **Q. (PCA 유도) 미분할 때 2는 왜 나오나요?** → A. $\mathbf{u}_1^T\mathbf{S}\mathbf{u}_1$ 같은 **제곱(이차형식)** 을 $\mathbf{u}_1$로 미분하면 2가 앞으로 빠짐.
- **Q. (ICA, 슬라이드 53쪽) 미분 수식 맨 아래 $g'$ 표기에 오타 아닌가요?** → A. 교수님 **"맞다, $g'$가 빠져야 하는 게 맞다"** 며 **슬라이드 표기 오류 인정**. (디테일한 수식 문제 출제 시 주의)
- **Q. ICA로 노이즈 제거 시 어떤 게 노이즈인지 어떻게 아나요?** → A. **가장 클래식한 ICA에서는 분리된 성분을 보고 노이즈인지 사람이 직접(manually) 확인**해 제거.
- **Q. ICA를 차원 축소라고 부를 수 있나요?** → A. 자료엔 차원 축소 파트에 넣었지만, **엄밀히는 애매**. 차원 축소 커뮤니티에서 ICA를 순수 차원 축소로 잘 부르진 않음(소스 분리·노이즈 제거 목적이 강함).
- **Q. PCA는 분산 최대화인데, ICA는 직관적으로 무엇을 최대화?** → A. 한마디로 **"비가우시안성(Non-Gaussianity)을 최대화"** 하는 방향으로 독립 성분을 뽑음.

### 📢 공지·추천
- 휴강 대체 영상(머신러닝/AI 발전 히스토리)을 **꼭 시청 권장**(인공지능 모델로 이어지는 연결을 잘 설명).
- 이후 진도: **Manifold Learning** → (시간 되면) **Neural Network** 기초까지 다루고 기말 마무리 예고.

---

## 10. 🎯 11주차 최종 암기 체크리스트

### 차원 축소 개요
- [ ] 차원 축소 = 내재 구조 보존 + redundant 제거
- [ ] **차원의 저주**: 차원↑ → 데이터 sparse → 학습·일반화 어려움(데이터 기하급수 필요) ★★★
- [ ] **LDA(지도, 분리도 최대) vs PCA(비지도, 분산 최대)** ★★★

### PCA 분산 최대화
- [ ] 단위 벡터 $\mathbf{u}_1^T\mathbf{u}_1=1$, 투영 $\mathbf{u}_1^T\mathbf{x}$
- [ ] 투영 분산 $= \mathbf{u}_1^T\mathbf{S}\mathbf{u}_1$, $\mathbf{S}=\frac{1}{N}\sum(\mathbf{x}-\bar{\mathbf{x}})(\mathbf{x}-\bar{\mathbf{x}})^T$ ★★★
- [ ] 라그랑주 $\mathcal{L}=\mathbf{u}_1^T\mathbf{S}\mathbf{u}_1+\lambda_1(1-\mathbf{u}_1^T\mathbf{u}_1)$ → $\mathbf{S}\mathbf{u}_1=\lambda_1\mathbf{u}_1$ ★★★
- [ ] $\mathbf{u}_1$=고유벡터(주성분 방향), $\lambda_1$=고유값(분산값). 가장 큰 $\lambda$ 선택
- [ ] 다음 주성분은 직교 → **대칭 행렬 $\mathbf{S}$의 고유벡터는 서로 직교**(자연 발생)
- [ ] 절차: $\mathbf{S}$ → 고유분해 → 내림차순 → 큰 $M$개 선택

### PCA 오차 최소화
- [ ] 정규 직교 기저 $\mathbf{u}_i^T\mathbf{u}_j=\delta_{ij}$, $\alpha_i=\mathbf{u}_i^T\mathbf{x}$
- [ ] $\tilde{\mathbf{x}} = \sum_1^M z_i\mathbf{u}_i + \sum_{M+1}^D b_i\mathbf{u}_i$: **$z_i$=살림(데이터마다), $b_i$=버림(공통 상수)** ★★★
- [ ] $z_i=(\mathbf{x})^T\mathbf{u}_i$, $b_i=\bar{\mathbf{x}}^T\mathbf{u}_i$
- [ ] $J=\sum_{M+1}^D \mathbf{u}_i^T\mathbf{S}\mathbf{u}_i$ → 버림 분산 최소 = 살림 분산 최대(동일 결론) ★★★
- [ ] 작은 $D-M$개 고유값 버림

### PCA 응용
- [ ] Eigen-spectrum 꺾이는 지점으로 $M$ 결정
- [ ] 압축 $\mathbf{z}=(z_1,\dots,z_M)^T$, $z_i=(\mathbf{x}-\bar{\mathbf{x}})^T\mathbf{u}_i$
- [ ] **재구축 $\hat{\mathbf{x}}=\bar{\mathbf{x}}+\sum_1^M z_i\mathbf{u}_i$ (평균 더하기!)** ★★★
- [ ] Eigenfaces: 앞 성분=전반, 뒤 성분=디테일

### ICA
- [ ] 목적 = **소스 분리**(PCA는 차원 축소)
- [ ] **독립 > 무상관**: 무상관=선형만, 독립=선·비선형 모두 무관 ★★★
- [ ] PCA는 무상관 보장하나 독립 보장 X
- [ ] **비가우시안성 가정**: 가우시안 섞으면 또 가우시안 → 분리 불가 ★★★
- [ ] $\mathbf{x}=\mathbf{A}\mathbf{s}$, $\mathbf{s}=\mathbf{W}\mathbf{x}$, $\mathbf{W}=\mathbf{A}^{-1}$ ★★★
- [ ] $p(\mathbf{x})=p(\mathbf{s})|\det\mathbf{W}|$ (부피 보정), $p_s\approx g'$(시그모이드 도함수)
- [ ] Gradient Ascent로 $\mathbf{W}$ 갱신
- [ ] **모호성**: Permutation(순서), Scaling(크기) — PCA는 고유값으로 정렬 가능
- [ ] "ICA = **비가우시안성 최대화**"

### 다음 주 예고
- [ ] Manifold Learning (MDS, t-SNE)
