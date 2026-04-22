# 🚀 [딥러닝 5주차] 서브노트: Convolutional Neural Networks (CNN)

본 서브노트는 제공해주신 강의 스크립트, 슬라이드 자료, 그리고 작성하신 핵심 메모를 완벽하게 통합하여, 지엽적인 출제 포인트와 교수님의 농담, Q&A까지 모두 담아낸 심층 학습 자료입니다.

---

## 1. 🤔 Structured Data와 MLP의 한계 (왜 CNN이 필요한가?)

### 1.1. MLP(Multi-Layer Perceptron)에 이미지를 넣을 때의 문제점
- Vectorization(1D 변환)의 한계: 이미지는 기본적으로 2D 구조를 가집니다. 이를 MLP에 넣기 위해서는 1D 벡터로 길게 줄을 세워야 합니다(Flatten).
    - 예시: 3x3 이미지(1번부터 9번 픽셀)를 1D로 펴버리면, 원래 상하좌우로 인접해 있던 픽셀들이 멀리 떨어지게 됩니다.
- 상관관계(Correlation)의 파괴: 이미지는 이웃한 픽셀들 간의 상관관계가 매우 높습니다. 하지만 1D로 펴는 순간, 옆에 있으면 바로 알 수 있는 관계를 멀리 떨어뜨려 놓게 되어 MLP가 이 관계를 찾기 위해 엄청난 에너지를 낭비하게 됩니다.

### 💡 핵심 출제 포인트
> "이미지를 벡터화하면 이미지의 픽셀들 간의 공간적 관계(Spatial Correlation) 값을 잃어버리는 문제가 발생한다."

### 1.2. 다른 데이터 도메인에서의 예시
- 음성 신호 (1D): 음성은 시간적으로 바로 옆에 있는 이웃한 신호들 간의 상관관계가 굉장히 높습니다.
    - 교수님 강조: 1초 전에 얘기한 것과 10초 뒤에 얘기한 것은 관련성이 있을 확률이 매우 낮습니다. 이를 전체를 다 연결(Fully Connected)해서 보려고 하면 굳이 볼 필요 없는 것을 억지로 보려고 하는 문제가 생깁니다.
- 비디오 (3D): 비디오는 이미지의 시퀀스(3D)입니다. 이웃한 픽셀 간의 관계뿐만 아니라 이웃한 프레임(Frame) 간의 관계도 높습니다. 이를 벡터화하면 쉽게 알 수 있는 3D 관계를 깨트려버립니다.

---

## 2. ⚙️ CNN의 3가지 핵심 메커니즘 (Three Mechanisms)
데이터 자체가 가지는 구조적 속성(Local structure)을 그대로 활용하자는 것이 CNN의 핵심입니다.

### 2.1. Local Receptive Fields (국소 수용 영역)
- 이미지의 전체를 한 번에 보는 것이 아니라, 특정 윈도우(패치)를 통해 부분적인 패턴(Local features like edges, corners)을 확인합니다.
- 예시: 얼굴 인식을 할 때, 얼굴이 사진의 좌측 상단에 있든 우측 하단에 있든 동일한 '얼굴'이라는 패턴을 찾아야 합니다.

### 2.2. Weight Sharing (가중치 공유) & Convolution
- 정의: 내가 찾고자 하는 패턴(Weight/Filter/Kernel)을 위치나 시간이 다르더라도 동일하게 반복해서 사용하는 개념입니다.
- 목적: 동일한 패턴이 여기 있는지 저기 있는지 계속 찾게 해주며, 파라미터의 수를 획기적으로 줄여줍니다.

### 💡 Convolution 연산
- Weight Sharing의 개념을 수학적으로 표현한 것이 바로 Convolution 연산입니다.
- 교수님 농담/질의응답: "Convolution 어디서 들어봤나요? 전기전자 전공자들, 공부 안 했다고 하지 말고… 주파수 변환할 때, Frequency Domain에서의 Multiplication이 Time Domain에서의 Convolution 연산이 된다고 배웠을 겁니다."
- Feature Map (피처 맵): 입력 이미지에 하나의 Weight(필터)를 씌워서 컨볼루션 연산을 수행하여 나온 결과물(히트맵 같은 것)입니다.
    - 의미: 해당 영역에 내가 찾는 패턴이 얼마나 강하게 존재하는지를 나타냅니다.
