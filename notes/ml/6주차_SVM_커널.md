# 기계학습6주차

## 1. 🌳 의사결정나무 (Decision Tree) 리뷰

강의 초반부에서는 이전 시간에 배운 Decision Tree의 개념과 장단점을 짚고 넘어갔습니다. 이 장단점이 이후 등장할 앙상블 기법의 도입 배경이 되므로 정확한 이해가 필요합니다.

### 1.1. 기본 개념

- 구조: 플로우차트(Flowchart) 형태로 구성되며, 각 브랜치(Branch)마다 특정 피처(Feature)의 조건을 적용하여 최종적으로 리프 노드(Leaf Node)에 각 아이템이 특정 클래스에 배정되도록 합니다.
- 학습 방식: 트리를 계속 재귀적(Recursive)으로 만들어가며 분류기(Classifier)를 구성합니다.
- Decision Boundary의 특징: 피처가 축에 직교하는(딱딱 나뉘는) 형태로 분할되어 학습되기 때문에, Decision Area를 그려보면 직선 형태(계단식)로 나타납니다.

### 1.2. 장점과 단점

### 💡 장점: 높은 해석력 (Interpretability)

- “Easy to interpret” (직관적으로 이해하기 쉽다)
- 각 브랜치마다 어떤 피처를 사용했고, 어떤 조건(예: 왼쪽/오른쪽 브랜치)에 의해 결정되었는지 트래킹(Tracking)이 가능합니다.
- 왜 이 분류기가 이런 결론을 내렸는지 충분히 해석할 수 있습니다.

### 💡 단점: 불안정성 (Instability)

- 입력 데이터(Input)의 아주 조그마한 변화(Small variation)에도 예측 결과(Classification)가 쉽게 바뀌는 치명적인 단점이 있습니다.
- 교수님의 스팸 필터 예시:
    - content free 피처 외에도 word count(단어 수)를 피처로 사용할 수 있습니다.
    - 조건: 단어 수가 51 미만이거나 199 초과면 스팸, 그 사이(51~199)면 정상 메일로 판별.
    - 문제점: 단어 수가 딱 1만 증가해도(예: 50 $\rightarrow$ 51) 스팸에서 정상 메일로 분류가 완전히 뒤바뀔 수 있습니다. 즉, 조그만 인풋 변화에 매우 취약합니다.

---

## 2. 🤝 앙상블 기법 (Ensemble Methods) 개요

Decision Tree의 치명적인 단점인 ’불안정성’을 완화하기 위해 등장한 것이 바로 앙상블 기법입니다.

### 2.1. 핵심 아이디어 (Core Idea)

- 집단 지성 (Collective Intelligence): 단일 분류기(한 사람)의 결정에 의존하지 않고, 여러 개의 분류기를 모아서 그 결과를 통합하여 최종 결정을 내리는 방식입니다. 개별 모델보다 집단 지성이 더 뛰어날 것이라는 철학이 담겨 있습니다.
- 학습 과정: 트레이닝 셋이 있을 때 $Classifier_1, Classifier_2, \dots, Classifier_M$ 까지 여러 개를 만들고, 이를 다 합쳐서 특정 ‘투표(Voting)’ 방식에 의해 최종 예측값을 내놓습니다.

### 2.2. 투표 방식 (Voting Methods)

각 분류기가 내놓은 결과(예: Classifier 1은 A, Classifier 2는 B라고 예측)를 조정하는 방식입니다.

### 💡 다수결 투표 (Majority Voting / Hard Voting)

- 가장 간단한 방식. 단순히 가장 많은 표를 얻은 클래스를 최종 결과로 결정합니다.

### 💡 소프트 투표 (Soft Voting)

- 다수결에서 한 발짝 더 나아가, 각 분류기의 확신도(Confidence Value)를 고려합니다.
- 교수님 예시:
    - $Classifier_1$: A (70%), B (30%)
    - $Classifier_2$: A (10%), B (90%) - B에 대해 아주 강한 확신
    - $Classifier_3$: A (60%), B (40%)
    - 평균 계산: A = (0.7 + 0.1 + 0.6) / 3 = 0.47 | B = (0.3 + 0.9 + 0.4) / 3 = 0.53
    - 결과: 다수결로는 A가 2표로 이기지만, 소프트 보팅에서는 B의 평균 확신도(0.53)가 더 높으므로 B로 결론이 내려집니다.

