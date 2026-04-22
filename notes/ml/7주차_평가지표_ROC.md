# 기계학습7주차

# 모델 평가, 데이터 불균형, 그리고 회귀 지표

## 1. 🏁 도입 및 지도학습 복습

- 이전 학습 내용 복습: Linear Regression, Logistic Regression, SVM, Tree 구조, Naive Bayes, LDA 등 기본 베이스로 많이 사용되는 지도학습 테크닉들을 다룸.
- 오늘의 핵심 주제: 트레인된 모델을 어떻게 평가(Evaluation)할 것인가?
- 지도학습의 주요 테스크: 주로 Classification(분류) 테스크를 많이 다루며, 분류에 쓰이는 모델들은 Regression(회귀)으로 쉽게 확장 가능함 (예: SVC $\rightarrow$ SVR).

## 2. 🗂️ Classification(분류) 모델의 기초

- 정의: Input data를 predefined(정해진) 카테고리에 할당하는 과제.
- 💡 머신러닝의 가장 중요한 목표: 단순히 할당하는 것으로 끝나는 것이 아니라, 새로운 인풋이 들어왔을 때 모델이 얼마나 잘 작동하는가(일반화 성능, Generalization)가 핵심.

### 🍎 Binary Classification (이진 분류)

- 가장 간단한 예시: 과일 바구니에서 ‘사과인가(Positive)? 아닌가(Negative)?’
- 클래스가 2개이므로 하나를 Positive(양성, 관심 있는 대상), 다른 하나를 Negative(음성)로 둠.

## 3. 🚧 Decision Boundary와 예측 오류

- Decision Boundary (결정 경계): Classifier(Logistic Regression, SVM 등)가 분류를 수행할 때 만드는 컨셉적인 경계. (위쪽은 Positive, 아래쪽은 Negative로 예측)
- 이상적인 케이스: 모든 Positive와 Negative를 100% 완벽하게 예측. 하지만 현실적으로는 불가능함.
- 에러의 발생:
    - 실제로는 양성(Positive)인데 음성(Negative)으로 예측한 경우.
    - 실제로는 음성(Negative)인데 양성(Positive)으로 예측한 경우.

## 4. 💡 Confusion Matrix (혼동 행렬)

- 총 4가지의 Outcome이 존재하며, 머신러닝에서 매우 기본적이고 중요하게 쓰이는 용어입니다. (교수님도 매번 헷갈린다고 하실 정도니 개념을 확실히 잡아야 합니다.)
    - 가로축(Row): Classifier label (예측 값)
    - 세로축(Column): Actual label (실제 값)
- 🔍 4가지 케이스
- **True Positive (TP)**: 실제 Positive를 Positive로 올바르게 예측.
- **True Negative (TN)**: 실제 Negative를 Negative로 올바르게 예측.
- **False Positive (FP)**: 실제 Negative인데 Positive로 잘못 예측 💡 (Type 1 Error, 제1종 오류)
- **False Negative (FN)**: 실제 Positive인데 Negative로 잘못 예측 💡 (Type 2 Error, 제2종 오류)
- 에러 간의 Trade-off: FP가 높아지면 FN이 떨어지는 등 두 에러 사이에는 트레이드 오프 관계가 존재함.
- 활용 분야: 의료(Medical) 분야에서 CT 이미지를 보고 암의 유무를 판단할 때 매우 자주 사용됨.

## 5. 📈 모델 평가 지표 (Evaluation Metrics)

- 혼동 행렬을 바탕으로 계산되는 다양한 지표들입니다. 수식과 의미를 정확히 암기해야 합니다.

### 1) 직관적인 기본 지표

- **Error Rate (오류율)**
    - 수식:
        
        $$
        \frac{FP + FN}{TP + TN + FP + FN}
        $$
        
    - 의미: 전체 데이터 중 잘못 예측한 비율. (가장 좋을 때 0.0, 가장 나쁠 때 1.0)
- **Accuracy (정확도)**
    - 수식:
        
        $$
        \frac{TP + TN}{TP + TN + FP + FN}
        $$
        
    - 의미: 전체 데이터 중 올바르게 예측한 비율. (가장 좋을 때 1.0, 가장 나쁠 때 0.0)

### 2) 심화 지표 💡 (시험 출제 확률 매우 높음)

