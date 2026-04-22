# 🚀 [딥러닝 7주차] 서브노트: RNN (Recurrent Neural Networks)

교수님의 강의 스크립트, 슬라이드, 메모를 바탕으로 지엽적인 내용과 Q&A까지 모두 담아낸 서브노트입니다. **중간고사가 서술형(오픈북/강의자료 허용)** 인 만큼, 개념의 확실한 이해와 정확한 키워드 서술이 중요합니다.

---

## 📅 0. 학사 일정 및 행정 사항 (시험 & 프로젝트)

### 💡 출제 포인트: 서술형 중간고사 유의사항 및 프로젝트 일정 숙지

### 중간고사 (5월 11일)
- **형식**: 서술형 (Descriptive)
- **조건**: 전자기기 사용 불가, 단 **강의자료(오픈북)** 는 얼마든지 지참 및 참고 가능.
- **교수님 코멘트**: "질문했던 거 생각해보라고 해서 그런 거에 다 외워서 쓰는 건 없어요. 강의자료 가져가서 보세요." (단순 암기보다는 이해와 적용을 묻는 서술형 출제 예상)

### Term Project 일정
- **6월 1일까지**: 창의적인 주제를 선정하여 **미리 찍은 동영상 제출 (10분 이내)**.
- **6월 2일 ~ 7일 (1주일간)**: 제출된 동영상을 보고 **동료 평가(Peer Review)** 진행.
- **발표 당일**: 별도 발표 없이 **질의응답(Q&A)만 진행** (수강생이 60명으로 많아 시간 단축을 위해 동영상 대체).

---

## 🧠 1. RNN (Recurrent Neural Network)의 기본 개념

### 💡 출제 포인트: RNN이 다루는 데이터의 특징과 'State Vector'의 정확한 정의

- **RNN의 목적**: 타임시리즈(Time-series, 시계열) 시간 정보를 갖고 있거나, **순서(Sequence)가 중요한 데이터**를 처리하기 위해 고안된 신경망.

### State Vector (상태 벡터)
- MLP에서의 Hidden state, CNN에서의 Feature map에 해당하는 개념.
- 기계학습의 **Hidden Markov Model**이나 **칼만 필터** 등 시계열을 다루는 모델에서 사용하는 '상태(State) 전이' 개념을 그대로 가져온 용어.
- 💡 **핵심 정의**: **"Encoded Memory"**. 시간적으로 흘러가면서 특정 시간에 과거의 모든 히스토리 데이터를 다 가져오는 것이 아니라, **과거의 히스토리 데이터가 State Vector 안에 압축(Encoded)되어 기억**된다는 개념.

### RNN의 구조적 특징: 루프(Loop)와 타임 딜레이(Time Delay)
- 일반적인 피드포워드(Feed-forward) 신경망에는 루프가 없지만, RNN에는 **히든 레이어에 루프**가 존재.
- 이 루프는 **One Time Delay**를 의미. 즉, 같은 타임에 돌아오는 것이 아니라 $t-1$ 시점의 신호가 $t$ 시점의 입력으로 들어옴.
- 이를 시간축(Time-step)으로 펼쳐보면(**Unfold**), 이전 시점($t-1$)의 State가 현재 시점($t$)의 State 계산에 입력으로 들어오는 구조가 됨.

---

## ⚖️ 2. DNN vs CNN vs RNN 전격 비교

### 💡 출제 포인트: 세 가지 신경망의 가중치 공유(Weight Sharing) 방식과 데이터 처리 특징 차이 서술

| 특징 | DNN (Deep Neural Networks) | CNN (Convolutional Neural Networks) | RNN (Recurrent Neural Networks) |
|------|---------------------------|-------------------------------------|--------------------------------|
| **유닛 특성** | 각각의 유닛이 Special unit임 | 커널(Kernel)을 통한 Convolution 연산 | State Vector를 통한 순차적 연산 |
| **가중치(Weight) 공유** | 공유하지 않음 (Learns all rules/patterns separately) | **공간적(Spatial) 위치**에 따라 공유 (Shares across position) | **시간축(Time steps)**에 따라 공유 (Shares across time steps) |
| **표현력 / 패턴 탐색** | 서로 다른 Connection weight를 두어 표현력이 매우 높음 | 국소적(Local) 패턴을 찾는 데 특화됨 | 임의의 신호 길이(Sequence)의 패턴을 기억하고 처리함 |
| **입력 크기** | 고정된 벡터 사이즈 필요 | 기본적으로 사이즈가 정해짐 (특수 풀링 제외) | 💡 **임의의 신호 길이(Arbitrary length) 처리 가능** |