### 💡 가중치 투표 (Weighted Voting)

- 특정 분류기가 더 믿을 만하다는 사전 정보(Prior Knowledge / Trial info)가 있을 때 사용합니다.
- 신뢰도가 높은 $Classifier_1$의 결과에 가중치(예: 2배)를 곱해주어 최종 결과를 산출합니다.

### 2.3. 앙상블의 강력함 (에러 감소 효과)

- 교수님 예시: 11개의 분류기가 있고, 각각 25%의 에러율을 가진다고 가정해봅시다. (개별로는 성능이 75%인 그저 그런 모델들입니다.)
- 이 11개를 앙상블로 묶어 다수결 투표(Majority Voting)를 진행하면, 전체 에러율은 3.4%로 극적으로 떨어집니다.

### 💡 조건 (시험 출제 포인트)

- 개별 분류기의 베이스 에러(Base Error)가 0.5(Chance level, 50%)보다 낮아야만 앙상블 에러가 무조건 베이스 에러보다 낮아지며 도움이 됩니다.

---

## 3. 🛍️ 배깅 (Bagging)과 랜덤 포레스트 (Random Forest)

### 3.1. 배깅 (Bagging = Bootstrap Aggregating)

- 개념: 앙상블 모델을 만들 때, 기존 트레이닝 데이터셋에서 랜덤하게 서브셋을 뽑아(Bootstrap) 서로 다른 훈련 데이터를 구성한 뒤 각각의 분류기를 학습시키고 이를 결합(Aggregating)하는 방법입니다.

### 💡 복원 추출 (With Replacement 허용)

- 데이터를 뽑을 때 한 번 뽑은 데이터를 다시 넣고 뽑는 것을 허용합니다.
- 따라서 동일한 아이템이 여러 번 뽑힐 수도 있고, 아예 안 뽑히는 아이템도 생깁니다.
- 이를 통해 훈련 데이터셋의 다양성(Randomness)을 인위적으로 늘려 모델 간의 차이를 만듭니다.

### 3.2. 랜덤 포레스트 (Random Forest)

- 개념: 배깅(Bagging) 기법의 아주 구체적인(Specific) 형태로, 의사결정나무(Decision Tree) 여러 개를 배깅 방식으로 묶어놓은 모델입니다.

### 💡 랜덤 포레스트의 핵심: 2가지의 무작위성 (Two layers of Randomness)

- 데이터의 무작위성: 배깅(복원 추출)을 통해 훈련 데이터 서브셋을 랜덤하게 구성합니다.
- 피처의 무작위성 (Feature Randomness): 트리를 분할할 때 모든 피처를 고려하는 것이 아니라, 랜덤한 피처 서브셋(Random subset of features)만 뽑아서 학습시킵니다. (예: 총 100개의 차원/피처가 있다면 무작위로 70개만 뽑아서 훈련)

### 🟢 장점

- 강건함 (Robustness / 높은 안정성): 여러 트리를 묶었기 때문에 입력값의 작은 변화에 결과가 크게 요동치는 Decision Tree의 단점(Instability)을 완화합니다.
- 하이퍼파라미터에 덜 민감함: 트리의 깊이(Depth) 등 파라미터 변화에 덜 민감(less sensitive)하여 대충 돌려도 웬만큼 괜찮은 성능이 나옵니다.

### 🔴 단점

- 해석력 저하 (Loss of Interpretability): 수많은 트리가 겹쳐 있어, 어떤 피처가 최종 결정에 영향을 줬는지 직관적으로 트래킹하기가 매우 어렵습니다. (Decision Tree의 장점을 상실함)

### 🗣️ Q&A Session 정리

