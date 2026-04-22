# 기계학습3주차

# [기계학습 서브노트] 지도학습, 선형 회귀, 분류 및 GLM 통합본

## 1. 지도학습 (Supervised Learning) 개요

기계학습은 크게 지도학습과 비지도학습으로 나뉘며, 그 기준은 **'정답 레이블(Label, Output)의 유무'**입니다. 지도학습은 항상 입력(Input, $X$)과 정답(Output, $Y$)이 쌍(Pair)으로 주어집니다.

### 1.1. 지도학습의 목표

주어진 데이터($X$, $Y$)를 바탕으로 둘 사이의 **관계 함수** $f(x)$를 학습(추정)하는 것.

학습된 모델을 통해 **새로운 데이터(Unseen data)**가 주어졌을 때 그 결과값을 예측하는 데 목적이 있습니다.

- **교수님 예시 (월세 예측):**
    - $X$ (입력 변수/Features): 평수(면적), 층수 등
    - $Y$ (출력 변수/Label): 렌트값(월세)
    - 목표: "50평 1층에 있을 때의 월세는 얼마일까?"를 예측하는 것.

### 1.2. 지도학습의 두 가지 주요 카테고리 💡

- **Regression (회귀):** 출력값 $Y$가 **연속적인 수치(Continuous)**인 경우. (예: 집값, 렌트비 예측)
- **Classification (분류):** 출력값 $Y$가 **이산적인 카테고리(Categorical/Discrete)**인 경우. (예: 스팸 메일 분류, 내일 날씨가 춥다/덥다 분류)

> **[내 메모 연계]:** $X, Y$ 사이의 관계를 예측하는 본질은 동일하나, $Y$값의 성질(연속 vs 이산)에 따라 회귀와 분류로 결정됩니다.
> 

---

## 2. Linear Discriminative Models (선형 판별 모델)

지도학습의 $f(x)$를 추정하는 다양한 방법 중 가장 단순하면서도 빠르고 널리 쓰이는 모델입니다.

- **가정:** 입력 Feature들에 대해 함수가 **선형(Linear)** 형태를 띤다고 가정합니다.
- **특징:** 인간이 이해하기 직관적이며, 복잡한 딥러닝 모델의 뼈대가 되는 필수적인 개념입니다.
- **목표:**
    - **분류(Classification):** Class A와 B를 가르는 **Decision Boundary(결정 경계)**를 찾는 것.
    - **회귀(Regression):** $X$와 $Y$의 관계를 가장 잘 나타내는 **선형 함수(직선/평면)**를 찾는 것.

---

## 3. Linear Regression (선형 회귀) 기본 수식

데이터의 트렌드를 가장 잘 나타내는 선형 함수를 수학적으로 정의해 봅시다.

### 3.1. 수식 정의

$y = f(x) = \theta_0 + \theta_1x_1 + \theta_2x_2 + \cdots + \theta_dx_d$

이 수식을 깔끔하게 **벡터(Vector)** 형태로 표현하면 다음과 같습니다. (선형대수학의 내적 활용)

$f(x) = \sum_{i=0}^d \theta_ix_i = \theta^T x$

- $x$: Input feature 벡터 (우리가 이미 알고 있는 데이터)
- $y$: Output label (우리가 이미 알고 있는 정답)
- $\theta$: **Parameter (또는 Weight, 가중치)**. 선의 기울기와 절편을 결정하며, **우리가 학습을 통해 찾아내야 하는(모르는) 값**입니다.

### 3.2. 수식 표기법 (Notation) 주의사항 💡

강의 중 Q&A에서 교수님이 명확히 짚어주신 부분입니다. 헷갈리기 쉬우니 반드시 암기하세요!

- **아래첨자 (Subscript, 예: $x_j$):** Feature의 **차원(Dimension)**을 의미합니다. (예: 10x10 이미지에서 각각의 픽셀 값, $j$는 픽셀 인덱스)
- **위첨자 (Superscript, 예: $x^{(i)}, y^{(i)}$):** 데이터 샘플의 **인덱스(Index)**를 의미합니다. (예: 첫 번째 이미지, 두 번째 이미지 등 데이터의 번호)

