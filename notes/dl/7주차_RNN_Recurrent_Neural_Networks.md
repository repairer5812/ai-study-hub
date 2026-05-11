# 🚀 [딥러닝 7주차] 서브노트: RNN (Recurrent Neural Networks)

이 노트는 강의 스크립트, 슬라이드, 핵심 메모를 통합하여 지엽적인 내용과 Q&A까지 담아낸 서브노트입니다. **중간고사가 서술형(오픈북/강의자료 허용)** 인 만큼, 개념의 확실한 이해와 정확한 키워드 서술이 중요합니다.


---


## 📅 0. 학사 일정 및 행정 사항 (시험 & 프로젝트)

### 💡 출제 포인트: 서술형 중간고사 유의사항 및 프로젝트 일정 숙지

### 중간고사 (5월 11일)

- **형식**: 서술형 (Descriptive)
- **조건**: 전자기기 사용 불가, 단 **강의자료(오픈북)** 는 얼마든지 지참 및 참고 가능.
- **교수님 코멘트**: "질문했던 거 생각해보라고 해서 그런 거에 다 외워서 쓰는 건 없어요. 강의자료 가져가서 보세요."

### Term Project 일정

- **6월 1일까지**: 창의적인 주제를 선정하여 **미리 찍은 동영상 제출 (10분 이내)**.
- **6월 2일 ~ 7일 (1주일간)**: 제출된 동영상을 보고 **동료 평가(Peer Review)** 진행.
- **발표 당일**: 별도 발표 없이 **질의응답(Q&A)만 진행**.


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


| 특징 | DNN | CNN | RNN |
| --- | --- | --- | --- |
| **유닛 특성** | 각 유닛이 Special unit | Kernel을 통한 Convolution | State Vector를 통한 순차 연산 |
| **가중치 공유** | 공유하지 않음 | **공간적(Spatial) 위치** 공유 | **시간축(Time steps)** 공유 |
| **표현력/패턴** | 표현력 높음 | 국소적(Local) 패턴 특화 | 임의의 신호 길이 패턴 기억·처리 |
| **입력 크기** | 고정된 벡터 | 사이즈 정해짐 | 💡 **임의 길이 처리 가능** |


- **CNN**: 데이터를 강제 벡터화하지 않고 원래 구조 유지, Translation invariance에 유리.
- **RNN**: 트레이닝 시 사용한 입력 길이와 상관없이, 테스트 시 **임의의 신호 길이(Arbitrary length)** 에 유연 대응.


---


## 🔥 3. [★★★ 교수님이 직접 던진 오픈형 질문 — 출제 유력!]

### 💡 핵심 출제 포인트: 시계열 데이터에 RNN 대신 CNN을 적용했을 때의 장단점

> **교수님 발언 (강의 스크립트 10:39 ~ 11:07)**:

> "자, 그러면 시간축으로 계산하는 데 있어서 **(시계열 데이터에) CNN은 쓸 수 없겠느냐?** 있겠어요? 없겠어요? **잘 생각해보십시오.** 타임시리즈 시간 데이터에 대해서 CNN을 쓴다면 **어떤 장단점이 생길 것이냐, 어떤 특징들이 생길 것이냐, 그런 걸 한번 생각을 해보시면 좋을 것 같아요.**"

교수님은 이 질문을 던지신 후 **바로 다음 주제로 넘어가셨습니다.** 답을 주지 않고 "스스로 생각해보라"는 형태의 **시험 출제 예고 떡밥**.

### 💯 A+ 답안 모범 분석

1. 적용 가능 여부
- **가능**. **1D-CNN** 형태로 오디오 신호, 주식 데이터 등 시계열 처리에 실제 사용.

2. 장점 (Pros)
- **병렬 연산(Parallelization)**: RNN은 $t$ 연산에 $t-1$ 결과가 필수 → 순차 연산만 가능 → GPU 활용 저하. CNN은 전체 시퀀스에 **동시 합성곱** 수행 → 학습 속도 매우 빠름.
- **국소적(Local) 패턴 추출 탁월**: 커널이 윈도우 내 패턴 특화 → **짧은 시간 패턴**(음소 파형, 단기 급등락 등) 포착 유리.

