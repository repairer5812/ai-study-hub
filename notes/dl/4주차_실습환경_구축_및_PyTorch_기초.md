# 🚀 [딥러닝 4주차] 실습 환경 구축 및 데이터 전처리, PyTorch 기초

## 1. 🛠️ 실습 환경 구축: Google Colab (코랩)

### 1.1. Colab 환경 소개
- 정의: 구글이 제공하는 Jupyter Notebook 기반의 클라우드 환경.

### 💡 장점 (핵심 출제 포인트)
- Zero Configuration (설정 불필요): 구글 드라이브 환경에서 작동하여 별도의 복잡한 설치가 필요 없음 (로컬에 윈도우/리눅스 환경이나 VS Code를 깔지 않아도 됨).
- 무료 GPU 지원: 딥러닝 학습에 필수적인 GPU를 간단한 수준에서 무료로 제공.
- 사전 설치된 라이브러리: TensorFlow, PyTorch, Matplotlib, Pandas 등 웬만한 기본 라이브러리들이 이미 깔려 있음. 필요한 경우 환경 내에서 추가로 `install` 가능.
- 쉬운 공유: Google Docs나 Sheets처럼 링크로 쉽게 공유 가능.

### 1.2. Colab 사용 및 설정 방법
- 생성 방법: 구글 드라이브 폴더 생성 $\rightarrow$ 새로 만들기(우클릭) $\rightarrow$ 더보기 $\rightarrow$ Google Collaboratory 선택 (안 보일 경우 '연결할 앱 더보기'에서 검색하여 설치).

### ⌨️ 셀 실행 단축키 (매우 중요)
- `Shift + Enter`: 현재 셀을 실행하고 다음 셀로 넘어감.
- `Ctrl + Enter`: 현재 셀만 실행하고 머무름.
- 참고: 셀 내 마지막 줄에 변수명만 입력하면 `print()`를 쓰지 않아도 해당 값이 출력(피드백)됨.
- 변수 공유: 위쪽 셀에서 실행 및 저장한 변수는 아래쪽 셀에서도 그대로 유지 및 사용 가능.

---

## 2. 🧮 딥러닝 프레임워크: PyTorch 기초

### 2.1. PyTorch 소개
- 왜 PyTorch인가?: Keras, TensorFlow 등 여러 프레임워크가 있지만, PyTorch가 가장 빠르고 간단하며 파이썬 언어에 가장 적합한(Pythonic) 딥러닝 프레임워크로 평가받아 최근 가장 많이 쓰임.
- 라이브러리 호출: `import torch`, `import numpy as np`

### 2.2. Tensor (텐서)의 이해
- 정의: 배열(Array)이나 행렬(Matrix)과 같은 특수한 자료 구조. 파이토치 안에서 일어나는 모든 연산은 데이터를 텐서화시켜서 수행함.

### 💡 특징 (핵심 출제 포인트)
- Numpy의 `ndarray`와 매우 유사함.
- GPU나 다른 가속기에서 연산이 가능함.
- 자동 미분(Automatic Differentiation) 에 최적화되어 있음 (나중에 미분을 수행하기 위해 필수적).

### 2.3. Tensor 생성 및 속성 확인
- Tensor 변환: `torch.tensor(데이터)`를 통해 기존 리스트나 배열을 텐서로 변환. (출력 시 앞에 `tensor`라고 명시됨)

### 🎲 형태(Shape) 기반 무작위/초기화 생성
- `torch.rand(shape)`: 0~1 사이의 무작위 값으로 텐서 생성 (예: `torch.rand(2, 3)`).
- `torch.ones(shape)`: 모든 값이 1인 텐서 생성.
- `torch.zeros(shape)`: 모든 값이 0인 텐서 생성.

### 🔍 텐서 속성(Attribute) 확인 (디버깅 시 유용)
- `.shape`: 텐서의 형태(크기) 반환.
- `.dtype`: 데이터 타입 반환.
- `.device`: 현재 텐서가 할당된 장치 반환 (`cpu` 또는 `cuda`).

