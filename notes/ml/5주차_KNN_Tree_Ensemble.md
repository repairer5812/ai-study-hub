# 기계학습5주차

## 1. 생성 모델(Generative Model)과 판별 모델(Discriminative Model) 복습

### 핵심 출제 포인트: 판별 모델과 생성 모델의 목적과 차이점

### 판별 모델 (Discriminative Model)

- 목적: $X$가 주어졌을 때 $Y$값을 예측하는 것. 즉, 조건부 확률 $P(Y \mid X)$에 관심이 많음.
- 예시: Linear Regression, Logistic Regression

### 생성 모델 (Generative Model)

- 목적: $X$와 $Y$가 어떻게 생성되는가, 즉 생성 프로세스 자체에 관심이 있음. 결합 확률(Joint Probability) $P(X, Y)$를 추정함.
- 특징: $P(X, Y) = P(X \mid Y)P(Y)$로 쪼개어 계산.
    - $P(X \mid Y)$: Likelihood ($Y$가 주어졌을 때 $X$가 어떻게 생성되는지, 추정하기 매우 어려움)
    - $P(Y)$: Prior (사전 확률, 상대적으로 추정하기 쉬움)
- 활용: 주 목적은 데이터 생성이지만, 베이즈 정리를 이용해 판별(Classification) 목적으로도 사용 가능함. $P(Y \mid X) \propto P(X \mid Y)P(Y)$
- 예시: Naive Bayes, LDA (Linear Discriminant Analysis)

### 1.1 Naive Bayes 모델 복습

- 가장 큰 가정이자 핵심: 클래스($Y$)가 주어졌을 때, $X$를 구성하는 여러 피처(Feature)들이 서로 독립적(Independent)일 것이라는 큰 가정(Assumption)을 내림.
- 장점: 이 가정 덕분에 복잡한 Likelihood $P(X \mid Y)$의 계산이 엄청나게 간단해짐.
- 교수님 예시: 20x20 픽셀 이미지(총 400개 피처)로 강아지/고양이 판별 시, 원래는 픽셀끼리 영향을 주지만 나이브 베이즈는 서로 영향을 안 준다고 가정함. 스팸 메일 분류 시 피처가 Binary(단어 유무), Categorical, Continuous 하든 쉽게 확장 가능함.

---

## 2. LDA (Linear Discriminant Analysis)

### 핵심 출제 포인트: LDA의 두 가지 접근법 (확률론적 생성 모델 vs 기하학적 Fisher’s LDA)

LDA는 데이터를 가장 잘 구별할 수 있는 선형 함수(Linear Function)를 찾는 빠르고 기본적인 분류기(Classifier)입니다.

### 2.1 확률론적 생성 모델 접근법 (Probabilistic View)

- 분포 가정: 각 클래스의 데이터 피처($X$)가 정규 분포(Normal Distribution / Gaussian)를 따른다고 가정함. (평균 $\mu$, 공분산 $\Sigma$)
- 결정적 가정 (매우 중요): 두 클래스의 공분산(퍼져있는 정도)이 서로 같다고 가정함 ($\Sigma_1 = \Sigma_2 = \Sigma$).
- 내 메모 반영: 만약 공분산이 다르면 Decision boundary가 곡선(Non-linear)으로 굽혀져서 나옴. 하지만 공분산이 같다고 가정하기 때문에 결정 경계가 일직선(Linear)으로 쫙 펴지게 됨.
- 수식 전개: 두 클래스의 확률 함수를 로그 취하고 빼서 0으로 만드는 식($g_1(x) - g_2(x) = 0$)을 풀면, 이차항이 소거되고 $wx + b = 0$ 형태의 1차 함수(Linear form)만 남음.
- 가중치 $W$의 형태:
    
    $$
    W \propto \Sigma^{-1}(\mu_1 - \mu_2)
    $$
    

### 2.2 기하학적 접근법 (Geometric View / Fisher’s LDA)