- Q. 랜덤 포레스트에서 트리는 몇 개나 만들어야 하나요? (Rule of thumb이 있는지?)
    - A: 정확하게 정해진 룰은 없습니다. 교수님 개인적으로는 보통 10개 정도를 사용했던 것 같으며, 데이터셋의 크기나 문제의 복잡도에 따라 크게 달라집니다.
- Q. 트리를 계속 늘리면 결정 확률이 정규분포(Normal distribution)를 따르거나, 0.5(Chance level)에 수렴하여 극단적인 선택이 줄어들지 않나요?
    - A: 개수가 많아진다고 해서 결정값이 무조건 0.5(Chance level)로 수렴하지는 않을 것입니다. (이 부분은 교수님도 직관적으로는 0.5로 가지 않을 것이라 답변하셨으며, 추후 더 생각해보겠다고 덧붙이셨습니다.)

---

## 4. 🚀 앙상블 기법: 부스팅 (Boosting)

배깅(Bagging)과 랜덤 포레스트가 분류기를 ‘독립적으로’ 학습시키는 방식이었다면, 부스팅은 완전히 다른 접근법을 취합니다. 교수님께서 언급하신 ‘아다 부스트(AdaBoost)’ 역시 이 부스팅 기법의 대표적인 예시입니다.

### 4.1. 부스팅의 핵심 아이디어 (Sequential Training)

### 💡 연속적 학습 (Sequentially)

- 분류기들을 독립적으로 동시에 학습시키는 것이 아니라, 순차적(연속적)으로 학습시킨다는 것이 가장 큰 차이점이자 핵심 포인트입니다.
- 학습 목적: 이전 분류기가 틀린(Misclassified) 샘플에 더 집중하여 다음 분류기를 학습시키는 방식으로 약점을 보완해 나갑니다.

### 4.2. 학습 과정 (스텝별 상세)

- 첫 번째 분류기 학습: 전체 데이터셋을 이용해 $Classifier_1$을 학습시킵니다.
- 평가 및 가중치 부여: 예측 결과, 맞춘 샘플과 틀린 샘플이 발생합니다. 부스팅은 여기서 틀린 샘플에 더 높은 가중치(Weight)를 줍니다.
- 두 번째 분류기 학습: 가중치가 부여된 데이터(즉, 첫 번째가 틀렸던 어려운 문제들)에 집중하도록 디자인하여 $Classifier_2$를 학습시킵니다.
- 반복: 이 과정을 $N$번 반복하여 최종적으로 $N$개의 분류기를 생성합니다.
- 최종 앙상블: 생성된 $N$개의 분류기를 합쳐서 최종 예측 모델을 만듭니다.

### 🗣️ Q&A Session 정리: 부스팅 관련

- Q. 부스팅에서 의사결정나무(Decision Tree)를 계속 많아지게 하면 성능이 무조건 올라가나요?
    - A: 학습률과 성능이 올라갈 수는 있지만, 모델이 너무 복잡해지면 오버피팅(Overfitting, 과적합) 리스크가 증가합니다. 따라서 무한정 늘릴 수는 없고, Validation error가 최소화되는 적합한 사이즈를 찾아야 합니다. 이를 위해 교차 검증(Cross-validation)을 통해 트리를 몇 개 쓸지(Hyperparameter) 결정해야 합니다.
- Q. 나중에 $N$개의 분류기를 합칠 때, 모든 분류기에 동일한 가중치를 주나요?
    - A: 동일하게 주지 않습니다! 수식에 등장하는 $\alpha$(알파) 값이 이를 결정합니다. 예를 들어 $Classifier_1$의 에러가 2개고, $Classifier_2$의 에러가 3개라면, 에러가 더 적은(더 신뢰할 만한) $Classifier_1$에 더 높은 가중치($\alpha$)를 부여하여 최종 투표에 반영합니다.

---

## 5. 📏 서포트 벡터 머신 (SVM) 기본 개념

딥러닝(인공신경망)이 대세가 되기 전, 분류(Classification) 문제에서 가장 강력하고 널리 쓰였던 모델입니다. 일반화 성능(Generalization Performance)이 매우 뛰어나다는 것이 가장 큰 장점입니다.