- **CNN에 대한 교수님 코멘트**: CNN은 데이터를 강제로 벡터로 바꾸지 않고 원래 구조를 유지하며, 동일한 패턴이 어디에 있는지(Translation invariance) 찾는 데 유리.
- **RNN에 대한 교수님 코멘트**: RNN의 가장 큰 장점은 트레이닝 시 사용한 입력 길이와 상관없이, 테스트 시 **임의의 신호 길이(Arbitrary length)** 가 와도 유연하게 처리할 수 있다는 점.

---

## 🔥 3. [★★★ 교수님이 직접 던진 오픈형 질문 — 출제 유력!]

### 💡 핵심 출제 포인트: 시계열 데이터에 RNN 대신 CNN을 적용했을 때의 장단점

> **교수님 발언 (강의 스크립트 10:39 ~ 11:07)**:
> "자, 그러면 시간축으로 계산하는 데 있어서 **(시계열 데이터에) CNN은 쓸 수 없겠느냐?** 있겠어요? 없겠어요? **잘 생각해보십시오.** 타임시리즈(Time-series) 시간 데이터에 대해서 CNN을 쓴다면 **어떤 장단점이 생길 것이냐, 어떤 특징들이 생길 것이냐, 그런 걸 한번 생각을 해보시면 좋을 것 같아요.**"

교수님은 이 질문을 던지신 후 **바로 다음 주제로 넘어가셨습니다.** 즉, 답을 주지 않고 "스스로 생각해보라"는 형태의 **시험 출제 예고 떡밥**입니다.

### 💯 A+ 답안 작성을 위한 모범 분석

#### 1. 시계열 데이터에 CNN 적용 가능 여부
- **적용 가능합니다.** (보통 **1D-CNN** 형태로 오디오 신호, 주식 데이터 등의 시계열 처리에 실제로 많이 사용됨)

#### 2. 시계열 데이터에 CNN을 적용했을 때의 장점 (Pros)
- **병렬 연산(Parallelization) 가능**: RNN은 $t$ 시점의 연산을 위해 $t-1$ 시점의 결과가 반드시 필요하여 순차적 연산만 가능(GPU 활용도 저하)하지만, CNN은 커널(Kernel)을 이용해 **전체 시퀀스에 대해 동시에 합성곱 연산**을 수행할 수 있어 학습 속도가 매우 빠릅니다.
- **국소적(Local) 패턴 추출에 탁월**: CNN의 커널은 특정 윈도우 사이즈 내의 패턴을 찾는 데 특화되어 있습니다. 따라서 시계열 데이터 내에서 **'짧은 시간 동안 발생하는 특정 패턴'**(예: 음성 신호의 특정 음소 파형, 주가의 단기 급등락 패턴)을 포착하는 데 매우 유리합니다.

#### 3. 시계열 데이터에 CNN을 적용했을 때의 단점 및 한계 (Cons)
- **임의의 길이(Arbitrary Length) 처리의 어려움**: RNN은 길이에 상관없이 데이터를 유연하게 처리할 수 있지만, CNN은 기본적으로 입력 크기나 필터 사이즈가 고정되어 있어 길이가 들쭉날쭉한 시퀀스 데이터를 다루기 까다롭습니다. (패딩 등의 추가 작업 필요)
- **장기 의존성(Long-term Dependency) 파악 부족**: RNN은 'State Vector(인코딩된 메모리)'를 통해 과거의 히스토리를 **압축하여 계속 끌고 가지만**, CNN은 지정된 커널 사이즈(Receptive Field) 밖의 먼 과거 정보는 고려하지 못합니다. 즉, 문장의 맨 앞 단어가 맨 뒤 단어에 영향을 미치는 것과 같은 **긴 문맥을 파악하는 데 불리**합니다.

> 📝 **시험 서술 요령**: "CNN의 병렬 처리 및 로컬 패턴 인식의 장점"과 "RNN의 임의 길이 처리 및 장기 기억(메모리) 유지의 장점"을 **대비시켜 서술**하는 것이 교수님이 원하시는 출제 의도입니다.

---

## 🏗️ 4. RNN의 다양한 아키텍처 (입출력 구조)

### 💡 출제 포인트: 각 구조(1:N, N:1, N:M)의 명칭과 대표적인 실제 응용 사례 매칭

기본적인 **1:1 (One-to-One)** 구조는 일반적인 신경망과 같지만, RNN은 입력과 출력의 시퀀스 길이에 따라 다양한 구조를 가짐.

### One-to-Many (1:N)
- **구조**: 입력은 Static한 1개, 출력은 시퀀스(여러 개).
- **대표 사례: Image Captioning (이미지 캡셔닝)**
    - 입력: 정지된 이미지 1장 (Static)
    - 출력: 이미지를 설명하는 문장 (Sequence of words)

### Many-to-One (N:1)
- **구조**: 입력은 시퀀스로 쭉 들어오고, 출력은 최종적으로 1개만 생성.
- **대표 사례: Sentiment Analysis (감성 분석)**
    - 입력: 댓글이나 리뷰 문장 (Sequence of words)
    - 출력: 긍정/부정 판별 결과 1개

