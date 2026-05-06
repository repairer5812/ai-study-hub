# 🚀 [딥러닝 9주차] 서브노트: RNN 실습 — RNN · LSTM · GRU 비교 + Image Patch (ViT 빌드업)

> 📌 **수업 형태**: 9주차는 **조교(TA) 진행 실습**입니다. 5·7·9주차는 모두 조교가 진행한 실습 회차로, 교수님 수업과 다른 톤·디테일을 가집니다.
> 📌 **자료**: PDF + Colab 노트북(`20260504_3주차_RNN_실습.ipynb`) — 슬라이드 노트가 적어 코드를 직접 따라가야 이해됩니다. 이 노트는 **모든 코드를 그대로 가져와서 줄별 의미를 풀어쓴** 형태입니다.

---

## 0. 실습 개요 및 핵심 목표

### 실습 주제
시계열 데이터 처리에 주로 쓰이는 **RNN 계열 모델(RNN, LSTM, GRU)** 을 활용하여 **이미지 분류(Image Classification)** 를 실습.

### 사용 데이터셋의 함정 ⚠️
- **슬라이드 표지/개요**에는 **MNIST**라고 적혀 있음.
- **실제 코드와 강의**에서는 **CIFAR-10 (32×32×3)** 사용.
- → **개요 텍스트와 실제 데이터가 다르다**는 점 자체가 출제 가능.

### 💡 조교 코멘트 핵심
> "보통 RNN은 타임 시리즈 데이터를 사용하지만, 이번 실습에서는 **이미지로 하는 것**을 보여드립니다."
- 이미지를 시퀀스 데이터처럼 다루는 방식이 핵심 (각 행을 timestep으로).

---

## 1. RNN · LSTM · GRU 이론·수식 비교 (★★★)

### ① RNN (Recurrent Neural Network)
- **개념**: 이전 타임스텝의 출력을 현재 타임스텝의 입력으로 사용하는 가장 기본적인 순환 신경망.
- **수식**:
  - 은닉 상태: $h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$
  - 출력: $y_t = W_{hy} h_t + b_y$
- **장단점**:
  - ✅ 구조가 단순하고 구현이 쉬움.
  - ❌ **장기 의존성 문제(Long-Term Dependency)** — 시간적으로 먼 과거 정보를 기억하기 힘듦.
- **💡 조교 코멘트**: "타임 시퀀스가 100이라고 할 때, 100번째까지 가면 앞의 내용이 많이 희석되고 기억하기 힘들다."

### ② LSTM (Long Short-Term Memory)
- **개념**: RNN의 장기 의존성 문제를 해결하기 위해 고안. **3개 게이트(입력·망각·출력) + 셀 상태(Cell State)** 추가.
- **수식**:
  - 입력 게이트: $i_t = \sigma(W_{xi} x_t + W_{hi} h_{t-1} + b_i)$
  - 망각 게이트: $f_t = \sigma(W_{xf} x_t + W_{hf} h_{t-1} + b_f)$
  - 출력 게이트: $o_t = \sigma(W_{xo} x_t + W_{ho} h_{t-1} + b_o)$
  - 셀 후보: $\tilde{C}_t = \tanh(W_{xC} x_t + W_{hC} h_{t-1} + b_C)$
  - 셀 상태: $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$
  - 은닉 상태: $h_t = o_t \odot \tanh(C_t)$
- **장단점**:
  - ✅ 장기 의존성 효과적 해결.
  - ❌ 구조 복잡 → 계산 비용 큼.

### ③ GRU (Gated Recurrent Unit)
- **개념**: LSTM의 복잡한 게이트 구조를 단순화. **2개 게이트(업데이트·리셋)** 만으로 비슷한 성능.
- **수식**:
  - 업데이트 게이트: $z_t = \sigma(W_{xz} x_t + W_{hz} h_{t-1} + b_z)$
  - 리셋 게이트: $r_t = \sigma(W_{xr} x_t + W_{hr} h_{t-1} + b_r)$
  - 후보 은닉: $\tilde{h}_t = \tanh(W_{xh} x_t + r_t \odot (W_{hh} h_{t-1}) + b_h)$
  - 은닉 상태: $h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t$
