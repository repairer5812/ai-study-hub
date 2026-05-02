# 🚀 [딥러닝 8주차] 서브노트: LSTM & GRU (Long Short-Term Memory & Gated Recurrent Unit)

7주차에서 다룬 RNN의 치명적 단점(**Gradient Vanishing/Exploding, Long-Term Dependency**)을 해결하기 위해 등장한 **게이트(Gate) 기반 RNN**의 두 핵심 모델 LSTM과 GRU를 정리합니다. 중간고사가 서술형(오픈북)인 만큼, 단순 수식 암기가 아닌 **각 게이트의 역할과 수식이 의미하는 바**를 글로 풀어 설명할 수 있어야 합니다.

---

## 🔁 0. 7주차 복습: RNN의 한계 재확인

### 💡 출제 포인트: LSTM/GRU가 "왜" 등장했는지의 맥락 — 이 챕터를 모르면 8주차 전체가 흔들립니다

### Hidden State $h_t$의 역할 (재확인)
- 이전 타임스텝 $t-1$의 hidden state는 **처음부터 $t-1$까지의 모든 정보를 압축 인코딩한 메모리(Encoded Memory)** 역할.
- 학습은 **BPTT (Backpropagation Through Time)** — 시간 축으로 펼쳐 forward → backward 진행.
- **파라미터 공유(Parameter Sharing)**: 모든 타임스텝에서 동일 가중치 행렬 $W$ 사용.

### Vanilla RNN Gradient Flow (수식 핵심)
$$h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t) = \tanh\left(W \begin{pmatrix} h_{t-1} \\ x_t \end{pmatrix}\right)$$

- BPTT 시 $h_t \to h_{t-1}$ 역전파에서 가중치 행렬 $W$ (정확히는 $W_{hh}^T$)가 **반복적으로 곱해짐**.
- 따라서 $h_0$에 대한 gradient를 계산하려면 **W를 수십 번 곱한 항**이 등장.

---

## ⚠️ 1. RNN의 두 치명상: Vanishing / Exploding Gradient

### 💡 출제 포인트: 왜 발생하는가? — 선형대수(행렬의 고유값/특이값)로 설명할 수 있어야 함

행렬 연산은 본질적으로 **선형 시스템(Linear System)에서의 선형 변환**이며, 행렬식(Determinant)은 볼륨을 키우거나 줄이는 역할을 합니다. 동일한 $W$가 BPTT에서 반복해서 곱해질 때, **$W$의 가장 큰 고유값(Largest Eigenvalue) 또는 가장 큰 특이값(Largest Singular Value)** 이 기준이 됩니다.

### ① Exploding Gradient (기울기 폭발)
- **원인**: $W$의 **가장 큰 특이값(Largest Singular Value) > 1**.
- **현상**: 에러가 $W$와 반복 곱해지면서 어마어마하게 커짐 → 발산(터짐).
- **결과**: 가중치 업데이트 시 $W$를 너무 멀리 보내버려 정상 학습 불가.
- **왜 RNN에서만?**: CNN, MLP, DNN은 파라미터를 공유하지 않으므로 잘 발생하지 않지만, RNN은 **동일한 $W$를 반복해서 곱하기 때문**.

### ② Vanishing Gradient (기울기 소실)
- **원인**: $W$의 **가장 큰 특이값 < 1**.
- **현상**: 에러 값이 계속 곱해지며 점점 작아져 **0에 수렴**.
- **결과**: 롱 시퀀스(Long Sequence)에서 끝의 에러를 앞으로 전달해도 값이 사라져 **앞쪽 파라미터가 학습되지 않음**.

### 💡 [출제 포인트] 해결 전략 분기
| 문제 | 해결 |
|------|------|
| **Exploding Gradient** | **Gradient Clipping** (간단한 해결) |
| **Vanishing Gradient** | **RNN 아키텍처 자체를 변경 → LSTM, GRU** (구조적 해결) |

---

## ✂️ 2. Exploding Gradient의 해결: Gradient Clipping