### 5.1. SVM의 철학과 목표

- Parametric Method: 이전 시간에 배운 Non-parametric 방식과 달리, SVM은 파라미터인 가중치 행렬 $W$와 편향 $b$ (Bias) 값을 구하는 Parametric 메소드입니다.

### 💡 SVM의 철학: “마진(Margin, 여백)의 최대화”

- 두 클래스를 나누는 선(Decision Boundary)은 수없이 많이 그을 수 있습니다.
- SVM은 이 수많은 선들 중, 클래스 간의 여백(Margin)을 가장 크게 만드는 선이 최적의 선이라고 봅니다.

### 5.2. 마진(Margin)의 직관적 이해 (로지스틱 회귀 비유)

교수님은 마진의 개념을 설명하기 위해 로지스틱 회귀(Logistic Regression)를 예로 드셨습니다.

- 로지스틱 회귀에서 $\theta^T x$ (SVM의 $w^T x$와 유사) 값을 시그모이드 함수에 넣었을 때:
    - 값이 0보다 크면 Class 1, 작으면 Class 0으로 분류합니다.
    - 이때 값이 0.5라면 60% 정도의 확신밖에 없지만, 값이 2.5나 3처럼 0에서 아주 멀리 떨어져 있다면 Class 1일 확률이 90% 이상이라고 강하게 확신(Confidence)할 수 있습니다.

### 💡 핵심 결론

- 즉, Decision Boundary(0이 되는 지점)에서 멀리 떨어져 있을수록 특정 클래스에 대한 확신도(Confidence)가 높다고 볼 수 있으며, 이 거리감을 마진(Margin)이라고 부릅니다.

---

## 6. 📐 기능적 마진과 기하학적 마진 (Functional vs. Geometric)

SVM의 핵심은 마진을 수식화하고 이를 최대화하는 것입니다. 이 과정에서 두 가지 마진의 개념이 등장합니다.

### 6.1. 기능적 마진 (Functional Margin: $\hat{\gamma}$)

- 정의: 분류기가 특정 데이터를 얼마나 정확하고 자신 있게 예측했는지를 나타내는 값입니다.
- 수식:
    
    $$
    \hat{\gamma}^{(i)} = y^{(i)}(w^T x^{(i)} + b)
    $$
    
- $y^{(i)}$는 실제 클래스 라벨 (+1 또는 -1)
- 실제 라벨과 예측값의 부호가 같으면 마진은 항상 양수(Positive)가 됩니다.

### 💡 치명적인 한계점 (스케일에 민감함)

- 기능적 마진은 가중치 $W$의 크기(Magnitude)에 매우 민감(Sensitive)합니다.
- 교수님 예시 (매우 중요):
    - 1번 선: $2x_1 + 3x_2 + 1 = 0$
    - 2번 선: $4x_1 + 6x_2 + 2 = 0$ (1번 선에 단순히 2를 곱한 것)
    - 2차원 공간에 그려보면 완전히 똑같은 선입니다. 하지만 점 (2,1)에 대해 기능적 마진을 계산하면 1번 선은 8, 2번 선은 16이 나옵니다.
- 즉, 선은 그대로인데 $W$값만 무작정 키우면 기능적 마진이 무한히 커지게 되므로, 단순히 기능적 마진을 최대화하는 방식으로는 최적화 문제를 풀 수 없습니다.

### 6.2. 기하학적 마진 (Geometric Margin: $\gamma$)

- 정의: 기능적 마진의 스케일 문제를 해결하기 위해, $W$의 벡터 크기($||w||$, Norm)로 나누어 정규화한 실제 기하학적 거리입니다.
- 수식:
    
    $$
    \gamma^{(i)} = \frac{y^{(i)}(w^T x^{(i)} + b)}{||w||}
    $$
    
- 이렇게 $||w||$로 나누어 주면, 앞선 예시처럼 수식에 2배, 3배를 곱하더라도 나누는 과정에서 상쇄되어 동일한 선에 대해서는 항상 같은 마진 값을 가지게 됩니다.

