# 8. LLM Reasoning & Post-training (추론과 후속학습)

> **이 챕터 한 줄 요약**
> **Chain-of-Thought**로 추론을 단계화하고, **테스트타임 컴퓨트**를 늘리며, **검증가능한 보상 강화학습(RLVR)**으로 추론 모델(o1, DeepSeek-R1)을 만든다. 그리고 사전학습 모델을 인간 의도에 맞추는 **정렬(Alignment)**의 두 축인 **Instruction Tuning**과 **RLHF**를 다룬다.

---

## 1. 추론(Reasoning) 개요

> **러프한 정의**: 언어모델로 텍스트를 생성·분석하며 **연역·귀납·상식·논리 추론**을 수행하는 것.

| 유형 | 정의 | 예시 |
|---|---|---|
| **연역(Deductive)** | 일반 원리에서 구체적 결론 | "모든 인간은 죽는다" + "소크라테스는 인간" → "소크라테스는 죽는다" |
| **귀납(Inductive)** | 관찰에서 일반화 | "매일 동쪽에서 해가 떴다" → "내일도 동쪽에서 뜰 것" |
| **상식(Commonsense)** | 세계 지식/상식 | "공을 떨어뜨리면?" → "떨어진다" |
| **수학·논리** | 규칙·절차를 따라 정답 도출 | "사과 3개 $6이면 5개는?" → "$10" |

> **시대적 맥락**: 최신 프런티어 LLM은 곧 **추론 모델(reasoning models)**이다.

---

## 2. Chain-of-Thought (CoT) Prompting — 핵심

> **정의**: 복잡한 문제를 **단계별 추론 과정으로 분해**. 답을 바로 주지 않고 **논리적 순서로 사고 과정을 설명**하게 유도한다.

- **Standard vs. CoT**: 표준 프롬프팅은 바로 답, CoT는 중간 추론 단계를 거쳐 답
- **핵심 발견**: CoT는 **큰 모델에서 특히 효과적**(작은 모델에선 이득이 적음 → 일종의 emergent 성격)
- **Zero-shot CoT**: 예시 없이도 답 앞에 **"Let's think step by step"** 한 줄만 붙이면 추론이 트리거됨
  - 데모: strawberry의 'r' 개수 → "추론 없이" 물으면 오답, "step by step" 붙이면 정답

### Self-Consistency CoT
> **직관**: **여러 다른 사고 경로가 같은 답에 도달**하면 그 답에 대한 신뢰가 높아진다.

- **temperature 샘플링**으로 여러 추론 경로 생성 → **다수결(majority voting)**로 최종 답 선택

> **추가 기법(참고)**: Least-to-Most(쉬운 하위문제부터), Self-Improve, **Tree of Thoughts**(사고를 트리로 탐색), "Let's Verify Step by Step"(단계별 검증).

---

## 3. 추론 벤치마크 (Reasoning Benchmarks)