- Zero-Padding: 컨볼루션 연산을 하면 가장자리 계산이 안 되어 크기가 줄어드는데, 원래 사이즈를 유지하고 싶을 때 가장자리에 의미 없는 값(0)을 붙이는 기법입니다.

### 2.3. Subsampling (Pooling)
- 등장 배경 (뇌과학적 영감): 포유류의 뇌(Visual Cortex)에서 시각 정보를 처리할 때 Simple cell(로컬 패턴 추출)과 Complex cell(패턴을 뭉쳐서 하나로 표현)이 있다는 사실에서 영감을 받았습니다.
- 기능: 계산해야 할 Feature Map의 사이즈를 점진적으로 줄이고, 파라미터 숫자가 과도하게 많아지는 것을 방지합니다.
- 연산 방법: 겹치지 않게(Non-overlapping) 영역을 잡아 대표값 하나를 뽑습니다. 연산 자체가 따로 필요 없습니다.
    - Max Pooling: 영역 내 최대값 추출 (가장 주로 쓰임, 특징이 얼마나 강한지 캐치)
    - Average Pooling / Min Pooling: 평균값, 최소값 추출

### 💡 핵심 출제 포인트 (Translation Invariance)
- 풀링을 거치면 이미지가 공간적으로 살짝 이동(Shift/Translation)하더라도 결과값(행렬의 Max값 등)이 변하지 않는 공간적 불변성(Spatial/Translation Invariance)을 가지게 됩니다. 강아지 사진이 약간 옆으로 이동해도 동일하게 강아지로 인식할 수 있는 이유입니다.

---

## 3. 🌊 CNN의 기본 연산 플로우

### 3.1. 기본 구성 블록
- Convolution: 필터(Kernel)를 이동시키며 로컬 패턴의 강도를 계산합니다.
- Activation (비선형성 부여): 주로 ReLU를 사용합니다. (네거티브 신호는 죽이고 포지티브 신호만 살림)
- Pooling (Subsampling): 대표값을 뽑아 사이즈를 줄입니다.
- 이 과정(Conv $\rightarrow$ ReLU $\rightarrow$ Pooling)을 반복하며 레이어를 깊게 쌓습니다. (순서나 풀링 포함 여부는 아키텍처 디자인의 영역입니다.)

### 3.2. 분류(Classification)를 위한 마무리
- 연산을 거쳐 사이즈가 작아진 다수의 Feature Map들을 마지막에 1D로 쫙 펼칩니다(Flatten/Vectorize).
- 그 후 MLP(Fully Connected Layer)와 로지스틱 회귀(Softmax 등)를 붙여 최종적으로 이미지를 분류합니다.
- 딥러닝의 본질: 입력부터 Classifier 앞단까지의 과정은 결국 데이터를 구분하기 위한 최적의 Feature Representation을 스스로 학습하는 과정입니다.

---

## 4. 🏛️ CNN의 초기 성공 사례: LeNet과 생물학적 타당성

### 4.1. LeNet (1998)
- 역사적 의의: 미국 우체국에서 우편번호(숫자)를 인식하기 위해 개발된 시스템으로, 가장 처음으로 실용화에 성공한 CNN 사례(MNIST 데이터셋 활용)입니다.
- 구조적 특징: 입력 이미지(32x32) $\rightarrow$ 첫 번째 Conv(5x5 커널, 패딩 없음) $\rightarrow$ 28x28 피처맵 6개 생성 $\rightarrow$ Subsampling(사이즈 1/4로 축소) $\rightarrow$ 두 번째 Conv $\rightarrow$ … $\rightarrow$ 최종 MLP(Fully Connected) 연결.