- **장단점**:
  - ✅ 계산 비용 적고 단순. **LSTM의 $C_t$와 $h_t$를 하나로 통합**.
  - ❌ 일부 복잡한 문제에서 LSTM보다 성능 저하 가능.
- **💡 조교 코멘트**: "게이트가 너무 많아 복잡한 것을 단순화시켜서 hidden($h$)과 cell($c$)을 한 번에 볼 수 있게 만든 것이 GRU."

### 비교 요약표

| 모델 | 게이트 수 | 상태 변수 | 계산 비용 | 장기 의존성 |
|------|----------|----------|----------|------------|
| **RNN** | 0 | $h_t$ | 가장 적음 | ❌ 약함 |
| **LSTM** | 3 (i, f, o) | $h_t$ + $C_t$ | 가장 큼 | ✅ 우수 |
| **GRU** | 2 (z, r) | $h_t$ | 중간 | ✅ 우수 (LSTM과 유사) |

---

## 2. 환경 셋업 코드 (이 부분이 출제될 일은 적지만 따라하기 위해 필요)

```python
import os, shutil
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torchvision.datasets as datasets
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter
from tqdm import tqdm
from google.colab import drive
import matplotlib.pyplot as plt
import numpy as np

drive.mount('/content/drive')
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(torch.cuda.is_available())  # True 확인

# TensorBoard 로그 디렉토리 초기화 (이전 실험 흔적 제거)
log_dir = 'runs'
if os.path.exists(log_dir):
    shutil.rmtree(log_dir)
```

### CIFAR-10 데이터 로드 + Train/Val/Test 분할
```python
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

dataset = torchvision.datasets.CIFAR10(
    root='/content/drive/MyDrive/Deep_Learning/20240520/',
    train=True, download=True, transform=transform
)

# 학습 80% / 검증 20% 분할
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
trainset, valset = torch.utils.data.random_split(dataset, [train_size, val_size])

train_loader = DataLoader(trainset, batch_size=64, shuffle=True, num_workers=4)
valid_loader = DataLoader(valset,   batch_size=64, shuffle=False, num_workers=4)

testset = torchvision.datasets.CIFAR10(root='...', train=False, download=True, transform=transform)
test_loader = DataLoader(testset, batch_size=64, shuffle=False, num_workers=4)
```

### 💡 가중치 초기화 함수 (RNN 계열에서 자주 출제)
```python
def init_weights(m):
    if isinstance(m, nn.Linear) or isinstance(m, nn.Conv2d):
        nn.init.xavier_uniform_(m.weight.data)
        if m.bias is not None:
            nn.init.constant_(m.bias.data, 0)
    elif isinstance(m, nn.LSTM) or isinstance(m, nn.RNN) or isinstance(m, nn.GRU):
        for name, param in m.named_parameters():
            if 'weight_ih' in name:
                nn.init.xavier_uniform_(param.data)   # 입력→은닉: Xavier
            elif 'weight_hh' in name:
                nn.init.orthogonal_(param.data)        # 은닉→은닉: Orthogonal
            elif 'bias' in name:
                param.data.fill_(0)
```

> 💡 **출제 포인트**: RNN 계열은 `weight_ih`(input→hidden)에는 Xavier Uniform, `weight_hh`(hidden→hidden)에는 **Orthogonal(직교 초기화)** 를 적용. 직교 초기화는 RNN의 기울기 소실/폭발 문제를 완화하는 흔한 기법.

---

## 3. 모델 클래스 정의 (★★★ 코드 비교가 시험 핵심)

### ① RNN 클래스
```python
class RNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes):
        super(RNN, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.rnn = nn.RNN(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)
        self.apply(init_weights)

    def forward(self, x):
        # 초기 hidden 상태만 0으로 설정 (cell 상태는 없음)
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)

        out, _ = self.rnn(x, h0)  # out: (batch, seq_length, hidden_size)
        out = out[:, -1, :]        # 💡 마지막 타임스텝의 출력만 추출
        out = self.fc(out)
        return out
```