---

## 4. Cost Function (비용 함수)

그렇다면 어떤 $\theta$가 가장 '좋은(Optimal)' 파라미터일까요? 이를 수치화하기 위해 비용 함수를 정의합니다.

### 4.1. Residual (잔차)

실제 데이터 값 $y^{(i)}$ 와 모델의 예측 값 $f(x^{(i)})$ 의 차이를 **Residual(잔차/나머지)**이라고 부릅니다. 이 차이가 작을수록 선이 데이터를 잘 표현한다는 뜻입니다.

### 4.2. Least Mean Squares (최소제곱오차) 💡

데이터 하나가 아니라 **전체 데이터 세트**에 대한 오차를 고려해야 합니다.

$J(\theta) = \frac{1}{2} \sum_{i=1}^n (f_\theta(x^{(i)}) - y^{(i)})^2$

- **정의:** 예측값과 실제값의 차이(Residual)를 제곱하여 모두 더한 값.
- **의의:** 기계학습에서 우리가 **최소화(Minimize)** 시키고자 목적으로 두는 함수이므로 **Cost Function** 또는 **Objective Function(목적 함수)**이라고 부릅니다.
- **최종 목표:** $J(\theta)$를 최소화시키는 최적의 파라미터 $\theta^*$를 구하는 것. ($\theta^* = \mathop{\mathrm{argmin}}_\theta J(\theta)$)

---

## 5. 최적의 $\theta$를 찾는 방법 1: 경사하강법 (Gradient Descent)

$J(\theta)$를 최소화하는 $\theta$를 단번에 찾기 힘들 때, 점진적(Iterative)으로 찾아가는 최적화 방법입니다. 딥러닝에서 필수적으로 쓰이는 매우 중요한 로직입니다.

### 5.1. 기하학적 이해 (볼록한 파라미터 공간)

$\theta_1, \theta_2$를 파라미터 축으로 두고, $Z$축을 Cost $J(\theta)$로 두면, 밥그릇처럼 아래로 오목한 3차원 표면(Surface)이 그려집니다. 우리의 목표는 이 표면에서 **가장 아래쪽(Minimum)**에 위치한 $\theta$ 좌표를 찾는 것입니다.

### 5.2. 그래디언트(Gradient)와 이동 방향 💡

- **Gradient(경사/도함수):** 특정 지점에서의 기울기입니다.
- **[내 메모 연계 - 핵심 원리]:**
    - 현재 지점에서 미분값이 양수(+)라면 우측으로 올라가는 경사이므로, 최솟값을 향해 가려면 **왼쪽(- 방향)**으로 가야 합니다.
    - 미분값이 음수(-)라면 좌측으로 올라가는 경사이므로, 최솟값을 향해 가려면 **오른쪽(+ 방향)**으로 가야 합니다.
- 결과적으로 **항상 기울기의 반대 방향(마이너스 부호)으로 움직여야** 최솟값(Downhill)을 향해 갈 수 있습니다. 이를 '하강법(Descent)'이라 부르는 이유입니다.

### 5.3. 업데이트 수식 (Update Rule)

$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)$

- $\alpha$ **(Learning Rate, 학습률):** 한 번에 얼마나 크게 이동할지 결정하는 보폭(속도)입니다.
    - $\alpha$가 **너무 크면:** 최솟값을 지나쳐 밖으로 튕겨 나가는 **Overshooting** 현상이 발생할 수 있습니다.
    - $\alpha$가 **너무 작으면:** 최솟값에 도달하는 데 시간이 너무 오래 걸립니다. (적절한 값 설정이 중요!)

### 5.4. 미분 전개 (수학적 유도)