### 💡 핵심 출제 포인트 (다중 피처맵 연산)
- 두 번째 Convolution 레이어에서 사용하는 커널의 사이즈는 단순히 5x5가 아니라 5x5x6입니다.
- 즉, 이전 레이어에서 생성된 6개의 Feature Map 전체를 한꺼번에(동시에) 바라보며 패턴을 추출합니다. 이를 통해 복잡도가 올라가고 더 고차원적인 특징을 잡아냅니다.

### 📉 채널(Channel)의 증가와 공간(Spatial)의 축소
- 네트워크가 깊어질수록(Deep layer로 갈수록) 공간적 해상도(이미지 사이즈)는 줄어들지만, Feature Map의 개수(채널 수)는 늘어납니다.
- 이유: 더 복잡한 패턴을 찾아야 하므로 더 많은 케이스(Feature)를 고려해야 하기 때문입니다.

### 4.2. 생물학적 타당성 (Brain Inspired)
- 원숭이 뇌 실험 (2016년): 원숭이에게 사진을 보여주고 뇌(후두엽에서 측두엽으로 이어지는 시각 정보 처리 경로, 특히 얼굴을 인식하는 Fusiform gyrus 영역)의 신호를 측정했습니다.
- 결과: 실제 뇌의 신호 반응 패턴과 CNN이 학습한 Feature들의 반응(Correlation)을 비교해보니 매우 높은 상관관계를 보였습니다.
- 교수님 코멘트: "아, 이 비디오(CNN)가 브레인을 잘 모방하고 있구나!"라며 CNN 아키텍처의 합리성과 타당성을 뇌과학적으로 증명한 중요한 사례입니다.

---

## 5. 🗣️ 자연어 처리(NLP)에서의 CNN 활용
CNN은 이미지뿐만 아니라 텍스트 데이터(Structured Data)에도 활용될 수 있습니다. (예: Sentiment Analysis - 영화 리뷰 긍정/부정 분류)
- Word Embedding (워드 임베딩): 각 단어("I", "like", "this", "movie")를 미리 학습된 5차원 등의 벡터로 변환하여 입력합니다.

### 💡 핵심 출제 포인트 (NLP에서의 커널 사이즈)
- 질문: 이미지처럼 3x3 커널을 쓰면 될까요?
- 정답: 절대 안 됩니다. 단어를 표현하는 5차원 벡터를 중간에 쪼개버리면 더 이상 그 단어의 의미를 가지지 못하기 때문입니다.
- 해결책: 단어 벡터의 전체 차원(통)을 덮는 커널을 사용해야 합니다. (예: 2x5, 3x5, 4x5 커널).
- 다양한 커널 사이즈의 동시 사용: 한 레이어 안에서 2x5, 3x5, 4x5 등 서로 다른 사이즈의 커널을 동시에 적용하여 피처맵을 뽑아내고, 이를 마지막에 이어 붙여서(Concatenate) 사용할 수 있습니다.

---

## 6. 🏆 Deep CNN 아키텍처의 진화 (ImageNet 챌린지)
이미지넷(ILSVRC) 대회를 거치며 CNN 아키텍처는 비약적으로 발전했습니다. (현재는 에러율이 사람 수준 이하로 떨어져 해당 데이터셋으로 경쟁하는 것은 무의미해진 상태입니다.)

### 6.1. AlexNet (2012)
- 구조적 한계 극복: 당시 GPU 메모리 한계로 인해 네트워크를 두 갈래로 나누어 병렬 컴퓨팅(Parallel Computing)을 수행했습니다.
- 💡 핵심 출제 포인트 1 (ReLU의 최초 도입): 활성화 함수로 ReLU(Rectified Linear Unit)를 이 논문에서 처음 사용했습니다. 네거티브 신호를 죽이고 파지티브 신호만 통과시키는 선형 결합만으로도 원하는 솔루션을 찾을 수 있음을 증명했습니다.
- 💡 핵심 출제 포인트 2 (Local Response Normalization, LRN):
    - 신호를 다음 레이어로 그냥 넘기지 않고 정규화(Normalize)하여 넘기는 기법입니다.
    - 뇌과학적 원리: 뇌의 '측면 억제(Lateral inhibition)' 원리에서 착안하여, 너무 크거나 작은 신호를 바운드(Bound) 시켜줍니다. (이후 Batch Norm 등의 발전으로 이어집니다.)
