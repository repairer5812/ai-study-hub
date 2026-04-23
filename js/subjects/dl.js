// subjects/dl.js — 딥러닝 서술형 모의고사 (8세트 × 1문제)
//
// 서술형 특성상 한 문제가 매우 길기 때문에, 문제당 1세트로 쪼개어
// 풀이·채점·복습 흐름을 세트 단위로 독립시킨다.
//
// 교수님 출제 방향 (수업 중 직접 언급)
// - "딥러닝 시스템을 만드는 것" — 레이어 쌓기, 활성화 함수 선택,
//   손실 함수 선택, 옵티마이저 선택, 입출력 구조 설계.
// - 기출 3문제 스타일: ① 비교형 ② 택일 응용형 ③ 설계+비판형
// - 수식 암기 X, 의미 서술 O (교수님 오피셜)
// - 5월 11일 시험 · 오픈북(강의자료 지참) · 전자기기 불가
//
// 스키마 (서술형 전용)
// { id, set, week, topic, type:"essay", difficulty,
//   question, keywords[], modelAnswer, rubric, source }

export const SETS_META = [
  { id: 1, title: "SET 1", label: "RNN 파라미터 공유",        desc: "W 공유·Arbitrary length·Gradient 합" },
  { id: 2, title: "SET 2", label: "CNN+RNN 캡셔닝",          desc: "가변 이미지·문장 설계·사전학습 VGG" },
  { id: 3, title: "SET 3", label: "시계열 CNN",              desc: "1D Conv·병렬 연산·장기 의존성" },
  { id: 4, title: "SET 4", label: "전통 ML vs DL",           desc: "Feature 주체·DL 불리한 경우" },
  { id: 5, title: "SET 5", label: "CIFAR-10 설계",           desc: "레이어 스택·BN·Augmentation" },
  { id: 6, title: "SET 6", label: "Vanishing Gradient",      desc: "원인·ReLU·Pre-training" },
  { id: 7, title: "SET 7", label: "옵티마이저 비교",         desc: "Momentum·Adagrad·Adam" },
  { id: 8, title: "SET 8", label: "RNN → Transformer",       desc: "순차 의존·Self-Attention·Mamba" },
];

