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
  "3주차_인공신경망의_기초와_딥러닝의_발전",
  "5주차_CNN_Convolutional_Neural_Networks",
  "7주차_RNN_Recurrent_Neural_Networks",
]);