### ② LSTM 클래스 — RNN과의 핵심 차이 ⭐
```python
class RNN_LSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes):
        super(RNN_LSTM, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)
        self.apply(init_weights)

    def forward(self, x):
        # 💡 LSTM만 c0(cell state)도 함께 초기화해야 함!
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)

        out, _ = self.lstm(x, (h0, c0))   # 💡 튜플 (h0, c0) 형태로 전달
        out = out[:, -1, :]
        out = self.fc(out)
        return out
```

### ③ GRU 클래스 — RNN과 거의 동일
```python
class RNN_GRU(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes):
        super(RNN_GRU, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.gru = nn.GRU(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)
        self.apply(init_weights)

    def forward(self, x):
        # GRU도 RNN처럼 h0만 초기화 (c0 없음 — LSTM과 다름)
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(device)
        out, _ = self.gru(x, h0)
        out = out[:, -1, :]
        out = self.fc(out)
        return out
```

### 💡 [출제 1순위] 초기 상태 설정의 차이

| 모델 | 초기 상태 |
|------|---------|
| **RNN** | `h0` 하나만 |
| **GRU** | `h0` 하나만 |
| **LSTM** | **`(h0, c0)` 튜플** ← 차이점 |

> 💡 **조교 팁**: "RNN 구현할 줄 알면 모듈 이름(`nn.RNN`, `nn.LSTM`, `nn.GRU`)만 바꾸면 다 쓸 수 있다. 단, **LSTM만 c0 초기값 설정이 추가**된다는 인풋 차이점만 생각하라."

### 💡 [출제 포인트] 마지막 타임스텝 추출
- `out` shape은 `(batch_size, seq_length, hidden_size)`.
- 분류(Classification)에는 **마지막 타임스텝의 출력만** 사용:
  ```python
  out = out[:, -1, :]   # 시퀀스 차원에서 인덱스 -1 선택
  ```

---

## 4. CIFAR-10 이미지를 RNN 시퀀스로 변환 (★★★)

CIFAR-10 이미지 shape: `(batch, 3, 32, 32)` — `(B, C, H, W)`.

### 행(Row) 단위 시퀀스로 변환
```python
images = images.permute(0, 2, 3, 1).contiguous().view(images.size(0), 32, -1)
# 결과: (batch, 32, 96)
# - 32 timesteps (각 행)
# - 매 step의 입력 차원: 32(가로) × 3(채널) = 96
```

### permute 의미 풀이 (말로만 설명되어 헷갈리던 부분)
- 원본: `(B, C=3, H=32, W=32)` 차원 순서.
- `permute(0, 2, 3, 1)`: `(B, H, W, C)` = `(B, 32, 32, 3)`.
- `.contiguous().view(B, 32, -1)`: H를 시퀀스로 두고, 매 step에 `(W × C)=96` 펼침.
- → **각 가로 한 줄(row)이 한 개의 timestep, 그 줄의 모든 색채널이 input feature**.

---

## 5. 하이퍼파라미터와 모델 인스턴스
```python
input_size = 32 * 3       # 96 (각 timestep 입력 차원)
hidden_size = 256          # 은닉 상태 크기
num_layers = 3             # RNN 층 수
num_classes = 10           # CIFAR-10
learning_rate = 0.001
num_epochs = 50

model_rnn  = RNN(input_size, hidden_size, num_layers, num_classes).to(device)
model_lstm = RNN_LSTM(input_size, hidden_size, num_layers, num_classes).to(device)
model_gru  = RNN_GRU(input_size, hidden_size, num_layers, num_classes).to(device)
```

---

## 6. TensorBoard 로깅 + 학습 루프 (★★)

### ⭐ 실험 이름이 핵심 — 모델별로 다르게 줘야 한 화면에서 비교됨
```python
experiment_name = 'cifar10_experiment_RNN'   # → 'cifar10_experiment_LSTM' → '_GRU'
writer = SummaryWriter(f'runs/{experiment_name}')
```