- 기타 기법: 과적합 방지를 위해 Dropout 테크닉을 적극 활용했습니다.

### 6.2. VGGNet (2015)

### 💡 핵심 출제 포인트 (3x3 커널의 고집)
- AlexNet 등은 초반에 11x11, 5x5 등 큰 사이즈의 커널을 사용했습니다.
- 하지만 VGGNet은 "모든 커널 사이즈를 3x3으로 작게 고정"했습니다.
- 이유: 5x5 커널 1개를 쓰는 것보다, 3x3 커널을 2개 겹쳐서(Deeper layer) 쓰는 것이 동일한 영역(Receptive Field)을 커버하면서도, 파라미터 수는 줄이고 비선형성(Non-linearity)은 높여 성능을 극대화할 수 있기 때문입니다.
- 특징: 레이어를 매우 깊게 쌓았으며(VGG-16, VGG-19), 다른 도메인으로 가져갔을 때 일반화(Generalization) 성능이 매우 뛰어납니다.

### 6.3. GoogLeNet / Inception (2015)

### 💡 핵심 출제 포인트 1 (1x1 Convolution)
- 단순히 1픽셀을 보는 것이 아닙니다. 이전 레이어의 모든 Feature Map의 동일한 위치 값을 다 섞어버리는(연산하는) 역할을 합니다.
- 효과: 파라미터 수는 획기적으로 줄이면서(Dimension Reduction), 채널 간의 복잡도(Representational power)를 높여 더 복잡한 패턴을 찾을 수 있게 해줍니다.

### 💡 핵심 출제 포인트 2 (Inception Module)
- 하나의 입력에 대해 1x1, 3x3, 5x5 컨볼루션과 Pooling을 동시에 병렬적으로 적용하고 그 결과를 합칩니다. (다양한 View를 한 번에 봄)
- Auxiliary Classifier (보조 분류기):
    - 네트워크가 너무 깊어지면 끝에서부터 전달되는 Gradient가 소실되는 문제(Vanishing Gradient)가 발생합니다.
    - 이를 해결하기 위해 네트워크 중간중간에 보조 분류기를 끼워 넣어, 학습 시 정답에 대한 힌트(Discriminative feature)를 빨리 찾도록 유도했습니다. (최종 테스트 시에는 사용하지 않음)
- Batch Normalization (Inception-v2): 값이 흩어지는 것을 바운드시켜 학습 속도를 굉장히 단축시켰습니다.
- Factorization (Inception-v3): 3x3 커널을 1x3과 3x1로 쪼개어 연산량과 파라미터를 더욱 감소시켰습니다.
- Label Smoothing: 정답 레이블에 1.0을 주지 않고 0.9를 주고, 나머지 오답에 0.01씩 이분(Even)하게 분배하여 과적합을 방지하는 테크닉입니다.

---

## 7. 🌉 ResNet (Residual Network) - "가장 널리 쓰이는 표준"

### 7.1. Degradation Problem (성능 저하 문제)
- 배경: 망을 깊게 쌓을수록 성능이 좋아질 것이라 기대했지만, 실제로는 56개 레이어를 쌓았을 때가 20개 레이어일 때보다 에러율이 더 높아지는 현상이 발생했습니다. (오버피팅이 아닌, 깊이에 따른 최적화의 어려움)
- 원인: 네트워크가 깊어질수록 입력단으로 기울기(Gradient)가 제대로 전달되지 않는 Vanishing/Exploding Gradient 문제 때문입니다. Batch Normalization 등으로 일부 완화했으나 근본적인 해결이 안 되었습니다.

### 7.2. Shortcut Connection (Skip/Highway Connection)
- 해결책: 망을 뻥뻥 건너뛰는 고속도로(Highway)를 뚫어주는 것입니다.
- 원리: 입력 $x$가 몇 개의 레이어를 거쳐 나온 결과 $F(x)$에 원래의 입력 $x$를 그대로 더해주는 구조입니다. ($H(x) = F(x) + x$)