단일 데이터 샘플에 대해 $J(\theta) = \frac{1}{2} (f_\theta(x) - y)^2$ 를 미분(Chain rule 적용)하면 다음과 같이 깔끔하게 떨어집니다. (앞의 $\frac{1}{2}$은 미분 시 내려오는 $2$와 약분시키기 위해 의도적으로 넣은 상수입니다.)
$\frac{\partial}{\partial \theta_j} J(\theta) = (f_\theta(x^{(j)}) - y) \cdot x_j$
이를 전체 데이터 $n$개에 대해 확장하여 시그마($\sum$)를 붙이면 최종 업데이트 수식이 완성됩니다.

$\theta_j := \theta_j - \alpha \sum_{i=1}^n (f_\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}$

---

## 6. 최적의 $\theta$를 찾는 방법 2: 해석적 해 (Analytic Solution)

선형 회귀 문제에서는 굳이 여러 번 반복하는 경사하강법을 쓰지 않고도, **단 한 번의 수식 계산**으로 완벽한 정답(Global Minimum)을 찾아낼 수 있습니다.

### 6.1. 왜 한 번에 찾을 수 있을까? 💡

- 우리가 정의한 최소제곱오차 비용 함수 $J(\theta)$는 **Smooth, Continuous, Convex(위로 오목한 밥그릇 모양)** 한 2차 함수 형태입니다.
- 이러한 Convex 함수는 전체 구간에서 **최솟값(Global Minimum)이 딱 하나만 존재**합니다.

> **[내 메모 연계]:** Cost function이 2차 함수 같은 Analytic function이면, **미분값이 0인 점**(기울기가 0인 평평한 바닥)을 찾아서 단번에 최적의 파라미터를 찾을 수 있습니다.
> 

### 6.2. 행렬(Matrix) 표기법 도입

데이터가 많아지면 시그마($\sum$) 대신 행렬을 사용하는 것이 계산에 훨씬 유리합니다.

- $X$ **행렬:** $n \times d$ 행렬. 데이터의 개수가 $n$개이고, 데이터의 차원(Dimension, Feature의 수)이 $d$인 데이터 행렬.
- $y$ **벡터:** $n$차원 타겟 벡터 (정답들).
- **비용 함수의 행렬 표현:**
    
    $J(\theta) = \frac{1}{2} (X\theta - y)^T (X\theta - y)$
    

### 6.3. Normal Equation (정규 방정식) 도출 과정

$J(\theta)$를 $\theta$에 대해 미분(Gradient)하고, 그 값을 0으로 두어 전개합니다.

$\nabla_\theta J(\theta) = X^T X \theta - X^T y = 0$

$X^T X \theta = X^T y$

양변의 앞에 $(X^T X)^{-1}$ (역행렬)을 곱해줍니다.

- 최종 도출 공식 💡:
    
    $\theta = (X^T X)^{-1} X^T y$
    
    이 공식을 Analytic Solution (해석적 해) 또는 Closed-form Solution이라고 부릅니다.
    

> 교수님 Q&A 코멘트: "대부분의 복잡한 기계학습/딥러닝 문제는 이처럼 미분값이 0이 되는 지점을 한 번에 구하는 Analytic Solution이 존재하지 않습니다. 따라서 범용적으로는 경사하강법을 훨씬 많이 사용하지만, 선형 회귀처럼 특별히 식이 예쁜 경우에는 이 방법을 쓸 수 있습니다."
> 

---

## 7. 최적의 $\theta$를 찾는 방법 3: 확률론적 접근 (Probabilistic Approach)

기계학습은 선형대수학, 미적분학뿐만 아니라 확률 이론(Probability Theory)과도 깊게 맞닿아 있습니다. 똑같은 선형 회귀 문제를 '통계적 추론'의 관점에서 풀어봅시다.

### 7.1. 노이즈(Noise)의 도입과 정규분포 가정 💡

현실 세계의 데이터는 우리가 세운 이상적인 함수(True function)에 완벽하게 들어맞지 않습니다. 반드시 노이즈(Noise)가 존재합니다.

- 수식 가정:
    
    $y^{(i)} = \theta^T x^{(i)} + \epsilon^{(i)}$
    
