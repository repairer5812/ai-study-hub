# 🚀 [딥러닝 6주차] 서브노트: CIFAR-10 데이터셋 처리 및 CNN 최적화 기법

## 1. 📦 CIFAR-10 데이터셋 개요 및 불러오기

### 💡 핵심 출제 포인트
- CIFAR-10 데이터셋의 구성 요소와 파이토치(PyTorch)를 이용한 전처리(Transform) 과정의 수학적/구조적 이해

### 1.1 데이터셋 기본 정보
- 이미지 분류(Image Classification) 실습에서 가장 기본적으로 사용되는 데이터셋.
- 총 데이터 수: 6만 개 (Train 데이터 5만 개 / Test 데이터 1만 개). 보통 8:2 분할을 많이 사용함.
- 클래스 수: 10가지 클래스.
- 이미지 스펙: 32x32 픽셀의 컬러(RGB) 이미지 (총 3개 채널). 픽셀 수가 낮아 블러(Blur)해 보이지만, 하드웨어 성능이 좋지 않아도 쉽게 접근할 수 있는 'Natural Image'임.
- 데이터 로드: `torchvision.datasets.CIFAR10`을 사용하여 불러옴. 로컬에 없으면 `download=True` 설정 시 자동으로 다운로드됨.

### 1.2 데이터 전처리 (Transforms)
- `transforms.ToTensor()`: 기본적으로 0~255 사이의 픽셀 값을 가지는 이미지를 **0에서 1 사이의 값을 가지는 파이토치 텐서(Tensor)**로 변환함.
- `transforms.Normalize(mean, std)`: 0에서 1 사이로 변환된 값에 대해 정규화를 수행.
    - 수학적 연산: $\frac{\text{원래 값} - \text{mean}}{\text{standard\_deviation}}$
    - 결과적으로 픽셀 값들이 **-1에서 1 사이의 값**으로 변환됨.

---

## 2. 🗂️ 데이터 분할 및 DataLoader 설정

### 💡 핵심 출제 포인트
- Train/Validation 분할 방법과 DataLoader의 파라미터(배치 사이즈, 셔플 등)의 역할

### 2.1 Train / Validation 분할
- `torch.utils.data.random_split` 사용.
- 비율: 전체 트레인셋 5만 개 중 80:20 (Train 4만 개, Validation 1만 개)으로 분할.
- 특징: 고정된 간격으로 가져오는 것이 아니라, **seed에 따라 랜덤**하게 나뉨.

### 2.2 DataLoader 설정
분할된 데이터를 모델에 올리기 위해 DataLoader를 사용.
- `batch_size`: 한 번에 계산할 데이터의 개수 (예: 64). 32, 64, 128 등으로 설정 가능.
- 💡 배치 사이즈가 커질수록 GPU가 담당해야 할 메모리 용량도 커지므로, 실험을 통해 최적의 성능을 뽑는 하이퍼파라미터 튜닝이 필요함.
- `shuffle=True`: 데이터를 불러올 때 순서를 섞을지 여부. (Train은 보통 True, Test/Val은 섞을 필요가 크게 없음).
- `num_workers`: 데이터를 불러올 때 사용할 CPU 코어 수. 높으면 빠르지만 메모리 부족 에러가 날 수 있으니 크게 신경 쓰지 않아도 됨.

---

## 3. 🖼️ 이미지 시각화 시 주의사항 (차원 변경)

### 💡 핵심 출제 포인트
- PyTorch Tensor와 Numpy Array의 이미지 차원(Dimension) 순서 차이
- PyTorch Tensor 차원: `[Channel, Height, Width]` (CHW 순서)
- Numpy 시각화 차원: 이미지를 화면에 띄우기(`imshow`) 위해서는 `[Height, Width, Channel]` (HWC 순서)로 변경해야 함.
- 해결 방법: `np.transpose` 등을 사용하여 학습할 때의 텐서 차원과 시각화할 때의 차원 순서를 서로 바꿔주어야 함. (또한 Normalize된 -1~1 값을 다시 시각화 가능한 범위로 돌려놓는 과정 필요).

---

## 4. ⚠️ DNN(Deep Neural Network) 모델 실습 및 한계점

### 💡 핵심 출제 포인트
- 이미지 분류에서 DNN(MLP)이 가지는 근본적인 문제점과 한계 (공간 정보 손실)

### 4.1 DNN 레이어 구성 (예시)
- 3개의 Linear Layer (FC1, FC2, FC3) 사용.
- 입력 차원: 32 * 32 * 3 (Flatten 필요) $\rightarrow$ 512 $\rightarrow$ 256 $\rightarrow$ 10 (클래스 개수).
- `view(-1)` 연산: Linear 레이어에 넣기 위해 2D 이미지를 1D 플랫(Flatten) 벡터로 쫙 펴주는 작업 수행. (-1은 배치 차원을 의미)
- Activation Function (ReLU): 레이어 중간중간에 ReLU를 넣지 않으면 단순 선형 결합에 불과하여 복잡한 문제를 풀 수 없음. 단, 마지막 출력(Logit) 값에는 ReLU를 쓰지 않음.