### 6.3. SVM의 최종 목표와 서포트 벡터 (Support Vector)

- 최종 목표: 가장 작은 기하학적 마진(Smallest Geometric Margin)을 찾아, 그 값을 최대화(Maximize)하는 $W$와 $b$를 찾는 것입니다.

### 💡 서포트 벡터 (Support Vector)의 정의

- Decision Boundary(분류 선)를 그었을 때, 선에서 가장 가까이 위치하여 가장 작은 기하학적 마진을 갖는 데이터 포인트들을 의미합니다.
- SVM이 “Support Vector Machine”인 이유는, 최적의 선을 결정할 때 오직 이 서포트 벡터들(가장 가까운 2~3개의 점들)만 영향을 미치고, 나머지 멀리 있는 데이터 포인트들은 선의 결정에 전혀 영향을 주지 않기 때문입니다.
- 일반화 성능과의 관계: 가장 가까운 점들과의 거리를 최대한 벌려놓았기 때문에(여백 최대화), 새로운 데이터(Unseen data)가 들어와도 오류를 낼 확률이 적어 일반화(Generalization) 성능이 매우 뛰어납니다.

---

## 7. 🧮 SVM 최적화 문제의 수학적 변환

서포트 벡터 머신이 ’가장 작은 기하학적 마진을 최대화’하는 $W$와 $b$를 찾는 과정은 수학적으로 복잡한 최적화 문제(Optimization Problem)를 거칩니다. 교수님께서 깊은 수식 유도는 생략하셨지만, 최종 목적식이 어떻게 변환되는지는 짚고 넘어가셨으므로 꼭 알아두어야 합니다.

### 7.1. 목적 함수의 변환 과정

- 초기 제약 조건: 모든 데이터 샘플의 기하학적 마진이 ’가장 작은 마진($\gamma$)’보다 크거나 같아야 한다는 제약 조건이 있습니다.
- 분모 제거 (기능적 마진으로 변환): 기하학적 마진 수식 분모에 있는 $||w||$ 때문에 계산이 복잡해집니다. 이를 해결하기 위해 기하학적 마진 대신 기능적 마진(Functional Margin)을 사용하도록 식을 변환합니다.

### 💡 기능적 마진을 1로 고정

- 기능적 마진은 $W$의 스케일에 따라 값이 무한히 변할 수 있는 상대적인 값입니다. 따라서 계산의 편의를 위해 기능적 마진 값을 단순히 ’1’로 고정해버립니다.

### 💡 최종 최적화 식 도출

- 원래는 $\frac{1}{||w||}$을 최대화(Maximize)하는 문제였습니다.
- 이를 수학적으로 풀기 쉬운 형태(Convex, 볼록 함수)로 만들기 위해, 역수를 취해 최소화(Minimize) 문제로 바꾸고, 제곱을 취해줍니다.
- 최종 목적식:

(단, 모든 샘플에 대해 $y^{(i)}(w^T x^{(i)} + b) \ge 1$을 만족해야 함)
    
    $$
    \min_{w,b} \frac{1}{2} ||w||^2
    $$
    

---

## 8. 🛡️ 정규화 기법과 슬랙 변수 (Slack Variable)

실제 현실의 데이터는 수학 공식처럼 예쁘게 딱 나뉘지 않습니다. 아웃라이어(Outlier)가 존재할 때 SVM이 어떻게 대처하는지 이해하는 것이 중요합니다.

### 8.1. 아웃라이어(Outlier)의 문제점

- 이상적인 경우: 완벽하게 두 클래스를 나누는 선(Hard Margin)을 찾을 수 있습니다.
- 문제 발생: 데이터 샘플과 동떨어진 뜬금없는 곳에 아웃라이어가 하나 발생했다고 가정해봅시다.
- 이 아웃라이어 하나를 어떻게든 맞추려고(분류하려고) 하면, Decision Boundary(분류 선)가 아웃라이어 쪽으로 급격하게 틀어지게 됩니다. (기존의 서포트 벡터들이 무용지물이 됨)
- 이는 우리가 원하는 일반화된 모델의 방향이 아닙니다.