### Many-to-Many (N:M)
- **구조**: 입력도 시퀀스, 출력도 시퀀스.
- **대표 사례 1: Machine Translation (기계 번역)**
    - 한국어 문장(Sequence)을 영어 문장(Sequence)으로 번역.
- **대표 사례 2: Speech Recognition (음성 인식)**
    - 음성 신호(Sequence)가 들어오면 그에 대응하는 단어(Sequence)를 출력.

---

## ⚙️ 5. RNN의 내부 연산과 함수 (Computational Graph)

### 💡 출제 포인트: 매 타임스텝마다 동일한 파라미터(W)가 공유된다는 사실과, 활성화 함수로 ReLU 대신 **tanh를 주로 쓰는 이유** 서술

### 기본 수식 및 파라미터 공유
$$h_t = f_W(h_{t-1}, x_t)$$

- 이전 시점의 상태 벡터($h_{t-1}$)와 현재 시점의 입력($x_t$)을 받아 새로운 상태 벡터($h_t$)를 계산합니다.
- 💡 **매우 중요한 특징**: **"The same function and the same set of parameters are used at every time step."** 임의의 시간(Time step)에 대해 **동일한 가중치 파라미터(W)를 공유**합니다.
- 만약 타임마다 가중치를 다르게 둔다면, 테스트(Inference) 시 **임의의 길이의 시퀀스 데이터에 모델을 적용할 수 없게** 됩니다.

### 활성화 함수 (Activation Function): 왜 ReLU가 아닐까?
- CNN에서는 ReLU 계열을 많이 쓰지만, **RNN 계열에서는 ReLU를 쓰면 값이 발산(폭발)하는 문제**가 발생하기 쉽습니다. (양수 값만 계속 더해지며 커지기 때문)
- 따라서 상태 전이(State transition) 함수로 주로 **tanh (Hyperbolic tangent)** 를 사용합니다. 실험적으로 언어나 음성 인식 등에서 안전하게 잘 작동한다고 알려져 있습니다.

### 출력(Output, $y_t$)과 손실(Loss, $L$) 계산
- 출력 $y_t$는 매 타임스텝마다 계산할 필요는 없습니다. (예: Many-to-One에서는 맨 마지막에만 계산)
- Many-to-Many 구조의 경우, 각 타임스텝마다 Loss($L_1, L_2, ..., L_t$)를 계산하고, 최종 샘플 하나에 대한 Loss는 이 **모든 Loss를 합친 값(Sum)** 이 됩니다.

---

## 🔤 6. 구체적 예시: Character-Level Language Model ("hello")

### 💡 출제 포인트: "hello"를 학습하고 생성하는 과정, 그리고 **훈련(Training)과 추론(Inference) 시 입력값을 다르게 주는 이유(Robustness)**

교수님께서 가장 심플한 케이스로 알파벳 시퀀스를 입력받아 다음 알파벳을 예측하는 **언어 모델(Language Model)** 을 예로 드셨습니다.

### 1) 데이터 세팅 및 입력 구조
- **Vocabulary (사전)**: 편의상 'h', 'e', 'l', 'o' 딱 4개만 있다고 가정.
- **One-hot Encoding**: 단어(문자)를 벡터로 표현하기 위해 원핫 인코딩 사용.
    - h = [1, 0, 0, 0]
    - e = [0, 1, 0, 0]
    - l = [0, 0, 1, 0]
    - o = [0, 0, 0, 1]
- **목표(Target)**: 'h'가 들어가면 다음 문자인 'e'가 나와야 함. 'e'가 들어가면 'l'이 나와야 함.

### 2) 추론(Inference/Test) 과정과 샘플링 방식
첫 번째 캐릭터 'h'를 던져주면, 히든 레이어를 거쳐 아웃풋 레이어에서 4개의 캐릭터 중 하나를 선택하기 위해 **Softmax**를 통과시킵니다. (확률 분포 생성)

#### 💡 생성(Generation) 방식의 2가지 갈래
- **Deterministic (결정론적)**: Softmax 결과 중 무조건 가장 확률이 높은(Max) 값만 선택. 똑같은 입력에는 항상 똑같은 출력만 나옴. (**Argmax** 사용)
- **Stochastic (확률론적 / Random Sampling)**: 확률 분포에 따라 **랜덤하게 샘플링**. 0.03처럼 매우 낮은 확률이라도 뽑힐 가능성이 존재하므로, 끝없이 다양한 출력을 만들어낼 수 있음. (다양성 확보)

