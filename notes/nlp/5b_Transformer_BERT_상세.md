# 5.5 (보충) Self-Attention 직관 & BERT 상세

> **이 보충 노트의 목적**
> 5장 Transformer를 **직관 위주로** 다시 본다. 핵심: ① self-attention이 "문맥을 반영한 표현"을 만드는 원리("bank" 예시), ② **층을 쌓을수록 문맥이 전파·증폭**되는 이유, ③ **BERT의 입력→층 쌓기→최적화(MLM + NSP)** 전 과정.

---

## 1. Self-Attention의 큰 그림

> **핵심 질문**: 각 단어를 표현할 때 **문맥을 어떻게 반영**할까?
> **직관**: 주변 문맥의 일부 단어가 타깃 단어의 의미 해석을 돕는다. 그 문맥 단어들에 **'주목(attention)'**해야 한다. **'self'**인 이유 = 각 단어가 **같은 문장 내** 다른 단어에 주목하기 때문.

### "bank" 중의성 예시 — 핵심
- "We had a picnic on the grassy river **bank**." → 강둑 (river side)
- "I went to the **bank** and withdrew some cash." → 금융기관

같은 단어 "bank"라도 **문맥에 따라 다른 벡터**가 되어야 한다(정적 임베딩은 동일). Self-attention은 **타깃 단어 표현을 문맥 표현들의 가중합**으로 만들어 이를 해결:
$$\mathbf{a}_i = \sum_{j} \alpha_{ij}\,\mathbf{x}_j,\quad \alpha_{ij} = \text{Softmax}(\mathbf{x}_i \cdot \mathbf{x}_j) = \frac{\exp(\mathbf{x}_i\cdot\mathbf{x}_j)}{\sum_k \exp(\mathbf{x}_i\cdot\mathbf{x}_k)}$$
- 직관적으로, 문맥 임베딩은 문장 내 **'유사한' 단어들의 정보를 더 많이** 담게 된다.
- **한 가지 디테일**: 같은 임베딩 x로 어텐션을 계산하면 자기 자신과의 내적이 커서 **거의 항상 자기 자신에 과하게 주목** → 그래서 QKV로 역할을 분리한다.

### QKV — Word2Vec의 두 임베딩 철학과 동일
> Word2Vec이 중심/문맥 두 임베딩을 쓴 것과 **같은 철학**으로, self-attention은 단어를 **세 벡터**로 표현한다.

- **Query**: 정보를 찾는 타깃 단어
- **Key**: 쿼리와 비교되는 문맥
- **Value**: 각 단어의 실제 정보(어텐션 가중치로 결합되는 내용)

전체 계산: ① $\mathbf{q}=\mathbf{x}W_Q,\ \mathbf{k}=\mathbf{x}W_K,\ \mathbf{v}=\mathbf{x}W_V$ → ② $\alpha_{ij}=\text{Softmax}(\mathbf{q}_i\cdot\mathbf{k}_j)$ → ③ $\mathbf{a}_i = \sum_j \alpha_{ij}\mathbf{v}_j$ (= **문맥화된 표현**)

---

## 2. Self-Attention 층 쌓기 (Stacking) — 핵심 직관

> **한 층의 한계**: 단일 self-attention 층은 문맥을 **얕은 수준**으로만 포착. 유사도가 **정적 임베딩의 내적**으로 결정되므로, 정적 임베딩이 못 잡은 관계는 충분히 반영 안 됨.

### 문맥 전파(propagation) 예시
- "picnic"과 "bank"는 정적 임베딩상 별로 안 비슷 → 한 층으론 가까워지지 않음
- 그러나 **"picnic"↔"river"가 가깝고 "river"↔"bank"가 가깝다면**, 층을 쌓을수록 이 문맥 관계가 **전파**된다
- → **여러 층을 쌓으면**: 의미적으로 관련된 단어 임베딩이 점점 가까워지고 무관한 건 멀어짐. **문맥 정보가 점진적으로 증폭**된다

> **요약**: Self-attention의 핵심은 시퀀스의 관련 부분을 더 반영하는 것. **층 적층 → 문맥 정보가 더 잘 반영**.

### 그 외 모듈(초점 아님)
- 변환 추가: **FFN**(층·활성화 추가), **멀티헤드 어텐션**
- 최적화 용이화: **잔차 연결**, **Layer Normalization**
- 위치 정보: **Positional Encoding**

