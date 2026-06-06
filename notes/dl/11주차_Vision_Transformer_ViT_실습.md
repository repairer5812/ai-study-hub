# 딥러닝 11주차

# Vision Transformer (ViT) 구현 (조교 실습)

10주차 Attention/Transformer를 이미지에 적용한 **Vision Transformer(ViT)** 를 PyTorch로 직접 구현하는 실습 주차입니다. "텍스트가 아닌 이미지를 어떻게 Transformer에 넣는가"의 **전체 흐름**과 **차원 계산**, 그리고 **Inductive Bias** 가 핵심 출제 포인트입니다.

> 💡 **교수님 출제 경향 (전사 기반)**: ① ViT 전체 흐름(패치→임베딩→[CLS]+PE→Encoder→Head) ② **패치 차원 계산**(서술/계산형) ③ **CLS 토큰 vs 평균(mean) Head** 비교 ④ Positional Embedding 결합 방식(**Add**, 크기 **N+1**) ⑤ **Inductive Bias와 ViT 한계(출제 확률 100%)** ⑥ Transfer Learning/Linear Probing(timm). 참고 논문: An Image is Worth 16x16 Words.

---

## 1. 🧭 ViT 개요 및 전체 흐름 (★★★)

> ViT는 자연어에서 쓰던 일반적인 Transformer(Attention is All You Need)를 **이미지 인식에 그대로** 적용한 모델.

**아키텍처 흐름**:
1. **이미지 분할**: 입력을 16×16 패치로 쪼갬.
2. **Patch Embedding**: 각 패치 Flatten → Linear Projection으로 토큰화.
3. **[CLS] 토큰 추가**: 시퀀스 맨 앞에 분류용 토큰.
4. **Positional Encoding 추가**: 패치 위치 정보를 더함.
5. **Transformer Encoder**: 토큰들이 인코더(L번 반복) 통과.
6. **Classification Head**: ([CLS] 출력) → MLP → 최종 예측.

---

## 2. 🧰 데이터 & einops

- **einops**(교수님 강조): `reshape`/`view` 대신 `einops.rearrange`로 텐서 차원 변환을 직관적으로. `from einops import rearrange, reduce, repeat`, `from einops.layers.torch import Rearrange, Reduce`.
- 데이터셋: **CIFAR10**, Train(80%)/Validation(20%)/Test 분할.

---

## 3. 🧩 Patch Embedding (★★★ 차원 계산)

### 💡 3.1. 차원 변환 (계산 문제 대비)
- 원본 이미지: 채널 $C$(RGB=3), 너비 $W$, 높이 $H$.
- 패치 사이즈 $P$(예: 16)로 분할. **패치 개수**:
$$N = \frac{H \times W}{P^2}$$
  - 예: 128×128 → $128\cdot128/16^2 = 64$개. CIFAR10 32×32 → $32\cdot32/16^2 = 4$개.
- **Flatten**: 각 패치는 $P\times P\times C$ → 1D로 펴면 길이 $P^2\times C$ (예: $16\cdot16\cdot3 = 768$).
- 최종 텐서: $N \times (P^2 C)$ (예: 64×768, CIFAR10이면 4×768).

### 3.2. Linear Projection
- Flatten된 패치($P^2C$)에 학습 가능 가중치를 곱해 Transformer가 일관되게 쓰는 잠재 차원 $D$(emb_size)로 매핑. 각 토큰이 $D$차원으로 보정됨.

### 💡 3.3. 교수님 꿀팁: Conv2d 패치 임베딩
- 논문은 Linear지만 **성능 향상**을 위해 **Conv2d**도 가능. 아직 패치로 쪼개기 전이라 **지역 특성(local feature)** 을 잘 뽑는 컨볼루션이 유리.
- `nn.Conv2d(in_channels, emb_size, kernel_size=patch_size, stride=patch_size)` → **패치 자르기 + 임베딩 매핑을 한 번에**. (코드: Conv2d → `Rearrange('b e (h) (w) -> b h w e')`)

---

## 4. 🏷️ CLS Token

- 패치 임베딩 후 시퀀스 **맨 앞(0번 인덱스)** 에 추가하는 **학습 가능 파라미터**(`nn.Parameter(torch.randn(1,1,emb_size))`).
- forward에서 배치 $b$만큼 `repeat` 후 `torch.cat`으로 패치 앞에 결합 → 토큰 수 $N \to N+1$.
- **역할**: 학습이 진행되며 분류에 필요한 가장 지배적인 피처가 이 토큰 하나에 모임. 최종 Head는 **이 [CLS] 토큰(0번)만** 뽑아 MLP에 넣음.
- 💬 (전사) [CLS]만 쓰는 게 절대적인 건 아님. 각 토큰 출력의 **평균(mean)** 을 쓰는 방법도 있음(7장 Head 비교).