이렇게 생성된 출력(예: 'e')은 **다음 타임스텝의 입력으로 다시 들어갑니다.** (이전까지의 히스토리는 State Vector에 인코딩되어 있음)
- 이를 **Auto-regressive (자기 회귀)** 특성이라고 하며, **GPT 같은 최신 생성형 AI 모델도 이와 똑같은 원리**를 사용합니다.

### 3) 훈련(Training) 시의 특별한 테크닉 (노이즈 주입 / Teacher Forcing 개념)
- 학습을 할 때는 정답(Target)을 이미 알고 있습니다. (h → e → l → l → o)
- 하지만 **항상 완벽한 정답 시퀀스만 입력으로 주지 않고**, 어떤 때는 현재 파라미터로 모델이 직접 샘플링(예측)한 잘못된 값을 다음 입력으로 집어넣기도 합니다. (예: h 다음에 e가 아니라 o가 나왔더라도, 그 o를 다음 입력으로 줘봄)
- **이유**: 모델의 **다양성(Diversity)과 강건성(Robustness)** 을 높이기 위함입니다. 테스트 시 뜬금없는 캐릭터가 나왔을 때 모델이 완전히 무너지는 것을 방지하고, 잘못된 값이 나와도 다시 제대로 된 궤도로 돌아올 수 있도록 학습시키는 것입니다.

---

## 🙋‍♂️ 7. Q&A: Tokenizer와 Word Embedding

### 💡 출제 포인트: 실제 NLP 환경에서 One-hot Vector의 한계점과 해결책 (Word Embedding)

- **학생 질문**: "토크나이저(Tokenizer) 개념이 녹아있는 건가요? 입력 벡터는 무조건 원핫 벡터인가요?"
- **교수님 답변**:
    - 현재 예시는 'Character-Level'이라 쪼갤 필요가 없어 토크나이저가 안 들어간 아주 단순한 예시임.
    - 실제 언어 모델(NLP)에서는 Vocabulary(사전) 사이즈가 **수십~수백만 개**에 달함.
    - 이를 100만 차원의 원핫 벡터로 만들면 **파라미터가 너무 많아지고 차원의 저주**에 빠지는 문제가 발생함.
    - **해결책**: 특정 단어를 **조밀한 벡터(Dense Vector)로 표현**하는 **Word Embedding (워드 임베딩)** 기술을 사용함. 대표적으로 **Word2Vec, GloVe** 등이 있으며, 이를 통해 **비슷한 의미의 단어는 벡터 공간에서 비슷한 위치를 가지게** 됨.

---

## 📝 8. Word-Level 언어 모델 학습 및 Loss 계산

### 💡 출제 포인트: 시퀀스 전체의 Loss 계산 방식과 학습 시의 Deterministic한 특성 이해

- **예시 문장**: "The students opened their exams"
- **입력 방식**: 앞서 배운 Character-level과 달리, 각 단어(Word)에 해당하는 **임베딩 벡터(Embedding Vector)** 를 가져와서 입력으로 사용합니다.

### 학습(Training) 시의 특징:
- 학습할 때는 추론(Inference) 때처럼 Stochastic(확률적)하게 **샘플링하지 않습니다.**
- **Deterministic(결정론적)** 하게 정답(Target)과 비교합니다. 예를 들어 "The students"가 들어갔을 때 무조건 "opened"가 나와야 하므로, 다른 단어의 확률이 높아지지 않도록 강제합니다.
- 이때 사용하는 **Loss 함수는 Negative Log-Likelihood** 입니다.

### 최종 Loss 계산:
- 매 타임스텝마다 정답 단어와 예측 단어를 비교하여 Loss($L_1, L_2, ..., L_t$)를 계산합니다.
- 문장이 끝날 때까지 발생한 **모든 타임스텝의 Loss를 다 합친 것(Sum)** 이 해당 문장(샘플 1개)에 대한 최종 Loss가 됩니다.

---

## 🔄 9. BPTT (Backpropagation Through Time)와 Truncated BPTT

### 💡 출제 포인트: 가중치(W)가 공유되는 RNN에서 미분(Gradient)을 계산하는 방법과 긴 시퀀스 처리 시의 문제점 및 해결책 서술

### 가중치(W)에 대한 미분(Gradient) 계산법
- RNN은 모든 타임스텝에서 **동일한 가중치 행렬 $W$를 공유**합니다.
- 그렇다면 $W$에 대한 미분값은 어떻게 구할까요?
- 💡 **핵심**: **"The gradient with respect to $W$ is the sum of the gradients with respect to $W$ at each time step."**
- 즉, **각 타임스텝에서 구한 $W$의 편미분 값들을 단순히 모두 더해줍니다(Sum)**.

### BPTT (Backpropagation Through Time)
- RNN의 역전파 알고리즘입니다. 시간축을 따라 포워드 패스(Forward pass)를 끝까지 진행한 후, 끝에서부터 거꾸로 역전파(Backward pass)를 수행하며 그래디언트를 계산합니다.