### 💡 출제 포인트: 단순한 스케일링 기법 한 가지가 폭발 문제를 효과적으로 잡는다

### 핵심 아이디어
> 값이 너무 커지면 너무 무리하지 않게 그 값을 줄이자(Scaling down).

### 의사 코드 (PDF 슬라이드 그대로)
```python
grad_norm = np.sum(grad * grad)
if grad_norm > threshold:
    grad *= (threshold / grad_norm)
```

### 작동 방식
1. Gradient의 **Norm**을 계산.
2. 사전에 정한 **Threshold(임계값, 하이퍼파라미터)** 보다 크면 **다운 스케일(Down scale)**.
3. Threshold 이하라면 그대로 사용.

### 교수님 비유
> "Loss function 표면에서 Gradient가 무한대에 가까워지면 파라미터를 **저 멀리 보내버리기** 때문에, 너무 멀리 가지 않게 스케일링을 하는 **아주 심플한 방식**입니다."

> 📝 **PDF 시각 자료**: 절벽(cliff) 모양의 loss surface에서 gradient가 절벽 아래로 떨어질 때 scaling으로 방향은 유지하되 크기를 줄여 발산을 막는 그림. 점선이 clipping 적용 경로, 실선이 미적용 경로(발산).

---

## 🌉 3. Long-Term Dependency Problem (장기 의존성 문제)

### 💡 출제 포인트: Vanishing Gradient와 짝을 이루는 RNN의 **구조적 한계**

### 개념
- 시퀀스 데이터에는 **초기에 나온 입력값과 오랜 시간 뒤 입력값이 시간적으로 멀리 떨어져 있지만 관련성이 높은 케이스**가 존재.
- 예: "I grew up in **France** ... I speak fluent ___" → 빈칸은 'French'. 'France'와 'French'는 멀리 떨어져 있음.

### Short-term vs Long-term Dependency (PDF 그림)
| 구분 | 특징 |
|------|------|
| **Short-term Dependency** | $h_3$ 결정에 가까운 $x_0, x_1$이 강하게 영향 — RNN이 잘 처리 |
| **Long-term Dependency** | $h_{t+1}$ 결정에 멀리 떨어진 $x_0, x_1$이 영향 — Vanilla RNN이 약함 |

### RNN이 약한 구조적 이유
- 이론상 hidden state는 모든 정보를 인코딩 가능.
- **하지만** Hidden State의 **Dimension(차원)이 특정 크기로 고정**되어 있음.
- 오랜 시간의 모든 정보를 **하나의 고정 차원 벡터에 다 담기엔 용량 부족** (모든 부담을 hidden state 혼자 떠안음).
- 차원을 늘리면 메모리·파라미터가 **Quadratic(제곱)으로 증가** → 또 다른 문제.

### 결론
> 근처 정보(Short-term)는 잘 반영하지만, 멀리 있는 정보(Long-term)는 연관성을 파악하기 힘들어진다.

---

## 🛠️ 4. 한계 극복: LSTM과 GRU의 등장

### 💡 출제 포인트: 두 모델의 **역사적 순서, 핵심 아이디어, 게이트 활성화 함수**의 차이

### 등장 배경
- **LSTM** (Hochreiter & Schmidhuber, 1997) — 먼저 등장. 구조 복잡.
- **GRU** (Cho et al., 2014) — 나중 등장. **LSTM의 불필요한 연산을 간소화**.
- 교수님은 이해를 돕기 위해 **구조가 더 단순한 GRU를 먼저** 설명하셨음.

### 공통 핵심 아이디어
> 정보의 흐름을 컨트롤하는 **'게이트(Gate)'** 도입 — 과거 메모리를 그대로 통과시키거나, 잊거나, 새 정보를 추가하는 흐름을 학습으로 결정.

### 💡 [출제 포인트] 게이트(Gate) 연산과 활성화 함수
게이트는 말 그대로 정보가 통과하는 '문' 역할이며, 두 가지 특이한 활성화 함수를 사용합니다.