---

## 5. 📍 Positional Embedding (★★★ 함정 주의)

- 도입 이유: Transformer는 입력 **순서/위치를 모름** → 패치가 원래 어디 있었는지 공간 정보 전달 필요.
- ViT는 위치 정보도 **모델이 직접 학습**(Learnable Parameter).
- **크기**: $(N\_\text{PATCHES} + 1,\ \text{EMBED\_SIZE})$. **+1 이유**: 앞서 추가한 **[CLS] 토큰의 위치 정보**도 필요하기 때문.
- 💡 **결합 방식**: [CLS]는 `Concat`이었지만, **Positional Embedding은 더하기(Add)** (`x += self.positions`). 💬 (전사) "같은 위치에 같은 값을 더해주면서 위치 정보를 기억. 그래서 Concat이 아니라 각 위치에 값을 더해주는 것."

---

## 6. 🏛️ Transformer Encoder 상세

> ViT는 원래 Transformer의 **Encoder만** 사용. 인코더 블록을 $L$(depth, 예 12)번 반복.

### 💡 6.1. Multi-Head Attention
- 입력 $x$를 각각 Linear에 통과시켜 **Q, K, V** 생성. 차원(emb_size)을 `num_heads`(예 8)로 분할(`rearrange("b n (h d) -> b h n d")`).
- **Attention Score(energy)**: Q와 K를 내적(`torch.einsum('bhqd, bhkd -> bhqk')`).
- **Scaling**: `scaling = (emb_size // num_heads) ** -0.5`로 곱함. 💬 (전사) "값이 곱해져 퍼지므로(커지므로) 차원에 따라 나눠 조절."
- **Softmax** → Attention Map → **V 가중합**(`einsum('bhal, bhlv -> bhav')`) → `rearrange("b h n d -> b n (h d)")` → 최종 Linear(Projection).
- 💬 (전사) **Masking은 ViT에서 기본적으로 사용 X** (필요하면 적용 가능).

### 6.2. Residual Connection (ResidualAdd)
- `out = fn(x) + x` — 레이어 통과 결과에 원래 입력을 더함. 기울기 소실(Vanishing Gradient) 완화로 깊은 망 학습 안정화.

### 6.3. MLP (Feed Forward Block)
- 구조: **Linear1 → GELU → Dropout → Linear2**. 첫 Linear에서 `expansion`배(보통 4배) 확장 후, 둘째 Linear에서 원래 차원으로 축소.

### 6.4. Encoder Block 조립
- `TransformerEncoderBlock` = **Residual(LayerNorm → MultiHeadAttention → Dropout)** + **Residual(LayerNorm → FeedForwardBlock → Dropout)**.
- `TransformerEncoder` = 이 블록을 `depth`(=12)개 `ModuleList`로 반복.

---

## 7. 🎯 Classification Head — 2가지 방식 (★★★ 비교)

| 구분 | Head 1 (평균) | Head 2 (CLS 토큰) |
|------|---------------|-------------------|
| 작동 | 모든 토큰 출력의 **평균(mean)** (`Reduce('b n e -> b e', 'mean')`) | **0번 [CLS] 토큰만** 추출 (`x[:, 0]`) |
| 특징 | 전반적 이미지 **배경·전체 맥락(Context)** 반영 | 분류에 가장 핵심적인 **지배적 특징(discriminative)** 집중 |
| 구조 | Reduce(Mean) → LayerNorm → Linear | CLS 추출 → LayerNorm → Linear |

- 💬 (전사) "CLS는 특징들만 보이는 방향성, 입력 평균은 전반적 배경을 가져감." **원래 ViT 논문 기본은 Head 2(CLS)**.

---

## 8. 🔧 ViT 조립 & 규모

- 데이터 흐름: Image → **PatchEmbedding**(패치 분할 + Linear/Conv 임베딩 + [CLS] + Positional) → **TransformerEncoder**(블록 L번) → **ClassificationHead** → Logits.
- 규모: Base 기준 **약 85,654,282(≈85M) 파라미터**. (매우 무거움)

---

## 9. 🌟 Inductive Bias와 ViT의 한계 (★★★ 출제 확률 100%)

### 9.1. Inductive Bias란
- 모델이 처음 보는 데이터를 예측할 때 쓰는 **추가적인 가정**.