### 2.4. GPU 사용 및 장치 할당
- GPU 사용 가능 여부 확인: `torch.cuda.is_available()` $\rightarrow$ GPU 사용 가능하면 `True`, 아니면 `False` (Boolean 형태로 반환).
- Colab에서 GPU 켜기: 런타임 $\rightarrow$ 런타임 유형 변경 $\rightarrow$ 하드웨어 가속기를 GPU로 설정.
- 텐서에 장치 할당: `tensor.to('cuda')`를 치면 해당 텐서를 GPU에서 계산하겠다는 명령어가 됨.

---

## 3. ⚙️ Tensor 조작 및 주요 연산 명령어

### 💡 주요 명령어 (핵심 출제 포인트)
- 인덱싱 (Indexing): 파이썬/Numpy와 동일하게 `[행, 열]` 방식으로 수행 (예: 첫 번째 행, 마지막 열 등).
- 병합 (Concatenation): `torch.cat([t1, t2], dim=...)`을 사용하여 텐서들을 이어 붙임.
- 행렬 곱 (Matrix Multiplication): `torch.matmul(A, B)` 사용. (강의 예시: `tensor.matmul(tensor.T)`로 전치 행렬과 곱함)
- 요소별 곱 (Element-wise Product): 단순히 연산자를 사용 (예: `X * Y`). 각 인덱스별로 같은 위치의 값끼리 곱함.
- `torch.linspace(start, end, steps)`: -3에서 3까지 총 7개의 값으로 구성된 텐서를 생성하는 등, 일정한 간격(Synthetic Data)으로 데이터를 직접 합성하거나 그래프 경향을 볼 때 자주 사용. (결과: -3, -2, -1, 0, 1, 2, 3)

### 🧮 통계 및 수학 연산
- `torch.mean()` / `torch.sum()`: 평균 / 합계 (직관적인 명령어).
- `torch.max()` / `torch.min()`: 텐서 내 가장 큰 값 / 가장 작은 값.
- `torch.inverse(matrix)`: 역행렬 계산 (정방행렬(Square Matrix)에만 적용 가능).
    - 교수님 주의사항: 행렬 크기가 엄청나게 커지면 연산량이 폭증하여 에러가 날 수 있으므로 주의해야 함.
- 랜덤 정수 생성: `torch.randint(low, high, size)`
    - 예: `torch.randint(0, 10, (3, 3))` $\rightarrow$ 0에서 10 사이의 정수로 3x3 매트릭스 생성.
- 조건부 인덱싱 (Boolean Masking): 특정 조건문 형태를 넣어 필터링.
    - 예: `tensor[tensor > 0.5]` $\rightarrow$ 0.5 이상인 값만 추출하여 1차원 텐서로 반환.

---

## 4. 📊 정형 데이터(Tabular Data) 전처리: Pandas

### 4.1. 데이터 불러오기 및 탐색
- 구글 드라이브 마운트: Colab과 구글 드라이브를 연동하여 드라이브 내의 CSV 파일을 불러올 수 있음.
- 라이브러리 호출: `import pandas as pd`
- 데이터 읽기: `pd.read_csv('파일경로')`를 통해 정형 데이터(Tabular Data, 예: time, score 컬럼으로 구성)를 데이터프레임(DataFrame) 형태로 불러옴.

### 🕵️‍♂️ 데이터 탐색 명령어
- `data.head()`: 데이터프레임의 처음 5개 행(Row)을 출력하여 형태를 빠르게 확인.
- `data.describe()`: 데이터에 대한 전반적인 통계치 출력.
    - 출력 내용: 데이터 개수(count), 평균(mean), 표준편차(std), 최솟값(min), 최댓값(max), 사분위수(25%, 50%, 75%).
    - 교수님 팁: 전체 데이터가 400개인데 count가 395개로 나온다면, 숫자가 아닌 '결측치(NaN)'가 5개 섞여 있다는 것을 바로 유추할 수 있음.

### 4.2. 데이터 인덱싱 (행/열 추출)
- 열(Column) 단위 추출: `data['time']` 또는 `data['score']`처럼 열 이름을 지정하여 해당 열의 값만 출력.
- 행(Row) 단위 추출: `data.loc[]` 사용. (예: `data.loc[0]`은 첫 번째 로우의 time과 score 값을 출력).

