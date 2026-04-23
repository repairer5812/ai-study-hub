// slide-map.js — md 섹션별 맥락 슬라이드 매핑
//
// 구조
// SLIDE_MAP[subjectId][noteSlug] = {
//   "섹션 제목 또는 매칭 키워드": ["파일명1.jpg", "파일명2.jpg", ...],
//   ...
// }
//
// review.js가 md 렌더 후 각 H2/H3 제목을 훑어 키워드 포함 여부로 매핑을 찾고,
// 해당 섹션 바로 아래에 이미지 그리드를 삽입한다.
//
// 키워드 매칭 규칙 (review.js side)
// - 섹션 제목의 영숫자·한글만 추출한 정규화 문자열과 키를 서로 포함하는지(substring)
// - 첫 매칭된 키만 사용 (중복 방지)
// - 키 앞에 "^" 붙이면 정확 일치
//
// 큐레이션은 .slide-curation/ 폴더의 state.json 기반으로 점진 진행.
// 비어 있는 과목·주차는 맥락 삽입 없이 기존 <details> 갤러리만 표시됨.

export const SLIDE_MAP = {
  ds: {
    // ──────────────────────────────────────────────────────
    // 5차시 연결 리스트 (53p 중 14장 선별, 26% 채택) 🌟 시험 8문제 예고
    // ──────────────────────────────────────────────────────
    "5차시_연결_리스트_단순_원형_이중": {
      "1. (복습) 정적(Static) vs 동적(Dynamic) 구현": ["ds_w5_p12.jpg"],
      "3. 단순 연결 리스트 (Singular Linked List)": ["ds_w5_p17.jpg", "ds_w5_p18.jpg"],
      "3.2 💡 [출제 포인트] 삽입 연산의 3가지 경우": ["ds_w5_p25.jpg"],
      "3.3 💡 [출제 포인트] 삽입 시 연결 순서": ["ds_w5_p20.jpg", "ds_w5_p26.jpg"],
      "3.4 💡 [출제 포인트] 삭제 연산": ["ds_w5_p21.jpg", "ds_w5_p29.jpg"],
      "3.5 기타 연산": ["ds_w5_p34.jpg"],
      "4.1 도입 배경 및 특징": ["ds_w5_p35.jpg"],
      "4.2 원형 연결 리스트의 삽입": ["ds_w5_p37.jpg"],
      "5.1 도입 배경 및 특징": ["ds_w5_p38.jpg", "ds_w5_p39.jpg"],
      "5.2 💡 [핵심 출제 포인트] 삽입 연산 포인터 연결 순서": ["ds_w5_p40.jpg"],
      "5.3 💡 [핵심 출제 포인트] 삭제 연산 포인터 연결": ["ds_w5_p41.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 1차시 OT (19p 중 2장 선별, 11% 채택) — OT라 최소 큐레이션
    // ──────────────────────────────────────────────────────
    "1차시_과목_오리엔테이션_및_자료구조_전체_숲보기": {
      "0-1. 수업 분위기": ["ds_w1_p05.jpg"],
      "2. 📌 데이터의 특성과 관계 (Relation)": ["ds_w1_p09.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 4차시 리스트 ADT와 정적 구현 (47p 중 9장 선별, 19% 채택)
    // 교수님 강조: 데이터 Shift 방향 (뒤에서부터 역순)
    // ──────────────────────────────────────────────────────
    "4차시_리스트_ADT와_정적_구현": {
      "1.3 정적 vs 동적 한눈에 비교": ["ds_w4_p36.jpg"],
      "2.1 포인터 (Pointer)": ["ds_w4_p20.jpg"],
      "2.2 배열과 포인터의 관계": ["ds_w4_p07.jpg"],
      "2.4 구조체(Structure)와 자기참조 구조체": ["ds_w4_p30.jpg"],
      "5.1 리스트의 주요 연산 (Operations)": ["ds_w4_p33.jpg"],
      "6. 💡 [시험 출제 포인트] 정적 리스트(배열)의 삽입·삭제 메커니즘": ["ds_w4_p37.jpg"],
      "6.1 삽입 연산": ["ds_w4_p39.jpg"],
      "6.2 삭제 연산": ["ds_w4_p40.jpg"],
      "7. 파이썬 리스트의 내부 동작": ["ds_w4_p41.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 3차시 순환 vs 반복 + 알고리즘 설계 기법 (37p 중 9장 선별, 24% 채택)
    // 교수님 예고: 순환 수도코드 결과값 문제 (팩토리얼/피보나치/이진검색)
    // ──────────────────────────────────────────────────────
    "3차시_순환_vs_반복과_알고리즘_설계_기법": {
      "2.1 순환의 필수 구성 (Termination Condition)": ["ds_w3_p09.jpg"],
      "5.1 팩토리얼 (Factorial, n!)": ["ds_w3_p10.jpg"],
      "5.2 피보나치 수열 (Fibonacci)": ["ds_w3_p13.jpg"],
      "5.3 이진 검색 (Binary Search)": ["ds_w3_p17.jpg", "ds_w3_p19.jpg"],
      "5.4 🎯 3대 알고리즘 총정리표": ["ds_w3_p24.jpg", "ds_w3_p25.jpg"],
      "Recursion vs Iteration 전격 비교": ["ds_w3_p05.jpg"],
      "9. 다양한 알고리즘 설계 기법 (Slide 36)": ["ds_w3_p36.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 2차시 알고리즘 기초와 성능 분석 (36p 중 9장 선별, 25% 채택) 🌟 빅오 100% 출제
    // ──────────────────────────────────────────────────────
    "2차시_알고리즘_기초와_성능_분석": {
      "1.2 자료구조의 분류": ["ds_w2_p02.jpg"],
      "2.3 알고리즘의 기술 방법": ["ds_w2_p11.jpg"],
      "3.2 ADT의 구성 요소": ["ds_w2_p17.jpg"],
      "5.2 연산 횟수 계산 예시": ["ds_w2_p21.jpg"],
      "5.3 알고리즘 간의 성능 비교": ["ds_w2_p23.jpg"],
      "6.1 💡 [시험 출제 100%] 빅오 표기법": ["ds_w2_p26.jpg"],
      "6.2 빅 오메가": ["ds_w2_p29.jpg"],
      "6.3 빅오 표기법의 종류 및 실행 시간 비교": ["ds_w2_p27.jpg"],
      "8. 최선, 평균, 최악의 경우": ["ds_w2_p32.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 7차시 큐·데크·우선순위 큐 (45p 중 12장 선별, 27% 채택) 🌟 족집게 3가지
    // ──────────────────────────────────────────────────────
    "7차시_큐_데크_우선순위_큐": {
      "1.1 큐(Queue)의 기본 정의": ["ds_w7_p05.jpg"],
      "2.1 선형 큐의 동작 메커니즘": ["ds_w7_p09.jpg"],
      "3.1 원형 큐의 핵심 개념": ["ds_w7_p14.jpg"],
      "3.2 💡 원형 큐의 초기 설정 및 상태 조건": ["ds_w7_p17.jpg", "ds_w7_p18.jpg"],
      "3.3 원형 큐의 연산 과정": ["ds_w7_p15.jpg"],
      "4.1 동적 큐의 기본 구조": ["ds_w7_p25.jpg"],
      "4.2 삽입 (Enqueue) 연산 메커니즘": ["ds_w7_p26.jpg"],
      "5.1 데크의 개념": ["ds_w7_p35.jpg"],
      "5.3 💡 [Q&A 하이라이트]": ["ds_w7_p39.jpg"],
      "6.1 우선순위 큐의 핵심 개념": ["ds_w7_p42.jpg"],
      "6.3 💡 [시험 출제 포인트] 우선순위 큐의 구현 방법": ["ds_w7_p43.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 6차시 스택·수식의 계산 (57p 중 15장 선별, 26% 채택) 🌟 시험 3문제 예고
    // ──────────────────────────────────────────────────────
    "6차시_스택과_수식의_계산": {
      "1.1 스택 (Stack)": ["ds_w6_p10.jpg"],
      "3.1 💡 [핵심 출제] 스택의 정적 구현": ["ds_w6_p13.jpg", "ds_w6_p14.jpg", "ds_w6_p15.jpg"],
      "3.2 스택의 동적 구현": ["ds_w6_p21.jpg", "ds_w6_p23.jpg", "ds_w6_p24.jpg"],
      "5. 💡 수식 계산 1단계": ["ds_w6_p36.jpg"],
      "6. 💡 수식 계산 2단계": ["ds_w6_p39.jpg", "ds_w6_p40.jpg", "ds_w6_p41.jpg"],
      "6.2 연산자 우선순위 비교 (icp vs isp)": ["ds_w6_p43.jpg", "ds_w6_p32.jpg", "ds_w6_p44.jpg"],
      "7.3 계산 예시 추적": ["ds_w6_p48.jpg"],
    },
  },
  dl: {
    // ──────────────────────────────────────────────────────
    // 5주차 CNN (58p/2-up 113슬라이드 중 15장 선별, 26% 채택) 🌟 시스템 설계형 시험
    // 핵심 메커니즘 + 정상급 아키텍처(LeNet/AlexNet/VGG/GoogLeNet/ResNet/DenseNet/SENet/U-Net) 중심 선별
    // ──────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────
    // 2주차 ML Overview (31p 중 9장 선별, 29% 채택) — ML vs DL 비교
    // ──────────────────────────────────────────────────────
    "2주차_인공지능과_기계학습의_기초": {
      "2. 💻 전통적 프로그래밍 vs 기계학습 (Traditional Programming vs. ML)": ["dl_overview_p04.jpg"],
      "5. 🗂️ 기계학습의 종류 및 모델": ["dl_overview_p06.jpg"],
      "5.1. Supervised Learning (지도 학습)": ["dl_overview_p07.jpg"],
      "6. 📈 다항식 곡선 피팅 (Polynomial Curve Fitting) 예제": ["dl_overview_p08.jpg"],
      "7. 📉 손실 함수 (Loss Function / Error Function)": ["dl_overview_p09.jpg"],
      "8. 🧩 모델의 복잡도와 오버피팅 (Model Complexity & Overfitting)": ["dl_overview_p10.jpg", "dl_overview_p11.jpg"],
      "9. 🛡️ 오버피팅을 해결하는 방법 (Regularization)": ["dl_overview_p13.jpg"],
      "10. 🧱 기저 함수 (Linear Basis Function Models)": ["dl_overview_p16.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 3주차 FNN/DNN (FNN 42p + DNN 19p = 61p 중 16장 선별, 26% 채택)
    // Vanishing Gradient·ReLU·Auto-Encoder·Dropout·Adam 계보 집중
    // ──────────────────────────────────────────────────────
    "3주차_인공신경망의_기초와_딥러닝의_발전": {
      "💡 [핵심 출제 포인트] SVM vs. Neural Network의 차이점": ["dl_fnn_p07.jpg"],
      "2. 🔬 생물학적 뉴런의 모델링": ["dl_fnn_p02.jpg"],
      "3. 🚪 Perceptron (퍼셉트론, 1958)": ["dl_fnn_p03.jpg"],
      "4. 📈 Activation Function의 역사적 변천사": ["dl_fnn_p05.jpg"],
      "5. 🥞 Multi-Layer Perceptron (MLP)와 Hidden Layer": ["dl_fnn_p08.jpg"],
      "7. 🧮 Parameter Optimization & Gradient Descent (파라미터 최적화)": ["dl_fnn_p12.jpg"],
      "8. 📦 Data Batching Strategies (데이터 학습 단위)": ["dl_fnn_p14.jpg"],
      "9. 🔙 Backpropagation (오차 역전파 알고리즘)": ["dl_fnn_p17.jpg"],
      "11. 🌌 Universal Approximation Theorem과 Deep Architecture": ["dl_dnn_p03.jpg"],
      "12. ⚠️ 딥러닝의 3가지 난제와 Vanishing Gradient (기울기 소실)": ["dl_dnn_p05.jpg"],
      "13. 🛠️ 한계 극복 1: Greedy Layer-wise Pre-training과 Auto-Encoder": ["dl_dnn_p07.jpg"],
      "14. 🛠️ 한계 극복 2: ReLU 활성화 함수의 도입": ["dl_dnn_p11.jpg"],
      "15. 🧰 딥러닝 필수 테크닉 (Tricks of the Trade)": ["dl_dnn_p12.jpg"],
      "16. 🧭 방향성을 개선하는 방법 (Momentum 계열)": ["dl_dnn_p15.jpg"],
      "17. 📏 스텝 사이즈(학습률)를 조절하는 방법 (Ada 계열)": ["dl_dnn_p16.jpg"],
      "18. 👑 최적화 알고리즘의 끝판왕: Adam": ["dl_dnn_p19.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 7주차 RNN (42p 중 11장 선별, 26% 채택) 🌟 교수님 오픈 질문 (시계열 CNN, CNN+RNN)
    // ──────────────────────────────────────────────────────
    "7주차_RNN_Recurrent_Neural_Networks": {
      "1. RNN (Recurrent Neural Network)의 기본 개념": ["dl_rnn_p01.jpg"],
      "2. DNN vs CNN vs RNN 전격 비교": ["dl_rnn_p02.jpg"],
      "4. RNN의 다양한 아키텍처 (입출력 구조)": ["dl_rnn_p03.jpg"],
      "5. RNN의 내부 연산과 함수 (Computational Graph)": ["dl_rnn_p07.jpg"],
      "6. 구체적 예시: Character-Level Language Model": ["dl_rnn_p14.jpg"],
      "8. Word-Level 언어 모델 학습 및 Loss 계산": ["dl_rnn_p10.jpg"],
      "9. BPTT (Backpropagation Through Time)와 Truncated BPTT": ["dl_rnn_p20.jpg", "dl_rnn_p21.jpg"],
      "11. 심화 구조: Bi-directional RNN & Deep RNN": ["dl_rnn_p31.jpg"],
      "12. RNN의 다양한 실제 응용 사례 (Applications)": ["dl_rnn_p32.jpg"],
      "13. Image Captioning 심화 (CNN + RNN의 융합)": ["dl_rnn_p35.jpg"],
      "14. ⚠️ RNN의 치명적인 단점과 최신 동향": ["dl_lstm_gru_p06.jpg", "dl_lstm_gru_p10.jpg", "dl_lstm_gru_p17.jpg"],
    },
    "5주차_CNN_Convolutional_Neural_Networks": {
      "2.1. Local Receptive Fields (국소 수용 영역)": ["dl_cnn_p03.jpg"],
      "2.3. Subsampling (Pooling)": ["dl_cnn_p05.jpg", "dl_cnn_p07.jpg"],
      "3.1. 기본 구성 블록": ["dl_cnn_p08.jpg"],
      "3.2. 분류(Classification)를 위한 마무리": ["dl_cnn_p10.jpg"],
      "4.1. LeNet (1998)": ["dl_cnn_p11.jpg"],
      "6.1. AlexNet (2012)": ["dl_cnn_p15.jpg"],
      "6.2. VGGNet (2015)": ["dl_cnn_p17.jpg"],
      "6.3. GoogLeNet / Inception (2015)": ["dl_cnn_p18.jpg", "dl_cnn_p19.jpg"],
      "7.2. Shortcut Connection (Skip/Highway Connection)": ["dl_cnn_p25.jpg"],
      "7.3. Bottleneck Design (병목 구조)": ["dl_cnn_p27.jpg"],
      "8. 🧱 DenseNet (Densely Connected Convolutional Networks)": ["dl_cnn_p33.jpg"],
      "9. 🎯 Attention 메커니즘의 도입: SENet": ["dl_cnn_p41.jpg"],
      "11. 🧬 U-Net": ["dl_cnn_p51.jpg"],
    },
  },
  ml: {
    // ──────────────────────────────────────────────────────
    // 3주차 선형회귀·로지스틱·GLM (Disc-1 56p 중 17장 선별, 30% 채택)
    // 선형회귀→GD→Normal Eq→MLE→Sigmoid→Softmax→Cross-Entropy
    // Disc-2 앞 55p는 Disc-1과 완전 동일(중복 제외), 뒷부분 Regularization은 W4에서 처리
    // ──────────────────────────────────────────────────────
    // ──────────────────────────────────────────────────────
    // 5주차 KNN·Tree·Ensemble (59p 중 14장 선별, 24% 채택)
    // Parametric vs Non-param → KNN → Decision Tree → Impurity → Ensemble(Bagging/RF/AdaBoost)
    // ──────────────────────────────────────────────────────
    "5주차_KNN_Tree_Ensemble": {
      "3. 파라메트릭(Parametric) 모델 vs 논파라메트릭(Non-Parametric) 모델": ["ml_w5_p03.jpg"],
      "4.1 기본 컨셉": ["ml_w5_p04.jpg"],
      "4.3 K값과 결정 경계 (Decision Boundary)": ["ml_w5_p15.jpg"],
      "5.1 기본 컨셉": ["ml_w5_p16.jpg"],
      "5.3 Information Gain (정보 획득량)과 Impurity (불순도)": ["ml_w5_p17.jpg"],
      "5.2 Overfitting과 Pruning (가지치기)": ["ml_w5_p19.jpg"],
      "5.4 세 가지 Impurity 계산 방식 (매우 중요)": ["ml_w5_p26.jpg", "ml_w5_p29.jpg"],
      "6. Decision Tree의 한계와 앙상블(Ensemble)의 등장": ["ml_w5_p34.jpg"],
      "7.1 앙상블은 왜 성능이 더 좋을까?": ["ml_w5_p41.jpg"],
      "8.1 배깅 (Bagging = Bootstrap Aggregating)": ["ml_w5_p42.jpg"],
      "8.2 랜덤 포레스트 (Random Forest)": ["ml_w5_p44.jpg"],
      "9. 부스팅 (Boosting) 과 AdaBoost": ["ml_w5_p49.jpg"],
      "9.1 AdaBoost (Adaptive Boosting) 알고리즘 스텝": ["ml_w5_p53.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 4주차 정규화·나이브베이즈·LDA (Generative-2 67p 중 11장 + Disc-2 Regularization 4장 = 15장, 22%)
    // Part 1 Regularization은 Disc-2 PDF의 뒤 10p에서 (w3b)
    // Part 2 Bayes / Part 3 NB / Part 4 LDA는 Generative-2 PDF에서 (w4)
    // ──────────────────────────────────────────────────────
    "4주차_정규화_나이브베이즈_LDA": {
      "3. 정규화 기법 (Regularization)": ["ml_w3b_p59.jpg"],
      "4. L1 vs L2 정규화": ["ml_w3b_p61.jpg", "ml_w3b_p62.jpg", "ml_w3b_p64.jpg"],
      "1. 판별 모델 (Discriminative Models) vs 생성 모델": ["ml_w4_p02.jpg", "ml_w4_p09.jpg"],
      "4. 🗣️ 베이즈 정리의 직관적 이해": ["ml_w4_p10.jpg"],
      "2. 💡 나이브 베이즈의 아주 강력한 가정": ["ml_w4_p14.jpg"],
      "4. 구체적인 예시: 스팸 메일 분류": ["ml_w4_p16.jpg"],
      "5. 피처(Feature) 타입에 따른 나이브 베이즈의 확장": ["ml_w4_p29.jpg"],
      "2. 확률적/생성 모델 관점에서의 LDA": ["ml_w4_p34.jpg", "ml_w4_p37.jpg", "ml_w4_p38.jpg"],
      "1. LDA의 두 가지 접근 방법": ["ml_w4_p46.jpg", "ml_w4_p47.jpg"],
    },
    "3주차_선형회귀_로지스틱_GLM": {
      "1.1. 지도학습의 목표": ["ml_w3a_p02.jpg"],
      "3.1. 수식 정의": ["ml_w3a_p05.jpg"],
      "4.1. Residual (잔차)": ["ml_w3a_p07.jpg"],
      "4.2. Least Mean Squares": ["ml_w3a_p09.jpg"],
      "5.2. 그래디언트(Gradient)와 이동 방향": ["ml_w3a_p14.jpg"],
      "6.1. 왜 한 번에 찾을 수 있을까?": ["ml_w3a_p18.jpg"],
      "6.2. 행렬(Matrix) 표기법 도입": ["ml_w3a_p20.jpg"],
      "6.3. Normal Equation (정규 방정식) 도출 과정": ["ml_w3a_p22.jpg"],
      "7.1. 노이즈(Noise)의 도입과 정규분포 가정": ["ml_w3a_p23.jpg"],
      "7.4. Maximum Likelihood Estimation": ["ml_w3a_p28.jpg"],
      "8.1. Regression vs Classification": ["ml_w3a_p30.jpg"],
      "9.1. Sigmoid Function": ["ml_w3a_p32.jpg"],
      "11.2. 미분 전개와 놀라운 결과": ["ml_w3a_p38.jpg"],
      "13. Multiclass Classification": ["ml_w3a_p40.jpg"],
      "14. Softmax Function": ["ml_w3a_p42.jpg"],
      "14.1. Softmax의 3가지 핵심 역할": ["ml_w3a_p43.jpg"],
      "15. Cross-Entropy Loss": ["ml_w3a_p46.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 2주차 기초·학습법·일반화 (56p 중 18장 선별, 32% 채택)
    // 커버 범위가 넓음: 전문가 시스템→3대 학습→CV→과적합→Double Descent→OOD
    // ──────────────────────────────────────────────────────
    "2주차_기초_학습법_일반화": {
      "1-2. 전문가 시스템": ["ml_w2_p04.jpg"],
      "1-3. 머신러닝 (Machine Learning)": ["ml_w2_p06.jpg"],
      "2. 머신러닝의 3가지 핵심 요소": ["ml_w2_p07.jpg"],
      "3-1. 지도 학습 (Supervised Learning)": ["ml_w2_p10.jpg", "ml_w2_p11.jpg"],
      "3-2. 비지도 학습 (Unsupervised Learning)": ["ml_w2_p13.jpg", "ml_w2_p14.jpg"],
      "3-3. 강화 학습 (Reinforcement Learning)": ["ml_w2_p15.jpg"],
      "4-2. 데이터 분할 (Data Split)": ["ml_w2_p19.jpg"],
      "5-1. K-fold Cross-Validation": ["ml_w2_p20.jpg"],
      "5-2. Leave-one-out Cross-Validation": ["ml_w2_p21.jpg"],
      "5-3. 💡 Stratified K-fold Cross-Validation": ["ml_w2_p22.jpg"],
      "6. 과소적합(Underfitting) vs 과적합(Overfitting)": ["ml_w2_p23.jpg", "ml_w2_p26.jpg"],
      "6-3. Bias-Variance Tradeoff": ["ml_w2_p27.jpg"],
      "6-4. 💡 최신 연구 동향: Deep Double Descent": ["ml_w2_p31.jpg"],
      "7-1. 데이터 분포의 중요성": ["ml_w2_p33.jpg"],
      "7-2. 💡 지름길 학습 (Shortcut Learning)": ["ml_w2_p34.jpg"],
    },
    // ──────────────────────────────────────────────────────
    // 7주차 평가지표·ROC (49p 중 11장 선별, 22% 채택)
    // ──────────────────────────────────────────────────────
    "7주차_평가지표_ROC": {
      "4. 💡 Confusion Matrix (혼동 행렬)": ["ml_w7_p06.jpg"],
      "5. 📈 모델 평가 지표 (Evaluation Metrics)": ["ml_w7_p12.jpg"],
      "6. 🏥 예시를 통한 지표의 한계 이해 (임신 진단 예시)": ["ml_w7_p16.jpg", "ml_w7_p17.jpg"],
      "7. ⚖️ 💡 데이터 불균형(Class Imbalance) 문제와 Accuracy의 함정": ["ml_w7_p19.jpg"],
      "8. 🧮 MCC (Matthews Correlation Coefficient)": ["ml_w7_p21.jpg"],
      "9. 🎚️ 임계값(Threshold) 조정과 Signal Detection Theory": ["ml_w7_p23.jpg"],
      "10. 📉 💡 ROC Curve": ["ml_w7_p24.jpg", "ml_w7_p26.jpg"],
      "11. 📐 AUC (Area Under the Curve)": ["ml_w7_p27.jpg"],
      "13. 🏋️‍♂️ 모델 훈련(Training) 시 클래스 불균형 문제와 해결책": ["ml_w7_p30.jpg"],
    },
  },
};

// 주차가 이 목록에 있으면 맨 아래 "강의 슬라이드" <details> 갤러리를 숨김 (맥락 삽입이 완성된 주차).
export const CURATED_SLUGS = new Set([
  "5차시_연결_리스트_단순_원형_이중",
  "6차시_스택과_수식의_계산",
  "7차시_큐_데크_우선순위_큐",
  "2차시_알고리즘_기초와_성능_분석",
  "3차시_순환_vs_반복과_알고리즘_설계_기법",
  "4차시_리스트_ADT와_정적_구현",
  "1차시_과목_오리엔테이션_및_자료구조_전체_숲보기",
  "7주차_평가지표_ROC",
  "2주차_기초_학습법_일반화",
  "3주차_선형회귀_로지스틱_GLM",
  "4주차_정규화_나이브베이즈_LDA",
  "5주차_KNN_Tree_Ensemble",
  "3주차_인공신경망의_기초와_딥러닝의_발전",
  "2주차_인공지능과_기계학습의_기초",
  "5주차_CNN_Convolutional_Neural_Networks",
  "7주차_RNN_Recurrent_Neural_Networks",
]);