3. 단점/한계 (Cons)
- **임의 길이 처리 어려움**: CNN은 입력 크기/필터 사이즈 고정 → 들쭉날쭉 시퀀스 처리 까다로움 (패딩 등 추가 작업 필요).
- **장기 의존성(Long-term Dependency) 부족**: RNN은 State Vector로 과거 히스토리 압축 유지. CNN은 지정된 Receptive Field 밖 먼 과거 고려 불가 → 긴 문맥 파악 불리.

> 📝 **시험 서술 요령**: CNN의 병렬 처리·로컬 패턴 장점 vs RNN의 임의 길이·장기 기억 장점을 **대비 서술**.

### 4. 만약 CNN으로 시계열 데이터를 설계한다면?

- 시계열 데이터는 시간 순서대로 나열된 숫자 데이터이므로, CNN의 Kernel을 시간축 방향으로 움직이며 사용한다.
- 예를 들어 Kernel Size=3이면 현재 시점을 기준으로 연속된 3개 시점 패턴을 한 번에 분석한다. 즉 CNN은 짧은 시간 구간(Window)의 반복 패턴을 찾는 데 강하다.
- 여러 Conv Layer를 깊게 쌓으면 처음에는 짧은 패턴만 보다가 점점 더 넓은 시간 범위를 보게 되어(Receptive Field 증가) 긴 패턴도 일부 학습 가능해진다.
- 하지만 일반 CNN은 가까운 시점 위주로 보기 때문에 아주 먼 과거 기억은 약하다. 이를 보완하기 위해 Dilated Convolution을 사용하면 중간 시점을 띄엄띄엄 보면서 더 먼 과거까지 한 번에 참고할 수 있다.
- 따라서 CNN 기반 시계열 모델은 “짧은 패턴을 빠르게 병렬 분석하는 구조”라고 이해하면 된다.


---


## 🏗️ 4. RNN의 다양한 아키텍처 (입출력 구조)

### 💡 출제 포인트: 각 구조의 명칭과 대표 응용 사례 매칭

### One-to-Many (1:N)

- **구조**: 입력 Static 1개, 출력 시퀀스.
- **대표 사례: Image Captioning**
  - 입력: 이미지 1장 / 출력: 설명 문장

### Many-to-One (N:1)

- **구조**: 입력 시퀀스, 출력 1개.
- **대표 사례: Sentiment Analysis** (긍정/부정 판별)

### Many-to-Many (N:M)

- **구조**: 입력·출력 모두 시퀀스.
- **대표 사례 1**: Machine Translation (한→영 번역)
- **대표 사례 2**: Speech Recognition (음성→텍스트)


---


## ⚙️ 5. RNN의 내부 연산과 함수

### 💡 출제 포인트: 매 타임스텝마다 **동일 파라미터(W) 공유** 사실과, 활성화 함수로 **tanh를 주로 쓰는 이유**

### 기본 수식 및 파라미터 공유

$h_t = f_W(h_{t-1}, x_t)$

- 이전 상태 $h_{t-1}$와 현재 입력 $x_t$를 받아 새 상태 $h_t$ 계산.
- 💡 **핵심**: **"The same function and the same set of parameters are used at every time step."** 모든 시간 스텝에 **동일 가중치 **$W$** 공유**.
- 타임마다 $W$가 다르면, 테스트 시 **임의 길이 시퀀스에 적용 불가**.

### 활성화 함수: 왜 ReLU가 아닐까?

- CNN은 ReLU 주로 사용. 그러나 **RNN에서 ReLU를 쓰면 값이 발산(폭발)**하기 쉬움 (양수 값이 계속 더해져 커짐).
- 따라서 상태 전이 함수로 주로 **tanh (Hyperbolic tangent)** 사용. 언어·음성 인식에서 안전하게 잘 작동.

### 출력과 Loss

- $y_t$는 매 스텝 계산할 필요 없음 (Many-to-One은 마지막만).
- Many-to-Many에서는 각 스텝 Loss의 **합(Sum)** 이 샘플 최종 Loss.


---


## 🔤 6. 구체적 예시: Character-Level Language Model ("hello")

### 💡 출제 포인트: "hello" 학습·생성 과정, 그리고 **훈련과 추론 시 입력을 다르게 주는 이유(Robustness)**

### 1) 데이터 세팅

- Vocabulary: 'h', 'e', 'l', 'o' 4개.
- **One-hot**: h=[1,0,0,0], e=[0,1,0,0], ...
- 목표: h→e, e→l

