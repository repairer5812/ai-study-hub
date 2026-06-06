# 기계학습 12주차

# 매니폴드 학습 (Manifold Learning): MDS · t-SNE · UMAP

11주차 차원 축소(PCA·ICA)에 이어, 기말 비지도학습의 마지막 주제인 **매니폴드 학습(Manifold Learning)** 입니다. 고차원 데이터에 숨은 **저차원의 매끄러운 구조(manifold)** 를 찾아, 그 **기하학적·위상학적 속성을 보존**하며 저차원으로 표현(주로 시각화)합니다. 대표 기법을 비교합니다: **PCA**(선형), **MDS**(거리 보존), **t-SNE**(확률 분포·KL), **UMAP**(그래프·Cross-Entropy), 그리고 전사 보강으로 **Auto-Encoder**까지.

> 💡 **교수님 출제 포인트 (전사 기반)**: 각 기법이 **선형/비선형**인지, **어떤 행렬/분포**를 쓰는지, **목적 함수**가 무엇인지(PCA의 $\mathbf{X}^T\mathbf{X}$ vs MDS의 $\mathbf{X}\mathbf{X}^T$, t-SNE의 KL vs UMAP의 Cross-Entropy, 가우시안 vs t-분포)를 **표로 비교**해 암기할 것. 기말 포맷은 중간과 거의 동일.

---

## 1. 🌐 Manifold 개념

### 1.1. 고차원 데이터와 숨은 구조 (슬라이드 직접 인용)
> Real-world data often appears to exist in extremely high-dimensional spaces... However, these high-dimensional representations do not mean that the data varies freely in every possible direction. Instead, real-world data is usually governed by **hidden structure: physical laws, semantic relationships, geometric constraints, temporal continuity**, and task-specific rules.

- 이미지 픽셀·텍스트·스피치·바이오·로봇 센서는 수천~수백만 차원이지만, 실제 의미 있는 변동은 모든 방향으로 자유롭지 않음.
- 💬 (전사) 물리 법칙·의미론적 관계·기하 제약·시간 연속성 때문에 데이터는 특정 로컬 정보로 뭉쳐 있음.

### 1.2. Manifold 정의 (슬라이드 직접 인용)
> A manifold can be understood as a **smooth space that may be curved or embedded inside a higher-dimensional space, but locally behaves like a simpler low-dimensional space**. Manifold learning refers to a class of techniques that aim to **discover and represent the hidden low-dimensional geometric structure** underlying high-dimensional data.

- 💡 **스위스 롤(Swiss Roll)**: 3차원에 말려 있는 롤이지만, 실제 의미 있는 패턴(색 그래디언트)은 펼치면(unroll) **2차원 매니폴드**에 존재.

### 1.3. 차원 축소와의 관계 (슬라이드 직접 인용)
> Both seek to transform high-dimensional observations into a lower-dimensional representation. Manifold learning places **stronger emphasis on preserving the geometric or topological properties** of the data.

- 차원 축소: '어떤 차원을 남길지'. 매니폴드 학습: '고차원 구조를 어떻게 잘 유지할지'에 더 초점(결국 비슷한 목적).

---

## 2. 📐 PCA — 선형 매니폴드 학습과 그 한계

> Principal component analysis (PCA), although previously introduced as a method for dimensionality reduction, can also be viewed as a **linear approach to manifold learning**, based on the assumption that the data lie approximately on a lower-dimensional **linear subspace**.

### 💡 2.1. PCA의 치명적 한계 (★★★ 출제 1순위)
> It is important to recognize that PCA is **restricted to modeling linear structure**. A classical illustration is the **Swiss roll** dataset... PCA cannot properly "unroll" this structure because it can only produce **linear projections**.

- 데이터가 비선형(곡면)으로 말려 있으면, PCA는 단순히 **겹쳐서 투영**해 본래 구조 파악 실패. → 비선형 매니폴드 학습(t-SNE, UMAP)이 필요.

---

## 3. 📊 MDS (Multi-Dimensional Scaling)