### 💡 핵심 출제 포인트 (Residual의 의미와 교수님 일화)
- 교수님 썰: ResNet 1저자가 구두 발표를 할 때 "왜 이게 잘 되냐?"는 질문에 "나도 모르겠는데 해보니까 잘 되더라"라고 답했던 유명한 일화가 있습니다. 1년 뒤에 그 이유가 이론적으로 밝혀졌습니다.
- 이론적 증명: 입력값 $x$가 고속도로를 타고 그대로 넘어오기 때문에, 레이어($F(x)$)는 전체 맵핑을 처음부터 다시 학습할 필요 없이 원래 정보($x$)에서 부족한 부분(Residual, 잔차)만 추가적으로 학습하면 됩니다.
- 역전파(Backpropagation) 이점: 에러를 역전파할 때 덧셈 연산(+)은 기울기를 그대로 분배하므로, 아무런 방해 없이 저 끝단(입력층)까지 Gradient가 다이렉트로 흘러갈 수 있습니다.

### 7.3. Bottleneck Design (병목 구조)
- 목적: 레이어를 152개까지 엄청나게 깊게 쌓으면서도 연산량(Time complexity)을 줄이기 위한 디자인입니다.
- 방법: 3x3 컨볼루션을 하기 전후에 1x1 컨볼루션을 배치합니다.
    - 첫 1x1 Conv로 차원(채널 수)을 줄이고 $\rightarrow$ 3x3 Conv 수행 $\rightarrow$ 다시 1x1 Conv로 차원을 원래대로 복구시킵니다.
    - 이를 통해 ResNet-152가 VGG-16/19보다 파라미터 수와 연산량(FLOPS)이 오히려 더 적습니다.
- 💡 내 메모 강조: 교수님께서 "ResNet이 여전히 가장 많이 쓰는 네트워크 디자인이다"라고 강조하셨으니 반드시 기억하세요!

---

## 8. 🧱 DenseNet (Densely Connected Convolutional Networks)
- 배경: ResNet이 정보를 '건너뛰어(Skip)' 전달했다면, DenseNet은 "앞에서 찾은 정보를 잊어버리지 말고 뒤로 계속 다 가지고 가자!"라는 철학입니다.

### 💡 핵심 출제 포인트 (Concatenation)
- ResNet은 이전 Feature Map과 현재 Feature Map을 더하기(+)로 합쳤지만, DenseNet은 채널 방향으로 이어 붙입니다(Concatenation).
- 이전 모든 레이어의 Feature Map을 현재 레이어의 입력으로 사용합니다.
- Dense Block과 Transition Layer:
    - 이어 붙이려면 Feature Map의 사이즈가 같아야 하므로, 사이즈가 동일하게 유지되는 구간을 묶어 Dense Block이라고 부릅니다.
    - 블록과 블록 사이에는 사이즈를 줄여주는 Transition Layer(1x1 Conv + 2x2 Average Pooling)를 배치합니다.
- 장점: 네트워크를 훨씬 얇게(Thinner, 채널 수를 적게) 만들 수 있어 파라미터 효율성이 높고, 앞단의 Low-level 특징부터 뒷단의 High-level 특징까지 다양한 복잡도의 피처를 섞어 쓸 수 있습니다.

---

## 9. 🎯 Attention 메커니즘의 도입: SENet (Squeeze-and-Excitation)
- 문제 제기: 기존 CNN은 컨볼루션 연산 시 각각의 Feature Map이 다른 Feature Map들을 보지 않고 독립적으로 계산된다는 한계가 있었습니다.

