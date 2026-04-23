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
  "5주차_CNN_Convolutional_Neural_Networks",
  "7주차_RNN_Recurrent_Neural_Networks",
]);