> **다음 질문**: 이 많은 파라미터 $\theta = \{X, \{W_Q, W_K, W_V\}_l, \ldots\}$를 어떻게 최적화해 문맥 표현을 만들까? → **gradient descent** (아래 BERT)

---

## 3. BERT 상세

> **BERT** (Bidirectional Encoder Representations from Transformers): 언어 이해용으로 가중치가 최적화된 **사전학습 Transformer**.
> 두 모델 공개: **BERT-base**(12층, 1.1억 파라미터), **BERT-large**(24층, 3.4억).

### 3.1 입력 (Input)
1. "Thanks for all the" 같은 문장을 **토큰 → 어휘 인덱스**로 변환 (예: [5, 3000, 10532, 2224]). 이 과정이 **tokenization**(토크나이저마다 결과 다름)
2. 각 인덱스를 **임베딩 테이블에서 벡터로** 매핑 (= one-hot 벡터 × 임베딩 행렬로 해당 행 선택)
3. 문장 전체가 **정적 임베딩 벡터**로 변환되어 모델 입력. (Word2Vec 임베딩을 쓸 수도 있지만 BERT는 **처음부터 학습**)

### 3.2 층 쌓기
- 여러 Transformer 층(각각 self-attention + 변환)을 쌓아 모든 단어에 **풍부한 문맥 정보** 포착
- **마지막 층 출력 = 문맥 임베딩**(주변 문맥에 기반한 의미 포착)

### 3.3 최적화 = MLM + NSP — 시험 핵심
> 원리상 최적화 문제를 정의하면 gradient descent로 풀 수 있다. **"문맥을 가장 잘 잡는 최적화 문제를 어떻게 정의하나?"** → BERT는 두 목적함수로 학습.

#### ① Masked Language Modeling (MLM)
- 토큰의 **15%를 랜덤하게 [MASK]**로 가리고, **주변 문맥으로 원래 단어 예측**
  - "He had a picnic on the river [MASK]" → river/bank/beach/money 중 예측
- **확률 계산**: 마스크 위치의 문맥 임베딩 $\mathbf{h}$에 linear layer + softmax
  - $\mathbf{u} = \mathbf{h}\mathbf{W},\ \mathbf{y} = \text{softmax}(\mathbf{u})$
  - **핵심 통찰**: 각 logit은 **문맥 임베딩 $\mathbf{h}$와 어휘의 각 단어(W의 각 열)의 내적**
  - 실무에선 이 linear layer를 **입력 임베딩 E로 weight-tying** → 모델 크기 축소·중복 회피
- 손실: $L_{\text{MLM}} = -\sum_{i\in M} \log P(x_i \mid \mathbf{h}_i)$ (M = 마스킹된 위치 집합)

#### ② Next Sentence Prediction (NSP)
- 두 문장을 **[SEP]**로 구분해 함께 입력, 맨 앞에 **[CLS]** 토큰 추가(전체 입력 정보를 요약)
- **두 번째 문장이 첫 문장 뒤에 실제로 이어지는지** 이진 분류
  - "He had a picnic on the river bank" → "Many people were sitting on the grass" (Yes) vs "Stock market closed higher on Monday" (No, 랜덤 문장)
- **[CLS] 토큰 표현**으로 예측: $\mathbf{y} = \text{softmax}(\mathbf{h}_{\text{[CLS]}} W_{\text{NSP}})$, $L_{\text{NSP}} = -\log P(y \mid \mathbf{h}_{\text{[CLS]}})$
- **왜 도움?** 토큰 수준을 넘어 **문장 간 일관성(coherence)**을 학습. (후속 연구들은 NSP가 필수는 아니라 주장했으나, 설계가 많은 후속 연구에 영감)

#### 종합
- **BERT 최적화 = MLM + NSP 동시 적용**, gradient descent로 학습:
  ```
  θ 랜덤 초기화
  수렴까지 반복: θ ← θ − η ∇_θ L(θ)    (L = L_MLM + L_NSP)
  ```

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **문맥화 표현** | self-attention이 만든, 문맥 반영 단어 벡터 |
| **층 적층 효과** | 문맥 관계가 층 따라 전파·증폭 |
| **BERT-base/large** | 12층 110M / 24층 340M |
| **[MASK] / [CLS] / [SEP]** | 마스킹 / 전체 요약 / 문장 구분 토큰 |
| **MLM** | 15% 마스킹 후 원단어 예측(양방향) |
| **NSP** | [CLS]로 두 문장 연속 여부 이진 분류 |
| **Weight-tying** | MLM head를 입력 임베딩과 공유 |