### 2) 추론 시 샘플링

- **Deterministic**: Softmax 최댓값만 선택 (**Argmax**). 항상 같은 출력.
- **Stochastic**: 확률 분포대로 랜덤 샘플링. 낮은 확률도 뽑힐 수 있어 **다양성 확보**.
- 출력이 **다음 타임스텝의 입력으로 재귀** → **Auto-regressive**. GPT도 동일 원리.

### 3) 훈련 시 특별 테크닉 (Teacher Forcing 유사)

- 정답만 주지 않고, **모델이 직접 샘플링한 잘못된 값도 다음 입력으로 넣기도 함**.
- **이유**: **다양성(Diversity)과 강건성(Robustness)** 증대. 테스트 시 뜬금없는 값이 나와도 궤도 회복하도록.


---


## 🙋‍♂️ 7. Q&A: Tokenizer와 Word Embedding

### 💡 출제 포인트: One-hot의 한계와 Word Embedding

- **학생 질문**: 입력은 무조건 원핫 벡터?
- **교수님 답변**:
  - 현재는 Character-level이라 단순화.
  - 실제 NLP는 Vocabulary 수십만~수백만 → 원핫은 **차원의 저주**.
  - **해결책**: **Word Embedding** (Word2Vec, GloVe) — 조밀한 벡터, 의미 유사 단어는 가까움.


---


## 📝 8. Word-Level 언어 모델 학습 및 Loss

## 🔥 시퀀스 전체 Loss 계산 방식과 Deterministic 학습

### 1. 문장 학습 방식

예시 문장: "The students opened their exams"

RNN/LSTM 언어모델은 문장 전체를 한 번에 이해하는 것이 아니라, 각 시점(Time Step)마다 “다음 단어 예측” 문제로 학습한다.


| 입력(Input) | 정답(Target) |
| --- | --- |
| The | students |
| The students | opened |
| The students opened | their |
| The students opened their | exams |


즉 모델은 매 시점마다 다음 단어의 확률분포를 예측한다.


---


### 2. Embedding Vector 입력

컴퓨터는 단어 문자열 자체를 처리할 수 없으므로 단어를 숫자 벡터로 변환한다.

예: "The" → [0.2, -1.1, 0.7, ...]

이 벡터를 Embedding Vector라고 하며, 실제 RNN 입력은 단어가 아니라 이러한 벡터 시퀀스이다.


---


### 3. Deterministic 학습의 의미

학습(Training) 단계에서는 실제로 단어를 랜덤 샘플링하지 않는다.

예를 들어 모델 출력이:


| 단어 | 확률 |
| --- | --- |
| opened | 0.7 |
| ate | 0.2 |
| ran | 0.1 |


이라면, 정답은 opened이므로 모델은 “정답 단어의 확률이 얼마나 높은가”를 기준으로 Loss를 계산한다.

즉 학습은 확률분포 전체와 정답을 직접 비교하는 방식이며, 생성(Inference) 단계처럼 랜덤 샘플링을 수행하지 않는다. 이러한 특성을 Deterministic 학습이라고 한다.


---


### 4. Negative Log-Likelihood (NLL) Loss

정답 단어 확률이 높을수록 Loss는 작아진다.

예:

정답 확률 = 0.7

$Loss=-\log(0.7)$

정답 확률 = 0.01

$Loss=-\log(0.01)$

즉 정답 단어 확률이 낮으면 매우 큰 패널티를 부여한다.

실제로 이는 Cross Entropy Loss와 거의 동일한 의미로 사용된다.


---


### 5. 시퀀스 전체 Loss 계산

문장 전체에서는 여러 Time Step의 Loss가 발생한다.

예:

```plain text
L1 = 0.3
L2 = 0.7
L3 = 0.2
L4 = 0.5
```

최종 문장 Loss는 모든 시점 Loss의 합(Sum)으로 계산한다.

$L=L_1+L_2+L_3+L_4$

즉 언어모델은 문장 전체에서 “다음 단어를 얼마나 잘 예측했는가”를 기준으로 학습된다.


---


### 💡 핵심 정리