- 목표: 고차원(예: 2D)의 데이터를 한 차원 낮은 공간(예: 1D 선)에 투영(Projection, 수직으로 내림)했을 때, 두 클래스가 가장 잘 구별되는 선을 찾는 것.
- 초기 아이디어 (Mean Separation): 투영된 점들의 평균값($m_1, m_2$)의 차이를 최대화하자. 목적함수: $m_2 - m_1$.
- 문제점: 단순히 방향만 같고 상수 배가 커지는 문제를 막기 위해 $||W|| = 1$이라는 제약 조건을 둔 최적화 문제(Lagrange Multiplier 이용)로 풀어야 함.
- Fisher의 주장 (진정한 해결책): 단순히 평균값의 차이만 크게 하는 것은 정답이 아님.
- 내 메모 반영: 평균 차이가 크더라도 분산이 크면 데이터가 섞여서 분류가 잘 안 됨.
- 따라서 투영했을 때 분포의 내부 분산(Within-class variance)은 작게 만들고, 평균의 차이(Between-class variance)는 크게 만드는 밸런스를 맞춰야 함.
- 목적 함수 (Objective Function): 분자에는 평균 차이의 제곱을, 분모에는 내부 분산의 합($S_1^2 + S_2^2$)을 두어 이 값을 최대화하는 $W$를 찾음.
- 결과: 기하학적으로 접근해서 고유값 문제(Eigen problem)를 풀어 나온 $W$와 확률론적으로 접근해서 나온 $W$의 형태가 결국 동일하게 나옴.

### Q&A: LDA와 PCA의 차이점은?

- 학생 질문: 이거 PCA랑 비슷한 것 같은데 어떻게 다른가요? 차원 축소도 1차원으로만 하나요?
- 교수님 답변:
    - 반드시 1차원일 필요는 없으며 멀티 클래스면 여러 차원(Eigen vector 여러 개)으로 투영 가능함.
    - PCA(주성분 분석): 비지도 학습(Unsupervised)으로, 단순히 데이터의 분산(Variance)을 최대화하는 방향으로 차원을 축소함. 클래스 라벨($Y$)이 필요 없음.
    - LDA: 지도 학습(Supervised) 느낌으로, 클래스를 잘 구별(Classification)하는 것이 목적임. 따라서 라벨($Y$)이 반드시 있어야 Between-class와 Within-class를 계산할 수 있음.

---

## 3. 파라메트릭(Parametric) 모델 vs 논파라메트릭(Non-Parametric) 모델

### 핵심 출제 포인트: 두 모델의 명확한 정의와 차이점

### 파라메트릭 모델 (Parametric Model)

- 정의: 특정한 함수 형태(Functional form)를 가정하는 모델. (예: $y = f(x, w)$)
- 특징: 학습의 주 목적은 가중치(파라미터) $W$를 찾는 것.
- 데이터 활용: 트레이닝 데이터로 $W$를 학습하고 나면, 새로운 데이터를 예측(Test)할 때 트레이닝 데이터 자체는 더 이상 필요하지 않음. 오직 $W$만 사용하여 예측함.
- 예시: Linear Regression, Logistic Regression, Naive Bayes, LDA

### 논파라메트릭 모델 (Non-Parametric Model)

- 정의: 특정한 함수 형태(Functional form)가 없고, 파라미터의 수가 고정되어 있지 않은 모델.
- 특징: 모델의 복잡도(Complexity)가 트레이닝 데이터의 양에 따라 증가함.
- 데이터 활용: 새로운 데이터를 예측할 때 트레이닝 데이터 자체가 필요한 경우가 많음.
- 예시: KNN (K-Nearest Neighbors), Decision Tree

---

## 4. KNN (K-Nearest Neighbors) Classifier

### 핵심 출제 포인트: KNN의 베이지안 수식 유도 과정과 K값에 따른 결정 경계 변화

### 4.1 기본 컨셉

- 아이디어: 새로운 데이터 $X$가 주어졌을 때, 주변에 설정한 반경 내에서 가장 가까운 K개의 이웃(Neighbors)을 찾고, 그 이웃들의 클래스 비율을 확인하여 다수결(Majority vote)로 클래스를 결정함.
- 특징: 선(Decision boundary)을 찾는 것이 목적이 아니라, $K$라는 범위를 지정하고 그 범위 내의 데이터 분포를 확인하는 직관적이고 단순한 방식.