| 함수 | 출력 범위 | 의미 |
|------|----------|------|
| **Sigmoid** ($\sigma$) | **0 ~ 1** | 컴퓨터의 이진 연산(Binary)과 유사. **0=문 닫힘(완전 차단)**, **1=문 활짝 열림(100% 통과)** |
| **Hyperbolic Tangent** ($\tanh$) | **-1 ~ +1** | 새로운 정보의 **방향과 양**을 결정. **1=값 그대로**, **-1=값 반전** |

> 📝 **NLP 관점**: 게이트가 0.5면 "절반만 통과", 1이면 "다 통과", 0이면 "차단" — Sigmoid의 부드러운(soft) 특성이 학습 가능한 게이트의 핵심.

---

## 🎚️ 5. GRU (Gated Recurrent Unit) 상세 분석

### 💡 출제 포인트: **Update Gate vs Reset Gate** 의 역할 차이, 그리고 **interpolation 수식의 의미**

### GRU 핵심 수식 (PDF 슬라이드 7/23 그대로)
$$z_t = \sigma(W_z \cdot [h_{t-1}, x_t]) \quad \text{(update gate)}$$
$$r_t = \sigma(W_r \cdot [h_{t-1}, x_t]) \quad \text{(reset gate)}$$
$$\tilde{h}_t = \tanh(W \cdot [r_t * h_{t-1}, x_t]) \quad \text{(new memory content)}$$
$$h_t = (1 - z_t) * h_{t-1} + z_t * \tilde{h}_t \quad \text{(final memory)}$$

(여기서 $*$ 는 **element-wise multiplication**)

### GRU의 단순함
- **Cell State 없음**: LSTM의 복잡한 Cell State 개념 없이 **Hidden State $h_t$ 하나로 메모리 + 출력 모두 수행**.
- **2개 게이트만 사용**: Update($z_t$) + Reset($r_t$).

### ① Update Gate $z_t$
- **역할**: 과거 정보 $h_{t-1}$와 새 정보 $\tilde{h}_t$ 사이를 **인터폴레이션(Interpolation, 보간)**.
- 수식적 의미: $h_t = (1-z_t) \cdot h_{t-1} + z_t \cdot \tilde{h}_t$
  - $z_t \to 1$: 새 정보 100% 반영, 과거 무시.
  - $z_t \to 0$: 과거 정보 100% 유지, 새 정보 무시 (**여러 타임스텝 동안 정보 복사 가능 → Less vanishing gradient!**).
- **하나가 커지면 다른 하나는 줄어드는 구조** ($1-z_t$ 와 $z_t$ 가 서로 보완).

### ② Reset Gate $r_t$
- **역할**: 새 메모리 후보 $\tilde{h}_t$를 만들 때, 과거 hidden state $h_{t-1}$을 **얼마나 잊어버릴지(Reset)** 결정.
- 작동: $\tilde{h}_t = \tanh(W \cdot [r_t * h_{t-1}, x_t])$ — $h_{t-1}$에 $r_t$가 곱해짐.
  - $r_t \to 0$: 이전 상태 완전 무시 → 새 정보만 저장 (단기 의존성).
  - $r_t \to 1$: 과거 정보 다 살려서 새 후보 계산 (장기 의존성).

### 💡 [출제 포인트] Dependency 길이별 게이트 활성화 패턴
| Dependency | 어느 게이트가 Active? | 이유 |
|-----------|---------------------|------|
| **Short-Term** | **Reset Gate** $r_t$ Active | 과거 정보 빨리 지우고 단기 신호만 유지 |
| **Long-Term** | **Update Gate** $z_t$ Active ($z_t \to 0$) | 과거 정보를 길게 복사·유지 |