- **Sensitivity (민감도) = Recall (재현율) = True Positive Rate (TPR)**
    - 수식:
        
        $$
        \frac{TP}{TP + FN}
        $$
        
    - 의미: 실제 양성(Positive)인 데이터 중 모델이 양성으로 올바르게 예측한 비율. (모델이 얼마나 양성에 민감하게 반응하는가)
- **Precision (정밀도) = Positive Predictive Value (PPV)**
    - 수식:
        
        $$
        \frac{TP}{TP + FP}
        $$
        
    - 의미: 모델이 양성(Positive)으로 예측한 샘플 중, 실제로 양성인 비율. (얼마나 정확하게 양성을 짚어냈는가)

### 💡 Precision과 Recall의 Trade-off & F1-Score

- Precision과 Recall은 반비례(애매한 반비례 느낌) 관계를 가짐. (Positive 예측을 남발하면 Recall은 오르지만 Precision은 떨어짐)
- 이를 동시에 고려하기 위해 만든 지표가 F1-Score.
- F1-Score: Precision과 Recall의 조합 평균(Harmonic mean).
    
    $$
    F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}
    $$
    
- **Miss Rate (누락률)**
    - 수식:
        
        $$
        \frac{FN}{TP + FN}
        $$
        
    - 의미: 실제 양성 중에서 놓친(음성으로 잘못 예측한) 비율.
- **Specificity (특이도) = True Negative Rate (TNR)**
    - 수식:
        
        $$
        \frac{TN}{TN + FP}
        $$
        
    - 의미: 실제 음성(Negative) 중에서 올바르게 음성으로 예측한 비율.
- **False Positive Rate (FPR)**
    - 수식:
    또는
        
        $$
        \frac{FP}{TN + FP}
        $$
        
        $$
        1 - Specificity
        $$
        
    - 의미: 실제 음성 중에서 양성으로 잘못 예측한 비율.

## 6. 🏥 예시를 통한 지표의 한계 이해 (임신 진단 예시)

- 교수님께서 지표의 한계를 설명하기 위해 든 아주 극단적인 예시입니다. (총 환자 100명: 실제 임신 40명, 비임신 60명)
- Dr. Kim: 100명 모두 임신(Positive)이라고 무조건 예측.
- Dr. Lee: 100명 모두 비임신(Negative)이라고 무조건 예측.
- Dr. Park: 100% 완벽하게 예측 (에러 0).
- 💡 핵심 포인트: Dr. Kim과 Dr. Lee는 아무런 전문 지식 없이 무조건 찍었음에도 불구하고, Error Rate와 Accuracy만 보면 생각보다 나쁘지 않은 수치가 나옵니다. (예: Dr. Lee의 정확도는 60%). 따라서, 특정 상황(특히 데이터 불균형)에서는 Accuracy나 Error Rate만 보면 모델의 성능을 크게 오해할 수 있으며, Sensitivity, Specificity, Precision 등을 통합적으로 봐야 합니다.

## 7. ⚖️ 💡 데이터 불균형(Class Imbalance) 문제와 Accuracy의 함정

- 의료 데이터처럼 특정 클래스의 데이터가 압도적으로 많거나 적은 경우, 단순 정확도(Accuracy)를 맹신하면 안 되는 이유를 보여주는 핵심 파트입니다.
- 극단적 예시 (암 진단 시나리오): 총 100명의 환자 중 98명이 음성(Negative, 암 아님), 단 2명만이 양성(Positive, 암).
    - Perfect Classifier (완벽한 분류기): 98명 음성, 2명 양성을 모두 완벽하게 맞춤. (오류 0)
    - Lazy Classifier (게으른 분류기): 훈련조차 하지 않고, 무조건 100명 다 음성(Negative)이라고 찍어버리는 분류기.
- 지표 계산 결과의 모순:
    - Lazy Classifier의 Error Rate(오류율)는 단 2%(0.02)이며, Accuracy(정확도)는 무려 98%(0.98)가 나옵니다.
    - 분류기로서의 가치가 전혀 없는 모델(양성을 하나도 못 잡아냄)임에도 정확도가 98%로 매우 높게 나오는 착시 현상이 발생합니다.
- 결론: 클래스 개수가 심하게 차이 나는 ‘Class Imbalance’ 상황(특히 의료 분야)에서는 Accuracy와 Error rate가 매우 잘못된 해석을 낳을 수 있으므로 다른 지표를 봐야 합니다.