### 3.1. 개념과 입력 (슬라이드 직접 인용)
> MDS aims to represent high-dimensional data in a lower-dimensional space while **preserving the pairwise distances** between data points as accurately as possible.

- 매니폴드 기법 중 **가장 단순·빠름**. 입력은 좌표 $\mathbf{X}$가 아니라 **거리(dissimilarity) 행렬 $\mathbf{D}$** ($N\times N$, $d_{ij}$ = 점 $i,j$의 거리; 가까울수록 0).
- 목표: 저차원 좌표 $\mathbf{x}^{(1)},\dots,\mathbf{x}^{(N)}\in\mathbb{R}^p$를 찾아 $\big\|\mathbf{x}^{(i)}-\mathbf{x}^{(j)}\big\| \approx d_{ij}$.

### 💡 3.2. 수학적 도출 — 거리에서 좌표로 (★★★ 핵심)
- **거리² = 내적의 조합**:
$$\big\|\mathbf{x}^{(i)}-\mathbf{x}^{(j)}\big\|^2 = (\mathbf{x}^{(i)})^T\mathbf{x}^{(i)} + (\mathbf{x}^{(j)})^T\mathbf{x}^{(j)} - 2(\mathbf{x}^{(i)})^T\mathbf{x}^{(j)}$$
- 모든 내적을 모은 **그램 행렬(Gram matrix)**:
$$\boxed{\mathbf{B} = \mathbf{X}\mathbf{X}^T}$$
- $\mathbf{B}$를 알면 고유값 분해로 좌표 $\mathbf{X}$ 복원 가능. 하지만 우리는 $\mathbf{D}$만 가짐 → **Double-Centering(더블 센터링)** 으로 $\mathbf{D}\to\mathbf{B}$ 변환:
$$B_{ij} = -\frac{1}{2}\Big(d_{ij}^2 - \bar{d}_{i\cdot}^2 - \bar{d}_{\cdot j}^2 + \bar{d}_{\cdot\cdot}^2\Big)$$
- 💬 (전사) 행 평균·열 평균을 빼고 전체 평균을 더함 = 데이터를 평균 0으로 센터링하는 것과 동일. 행렬형: $\mathbf{B} = \tilde{\mathbf{X}}\tilde{\mathbf{X}}^T$ ($\tilde{\mathbf{x}}^{(i)} = \mathbf{x}^{(i)} - \bar{\mathbf{x}}$).
- **고유값 분해(Eigendecomposition)**:
$$\mathbf{B} = \mathbf{V}\boldsymbol{\Lambda}\mathbf{V}^T \quad\Rightarrow\quad \boxed{\mathbf{X} = \mathbf{V}\boldsymbol{\Lambda}^{1/2}}$$
- 가장 큰 고유값·고유벡터를 선택하면 가장 중요한 기하 구조를 보존한 저차원 표현.

### 💡 3.3. PCA vs MDS (★★★ 교수님 강조 — XᵀX vs XXᵀ)
| 항목 | PCA | MDS (Classical) |
|------|-----|-----------------|
| 입력 | 데이터 행렬 $\mathbf{X}$ | 거리 행렬 $\mathbf{D}$ |
| 분해 대상 | **공분산** $\mathbf{S} = \tfrac{1}{N}\mathbf{X}^T\mathbf{X}$ (변수 간 관계) | **그램** $\mathbf{B} = \mathbf{X}\mathbf{X}^T$ (샘플 간 관계) |
| 관점 | feature(변수) 간 관계 | sample(데이터) 간 관계 |

- 💡 **결과적 동일성**: 거리를 **유클리드**로 쓰는 **Classical MDS = PCA** (완전히 같은 결과!).
- **증명**: PCA의 $\mathbf{X}^T\mathbf{X}\mathbf{u} = \lambda\mathbf{u}$ 양변에 $\mathbf{X}$를 곱하면
$$\mathbf{X}(\mathbf{X}^T\mathbf{X}\mathbf{u}) = \mathbf{X}(\lambda\mathbf{u}) \;\Rightarrow\; (\mathbf{X}\mathbf{X}^T)(\mathbf{X}\mathbf{u}) = \lambda(\mathbf{X}\mathbf{u}) \;\Rightarrow\; (\mathbf{X}\mathbf{X}^T)\mathbf{v} = \lambda\mathbf{v}$$
즉 MDS의 그램 행렬 고유값 문제와 같은 형태($\mathbf{v}=\mathbf{X}\mathbf{u}$).