### 4.3. 💡 결측치(NaN/Null) 확인 및 처리 (★매우 중요)
- 결측치란?: 데이터 수집 과정에서 누락된 값. CSV 파일 등에서 빈칸으로 둔 경우 Pandas에서 `NaN`으로 인식함.

### 🔎 결측치 찾기
- 특정 열에서 찾기: `data['score'].isnull()` $\rightarrow$ 널값인 곳을 True로 반환. (강의 예시: 30, 42, 65, 73, 96번째 행에서 결측치 발견)
- 전체 데이터에서 찾기: `data.isnull().sum()` 등을 활용해 전체 데이터셋 기준 결측치 파악.

### 🛠️ 결측치 처리 방법 2가지
1. 제거 (Drop): `data.dropna()`
    - 결측치가 포함된 행(Row)이나 열 자체를 아예 삭제하는 가장 단순한 방법. (강의에서는 96번째 행이 삭제되어 총 395개의 데이터만 남게 됨)
2. 대체 (Fill): `data.fillna(value=0)`
    - 결측치를 특정 값(예: 0, 혹은 주변 값의 평균 등)으로 채워 넣음. `value=0`을 주면 NaN이 0으로 대체됨.
- 실습 참고: 강의에서는 최종적으로 `dropna()`를 사용하여 결측치를 제거한 데이터를 실습에 활용함.

### 4.4. 함수를 활용한 새로운 열 생성
- `apply`와 `lambda` 활용:
    - 코드 예시: `data['score2'] = data['score'].apply(lambda x: x * 2)`
    - 설명: `score` 열의 각 데이터(x)에 2를 곱한 수식을 적용하고, 그 결과를 `score2`라는 새로운 열에 저장함.

---

## 5. 📉 데이터 시각화: Matplotlib

### 5.1. 시각화 기초 설정
- 라이브러리 호출: `import matplotlib.pyplot as plt`
- 그래프 크기 설정: `plt.figure(figsize=(가로, 세로))`를 통해 출력될 그림의 크기를 지정.

### 5.2. 산점도(Scatter Plot) 그리기
- `plt.scatter(x, y, label='...', color='...')`: x축과 y축 데이터를 넣어 점을 찍는 형태의 그래프 생성.
    - `label`: 범례에 표시될 이름 지정.
    - `color`: 각 플롯을 구분하기 위해 색상 지정 (예: 'r'은 빨간색, 'b'는 파란색 등).

### 🪧 축 및 범례 설정
- `plt.xlabel('time')`: x축의 이름 지정.
- `plt.ylabel('score')`: y축의 이름 지정 (이 축이 무엇을 의미하는지 설명).
- `plt.legend()`: 우측 상단 등에 각 색상의 점이 무엇을 의미하는지 범례(Legend)를 추가.
- 그래프 출력: `plt.show()` $\rightarrow$ 위에서 정의한 설정들을 바탕으로 최종 그림을 렌더링하여 화면에 출력.

---

## 6. 🤖 머신러닝 기초: Scikit-learn을 이용한 선형 회귀

### 6.1. Scikit-learn (사이킷런) 소개
- 직접 복잡한 모델이나 레이어를 선언하지 않아도, 내부적으로 다양한 머신러닝 알고리즘(선형 회귀 분석 등)이 구현되어 있어 매우 간단하게 사용할 수 있는 라이브러리.

### 6.2. 가상 데이터 생성 (`make_regression`)
- `from sklearn.datasets import make_regression`
- 파라미터 설정:
    - `n_samples`: 생성할 샘플(데이터) 개수.
    - `n_features`: 피처(입력 변수)의 개수 (강의에서는 1개).
    - `bias`: 편향 값 설정. (선형 회귀 시 y절편)
    - `noise`: 데이터에 섞을 노이즈(분산) 정도.
    - `random_state`: 랜덤 시드(Key) 값. 이 값을 고정하면 항상 동일한 패턴의 무작위 데이터가 생성됨.