### 학습 루프 (RNN 예시 — LSTM·GRU도 거의 동일)
```python
# Early Stopping 설정
early_stop_patience = 5
best_val_loss = float('inf')
patience_counter = 0

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model_rnn.parameters(), lr=learning_rate, weight_decay=1e-5)

for epoch in range(num_epochs):
    model_rnn.train()
    running_loss = 0.0
    for i, (images, labels) in enumerate(train_loader):
        images = images.to(device)
        labels = labels.to(device)
        # 💡 이미지 → 시퀀스 변환 (행 단위)
        images = images.permute(0, 2, 3, 1).contiguous().view(images.size(0), 32, -1)

        outputs = model_rnn(images)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        if (i + 1) % 100 == 0:
            print(f'Epoch [{epoch+1}/{num_epochs}], Step [{i+1}/{len(train_loader)}], Loss: {loss.item():.4f}')
            writer.add_scalar('training loss', running_loss / 100, epoch * len(train_loader) + i)
            running_loss = 0.0

    # Validation
    model_rnn.eval()
    val_loss = 0.0
    with torch.no_grad():
        for images, labels in valid_loader:
            images = images.to(device); labels = labels.to(device)
            images = images.permute(0, 2, 3, 1).contiguous().view(images.size(0), 32, -1)
            outputs = model_rnn(images)
            val_loss += criterion(outputs, labels).item()
    val_loss /= len(valid_loader)
    writer.add_scalar('validation loss', val_loss, epoch)
    print(f'Epoch [{epoch+1}/{num_epochs}], Validation Loss: {val_loss:.4f}')

    # Early Stopping
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        patience_counter = 0
    else:
        patience_counter += 1
        if patience_counter >= early_stop_patience:
            print("Early stopping")
            break
print('Training finished.')
```

### 💡 [출제 포인트] TensorBoard 사용 단계
1. `from torch.utils.tensorboard import SummaryWriter` 임포트
2. `writer = SummaryWriter(f'runs/{experiment_name}')` 라이터 선언
3. `writer.add_scalar('training loss', loss값, step)` 으로 매 step·epoch 기록
4. **모델별로 `experiment_name` 다르게** 줘야 한 화면에서 그래프 비교 가능
5. **마지막에 `writer.close()` 반드시 호출** ← 빠뜨리면 로그 파일이 안 닫힘 (조교 강조)

```python
%load_ext tensorboard          # 로드
%tensorboard --logdir=runs     # UI 띄우기
writer.close()                 # 끝나면 반드시!
```

---

## 7. 모델별 성능 비교 (★★★ 시험 단골)

CIFAR-10 이미지를 **행(Row) 단위로 잘라서 시퀀스로** 넣었을 때 최종 Test Accuracy:

| 모델 | Test Accuracy | 비고 |
|------|--------------|------|
| **RNN** | **25.73%** | 거의 랜덤 추측 수준 |
| **LSTM** | **60.05%** | 장기 의존성 해결로 큰 점프 |
| **GRU** | **61.62%** | LSTM과 비슷 |

### 평가 코드
```python
def calculate_accuracy(testloader, model):
    correct = 0; total = 0
    model.eval()
    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device); labels = labels.to(device)
            images = images.permute(0, 2, 3, 1).contiguous().view(images.size(0), 32, -1)
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    print('Accuracy of the network on the test images: %.2f %%' % (100 * correct / total))

calculate_accuracy(test_loader, model_rnn)   # 25.73 %
calculate_accuracy(test_loader, model_lstm)  # 60.05 %
calculate_accuracy(test_loader, model_gru)   # 61.62 %
```

### 💡 [출제 ⭐] 왜 RNN은 25%, LSTM/GRU는 60%일까?