### 4.2 KNN의 수학적 백그라운드 (베이즈 정리 적용)

교수님께서 KNN이 단순히 직관적인 알고리즘을 넘어 확률적으로 어떻게 설명되는지 수식으로 증명하셨습니다.

- 목표: $P(C_c \mid X)$ (데이터 $X$가 주어졌을 때 클래스 $C_c$일 확률)을 최대화하는 클래스 찾기.
- Prior (사전 확률) $P(C_c)$: 전체 데이터 $N$개 중 클래스 $c$의 데이터 $N_c$개의 비율.
    
    $$
    \approx \frac{N_c}{N}
    $$
    
- Likelihood $P(X \mid C_c)$: KNN은 특정 확률 분포(예: 가우시안)를 가정하지 않고 개수를 통해 추정함.

($V$: K개의 이웃이 포함된 공간의 부피, $K_c$: K개 중 클래스 $c$인 데이터 수)
    
    $$
    \approx \frac{K_c}{N_c V}
    $$
    
- Evidence (분모) $P(X)$:
    
    $$
    \approx \sum \frac{K_c}{N V} = \frac{K}{N V}
    $$
    
- 결과 도출:
    
    $$
    P(C_c \mid X) = \frac{P(X \mid C_c)P(C_c)}{P(X)} \approx \frac{\frac{K_c}{N_c V} \times \frac{N_c}{N}}{\frac{K}{N V}} = \frac{K_c}{K}
    $$
    
- 결론: 즉, $K$개 중에 클래스 $c$가 몇 개($K_c$) 있느냐의 비율로 아주 간단하게 정리됨.

### 4.3 K값과 결정 경계 (Decision Boundary)

모든 공간의 점들에 대해 KNN을 수행하면 결정 경계를 그릴 수 있음.
- K가 작을 때 (예: K=1): 결정 경계가 매우 복잡하고 노이즈에 민감함 (Overfitting 경향).
- K가 클 때 (예: K=31): 결정 경계가 부드러워짐(Smooth).

### Q&A: KNN 관련 질의응답

- 학생 질문: 수식에서 부피 $V$는 어떻게 되나요? K가 커지면 범위가 넓어지는데 문제없나요?
- 교수님 답변: K가 커지면 밀도를 측정하는 공간의 부피 $V$도 당연히 커짐. 하지만 베이즈 정리 수식의 분자와 분모에 모두 $V$가 포함되어 있어 결국 약분되어 사라짐. 따라서 실제 클래스 결정에는 전혀 영향을 미치지 않음.
- 학생 질문: KNN은 주로 어떤 목적에 쓰이나요?
- 교수님 답변: 아이디어가 매우 단순하기 때문에, 본격적인 모델링 전 베이스라인 성능이 얼마나 나오는지 빠르게(Quick) 돌려보고 확인하는 용도로 많이 씀. 퍼포먼스 자체가 아주 높게 나오지는 않는 편임.

---

## 5. Decision Tree (의사결정나무)

### 핵심 출제 포인트: Information Gain과 Impurity의 개념, 그리고 분할(Split) 기준

### 5.1 기본 컨셉

- 스무고개나 플로우 차트(Flow chart)처럼 질문(Feature)을 던지며 데이터를 분할해 나가는 방식.
- 목표: 계속 가지(Branch)를 나누어 최종 잎사귀 노드(Leaf node)에 도달했을 때, 해당 노드의 데이터들이 하나의 클래스로 완벽하게 구별(Pure)되도록 만드는 것.

### 5.2 Overfitting과 Pruning (가지치기)

- 문제점: 가지수를 무한히 늘리면(Recursive하게 깊게 만들면) 트레이닝 데이터는 100% 완벽하게 분류할 수 있음. 하지만 이는 트레이닝 셋에 너무 맞춰진 오버피팅(Overfitting) 상태가 되어 새로운 데이터(Test set)에서는 성능이 폭락함.
- 해결책 (Pruning): 정규화(Regularization) 기법의 일환으로, 나무의 깊이를 제한하거나 가지수를 쳐내는 Pruning(가지치기)을 수행하여 모델을 단순화하고 일반화(Generalization) 성능을 높임.