| 벤치마크 | 내용 |
|---|---|
| **GSM8K** | 8.5K **초등 수학** 문제(사람 작성, 고품질) |
| **MATH** | 12.5K **경시대회 수준** 수학 |
| **ARC** (AI2 Reasoning Challenge) | ~8K **자연과학·상식** 추론 문제 |
| **BBH** (BIG-Bench Hard) | 23개 난이도 높은 태스크(산술·논리·공간 등) |
| **AIME** | 고교 수학 경시(정답은 **000~999 정수**) |
| **HLE** (Humanity's Last Exam) | 100개 이상 분야의 2,500개 전문가 난제 |

---

## 4. 추론 모델의 등장과 테스트타임 스케일링

### 핵심 모델
- **OpenAI o1 (2024/09)**: 추론 모델, AIME에서 뛰어난 성능
- **DeepSeek-R1 (2025/01)**: o1의 **오픈소스 재현**. 학습 중 **더 많은 사고 시간(thinking time)을 자연스럽게 학습**
- **"Aha Moment"**: 푸는 법을 명시적으로 가르치지 않았는데 **스스로 고급 전략(초기 접근의 재평가 등)을 자율적으로 개발**

### 테스트타임 컴퓨트 스케일링 (Test-Time Scaling) — 핵심 개념
> **정의**: **추론 시점(inference)에 쓰는 컴퓨트를 늘려**(토큰을 더 생성) 더 높은 품질의 답을 얻는다.

방법들:
- **Self-consistency(다수결)**: 여러 응답 생성 후 다수결
- **Long CoT**: 더 긴 추론 사슬(더 철저히 사고) ← **o1 & DeepSeek-R1**
- **Beam/Tree Search**: 여러 추론 경로 동시 탐색, 막다른 길에서 **backtrack**, 나쁜 가지 **prune**
- **Iterative Refinement**: 초기 응답 생성 후 **반복적으로 개선**

> **패러다임 전환**: 과거엔 "학습 규모"를 키웠다면(6장 scaling law), 이제는 "**추론 시점 연산**"도 성능 레버가 된다.

---

## 5. RLVR (Reinforcement Learning with Verifiable Rewards) — 챕터 핵심

> **정의**: **검증 가능한 정답**에 보상을 주는 강화학습. o1과 DeepSeek-R1의 **주요 post-training 레시피**. 정책 모델(LLM)을 RL로 파인튜닝하고, 생성 응답이 **검증가능하게 정답일 때 보상**을 받는다.

### 왜 RLVR인가 (지도학습 대비 장점)
- **데이터 확장성(Data scalability)**: 지도학습은 사람이 **완전한 정답 응답**을 작성해야 하지만, RLVR은 **자동 검증기(verifier)가 채점**만 하면 됨
- **모방 vs. 최적화**: 지도학습은 사람의 추론 단계를 **모방**(suboptimal일 수 있음), RLVR은 **정답을 직접 최적화** → 모델이 **자기만의 효율적 추론 경로**를 발견
- **분포 불일치(Distribution mismatch)**: 지도학습은 사람이 만든 데이터라 모델 분포와 어긋날 수 있음, RLVR은 **모델 자신이 생성한 시퀀스로 학습** → 추론 분포와 일치

### RLVR 셋업 & 최적화
1. 정책 모델(LLM)로 응답 생성 → 2. 응답에 **보상 부여(binary)** → 3. **기대 보상 최대화**

- **왜 RL인가**: 지도 데이터가 없고, 보상에 이끌려 **새 생성 가능성을 탐색**하도록 장려
- **정책 경사(policy gradient)**: 기대 보상이 커지는 방향으로 정책(LLM) 파라미터 조정
  - **REINFORCE**: 가장 단순한 정책 경사법

### 정책 최적화 알고리즘 비교 — 시험 단골

| 알고리즘 | 핵심 | 특징 |
|---|---|---|
| **REINFORCE** | 가장 단순한 정책 경사 | 누적 보상 사용, 분산 큼 |
| **PPO** (Proximal Policy Optimization) | 안정성·효율 개선 | **Clipped surrogate**로 과도한 업데이트 방지 + **GAE(critic 모델)**로 advantage 분산 감소 |
| **GRPO** (Group Relative Policy Optimization) | PPO 변형, **critic 제거** | 질문마다 **출력 그룹을 샘플링**해 **상대적 보상**으로 advantage 추정 |

> **시험 포인트**: PPO는 **critic 필요 + clipping**, GRPO는 **critic 없이 그룹 내 상대 비교**로 advantage 추정(DeepSeek가 사용해 유명).

---

## 6. LLM 정렬(Alignment) 개요

### GPT 진화와 ChatGPT
- GPT-1: 디코더 사전학습 / GPT-2: 사전학습=멀티태스크 학습 / GPT-3: 스케일업 & ICL / **ChatGPT: 언어모델 정렬(alignment)**

### 정렬이란
> **정의**: 언어모델 행동을 **인간의 가치·의도에 맞추는** 것. 기준은 **"HHH"**.
> - **Helpful**: 사용자가 요청한 작업을 효율적으로 수행
> - **Honest**: 정확한 정보 제공 & 불확실성 표현
> - **Harmless**: 공격적·차별적·편향적 출력 회피

### 왜 사전학습 모델은 정렬되지 않았나
- **목적 불일치(Objective mismatch)**: 사전학습은 다음 단어 예측일 뿐, 인간 의도/가치 이해와 무관
- **학습 데이터 편향**: 인터넷 텍스트는 편향·유해·오해의 소지가 있고, LM은 좋고 나쁨을 구분 못함
- **과잉일반화**: 특정 맥락에 부적절한 출력을 낼 수 있음

### 정렬의 두 기법
**Instruction Tuning** → **RLHF** 순서로 적용한다(섹션 7~8).

---

## 7. Instruction Tuning

> **세팅/목표**: 다양한 태스크를 **지시문(instruction) 형태로** 파인튜닝 → LLM이 사용자 프롬프트를 잘 이해하고 **미지의 광범위한 태스크에 zero-shot 일반화**하게 만든다.

- **방법**: 입력=태스크 설명, 출력=기대 응답. 프롬프트가 주어지면 **응답 토큰을 생성**하도록 학습
- 결과 모델은 in-context 예시 없이도 **zero-shot**으로 여러 작업 수행. **chat 형식**이면 챗봇이 됨

### 다른 패러다임과 비교 — 핵심

| 패러다임 | 특징 |
|---|---|
| **태스크별 파인튜닝** | 여러 태스크 간 일반화 **안 됨** |
| **In-context learning** | **few-shot 예시 필요** |
| **Instruction tuning** | **zero-shot 교차 태스크 일반화** 가능 |

### Instruction Tuning vs. Pretraining

| 축 | Pretraining | Instruction Tuning |
|---|---|---|
| 공통점 | 둘 다 **멀티태스크 학습** | 둘 다 멀티태스크 학습 |
| 지도(Supervision) | **자기지도**(라벨 없음) | **지도학습**(사람 라벨 응답) |
| 태스크 형식 | **암묵적**(다음 토큰 예측) | **명시적**(자연어 지시문) |
| 목표 | 언어 패턴·일반 지식 | **지시 따르기** + 다양한 작업 수행 |

### FLAN과 일반화 발견 — 시험 포인트
- **FLAN**: 62개 데이터셋(12개 태스크 클러스터) 모음
- **클러스터가 많을수록 일반화 향상**: 일부 클러스터(Commonsense, NLI, Closed-book QA)를 held-out 했을 때, **instruction tuning에 쓴 클러스터·태스크가 많을수록 미지 클러스터로의 일반화가 좋아짐**
- **모델 크기 의존성**: instruction tuning은 **작은 모델(<8B) 일반화는 오히려 해칠 수 있고**, **큰 모델에서 일반화를 크게 향상**
- **Chat-style**: 멀티턴 대화 데이터로 튜닝하면 챗봇. 지시가 꼭 하나의 NLP 태스크에 대응하지 않고 인간 대화를 모사

---

## 8. RLHF (Reinforcement Learning from Human Feedback)

> 정렬의 두 번째 축. (자세한 보상모델 수식과 정규화는 9장 Agents에서 이어짐)

### 3단계 파이프라인
1. **인간 피드백 수집**: 같은 프롬프트로 여러 응답 생성 → 사람이 helpfulness/honesty/safety 등으로 **순위(rank)** 매김
2. **보상 모델(Reward Model) 학습**: 인간 피드백 데이터로 응답 품질을 예측. **높은 보상 = 사람이 더 선호**
3. **정책 최적화**: RL로 LM을 **보상 모델이 예측한 보상을 최대화**하도록 추가 학습 → 인간 선호에 더 부합하는 출력 유도

> **시험 포인트**: Instruction Tuning(SFT, 지도학습)으로 기본기를 만들고, RLHF로 인간 선호에 미세 정렬한다 — ChatGPT 레시피의 큰 그림.

---

## 핵심 용어 정리 (빠른 복습)

| 용어 | 한 줄 정의 |
|---|---|
| **CoT** | 단계별 추론을 유도, 큰 모델에서 효과적 |
| **Zero-shot CoT** | "Let's think step by step" 한 줄로 추론 트리거 |
| **Self-consistency** | 여러 경로 생성 후 다수결 |
| **Test-time scaling** | 추론 시점 연산을 늘려 품질 향상 (Long CoT, Tree Search 등) |
| **RLVR** | 검증가능한 정답에 보상 주는 RL (o1, R1의 레시피) |
| **PPO / GRPO** | clipping+critic / critic 없이 그룹 상대비교 |
| **HHH** | Helpful, Honest, Harmless |
| **Instruction Tuning** | 지시문으로 파인튜닝 → zero-shot 일반화 |
| **RLHF** | 인간 선호 순위 → 보상모델 → RL 정렬 |