### 8.2. 슬랙 변수 ($\xi$, Slack Variable)의 도입

### 💡 개념

- 모델에게 “조금 틀려도 괜찮아, 융통성을 가질게”라고 허용해주는 여유 변수입니다.
- 모든 데이터가 마진 바깥쪽에 완벽히 위치할 필요 없이(꼭 1을 맞출 필요 없이), 마진 안쪽으로 들어오거나 심지어 선을 넘어와 오분류(Misclassification)되는 것을 일부 허용합니다.
- 만약 슬랙 변수가 0이라면, 기존의 엄격한 SVM과 동일합니다.

### 8.3. 💡 하이퍼파라미터 $C$의 역할 (매우 중요, 시험 출제 1순위)

슬랙 변수를 얼마나 허용할 것인지를 컨트롤하는 값이 바로 파라미터 $C$입니다. (최적화 목적식에 $C \sum \xi_i$ 형태로 추가됨)

- $C$ 값을 작게 설정할 때:
    - 모델에게 더 많은 유연성(Flexibility)을 부여합니다.
    - “틀려도 괜찮아”라고 허용하는 폭이 커져 마진이 넓어집니다. (오류를 덜 신경 씀)
- $C$ 값을 크게 설정할 때:
    - 모델을 더 빡세게, 엄격하게(Strict) 만듭니다.
    - 오분류를 허용하지 않으려고 하므로 마진이 좁아집니다. (오류에 대한 페널티가 큼)
- 결정 방법: $||w||^2$를 최소화할 것인지, 오분류를 허용할 것인지의 트레이드오프(Trade-off)를 결정하는 값이며, 보통 교차 검증(Cross-Validation)을 통해 최적의 $C$ 값을 찾습니다.

---

## 9. 🎩 커널 트릭 (Kernel Trick)

선형적으로 분리할 수 없는(Linearly Inseparable) 복잡한 문제에서 SVM이 강력한 성능을 발휘하게 해주는 마법 같은 기법입니다.

### 9.1. 비선형(Non-linear) 문제의 한계

- 교수님 예시: 주황색 클래스(원형)가 중앙에 뭉쳐 있고, 파란색 클래스가 그 겉을 둘러싸고(Enclose) 있는 데이터 분포.
- 이런 데이터는 아무리 선(Linear)을 그어도 두 클래스를 완벽히 분리할 수 없습니다. ($w^T x + b$ 형태로는 해결 불가)
- 딥러닝은 레이어를 깊게 쌓아 비선형성을 해결하지만, SVM은 커널 방법(Kernel Method)을 사용합니다.

### 9.2. 커널 트릭의 직관적 이해

### 💡 핵심 아이디어

- 데이터가 존재하는 공간(Space) 자체를 고차원으로 변환(Transformation)시켜버립니다.
- RBF(Gaussian) 커널 예시:
    - 2차원 평면상에 섞여 있는 데이터를 3차원 공간으로 들어 올립니다.
    - 가우시안 커널을 적용하면 종 모양(Bell curve)으로 데이터가 솟아오릅니다.
    - 파란색 점들(바깥쪽)은 위로 끌어올려지고, 주황색 점들(중앙)은 아래에 남게 됩니다.
    - 이제 3차원 공간에서 평평한 면(Plane) 하나를 쓱 그어버리면, 위아래로 깔끔하게 클래스가 나뉘게 됩니다!

### 9.3. 수학적 의의 (왜 ’트릭’인가?)

- 실제로 모든 데이터를 고차원으로 변환하여 계산하면 연산량이 폭발적으로 증가합니다.
- 하지만 SVM의 최적화 식을 쌍대 문제(Dual Problem)로 변환해 보면, 오직 데이터 간의 내적(Inner Product, $x_i \cdot x_j$) 연산만 필요하다는 것을 알 수 있습니다.

### 💡 커널 트릭