## 8. 🧮 MCC (Matthews Correlation Coefficient)

- 위와 같은 데이터 불균형 상황에서 모델의 성능을 제대로 평가하기 위해 등장한 통합 지표입니다.
- 정의: Confusion Matrix의 4가지 값(TP, TN, FP, FN)을 모두 통합하여 계산하는 균형 잡힌(Balanced) 지표.
- 수식:
    
    $$
    MCC = \frac{TP \times TN - FP \times FN}{\sqrt{(TP + FP)(TP + FN)(TN + FP)(TN + FN)}}
    $$
    
- 값의 범위: -1 부터 1 까지
    - 1: 완벽한 분류기 (Perfect Classifier)
    - 0: 랜덤하게 찍는 수준 (Random guessing)
    - -1: 완전히 반대로 예측하는 최악의 분류기
- 앞선 암 진단 예시에 적용하면?
    - Perfect Classifier의 MCC = 1.00
    - Lazy Classifier의 MCC = 0.00 (정확도는 98%였지만, MCC를 통해 사실상 찍는 수준의 모델임이 명확히 드러남!)

## 9. 🎚️ 임계값(Threshold) 조정과 Signal Detection Theory

- Signal Detection Theory (신호탐지이론): 확률 분포(음성 샘플 분포 vs 양성 샘플 분포)를 통해 분류기의 작동을 설명하는 이론.
- Decision Plane (결정 평면)과 Threshold (임계값):
    - 분류기가 양성과 음성을 나누는 기준점.
    - 이 임계값을 좌우로 움직임에 따라 TP(True Positive)와 FP(False Positive)의 비율을 조절할 수 있습니다.
    - 예: 임계값을 오른쪽(더 엄격하게 양성을 판정)으로 당기면, FP(오탐)는 줄어들지만 동시에 FN(놓치는 양성)은 늘어납니다. 👉 Precision과 Recall의 Trade-off 관계가 여기서 발생!

### 🗣️ [Q&A 타임: 교수님과 학생의 질의응답]

- Q. 슬라이드의 Z축은 어떤 의미가 있나요?
    - A: Z축은 확률값 또는 빈도수라고 생각하시면 됩니다. 사실 두 분포를 편하게 보여주기 위해 그린 것이라 Z축 값 자체는 무시하셔도 괜찮습니다.
- Q. 임계값(Threshold)을 변경시키는 건 구체적으로 어떤 의미가 있나요?
    - A: 키와 혈압(고혈압/저혈압) 데이터를 예로 들어보죠. 키(X축)를 바탕으로 LDA(Linear Discriminant Analysis) 모델을 적용해 데이터를 프로젝션 시켰다고 합시다. 이때 임계값을 어느 ’키(cm)’로 잡느냐에 따라 결과가 달라집니다. 임계값을 극단적으로 낮추면 ’모두 다 병이 있다(Sick)’고 예측하게 되고, 극단적으로 높이면 ’모두 다 건강하다(Healthy)’고 예측하게 됩니다. 이렇게 임계값을 변화시키면서 모델이 어떻게 반응하는지(지표가 어떻게 확 떨어지는지 등)를 구별하는 것입니다.

## 10. 📉 💡 ROC Curve (Receiver Operating Characteristic Curve)

- 여러 지표를 하나하나 따로 보기보다, “큰 그림(Big Picture)”을 한 번에 보기 위해 사용하는 매우 중요한 그래프입니다.
- 축의 구성 💡 (X축, Y축 헷갈리지 않게 암기 필수)
    - X축: False Positive Rate (FPR) =
        
        $$
        1 - Specificity
        $$
        
    - Y축: True Positive Rate (TPR) = =
        
        $$
        Sensitivity
        $$
        
        $$
        Recall
        $$
        
- 그래프 그리는 법: Threshold(임계값)를 이리저리 바꿔가면서(점 하나하나가 특정 임계값에서의 성능) 선을 연결하여 그립니다.

### 🧭 ROC 공간 해석법