- 언어모델 학습은 “다음 단어 맞추기” 문제의 반복이다.
- 입력 단어는 Embedding Vector 형태로 변환되어 RNN/LSTM에 들어간다.
- 학습 시에는 랜덤 샘플링 없이 정답 단어 확률 기반으로 Loss를 계산한다(Deterministic).
- 각 Time Step마다 NLL/Cross Entropy Loss를 계산한다.
- 최종 Loss는 전체 시퀀스 Loss의 합으로 계산된다.


---


## 🔄 9. BPTT (Backpropagation Through Time)

### 💡 출제 포인트: W 공유 상황에서 Gradient 계산법 + 긴 시퀀스 문제/해결

### W에 대한 Gradient

- 💡 **핵심**: **"각 타임스텝에서 구한 **$W$**의 편미분 값들을 모두 합산(Sum)"**.

### BPTT

- 시간축 Forward pass 끝까지 → 끝에서 거꾸로 Backward pass.

### 문제: 긴 시퀀스

- 계산 시간·메모리 폭증.

### 해결: Truncated BPTT

- **일정 길이(예: 7개) 청크로 잘라 학습**. 청크별 포워드 → 로컬 Loss → 역전파 → 파라미터 업데이트.


---


## 🔍 10. State Vector의 해석 (Interpretable Cells)

### 💡 출제 포인트: Hidden State의 **개별 Element가 실제 어떤 역할**을 하는지

### 놀라운 생성 능력

- 셰익스피어 소네트 학습 → 그럴싸한 시 생성.
- 리눅스 C 코드 학습 → 변수 선언, for/if, 주석, 들여쓰기, 괄호까지 완벽 흉내.

### Interpretable Cells

연구자들이 Hidden State 각 Element를 **컬러 코딩**(양수 빨강, 음수 파랑)으로 분석한 결과, 특정 셀이 명확한 역할 수행:


| 셀 종류 | 역할 |
| --- | --- |
| **Quote Detection Cell** | 따옴표 열림/닫힘 기억 (양·음 전환) |
| **Line Length Cell** | 문장 길이 추적, 마침표 타이밍 기억 |
| **If-statement Cell** | C 코드 if문 열림 상태 추적 |


**결론**: **"Encoded Memory"** 개념이 실제 Element 단위에서 수행됨을 증명.


---


## 🍔 11. 심화 구조: Bi-directional RNN & Deep RNN

### 💡 출제 포인트: 양방향 RNN 처리 방식 + RNN 레이어를 깊게 쌓지 않는 이유

### Bi-directional RNN

- 일반 RNN은 과거→현재 방향만.
- 문맥상 뒤 단어가 앞 의미 결정하는 경우도 많음.
- **구조**: ①앞→뒤 RNN + ②뒤→앞 RNN 두 개 동시 돌림.
- 출력은 두 방향 Hidden State를 **Concatenate** 후 연결.

### Deep RNN

- 💡 **교수님 코멘트**: **"RNN 계열은 통상적으로 3대(3층) 이상을 잘 쓰지 않습니다."**
- **이유**: CNN(ResNet 등)처럼 많이 쌓아도 성능 급상승 X, 파라미터·연산량만 폭증. 보통 **얇고 넓게(Thin and Wide) 2층** 정도가 일반적.


---


## 🚀 12. RNN의 실제 응용 사례

### 1) POS Tagging / NER (Many-to-Many)

- 각 단어의 품사·개체명 순차 분류.

### 2) Sentence Classification (Many-to-One)

- **방식 1**: 마지막 Hidden State만 사용.
- **방식 2**: 모든 Hidden State 평균(**Pooling**) → Sentence Encoding Factor.

### 3) Speech Recognition (Many-to-Many)

- 음성 인코더(CNN 등)로 특징화 후 RNN.
- **핵심 테크닉**: `<Start>`, `<End>` **Special Token**. 시작/종료 제어.

### 4) Question Answering

1. 질문 문장 → RNN → 대표 벡터.
2. 답안 후보들 → RNN → 벡터화.
3. **Dot Product / Cosine Similarity** 로 최고 유사도 답안 선택.


---


## 🖼️ 13. Image Captioning 심화 (CNN + RNN)

### 💡 출제 포인트: **VGG 마지막 레이어 버리는 이유** + 두 신경망 연결점

### CNN 역할 (이미지 인코딩)