### 3.4. 한계와 확장
- **Classical MDS = 선형** → 스위스 롤 같은 비선형 구조 실패.
- **Non-Metric MDS**: 거리(dissimilarity) 정의를 비선형으로 바꿔 복잡한 구조 포착. 💬 (전사) Classical은 매우 빠름(0.053초), Non-metric은 느리지만(약 10초) 구조 파악에 유리.

---

## 4. 🎨 t-SNE (t-Distributed Stochastic Neighbor Embedding)

### 4.1. 개념 (슬라이드 직접 인용)
> t-SNE is a **non-linear** dimensionality reduction technique used to visualize high-dimensional data in 2D or 3D. Its main purpose is to capture **the local structure** of the data by preserving pairwise similarities.

- 핵심: MDS가 '거리'를 다뤘다면, t-SNE는 유사도를 **확률(probability)** 로 변환(stochastic). 고차원·저차원에 각각 분포를 정의하고 **두 분포를 일치**시킴.

### 💡 4.2. ① 고차원 분포 $P$ — 가우시안 (★★★)
$$p_{j|i} = \frac{\exp\!\big(-\big\|\mathbf{x}^{(i)}-\mathbf{x}^{(j)}\big\|^2/2\sigma_i^2\big)}{\sum_{k\ne i}\exp\!\big(-\big\|\mathbf{x}^{(i)}-\mathbf{x}^{(k)}\big\|^2/2\sigma_i^2\big)}, \qquad p_{i|i}=0$$
- **가우시안을 쓰는 이유**: 거리가 멀어지면 확률이 급격히 0으로 떨어져 **가까운 이웃(로컬)에게만** 높은 유사도 부여.
- **대칭화(Symmetrization)**: $\sigma_i\ne\sigma_j$라 $p_{j|i}\ne p_{i|j}$(비대칭) → 평균으로 대칭화:
$$\boxed{p_{ij} = \frac{p_{j|i}+p_{i|j}}{2N}}$$

### 💡 4.3. ② 저차원 분포 $Q$ — Student's t-분포 (★★★)
$$q_{ij} = \frac{\big(1+\big\|\mathbf{y}^{(i)}-\mathbf{y}^{(j)}\big\|^2\big)^{-1}}{\sum_{k\ne l}\big(1+\big\|\mathbf{y}^{(k)}-\mathbf{y}^{(l)}\big\|^2\big)^{-1}}, \qquad q_{ii}=0$$
- **t-분포를 쓰는 이유 — Crowding Problem 해결**: 고차원을 저차원에 욱여넣으면 점들이 비정상적으로 뭉치는 crowding 발생. t-분포는 가우시안보다 **피크가 낮고 꼬리가 두꺼운(heavy tail)** 형태라, 저차원에서 점들이 **적당히 퍼지도록** 유도(먼 점은 먼 채로 유지).

### 💡 4.4. ③ 목적 함수 — KL Divergence (★★★)
$$KL(P\,\|\,Q) = \sum_{i\ne j} p_{ij}\log\frac{p_{ij}}{q_{ij}}$$
- 두 분포 $P,Q$의 차이를 측정. t-SNE는 이 KL을 **최소화**하도록 저차원 좌표 $\mathbf{Y}$를 **경사하강법(Gradient Descent)** 으로 갱신:
$$\frac{\partial KL}{\partial\mathbf{y}^{(i)}} = 4\sum_j (p_{ij}-q_{ij})\big(\mathbf{y}^{(i)}-\mathbf{y}^{(j)}\big)\big(1+\big\|\mathbf{y}^{(i)}-\mathbf{y}^{(j)}\big\|^2\big)^{-1}$$