- 고차원 공간으로 데이터를 직접 보내지 않고도, 원래 차원에서 커널 함수 $K(x_i, x_j)$를 계산하는 것만으로 고차원에서의 내적 값을 구한 것과 똑같은 결과를 얻게 해줍니다.

---

## 10. 🗂️ 다중 클래스 SVM (Multi-Class SVM)

SVM은 태생적으로 클래스가 2개인 이진 분류(Binary Classification)용으로 디자인되었습니다. 클래스가 3개 이상일 때는 어떻게 확장할까요?

### 10.1. One-vs-Rest (OvR) 방식

- 개념: 하나의 클래스 vs 나머지 전체 클래스를 비교하는 분류기를 만듭니다.
- 학습 방식 (클래스가 3개일 때):
    - $Classifier_1$: Class 1 vs (Class 2 + Class 3)
    - $Classifier_2$: Class 2 vs (Class 1 + Class 3)
    - $Classifier_3$: Class 3 vs (Class 1 + Class 2)
- 총 $K$개의 분류기를 학습시킵니다.
- 특징: 분류기 개수가 적어 학습 속도가 빠릅니다. (Scikit-learn에서 기본적으로 선호됨)
- 단점: 클래스 불균형(Class Imbalance) 문제가 발생합니다. (예: Class 1은 적은데, 나머지 클래스를 합친 데이터는 너무 많음)

### 10.2. One-vs-One (OvO) 방식

- 개념: 모든 클래스 쌍(Pair)에 대해 각각 1:1로 분류기를 만듭니다.
- 학습 방식 (클래스가 3개일 때):
    - $Classifier_1$: Class 1 vs Class 2 (Class 3 무시)
    - $Classifier_2$: Class 2 vs Class 3 (Class 1 무시)
    - $Classifier_3$: Class 3 vs Class 1 (Class 2 무시)
- 총 $K(K-1)/2$개의 분류기를 학습시킵니다.
- 특징: 각 분류기가 1:1로만 싸우기 때문에 클래스 불균형 문제가 적고 좀 더 로버스트(Robust)합니다.
- 단점: 클래스 개수가 늘어날수록 만들어야 하는 분류기 개수가 기하급수적으로 늘어나 시간이 오래 걸립니다.

> 💡 교수님 코멘트: Scikit-learn 공식 문서에 따르면 두 방식의 예측 성능 자체는 거의 비슷(Similar)하기 때문에, 속도가 더 빠른 One-vs-Rest 방식을 실무에서 더 선호하는 경향이 있습니다.
>

<!-- AUTO:SLIDES:START -->

---

## 강의 슬라이드 (원본 PDF 페이지 렌더)

### Week 6 · SVM

<details><summary>슬라이드 73장 펼치기</summary>

![w6 p1](assets/images/ml/ml_w6_p01.jpg)

![w6 p2](assets/images/ml/ml_w6_p02.jpg)

![w6 p3](assets/images/ml/ml_w6_p03.jpg)

![w6 p4](assets/images/ml/ml_w6_p04.jpg)

![w6 p5](assets/images/ml/ml_w6_p05.jpg)

![w6 p6](assets/images/ml/ml_w6_p06.jpg)

![w6 p7](assets/images/ml/ml_w6_p07.jpg)

![w6 p8](assets/images/ml/ml_w6_p08.jpg)

![w6 p9](assets/images/ml/ml_w6_p09.jpg)

![w6 p10](assets/images/ml/ml_w6_p10.jpg)

![w6 p11](assets/images/ml/ml_w6_p11.jpg)

![w6 p12](assets/images/ml/ml_w6_p12.jpg)

![w6 p13](assets/images/ml/ml_w6_p13.jpg)

![w6 p14](assets/images/ml/ml_w6_p14.jpg)

![w6 p15](assets/images/ml/ml_w6_p15.jpg)

![w6 p16](assets/images/ml/ml_w6_p16.jpg)

![w6 p17](assets/images/ml/ml_w6_p17.jpg)

![w6 p18](assets/images/ml/ml_w6_p18.jpg)