### 문제점: 긴 시퀀스(Long Sequence)
- 입력 길이가 너무 길어지면, 끝까지 갔다가 처음으로 다시 돌아오는 계산 과정이 **너무 오래 걸리고 메모리도 많이 차지**합니다.

### 해결책: Truncated BPTT (잘린 BPTT)
- 전체 시퀀스를 한 번에 처리하지 않고, **유의미하다고 판단되는 일정 길이(Chunk, 예: 슬라이드 기준 7개 단위)로 잘라서** 학습합니다.
- 7개 스텝까지만 포워드 패스를 하고, 거기서 바로 Loss를 계산하여 역전파 및 파라미터 업데이트를 수행한 뒤, 업데이트된 파라미터로 다음 7개 스텝을 진행하는 방식입니다.

---

## 🔍 10. State Vector의 해석 (Interpretable Cells)

### 💡 출제 포인트: 교수님이 매우 흥미로워하신 부분! Hidden State 안의 **개별 Element들이 실제로 어떤 역할을 하는지** 구체적 예시와 함께 이해하기

### RNN의 놀라운 생성 능력 (재미있는 예시들)
- **셰익스피어의 소네트(시)**를 학습시키면 그럴싸한 운율과 구조를 가진 시를 생성합니다.
- **리눅스 C 코드**를 학습시키면 변수 선언, for/if문, 주석(Comment), 심지어 들여쓰기(Indentation)와 괄호 열고 닫기까지 완벽하게 흉내 냅니다.

### Interpretable Cells (해석 가능한 셀)
- 연구자들이 "도대체 State Vector 안의 각각의 Element(유닛)들은 무슨 역할을 할까?" 궁금해서 값을 **컬러 코딩(Color coding, 양수는 빨간색, 음수는 파란색 등)** 해보았습니다.
- 💡 **관찰 결과**: 특정 셀들이 아주 명확한 목적(기억)을 가지고 작동하고 있음이 밝혀졌습니다.

| 셀 종류 | 작동 방식 |
|---------|-----------|
| **Quote Detection Cell** (따옴표 탐지 셀) | 따옴표가 열리는 순간 파란색(음수)으로 바뀌고, 닫히는 순간 다시 빨간색(양수)으로 바뀜. 즉, 따옴표가 열려있다는 사실을 **기억** |
| **Line Length Cell** (줄 길이 셀) | 문장이 길어질수록 값이 점진적으로 변하며, **마침표가 나와야 할 타이밍**("굉장히 길어지고 있어!")을 기억 |
| **If-statement Cell** (조건문 셀) | C 코드에서 if문이 열렸을 때 이를 기억하고 로직을 추적 |

- **결론**: 앞에서 배운 **"Encoded Memory (인코딩된 메모리)"** 라는 개념이 실제로 State Vector 안의 개별 Element 단위에서 수행되고 있음을 증명합니다.

---

## 🍔 11. 심화 구조: Bi-directional RNN & Deep RNN

### 💡 출제 포인트: 양방향 RNN의 입력 처리 방식과, RNN에서 레이어를 무작정 깊게 쌓지 않는 이유 서술

### Bi-directional RNN (양방향 RNN)
- 일반적인 RNN은 **과거에서 현재 방향(순서대로)** 으로만 정보를 전달합니다.
- 하지만 문맥을 파악할 때 **뒤에 오는 단어가 현재 단어의 의미를 결정하는 경우**도 많습니다.
- **구조**: 시퀀스가 모두 주어진 상황에서, 1) 앞에서부터 순서대로 오는 RNN과 2) 뒤에서부터 거꾸로 오는 RNN **두 개를 돌립니다.**
- 출력할 때는 이 **두 방향에서 온 Hidden State Vector를 Concatenate(결합)** 하여 아웃풋으로 연결합니다.

### Deep RNN (Multi-layer RNN)
- 입력 → 히든 → 출력의 기본 2-Layer 구조를 넘어, 히든 레이어를 여러 층(Stack) 쌓을 수 있습니다.
- 💡 **교수님 코멘트 (Q&A)**: **"RNN 계열은 통상적으로 3대(3층) 이상을 잘 쓰지 않습니다."**
- **이유**: CNN(ResNet 등)처럼 레이어를 수십, 수백 층 쌓는다고 해서 성능이 극적으로 좋아지지 않으며, 오히려 **파라미터가 너무 많아져 연산량만 기하급수적으로** 늘어납니다. 따라서 RNN은 보통 **얇고 넓게(Thin and Wide) 2개 정도의 히든 레이어**만 사용하는 것이 일반적입니다.

---

## 🚀 12. RNN의 다양한 실제 응용 사례 (Applications)

### 💡 출제 포인트: 각 응용 분야에서 RNN이 어떻게 입력과 출력을 구성하는지, 어떤 테크닉이 쓰이는지 매칭하기