- 가운데 대각선 ($y=x$ 선): Random Guess (랜덤 예측). 무조건 반반(50:50)으로 찍는 분류기가 위치하는 선.
- 대각선 기준 왼쪽 위 (좌측 상단): 랜덤보다 잘하는(더 나은) 분류기.
- 대각선 기준 오른쪽 아래 (우측 하단): 랜덤보다도 못하는 최악(Worse)의 분류기.
- 💡 가장 좌측 상단 꼭짓점 (0, 1): 에러율이 0인 Perfect Classifier (완벽한 분류기).

### 👨‍🏫 교수님 예시 (A, B, C, C’ 분류기 비교)

- A: 적당히 잘하는 모델 (좌측 상단 곡선)
- B: 46개 데이터 중 무조건 23개는 양성, 23개는 음성으로 찍는 랜덤 모델 (대각선 위에 위치)
- C: 에러가 굉장히 높은 못하는 모델 (우측 하단 위치)
- C’: C의 결과를 완전히 반대로 뒤집은 모델. (C’은 A보다도 더 좌측 상단에 위치하므로 A보다 더 나은 분류기라고 볼 수 있음!)

## 11. 📐 AUC (Area Under the Curve)

- 정의: ROC Curve 그래프를 해석하기 편하게 ’하나의 숫자’로 정량화(Quantify)한 지표.
- 의미: ROC Curve 아래의 면적(Area)을 의미합니다.
- 값의 해석:
    - AUC = 1: 완벽한 분류기 (면적이 꽉 참).
    - AUC 값이 클수록(1에 가까울수록) 성능이 좋은 모델입니다.

## 12. 🧩 Multi-class Classification으로의 확장

- Binary(이진) 분류뿐만 아니라, 클래스가 여러 개인 Multi-class 분류로도 Confusion Matrix를 쉽게 확장할 수 있습니다. (예: 클래스가 16개면 16x16 행렬이 됨)
- 장점: 연구할 때 모델이 어떤 카테고리를 주어졌을 때 어떻게 헷갈려하는지(Error Pattern, 혼동 패턴)를 한눈에 파악할 수 있어 매우 유용합니다.

## 13. 🏋️‍♂️ 모델 훈련(Training) 시 클래스 불균형 문제와 해결책

- 클래스 불균형은 평가(Evaluation)할 때만 문제가 되는 것이 아니라, 모델을 훈련(Training)시킬 때도 심각한 악영향을 미칩니다. (예: 스팸 필터링, 사기 탐지, 질병 진단 등)

### ⚠️ 문제점 (SVM 예시)

- 머신러닝 알고리즘은 보통 ’전체 에러(Overall Error)’를 최소화하는 방향으로 학습합니다.
- 따라서 데이터가 압도적으로 많은 다수 클래스(Majority Class) 쪽으로 Decision Boundary(결정 경계)가 치우치게 됩니다. (소수 클래스를 무시하는 편향 발생)

### 🛠️ 해결책 1: 알고리즘 차원의 조절 (Penalty 부여)

- 소수 클래스(Minority Class)를 잘못 분류했을 때 더 큰 페널티(가중치)를 부여하는 방식입니다.
- scikit-learn에서는 보통 `class_weight='balanced'` 파라미터를 사용합니다.
- 💡 디테일: 분류기마다 가중치를 주는 구체적인 방법은 다릅니다. 어떤 SVM 패키지는 Loss Function 자체에 가중치를 더 주고, 어떤 SVM은 이전에 배운 Slack Variable(여유 변수)의 규제항인 C값을 조절하여 마이너리티 클래스에 더 집중하게 만듭니다.

### 🛠️ 해결책 2: 데이터 차원의 조절 (Sampling 기법)

- Undersampling (과소표집): 다수 클래스의 데이터를 소수 클래스 수에 맞춰 줄이는 방법. (단점: 훈련 데이터 손실 발생)
- Oversampling (과대표집): 소수 클래스의 데이터를 늘리는 방법. 단순히 복사(Copy)할 수도 있고, 노이즈를 살짝 섞을 수도 있습니다.
- 💡 SMOTE (Synthetic Minority Over-sampling Technique): 단순히 데이터를 복사하는 것이 아니라, 소수 클래스 데이터들 사이를 보간(Interpolation)하는 느낌으로 새로운 가상의 합성 데이터(Synthetic data)를 생성하여 개수를 맞춰주는 고급 기법입니다.

## 14. 📊 회귀(Regression) 모델 평가 지표의 기초