### 💡 [출제 포인트] GRU는 어떻게 Vanishing Gradient를 해결하는가?
- 단순히 $W$를 곱하는 RNN과 달리, GRU는 **게이트가 열려 있으면 정보를 그대로 통과**시킴.
- 불필요한 연결은 네트워크가 스스로 끊고(**Prune unnecessary connections adaptively**), 필요한 정보는 에러가 앞단으로 흘러갈 수 있도록 **지름길(Shortcut)** 을 만듦.
- **교수님 비유**: 이 구조는 **ResNet의 Skip Connection (Adaptive shortcut connections)** 과 매우 유사 → 기울기 소실 방지.
  - ResNet 수식: $\mathcal{H}(x) = \mathcal{F}(x) + x$
  - GRU도 $h_t$ 안에 $h_{t-1}$이 직접 더해지는 구조 ($z_t \to 0$일 때).

---

## 🧠 6. LSTM (Long Short-Term Memory) 상세 분석

### 💡 출제 포인트: **Cell State, 3개 게이트, Cell State 업데이트 수식**을 체계적으로 서술

### LSTM 핵심 수식 (PDF 슬라이드 17/23 그대로 / "vector" 표기)
$$\begin{pmatrix} i_t \\ f_t \\ o_t \\ g_t \end{pmatrix} = \begin{pmatrix} \sigma \\ \sigma \\ \sigma \\ \tanh \end{pmatrix} W \begin{pmatrix} h_{t-1} \\ x_t \end{pmatrix}$$
$$c_t = f_t \odot c_{t-1} + i_t \odot g_t$$
$$h_t = o_t \odot \tanh(c_t)$$

### 💡 [출제 포인트] Cell State $C_t$의 도입 — LSTM의 가장 큰 특징
- LSTM은 Hidden State $h_t$ 외에 **Cell State $C_t$** 라는 **새로운 상태 변수**를 도입.
- **역할**: 정보 흐름을 담당하는 **컨베이어 벨트(고속도로)**. 게이트들에 의해 정보가 추가(Adding)되거나 삭제(Removing)되면서 **시퀀스 끝까지 정보를 안전하게 전달**.

### 💡 [출제 포인트] LSTM의 3개 핵심 게이트 + 후보값

#### ① Forget Gate $f_t$
- **역할**: 과거 Cell State $C_{t-1}$에서 어떤 정보를 **버릴지(Throw away)** 결정.
- 수식: $f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$
- **Sigmoid 출력**: 0이면 "싹 다 잊어라", 1이면 "아무것도 잊지 말고 그대로 유지".

#### ② Input Gate $i_t$ + Candidate $\tilde{C}_t$
- **역할**: Cell State에 어떤 **새로운 정보를 저장할지** 결정.
- 수식:
  - $i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$ — 새 정보를 **얼마나 반영할지(양, 0~1)**
  - $\tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C)$ — **어떤 방향으로 얼마만큼 더하거나 뺄지** 새 후보값(-1~+1)

#### ③ Cell State 업데이트
$$C_t = f_t * C_{t-1} + i_t * \tilde{C}_t$$
- **첫 항**: 과거 정보를 Forget Gate로 걸러서 유지.
- **둘째 항**: 새 정보(Candidate)를 Input Gate로 걸러서 추가.
- 💡 **핵심**: **곱셈(걸러내기) + 덧셈(추가)** 의 단순 조합 → gradient flow 보존.

#### ④ Output Gate $o_t$ + Hidden State 산출
- **역할**: 업데이트된 $C_t$를 바탕으로 **최종 $h_t$로 무엇을 내보낼지** 결정.
- 수식:
  - $o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)$
  - $h_t = o_t * \tanh(C_t)$
- **Cell State는 메모리 전용, Hidden State는 환경(다음 layer/output)과 상호작용** — 이 분리가 LSTM 설계의 묘미.

### 💡 [출제 포인트] 게이트와 후보값의 활성화 함수 정리
| 변수 | 활성화 함수 | 출력 | 의미 |
|------|----------|------|------|
| $f_t$ (Forget) | Sigmoid | 0~1 | 과거를 얼마나 잊을까 |
| $i_t$ (Input) | Sigmoid | 0~1 | 새 정보를 얼마나 받을까 |
| $o_t$ (Output) | Sigmoid | 0~1 | $C_t$의 어느 부분을 내보낼까 |
| $\tilde{C}_t$ (Candidate) | **tanh** | -1~+1 | 새 정보의 방향·크기 |