### 1) POS Tagging / Named Entity Recognition (품사 태깅 / 개체명 인식)
- **구조**: Many-to-Many
- **방식**: 문장이 들어왔을 때 각 단어가 명사인지, 동사인지, 형용사인지 등 문법적 기능을 순차적으로 분류합니다.

### 2) Sentence Classification (문장 분류 / 감성 분석)
- **구조**: Many-to-One
- **방식 1 (가장 간단함)**: 모든 문장을 다 읽고, **마지막 Hidden State만 가져와서** 긍정/부정(또는 클래스)을 출력합니다.
- **방식 2 (더 발전된 형태)**: 각 타임스텝의 **모든 Hidden State Vector를 다 가져와서 평균(Pooling)** 을 냅니다. 이를 문장을 대표하는 **'Sentence Encoding Factor'** 로 사용하여 최종 결정을 내립니다.

### 3) Speech Recognition (음성 인식)
- **구조**: Many-to-Many (Sequence to Sequence)
- **방식**: 음성 파형(Audio)을 인코더(CNN 등)로 잘라서 특징 벡터로 만든 뒤 RNN에 넣습니다.
- **핵심 테크닉**: **`<Start>`와 `<End>`라는 Special Component (스페셜 토큰)** 를 사용합니다. 음성 입력을 바탕으로 `<Start>`가 나오면 텍스트 생성을 시작하고, `<End>`가 나오면 문장이 끝났음을 인지하고 생성을 멈춥니다.

### 4) Question Answering (질의 응답)
- **방식**:
    1. 질문(Question) 문장을 RNN에 넣어 하나의 **대표 벡터(인코딩 벡터)** 로 만듭니다.
    2. 답안 후보(Candidate 1, 2, 3...) 문장들도 각각 RNN에 넣어 벡터로 만듭니다.
    3. 질문 벡터와 각 답안 벡터를 **내적(Dot Product / Scale Product)** 하여 **코사인 유사도(Cosine Similarity)** 를 구합니다.
    4. 유사도가 가장 높은 답안을 최종 정답으로 채택합니다.

---

## 🖼️ 13. Image Captioning 심화 (CNN + RNN의 융합)

### 💡 출제 포인트: VGG 네트워크를 사용할 때 **마지막 레이어를 버리는 이유**와 두 신경망이 연결되는 지점 서술

- **기본 개념**: 정지된 이미지(Static)를 보고, 이를 설명하는 문장(Sequence)을 생성하는 모델.

### CNN의 역할 (이미지 인코딩):
- 이미지넷(ImageNet) 등으로 **사전 학습된 VGG 네트워크**를 주로 가져다 씁니다.
- 💡 **중요 포인트**: **VGG의 맨 마지막 Softmax 레이어와 최종 Hidden 레이어는 버려버립니다(날려버림).**
- **버리는 이유**: 마지막 레이어들은 1,000개의 클래스(개, 고양이 등)를 **'분류(Classification)'하는 데에만 너무 특화**되어 있어서, 오히려 **이미지를 풍부하게 설명(Describe)하는 하이레벨 정보는 잃어버렸을** 수 있기 때문입니다.
- 따라서 그 이전 단계의 레이어에서 추출한 벡터를 이미지를 대표하는 **임베딩 벡터**로 사용합니다.

### RNN의 역할 (문장 생성):
- CNN에서 추출한 이미지 벡터를 **RNN의 초기 State Vector (초기 메모리 컨디션)** 로 넘겨줍니다.
- 이후 `<Start>` 토큰을 주면, 모델이 이미지 정보를 바탕으로 단어를 하나씩 샘플링하며 문장을 만들어냅니다 (**Auto-regressive**).

---

## ⚠️ 14. RNN의 치명적인 단점과 최신 동향

### 💡 출제 포인트: RNN이 GPU 연산에 불리한 이유를 정확히 서술할 수 있어야 합니다

### 1) GPU 병렬 처리(Parallelization)의 한계 (매우 중요 ⭐)
- RNN은 태생적으로 $t$ 시점의 연산을 하려면 반드시 $t-1$ 시점의 계산 결과(State Vector)가 필요합니다.
- 즉, 데이터가 아무리 많아도 **순차적으로만 계산**해야 하므로 연산을 동시에 쪼개서 처리하는 **GPU의 병렬 처리 장점을 살리기 매우 어렵**습니다.
- (이 문제를 해결하기 위해 훗날 **병렬 처리가 가능한 'Transformer'** 가 등장하게 됩니다.)

### 2) 학습 과정의 문제 (Gradient Vanishing / Exploding)
- 시퀀스가 길어질수록 기울기가 소실되거나 폭발하는 문제가 발생하며, 이를 해결하기 위해 **다음 주차에 배울 LSTM, GRU 모델이 등장**했습니다.