### 💡 4.5. 하이퍼파라미터: Perplexity
- 고차원 가우시안의 분산 $\sigma_i$를 직접 정하는 대신 **perplexity**로 지정(점마다 $\sigma_i$ 다름):
$$\text{Perplexity}(P_i) = 2^{H(P_i)}, \qquad H(P_i) = -\sum_j p_{j|i}\log_2 p_{j|i}$$
- perplexity = **유효 이웃 수**. 작으면 아주 가까운 로컬에 집중, 크면 넓은 이웃 구조 반영. 💬 (전사) 보통 여러 값을 돌려보거나 패키지 기본값 사용.

---

## 5. 🕸️ UMAP (Uniform Manifold Approximation and Projection)

### 5.1. 개념 — t-SNE와의 결정적 차이 (슬라이드 직접 인용)
> Unlike t-SNE, which models pairwise similarities using **probability distributions** and minimizes KL divergence, UMAP **constructs a weighted graph** to capture the local structure and then learns a low-dimensional embedding that preserves this **graph structure**.

- t-SNE = 확률 분포, **UMAP = 그래프 구조**. 2018년 등장, 실무·연구에서 자주 쓰임.

### 💡 5.2. ① 고차원 — 그래프 가중치 (★★★)
- 모든 쌍 대신 **$k$-최근접 이웃**만 사용: $N_k(i) = \{\,j\ne i : \mathbf{x}^{(j)}\text{가 }\mathbf{x}^{(i)}\text{의 }k\text{개 최근접}\,\}$.
- 유사도(weight):
$$w_{ij} = \exp\!\left(-\frac{d(\mathbf{x}^{(i)},\mathbf{x}^{(j)}) - \rho_i}{\sigma_i}\right), \qquad \rho_i = \min_{j\in N_k(i)} d(\mathbf{x}^{(i)},\mathbf{x}^{(j)})$$
- $\rho_i$ (**최소 거리**): 가장 가까운 이웃까지 거리를 빼줌 → 빽빽하든 듬성하든 **최소 한 이웃과는 강하게 연결**(로컬 정규화).
- $\sigma_i$ (**local bandwidth**): $k$를 정하면 $\sum_{j\in N_k(i)}\exp(-(d-\rho_i)/\sigma_i) \approx \log_2(k)$를 만족하도록 자동 결정.
- **대칭화 — Fuzzy-Set Union** (t-SNE의 단순 평균과 다름!):
$$\boxed{w_{ij}^{(sym)} = w_{ij} + w_{ji} - w_{ij}w_{ji}}$$
어느 방향이든 강하면 강하게, 둘 다 강하면 더 강하게(빼기 항은 중복 방지).

### 💡 5.3. ② 저차원 — 유연한 함수 (t-분포 대신)
$$v_{ij} = \frac{1}{1 + a\,\big\|\mathbf{y}^{(i)}-\mathbf{y}^{(j)}\big\|^{2b}}$$
- 💬 (전사) Q&A "$a,b$도 하이퍼파라미터인가요?" → 교수님 **"$k$나 $\rho$ 값을 정하면 모델 내에서 $a,b$가 자동 결정됨(직접 튜닝 X)"**.

### 💡 5.4. ③ 목적 함수 — Cross-Entropy (★★★)
$$L = \sum_{i\ne j}\left[\,w_{ij}^{(sym)}\log\frac{w_{ij}^{(sym)}}{v_{ij}} + \big(1-w_{ij}^{(sym)}\big)\log\frac{1-w_{ij}^{(sym)}}{1-v_{ij}}\,\right]$$
- 고차원 그래프 가중치와 저차원 유사도의 불일치를 측정하는 **크로스 엔트로피**를 최소화. 실제로는 **SGD + Negative Sampling**(연결된 쌍은 당기고, 샘플된 비연결 쌍은 밀어냄).