**핵심 답안**:
1. **이미지의 특성**: 왼쪽 상단 픽셀과 오른쪽 하단 픽셀 간의 **공간적 관계(상관관계)** 가 중요.
2. **RNN의 한계**: 32개의 행으로 잘라서 timestep마다 넣으면, 마지막 행을 처리할 때쯤이면 **첫 행의 정보를 거의 다 잊음** (장기 의존성 문제).
3. **LSTM/GRU의 우위**: 게이트 구조가 **첫 행~마지막 행까지의 의존성을 보존**해 약 60% 분류 가능.

> 💡 **조교 코멘트**: "RNN은 이전에 있던 거는 사실 기억을 잘 못할 테니까 롱텀(Long-term)이 되겠죠. 이미지 하나를 보기 위해서는. 그래서 RNN이 학습이 안 된 겁니다."

> 📝 **추가 결론**: 애초에 RNN 계열은 Image Classification에 좋은 방법이 아님. 그럼에도 실습한 이유 → **다음 실습(Vision Transformer) 빌드업**.

---

## 8. Image Patch 기법 — Vision Transformer 빌드업 (★★★)

### 등장 동기
단순히 이미지를 **행 단위**(`32 × 96`)로 잘라 넣는 방식의 한계 → 이미지를 **패치(Patch) 단위**로 쪼개어 시퀀스로 만드는 방식 추가 실습.

### 패치 분할 방식
- 이미지를 **4×4 크기 패치**로 나눔.
- 각 패치 차원: `4(W) × 4(H) × 3(Channel) = 48`.
- `unfold` 함수로 텐서 차원을 조작.

### 💡 패치 생성 함수 (가장 헷갈리던 코드)
```python
def create_patches(images, patch_size):
    batch_size, channels, height, width = images.size()  # (B, 3, 32, 32)

    # 1) H·W 축에서 patch_size 만큼 sliding window로 추출
    patches = images.unfold(2, patch_size, patch_size).unfold(3, patch_size, patch_size)
    #     shape: (B, C, num_patches_h, num_patches_w, patch_size, patch_size)
    #     예: (B, 3, 8, 8, 4, 4)

    # 2) num_patches_h * num_patches_w 를 평탄화
    patches = patches.contiguous().view(batch_size, channels, -1, patch_size, patch_size)
    #     shape: (B, C, 64, 4, 4)

    # 3) 채널을 패치 안쪽으로 옮김
    patches = patches.permute(0, 2, 1, 3, 4).contiguous()
    #     shape: (B, 64, C, 4, 4)

    # 4) 패치 내부 (C, 4, 4) → 1차원 벡터(48)로 펼침
    patches = patches.view(batch_size, -1, channels * patch_size * patch_size)
    #     shape: (B, 64, 48)  ← (배치, 시퀀스 길이=64, feature=48)
    return patches
```

### 패치 GRU 학습
```python
patch_size = 4
input_size = patch_size * patch_size * 3  # 48

model_patch_gru = RNN_GRU(input_size, hidden_size, num_layers, num_classes).to(device)
experiment_name = 'cifar10_experiment_GRU_patch'
writer = SummaryWriter(f'runs/{experiment_name}')

# 학습 루프 안에서 변환을 patch로 교체:
patches = create_patches(images, patch_size)
outputs = model_patch_gru(patches)
# 그 외는 동일
```

### 성능 결과
- 패치 GRU: **62.15%**
- 행 단위 GRU: **61.62%**
- → **현실상 거의 동일**.

### 💡 [출제 핵심] 성능 향상도 없는데 왜 패치로?
> 🎯 **조교 답**: "사실 여기서 패치로 나눈다고 해서 크게 잘 되진 않죠. 하지만 다음에 실습하게 될 **비전 트랜스포머(Vision Transformer, ViT)** 모델에서 이미지가 **패치로 들어가게 됩니다**. 그런 거에 기반한 어떠한 **공간감이 있는 정보를 주기 위한 생각**들이라고 할 수 있습니다."

→ **ViT의 작동 방식(이미지를 패치로 분할하여 시퀀스로 취급)을 미리 경험하기 위한 빌드업**.

---

## 9. 코드 디테일 — 놓치기 쉬운 포인트

