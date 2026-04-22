// questions.js — 문제 데이터 (5세트 × 30문제 = 150문제)
//
// ▼ 스키마 ▼
// 객관식 : { id, set, week, topic, type:"multiple_choice", difficulty,
//            question, image?, choices[4], answer(0~3), brief, detailed, source }
// 주관식 : { id, set, week, topic, type:"short_answer", difficulty,
//            question, image?, answer, answer_type:"number"|"exact"|"text",
//            tolerance?(number), keywords?(text), brief, detailed, source }
//
// 상세 스키마는 계획서 § 5.1 참조

export const SETS_META = [
  { id: 1, title: "SET 1", label: "기본 구성", desc: "전범위 균형" },
  { id: 2, title: "SET 2", label: "계산 중심", desc: "Week 7 비중↑" },
  { id: 3, title: "SET 3", label: "개념 중심", desc: "용어 구별" },
  { id: 4, title: "SET 4", label: "비교 유형", desc: "모델 대비" },
  { id: 5, title: "SET 5", label: "종합 심화", desc: "난이도 상" },
];

// ═══════════════════════════════════════════════════════════════
// SET 1 — 기본 구성
// 배분: W2:5 · W3:5 · W4:5 · W5:5 · W6:5 · W7:5 = 30
// 주관식 위치: Q10(W3 MLE 개념), Q25(W6 margin 계산), Q30(W7 F1 계산)
// ═══════════════════════════════════════════════════════════════
export const set1 = [
  // ── Week 2 (Q1~Q5) ──
  // LOOP-TASK [3.01] ✅
  {
    id: "S1Q1",
    set: 1,
    week: 2,
    topic: "전문가 시스템의 한계",
    type: "multiple_choice",
    difficulty: "easy",
    question: "전문가 시스템(Expert System)이 머신러닝(Machine Learning)에 비해 가지는 한계점으로 가장 적절하지 않은 것은?",
    choices: [
      "① 도메인 전문가가 작성한 If-then 규칙에 고정되어 정해진 시나리오 밖의 예외 상황(Edge Case)에는 유연하게 대응하지 못한다",
      "② 환경이나 데이터 분포가 변하면 사람이 일일이 개입해 규칙을 수정해야 하며, 자동 적응(Self-adaptation) 능력이 없다",
      "③ 도메인이 복잡해질수록 고려해야 할 규칙이 기하급수적으로 늘어나 유지보수·확장성(Scalability)이 빠르게 무너진다",
      "④ 데이터가 쌓일수록 시스템이 스스로 성능을 개선한다"
    ],
    answer: 3,
    brief: "④는 데이터 기반 자동 학습이 가능한 머신러닝의 장점이며, 전문가 시스템은 이런 능력이 없다.",
    detailed: "전문가 시스템은 도메인 전문가의 지식을 If-then 규칙으로 직접 프로그래밍한 모델(대표 예시: 의료 진단 시스템 MYCIN)이다. 정해진 규칙을 벗어난 예외 상황에 취약하고, 환경 변화에 적응하려면 사람이 직접 규칙을 수정해야 하며, 규칙 수가 늘어나면 유지보수가 폭발적으로 어려워진다(Brittle). 반면 데이터로부터 자동 학습해 환경 변화에 적응하는 것은 머신러닝의 가장 큰 장점으로, 전문가 시스템의 한계점과 정확히 반대된다.",
    source: "Week 2 § 1-2"
  },
  {
    id: "S1Q2",
    set: 1,
    week: 2,
    topic: "3대 학습 방법 구분",
    type: "multiple_choice",
    difficulty: "easy",
    question: "다음 예시 중 지도학습(Supervised Learning)에 해당하는 것은?",
    choices: [
      "① 정답 라벨 없이 고객 구매 데이터를 유사도 기준으로 묶어 의미 있는 세그먼트로 그룹핑하는 군집화(Clustering) 문제",
      "② 라벨이 없는 고차원 이미지에서 중요한 특징만 뽑아 2D로 시각화하는 차원 축소(Dimensionality Reduction) 문제",
      "③ 집의 평수, 층수, 위치를 바탕으로 월세(연속 수치)를 예측한다",
      "④ 로봇이 환경과 상호작용하며 받은 보상(Reward)과 처벌(Punishment)만으로 최적 정책(Policy)을 학습하는 강화학습 문제"
    ],
    answer: 2,
    brief: "입력 X(평수·층수 등)와 정답 Y(월세)가 쌍으로 주어지는 회귀(Regression) 문제이므로 지도학습이다.",
    detailed: "지도학습은 항상 입력과 정답(Label)이 짝지어진 상태로 주어지는 학습이다. ① 군집화(Clustering)는 정답 없이 유사도로 그룹을 찾는 비지도학습. ② 차원 축소(Dimensionality Reduction)도 정답 없이 구조를 찾는 비지도학습. ③ 연속 수치(월세)를 예측하는 회귀 문제로 교수님이 강조한 지도학습 대표 예시. ④ 에이전트가 보상·처벌 피드백으로 정책을 학습하는 강화학습이다.",
    source: "Week 2 § 3"
  },
  {
    id: "S1Q3",
    set: 1,
    week: 2,
    topic: "Stratified K-fold",
    type: "multiple_choice",
    difficulty: "medium",
    question: "클래스 1의 데이터가 10개, 클래스 2의 데이터가 200개로 심하게 불균형(Imbalanced)한 이진 분류 데이터셋에서 교차 검증을 수행할 때 가장 적합한 기법은?",
    choices: [
      "① 클래스 비율을 고려하지 않고 전체 데이터를 K개로 무작위 분할하는 일반 K-fold Cross-Validation",
      "② 샘플을 1개씩만 테스트로 쓰는 Leave-one-out Cross-Validation을 총 N번 반복해 평가한다",
      "③ Stratified K-fold Cross-Validation",
      "④ 데이터를 한 번만 Train/Test로 가르는 단일 Holdout 분할 검증으로 빠르게 평가한다"
    ],
    answer: 2,
    brief: "각 fold가 원본 데이터의 클래스 비율(Proportion)을 보존하도록 분할해야 소수 클래스가 누락되지 않는다.",
    detailed: "일반 K-fold는 무작위 분할이므로 클래스 1이 10개밖에 없는 상황에서 특정 fold에 소수 클래스가 아예 포함되지 않을 위험이 크다. Stratified K-fold는 각 fold마다 원본 데이터의 클래스 비율을 동일하게 유지(Preserve)하도록 분할해 이 문제를 해결한다. Leave-one-out은 연산 비용이 과도하면서 불균형 자체는 완화해주지 않고, 단일 Holdout은 분산이 커서 평가가 왜곡되기 쉽다.",
    source: "Week 2 § 5-3"
  },
  {
    id: "S1Q4",
    set: 1,
    week: 2,
    topic: "Overfitting 및 Bias-Variance",
    type: "multiple_choice",
    difficulty: "medium",
    question: "훈련 에러(Training Error)는 거의 0에 가깝지만 검증 에러(Validation Error)가 급격히 증가하는 현상과 그 원인을 올바르게 연결한 것은?",
    choices: [
      "① 과소적합(Underfitting) 상태이며, 모델 용량(Capacity)이 지나치게 커서 단순한 패턴조차 잡아내지 못하고 있기 때문이다",
      "② 과적합(Overfitting), 모델이 훈련 데이터의 노이즈와 아웃라이어까지 암기하여 (High Variance)",
      "③ 과소적합(Underfitting) 상태이며, 학습률(Learning Rate)이 너무 작아 최적점 근처에서 수렴하지 못하고 있기 때문이다",
      "④ 과적합(Overfitting) 상태이며, 모델의 Bias가 지나치게 높아 훈련 데이터조차 제대로 학습하지 못하고 있기 때문이다"
    ],
    answer: 1,
    brief: "Training은 낮고 Validation은 높은 상태 = 과적합(Overfitting) = High Variance.",
    detailed: "과적합은 모델 Capacity가 지나치게 크거나 학습을 너무 오래(Epoch) 시켰을 때 발생하며, 훈련 데이터 내부의 노이즈와 아웃라이어까지 외워버려 새로운 데이터에 대한 예측이 크게 빗나간다. Bias-Variance Tradeoff 관점에서 이는 Variance가 매우 높은 상태이며 해결책은 Early Stopping 또는 모델 복잡도 축소다. 반대로 Underfitting(High Bias)은 Training Error 자체가 높게 나오는 상태로, 둘은 원인이 정반대다.",
    source: "Week 2 § 6"
  },
  {
    id: "S1Q5",
    set: 1,
    week: 2,
    topic: "Shortcut Learning",
    type: "multiple_choice",
    difficulty: "hard",
    question: "딥러닝 모델이 OOD(Out-of-Distribution) 데이터에서 엉뚱한 예측을 내는 근본 원인인 '지름길 학습(Shortcut Learning)'을 가장 잘 설명하는 예시는?",
    choices: [
      "① 훈련 데이터가 너무 적고 Class Imbalance가 극단으로 치우쳐, 모델이 모든 입력을 다수 클래스(Majority Class)로만 예측하는 Lazy Classifier 현상이다",
      "② 학습률(Learning Rate)을 지나치게 크게 설정해 경사하강법이 최적점 근처에서 반대편으로 튕겨 나가며 발산(Overshooting)하는 현상이다",
      "③ 고양이 형태의 이미지에 코끼리 가죽 텍스처를 입히면, 사람은 '고양이'라 답하지만 모델은 99% 확률로 '코끼리'라고 예측한다",
      "④ 검증 세트의 일부가 훈련 세트에 섞여 Data Leakage가 발생하여, 성능이 인위적으로 부풀려져 측정되는 현상이다"
    ],
    answer: 2,
    brief: "모델이 본질적 특징(형태) 대신 데이터셋에 우연히 존재하는 쉬운 힌트(텍스처·위치)를 학습하는 현상이다.",
    detailed: "Shortcut Learning은 모델이 사람이 의도한 일반화 가능한 특징(예: 객체의 형태) 대신 데이터셋에 우연히 존재하는 허상 패턴(Spurious Pattern)을 정답 힌트로 삼는 현상이다. 교수님 예시: ⑴ 별/달 이미지 실험 — 모양이 아니라 화면 상의 위치로 구분, 위치가 바뀌면 오답. ⑵ 고양이 형태에 코끼리 텍스처를 입히면 99% 확률로 '코끼리'라고 답함. 이런 학습 방식 때문에 모델은 OOD 데이터나 미세한 노이즈를 섞은 적대적 예제(Adversarial Example)에 매우 취약해진다.",
    source: "Week 2 § 7-2"
  },

  // ── Week 3 (Q6~Q10) — Q10은 주관식 (MLE 개념) ──
  // LOOP-TASK [3.02] ✅
  {
    id: "S1Q6",
    set: 1,
    week: 3,
    topic: "Normal Equation",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Linear Regression에서 경사하강법(Gradient Descent) 대신 Normal Equation $\\theta = (X^T X)^{-1} X^T y$ 를 단 한 번의 계산으로 적용할 수 있는 근본적인 이유는?",
    choices: [
      "① 훈련 데이터가 항상 선형 분리(Linearly Separable) 가능한 형태로 주어져 단 한 번의 행렬 연산만으로 경계를 구할 수 있기 때문이다",
      "② 최소제곱오차 비용 함수 $J(\\theta)$가 Smooth·Continuous·Convex한 2차 함수이므로 Global Minimum이 단 하나만 존재하기 때문이다",
      "③ 학습률 $\\alpha$를 적절히 튜닝하기만 하면 어떤 머신러닝 모델이든 단 1회 업데이트만으로 Global Minimum에 도달할 수 있기 때문이다",
      "④ 시그모이드(Sigmoid)의 미분이 $g'(z) = g(z)(1 - g(z))$ 형태로 정리되어 Closed-form Solution이 자동으로 유도되기 때문이다"
    ],
    answer: 1,
    brief: "비용 함수가 Convex한 2차 함수라 미분값이 0인 지점이 곧 유일한 Global Minimum이다.",
    detailed: "최소제곱오차 $J(\\theta) = \\frac{1}{2}(X\\theta - y)^T(X\\theta - y)$ 는 $\\theta$에 대해 Convex한 2차 함수이므로, 미분값(Gradient)을 0으로 두면 전체 구간에서 단 하나의 최소값을 구할 수 있다. 이를 정리하면 $X^T X \\theta = X^T y$ 가 되고 양변에 $(X^T X)^{-1}$을 곱해 Closed-form Solution이 나온다. 교수님 코멘트: 대부분의 머신러닝/딥러닝 문제는 이렇게 예쁜 Analytic Solution이 존재하지 않아 경사하강법이 범용적으로 쓰인다.",
    source: "Week 3 § 6"
  },
  {
    id: "S1Q7",
    set: 1,
    week: 3,
    topic: "학습률(Learning Rate)",
    type: "multiple_choice",
    difficulty: "easy",
    question: "경사하강법(Gradient Descent)의 학습률 $\\alpha$에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① $\\alpha$가 너무 크면 최솟값을 지나쳐 밖으로 튕겨 나가는 Overshooting이 발생할 수 있다",
      "② $\\alpha$가 너무 작으면 스텝마다 이동 보폭이 과대해져 최솟값 근처에서 반대편으로 튕겨 나가는 Overshooting이 발생한다",
      "③ $\\alpha$는 비용 함수의 형태·스케일·데이터 분포와 무관하게 항상 0.01로 고정해 두는 것이 머신러닝 실무의 최선이다",
      "④ $\\alpha$가 크면 언제나 더 적은 iteration으로 Global Minimum에 도달해 학습 시간이 단축된다"
    ],
    answer: 0,
    brief: "$\\alpha$가 크면 한 번에 너무 멀리 이동해 최솟값을 지나쳐 버리는 Overshooting이 발생한다.",
    detailed: "업데이트 수식 $\\theta_j := \\theta_j - \\alpha \\cdot \\partial J / \\partial \\theta_j$ 에서 $\\alpha$는 이동 보폭이다. 너무 크면 최솟값 근처에서 반대편으로 튕겨 나가 수렴하지 못하고 진동하거나 발산하고(Overshooting), 너무 작으면 수렴은 하지만 iteration이 지나치게 많이 필요해 학습이 느려진다. 적절한 $\\alpha$는 데이터·모델에 따라 달라지므로 실험적으로 찾아야 한다.",
    source: "Week 3 § 5-3"
  },
  {
    id: "S1Q8",
    set: 1,
    week: 3,
    topic: "Sigmoid 함수",
    type: "multiple_choice",
    difficulty: "medium",
    question: "로지스틱 회귀(Logistic Regression)에서 선형 결과 $\\theta^T x$에 시그모이드(Sigmoid) 함수 $g(z) = 1/(1+e^{-z})$를 씌우는 이유로 가장 적절한 것은?",
    choices: [
      "① 입력 특성(Feature)의 차원을 축소해 계산량을 줄이고 메모리 효율을 높이는 차원 축소(Dimensionality Reduction) 효과를 얻기 위해서이다",
      "② 정답 라벨이 0 또는 1 같은 이산값이 아니라 $(-\\infty, +\\infty)$ 범위의 연속값(Continuous)일 때 이를 그대로 회귀 출력으로 사용하기 위해서이다",
      "③ 출력값을 0과 1 사이로 바운드(Bound)하여 확률로 해석할 수 있게 하고, 미분 시 $g'(z) = g(z)(1 - g(z))$ 형태로 수식이 깔끔해지기 때문이다",
      "④ Decision Boundary를 무조건 비선형 곡선으로 만들어 선형 분류기로는 풀 수 없는 문제까지 풀 수 있게 하기 위해서이다"
    ],
    answer: 2,
    brief: "① 확률 해석 가능성(0~1 바운드) ② 미분이 자기 자신의 곱으로 귀결되는 수학적 편리함 — 두 가지가 핵심.",
    detailed: "선형 함수 $\\theta^T x$의 결과는 $-\\infty$에서 $+\\infty$까지 뻗어나가므로 확률로 해석할 수 없다. Sigmoid는 어떤 실수 값이 들어와도 0과 1 사이로 제한해 확률로 해석할 수 있게 만든다. 더불어 미분값이 $g'(z) = g(z)(1 - g(z))$ 형태로 자기 자신의 곱으로 떨어져 최적화 수식이 아주 깔끔해지는 이점이 있다. 이 성질 덕분에 로그 우도(Log-Likelihood)를 미분했을 때 선형 회귀의 경사하강법과 놀라울 만큼 유사한 업데이트 수식이 나온다.",
    source: "Week 3 § 9-1"
  },
  {
    id: "S1Q9",
    set: 1,
    week: 3,
    topic: "Softmax 함수",
    type: "multiple_choice",
    difficulty: "medium",
    question: "다중 클래스 분류(Multiclass Classification)의 Softmax 함수 $\\text{softmax}(t_c) = \\exp(t_c) / \\sum_k \\exp(t_k)$에 대한 설명으로 가장 적절하지 않은 것은?",
    choices: [
      "① 지수함수($e^x$)를 씌우므로 원래 선형 값 $t_c$가 음수였더라도 결과는 항상 양수가 되어 확률 해석의 전제 조건을 만족시킨다",
      "② 전체 합 $\\sum_k \\exp(t_k)$로 나누는 정규화(Normalization) 덕분에 모든 출력이 0에서 1 사이에 놓이고 클래스별 확률의 합이 정확히 1이 된다",
      "③ 지수함수 특성상 가장 큰 입력값이 지배적으로 커지고 작은 값들은 상대적으로 억눌려 클래스 간 차이가 크게 증폭(Amplification)된다",
      "④ 미분이 불가능하기 때문에 경사하강법(Gradient Descent) 기반 학습에는 사용할 수 없다"
    ],
    answer: 3,
    brief: "④는 틀린 설명. Softmax는 미분 가능해 Cross-Entropy와 결합한 경사하강법 학습이 표준이다.",
    detailed: "Softmax의 3가지 핵심 역할: ⑴ 지수함수로 음수 제거, ⑵ 전체 합으로 나눠 합이 1인 확률로 만듦, ⑶ 지수 특성으로 클래스 간 차이 극대화(Amplification). Softmax는 당연히 미분 가능하며, Cross-Entropy Loss와 결합해 경사하강법으로 학습시키는 것이 표준이다. 미분 시 정답 클래스와 오답 클래스를 나누어 전개해야 하지만 최종 수식은 선형·로지스틱 회귀와 매우 유사하게 귀결된다.",
    source: "Week 3 § 14"
  },
  {
    id: "S1Q10",
    set: 1,
    week: 3,
    topic: "MLE와 MSE의 동치",
    type: "multiple_choice",
    difficulty: "hard",
    question: "선형 회귀(Linear Regression)에서 노이즈 $\\epsilon$이 평균 0인 정규분포(Gaussian)를 따른다고 가정할 때, 최대우도추정(MLE)이 최소제곱오차(MSE)를 최소화하는 것과 수학적으로 동치인 이유로 가장 적절한 것은?",
    choices: [
      "① 노이즈가 정규분포를 따른다고 가정하면 Log-Likelihood가 잔차의 제곱 합 형태로 귀결되어 MLE 최대화와 MSE 최소화가 수학적으로 동일하다",
      "② 노이즈가 라플라스 분포를 따른다고 가정해야 Log-Likelihood가 절댓값 합으로 전개되어 MSE 최소화와 완전히 동치인 형태로 귀결되기 때문이다",
      "③ Log-Likelihood 전개 시 지수부에서 Softmax 항이 나와 Cross-Entropy와 동치가 되므로 결국 MSE 최소화와도 수학적으로 동일해지기 때문이다",
      "④ MLE는 확률 최대화, MSE는 오차 최소화로 목적이 근본적으로 달라 동치가 아니며 가우시안 가정에서도 두 추정은 서로 무관한 결과를 낸다"
    ],
    answer: 0,
    brief: "정규분포의 지수 부분이 제곱(잔차²)이기 때문에 로그를 씌우면 Log-Likelihood가 곧 MSE 형태가 된다.",
    detailed: "정규분포의 확률밀도 함수는 $\\frac{1}{\\sqrt{2\\pi}\\sigma} \\exp(-(y - \\theta^T x)^2 / 2\\sigma^2)$ 이다. 여기에 로그를 취하면 지수부가 풀려 $-(y - \\theta^T x)^2 / 2\\sigma^2$ 이 그대로 나타나고, 상수항을 무시하면 결국 $\\sum (y^{(i)} - \\theta^T x^{(i)})^2$ 을 최소화하는 형태가 된다. 이는 정확히 Least Mean Squares(최소제곱오차)다. 따라서 '정규분포 노이즈 + MLE' 조합과 'MSE 최소화'가 수학적으로 완전히 동치다. ② 라플라스 분포는 MAE와 동치, ③ Cross-Entropy는 분류(베르누이/카테고리컬) 가정과 동치, ④ 가우시안 가정에서는 둘이 완전히 동일한 해를 낸다.",
    source: "Week 3 § 7-4"
  },

  // ── Week 4 (Q11~Q15) ──
  // LOOP-TASK [3.03] ✅
  {
    id: "S1Q11",
    set: 1,
    week: 4,
    topic: "L1 vs L2 정규화",
    type: "multiple_choice",
    difficulty: "medium",
    question: "L1 정규화(Lasso)와 L2 정규화(Ridge)를 비교한 설명으로 가장 적절한 것은?",
    choices: [
      "① L1은 파라미터 제곱의 합 $\\sum \\theta_i^2$에 페널티를 주고, L2는 절댓값의 합 $\\sum |\\theta_i|$에 페널티를 부여하여 피처 선택(Feature Selection) 효과를 낸다",
      "② L1은 파라미터 절댓값의 합($\\sum |\\theta_i|$)에, L2는 제곱의 합($\\sum \\theta_i^2$)에 페널티를 주며, L1은 덜 중요한 파라미터를 정확히 0으로 만드는 Sparsity(희소성) 효과가 있다",
      "③ 2차원 파라미터 공간에서 L1의 기하학적 제약 영역은 원(Circle) 모양이고 L2는 꼭짓점이 뚜렷한 다이아몬드 모양으로 그려진다",
      "④ L1과 L2 모두 하이퍼파라미터 $\\lambda$가 커질수록 페널티가 줄어들어 모델이 더 복잡해지고 훈련 데이터에 강하게 적합된다"
    ],
    answer: 1,
    brief: "L1=절댓값 합(다이아몬드, Sparsity 유발), L2=제곱 합(원, Shrinking). $\\lambda$가 커지면 모델은 단순해진다.",
    detailed: "L1은 제약 영역이 다이아몬드 형태라 모서리에서 최적해가 형성되기 쉬워 일부 파라미터가 정확히 0이 되는 희소 해(Sparse Solution)를 만들어 피처 선택 효과가 있다. L2는 원 형태라 모서리가 없어 0이 되는 대신 전체적으로 파라미터 크기를 부드럽게 줄여(Shrinking) 입력 변화에 대한 민감성을 낮춘다. ①은 수식이 뒤바뀌었고 ③도 기하학 형태가 뒤바뀐 함정 선지. ④는 반대로, $\\lambda$가 커지면 페널티가 커져 모델은 단순해진다.",
    source: "Week 4 § Part1-4"
  },
  {
    id: "S1Q12",
    set: 1,
    week: 4,
    topic: "판별 모델 vs 생성 모델",
    type: "multiple_choice",
    difficulty: "medium",
    question: "판별 모델(Discriminative Model)과 생성 모델(Generative Model)의 차이에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 판별 모델은 결합 확률 $p(x, y)$를 직접 학습해 데이터 생성 과정을 모델링하고, 생성 모델은 조건부 확률 $p(y \\mid x)$만 학습해 클래스 경계를 찾는다",
      "② 판별 모델은 $p(y \\mid x)$에 집중해 클래스 경계(Decision Boundary)를 찾고, 생성 모델은 $p(x \\mid y)$와 $p(y)$를 추정해 데이터 생성 과정을 모델링한다",
      "③ 판별 모델만이 Classification 문제에 사용될 수 있고, 생성 모델은 오직 새로운 데이터를 합성(Generation)하는 용도로만 쓸 수 있어 분류에는 부적합하다",
      "④ 생성 모델은 구조상 베이즈 정리(Bayes' Rule)를 전혀 사용할 수 없어 확률적 분류(Probabilistic Classification)를 수행할 수 없다"
    ],
    answer: 1,
    brief: "판별=$p(y|x)$(경계 찾기), 생성=$p(x,y)=p(x|y)p(y)$(데이터 생성 과정 모델링).",
    detailed: "판별 모델(Logistic Regression, SVM 등)은 데이터가 어떻게 생성되었는지엔 관심 없이 조건부 확률 $p(y|x)$로 클래스 경계만 찾는다. 생성 모델(Naive Bayes, LDA 등)은 각 클래스에서 데이터가 어떻게 생성되는지 $p(x|y)$와 Prior $p(y)$를 따로 추정하여 결합 확률 $p(x,y)$를 모델링한다. 생성 모델도 베이즈 정리를 이용해 Classification에 훌륭히 활용 가능하다(③·④는 틀림). ①은 판별/생성의 확률이 서로 뒤바뀐 함정.",
    source: "Week 4 § Part2-1"
  },
  {
    id: "S1Q13",
    set: 1,
    week: 4,
    topic: "Naive Bayes 핵심 가정",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Naive Bayes 분류기가 고차원 데이터의 계산 문제를 해결하기 위해 채택한 핵심 가정은?",
    choices: [
      "① 모든 클래스의 사전 확률(Prior) $p(y)$가 서로 같다고 가정하여 $\\text{argmax}$ 계산에서 $p(y)$ 항을 제거할 수 있다고 본다",
      "② 입력 데이터의 모든 피처(Feature)가 예외 없이 가우시안(정규) 분포 $\\mathcal{N}(\\mu, \\sigma^2)$를 따른다고 강하게 가정한다",
      "③ 클래스 레이블($y$)이 주어졌을 때 피처들은 서로 조건부 독립(Conditionally Independent)이다",
      "④ 피처 간 상관관계(Correlation)는 반드시 0이 아니어야 하며, 강한 상관이 존재할수록 분류 성능이 오히려 좋아진다"
    ],
    answer: 2,
    brief: "'클래스가 주어졌을 때 피처들은 서로 독립적이다' — 이 한 줄이 Naive Bayes의 전부다.",
    detailed: "Naive Bayes는 $p(x|y) = p(x_1, \\dots, x_d|y) = \\prod_j p(x_j|y)$ 로 고차원 결합 분포를 단순 곱으로 쪼갠다. 이 가정 덕분에 20×20 이미지(400차원)처럼 고차원 데이터에서도 계산이 매우 쉬워진다. 실제로는 픽셀끼리 강한 연관이 있어 이 가정이 비현실적(Unrealistic)이지만, 교수님이 강조한 것처럼 '놀랍게도 실전에서 매우 잘 작동(Effective)'하는 것이 Naive Bayes의 특징이다.",
    source: "Week 4 § Part3-2"
  },
  {
    id: "S1Q14",
    set: 1,
    week: 4,
    topic: "Bayes Rule 분모 무시",
    type: "multiple_choice",
    difficulty: "medium",
    question: "베이즈 정리를 이용한 분류 $\\text{argmax}_y \\, p(y \\mid x) = \\text{argmax}_y \\, \\frac{p(x \\mid y)p(y)}{p(x)}$ 에서 분모 $p(x)$를 무시하고 $\\text{argmax}_y \\, p(x \\mid y)p(y)$ 로 단순화할 수 있는 이유는?",
    choices: [
      "① $p(x)$는 확률 정의상 항상 정확히 1이 되는 정규화 상수여서 어떤 입력이든 분모가 1이 되기 때문이다",
      "② $p(x)$는 관측된 데이터 $x$에만 의존하며 클래스 $y$와 무관한 상수이므로, 클래스 간 비교($\\text{argmax}_y$)에는 영향을 주지 않기 때문",
      "③ $p(x)$의 값이 $10^{-300}$ 수준으로 너무 작아 컴퓨터가 Underflow 없이 계산할 수 없기 때문에 수치적으로 생략된다",
      "④ 분자와 분모 모두에 $p(x)$가 공통으로 들어가 Likelihood를 곱할 때 자연스럽게 약분되어 소거되기 때문이다"
    ],
    answer: 1,
    brief: "$p(x)$는 $y$와 무관한 정규화(Normalization) 상수라 argmax 연산에서 생략 가능.",
    detailed: "$p(x)$(Marginal likelihood 또는 Evidence)는 관측된 데이터 $x$의 전체 확률이며, 비교 대상인 $y$와는 독립적이다. 서로 다른 $y$에 대해 $p(y|x)$ 값을 비교할 때 분모 $p(x)$는 모든 $y$에 대해 동일한 상수로 작용하므로 대소 비교에 영향을 주지 않아 생략할 수 있다. 이는 argmax를 통한 분류에서만 가능하며, 실제 확률값 자체가 필요할 때(예: 확률 calibration)는 $p(x)$를 계산해야 한다.",
    source: "Week 4 § Part2-3"
  },
  {
    id: "S1Q15",
    set: 1,
    week: 4,
    topic: "LDA 공통 공분산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "LDA(Linear Discriminant Analysis)의 결정 경계(Decision Boundary)가 선형(Linear)으로 나타나는 핵심 수학적 근거는?",
    choices: [
      "① 각 클래스의 데이터가 가우시안이 아닌 균등 분포(Uniform Distribution)를 따른다고 가정하기 때문에 판별 함수가 저절로 선형 형태로 단순화된다",
      "② 클래스마다 서로 다른 공분산 행렬($\\Sigma_1 \\neq \\Sigma_2$)을 허용하여 각 클래스 고유의 모양을 반영하면 이차항이 사라져 선형 경계가 된다",
      "③ 모든 클래스의 공분산 행렬이 동일하다($\\Sigma_1 = \\Sigma_2 = \\Sigma$)고 가정하여 판별 함수 전개 시 이차항이 서로 상쇄되기 때문",
      "④ 입력 피처(Feature)의 개수가 반드시 1개여야만 하며, 2차원 이상이면 LDA의 경계는 곡선 형태로 휘어지기 때문이다"
    ],
    answer: 2,
    brief: "공분산을 같다고 가정하면 $g_1(x) - g_2(x) = 0$ 전개 중 이차항 $x^T \\Sigma^{-1} x$ 가 상쇄되어 $w^T x + b = 0$ 선형 형태만 남는다.",
    detailed: "LDA는 각 클래스 데이터가 다변량 가우시안 $\\mathcal{N}(\\mu_k, \\Sigma)$ 를 따르며 모든 클래스가 같은 공분산을 공유한다고 가정한다. 판별 함수 $g_k(x) = \\log p(x|C_k) + \\log p(C_k)$ 를 두 클래스에서 빼 경계를 찾으면 $x^T \\Sigma^{-1} x$ 이차항이 양쪽에서 완전히 상쇄되어 $w^T x + b = 0$ 의 선형 형태만 남는다. 만약 공분산을 클래스마다 다르게 허용하면(QDA) 이차항이 살아남아 결정 경계가 비선형 곡선이 된다.",
    source: "Week 4 § Part4-2"
  },

  // ── Week 5 (Q16~Q20) ──
  // LOOP-TASK [3.04] ✅
  {
    id: "S1Q16",
    set: 1,
    week: 5,
    topic: "KNN의 K값과 결정 경계",
    type: "multiple_choice",
    difficulty: "medium",
    question: "K-Nearest Neighbors(KNN) 분류기에서 K값을 키울 때 Decision Boundary의 변화로 가장 적절한 것은?",
    choices: [
      "① K=1에 가까울수록 많은 이웃의 평균 효과로 결정 경계가 부드러워(smooth)지고, K가 커질수록 개별 샘플의 영향이 커져 경계가 복잡해진다",
      "② K가 작을수록 노이즈에 민감하여 Overfitting 경향을 보이고, K가 커질수록 결정 경계가 부드러워진다",
      "③ KNN에서 K값과 Decision Boundary의 복잡도는 서로 완전히 무관하며, 어떤 K를 선택하든 경계 모양이 동일하게 유지된다",
      "④ K가 충분히 커지면 예측에 필요한 정보가 파라미터화되어 트레이닝 데이터는 더 이상 예측 시점에 필요하지 않게 된다"
    ],
    answer: 1,
    brief: "작은 K는 노이즈에 민감(Overfit), 큰 K는 경계가 완만해진다.",
    detailed: "KNN은 특정 반경 내 이웃 K개의 다수결로 분류한다. K=1일 때는 각 훈련 샘플이 자신의 영역을 직접 결정하므로 경계가 매우 울퉁불퉁하고 노이즈에 취약한 Overfitting 상태가 된다. K가 커지면 더 많은 이웃의 투표로 평활화되어 경계가 부드러워지지만 너무 크면 Underfitting이 될 수 있다. ④는 틀림 — KNN은 Non-parametric 모델이라 예측 시점에도 트레이닝 데이터가 반드시 필요하다.",
    source: "Week 5 § 4-3"
  },
  {
    id: "S1Q17",
    set: 1,
    week: 5,
    topic: "Impurity 3종 최댓값",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이진 분류(두 클래스)에서 두 클래스가 반반 섞인 상태($p_1 = p_2 = 0.5$)일 때, 각 Impurity 지표의 값이 올바르게 짝지어진 것은?",
    choices: [
      "① Entropy = 1, Gini Impurity = 0.5, Classification Error = 0.5",
      "② Entropy = 0.5, Gini Impurity = 1, Classification Error = 0.5로 Gini가 세 지표 중 가장 큰 값을 가진다",
      "③ Entropy = 1, Gini Impurity = 1, Classification Error = 1로 세 지표 모두 이론적 최댓값인 1에 도달한다",
      "④ Entropy = 0, Gini Impurity = 0, Classification Error = 0으로 반반 섞인 상태가 오히려 가장 순수(Pure)한 상태이다"
    ],
    answer: 0,
    brief: "반반일 때: Entropy 최댓값 1, Gini 최댓값 0.5, Classification Error 최댓값 0.5.",
    detailed: "Entropy $= -\\sum p_i \\log_2 p_i$ 에서 $p_1 = p_2 = 0.5$ 대입 시 $-(0.5 \\log_2 0.5 + 0.5 \\log_2 0.5) = -(0.5 \\cdot -1 + 0.5 \\cdot -1) = 1$. Gini $= 1 - \\sum p_i^2 = 1 - (0.25 + 0.25) = 0.5$. Classification Error $= 1 - \\max(p_i) = 1 - 0.5 = 0.5$. 세 지표 모두 분포가 균등할 때(불순도가 최대일 때) 최댓값을 가지고, 한 클래스만 있을 때 0이 된다. Classification Error는 주로 Pruning 시에 쓰이는 평가 지표다.",
    source: "Week 5 § 5-4"
  },
  {
    id: "S1Q18",
    set: 1,
    week: 5,
    topic: "Information Gain",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Decision Tree가 특정 노드를 분할(Split)할 때 사용하는 기준인 Information Gain에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 분할 전 부모 노드의 불순도(Impurity) $I(D_p)$ 자체가 가장 낮게 나오는 피처를 우선 선택해 이미 깨끗한 노드를 만든다",
      "② Information Gain이 최대가 되는 피처, 즉 분할 후 자식 노드들의 불순도(가중 평균)가 가장 많이 감소하는 피처를 선택한다",
      "③ 분할 후 각 자식 노드에 데이터 샘플이 가장 많이 남아있는(가장 균형 있게 나뉘는) 피처를 우선적으로 선택한다",
      "④ 입력된 피처 인덱스(Feature Index) 순서대로 고정되어 위에서부터 차례로 선택되며 불순도는 고려하지 않는다"
    ],
    answer: 1,
    brief: "IG = 부모 불순도 − 자식 불순도의 가중평균. 이 값이 최대인 피처로 분할.",
    detailed: "Information Gain $= I(D_p) - \\sum \\frac{N_{child}}{N_{parent}} I(D_{child})$. 부모 노드의 불순도에서 자식 노드들의 불순도 가중 평균을 뺀 값으로, 분할이 데이터를 얼마나 '깨끗하게' 나누는지를 측정한다. Decision Tree는 각 노드에서 모든 가능한 피처·분할 기준을 시도해 Information Gain이 가장 큰 분할을 선택한다. ①은 부모 불순도와 피처 선택은 직접 관련이 없으므로 오답이며, 자식의 불순도 감소분이 핵심이다.",
    source: "Week 5 § 5-3"
  },
  {
    id: "S1Q19",
    set: 1,
    week: 5,
    topic: "Parametric vs Non-parametric",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Parametric 모델과 Non-parametric 모델의 가장 명확한 차이는?",
    choices: [
      "① Parametric 모델은 오직 지도학습(Supervised)에만 쓸 수 있고, Non-parametric 모델은 오직 비지도학습(Unsupervised)에만 쓸 수 있는 엄격한 영역 구분이 존재한다",
      "② Parametric은 특정 함수 형태($y = f(x, W)$)를 가정해 학습된 파라미터 $W$만으로 예측하고, Non-parametric은 고정된 함수 형태가 없어 예측 시점에도 트레이닝 데이터 자체를 필요로 한다",
      "③ Parametric 모델의 대표 예시로는 KNN과 Decision Tree가 있으며, 이들은 학습된 고정 파라미터 $W$ 세트만 저장해 예측에 활용한다",
      "④ Non-parametric 모델은 가정이 적고 유연하기 때문에 항상 어떤 데이터셋에서든 Parametric 모델보다 정확도가 높게 나온다"
    ],
    answer: 1,
    brief: "Parametric: 함수 형태 고정, $W$만 저장. Non-parametric: 함수 형태 없음, 데이터 자체가 모델.",
    detailed: "Parametric 모델(Linear/Logistic Regression, Naive Bayes, LDA 등)은 함수 형태를 미리 가정하고 학습 과정에서 파라미터 $W$를 찾는다. 예측 시에는 트레이닝 데이터 없이 $W$만 있으면 된다. Non-parametric 모델(KNN, Decision Tree 등)은 함수 형태를 가정하지 않고 복잡도가 데이터 양에 따라 증가하며, 예측 시점에 트레이닝 데이터를 직접 사용한다. ③은 KNN·Tree가 Non-parametric이므로 뒤바뀐 함정, ④는 모델 성능이 문제에 따라 달라지므로 틀림.",
    source: "Week 5 § 3"
  },
  {
    id: "S1Q20",
    set: 1,
    week: 5,
    topic: "Bagging",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Bagging(Bootstrap Aggregating)에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 복원 추출(Sampling with Replacement)을 절대 허용하지 않고, 각 분류기에 원본 데이터를 서로 겹치지 않게 등분해서 배분한 뒤 학습시킨다",
      "② 원본 트레이닝 데이터에서 복원 추출로 여러 개의 Bootstrap 샘플을 만들고, 각 샘플로 독립적인 분류기를 학습시킨 뒤 다수결(Majority Voting)로 결합한다",
      "③ 각 분류기를 순차적(Sequentially)으로 학습시키며 이전 분류기가 틀린 샘플에 가중치를 부여해 다음 분류기가 집중하도록 한다",
      "④ 단일 분류기 하나에 동일한 트레이닝 데이터를 여러 Epoch 동안 반복 학습시켜 일반화 성능을 끌어올리는 정규화 기법이다"
    ],
    answer: 1,
    brief: "복원 추출로 만든 Bootstrap 샘플 → 독립적 분류기 학습 → 다수결 통합.",
    detailed: "Bagging은 'Bootstrap AGGregatING'의 약자다. 원본 데이터에서 복원 추출(With Replacement)을 허용해 같은 데이터가 여러 번 뽑히거나 아예 안 뽑히기도 하는 여러 개의 훈련 서브셋을 만든 뒤, 각 서브셋으로 개별 분류기를 독립적·병렬적으로 학습시키고 다수결로 결합한다. ③은 Boosting(순차 학습)의 설명이고, ①은 반대(복원 추출을 허용함). Random Forest는 Bagging에 피처 무작위성을 추가한 대표적 예시.",
    source: "Week 5 § 8-1"
  },

  // ── Week 6 (Q21~Q25) — Q25는 주관식 (margin 계산) ──
  // LOOP-TASK [3.05] ✅
  {
    id: "S1Q21",
    set: 1,
    week: 6,
    topic: "Support Vector",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Support Vector Machine의 'Support Vector'에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 훈련 데이터에 포함된 모든 샘플이 예외 없이 Support Vector가 되며, 결정 경계 계산 시 모두 동일한 가중치로 반영된다",
      "② Decision Boundary에서 가장 가까이 위치해 가장 작은 기하학적 마진(Geometric Margin)을 갖는 데이터 포인트이며, 이들만이 최적의 경계 결정에 영향을 미친다",
      "③ Support Vector는 실제 훈련 데이터가 아니라 SVM이 최적화 과정에서 새롭게 합성해 만든 가상 데이터 포인트(Virtual Sample)이다",
      "④ Support Vector의 개수는 반드시 클래스당 정확히 1개씩이어야 하며, 2개 이상 나오면 SVM 최적화가 실패한 경우에 해당한다"
    ],
    answer: 1,
    brief: "경계에서 가장 가까운(가장 작은 마진을 가진) 데이터 포인트만이 경계를 결정한다.",
    detailed: "SVM이 'Support Vector Machine'인 이유는, 최적의 분리선을 결정할 때 오직 경계에서 가장 가까운 데이터 포인트들(Support Vector)만이 영향을 주고 나머지 멀리 있는 점들은 경계에 전혀 영향을 미치지 않기 때문이다. 이 때문에 훈련 후에는 Support Vector만 저장해도 추론이 가능하며, 가장 가까운 점들과의 거리(마진)를 최대화했기 때문에 일반화 성능(Generalization)이 뛰어나다.",
    source: "Week 6 § 6-3"
  },
  {
    id: "S1Q22",
    set: 1,
    week: 6,
    topic: "SVM 하이퍼파라미터 C",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Soft-margin SVM의 하이퍼파라미터 $C$ (Slack Variable 페널티 계수)에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① $C$가 클수록 Slack Variable $\\xi_i$의 허용 범위가 늘어나 오분류를 더 많이 허용하게 되고, 그 결과 Decision Boundary의 마진이 넓어진다",
      "② $C$가 작을수록 모델을 더 엄격하게 만들어 오분류를 거의 허용하지 않으며, 결과적으로 Decision Boundary의 마진이 좁아진다",
      "③ $C$가 클수록 오분류에 더 큰 페널티를 부여해 모델이 엄격해지고 마진이 좁아지며, 작을수록 오분류를 허용해 마진이 넓어진다",
      "④ $C$는 RBF·다항식·시그모이드 같은 커널 함수(Kernel)의 종류를 결정하는 선택 변수이며 마진 크기와는 전혀 무관하다"
    ],
    answer: 2,
    brief: "C 크다 = 빡세게(마진 좁음). C 작다 = 유연하게(마진 넓음).",
    detailed: "목적식 $\\min \\frac{1}{2}\\|w\\|^2 + C \\sum \\xi_i$ 에서 $C$는 $\\|w\\|^2$ 최소화(큰 마진)와 오분류 허용(작은 $\\sum \\xi_i$) 사이의 트레이드오프를 결정한다. $C$가 크면 오분류 비용이 커져 데이터를 거의 완벽히 나누려 하고 마진이 좁아져 과적합 위험이 있다. $C$가 작으면 일부 오분류를 허용하며 마진을 넓게 잡아 일반화가 좋아지지만 너무 작으면 Underfitting. 최적 $C$는 교차 검증으로 찾는다. 시험 출제 1순위 포인트.",
    source: "Week 6 § 8-3"
  },
  {
    id: "S1Q23",
    set: 1,
    week: 6,
    topic: "Kernel Trick",
    type: "multiple_choice",
    difficulty: "hard",
    question: "SVM의 커널 트릭(Kernel Trick)이 고차원 매핑을 효율적으로 수행할 수 있는 수학적 이유는?",
    choices: [
      "① 커널은 학습 단계에서 데이터를 실제로 $\\phi(x)$를 통해 고차원 공간에 명시적으로 매핑해 저장한 뒤, 그 고차원 벡터끼리 직접 내적을 계산하기 때문이다",
      "② SVM의 최적화 쌍대 문제(Dual Problem) 형태가 데이터 간 내적(Inner Product) $x_i \\cdot x_j$ 만 필요로 하므로, 원래 차원에서 커널 함수 $K(x_i, x_j)$를 계산하는 것만으로 고차원 내적과 같은 결과를 얻기 때문",
      "③ 커널 트릭은 선형 분리 불가능한 분류 문제를 내부적으로 선형 회귀(Linear Regression) 형태로 자동 변환시켜 풀게 하기 때문이다",
      "④ 커널은 오히려 데이터의 입력 차원 자체를 낮춰 주는 차원 축소(Dimensionality Reduction) 역할을 하여 연산량을 크게 줄이기 때문이다"
    ],
    answer: 1,
    brief: "Dual 문제에서 내적만 등장 → 커널 함수로 고차원 내적을 원래 차원에서 계산 가능.",
    detailed: "원래 모든 데이터를 고차원으로 직접 보내면 연산량이 폭발한다. 하지만 SVM 최적화를 쌍대 문제로 바꾸면 수식에 데이터 간 내적 $x_i \\cdot x_j$ 만 등장한다는 점을 이용해, 고차원 매핑 $\\phi(x)$ 없이도 원래 차원에서 커널 함수 $K(x_i, x_j) = \\phi(x_i) \\cdot \\phi(x_j)$ 값만 계산하면 동일한 결과를 얻는다. 이것이 '트릭'인 이유다. 예: RBF(가우시안) 커널은 사실상 무한 차원 매핑과 등가.",
    source: "Week 6 § 9"
  },
  {
    id: "S1Q24",
    set: 1,
    week: 6,
    topic: "OvR vs OvO 분류기 개수",
    type: "multiple_choice",
    difficulty: "easy",
    question: "클래스가 $K$개인 다중 클래스 분류에서 SVM을 확장할 때, One-vs-Rest(OvR)와 One-vs-One(OvO) 각각이 학습하는 분류기의 개수는?",
    choices: [
      "① OvR은 모든 클래스 쌍마다 분류기를 만들어 $K(K-1)/2$개, OvO는 각 클래스마다 하나씩 $K$개를 학습시킨다",
      "② OvR: $K$개, OvO: $K(K-1)/2$개",
      "③ OvR과 OvO 모두 각 클래스에 하나씩 대응하는 분류기만 학습시키므로 $K$개로 동일한 개수를 가진다",
      "④ OvR과 OvO 모두 모든 가능한 클래스 쌍 조합에 대해 분류기를 만들어 $K(K-1)/2$개로 동일하다"
    ],
    answer: 1,
    brief: "OvR은 클래스 수 K와 같은 개수, OvO는 모든 쌍이므로 K(K-1)/2개.",
    detailed: "OvR(One-vs-Rest)은 '하나 vs 나머지 전체'로 각 클래스마다 분류기 1개씩 $K$개를 학습한다. 빠르지만 클래스 불균형이 발생할 수 있다. OvO(One-vs-One)는 모든 클래스 쌍에 대해 1:1 분류기를 만들어 $\\binom{K}{2} = K(K-1)/2$개를 학습한다. 불균형 문제가 적고 로버스트하지만 클래스 수가 많아지면 분류기가 기하급수적으로 늘어난다. Scikit-learn은 성능이 비슷하므로 속도가 빠른 OvR을 기본 선호.",
    source: "Week 6 § 10"
  },
  {
    id: "S1Q25",
    set: 1,
    week: 6,
    topic: "Geometric Margin 계산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "어떤 선형 SVM이 가중치 $w = (3, 4)$, 편향 $b = -5$를 가진다. 데이터 포인트 $x = (2, 1)$의 실제 라벨이 $y = +1$일 때, 이 포인트의 기하학적 마진(Geometric Margin) $\\gamma$ 값은?",
    choices: [
      "① 0.20",
      "② 1.00",
      "③ 2.00",
      "④ 5.00"
    ],
    answer: 1,
    brief: "$\\gamma = y(w^T x + b) / \\|w\\| = 1 \\cdot (6 + 4 - 5) / \\sqrt{9+16} = 5/5 = 1.00$",
    detailed: "기하학적 마진 공식: $\\gamma^{(i)} = y^{(i)}(w^T x^{(i)} + b) / \\|w\\|$. 분자(Functional margin) = $1 \\cdot (3 \\cdot 2 + 4 \\cdot 1 + (-5)) = 1 \\cdot (6 + 4 - 5) = 5$. 분모 $\\|w\\| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$. 따라서 $\\gamma = 5 / 5 = 1.00$. 기능적 마진과 달리 기하학적 마진은 $\\|w\\|$로 나누기 때문에 $w$와 $b$를 상수배 해도 동일한 선에 대해 같은 값이 나온다. 함정: ① 분자·분모를 뒤집으면 $5/25 = 0.20$, ③ 분모를 $\\|w\\|^2/2$ 등으로 착각하면 2.00, ④ $\\|w\\|$로 나누는 것을 잊으면 Functional Margin 값 5.00이 그대로 나온다.",
    source: "Week 6 § 6"
  },

  // ── Week 7 (Q26~Q30) — Q30은 주관식 (F1 계산) ──
  // LOOP-TASK [3.06] ✅
  {
    id: "S1Q26",
    set: 1,
    week: 7,
    topic: "Confusion Matrix · Type 1/2 오류",
    type: "multiple_choice",
    difficulty: "easy",
    image: "assets/images/confusion_matrix.jpg",
    question: "Confusion Matrix에서 실제로는 Negative(음성)인 데이터를 모델이 Positive(양성)로 잘못 예측한 경우의 명칭과 오류 유형으로 올바른 것은?",
    choices: [
      "① True Positive(TP)로 실제 양성을 정확히 양성으로 맞춘 경우이며, 제1종 오류(Type 1 Error)에 해당한다",
      "② True Negative(TN)로 실제 음성을 정확히 음성으로 맞춘 경우이며, 제2종 오류(Type 2 Error)에 해당한다",
      "③ False Positive(FP), 제1종 오류(Type 1 Error)",
      "④ False Negative(FN)로 실제 양성을 음성으로 놓친 경우이며, 제2종 오류(Type 2 Error)에 해당한다"
    ],
    answer: 2,
    brief: "실제 Negative → 예측 Positive = False Positive = Type 1 Error.",
    detailed: "Confusion Matrix 4분면: TP(실제 양성을 양성으로 맞춤), TN(실제 음성을 음성으로 맞춤), FP(실제 음성을 양성으로 잘못 예측 = 제1종 오류), FN(실제 양성을 음성으로 잘못 예측 = 제2종 오류). 의료 진단 예: FP는 건강한 사람을 환자로 오진(과진단), FN은 환자를 건강하다고 놓침(누락). 두 오류는 서로 트레이드오프 관계이며, 어떤 오류를 더 줄일지는 응용 상황에 따라 다르다.",
    source: "Week 7 § 4"
  },
  {
    id: "S1Q27",
    set: 1,
    week: 7,
    topic: "Class Imbalance와 Accuracy 함정",
    type: "multiple_choice",
    difficulty: "medium",
    question: "총 100명 중 98명이 음성(Negative), 2명이 양성(Positive)인 극단적 불균형 데이터에서, 훈련조차 하지 않고 모든 입력을 '음성'이라고만 예측하는 Lazy Classifier의 Accuracy와 그 해석으로 올바른 것은?",
    choices: [
      "① Accuracy 50%로, 양성 2명 중 1명만 찾아내는 절반 수준의 무작위 수준 예측을 보여준다",
      "② Accuracy 98%이지만 실제로는 양성을 하나도 찾지 못해 분류기로서 쓸모가 없음",
      "③ Accuracy 0%로, 98명의 음성을 모두 양성으로 오분류해 모든 샘플을 다 틀리는 최악의 분류기이다",
      "④ Accuracy 2%로, 단 2명의 양성만 맞추고 98명의 다수 클래스를 모조리 잘못 예측하는 상태이다"
    ],
    answer: 1,
    brief: "98명을 '음성'으로 맞혀 정확도 98%. 그러나 양성(TP=0)은 하나도 못 찾아 실질 가치는 0.",
    detailed: "$\\text{Accuracy} = (TP + TN) / (TP + TN + FP + FN) = (0 + 98) / 100 = 0.98$. 숫자만 보면 매우 높지만 양성 클래스에 대한 Recall이 0이라 실제로는 무용지물이다. 이것이 교수님이 강조한 'Class Imbalance에서 Accuracy의 함정'. 의료(암 진단), 사기 탐지 같은 도메인에서 특히 위험하며, 이를 보완하기 위해 Precision·Recall·F1·MCC 같은 지표를 함께 본다.",
    source: "Week 7 § 7"
  },
  {
    id: "S1Q28",
    set: 1,
    week: 7,
    topic: "ROC Curve",
    type: "multiple_choice",
    difficulty: "medium",
    image: "assets/images/roc_curve.jpg",
    question: "ROC(Receiver Operating Characteristic) Curve에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① X축은 Precision이고 Y축은 Recall이며, 곡선이 대각선 $y = x$ 위에 위치하기만 하면 Random Guess보다 우수한 분류기로 판정된다",
      "② X축은 FPR(False Positive Rate = 1 − Specificity), Y축은 TPR(True Positive Rate = Recall)이며, 좌측 상단 꼭짓점 (0, 1)에 가까울수록 좋은 분류기다",
      "③ X축이 TPR(True Positive Rate), Y축이 FPR(False Positive Rate)이며, 우측 상단 꼭짓점 (1, 1)에 가까울수록 완벽한 분류기에 해당한다",
      "④ AUC(Area Under Curve) 값은 일반적으로 1보다 훨씬 커야 정상이며, 값이 작아질수록 모델의 분류 성능이 좋다고 판단한다"
    ],
    answer: 1,
    brief: "ROC는 X=FPR, Y=TPR. (0,1) 좌상단 꼭짓점이 완벽한 분류기.",
    detailed: "ROC Curve는 임계값(Threshold)을 바꿔가며 (FPR, TPR) 점을 찍어 연결한 곡선. 대각선 $y=x$는 Random Guess이고, 좌측 상단에 가까울수록(FPR 낮고 TPR 높음) 분류 성능이 좋다. (0, 1)이 이론적 완벽 분류기. AUC(Area Under Curve)는 곡선 아래 면적으로 0~1 범위이며 1에 가까울수록 좋다. 대각선 오른쪽 아래는 Random보다도 못한 모델이지만 결과를 뒤집으면(C') 오히려 좋은 분류기가 된다는 교수님 코멘트가 유명.",
    source: "Week 7 § 10~11"
  },
  {
    id: "S1Q29",
    set: 1,
    week: 7,
    topic: "MCC의 장점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "MCC(Matthews Correlation Coefficient)가 Class Imbalance 상황에서 Accuracy보다 유용한 이유로 가장 적절한 것은?",
    choices: [
      "① MCC는 Confusion Matrix의 4가지 값(TP·TN·FP·FN)을 모두 통합해 계산하는 균형 잡힌 지표이기 때문",
      "② MCC는 Accuracy에 비해 계산식이 훨씬 단순하여 연산 속도가 빠르고 대용량 데이터에서도 실시간 평가에 적합하기 때문이다",
      "③ MCC는 값의 범위가 항상 0과 1 사이의 양수로만 정의되어 음수값이 나올 수 없어 해석이 직관적이기 때문이다",
      "④ MCC는 주로 회귀(Regression) 문제에서 예측 연속값과 실제값의 상관을 측정하는 지표로 사용되어 분류 지표보다 우수하기 때문이다"
    ],
    answer: 0,
    brief: "MCC는 4개 셀을 모두 섞어 쓰므로 한 클래스 쏠림에 속지 않는다.",
    detailed: "$\\text{MCC} = (TP \\cdot TN - FP \\cdot FN) / \\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}$. 값은 -1~+1 범위(③ 오답). +1은 완벽, 0은 Random, -1은 완전 반대. 4개 셀이 모두 수식에 들어가므로 한 클래스만 맞혀도 값이 올라가는 Accuracy와 달리 양·음성 모두 제대로 분류해야 점수가 올라간다. Lazy Classifier 예에서 Accuracy는 98%지만 MCC는 0.00으로 '사실상 찍는 수준'임이 명확히 드러난다.",
    source: "Week 7 § 8"
  },
  {
    id: "S1Q30",
    set: 1,
    week: 7,
    topic: "F1-Score 계산",
    type: "short_answer",
    difficulty: "hard",
    question: "다음 혼동 행렬(Confusion Matrix)이 주어졌을 때, F1-Score를 소수점 둘째 자리까지 계산하시오.\n\nTP = 40, FP = 10, FN = 20, TN = 30",
    answer: "0.73",
    answer_type: "number",
    tolerance: 0.01,
    brief: "P = 40/50 = 0.80, R = 40/60 ≈ 0.667, F1 = 2·P·R/(P+R) ≈ 0.73",
    detailed: "F1은 Precision과 Recall의 조화평균(Harmonic Mean). 공식 $F1 = 2 \\cdot P \\cdot R / (P + R)$. ① $P = TP/(TP+FP) = 40/(40+10) = 40/50 = 0.80$. ② $R = TP/(TP+FN) = 40/(40+20) = 40/60 \\approx 0.6667$. ③ $F1 = 2 \\cdot (0.80 \\cdot 0.6667) / (0.80 + 0.6667) = 1.0667 / 1.4667 \\approx 0.7273$ → 소수 둘째 자리로 반올림 시 **0.73**. 교수님이 '계산 문제는 Confusion Matrix 기반으로 무조건 출제'라고 명시한 핵심 유형.",
    source: "Week 7 § 5"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 2 — 계산 중심
// 배분: W2:4 · W3:4 · W4:5 · W5:5 · W6:5 · W7:7 = 30
// 주관식 위치: Q8(W3 grad desc 1-step), Q14(W4 Bayes 계산),
//              Q23(W6 α·마진), Q28(W7 MCC 계산), Q30(W7 AUC 해석)
// ═══════════════════════════════════════════════════════════════
export const set2 = [
  // ── Week 2 (Q1~Q4) ──
  // LOOP-TASK [3.07] ✅
  {
    id: "S2Q1",
    set: 2,
    week: 2,
    topic: "Bias-Variance 판단",
    type: "multiple_choice",
    difficulty: "medium",
    question: "어떤 회귀 모델을 50개의 훈련 데이터로 학습한 결과 Training Error는 0.01, Validation Error는 0.85로 나타났다. 이 모델의 상태 진단과 가장 적절한 해결책은?",
    choices: [
      "① Underfitting(High Bias) 상태로, 모델 복잡도를 더 낮추고 피처를 줄여 편향을 추가로 강화하는 방향으로 재학습해야 한다",
      "② Overfitting(High Variance) 상태로, 정규화(Regularization) 적용·모델 복잡도 축소·데이터 증대 등으로 분산을 낮춰야 한다",
      "③ Train과 Validation Error의 차이가 커도 두 값 모두 1 미만이므로 정상 범위의 학습 결과이며 별도 조치가 불필요하다",
      "④ Training Error가 충분히 낮으면 Validation Error도 자동으로 같은 수준까지 수렴하므로 Epoch만 더 늘려 지켜보면 된다"
    ],
    answer: 1,
    brief: "Train 낮고 Val 높으면 Overfit(High Variance). 복잡도 낮추거나 데이터 늘려야 한다.",
    detailed: "Training Error 0.01 + Validation Error 0.85 = 전형적인 Overfitting 시그니처. 모델이 훈련 데이터의 노이즈까지 암기했다는 뜻이다. 해결책: ⑴ 모델 복잡도 축소(파라미터/깊이 줄이기), ⑵ L1·L2 정규화, ⑶ Early Stopping, ⑷ 훈련 데이터 증대, ⑸ Dropout 같은 구조적 노이즈. ①은 Underfit 해결책과 정확히 반대고, ③·④는 문제가 이미 드러난 상태라 안일한 판단이다.",
    source: "Week 2 § 6"
  },
  {
    id: "S2Q2",
    set: 2,
    week: 2,
    topic: "K-fold 연산 비용 Trade-off",
    type: "multiple_choice",
    difficulty: "medium",
    question: "10-fold Cross-Validation과 Leave-one-out Cross-Validation(LOOCV)의 차이에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① LOOCV는 폴드 수가 전체 데이터 수($N$)와 같아 $N$번의 훈련을 반복하므로 연산 비용이 매우 크고, 10-fold는 10번만 반복하므로 실무에서 LOOCV보다 훨씬 자주 쓰인다",
      "② 10-fold는 K=10이라 매번 90%의 데이터로 학습해야 하므로, K=N인 LOOCV보다 총 연산량이 항상 더 많아 대규모 데이터에서는 비효율적이다",
      "③ LOOCV는 매 반복마다 검증 샘플이 1개로 고정되어 있어 소수 클래스가 골고루 분배되므로 클래스 불균형 문제를 자동으로 해결해 준다",
      "④ 10-fold는 폴드 수가 적어 분산이 작기 때문에 항상 LOOCV보다 일반화 성능 추정의 정확도가 더 높다고 이론적으로 증명되어 있다"
    ],
    answer: 0,
    brief: "LOOCV는 K=N이라 연산 과중. 실무는 10-fold가 표준.",
    detailed: "LOOCV는 매번 단 1개 샘플만 검증으로 빼고 $N-1$개로 훈련하는 과정을 $N$번 반복한다. $N$이 수천 이상이면 연산 비용이 감당 안 된다. 10-fold는 단 10회 훈련으로 유사한 품질의 일반화 성능 추정치를 얻을 수 있어 표준으로 쓰인다. 불균형 데이터는 LOOCV든 10-fold든 자체로 해결되지 않고 Stratified 변형이 필요하다.",
    source: "Week 2 § 5"
  },
  {
    id: "S2Q3",
    set: 2,
    week: 2,
    topic: "Shortcut Learning 별/달 예시",
    type: "multiple_choice",
    difficulty: "hard",
    question: "딥러닝 모델이 본질적 특징이 아닌 데이터셋의 우연한 힌트를 학습해버리는 '지름길 학습(Shortcut Learning)'의 대표적 예시는?",
    choices: [
      "① 모델이 별과 달을 구분할 때 형태(Shape)가 아닌 화면 상의 위치(왼쪽/오른쪽)를 학습해, 위치가 바뀌면 완전히 틀린 답을 내놓는다",
      "② Training Error가 수렴하지 못하고 매 Epoch마다 진동하여 결국 평균 이상의 큰 값으로 고정되는 Underfitting 현상의 대표적 유형이다",
      "③ 학습률(Learning Rate)을 지나치게 크게 잡아 Gradient Descent의 업데이트 폭이 최솟값을 건너뛰며 발산해 손실이 계속 증가하는 최적화 실패 사례다",
      "④ 손실 함수 표면이 Non-convex라서 Gradient Descent가 Local Minimum에 갇혀 Global Minimum을 절대 찾지 못하는 최적화 이론의 구조적 한계다"
    ],
    answer: 0,
    brief: "모델이 형태 대신 '위치' 같은 허상 패턴(Spurious Pattern)을 단축 경로로 학습하는 현상.",
    detailed: "교수님이 Week 2에서 든 대표 예시 2개: ⑴ 별/달 이미지를 모양이 아니라 화면 상의 좌/우 위치로 판단 → 위치가 바뀌면 오답 폭증. ⑵ 고양이 형태 이미지에 코끼리 가죽 텍스처를 입히면 모델이 99% 확률로 '코끼리'라고 답함. 이런 학습은 In-distribution에선 잘 작동하지만, OOD 데이터나 적대적 예제(Adversarial Example)에 극도로 취약해진다. ②③④는 Shortcut Learning과 무관한 일반 학습 오류.",
    source: "Week 2 § 7-2"
  },
  {
    id: "S2Q4",
    set: 2,
    week: 2,
    topic: "Deep Double Descent",
    type: "multiple_choice",
    difficulty: "hard",
    question: "OpenAI 연구진이 발견한 'Deep Double Descent' 현상을 가장 잘 설명한 것은?",
    choices: [
      "① 모델 크기나 훈련(Epoch)을 기존 한계를 넘어 계속 늘리면, 전통적 U자형으로 상승하던 Validation Error가 어느 순간 다시 하강해 이전보다 더 낮은 값까지 내려가는 현상",
      "② 모델 크기를 키울수록 Training Error와 Validation Error가 완전히 동조하며 단조 감소해, Bias-Variance Trade-off 자체가 더 이상 존재하지 않게 된다는 주장",
      "③ 모델 복잡도에 따른 Validation Error는 반드시 U자형 곡선 하나만을 그린다는 전통적 통계학 이론이 재차 검증된 연구로, Scaling Law를 반박하는 결과",
      "④ 학습률(Learning Rate)이 일정 임계값 이하로 내려가면 Vanishing Gradient와 동시에 Gradient 값이 불안정하게 폭주해 손실이 발산하는 최적화 현상"
    ],
    answer: 0,
    brief: "모델·Epoch를 계속 늘리면 상승하던 Val Error가 다시 떨어져 더 낮아지는 '두 번째 하강'.",
    detailed: "전통적으로 모델 크기가 커지면 Validation Error가 U자로 다시 올라간다고 알려졌다(과적합). OpenAI는 여기서 멈추지 않고 더 키웠더니 어느 순간 다시 Error가 떨어져 **이전보다도 낮은 값**에 도달하는 두 번째 하강을 관찰했다. 이는 Scaling Law(파라미터/데이터를 키우면 성능이 계속 오른다는 법칙, GPT 1→4 흐름)와 밀접하며, 교수님이 최신 연구 동향으로 소개한 포인트. 전통 이론을 보완하는 경험적 현상.",
    source: "Week 2 § 6-4"
  },

  // ── Week 3 (Q5~Q8) — Q8 주관식 ──
  // LOOP-TASK [3.08] ✅
  {
    id: "S2Q5",
    set: 2,
    week: 3,
    topic: "Cost Function 상수 1/2",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Linear Regression 비용 함수 $J(\\theta) = \\frac{1}{2}\\sum_{i=1}^n (f_\\theta(x^{(i)}) - y^{(i)})^2$ 앞에 $\\frac{1}{2}$이 들어간 이유로 가장 적절한 것은?",
    choices: [
      "① 미분 시 제곱에서 내려오는 2와 약분하여 수식을 깔끔하게 만들기 위한 의도적 상수",
      "② 수학적 정의상 반드시 요구되는 항으로, 이 값이 없으면 argmin이 이동하여 최적해 $\\theta^*$의 위치가 완전히 달라진다",
      "③ 원래 Convex였던 $J(\\theta)$를 Concave 함수로 뒤집어 Gradient Ascent로 Maximize하기 위한 수학적 변환 도구",
      "④ Linear Regression 전용 상수이며, Logistic Regression이나 다른 Loss Function에는 구조적으로 등장할 수 없는 특수 항"
    ],
    answer: 0,
    brief: "미분 시 제곱에서 내려오는 2와 상쇄시키기 위한 편의용 상수. 최적해 위치는 달라지지 않는다.",
    detailed: "$\\frac{d}{d\\theta} \\frac{1}{2}(f-y)^2 = (f-y) \\cdot \\frac{df}{d\\theta}$. $\\frac{1}{2}$가 없어도 최적화 결과는 동일하지만 있는 편이 수식이 예뻐진다. $J(\\theta)$는 Convex(볼록)하므로 최소화가 목표고(③ 오답), 1/2 상수 자체는 스칼라 곱이라 argmin 위치를 바꾸지 않는다(②도 오답). Logistic Regression의 Cross-Entropy Loss에도 1/2 같은 편의 상수가 붙기도 한다.",
    source: "Week 3 § 5-4"
  },
  {
    id: "S2Q6",
    set: 2,
    week: 3,
    topic: "Sigmoid 미분",
    type: "multiple_choice",
    difficulty: "medium",
    question: "시그모이드 함수 $g(z) = \\dfrac{1}{1 + e^{-z}}$ 의 미분 결과로 올바른 것은?",
    choices: [
      "① $g'(z) = z(1 - z)$",
      "② $g'(z) = g(z)(1 - g(z))$",
      "③ $g'(z) = 1 - g(z)^2$",
      "④ $g'(z) = e^{-z}$"
    ],
    answer: 1,
    brief: "시그모이드의 미분은 자기 자신의 곱 $g(z)(1 - g(z))$로 떨어지는 특별한 성질이 있다.",
    detailed: "$g(z) = (1 + e^{-z})^{-1}$ 을 미분하면 $g'(z) = \\dfrac{e^{-z}}{(1 + e^{-z})^2} = g(z) \\cdot \\dfrac{e^{-z}}{1 + e^{-z}} = g(z)(1 - g(z))$. 이 깔끔한 형태 덕분에 Logistic Regression의 Log-Likelihood를 미분할 때 복잡한 수식이 마법처럼 정리되어 Linear Regression의 Gradient Descent와 거의 동일한 업데이트 공식이 나온다. ③은 $\\tanh$의 미분 성질과 혼동한 함정 선지.",
    source: "Week 3 § 9-1"
  },
  {
    id: "S2Q7",
    set: 2,
    week: 3,
    topic: "확률의 두 조건",
    type: "multiple_choice",
    difficulty: "easy",
    question: "다중 클래스 분류(Multiclass Classification) 모델의 출력이 '확률'로 해석되려면 반드시 만족해야 하는 두 조건은?",
    choices: [
      "① 모든 출력값이 1보다 크거나 같으며(≥ 1), 전체 값의 합이 0이 되어 상쇄되어야 한다는 두 조건",
      "② 모든 출력값이 음수가 아니며(≥ 0), 전체 값의 합이 1이다",
      "③ 모든 출력값이 반드시 정수여야 하고, 클래스 간 가장 큰 값이 정확히 1로 고정되어야 한다는 두 조건",
      "④ 모든 출력값이 서로 동일한 값을 가지며, 그 전체 합은 전체 클래스 수($C$)와 일치해야 한다는 두 조건"
    ],
    answer: 1,
    brief: "확률: ⑴ 음수 금지, ⑵ 전체 합이 1. Softmax는 이 두 조건을 자동으로 만족시킨다.",
    detailed: "확률의 두 공리: $p_i \\ge 0$ 이고 $\\sum_i p_i = 1$. Softmax 함수 $\\text{softmax}(t_c) = \\exp(t_c) / \\sum_k \\exp(t_k)$ 는 지수함수로 음수를 제거($p \\ge 0$)하고 전체 합으로 나눠 합=1을 만든다. 덤으로 큰 값은 더 지배적으로, 나머지는 억누르는 Amplification 효과까지 있다. 이진 분류의 Sigmoid도 같은 역할을 단순화한 형태로 수행한다.",
    source: "Week 3 § 13~14"
  },
  {
    id: "S2Q8",
    set: 2,
    week: 3,
    topic: "Gradient Descent 1-step 계산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Linear Regression 모델 $f(x) = \\theta_0 + \\theta_1 x$ 의 현재 파라미터가 $\\theta_0 = 0, \\theta_1 = 1$ 이다. 단일 훈련 샘플 $(x, y) = (2, 5)$에 대해 학습률 $\\alpha = 0.1$로 Gradient Descent 1회 업데이트를 수행했을 때 갱신된 $\\theta_1$의 값은?",
    choices: [
      "① 0.4",
      "② 1.0",
      "③ 1.6",
      "④ 2.5"
    ],
    answer: 2,
    brief: "예측 $f(2)=2$, 잔차 $2-5=-3$. $\\theta_1$ 업데이트: $1 - 0.1 \\cdot (-3) \\cdot 2 = 1.6$",
    detailed: "단일 샘플 업데이트 공식 $\\theta_j := \\theta_j - \\alpha (f_\\theta(x) - y) x_j$. 순서대로 계산: ⑴ 예측값 $f(2) = 0 + 1 \\cdot 2 = 2$. ⑵ 잔차 $f(x) - y = 2 - 5 = -3$. ⑶ $\\theta_1$ 기울기 $= (-3) \\cdot x_1 = (-3) \\cdot 2 = -6$. ⑷ 업데이트 $\\theta_1 := 1 - 0.1 \\cdot (-6) = 1 + 0.6 = 1.6$. 잔차가 음수(예측이 실제보다 작음)라서 $\\theta_1$을 키우는 방향으로 이동하는 게 직관과 일치.",
    source: "Week 3 § 5"
  },

  // ── Week 4 (Q9~Q13) ──
  // LOOP-TASK [3.09] ✅
  {
    id: "S2Q9",
    set: 2,
    week: 4,
    topic: "Prior 확률 계산",
    type: "multiple_choice",
    difficulty: "easy",
    question: "100개의 이메일 중 스팸 40개, 정상 60개가 있다. Naive Bayes 분류기에서 사전 확률(Prior) $P(y = \\text{spam})$과 $P(y = \\text{정상})$은?",
    choices: [
      "① 0.5, 0.5",
      "② 0.4, 0.6",
      "③ 0.6, 0.4",
      "④ 1.0, 0.0"
    ],
    answer: 1,
    brief: "Prior는 전체 데이터 중 해당 클래스의 비율. 스팸 40/100 = 0.4.",
    detailed: "Maximum Likelihood로 Prior를 추정하면 각 클래스의 비율 $\\hat{P}(y) = (\\text{클래스 } y \\text{의 개수}) / (\\text{전체 개수})$ 가 된다. 따라서 $P(\\text{spam}) = 40/100 = 0.4$, $P(\\text{정상}) = 60/100 = 0.6$. Prior 계산은 매우 단순한 셈이지만 분류 결과에 직접 영향을 주므로 정확히 짚고 가야 한다. 교수님이 'Prior는 계산이 쉽다'고 강조한 포인트.",
    source: "Week 4 § Part3-4"
  },
  {
    id: "S2Q10",
    set: 2,
    week: 4,
    topic: "L2 정규화 목적 함수",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Linear Regression에 L2 정규화를 적용한 Ridge Regression의 목적 함수로 올바른 것은?",
    choices: [
      "① $J(\\theta) = \\frac{1}{2}\\sum(f(x) - y)^2 + \\lambda \\sum |\\theta_i|$",
      "② $J(\\theta) = \\frac{1}{2}\\sum(f(x) - y)^2 + \\lambda \\sum \\theta_i^2$",
      "③ $J(\\theta) = \\frac{1}{2}\\sum(f(x) - y)^2 - \\lambda \\sum \\theta_i^2$",
      "④ $J(\\theta) = \\frac{1}{2}\\sum(f(x) - y)^2 \\cdot \\lambda \\sum \\theta_i^2$"
    ],
    answer: 1,
    brief: "Ridge = 원래 MSE Loss + L2 페널티($\\lambda \\sum \\theta_i^2$).",
    detailed: "정규화는 원래 손실 함수에 페널티 항을 더하는 방식이다. L2(Ridge)는 파라미터 제곱 합에 $\\lambda$를 곱한 값을 더하고, L1(Lasso)는 절댓값 합을 더한다. ①은 L1 공식이고 ③은 부호가 반대라 복잡도를 낮추지 못하므로 오답. 페널티가 양수로 더해져야 $\\theta$가 작아질수록 Cost가 줄어드는 효과가 생겨 모델이 단순해진다.",
    source: "Week 4 § Part1-3,4"
  },
  {
    id: "S2Q11",
    set: 2,
    week: 4,
    topic: "Naive Bayes 조건부 독립 효과",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Naive Bayes의 조건부 독립(Conditionally Independent) 가정이 계산을 현저히 간단하게 만드는 구체적 이유는?",
    choices: [
      "① 고차원 결합 확률 $p(x \\mid y)$ 를 각 피처의 확률 곱 $\\prod_j p(x_j \\mid y)$ 로 쪼갤 수 있어 차원 저주(Curse of Dimensionality) 문제가 완화되기 때문",
      "② 서로 의존하지 않는 피처들은 분류 결과와 무관하므로 학습 전에 임의로 제거해도 Likelihood 계산이 달라지지 않기 때문이다",
      "③ 각 클래스의 사전 확률(Prior) $P(y)$를 별도로 추정할 필요가 없어지고 Likelihood만 비교하면 바로 argmax가 결정되기 때문이다",
      "④ 모든 피처가 가우시안 분포를 따르도록 자동 정규화되어 $p(x_j \\mid y)$가 명시적 수식 없이도 계산되기 때문이다"
    ],
    answer: 0,
    brief: "고차원 결합 $p(x|y)$를 1차원 $p(x_j|y)$의 곱으로 축소 → 차원 저주 완화.",
    detailed: "$x$가 400차원(예: 20×20 이미지 픽셀)이면 결합 분포 $p(x_1, ..., x_{400}|y)$를 직접 추정하려면 기하급수적인 데이터가 필요하다. 조건부 독립 가정을 걸면 $\\prod_j p(x_j|y)$ 로 쪼개지고 각 $p(x_j|y)$는 1차원 추정 문제라 훈련 데이터가 적어도 안정적으로 추정된다. 현실에서 독립 가정이 틀리기 쉬움에도(픽셀 간 상관 등) 실전에서 잘 작동하는 것이 Naive Bayes의 특징이라고 교수님이 강조.",
    source: "Week 4 § Part3-2"
  },
  {
    id: "S2Q12",
    set: 2,
    week: 4,
    topic: "LDA Pooled Covariance",
    type: "multiple_choice",
    difficulty: "medium",
    question: "LDA(Linear Discriminant Analysis)에서 Pooled Covariance(풀링된 공분산) $\\hat{\\Sigma}$를 사용하는 이유로 가장 적절한 것은?",
    choices: [
      "① 각 클래스마다 고유한 공분산 $\\Sigma_k$를 허용한다는 LDA의 핵심 가정 때문에 클래스별 공분산을 각각 추정한 뒤 통합해야 하기 때문이다",
      "② LDA는 모든 클래스의 공분산이 같다($\\Sigma_1 = \\Sigma_2 = \\Sigma$)고 가정하므로, 각 클래스의 데이터를 합쳐 하나의 통합된 공분산 추정치를 구한다",
      "③ 클래스별 평균 벡터 $\\mu_k$를 추정하기 위한 중간 단계로서, 공분산을 계산하는 과정에서 평균이 자연스럽게 도출되기 때문이다",
      "④ 피처 간 상관관계를 강제로 0으로 만들어 서로 독립인 축으로 변환하여 Decision Boundary를 단순화하기 위한 전처리 절차이다"
    ],
    answer: 1,
    brief: "LDA는 공분산 공유 가정을 쓰기 때문에 전체 데이터를 풀링(합쳐서) 하나의 $\\Sigma$만 추정.",
    detailed: "LDA 가정: ⑴ 각 클래스가 다변량 가우시안을 따른다, ⑵ 모든 클래스의 공분산 행렬이 동일하다. 이 가정 덕분에 판별 함수에서 이차항이 상쇄되어 결정 경계가 선형이 된다. 공분산을 같다고 가정했으니 클래스별로 따로 $\\Sigma_k$ 를 구하는 대신, 모든 클래스 데이터를 합쳐 하나의 $\\hat{\\Sigma}$ 를 추정한다. ①처럼 서로 다른 공분산을 허용하면 QDA(Quadratic Discriminant Analysis)가 되어 결정 경계가 비선형이 된다.",
    source: "Week 4 § Part4-4"
  },
  {
    id: "S2Q13",
    set: 2,
    week: 4,
    topic: "Naive Bayes 점수 비율 계산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이진 Naive Bayes 분류기에서 $P(y=1) = P(y=0) = 0.5$, 조건부 확률이 $P(x_1=1 \\mid y=1) = 0.8$, $P(x_1=1 \\mid y=0) = 0.4$, $P(x_2=1 \\mid y=1) = 0.5$, $P(x_2=1 \\mid y=0) = 0.2$ 이다. 새 샘플 $x_1=1, x_2=1$에 대해 Naive Bayes 가정으로 계산한 두 클래스의 점수 비율 ($y=1$ 점수 ÷ $y=0$ 점수)은?",
    choices: [
      "① 0.2",
      "② 1.0",
      "③ 3.0",
      "④ 5.0"
    ],
    answer: 3,
    brief: "분자 = 0.5·0.8·0.5 = 0.20. 분모 = 0.5·0.4·0.2 = 0.04. 비율 = 0.20/0.04 = 5.0",
    detailed: "Naive Bayes 가정 하에 클래스별 점수는 $P(y) \\prod_j P(x_j|y)$ 로 계산된다. ① 분자(y=1): $0.5 \\times 0.8 \\times 0.5 = 0.20$. ② 분모(y=0): $0.5 \\times 0.4 \\times 0.2 = 0.04$. ③ 비율: $0.20 / 0.04 = 5.0$. 비율이 1보다 훨씬 크므로 이 샘플은 $y=1$로 분류된다. 실제 argmax를 위한 판단에는 비율만 필요하고 분모 $p(x)$는 두 클래스에서 동일해 약분되므로 고려할 필요가 없다.",
    source: "Week 4 § Part3-4"
  },

  // ── Week 5 (Q14~Q18) — 5 객관식 (주관식은 W4 Q13에 배치됨) ──
  // LOOP-TASK [3.10] ✅
  {
    id: "S2Q14",
    set: 2,
    week: 5,
    topic: "Impurity 최댓값 공통 조건",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이진 분류에서 세 가지 Impurity 지표(Entropy, Gini Impurity, Classification Error)가 모두 최댓값을 가지는 공통 조건은?",
    choices: [
      "① 한 클래스가 100% 차지해 완벽하게 순수(Pure)한 상태일 때 셋 다 각 지표의 정의상 최댓값을 찍는다",
      "② 두 클래스 비율이 99:1에 가까워 한쪽이 지배적일 때 Entropy와 Gini가 로그·제곱 비선형성으로 가장 큰 값을 보인다",
      "③ 두 클래스 비율이 50:50으로 균등하게 섞일 때",
      "④ 세 지표는 수학적 정의가 서로 달라 최댓값을 찍는 클래스 비율 조건도 각기 다르게 나타나므로 공통 조건은 존재하지 않는다"
    ],
    answer: 2,
    brief: "세 지표 모두 두 클래스가 반반일 때 최대. (Entropy 1, Gini 0.5, CE 0.5)",
    detailed: "각 지표의 이진 분류 최댓값: Entropy $= -\\sum p_i \\log_2 p_i$ 는 $p=0.5$에서 $1$. Gini $= 1 - \\sum p_i^2$ 는 $p=0.5$에서 $0.5$. Classification Error $= 1 - \\max p_i$ 는 $p=0.5$에서 $0.5$. 셋 다 분포가 가장 불확실(섞임 최대)한 50:50일 때 최댓값을 찍고, 한 클래스가 100%인 완벽한 분리 상태(Pure)에서 모두 0이 된다. 값의 스케일은 다르지만 분할 후 감소량(Information Gain)을 비교하는 경향성은 비슷.",
    source: "Week 5 § 5-4"
  },
  {
    id: "S2Q15",
    set: 2,
    week: 5,
    topic: "Gini Impurity 계산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이진 분류 노드에 클래스 비율이 80:20으로 섞여 있을 때 Gini Impurity $= 1 - \\sum p_i^2$ 의 값은?",
    choices: [
      "① 0.16",
      "② 0.20",
      "③ 0.32",
      "④ 0.80"
    ],
    answer: 2,
    brief: "$1 - (0.8^2 + 0.2^2) = 1 - (0.64 + 0.04) = 0.32$",
    detailed: "Gini Impurity $= 1 - (0.8^2 + 0.2^2) = 1 - 0.64 - 0.04 = 0.32$. 두 클래스가 50:50일 때가 최댓값 0.5이고, 지금 80:20은 그보다 한쪽 쏠림이 큰 상태라 최댓값(0.5)보다 작은 0.32가 나온다. 반반일 때 최대, 순수할수록 0에 가까워지는 성질을 확인할 수 있다. Decision Tree가 분할 후 불순도의 가중 평균을 최소화하는 방향으로 피처를 선택할 때 이 값이 계산 기반이 된다.",
    source: "Week 5 § 5-4"
  },
  {
    id: "S2Q16",
    set: 2,
    week: 5,
    topic: "앙상블 에러율 이항분포",
    type: "multiple_choice",
    difficulty: "hard",
    question: "개별 에러율 $\\epsilon = 0.25$인 독립 분류기 11개를 다수결로 앙상블했을 때 앙상블 에러율이 개별보다 훨씬 작아지는(약 3.4%) 근본 원리는?",
    choices: [
      "① 11개 중 과반수(6개 이상)가 동시에 틀려야 앙상블이 틀리는데, 이항분포(Binomial)로 계산하면 그 확률이 개별 에러율보다 훨씬 작기 때문",
      "② 다수결 앙상블은 실제로 투표 후 가장 성능이 좋은 단일 분류기 한 개의 결과만 선택적으로 채택해 그 정확도를 그대로 승계받기 때문에 에러가 작아진다",
      "③ 개별 분류기들의 에러가 서로 양의 상관관계(Positive Correlation)를 가져 같은 방향으로 기울어져 자동으로 상쇄되면서 전체 에러가 감소하기 때문이다",
      "④ 앙상블은 개별 예측값을 평균 내는 방식이므로 산술평균의 정의에 따라 모든 개별 에러율이 자동으로 정확히 절반으로 줄어들기 때문이다"
    ],
    answer: 0,
    brief: "$\\sum_{k=6}^{11} \\binom{11}{k} 0.25^k \\cdot 0.75^{11-k} \\approx 0.034$ — 이항분포 꼬리 확률.",
    detailed: "분류기들이 독립이라 가정하면, 다수결 앙상블이 틀리는 사건 = '절반 이상이 동시에 틀림'이 이항분포를 따른다. $P(\\text{ensemble error}) = \\sum_{k=6}^{11} \\binom{11}{k}(0.25)^k (0.75)^{11-k} \\approx 0.034$. 개별 25% 에러가 앙상블 3.4%로 극적으로 감소. 단 이 효과는 개별 에러가 Random(0.5) 미만이고 분류기들이 서로 독립적일 때만 성립한다. 교수님 강조 포인트.",
    source: "Week 5 § 7-1"
  },
  {
    id: "S2Q17",
    set: 2,
    week: 5,
    topic: "KNN 베이즈 유도 결과",
    type: "multiple_choice",
    difficulty: "hard",
    question: "KNN의 베이즈 유도 과정에서 부피 $V$와 전체 데이터 수 $N$이 분자·분모에서 서로 약분되고, 최종 클래스 결정은 어떤 단순한 비율로 귀결되는가?",
    choices: [
      "① $K_c / N_c$ — 클래스 $c$의 이웃 개수를 해당 클래스의 전체 데이터 수로 나눈 값이며, Likelihood $P(x \\mid C_c)$의 근사로 해석된다",
      "② $K_c / K$ (K개 이웃 중 클래스 $c$에 속하는 이웃의 수의 비율)",
      "③ $N_c / N$ — 전체 데이터 중 클래스 $c$가 차지하는 비율로서 Prior $P(C_c)$ 자체이며, 이웃 개수 $K$와 무관한 값",
      "④ $V / K$ — 탐색 영역의 부피를 이웃 개수로 나눈 비율로서 데이터 밀도(Density)를 추정하는 단위 체적당 샘플 수"
    ],
    answer: 1,
    brief: "부피와 전체 개수가 모두 약분되어 '이웃 K개 중 클래스 $c$가 몇 개인가'라는 단순 비율만 남는다.",
    detailed: "Prior $P(C_c) \\approx N_c/N$, Likelihood $P(x|C_c) \\approx K_c/(N_c V)$, Evidence $P(x) \\approx K/(NV)$ 를 베이즈 정리에 대입하면 $P(C_c|x) = \\dfrac{(K_c/N_c V)(N_c/N)}{K/(NV)} = K_c/K$. 즉 어려운 수학적 유도를 거치지만 결국 KNN은 '근처 K개 이웃 중 클래스 $c$가 차지하는 비율'이라는 직관과 정확히 일치하는 결과를 낸다. 교수님 Q&A 코멘트: 부피가 분자·분모에 모두 들어 있어 클래스 결정에 영향을 주지 않는다.",
    source: "Week 5 § 4-2"
  },
  {
    id: "S2Q18",
    set: 2,
    week: 5,
    topic: "AdaBoost 가중치 업데이트 방향",
    type: "multiple_choice",
    difficulty: "medium",
    question: "AdaBoost에서 이전 분류기의 결과에 따라 데이터 샘플의 가중치가 업데이트되는 방향으로 가장 적절한 것은?",
    choices: [
      "① 이전 분류기의 정답 여부와 무관하게 틀린 샘플·맞춘 샘플의 가중치가 모두 초기값 $w = 1/N$으로 유지되어 다음 분류기도 동일 조건에서 학습한다",
      "② 틀린 샘플은 이미 학습 데이터로 의미가 소진되었으므로 가중치를 감소시키고, 반대로 맞춘 샘플은 다시 맞힐 가치가 있어 가중치를 증가시킨다",
      "③ 틀린 샘플의 가중치는 증가하고 맞춘 샘플의 가중치는 감소하여, 다음 분류기가 어려운 샘플에 집중하도록 만든다",
      "④ 매 Boosting 라운드마다 이전 분류기의 결과를 버리고 모든 샘플의 가중치를 균등한 값 $1/N$로 리셋하여 완전히 새로운 독립 분류기를 학습시킨다"
    ],
    answer: 2,
    brief: "Boosting의 핵심: 이전이 틀린 샘플에 더 큰 가중치 → 다음이 그 어려운 샘플을 보강 학습.",
    detailed: "업데이트 수식 $w_{j+1}^{(i)} \\leftarrow w_j^{(i)} \\exp(-\\alpha_j y^{(i)} \\hat{y}_j^{(i)})$. 예측이 맞으면 $y \\hat{y} > 0$ 이라 지수부가 음수가 되어 가중치가 감소하고, 틀리면 가중치가 증가한다. 이후 가중치 합이 1이 되도록 정규화하고, 이 가중치가 반영된 데이터로 다음 분류기가 학습된다. Bagging은 병렬·독립이지만 Boosting은 순차적·의존적이라는 것이 핵심 차이점.",
    source: "Week 5 § 9-1"
  },

  // ── Week 6 (Q19~Q23) — Q23 주관식 ──
  // LOOP-TASK [3.11] ✅
  {
    id: "S2Q19",
    set: 2,
    week: 6,
    topic: "Functional Margin 한계",
    type: "multiple_choice",
    difficulty: "medium",
    question: "SVM에서 Functional Margin $\\hat{\\gamma} = y(w^T x + b)$가 가지는 치명적인 한계는?",
    choices: [
      "① $y$와 $w^Tx+b$가 같은 부호를 가질 때조차 값이 항상 음수로 계산되어 분류 정오 판정과 해석 자체가 불가능해지는 부호 모순 문제",
      "② 가중치 $w$의 크기(Magnitude)에 민감해, 같은 기하학적 선을 정의하더라도 $w$에 상수를 곱하면 마진 값이 달라진다",
      "③ 수식에 비선형 변환이나 고차항이 포함되어 있어 계산 복잡도가 지나치게 높고, 대규모 데이터에서는 실시간 연산이 사실상 불가능하다는 한계",
      "④ 분류 경계를 설명하는 $y$·$w$·$b$와 무관한 무작위 값이 산출되어 분류 결과와의 연결고리가 끊어져 있어 최적화 목적 함수로 사용할 수 없다"
    ],
    answer: 1,
    brief: "스케일에 민감 — 같은 선인데 w 상수배만 해도 Functional Margin이 달라진다.",
    detailed: "교수님 예시: 선 $2x_1 + 3x_2 + 1 = 0$ 과 $4x_1 + 6x_2 + 2 = 0$ 은 동일한 선이지만 점 $(2,1)$에서 Functional Margin은 각각 8과 16. 즉 단순히 $w$에 2배를 곱하면 마진이 2배로 커져 버린다. 이 때문에 단순히 Functional Margin을 최대화하는 최적화는 발산한다. 이를 해결하기 위해 $\\|w\\|$로 나눈 Geometric Margin(정규화된 실제 거리)을 쓴다.",
    source: "Week 6 § 6-1"
  },
  {
    id: "S2Q20",
    set: 2,
    week: 6,
    topic: "SVM 표준 최적화식",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Hard-margin SVM의 표준 최적화 문제로 올바른 것은?",
    choices: [
      "① $\\max_{w,b} \\dfrac{1}{2}\\|w\\|^2 \\quad \\text{s.t.} \\quad y^{(i)}(w^T x^{(i)} + b) \\ge 1$",
      "② $\\min_{w,b} \\dfrac{1}{2}\\|w\\|^2 \\quad \\text{s.t.} \\quad y^{(i)}(w^T x^{(i)} + b) \\ge 1$",
      "③ $\\min_{w,b} \\|w\\| \\quad \\text{s.t.} \\quad y^{(i)}(w^T x^{(i)} + b) \\le 1$",
      "④ $\\max_{w,b} \\|w\\| \\quad \\text{s.t.} \\quad w^T x^{(i)} \\ge 0$"
    ],
    answer: 1,
    brief: "$\\|w\\|^2$을 최소화(= $1/\\|w\\|$ 최대화 = 마진 최대화), 조건은 모든 샘플의 functional margin ≥ 1.",
    detailed: "SVM은 가장 작은 기하학적 마진 $1/\\|w\\|$ 을 최대화하는 문제인데, 이를 역수·제곱으로 변환해 Convex 형태로 만들면 $\\min \\frac{1}{2}\\|w\\|^2$. 제약 조건은 'Functional Margin을 1로 고정'했을 때 모든 샘플이 이 조건을 만족해야 한다는 것. $\\frac{1}{2}$은 미분 편의 상수, 제곱은 Convex 유지 목적. Soft-margin에서는 여기에 $C\\sum \\xi_i$가 추가된다.",
    source: "Week 6 § 7"
  },
  {
    id: "S2Q21",
    set: 2,
    week: 6,
    topic: "Bagging vs Boosting 본질 차이",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Bagging(예: Random Forest)과 Boosting(예: AdaBoost)의 가장 본질적인 차이는?",
    choices: [
      "① Bagging은 이전 분류기의 오답을 보강하며 순차적(Sequential)으로 학습하고, Boosting은 Bootstrap 서브셋을 나눠 독립적·병렬적으로 학습한다",
      "② Bagging은 분류기들을 독립적·병렬적으로 학습하고, Boosting은 이전 분류기의 오답에 가중치를 부여하며 순차적(Sequential)으로 학습한다",
      "③ Bagging은 Decision Tree 계열에만 사용 가능한 기법이고 Boosting은 Linear Regression 같은 연속형 회귀 모델 전용으로 설계된 앙상블 방법이다",
      "④ 두 방식은 구현 코드와 이론적 기반이 완전히 동일한 동일 알고리즘이며 단지 개발자가 붙인 이름만 달라 관용적으로 구분되어 불린다"
    ],
    answer: 1,
    brief: "Bagging=병렬·독립(에러 평균화), Boosting=순차·의존(이전 오답 보강).",
    detailed: "Bagging은 Bootstrap으로 만든 다양한 서브셋으로 분류기들을 동시에(병렬) 학습 후 다수결로 결합해 Variance를 줄인다. Boosting은 순차적으로 모델을 쌓으며 이전 분류기가 틀린 샘플에 높은 가중치를 줘 다음 분류기가 어려운 샘플을 집중 학습하게 한다. Bagging은 주로 Overfitting 완화, Boosting은 Bias까지 줄여 성능 극대화. ①은 순서가 뒤바뀐 함정.",
    source: "Week 6 § 4-1"
  },
  {
    id: "S2Q22",
    set: 2,
    week: 6,
    topic: "Kernel Trick 적용 위치",
    type: "multiple_choice",
    difficulty: "hard",
    question: "SVM의 Kernel Trick이 실제로 적용되는 수학적 위치로 가장 적절한 것은?",
    choices: [
      "① Primal Problem(원문제)에서 데이터를 고차원 공간으로 $\\phi(x)$ 함수로 명시적으로 매핑한 후, 변환된 좌표에서 직접 내적과 가중치를 계산하는 단계",
      "② Dual Problem(쌍대문제)에서 최적화 식에 오직 데이터 간 내적 $x_i \\cdot x_j$ 만 등장한다는 점을 이용해, 고차원 매핑 없이 커널 함수 $K(x_i, x_j)$로 내적을 계산",
      "③ Cost Function을 Gradient Descent로 미분하는 단계에서 각 파라미터의 편미분 값에 커널 함수를 곱해 업데이트 방향을 고차원으로 확장하는 과정",
      "④ Decision Tree의 Information Gain 계산에서 분할 기준이 되는 피처를 고차원으로 매핑해 불순도 감소량을 재계산하는 전처리 단계에 적용된다"
    ],
    answer: 1,
    brief: "SVM을 Dual로 변환하면 내적만 남음 → 내적을 커널 함수로 대체해 고차원 매핑을 우회.",
    detailed: "Primal SVM은 $w$를 직접 다루지만 고차원 매핑 $\\phi(x)$가 복잡해지면 연산이 불가능해진다. 쌍대 변환 후에는 라그랑주 승수와 데이터 간 내적 $x_i \\cdot x_j$ 만 나타나는데, 이 내적을 $K(x_i, x_j) = \\phi(x_i) \\cdot \\phi(x_j)$ 로 대체하면 $\\phi$를 명시적으로 계산하지 않아도 고차원 공간에서의 분리 효과를 얻는다. 이것이 '트릭'인 이유 — 매핑은 암묵적, 계산은 원래 차원에서.",
    source: "Week 6 § 9-3"
  },
  {
    id: "S2Q23",
    set: 2,
    week: 6,
    topic: "Functional Margin 계산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "SVM에서 가중치 $w = (3, 4)$, 편향 $b = 2$ 이고, 데이터 포인트 $x = (1, 1)$의 실제 라벨이 $y = +1$이다. 이 샘플의 **Functional Margin** $\\hat{\\gamma}$ 값을 계산하시오.",
    choices: [
      "① 5",
      "② 7",
      "③ 9",
      "④ 15"
    ],
    answer: 2,
    brief: "$\\hat{\\gamma} = 1 \\cdot (3 \\cdot 1 + 4 \\cdot 1 + 2) = 1 \\cdot 9 = 9$",
    detailed: "Functional Margin 공식 $\\hat{\\gamma} = y(w^T x + b)$. ① 내적 $w^T x = 3 \\cdot 1 + 4 \\cdot 1 = 7$. ② 편향 더하기 $7 + 2 = 9$. ③ 라벨 곱 $1 \\cdot 9 = 9$. 값이 양수이므로 분류가 올바르게 이루어진 상태(같은 부호). 참고로 이 샘플의 Geometric Margin은 $9 / \\|w\\| = 9 / \\sqrt{25} = 9/5 = 1.8$이다. Functional Margin은 스케일에 민감하지만 Geometric Margin은 $\\|w\\|$로 나눠 정규화된다.",
    source: "Week 6 § 6-1"
  },

  // ── Week 7 (Q24~Q30) — Q28·Q30 주관식 2개 ──
  // LOOP-TASK [3.12] ✅
  {
    id: "S2Q24",
    set: 2,
    week: 7,
    topic: "Recall 수식",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Recall(= Sensitivity = True Positive Rate)의 올바른 수식은?",
    choices: [
      "① $TP / (TP + TN)$",
      "② $TP / (TP + FP)$",
      "③ $TP / (TP + FN)$",
      "④ $TN / (TN + FP)$"
    ],
    answer: 2,
    brief: "Recall = 실제 Positive 중 모델이 맞힌 비율 = $TP/(TP+FN)$.",
    detailed: "분모의 'TP + FN'은 '실제 Positive인 전체'를 의미한다. 그 중 모델이 올바르게 Positive로 잡아낸 비율이 Recall. ② $TP/(TP+FP)$는 Precision(모델이 Positive라고 한 것 중 실제로 Positive인 비율). ④ $TN/(TN+FP)$는 Specificity. Recall·Precision 수식을 뒤바꿔 쓰는 것은 시험에서 가장 빈번한 실수 포인트.",
    source: "Week 7 § 5"
  },
  {
    id: "S2Q25",
    set: 2,
    week: 7,
    topic: "Specificity 계산",
    type: "multiple_choice",
    difficulty: "easy",
    question: "실제 Negative 샘플 100명 중 모델이 90명을 올바르게 Negative로 예측하고 10명을 Positive로 오분류했다. Specificity는?",
    choices: [
      "① 0.10",
      "② 0.90",
      "③ 1.00",
      "④ 주어진 정보만으로는 계산 불가능"
    ],
    answer: 1,
    brief: "Specificity $= TN/(TN+FP) = 90/100 = 0.90$.",
    detailed: "$\\text{Specificity} = TN/(TN+FP)$. 여기서 TN=90, FP=10이므로 $90/(90+10) = 0.9$. Specificity는 '실제 음성 중 얼마나 정확히 음성으로 걸러냈나'를 의미하며, FPR(False Positive Rate) = $1 - \\text{Specificity} = 0.1$로 환산할 수도 있다. 의료 진단에서는 거짓 경보(FP)를 줄이고 싶을 때 Specificity를 중요하게 본다.",
    source: "Week 7 § 5"
  },
  {
    id: "S2Q26",
    set: 2,
    week: 7,
    topic: "SMOTE 기법",
    type: "multiple_choice",
    difficulty: "medium",
    question: "SMOTE(Synthetic Minority Over-sampling Technique)의 의미로 가장 적절한 것은?",
    choices: [
      "① 다수 클래스 데이터 중 일부를 무작위로 삭제해 클래스 간 개수를 맞춤으로써 불균형을 해소하는 Undersampling 계열의 데이터 조작 기법이다",
      "② 소수 클래스의 기존 데이터 포인트를 단순 복제(Duplicate)해 그대로 여러 번 쌓아 개수만 다수 클래스에 맞추는 전통적 Oversampling 기법이다",
      "③ 소수 클래스 데이터들 사이를 보간(Interpolation)하여 새로운 가상의 합성 데이터를 생성하는 Oversampling 기법",
      "④ 학습 과정에서 Loss Function에 class_weight를 부여해 소수 클래스 오분류 비용을 키우는 알고리즘 차원의 불균형 해결책이다"
    ],
    answer: 2,
    brief: "SMOTE = 소수 클래스 포인트들 '사이'를 보간해 가상 샘플을 만드는 Oversampling.",
    detailed: "단순 Oversampling은 소수 클래스 데이터를 그대로 복사해 중복을 만들고 Overfitting 위험이 있다. SMOTE는 소수 클래스의 두 데이터 포인트 사이에 가상의 합성 데이터(Synthetic data)를 보간으로 만들어 개수를 불린다. ①은 Undersampling, ④는 class_weight='balanced' 같은 알고리즘 차원 해결. 데이터 차원 해결책 중 SMOTE가 가장 대표적.",
    source: "Week 7 § 13-2"
  },
  {
    id: "S2Q27",
    set: 2,
    week: 7,
    topic: "R² 해석",
    type: "multiple_choice",
    difficulty: "medium",
    question: "회귀 모델의 $R^2$(결정계수, Coefficient of Determination) 값 해석으로 가장 적절한 것은?",
    choices: [
      "① $R^2 = 1$은 완벽한 예측, $R^2 = 0$은 평균값으로 찍는 수준, 음수면 평균보다도 못한 최악의 모델",
      "② $R^2$는 $1 - SSE/SST$ 정의상 수학적으로 0과 1 사이에 제한되어, 어떤 회귀 모델이든 절대 음수가 나올 수 없다는 구조적 제약을 가진다",
      "③ $R^2 = 0.9$는 $R^2 = 0.5$보다 값의 비율만큼 정확히 1.8배 더 정확한 모델임을 의미하며, 이렇게 선형 비율로 모델 우월성을 해석할 수 있다",
      "④ $R^2$는 분류(Classification) 문제에서 클래스 간 분산을 측정하기 위해 전용으로 사용되는 지표이며, 회귀(Regression)에는 MSE가 사용된다"
    ],
    answer: 0,
    brief: "1=완벽, 0=평균 수준, 음수=최악. 음수도 가능하다는 점이 포인트.",
    detailed: "$R^2 = 1 - SSE/SST$. 1은 모든 변동을 설명(완벽), 0은 모델이 데이터 평균 수준의 예측력(SST=SSE), 음수는 평균으로 찍는 것보다도 못한 모델. ② '항상 0~1'은 흔한 오해 — 기본 선형 회귀의 훈련 세트에서는 음수가 안 나오지만 테스트 세트나 비선형 모델에서는 음수가 흔히 등장. ③처럼 비율로 해석은 불가능.",
    source: "Week 7 § 15"
  },
  {
    id: "S2Q28",
    set: 2,
    week: 7,
    topic: "MCC 계산",
    type: "short_answer",
    difficulty: "hard",
    question: "다음 Confusion Matrix에서 MCC(Matthews Correlation Coefficient) 값을 계산하시오. (소수점 둘째 자리까지)\n\nTP = 50, TN = 50, FP = 5, FN = 5",
    answer: "0.82",
    answer_type: "number",
    tolerance: 0.01,
    brief: "$(50 \\cdot 50 - 5 \\cdot 5) / \\sqrt{55^4} = 2475/3025 \\approx 0.82$",
    detailed: "공식 $\\text{MCC} = \\dfrac{TP \\cdot TN - FP \\cdot FN}{\\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}$. ① 분자: $50 \\cdot 50 - 5 \\cdot 5 = 2500 - 25 = 2475$. ② 분모: $(50+5)(50+5)(50+5)(50+5) = 55^4$, 제곱근 취하면 $55^2 = 3025$. ③ MCC $= 2475 / 3025 \\approx 0.8182$ → 소수 둘째 자리로 반올림 **0.82**. +1 가까우면 우수, 0이면 Random, -1이면 반대 예측.",
    source: "Week 7 § 8"
  },
  {
    id: "S2Q29",
    set: 2,
    week: 7,
    topic: "Pearson vs Spearman",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Pearson 상관계수와 Spearman 순위 상관계수의 가장 큰 차이는?",
    choices: [
      "① Pearson은 로그·지수 같은 비선형(Non-linear) 관계만 포착하고, Spearman은 반대로 직선 형태의 선형(Linear) 관계만 민감하게 포착하는 쌍대적 관계다",
      "② Pearson은 선형(Linear) 관계를 포착하고, Spearman은 값을 순위(Rank)로 변환해 단조(Monotonic) 관계까지 포착한다",
      "③ 두 계수는 범위가 $-1 \\sim 1$로 동일하고 수식 변환이 대등해 어떤 데이터셋에서도 항상 동일한 수치를 내는 동치 지표라고 할 수 있다",
      "④ Pearson은 변수 간 인과관계(Causation)를 직접 측정하는 지표이고, Spearman은 단순히 상관관계(Correlation)의 강도만 나타내는 보조 지표다"
    ],
    answer: 1,
    brief: "Pearson=선형 포착, Spearman=순위 기반이라 단조 증가면 비선형이어도 포착.",
    detailed: "Pearson은 실제 수치 간의 선형 관계만 잡아내므로 데이터가 $y = x^3$ 같은 비선형이면 값이 작게 나온다. Spearman은 값을 순위(1, 2, 3, …)로 변환해 계산하므로 단조 증가·감소 패턴만 있으면 1 또는 -1을 낸다. 공통점: 둘 다 $-1 \\sim 1$ 범위, 상관관계만 보고 인과관계(Causation)는 보장하지 않음.",
    source: "Week 7 § 14"
  },
  {
    id: "S2Q30",
    set: 2,
    week: 7,
    topic: "AUC 해석 (Random Guess)",
    type: "multiple_choice",
    difficulty: "medium",
    question: "ROC Curve가 대각선($y = x$)을 정확히 따라가는 Random Guess(랜덤 찍기) 수준의 분류기의 AUC(Area Under Curve) 값은?",
    choices: [
      "① 0.0",
      "② 0.5",
      "③ 1.0",
      "④ 2.0"
    ],
    answer: 1,
    brief: "대각선 아래 삼각형 면적 = 1 × 1 × 0.5 = 0.5. AUC=0.5는 Random Guess.",
    detailed: "ROC 공간은 1×1 정사각형이고, 대각선 $y=x$는 (0,0)과 (1,1)을 잇는다. 그 아래 면적은 직각삼각형 하나로 $\\frac{1}{2} \\cdot 1 \\cdot 1 = 0.5$. 이 상태는 모델이 Positive·Negative를 전혀 구별하지 못하고 무작위로 찍는 것과 동일. AUC = 1은 완벽, AUC = 0.5는 Random, AUC < 0.5는 Random보다 못함(결과를 뒤집으면 오히려 좋은 모델이 됨 — 교수님 C' 예시).",
    source: "Week 7 § 10~11"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 3 — 개념 중심
// 배분: W2:6 · W3:5 · W4:5 · W5:4 · W6:5 · W7:5 = 30
// 주관식 위치: Q11(W3 GLM 서술), Q18(W5 Impurity 계산), Q27(W7 F1 계산)
// ═══════════════════════════════════════════════════════════════
export const set3 = [
  // ── Week 2 (Q1~Q6) ──
  // LOOP-TASK [3.13] ✅
  {
    id: "S3Q1",
    set: 3,
    week: 2,
    topic: "ML 시스템 3요소",
    type: "multiple_choice",
    difficulty: "easy",
    question: "머신러닝 시스템을 다룰 때 반드시 고려해야 하는 3가지 핵심 요소로 올바르게 묶인 것은?",
    choices: [
      "① 데이터(Data), 알고리즘(Algorithm), 모델(Model)",
      "② 데이터(Data), Training set, Validation set — 학습 자료와 그 분할 방식이 ML의 본질이므로 이 세 가지로 분류",
      "③ Loss Function, Optimizer, Learning Rate — 학습 과정을 구성하는 세 가지 수치·함수 요소로서 ML 시스템의 본체",
      "④ CPU, GPU, Memory — 머신러닝 연산이 수행되는 하드웨어 자원의 세 축이므로 이것이 시스템의 3요소"
    ],
    answer: 0,
    brief: "사람 뇌의 경험·학습 방법·인지 단계에 대응되는 3요소: 데이터·알고리즘·모델.",
    detailed: "교수님이 사람 인지 과정과 비교해 설명한 3요소. **데이터**는 '경험'(학습 대상), **알고리즘**은 '학습 방법'(데이터를 처리하는 절차·함수), **모델**은 학습된 결과로서의 '인지 단계'(입력을 출력으로 매핑하는 아키텍처). 이 구분이 머신러닝의 기본 어휘다. ③은 ML의 구체 구현 요소들이지만 3요소 정의와는 다른 층위.",
    source: "Week 2 § 2"
  },
  {
    id: "S3Q2",
    set: 3,
    week: 2,
    topic: "회귀 vs 분류 구분 기준",
    type: "multiple_choice",
    difficulty: "easy",
    question: "머신러닝 지도학습 문제를 회귀(Regression)와 분류(Classification)로 나누는 가장 명확한 기준은?",
    choices: [
      "① 입력 변수 $X$의 차원 수 — 저차원(예: $d \\le 10$)이면 회귀, 고차원이면 분류로 다루는 것이 관례",
      "② 사용하는 학습 알고리즘의 종류 — 선형 계열은 회귀, Tree·SVM 계열은 분류로 자연스럽게 묶인다",
      "③ 출력값 $Y$의 성질 — 연속적(Continuous)이면 회귀, 이산적(Categorical)이면 분류",
      "④ 훈련 데이터의 개수 — 적으면 회귀로 두고 많아지면 분류로 전환해 설계하는 것이 일반 규칙"
    ],
    answer: 2,
    brief: "판단 기준은 오직 Y의 성질. 연속=회귀, 이산=분류.",
    detailed: "교수님 Q&A 포인트: 치역(결과값 Y)이 연속적이면 회귀, 이산적이면 분류. 예: 내일 기온을 '몇 도'로 예측하면 회귀, '덥다/춥다'로 예측하면 분류. 회귀 문제를 억지로 분류로 풀면 모델 학습이 왜곡된다. 입력 $X$의 차원이나 알고리즘 종류는 선택의 문제일 뿐 회귀·분류 구분 기준이 아니다.",
    source: "Week 2 § 3-1"
  },
  {
    id: "S3Q3",
    set: 3,
    week: 2,
    topic: "이진 vs 다중 분류",
    type: "multiple_choice",
    difficulty: "easy",
    question: "이진 분류(Binary Classification)와 다중 분류(Multi-class Classification)의 차이는?",
    choices: [
      "① 이진은 클래스가 2개(예: 스팸/정상), 다중은 클래스가 3개 이상(예: 개·고양이·자동차)",
      "② 이진 분류는 라벨이 주어진 지도학습 문제에서만 정의되고, 다중 분류는 클래스 경계가 모호해 비지도학습(Clustering)으로만 접근 가능하다",
      "③ 이진 분류는 0~1 사이의 연속 확률값을 그대로 출력으로 쓰고, 다중 분류만이 진짜 이산 라벨을 출력하는 분류 문제라고 볼 수 있다",
      "④ 이진 분류는 구분이 쉬워 소규모 훈련 데이터에서만 유효하고, 다중 분류는 클래스별 패턴 학습을 위해 반드시 대규모 데이터를 필요로 한다"
    ],
    answer: 0,
    brief: "클래스 개수의 차이. 둘 다 지도학습이며 둘 다 이산 출력.",
    detailed: "예시: 이진 분류 — 스팸/정상, 질병 유무. 다중 분류 — 이미지 속 객체(개/고양이/자동차), 알파벳 26개 인식. 둘 다 지도학습·이산 출력이라는 점에서 같지만 사용하는 함수가 다름(이진은 Sigmoid, 다중은 Softmax). 훈련 데이터 양은 클래스 수·난이도에 따라 달라지므로 일반 규칙으로 말할 수 없다.",
    source: "Week 2 § 3-1"
  },
  {
    id: "S3Q4",
    set: 3,
    week: 2,
    topic: "Validation Set 역할",
    type: "multiple_choice",
    difficulty: "medium",
    question: "전체 데이터를 Training/Validation/Test 세 세트로 나눌 때, Validation Set의 역할로 가장 적절한 것은?",
    choices: [
      "① 모델 학습에 직접 파라미터 $\\theta$를 갱신(Gradient Descent)하는 데 사용되는 가장 큰 규모의 데이터 세트",
      "② 최종 성능 평가를 위해 모델 개발 과정에서 절대 건드리지 않고 완전히 격리해 두는 세트로, 배포 직전까지 한 번도 보면 안 된다",
      "③ 모델 선택이나 하이퍼파라미터 튜닝 중 일반화 성능을 대략적으로 추정(Estimate)하는 가이드 역할",
      "④ 학습과 평가에는 전혀 관여하지 않고 오직 실제 배포 후 사용자 A/B 테스트를 수행할 때만 활용하는 예비용 세트"
    ],
    answer: 2,
    brief: "Validation은 개발 중 하이퍼파라미터·모델 선택 가이드. Test는 절대 건드리지 말 것.",
    detailed: "세 세트의 역할: **Training** — 모델이 실제로 패턴을 학습. **Validation** — 훈련 중간에 여러 모델·하이퍼파라미터를 비교·선택하고 Early Stopping 타이밍을 결정(일반화 성능 추정치). **Test** — 개발이 모두 끝난 뒤 실제 배포 직전의 최종 평가 용도로 완전히 격리. Validation을 Test 대신 쓰면 간접적으로 Test에 모델이 최적화되어 평가가 낙관적으로 편향된다. ②는 Test Set 설명.",
    source: "Week 2 § 4-2"
  },
  {
    id: "S3Q5",
    set: 3,
    week: 2,
    topic: "High Bias = Underfitting",
    type: "multiple_choice",
    difficulty: "medium",
    question: "'High Bias' 상태에 해당하는 현상으로 가장 적절한 설명은?",
    choices: [
      "① Overfitting — 모델 Capacity가 너무 커서 훈련 데이터의 노이즈·아웃라이어까지 전부 암기해 Test Error가 폭증한 상태",
      "② Underfitting — 모델의 Capacity가 너무 낮아 훈련 데이터의 기본 패턴조차 학습하지 못한 상태",
      "③ Train·Test Error가 모두 0에 수렴한 완벽한 Global Minimum 상태로 추가 개선의 여지가 전혀 없는 이상적 수렴",
      "④ 데이터 분포가 깔끔한 가우시안 형태로 노이즈가 전혀 없어 어떤 모델을 써도 오차 없이 예측되는 이상적 상태"
    ],
    answer: 1,
    brief: "High Bias = Underfitting. High Variance = Overfitting으로 매칭.",
    detailed: "Bias는 '잘못된·너무 단순한 가정'에서 오는 체계적 오차. Capacity가 낮은 모델은 훈련 데이터 자체도 제대로 맞히지 못해 Training Error가 높게 남는다 → Underfit. 반대로 Variance는 '훈련 데이터의 노이즈에 대한 과민 반응'이며 Capacity가 클 때 발생해 Overfit 상태가 된다. Bias-Variance Tradeoff는 두 에러를 동시에 최소화하기 어렵다는 머신러닝의 근본 딜레마.",
    source: "Week 2 § 6-3"
  },
  {
    id: "S3Q6",
    set: 3,
    week: 2,
    topic: "OOD 정의",
    type: "multiple_choice",
    difficulty: "medium",
    question: "OOD(Out-of-Distribution) 데이터에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 훈련 데이터와 완전히 동일한 분포(In-distribution)에서 샘플된 데이터로, 모델이 예상된 범위 안에서 안정적으로 동작하는 입력",
      "② 훈련 데이터에는 전혀 없었던 새로운 패턴·특징·조건이 포함된 데이터로, 모델이 예상을 벗어난 이상 행동을 보이는 주된 원인",
      "③ 분류 문제에서만 정의되는 고정된 데이터 타입의 공식 명칭으로, 회귀·군집화·강화학습 등 다른 과제에는 적용되지 않는 용어",
      "④ 오직 회귀 문제에서만 발생하는 특수 현상으로, Y가 연속값일 때만 관찰되며 이산 라벨을 쓰는 분류에서는 나타나지 않는 개념"
    ],
    answer: 1,
    brief: "OOD = 훈련 분포를 벗어난 데이터. 모델의 비직관적 오작동(불안정성)의 근본 원인.",
    detailed: "교수님 예시: 도로 교통 표지판만 학습한 자율주행 모델에 갑자기 '새(Bird)' 이미지가 들어오면 모델은 그것을 횡단보도로 100% 확신하는 등 엉뚱한 출력을 낸다. 사람은 '뜬금없다'고 처리하고 넘어가지만 모델은 학습 범위 밖 데이터에 무방비. OOD 대응 능력을 Robustness라 부르며, Shortcut Learning과 함께 딥러닝의 주요 약점으로 꼽힌다. In-distribution(분포 내)의 반대 개념.",
    source: "Week 2 § 7-1"
  },

  // ── Week 3 (Q7~Q11) — Q11 주관식 ──
  // LOOP-TASK [3.14] ✅
  {
    id: "S3Q7",
    set: 3,
    week: 3,
    topic: "수식 표기법 첨자",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Linear Regression 수식 $f(x) = \\sum_{j=0}^d \\theta_j x_j = \\theta^T x$ 에서 $x_j$ 의 **아래첨자** $j$가 의미하는 것은?",
    choices: [
      "① 데이터 샘플의 번호(인덱스) — 예: 훈련 세트에서 $j$번째 이미지를 가리키는 표기로 위첨자 $(i)$와 역할이 같음",
      "② 피처(Feature)의 차원(Dimension) — 예: 10x10 이미지에서 $j$번째 픽셀",
      "③ 경사하강법의 학습 iteration 번호 — 몇 번째 epoch에서 측정된 입력 벡터인지를 나타내는 시간축 인덱스로 해석",
      "④ 훈련 세트의 크기 $N$ — 전체 데이터 개수를 명시하는 상수 인덱스로, 루프의 상한을 나타내는 의미"
    ],
    answer: 1,
    brief: "아래첨자 $j$ = Feature 차원. 위첨자 $(i)$ = 데이터 샘플 인덱스 — 뒤바꿔 쓰지 말 것.",
    detailed: "교수님이 Q&A에서 명확히 짚어준 표기 규칙: **아래첨자** $x_j$ = 피처의 차원(예: 이미지 픽셀 인덱스). **위첨자** $x^{(i)}$ = 데이터 샘플 번호. 즉 $x_j^{(i)}$ 는 '$i$번째 샘플의 $j$번째 피처 값'을 의미한다. 이 표기법을 뒤섞어 이해하면 이후 모든 수식 전개에서 혼란이 발생하므로 시험 직전까지 꼭 잡고 가야 하는 부분.",
    source: "Week 3 § 3-2"
  },
  {
    id: "S3Q8",
    set: 3,
    week: 3,
    topic: "Normal Equation 한계",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Normal Equation $\\theta = (X^T X)^{-1} X^T y$ 가 대부분의 복잡한 머신러닝·딥러닝 문제에서 사용되지 못하는 가장 큰 이유는?",
    choices: [
      "① 역행렬 $(X^T X)^{-1}$ 계산이 모든 경우에서 수학적으로 불가능해 어떤 머신러닝 모델도 Normal Equation을 쓸 수 없기 때문",
      "② 대부분의 모델은 비용 함수가 Convex한 2차 함수가 아니어서 '미분값 = 0' 지점을 단번에 푸는 Analytic Solution이 존재하지 않기 때문",
      "③ 경사하강법(Gradient Descent)이 오직 선형 회귀에서만 사용 가능한 특수 기법이라 다른 모델에서는 Normal Equation만 쓸 수 있기 때문",
      "④ $Y$가 정규분포를 따른다는 가정은 오직 선형 회귀에서만 성립하고 다른 모델에서는 이 가정이 깨지므로 수식 유도 자체가 막히기 때문"
    ],
    answer: 1,
    brief: "딥러닝 등 대부분 문제는 비용 함수가 Convex 2차 함수가 아니라 Analytic Solution이 없음.",
    detailed: "선형 회귀의 MSE는 Convex 2차 함수라 단 한 번의 수식으로 Global Minimum을 구할 수 있다. 그러나 신경망·SVM·로지스틱 회귀 같은 일반적 ML 모델의 비용 함수는 다봉(multimodal)이거나 비선형이라 미분값 = 0 지점을 닫힌 형태로 풀 수 없다. 이래서 범용적으로 경사하강법(Gradient Descent)을 쓴다. 교수님 Q&A 요약: '대부분의 복잡한 문제는 예쁘지 않아 Analytic Solution이 존재하지 않는다.'",
    source: "Week 3 § 17 Q&A"
  },
  {
    id: "S3Q9",
    set: 3,
    week: 3,
    topic: "회귀/분류 모델링 목표 차이",
    type: "multiple_choice",
    difficulty: "medium",
    question: "회귀(Regression)와 분류(Classification)에서 모델링의 '근본적인 목표'에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 회귀는 특정 수치(예측값)를 정확히 맞히는 것이 목표이고, 분류는 데이터가 각 클래스에 속할 '확률(Probability)'을 모델링하는 것이 진짜 목표",
      "② 회귀는 Y의 확률 분포 자체를 학습하는 확률적 모델링이 근본 목표이고, 분류는 단순히 정답 수치를 가능한 한 정확히 맞히는 것이 목표다",
      "③ 회귀와 분류는 둘 다 입력을 정해진 수치로 변환해 예측하는 동일한 과제이며, 모델링 철학이나 목적 함수에 본질적 차이가 전혀 없다",
      "④ 회귀는 0~1 사이의 확률값을 출력하고, 분류는 제한 없는 연속 수치를 출력해 Threshold로 라벨을 만든 뒤 최종 결과로 내보낸다"
    ],
    answer: 0,
    brief: "회귀 = 수치 맞히기. 분류 = 클래스 확률 모델링(Threshold 기준 판단).",
    detailed: "얼핏 둘 다 '예측'이지만 본질이 다르다. 회귀는 연속 변수의 실제 값을 가능한 가깝게 맞추는 것이 목표. 분류는 단순히 클래스 라벨만 내놓는 것을 넘어 '이 데이터가 특정 클래스에 속할 확률'을 모델링하는 것이 근본 목표고, 이 확률에 Threshold(보통 0.5)를 적용해 클래스를 결정한다. 이 확률적 관점 덕분에 MLE 프레임워크로 선형 회귀·로지스틱 회귀·소프트맥스가 GLM으로 통합 설명된다.",
    source: "Week 3 § 8-2"
  },
  {
    id: "S3Q10",
    set: 3,
    week: 3,
    topic: "Logistic Regression 이름 함정",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Logistic Regression이 이름에 'Regression'을 포함하면서도 실제로는 Classification 문제에 사용되는 이유로 가장 적절한 것은?",
    choices: [
      "① 선형 회귀의 출력 $\\theta^T x$에 Sigmoid 함수를 씌워 결과를 0~1의 확률로 해석한 후, Threshold(보통 0.5)로 클래스를 판별하기 때문",
      "② 로지스틱 회귀라는 명칭은 초기 통계학계의 역사적 실수로 굳어진 것일 뿐이며, 실제 용도는 집값·기온 같은 연속값 예측에 쓰이는 회귀 모델이기 때문",
      "③ 회귀와 분류는 수학적으로 완전히 동일한 문제로 치환할 수 있으므로 두 용어의 구분은 실무·이론 모두에서 무의미하며 이름만 다를 뿐 같은 기법이기 때문",
      "④ 로지스틱 회귀는 동일한 수식으로 회귀와 분류를 구분 없이 모두 수행 가능한 범용 모델이라 이름에 두 개념이 모두 반영되어 있기 때문"
    ],
    answer: 0,
    brief: "선형 $\\theta^T x$ + Sigmoid → 확률 해석 + Threshold → 분류. '회귀'이름은 선형 회귀 뼈대에서 유래.",
    detailed: "Logistic Regression은 GLM 관점에서 Linear Regression과 같은 선형 뼈대($\\theta^T x$)를 공유하되, 출력에 Sigmoid를 씌워 0~1로 바운드된 확률을 만들고 Threshold 0.5 기준으로 클래스를 결정한다. 즉 '회귀' 부분은 선형 회귀 수식을 물려받은 구조를 가리키고, 최종 용도는 분류. 교수님이 '매우 헷갈리기 쉬우니 주의'라고 명시한 함정 포인트.",
    source: "Week 3 § 9"
  },
  {
    id: "S3Q11",
    set: 3,
    week: 3,
    topic: "GLM 통합 뷰 서술",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Linear Regression, Logistic Regression, Multi-class Classification은 공통으로 $\\theta^T x$ 라는 선형 뼈대를 공유하는 Generalized Linear Model(GLM)이다. 각 모델이 가정하는 Y의 확률 분포를 올바르게 짝지은 것은?",
    choices: [
      "① Linear Regression은 정규분포(Gaussian), Logistic Regression은 베르누이 분포(Bernoulli), Multi-class Classification은 다항 분포(Multinomial)를 가정한다",
      "② Linear Regression은 베르누이 분포, Logistic Regression은 정규분포, Multi-class Classification은 다항 분포를 가정하는 구조로 정리된다",
      "③ 세 모델 모두 정규분포를 공통 전제로 하며 Link Function만 달라질 뿐 가정하는 분포 자체는 완전히 동일하다고 본다",
      "④ Linear Regression은 균등 분포, Logistic Regression은 지수 분포, Multi-class Classification은 포아송 분포를 각각 가정한다"
    ],
    answer: 0,
    brief: "Linear=정규(Gaussian), Logistic=베르누이(Bernoulli), Multi-class=다항(Multinomial).",
    detailed: "GLM 통합 뷰의 핵심 표: ① **Linear Regression** — Y가 정규분포(Normal/Gaussian)을 따른다고 가정, Link = Identity(그대로 출력). ② **Logistic Regression** — Y가 베르누이 분포(Bernoulli, 0 또는 1)를 따른다고 가정, Link = Sigmoid. ③ **Multi-class Classification** — Y가 다항 분포(Multinomial, C개 클래스 중 하나)를 따른다고 가정, Link = Softmax. 세 모델의 뼈대 $\\theta^T x$ 는 완전히 동일하고, 차이점은 '어떤 분포를 가정하고 어떤 Link Function을 씌우느냐'뿐이다. 교수님이 Week 3 마지막 강조한 가장 중요한 통합 뷰.",
    source: "Week 3 § 16"
  },

  // ── Week 4 (Q12~Q16) ──
  // LOOP-TASK [3.15] ✅
  {
    id: "S3Q12",
    set: 3,
    week: 4,
    topic: "L1 vs L2 기하학",
    type: "multiple_choice",
    difficulty: "medium",
    question: "L1 정규화와 L2 정규화의 2차원 파라미터 공간에서의 제약 영역 형태로 올바르게 짝지어진 것은?",
    choices: [
      "① L1: 원(Circle, $\\sum \\theta_i^2 \\le c$), L2: 다이아몬드($\\sum |\\theta_i| \\le c$) — 제곱 합이 L1, 절댓값 합이 L2로 대응",
      "② L1: 다이아몬드, L2: 원(Circle)",
      "③ 두 정규화 모두 원(Circle) 형태이며, 차이는 단지 반지름 $c$의 크기(상수)에만 있고 기하학적 형태는 완전히 동일하다",
      "④ 두 정규화 모두 다이아몬드(마름모) 형태이고, 차이는 대각선 길이 비율에만 있을 뿐 Sparsity 효과도 동일하게 나타난다"
    ],
    answer: 1,
    brief: "L1 = 절댓값 합 → 다이아몬드(마름모). L2 = 제곱 합 → 원.",
    detailed: "L1: $\\sum |\\theta_i| \\le c$ 는 2D에서 마름모(다이아몬드) 형태. 모서리에서 최적해가 맺히기 쉬워 일부 파라미터가 정확히 0이 되는 Sparsity 효과. L2: $\\sum \\theta_i^2 \\le c$ 는 원 형태. 모서리가 없어 파라미터가 0이 되는 대신 전체적으로 Shrinking(축소)된다. 이 기하학적 차이가 두 정규화의 핵심 행동 차이를 만든다.",
    source: "Week 4 § Part1-4"
  },
  {
    id: "S3Q13",
    set: 3,
    week: 4,
    topic: "Bayes Rule 구성 요소 명칭",
    type: "multiple_choice",
    difficulty: "medium",
    question: "베이즈 정리 $P(y \\mid x) = \\dfrac{P(x \\mid y) P(y)}{P(x)}$ 에서 각 항의 명칭이 올바르게 짝지어진 것은?",
    choices: [
      "① $P(y \\mid x)$ = Prior(사전 확률), $P(x \\mid y)$ = Posterior(사후 확률), $P(y)$ = Evidence(증거) — 데이터 관측 전후가 뒤바뀐 매칭",
      "② $P(y \\mid x)$ = Posterior(사후 확률), $P(x \\mid y)$ = Likelihood(우도), $P(y)$ = Prior(사전 확률), $P(x)$ = Evidence(증거)",
      "③ $P(x \\mid y)$ = Prior(사전 확률), $P(y)$ = Likelihood(우도), $P(y \\mid x)$ = Evidence(증거) — 조건부·주변·사후를 임의로 재배열한 조합",
      "④ 베이즈 정리의 모든 항은 동등한 '확률'이므로 Prior·Likelihood·Posterior·Evidence 같은 별도 명칭 구분 자체가 존재하지 않는다"
    ],
    answer: 1,
    brief: "Posterior = P(y|x), Likelihood = P(x|y), Prior = P(y), Evidence = P(x).",
    detailed: "**Prior $P(y)$** — 데이터 관측 전 클래스의 발생 빈도. **Likelihood $P(x \\mid y)$** — 특정 클래스 조건 하에서 데이터가 관측될 확률(생성 모델의 핵심). **Evidence $P(x)$** — 데이터 자체의 주변 확률(정규화 상수 역할). **Posterior $P(y \\mid x)$** — 데이터를 본 뒤 업데이트된 클래스 확률. 교수님 비 오는 날 비유: Prior는 기존 믿음, Evidence(뉴스 예보)로 업데이트해 Posterior를 얻는다.",
    source: "Week 4 § Part2-3,4"
  },
  {
    id: "S3Q14",
    set: 3,
    week: 4,
    topic: "생성 모델 결합 확률 분해",
    type: "multiple_choice",
    difficulty: "easy",
    question: "생성 모델(Generative Model)에서 결합 확률 $P(X, Y)$를 두 컴포넌트의 곱으로 분해하는 올바른 형태는?",
    choices: [
      "① $P(X, Y) = P(X) + P(Y)$ — 결합 확률은 각 주변 확률의 합이며 덧셈 법칙으로 계산해야 하는 기본 항등식",
      "② $P(X, Y) = P(X \\mid Y) \\cdot P(Y)$ — Class-conditional distribution × Prior",
      "③ $P(X, Y) = P(Y \\mid X) / P(X)$ — 조건부 확률을 Evidence $P(X)$로 나눠 얻는 정규화된 형태가 결합 확률",
      "④ $P(X, Y) = P(X) \\cdot P(Y)$ — 결합 확률은 항상 주변 확률들의 단순 곱으로 분해되며 독립 여부와 무관하게 성립한다"
    ],
    answer: 1,
    brief: "$P(X, Y) = P(X \\mid Y) P(Y)$ — 조건부 × Prior 곱으로 분해.",
    detailed: "확률 이론의 기본 항등식 $P(X, Y) = P(X \\mid Y) P(Y) = P(Y \\mid X) P(X)$. 생성 모델은 전자의 형태, 즉 ① 'Y가 먼저 뽑힌다(Prior)' ② '뽑힌 Y 조건 하에서 X가 생성된다(Class-conditional)' 의 2단계 생성 과정을 모델링한다. ④는 X와 Y가 독립일 때만 성립하므로 일반적으로 틀림. 생성 모델의 핵심은 $P(X \\mid Y)$ 와 $P(Y)$ 둘 다 따로 추정하는 것.",
    source: "Week 4 § Part2-2"
  },
  {
    id: "S3Q15",
    set: 3,
    week: 4,
    topic: "Naive Bayes 피처 타입별 분포",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Naive Bayes 분류기에서 피처의 타입에 따라 사용하는 확률 분포가 올바르게 짝지어진 것은?",
    choices: [
      "① Binary → 다항(Multinomial), Categorical → 베르누이(Bernoulli), Continuous → 균등 분포(Uniform) — 이산/연속 구분이 뒤바뀐 조합",
      "② Binary → 베르누이(Bernoulli), Categorical → 다항(Multinomial), Continuous → 가우시안(Gaussian)",
      "③ Naive Bayes는 피처 타입과 무관하게 항상 가우시안(평균 $\\mu$, 분산 $\\sigma^2$) 하나만 사용하며, 이진/범주형 피처도 연속값으로 변환해 처리한다",
      "④ Binary → 가우시안(Gaussian), Categorical → 베르누이(Bernoulli), Continuous → 다항(Multinomial) — 세 타입과 분포가 모두 엇갈려 매칭된 조합"
    ],
    answer: 1,
    brief: "Binary=Bernoulli, Categorical=Multinomial, Continuous=Gaussian.",
    detailed: "Naive Bayes의 큰 전제(클래스가 주어지면 피처들이 독립)는 피처 타입과 무관하게 유지되지만, 각 피처의 Likelihood $P(x_j \\mid y)$ 를 모델링할 때는 타입에 맞는 분포를 쓴다. 단어 유무(Binary)는 베르누이, 여러 카테고리 중 하나면 다항(Multinomial), 키·몸무게 같은 연속값이면 가우시안(평균 $\\mu$·분산 $\\sigma^2$). 이 확장성이 Naive Bayes의 매력.",
    source: "Week 4 § Part3-5"
  },
  {
    id: "S3Q16",
    set: 3,
    week: 4,
    topic: "LDA vs QDA",
    type: "multiple_choice",
    difficulty: "hard",
    question: "LDA(Linear Discriminant Analysis)와 QDA(Quadratic Discriminant Analysis)의 차이로 가장 적절한 것은?",
    choices: [
      "① LDA는 클래스마다 서로 다른 공분산($\\Sigma_k$)을 허용해 이차(비선형) 결정 경계를 만들고, QDA는 공통 공분산 가정으로 선형 경계를 만든다",
      "② LDA는 공통 공분산($\\Sigma_1 = \\Sigma_2 = \\Sigma$) 가정으로 선형 결정 경계를 만들고, QDA는 클래스별 서로 다른 공분산을 허용해 이차(비선형) 결정 경계를 만든다",
      "③ LDA와 QDA는 판별 함수 유도 과정이 동일해 최종 결정 경계의 형태·파라미터 수·예측 결과가 완전히 같은 모델이며, 이름만 다를 뿐 본질은 하나다",
      "④ LDA는 연속값 예측을 위한 회귀 문제 전용으로, QDA는 이산 라벨 판별을 위한 분류 문제 전용으로 각각 설계되어 용도가 완전히 분리된다"
    ],
    answer: 1,
    brief: "LDA: 공분산 동일 가정 → 이차항 상쇄 → 선형. QDA: 공분산 다름 허용 → 이차 경계.",
    detailed: "LDA의 핵심 가정은 모든 클래스가 같은 공분산 행렬을 공유한다는 것이고, 이 덕분에 판별 함수에서 이차항 $x^T \\Sigma^{-1} x$ 가 양쪽에서 상쇄되어 결정 경계가 $w^T x + b = 0$ 꼴의 선형이 된다. QDA는 클래스마다 $\\Sigma_k$ 가 다르다고 허용하면서 이차항이 살아남아 곡선(이차) 경계를 만든다. QDA가 유연하지만 파라미터가 많아져 과적합 위험이 있고 해석력이 떨어진다.",
    source: "Week 4 § Part4-2"
  },

  // ── Week 5 (Q17~Q20) — Q18 주관식 (Entropy 계산) ──
  // LOOP-TASK [3.16] ✅
  {
    id: "S3Q17",
    set: 3,
    week: 5,
    topic: "Pruning 필요성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Decision Tree에서 Pruning(가지치기)가 필요한 근본적 이유로 가장 적절한 것은?",
    choices: [
      "① 트리가 깊어질수록 Training Error는 낮아지지만 Overfitting이 발생해 Test 성능이 떨어지므로, 깊이·가지 수를 제한해 일반화(Generalization) 성능을 확보하기 위해",
      "② Decision Tree의 재귀 분할 학습 속도가 지나치게 빨라 모델이 수렴하기 전에 과도하게 성장하는 것을 방지하기 위해 인위적으로 속도를 늦춰야 하기 때문",
      "③ 가지 수가 일정 임계값 이하이면 Information Gain(정보 이득) 계산의 분모가 0이 되어 수학적으로 정의되지 않으므로 Pruning으로 가지 수를 확보해야 하기 때문",
      "④ Decision Tree는 Pruning이라는 가지치기 단계를 반드시 거쳐야 분할 기준이 결정되므로 Pruning 없이는 애초에 학습 자체가 시작될 수 없기 때문"
    ],
    answer: 0,
    brief: "가지를 무한 성장시키면 Train 100% 정확이지만 Overfit 발생 → Pruning으로 일반화 확보.",
    detailed: "트리가 재귀적으로 계속 성장하면 Training Set은 100%에 가깝게 맞출 수 있지만, 이는 노이즈·아웃라이어까지 외워버리는 Overfitting 상태다. Pre-pruning(깊이 제한 같은 사전 차단)과 Post-pruning(다 키운 후 평가 지표로 가지 제거) 양쪽 모두 정규화(Regularization)의 일환이며, Validation Error 곡선의 최저점에서 멈추는 개념과 동일한 문제 해결.",
    source: "Week 5 § 5-2"
  },
  {
    id: "S3Q18",
    set: 3,
    week: 5,
    topic: "Entropy 수치 계산",
    type: "short_answer",
    difficulty: "hard",
    question: "이진 분류에서 두 클래스 비율이 $p_1 = 0.25$, $p_2 = 0.75$인 노드의 Entropy(log$_2$ 기반) 값은? (소수점 둘째 자리까지, 예: 0.81)",
    answer: "0.81",
    answer_type: "number",
    tolerance: 0.02,
    brief: "$-0.25 \\log_2 0.25 - 0.75 \\log_2 0.75 = 0.5 + 0.311 \\approx 0.81$",
    detailed: "공식 $H = -\\sum p_i \\log_2 p_i$. ① $\\log_2 0.25 = -2$ 이므로 $-0.25 \\times (-2) = 0.5$. ② $\\log_2 0.75 = \\log_2 3 - \\log_2 4 \\approx 1.585 - 2 = -0.415$ 이므로 $-0.75 \\times (-0.415) \\approx 0.311$. ③ 합: $0.5 + 0.311 = 0.811$ → 소수 둘째 자리 **0.81**. 이 값이 최댓값 1(반반 섞임)과 최솟값 0(완전 순수) 사이에 있음을 확인할 수 있다. 비율이 한쪽으로 더 쏠릴수록 0에 가까워진다.",
    source: "Week 5 § 5-4"
  },
  {
    id: "S3Q19",
    set: 3,
    week: 5,
    topic: "Non-parametric 예측 특성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Non-parametric 모델(예: KNN)이 예측 시점에 보이는 특성으로 가장 적절한 것은?",
    choices: [
      "① 학습 단계에서 이미 뽑아 놓은 고정된 파라미터 $W$만 이용해 예측하므로 트레이닝 데이터는 학습 이후에 전부 버려도 무방한 구조를 가진다",
      "② 예측을 위해 트레이닝 데이터 자체를 여전히 필요로 하며, 데이터가 많아질수록 예측 연산량도 함께 증가한다",
      "③ Non-parametric 모델(KNN 등)은 연속값 예측이 불가능해 Classification 문제에서만 사용 가능하며 회귀에는 적용할 수 없다는 구조적 제약이 있다",
      "④ 트레이닝 데이터가 많아질수록 예측 시 참조 가능한 패턴이 풍부해지면서 거리 계산이 최적화되어 예측 연산 속도가 오히려 빨라지는 특성을 보인다"
    ],
    answer: 1,
    brief: "Non-param(KNN 등)은 예측 시에도 트레이닝 데이터 자체가 필요 → 데이터 규모에 예측 비용 비례.",
    detailed: "Parametric 모델은 학습 시 파라미터 $W$를 고정된 개수로 뽑아두고 예측 시 $W$만 사용하므로 트레이닝 데이터는 버려도 된다. 반면 Non-parametric 모델(KNN, Decision Tree 변형 등)은 함수 형태가 고정되지 않고 데이터 자체가 모델 역할을 한다. KNN은 예측할 때마다 트레이닝 모든 점과의 거리를 재야 하므로 데이터가 $N$배 많아지면 예측 비용도 $N$배로 증가한다. 이래서 KNN은 베이스라인 확인용으로 자주 쓰지만 대규모 프로덕션에는 부적합.",
    source: "Week 5 § 3"
  },
  {
    id: "S3Q20",
    set: 3,
    week: 5,
    topic: "Random Forest 2층 무작위성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Random Forest가 기본 Bagging에 추가로 도입한 '두 번째 무작위성(Second Layer of Randomness)'은?",
    choices: [
      "① 각 트리에 서로 다른 학습률(Learning Rate)을 무작위로 부여해 경사하강법의 수렴 경로를 다양화함으로써 앙상블의 다양성을 확보하는 방식",
      "② 노드를 분할할 때 전체 피처 중 무작위 서브셋만 선택해 그중에서 최적 피처로 분할 (Feature Randomness)",
      "③ 각 트리의 최대 깊이(max_depth)를 정규분포에서 무작위로 샘플링해 일부 트리는 얕고 일부는 깊게 학습되도록 강제하는 깊이 다양화 전략",
      "④ 예측 단계에서 전체 트리의 결과를 집계하기 전 랜덤하게 일부 트리의 예측을 제외(Drop)해 각 쿼리마다 다른 트리 조합으로 투표하는 기법"
    ],
    answer: 1,
    brief: "Random Forest = Bagging(데이터 무작위) + Feature Randomness(피처 무작위).",
    detailed: "Bagging은 Bootstrap으로 데이터에 무작위성을 주고(첫 번째 층), Random Forest는 거기에 더해 노드 분할 시 전체 피처 중 랜덤 서브셋(예: 100차원 중 10개)을 골라 그중에서 최적 피처를 선택하는 Feature Randomness를 추가(두 번째 층)한다. 이 덕분에 트리들이 더 다양해져 상관관계가 낮아지고 앙상블 효과가 극대화되어 개별 Decision Tree의 불안정성(Instability) 단점을 대폭 완화한다.",
    source: "Week 5 § 8-2"
  },

  // ── Week 6 (Q21~Q25) ──
  // LOOP-TASK [3.17] ✅
  {
    id: "S3Q21",
    set: 3,
    week: 6,
    topic: "SVM 마진 최대화 철학",
    type: "multiple_choice",
    difficulty: "easy",
    question: "SVM의 핵심 철학인 '마진(Margin) 최대화'가 의미하는 것으로 가장 적절한 것은?",
    choices: [
      "① 두 클래스를 나누는 수많은 선들 중 경계에서 가장 가까운 데이터까지의 여백(Margin)이 가장 큰 선을 선택해 일반화 성능을 높이는 것",
      "② 훈련 데이터 전체를 Training Error 0%로 완벽히 맞히는 결정 경계를 찾는 것이 최우선 목표이며, 일반화 성능보다 정확히 분류하는 것이 SVM의 본질",
      "③ 입력 공간을 가능한 한 복잡하게 휘게 만드는 고차원·비선형 결정 경계를 선택해, 두 클래스의 차이를 극대화하는 구불구불한 분리선을 얻는 것",
      "④ 두 클래스 데이터의 중심점(Centroid)을 각각 구하고 그 평균 좌표를 잇는 선을 결정 경계로 삼아 분리하는 기하학적 단순화 기법"
    ],
    answer: 0,
    brief: "가장 가까운 점(Support Vector)과의 거리를 최대화 → 새로운 데이터에 로버스트 → 일반화 향상.",
    detailed: "같은 두 클래스를 나누는 선은 수없이 많이 그을 수 있지만 SVM은 그중 경계에서 가장 가까운 점까지의 거리(Margin)가 가장 큰 선을 선택한다. 가장 가까운 점들(Support Vector)과의 여백을 벌려두기 때문에 새로운 데이터가 들어와도 경계를 쉽게 넘지 않아 일반화 성능(Generalization)이 우수해진다. 이것이 SVM이 딥러닝 등장 이전 Classification의 강자였던 이유.",
    source: "Week 6 § 5-1"
  },
  {
    id: "S3Q22",
    set: 3,
    week: 6,
    topic: "Decision Tree Instability",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Decision Tree의 치명적 단점인 '불안정성(Instability)'에 대한 가장 정확한 설명은?",
    choices: [
      "① Decision Tree는 계층적 분할 구조 덕분에 Overfitting이 전혀 발생하지 않는 안정적 모델이며, 데이터 변화에도 흔들리지 않는 예측 일관성을 보장한다",
      "② 입력 데이터의 아주 작은 변화(예: 단어 수 50→51)에도 분류 결과가 완전히 뒤바뀔 수 있다",
      "③ Tree 구조의 계층적 분기 특성 덕분에 훈련·테스트 어느 데이터에서도 100% 정확도를 수학적으로 보장하는 결정론적 모델이기 때문이다",
      "④ 재귀적 분할 알고리즘의 계산 복잡도가 지나치게 높아 학습·예측 속도가 매우 느리기 때문에 실무 파이프라인에는 거의 쓰이지 않는다"
    ],
    answer: 1,
    brief: "조그만 입력 변화에도 분할 임계값을 넘겨 예측이 뒤집힘 — 이래서 앙상블(RF)이 필요하다.",
    detailed: "교수님 스팸 필터 예시: 단어 수 51 미만 또는 199 초과 = 스팸, 51~199 = 정상이라는 분할이 있을 때 단어 수가 50에서 51로 단 1 증가해도 스팸에서 정상으로 결과가 완전히 뒤바뀐다. 이 민감성이 Instability다. 이 단점을 완화하기 위해 여러 트리를 결합하는 앙상블(Bagging, Random Forest)이 등장했다.",
    source: "Week 6 § 1-2"
  },
  {
    id: "S3Q23",
    set: 3,
    week: 6,
    topic: "Slack Variable 역할",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Soft-margin SVM에서 도입되는 Slack Variable $\\xi$(여유 변수)의 역할로 가장 적절한 것은?",
    choices: [
      "① 모든 샘플이 마진 바깥에 놓이도록 강제하는 Hard-margin의 엄격한 제약 $y^{(i)}(w^T x^{(i)} + b) \\ge 1$ 을 그대로 유지하는 장치",
      "② 일부 샘플이 마진 안쪽에 들어오거나 오분류되는 것을 일정 비용과 함께 허용해 모델에 유연성을 부여",
      "③ 경사하강법의 학습률(Learning Rate) $\\eta$를 에폭별 Gradient 크기에 따라 자동으로 스케줄링하는 하이퍼파라미터 조정 인자",
      "④ Linear·Polynomial·RBF 중 어떤 커널 함수를 사용할지를 결정하는 이산 상수이며, 학습 전에 고정되는 커널 선택용 지시 변수"
    ],
    answer: 1,
    brief: "Slack = '조금 틀려도 OK'라는 여유. $\\xi = 0$ 이면 Hard-margin과 동일.",
    detailed: "Hard-margin SVM은 $y^{(i)}(w^T x^{(i)} + b) \\ge 1$ 을 모든 샘플에서 완벽히 만족해야 하므로 아웃라이어 하나에도 경계가 극단적으로 휘어진다. Slack Variable $\\xi_i \\ge 0$ 을 도입해 $y^{(i)}(w^T x^{(i)} + b) \\ge 1 - \\xi_i$ 로 약화하고, 목적식에 $C \\sum \\xi_i$ 페널티를 추가해 'Slack을 쓸수록 비용이 든다'는 구조를 만든다. C는 이 비용의 강도를 조절.",
    source: "Week 6 § 8-2"
  },
  {
    id: "S3Q24",
    set: 3,
    week: 6,
    topic: "RBF Kernel 직관",
    type: "multiple_choice",
    difficulty: "medium",
    question: "SVM에서 선형으로 분리되지 않는 2D 데이터(예: 주황색이 중앙에 뭉쳐있고 파란색이 둘러싼 원형 분포)를 RBF(Gaussian) 커널로 해결하는 직관적 아이디어는?",
    choices: [
      "① 데이터 포인트 중 일부를 무작위로 삭제(Random Dropout)해 두 클래스가 자연스럽게 선형 분리 가능한 상태로 남도록 전처리하는 데이터 조작 기법",
      "② 2D 데이터를 고차원 공간(예: 3D)으로 들어 올려(Bell curve 형태로 솟아오름) 평평한 면 하나로 두 클래스를 분리할 수 있게 만드는 것",
      "③ 선형 회귀를 데이터에 여러 번 반복 적용해 잔차(Residual)를 누적 학습하는 방식으로 비선형 결정 경계를 점진적으로 형성하는 Boosting 유사 기법",
      "④ Decision Tree로 먼저 데이터를 계층적 영역으로 분할해 각 영역 내부가 선형 분리 가능해진 뒤, 그 결과를 SVM 입력으로 사용하는 하이브리드 파이프라인"
    ],
    answer: 1,
    brief: "2D에서 섞여 있던 데이터를 3D로 올리면 Gaussian 봉우리 형태로 솟아 평면 하나로 분리 가능.",
    detailed: "교수님의 직관적 설명: 주황색 점(중앙)과 파란색 점(바깥)이 섞여 있는 2D 평면에 Gaussian 커널을 적용하면 각 점이 종 모양(Bell curve)으로 솟아오르는 3D 표면이 생긴다. 파란색은 위로 끌어올려지고 주황색은 아래에 남아, 3D 공간에서는 평평한 평면 하나로 두 그룹을 깔끔히 나눌 수 있게 된다. 이 변환을 명시적으로 하지 않고 내적만으로 계산하는 게 Kernel Trick.",
    source: "Week 6 § 9-2"
  },
  {
    id: "S3Q25",
    set: 3,
    week: 6,
    topic: "OvR 선호 이유",
    type: "multiple_choice",
    difficulty: "medium",
    question: "다중 클래스 분류에서 One-vs-Rest(OvR) 방식이 One-vs-One(OvO)보다 실무(Scikit-learn 포함)에서 선호되는 주된 이유는?",
    choices: [
      "① 분류기 개수가 $K$개로 상대적으로 적어 학습 속도가 빠르고, 예측 성능은 OvO와 유사하기 때문",
      "② OvR은 다중 클래스 분류를 수학적으로 완벽히 유도할 수 있는 유일한 정식 방법이고, OvO는 근사치만 제공하는 비공식 기법으로 분류되기 때문",
      "③ Scikit-learn은 OvO를 전혀 지원하지 않으므로 실무에서 OvR 외에는 다른 다중 클래스 기법을 구현할 방법 자체가 존재하지 않기 때문",
      "④ OvR은 각 이진 분류기의 내부 클래스 불균형까지 자동으로 조정해 Class Imbalance 문제를 완벽히 해결하기 때문에 데이터 전처리가 불필요하다"
    ],
    answer: 0,
    brief: "OvR = $K$개 분류기, OvO = $K(K-1)/2$개. 성능 유사하면서 OvR이 빨라 기본 선호.",
    detailed: "OvO는 모든 클래스 쌍마다 1:1 분류기를 두기 때문에 $K$가 커지면 분류기 수가 기하급수적으로 증가($K(K-1)/2$). OvR은 $K$개만 있으면 되어 학습·예측 속도가 빠르다. Scikit-learn 공식 문서에 따르면 두 방식의 예측 성능은 거의 비슷하므로 기본값으로 OvR을 선호한다. ④는 틀림 — OvR은 오히려 각 이진 분류기마다 '하나 vs 나머지'라 내부에 클래스 불균형이 발생할 수 있다.",
    source: "Week 6 § 10"
  },

  // ── Week 7 (Q26~Q30) — Q27 주관식 ──
  // LOOP-TASK [3.18] ✅
  {
    id: "S3Q26",
    set: 3,
    week: 7,
    topic: "Confusion Matrix Type 2 Error",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Confusion Matrix에서 실제로는 Positive(양성)인 데이터를 모델이 Negative(음성)로 잘못 예측한 경우의 명칭과 오류 유형으로 올바른 것은?",
    choices: [
      "① True Positive(TP), 제1종 오류(Type 1 Error) — 실제 Positive를 Positive로 올바르게 맞힌 경우이지만 오분류로 간주되는 항목",
      "② True Negative(TN), 제2종 오류(Type 2 Error) — 실제 Negative를 Negative로 맞힌 경우이며 누락형 오류로 분류되는 항목",
      "③ False Positive(FP), 제1종 오류(Type 1 Error) — 실제 Negative를 Positive로 오진한 과진단 유형의 오류 항목",
      "④ False Negative(FN), 제2종 오류(Type 2 Error)"
    ],
    answer: 3,
    brief: "실제 Positive → 예측 Negative = False Negative = Type 2 Error.",
    detailed: "Type 1 Error = FP(실제 음성 → 양성으로 오진, 과진단). Type 2 Error = FN(실제 양성 → 음성으로 놓침, 누락). 의료에서 FN은 실제 환자를 건강하다고 돌려보내는 치명적 실수라 '놓치면 안 되는' 상황에서는 Recall(Sensitivity)을 중요하게 본다. FP와 FN의 트레이드오프, 그리고 어떤 에러를 더 줄일지는 응용 도메인에 따라 다르다.",
    source: "Week 7 § 4"
  },
  {
    id: "S3Q27",
    set: 3,
    week: 7,
    topic: "F1-Score 계산",
    type: "multiple_choice",
    difficulty: "hard",
    question: "다음 Confusion Matrix에서 F1-Score를 소수점 둘째 자리까지 계산한 값은?\n\nTP = 60, FP = 40, FN = 20, TN = 80",
    choices: [
      "① 0.43",
      "② 0.60",
      "③ 0.67",
      "④ 0.80"
    ],
    answer: 2,
    brief: "P = 60/100 = 0.6, R = 60/80 = 0.75, F1 = 2·0.6·0.75/(0.6+0.75) ≈ 0.67",
    detailed: "F1은 Precision·Recall 조화평균. 순서대로: ① $P = TP/(TP+FP) = 60/(60+40) = 0.60$. ② $R = TP/(TP+FN) = 60/(60+20) = 0.75$. ③ $F1 = 2 \\cdot P \\cdot R / (P + R) = 2 \\cdot 0.60 \\cdot 0.75 / (0.60 + 0.75) = 0.90 / 1.35 \\approx 0.6667$ → 소수 둘째 자리 반올림 **0.67**. 교수님이 반드시 출제한다고 공언한 Confusion Matrix → Rate 계산 유형.",
    source: "Week 7 § 5"
  },
  {
    id: "S3Q28",
    set: 3,
    week: 7,
    topic: "ROC 대각선 아래 해석",
    type: "multiple_choice",
    difficulty: "hard",
    question: "ROC Curve에서 대각선($y = x$, Random Guess 라인)의 오른쪽 아래(우측 하단)에 위치하는 분류기에 대한 해석으로 가장 적절한 것은?",
    choices: [
      "① 완벽한 분류기 — ROC 공간의 (0, 1) 꼭짓점에 가장 근접하게 위치해 TPR=1·FPR=0의 이상적 조건을 만족하는 최적 상태로 해석된다",
      "② Random Guess와 완전히 동일한 성능을 내는 분류기 — AUC 값이 정확히 0.5에 수렴하며 대각선 자체 위의 점과 구별되지 않는 무작위 예측 수준",
      "③ Random Guess보다 성능이 낮은 최악의 분류기이지만, 예측 결과를 완전히 뒤집으면(C') 오히려 대각선 위쪽으로 옮겨가 좋은 분류기로 변환될 수 있다",
      "④ ROC Curve의 정의상 대각선 아래 영역은 도달 불가능한 금지 영역이며, 분류 자체가 수학적으로 정의되지 않는 경계 밖 상태를 가리킨다"
    ],
    answer: 2,
    brief: "대각선 아래 = Random보다 나쁨. 결과를 반전하면 좌상단으로 이동해 오히려 좋은 분류기가 됨.",
    detailed: "ROC 공간에서 좌상단 (0, 1)이 완벽, 대각선이 Random Guess(AUC=0.5), 우측 하단은 Random보다 못한 상태. 교수님 예시 C → C': 매우 나쁜 분류기(C)의 예측을 모두 뒤집으면(C'), 마치 거꾸로 된 점쟁이처럼 정답률이 오히려 높아져 대각선 위쪽(A보다도 왼쪽 상단)에 위치할 수 있다. 즉 정답의 역상이 최고의 정답이 되는 역설적 상황.",
    source: "Week 7 § 10"
  },
  {
    id: "S3Q29",
    set: 3,
    week: 7,
    topic: "알고리즘 차원 Imbalance 해결",
    type: "multiple_choice",
    difficulty: "medium",
    question: "학습 단계에서 Class Imbalance를 완화하는 '알고리즘 차원'의 해결책으로 가장 적절한 것은?",
    choices: [
      "① Oversampling으로 소수 클래스 샘플을 그대로 복제해 개수를 다수 클래스와 맞추는 데이터 차원의 해결책으로, 원본 데이터셋 크기를 인위적으로 늘리는 방식",
      "② Undersampling으로 다수 클래스 샘플의 일부를 무작위로 제거해 소수 클래스와 개수를 맞추는 데이터 차원의 기법으로, 학습 데이터 양 자체를 줄이는 전처리",
      "③ SMOTE(Synthetic Minority Oversampling Technique)로 소수 클래스 데이터를 보간(Interpolation)해 새로운 합성 샘플을 생성하는 데이터 차원의 증강 기법",
      "④ 소수 클래스 오분류에 더 큰 페널티를 부여하도록 Loss Function에 가중치를 주거나 SVM의 $C$ 값을 조절 (예: `class_weight='balanced'`)"
    ],
    answer: 3,
    brief: "데이터가 아닌 알고리즘 쪽을 건드리는 방법: Loss·C 값 가중치 조정.",
    detailed: "Class Imbalance 해결책은 크게 두 갈래. **데이터 차원**: Oversampling, Undersampling, SMOTE — 데이터를 직접 조작. **알고리즘 차원**: 소수 클래스 오분류에 더 큰 비용을 부여하여 학습 과정에서 모델이 그쪽에 집중하게 만듦. Scikit-learn의 `class_weight='balanced'` 옵션이 대표적이며, SVM에서는 슬랙 변수 페널티 $C$를 클래스별로 다르게 조정하는 형태로 구현된다.",
    source: "Week 7 § 13-1"
  },
  {
    id: "S3Q30",
    set: 3,
    week: 7,
    topic: "Correlation is not Causation",
    type: "multiple_choice",
    difficulty: "medium",
    question: "교수님이 '연구에서의 꿀팁'으로 강조한 'Correlation is not Causation'의 의미로 가장 적절한 것은?",
    choices: [
      "① 상관관계(Correlation)와 인과관계(Causation)는 수학적·통계적으로 완전히 같은 개념이며, 두 용어는 동일한 현상을 서로 다른 이름으로 부르는 동의어에 불과하다",
      "② 상관계수(Correlation)가 높다고 해서 한 변수가 다른 변수의 원인(Cause)이라고 단정할 수 없다",
      "③ 회귀 분석(Regression Analysis)은 입력과 출력의 함수 관계를 수식으로 제공하므로, 회귀 계수가 유의한 값이면 언제나 인과관계를 공식적으로 증명할 수 있다",
      "④ Pearson 상관계수의 값이 정확히 0으로 측정되면 두 변수는 선형·비선형 관계를 모두 포함해 반드시 완전히 독립(Independent)이라는 결론을 보장할 수 있다"
    ],
    answer: 1,
    brief: "상관은 두 변수의 동반 변화일 뿐, 한쪽이 다른 쪽의 원인임을 보장하지 않는다.",
    detailed: "교수님 예시: '커피를 하루 2~3잔 마시는 사람의 기대 수명이 더 길다'는 상관관계 통계를 보여주더라도, 커피 자체가 수명을 연장시킨다는 인과관계를 증명하진 못한다. 교란 변수(건강한 사람이 카페에 자주 가는 여유로운 라이프스타일을 가짐 등)가 개입될 수 있기 때문. 인과관계 증명은 Randomized Controlled Trial 같은 실험적 설계가 필요. 연구할 때 이 구분을 혼동하면 심각한 오류가 발생한다. ④도 틀림 — Pearson 0은 선형 관계 없음만 보장.",
    source: "Week 7 § 14"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 4 — 비교 유형 (모델 대비 문제 다수)
// 배분: W2:4 · W3:6 · W4:5 · W5:6 · W6:5 · W7:4 = 30
// 주관식 위치: Q10(W3 회귀/분류 구분 서술), Q15(W4 판별/생성 차이),
//              Q21(W5 Param/Non-param 구분), Q28(W7 Precision/Recall 비교)
// ═══════════════════════════════════════════════════════════════
export const set4 = [
  // ── Week 2 (Q1~Q4) ──
  // LOOP-TASK [3.19] ✅
  {
    id: "S4Q1",
    set: 4,
    week: 2,
    topic: "비지도학습 구분",
    type: "multiple_choice",
    difficulty: "easy",
    question: "다음 중 비지도학습(Unsupervised Learning)에 해당하는 작업만으로 올바르게 묶인 것은?",
    choices: [
      "① 군집화(Clustering), 차원 축소(Dimensionality Reduction)",
      "② 연속값을 예측하는 회귀(Regression), 두 클래스 중 하나를 고르는 이진 분류(Binary Classification)",
      "③ 다중 분류(Multi-class), 보상·처벌로 학습하는 강화학습(Reinforcement Learning)",
      "④ 군집화(Clustering), 정답 레이블로 연속값을 예측하는 회귀(Regression)"
    ],
    answer: 0,
    brief: "비지도학습 = 정답(Label) 없이 구조를 찾는 것. 대표: Clustering · Dimensionality Reduction.",
    detailed: "비지도학습은 정답(Y) 없이 데이터 자체의 패턴·구조를 발견하는 학습. ① 군집화(고객 세그먼테이션 등) + 차원 축소(PCA 등)가 대표 예시. ② 회귀·이진 분류는 모두 정답이 있는 지도학습. ③ 강화학습은 보상·처벌 피드백을 쓰는 별도 카테고리. ④ 회귀는 지도학습이라 비지도 묶음에 안 들어간다.",
    source: "Week 2 § 3"
  },
  {
    id: "S4Q2",
    set: 4,
    week: 2,
    topic: "회귀 vs 분류 본질 차이",
    type: "multiple_choice",
    difficulty: "easy",
    question: "지도학습 내에서 회귀(Regression)와 분류(Classification)의 가장 명확한 차이는?",
    choices: [
      "① 회귀는 정답(Y) 없이 데이터 구조만 찾고, 분류는 정답 레이블이 주어진 지도학습으로만 작동한다",
      "② 회귀는 연속값(Continuous)을 예측하고, 분류는 이산 카테고리(Categorical)를 예측한다",
      "③ 회귀는 Y의 분포 가정이 필요한 지도학습이고, 분류는 Y 없이 군집 구조만 찾는 비지도학습이다",
      "④ 회귀는 피처가 2개 이하인 저차원 문제에만, 분류는 3개 이상인 고차원 문제에만 적용 가능하다"
    ],
    answer: 1,
    brief: "둘 다 지도학습이고, 차이는 Y의 성질(연속/이산)에만 있다.",
    detailed: "회귀와 분류는 모두 (X, Y) 쌍이 있는 지도학습이지만 Y의 치역(Range)이 다르다. 회귀는 월세·기온처럼 연속 수치를 예측하고, 분류는 스팸/정상, 개/고양이/자동차처럼 이산 카테고리를 예측한다. 예측 목표값의 성질이 바뀔 뿐 접근 철학(X→Y 함수 학습)은 공유. 피처 개수 같은 것은 구분 기준과 무관.",
    source: "Week 2 § 3-1"
  },
  {
    id: "S4Q3",
    set: 4,
    week: 2,
    topic: "Clustering vs Dimensionality Reduction",
    type: "multiple_choice",
    difficulty: "medium",
    question: "비지도학습 내에서 군집화(Clustering)와 차원 축소(Dimensionality Reduction)의 주된 차이는?",
    choices: [
      "① 군집화는 데이터 포인트들을 유사도 기준으로 의미 있는 그룹으로 묶는 것이 목표이고, 차원 축소는 고차원 데이터에서 핵심 특징만 뽑아 저차원으로 압축·표현하는 것이 목표다",
      "② 군집화는 정답 레이블을 활용해 경계를 학습하는 지도학습이고, 차원 축소는 정답 없이 구조만 찾는 비지도학습이라 학습 패러다임이 다르다",
      "③ 군집화는 연속 수치를 맞추는 회귀 문제의 일종이고, 차원 축소는 카테고리를 판별하는 분류 문제의 일종이라 목적 함수 형태가 다르다",
      "④ 두 기법은 수학적으로 완전히 동일한 최적화 문제를 풀며 단지 역사적 관습에 따라 이름만 다르게 붙어 있을 뿐이다"
    ],
    answer: 0,
    brief: "군집화 = 데이터 포인트 그룹핑. 차원 축소 = 피처 차원 압축.",
    detailed: "군집화는 샘플 단위로 유사한 것들을 묶는다(고객 세그먼테이션, 친구 관계 그룹핑). 차원 축소는 피처 단위로 중요한 방향만 남기고 노이즈를 제거해 데이터를 저차원으로 압축한다(PCA, t-SNE 등 — 시각화나 연산 효율에 유리). 목표·처리 대상·결과 형식이 모두 다른 별개의 비지도 과제. 둘 다 지도학습이 아니며, 분류/회귀의 틀에도 속하지 않는다.",
    source: "Week 2 § 3-2"
  },
  {
    id: "S4Q4",
    set: 4,
    week: 2,
    topic: "In-distribution vs OOD",
    type: "multiple_choice",
    difficulty: "medium",
    question: "In-distribution 데이터와 Out-of-Distribution(OOD) 데이터의 차이로 가장 적절한 것은?",
    choices: [
      "① In-distribution은 훈련 데이터와 유사한 특성·패턴(분포)을 공유하는 데이터이고, OOD는 훈련 데이터에 없던 새로운 패턴·특징·조건이 포함된 데이터",
      "② 두 개념은 본질적으로 동의어이며 연구·실무 모두에서 구분 없이 혼용되는 완전히 같은 의미의 용어다",
      "③ OOD는 훈련 데이터를 수집하는 단계에서 이미 포함되어 항상 Training Set의 일부분으로 함께 학습되는 데이터를 가리킨다",
      "④ In-distribution은 오직 Test Set에만 나타나는 새로운 분포이고, OOD는 Training Set 안에만 존재하는 기존 분포를 가리킨다"
    ],
    answer: 0,
    brief: "In-dist = 훈련 분포와 같음 → 모델이 잘 작동. OOD = 훈련 분포 밖 → 이상 행동 유발.",
    detailed: "모델은 훈련 데이터와 같은 분포의 입력(In-distribution)에 대해서는 예상대로 작동하지만, 훈련에 전혀 없었던 패턴·조건이 들어오면(OOD) 엉뚱한 판단을 내린다. 교수님 예시: 도로 표지판만 학습한 자율주행 모델에 갑자기 '새' 이미지가 들어오면 횡단보도로 100% 확신하는 식. Robustness·안전성 이슈의 핵심 개념이며 Shortcut Learning과도 연결된다.",
    source: "Week 2 § 7-1"
  },

  // ── Week 3 (Q5~Q10) — Q10 주관식 ──
  // LOOP-TASK [3.20] ✅
  {
    id: "S4Q5",
    set: 4,
    week: 3,
    topic: "Linear vs Logistic 뼈대",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Linear Regression과 Logistic Regression의 '뼈대' 공통점과 차이점에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 두 모델 모두 $\\theta^T x$ 라는 동일한 선형 뼈대를 공유하지만, Logistic Regression은 그 결과에 Sigmoid 함수를 씌워 0과 1 사이의 확률로 바운드한다",
      "② 두 모델의 선형 뼈대는 서로 다른 수식으로 유도되며 파라미터화 방식도 달라 구조적으로 어떤 공통점도 찾아볼 수 없다",
      "③ Linear Regression은 결과를 0과 1 사이로 바운드하기 위해 Sigmoid Link를 씌우고, Logistic Regression은 아무것도 씌우지 않는 Identity Function을 그대로 사용한다",
      "④ Logistic Regression은 $\\theta^T x$ 형태의 선형 뼈대를 전혀 사용하지 않고 오직 비선형 함수만으로 확률을 계산하는 구조를 가진다"
    ],
    answer: 0,
    brief: "뼈대는 $\\theta^T x$로 동일. Logistic은 Sigmoid Link를 한 겹 추가한 것.",
    detailed: "GLM 관점: ① Linear Regression = $\\theta^T x$ + Identity Link(아무것도 안 씌움). ② Logistic Regression = $\\theta^T x$ + Sigmoid Link. ③ Softmax Regression = $\\theta^T x$ + Softmax Link. 세 모델의 차이는 오직 Y 분포 가정과 Link Function뿐이고, 선형 뼈대 $\\theta^T x$는 공유된다. 이 통합 뷰가 Week 3의 핵심.",
    source: "Week 3 § 16"
  },
  {
    id: "S4Q6",
    set: 4,
    week: 3,
    topic: "Sigmoid vs Softmax 적용 범위",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Sigmoid 함수와 Softmax 함수의 적용 범위 차이는?",
    choices: [
      "① Sigmoid는 이진 분류(2 클래스), Softmax는 다중 클래스 분류(3 이상)에 사용된다",
      "② Sigmoid는 회귀 모델의 출력층에 쓰이고, Softmax는 분류 모델의 출력층에 쓰인다",
      "③ Sigmoid와 Softmax는 수식이 완전히 동일해 실무에서 구분 없이 혼용된다",
      "④ Sigmoid는 다중 클래스(3 이상) 분류, Softmax는 이진 분류 전용 함수다"
    ],
    answer: 0,
    brief: "Sigmoid ↔ 이진 분류(Bernoulli). Softmax ↔ 다중 분류(Multinomial).",
    detailed: "Sigmoid $g(z) = 1/(1+e^{-z})$ 는 단일 값을 0~1 확률로 바운드하며 이진 분류에 자연스럽게 맞는다. Softmax $\\text{softmax}(t_c) = e^{t_c}/\\sum_k e^{t_k}$ 는 여러 클래스 로짓을 모두 0~1로 만들고 합을 1로 정규화해 다중 클래스 확률 분포를 만든다. 실제로 Softmax는 Sigmoid의 일반화 형태(클래스 2개일 때 Softmax는 Sigmoid와 수학적으로 동등).",
    source: "Week 3 § 9, 14"
  },
  {
    id: "S4Q7",
    set: 4,
    week: 3,
    topic: "MSE vs Cross-Entropy 공통점",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Linear Regression의 MSE(Mean Squared Error) Loss와 Logistic Regression의 Cross-Entropy Loss가 가지는 **공통점**으로 가장 적절한 것은?",
    choices: [
      "① 두 Loss 모두 MLE(Maximum Likelihood Estimation) 관점에서 Log-Likelihood를 최대화하는 것과 수학적으로 동일(동치)하다",
      "② 두 Loss 모두 비용 값이 항상 음수 영역에서 계산되기 때문에 값을 최대화(Maximize)하는 방향으로 최적화해야 한다",
      "③ MSE는 이산 카테고리를 맞추는 분류 문제에, Cross-Entropy는 연속 수치를 예측하는 회귀 문제에 각각 특화된 전용 Loss다",
      "④ 두 Loss 모두 Convex 2차 함수 형태라 $\\theta = (X^T X)^{-1} X^T y$ 수식으로 단번에 닫힌 해(Analytic Solution)가 항상 존재한다"
    ],
    answer: 0,
    brief: "두 Loss 모두 MLE의 Log-Likelihood 최대화를 최소화 문제로 뒤집은 형태.",
    detailed: "MLE 관점의 통합: Linear Regression에서 노이즈가 정규분포라고 가정 → Log-Likelihood 최대화가 MSE 최소화와 동치. Logistic Regression에서 Y가 베르누이를 따른다고 가정 → Log-Likelihood 최대화에 $-$를 붙이면 Cross-Entropy 최소화. 두 Loss 모두 확률적 근거에서 유도된 동일한 원리(MLE)다. 머신러닝에서는 관습적으로 최소화를 선호해 $-$를 붙인 Negative Log-Likelihood 형태가 등장한다.",
    source: "Week 3 § 7, 15"
  },
  {
    id: "S4Q8",
    set: 4,
    week: 3,
    topic: "Analytic vs Gradient Descent",
    type: "multiple_choice",
    difficulty: "medium",
    question: "선형 회귀에서 Analytic Solution(Normal Equation)과 Gradient Descent의 차이로 가장 적절한 것은?",
    choices: [
      "① Analytic Solution은 비용 함수가 Convex 2차 함수인 특별한 경우에만 단 한 번의 수식으로 최적해를 구하고, Gradient Descent는 Iterative 반복을 통해 더 다양한 형태의 비용 함수에 범용적으로 적용 가능하다",
      "② Analytic Solution은 수치 오차가 누적되는 Iterative 방식이라 Gradient Descent가 수렴한 결과보다 예측 정확도가 항상 낮게 나온다",
      "③ Gradient Descent는 비용 함수가 2차 Convex 형태인 Linear Regression에서만 수렴이 보장되며 다른 모델에는 원리상 적용할 수 없다",
      "④ Analytic Solution은 Logistic Regression의 Cross-Entropy Loss에도 그대로 적용되어 반복 없이 단 한 번의 수식 계산으로 최적 파라미터를 얻을 수 있다"
    ],
    answer: 0,
    brief: "Analytic = Convex 2차 함수 특례만. Gradient Descent = 범용(딥러닝 표준).",
    detailed: "Analytic Solution $\\theta = (X^T X)^{-1} X^T y$ 은 MSE가 Convex 2차 함수일 때만 단번에 Global Minimum을 구할 수 있다. Logistic Regression, 신경망 등은 Analytic Solution이 없고 Gradient Descent를 반복해야 한다. 그래서 GD가 딥러닝·ML의 표준 최적화가 됐다. Analytic이 빠르고 정확하긴 하지만 적용 범위가 매우 좁다는 점이 핵심.",
    source: "Week 3 § 6, 17"
  },
  {
    id: "S4Q9",
    set: 4,
    week: 3,
    topic: "Gradient Ascent vs Descent",
    type: "multiple_choice",
    difficulty: "medium",
    question: "경사 하강법(Gradient Descent)과 경사 상승법(Gradient Ascent)의 관계로 가장 적절한 것은?",
    choices: [
      "① 두 방법은 서로 다른 수학적 원리에 기반한 완전히 별개의 최적화 기법으로, 부호를 바꾼다고 해도 서로 호환될 수 없는 구조를 가진다",
      "② 로직은 동일하고 업데이트 방향(부호)만 반대. Loss 최소화는 하강법($-$), Likelihood 최대화는 상승법($+$)",
      "③ 경사 상승법은 Non-convex 비용 함수에서만 수렴이 보장되며, Convex 문제에는 원리상 경사 하강법만 적용할 수 있도록 설계되어 있다",
      "④ 두 기법 모두 학습률 $\\alpha$ 값이 음수(Negative)로 설정되어야 Gradient 방향의 반대로 움직이며 Loss를 최적화할 수 있다"
    ],
    answer: 1,
    brief: "같은 로직, 부호만 다름. 최소화는 $-\\alpha \\cdot \\nabla$, 최대화는 $+\\alpha \\cdot \\nabla$.",
    detailed: "Gradient Descent: $\\theta := \\theta - \\alpha \\nabla_\\theta J(\\theta)$. Gradient Ascent: $\\theta := \\theta + \\alpha \\nabla_\\theta L(\\theta)$. Logistic Regression은 Log-Likelihood를 최대화하므로 상승법이 자연스럽지만, $-$를 붙여 Negative Log-Likelihood로 만들면 하강법으로 통일할 수 있다. 머신러닝 프레임워크들은 관습적으로 '모든 것을 최소화 문제'로 변환해 처리한다.",
    source: "Week 3 § 11"
  },
  {
    id: "S4Q10",
    set: 4,
    week: 3,
    topic: "회귀/분류 구분 기준 서술",
    type: "multiple_choice",
    difficulty: "medium",
    question: "지도학습에서 회귀(Regression)와 분류(Classification)를 구분하는 가장 본질적인 기준으로 옳은 것은?",
    choices: [
      "① 출력값 Y가 연속적이면 회귀(Regression), 이산적이면 분류(Classification)로 구분한다",
      "② 입력 X의 차원 수로 구분 — 고차원이면 회귀, 저차원이면 분류로 구분한다",
      "③ 사용 알고리즘으로 구분 — Tree 계열이면 회귀, SVM 계열이면 분류로 구분한다",
      "④ 훈련 데이터 크기로 구분 — 대규모면 회귀, 소규모면 분류로 구분한다"
    ],
    answer: 0,
    brief: "연속(Continuous) Y = 회귀. 이산(Categorical) Y = 분류.",
    detailed: "교수님 Q&A 포인트: 회귀 문제도 억지로 분류로 풀 수는 있지만 학습이 왜곡된다. 판단 기준은 오직 Y의 치역(Range). 연속 수치(월세, 기온, 혈당)면 회귀, 이산 카테고리(스팸/정상, 개/고양이/자동차)면 분류. 입력 $X$의 차원이나 특정 알고리즘 사용 여부는 구분 기준이 아니다. 이것이 지도학습을 두 갈래로 나누는 핵심이다.",
    source: "Week 3 § 1-2"
  },

  // ── Week 4 (Q11~Q15) — Q15 주관식 ──
  // LOOP-TASK [3.21] ✅
  {
    id: "S4Q11",
    set: 4,
    week: 4,
    topic: "L1 vs L2 주된 효과",
    type: "multiple_choice",
    difficulty: "medium",
    question: "L1 정규화(Lasso)와 L2 정규화(Ridge)의 주된 효과 비교로 가장 적절한 것은?",
    choices: [
      "① L1은 일부 파라미터를 정확히 0으로 만드는 Sparsity(희소성)를 유도하고, L2는 파라미터 전체 크기를 완만하게 축소(Shrinking)하되 0으로 만들지는 않는다",
      "② L1과 L2는 패널티 항의 수식만 다를 뿐 제약 영역의 기하학적 형태가 같아 결과적으로 파라미터에 정확히 동일한 Shrinking 효과를 낸다",
      "③ L1은 파라미터 크기를 완만히 축소하는 Shrinking을 유도하고, L2는 제약 영역이 다이아몬드라 모서리에서 해가 맺혀 정확히 0이 되는 Sparsity를 만든다",
      "④ L1과 L2 모두 제약 영역의 꼭짓점에서 최적해가 잡히는 구조라 파라미터를 정확히 0으로 만드는 Sparsity를 똑같이 강하게 유도한다"
    ],
    answer: 0,
    brief: "L1 = Sparsity(피처 선택 효과). L2 = Shrinking(완만 축소). 둘의 핵심 차이.",
    detailed: "기하학적 이유: L1의 제약 영역은 다이아몬드라 최적해가 모서리에서 맺히기 쉬워 일부 파라미터가 정확히 0이 된다(Sparsity → 자동 피처 선택). L2의 제약 영역은 원이라 모서리가 없어 파라미터가 0이 되는 일이 드물고, 전체 크기를 부드럽게 축소한다(Shrinking → 민감성 저하). 사용 맥락: 피처가 너무 많고 중요한 것만 고르고 싶으면 L1, 전체적인 민감성을 낮추고 싶으면 L2.",
    source: "Week 4 § Part1-4"
  },
  {
    id: "S4Q12",
    set: 4,
    week: 4,
    topic: "Naive Bayes vs LDA 분포 가정",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Naive Bayes와 LDA는 모두 생성 모델이지만 Likelihood $p(x \\mid y)$를 모델링하는 방식이 다르다. 두 모델의 분포 가정 차이로 가장 적절한 것은?",
    choices: [
      "① Naive Bayes: 클래스가 주어지면 피처들이 서로 조건부 독립이라 가정하고 피처별로 적절한 분포(Bernoulli/Multinomial/Gaussian)를 사용. LDA: 데이터가 다변량 가우시안을 따르며 모든 클래스가 공통 공분산을 공유한다고 가정",
      "② Naive Bayes와 LDA 모두 피처 간 조건부 독립 가정을 기반으로 $p(x|y) = \\prod_j p(x_j|y)$ 형태로 쪼개어 모델링하며, 피처 상관을 무시한다는 공통 구조 때문에 두 모델은 서로 구분되지 않는다",
      "③ Naive Bayes: 피처들을 다변량 가우시안 $\\mathcal{N}(\\mu_k, \\Sigma)$ 로 한꺼번에 모델링하고 모든 클래스가 공통 공분산을 공유한다고 가정. LDA: 피처가 서로 조건부 독립이라 가정하고 피처별 1차원 분포로 쪼개 모델링",
      "④ Naive Bayes는 $p(y|x)$ 조건부 확률을 직접 최적화하는 판별 모델이고, LDA만이 베이즈 정리를 활용해 $p(x,y) = p(x|y)p(y)$ 결합 확률을 모델링하는 유일한 생성 모델이라 성격이 정반대다"
    ],
    answer: 0,
    brief: "NB = 피처 간 조건부 독립. LDA = 다변량 가우시안 + 공통 공분산.",
    detailed: "**Naive Bayes** — 피처 독립 가정 덕에 $p(x|y) = \\prod_j p(x_j|y)$ 로 쪼개지며 각 피처는 타입에 맞는 1차원 분포로 모델링. **LDA** — 피처들을 한꺼번에 다변량 가우시안 $\\mathcal{N}(\\mu_k, \\Sigma)$ 으로 잡되 공분산 $\\Sigma$를 모든 클래스가 공유한다고 가정. LDA는 피처 간 상관을 허용하지만 공분산이 모두 같아야 하고, NB는 피처 간 상관을 무시한다. 둘 다 베이즈 정리를 활용한 생성 모델이라는 점은 동일.",
    source: "Week 4 § Part3, Part4"
  },
  {
    id: "S4Q13",
    set: 4,
    week: 4,
    topic: "LDA vs QDA 결정 경계",
    type: "multiple_choice",
    difficulty: "medium",
    question: "LDA와 QDA의 결정 경계(Decision Boundary) 형태 차이로 가장 적절한 것은?",
    choices: [
      "① LDA는 선형 경계를 만들고(공분산이 동일하다는 가정 덕에 이차항 상쇄), QDA는 이차(비선형) 경계를 만든다(클래스마다 공분산이 다름)",
      "② LDA는 클래스마다 서로 다른 공분산을 허용해 이차 비선형 경계를 만들고, QDA는 공분산이 모두 같다는 가정 덕분에 이차항이 상쇄돼 선형 경계를 만든다",
      "③ LDA와 QDA 모두 판별 함수를 전개할 때 이차항이 완전히 상쇄되기 때문에 공분산 가정과 상관없이 항상 선형 결정 경계만 만들어 낸다",
      "④ LDA는 본래 분류 모델이 아니라 PCA와 같은 비지도 차원 축소 기법으로만 사용되며 결정 경계라는 개념 자체가 존재하지 않는다"
    ],
    answer: 0,
    brief: "공분산 같다고 가정 → 이차항 상쇄 → LDA 선형. 공분산 달라도 됨 → QDA 이차.",
    detailed: "LDA는 모든 클래스에서 공분산 $\\Sigma$ 가 동일하다고 보고 판별 함수를 전개할 때 $x^T \\Sigma^{-1} x$ 이차항이 서로 약분돼 $w^T x + b$ 의 선형 형태만 남는다. QDA는 클래스마다 $\\Sigma_k$ 가 다름을 허용하기 때문에 이차항이 살아남아 경계가 곡선(이차 형태)이 된다. 유연성은 QDA가 높지만 파라미터 수가 많고 과적합 위험이 커진다.",
    source: "Week 4 § Part4-2"
  },
  {
    id: "S4Q14",
    set: 4,
    week: 4,
    topic: "Bayes Rule에서 무시 가능한 항",
    type: "multiple_choice",
    difficulty: "medium",
    question: "베이즈 정리 $P(y \\mid x) = \\dfrac{P(x \\mid y) P(y)}{P(x)}$ 를 이용한 argmax 분류에서 계산 없이 무시할 수 있는 항은?",
    choices: [
      "① Posterior $P(y \\mid x)$ — argmax 계산에서 제외 가능한 상수 역할을 하는 항",
      "② Likelihood $P(x \\mid y)$ — 클래스 $y$에 의존하지 않는 상수로 비교에서 소거되는 항",
      "③ Prior $P(y)$ — 관측 데이터 $x$에만 의존하는 정규화 상수로 작용하는 항",
      "④ Evidence(Marginal Probability) $P(x)$"
    ],
    answer: 3,
    brief: "$P(x)$는 $y$와 무관한 정규화 상수 → argmax 비교에 영향 없음.",
    detailed: "argmax_y 비교는 모든 클래스 $y$ 후보에 대해 값을 비교하는 연산이다. $P(x)$ 는 관측된 데이터 $x$에만 의존하고 $y$와 독립이므로 모든 비교 항에 동일하게 등장하는 상수 역할. 상수로 나누든 곱하든 상대적 크기 순서는 바뀌지 않으므로 argmax에서는 무시 가능. 따라서 분류 공식은 $\\text{argmax}_y P(x|y) P(y)$ 로 단순화된다. Posterior·Likelihood·Prior는 각각 다른 역할이라 무시 불가.",
    source: "Week 4 § Part2-3"
  },
  {
    id: "S4Q15",
    set: 4,
    week: 4,
    topic: "판별/생성 확률 차이 서술",
    type: "multiple_choice",
    difficulty: "hard",
    question: "판별 모델(Discriminative Model)이 학습하는 $p(y \\mid x)$ 와 생성 모델(Generative Model)이 학습하는 $p(x, y)$ 의 차이로 옳은 것은?",
    choices: [
      "① 판별 모델은 조건부 확률 $p(y|x)$만 학습해 클래스 경계를 찾고, 생성 모델은 결합 확률 $p(x,y)=p(x|y)p(y)$를 학습해 데이터 생성 과정을 모델링한다",
      "② 판별 모델은 결합 확률 $p(x,y)$를 학습해 데이터 생성을 모델링하고, 생성 모델은 조건부 확률 $p(y|x)$만 학습해 클래스 경계를 찾는다",
      "③ 판별 모델과 생성 모델은 모두 동일하게 조건부 확률 $p(y|x)$를 학습하며 단지 학습 알고리즘만 다를 뿐 본질적 차이는 없다",
      "④ 판별 모델은 회귀 문제에만, 생성 모델은 분류 문제에만 사용되도록 설계된 확률 학습 기법이다"
    ],
    answer: 0,
    brief: "판별 = 조건부 확률 p(y|x) 학습(경계). 생성 = 결합 확률 p(x,y) 학습(생성 과정).",
    detailed: "판별 모델(Logistic Regression, SVM, 표준 신경망 등)은 클래스 경계를 찾는 데 집중하고 조건부 확률 $p(y|x)$ 하나만 학습. 생성 모델(Naive Bayes, LDA 등)은 결합 확률 $p(x,y) = p(x|y)p(y)$ 를 학습해 각 클래스에서 데이터가 '어떻게 생성되는지'까지 모델링한다. 생성 모델은 베이즈 정리로 분류에 활용할 수 있지만 추정해야 하는 분포가 더 많아 난이도가 높다. 반대로 새 데이터를 샘플링하거나 불완전한 입력을 다루는 데 유리하다는 장점도 있다.",
    source: "Week 4 § Part2-1,2"
  },

  // ── Week 5 (Q16~Q21) — Q21 주관식 ──
  // LOOP-TASK [3.22] ✅
  {
    id: "S4Q16",
    set: 4,
    week: 5,
    topic: "KNN vs Decision Tree 공통점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "KNN과 Decision Tree의 공통점으로 가장 적절한 것은?",
    choices: [
      "① 둘 다 $y = f(x, W)$ 형태를 가정하고 파라미터 $W$만 저장하는 Parametric 모델이다",
      "② 둘 다 Non-parametric 모델로, 예측 과정에 트레이닝 데이터의 구조(이웃 거리 또는 분기 구조)가 필요하다",
      "③ 둘 다 $\\theta^T x$ 형태의 선형 결정 경계만 그릴 수 있다는 공통 한계를 갖는다",
      "④ 둘 다 MLE로 Log-Likelihood를 최대화해 파라미터를 학습하는 확률론적 모델이다"
    ],
    answer: 1,
    brief: "KNN·Decision Tree 모두 Non-parametric. 고정 함수 형태가 없고 데이터 구조가 모델 역할을 한다.",
    detailed: "Non-parametric 모델은 사전에 정해진 함수 형태 $y = f(x, W)$ 를 가지지 않는다. KNN은 예측 시점에 트레이닝 데이터와의 거리 계산이 필요하고, Decision Tree는 분기 구조 자체가 학습된 트레이닝 데이터를 반영한다. 둘 다 모델 복잡도가 데이터 양에 따라 동적으로 변하는 특성을 공유한다. Linear/Logistic Regression, Naive Bayes, LDA는 Parametric.",
    source: "Week 5 § 3"
  },
  {
    id: "S4Q17",
    set: 4,
    week: 5,
    topic: "Parametric vs Non-parametric 차이",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Parametric 모델(예: Linear Regression)과 Non-parametric 모델(예: KNN)의 가장 큰 차이는?",
    choices: [
      "① Parametric은 고정된 함수 형태($y = f(x, W)$)를 가정하고 학습된 $W$만으로 예측하며, Non-parametric은 고정 함수 형태 없이 예측 시점에도 트레이닝 데이터 자체를 필요로 한다",
      "② Parametric 모델은 정답 레이블이 주어진 지도학습에만 사용 가능하고, Non-parametric 모델은 레이블 없이 구조만 찾는 비지도학습에만 적용되는 기법이다",
      "③ Parametric 모델은 복잡한 비선형 결정 경계만 만들 수 있고, Non-parametric 모델은 구조적으로 선형 결정 경계만 표현할 수 있도록 제한된다",
      "④ 두 분류는 용어 표현만 다를 뿐 모델이 함수 형태를 사전에 가정하는 방식이 같아 실제로는 구분 없이 혼용되는 동일한 개념이다"
    ],
    answer: 0,
    brief: "Parametric: 함수 형태 고정, $W$만 저장. Non-parametric: 함수 형태 없음, 데이터 자체가 모델.",
    detailed: "Parametric은 데이터에서 파라미터 $W$ 만 뽑아내면 그 이후 트레이닝 데이터를 버려도 된다. Non-parametric은 학습이라는 개념이 느슨해 예측 시점에 데이터 전체 또는 구조가 필요하며, 데이터가 늘어나면 모델 복잡도도 커진다. 둘 다 지도학습으로도 비지도학습으로도 쓰일 수 있고, 선형·비선형도 무관.",
    source: "Week 5 § 3"
  },
  {
    id: "S4Q18",
    set: 4,
    week: 5,
    topic: "Bagging vs Boosting",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Bagging과 Boosting의 주된 차이는?",
    choices: [
      "① Bagging은 분류기들을 독립적·병렬로 학습해 다수결로 합치고, Boosting은 이전 분류기의 오답에 가중치를 부여하며 순차적으로 학습한다",
      "② Bagging은 이전 분류기의 오답에 가중치를 부여하며 순차적으로 학습하고, Boosting은 여러 분류기를 독립적·병렬로 학습한 뒤 다수결로 합친다",
      "③ 두 방법은 Bootstrap 샘플링을 통한 순차적 학습이라는 동일한 원리를 공유하며 최종 예측 방식도 완전히 같아 실무에서 호환해 사용한다",
      "④ Bagging은 SVM 같은 마진 기반 분류기에만, Boosting은 Decision Tree 같은 트리 기반 분류기에만 원리적으로 적용 가능한 앙상블 기법이다"
    ],
    answer: 0,
    brief: "Bagging = 병렬·독립 학습. Boosting = 순차·의존 학습(이전 오답 보강).",
    detailed: "Bagging(예: Random Forest)은 Bootstrap으로 만든 서브셋마다 분류기를 독립적으로 병렬 훈련하고 투표로 합쳐 Variance를 줄인다. Boosting(예: AdaBoost)은 순차적으로 학습하며 이전 모델이 틀린 샘플에 가중치를 높여 다음 모델이 어려운 문제를 보강하게 만든다. 둘 다 Decision Tree·SVM 등 대부분의 Base classifier와 조합 가능하다.",
    source: "Week 5 § 8, 9"
  },
  {
    id: "S4Q19",
    set: 4,
    week: 5,
    topic: "Voting 방식 비교",
    type: "multiple_choice",
    difficulty: "medium",
    question: "앙상블 투표 방식 중, 각 분류기가 내놓은 **확률(Confidence)의 평균**을 계산하여 최종 클래스를 결정하는 방법은?",
    choices: [
      "① Majority Voting(Hard Voting)",
      "② Soft Voting",
      "③ Weighted Voting",
      "④ Bootstrap Voting"
    ],
    answer: 1,
    brief: "Soft Voting = 클래스별 확률 평균. Hard Voting = 예측 라벨 다수결.",
    detailed: "**Hard(Majority) Voting** — 각 분류기의 최종 예측(클래스 라벨)만 뽑아 다수결. **Soft Voting** — 각 분류기가 내는 클래스별 확률을 평균 내고 평균이 가장 큰 클래스를 선택. **Weighted Voting** — 신뢰도가 높은 분류기에 더 큰 가중치를 곱해 투표. 교수님 예시: 다수결로는 A가 2:1이어도 Soft Voting에서 B의 평균 신뢰도가 더 높으면 B로 뒤집힐 수 있다.",
    source: "Week 5 § 7, Week 6 § 2-2"
  },
  {
    id: "S4Q20",
    set: 4,
    week: 5,
    topic: "Impurity 지표 용도",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Decision Tree의 3가지 Impurity 지표 중, 일반적으로 트리를 성장시키는 단계보다 **Pruning(가지치기) 단계**에서 평가 지표로 주로 사용되는 것은?",
    choices: [
      "① Entropy",
      "② Gini Impurity",
      "③ Classification Error",
      "④ Information Gain"
    ],
    answer: 2,
    brief: "Classification Error는 민감도가 낮아 성장보다는 Pruning 평가에 주로 쓰인다.",
    detailed: "Classification Error $= 1 - \\max(p_i)$ 는 가장 빈도 높은 클래스를 제외한 나머지의 에러 비율로, 노드 내 클래스 분포의 미세한 변화에 비교적 둔감하다. 그래서 트리를 공격적으로 성장시킬 때 세밀한 분할을 유도하는 지표로는 적합하지 않고, 이미 성장한 트리를 평가·가지치기할 때 활용한다. 성장 단계에서는 Entropy나 Gini가 더 민감하게 분할을 유도한다.",
    source: "Week 5 § 5-4"
  },
  {
    id: "S4Q21",
    set: 4,
    week: 5,
    topic: "Parametric/Non-param 구분 서술",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Parametric 모델과 Non-parametric 모델을 구분하는 가장 본질적인 기준으로 옳은 것은?",
    choices: [
      "① Parametric은 고정된 함수 형태를 가정하고 학습된 파라미터만으로 예측하는 반면 Non-parametric은 함수 형태 없이 예측 시 트레이닝 데이터 자체가 필요하다",
      "② Parametric은 지도학습 전용이고 Non-parametric은 비지도학습 전용으로 구분되며 학습 데이터의 라벨 유무로 결정된다",
      "③ Parametric과 Non-parametric 모두 고정된 함수 형태를 가정하고 파라미터만 학습하는 방식이므로 실제 예측 절차상 본질적 차이는 없다",
      "④ Parametric의 대표 예는 KNN·Decision Tree이고 Non-parametric의 대표 예는 Linear Regression·Logistic Regression이다"
    ],
    answer: 0,
    brief: "Parametric = 함수 형태 고정 + 파라미터만 사용. Non-parametric = 함수 형태 없음 + 데이터 자체 필요.",
    detailed: "Parametric 모델은 $y = f(x, W)$ 형태를 미리 정하고 학습 과정에서 고정된 개수의 파라미터 $W$ 만 뽑는다. 예측 시 트레이닝 데이터는 더 이상 필요 없다. Non-parametric은 함수 형태를 가정하지 않아 파라미터 수가 고정되지 않으며 데이터 양에 따라 모델 복잡도가 커진다. 예측 시 트레이닝 데이터 자체가 모델 역할을 한다(KNN의 거리 계산, Decision Tree의 분기 구조). 이 차이가 메모리·속도·일반화 특성을 모두 좌우한다.",
    source: "Week 5 § 3"
  },

  // ── Week 6 (Q22~Q26) ──
  // LOOP-TASK [3.23] ✅
  {
    id: "S4Q22",
    set: 4,
    week: 6,
    topic: "SVM vs Logistic Regression",
    type: "multiple_choice",
    difficulty: "medium",
    question: "SVM과 Logistic Regression의 분류 접근 방식 차이로 가장 적절한 것은?",
    choices: [
      "① SVM은 경계에서 가장 가까운 점(Support Vector)과의 마진을 최대화하는 '기하학적' 접근을 하고, Logistic Regression은 모든 데이터의 확률적 Likelihood를 최대화하는 '확률론적' 접근을 한다",
      "② SVM은 $p(y|x)$의 Log-Likelihood를 최대화하는 확률론적 모델이고, Logistic Regression은 Support Vector와의 마진 거리를 최대화하는 기하학적 모델이다",
      "③ SVM과 Logistic Regression은 동일한 Hinge Loss를 최소화하는 같은 최적화 문제라서 사실상 동일한 알고리즘이며 결과 또한 항상 같다",
      "④ SVM은 연속값을 예측하는 회귀 전용 모델이며, Logistic Regression은 이산 카테고리를 판별하는 분류 전용 모델이라 적용 문제가 완전히 다르다"
    ],
    answer: 0,
    brief: "SVM=마진 최대화(기하). Logistic=Likelihood 최대화(확률).",
    detailed: "SVM은 '가장 가까운 점과의 거리가 가장 큰 선'을 찾으며 Support Vector 몇 개만 경계에 영향을 미친다. Logistic Regression은 모든 데이터 포인트의 $p(y|x)$ 값을 조합한 Log-Likelihood를 최대화해 전체 데이터를 종합적으로 고려한다. 철학이 다르지만 많은 데이터셋에서 둘 다 선형 분류기로서 우수한 성능을 낸다. 선형 경계를 구한다는 공통점이 있으나 outlier 반응 방식과 최적화 기준이 다르다.",
    source: "Week 6 § 5~7"
  },
  {
    id: "S4Q23",
    set: 4,
    week: 6,
    topic: "Hard vs Soft Margin",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Hard-margin SVM과 Soft-margin SVM의 차이로 가장 적절한 것은?",
    choices: [
      "① Hard-margin은 모든 샘플이 마진 바깥에 위치해야 한다고 엄격히 강제하고, Soft-margin은 Slack Variable $\\xi$를 도입해 일부 샘플이 마진 안이나 오분류 상태가 되는 것을 비용과 함께 허용한다",
      "② Hard-margin은 Slack Variable $\\xi$를 도입해 일부 샘플의 오분류를 비용과 함께 허용하고, Soft-margin은 모든 샘플이 마진 밖에 있어야 한다고 완전히 금지한다",
      "③ 두 방식은 $\\min \\frac{1}{2}\\|w\\|^2$ 라는 완전히 동일한 목적식과 제약 조건을 공유하므로 수학적으로 같은 최적화 문제에 해당한다",
      "④ Hard-margin SVM만이 Kernel Trick을 활용해 비선형 결정 경계를 만들 수 있고, Soft-margin은 원리상 선형 경계만 만들 수 있도록 제한된다"
    ],
    answer: 0,
    brief: "Hard = 완벽 분리 강제. Soft = Slack으로 유연성 허용. 아웃라이어 있을 땐 Soft가 필수.",
    detailed: "Hard-margin 수식은 $\\min \\frac{1}{2}\\|w\\|^2$ s.t. $y^{(i)}(w^T x^{(i)} + b) \\ge 1$. 아웃라이어 하나만 있어도 경계가 극단적으로 틀어져버린다. Soft-margin은 $\\xi_i \\ge 0$ 을 도입해 $y^{(i)}(w^T x^{(i)} + b) \\ge 1 - \\xi_i$ 로 약화하고 목적식에 $C \\sum \\xi_i$ 를 더해 '슬랙을 쓸수록 비용이 든다'는 구조. 현실 데이터는 대부분 Soft-margin이 표준.",
    source: "Week 6 § 7~8"
  },
  {
    id: "S4Q24",
    set: 4,
    week: 6,
    topic: "Kernel Trick 이점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "실제로 데이터를 고차원 공간으로 매핑하지 않고도 고차원에서의 내적 결과를 얻을 수 있는 Kernel Trick의 이점으로 가장 적절한 것은?",
    choices: [
      "① 고차원 매핑의 계산 비용을 크게 줄여 효율적인 비선형 분류가 가능해진다",
      "② 중요도가 낮은 훈련 데이터를 자동으로 제거해 저장 공간을 크게 절약해 준다",
      "③ 암묵적 정규화 역할을 해 모델의 오버피팅을 원천 차단해 준다",
      "④ 모든 분류기의 예측 성능을 같은 수준으로 수렴시켜 준다"
    ],
    answer: 0,
    brief: "명시적 고차원 변환 없이 $K(x_i, x_j)$만 계산 → 연산 효율 + 비선형 분류 가능.",
    detailed: "고차원 매핑 $\\phi(x)$ 를 직접 계산하면 연산이 폭발적으로 증가한다(경우에 따라 무한 차원). Kernel Trick은 SVM Dual Problem에서 내적 $\\phi(x_i) \\cdot \\phi(x_j)$ 만 등장한다는 점을 활용해 원래 차원에서 $K(x_i, x_j)$ 하나만 계산하면 된다. 이 덕분에 RBF 같은 복잡한 비선형 경계도 실제 고차원 이동 없이 얻어낼 수 있다. 오버피팅 방지와는 별개 문제(② 오답).",
    source: "Week 6 § 9"
  },
  {
    id: "S4Q25",
    set: 4,
    week: 6,
    topic: "OvR vs OvO 장단점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "다중 클래스 SVM에서 One-vs-Rest(OvR)와 One-vs-One(OvO)의 장단점을 올바르게 비교한 것은?",
    choices: [
      "① OvR은 분류기 수가 $K$개로 학습이 빠르지만 '하나 vs 나머지' 구조 때문에 내부 클래스 불균형이 발생할 수 있고, OvO는 $K(K-1)/2$개로 1:1 쌍이라 불균형 문제는 덜하지만 클래스가 많아지면 분류기 수가 기하급수적으로 증가한다",
      "② OvR은 모든 클래스 쌍마다 분류기를 따로 만들어 $K(K-1)/2$개가 필요하고, OvO는 전체를 한 번에 다루는 $K$개만으로 충분해 OvR이 학습 비용 측면에서 훨씬 무거운 방식이다",
      "③ OvR은 '하나 vs 나머지' 구조 덕에 클래스 내부 균형이 자동 유지되어 불균형에 강하고, OvO는 쌍별 학습에서 비율이 심하게 왜곡돼 소수 클래스에서 내부 불균형에 매우 취약하다",
      "④ OvR과 OvO는 분류기 개수, 학습 속도, 클래스 불균형 반응이 모두 동일하므로 장단점에서 어떤 차이도 발생하지 않으며 Scikit-learn에서도 완전 호환되도록 설계되어 있다"
    ],
    answer: 0,
    brief: "OvR: K개·빠름·불균형 위험. OvO: K(K-1)/2개·쌍별 균형·개수 폭증 위험.",
    detailed: "OvR은 학습·예측 속도가 빠르지만 '하나 vs 나머지(전체)'라 소수 클래스는 비율이 낮아져 내부 불균형이 발생. OvO는 클래스 쌍마다 별도 분류기를 두므로 각 분류기 내부에서는 균형 잡히지만 $K=100$만 돼도 $4950$개 분류기라 학습 비용 급증. Scikit-learn은 두 방법의 예측 성능이 비슷하다는 점 때문에 속도 우위의 OvR을 기본값으로 선호.",
    source: "Week 6 § 10"
  },
  {
    id: "S4Q26",
    set: 4,
    week: 6,
    topic: "Linear vs RBF Kernel",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Linear Kernel과 RBF(Gaussian) Kernel의 차이로 가장 적절한 것은?",
    choices: [
      "① Linear Kernel은 원래 차원에서 선형 경계를 만들고, RBF Kernel은 암묵적으로 매우 고차원(사실상 무한 차원) 공간에 매핑해 복잡한 비선형 경계를 만들 수 있다",
      "② Linear Kernel은 무한 차원 특징 공간을 암묵적으로 활용해 곡선 형태의 복잡한 경계를 만들고, RBF Kernel은 원래 차원의 단순 내적만 사용해 선형 경계만 만든다",
      "③ RBF Kernel은 $\\exp(-\\gamma \\|x_i - x_j\\|^2)$ 형태라 출력이 이진값으로 제한되어 오직 2-class 분류에서만 사용 가능하며 다중 클래스 문제에는 적용할 수 없다",
      "④ 두 Kernel 모두 내적 계산의 기하학적 성질상 결정 경계가 항상 데이터 중심을 기준으로 한 원(Circle) 형태의 폐곡선으로만 나타나는 특성을 공유한다"
    ],
    answer: 0,
    brief: "Linear = 선형 경계. RBF = 무한차원 매핑 효과로 유연한 비선형 경계.",
    detailed: "Linear Kernel $K(x_i, x_j) = x_i \\cdot x_j$ 은 단순 내적으로, 원래 차원에서 선형 결정 경계를 찾는 것과 동등하다(=일반 SVM). RBF Kernel $K(x_i, x_j) = \\exp(-\\gamma \\|x_i - x_j\\|^2)$ 은 두 점의 거리에 따라 유사도를 측정하며, 이론상 무한 차원 특징 공간과 동등한 효과를 낸다. 비선형 경계를 유연하게 그리지만 $\\gamma, C$ 하이퍼파라미터 튜닝이 까다롭다.",
    source: "Week 6 § 9-2,3"
  },

  // ── Week 7 (Q27~Q30) — Q28 주관식 ──
  // LOOP-TASK [3.24] ✅
  {
    id: "S4Q27",
    set: 4,
    week: 7,
    topic: "Accuracy vs MCC",
    type: "multiple_choice",
    difficulty: "medium",
    question: "극단적 Class Imbalance 상황에서 Accuracy와 MCC의 차이로 가장 적절한 것은?",
    choices: [
      "① Accuracy는 다수 클래스만 맞춰도 높게 나올 수 있어 착시를 일으키지만, MCC는 Confusion Matrix의 TP·TN·FP·FN 네 값을 모두 반영해 불균형 상황에서도 정직한 평가를 제공한다",
      "② Accuracy와 MCC는 수식 구조가 같아 Class Imbalance가 아무리 심해도 항상 동일한 값을 출력하므로 실무에서 어느 쪽을 써도 결과 차이가 없다",
      "③ MCC는 정규화 계수가 양수이므로 동일 Confusion Matrix에서 계산하면 수치적으로 항상 Accuracy보다 큰 값이 나오도록 보장된 지표다",
      "④ Accuracy는 다수 클래스 비율 영향을 받지 않아 불균형에 강하고, MCC는 TP·TN·FP·FN 네 값을 모두 사용하기 때문에 오히려 불균형 상황에 매우 약해진다"
    ],
    answer: 0,
    brief: "불균형 데이터에서 Accuracy는 왜곡 — MCC는 네 셀 모두 반영해 왜곡 없음.",
    detailed: "Lazy Classifier(100명 모두 Negative 예측) 예시: 98명 Negative · 2명 Positive 상황에서 Accuracy = 98%로 착시. 하지만 MCC는 $TP \\cdot TN - FP \\cdot FN = 0 \\cdot 98 - 0 \\cdot 2 = 0$ 으로 0.00, '사실상 찍기 수준'이 명확히 드러난다. 이래서 의료·사기 탐지 등 불균형이 심한 도메인에서 Accuracy 대신 MCC·F1을 선호한다.",
    source: "Week 7 § 7, 8"
  },
  {
    id: "S4Q28",
    set: 4,
    week: 7,
    topic: "Precision 계산",
    type: "short_answer",
    difficulty: "medium",
    question: "다음 Confusion Matrix에서 Precision 값을 소수점 둘째 자리까지 계산하시오.\n\nTP = 40, FP = 10, FN = 20, TN = 30",
    answer: "0.80",
    answer_type: "number",
    tolerance: 0.01,
    brief: "Precision = TP/(TP+FP) = 40/(40+10) = 40/50 = 0.80",
    detailed: "Precision(정밀도·PPV)은 모델이 Positive로 예측한 것 중 실제 Positive 비율. 공식 $P = TP/(TP+FP) = 40/50 = 0.80$. 80%가 정확히 양성이라는 뜻. Recall(민감도)과 트레이드오프 관계이며 F1은 두 지표의 조화평균이다.",
    source: "Week 7 § 5"
  },
  {
    id: "S4Q29",
    set: 4,
    week: 7,
    topic: "Pearson vs Spearman 비교",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Pearson 상관계수와 Spearman 순위 상관계수의 비교로 가장 적절한 것은?",
    choices: [
      "① Pearson은 선형(Linear) 관계만 포착하고, Spearman은 값을 순위(Rank)로 변환해 단조(Monotonic) 비선형 관계까지 포착한다",
      "② Pearson은 값을 순위(Rank)로 변환해 단조 비선형 관계까지 포착하고, Spearman은 원 값 그대로 공분산을 계산해 선형(Linear) 관계만 잡아내는 지표다",
      "③ 두 상관계수는 변수 간 상관관계를 넘어 원인과 결과의 방향성까지 포착하므로 X가 Y를 유발하는 인과관계(Causation)를 통계적으로 증명하는 지표로 쓰인다",
      "④ Pearson은 성별·혈액형 같은 범주형 데이터 전용이고 Spearman은 키·몸무게 같은 연속형 데이터 전용이라 두 계수는 서로 다른 데이터 타입에 배타적으로 적용된다"
    ],
    answer: 0,
    brief: "Pearson = 선형 포착. Spearman = 순위 기반 → 단조 비선형까지 포착.",
    detailed: "$y = x^3$ 처럼 단조 증가하지만 비선형인 관계에서 Pearson은 값이 1보다 작게 나오지만, Spearman은 순위가 완벽히 일치하므로 1을 낸다. 두 계수 모두 $-1 \\sim 1$ 범위이며 상관관계만 측정할 뿐 **인과관계(Causation)를 보장하지 않는다**는 점이 공통(③ 오답). 범주형 데이터에는 Chi-square 같은 별도 지표가 필요(④ 오답).",
    source: "Week 7 § 14"
  },
  {
    id: "S4Q30",
    set: 4,
    week: 7,
    topic: "MSE vs MAE",
    type: "multiple_choice",
    difficulty: "medium",
    question: "회귀 오차 지표 MSE(Mean Squared Error)와 MAE(Mean Absolute Error)의 비교로 가장 적절한 것은?",
    choices: [
      "① MSE는 오차 제곱의 평균으로 큰 에러에 민감하고(이상치 취약), MAE는 오차 절댓값 평균으로 해석이 직관적이며 큰 에러에 상대적으로 덜 민감하다",
      "② MAE는 절댓값을 다시 제곱해 집계하기 때문에 MSE보다 큰 에러에 항상 더 민감하게 반응하며 이상치의 영향을 훨씬 강하게 받는 지표다",
      "③ 두 지표는 오차의 평균을 계산한다는 동일한 원리에 따라 어떠한 데이터셋에서도 정확히 같은 값을 출력하므로 실무에서는 둘 중 아무거나 선택해도 된다",
      "④ MSE는 연속값을 예측하는 회귀 문제 전용 지표이고, MAE는 이산 카테고리를 판별하는 분류 문제에서 예측 라벨과 실제 라벨 오차를 측정하는 전용 지표다"
    ],
    answer: 0,
    brief: "MSE = 제곱 평균(큰 에러 민감, 이상치에 휘둘림). MAE = 절댓값 평균(이상치에 덜 민감).",
    detailed: "$\\text{MSE} = \\frac{1}{n}\\sum(y - \\hat{y})^2$, $\\text{MAE} = \\frac{1}{n}\\sum|y - \\hat{y}|$. 제곱 연산 때문에 MSE는 큰 에러의 영향이 훨씬 커져 이상치에 민감. MAE는 절댓값이라 선형적으로 영향을 받아 강건(Robust). 둘 다 타겟 변수 단위(Unit)에 의존하므로 절대 크기만 봐서는 모델 품질을 판단하기 어렵고, 이래서 단위 독립적인 $R^2$ 를 함께 본다.",
    source: "Week 7 § 15"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 5 — 종합 심화 (난이도 상, 함정 선지 다수)
// 배분: W2:5 · W3:5 · W4:5 · W5:5 · W6:5 · W7:5 = 30
// 주관식 위치: Q7(W3 Normal Eq 도출 설명), Q13(W4 LDA 공분산),
//              Q19(W5 AdaBoost α), Q24(W6 SVM C), Q30(W7 MCC)
// ═══════════════════════════════════════════════════════════════
export const set5 = [
  // ── Week 2 (Q1~Q5) ──
  // LOOP-TASK [3.25] ✅
  {
    id: "S5Q1",
    set: 5,
    week: 2,
    topic: "Bias-Variance 조치 방향",
    type: "multiple_choice",
    difficulty: "hard",
    question: "다음 중 모델의 Bias를 낮추고 동시에 Variance를 증가시키는 방향으로 작용하는 조치로 가장 적절한 것은?",
    choices: [
      "① L2 정규화의 $\\lambda$ 값을 크게 키워 파라미터를 0 쪽으로 강하게 끌어당긴다",
      "② 모델의 복잡도(Capacity)를 크게 늘린다 (예: 신경망의 층·뉴런 수 증가)",
      "③ Early Stopping 조건을 더 일찍 걸어 수렴 전에 학습을 조기 중단시킨다",
      "④ L1 정규화를 추가로 적용해 일부 파라미터를 0으로 만들어 Sparsity를 유도한다"
    ],
    answer: 1,
    brief: "Capacity↑ = Bias↓ Variance↑. 나머지는 반대 방향(Bias↑ Variance↓).",
    detailed: "Bias-Variance Tradeoff: 모델 Capacity를 키우면 훈련 데이터를 더 정확히 맞춰 Bias가 줄지만 노이즈에도 민감해져 Variance가 커진다. ① L2 강화는 파라미터를 0쪽으로 당겨 모델을 단순화 → Bias↑ Variance↓. ③ Early Stopping도 모델을 Underfit 쪽으로 유지. ④ L1도 Sparsity로 모델을 단순화. 세 선지 모두 Bias를 높이고 Variance를 낮추는 반대 방향 조치.",
    source: "Week 2 § 6-3"
  },
  {
    id: "S5Q2",
    set: 5,
    week: 2,
    topic: "LOOCV 특징 함정",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Leave-one-out Cross-Validation(LOOCV)의 특징으로 **가장 적절하지 않은** 것은?",
    choices: [
      "① $K = N$(전체 데이터 수)로 설정된 극단적 K-fold Cross-Validation의 특수 사례에 해당한다",
      "② 매 반복(iteration)마다 단 1개 데이터 포인트만 검증(Validation)에 사용되고 나머지는 훈련에 투입된다",
      "③ 폴드 수가 $N$개로 매우 많아 연산 비용이 크게 치솟으므로 실무에서는 5-fold·10-fold가 더 선호된다",
      "④ LOOCV는 자동으로 Stratified 조건을 만족시켜 Class Imbalance 문제를 완벽히 해결한다"
    ],
    answer: 3,
    brief: "LOOCV는 Stratified 조건과 무관. 매 fold에 검증 샘플 1개만 있어 클래스 비율 보존 개념 자체가 성립 안 함.",
    detailed: "LOOCV에서 검증 fold는 단 1개 샘플이므로 '클래스 비율 보존'이라는 Stratified 개념이 적용되지 않는다. Stratified K-fold는 K < N인 상황에서 각 fold에 원본 클래스 비율을 맞추는 기법이고, 불균형 대응이 필요하면 Stratified K-fold를 별도로 써야 한다. ①②③은 모두 맞는 설명. 함정은 '극단적 케이스니까 모든 것을 커버할 것'이라는 오인.",
    source: "Week 2 § 5-2,3"
  },
  {
    id: "S5Q3",
    set: 5,
    week: 2,
    topic: "Underfit 진단 반대 함정",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Training Error도 높고 Validation Error도 함께 높게 나온 경우(두 에러 모두 큰 상태)의 진단 및 가장 우선적인 조치로 적절한 것은?",
    choices: [
      "① Overfitting(High Variance) 상태로 판단하고 모델 복잡도(층·뉴런 수)를 크게 낮춰 단순화시킨다",
      "② 정규화 항($\\lambda$)의 강도를 크게 높여 파라미터를 0 쪽으로 더 강하게 끌어당긴다",
      "③ Underfitting(High Bias) 상태로 판단하고 모델 Capacity를 키우거나 더 풍부한 피처를 추가한다",
      "④ 훈련 데이터 양을 줄이고 Dropout 비율을 높여 모델이 과적합되지 않도록 학습 부담을 덜어준다"
    ],
    answer: 2,
    brief: "Train도 Val도 높음 = Underfit. Overfit 대응책(복잡도↓·정규화↑)은 역효과.",
    detailed: "Bias-Variance 관점: Training Error 자체가 높다는 건 모델이 훈련 데이터의 기본 패턴조차 학습하지 못했다는 뜻(High Bias). Overfit과 헷갈려 복잡도를 더 낮추면 Underfit이 심해져 상황이 악화된다. 올바른 조치는 모델 Capacity 확장(층·뉴런 증가, 차수 증가), 피처 엔지니어링, 정규화 완화 등 Bias를 줄이는 방향. 이 진단 오류는 실제 프로젝트에서 자주 발생하는 함정.",
    source: "Week 2 § 6"
  },
  {
    id: "S5Q4",
    set: 5,
    week: 2,
    topic: "Deep Double Descent & Scaling Law",
    type: "multiple_choice",
    difficulty: "hard",
    question: "OpenAI가 발견한 Deep Double Descent 현상과 Scaling Law의 관계로 가장 적절한 것은?",
    choices: [
      "① 두 현상은 서로 완전히 무관한 독립 개념이며, 하나가 다른 하나를 경험적·이론적으로 설명할 수 없다",
      "② Deep Double Descent는 '모델 크기·데이터·계산량을 키울수록 성능이 계속 좋아진다'는 Scaling Law의 경험적 근거 중 하나로, 전통적 U자형 Overfitting 이론으로는 설명되지 않는 현상",
      "③ Scaling Law는 훈련 Epoch나 모델 크기와 무관한 수렴 속도 법칙이고, Deep Double Descent와는 전혀 별개의 개념이다",
      "④ Deep Double Descent는 학습률(Learning Rate)을 Warm-up 구간에서 두 번 감소시키는 스케줄링 기법의 별칭이다"
    ],
    answer: 1,
    brief: "Deep Double Descent = 더 키우면 에러가 다시 떨어진다. Scaling Law(계속 키우면 좋아짐)의 경험적 뿌리.",
    detailed: "전통적 U자형: Capacity 늘리면 Val Error가 떨어지다 Overfit으로 다시 오른다. OpenAI는 이 한계를 넘어 더 키워봤더니 Error가 다시 하강(Second Descent)해 이전보다 더 낮아지는 현상을 발견. 이것이 '모델·데이터·계산량을 충분히 키우면 성능이 계속 좋아진다'는 Scaling Law(GPT-1→4 등 대형 모델 개발 배경)의 경험적 뒷받침이 된다. Week 2의 최신 동향 포인트.",
    source: "Week 2 § 6-4"
  },
  {
    id: "S5Q5",
    set: 5,
    week: 2,
    topic: "Shortcut Learning과 OOD",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Shortcut Learning과 OOD(Out-of-Distribution) 데이터의 관계로 가장 적절한 것은?",
    choices: [
      "① 두 개념은 서로 완전히 무관한 현상이며, 데이터 분포 이동(Distribution Shift) 이론에서 전혀 다른 축으로 분류된다",
      "② Shortcut Learning은 훈련 데이터에 우연히 존재하는 허상 패턴(Spurious Pattern)을 정답 힌트로 학습한 결과이기 때문에, 해당 허상 패턴이 없는 OOD 데이터에서 모델이 극도로 취약해지는 근본 원인이 된다",
      "③ OOD(Out-of-Distribution) 데이터는 오히려 Shortcut Learning이 완전히 해결되어 제거된 상태의 정제된 데이터셋을 가리키는 용어다",
      "④ Shortcut Learning은 오직 이미지 분류 문제의 CNN 백본에서만 관찰되는 현상이며, 자연어·음성 도메인에서는 보고된 사례가 전혀 없다"
    ],
    answer: 1,
    brief: "Shortcut Learning → OOD 취약성의 근본 원인. 훈련 분포에만 있던 허상이 사라지면 모델이 망가짐.",
    detailed: "Shortcut은 모델이 본질 특징(형태 등)이 아닌 '별/달 위치', '고양이/코끼리 텍스처' 같은 편의적 단축 경로를 학습한 상태. 그 단축 신호가 훈련 분포에만 있고 OOD에서 사라지면 모델이 완전히 엉뚱한 답을 낸다. 즉 Shortcut Learning은 OOD 취약성의 근본 원인이며, 둘은 동전의 양면처럼 연결돼 있다. 이미지뿐 아니라 자연어·음성·의료 등 모든 도메인에서 관찰된다.",
    source: "Week 2 § 7"
  },

  // ── Week 3 (Q6~Q10) — Q7 주관식 ──
  // LOOP-TASK [3.26] ✅
  {
    id: "S5Q6",
    set: 5,
    week: 3,
    topic: "Cost Function 행렬 표기",
    type: "multiple_choice",
    difficulty: "medium",
    question: "시그마 표기 $J(\\theta) = \\frac{1}{2} \\sum_{i=1}^n (f_\\theta(x^{(i)}) - y^{(i)})^2$ 를 데이터 행렬 $X$와 벡터 $y$로 표현한 올바른 형태는?",
    choices: [
      "① $J(\\theta) = \\frac{1}{2} (X\\theta - y)^T (X\\theta - y)$",
      "② $J(\\theta) = \\frac{1}{2} X^T y + \\frac{1}{2} \\theta^T \\theta$ (잔차 대신 입력·정답 내적만 사용)",
      "③ $J(\\theta) = \\frac{1}{2} \\theta^T X^T X \\theta$ (잔차의 정답 성분 $y$ 를 생략한 형태)",
      "④ $J(\\theta) = \\frac{1}{2} y^T y - \\theta^T X^T y$ (제곱 완성이 되지 않은 부분 항)"
    ],
    answer: 0,
    brief: "잔차 벡터 $(X\\theta - y)$ 의 자기 내적에 1/2를 곱한 형태가 행렬판 MSE.",
    detailed: "스칼라 합 $\\sum (f(x^{(i)}) - y^{(i)})^2$ 는 잔차 벡터 $r = X\\theta - y$ 의 자기 내적 $r^T r = \\sum r_i^2$ 과 같다. 그래서 $J(\\theta) = \\frac{1}{2} (X\\theta - y)^T (X\\theta - y)$. 이 형태에서 $\\theta$에 대해 미분하면 $X^T X \\theta - X^T y = 0$ 이 나오고 Normal Equation으로 이어진다. ②③④는 식의 일부만 잘라내 잘못 조합한 함정.",
    source: "Week 3 § 6-2"
  },
  {
    id: "S5Q7",
    set: 5,
    week: 3,
    topic: "Normal Equation 도출 서술",
    type: "multiple_choice",
    difficulty: "hard",
    question: "비용 함수 $J(\\theta) = \\frac{1}{2}(X\\theta - y)^T(X\\theta - y)$ 를 $\\theta$에 대해 미분하고 0으로 놓은 뒤 Normal Equation $\\theta = (X^T X)^{-1} X^T y$ 를 도출하는 핵심 단계로 가장 적절한 것은?",
    choices: [
      "① $J(\\theta)$를 $\\theta$에 대해 미분해 0으로 놓고 전개하면 $X^T X \\theta = X^T y$ 가 나오며, 양변 앞에 역행렬 $(X^T X)^{-1}$을 곱해 $\\theta = (X^T X)^{-1} X^T y$ 를 얻는다",
      "② Gradient Descent를 충분히 반복해 수렴시키면 해가 나오며, 역행렬 계산 없이 반복 갱신만으로 Closed-form 해가 직접 도출되는 구조다",
      "③ Lagrange 승수법으로 제약 조건을 결합하고 KKT 조건을 풀면 Normal Equation이 자동으로 유도되어 역행렬 계산이 불필요해진다",
      "④ EM 알고리즘의 M-step에서 기대값(Expectation) 형태로 파라미터를 재추정하면 Normal Equation이 자연스럽게 도출되는 구조다"
    ],
    answer: 0,
    brief: "① J(θ)를 미분해 0으로 설정 → ② $X^T X \\theta = X^T y$ → ③ 양변에 $(X^T X)^{-1}$ 곱.",
    detailed: "1단계) $\\nabla_\\theta J(\\theta) = X^T X \\theta - X^T y = 0$ (Convex 2차 함수이므로 미분값 0이 Global Minimum). 2단계) 정리해 $X^T X \\theta = X^T y$. 3단계) $X^T X$ 가 가역이라면 양변 앞에 $(X^T X)^{-1}$ 을 곱하면 $\\theta = (X^T X)^{-1} X^T y$. 이것이 Closed-form Solution. $X^T X$ 가 특이행렬(singular)이면 불가능하므로 Ridge($\\lambda I$ 추가)로 보완하기도 한다.",
    source: "Week 3 § 6-3"
  },
  {
    id: "S5Q8",
    set: 5,
    week: 3,
    topic: "Cross-Entropy 유도 원리",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이진 분류의 Cross-Entropy Loss $L = -\\frac{1}{n}\\sum[y \\log p + (1-y)\\log(1-p)]$ 의 유도 원리로 가장 적절한 것은?",
    choices: [
      "① 베르누이(Bernoulli) 분포의 Log-Likelihood를 최대화하는 문제를, 부호를 뒤집어 최소화 문제로 변환한 것",
      "② 정규분포(Gaussian) 가정 하에서 유도된 MSE 손실을 이진 분류용으로 단순 변형·재스케일한 결과물",
      "③ 특별한 수학적 근거 없이 다양한 손실 후보를 실험해보고 가장 성능이 좋은 식을 경험적으로 선택한 것",
      "④ L1 Lasso와 L2 Ridge 정규화 항의 합에서 파라미터 의존 항을 제거해 파생시킨 특수 형태"
    ],
    answer: 0,
    brief: "Cross-Entropy = 베르누이 NLL(Negative Log-Likelihood). Log-Likelihood 최대화와 동치.",
    detailed: "이진 라벨 $y$ 의 베르누이 분포 $p(y \\mid x) = p^y (1-p)^{1-y}$ 에 로그를 취한 뒤 $-$를 붙여 평균 내면 정확히 Cross-Entropy Loss 수식이 나온다. 즉 Cross-Entropy 최소화는 베르누이 MLE와 수학적으로 동치. MSE-MLE 동치(정규분포 가정)와 같은 원리를 베르누이 분포에 적용한 것이며, 이래서 GLM 프레임워크로 통합 설명된다.",
    source: "Week 3 § 10, 15"
  },
  {
    id: "S5Q9",
    set: 5,
    week: 3,
    topic: "MLE → NLL 최소화 변환",
    type: "multiple_choice",
    difficulty: "medium",
    question: "MLE(Maximum Likelihood Estimation)가 Likelihood를 '최대화'하는데, 머신러닝 프레임워크에서는 Negative Log-Likelihood(NLL)를 '최소화'하는 형태로 쓰는 주된 이유는?",
    choices: [
      "① 대부분의 최적화 라이브러리가 '최소화 문제'를 표준으로 삼아 통일성을 유지할 수 있고, 로그 변환으로 곱셈→덧셈이 되어 언더플로우를 방지하며 미분이 편해지기 때문",
      "② Likelihood의 정의상 그 값이 항상 음수로 출력되기 때문에 부호를 맞춰 최소화로 다루어야 수치적으로 의미를 가지기 때문",
      "③ 최대화 문제는 Convex 영역 바깥에서 Global Optimum의 존재가 수학적으로 보장되지 않아 최소화로 변환이 필수이기 때문",
      "④ Likelihood는 확률 분포가 아니라 정규화되지 않은 임의의 점수(Score) 함수여서 확률 해석이 불가능하기 때문"
    ],
    answer: 0,
    brief: "관습(최소화 통일) + 로그(수치안정·미분 편의) 두 가지 실용적 이유.",
    detailed: "이론적으로 $\\text{argmax} L(\\theta)$ 와 $\\text{argmin} -\\log L(\\theta)$ 의 해 $\\theta^*$ 는 완전히 동일하다. 실무적으로: ① 라이브러리·알고리즘이 Minimize 중심이라 통일성 유지. ② 수많은 확률값의 곱은 아주 작아져 언더플로우가 발생하지만 로그로 덧셈으로 바꾸면 안정적. ③ 곱 미분보다 합 미분이 훨씬 간단. 이 세 가지가 NLL 표기의 실용적 이유다.",
    source: "Week 3 § 7-4, 15-1"
  },
  {
    id: "S5Q10",
    set: 5,
    week: 3,
    topic: "Softmax + Cross-Entropy 조합",
    type: "multiple_choice",
    difficulty: "hard",
    question: "신경망 분류기에서 Softmax 출력층과 Cross-Entropy Loss가 거의 항상 쌍으로 쓰이는 주된 이유는?",
    choices: [
      "① 조합 시 미분 결과가 $(\\hat{p} - y)$ 의 단순한 형태로 약분되어 역전파 계산이 매우 효율적이기 때문",
      "② 두 함수는 수학적으로 완전히 동일한 연산이어서 어느 쪽을 사용하든 출력값·Gradient가 똑같기 때문",
      "③ Softmax 정규화 없이는 Cross-Entropy Loss의 로그 항을 수학적으로 정의할 수 없기 때문",
      "④ Cross-Entropy 자체가 Softmax 내부 분모의 정규화 상수로 들어가는 구성 요소이기 때문"
    ],
    answer: 0,
    brief: "Softmax + Cross-Entropy 미분 시 $\\hat{p} - y$ 로 약분 → 역전파 계산 절약.",
    detailed: "Softmax의 분모에 전체 합이 들어가 각 클래스의 미분이 서로 얽히는데, Cross-Entropy와 조합해 체인룰을 적용하면 중간 항들이 마법처럼 약분돼 최종 Gradient가 $(\\hat{p} - y)$ 라는 단순한 차이로 떨어진다. 이 때문에 역전파가 매우 빠르고 수치적으로 안정적이며, 프레임워크들도 둘을 합친 `softmax_cross_entropy_with_logits` 같은 연산을 별도 제공한다. 이론적 동치(②)가 아니라 '쌍으로 썼을 때 미분이 예쁨'이 핵심.",
    source: "Week 3 § 14, 15-3"
  },

  // ── Week 4 (Q11~Q15) — Q13 주관식 ──
  // LOOP-TASK [3.27] ✅
  {
    id: "S5Q11",
    set: 5,
    week: 4,
    topic: "Elastic Net (L1+L2)",
    type: "multiple_choice",
    difficulty: "hard",
    question: "L1과 L2 정규화를 동시에 적용한 Elastic Net에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① L1의 Sparsity(일부 파라미터 0화)와 L2의 Shrinking(전체 크기 축소)을 모두 얻을 수 있으며, 상관관계가 높은 피처 그룹에서 L1 단독 사용 시 발생하는 '하나만 선택' 불안정성을 완화한다",
      "② L1과 L2는 목적 함수에 동시에 넣으면 Gradient가 상쇄되어 수학적으로 동시에 쓸 수 없는 상호 배타적 정규화다",
      "③ Elastic Net은 항상 L1·L2 단독 정규화보다 성능이 떨어지므로 실무에서는 순수 Lasso·Ridge가 표준으로 사용된다",
      "④ L1 + L2 결합은 항상 Ridge($\\lambda\\sum\\theta^2$)와 완전히 동일한 결과를 내며 Sparsity 효과가 전혀 발생하지 않는다"
    ],
    answer: 0,
    brief: "Elastic Net = L1 Sparsity + L2 Shrinking 혼합. 상관 피처 그룹에 유리.",
    detailed: "Elastic Net 목적식 $J + \\lambda_1 \\sum|\\theta_i| + \\lambda_2 \\sum\\theta_i^2$ 는 두 정규화의 장점을 결합한다. L1만 쓰면 상관관계 높은 피처 중 하나만 랜덤하게 선택되는 불안정성이 있는데, L2가 그룹핑 효과를 추가해 안정성을 높인다. 실무에서는 L1·L2 비율을 조절하는 하이퍼파라미터($\\alpha$)로 제어. Scikit-learn의 `ElasticNet`이 대표 구현.",
    source: "Week 4 § Part1-4 확장"
  },
  {
    id: "S5Q12",
    set: 5,
    week: 4,
    topic: "Bayes Rule 혼동 함정",
    type: "multiple_choice",
    difficulty: "hard",
    question: "베이즈 정리 활용 시 $P(y \\mid x)$와 $P(x \\mid y)$를 혼동할 때 발생하는 문제로 가장 적절한 것은?",
    choices: [
      "① 두 조건부 확률은 수학적으로 대칭적 관계라 항상 같은 값을 가지므로 수식에서 뒤바뀌어도 결과에 전혀 영향이 없다",
      "② Likelihood($P(x \\mid y)$)와 Posterior($P(y \\mid x)$)가 서로 다른 역할을 하기 때문에 뒤바뀌면 분류 결과가 완전히 왜곡된다",
      "③ 두 확률을 혼동해 식에 대입하면 Prior($P(y)$) 항이 분자·분모에서 자동으로 약분되어 사라져 클래스 사전 정보가 손실된다",
      "④ $P(y \\mid x)$와 $P(x \\mid y)$를 뒤바꾸는 순간 Evidence($P(x)$) 항이 음수가 되어 확률 공리에 위배되는 결과가 산출된다"
    ],
    answer: 1,
    brief: "$P(y|x)$와 $P(x|y)$는 다른 개념. 혼동 시 분자·분모 역할이 뒤섞여 결과가 왜곡.",
    detailed: "$P(y|x)$(Posterior)는 '데이터를 보고 클래스를 추론', $P(x|y)$(Likelihood)는 '특정 클래스에서 데이터가 관측될 확률'. 수학적으로 $P(y|x) = P(x|y) P(y) / P(x)$ 로 연결되지만 같은 값이 아니다. 베이즈 정리를 외울 때 위치를 틀리면 분류 규칙 자체가 반대로 작동할 수 있다. 교수님 비오는 날 예시에서 Prior·Likelihood·Posterior 구분이 이 문제를 피하는 핵심.",
    source: "Week 4 § Part2-3,4"
  },
  {
    id: "S5Q13",
    set: 5,
    week: 4,
    topic: "LDA 공분산 가정 선형 경계 서술",
    type: "multiple_choice",
    difficulty: "hard",
    question: "LDA에서 '모든 클래스의 공분산이 동일하다($\\Sigma_1 = \\Sigma_2 = \\Sigma$)'는 가정이 왜 결정 경계를 선형으로 만드는지 수식적 핵심을 가장 잘 설명한 것은?",
    choices: [
      "① 두 판별 함수 $g_1(x)$와 $g_2(x)$를 빼서 0으로 둘 때 공분산이 동일하면 $x^T \\Sigma^{-1} x$ 이차항이 양쪽에서 상쇄되어 $w^T x + b = 0$ 형태의 선형 방정식만 남기 때문",
      "② 가우시안 분포 자체가 원래부터 선형 경계를 유도하는 분포이므로 공분산 가정과 무관하게 LDA의 결정 경계는 항상 직선으로 결정된다",
      "③ 공분산이 동일하면 판별 함수의 이차항 계수가 정확히 1로 고정되어 방정식이 1차식과 수치적으로 동일한 형태로 간주되기 때문이다",
      "④ 베이즈 정리 자체가 선형 함수이기 때문에 공분산이 같다는 가정이 추가되면 자동으로 결정 경계가 1차 방정식 형태로 닫혀 버린다"
    ],
    answer: 0,
    brief: "두 클래스의 판별 함수를 빼면 이차항 $x^T \\Sigma^{-1} x$ 가 양쪽에서 동일하게 나와 상쇄 → 1차 방정식.",
    detailed: "가우시안 판별 함수 $g_k(x) = -\\frac{1}{2}(x - \\mu_k)^T \\Sigma_k^{-1}(x - \\mu_k) + \\dots$ 에서 $\\Sigma_1 = \\Sigma_2$ 이면 $(x - \\mu_k)^T \\Sigma^{-1}(x - \\mu_k)$ 를 전개했을 때 $x^T \\Sigma^{-1} x$ 라는 이차항이 두 클래스에서 동일하게 나타난다. $g_1(x) - g_2(x) = 0$ 으로 결정 경계를 찾을 때 이 공통 이차항이 완전히 상쇄되어 $w^T x + b = 0$ 의 선형 형태만 남는다. 만약 $\\Sigma_1 \\neq \\Sigma_2$(QDA)면 이차항이 살아남아 결정 경계가 곡선이 된다.",
    source: "Week 4 § Part4-3"
  },
  {
    id: "S5Q14",
    set: 5,
    week: 4,
    topic: "Naive Bayes 독립 가정 위반 예시",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Naive Bayes의 '조건부 독립 가정'이 현실과 가장 부합하지 **않는** 예시는?",
    choices: [
      "① 지리적으로 떨어진 서로 다른 공장에서 발생한 독립적 품질 불량 사건들 사이의 상관",
      "② 수학적으로 완전 독립인 공정 동전을 여러 번 던졌을 때 관측되는 앞·뒷면 결과의 연속",
      "③ 이미지 분류에서 바로 옆에 위치한 픽셀들의 값 (강한 공간적 상관성)",
      "④ 서로 다른 시점에 따로 굴린 개별 주사위들의 눈(값) 결과의 조합"
    ],
    answer: 2,
    brief: "이미지 픽셀은 공간적으로 인접할수록 매우 강한 상관 — Naive Bayes 독립 가정이 가장 크게 깨지는 전형적 사례.",
    detailed: "Naive Bayes는 '클래스가 주어지면 피처들이 서로 독립'이라 가정하지만, 이미지에서 바로 옆 픽셀은 색·밝기가 매우 유사(강한 공간적 상관)해 독립 가정이 심각히 위배된다. 교수님이 20×20 이미지(400차원) 예시로 지적한 포인트. 그럼에도 Naive Bayes는 실전에서 상당히 잘 작동해 '강한 가정을 깨도 Effective'하다고 표현된다. ①②④는 독립 가정이 현실적으로 합리적인 경우.",
    source: "Week 4 § Part3-2"
  },
  {
    id: "S5Q15",
    set: 5,
    week: 4,
    topic: "LDA 두 관점 동치성",
    type: "multiple_choice",
    difficulty: "hard",
    question: "LDA를 두 관점(확률론적 생성 모델 vs 기하학적 Fisher's LDA)으로 유도한 결과에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① 두 관점은 서로 다른 최종 투영 방향 $W$ 를 내놓아 LDA 이론 내부에 수학적 모순이 존재한다고 본다",
      "② 서로 다른 유도 경로를 거치지만 최종 $W \\propto \\Sigma^{-1}(\\mu_1 - \\mu_2)$ 동일한 형태로 수렴해 사실상 같은 결과에 도달한다",
      "③ 확률론적 관점만 실무에서 분류기로 사용되며, 기하학적 Fisher 관점은 이론적 호기심 수준의 유도에 지나지 않는다",
      "④ Fisher's LDA는 오직 차원 축소(투영) 전용 도구이므로 클래스 경계를 정하는 분류 작업에는 전혀 사용될 수 없다"
    ],
    answer: 1,
    brief: "두 접근 모두 $W \\propto \\Sigma^{-1}(\\mu_1 - \\mu_2)$ 로 귀결 — 동일 결과.",
    detailed: "확률론적 관점은 베이즈 정리 + 가우시안 가정으로, 기하학적 관점은 클래스 간 분산 최대·클래스 내 분산 최소 비율을 최대화하는 고유값 문제로 유도한다. 출발점이 완전히 다른데도 최종 투영 방향 $W$ 는 같은 식 $\\Sigma^{-1}(\\mu_1 - \\mu_2)$ 로 귀결된다. 이는 LDA가 생성 모델이자 동시에 차원 축소·분류 도구로 일관되게 작동할 수 있는 수학적 근거. 교수님이 강조한 '놀라운 일치' 포인트.",
    source: "Week 5 § 2 (LDA)"
  },

  // ── Week 5 (Q16~Q20) — Q19 주관식 ──
  // LOOP-TASK [3.28] ✅
  {
    id: "S5Q16",
    set: 5,
    week: 5,
    topic: "Random Forest Feature Randomness 효과",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Random Forest의 Feature Randomness(피처 무작위성)가 Bagging 대비 추가 성능 향상을 가져오는 근본 이유는?",
    choices: [
      "① 개별 트리 각각의 분류 정확도를 단독으로 극대화해 강한 Base Learner만 앙상블에 투입하기 때문",
      "② 트리들 간의 상관관계(Correlation)를 낮춰 앙상블의 Variance 감소 효과를 극대화하기 때문",
      "③ 분할마다 전체 피처를 고려하지 않아 훈련 시 계산량·메모리가 줄어드는 것이 유일한 실용적 장점이기 때문",
      "④ 각 트리가 Overfitting 상태에 의도적으로 도달하도록 유도해 강제로 다양성(Diversity)을 만들어내기 때문"
    ],
    answer: 1,
    brief: "피처 무작위 선택 → 트리들이 서로 덜 비슷함(낮은 상관) → 앙상블 Variance 감소 극대화.",
    detailed: "앙상블 Variance는 개별 모델 Variance / n 에 비례하되 모델 간 상관이 높으면 효과가 감소한다. 피처 무작위 서브셋(예: 전체 100개 중 10개)만 각 분할에서 고려하게 하면 같은 데이터여도 트리 구조가 크게 달라져 상관이 낮아지고 Variance 감소 효과가 커진다. 개별 트리의 정확도는 오히려 조금 낮아질 수 있지만 앙상블 전체 성능은 상승. Bagging + Feature Randomness가 RF의 핵심.",
    source: "Week 5 § 8-2"
  },
  {
    id: "S5Q17",
    set: 5,
    week: 5,
    topic: "Pre vs Post Pruning",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Decision Tree의 Pre-pruning과 Post-pruning의 차이로 가장 적절한 것은?",
    choices: [
      "① Pre-pruning은 트리 성장 도중 조기 차단(최대 깊이·최소 샘플 수 제한 등)하고, Post-pruning은 트리를 완전히 키운 뒤 평가 지표로 가지를 잘라내는 방식",
      "② Pre-pruning은 Classification Tree 전용 기법이고, Post-pruning은 Regression Tree 전용이라 두 작업 유형에 따라 배타적으로 쓰인다",
      "③ 두 방법은 이름만 다를 뿐 내부 알고리즘이 완전히 동일하며, 결과적으로 같은 모양의 Pruned Tree를 산출하는 동의어다",
      "④ Post-pruning은 Pre-pruning보다 반드시 복잡도가 높은 트리를 남기므로 일반화 성능이 항상 더 낮게 나타난다"
    ],
    answer: 0,
    brief: "Pre = 성장 단계 조기 차단. Post = 완성 후 가지 제거.",
    detailed: "Pre-pruning은 `max_depth`, `min_samples_split` 같은 제약으로 트리를 일정 수준까지만 성장시킨다. Post-pruning은 트리를 완전히 키운 뒤 Classification Error 같은 평가 지표로 가지 제거의 비용·이득을 비교해 덜 중요한 분기를 제거한다. 각각 장단점이 있어 상황에 따라 선택. ④는 거짓 — Post-pruning이 데이터 패턴에 더 맞춰진 가지치기를 할 수 있어 유리할 때가 많다.",
    source: "Week 5 § 5-2"
  },
  {
    id: "S5Q18",
    set: 5,
    week: 5,
    topic: "AdaBoost 두 종류 가중치",
    type: "multiple_choice",
    difficulty: "hard",
    question: "AdaBoost에서 등장하는 '데이터 샘플의 가중치 $w^{(i)}$'와 '분류기의 가중치 $\\alpha_j$'의 역할 차이로 가장 적절한 것은?",
    choices: [
      "① $w^{(i)}$는 다음 분류기 학습 시 해당 샘플에 얼마나 집중할지, $\\alpha_j$는 해당 분류기가 최종 앙상블 투표에서 얼마나 영향을 줄지를 결정하는 서로 다른 가중치다",
      "② 두 가중치는 기호만 다를 뿐 학습 과정 내부에서 완전히 동일한 값을 공유하는 같은 변수이다",
      "③ $w^{(i)}$는 AdaBoost에 존재하지 않고 Bagging·Gradient Boosting에서만 쓰이는 샘플링 가중치일 뿐이다",
      "④ $\\alpha_j$는 라운드·에러율과 무관하게 모든 분류기에 대해 1로 고정된 단순 상수로 정의된다"
    ],
    answer: 0,
    brief: "$w^{(i)}$ = 샘플별 집중도(라운드마다 갱신). $\\alpha_j$ = 분류기별 신뢰도(에러율에 따라 결정).",
    detailed: "AdaBoost는 두 층위의 가중치를 가진다. **데이터 가중치 $w^{(i)}$**: 라운드마다 이전 분류기가 틀린 샘플의 가중치를 증가시키고 맞춘 샘플은 감소. **분류기 가중치 $\\alpha_j$**: 분류기 $j$의 에러율이 낮을수록 큰 $\\alpha_j$ 가 주어져 최종 투표에서 발언권이 커진다 ($\\alpha_j = \\frac{1}{2}\\ln((1-\\epsilon_j)/\\epsilon_j)$). 둘은 서로 연관돼 있지만 다른 목적의 가중치다.",
    source: "Week 5 § 9-1"
  },
  {
    id: "S5Q19",
    set: 5,
    week: 5,
    topic: "AdaBoost α 계산",
    type: "short_answer",
    difficulty: "hard",
    question: "AdaBoost 학습 중 어떤 약한 분류기의 가중 에러율 $\\epsilon_j = 0.2$ 로 측정되었다. 이 분류기에 AdaBoost가 부여하는 **분류기 가중치** $\\alpha_j$의 값을 자연로그 기준으로 계산하시오. (소수점 셋째 자리까지)",
    answer: "0.693",
    answer_type: "number",
    tolerance: 0.01,
    brief: "$\\alpha = \\frac{1}{2}\\ln(0.8/0.2) = \\frac{1}{2}\\ln 4 \\approx 0.5 \\cdot 1.386 = 0.693$",
    detailed: "순서대로: ① $(1 - \\epsilon_j) / \\epsilon_j = 0.8/0.2 = 4$. ② $\\ln 4 = 2\\ln 2 \\approx 2 \\cdot 0.693 = 1.386$. ③ $\\alpha_j = 0.5 \\cdot 1.386 \\approx 0.693$. 에러율이 낮을수록(0에 가까울수록) $\\alpha$ 가 커지고, 에러율이 0.5에 가까우면 $\\alpha$ 가 0에 수렴한다. 에러율이 0.5를 넘으면 $\\alpha$ 가 음수가 되는데, 이는 '분류기 예측을 뒤집어 사용'하는 효과(ROC 하단 분류기와 같은 원리).",
    source: "Week 5 § 9-1"
  },
  {
    id: "S5Q20",
    set: 5,
    week: 5,
    topic: "앙상블 효과 성립 조건",
    type: "multiple_choice",
    difficulty: "medium",
    question: "앙상블이 개별 분류기보다 낮은 에러율을 가지기 위해 반드시 만족해야 하는 조건은?",
    choices: [
      "① 개별 분류기의 Base Error가 Random Guess 수준(0.5) 미만이어야 하고, 분류기들이 서로 어느 정도 독립적이어야 한다",
      "② 개별 분류기의 Base Error가 반드시 Random Guess 수준(0.5)보다 크게 나와야 다수결로 상쇄되어 앙상블 효과가 발생한다",
      "③ 앙상블에 포함된 모든 분류기가 서로 완전히 동일한 예측 벡터를 출력해야 다수결이 안정적으로 일치하게 된다",
      "④ 앙상블 분류기 개수가 반드시 2의 거듭제곱(예: 2·4·8·16)이어야 이항분포 계산이 닫힌 형태로 작동한다"
    ],
    answer: 0,
    brief: "두 조건: ε < 0.5(찍기보다 나음), 분류기 간 독립.",
    detailed: "앙상블 에러율은 이항분포 $P(\\text{errors} \\ge \\lceil n/2 \\rceil)$ 으로 계산되며, 이 값이 작으려면 개별 $\\epsilon < 0.5$ 이 필수다. 또한 분류기들이 완전히 같은 예측을 한다면 묶어도 개별과 동일(③ 함정). 현실에서 완전 독립은 어렵지만 Bagging·Feature Randomness·다른 Base Learner 조합 등으로 상관을 줄여 근사한다. $\\epsilon > 0.5$ 인 분류기는 오히려 예측을 뒤집어 쓰는 게 낫다.",
    source: "Week 5 § 7"
  },

  // ── Week 6 (Q21~Q25) — Q24 주관식 ──
  // LOOP-TASK [3.29] ✅
  {
    id: "S5Q21",
    set: 5,
    week: 6,
    topic: "SVM 예측 시 사용 데이터",
    type: "multiple_choice",
    difficulty: "medium",
    question: "학습이 끝난 SVM이 새로운 데이터를 예측할 때 실제 계산에 사용하는 데이터는?",
    choices: [
      "① 학습에 사용된 훈련 데이터 전체를 예측 시점마다 메모리에 유지하며 모두 다시 사용한다",
      "② 학습 과정에서 판별된 Support Vector들(경계에서 가장 가까운 일부 점들)만",
      "③ 훈련 데이터 각 클래스의 평균(Centroid)과 분산 두 통계량만 요약해 보관해서 사용한다",
      "④ 훈련 데이터에서 랜덤하게 샘플링된 10% 부분집합만을 예측 계산에 동원한다"
    ],
    answer: 1,
    brief: "학습 후에는 Support Vector만 남기고 나머지는 버려도 동일한 예측 가능.",
    detailed: "SVM의 Dual 문제에서 Lagrange multiplier $\\alpha_i > 0$ 인 데이터 포인트만이 Support Vector로 살아남고 나머지 샘플은 $\\alpha_i = 0$ 이 되어 결정 경계에 아무런 영향을 주지 않는다. 예측 함수 $f(x) = \\sum_i \\alpha_i y_i K(x_i, x) + b$ 에서도 Support Vector에 해당하는 항만 남으므로 계산량이 현저히 줄고 메모리도 절약된다. 이는 Non-parametric이라 전체 데이터가 필요한 KNN과 대비되는 SVM의 장점.",
    source: "Week 6 § 6-3"
  },
  {
    id: "S5Q22",
    set: 5,
    week: 6,
    topic: "RBF vs Polynomial Kernel",
    type: "multiple_choice",
    difficulty: "hard",
    question: "RBF(Gaussian) Kernel과 Polynomial Kernel의 차이로 가장 적절한 것은?",
    choices: [
      "① RBF는 두 점 사이의 거리에 기반한 유사도($\\exp(-\\gamma \\|x_i - x_j\\|^2)$)로 비선형 변환하고, Polynomial은 두 점의 내적을 거듭제곱한 형태($(x_i \\cdot x_j + c)^d$)로 다항 비선형 변환한다",
      "② RBF Kernel은 특징 공간이 지나치게 조밀해져 어떤 데이터셋에서도 Polynomial Kernel보다 성능이 낮게 측정된다",
      "③ Polynomial Kernel은 차수 $d$가 $d \\le 1$로 제한되어 있어 비선형 결정 경계 자체를 만들어낼 수 없다",
      "④ RBF Kernel은 Gaussian 가정상 오직 이진(Binary) 분류 문제에만 적용 가능하며 다중 클래스에는 쓸 수 없다"
    ],
    answer: 0,
    brief: "RBF = 거리 기반 유사도. Polynomial = 내적 거듭제곱. 유연성은 RBF가 크고 Polynomial은 차수 명시 필요.",
    detailed: "RBF는 이론상 무한 차원 특징 공간에 매핑한 효과를 내어 매우 복잡한 경계도 만들 수 있다. Polynomial은 차수 $d$를 명시해 $d$차 다항 결정 경계를 만들 수 있고 계산이 상대적으로 단순. 실무에서 기본값은 RBF지만 하이퍼파라미터($\\gamma, C$)가 많고 튜닝이 까다롭다. Polynomial은 이미지·텍스트 등에서 $d=2, 3$ 정도로 잘 작동하는 경우가 있다.",
    source: "Week 6 § 9-2"
  },
  {
    id: "S5Q23",
    set: 5,
    week: 6,
    topic: "Hard-margin 실전 한계",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Hard-margin SVM이 실전에서 거의 사용되지 않고 Soft-margin이 표준이 된 이유로 가장 적절한 것은?",
    choices: [
      "① 현실 데이터에는 노이즈와 아웃라이어가 있어 모든 샘플이 마진 바깥에 완벽히 위치해야 한다는 엄격한 조건($\\forall i: y_i(w^T x_i + b) \\ge 1$)을 만족할 수 없고, 소수 아웃라이어만 있어도 결정 경계가 극단적으로 휘어지기 때문",
      "② Hard-margin SVM의 이차계획(QP) 문제는 볼록성이 깨져 있어 수학적으로 Global Optimum이 원리상 존재하지 않기 때문",
      "③ Hard-margin은 모든 훈련 샘플에 대해 제약을 걸어 Soft-margin보다 계산량이 압도적으로 많아 대규모 데이터에서 비실용적이기 때문",
      "④ Hard-margin은 구조적으로 확률(Posterior) 출력을 전혀 산출할 수 없어 실무 해석에 치명적 제약이 있기 때문"
    ],
    answer: 0,
    brief: "아웃라이어 하나에도 경계가 왜곡되는 취약성 때문.",
    detailed: "Hard-margin은 모든 샘플을 마진 바깥에 완벽히 분류하기를 요구한다. 실제 데이터는 거의 항상 노이즈·아웃라이어가 있어 이 조건이 극단적으로 빡빡하다. 예컨대 단 1개의 아웃라이어 때문에 경계가 완전히 휘어지거나 아예 해가 존재하지 않을 수 있다. Soft-margin은 Slack $\\xi$ 와 C로 일정 오분류를 허용해 훨씬 유연하고 현실적이다.",
    source: "Week 6 § 8-1"
  },
  {
    id: "S5Q24",
    set: 5,
    week: 6,
    topic: "SVM C 서술",
    type: "multiple_choice",
    difficulty: "hard",
    question: "SVM의 하이퍼파라미터 $C$ 값이 마진(Margin) 크기와 오분류 허용 정도에 미치는 영향으로 가장 적절한 것은?",
    choices: [
      "① $C$가 클수록 오분류 페널티가 커져 모델이 엄격해지고 마진이 좁아지며, $C$가 작을수록 오분류를 허용해 마진이 넓어지는 반비례 관계다",
      "② $C$가 클수록 오분류를 폭넓게 허용해 마진이 넓어지고, $C$가 작을수록 오분류 페널티가 커져 마진이 좁아지는 정비례 관계다",
      "③ $C$는 SVM에서 사용하는 커널(Linear, RBF, Polynomial)의 종류만을 결정하는 파라미터이며, 마진 크기·오분류 허용과는 수학적으로 무관하다",
      "④ $C$는 사실 SVM의 경사하강 학습률(Learning Rate)을 의미하므로 마진이나 오분류 허용 정도와는 전혀 관련이 없는 파라미터다"
    ],
    answer: 0,
    brief: "C 크다 → 오분류 페널티 ↑ → 마진 좁음. C 작다 → 오분류 허용 → 마진 넓음.",
    detailed: "최적화 목적식 $\\min \\frac{1}{2}\\|w\\|^2 + C \\sum \\xi_i$ 에서 $C$는 '마진 최대화'와 '오분류 최소화' 사이의 트레이드오프 상수다. C가 크면 오분류($\\xi_i$) 비용이 커져 모델이 훈련 데이터를 엄격히 맞추려 해 마진이 좁아지고 Overfit 위험이 커진다. C가 작으면 모델이 일부 오분류를 감수하고 마진을 크게 벌려 일반화 성능이 오를 수 있지만 너무 작으면 Underfit. 교차 검증으로 최적 C를 찾는다. 시험 출제 1순위 포인트.",
    source: "Week 6 § 8-3"
  },
  {
    id: "S5Q25",
    set: 5,
    week: 6,
    topic: "SVM·Logistic 확신도 공통 원리",
    type: "multiple_choice",
    difficulty: "hard",
    question: "SVM과 Logistic Regression은 모두 '결정 경계에서 멀리 있을수록 확신도(Confidence)가 높다'는 공통 원리를 가진다. 이에 대한 설명으로 가장 적절한 것은?",
    choices: [
      "① SVM에서는 $|w^T x + b|$ 값이 클수록 마진(경계와의 거리)이 크고 확신이 높으며, Logistic Regression에서도 $|\\theta^T x|$ 값이 클수록 Sigmoid 출력이 0 또는 1에 가까워져 확신도가 커진다",
      "② SVM과 Logistic Regression은 마진 기반·확률 기반이라는 서로 완전히 다른 원리로 작동하므로 확신도 측면에서 어떠한 공통점도 존재하지 않는다",
      "③ 확신도(Confidence) 개념은 확률 출력을 갖는 Logistic Regression에만 존재하며, 거리 기반 분류기인 SVM에서는 정의 자체가 성립하지 않는다",
      "④ SVM에서 경계와의 거리 $|w^T x + b|$ 는 확신도와 무관한 단순 기하학적 수치에 불과해, 값이 커져도 예측에 대한 신뢰는 전혀 증가하지 않는다"
    ],
    answer: 0,
    brief: "두 모델 모두 $|\\theta^T x|$ 또는 $|w^T x + b|$ 가 클수록 확신이 커지는 동일 원리.",
    detailed: "교수님이 마진 개념을 설명하기 위해 Logistic Regression을 예로 들었던 이유가 여기 있다. Logistic Regression에서 $\\theta^T x$ 가 0이면 Sigmoid 출력이 0.5(50% 확신, 애매함)이고, 값이 2.5나 3처럼 크면 90% 이상 확신이 생긴다. SVM도 마찬가지로 $w^T x + b$ 의 절댓값(경계와의 거리)이 클수록 그 분류에 대한 확신이 크다고 해석된다. 이것이 SVM의 '마진 최대화 = 확신도 높은 분류기' 철학의 근거다.",
    source: "Week 6 § 5-2"
  },

  // ── Week 7 (Q26~Q30) — Q30 주관식 ──
  // LOOP-TASK [3.30] ✅
  {
    id: "S5Q26",
    set: 5,
    week: 7,
    topic: "Multi-class Confusion Matrix",
    type: "multiple_choice",
    difficulty: "medium",
    question: "클래스가 16개인 Multi-class 분류에서 Confusion Matrix를 사용하는 주된 이점은?",
    choices: [
      "① Confusion Matrix는 이진(2×2) 분류 전용 도구라서 클래스가 3개 이상인 Multi-class 상황에서는 아예 사용할 수 없다는 치명적 한계가 있다",
      "② 16×16 행렬로 '모델이 어떤 카테고리를 어떤 카테고리와 자주 혼동하는지'를 한눈에 시각화할 수 있어 Error Pattern 분석에 매우 유용하다",
      "③ Multi-class로 확장되는 순간 대각선 셀의 합산 정의가 불명확해져 Accuracy 계산 자체가 수학적으로 불가능해지는 중대한 단점이 생긴다",
      "④ Multi-class Confusion Matrix는 대각선(정답) 값이 항상 0으로 설정되어 오분류 패턴만 남는 구조로 되어 있어 정답률 파악에는 쓸모가 없다"
    ],
    answer: 1,
    brief: "N×N 행렬로 클래스 간 혼동 패턴(Error Pattern) 파악 가능 — 연구·디버깅에 유용.",
    detailed: "16×16 Confusion Matrix의 행은 실제 클래스, 열은 예측 클래스. 대각선 값은 정확히 맞힌 수, 비대각선은 혼동 패턴. 예컨대 '숫자 7을 자주 1로 혼동' 같은 경향이 셀 하나의 밝기로 즉시 드러나 모델 디버깅·데이터 증강 방향을 결정하는 데 매우 유용. ①④는 오답 — Confusion Matrix는 Multi-class에서도 동작하고 대각선은 정답 수라 일반적으로 가장 크다.",
    source: "Week 7 § 12"
  },
  {
    id: "S5Q27",
    set: 5,
    week: 7,
    topic: "SMOTE 한계",
    type: "multiple_choice",
    difficulty: "hard",
    question: "SMOTE(Synthetic Minority Over-sampling Technique)의 잠재적 단점으로 가장 적절한 것은?",
    choices: [
      "① SMOTE는 이론적으로나 실험적으로나 단순 복사(Duplication) Oversampling보다 항상 일반화 성능이 낮아 실무에서 선호되지 않는다",
      "② 두 소수 클래스 포인트 사이를 보간하므로 합성 샘플이 실제 데이터 분포를 벗어나거나 노이즈를 증폭해 오히려 일반화를 해칠 수 있다",
      "③ SMOTE는 라벨이 없는 데이터에서만 동작하는 비지도 클러스터링 기법이라 지도학습(Supervised Learning) 파이프라인에는 사용할 수 없다",
      "④ SMOTE는 연속 값 예측을 위한 회귀(Regression) 문제 전용이라 이진·다중 클래스 분류 과제에는 원천적으로 적용이 불가능한 기법이다"
    ],
    answer: 1,
    brief: "보간 샘플이 실제 분포와 괴리되거나 노이즈를 증폭하면 성능 저하 가능.",
    detailed: "SMOTE는 소수 클래스의 두 실제 포인트 사이를 선형 보간한다. 그런데 소수 클래스 분포가 불규칙하거나 두 포인트 사이에 다른 클래스 영역이 끼어 있으면 합성 샘플이 잘못된 영역에 생성된다. 또 아웃라이어 근처에서 보간하면 노이즈가 증폭돼 Classifier를 헷갈리게 만든다. 이 때문에 Borderline-SMOTE, ADASYN 같은 개선 변형이 제안됐다. 단순 복사(② 오답 아님, ①은 틀림)보다 대체로 낫지만 만능은 아니다.",
    source: "Week 7 § 13-2"
  },
  {
    id: "S5Q28",
    set: 5,
    week: 7,
    topic: "Correlation vs Causation 응용",
    type: "multiple_choice",
    difficulty: "medium",
    question: "'Correlation is not Causation' 원리의 응용으로 가장 적절한 주의사항은?",
    choices: [
      "① 두 변수 간 Pearson 상관계수가 0으로 측정되면 선형·비선형을 막론하고 두 변수는 반드시 완벽히 통계적 독립 관계에 있다고 단정할 수 있다",
      "② 두 변수 간 상관계수가 0.9처럼 매우 높아도 한쪽이 다른 쪽의 원인이라고 단정해서는 안 되며, 교란 변수(Confounder)나 제3의 공통 원인이 개입했을 가능성을 검토해야 한다",
      "③ 관측 데이터에서 높은 상관관계가 확인되면 이는 언제나 한쪽이 다른 쪽의 원인이라는 인과관계를 직접적으로 의미한다고 받아들여도 무방하다",
      "④ 변수 간 인과관계 증명에는 실험 설계 없이 관측 데이터에 대한 단순 회귀 분석을 한 차례 수행하는 것만으로 충분하다"
    ],
    answer: 1,
    brief: "높은 상관 ≠ 인과. 교란 변수·공통 원인 검토 필수.",
    detailed: "교수님 커피·수명 예시: 상관이 관찰돼도 실제 원인이 다른 변수(건강에 신경 쓰는 라이프스타일 등)일 수 있다. 인과관계 주장엔 Randomized Controlled Trial(RCT)이나 Instrumental Variable 같은 실험·통계적 설계가 필요. ① 상관계수 0은 '선형 관계 없음'만 보장하며 비선형 관계는 있을 수 있다. ③④는 명백한 오류.",
    source: "Week 7 § 14"
  },
  {
    id: "S5Q29",
    set: 5,
    week: 7,
    topic: "Threshold 이동 효과",
    type: "multiple_choice",
    difficulty: "medium",
    question: "분류기의 Threshold(임계값)를 오른쪽(더 엄격한 Positive 판정, 즉 큰 값에서만 Positive로 예측)으로 이동시켰을 때 지표 변화로 가장 적절한 것은?",
    choices: [
      "① Threshold를 엄격화하면 TP(True Positive)가 증가함과 동시에 FP(False Positive)도 함께 증가해 두 지표가 같은 방향으로 움직인다",
      "② Threshold를 오른쪽으로 옮길수록 Precision이 감소하고 Recall이 증가하는 방향의 Trade-off가 발생한다",
      "③ Precision이 증가하고 Recall이 감소한다 (FN은 늘어나지만 FP는 줄어든다)",
      "④ Precision과 Recall은 Threshold 위치와 무관하게 모델이 학습한 파라미터에 의해서만 결정되므로 값이 일정하게 유지된다"
    ],
    answer: 2,
    brief: "엄격 Threshold → FP↓·FN↑ → Precision↑·Recall↓. 반비례 확인.",
    detailed: "Threshold를 높이면(엄격): 모델이 확신이 큰 경우에만 Positive를 판정 → FP(잘못된 Positive)가 줄어 $P = TP/(TP+FP)$ 의 Precision이 오른다. 반면 놓치는 실제 Positive가 늘어나 FN 증가 → $R = TP/(TP+FN)$ 의 Recall은 떨어진다. 이 반비례가 ROC Curve·PR Curve 상의 Trade-off를 만들어낸다. ①은 엄격해지면 FP가 줄어야 하므로 오답.",
    source: "Week 7 § 9"
  },
  {
    id: "S5Q30",
    set: 5,
    week: 7,
    topic: "Lazy Classifier MCC",
    type: "multiple_choice",
    difficulty: "hard",
    question: "총 100명 중 98명이 음성(Negative), 2명이 양성(Positive)인 데이터에서 모든 샘플을 무조건 '음성'으로만 예측하는 Lazy Classifier의 MCC 값은? (Confusion Matrix: TP=0, TN=98, FP=0, FN=2)",
    choices: [
      "① -1.00",
      "② 0.00",
      "③ 0.49",
      "④ 0.98"
    ],
    answer: 1,
    brief: "분모 $\\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)} = \\sqrt{0 \\cdot 2 \\cdot 98 \\cdot 100} = 0$ → 관례상 MCC = 0.00.",
    detailed: "분자 $= TP \\cdot TN - FP \\cdot FN = 0 \\cdot 98 - 0 \\cdot 2 = 0$. 분모 $= \\sqrt{(0+0)(0+2)(98+0)(98+2)} = \\sqrt{0 \\cdot 2 \\cdot 98 \\cdot 100} = 0$. $0/0$은 정의되지 않지만 MCC는 관례상 분모가 0일 때 **0**으로 처리한다. Accuracy로 보면 $98/100 = 98\\%$로 훌륭해 보이지만 MCC는 0으로 'Random Guess 수준임'이 명확히 드러난다. 이것이 Class Imbalance에서 Accuracy 대신 MCC를 쓰는 결정적 근거.",
    source: "Week 7 § 7-8"
  },
];

// ═══════════════════════════════════════════════════════════════
// 집계 API
// ═══════════════════════════════════════════════════════════════
export const ALL_SETS = [set1, set2, set3, set4, set5];
export const ALL_QUESTIONS = ALL_SETS.flat();

export function getSetQuestions(setId) {
  return ALL_SETS[setId - 1] || [];
}

export function getQuestionById(qid) {
  return ALL_QUESTIONS.find(q => q.id === qid);
}

export function getWeekCount(setId) {
  const counts = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  getSetQuestions(setId).forEach(q => { counts[q.week]++; });
  return counts;
}