---

## 🛣️ 7. LSTM은 어떻게 Vanishing Gradient를 해결하는가?

### 💡 출제 포인트: **"Uninterrupted Gradient Flow"** 라는 PDF 표현과 **ResNet과의 유사성**

### 핵심 메커니즘
- Cell State 라인을 보면 **복잡한 행렬 곱셈 대신 덧셈(+)과 element-wise 곱셈** 위주.
- $c_t = f \odot c_{t-1} + i \odot g$ — $c_{t-1}$에서 $c_t$로 가는 직접적·선형적 경로 존재.

### Backward 시점의 Gradient Flow
- $c_t \to c_{t-1}$ 역전파에서 **단순히 $f$와 element-wise 곱** 뿐 (행렬 W를 곱하지 않음!).
- 따라서 **"Backpropagation from $c_t$ to $c_{t-1}$ only elementwise multiplication by $f$, no matrix multiply by $W$"** (PDF 슬라이드 17/23).

### 💡 PDF가 강조한 그림: **"Uninterrupted gradient flow!"**
- $c_0 \leftarrow c_1 \leftarrow c_2 \leftarrow c_3$ 라인 위로 빨간 화살표가 끊김 없이 거꾸로 흐르는 그림.
- 하단에는 **ResNet의 skip connection**이 함께 그려져 있음 → "Similar to ResNet!" 명시.

### 사이에 있는 친척: Highway Networks
PDF는 **Highway Networks** (Srivastava et al., ICML DL Workshop 2015)를 **LSTM과 ResNet의 중간 단계**로 함께 소개합니다.
$$g = T(x, W_T)$$
$$y = g \odot H(x, W_H) + (1-g) \odot x$$
- 게이트 $g$로 변환($H$)과 항등($x$) 사이를 보간 — GRU의 update gate, LSTM의 cell state, ResNet의 skip connection이 **공통적으로 공유하는 철학**.

### 결론
> LSTM은 **곱셈만 누적되는 Vanilla RNN의 BPTT 경로** 대신, **Cell State라는 별도 고속도로**를 깔아 gradient가 그대로 흘러가도록 설계 → Vanishing Gradient 해결.

---

## 🧪 8. LSTM의 변형 모델들 (Variants)

### 💡 출제 포인트: 두 변형의 이름과 핵심 아이디어를 한 줄씩 외우기

### ① Peephole LSTM (Gers & Schmidhuber, 2000)
- **아이디어**: 기존에는 게이트들이 $h_{t-1}$과 $x_t$만 보고 판단했지만, **현재의 Cell State $C_t$ 정보까지 같이 보고(Peephole)** 게이트 값을 결정.
- 변형 수식 (PDF 슬라이드 18/23):
  - $f_t = \sigma(W_f \cdot [\mathbf{C_{t-1}}, h_{t-1}, x_t] + b_f)$
  - $i_t = \sigma(W_i \cdot [\mathbf{C_{t-1}}, h_{t-1}, x_t] + b_i)$
  - $o_t = \sigma(W_o \cdot [\mathbf{C_t}, h_{t-1}, x_t] + b_o)$ ← Output gate는 **$C_{t-1}$이 아닌 $C_t$** (업데이트된 cell state)를 봄
- 게이트 값 결정에 cell state를 **"엿보기(peephole)"** — 비유적으로 문 옆 작은 구멍.

### ② Coupled Forget and Input Gates
- **아이디어**: Forget과 Input을 따로 계산하지 않고 **하나로 묶음** — "잊어버린 만큼만 채워 넣자".
- 수식 (PDF 슬라이드 19/23):
$$C_t = f_t * C_{t-1} + (1 - f_t) * \tilde{C}_t$$
- $f_t$ 하나로 양쪽이 자동 결정 — **GRU의 Update Gate와 매우 유사한 발상**.