- 사전 학습된 **VGG** 사용.
- 💡 **중요**: **VGG의 마지막 Softmax·최종 Hidden 레이어 제거**.
- **이유**: 마지막 레이어는 **1,000 클래스 분류에만 특화** → 이미지 설명용 하이레벨 정보 손실.
- 그 이전 레이어 출력을 **이미지 임베딩 벡터**로 사용.

### RNN 역할 (문장 생성)

- CNN 이미지 벡터 → **RNN의 초기 State Vector**로 주입.
- `<Start>` 토큰 → 단어 하나씩 샘플링 (Auto-regressive).


---


## ⚠️ 14. RNN의 치명적 단점과 최신 동향

### 💡 출제 포인트: GPU 연산에 불리한 이유 정확히 서술

### 1) GPU 병렬 처리 한계 ⭐

- $t$ 연산이 $t-1$ 계산 결과에 의존 → **순차적 계산만 가능** → **GPU 병렬 장점 살리기 매우 어려움**.
- 이를 해결하려 등장 → **Transformer**.

### 2) Gradient Vanishing / Exploding

- 시퀀스 길어지면 기울기 소실·폭발 → **LSTM, GRU** 등장.

### 3) 최신 동향

- Transformer 주류, 최근 **Mamba(맘바)** — 순차 메모리 + 병렬 처리 극대화.


---


## 🙋‍♂️ 15. 강의 Q&A 및 시험 핵심 팁

### Q1: BPTT 시 언어 특성(영어 앞 vs 한국어 뒤)에 따라 시간별 가중치 다르게 줄 수 있나?

- **A**: 좋은 접근. Prior Knowledge로 특정 타임스텝 Gradient에 가중치 곱 적용 가능. **Attention 메커니즘의 철학**과 맞닿음.

### Q2: 이미지에 RNN 쓸 수 있나?

- **A**: CNN은 입력 사이즈 민감. **이미지를 패치 시퀀스로 잘라 RNN 투입** 방식도 실제 연구·사용됨.

### 💡 시험 대비 핵심 정리

> **"수식 절대 외워서 쓰라는 얘기 안 냅니다."**

$h_t = f_W(h_{t-1}, x_t)$ 를 토씨 안 틀리고 외우기 < **수식 의미(파라미터 공유, 이전 상태 반영 등)를 풀어 서술**하는 것이 A+ 핵심.


---


## 🎯 7주차 최종 암기 체크리스트

### RNN 기본

- [ ] State Vector = **Encoded Memory**
- [ ] One Time Delay ($t-1$ → $t$) + Unfold
### DNN vs CNN vs RNN

- [ ] 가중치 공유: **없음 / 공간 / 시간**
- [ ] RNN만 **Arbitrary length**
### 🔥 교수님 오픈형 질문 (핵심!)

- [ ] **"시계열 데이터에 CNN 적용 시 장단점"**
- [ ] CNN 장점: **병렬 연산 + 로컬 패턴**
- [ ] CNN 단점: **Arbitrary length 어려움 + Long-term dependency 부족**
### 구조 매칭

- [ ] 1:N → Image Captioning / N:1 → Sentiment / N:M → Translation·Speech
### 내부 연산

- [ ] **tanh** 사용 이유 (ReLU 발산 위험)
- [ ] 동일 $W$ 시간축 공유
- [ ] Loss = 모든 스텝 Sum
### 학습

- [ ] BPTT Gradient = 각 스텝 편미분의 **합**
- [ ] Truncated BPTT: 청크로 잘라 학습
- [ ] Train: Deterministic + NLL / Inference: Stochastic 샘플링 가능
### 심화

- [ ] Bi-directional: 양방향 Hidden State **Concat**
- [ ] Deep RNN: **3층 이상 잘 안 씀**
### 응용

- [ ] Image Captioning: **VGG 마지막 제거** → 이미지 임베딩 → RNN 초기 State
- [ ] Speech: `<Start>` / `<End>` 토큰
### 치명적 단점

- [ ] **GPU 병렬화 불가** ($t$는 $t-1$ 의존)
- [ ] Vanishing/Exploding → LSTM/GRU
- [ ] 해결 → Transformer, Mamba
### 시험 대비

- [ ] **서술형 오픈북** (5월 11일)
- [ ] **수식 암기 X, 의미 서술 ○**
- [ ] 교수님 오픈형 질문은 반드시 정리