- $\epsilon$ (입실론): 관측되지 않은 효과나 무작위 노이즈(Random Noise)를 의미합니다. 앞서 배운 잔차(Residual)와 일맥상통하는 개념입니다.
- 정규분포 가정: 이 노이즈 $\epsilon$은 평균이 0이고 분산이 $\sigma^2$인 정규분포(Normal Distribution, 가우시안 분포)를 따른다고 가정합니다.
    
    $\epsilon \sim \mathcal{N}(0, \sigma^2)$
    
- 결과적 분포: 상수에 정규분포 노이즈를 더했으므로, $x$가 주어졌을 때의 $y$ 역시 정규분포를 따르게 됩니다.
    
    $y \mid x; \theta \sim \mathcal{N}(\theta^T x, \sigma^2)$
    

### 7.2. 교수님 Q&A: "데이터 원본(Raw)이 T분포면 어떡하나요?"

- 학생의 날카로운 질문: "데이터 특성에 따라 정규분포가 아니라 T분포 등을 따를 수도 있지 않나요?"
- 교수님의 답변: 여기서 정규분포를 따른다는 것은 데이터 $X$나 $Y$ 그 자체(Raw 데이터)의 분포를 말하는 것이 아닙니다. 우리가 예측하려는 선(True function) 주변에 랜덤하게 발생하는 '노이즈(Noise)'가 정규분포를 따른다고 가정하는 것입니다. 기계학습 확률론에서는 노이즈가 정규분포를 따른다고 가정하는 것이 매우 일반적이며 수학적으로도 가장 다루기 좋은(편리한) 형태입니다.

### 7.3. Likelihood Function (우도 함수)

- Likelihood(우도): 특정 파라미터 $\theta$가 주어졌을 때, 우리가 현재 가지고 있는 데이터 $y$가 관측될 확률.
- 데이터 샘플들이 서로 독립(IID)이라고 가정하므로, 전체 데이터에 대한 Likelihood는 각 데이터의 확률을 모두 곱한 값($\prod$)이 됩니다.
    
    $L(\theta) = \prod_{i=1}^n \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y^{(i)} - \theta^T x^{(i)})^2}{2\sigma^2}\right)$
    

### 7.4. Maximum Likelihood Estimation (MLE, 최대우도추정) 💡

- 목표: 관측된 데이터가 나올 확률(Likelihood)을 가장 크게(Maximize) 만드는 파라미터 $\theta$를 찾는 것.
- Log-Likelihood (로그 우도):
    - 확률값들을 계속 곱하면 숫자가 너무 작아져 컴퓨터가 계산하기 힘듭니다(Underflow).
    - 또한 곱셈($\prod$)보다 덧셈($\sum$)이 미분하기 훨씬 편합니다.
    - 따라서 $L(\theta)$에 자연로그($\ln$)를 씌워 Log-Likelihood로 변환하여 계산합니다.
- 놀라운 수학적 결론:
    
    Log-Likelihood 식을 전개해서 상수항을 무시하고 정리해 보면, 결국 $\sum (y^{(i)} - \theta^T x^{(i)})^2$ 꼴이 나옵니다. 즉, "정규분포 노이즈를 가정한 상태에서 Likelihood를 최대화(MLE)하는 것은, 우리가 앞서 정의한 최소제곱오차(Least Mean Squares) Cost Function을 최소화하는 것과 수학적으로 완벽히 똑같다!"는 결론에 도달합니다.
    

---

## 8. Classification (분류) 문제로의 확장

회귀와 분류는 $X$와 $Y$의 관계 파악한다는 점에서는 같지만, 출력값 $Y$의 성질과 모델링의 목표가 미묘하게 다릅니다.

### 8.1. Regression vs Classification 💡

- 교수님의 날씨 비유:
    - "내일 기온이 몇 도야?" $\rightarrow$ -4도, 0도, 10도 등 연속적인 값 (Regression)
    - "내일 날씨가 추울까, 더울까?" $\rightarrow$ 특정 기준(예: 8도)을 Threshold(임계값)로 정해놓고, 그보다 낮으면 '춥다(Class 0)', 높으면 '덥다(Class 1)'로 이산적으로 분류 (Classification)