### LSTM vs GRU 한눈에 비교 (PDF 슬라이드 20/23)
| 항목 | LSTM | GRU |
|------|------|-----|
| **게이트 개수** | 3개 (f, i, o) | 2개 (z, r) |
| **상태 변수** | Hidden $h_t$ + **Cell $C_t$** (분리) | Hidden $h_t$ 하나로 통합 |
| **새 후보** | $\tilde{C}_t = \tanh(\ldots)$ | $\tilde{h}_t = \tanh(W[r_t * h_{t-1}, x_t])$ |
| **메모리 갱신** | $C_t = f * C_{t-1} + i * \tilde{C}_t$ | $h_t = (1-z) * h_{t-1} + z * \tilde{h}_t$ |
| **출력** | $h_t = o_t * \tanh(C_t)$ | $h_t$ 자체가 출력 |
| **파라미터 수** | 많음 | 적음 (LSTM의 약 75%) |

---

## 📚 9. (참고) Long Short-Term Memory-Networks (LSTMN)

PDF 21~23/23 슬라이드에서 다룬 **LSTM의 발전형** (Cheng et al., 2016).

### LSTM의 한계 재진단
- **이론**: Cell State가 모든 이전 입력을 잘 요약하리라 가정.
- **실제 한계 (PDF 명시)**:
  1. 시퀀스가 **너무 길거나** memory size가 **충분히 크지 않으면** 실패.
  2. 토큰 간 **관계(Relation)를 명시적으로 reasoning할 메커니즘 부재** — 단순히 token-by-token 순차 집계뿐.

### LSTMN의 아이디어 (Weston et al., 2015 메모리 네트워크 영감)
- LSTM의 단일 memory cell을 **memory tape $C_t = (c_1, \cdots, c_t)$** + **hidden state tape $H_t = (h_1, \cdots, h_t)$** 로 확장.
- **Neural Attention**으로 토큰 간 관계 reasoning.
- 수식 (요약):
  - $a_i^t = v^\top \tanh(W_h h_i + W_x x_t + W_{\tilde{h}} \tilde{h}_{t-1})$
  - $s_i^t = \text{softmax}(a_i^t)$
  - $\begin{pmatrix} \tilde{h}_t \\ \tilde{c}_t \end{pmatrix} = \sum_{i=1}^{t-1} s_i^t \begin{pmatrix} h_i \\ c_i \end{pmatrix}$
- 이후 LSTM 게이트 연산은 동일하지만 **non-Markov 상태 업데이트** 가능.
- **의의**: LSTM → Attention → Transformer로 이어지는 진화 경로의 중간 다리.

---

## 🛠️ 10. 교수님의 실무 팁 & Q&A

### 💡 GRU vs LSTM 실무 적용 가이드 (★ 시험·면접 단골)
> **새로운 태스크나 도메인에 메모리 개념을 적용한다면, 먼저 GRU를 써보는 것을 권장.**

- **이유**: GRU가 **파라미터 수가 훨씬 적고 심플**.
- **순서**: GRU로 베이스라인 측정 → 성능을 더 끌어올리거나 robust함이 필요할 때 LSTM으로 넘어감.

### Q&A: 왜 게이트에 Softmax 대신 Sigmoid를 쓰나요?
- Softmax를 쓰면 여러 값 중 **하나를 강제로 선택(합 = 1)** 하게 됨.
- **하지만** 정보를 잊는 것과 새 정보를 더하는 것은 **반드시 상반되거나 하나만 선택해야 하는 배타적 관계가 아님**.
- 각각 **독립적으로 양을 조절**해야 하므로 Sigmoid가 적합.

### Q&A: 활성화 함수에 Sigmoid와 tanh를 둘 다 쓰는 이유?
- **Sigmoid (0~1)**: 게이트 — "통과시킬 비율".
- **tanh (-1~+1)**: 후보값(content) — "어느 방향으로 얼마나 더할지".
- 두 역할이 **명확히 다르기 때문에** 함수도 다름.