### 5.5. 하이퍼파라미터·특징
- 주요 하이퍼파라미터: **$k$**(이웃 수, 작을수록 로컬 집중), **$\rho$**(최소 거리 제약).
- 💬 (전사) UMAP은 MNIST에서 t-SNE보다 클래스가 **더 극명하게 뭉쳐서** 분리됨. 단 교수님 통찰: **극명한 분리가 무조건 좋은 건 아님** — 실제 데이터 변동성인지, 모델이 인위적으로 분리한 것인지 확인 어려움. 다만 '시각화' 목적엔 구별이 잘 돼 선호.

---

## 6. 🧠 Auto-Encoder (전사·강의 보강 — 슬라이드 외)

> ⚠️ 슬라이드에는 없고 강의 전사에서만 언급된 내용(신경망으로의 연결).

- **개념**: 신경망(Neural Network) 기반 차원 축소·매니폴드 학습.
- **구조**: 입력을 넣고 출력으로 **동일한 입력을 복원(reconstruction)** 하도록 훈련.
- **작동 원리 — Bottleneck(병목)**: 중간 은닉층 차원을 입력보다 훨씬 작게 → 좁은 병목을 통과해 복원해야 하므로 네트워크가 **가장 중요한 히든 구조(핵심 피처)만 압축** 학습.
- **의의**: 2006년 **Geoffrey Hinton**의 Science 논문에서 PCA와 비교 → 오토인코더가 PCA보다 **비선형 차원 축소에서 압도적 우수**함을 증명.

---

## 7. 🧩 4기법 한눈 비교 (★★★ 시험 직전 필수 암기)

| 항목 | PCA | MDS (Classical) | t-SNE | UMAP |
|------|-----|-----------------|-------|------|
| 선형/비선형 | 선형 | 선형(Euclid=PCA) | **비선형** | **비선형** |
| 입력 | 데이터 $\mathbf{X}$ | 거리 $\mathbf{D}$ | 데이터 | 데이터 |
| 핵심 행렬/구조 | 공분산 $\mathbf{X}^T\mathbf{X}$ | 그램 $\mathbf{X}\mathbf{X}^T$ | 확률 분포 $P,Q$ | **그래프** 가중치 |
| 고차원 표현 | 분산 | 거리(내적) | **가우시안** $P$ | 그래프 weight (KNN+$\rho$) |
| 저차원 표현 | 투영 | 좌표 복원 | **t-분포** $Q$ | 유연 함수 $v_{ij}$ |
| 목적 함수 | 분산 최대(고유분해) | 거리 보존(고유분해) | **KL Divergence** | **Cross-Entropy** |
| 최적화 | 고유값 분해 | 고유값 분해 | Gradient Descent | SGD + Negative Sampling |
| 대칭화 | — | — | 평균 $(p_{j\mid i}+p_{i\mid j})/2N$ | **Fuzzy union** $w_{ij}+w_{ji}-w_{ij}w_{ji}$ |
| 주 용도 | 압축·전처리 | 거리 시각화 | 로컬 구조 시각화 | 시각화(더 강한 군집) |

---

## 8. 🗣️ 교수님 Q&A · 공지 (강의 전사 기반)

### Q&A
- **Q. (UMAP) $a, b$도 하이퍼파라미터인가요?** → A. **아니다. $k$나 $\rho$를 정하면 $a,b$는 모델 내에서 자동 결정**된다(직접 튜닝 X).
- **(MDS) 더블 센터링** = 행렬을 평균 0으로 센터링하는 과정과 동일($\mathbf{B}=\tilde{\mathbf{X}}\tilde{\mathbf{X}}^T$).
- **(UMAP 통찰)** 극명하게 뭉친 시각화가 무조건 좋은 건 아님(실제 변동성 vs 인위적 분리 구분 어려움). 시각화 목적엔 유용.

### 📢 공지
- **다음 주(마지막)**: **뉴럴 네트워크(Neural Network) 기초**를 1~2챕터(딥러닝보다 단순한 역사 느낌)로 다루고 마무리.
- **기말고사**: 다음 주 진행, 포맷은 **중간고사와 거의 동일**. 범위 = **중간 이후 ~ 다음 주(NN 기초)** 까지.

