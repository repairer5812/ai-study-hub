// subjects/nlp.js — 자연어 처리 (고려대 NLP 강좌 정리 + 기말 모의고사)
//
// 고려대 자연어 처리 강좌(SeongKu Kang) 전체 9개 챕터 + 보충 2개 정리.
// 1~5장(기초~Transformer) + 6~9장(LLM~Agents), 보충 강의(Word2Vec/Transformer 상세).
//
// 기말고사 모의고사: 6~9장(LLM·RAG·Reasoning&Post-training·Agents) 서술형 8세트.
// 딥러닝(dl.js) 서술형 모의고사와 동일한 형식 — 문제당 1세트, LLM 채점.
//
// 서술형 스키마
// { id, set, week, topic, type:"essay", difficulty,
//   question, keywords[], modelAnswer, rubric, source }

export const SETS_META = [
  { id: 1, title: "SET 1", label: "PEFT · LoRA",            desc: "전체 파인튜닝 비용·low-rank·BA 분해·prompt tuning" },
  { id: 2, title: "SET 2", label: "디코딩 · ICL · Scaling", desc: "Greedy/Top-k/Top-p/Temperature·In-Context·창발성" },
  { id: 3, title: "SET 3", label: "지식 · 환각 · RAG",       desc: "Parametric vs Non-parametric·Hallucination·RAG 완화" },
  { id: 4, title: "SET 4", label: "검색 · RAG 모델",         desc: "Sparse/Dense·Bi/Cross-encoder·평가·Seq/Token" },
  { id: 5, title: "SET 5", label: "CoT · Test-time Scaling", desc: "CoT·Self-consistency·Long CoT·Tree Search" },
  { id: 6, title: "SET 6", label: "RLVR · PPO/GRPO",         desc: "검증가능보상·지도학습 대비·정책경사·GRPO" },
  { id: 7, title: "SET 7", label: "Alignment · RLHF",        desc: "Instruction Tuning vs RLHF·HHH·보상모델·KL" },
  { id: 8, title: "SET 8", label: "Agents · 멀티모달 · 도구", desc: "LLaVA·Toolformer·InCoder·SWE-Bench" },
];