### 5.3 Information Gain (정보 획득량)과 Impurity (불순도)

- Impurity (불순도): 특정 노드에 여러 클래스의 데이터가 얼마나 섞여 있는지를 나타내는 지표.
    - 완벽히 한 클래스만 있으면 불순도 = 0.
    - 반반 섞여 있으면 불순도 최대.
- Information Gain (IG): 부모 노드의 불순도에서 자식 노드들의 불순도(가중 평균)를 뺀 값.
- 목표: Information Gain이 최대화(High) 되는, 즉 분할 후 불순도가 가장 많이 감소하는 Feature를 찾아 가지를 나눔.
- 수식:
    
    $$
    IG = I(D_p) - \sum \frac{N_{child}}{N_{parent}} I(D_{child})
    $$
    

### 5.4 세 가지 Impurity 계산 방식 (매우 중요)

### Entropy (엔트로피)

- 정보이론에서 온 개념으로 복잡도를 의미. 식:
    - $\sum p_i \log_2 p_i$
- 완벽히 순수하면 0, 두 클래스가 반반 섞여 있으면 1 (최댓값).

### Gini Impurity (지니 불순도)

- 식:
    
    $$
    1 - \sum p_i^2
    $$
    
- 엔트로피와 거의 비슷한 결과를 내지만, 최댓값이 0.5임. (반반 섞였을 때 $1 - (0.5^2 + 0.5^2) = 0.5$)

### Classification Error (분류 오차)

- 식:
    
    $$
    1 - \max(p_i)
    $$
    
- 가장 빈도가 높은 클래스를 제외한 나머지 에러 비율.
- 주의: 이 방식은 트리 성장(Growing)보다는 주로 Pruning(가지치기) 시에 평가 지표로 많이 쓰임.

---

## 6. Decision Tree의 한계와 앙상블(Ensemble)의 등장

- Decision Tree의 치명적 단점 (Instability, 불안정성): 데이터에 아주 작은 변화(Minor variation)만 생겨도 트리의 구조가 완전히 다르게 생성될 수 있습니다.
- 해결책: 여러 개의 트리를 생성하여 합치는 앙상블 기법(예: 랜덤 포레스트)을 사용합니다. 단, 성능(Performance)은 올라가지만 트리의 장점이었던 해석력(Interpretability)은 희생됩니다.

---

## 7. 앙상블 학습 (Ensemble Methods)

### 핵심 출제 포인트: 앙상블의 기본 원리와 오류율(Error rate) 감소 증명

- 기본 컨셉: “백지장도 맞들면 낫다.” 여러 개의 개별 분류기(Base Classifiers)를 결합하여 하나의 강력한 분류기를 만드는 방법입니다.
- 투표 방식 (Voting Methods):
    - Majority Voting (다수결 투표): 각 분류기가 예측한 클래스 중 가장 많은 표를 받은 클래스를 최종 선택.
    - Soft Voting: 각 분류기가 예측한 확률(Probability)의 평균을 내어 최종 클래스를 결정.
    - Weighted Voting (가중치 투표): 성능이 더 좋은 분류기에게 더 높은 가중치(Weight)를 부여하여 투표.

### 7.1 앙상블은 왜 성능이 더 좋을까? (수학적 증명)

개별 분류기들이 서로 독립적(Independent)이라고 가정할 때, 앙상블의 오류율은 이항 분포(Binomial distribution)를 따릅니다.

- 예시: 에러율($\epsilon$)이 0.25인 분류기 11개를 다수결 투표로 묶는다면? 11개 중 과반수(6개 이상)가 틀려야 앙상블 전체가 틀리게 됩니다.
    
    $$
    P(\text{ensemble error}) = \sum_{k=6}^{11} \binom{11}{k} (0.25)^k (0.75)^{11-k} \approx 0.034
    $$
    
- 결과: 즉, 개별 에러율 25%가 앙상블을 거치면 3.4%로 획기적으로 감소합니다.
- 조건: 단, 개별 분류기의 성능이 무작위 찍기(Random guessing)보다는 좋아야 합니다. ($\epsilon < 0.5$)

---

## 8. 배깅 (Bagging) 과 랜덤 포레스트 (Random Forest)