### 최신 트렌드와의 연결 (교수님이 강조하신 인사이트)
> 이러한 **'게이팅(Gating)' 메커니즘과 'State Transition' 개념**은 RNN/LSTM에 머물지 않고, 최근 각광받는 **Mamba(맘바)** 나 Transformer의 **MoE(Mixture of Experts)** 구조에서도 그 철학이 **그대로 이어진다**.
- LSTM 게이트 → Transformer Attention → Mamba State Space → MoE Gating: 모두 "정보 흐름을 학습 가능한 가중치로 제어한다"는 같은 뿌리.

---

## 🎯 8주차 최종 암기 체크리스트

### Vanilla RNN의 한계 (출발점)
- [ ] Vanishing Gradient: $W$ 최대 특이값 < 1 → 0으로 수렴 → 앞쪽 학습 불가
- [ ] Exploding Gradient: $W$ 최대 특이값 > 1 → 발산
- [ ] Long-Term Dependency: 고정 차원 hidden state로 긴 의존성 처리 한계

### Gradient Clipping
- [ ] **Exploding Gradient만** 해결 (Vanishing은 X)
- [ ] grad_norm > threshold → 스케일 다운
- [ ] **방향은 유지, 크기만 축소** (절벽 그림 시각화)

### 게이트 활성화 함수
- [ ] **Sigmoid (0~1)**: 게이트 → 통과 비율
- [ ] **tanh (-1~+1)**: 후보값 → 방향·크기
- [ ] Softmax 안 쓰는 이유: 게이트는 배타적이지 않으므로

### GRU 핵심
- [ ] Cell State 없음, Hidden State 하나로 통합
- [ ] 게이트 2개: **Update $z_t$ + Reset $r_t$**
- [ ] $h_t = (1-z_t) * h_{t-1} + z_t * \tilde{h}_t$ — interpolation
- [ ] **Reset $r_t$ active** → Short-term / **Update $z_t \to 0$** → Long-term
- [ ] ResNet의 Adaptive Shortcut과 유사

### LSTM 핵심
- [ ] **Cell State $C_t$** 도입 (정보 고속도로)
- [ ] 게이트 3개: **Forget $f_t$ + Input $i_t$ + Output $o_t$**
- [ ] Candidate $\tilde{C}_t$ (tanh) — 새 정보의 방향·크기
- [ ] $C_t = f_t * C_{t-1} + i_t * \tilde{C}_t$
- [ ] $h_t = o_t * \tanh(C_t)$

### 왜 LSTM이 Vanishing을 해결하나
- [ ] **Cell State 라인은 행렬곱 없음** — element-wise 곱과 덧셈만
- [ ] **"Uninterrupted gradient flow"** — ResNet skip connection과 유사
- [ ] Highway Networks — LSTM과 ResNet의 중간 다리

### LSTM 변형
- [ ] **Peephole LSTM** — 게이트가 cell state까지 엿봄
- [ ] **Coupled Forget/Input** — $i_t = 1 - f_t$ (GRU와 유사)

### LSTM vs GRU
- [ ] **GRU 먼저 시도** (파라미터 적고 심플) → 필요 시 LSTM
- [ ] LSTM 게이트 3개 vs GRU 게이트 2개
- [ ] LSTM은 메모리($C$)와 출력($h$) **분리**, GRU는 **통합**

### 발전 방향
- [ ] LSTM → Attention → Transformer
- [ ] LSTMN: memory tape + attention
- [ ] **게이팅 철학**은 Mamba, MoE까지 이어짐

### 시험 대비 원칙 (7주차와 동일)
- [ ] **서술형 오픈북** (5월 11일)
- [ ] **수식 암기 X, 의미 서술 ○**
- [ ] 게이트 각각이 **무엇을 결정하는지 한 줄로 답할 수 있어야 함**