### 3) 최신 동향 언급 (참고용)
- 요즘은 병렬 처리가 되는 **Transformer**를 많이 쓰지만, 최근에는 RNN처럼 순차적 메모리를 가지면서도 하드웨어 병렬 처리를 극대화한 **Mamba(맘바)** 라는 모델도 주목받고 있다고 덧붙이셨습니다.

---

## 🙋‍♂️ 15. 교수님 Q&A 및 시험 꿀팁

### Q1: 역전파(BPTT) 시, 언어의 특성(영어는 앞이 중요, 한국어는 뒤가 중요)에 따라 시간에 따른 가중치를 다르게 줄 수 있나요?
- **A (교수님)**: 좋은 접근입니다! 주어진 데이터량이 적을 때, 우리가 가진 사전 지식(Prior Knowledge)을 활용해 특정 타임스텝의 Gradient에 비례/반비례하는 **가중치를 곱해주는 방식을 실제로 적용**할 수 있습니다. (이것이 훗날 **Attention 메커니즘의 철학**과 맞닿아 있습니다.)

### Q2: 이미지는 무조건 CNN만 쓰나요? RNN을 쓸 수는 없나요?
- **A (교수님)**: CNN은 입력 사이즈가 다르면 처리하기 까다롭다는 단점이 있습니다. 따라서 **이미지를 100x100 픽셀 단위나 가로/세로 패치(Patch) 단위의 시퀀스(Sequence)로 잘라서 RNN에 넣는 방식**도 실제로 연구되고 사용됩니다.

### 💡 중간고사 출제 팁 (교수님 오피셜)
> **"수식 절대 외워서 쓰라는 얘기 안 냅니다."**

즉, $h_t = f_W(h_{t-1}, x_t)$ 같은 수식을 토씨 하나 안 틀리고 외우는 것보다, **이 수식이 의미하는 바(파라미터 공유, 이전 상태의 반영 등)를 글로 풀어서 명확하게 서술**하는 것이 A+의 핵심입니다.

---

## 🎯 7주차 최종 암기 체크리스트

### RNN 기본
- [ ] State Vector = **Encoded Memory** (과거 히스토리를 압축 기억)
- [ ] 루프 = One Time Delay ($t-1$ → $t$)
- [ ] Unfold (시간축으로 펼치기)

### DNN vs CNN vs RNN
- [ ] 가중치 공유: **DNN 없음 / CNN 공간 / RNN 시간**
- [ ] 입력 길이: RNN만 **Arbitrary length** 가능

### 🔥 교수님 오픈형 질문 (핵심!)
- [ ] **"시계열 데이터에 CNN 적용 시 장단점"**
- [ ] CNN 장점: 병렬 연산 + 로컬 패턴
- [ ] CNN 단점: Arbitrary length 처리 어려움 + Long-term dependency 부족

### 구조 매칭
- [ ] 1:N → Image Captioning
- [ ] N:1 → Sentiment Analysis
- [ ] N:M → Machine Translation, Speech Recognition

### 내부 연산
- [ ] **tanh** 사용 이유 (ReLU는 발산 위험)
- [ ] **동일 파라미터 W** 시간축 공유
- [ ] Loss = 모든 타임스텝 합 (Sum)

### 학습 메커니즘
- [ ] BPTT: Gradient는 **각 타임스텝 편미분의 합**
- [ ] Truncated BPTT: 긴 시퀀스를 청크로 잘라 학습
- [ ] Training: Deterministic + NLL Loss / Inference: Stochastic 샘플링 가능

### 심화 구조
- [ ] Bi-directional RNN: 양방향 Hidden State Concat
- [ ] Deep RNN: **3층 이상 잘 안 씀** (표현력 한계)

### 응용
- [ ] Image Captioning: **VGG 마지막 레이어 제거** → 이미지 임베딩 → RNN 초기 State
- [ ] Speech Recognition: `<Start>` / `<End>` 토큰

### 치명적 단점
- [ ] **GPU 병렬화 불가** ($t$는 $t-1$ 의존)
- [ ] Gradient Vanishing/Exploding → LSTM/GRU 등장
- [ ] 해결 → Transformer, Mamba

### 시험 대비 원칙
- [ ] **서술형 오픈북** (5월 11일)
- [ ] **수식 암기 X, 의미 서술 ○**
- [ ] 교수님이 던진 **오픈형 질문**은 반드시 스스로 정리해 두기

<!-- AUTO:SLIDES:START -->

---

## 강의 슬라이드 (원본 PDF 페이지 렌더)

### RNN

<details><summary>슬라이드 42장 펼치기</summary>

![rnn p1](assets/images/dl/dl_rnn_p01.jpg)

![rnn p2](assets/images/dl/dl_rnn_p02.jpg)