### 8.1 배깅 (Bagging = Bootstrap Aggregating)

- Bootstrap (복원 추출): 원본 트레이닝 데이터에서 중복을 허용(With replacement)하여 무작위로 데이터를 여러 번 뽑아 여러 개의 새로운 데이터셋(Bootstrap samples)을 만듭니다.
- Aggregating: 각각의 데이터셋으로 독립적인 분류기를 학습시킨 뒤, 그 결과들을 다수결(Majority voting)로 합칩니다.

### 8.2 랜덤 포레스트 (Random Forest)

### 핵심 출제 포인트: 랜덤 포레스트가 Decision Tree의 오버피팅을 방지하는 원리

- 정의: 배깅(Bagging) 기법을 Decision Tree에 적용한 구체적인 모델입니다.
- 핵심 특징 (Tree간의 상관관계 감소):
    - 단순히 데이터를 복원 추출할 뿐만 아니라, 노드를 분할(Split)할 때 전체 피처(Feature) 중 무작위로 일부 피처(Random subset of features)만 선택하여 그중에서 가장 좋은 피처로 분할합니다.
    - 이로 인해 트리들이 서로 다르게 성장하여 노이즈에 강해지고 오버피팅을 방지합니다.
- 장점:
    - 오버피팅에 매우 강하기 때문에 굳이 가지치기(Pruning)를 할 필요가 없습니다.
    - 하이퍼파라미터 튜닝에 크게 신경 쓸 필요가 없습니다. 실무에서는 트리의 개수 정도만 신경 쓰면 되며, 트리가 많을수록 연산량은 늘어나지만 성능은 좋아집니다.

---

## 9. 부스팅 (Boosting) 과 AdaBoost

### 핵심 출제 포인트: Bagging과 Boosting의 차이점 및 AdaBoost의 가중치 업데이트 메커니즘

- 배깅과의 차이점: 배깅은 여러 모델을 독립적/병렬적으로 학습시키지만, 부스팅은 순차적(Sequentially)으로 학습시킵니다.
- 기본 컨셉: 이전 분류기가 틀린(Misclassified) 데이터에 더 큰 가중치(Weight)를 부여하여, 다음 분류기가 그 어려운 문제에 집중(Focus)하도록 만듭니다.

### 9.1 AdaBoost (Adaptive Boosting) 알고리즘 스텝

- 가중치 초기화: 모든 데이터 $n$개에 대해 동일한 가중치 $w^{(i)} = \frac{1}{n}$ 부여.
- 분류기 학습: 현재 가중치가 반영된 데이터로 약한 분류기(Weak classifier) $C_j$ 학습.
- 에러율($\epsilon_j$) 계산: 잘못 분류된 데이터들의 가중치 합을 구함.
- 분류기 가중치($\alpha_j$) 계산:

에러율이 낮을수록 해당 분류기의 발언권(가중치 $\alpha$)이 커집니다.
    
    $$
    \alpha_j = \frac{1}{2} \log\left( \frac{1-\epsilon_j}{\epsilon_j} \right)
    $$
    
- 데이터 가중치 업데이트:
    
    $$
    w_{j+1}^{(i)} \leftarrow w_j^{(i)} \exp(-\alpha_j y^{(i)} \hat{y}_j^{(i)})
    $$
    
- 결과: 맞춘 데이터는 가중치가 감소하고, 틀린 데이터는 가중치가 증가합니다.
- 정규화: 가중치들의 합이 1이 되도록 다시 나눠줌.
- 최종 예측: 라운드가 끝난 후, 각 분류기의 예측값에 분류기 가중치($\alpha_j$)를 곱하여 부호(Sign)를 판별하는 가중치 다수결 투표 진행.

<!-- AUTO:SLIDES:START -->

---

## 강의 슬라이드 (원본 PDF 페이지 렌더)

### Week 5 · Non-parametric

<details><summary>슬라이드 59장 펼치기</summary>

![w5 p1](assets/images/ml/ml_w5_p01.jpg)

![w5 p2](assets/images/ml/ml_w5_p02.jpg)

![w5 p3](assets/images/ml/ml_w5_p03.jpg)