### 8.2. 모델링 목표의 근본적인 차이

- Regression은 특정 수치(예측값)를 정확히 맞추는 것이 목표입니다.
- Classification은 단순한 예측값을 내놓는 것을 넘어, "이 데이터가 특정 클래스에 속할 '확률(Probability)'을 계산(모델링)하는 것"이 진짜 목표입니다.

---

## 9. Logistic Regression (로지스틱 회귀)

이름에는 'Regression'이 들어가지만, 실제로는 Classification(분류) 문제를 풀기 위해 사용하는 모델입니다. (매우 헷갈리기 쉬우니 주의하세요!)

### 9.1. Sigmoid Function (시그모이드 함수) / Logistic Function 💡

확률은 반드시 0과 1 사이의 값이어야 합니다. 하지만 선형 함수 $f(x) = \theta^T x$ 의 결과값은 $-\infty$ 에서 $+\infty$ 까지 뻗어 나갑니다. 이를 해결하기 위해 선형 함수의 결과에 씌워주는 마법의 함수가 바로 시그모이드 함수입니다.

$f_\theta(x) = g(\theta^T x) = \frac{1}{1 + e^{-\theta^T x}}$

- 시그모이드를 쓰는 첫 번째 이유: 어떤 실수 값이 들어오든 그 결과를 0에서 1 사이의 값으로 바운드(Bound, 제한) 시켜줍니다. 덕분에 결과를 '확률'로 해석할 수 있게 됩니다.
- 시그모이드를 쓰는 두 번째 이유 (수학적 편리함): 시그모이드 함수를 미분(도함수)하면, 놀랍게도 자기 자신의 곱셈 형태로 예쁘게 떨어집니다.
    
    $g'(z) = g(z)(1 - g(z))$
    
    이 성질은 나중에 최적화를 위해 미분 계산을 할 때 수식을 아주 깔끔하고 편리하게 만들어줍니다.
    

---

## 10. 확률론적 접근과 MLE (Binary Classification)

분류 문제에서도 확률론적 접근(MLE)을 통해 최적의 파라미터 $\theta$를 찾습니다. 이번에는 클래스가 딱 2개(0 또는 1)인 Binary Classification(이진 분류) 상황을 가정합니다.

### 10.1. 베르누이 분포 (Bernoulli Distribution) 가정

- 데이터 $x$가 주어졌을 때 $y=1$일 확률을 $f(x)$라고 합시다.
- 그렇다면 자연스럽게 $y=0$일 확률은 $1 - f(x)$가 됩니다. (확률의 합은 1이니까요.)
- 이를 하나의 수식(Likelihood)으로 기가 막히게 통합할 수 있습니다.
    
    $p(y \mid x; \theta) = f_\theta(x)^y (1 - f_\theta(x))^{1-y}$
    
    - $y=1$일 때: 뒤쪽 항이 $(...)^0 = 1$이 되어 날아가고 $f(x)$만 남습니다.
    - $y=0$일 때: 앞쪽 항이 $(...)^0 = 1$이 되어 날아가고 $1 - f(x)$만 남습니다.

### 10.2. Log-Likelihood 함수 정의

전체 $n$개의 데이터에 대해 확률을 모두 곱한 뒤($\prod$), 계산의 편의를 위해 로그($\log$)를 씌웁니다.

$\log L(\theta) = \sum_{i=1}^n \left[ y^{(i)} \log f(x^{(i)}) + (1 - y^{(i)}) \log (1 - f(x^{(i)})) \right]$

---

## 11. 최적화: 경사 상승법 (Gradient Ascent)

Linear Regression에서는 Cost Function을 '최소화'하기 위해 경사 하강법(Descent)을 썼습니다. 하지만 지금 우리가 만든 것은 Likelihood(우도, 확률) 함수입니다. 확률은 '최대화(Maximize)' 해야 합니다!

### 11.1. 경사 상승법의 원리 💡