### 9.2. CNN의 Inductive Bias
- **Locality(지역성)**: 가까운 픽셀끼리 연관성이 높다는 가정(Convolution 필터).
- **Translation Equivariance(이동 등변성)**: 객체가 구석에 있든 가운데 있든 같은 피처로 뽑힌다는 가정.

### 💡 9.3. ViT의 한계와 해결책
- ViT는 전체 패치를 한 번에 보는 Attention 구조라 **Inductive Bias가 부족(없음)**.
- 따라서 **CIFAR-10처럼 적은 데이터로 바닥부터(from scratch)** 학습하면 ResNet 같은 CNN보다 성능이 **훨씬 낮음**(오버피팅). 실습에서도 스켈레톤 학습은 분류 성능이 낮음(validation loss ~1.3대).
- **해결**: ImageNet·JFT-300M 같은 **방대한 데이터로 사전학습** → 데이터 양으로 Inductive Bias 부재를 극복.

---

## 10. 🔁 Transfer Learning & Linear Probing (timm)

- **개념**: 방대한 데이터로 이미 학습된(Pre-trained) ViT 가중치를 가져와 타겟 데이터(CIFAR-10)에 살짝만 추가 학습.
- **timm**: `timm.create_model('vit_base_patch16_224', pretrained=True)`. 입력은 ViT에 맞게 **Resize 224**, ImageNet 정규화(mean/std).
- **Linear Probing 로직**:
  1. 마지막 분류 헤드를 우리 클래스 수(10)에 맞게 교체: `model.head = nn.Linear(in_features, num_classes)`.
  2. **Backbone 동결(Freeze)**: 헤드 외 전체 `param.requires_grad = False`.
  3. **Head만 학습**: 교체한 헤드만 `requires_grad = True`로 파인튜닝.
- **결과**: 바닥부터 학습보다 훨씬 빠르고, 정확도 **약 93%** 로 압도적. (Inductive Bias 부재를 사전학습으로 해결)

---

## 11. 🗣️ 교수님 코멘트 모음 (전사)

- einops로 차원 변환을 직관적으로.
- Conv2d로 패치 임베딩하면 지역 특성이 잘 잡혀 성능 ↑.
- Positional Embedding은 **Concat이 아니라 Add**, 크기는 **N+1**([CLS] 포함).
- Attention scaling은 값이 퍼지는 걸 차원으로 나눠 조절.
- Masking은 ViT 기본 미사용.
- Head는 CLS(지배적 특징) vs 평균(전반적 배경) 두 방식.
- 스켈레톤 from-scratch는 **Inductive Bias 부재**로 성능 낮음 → 사전학습 ViT 미세조정으로 93%.

---

## 12. 🎯 11주차 최종 암기 체크리스트

### 전체 흐름
- [ ] 패치 분할 → Flatten/Linear(또는 Conv2d) 임베딩 → **[CLS]+Positional** → Encoder(L번) → Head ★★★

### Patch Embedding
- [ ] 패치 수 $N = HW/P^2$ (128² → 64, 32² → 4) ★★★
- [ ] Flatten 길이 $P^2 C$ (16·16·3=768), 텐서 $N\times(P^2C)$
- [ ] Linear Projection으로 $D$(emb_size) 매핑
- [ ] Conv2d(kernel=stride=patch) = 자르기+임베딩 한 번에

### CLS & Positional
- [ ] [CLS] = 학습 파라미터, 맨 앞 Concat, 분류용(0번)
- [ ] Positional Embedding 크기 **N+1**(CLS 포함), 결합은 **Add** ★★★
- [ ] Head: **CLS(x[:,0], 지배적 특징)** vs **평균(mean, 전반적 배경)** ★★★

### Encoder
- [ ] MHA: Q·K·V, scaling=(d/h)^(-0.5), softmax, V 가중합, Masking 미사용
- [ ] Residual `fn(x)+x`(기울기 소실 완화), MLP `Linear→GELU→Dropout→Linear`(4배 확장)
- [ ] Block = Residual(LN→MHA) + Residual(LN→FFN), depth L(12)

### Inductive Bias (출제 100%)
- [ ] CNN: **Locality + Translation Equivariance** ★★★
- [ ] ViT: Inductive Bias 부재 → 소규모(CIFAR10 from-scratch)면 CNN보다 저조 ★★★
- [ ] 해결: 방대한 데이터(ImageNet/JFT-300M) **사전학습**

### Transfer Learning
- [ ] timm `vit_base_patch16_224` pretrained, Resize 224
- [ ] **Linear Probing**: head 교체 + backbone freeze + head만 학습 → **93%** ★★★
- [ ] ViT ≈ 85M 파라미터
