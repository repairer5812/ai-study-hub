# 🚀 [딥러닝 9주차] 서브노트: RNN 실습 — RNN · LSTM · GRU 비교 + Image Patch (ViT 빌드업)

> 📌 **수업 형태**: 9주차는 **조교(TA) 진행 실습**입니다. 5·7·9주차는 모두 조교 실습 회차로, 교수님 수업과 다른 톤·디테일을 가집니다.
> 📌 **자료**: PDF + Colab 노트북(`20260504_3주차_RNN_실습.ipynb`). 슬라이드 노트가 적어 코드를 같이 봐야 이해됩니다. **이 노트는 핵심 코드만 발췌**합니다 — 전체 코드는 ipynb 원본 참고.

---

## 0. 실습 개요

### 실습 주제
시계열용 **RNN 계열(RNN, LSTM, GRU)** 을 활용해 **이미지 분류(Image Classification)**.

### 사용 데이터셋의 함정 ⚠️
- **슬라이드 표지**: MNIST.
- **실제 코드/강의**: **CIFAR-10 (32×32×3)**.
- 개요와 실제가 다른 점 자체가 출제 가능.

### 💡 조교 코멘트
> 보통 RNN은 타임 시리즈 데이터를 사용하지만, 이번 실습에서는 **이미지로 하는 것**을 보여드립니다.

이미지를 시퀀스 데이터처럼 다루는 방식이 핵심 (각 행을 timestep으로).

---

## 1. RNN · LSTM · GRU 이론·수식 비교 (★★★)

### ① RNN
- **개념**: 이전 timestep 출력을 현재 timestep 입력으로 사용.
- **수식**: $h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$
- ✅ 단순 / ❌ **장기 의존성 문제**.
- 💡 조교: "타임 시퀀스 100이라고 할 때 100번째 가면 앞의 내용이 많이 희석."

### ② LSTM
- **개념**: 3 게이트(i·f·o) + Cell State $C_t$.
- **셀 갱신**: $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$, $h_t = o_t \odot \tanh(C_t)$.
- ✅ 장기 의존성 해결 / ❌ 비용 큼.