### 6.3. 선형 회귀 모델 학습 및 예측
- 모델 선언: `model = LinearRegression()`
- 모델 학습 (Fit): `model.fit(X, y)`
    - 이 한 줄의 코드로 데이터 X와 Y를 설명하는 최적의 1차 방정식(직선)을 내부적으로 모두 계산하여 찾아냄.
- 모델 예측 (Predict): `predict_y = model.predict(X)`
    - 학습된 모델에 X값을 다시 넣어 예측값을 뽑아냄. 이를 `plt.plot` 등으로 그리면 데이터를 관통하는 최적의 추세선이 그려짐.

### 💡 교수님 강조 포인트 (PyTorch와의 비교)
- 단순한 선형 회귀(Linear Regression) 문제에서는 **Scikit-learn을 사용하는 것이 파이토치보다 훨씬 빠르고 정확할 가능성이 높음.** (내부 최적화가 잘 되어 있기 때문)
- 파이토치나 딥러닝(뉴럴 네트워크)을 사용하는 것은 데이터가 비선형(Non-linear)이거나 설명이 훨씬 복잡해질 때 의미가 있음. 다만, 본 실습은 파이토치 기초를 배우기 위해 선형 레이어부터 차근차근 구현해 보는 것임.

---

## 7. 🔥 PyTorch를 이용한 선형 회귀 (Linear Regression) 구현
Scikit-learn과 달리 PyTorch에서는 모델의 구조, 손실 함수, 최적화 기법, 학습 과정을 모두 직접 코드로 작성해야 합니다.

### 7.1. 💡 모델 클래스 (Class) 선언 (핵심 출제 포인트)
파이토치에서는 `nn.Module`을 상속받아 모델 클래스를 정의합니다.

### `__init__` 함수 (초기화 및 레이어 선언)
- `super().__init__()`을 통해 부모 클래스 초기화.
- `self.linear = nn.Linear(입력 차원, 출력 차원)`: 선형 변환 레이어 선언. (강의에서는 입력 차원 1, 출력 차원 1로 설정)
- 참고: `torch.nn` (보통 `nn`으로 import) 안에는 Linear, Convolution 등 파이토치에서 사용할 수 있는 거의 모든 신경망 함수가 정의되어 있습니다.

### `forward` 함수 (순전파 동작 정의)
- 입력 데이터 `x`가 들어왔을 때, 위에서 선언한 레이어(`self.linear`)를 어떻게 통과할지 논리적 흐름을 정의합니다.
- `return self.linear(x)`: 입력 `x`를 선형 레이어에 통과시킨 결과를 반환.

### 7.2. 모델, 손실 함수, 옵티마이저 초기화
클래스를 정의했다면, 실제 학습에 사용할 객체들을 선언해야 합니다.

- 모델 초기화: `model = LinearRegressionModel()`
- 손실 함수 (Loss Function): `criterion = nn.MSELoss()`
    - Mean Squared Error (평균 제곱 오차)를 사용. 회귀 문제에서 가장 기본적으로 쓰이는 손실 함수입니다.
- 옵티마이저 (Optimizer): `optimizer = torch.optim.SGD(model.parameters(), lr=0.01)`
    - `torch.optim` 안에 다양한 최적화 함수가 존재함. 강의에서는 확률적 경사 하강법(SGD) 사용.
    - `model.parameters()`: 옵티마이저가 업데이트할 모델의 가중치(Weights) 정보 전달.
    - `lr`: Learning Rate (학습률) 설정.

### 7.3. 데이터를 텐서(Tensor)로 변환
- PyTorch 모델에 데이터를 넣고 자동 미분(Autograd)을 수행하려면, **반드시 입력 데이터(X, Y)를 Float 형태의 Tensor로 변환**해주어야 합니다. (`torch.FloatTensor()` 등 활용)

---

## 8. 💡 PyTorch 학습 루프 (Training Loop) 완벽 해부
데이터, 모델, 손실 함수, 옵티마이저가 모두 준비되었다면 `for`문을 돌며 에폭(Epoch, 전체 데이터 학습 횟수)만큼 학습을 반복합니다. **이 5단계 순서는 시험에 출제될 확률이 매우 높습니다.**