- 분류(Classification) 문제가 카테고리를 예측했다면, 회귀(Regression) 문제는 연속적인 값(Continuous values)을 예측합니다.

### 📌 가장 먼저 해야 할 일: 시각화 (Scatter Plot)

- 지표를 계산하기 전에, 실제 데이터가 어떻게 생겼는지 산점도(Scatter plot)를 그려보는 것이 매우 중요합니다.
- 이를 통해 입력(X)과 출력(Y)의 대략적인 패턴(비례/반비례), 아웃라이어(Outlier), 비선형 관계 등을 파악할 수 있습니다.

### 🔗 상관계수 (Correlation Coefficient)

- 데이터의 관계를 정량화(Quantify)하는 지표.
- 💡 Pearson Correlation (피어슨 상관계수)
    - 범위: -1 ~ 1 (1: 완벽한 양의 상관관계, -1: 완벽한 음의 상관관계, 0: 관계없음)
    - 한계점 1: 기울기의 가파른 정도(얼마나 빨리 움직이는지)는 알려주지 않습니다.
    - 한계점 2: 선형(Linear) 관계만 캡처할 수 있습니다. 비선형(Non-linear) 관계의 경우 0으로 나옵니다.
- 💡 Spearman’s Rank Correlation (스피어만 랭크 상관계수)
    - 실제 값 대신 순위(Rank)로 변환하여 상관관계를 계산합니다.
    - 비선형이더라도 단조 증가(Monotonic)하는 패턴이라면 1을 출력하여 관계를 잘 잡아냅니다.

### 🗣️ 연구에서의 꿀팁 (교수님 강조)

- “Correlation은 Causation(인과관계)이 아니다!”
- 교수님 예시: “커피를 하루 2~3잔 마시는 사람이 안 마시는 사람보다 소화 능력이 좋고 기대 수명이 길다더라.” $\rightarrow$ 이는 상관관계를 보여줄 뿐, 커피가 수명을 연장시켰다는 원인과 결과(인과관계)를 증명하는 것은 아닙니다.

## 15. 📏 회귀 모델의 정량적 평가 지표 (Error Metrics)

- 예측값과 실제값의 차이(Residual, 에러)를 바탕으로 모델을 평가합니다.
- MSE (Mean Squared Error): 오차의 제곱의 평균. (큰 에러에 민감함)
- MAE (Mean Absolute Error): 오차의 절댓값의 평균. (해석이 직관적임)
    - 단점: MSE와 MAE는 타겟 변수의 유닛(Unit, 단위)에 매우 민감합니다. 에러 값이 3.15인지 314.87인지 숫자만 봐서는 모델이 좋은지 나쁜지 직관적으로 비교/해석하기 어렵습니다.

### 💡 $R^2$ (Coefficient of Determination, 결정계수)

- 데이터의 분산(Variance)값을 고려하여, 모델이 데이터의 변동성을 얼마나 잘 설명하는지 나타내는 지표. (유닛에 덜 민감하여 신뢰성이 높음)
- 수식:
    
    $$
    R^2 = 1 - \frac{SSE}{SST}
    $$
    
    - SST (Total Sum of Squares): 전체 평균값 기준 데이터의 총 분산 정도
    - SSE (Sum of Squared Errors): 모델이 예측하지 못한 에러의 분산
    - SST - SSE: 모델이 성공적으로 설명해 낸 분산 (Explained variance)
- 값의 해석:
    - 1: 완벽하게 예측함.
    - 0: 그냥 데이터의 평균값으로 찍어서 예측하는 수준과 똑같음.
    - 음수: 평균값으로 찍는 것보다도 못하게 예측하는 최악의 모델.

---

## 🎓 💡 [매우 중요] 교수님 오피셜 중간고사 출제 포인트 & 꿀팁

- 시험 일시 및 장소: 다음 주 동일한 시간(8시 20분), 동일한 장소.
- 출제 형식: 거의 100% 객관식 (4지 선다형). (주관식은 낼까 말까 고민 중이시나 안 나올 확률이 높음)
- 문항 수: 대략 20~30문제.
- 시험 범위: Week 2 (머신러닝 기초 설명) ~ Week 7 (평가 지표 내용까지). 대략 한 챕터마다 4~5개 정도 골고루 출제.
- 언어 및 용어: 문제는 모두 한글로 출제되나, Precision, Recall 같은 용어는 헷갈림을 방지하기 위해 반드시 괄호 안에 영어를 병기해 주실 예정. (영어 명칭 위주로 학습할 것)
- 수학 및 계산 문제 (핵심 출제 포인트):
    - 복잡한 수학 증명 문제는 절대 안 냄.
    - 🚨 단, Confusion Matrix(혼동 행렬)를 주고 Rate(Error rate, Precision, Recall 등)를 계산하는 문제는 무조건 출제됨! (공식 암기 필수)