![w6 p19](assets/images/ml/ml_w6_p19.jpg)

![w6 p20](assets/images/ml/ml_w6_p20.jpg)

![w6 p21](assets/images/ml/ml_w6_p21.jpg)

![w6 p22](assets/images/ml/ml_w6_p22.jpg)

![w6 p23](assets/images/ml/ml_w6_p23.jpg)

![w6 p24](assets/images/ml/ml_w6_p24.jpg)

![w6 p25](assets/images/ml/ml_w6_p25.jpg)

![w6 p26](assets/images/ml/ml_w6_p26.jpg)

![w6 p27](assets/images/ml/ml_w6_p27.jpg)

![w6 p28](assets/images/ml/ml_w6_p28.jpg)

![w6 p29](assets/images/ml/ml_w6_p29.jpg)

![w6 p30](assets/images/ml/ml_w6_p30.jpg)

![w6 p31](assets/images/ml/ml_w6_p31.jpg)

![w6 p32](assets/images/ml/ml_w6_p32.jpg)

![w6 p33](assets/images/ml/ml_w6_p33.jpg)

![w6 p34](assets/images/ml/ml_w6_p34.jpg)

![w6 p35](assets/images/ml/ml_w6_p35.jpg)

![w6 p36](assets/images/ml/ml_w6_p36.jpg)

![w6 p37](assets/images/ml/ml_w6_p37.jpg)

![w6 p38](assets/images/ml/ml_w6_p38.jpg)

![w6 p39](assets/images/ml/ml_w6_p39.jpg)

![w6 p40](assets/images/ml/ml_w6_p40.jpg)

![w6 p41](assets/images/ml/ml_w6_p41.jpg)

![w6 p42](assets/images/ml/ml_w6_p42.jpg)

![w6 p43](assets/images/ml/ml_w6_p43.jpg)

![w6 p44](assets/images/ml/ml_w6_p44.jpg)

![w6 p45](assets/images/ml/ml_w6_p45.jpg)

![w6 p46](assets/images/ml/ml_w6_p46.jpg)

![w6 p47](assets/images/ml/ml_w6_p47.jpg)

![w6 p48](assets/images/ml/ml_w6_p48.jpg)

![w6 p49](assets/images/ml/ml_w6_p49.jpg)

![w6 p50](assets/images/ml/ml_w6_p50.jpg)

![w6 p51](assets/images/ml/ml_w6_p51.jpg)

![w6 p52](assets/images/ml/ml_w6_p52.jpg)

![w6 p53](assets/images/ml/ml_w6_p53.jpg)

![w6 p54](assets/images/ml/ml_w6_p54.jpg)

![w6 p55](assets/images/ml/ml_w6_p55.jpg)

![w6 p56](assets/images/ml/ml_w6_p56.jpg)

![w6 p57](assets/images/ml/ml_w6_p57.jpg)

![w6 p58](assets/images/ml/ml_w6_p58.jpg)

![w6 p59](assets/images/ml/ml_w6_p59.jpg)

![w6 p60](assets/images/ml/ml_w6_p60.jpg)

![w6 p61](assets/images/ml/ml_w6_p61.jpg)

![w6 p62](assets/images/ml/ml_w6_p62.jpg)

![w6 p63](assets/images/ml/ml_w6_p63.jpg)

![w6 p64](assets/images/ml/ml_w6_p64.jpg)

![w6 p65](assets/images/ml/ml_w6_p65.jpg)

![w6 p66](assets/images/ml/ml_w6_p66.jpg)

![w6 p67](assets/images/ml/ml_w6_p67.jpg)

![w6 p68](assets/images/ml/ml_w6_p68.jpg)

![w6 p69](assets/images/ml/ml_w6_p69.jpg)

![w6 p70](assets/images/ml/ml_w6_p70.jpg)

![w6 p71](assets/images/ml/ml_w6_p71.jpg)

![w6 p72](assets/images/ml/ml_w6_p72.jpg)

![w6 p73](assets/images/ml/ml_w6_p73.jpg)

</details>

<!-- AUTO:SLIDES:END -->