### 💡 핵심 출제 포인트 (SE Block의 동작 원리): "우리들(피처맵들)끼리 상대적 중요도를 평가해보자!"
1. Squeeze (압축): Global Average Pooling을 사용하여 $H \times W$ 크기의 각 Feature Map을 평균 내어 단 1개의 대표값으로 압축합니다. (채널 수가 $C$개라면 $C$개의 값이 나옴)
2. Excitation (재조정): 이 $C$개의 값을 Fully Connected Layer(MLP)에 통과시켜, 채널 간의 상호작용을 파악하고 상대적 중요도(Weight, 0~1 사이의 값)를 계산합니다.
3. Scale (적용): 계산된 중요도를 원래의 Feature Map에 곱해줍니다. (예: 2번째, 5번째 피처맵이 중요하면 그 값을 더 키워줌)
- 장점: 파라미터 추가는 거의 없으면서도 중요한 피처를 강조할 수 있어 성능이 크게 향상됩니다. 기존 모델(ResNet, Inception 등)에 쉽게 끼워 넣어(SE-ResNet 등) 사용할 수 있습니다.

---

## 10. 🔬 기타 경량화 및 변형 네트워크 (간단 정리)
- NiN (Network in Network):
    - FC(Fully Connected) 레이어 대신 Global Average Pooling(GAP)을 사용하여 오버피팅을 방지하고 파라미터를 대폭 줄였습니다.
- Xception & ShuffleNet:
    - 모바일 기기 등 연산 자원이 부족한 환경을 위해 설계되었습니다.
    - 모든 채널을 한 번에 연산하지 않고, 채널별로 따로 연산하는 Depthwise Separable Convolution과 Group Convolution + Channel Shuffle 기법을 사용하여 연산량을 극적으로 줄였습니다.

---

## 11. 🧬 U-Net - "의료 영상에서 생성형 AI의 핵심으로"
- 탄생 배경: 컴퓨터 비전 분야가 아닌 의료 영상(Medical Imaging) 분야(세포 분할, 종양 탐지 등)에서 등장했습니다.

### 💡 핵심 출제 포인트 1 (입출력 사이즈 동일)
- 일반적인 CNN은 분류를 위해 최종 사이즈가 줄어들지만, U-Net은 Segmentation(분할)을 목적으로 하기 때문에 입력 이미지와 출력 이미지의 사이즈가 동일합니다.

### 💡 핵심 출제 포인트 2 (U자형 구조 & Skip Connection)
- Contraction Path (수축/인코더): Conv와 Pooling을 반복하여 전체 이미지를 1024차원 등의 벡터로 압축합니다. (전체적인 Context, 즉 "무엇(What)"이 있는지 파악하지만, 위치 정보인 "어디(Where)"는 잃어버림)
- Expansion Path (확장/디코더): Deconvolution(Up-conv)을 통해 다시 원래 사이즈로 복원해 나갑니다.
- Skip Connection (가장 중요): 압축되면서 잃어버린 디테일한 공간 정보(Spatial info)를 보완하기 위해, 수축 경로에서 생성된 Feature Map을 확장 경로의 동일한 레벨에 그대로 끌어와서 이어 붙입니다(Concatenation).
- 세부 테크닉:
    - Overlap-tile Strategy: 슬라이드 크기가 너무 큰 의료 영상을 처리하기 위해 이미지를 잘라서(Tile) 처리하되, 경계 부분은 거울처럼 반사(Mirroring)시켜 패딩합니다.
    - Weight Map: 세포들이 서로 붙어있는(Touching) 경우, 이를 떼어내어 인식하기 위해 경계선 부분의 Loss(페널티)를 강하게 주는 가중치 맵을 사용했습니다.
- 💡 내 메모 강조: 교수님께서 "U-Net은 최근 생성형 AI(Generative AI)의 이미지 생성 모델인 Diffusion 모델의 기본 뼈대(Base Architecture)가 되었다"고 매우 강조하셨으니 시험에 트렌드 관련 문제로 출제될 확률이 높습니다!

<!-- AUTO:SLIDES:START -->

---

## 강의 슬라이드 (원본 PDF 페이지 렌더)

### CNN

<details><summary>슬라이드 58장 펼치기</summary>

![cnn p1](assets/images/dl/dl_cnn_p01.jpg)

![cnn p2](assets/images/dl/dl_cnn_p02.jpg)

![cnn p3](assets/images/dl/dl_cnn_p03.jpg)

![cnn p4](assets/images/dl/dl_cnn_p04.jpg)

![cnn p5](assets/images/dl/dl_cnn_p05.jpg)