<!-- AUTO:SLIDES:START -->

---

## 강의 슬라이드 (원본 PDF 페이지 렌더)

### Week 7 · Evaluation

<details><summary>슬라이드 49장 펼치기</summary>

![w7 p1](assets/images/ml/ml_w7_p01.jpg)

![w7 p2](assets/images/ml/ml_w7_p02.jpg)

![w7 p3](assets/images/ml/ml_w7_p03.jpg)

![w7 p4](assets/images/ml/ml_w7_p04.jpg)

![w7 p5](assets/images/ml/ml_w7_p05.jpg)

![w7 p6](assets/images/ml/ml_w7_p06.jpg)

![w7 p7](assets/images/ml/ml_w7_p07.jpg)

![w7 p8](assets/images/ml/ml_w7_p08.jpg)

![w7 p9](assets/images/ml/ml_w7_p09.jpg)

![w7 p10](assets/images/ml/ml_w7_p10.jpg)

![w7 p11](assets/images/ml/ml_w7_p11.jpg)

![w7 p12](assets/images/ml/ml_w7_p12.jpg)

![w7 p13](assets/images/ml/ml_w7_p13.jpg)

![w7 p14](assets/images/ml/ml_w7_p14.jpg)

![w7 p15](assets/images/ml/ml_w7_p15.jpg)

![w7 p16](assets/images/ml/ml_w7_p16.jpg)

![w7 p17](assets/images/ml/ml_w7_p17.jpg)

![w7 p18](assets/images/ml/ml_w7_p18.jpg)

![w7 p19](assets/images/ml/ml_w7_p19.jpg)

![w7 p20](assets/images/ml/ml_w7_p20.jpg)

![w7 p21](assets/images/ml/ml_w7_p21.jpg)

![w7 p22](assets/images/ml/ml_w7_p22.jpg)

![w7 p23](assets/images/ml/ml_w7_p23.jpg)

![w7 p24](assets/images/ml/ml_w7_p24.jpg)

![w7 p25](assets/images/ml/ml_w7_p25.jpg)

![w7 p26](assets/images/ml/ml_w7_p26.jpg)

![w7 p27](assets/images/ml/ml_w7_p27.jpg)

![w7 p28](assets/images/ml/ml_w7_p28.jpg)

![w7 p29](assets/images/ml/ml_w7_p29.jpg)

![w7 p30](assets/images/ml/ml_w7_p30.jpg)

![w7 p31](assets/images/ml/ml_w7_p31.jpg)

![w7 p32](assets/images/ml/ml_w7_p32.jpg)

![w7 p33](assets/images/ml/ml_w7_p33.jpg)

![w7 p34](assets/images/ml/ml_w7_p34.jpg)

![w7 p35](assets/images/ml/ml_w7_p35.jpg)

![w7 p36](assets/images/ml/ml_w7_p36.jpg)

![w7 p37](assets/images/ml/ml_w7_p37.jpg)

![w7 p38](assets/images/ml/ml_w7_p38.jpg)

![w7 p39](assets/images/ml/ml_w7_p39.jpg)

![w7 p40](assets/images/ml/ml_w7_p40.jpg)

![w7 p41](assets/images/ml/ml_w7_p41.jpg)

![w7 p42](assets/images/ml/ml_w7_p42.jpg)

![w7 p43](assets/images/ml/ml_w7_p43.jpg)

![w7 p44](assets/images/ml/ml_w7_p44.jpg)

![w7 p45](assets/images/ml/ml_w7_p45.jpg)

![w7 p46](assets/images/ml/ml_w7_p46.jpg)

![w7 p47](assets/images/ml/ml_w7_p47.jpg)

![w7 p48](assets/images/ml/ml_w7_p48.jpg)

![w7 p49](assets/images/ml/ml_w7_p49.jpg)

</details>

<!-- AUTO:SLIDES:END -->