// ═══════════════════════════════════════════════════════════════
// SET 1 — PEFT & LoRA (6장)
// ═══════════════════════════════════════════════════════════════
export const set1 = [
  {
    id: "NLP_S1Q1", set: 1, week: 6, topic: "PEFT & LoRA", type: "essay", difficulty: "medium",
    question:
      "대규모 언어모델의 파라미터 효율적 파인튜닝(PEFT)에 대해 답하시오.\n" +
      "(1) 전체 파라미터 파인튜닝이 비싼 이유와, 가중치 업데이트를 $W^* = W_0 + \\Delta W$로 표현했을 때 PEFT의 기본 질문을 서술하시오.\n" +
      "(2) LoRA가 가정하는 두 가지 근거(overparameterization·경험적 관찰)를 설명하고, 저차원 분해 $\\Delta W \\approx BA$가 어떻게 파라미터를 줄이는지 차원으로 설명하시오.\n" +
      "(3) LoRA와 Prompt Tuning이 공유하는 PEFT 공통 아이디어를 한 문장으로 정리하시오.",
    keywords: [
      "전체 파인튜닝 비용",
      "W* = W0 + ΔW",
      "overparameterization",
      "low-rank",
      "ΔW ≈ BA",
      "B∈R^{d×r}, A∈R^{r×d}, r≪d",
      "사전학습 가중치 freeze",
      "soft prompts",
      "소수 파라미터만 학습",
    ],
    modelAnswer:
      "(1) LLM은 수십억~수천억 파라미터를 가지므로 모든 파라미터를 업데이트하면 막대한 연산·메모리·저장 비용이 든다. 파인튜닝된 가중치는 W* = W0 + ΔW로 표현되는데, ΔW도 W0와 같은 d×d 크기다. PEFT의 기본 질문은 '전체가 아니라 소수의 파라미터만 업데이트해 비슷한 성능을 낼 수 없는가?'이다.\n" +
      "(2) LoRA는 파라미터 업데이트가 low-rank라고 가정한다. 근거는 ① Overparameterization: LLM은 데이터를 맞추는 데 필요한 것보다 훨씬 많은 파라미터를 가진다. ② 경험적 관찰: 실제 신경망의 파라미터 업데이트는 low-rank 경향을 보인다. 그래서 ΔW ≈ BA로 저차원 분해한다. 여기서 B∈R^{d×r}, A∈R^{r×d}, r≪d이다. 원래 ΔW는 d×d = d² 개 파라미터지만, BA는 d×r + r×d = 2dr 개로, r이 d보다 훨씬 작으므로 학습 파라미터 수가 크게 줄어든다. 사전학습 가중치 W0는 freeze하고 작은 A, B만 학습한다.\n" +
      "(3) PEFT의 공통 아이디어: '대형 사전학습 모델은 freeze한 채, 소수의 추가 파라미터(LoRA의 A·B, Prompt Tuning의 soft prompt 임베딩)만 학습한다.'",
    rubric: "(1) 비용+기본질문 30점. (2) 두 근거 + BA 분해 차원 설명 50점(r≪d 명시 필수). (3) PEFT 공통 아이디어 20점.",
    source: "6장 LLMs § PEFT·LoRA",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 2 — 디코딩 전략 · In-Context Learning · Scaling (6장)
// ═══════════════════════════════════════════════════════════════
export const set2 = [
  {
    id: "NLP_S2Q1", set: 2, week: 6, topic: "디코딩·ICL·Scaling", type: "essay", difficulty: "hard",
    question:
      "LLM의 텍스트 생성과 규모에 대해 답하시오.\n" +
      "(1) Greedy, Top-k, Top-p(Nucleus), Temperature 디코딩을 각각 한 줄로 설명하시오.\n" +
      "(2) Top-p가 Top-k보다 일반적으로 나은 이유를, 'Joe' 뒤(거의 확정적) vs 'spacecraft' 뒤(다양) 분포 예시로 설명하시오.\n" +
      "(3) In-Context Learning(ICL)의 정의와 '파라미터 업데이트가 없다'는 핵심을 서술하고, Emergent Ability(창발적 능력)가 Scaling과 어떤 관계인지 설명하시오.",
    keywords: [
      "Greedy 최고확률",
      "Top-k 상위 k개",
      "Top-p 누적확률 p",
      "Temperature τ",
      "분포 모양 적응",
      "확률 질량 기준",
      "few-shot 예시",
      "파라미터 업데이트 없음",
      "임계치(threshold)",
      "작은 모델로 예측 불가",
      "Scaling Laws",
    ],
    modelAnswer:
      "(1) • Greedy: 매 스텝 최고 확률 토큰 선택(결정적·단순). • Top-k: 상위 k개 토큰(k≈5~10) 중에서만 샘플링해 저확률 토큰 회피. • Top-p(Nucleus): 누적 확률이 p(≈0.9)가 되는 최소 토큰 집합에서 샘플링. • Temperature: 온도 τ로 분포를 재조정(τ↑ 다양·τ→0 greedy 수렴).\n" +
      "(2) Top-k는 분포 '모양'을 무시하고 항상 k개를 고려한다. 'the 46th US president Joe' 뒤는 다음 단어가 거의 'Biden'으로 확정적이라 k개는 불필요하게 많고, 'the spacecraft' 뒤는 후보가 다양해 k개로는 너무 적다. 반면 Top-p는 확률 질량(p) 기준이라 분포가 뾰족하면 후보가 적게, 평평하면 많게 자동 조절된다. 즉 분포 모양에 적응하므로 일반적으로 더 낫다.\n" +
      "(3) ICL은 few-shot 학습의 한 형태로, 프롬프트 안에 입력-출력 예시 몇 개를 주면 모델이 그 예시로부터 새 입력의 출력을 추론하는 것이다. 핵심은 모델 파라미터 업데이트가 전혀 없다는 점이다(GPT-3에서 처음 연구). Emergent Ability는 명시적으로 학습하지 않았는데 모델 용량이 특정 임계치(threshold)를 넘으면 갑자기 나타나는 능력으로, 작은 모델의 성능으로는 예측할 수 없다. 즉 규모(scaling)를 키워야 비로소 드러나며, Scaling Laws(성능 ∝ 모델·데이터·컴퓨트의 power-law)와 함께 '규모가 곧 능력'임을 보여준다.",
    rubric: "(1) 4개 전략 30점. (2) Top-p 우위 + 두 예시 대비 35점. (3) ICL 정의+무업데이트 + Emergent/Scaling 관계 35점.",
    source: "6장 LLMs § 디코딩·In-Context Learning·Scaling",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 3 — 지식 · 환각 · RAG (7장)
// ═══════════════════════════════════════════════════════════════
export const set3 = [
  {
    id: "NLP_S3Q1", set: 3, week: 7, topic: "Parametric Knowledge·Hallucination·RAG", type: "essay", difficulty: "medium",
    question:
      "LLM의 지식과 환각, RAG에 대해 답하시오.\n" +
      "(1) Parametric knowledge와 Non-parametric knowledge를 정의하고, 비파라미터 지식의 장점 3가지를 쓰시오.\n" +
      "(2) Hallucination(환각)의 정의와 발생 원인 3가지를 설명하시오.\n" +
      "(3) RAG가 환각을 완화하는 원리를, Direct Prompting과 비교하여 서술하시오.",
    keywords: [
      "파라미터 내부 지식",
      "외부 검색 지식",
      "모델 크기 안 키우고 정보 추가",
      "지식 갱신 용이",
      "해석 가능성",
      "그럴듯하지만 틀린 생성",
      "제한된 지식(knowledge cutoff)",
      "과잉일반화",
      "상식 결여",
      "검색 패시지 prepend",
    ],
    modelAnswer:
      "(1) Parametric knowledge는 LLM이 사전학습 데이터로부터 파라미터 내부에 저장한 지식으로, 자연어 프롬프트로만 접근하며 closed-book QA가 이에 의존한다. Non-parametric knowledge는 파라미터에 저장되지 않고 필요할 때 외부에서 검색·접근하는 지식(외부 KB, 코퍼스, 사용자 문서)이다. 비파라미터 지식의 장점: ① 모델 크기를 키우지 않고 더 많은 정보를 추가, ② 지식베이스의 갱신·수정이 용이, ③ 모델 해석 가능성(interpretability) 향상.\n" +
      "(2) Hallucination은 LM이 사실과 다르거나 오해를 부르거나 날조된 정보를 그럴듯하고 설득력 있게 생성하는 현상이다. 원인: ① 제한된 지식 — 유한한 데이터로 학습해 학습 범위(knowledge cutoff) 밖 질문에 그럴듯한 오답(예: iPhone 15 날조), ② 과잉일반화 — 한 맥락의 패턴을 안 맞는 맥락에 적용(예: 일본어에 '-ed' 적용), ③ 상식 결여 — 인간 같은 텍스트는 만들지만 상식 추론 부족.\n" +
      "(3) Direct Prompting은 LM의 파라미터 지식만으로 직접 답하므로 지식이 부족·구식이면 환각이 난다. RAG는 검색기(retriever)로 외부의 신뢰할 만한 관련 패시지를 찾아 질문 앞에 붙여(prepend) 생성한다. 모델이 답을 파라미터 기억이 아니라 검색된 근거 텍스트에 기반하게 만들어 사실성을 높이고 환각을 완화한다(예: ChatGPT의 웹 검색 트리거).",
    rubric: "(1) 두 지식 정의 + 비파라미터 장점 3 35점. (2) 환각 정의 + 원인 3 35점. (3) RAG vs Direct Prompting 완화 원리 30점.",
    source: "7장 RAG § Parametric Knowledge·Hallucination·RAG for LLMs",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 4 — 검색(IR) · RAG 모델 (7장)
// ═══════════════════════════════════════════════════════════════
export const set4 = [
  {
    id: "NLP_S4Q1", set: 4, week: 7, topic: "Retrieval·RAG-Sequence/Token", type: "essay", difficulty: "hard",
    question:
      "정보 검색과 RAG 모델을 설계 관점에서 답하시오.\n" +
      "(1) Sparse retrieval(TF-IDF)과 Dense retrieval의 차이를 표현·장단점 관점에서 비교하시오.\n" +
      "(2) Dense retrieval의 Bi-encoder와 Cross-encoder를 비교하고, 대규모 코퍼스에는 무엇이 적합하며 그 이유(사전계산)를 설명하시오.\n" +
      "(3) RAG-Sequence 모델과 RAG-Token 모델의 차이를 '마진화(marginalization) 수준'으로 구분하시오.",
    keywords: [
      "희소 벡터 / 밀집 임베딩",
      "TF-IDF / BERT 인코딩",
      "해석 가능 / 의미 이해",
      "Bi-encoder 독립 인코딩",
      "문서 벡터 사전계산",
      "Cross-encoder 쌍 동시처리",
      "상호작용 포착",
      "확장 불가",
      "RAG-Sequence 시퀀스 단위",
      "RAG-Token 토큰 단위",
      "latent variable z",
    ],
    modelAnswer:
      "(1) Sparse retrieval은 문서·쿼리를 희소 벡터(대부분 0)로 표현한다(예: TF-IDF, BM25). 단순하고 해석 가능하지만 단어의 정확한 겹침에 의존해 의미 이해가 부족하다. Dense retrieval은 신경망(예: BERT)으로 밀집 임베딩을 만들어 의미·문맥 유사도를 포착하지만, 계산 비용이 크고 해석이 어렵다.\n" +
      "(2) Bi-encoder는 쿼리와 문서를 두 개의 인코더로 독립 인코딩한 뒤 두 벡터의 코사인 유사도를 관련도로 쓴다. 장점은 문서 벡터를 미리 계산(precompute)해 둘 수 있어 대규모 검색에 적합하다는 것이다(단, 쿼리-문서 상호작용은 포착 못 함). Cross-encoder는 쿼리-문서 쌍을 함께 처리해 모델이 관련도를 직접 출력하며 intricate한 상호작용을 포착하지만, 모든 쌍을 매번 계산해야 해 대규모 코퍼스에 확장 불가하다. 따라서 대규모에는 Bi-encoder가 적합하고(사전계산 가능), Cross-encoder는 작은 집합의 정밀 재랭킹에 쓴다.\n" +
      "(3) 두 모델 모두 검색 문서를 잠재변수 z로 취급한다. RAG-Sequence는 같은 검색 문서 하나로 전체 시퀀스를 생성하며 문서를 단일 잠재변수로 보고 시퀀스 수준에서 top-K 근사로 마진화한다. RAG-Token은 토큰마다 다른 검색 문서를 쓸 수 있고 마진화를 시퀀스가 아니라 각 토큰마다 수행한다.",
    rubric: "(1) Sparse vs Dense 30점. (2) Bi vs Cross + 대규모=Bi(사전계산) 40점. (3) Seq(시퀀스 단위) vs Token(토큰 단위) 마진화 30점.",
    source: "7장 RAG § Sparse/Dense·Bi/Cross-encoder·RAG-Sequence/Token",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 5 — CoT & Test-time Scaling (8장)
// ═══════════════════════════════════════════════════════════════
export const set5 = [
  {
    id: "NLP_S5Q1", set: 5, week: 8, topic: "Chain-of-Thought·Test-time Scaling", type: "essay", difficulty: "medium",
    question:
      "LLM 추론(reasoning)에 대해 답하시오.\n" +
      "(1) Chain-of-Thought(CoT) 프롬프팅의 정의와, 모델 크기에 따른 효과 특성을 서술하시오.\n" +
      "(2) Zero-shot CoT와 Self-consistency CoT를 각각 설명하시오.\n" +
      "(3) Test-time(추론 시점) Scaling의 정의와 방법 3가지 이상(Long CoT·Beam/Tree Search·Iterative Refinement 등)을 쓰시오.",
    keywords: [
      "단계별 추론 분해",
      "큰 모델에서 효과적",
      "Let's think step by step",
      "여러 경로 + 다수결",
      "temperature 샘플링",
      "추론 시점 연산 증가",
      "Long CoT",
      "Beam/Tree Search",
      "backtrack·prune",
      "Iterative Refinement",
    ],
    modelAnswer:
      "(1) CoT는 복잡한 문제를 단계별 추론 과정으로 분해하도록 유도하는 프롬프팅이다. 답을 바로 내지 않고 논리적 순서로 사고 과정을 설명하게 한다. 특성상 CoT는 큰 모델에서 특히 효과적이며(작은 모델에선 이득이 적음), emergent 성격을 띤다.\n" +
      "(2) Zero-shot CoT는 예시 없이도 답 앞에 'Let's think step by step' 한 줄만 붙여 추론을 트리거하는 방법이다. Self-consistency CoT는 같은 프롬프트에 대해 temperature 샘플링으로 여러 추론 경로를 생성한 뒤 다수결(majority voting)로 최종 답을 고르는 방법으로, 여러 다른 사고 경로가 같은 답에 도달하면 신뢰가 높아진다는 직관에 기반한다.\n" +
      "(3) Test-time Scaling은 추론(inference) 시점에 쓰는 연산을 늘려(토큰을 더 생성) 더 높은 품질의 답을 얻는 것이다. 방법: ① Long CoT — 더 긴 추론 사슬로 더 철저히 사고(o1·DeepSeek-R1), ② Self-consistency(다수결), ③ Beam/Tree Search — 여러 추론 경로 동시 탐색, 막다른 길에서 backtrack, 나쁜 가지 prune, ④ Iterative Refinement — 초기 응답을 반복적으로 개선.",
    rubric: "(1) CoT 정의 + 큰 모델 효과 30점. (2) Zero-shot CoT + Self-consistency 35점. (3) Test-time Scaling 정의 + 방법 3개 이상 35점.",
    source: "8장 Reasoning § CoT·Test-time Scaling",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 6 — RLVR · PPO/GRPO (8장)
// ═══════════════════════════════════════════════════════════════
export const set6 = [
  {
    id: "NLP_S6Q1", set: 6, week: 8, topic: "RLVR·정책최적화", type: "essay", difficulty: "hard",
    question:
      "추론 모델의 후속학습(post-training)에 대해 답하시오.\n" +
      "(1) RLVR(Reinforcement Learning with Verifiable Rewards)의 정의와, o1·DeepSeek-R1에서의 역할을 쓰시오.\n" +
      "(2) RLVR이 지도학습(SFT) 대비 갖는 장점 3가지(데이터 확장성·모방 vs 최적화·분포 불일치)를 설명하시오.\n" +
      "(3) PPO와 GRPO의 차이를 critic 모델과 advantage 추정 방식 관점에서 비교하시오.",
    keywords: [
      "검증 가능한 정답에 보상",
      "정책 모델(LLM) RL 파인튜닝",
      "자동 검증기(verifier)",
      "모방 대신 정답 직접 최적화",
      "모델 자신의 생성으로 학습",
      "분포 일치",
      "PPO clipped surrogate",
      "GAE critic",
      "GRPO critic 제거",
      "그룹 상대 보상",
    ],
    modelAnswer:
      "(1) RLVR은 생성 응답이 검증 가능하게(verifiably) 정답일 때 보상을 주는 강화학습이다. 정책 모델(LLM)을 RL로 파인튜닝하며, OpenAI o1과 DeepSeek-R1의 주요 post-training 레시피다.\n" +
      "(2) ① 데이터 확장성: 지도학습은 사람이 완전한 정답 응답을 작성해야 하지만, RLVR은 자동 검증기(verifier)가 채점만 하면 되어 확장이 쉽다. ② 모방 vs 최적화: 지도학습은 사람의 추론 단계를 모방하게 강제해 suboptimal일 수 있으나, RLVR은 정답을 직접 최적화해 모델이 자기만의 효율적 추론 경로를 발견한다. ③ 분포 불일치: 지도학습은 사람이 만든 데이터라 모델 분포와 어긋날 수 있지만, RLVR은 모델 자신이 생성한 시퀀스로 학습해 추론(inference) 분포와 일치한다.\n" +
      "(3) PPO(Proximal Policy Optimization)는 clipped surrogate objective로 정책 업데이트가 과도해지지 않게 안정화하고, GAE(Generalized Advantage Estimation)를 위해 별도의 critic 모델을 둬 advantage 분산을 줄인다. GRPO(Group Relative Policy Optimization)는 PPO의 변형으로 critic 모델을 제거하고, 각 질문에 대해 출력 그룹을 샘플링해 그룹 내 상대적(comparative) 보상으로 advantage를 추정한다. 즉 PPO는 critic 필요 + clipping, GRPO는 critic 없이 그룹 상대비교가 핵심 차이다.",
    rubric: "(1) RLVR 정의 + 역할 25점. (2) 장점 3가지 45점. (3) PPO(critic+clipping) vs GRPO(critic 제거·그룹 상대) 30점.",
    source: "8장 Reasoning § RLVR·PPO·GRPO",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 7 — Alignment · Instruction Tuning · RLHF (8·9장)
// ═══════════════════════════════════════════════════════════════
export const set7 = [
  {
    id: "NLP_S7Q1", set: 7, week: 9, topic: "Alignment·Instruction Tuning·RLHF", type: "essay", difficulty: "hard",
    question:
      "LLM 정렬(Alignment)에 대해 답하시오.\n" +
      "(1) 정렬의 'HHH' 기준을 쓰고, 사전학습 모델이 정렬되지 않은 이유 중 '목적 불일치(objective mismatch)'를 설명하시오.\n" +
      "(2) Instruction Tuning과 RLHF를 비교하고, 왜 RLHF가 필요한지(쌍대비교가 절대점수보다 나은 이유 포함) 서술하시오.\n" +
      "(3) RLHF 보상 모델을 순진하게 최대화할 때의 문제(reward hacking·mode collapse 등)와, KL 정규화가 이를 어떻게 막는지 설명하시오.",
    keywords: [
      "Helpful·Honest·Harmless",
      "다음 단어 예측 ≠ 인간 의도",
      "Instruction Tuning 지도학습 zero-shot",
      "선호 순위(preference)",
      "절대점수 비일관 → 쌍대비교",
      "Bradley-Terry",
      "reward hacking",
      "mode collapse",
      "사전학습 지식 상실",
      "KL divergence 패널티",
      "초기 SFT 이탈 방지",
    ],
    modelAnswer:
      "(1) HHH = Helpful(요청 작업을 효율적으로 수행)·Honest(정확한 정보 제공 및 불확실성 표현)·Harmless(공격적·차별적·편향 출력 회피). 목적 불일치(objective mismatch): 사전학습의 목표는 '다음 단어 예측'일 뿐 인간의 의도·가치 이해와 무관하다. 그래서 사전학습만으로는 사용자 의도에 정렬되지 않는다.\n" +
      "(2) Instruction Tuning은 다양한 태스크를 지시문(instruction) 형태의 (입력=지시, 출력=기대응답) 지도학습으로 파인튜닝해 zero-shot 교차 태스크 일반화를 얻는다. RLHF는 그 위에 인간 선호로 미세 정렬한다. RLHF가 필요한 이유: 지도학습은 사람이 전체 정답을 써야 하고(비쌈), 창작처럼 정답이 하나가 아닌 open-ended 생성에 약하며, 모든 토큰 오류를 동일하게 패널티한다. RLHF는 '어느 응답이 더 나은가'라는 선호 순위만 받는다. 특히 사람은 절대 점수(1~10)를 매기면 평가자마다 매우 비일관적이므로, 상대 비교(쌍대비교, pairwise)가 더 신뢰할 수 있다.\n" +
      "(3) 보상 모델은 (prompt, 선호 응답, 비선호 응답) 쌍을 Bradley-Terry 목적으로 학습한 인간 판단의 근사일 뿐이다. 이를 순진하게 최대화하면: ① Reward hacking — 실제 바람직한 행동 없이 보상모델의 결함을 악용해 높은 보상만 획득, ② Mode collapse — 고보상의 좁은 분포로 수렴해 다양성·일반화 상실, ③ 사전학습 지식 상실 — 과최적화로 문법·사실성 등 초기 모델의 좋은 속성을 망각. 해결책은 초기 SFT 체크포인트에서 너무 멀어지는 것에 패널티를 주는 것으로, 이 이탈 패널티는 기댓값으로 KL divergence로 알려져 있다(하이퍼파라미터로 강도 조절).",
    rubric: "(1) HHH + 목적 불일치 30점. (2) Instruction Tuning vs RLHF + 쌍대비교 우위 40점. (3) reward hacking 등 문제 + KL 정규화 30점.",
    source: "8·9장 § Alignment·Instruction Tuning·RLHF 보상모델",
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 8 — Agents · 멀티모달 · 도구 · 코드 (9장)
// ═══════════════════════════════════════════════════════════════
export const set8 = [
  {
    id: "NLP_S8Q1", set: 8, week: 9, topic: "LLM Agents·Multimodal·Tool·Code", type: "essay", difficulty: "medium",
    question:
      "LLM 에이전트와 그 구성 능력에 대해 답하시오.\n" +
      "(1) 언어 에이전트(Language Agent)의 정의와, LLM이 그 기반이 되는 3가지 능력을 쓰시오.\n" +
      "(2) 멀티모달 아키텍처의 Early fusion과 Late fusion을 구분하고, LLaVA가 시각 정보를 LLM에 넣는 핵심 메커니즘(projection)을 설명하시오.\n" +
      "(3) Toolformer가 유용한 API 호출을 학습하는 self-supervised 트릭(loss 기반 필터링)과, 코드 에이전트 평가 벤치마크 SWE-Bench의 평가 방식을 서술하시오.",
    keywords: [
      "자연어로 현실 작업 실행",
      "NLU·NLG·Reasoning",
      "Early fusion raw 결합",
      "Late fusion 표현 결합",
      "LLaVA projection W",
      "시각 토큰 concat",
      "Toolformer 언제·어떤 도구",
      "loss 줄이면 유용 → 필터링",
      "SWE-Bench 이슈→패치",
      "실제 테스트로 평가",
    ],
    modelAnswer:
      "(1) 언어 에이전트는 자연어를 인터페이스로 사용자와 상호작용하며 현실 세계 작업을 실행하는 시스템이다. LLM이 그 기반이 되는 능력은 ① 자연어 이해(NLU) — 사용자 입력 해석, ② 자연어 생성(NLG) — 적절한 응답/행동 생성, ③ 추론(Reasoning) — 다단계 문제해결·의사결정. (예: 가상 비서, 코드 에이전트, 비즈니스 운영 자동화)\n" +
      "(2) Early fusion은 처리 전에 서로 다른 모달의 raw 입력을 먼저 결합하고, Late fusion은 각 모달을 따로 처리한 뒤 표현(representation)을 나중에 결합한다. LLaVA(Large Language and Vision Assistant)는 사전학습 비전 인코더(CLIP)와 LLM(Llama)을 결합하는데, 핵심은 projection matrix W를 학습해 이미지 표현 Z_v를 텍스트 임베딩 H_v로 변환하고, 이 시각 토큰 H_v를 텍스트 토큰 H_q와 concat해 모델 입력으로 넣는 것이다.\n" +
      "(3) Toolformer는 언제·어떤 도구(계산기·QA·번역·위키 검색)를 어떻게 쓸지 자동으로 결정하도록 학습한다. self-supervised 트릭: in-context 예시로 API 호출을 생성한 뒤, '그 API 호출이 이후 토큰 생성의 loss를 줄였는가'로 유용성을 판단해 loss를 줄이지 못하는 호출은 필터링한다(유익한 호출만 학습 데이터로). SWE-Bench는 실제 Python 레포의 GitHub 이슈를 병합된 PR 솔루션과 연결해 태스크를 수집하고, 모델에게 이슈 텍스트 + 코드베이스 스냅샷을 주면 모델이 패치(patch)를 생성하며 이를 실제 테스트로 평가한다.",
    rubric: "(1) 에이전트 정의 + 3능력 30점. (2) Early/Late fusion + LLaVA projection·concat 40점. (3) Toolformer loss 필터링 + SWE-Bench 이슈→패치→테스트 30점.",
    source: "9장 Agents § Language Agents·Multimodal(LLaVA)·Toolformer·SWE-Bench",
  },
];

// ═══════════════════════════════════════════════════════════════
// 메타 + 전체
// ═══════════════════════════════════════════════════════════════
const ALL = [...set1, ...set2, ...set3, ...set4, ...set5, ...set6, ...set7, ...set8];

export const META = {
  id: "nlp",
  title: "자연어 처리",
  subtitle: "1~9장 복습 노트 · 6~9장 기말 서술형 8세트",
  emoji: "🗣️",
  color: "#1F6F6B",
  available: true,
  hasExam: true,
  examType: "essay",        // 서술형 — exam.js에서 분기 렌더링 (LLM 채점)
  sets: SETS_META,
  weekCount: 11,
  noteIndex: [
    { slug: "1_LM_intro",                     title: "1 — LM 개요 & N-gram 언어 모델", week: 1 },
    { slug: "2_Semantics",                    title: "2 — 단어 의미 & 의미론 (WordNet·TF-IDF·PMI)", week: 2 },
    { slug: "3_Embeddings",                   title: "3 — 워드 임베딩 (Word2Vec)", week: 3 },
    { slug: "3b_Word2vec_상세",               title: "3.5 — (보충) Word2Vec 상세", week: 3 },
    { slug: "4_RNNs",                         title: "4 — 시퀀스 모델링 & RNN/LSTM", week: 4 },
    { slug: "5_Transformers",                 title: "5 — Transformer 언어 모델", week: 5 },
    { slug: "5b_Transformer_BERT_상세",       title: "5.5 — (보충) Self-Attention & BERT 상세", week: 5 },
    { slug: "6_LLMs_및_In-Context_Learning",  title: "6 — LLMs & In-Context Learning", week: 6 },
    { slug: "7_RAG",                          title: "7 — Retrieval-Augmented Generation (RAG)", week: 7 },
    { slug: "8_Reasoning_및_Post-training",   title: "8 — Reasoning & Post-training", week: 8 },
    { slug: "9_LLM_Agents",                   title: "9 — LLM Agents", week: 9 },
  ],
  weeklyExams: [            // 6~9장 객관식 모의고사 (각 15문항)
    { week: 6, slug: "6_LLMs_확인문제",      title: "6장 확인문제 — LLMs & In-Context (객관식 15)", count: 15 },
    { week: 7, slug: "7_RAG_확인문제",       title: "7장 확인문제 — RAG (객관식 15)", count: 15 },
    { week: 8, slug: "8_Reasoning_확인문제", title: "8장 확인문제 — Reasoning & Post-training (객관식 15)", count: 15 },
    { week: 9, slug: "9_Agents_확인문제",    title: "9장 확인문제 — LLM Agents (객관식 15)", count: 15 },
    // 6~9장 종합 모의고사 (혼합 20문항)
    { week: 91, slug: "종합모의고사_1", title: "종합 모의고사 1 — 6~9장 혼합 (객관식 20)", count: 20 },
    { week: 92, slug: "종합모의고사_2", title: "종합 모의고사 2 — 6~9장 혼합 (객관식 20)", count: 20 },
    { week: 93, slug: "종합모의고사_3", title: "종합 모의고사 3 — 6~9장 혼합 (객관식 20)", count: 20 },
  ],
};

export function getSetQuestions(setId) {
  const table = { 1: set1, 2: set2, 3: set3, 4: set4, 5: set5, 6: set6, 7: set7, 8: set8 };
  return table[setId] || [];
}

export function getAllQuestions() { return ALL; }