- 로직은 경사 하강법과 완전히 똑같습니다. 단지 방향만 반대입니다.
- 업데이트 수식에서 마이너스($-$) 기호를 플러스($+$)로만 바꿔주면 됩니다. (기울기가 양수면 오른쪽으로, 음수면 왼쪽으로 가야 꼭대기에 도달하니까요.)

### 11.2. 미분 전개와 놀라운 결과

Log-Likelihood 함수를 $\theta_j$에 대해 미분하면, 시그모이드 함수의 미분 성질이 사용되어 복잡한 식이 마법처럼 약분됩니다. 결과적으로 도출된 경사 상승법 업데이트 수식은 다음과 같습니다.

$\theta_j := \theta_j + \alpha \sum_{i=1}^n (y^{(i)} - f_\theta(x^{(i)})) x_j^{(i)}$

(초핵심 포인트): 수식의 형태를 가만히 보면, Linear Regression의 경사하강법 수식과 완벽하게 똑같이 생겼습니다! (부호 위치만 살짝 다름)

그럼 똑같은 걸 한 건가요? 절대 아닙니다!

- Linear Regression의 알맹이: $f(x) = \theta^T x$ (그냥 직선)
- Logistic Regression의 알맹이: $f(x) = \frac{1}{1 + e^{-\theta^T x}}$ (시그모이드가 씌워진 확률 곡선)
    
    이 '알맹이($f(x)$)'의 차이 때문에, 로지스틱 회귀는 0과 1 사이를 부드럽게 가르는 Decision Boundary(결정 경계)를 스무스하게 만들어낼 수 있습니다.
    

---

## 12. 교수님 Q&A (매우 중요) 🚨

- Q1. 상승법도 수렴이 되나요? 함수가 위로 볼록해야 수렴되는 것 아닌가요?
    - A: 네, 수렴합니다. 사실 Gradient Descent/Ascent가 강력한 이유는 함수가 완벽한 형태가 아니더라도 어떻게든 '합리적인(Reasonable)' 정답에 도달하기 때문입니다. 게다가 Logistic Regression의 Log-Likelihood 함수는 수학적으로 '위로 볼록(Concave)'한 형태가 맞기 때문에, 상승법을 쓰면 확실하게 최댓값(Global Maximum)으로 수렴하게 됩니다.
- Q2. Binary Classification은 결국 경계선(Decision Boundary)을 찾는 것 아닌가요?
    - A: 맞습니다. $\theta^T x$ 값이 경계선으로 표현됩니다. (보통 $\theta^T x = 0$이 되는 지점, 즉 시그모이드 함수값이 0.5가 되는 지점이 두 클래스를 가르는 결정 경계가 됩니다.)

---

## 13. Multiclass Classification (다중 클래스 분류)

클래스가 단 2개(0 또는 1)였던 이진 분류를 확장하여, 클래스가 3개 이상($C$개)인 경우를 다룹니다.

- 확률의 필수 조건: 클래스가 여러 개일 때, 모델이 내뱉는 값들이 진정한 '확률'이 되려면 다음 두 가지 조건을 만족해야 합니다.
    1. 모든 클래스의 확률값을 더하면 1이 되어야 한다. ($\sum p = 1$)
    2. 모든 확률값은 음수가 될 수 없다. ($p \ge 0$)

---

## 14. Softmax Function (소프트맥스 함수) 💡

위에서 언급한 확률의 필수 조건을 완벽하게 만족시켜 주는 마법의 함수가 바로 Softmax입니다. 다중 클래스 분류에서는 시그모이드 대신 소프트맥스를 사용합니다.

$\text{softmax}(t_c) = \frac{\exp(t_c)}{\sum_{k=1}^C \exp(t_k)}$

### 14.1. Softmax의 3가지 핵심 역할 (출제 포인트)

1. 확률로의 치환: 각각의 선형 결과값($\theta^T x$)에 지수함수(Exponential)를 취한 뒤, 전체 합으로 나누어주어(Normalization) 값을 0과 1 사이의 확률로 만들어 줍니다.
2. 음수 제거: 지수함수($e^x$)를 씌우기 때문에 원래 선형 값이 음수였더라도 무조건 양수로 바뀝니다.
3. 클래스 간의 차이 극대화 (Amplification): 지수함수의 특성상 값이 조금만 커져도 결과값이 기하급수적으로 커집니다. 큰 값은 더욱 지배적으로 만들고, 나머지 확률은 억누릅니다.