### ③ GRU
- **개념**: 2 게이트(z·r). $C_t$와 $h_t$ 통합.
- **갱신**: $h_t = (1-z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t$.
- ✅ 단순·저비용 / ❌ 일부 복잡 문제에서 LSTM 대비 약함.
- 💡 조교: "게이트가 너무 많아 복잡한 것을 단순화시켜서 hidden과 cell을 한 번에 볼 수 있게 만든 것이 GRU."

### 비교 요약표

| 모델 | 게이트 수 | 상태 변수 | 계산 비용 | 장기 의존성 |
|------|----------|----------|----------|------------|
| **RNN** | 0 | $h_t$ | 가장 적음 | ❌ 약함 |
| **LSTM** | 3 (i, f, o) | $h_t$ + $C_t$ | 가장 큼 | ✅ 우수 |
| **GRU** | 2 (z, r) | $h_t$ | 중간 | ✅ 우수 (LSTM과 유사) |

---

## 2. 핵심 코드 1 — 모델 클래스 (★★★ 출제 1순위)

세 모델의 `forward` 가 거의 동일하지만 **LSTM만 `c0` 추가**라는 점이 핵심.

```python
# RNN
class RNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes):
        super().__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.rnn = nn.RNN(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)
        self.apply(init_weights)

    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)
        out, _ = self.rnn(x, h0)        # (batch, seq_length, hidden_size)
        out = out[:, -1, :]              # 💡 마지막 timestep만
        return self.fc(out)


# LSTM ─ RNN과의 핵심 차이 ⭐
class RNN_LSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes):
        super().__init__()
        # ...동일한 init 부분 생략...
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)

    def forward(self, x):
        # 💡 LSTM만 c0 추가 + 튜플 (h0, c0) 전달
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)
        out, _ = self.lstm(x, (h0, c0))
        return self.fc(out[:, -1, :])


# GRU ─ RNN과 동일 (h0만)
class RNN_GRU(nn.Module):
    # ...
    def forward(self, x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)
        out, _ = self.gru(x, h0)
        return self.fc(out[:, -1, :])
```

### 💡 [출제 1순위] 초기 상태 차이

| 모델 | 초기 상태 |
|------|---------|
| **RNN** | `h0` 하나만 |
| **GRU** | `h0` 하나만 |
| **LSTM** | **`(h0, c0)` 튜플** ← 차이점 |

> 💡 **조교 팁**: "RNN 구현할 줄 알면 모듈 이름(`nn.RNN`, `nn.LSTM`, `nn.GRU`)만 바꾸면 다 쓸 수 있다. 단, **LSTM만 c0 초기값 설정이 추가**된다는 인풋 차이점만 생각하라."

> 💡 **출제 포인트** — 마지막 timestep 추출: `out[:, -1, :]`. `out` shape은 `(batch, seq_length, hidden_size)`.

---

## 3. 핵심 코드 2 — 이미지 → 시퀀스 변환 (★★★)

CIFAR-10 shape `(B, 3, 32, 32)` 를 RNN 입력 `(B, seq_len, feat)` 로 한 줄에 변환:

```python
images = images.permute(0, 2, 3, 1).contiguous().view(images.size(0), 32, -1)
# (B, 32, 96) — 32 timesteps (각 행), 매 step의 입력 96 = 32(가로) × 3(채널)
```

### 단계 풀이 (말로만 들어 헷갈리던 부분)
- 원본: $(B,\ C{=}3,\ H{=}32,\ W{=}32)$.
- `permute(0, 2, 3, 1)`: $(B, H, W, C) = (B, 32, 32, 3)$.
- `.contiguous().view(B, 32, -1)`: H를 시퀀스로 두고, 매 step에 $W \times C = 96$ 으로 펼침.
- → **각 가로 한 줄(row)이 한 timestep**, 그 줄의 모든 색채널이 input feature.

> 💡 `.permute()` 후엔 **반드시 `.contiguous()` → `.view()`** 순서 (메모리 비연속 텐서를 view 못 받음).

---

## 4. 핵심 코드 3 — 가중치 초기화 (출제 포인트)

```python
def init_weights(m):
    if isinstance(m, (nn.Linear, nn.Conv2d)):
        nn.init.xavier_uniform_(m.weight.data)
        ...
    elif isinstance(m, (nn.LSTM, nn.RNN, nn.GRU)):
        for name, param in m.named_parameters():
            if 'weight_ih' in name:
                nn.init.xavier_uniform_(param.data)   # 입력→은닉
            elif 'weight_hh' in name:
                nn.init.orthogonal_(param.data)        # 은닉→은닉 (직교!)
            elif 'bias' in name:
                param.data.fill_(0)
```

| 가중치 | 초기화 | 이유 |
|--------|-------|------|
| `weight_ih` (input→hidden) | **Xavier Uniform** | 일반 표준 |
| `weight_hh` (hidden→hidden) | **Orthogonal** | RNN 기울기 소실/폭발 완화 |
| `bias` | 0 | — |

---

## 5. TensorBoard 사용 5단계 (출제 포인트)

```python
from torch.utils.tensorboard import SummaryWriter
writer = SummaryWriter(f'runs/{experiment_name}')   # ⭐ 모델별로 이름 다르게!
writer.add_scalar('training loss', loss값, step)
# ...학습 끝나고...
writer.close()                                       # ⭐ 빠뜨리면 로그 파일 안 닫힘
```

```python
%load_ext tensorboard
%tensorboard --logdir=runs
```

### ⭐ 핵심 두 가지
1. **모델별로 `experiment_name` 다르게** (`cifar10_experiment_RNN`, `_LSTM`, `_GRU`) — 한 화면에서 그래프 비교.
2. **마지막에 `writer.close()` 반드시** — 조교 강조.

### 학습 루프 흐름 (코드는 표준 PyTorch — 외울 필요 X, 흐름만)
- forward → loss → `optimizer.zero_grad()` → `loss.backward()` → `optimizer.step()`.
- 매 100 step마다 `writer.add_scalar(...)`로 로깅.
- epoch 끝마다 validation, **Early Stopping** (5 epoch 연속 개선 X면 종료).

---

## 6. 모델별 성능 비교 (★★★ 시험 단골)

행(Row) 단위 시퀀스로 넣었을 때 최종 Test Accuracy:

| 모델 | Test Accuracy | 비고 |
|------|--------------|------|
| **RNN** | **25.73%** | 거의 랜덤 추측 수준 |
| **LSTM** | **60.05%** | 장기 의존성 해결로 큰 점프 |
| **GRU** | **61.62%** | LSTM과 비슷 |

### 💡 [출제 ⭐] 왜 RNN은 25%, LSTM/GRU는 60%?

1. **이미지 특성**: 좌상~우하 픽셀 간의 **공간적 관계**가 중요.
2. **RNN의 한계**: 32행을 timestep마다 넣으면, 마지막 행 처리 시점에 **첫 행 정보를 거의 다 잊음** (장기 의존성 문제).
3. **LSTM/GRU 우위**: 게이트 구조가 **첫 행~마지막 행까지의 의존성을 보존**.

> 💡 **조교 코멘트**: "RNN은 이전에 있던 거는 사실 기억을 잘 못할 테니까 롱텀(Long-term)이 되겠죠. 이미지 하나를 보기 위해서는. 그래서 RNN이 학습이 안 된 겁니다."

📝 **결론**: RNN 계열은 Image Classification에 좋은 방법이 아님. 그럼에도 실습한 이유 → **다음 실습 Vision Transformer 빌드업**.

---

## 7. 핵심 코드 4 — Image Patch (Vision Transformer 빌드업, ★★★)

행 단위 자르기의 한계 → 이미지를 **4×4 패치 단위**로 쪼개어 시퀀스로.

```python
def create_patches(images, patch_size):
    batch_size, channels, height, width = images.size()  # (B, 3, 32, 32)

    # H·W 축에서 patch_size 만큼 sliding window로 추출
    patches = images.unfold(2, patch_size, patch_size).unfold(3, patch_size, patch_size)
    # → (B, 3, 8, 8, 4, 4)

    # 평탄화 + permute로 (배치, 패치 수, 패치 내부) 형태로
    patches = patches.contiguous().view(batch_size, channels, -1, patch_size, patch_size)
    patches = patches.permute(0, 2, 1, 3, 4).contiguous()
    patches = patches.view(batch_size, -1, channels * patch_size * patch_size)
    # → (B, 64, 48)  ← 시퀀스 길이 64, feature 48
    return patches
```

shape 흐름 한눈에: `(B,3,32,32)` → unfold → `(B,3,8,8,4,4)` → `(B,64,48)`.

### 패치 GRU 학습 (모델은 그대로, 입력만 패치로 교체)
```python
patch_size = 4
input_size = patch_size * patch_size * 3  # 48
model_patch_gru = RNN_GRU(input_size, hidden_size, num_layers, num_classes).to(device)
# 학습 루프 안에서:
patches = create_patches(images, patch_size)
outputs = model_patch_gru(patches)
```

### 성능: **62.15%** — 행 단위 GRU(61.62%)와 거의 동일.

### 💡 [출제 핵심] 성능 향상도 없는데 왜 패치로?
> 🎯 **조교 답**: "사실 여기서 패치로 나눈다고 해서 크게 잘 되진 않죠. 하지만 다음에 실습하게 될 **비전 트랜스포머(Vision Transformer, ViT)** 모델에서 이미지가 **패치로 들어가게 됩니다**. 그런 거에 기반한 어떠한 **공간감이 있는 정보를 주기 위한 생각**들이라고 할 수 있습니다."

→ **ViT의 작동 방식(이미지를 패치로 분할하여 시퀀스로 취급)을 미리 경험하기 위한 빌드업**.

---

## 8. 주요 슬라이드 (PDF 원본 페이지 렌더)

수업 슬라이드가 적어 코드와 그래프 위주의 자료입니다. 실습 흐름과 텐서보드 결과를 시각으로 빠르게 훑을 수 있도록 18페이지를 모두 포함했습니다.

<details><summary>슬라이드 18장 펼치기</summary>

![w9 p1](assets/images/dl/dl_w9_p01.jpg)

![w9 p2](assets/images/dl/dl_w9_p02.jpg)

![w9 p3](assets/images/dl/dl_w9_p03.jpg)

![w9 p4](assets/images/dl/dl_w9_p04.jpg)

![w9 p5](assets/images/dl/dl_w9_p05.jpg)

![w9 p6](assets/images/dl/dl_w9_p06.jpg)

![w9 p7](assets/images/dl/dl_w9_p07.jpg)

![w9 p8](assets/images/dl/dl_w9_p08.jpg)

![w9 p9](assets/images/dl/dl_w9_p09.jpg)

![w9 p10](assets/images/dl/dl_w9_p10.jpg)

![w9 p11](assets/images/dl/dl_w9_p11.jpg)

![w9 p12](assets/images/dl/dl_w9_p12.jpg)

![w9 p13](assets/images/dl/dl_w9_p13.jpg)

![w9 p14](assets/images/dl/dl_w9_p14.jpg)

![w9 p15](assets/images/dl/dl_w9_p15.jpg)

![w9 p16](assets/images/dl/dl_w9_p16.jpg)

![w9 p17](assets/images/dl/dl_w9_p17.jpg)

![w9 p18](assets/images/dl/dl_w9_p18.jpg)

</details>

---

## 9. 조교 기타 코멘트 & 공지

- **시험 일정**: "다음 주가 중간고사입니다. 잘 준비하시길 바랍니다."
- **수업 단축**: "오늘은 다음 주가 시험이니까 일찍 끝내겠습니다."
- **팀 프로젝트**: "혹시 팀원과 연락이 안 돼서 문제가 생기신 분이 있다면 남아서 말씀해 주세요."

---

## 🎯 9주차 최종 암기 체크리스트

### 모델 비교 (출제 1순위)
- [ ] RNN: $h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$ — 단순, 장기 의존성 X
- [ ] LSTM: 3 게이트(i·f·o) + Cell State — 장기 의존성 ✅
- [ ] GRU: 2 게이트(z·r) — LSTM의 단순화, $C_t$와 $h_t$ 통합

### 코드 차이 (★★★)
- [ ] **LSTM만 `c0` 추가 초기화 + 튜플 `(h0, c0)` 전달**
- [ ] RNN·GRU는 `h0` 하나만
- [ ] 마지막 timestep만 추출: `out[:, -1, :]`

### 데이터 변환
- [ ] CIFAR-10: `(B, 3, 32, 32)` → `permute(0,2,3,1).contiguous().view(B, 32, 96)`
- [ ] timestep = 32(행), input dim = 96(열×채널)

### 가중치 초기화
- [ ] `weight_ih` → Xavier Uniform / `weight_hh` → **Orthogonal** / `bias` → 0

### TensorBoard
- [ ] **모델별 experiment_name 다르게** (한 화면 비교용)
- [ ] **마지막에 `writer.close()` 필수**

### 성능
- [ ] RNN ≈ 25%, LSTM ≈ 60%, GRU ≈ 62%
- [ ] 이유: 이미지 공간 관계 + 행 시퀀스의 장기 의존성 문제

### Image Patch (ViT 빌드업)
- [ ] 4×4 패치, input_size = 48, 시퀀스 64
- [ ] 성능 향상 거의 X (62.15%)
- [ ] **목적: ViT 패치 분할 사고를 미리 경험**

### 시험 대비 원칙
- [ ] **조교 진행 회차 (5·7·9주차 실습)** — 실제 코드 동작 위주
- [ ] **튜플 (h0, c0) 차이가 시험 1순위 출제**