![rnn p3](assets/images/dl/dl_rnn_p03.jpg)

![rnn p4](assets/images/dl/dl_rnn_p04.jpg)

![rnn p5](assets/images/dl/dl_rnn_p05.jpg)

![rnn p6](assets/images/dl/dl_rnn_p06.jpg)

![rnn p7](assets/images/dl/dl_rnn_p07.jpg)

![rnn p8](assets/images/dl/dl_rnn_p08.jpg)

![rnn p9](assets/images/dl/dl_rnn_p09.jpg)

![rnn p10](assets/images/dl/dl_rnn_p10.jpg)

![rnn p11](assets/images/dl/dl_rnn_p11.jpg)

![rnn p12](assets/images/dl/dl_rnn_p12.jpg)

![rnn p13](assets/images/dl/dl_rnn_p13.jpg)

![rnn p14](assets/images/dl/dl_rnn_p14.jpg)

![rnn p15](assets/images/dl/dl_rnn_p15.jpg)

![rnn p16](assets/images/dl/dl_rnn_p16.jpg)

![rnn p17](assets/images/dl/dl_rnn_p17.jpg)

![rnn p18](assets/images/dl/dl_rnn_p18.jpg)

![rnn p19](assets/images/dl/dl_rnn_p19.jpg)

![rnn p20](assets/images/dl/dl_rnn_p20.jpg)

![rnn p21](assets/images/dl/dl_rnn_p21.jpg)

![rnn p22](assets/images/dl/dl_rnn_p22.jpg)

![rnn p23](assets/images/dl/dl_rnn_p23.jpg)

![rnn p24](assets/images/dl/dl_rnn_p24.jpg)

![rnn p25](assets/images/dl/dl_rnn_p25.jpg)

![rnn p26](assets/images/dl/dl_rnn_p26.jpg)

![rnn p27](assets/images/dl/dl_rnn_p27.jpg)

![rnn p28](assets/images/dl/dl_rnn_p28.jpg)

![rnn p29](assets/images/dl/dl_rnn_p29.jpg)

![rnn p30](assets/images/dl/dl_rnn_p30.jpg)

![rnn p31](assets/images/dl/dl_rnn_p31.jpg)

![rnn p32](assets/images/dl/dl_rnn_p32.jpg)

![rnn p33](assets/images/dl/dl_rnn_p33.jpg)

![rnn p34](assets/images/dl/dl_rnn_p34.jpg)

![rnn p35](assets/images/dl/dl_rnn_p35.jpg)

![rnn p36](assets/images/dl/dl_rnn_p36.jpg)

![rnn p37](assets/images/dl/dl_rnn_p37.jpg)

![rnn p38](assets/images/dl/dl_rnn_p38.jpg)

![rnn p39](assets/images/dl/dl_rnn_p39.jpg)

![rnn p40](assets/images/dl/dl_rnn_p40.jpg)

![rnn p41](assets/images/dl/dl_rnn_p41.jpg)

![rnn p42](assets/images/dl/dl_rnn_p42.jpg)

</details>

### LSTM/GRU

<details><summary>슬라이드 18장 펼치기</summary>

![lstm_gru p1](assets/images/dl/dl_lstm_gru_p01.jpg)

![lstm_gru p2](assets/images/dl/dl_lstm_gru_p02.jpg)

![lstm_gru p3](assets/images/dl/dl_lstm_gru_p03.jpg)

![lstm_gru p4](assets/images/dl/dl_lstm_gru_p04.jpg)

![lstm_gru p5](assets/images/dl/dl_lstm_gru_p05.jpg)

![lstm_gru p6](assets/images/dl/dl_lstm_gru_p06.jpg)

![lstm_gru p7](assets/images/dl/dl_lstm_gru_p07.jpg)

![lstm_gru p8](assets/images/dl/dl_lstm_gru_p08.jpg)

![lstm_gru p9](assets/images/dl/dl_lstm_gru_p09.jpg)

![lstm_gru p10](assets/images/dl/dl_lstm_gru_p10.jpg)

![lstm_gru p11](assets/images/dl/dl_lstm_gru_p11.jpg)

![lstm_gru p12](assets/images/dl/dl_lstm_gru_p12.jpg)

![lstm_gru p13](assets/images/dl/dl_lstm_gru_p13.jpg)

![lstm_gru p14](assets/images/dl/dl_lstm_gru_p14.jpg)

![lstm_gru p15](assets/images/dl/dl_lstm_gru_p15.jpg)

![lstm_gru p16](assets/images/dl/dl_lstm_gru_p16.jpg)

![lstm_gru p17](assets/images/dl/dl_lstm_gru_p17.jpg)

![lstm_gru p18](assets/images/dl/dl_lstm_gru_p18.jpg)

</details>

<!-- AUTO:SLIDES:END -->