![w5 p4](assets/images/ml/ml_w5_p04.jpg)

![w5 p5](assets/images/ml/ml_w5_p05.jpg)

![w5 p6](assets/images/ml/ml_w5_p06.jpg)

![w5 p7](assets/images/ml/ml_w5_p07.jpg)

![w5 p8](assets/images/ml/ml_w5_p08.jpg)

![w5 p9](assets/images/ml/ml_w5_p09.jpg)

![w5 p10](assets/images/ml/ml_w5_p10.jpg)

![w5 p11](assets/images/ml/ml_w5_p11.jpg)

![w5 p12](assets/images/ml/ml_w5_p12.jpg)

![w5 p13](assets/images/ml/ml_w5_p13.jpg)

![w5 p14](assets/images/ml/ml_w5_p14.jpg)

![w5 p15](assets/images/ml/ml_w5_p15.jpg)

![w5 p16](assets/images/ml/ml_w5_p16.jpg)

![w5 p17](assets/images/ml/ml_w5_p17.jpg)

![w5 p18](assets/images/ml/ml_w5_p18.jpg)

![w5 p19](assets/images/ml/ml_w5_p19.jpg)

![w5 p20](assets/images/ml/ml_w5_p20.jpg)

![w5 p21](assets/images/ml/ml_w5_p21.jpg)

![w5 p22](assets/images/ml/ml_w5_p22.jpg)

![w5 p23](assets/images/ml/ml_w5_p23.jpg)

![w5 p24](assets/images/ml/ml_w5_p24.jpg)

![w5 p25](assets/images/ml/ml_w5_p25.jpg)

![w5 p26](assets/images/ml/ml_w5_p26.jpg)

![w5 p27](assets/images/ml/ml_w5_p27.jpg)

![w5 p28](assets/images/ml/ml_w5_p28.jpg)

![w5 p29](assets/images/ml/ml_w5_p29.jpg)

![w5 p30](assets/images/ml/ml_w5_p30.jpg)

![w5 p31](assets/images/ml/ml_w5_p31.jpg)

![w5 p32](assets/images/ml/ml_w5_p32.jpg)

![w5 p33](assets/images/ml/ml_w5_p33.jpg)

![w5 p34](assets/images/ml/ml_w5_p34.jpg)

![w5 p35](assets/images/ml/ml_w5_p35.jpg)

![w5 p36](assets/images/ml/ml_w5_p36.jpg)

![w5 p37](assets/images/ml/ml_w5_p37.jpg)

![w5 p38](assets/images/ml/ml_w5_p38.jpg)

![w5 p39](assets/images/ml/ml_w5_p39.jpg)

![w5 p40](assets/images/ml/ml_w5_p40.jpg)

![w5 p41](assets/images/ml/ml_w5_p41.jpg)

![w5 p42](assets/images/ml/ml_w5_p42.jpg)

![w5 p43](assets/images/ml/ml_w5_p43.jpg)

![w5 p44](assets/images/ml/ml_w5_p44.jpg)

![w5 p45](assets/images/ml/ml_w5_p45.jpg)

![w5 p46](assets/images/ml/ml_w5_p46.jpg)

![w5 p47](assets/images/ml/ml_w5_p47.jpg)

![w5 p48](assets/images/ml/ml_w5_p48.jpg)

![w5 p49](assets/images/ml/ml_w5_p49.jpg)

![w5 p50](assets/images/ml/ml_w5_p50.jpg)

![w5 p51](assets/images/ml/ml_w5_p51.jpg)

![w5 p52](assets/images/ml/ml_w5_p52.jpg)

![w5 p53](assets/images/ml/ml_w5_p53.jpg)

![w5 p54](assets/images/ml/ml_w5_p54.jpg)

![w5 p55](assets/images/ml/ml_w5_p55.jpg)

![w5 p56](assets/images/ml/ml_w5_p56.jpg)

![w5 p57](assets/images/ml/ml_w5_p57.jpg)

![w5 p58](assets/images/ml/ml_w5_p58.jpg)

![w5 p59](assets/images/ml/ml_w5_p59.jpg)

</details>

<!-- AUTO:SLIDES:END -->