// ═══════════════════════════════════════════════════════════════
// SET 1 — RNN 파라미터 공유
// ═══════════════════════════════════════════════════════════════
export const set1 = [
  {
    id: "DL_S1Q1", set: 1, week: 7, topic: "RNN 파라미터 공유", type: "essay", difficulty: "medium",
    question:
      "RNN은 모든 타임스텝에서 동일한 가중치 행렬 $W$를 공유한다.\n" +
      "(1) 이 파라미터 공유가 이루어지는 메커니즘을 설명하시오.\n" +
      "(2) 만약 타임스텝마다 다른 $W$를 둔다면, 테스트 시 RNN의 '임의 길이(Arbitrary length) 처리'라는 핵심 장점이 어떻게 무너지는지 서술하시오.\n" +
      "(3) BPTT로 $W$의 Gradient를 구할 때, 각 타임스텝 편미분의 합(Sum)이 되는 이유를 공유 구조와 연결해 논하시오.",
    keywords: [
      "h_t = f_W(h_{t-1}, x_t)",
      "동일 함수 반복 호출",
      "Arbitrary length",
      "임의 길이",
      "Chain Rule",
      "편미분 합",
      "공유 변수 미분",
    ],
    modelAnswer:
      "(1) RNN의 상태 전이는 h_t = f_W(h_{t-1}, x_t)이며, 모든 시점 t에서 동일한 함수 f_W를 반복 호출한다. 내부 가중치 W는 시점별로 별도의 변수가 아니라 '단 하나의 W'를 모든 시점에서 공유한다. Unfold한 그림에서 여러 블록처럼 보이지만 실제로는 동일 메모리 주소의 W를 참조한다.\n" +
      "(2) 시점마다 W_1, W_2, ..., W_T를 따로 두면 학습 시 길이 T=50의 시퀀스에 대해서만 W_1~W_50이 학습되고, 테스트에서 T=100 시퀀스가 들어오면 W_51~W_100이 존재하지 않아 모델 자체가 적용 불가능해진다. 따라서 '임의 길이 처리'라는 핵심 장점이 붕괴된다.\n" +
      "(3) 최종 Loss L = Σ_t L_t에 대해 W로 편미분할 때, W가 모든 시점에서 공유되므로 연쇄법칙에 의해 ∂L/∂W = Σ_t ∂L_t/∂W가 된다. '하나의 W가 모든 시점에서 쓰였으니 각 시점의 기여(편미분)를 모두 합산'하는 것이며, 이는 Computational Graph의 '공유 변수 Gradient 합산' 원칙과 동일하다.",
    rubric: "3개 소문항 각 33점. 키워드 h_t 수식 의미·Arbitrary length·편미분 합의 3축을 모두 서술해야 만점.",
    source: "7주차 RNN § 2·5·9",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 2 — CNN+RNN 캡셔닝
// ═══════════════════════════════════════════════════════════════
export const set2 = [
  {
    id: "DL_S2Q1", set: 2, week: 5, topic: "가변 이미지 CNN+RNN 설계", type: "essay", difficulty: "hard",
    question:
      "입력 이미지 크기가 **가변적**이고 출력으로 이미지 설명 문장(가변 길이)을 생성하는 시스템을 설계하시오.\n" +
      "(1) CNN+RNN 조합 구조를 글로 설계하시오 — 각 모듈의 역할, 레이어 개수, 활성화 함수, 연결점(초기 State Vector) 포함.\n" +
      "(2) VGG 등 사전학습 CNN을 가져올 때 **마지막 Softmax·Hidden 레이어를 제거**하고 그 이전 레이어 출력을 쓰는 이유를 Classification vs Description 관점에서 설명하시오.\n" +
      "(3) 이 구조의 장점 2가지·단점 2가지를 논하시오.",
    keywords: [
      "Image Captioning",
      "1:N",
      "Global Average Pooling",
      "VGG 사전학습",
      "초기 State Vector",
      "Auto-regressive",
      "<Start>",
      "<End>",
      "Classification vs Description",
      "오류 전파",
      "GPU 병렬화 제한",
    ],
    modelAnswer:
      "(1) 입력이 가변 크기 이미지, 출력이 가변 길이 문장이므로 1:N (One-to-Many) 구조로 CNN+RNN을 결합한다.\n" +
      "  • CNN 인코더: 사전학습 VGG(또는 ResNet)의 Convolution 블록만 사용. 이미지 크기가 가변이므로 마지막 Conv Feature Map 뒤에 Global Average Pooling을 붙여 항상 고정 차원의 임베딩 v (예: 512차원)을 만든다. 내부 활성화 함수는 ReLU.\n" +
      "  • RNN 디코더: 임베딩 v를 RNN의 초기 State Vector h_0로 주입. RNN 1~2층(활성화 tanh), 출력층은 Vocabulary 크기 Softmax. <Start> 토큰 입력으로 단어 생성 시작, 다음 시점 입력으로 이전 단어를 재사용하는 Auto-regressive 방식. <End> 토큰 나오면 종료. Loss는 Negative Log-Likelihood.\n" +
      "(2) VGG의 마지막 Softmax와 그 직전 FC 레이어는 1,000개 ImageNet 클래스로 분류(Classification)하는 데 특화되어 있어, 개·고양이 같은 카테고리 정보만 남고 이미지를 풍부하게 묘사(Description)하는 색감·구도·객체 관계 같은 하이레벨 정보는 이미 소실된다. Captioning은 분류가 아니라 묘사이므로 이전 레이어의 더 일반적이고 풍부한 표현을 써야 한다.\n" +
      "(3) 장점: ① CNN의 공간 인식력과 RNN의 시퀀스 생성력 결합으로 End-to-End 학습 가능, ② Global Average Pooling + Auto-regressive로 입출력 모두 가변 길이 대응.\n" +
      "  단점: ① RNN이 t-1 시점의 잘못된 생성을 t의 입력으로 받아 오류 전파(Error Propagation)가 발생, ② RNN의 순차 연산 특성상 GPU 병렬화가 제한되어 Transformer 기반 캡셔너보다 학습·추론이 느리다.",
    rubric: "(1) 시스템 설계 30점. (2) 버리는 이유 30점. (3) 장점 2+단점 2 40점.",
    source: "5주차 CNN + 7주차 RNN § Image Captioning",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 3 — 시계열 CNN
// ═══════════════════════════════════════════════════════════════
export const set3 = [
  {
    id: "DL_S3Q1", set: 3, week: 7, topic: "시계열 CNN 적용", type: "essay", difficulty: "medium",
    question:
      "시계열 데이터(음성·주가·센서 시그널)에 전통적으로는 RNN을 사용해왔으나, 최근 CNN을 적용하는 경우도 많다. 교수님께서 수업 중 '잘 생각해보십시오'라며 답을 주지 않고 넘어간 이 주제에 대해 답하시오.\n" +
      "(1) 시계열에 CNN을 적용할 때의 **구조적 특징**을 설명하시오 (1D Convolution, 커널 크기·개수, 활성화 함수, 풀링 설계 포함).\n" +
      "(2) RNN 대비 **장점 2가지**를 서술하시오.\n" +
      "(3) RNN 대비 **단점 2가지**를 서술하시오.",
    keywords: [
      "1D Convolution",
      "병렬 연산",
      "Parallelization",
      "로컬 패턴",
      "Arbitrary length",
      "Long-term Dependency",
      "Receptive Field",
    ],
    modelAnswer:
      "(1) 시계열 CNN은 2D 대신 1D Convolution을 사용한다. 커널을 시간축으로만 슬라이드시키며 연속된 k개 타임스텝의 값을 한 번에 본다 (예: 커널 크기 5). 여러 채널로 확장해 다양한 시간 패턴을 병렬 추출하고, 활성화 함수는 보통 ReLU. 필요시 1D MaxPooling으로 차원을 줄이고 레이어를 쌓는다.\n" +
      "(2) 장점:\n" +
      "  ① 병렬 연산 가능: RNN은 t 시점이 t-1 결과에 의존해 순차 연산만 가능해 GPU 병렬화가 제한되지만, CNN은 모든 시점의 Convolution을 동시에 수행할 수 있어 학습·추론 속도가 매우 빠르다.\n" +
      "  ② 로컬 패턴 추출 강력: 커널 크기 내의 단기 시간 패턴(음소 파형, 주가 단기 급등락, 센서 스파이크)을 매우 잘 잡는다.\n" +
      "(3) 단점:\n" +
      "  ① 임의 길이 처리 제약: CNN은 커널·입력 크기가 기본적으로 고정되어 있어 들쭉날쭉한 길이를 다루려면 Zero-padding, Global Pooling 등 추가 장치가 필요하다. RNN은 동일 W로 길이에 구애받지 않는다.\n" +
      "  ② 장기 의존성 부족: Receptive Field 바깥의 먼 과거 정보는 단일 CNN으로 포착이 어렵다. 문장 맨 앞 단어가 맨 뒤 단어 의미를 결정하는 식의 긴 문맥에는 불리하다. 이를 완화하려고 Dilated Convolution, Attention이 도입된다.",
    rubric: "(1) 1D Convolution 구조 30점. (2) 장점 2개 30점. (3) 단점 2개 40점 — RNN과 '대비' 서술 필수.",
    source: "7주차 RNN § 3 (교수님 직접 오픈 질문)",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 4 — 전통 ML vs DL
// ═══════════════════════════════════════════════════════════════
export const set4 = [
  {
    id: "DL_S4Q1", set: 4, week: 2, topic: "전통 ML vs DL", type: "essay", difficulty: "medium",
    question:
      "전통적인 기계학습과 딥러닝의 차이점을 **Feature Extraction 담당 주체**(사람 vs 기계) 관점에서 설명하고, **딥러닝이 오히려 전통 ML보다 불리한 경우**가 있다면 구체적 상황과 근거로 서술하시오.",
    keywords: [
      "Feature Extraction",
      "핸드크래프트 특징",
      "SIFT / HOG",
      "End-to-End",
      "계층적 특징",
      "소규모 데이터",
      "해석 가능성",
      "Tabular data",
      "오버피팅",
    ],
    modelAnswer:
      "전통 ML은 사람(도메인 전문가)이 원시 데이터에서 의미 있는 특징을 수작업으로 설계한다. 컴퓨터 비전에서는 SIFT·HOG·Gabor 같은 핸드크래프트 특징을 뽑은 뒤 SVM·랜덤포레스트에 넣었다. 이 Feature Engineering이 프로젝트의 가장 큰 비용이었다.\n" +
      "반면 딥러닝은 Feature Extraction 자체를 기계가 학습한다. 입력 → 여러 Hidden Layer → 출력 구조에서 Hidden Layer들이 계층적으로 저수준(edge) → 중수준(motif) → 고수준(object) 특징을 자동으로 찾아내 End-to-End 학습이 가능해진다. 도메인 지식 없이도 충분한 데이터만 있으면 높은 성능을 낸다.\n" +
      "그러나 딥러닝이 불리한 경우도 있다:\n" +
      "① 소규모 데이터셋: 딥러닝은 파라미터가 매우 많아 오버피팅 위험이 크다. 데이터가 수백 개뿐인 의료 희귀 질환 분류·소량 결함 검출에서는 핸드크래프트 특징 + SVM이 더 안정적이다.\n" +
      "② 해석 가능성 필수: 금융·의료처럼 '왜 이 결정을 내렸는지'가 규제상 필수인 영역에서 딥러닝은 블랙박스라 불리하다. 결정 트리·로지스틱 회귀는 각 feature 기여도를 직접 확인할 수 있다.\n" +
      "③ 정형 데이터(Tabular data): 계층적 패턴이 약한 정형 데이터에서는 XGBoost 같은 Gradient Boosting이 딥러닝을 능가하는 경우가 많다.",
    rubric: "Feature Extraction 주체 차이 40점, 불리한 경우 2개 이상 + 근거 60점.",
    source: "2주차 § ML 개요 (기출 1번 직계)",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 5 — CIFAR-10 설계
// ═══════════════════════════════════════════════════════════════
export const set5 = [
  {
    id: "DL_S5Q1", set: 5, week: 6, topic: "CIFAR-10 시스템 설계", type: "essay", difficulty: "hard",
    question:
      "CIFAR-10 (32×32 컬러, 10클래스)을 분류하는 CNN 시스템을 **처음부터 직접 설계**한다고 하자. 교수님 과제 힌트인 '어떤 시도를 했을 때 어떤 차이가 있었는지 이유 설명'을 반영하여 답하시오.\n" +
      "(1) **레이어 스택**: Conv·Pool·FC 레이어의 순서·개수와 각 Conv의 필터 크기·개수를 설계하시오.\n" +
      "(2) **활성화 함수**: 은닉층과 출력층에 각각 어떤 활성화 함수를 쓸 것인지, 그 이유는?\n" +
      "(3) **손실 함수 & 옵티마이저**: 어떤 Loss와 Optimizer를 선택하고 그 근거는?\n" +
      "(4) 성능 향상 기법으로 **Batch Normalization**과 **Data Augmentation** 중 하나를 추가한다면 각각이 왜 효과적인지 논하시오.",
    keywords: [
      "Conv 3×3",
      "MaxPooling 2×2",
      "ReLU / Leaky ReLU",
      "Softmax",
      "Cross-Entropy",
      "Adam",
      "Batch Normalization",
      "Internal Covariate Shift",
      "Data Augmentation",
      "일반화",
    ],
    modelAnswer:
      "(1) 레이어 스택: Input(32×32×3) → [Conv 3×3, 32ch → BN → ReLU] × 2 → MaxPool 2×2 → [Conv 3×3, 64ch → BN → ReLU] × 2 → MaxPool 2×2 → [Conv 3×3, 128ch → BN → ReLU] × 2 → MaxPool 2×2 → Flatten → FC 256 → ReLU → Dropout 0.5 → FC 10 → Softmax. Conv는 3×3 고정(VGG 원칙, 파라미터 절약 + 깊이 ↑), 채널 수는 32→64→128로 점진 확장.\n" +
      "(2) 활성화 함수: 은닉층은 ReLU(또는 Leaky ReLU) — 양수 구간 미분값 1로 Vanishing Gradient 완화, 연산 단순. Leaky ReLU는 Dead ReLU(음수 입력 시 기울기 0) 문제까지 방지. 출력층은 Softmax — 10클래스 확률 분포를 합 1로 강제해 분류에 적합.\n" +
      "(3) 손실 함수: Cross-Entropy — Softmax 출력과 One-hot 타겟 간 발산을 측정하는 분류 표준. MSE는 확률 해석 불가·기울기가 약해 부적절.\n" +
      "  옵티마이저: Adam — Momentum(관성)과 RMSprop(파라미터별 학습률 조절)을 결합, bias-correction 포함. 하이퍼파라미터에 덜 민감해 실무 기본값.\n" +
      "(4) Batch Normalization: 각 미니배치 단위로 중간 Activation을 평균 0·분산 1로 정규화해 Internal Covariate Shift(층 간 입력 분포 변동)를 억제. 학습률을 크게 잡아도 안정적으로 수렴해 실험상 가장 큰 성능 점프를 만든다. 학습 가능한 Scale(γ)·Shift(β)로 표현력도 유지.\n" +
      "  Data Augmentation(회전·뒤집기·크롭·색 변화): 학습 데이터를 인위적으로 증식해 모델이 데이터를 단순히 외우지 못하게 만들고, 이로써 일반화(Generalization) 성능이 크게 향상된다. 특히 CIFAR-10 같은 소규모 데이터셋에서 효과가 크다.",
    rubric: "(1) 레이어 스택 30점. (2) 활성화 20점. (3) Loss·Optimizer 20점. (4) BN or Augmentation 원리 30점.",
    source: "6주차 CIFAR-10 + 3주차 옵티마이저",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 6 — Vanishing Gradient
// ═══════════════════════════════════════════════════════════════
export const set6 = [
  {
    id: "DL_S6Q1", set: 6, week: 3, topic: "Vanishing Gradient + Pre-training", type: "essay", difficulty: "medium",
    question:
      "다음 질문에 답하시오.\n" +
      "(1) **Vanishing Gradient의 수학적 원인**을 Sigmoid(최대 미분값 0.25), Tanh(최대 미분값 1.0)의 미분값 관점에서 설명하시오.\n" +
      "(2) ReLU가 이를 완화하는 원리와, 그 대신 생기는 **Dead ReLU 문제**는 무엇인가?\n" +
      "(3) 2006년 이전 깊은 망 학습 불가능 시절, **오토인코더 기반 Greedy Layer-wise Pre-training**이 어떻게 이 문제를 우회했는지 서술하시오.",
    keywords: [
      "Chain Rule",
      "미분값 곱",
      "Sigmoid 0.25",
      "ReLU",
      "양수 기울기 1",
      "Dead ReLU",
      "Leaky ReLU",
      "Auto-Encoder",
      "Greedy Layer-wise",
      "Fine-tuning",
    ],
    modelAnswer:
      "(1) 역전파는 연쇄법칙(Chain Rule)에 따라 출력층에서 입력층으로 기울기를 '곱하면서' 전달한다. Sigmoid의 최대 미분값은 0.25, Tanh는 1.0이다. 대부분의 미분값이 1보다 작기 때문에, 레이어가 깊어질수록 이들 값을 계속 곱하면 입력층 근처에서 기울기가 거의 0으로 수렴한다. 결과적으로 입력단 레이어의 가중치가 사실상 학습되지 않는다.\n" +
      "(2) ReLU는 양수 구간에서 미분값이 항상 1이라 아무리 곱해도 소실되지 않는다. 그러나 음수 입력에 대해서는 출력과 기울기가 모두 0이 되어, 한 번 죽은 뉴런은 업데이트되지 않는 Dead ReLU 문제가 발생한다. Leaky ReLU(음수에 작은 기울기 0.01 부여)나 Parametric ReLU로 완화할 수 있다.\n" +
      "(3) 2006년 힌튼이 제안한 Greedy Layer-wise Pre-training은 전체 깊은 망을 한 번에 학습시키지 않고 레이어별로 먼저 학습시키는 전략이다. 각 레이어를 오토인코더(Encoder + Decoder, Target = 입력 자기 자신)로 학습해 의미 있는 표현을 얻은 뒤 Encoder 가중치만 남기고, 그 출력을 다음 오토인코더의 입력으로 사용해 다음 층을 학습한다. 이렇게 쌓아 올린 뒤 마지막에 Classifier를 붙여 전체를 Fine-tuning한다. 이미 좋은 초기값에 도달해 있어 Vanishing Gradient의 영향이 작아지고, 처음으로 깊은 망이 실제로 학습되어 딥러닝 부흥의 기폭제가 되었다.",
    rubric: "(1) 수학적 원인 30점. (2) ReLU + Dead ReLU 30점. (3) Pre-training 메커니즘 40점.",
    source: "3주차 § Vanishing Gradient + Auto-Encoder",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 7 — 옵티마이저 비교
// ═══════════════════════════════════════════════════════════════
export const set7 = [
  {
    id: "DL_S7Q1", set: 7, week: 3, topic: "옵티마이저 비교", type: "essay", difficulty: "medium",
    question:
      "Momentum, Adagrad, Adam 세 옵티마이저를 비교하시오.\n" +
      "(1) 각각이 해결하려 한 기존 SGD의 문제점은 무엇인가?\n" +
      "(2) Adam이 현재 사실상 표준이 된 이유를 위 두 방식과의 관계로 서술하시오.",
    keywords: [
      "SGD 노이즈",
      "Momentum",
      "관성",
      "Adagrad",
      "파라미터별 학습률",
      "분모 무한 증가",
      "RMSprop",
      "지수 이동 평균",
      "Adam",
      "bias-correction",
    ],
    modelAnswer:
      "(1) SGD는 샘플별 기울기가 노이즈가 심해 지그재그로 진동하고, 모든 파라미터에 동일한 학습률을 쓴다.\n" +
      "  • Momentum: 과거 기울기의 지수 이동 평균(관성)을 현재 업데이트에 누적한다. 같은 방향이 유지되는 차원에서는 가속, 반복 진동 차원은 상쇄되어 수렴이 빠르고 안정적이다.\n" +
      "  • Adagrad: 파라미터별로 학습률을 다르게 적용한다. 과거 기울기 제곱의 합을 분모에 누적해, 자주 업데이트된 파라미터는 학습률을 줄이고 드물게 등장한 파라미터는 크게 유지한다. 단점은 분모가 무한히 커져 학습률이 0으로 수렴해 학습이 멈추는 것.\n" +
      "  • (보완) RMSprop은 Adagrad의 분모 누적을 지수 이동 평균으로 바꿔 오래된 정보를 잊게 해서 이 문제를 해결한다.\n" +
      "(2) Adam = Momentum + RMSprop. 과거 기울기의 지수 이동 평균(Momentum 역할, m_t)과 과거 기울기 제곱의 지수 이동 평균(RMSprop 역할, v_t)을 모두 유지하며, bias-correction으로 초기 편향까지 보정한다. 덕분에:\n" +
      "  ① 방향성(Momentum)과 파라미터별 적응형 학습률(RMSprop)을 동시에 얻고,\n" +
      "  ② 학습률 감소(Adagrad 결점) 없이 장기 안정적으로 동작하며,\n" +
      "  ③ 하이퍼파라미터(β_1, β_2, ε)에 덜 민감해 실무 기본값이 되었다.",
    rubric: "(1) 세 옵티마이저 설명 60점. (2) Adam이 둘의 결합 + bias-correction임을 명시 40점.",
    source: "3주차 § 14~18",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 8 — RNN → Transformer
// ═══════════════════════════════════════════════════════════════
export const set8 = [
  {
    id: "DL_S8Q1", set: 8, week: 7, topic: "RNN 병렬화 한계 → Transformer", type: "essay", difficulty: "medium",
    question:
      "RNN이 Transformer에 자리를 내준 가장 핵심 이유는 **GPU 병렬 처리의 한계**다.\n" +
      "(1) 왜 $t$ 시점 연산이 $t-1$ 결과에 **구조적으로** 의존하는지 State Vector 관점에서 설명하시오.\n" +
      "(2) Transformer가 이 문제를 어떻게 해결했는지 (교수님 언급 수준) 간단히 서술하시오.\n" +
      "(3) 최근 주목받는 **Mamba** 모델의 특징을 한 문장으로.",
    keywords: [
      "State Vector",
      "순차 의존",
      "Sequential Dependency",
      "GPU 병렬",
      "Self-Attention",
      "모든 토큰 동시",
      "Mamba",
      "State Space Model",
    ],
    modelAnswer:
      "(1) RNN의 상태 전이 h_t = f_W(h_{t-1}, x_t)에서 h_t를 계산하려면 반드시 h_{t-1}이 먼저 계산되어 있어야 한다. h_{t-1}은 다시 h_{t-2}에 의존하므로 결국 시퀀스 맨 앞부터 끝까지 한 시점씩 순서대로만 계산할 수 있다. State Vector는 '과거의 모든 히스토리가 압축된 메모리'이기 때문에 이 순차 의존은 RNN의 본질이며 우회 불가능하다. 시퀀스 길이 T에 따라 Wall-clock 시간이 선형으로 증가한다.\n" +
      "(2) Transformer는 순환 구조를 제거하고 Self-Attention으로 대체한다. 시퀀스의 모든 토큰 쌍 간 관계를 행렬 곱 한 번으로 동시에 계산한다. 즉 t 시점이 t-1에 의존하지 않고, 모든 토큰이 서로를 병렬로 참조하므로 GPU 병렬성이 완전히 활용되어 학습·추론이 RNN 대비 압도적으로 빠르다. 장기 의존성도 거리와 무관하게 직접 연결 가능.\n" +
      "(3) Mamba는 RNN처럼 순차적 State Space Model의 효율을 유지하면서도 하드웨어 병렬 처리를 극대화한 최신 모델로, Transformer의 병렬성과 RNN의 메모리 효율을 모두 노린다.",
    rubric: "(1) 순차 의존 구조 40점. (2) Self-Attention 병렬성 40점. (3) Mamba 한 문장 20점.",
    source: "7주차 § 14",
  },
];

// ═══════════════════════════════════════════════════════════════
// 메타 + 전체
// ═══════════════════════════════════════════════════════════════
const ALL = [...set1, ...set2, ...set3, ...set4, ...set5, ...set6, ...set7, ...set8];

export const META = {
  id: "dl",
  title: "딥러닝",
  subtitle: "서술형 8세트 · 문제당 1세트 · LLM 채점",
  emoji: "💻",
  color: "#7B2D8E",
  available: true,
  hasExam: true,
  examType: "essay",        // 서술형 — exam.js에서 분기 렌더링
  sets: SETS_META,
  weekCount: 7,
  noteIndex: [
    { slug: "1주차_응용_오리엔테이션_및_수업_운영_방침", title: "1주차 — 오리엔테이션·운영 방침", week: 1 },
    { slug: "2주차_인공지능과_기계학습의_기초", title: "2주차 — AI·ML 기초", week: 2 },
    { slug: "3주차_인공신경망의_기초와_딥러닝의_발전", title: "3주차 — 인공신경망·딥러닝 발전", week: 3 },
    { slug: "4주차_실습환경_구축_및_PyTorch_기초", title: "4주차 — PyTorch 기초", week: 4 },
    { slug: "5주차_CNN_Convolutional_Neural_Networks", title: "5주차 — CNN", week: 5 },
    { slug: "6주차_CIFAR-10_및_CNN_최적화_기법", title: "6주차 — CIFAR-10·CNN 최적화", week: 6 },
    { slug: "7주차_RNN_Recurrent_Neural_Networks", title: "7주차 — RNN", week: 7 },
    { slug: "예상문제_모범답안", title: "📌 예상문제·모범답안", week: 99 },
    { slug: "딥러닝_기출문제", title: "📝 기출문제 (2025)", week: 98 },
  ],
};

export function getSetQuestions(setId) {
  const table = { 1: set1, 2: set2, 3: set3, 4: set4, 5: set5, 6: set6, 7: set7, 8: set8 };
  return table[setId] || [];
}

export function getAllQuestions() { return ALL; }