![cnn p6](assets/images/dl/dl_cnn_p06.jpg)

![cnn p7](assets/images/dl/dl_cnn_p07.jpg)

![cnn p8](assets/images/dl/dl_cnn_p08.jpg)

![cnn p9](assets/images/dl/dl_cnn_p09.jpg)

![cnn p10](assets/images/dl/dl_cnn_p10.jpg)

![cnn p11](assets/images/dl/dl_cnn_p11.jpg)

![cnn p12](assets/images/dl/dl_cnn_p12.jpg)

![cnn p13](assets/images/dl/dl_cnn_p13.jpg)

![cnn p14](assets/images/dl/dl_cnn_p14.jpg)

![cnn p15](assets/images/dl/dl_cnn_p15.jpg)

![cnn p16](assets/images/dl/dl_cnn_p16.jpg)

![cnn p17](assets/images/dl/dl_cnn_p17.jpg)

![cnn p18](assets/images/dl/dl_cnn_p18.jpg)

![cnn p19](assets/images/dl/dl_cnn_p19.jpg)

![cnn p20](assets/images/dl/dl_cnn_p20.jpg)

![cnn p21](assets/images/dl/dl_cnn_p21.jpg)

![cnn p22](assets/images/dl/dl_cnn_p22.jpg)

![cnn p23](assets/images/dl/dl_cnn_p23.jpg)

![cnn p24](assets/images/dl/dl_cnn_p24.jpg)

![cnn p25](assets/images/dl/dl_cnn_p25.jpg)

![cnn p26](assets/images/dl/dl_cnn_p26.jpg)

![cnn p27](assets/images/dl/dl_cnn_p27.jpg)

![cnn p28](assets/images/dl/dl_cnn_p28.jpg)

![cnn p29](assets/images/dl/dl_cnn_p29.jpg)

![cnn p30](assets/images/dl/dl_cnn_p30.jpg)

![cnn p31](assets/images/dl/dl_cnn_p31.jpg)

![cnn p32](assets/images/dl/dl_cnn_p32.jpg)

![cnn p33](assets/images/dl/dl_cnn_p33.jpg)

![cnn p34](assets/images/dl/dl_cnn_p34.jpg)

![cnn p35](assets/images/dl/dl_cnn_p35.jpg)

![cnn p36](assets/images/dl/dl_cnn_p36.jpg)

![cnn p37](assets/images/dl/dl_cnn_p37.jpg)

![cnn p38](assets/images/dl/dl_cnn_p38.jpg)

![cnn p39](assets/images/dl/dl_cnn_p39.jpg)

![cnn p40](assets/images/dl/dl_cnn_p40.jpg)

![cnn p41](assets/images/dl/dl_cnn_p41.jpg)

![cnn p42](assets/images/dl/dl_cnn_p42.jpg)

![cnn p43](assets/images/dl/dl_cnn_p43.jpg)

![cnn p44](assets/images/dl/dl_cnn_p44.jpg)

![cnn p45](assets/images/dl/dl_cnn_p45.jpg)

![cnn p46](assets/images/dl/dl_cnn_p46.jpg)

![cnn p47](assets/images/dl/dl_cnn_p47.jpg)

![cnn p48](assets/images/dl/dl_cnn_p48.jpg)

![cnn p49](assets/images/dl/dl_cnn_p49.jpg)

![cnn p50](assets/images/dl/dl_cnn_p50.jpg)

![cnn p51](assets/images/dl/dl_cnn_p51.jpg)

![cnn p52](assets/images/dl/dl_cnn_p52.jpg)

![cnn p53](assets/images/dl/dl_cnn_p53.jpg)

![cnn p54](assets/images/dl/dl_cnn_p54.jpg)

![cnn p55](assets/images/dl/dl_cnn_p55.jpg)

![cnn p56](assets/images/dl/dl_cnn_p56.jpg)

![cnn p57](assets/images/dl/dl_cnn_p57.jpg)

![cnn p58](assets/images/dl/dl_cnn_p58.jpg)

</details>

<!-- AUTO:SLIDES:END -->