### 4.2 학습 및 평가 결과
- Validation Loss를 확인해보면 중간에 튀는 구간(오버피팅 징후)이 발생함.
- Test 데이터 기준 Accuracy: 약 51.65% (10개 중 반은 맞춤).

### 🚨 DNN의 치명적 단점 (시험 출제 유력)
1. 공간적 정보(Spatial Information) 손실: 이미지를 1D 벡터로 쫙 펴버리기(Flatten) 때문에 픽셀 간의 공간적, 인접성 정보를 전혀 얻을 수 없음.
2. 위치 변화에 취약: 특정 특징(예: 개의 얼굴)이 좌상단에 있는 사진으로만 학습했다면, 플랫된 상태에서는 개의 얼굴이 우하단에 나타날 경우 찾지 못하고 에러가 급증함.
- 결론: 이미지 분류에는 공간 정보를 유지하며 특징을 추출하는 CNN(Convolutional Neural Network)이 필수적임.

---

## 5. 🧱 CNN (Convolutional Neural Network) 기본 구조

### 💡 핵심 출제 포인트
- CNN의 파라미터(채널, 커널 사이즈, 패딩) 설정과 풀링(Pooling)을 거치며 변화하는 차원(Dimension) 계산법

### 5.1 `nn.Conv2d` 레이어 설정
- `in_channels`: 입력 채널 수 (RGB 이미지이므로 3).
- `out_channels`: 출력 채널 수 (예: 16). 사용자가 지정하는 하이퍼파라미터.
- `kernel_size`: 특징을 추출할 필터의 크기 (예: 5x5 커널이면 5로 설정).

### 5.2 차원(Dimension) 변화 계산
- 32x32 이미지에 5x5 커널을 패딩 없이 적용하면 크기가 줄어듦 (예: 32 $\rightarrow$ 28).
- Padding (패딩): 이미지 가장자리에 0 등의 값을 채워 넣는 기법.
    - 왜 사용하는가?: 패딩이 없으면 가장자리에 있는 픽셀 정보는 커널이 적게 보게 되어 정보 손실이 발생함. 패딩을 주면 가장자리 정보도 중간으로 오게 되어 학습에 유리함.

### 5.3 Pooling (풀링)
- `nn.MaxPool2d(2)`: 2x2 윈도우 안에서 가장 큰 값만 남기고 차원을 축소함.
- 채널 수는 유지되면서 공간적 크기(Width, Height)가 풀링 사이즈만큼 나누어짐 (예: 28x28 $\rightarrow$ 14x14).
- 학습하는 파라미터(Weight)가 없으므로 함수 하나만 선언해서 계속 재사용해도 무방함.

### 5.4 FC Layer 연결
- Conv와 Pooling을 다 거친 후 최종적으로 나온 텐서(예: 16채널 x 5 x 5)를 Fully Connected Layer에 넣기 위해 다시 Flatten(1D 벡터화) 해주어야 함.
- 결과: CNN을 대충 쌓기만 해도 DNN보다 성능이 오름 (약 56%). 공간 정보를 보존했기 때문.

---

## 6. ⚡ Activation Function (활성화 함수)의 변경: Leaky ReLU

### 💡 핵심 출제 포인트
- 기존 ReLU의 치명적 단점인 'Dying ReLU' 현상과 이를 해결하기 위한 Leaky ReLU의 수학적 차이
- Dying ReLU 문제: 기존 ReLU는 0보다 작은 값이 들어오면 기울기(Gradient)가 아예 0이 되어버림. 이 부분의 노드들은 학습이 죽어버리는(Dying) 현상이 발생함.
- Leaky ReLU의 도입: `nn.LeakyReLU`
    - 0보다 작은 값에 대해 완전히 0으로 만들지 않고, **아주 작은 기울기(예: 0.01)를 부여**함.
    - 결과적으로 노드가 완전히 죽는 것을 방지하여 성능이 눈에 띄게 크게 향상됨.
- 교수님 코멘트: 모델이 일반화(Generalize)가 잘 되어 있다면 큰 차이가 없을 수 있지만, 특정 태스크에서 성능을 쥐어짜내야 할 때는 여러 활성화 함수를 테스트해보는 것이 매우 중요함.

---

## 7. 🛡️ Overfitting(과적합) 방지 기법 3가지

### 💡 핵심 출제 포인트
- 모델이 정답을 '외워버리는' 현상을 막기 위한 세 가지 기법의 원리와 적용 방법

### ① Early Stopping (조기 종료)
- 개념: Train Loss는 계속 줄어들지만(데이터를 외워버림), Validation Loss가 더 이상 줄지 않고 오히려 커지기 시작하면 학습이 무의미해지므로 학습을 강제로 중단하는 기법.
- 구현 원리:
    - 매 Epoch마다 Validation Loss를 측정하여 `best_loss`를 갱신함.
    - 갱신이 안 될 경우 카운트를 올리고, 지정한 인내심 수치(patience, 예: 10번)를 초과하면 루프를 탈출(`break`)함.