### 1) Early Stopping
```python
early_stop_patience = 5
if val_loss < best_val_loss:
    best_val_loss = val_loss
    patience_counter = 0
else:
    patience_counter += 1
    if patience_counter >= early_stop_patience:
        print("Early stopping")
        break
```
- Validation Loss가 5 epoch 연속 개선되지 않으면 학습 조기 종료.
- 실제 실행 결과: RNN은 13epoch에서, LSTM·GRU는 11epoch 부근에서 조기 종료됨.

### 2) Optimizer 설정
```python
optimizer = torch.optim.Adam(model_rnn.parameters(), lr=learning_rate, weight_decay=1e-5)
```
- `weight_decay=1e-5`: L2 정규화. 과적합 완화.

### 3) `.permute().contiguous().view()` 순서
- `view()`는 메모리 연속(contiguous) 텐서만 받음.
- `permute()` 후에는 메모리가 재정렬되지 않으므로 **반드시 `.contiguous()` 호출 후 `.view()`**.

---

## 10. 주요 슬라이드 (PDF 원본 페이지 렌더)

수업 슬라이드 내용이 적어 코드와 그래프 위주의 자료입니다. 실습 흐름과 텐서보드 결과를 시각으로 빠르게 훑을 수 있도록 18페이지를 모두 포함했습니다.

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

## 11. 조교 기타 코멘트 & 공지

- **시험 일정**: "다음 주가 중간고사입니다. 잘 준비하시길 바랍니다."
- **수업 단축**: "오늘은 다음 주가 시험이니까 일찍 끝내겠습니다."
- **팀 프로젝트**: "혹시 팀원과 연락이 안 돼서 문제가 생기신 분이 있다면 남아서 말씀해 주세요."

---

## 🎯 9주차 최종 암기 체크리스트

### 모델 비교 (출제 1순위)
- [ ] RNN: $h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$ — 단순, 장기 의존성 X
- [ ] LSTM: 3 게이트(i·f·o) + Cell State $C_t$ — 장기 의존성 ✅, 비용 ↑
- [ ] GRU: 2 게이트(z·r) — LSTM의 단순화, $C_t$와 $h_t$ 통합

### 코드 차이 (★★★)
- [ ] **LSTM만 `c0` 추가 초기화 + 튜플 `(h0, c0)` 전달**
- [ ] RNN·GRU는 `h0` 하나만
- [ ] 모듈 이름만 바꾸면 거의 동일

### 데이터 변환
- [ ] CIFAR-10: `(B, 3, 32, 32)` → `permute(0,2,3,1).contiguous().view(B, 32, 96)`
- [ ] timestep = 32(행), input dim = 96(열×채널)
- [ ] **마지막 timestep만 추출**: `out[:, -1, :]`

### 가중치 초기화
- [ ] `weight_ih` → Xavier Uniform
- [ ] `weight_hh` → **Orthogonal** (RNN gradient 안정화)
- [ ] `bias` → 0

### TensorBoard
- [ ] `SummaryWriter(f'runs/{experiment_name}')`
- [ ] **모델별 experiment_name 다르게** (한 화면 비교용)
- [ ] **마지막에 `writer.close()` 필수**

### 성능 결과
- [ ] RNN ≈ 25%, LSTM ≈ 60%, GRU ≈ 62%
- [ ] **이유**: 이미지 공간 관계 + 행 시퀀스로 자르면 RNN은 장기 의존성 문제

### Image Patch (ViT 빌드업)
- [ ] 4×4 패치, input_size = 48
- [ ] `unfold(2,...).unfold(3,...)` + permute + view
- [ ] 성능 향상 거의 X (62.15%)
- [ ] **목적: ViT 패치 분할 사고를 미리 경험**

### 시험 대비 원칙
- [ ] **조교 진행 회차 (5·7·9주차 실습)** — 실제 코드 동작 위주
- [ ] 수식보다 **각 모델 forward pass의 입출력 흐름** 이해
- [ ] **튜플 (h0, c0) 차이가 시험 1순위 출제**