### 14.2. 다항 분포 (Multinomial Distribution) 가정

이진 분류에서는 베르누이 분포를 가정했지만, 다중 클래스 분류에서는 $Y$값이 다항 분포(Multinomial Distribution)를 따른다고 가정합니다.

---

## 15. Cross-Entropy Loss (교차 엔트로피 손실) 💡

이제 최적의 파라미터를 찾기 위해 손실 함수(Loss Function)를 정의할 차례입니다.

### 15.1. Negative Log-Likelihood (NLL)

이진 분류에서는 Log-Likelihood를 '최대화(경사 상승법)' 했습니다. 하지만 딥러닝/기계학습에서는 관습적으로 '최소화(Minimize)' 하는 문제를 선호합니다. 따라서 Log-Likelihood 식 앞에 마이너스($-$)를 붙여서, 이를 최소화하는 문제로 바꿉니다.

### 15.2. Cross-Entropy Loss의 등장

이렇게 마이너스를 붙여 만든 손실 함수를 정보 이론(Information Theory)의 용어를 빌려 Cross-Entropy Loss라고 부릅니다.

$L(\theta) = -\frac{1}{n} \sum_{i=1}^n \sum_{c=1}^C y_c^{(i)} \log p_c^{(i)}$

### 15.3. 미분 시 주의사항 (교수님 코멘트)

소프트맥스 함수는 분모에 '모든 클래스의 합'이 들어갑니다. 즉, 어떤 한 클래스의 파라미터가 바뀌면 다른 모든 클래스의 확률값에도 영향을 줍니다. 이 때문에 미분을 할 때 정답 클래스($y = c$)와 오답 클래스($y \neq c$)를 나누어서 계산해야 하지만, 최종 수식은 앞서 배운 회귀들과 매우 유사하게 귀결됩니다.

---

## 16. Generalized Linear Models (GLM, 일반화 선형 모델) 💡💡

오늘 강의의 최종 결론이자 가장 중요한 통합 뷰(View)입니다.

우리가 배운 Linear Regression, Logistic Regression, Multiclass Classification은 사실 완벽하게 똑같은 뼈대($\theta^T x$)를 공유하는 형제들입니다. 이를 통합하여 GLM이라고 부릅니다.

유일한 차이점은 "$Y$값이 어떤 확률 분포를 따른다고 가정했느냐?"와 "그에 따라 어떤 함수(Link function)를 씌웠느냐?" 뿐입니다.

| **모델 (Model)** | **목표** | **Y값의 분포 가정** | **씌워주는 함수 (Link Function)** |
| --- | --- | --- | --- |
| Linear Regression | 연속적인 수치 예측 | 정규 분포 (Normal/Gaussian) | Identity Function (아무것도 안 씌움) |
| Logistic Regression | 이진 분류 (클래스 2개) | 베르누이 분포 (Bernoulli) | Sigmoid (Logistic) Function |
| Multiclass Classification | 다중 분류 (클래스 3개 이상) | 다항 분포 (Multinomial) | Softmax Function |

---

## 17. 강의 마무리 Q&A (핵심 복습)

- Q: Analytic Solution(해석적 해)은 언제 쓸 수 있나요?
    - A: 도함수가 0이 되는 포인트가 딱 하나일 때(Convex한 2차 함수 등) 쓸 수 있습니다. 현실의 대부분 문제는 예쁘지 않아 Analytic Solution이 존재하지 않기 때문에 Gradient Descent(경사하강법)가 필수적입니다.
- Q: Linear Regression에서 쓴 Identity Function이 뭔가요?
    - A: "아무것도 없는 거예요." 즉, 입력된 값($\theta^T x$)을 변형 없이 그대로 출력으로 내보내는 함수($y = x$)를 의미합니다.