- 효과: 100번 돌릴 것을 21번 만에 멈추게 하여 불필요한 가중치 훼손을 막음.

### ② Weight Decay (가중치 감쇠 / L2 Regularization)
- 개념: Loss 함수에 Weight의 크기 자체를 더해주어, 모델이 Weight 값에 너무 민감하게 반응하지 않도록(특정 특징에 과도하게 의존하지 않도록) 억제함.
- 구현: Optimizer(예: Adam)를 선언할 때 `weight_decay=0.01` 파라미터를 추가하기만 하면 라이브러리 단에서 자동으로 적용됨. (약 1% 성능 향상).

### ③ Dropout (드롭아웃)
- 개념: `nn.Dropout(p=0.25)`
    - 다음 레이어로 값을 넘길 때 지정된 확률(예: 25%)로 노드를 무작위로 죽임(0으로 만듦).
- 효과: 매번 다른 네트워크 구조를 학습하는 것과 같은 **앙상블(Ensemble)** 효과를 주어 과적합을 방지함. 주로 Conv 레이어가 끝나고 FC 레이어에 들어갈 때 사용함.

---

## 8. 🎲 Weight Initialization (가중치 초기화)

### 💡 핵심 출제 포인트
- 랜덤 초기화의 문제점과 He(Kaiming) 초기화가 ReLU와 찰떡궁합인 이유
- 기존 랜덤 초기화의 문제: 레이어가 깊어질수록 입력의 분산보다 출력의 분산이 비정상적으로 커지거나 작아져서(Gradient Vanishing/Exploding) 학습이 안 되는 문제가 발생함.
- He Initialization (Kaiming Normal):
    - ResNet의 저자 Kaiming He가 제안한 방법으로, **ReLU(Non-Linearity)를 사용할 때 특화된 초기화 기법**임.
    - 적합하게 조정된 분산 값을 바탕으로 가중치를 초기화함.
- 구현: 레이어 선언 후 `nn.init.kaiming_normal_(레이어.weight, nonlinearity='relu')` 적용. (약 2% 성능 향상).

---

## 9. 🛠️ 실무적인 CNN 아키텍처 설계 팁 및 기타 기법

### 9.1 레이어 깊게 쌓기 & 파라미터 국룰
- 채널 수는 컴퓨터 공학의 특성상 2의 거듭제곱(32, 64, 128…)을 주로 사용함.
- `kernel_size=3`, `padding=1`을 세트로 가장 많이 사용함. 이렇게 하면 Conv 레이어를 통과해도 이미지 사이즈가 유지되며, Pooling(2x2)을 거칠 때만 정확히 반절씩 줄어들어 차원 계산이 매우 직관적이고 성능도 잘 나옴.

### 9.2 Batch Normalization (배치 정규화)
- `nn.BatchNorm2d(채널수)`: Gradient Exploding/Vanishing 문제를 완화함.
- 통상적인 순서: **Conv $\rightarrow$ BatchNorm $\rightarrow$ Activation(ReLU) $\rightarrow$ Pooling** (단, 최신 연구에 따라 Activation을 먼저 하는 경우도 있으나 기본적으로 이 순서를 권장).

### 9.3 Data Augmentation (데이터 증강)
- 이미지 회전, 뒤집기, 자르기 등을 통해 데이터를 인위적으로 변형시켜 학습 데이터를 늘림.
- 원리: 모델이 학습하기 어려워질수록 데이터를 단순히 외우는 것이 불가능해져서, 결과적으로 **일반화(Generalization)** 성능이 크게 향상됨. (교수님 코드 시연 중 버그로 성능이 13%로 떨어지는 해프닝이 있었으나, 정상 적용 시 성능 향상됨).

---

## 10. 📝 교수님 Q&A 및 과제/시험 안내 (필독)
- 시험 일정: RNN과 RNN 실습 강의가 끝난 후 다음 주쯤에 진행될 예정 (강의 계획서 기준, 변동 가능).

### 👨‍💻 과제 안내 (CIFAR-10 모델 직접 구현하기)
- 라이브러리에 있는 ResNet 등을 그대로 `import`해서 쓰면 90% 이상 나오지만 절대 금지.
- ResNet 구조를 쓰고 싶다면 클래스에 직접 레이어를 짜서 구현해야 함.
- 평가 기준: 성능이 무조건 높아야 하는 것은 아님. 레이어를 더 쌓아보고, 활성화 함수를 바꿔보고, 증강 기법을 넣고 빼보는 등 **"어떤 시도를 했을 때 어떤 차이가 있었는지 그 이유를 설명"**하는 것이 핵심.
- 성능이 오히려 떨어졌더라도, 떨어진 이유를 논리적으로 분석해서 적으면 점수에 불이익 없음.

<!-- AUTO:SLIDES:START -->

---

## 강의 슬라이드 (원본 PDF 페이지 렌더)

### CNN (실습 관련)

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