| 단계 | 코드 명령어 | 교수님 설명 및 핵심 의미 |
|------|------------|------------------------|
| **1단계** | `optimizer.zero_grad()` | **(★가장 많이 실수하는 부분)** 기울기(Gradient)를 0으로 초기화. 이전 배치의 기울기가 누적되어 학습이 망가지는 것을 방지하기 위해 무조건 루프 초기에 실행해야 함. |
| **2단계** | `output = model(x)` | 모델에 입력 데이터 `x`를 넣어 예측값(`output`)을 뽑아냄. 내부적으로 클래스의 `forward` 함수가 실행됨. |
| **3단계** | `loss = criterion(output, y)` | 모델의 예측값(`output`)과 실제 정답 레이블(`y`)을 비교하여 손실(Loss, 오차)을 계산함. |
| **4단계** | `loss.backward()` | 오차 역전파 수행. 계산된 Loss를 바탕으로 모델의 각 파라미터가 오차에 기여한 정도(기울기)를 계산함. |
| **5단계** | `optimizer.step()` | `backward()`에서 계산된 기울기를 바탕으로, 옵티마이저가 파라미터(가중치)를 실제로 **업데이트(갱신)** 함. |

> 👨‍🏫 교수님 라이브 코딩 에피소드:
> 실습 도중 변수를 잘못 넣어 에러가 발생함("제가 잘못 넣은 거 아니에요?"). MSELoss에 들어가는 예측값과 정답값의 순서나 차원 맞추기에 주의해야 함을 알 수 있는 대목입니다.

---

## 9. 🗣️ Q&A 및 기타 세부 사항

### 9.1. 💡 `squeeze()` 함수는 왜 사용하는가? (학생 질문)
- 학생 질문: "출력할 때 왜 계속 스퀴즈를 하는 이유가 뭐예요? 3차원이면 무조건 1차원으로 확 줄여주나요?"
- 교수님 답변:
    - 모델의 출력값(output)은 입력/출력 차원 설정에 따라 보통 2차원 이상의 매트릭스(Matrix) 형태를 가집니다. (예: `[[1.5], [2.1], ...]`)
    - 하지만 Matplotlib 플롯(`plt.scatter` 등)에 데이터를 찍으려면 단순한 1차원 배열(Vector) 형태여야 합니다.
    - `squeeze()`는 텐서에서 **크기가 1인 빈 차원(차원의 크기가 1인 축)을 찾아 제거해 주는 역할**을 합니다. 무조건 1차원으로 만드는 것이 아니라, 불필요한 단일 차원을 날려서 시각화 함수에 들어갈 수 있는 형태로 맞춰주는 것입니다.

### 9.2. 하이퍼파라미터 튜닝 팁
- Scikit-learn의 예측 결과(빨간 점)와 PyTorch의 예측 결과(파란 선)를 비교했을 때, PyTorch 결과가 약간 어긋날 수 있습니다.
- 이때 **Learning Rate(lr)** 를 조절하거나, **Epoch(학습 횟수)** 를 늘려보면 모델이 더 잘 최적화되어 Scikit-learn의 결과와 비슷해지는 것을 확인할 수 있습니다.

---

## 10. 📝 과제 (Assignment) 안내
- **과제 1:** 강의에서 다룬 선형 회귀(Linear Regression) 코드를 직접 완성하고 훈련시켜, Scikit-learn과 PyTorch의 결과를 비교하는 그래프(Plot) 출력하기.
- **과제 2:** 비선형(Non-linear) 데이터 학습하기.
    - 사인(Sine) 함수나 노이즈가 섞인 비선형 데이터를 생성.
    - **다층 퍼셉트론 (Multi-Layer Perceptron, MLP)** 모델 구현: 단일 레이어가 아닌 레이어를 여러 개 쌓아(Hidden Layer 추가) 모델 클래스 재정의.
    - 적절한 옵티마이저(SGD, Adam 등 자유 선택)를 사용하여 비선형 데이터를 잘 설명하는 곡선 그래프 출력하기.
- 제출 기한: 2주 뒤 일요일 11시 50분까지. (이후 제출 시 감점 적용)