---

## 9. 🎯 12주차 최종 암기 체크리스트

### Manifold 개요
- [ ] Manifold = 고차원에 임베딩됐지만 국소적으로 저차원처럼 행동하는 매끄러운 구조 (스위스 롤)
- [ ] 매니폴드 학습 = 기하·위상 속성 보존하며 저차원 표현

### PCA (매니폴드 관점)
- [ ] PCA = **선형** 매니폴드 학습 → 비선형(스위스 롤) 실패 ★★★

### MDS
- [ ] 입력 = 거리 행렬 $\mathbf{D}$, 목표 $\|\mathbf{x}^{(i)}-\mathbf{x}^{(j)}\|\approx d_{ij}$
- [ ] 거리² = 내적 조합 → 그램 $\mathbf{B}=\mathbf{X}\mathbf{X}^T$ ★★★
- [ ] **Double-centering** $B_{ij}=-\tfrac12(d_{ij}^2-\bar d_{i\cdot}^2-\bar d_{\cdot j}^2+\bar d_{\cdot\cdot}^2)$
- [ ] $\mathbf{B}=\mathbf{V}\boldsymbol\Lambda\mathbf{V}^T$ → $\mathbf{X}=\mathbf{V}\boldsymbol\Lambda^{1/2}$
- [ ] **PCA $\mathbf{X}^T\mathbf{X}$(공분산) vs MDS $\mathbf{X}\mathbf{X}^T$(그램)**, Euclid면 **Classical MDS = PCA** ★★★
- [ ] 증명: $\mathbf{X}^T\mathbf{X}\mathbf{u}=\lambda\mathbf{u}$ → $\mathbf{X}$ 곱 → $\mathbf{X}\mathbf{X}^T(\mathbf{X}\mathbf{u})=\lambda(\mathbf{X}\mathbf{u})$
- [ ] Non-metric MDS = 비선형 dissimilarity로 확장

### t-SNE
- [ ] 비선형·로컬·확률적
- [ ] 고차원 $P$ = **가우시안** $p_{j|i}$, 대칭화 $p_{ij}=(p_{j|i}+p_{i|j})/2N$ ★★★
- [ ] 저차원 $Q$ = **t-분포**(heavy tail) → **Crowding Problem** 해결 ★★★
- [ ] 목적 = **KL Divergence** 최소화(Gradient Descent) ★★★
- [ ] **Perplexity** $=2^{H(P_i)}$ = 유효 이웃 수, $\sigma_i$ 결정

### UMAP
- [ ] 비선형·**그래프** 기반(t-SNE는 확률 분포) ★★★
- [ ] KNN $N_k(i)$, $w_{ij}=\exp(-(d-\rho_i)/\sigma_i)$, $\rho_i$=최소거리
- [ ] 대칭화 = **Fuzzy union** $w_{ij}+w_{ji}-w_{ij}w_{ji}$ (t-SNE 평균과 다름) ★★★
- [ ] 저차원 $v_{ij}=1/(1+a\|\cdot\|^{2b})$, $a,b$ 자동
- [ ] 목적 = **Cross-Entropy** 최소화(SGD+Negative Sampling) ★★★
- [ ] 하이퍼파라미터 $k,\rho$. 더 강한 군집(무조건 좋은 건 아님)

### Auto-Encoder (전사)
- [ ] 신경망·**Bottleneck**으로 핵심 피처 압축·복원
- [ ] Hinton 2006 Science: AE > PCA(비선형)

### 비교 핵심 (★★★)
- [ ] 선형(PCA, MDS) vs 비선형(t-SNE, UMAP)
- [ ] PCA $\mathbf{X}^T\mathbf{X}$ vs MDS $\mathbf{X}\mathbf{X}^T$
- [ ] t-SNE 가우시안+t분포+**KL** vs UMAP 그래프+**Cross-Entropy**

### 다음 주 (기말 마지막)
- [ ] Neural Network 기초
