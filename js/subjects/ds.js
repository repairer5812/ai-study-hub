// subjects/ds.js — 자료구조 모의고사 (100% 객관식, 중간 4세트 + 기말 1세트(9~13차시))
//
// 출제 원칙
// - 교수님 시험 공지: "100% 객관식 선다형"
// - 족집게 포인트 반영: 2차시 유한성·빅오, 3차시 순환 수도코드 결과,
//   5차시 연결 리스트 삽입/삭제 8문제, 6차시 수식 계산 3문제,
//   7차시 원형 큐 Empty/Full · INQ/DQ 시퀀스 예측
// - 시간복잡도 빈칸 매트릭스(NEW_006~012) · ADT/추상화(NEW_001~005) 신규 보강
// - 농담·비유 배제. 개념·계산·코드 추적 중심 시험 톤 유지.
//
// 스키마 (기계학습 questions.js와 동일)
// { id, set, week, topic, type:"multiple_choice", difficulty,
//   question, choices[4], answer(0~3), brief, detailed, source }

export const SETS_META = [
  { id: 1, exam: "midterm", title: "SET 1", label: "기본 균형", desc: "전범위 고루 출제 + ADT/매트릭스 (2~7차시)" },
  { id: 2, exam: "midterm", title: "SET 2", label: "족집게 집중", desc: "교수님 예고 영역 (LL·수식·원형 큐)" },
  { id: 3, exam: "midterm", title: "SET 3", label: "코드 추적·변별", desc: "심화 hard 위주" },
  { id: 4, exam: "midterm", title: "SET 4", label: "종합 모의고사", desc: "중간 2~7차시 전범위 종합" },
  { id: 5, exam: "final", title: "SET 1", label: "기본 균형", desc: "트리·히프·그래프·정렬 9~13차시 균형" },
  { id: 6, exam: "final", title: "SET 2", label: "족집게 집중", desc: "출제 예고 포인트 (힙=완전이진트리·퀵 최악 등)" },
  { id: 7, exam: "final", title: "SET 3", label: "코드·계산 심화", desc: "탐색·트레이싱·복잡도 심화" },
  { id: 8, exam: "final", title: "SET 4", label: "종합 모의고사", desc: "기말 9~13차시 전범위 종합" },
];

// ═══════════════════════════════════════════════════════════════
// SET 1 — 기본 균형 (Week 2:5 · 3:3 · 4:2 · 5:6 · 6:7 · 7:7 = 30)
// ═══════════════════════════════════════════════════════════════
export const set1 = [
  // ── 2차시 — 알고리즘 기초·빅오 ──
  {
    id: "DS_S1Q1",
    set: 1,
    week: 2,
    topic: "알고리즘 5조건",
    type: "multiple_choice",
    difficulty: "basic",
    question: "알고리즘의 필수 조건 5가지에 해당하지 않는 것은?",
    choices: [
      "입력(Input)은 0개 이상 존재한다",
      "출력(Output)은 반드시 1개 이상 존재한다",
      "유한성(Finiteness): 유한 단계 내 반드시 종료",
      "효율성(Efficiency): 반드시 최적 복잡도 보장"
    ],
    answer: 3,
    brief: "효율성은 필수 조건이 아니다.",
    detailed: "알고리즘 5조건은 입력·출력·유한성·명확성(Definiteness)·유효성(Effectiveness)이며, 효율성은 포함되지 않는다.",
    source: "2차시 § 2.2"
  },
  {
    id: "DS_S1Q2",
    set: 1,
    week: 2,
    topic: "유한성",
    type: "multiple_choice",
    difficulty: "basic",
    question: "알고리즘의 '유한성(Finiteness)' 조건이 의미하는 바로 가장 적절한 것은?",
    choices: [
      "입력 데이터는 반드시 유한 개여야 한다",
      "한정된 수의 단계 후에 반드시 종료되어야 한다",
      "메모리 사용량이 항상 유한해야 한다",
      "출력 값이 유한한 자릿수를 가져야 한다"
    ],
    answer: 1,
    brief: "유한 단계 후 반드시 종료.",
    detailed: "유한성은 알고리즘이 유한한 수의 단계 안에서 반드시 종료되어야 함을 의미한다. 무한 루프는 알고리즘으로 인정되지 않는다.",
    source: "2차시 § 2.2"
  },
  {
    id: "DS_S1Q3",
    set: 1,
    week: 2,
    topic: "빅오 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "빅오 표기법 f(n) = O(g(n))의 수학적 정의로 옳은 것은?",
    choices: [
      "모든 n에 대해 항상 f(n) = g(n)이 성립한다",
      "상수 c, n₀가 존재해 n ≥ n₀일 때 |f(n)| ≤ c·|g(n)|",
      "상수 c가 존재해 모든 n에 대해 f(n) ≥ c·g(n)",
      "f(n)과 g(n)이 동일한 차수의 다항식이다"
    ],
    answer: 1,
    brief: "상한 정의: n ≥ n₀일 때 f(n) ≤ c·g(n).",
    detailed: "빅오는 상한(Upper Bound)을 의미하며, 어떤 양의 상수 c와 n₀가 존재하여 n ≥ n₀인 모든 n에 대해 |f(n)| ≤ c·|g(n)|을 만족할 때 f(n) = O(g(n))이다.",
    source: "2차시 § 6.1"
  },
  {
    id: "DS_S1Q4",
    set: 1,
    week: 2,
    topic: "ADT 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "추상 데이터 타입(ADT, Abstract Data Type)의 정의로 가장 적절한 것은?",
    choices: [
      "데이터의 물리적 저장 방식까지 함께 명시한 구조",
      "객체와 연산만 정의하고 구현은 분리한 개념적 모델",
      "C 언어의 typedef로 정의한 별칭 자료형",
      "메모리 주소에 직접 매핑되는 자료형"
    ],
    answer: 1,
    brief: "ADT는 What(객체·연산)만 정의, How(구현)은 분리.",
    detailed: "ADT는 데이터가 '무엇(What)'을 할 수 있는지(객체와 연산)만 정의하고, '어떻게(How)' 구현되는지는 감춘 개념적 명세다. 자료구조는 ADT를 실제 메모리 위에서 구현한 결과물이다.",
    source: "4차시 § 4.1"
  },
  {
    id: "DS_S1Q5", set: 1, week: 2, topic: "명확성 정의", type: "multiple_choice", difficulty: "basic",
    question: "알고리즘의 5대 조건 중 '명확성(Definiteness)'의 의미로 옳은 것은?",
    choices: [
      "각 명령어가 모호하지 않고 의미가 분명해야 한다",
      "유한한 단계 안에 반드시 종료되어야 한다",
      "출력은 반드시 1개 이상 있어야 한다",
      "각 명령어는 실제로 실행 가능해야 한다",
    ],
    answer: 0,
    brief: "명확성 = 각 명령어가 모호하지 않음.",
    detailed: "명확성(Definiteness)은 알고리즘의 각 단계가 분명하고 모호함이 없어야 함을 의미한다. '대충 큰 값', '적당히 정렬' 같은 모호한 표현은 명확성을 위반한다.",
    source: "2차시 § 2.2",
  },

  // ── 3차시 — 순환·반복 ──
  {
    id: "DS_S1Q6",
    set: 1,
    week: 3,
    topic: "순환 적합 조건",
    type: "multiple_choice",
    difficulty: "medium",
    question: "순환(Recursion)으로 해결하기 적합한 문제의 조건이 아닌 것은?",
    choices: [
      "문제 정의 자체가 순환적인 구조일 것",
      "대상을 크게(반씩) 쪼갤 수 있을 것",
      "Base Case(종료 조건)가 명확할 것",
      "주어진 입력의 크기가 충분히 작을 것"
    ],
    answer: 3,
    brief: "입력 크기는 조건이 아님.",
    detailed: "순환 적합 조건: ① 문제 정의가 순환적, ② 입력을 크게(반씩) 쪼갤 수 있음, ③ Base Case(종료 조건)가 명확. 입력 크기 자체는 적합 조건이 아니다.",
    source: "3차시 § 4"
  },
  {
    id: "DS_S1Q7", set: 1, week: 3, topic: "이진 검색 복잡도", type: "multiple_choice", difficulty: "medium",
    question: "정렬된 n개 데이터에 대한 이진 검색(Binary Search)의 시간 복잡도는?",
    choices: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    brief: "탐색 범위가 매 단계 절반으로 줄어듦.",
    detailed: "이진 검색은 매 단계 탐색 범위가 절반으로 줄어든다. n = 2^k에서 k = log₂ n이므로 O(log n)이다.",
    source: "3차시 § 5.3",
  },
  {
    id: "DS_S1Q8",
    set: 1,
    week: 3,
    topic: "순환 부적합 — 피보나치",
    type: "multiple_choice",
    difficulty: "medium",
    question: "다음 중 '순환으로 풀기 부적합'한 대표적인 예로 가장 적절한 것은?",
    choices: [
      "정렬된 배열에서의 이진 검색(Binary Search)",
      "n!을 구하는 팩토리얼(factorial) 계산",
      "메모이제이션 없는 피보나치(fib) 계산",
      "원반을 옮기는 하노이 탑(Tower of Hanoi)"
    ],
    answer: 2,
    brief: "메모이제이션 없는 피보나치는 O(2ⁿ) — 부적합.",
    detailed: "메모이제이션 없는 순환 피보나치는 fib(n) = fib(n-1) + fib(n-2)로 자기를 두 번 호출하여 동일 부분문제가 중복 계산된다. 시간 복잡도가 O(2ⁿ)으로 폭발하므로 순환으로 풀기 부적합한 대표 사례다. 반복 또는 메모이제이션을 써야 한다.",
    source: "3차시 § 5.2"
  },

  // ── 4차시 — 리스트 ADT·정적 구현 ──
  {
    id: "DS_S1Q9", set: 1, week: 4, topic: "포인터 크기", type: "multiple_choice", difficulty: "basic",
    question: "64비트 시스템에서 포인터 변수 자체의 크기는?",
    choices: ["1바이트", "4바이트", "8바이트", "가리키는 자료형에 따라 다름"],
    answer: 2,
    brief: "64비트 시스템 포인터 = 8바이트.",
    detailed: "포인터는 메모리 주소를 저장하는 변수이며, 64비트 시스템에서는 주소가 64비트(=8바이트)이므로 포인터 변수 크기는 자료형과 무관하게 8바이트다.",
    source: "4차시 § 2.1",
  },
  {
    id: "DS_S1Q10", set: 1, week: 4, topic: "빅오 매트릭스 — 배열", type: "multiple_choice", difficulty: "medium",
    question: "정적 배열(고정 크기) 기반 리스트의 [인덱스 접근(Indexed Access) / 키 탐색(Search by Key) / 중간 삽입 / 중간 삭제] 시간 복잡도를 순서대로 옳게 나열한 것은?",
    choices: [
      "O(1) / O(n) / O(n) / O(n)",
      "O(n) / O(n) / O(1) / O(1)",
      "O(1) / O(log n) / O(1) / O(1)",
      "O(1) / O(n) / O(1) / O(1)",
    ],
    answer: 0,
    brief: "인덱스 접근 O(1), 키 탐색·삽입·삭제는 Shift 때문에 O(n).",
    detailed: "정적 배열은 인덱스로 즉시 위치를 계산하는 인덱스 접근(Indexed Access)이 O(1)이다. 그러나 키 탐색은 선형 O(n)이고, 중간 삽입·삭제는 데이터 이동(Shift)이 필요해 O(n)이다.",
    source: "4차시 § 6 / 시간복잡도 매트릭스",
  },

  // ── 5차시 — 연결 리스트 ──
  {
    id: "DS_S1Q11", set: 1, week: 5, topic: "단순 LL 삽입 순서", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트에서 before 뒤에 new_node를 삽입할 때 올바른 포인터 조작 순서는?",
    choices: [
      "before->link = new_node; new_node->link = before->link;",
      "new_node->link = before->link; before->link = new_node;",
      "new_node->link = before; before->link = new_node;",
      "before->link = new_node->link; new_node->link = before;",
    ],
    answer: 1,
    brief: "new_node->link를 먼저 설정해야 함.",
    detailed: "before->link를 먼저 바꾸면 원래 다음 노드의 주소를 잃는다. 반드시 new_node->link = before->link로 다음 노드 주소를 보존한 뒤, before->link = new_node로 연결을 갱신한다.",
    source: "5차시 § 3.3",
  },
  {
    id: "DS_S1Q12",
    set: 1,
    week: 5,
    topic: "원형 LL head 위치",
    type: "multiple_choice",
    difficulty: "medium",
    question: "원형 연결 리스트(Circular Linked List)에서 head 포인터가 일반적으로 가리키는 노드는?",
    choices: [
      "리스트의 첫 번째 노드를 가리킨다",
      "리스트의 마지막 노드를 가리킨다",
      "리스트의 중간 위치 노드를 가리킨다",
      "head 포인터는 따로 존재하지 않는다"
    ],
    answer: 1,
    brief: "head는 마지막 노드를 가리킨다.",
    detailed: "원형 연결 리스트는 head가 마지막 노드를 가리키게 하여 head->link로 첫 노드에 O(1)로 접근할 수 있다. 이 덕분에 addFirst와 addLast 모두 O(1)이다.",
    source: "5차시 § 4.1"
  },
  {
    id: "DS_S1Q13",
    set: 1,
    week: 5,
    topic: "Memory Leak 방지",
    type: "multiple_choice",
    difficulty: "basic",
    question: "연결 리스트에서 노드를 삭제한 뒤 반드시 수행해야 하는 작업은?",
    choices: [
      "head 포인터를 NULL로 초기화한다",
      "삭제된 노드의 메모리를 free()로 반환한다",
      "리스트 전체를 처음부터 재정렬한다",
      "모든 노드의 링크를 NULL로 리셋한다"
    ],
    answer: 1,
    brief: "free(removed) 없으면 Memory Leak.",
    detailed: "malloc으로 Heap에 할당받은 메모리는 반드시 free로 반환해야 한다. 그렇지 않으면 Memory Leak이 발생한다.",
    source: "5차시 § 3.4"
  },
  {
    id: "DS_S1Q14", set: 1, week: 5, topic: "단순 LL addFirst", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트에 addFirst(맨 앞 삽입) 연산을 수행하는 코드의 올바른 순서는?",
    choices: [
      "head = new_node; new_node->link = head;",
      "new_node->link = head; head = new_node;",
      "new_node->link = NULL; head = new_node;",
      "head->link = new_node; new_node->link = NULL;",
    ],
    answer: 1,
    brief: "new_node->link 먼저, head 갱신은 마지막.",
    detailed: "addFirst는 ① new_node->link = head로 기존 첫 노드 주소를 보존한 뒤 ② head = new_node로 head를 갱신해야 한다. 순서를 바꾸면 head를 먼저 바꿔 원래 첫 노드의 주소를 잃는다.",
    source: "5차시 § 3.2",
  },
  {
    id: "DS_S1Q15", set: 1, week: 5, topic: "빅오 매트릭스 — 단순 LL 삽입", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트(Singly Linked List)의 [add_first / add_last / 노드 p 뒤 삽입 / 노드 p 앞 삽입] 시간 복잡도를 순서대로 옳게 나열한 것은? (tail 포인터 없음, head만 보유, 노드 p의 주소는 주어졌다고 가정)",
    choices: [
      "O(1) / O(1) / O(1) / O(1)",
      "O(1) / O(n) / O(1) / O(n)",
      "O(n) / O(n) / O(n) / O(n)",
      "O(1) / O(n) / O(n) / O(n)",
    ],
    answer: 1,
    brief: "단순 LL은 p 앞 삽입 시 선행 노드를 못 찾아 O(n).",
    detailed: "단순 연결 리스트는 한 방향 링크만 가진다. add_first는 head 앞에 끼우면 되므로 O(1). add_last는 마지막 노드까지 순차 접근(Sequential Access) 필요 → O(n). 노드 p가 주어졌을 때 p 뒤 삽입은 p->link만 갱신하면 되어 O(1)이지만, p 앞 삽입은 p의 선행 노드를 찾기 위해 head부터 다시 순회해야 하므로 O(n).",
    source: "5차시 § 3 / 시간복잡도 매트릭스",
  },
  {
    id: "DS_S1Q16", set: 1, week: 5, topic: "LL 빈칸 — 순회", type: "multiple_choice", difficulty: "basic",
    question: "다음 단순 연결 리스트 순회 코드의 빈칸 ___ 에 들어갈 표현으로 옳은 것은?\n```\nNode *p = head;\nwhile (p != NULL) {\n  ___ ;\n  p = p->link;\n}\n```",
    choices: [
      "p = NULL",
      "printf(\"%d \", p->data)",
      "p->link = NULL",
      "free(p)",
    ],
    answer: 1,
    brief: "현재 노드 데이터 사용 후 다음으로 이동.",
    detailed: "순회 루프는 현재 노드 p의 데이터를 처리(예: 출력)한 뒤 p = p->link로 다음 노드로 이동한다. p = NULL이나 p->link = NULL은 즉시 루프를 끊거나 리스트를 망가뜨린다.",
    source: "5차시 § 3.5",
  },

  // ── 6차시 — 스택·수식 계산 ──
  {
    id: "DS_S1Q17",
    set: 1,
    week: 6,
    topic: "스택 원리",
    type: "multiple_choice",
    difficulty: "basic",
    question: "스택(Stack)의 삽입·삭제 원리로 옳은 것은?",
    choices: [
      "FIFO: 먼저 들어온 것이 먼저 나간다",
      "LIFO: 나중에 들어온 것이 먼저 나간다",
      "우선순위가 높은 것이 먼저 나간다",
      "양쪽 끝에서 자유롭게 삽입·삭제한다"
    ],
    answer: 1,
    brief: "Last In First Out.",
    detailed: "스택은 LIFO(Last In First Out) 구조로, 한쪽 끝(Top)에서만 PUSH·POP이 일어난다.",
    source: "6차시 § 1.1"
  },
  {
    id: "DS_S1Q18", set: 1, week: 6, topic: "PUSH 코드", type: "multiple_choice", difficulty: "medium",
    question: "C언어로 정적 구현된 스택에서 PUSH 연산을 올바르게 표현한 것은? (top 초기값 = -1)",
    choices: [
      "stack[top++] = item;",
      "stack[++top] = item;",
      "stack[top--] = item;",
      "stack[--top] = item;",
    ],
    answer: 1,
    brief: "top을 먼저 1 증가시킨 뒤 대입 (전위 ++).",
    detailed: "top의 초기값이 -1이므로 PUSH는 전위 ++(top을 먼저 증가) 후 대입한다: stack[++top] = item. POP은 반대로 stack[top--]이다.",
    source: "6차시 § 3.1",
  },
  {
    id: "DS_S1Q19", set: 1, week: 6, topic: "Infix→Postfix 변환", type: "multiple_choice", difficulty: "medium",
    question: "중위 표기식 `A / B * C`를 후위 표기식으로 올바르게 변환한 것은?",
    choices: [
      "A B C / *",
      "A B / C *",
      "A B * C /",
      "/ A B * C",
    ],
    answer: 1,
    brief: "좌결합성: (A/B)*C → A B / C *.",
    detailed: "같은 우선순위 연산자는 왼쪽부터 계산한다. ((A/B)*C)로 괄호 치고 각 연산자를 오른쪽 괄호 밖으로 빼면 A B / C *.",
    source: "6차시 § 5.2",
  },
  {
    id: "DS_S1Q20", set: 1, week: 6, topic: "후위식 계산", type: "multiple_choice", difficulty: "medium",
    question: "후위 표기식 `1 2 + 7 *`를 계산한 결과는?",
    choices: ["8", "15", "21", "24"],
    answer: 2,
    brief: "(1+2)×7 = 21.",
    detailed: "피연산자는 스택 PUSH, 연산자는 2개 POP 후 계산. 1,2 PUSH → + 만나면 POP 2, POP 1 → 1+2=3 PUSH → 7 PUSH → * 만나면 POP 7, POP 3 → 3×7=21.",
    source: "6차시 § 7.3",
  },
  {
    id: "DS_S1Q21", set: 1, week: 6, topic: "빅오 매트릭스 — 스택", type: "multiple_choice", difficulty: "basic",
    question: "배열 기반 스택의 [PUSH / POP / Peek / 키 탐색(Search by Key)] 시간 복잡도로 옳은 것은?",
    choices: [
      "O(1) / O(1) / O(1) / O(n)",
      "O(1) / O(1) / O(1) / O(1)",
      "O(n) / O(n) / O(1) / O(n)",
      "O(log n) / O(log n) / O(1) / O(n)",
    ],
    answer: 0,
    brief: "Top 연산은 모두 O(1), 키 탐색은 O(n).",
    detailed: "PUSH·POP·Peek 모두 top 한 위치에서만 일어나므로 O(1). 다만 키 탐색(Search by Key)은 스택 전체를 순차 접근해야 하므로 O(n)이다.",
    source: "6차시 § 3 / 시간복잡도 매트릭스",
  },
  {
    id: "DS_S1Q22",
    set: 1,
    week: 6,
    topic: "스택 정적 구현 유리",
    type: "multiple_choice",
    difficulty: "medium",
    question: "스택을 정적(배열)으로 구현해도 일반 리스트와 달리 Shift 오버헤드가 없는 이유는?",
    choices: [
      "배열이 아니라 연결 리스트로 구현하기 때문",
      "삽입·삭제가 top 한 위치에서만 일어나기 때문",
      "저장하는 데이터 타입이 고정되어 있기 때문",
      "운영체제가 내부적으로 최적화해주기 때문"
    ],
    answer: 1,
    brief: "Top 고정 연산 → 이동 불필요.",
    detailed: "스택의 PUSH·POP은 모두 배열의 맨 끝(top)에서만 일어나므로 중간 원소를 Shift할 일이 없다. 구현이 단순하고 성능도 좋아 정적 구현이 선호된다.",
    source: "6차시 § 3.1"
  },
  {
    id: "DS_S1Q23",
    set: 1,
    week: 6,
    topic: "전위식",
    type: "multiple_choice",
    difficulty: "basic",
    question: "수식 표기법 중 '폴란드 표기법(Polish Notation)'으로도 불리는 것은?",
    choices: [
      "중위 표기식 (Infix Notation)",
      "전위 표기식 (Prefix Notation)",
      "후위 표기식 (Postfix Notation)",
      "역폴란드 표기식 (Reverse Polish)"
    ],
    answer: 1,
    brief: "전위식 = Polish Notation.",
    detailed: "폴란드 수학자 얀 우카시에비치가 고안한 표기법이 전위식(Prefix). 후위식은 그 역(Reverse Polish)이다.",
    source: "6차시 § 4.1"
  },

  // ── 7차시 — 큐·데크·우선순위 큐 ──
  {
    id: "DS_S1Q24",
    set: 1,
    week: 7,
    topic: "큐 원리",
    type: "multiple_choice",
    difficulty: "basic",
    question: "큐(Queue)에 대한 설명으로 옳은 것은?",
    choices: [
      "LIFO 구조로 한쪽 끝에서만 삽입·삭제한다",
      "FIFO 구조로 rear 삽입, front 삭제한다",
      "우선순위가 높은 원소가 먼저 나간다",
      "양쪽 끝에서 모두 삽입·삭제가 가능하다"
    ],
    answer: 1,
    brief: "FIFO — 삽입은 rear, 삭제는 front.",
    detailed: "큐는 FIFO(First In First Out) 구조로 rear에서 Enqueue, front에서 Dequeue한다.",
    source: "7차시 § 1"
  },
  {
    id: "DS_S1Q25", set: 1, week: 7, topic: "원형 큐 초기값", type: "multiple_choice", difficulty: "medium",
    question: "원형 큐(Circular Queue)의 front와 rear 초기값으로 옳은 것은?",
    choices: [
      "front = -1, rear = -1",
      "front = 0, rear = 0",
      "front = 0, rear = MAX_SIZE",
      "front = MAX_SIZE, rear = 0",
    ],
    answer: 1,
    brief: "원형 큐는 0, 0으로 시작.",
    detailed: "선형 큐는 -1, -1로 시작하지만 원형 큐는 front = 0, rear = 0으로 시작한다. 공백 조건이 front == rear이므로 초기부터 같다.",
    source: "7차시 § 3.2",
  },
  {
    id: "DS_S1Q26", set: 1, week: 7, topic: "원형 큐 Empty", type: "multiple_choice", difficulty: "basic",
    question: "원형 큐(Circular Queue)의 Empty 조건은? (한 칸 비우기 표준 구현 기준)",
    choices: [
      "front == rear",
      "front == -1 && rear == -1",
      "(rear + 1) % MAX_SIZE == front",
      "rear == MAX_SIZE - 1",
    ],
    answer: 0,
    brief: "front == rear 면 비어있음.",
    detailed: "원형 큐의 Empty 조건은 front == rear다. 초기 상태와 동일한 조건으로 비어있음을 판정한다.",
    source: "7차시 § 3.2",
  },
  {
    id: "DS_S1Q27", set: 1, week: 7, topic: "우선순위 큐 구현", type: "multiple_choice", difficulty: "medium",
    question: "우선순위 큐(Priority Queue)를 효율적으로 구현할 때 주로 사용되는 자료구조는?",
    choices: [
      "단순 연결 리스트",
      "원형 큐 (배열)",
      "힙(Heap) 트리",
      "해시 테이블",
    ],
    answer: 2,
    brief: "힙(Heap)으로 구현.",
    detailed: "우선순위 큐는 이름이 '큐'이지만 선형 자료구조로는 효율적 구현이 어렵다. 트리 기반의 힙(Max Heap/Min Heap)으로 구현해야 삽입·삭제가 O(log n)로 가능하다.",
    source: "7차시 § 6.3",
  },
  {
    id: "DS_S1Q28", set: 1, week: 7, topic: "빅오 매트릭스 — 원형 큐", type: "multiple_choice", difficulty: "basic",
    question: "원형 큐(배열 기반)의 [Enqueue / Dequeue / Peek / 키 탐색(Search by Key)] 시간 복잡도로 옳은 것은?",
    choices: [
      "O(1) / O(1) / O(1) / O(n)",
      "O(n) / O(n) / O(n) / O(n)",
      "O(1) / O(n) / O(1) / O(n)",
      "O(log n) / O(log n) / O(1) / O(n)",
    ],
    answer: 0,
    brief: "양 끝 연산은 O(1), 키 탐색은 O(n).",
    detailed: "원형 큐는 rear와 front 인덱스만 갱신하면 되므로 Enqueue·Dequeue·Peek 모두 O(1). 키 탐색(Search by Key)은 큐 전체를 순차 접근해야 하므로 O(n).",
    source: "7차시 § 3 / 시간복잡도 매트릭스",
  },
  {
    id: "DS_S1Q29",
    set: 1,
    week: 7,
    topic: "데크 응용",
    type: "multiple_choice",
    difficulty: "medium",
    question: "데크(Deque)가 가장 자연스럽게 활용되는 사례로 적절한 것은?",
    choices: [
      "병원 응급실의 환자 처리 순서 결정",
      "은행 창구의 일반 번호표 대기 줄",
      "슬라이딩 윈도우 최댓값(Sliding Window Maximum)",
      "프린터의 인쇄 작업 대기열 처리"
    ],
    answer: 2,
    brief: "양쪽 끝 연산이 모두 필요한 응용 = 데크.",
    detailed: "데크(Deque, Double-Ended Queue)는 양쪽 끝에서 모두 삽입·삭제가 가능한 자료구조다. 슬라이딩 윈도우 최댓값처럼 양 끝에서 작업이 발생하는 경우에 적합하다. 응급실은 우선순위 큐, 은행·프린터는 일반 큐.",
    source: "7차시 § 5"
  },
  {
    id: "DS_S1Q30",
    set: 1,
    week: 7,
    topic: "우선순위 큐 구현법",
    type: "multiple_choice",
    difficulty: "medium",
    question: "우선순위 큐를 배열이나 단순 연결 리스트로 구현하지 않는 이유로 가장 적절한 것은?",
    choices: [
      "C 언어 표준에서 지원되지 않는 구조이기 때문",
      "삽입·삭제마다 전체를 탐색해야 해 효율이 낮기 때문",
      "메모리 사용량이 지나치게 많아지기 때문",
      "원소에 우선순위를 부여할 수 없기 때문"
    ],
    answer: 1,
    brief: "선형 자료는 우선순위 유지에 O(n) 필요.",
    detailed: "배열·리스트로는 삽입 위치 찾기 또는 최대/최소 찾기에 O(n)이 든다. 힙(Heap)으로 구현하면 둘 다 O(log n)으로 가능하다.",
    source: "7차시 § 6.3"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 2 — 족집게 집중 (Week 2:5 · 3:3 · 4:3 · 5:8 · 6:5 · 7:6 = 30)
// ═══════════════════════════════════════════════════════════════
export const set2 = [
  // ── 2차시 — 알고리즘 기초·빅오 ──
  {
    id: "DS_S2Q1", set: 2, week: 2, topic: "Worst Case", type: "multiple_choice", difficulty: "medium",
    question: "빅오 표기법이 일반적으로 어떤 경우를 분석하는 데 사용되는가?",
    choices: [
      "Best Case (최선)",
      "Average Case (평균)",
      "Worst Case (최악)",
      "Typical Case (통상)",
    ],
    answer: 2,
    brief: "빅오는 상한 = Worst Case.",
    detailed: "빅오는 상한(Upper Bound)이므로 Worst Case 분석에 쓰인다. 부등식의 등호가 성립하는 시점이 Worst Case다.",
    source: "2차시 § 6.1",
  },
  {
    id: "DS_S2Q2", set: 2, week: 2, topic: "빅오 종류", type: "multiple_choice", difficulty: "basic",
    question: "다음 시간 복잡도들을 효율적인(빠른) 순서대로 나열한 것으로 옳은 것은?",
    choices: [
      "O(1) < O(n) < O(log n) < O(n²)",
      "O(1) < O(log n) < O(n) < O(n log n) < O(n²)",
      "O(log n) < O(1) < O(n) < O(n²)",
      "O(1) < O(n²) < O(n log n) < O(n)",
    ],
    answer: 1,
    brief: "상수 < 로그 < 선형 < 로그선형 < 2차 …",
    detailed: "효율적인 순: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!).",
    source: "2차시 § 6.3",
  },
  {
    id: "DS_S2Q3",
    set: 2,
    week: 2,
    topic: "유효성 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "알고리즘 5조건 중 '유효성(Effectiveness)'의 의미로 가장 적절한 것은?",
    choices: [
      "각 명령어는 실제로 실행 가능한 연산이어야 한다",
      "출력은 외부로 반드시 1개 이상 산출되어야 한다",
      "각 명령어는 뜻이 모호함이 없어야 한다",
      "전체 절차가 유한 단계 안에 종료되어야 한다"
    ],
    answer: 0,
    brief: "유효성 = 실제로 실행 가능한 연산.",
    detailed: "유효성(Effectiveness)은 각 명령이 컴퓨터로 실제 수행 가능한 연산이어야 함을 뜻한다. 예를 들어 '0으로 나누기'는 정의상 모호하지 않더라도 실행 불가능하므로 유효성을 위반한다.",
    source: "2차시 § 2.2"
  },
  {
    id: "DS_S2Q4",
    set: 2,
    week: 2,
    topic: "입력/출력 조건",
    type: "multiple_choice",
    difficulty: "basic",
    question: "알고리즘 5조건 중 입력·출력에 대한 설명으로 옳은 것은?",
    choices: [
      "입력은 1개 이상이고, 출력은 0개 이상이어야 한다",
      "입력은 0개 이상이어도 되지만, 출력은 반드시 1개 이상이어야 한다",
      "입력과 출력 모두 항상 1개 이상이어야 한다",
      "입력과 출력 모두 0개라도 알고리즘이 성립한다"
    ],
    answer: 1,
    brief: "입력 0+, 출력 1+.",
    detailed: "입력은 외부에서 받지 않을 수도 있으므로 0개 이상이면 된다. 그러나 출력이 없으면 결과를 확인할 수 없으므로 반드시 1개 이상이어야 한다. 출력 없는 절차는 알고리즘으로 인정되지 않는다.",
    source: "2차시 § 2.2"
  },
  {
    id: "DS_S2Q5",
    set: 2,
    week: 2,
    topic: "빅오 부등식",
    type: "multiple_choice",
    difficulty: "medium",
    question: "f(n) = O(g(n))의 정의에서 \"어떤 양의 상수 c와 n₀가 존재하여 모든 n ≥ n₀에 대해 ___ 가 성립한다\"의 빈칸에 들어갈 식은?",
    choices: [
      "|f(n)| ≥ c · |g(n)|",
      "|f(n)| ≤ c · |g(n)|",
      "|f(n)| = c · |g(n)|",
      "f(n) < g(n) (상수 없이)"
    ],
    answer: 1,
    brief: "상한 정의: |f(n)| ≤ c·|g(n)|.",
    detailed: "빅오는 상한이므로 부등호 방향이 ≤ 다. ≥ 방향이면 빅 오메가(Ω, 하한). 등호일 때만 빅 세타(Θ).",
    source: "2차시 § 6.1"
  },

  // ── 3차시 — 순환 ──
  {
    id: "DS_S2Q6", set: 2, week: 3, topic: "factorial 결과", type: "multiple_choice", difficulty: "medium",
    question: "다음 순환 함수의 결과 factorial(4)는?\n```\nfactorial(n):\n  if n == 0: return 1\n  else: return n * factorial(n-1)\n```",
    choices: ["6", "12", "24", "120"],
    answer: 2,
    brief: "4×3×2×1 = 24.",
    detailed: "factorial(4) = 4 × factorial(3) = 4 × 6 = 24. 종료 조건 factorial(0) = 1.",
    source: "3차시 § 5.1",
  },
  {
    id: "DS_S2Q7",
    set: 2,
    week: 3,
    topic: "fib 중복 호출",
    type: "multiple_choice",
    difficulty: "hard",
    question: "순환 피보나치 fib(6) 계산 시, fib(0)이 호출되는 횟수는? (메모이제이션 없음)",
    choices: [
      "1회",
      "3회",
      "5회",
      "8회"
    ],
    answer: 2,
    brief: "fib(6)에서 fib(0)은 5회 호출.",
    detailed: "fib(0) 호출 횟수 점화식: C₀(n) = C₀(n-1) + C₀(n-2), C₀(0)=1, C₀(1)=0. 따라서 C₀(2)=1, C₀(3)=1, C₀(4)=2, C₀(5)=3, C₀(6)=5. 8회는 fib(1)의 호출 횟수(C₁(6)=8)와 헷갈리기 쉬운 함정이다. Binary Recursion의 중복 계산을 보여주는 대표 예시다.",
    source: "3차시 § 5.2"
  },
  {
    id: "DS_S2Q8", set: 2, week: 3, topic: "이진 검색 단계 수", type: "multiple_choice", difficulty: "medium",
    question: "크기 64인 정렬 배열에서 이진 검색으로 key를 찾을 때 최악의 비교 횟수는?",
    choices: ["6회", "7회", "8회", "64회"],
    answer: 0,
    brief: "log₂ 64 = 6.",
    detailed: "이진 검색 최악 비교 횟수는 ⌈log₂ n⌉. n=64 → log₂ 64 = 6. 매 단계 범위가 절반으로 줄어든다.",
    source: "3차시 § 5.3",
  },

  // ── 4차시 — 리스트 ADT ──
  {
    id: "DS_S2Q9", set: 2, week: 4, topic: "데이터 Shift 방향", type: "multiple_choice", difficulty: "medium",
    question: "정적 리스트에서 중간 위치에 원소를 삽입할 때 데이터 이동(Shift) 방향으로 옳은 것은?",
    choices: [
      "맨 앞에서부터 뒤로 한 칸씩 밀어준다",
      "맨 뒤에서부터 역순으로 한 칸씩 당겨준다",
      "이동 방향은 결과에 영향을 주지 않는다",
      "양쪽 끝에서 중앙으로 이동한다",
    ],
    answer: 1,
    brief: "반드시 뒤에서부터 역순으로.",
    detailed: "앞에서부터 밀면 덮어쓰기가 발생해 데이터가 사라진다. 반드시 맨 뒤 원소부터 한 칸씩 뒤로 당겨야 값이 보존된다.",
    source: "4차시 § 6.1",
  },
  {
    id: "DS_S2Q10", set: 2, week: 4, topic: "Call by Reference", type: "multiple_choice", difficulty: "medium",
    question: "Call by Reference(참조 호출)가 사용되는 대표적인 3가지 경우로 거리가 먼 것은?",
    choices: [
      "함수에 큰 데이터를 파라미터로 전달할 때",
      "연결 리스트의 삽입·삭제에서 링크 조작 시",
      "배열을 함수에 넘길 때 (1차원 배열 이름은 주소 상수)",
      "기본 자료형(int, char) 하나를 반환할 때",
    ],
    answer: 3,
    brief: "기본 자료형 하나는 값 호출로 충분.",
    detailed: "Call by Reference 3케이스: ① 함수 파라미터 복사 비용 절감 ② 연결 리스트 링크 조작 ③ 배열 전달. 기본 자료형 반환은 이에 해당하지 않는다.",
    source: "4차시 § 3",
  },
  {
    id: "DS_S2Q11",
    set: 2,
    week: 4,
    topic: "ADT 구성요소",
    type: "multiple_choice",
    difficulty: "medium",
    question: "ADT(추상 데이터 타입)의 구성요소로 일반적으로 명세에 포함되지 않는 것은?",
    choices: [
      "객체(Object)에 대한 정의",
      "연산(Operation)의 인터페이스 명세",
      "각 연산의 사전·사후 조건 명세",
      "메모리 상의 물리적 저장 형태"
    ],
    answer: 3,
    brief: "물리적 저장은 구현(How)이며 ADT 명세 대상이 아님.",
    detailed: "ADT는 객체·연산·각 연산의 사전·사후 조건만 정의한다. 메모리 상에서 어떤 자료구조로 저장되는지는 구현(자료구조)의 영역이며 ADT 명세에는 포함되지 않는다.",
    source: "4차시 § 4.1"
  },

  // ── 5차시 — 연결 리스트 (예고 영역) ──
  {
    id: "DS_S2Q12", set: 2, week: 5, topic: "이중 LL 삽입 4단계", type: "multiple_choice", difficulty: "hard",
    question: "이중 연결 리스트에서 before 뒤에 new_node를 삽입하는 4단계 중 올바른 순서는?",
    choices: [
      "① new_node->llink=before  ② new_node->rlink=before->rlink  ③ before->rlink->llink=new_node  ④ before->rlink=new_node",
      "① before->rlink=new_node  ② new_node->llink=before  ③ new_node->rlink=before->rlink  ④ before->rlink->llink=new_node",
      "① before->rlink->llink=new_node  ② before->rlink=new_node  ③ new_node->llink=before  ④ new_node->rlink=before->rlink",
      "① new_node->rlink=before  ② new_node->llink=before->rlink  ③ before->llink=new_node  ④ before->rlink->rlink=new_node",
    ],
    answer: 0,
    brief: "new_node의 양쪽 링크 먼저, before->rlink는 맨 마지막.",
    detailed: "①② new_node의 llink·rlink를 먼저 설정 → ③ before->rlink(아직 원래의 다음 노드)의 llink를 new_node로 갱신 → ④ 마지막으로 before->rlink를 new_node로 갱신. 순서를 바꾸면 포인터가 끊어진다.",
    source: "5차시 § 5.2",
  },
  {
    id: "DS_S2Q13",
    set: 2,
    week: 5,
    topic: "이중 LL 삭제",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이중 연결 리스트에서 removed 노드를 삭제할 때의 올바른 조작은?",
    choices: [
      "removed->llink->rlink = removed->rlink; removed->rlink->llink = removed->llink; free(removed);",
      "free(removed); removed->llink->rlink = removed->rlink; (해제 후 양옆 연결);",
      "removed->llink = NULL; removed->rlink = NULL; free(removed); (양옆 미연결);",
      "removed->llink->rlink = removed; removed->rlink->llink = removed; (자기 자신 가리킴);"
    ],
    answer: 0,
    brief: "양옆을 먼저 잇고 나서 free.",
    detailed: "삭제 전에 반드시 양옆 노드를 서로 연결한 뒤 free(removed)를 호출해야 한다. free 먼저 하면 포인터 역참조가 위험해진다.",
    source: "5차시 § 5.3"
  },
  {
    id: "DS_S2Q14", set: 2, week: 5, topic: "단순 LL 임의 접근·탐색", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트(Singly Linked List, head만 보유)에서 [i번째 노드의 인덱스 접근 (Indexed Access) / 키 탐색 (Search by Key)] 시간 복잡도로 옳은 것은?",
    choices: [
      "O(1) / O(1)",
      "O(1) / O(n)",
      "O(n) / O(n)",
      "O(log n) / O(n)",
    ],
    answer: 2,
    brief: "둘 다 head부터 순차 접근(Sequential Access) → O(n).",
    detailed: "단순 연결 리스트는 인덱스로 즉시 위치를 계산할 수 없어 i번째 노드를 찾으려면 head부터 한 칸씩 따라가는 순차 접근이 필요하다 → O(n). 키 탐색도 마찬가지로 head부터 선형으로 비교해야 하므로 O(n)이다. 배열의 인덱스 접근(Indexed Access) O(1)과 대조된다.",
    source: "5차시 § 3.5",
  },
  {
    id: "DS_S2Q15",
    set: 2,
    week: 5,
    topic: "단순 LL head 변경 케이스",
    type: "multiple_choice",
    difficulty: "medium",
    question: "단순 연결 리스트 연산에서 head 포인터가 변경되는 경우에 해당하지 않는 것은?",
    choices: [
      "빈 리스트에 최초 노드를 삽입할 때",
      "기존 리스트 맨 앞에 삽입할 때 (addFirst)",
      "리스트 중간에 새 노드를 삽입할 때",
      "리스트의 첫 번째 노드를 삭제할 때"
    ],
    answer: 2,
    brief: "중간 삽입만 head 불변.",
    detailed: "단순 연결 리스트(Singly Linked List)에서 head 변경 케이스: ① 빈 리스트 첫 삽입(NULL→new_node), ② addFirst(기존 첫 노드→new_node), ④ 첫 노드 삭제(head→link로 갱신). ③ 중간·끝 삽입은 기존 첫 노드가 그대로라 head 불변.",
    source: "5차시 § 3.2 / 3.4"
  },
  {
    id: "DS_S2Q16", set: 2, week: 5, topic: "LL 삽입 코드 식별", type: "multiple_choice", difficulty: "hard",
    question: "다음 코드 중 단순 연결 리스트에서 올바른 중간 삽입을 수행하는 것은?\n(A) `before->link = new_node; new_node->link = before->link;`\n(B) `new_node->link = before->link; before->link = new_node;`\n(C) `new_node->link = before; before = new_node;`\n(D) `before->link = new_node; new_node = before->link;`",
    choices: ["(A)", "(B)", "(C)", "(D)"],
    answer: 1,
    brief: "(B)가 올바름 — new_node 링크 먼저.",
    detailed: "(A)는 before->link가 먼저 바뀌어 다음 노드 주소를 잃는다. (B)만이 다음 노드 주소를 new_node에 먼저 복사한 뒤 before->link를 갱신해 안전하다.",
    source: "5차시 § 3.3",
  },
  {
    id: "DS_S2Q17",
    set: 2,
    week: 5,
    topic: "이중 LL 삽입 오류",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이중 연결 리스트 삽입에서 다음 순서로 코드를 작성했을 때 발생하는 문제는?\n```\n① before->rlink = new_node;\n② new_node->rlink = before->rlink;\n③ new_node->llink = before;\n④ before->rlink->llink = new_node;\n```",
    choices: [
      "오류 없이 처음부터 끝까지 정상적으로 동작한다",
      "②에서 new_node->rlink가 자기 자신을 가리키게 된다",
      "④에서 갱신 대상이 되는 llink가 NULL로 바뀐다",
      "③이 결과에 영향을 주지 않는 불필요한 연산이다"
    ],
    answer: 1,
    brief: "before->rlink를 먼저 바꿔 원래 다음 노드 주소 잃음.",
    detailed: "①에서 before->rlink = new_node로 갱신하면 원래 다음 노드 주소가 사라진다. ②에서 new_node->rlink = before->rlink는 자기 자신을 가리키는 셈. 반드시 new_node의 링크를 먼저 설정해야 한다.",
    source: "5차시 § 5.2"
  },
  {
    id: "DS_S2Q18", set: 2, week: 5, topic: "이중 LL addFirst", type: "multiple_choice", difficulty: "hard",
    question: "이중 연결 리스트에 addFirst(head 앞에 new_node 삽입)를 수행하는 4단계의 올바른 순서는? (head는 첫 노드를 가리킴, 비어있지 않다고 가정)",
    choices: [
      "① new_node->rlink = head  ② new_node->llink = NULL  ③ head->llink = new_node  ④ head = new_node",
      "① head = new_node  ② new_node->rlink = head  ③ new_node->llink = NULL  ④ head->llink = new_node",
      "① head->llink = new_node  ② head = new_node  ③ new_node->rlink = head  ④ new_node->llink = NULL",
      "① new_node->llink = head  ② new_node->rlink = head->rlink  ③ head->rlink = new_node  ④ head = new_node",
    ],
    answer: 0,
    brief: "new_node 양쪽 링크 → head의 llink → head 갱신.",
    detailed: "addFirst는 ① new_node->rlink로 기존 head 주소 보존 ② new_node->llink = NULL (맨 앞이므로) ③ 기존 head의 llink를 new_node로 ④ head = new_node로 head 갱신. ②와 ①의 순서는 무관하지만 ④ head 갱신은 반드시 ③ 이후여야 한다.",
    source: "5차시 § 5.2",
  },
  {
    id: "DS_S2Q19", set: 2, week: 5, topic: "빅오 매트릭스 — 이중 LL 삽입", type: "multiple_choice", difficulty: "medium",
    question: "이중 연결 리스트(Doubly Linked List, head만 보유)의 [add_first / add_last / 노드 p 뒤 삽입 / 노드 p 앞 삽입] 시간 복잡도로 옳은 것은? (노드 p의 주소는 주어졌다고 가정, tail 포인터 없음)",
    choices: [
      "O(1) / O(1) / O(1) / O(1)",
      "O(1) / O(n) / O(1) / O(1)",
      "O(n) / O(n) / O(1) / O(1)",
      "O(1) / O(n) / O(n) / O(n)",
    ],
    answer: 1,
    brief: "양방향 링크 덕분에 p 앞 삽입도 O(1).",
    detailed: "이중 연결 리스트는 각 노드가 llink·rlink를 모두 가진다. add_first는 head 앞에 끼우면 되어 O(1). add_last는 tail 포인터가 없으므로 끝까지 순차 접근 → O(n). 노드 p가 주어졌을 때 p 뒤 삽입은 양쪽 링크만 갱신해 O(1). p 앞 삽입도 p->llink로 선행 노드에 즉시 도달할 수 있어 O(1) — 이 점이 단순 연결 리스트와의 결정적 차이다.",
    source: "5차시 § 5 / 시간복잡도 매트릭스",
  },

  // ── 6차시 — 스택·수식 (예고 영역) ──
  {
    id: "DS_S2Q20", set: 2, week: 6, topic: "Infix→Postfix", type: "multiple_choice", difficulty: "medium",
    question: "중위 표기식 `A / B * (C + D) + E`의 후위 표기식은?",
    choices: [
      "A B / C D + * E +",
      "A B C D + / * E +",
      "A B / C + D * E +",
      "A B C + D / * E +",
    ],
    answer: 0,
    brief: "((A/B)*(C+D))+E → A B / C D + * E +.",
    detailed: "괄호 → (((A/B)*(C+D))+E) → 각 연산자를 오른쪽 괄호 밖으로 빼면 A B / C D + * E +.",
    source: "6차시 § 5.2",
  },
  {
    id: "DS_S2Q21", set: 2, week: 6, topic: "후위식 계산", type: "multiple_choice", difficulty: "medium",
    question: "후위 표기식 `6 2 / 3 - 4 2 * +`를 계산한 결과는?",
    choices: ["0", "4", "8", "12"],
    answer: 2,
    brief: "((6/2)-3)+(4*2) = 0+8 = 8.",
    detailed: "6,2 → / → 3, 3 PUSH → - → 0, 4,2 → * → 8, + → 0+8=8.",
    source: "6차시 § 7.3",
  },
  {
    id: "DS_S2Q22",
    set: 2,
    week: 6,
    topic: "중첩 괄호",
    type: "multiple_choice",
    difficulty: "hard",
    question: "중위→후위 변환 시 `(` 가 두 번 연속 들어오는 중첩 괄호는 어떻게 처리되는가?",
    choices: [
      "두 번째 여는 괄호 `(`는 그냥 무시되고 버려진다",
      "두 번째 `(`도 icp가 가장 높으므로 그대로 PUSH된다",
      "괄호가 중첩되어 변환 알고리즘 자체가 실패한다",
      "두 번째 여는 괄호 `(`는 들어오자마자 즉시 POP된다"
    ],
    answer: 1,
    brief: "`(`의 icp는 항상 최고, 그대로 쌓임.",
    detailed: "`(`는 들어올 때 icp가 최고이므로 무조건 PUSH된다. 스택 안에서는 isp가 최저라 그 위에 다른 연산자도 쌓인다. `)`를 만나면 가장 가까운 `(`까지만 POP한다.",
    source: "6차시 § 6.3"
  },
  {
    id: "DS_S2Q23", set: 2, week: 6, topic: "후위식 트레이싱", type: "multiple_choice", difficulty: "hard",
    question: "후위 표기식 `A B + C * D -` 를 계산할 때, 5번째 토큰 `*`을 처리하고 난 직후 스택의 상태(아래→위)는? (피연산자는 그 자체 값이라 가정)",
    choices: [
      "[A]",
      "[(A+B)]",
      "[(A+B)*C]",
      "[(A+B), C]",
    ],
    answer: 2,
    brief: "+ 처리 후 (A+B), * 처리 후 (A+B)*C.",
    detailed: "토큰 순서: A(1) 푸시 → [A]. B(2) 푸시 → [A, B]. +(3) 처리 → POP 두 번 후 (A+B) PUSH → [(A+B)]. C(4) 푸시 → [(A+B), C]. *(5) 처리 → POP 두 번 후 (A+B)*C PUSH → [(A+B)*C]. 5번째 토큰(`*`) 처리 직후이므로 [(A+B)*C].",
    source: "6차시 § 7",
  },
  {
    id: "DS_S2Q24", set: 2, week: 6, topic: "isp/icp 표", type: "multiple_choice", difficulty: "hard",
    question: "스택을 이용한 중위→후위 변환에서 다음 isp/icp 우선순위 표 중 올바른 것은? (값이 클수록 높은 우선순위)",
    choices: [
      "`(`: icp=0, isp=0    `+ -`: icp=1, isp=1    `* /`: icp=2, isp=2",
      "`(`: icp=3, isp=0    `* /`: icp=2, isp=2    `+ -`: icp=1, isp=1",
      "`(`: icp=0, isp=3    `+ -`: icp=2, isp=1    `* /`: icp=1, isp=2",
      "`(`: icp=2, isp=2    `+ -`: icp=2, isp=2    `* /`: icp=2, isp=2",
    ],
    answer: 1,
    brief: "`(`만 icp=최고, isp=최저. 나머지는 icp=isp.",
    detailed: "isp(In-Stack)와 icp(Incoming) 모두 `* /` > `+ -`. `(`만 들어올 때(icp=3) 최고, 들어간 후(isp=0) 최저로 두 값이 달라야 중첩 괄호가 자동 처리된다. 나머지 연산자는 icp=isp로 두면 좌결합성(같은 우선순위는 왼쪽부터)이 자연스럽게 구현된다.",
    source: "6차시 § 6.2~6.3",
  },

  // ── 7차시 — 큐·데크·우선순위 큐 (예고 영역) ──
  {
    id: "DS_S2Q25",
    set: 2,
    week: 7,
    topic: "원형 큐 Empty 재확인",
    type: "multiple_choice",
    difficulty: "basic",
    question: "초기 front = 0, rear = 0인 원형 큐의 Empty 상태를 판정하는 조건으로 옳은 것은?",
    choices: [
      "front 값이 -1 인 상태로 초기화되어 있을 때 비어 있다",
      "front 값과 rear 값이 서로 같은 상태일 때 비어 있다",
      "(rear + 1) % MAX_SIZE 가 front 와 같을 때 비어 있다",
      "rear 값이 0 인 상태로 초기화되어 있을 때 비어 있다"
    ],
    answer: 1,
    brief: "Empty: front == rear.",
    detailed: "원형 큐에서 Empty는 front == rear로 판정한다. 초기값 0,0도 이 조건을 만족한다.",
    source: "7차시 § 3.2"
  },
  {
    id: "DS_S2Q26",
    set: 2,
    week: 7,
    topic: "원형 큐 Full 재확인",
    type: "multiple_choice",
    difficulty: "medium",
    question: "원형 큐의 Full 상태를 판정하는 조건으로 옳은 것은? (MAX_SIZE = 6)",
    choices: [
      "rear == 5 인 상태가 되었을 때 가득 찬다",
      "front == 0 이고 rear == 5 일 때 가득 찬다",
      "(rear + 1) % 6 == front 일 때 가득 찬다",
      "rear - front == 6 인 상태일 때 가득 찬다"
    ],
    answer: 2,
    brief: "Full: (rear+1) % MAX == front.",
    detailed: "원형 큐는 Empty와 Full 구분을 위해 한 칸을 비워둔다. Full은 rear의 다음 위치가 front일 때 성립: (rear+1) % MAX_SIZE == front.",
    source: "7차시 § 3.2"
  },
  {
    id: "DS_S2Q27",
    set: 2,
    week: 7,
    topic: "한 칸 비우기",
    type: "multiple_choice",
    difficulty: "medium",
    question: "원형 큐가 MAX_SIZE 크기 배열에서 실제 저장 가능한 최대 원소 수와 그 이유는?",
    choices: [
      "MAX_SIZE 개, 별도의 저장 제약이 전혀 없기 때문",
      "MAX_SIZE - 1 개, Empty·Full 구분 위해 한 칸 비움",
      "MAX_SIZE / 2 개, 효율을 위해 절반만 쓰기 때문",
      "가변, rear와 front 값에 따라 매번 달라지기 때문"
    ],
    answer: 1,
    brief: "한 칸 비워 Empty·Full 구분.",
    detailed: "한 칸 비우지 않으면 가득 찼을 때와 비었을 때 모두 front == rear가 되어 구분 불가능하다. 따라서 최대 저장 수는 MAX_SIZE - 1.",
    source: "7차시 § 3.2"
  },
  {
    id: "DS_S2Q28", set: 2, week: 7, topic: "INQ/DQ 시퀀스", type: "multiple_choice", difficulty: "medium",
    question: "초기 front = 0, rear = 0인 크기 6의 원형 큐에 대해 다음 연산을 순서대로 수행한 뒤의 front, rear 값은?\n`INQ(A), INQ(B), INQ(C), DQ, INQ(D), DQ`",
    choices: [
      "front = 1, rear = 3",
      "front = 2, rear = 4",
      "front = 3, rear = 4",
      "front = 0, rear = 4",
    ],
    answer: 1,
    brief: "INQ 4회 → rear=4, DQ 2회 → front=2.",
    detailed: "INQ는 rear를 1 증가(mod MAX), DQ는 front를 1 증가. INQ 4회: rear 0→4. DQ 2회: front 0→2. 최종 front=2, rear=4. 큐 내부는 [C, D].",
    source: "7차시 § 8",
  },
  {
    id: "DS_S2Q29",
    set: 2,
    week: 7,
    topic: "선형 큐 Dequeue O(n)",
    type: "multiple_choice",
    difficulty: "medium",
    question: "선형 큐(Linear Queue, 배열 기반)에서 front를 항상 0으로 유지하는 단순 구현일 때, Dequeue 연산 후 데이터 정렬을 수행한다면 평균 시간 복잡도는? (그리고 그 이유)",
    choices: [
      "O(1) — front 인덱스만 1 증가시키면 되기 때문",
      "O(log n) — 내부적으로 이진 탐색을 사용하기 때문",
      "O(n) — Dequeue 후 남은 원소를 한 칸씩 앞으로 당겨야 함",
      "O(n²) — 매번 큐 전체를 처음부터 정렬해야 하기 때문"
    ],
    answer: 2,
    brief: "front=0 고정 시 Dequeue마다 전체 Shift → O(n).",
    detailed: "front를 0으로 고정하는 단순 선형 큐는 Dequeue 시 큐 안의 남은 원소를 모두 한 칸씩 앞으로 당겨야 해서 평균 O(n)이다. 이를 해결하기 위해 front 인덱스를 함께 움직이는 방식이 등장했고, 그 끝이 원형 큐다.",
    source: "7차시 § 2.2"
  },
  {
    id: "DS_S2Q30",
    set: 2,
    week: 7,
    topic: "빅오 매트릭스 종합",
    type: "multiple_choice",
    difficulty: "hard",
    question: "다음 중 자료구조와 [인덱스 접근(Indexed Access) / 키 탐색(Search by Key) / 삽입 / 삭제] 시간 복잡도 매칭으로 잘못된 것은?",
    choices: [
      "정적 배열 (비정렬, 중간 위치 삽입·삭제, 4연산 기준): O(1) / O(n) / O(n) / O(n)",
      "단순 연결 리스트 (Singly Linked List, 인덱스 접근, add_last 기준): O(n) / O(n) / O(n) / O(n)",
      "이중 원형 연결 리스트 (Doubly Circular Linked List, 양 끝, 노드 주어짐): O(n) / O(n) / O(1) / O(1)",
      "원형 큐 (배열 기반, 양 끝 rear·front 연산, 4연산 기준): O(1) / O(1) / O(1) / O(1)"
    ],
    answer: 3,
    brief: "원형 큐는 키 탐색이 O(n) — O(1)이 아님.",
    detailed: "원형 큐는 양 끝(rear/front) 연산은 O(1)이지만 키 탐색은 큐 전체를 순차 접근해야 하므로 O(n)이다. 따라서 [인덱스 접근/키 탐색/Enqueue/Dequeue] = O(1)/O(n)/O(1)/O(1)이 맞다.",
    source: "시간복잡도 매트릭스 종합"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 3 — 코드 추적·변별 (Week 2:5 · 3:4 · 4:2 · 5:6 · 6:7 · 7:6 = 30)
// ═══════════════════════════════════════════════════════════════
export const set3 = [
  // ── 2차시 ──
  {
    id: "DS_S3Q1", set: 3, week: 2, topic: "빅오 계산", type: "multiple_choice", difficulty: "medium",
    question: "T(n) = 5 × 2ⁿ + 3n²의 빅오 표기로 가장 적절한(타이트한) 것은?",
    choices: ["O(n)", "O(n²)", "O(2ⁿ)", "O(log n)"],
    answer: 2,
    brief: "지수 항이 다항 항을 압도 → O(2ⁿ).",
    detailed: "최고차 항 식별: 2ⁿ vs n². 지수 항 2ⁿ이 다항 n²을 압도적으로 빠르게 증가시키므로 최고차 항은 2ⁿ. 계수 5 제거 → O(2ⁿ). O(n²)·O(n)·O(log n)은 모두 2ⁿ보다 느리게 증가하므로 상한이 될 수 없음.",
    source: "2차시 § 6.1",
  },
  {
    id: "DS_S3Q2", set: 3, week: 2, topic: "Polynomial vs Exponential", type: "multiple_choice", difficulty: "medium",
    question: "컴퓨터로 일반적으로 해결 가능한(Polynomial) 복잡도 범위에 해당하지 않는 것은?",
    choices: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"],
    answer: 3,
    brief: "O(2ⁿ)는 지수형(Exponential).",
    detailed: "다항식(Polynomial) 범위는 O(1) ~ O(n³) (느슨하게 O(n⁴)까지)로 해결 가능하다. O(2ⁿ), O(n!)은 지수·팩토리얼형으로 해결이 비효율적이다.",
    source: "2차시 § 6.4",
  },
  {
    id: "DS_S3Q3",
    set: 3,
    week: 2,
    topic: "Big-Ω",
    type: "multiple_choice",
    difficulty: "hard",
    question: "빅 오메가(Big-Ω) 표기법이 나타내는 것은?",
    choices: [
      "상한(Upper Bound) — 최악의 경우(Worst Case)",
      "하한(Lower Bound) — 최선의 경우(Best Case)",
      "상한과 하한이 일치할 때의 평균(Average Case)",
      "입력과 무관한 고정 복잡도(Constant)"
    ],
    answer: 1,
    brief: "Ω는 하한 = Best Case.",
    detailed: "빅오(O)는 상한, 빅 오메가(Ω)는 하한(Best Case), 빅 세타(Θ)는 상한과 하한이 일치할 때 쓴다.",
    source: "2차시 § 6.2"
  },
  {
    id: "DS_S3Q4", set: 3, week: 2, topic: "순차 탐색 복잡도", type: "multiple_choice", difficulty: "medium",
    question: "정렬되지 않은 n개의 원소에서 key를 순차 탐색할 때 Best Case와 Worst Case의 시간 복잡도로 옳은 것은?",
    choices: [
      "Best: O(1), Worst: O(n)",
      "Best: O(log n), Worst: O(n)",
      "Best: O(n), Worst: O(n²)",
      "Best: O(1), Worst: O(log n)",
    ],
    answer: 0,
    brief: "Best는 첫 원소, Worst는 n번 비교.",
    detailed: "Best Case는 key가 첫 원소인 경우 1번 비교 → O(1). Worst Case는 key가 마지막이거나 없는 경우 n번 비교 → O(n).",
    source: "2차시 § 8",
  },
  {
    id: "DS_S3Q5", set: 3, week: 2, topic: "추상화", type: "multiple_choice", difficulty: "medium",
    question: "프로그래밍에서 '추상화(Abstraction)'에 대한 설명으로 옳지 않은 것은?",
    choices: [
      "복잡한 시스템에서 불필요한 세부사항을 숨기고 본질만 노출하는 기법이다",
      "ADT는 자료의 추상화 사례로, 사용자에게는 인터페이스만 노출한다",
      "추상화의 목적은 메모리 사용량을 절감하는 것이다",
      "추상화는 모듈 간 결합도를 낮추고 응집도를 높이는 데 기여한다",
    ],
    answer: 2,
    brief: "메모리 절감은 추상화의 목적이 아님.",
    detailed: "추상화의 목적은 복잡도 관리·재사용성·유지보수성 향상이다. 메모리 절감은 부수적 효과일 수는 있어도 본래 목적이 아니다. 오히려 캡슐화·간접 호출로 약간의 오버헤드가 생길 수 있다.",
    source: "4차시 § 4.1",
  },

  // ── 3차시 ──
  {
    id: "DS_S3Q6", set: 3, week: 3, topic: "피보나치 복잡도", type: "multiple_choice", difficulty: "hard",
    question: "순환만으로 구현한 피보나치 fib(n)의 시간 복잡도는?",
    choices: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    answer: 3,
    brief: "Binary Recursion — 호출마다 2번 재귀.",
    detailed: "fib(n) = fib(n-1) + fib(n-2)로 매 호출마다 자기 자신을 2번 부르기 때문에 호출 수가 2ⁿ로 증가한다. 메모이제이션 없이는 O(2ⁿ).",
    source: "3차시 § 5.2",
  },
  {
    id: "DS_S3Q7",
    set: 3,
    week: 3,
    topic: "순환 vs 반복",
    type: "multiple_choice",
    difficulty: "medium",
    question: "순환(Recursion)과 반복(Iteration)의 비교 중 옳지 않은 것은?",
    choices: [
      "순환은 함수 호출마다 스택 오버헤드가 있다",
      "반복은 종료 조건 대신 제어 변수를 사용한다",
      "순환은 오버헤드가 없어 항상 반복보다 빠르다",
      "종료 조건이 없으면 순환은 스택 오버플로를 부른다"
    ],
    answer: 2,
    brief: "순환은 오버헤드로 일반적으로 느림.",
    detailed: "순환은 함수 호출마다 Stack Frame이 쌓여 오버헤드가 발생한다. 일반적으로 반복이 더 빠르며, 순환은 구조적 장점(직관성)이 크다.",
    source: "3차시 § 6"
  },
  {
    id: "DS_S3Q8",
    set: 3,
    week: 3,
    topic: "Stack Overflow 원인",
    type: "multiple_choice",
    difficulty: "medium",
    question: "순환 함수에서 Stack Overflow가 발생하는 주된 원인은?",
    choices: [
      "매개변수의 개수가 스택 한도를 초과해서",
      "종료 조건(Base Case)이 없어 무한 재귀에 빠져서",
      "반환값의 자료형 크기가 너무 커서 넘쳐서",
      "지역 변수 선언이 너무 많아 누적되어서"
    ],
    answer: 1,
    brief: "Base Case 누락 → 무한 재귀 → Stack Overflow.",
    detailed: "재귀 호출마다 Stack Frame이 쌓이는데, 종료 조건이 없으면 무한히 쌓여 Stack 영역을 초과하며 Segmentation Fault가 발생한다.",
    source: "3차시 § 2.1"
  },
  {
    id: "DS_S3Q9",
    set: 3,
    week: 3,
    topic: "순환 4형태 매칭",
    type: "multiple_choice",
    difficulty: "hard",
    question: "다음 중 Non-tail Recursion(비꼬리 순환)에 해당하는 예시는?",
    choices: [
      "이진 검색처럼 분할 후 한 번만 재귀하는 형태",
      "팩토리얼 `return n * factorial(n-1)` 형태",
      "누적 인자로 결과를 넘겨 합산하는 재귀 형태",
      "while 루프로 변환해 재귀를 없앤 반복문 형태"
    ],
    answer: 1,
    brief: "factorial은 호출 후 곱셈 필요 → Non-tail.",
    detailed: "팩토리얼은 factorial(n-1)을 호출한 뒤 n과 곱하는 연산이 남아 있으므로 Non-tail. 이진 검색은 재귀 호출이 마지막 문장이라 Tail. 누적 인자로 결과를 넘기는 합계 재귀도 호출이 마지막이라 Tail.",
    source: "3차시 § 3"
  },

  // ── 4차시 ──
  {
    id: "DS_S3Q10", set: 3, week: 4, topic: "정적 삽입 순서", type: "multiple_choice", difficulty: "hard",
    question: "정적 리스트 [A, B, C, D, E] (length=5) 의 position=2에 X를 삽입하려 한다. 데이터 이동 순서로 올바른 것은?",
    choices: [
      "E → D → C 각각 한 칸 뒤로, 그 후 position=2에 X 삽입",
      "C → D → E 각각 한 칸 뒤로, 그 후 position=2에 X 삽입",
      "A → B → C → D → E 전체를 한 칸 뒤로 이동",
      "position=2부터 끝까지 값을 모두 X로 복제한 뒤 원본을 한 칸씩 앞으로",
    ],
    answer: 0,
    brief: "맨 뒤에서부터 역순 이동.",
    detailed: "앞에서 밀면 덮어쓰기가 발생하므로 반드시 맨 뒤(E)부터 역순으로 한 칸씩 당긴다. E→index 5, D→index 4, C→index 3, 빈 2에 X 삽입.",
    source: "4차시 § 6.1",
  },
  {
    id: "DS_S3Q11",
    set: 3,
    week: 4,
    topic: "Call by Value vs Reference",
    type: "multiple_choice",
    difficulty: "medium",
    question: "함수에 큰 구조체를 인자로 전달할 때 Call by Reference가 Call by Value보다 유리한 이유는?",
    choices: [
      "함수 호출 코드가 한결 더 간결해지기 때문",
      "구조체를 복사하지 않고 주소만 넘겨 복사 비용을 없애기 때문",
      "함수 호출 스택의 깊이를 줄일 수 있기 때문",
      "전체 컴파일 시간이 크게 단축되기 때문"
    ],
    answer: 1,
    brief: "복사 비용 제거.",
    detailed: "Call by Value는 인자 전체를 복사해 지역 변수로 만들어 큰 구조체에서는 비용이 크다. 주소만 전달하는 Call by Reference는 8바이트(64비트) 포인터만 복사하면 된다.",
    source: "4차시 § 3"
  },

  // ── 5차시 ──
  {
    id: "DS_S3Q12",
    set: 3,
    week: 5,
    topic: "이중 LL 장단점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이중 연결 리스트(Doubly Linked List)의 단점으로 가장 적절한 것은?",
    choices: [
      "삽입·삭제 시 데이터 이동이 많아 느리다",
      "노드마다 포인터 두 개를 둬 메모리를 더 쓴다",
      "역방향 탐색이 원천적으로 불가능하다",
      "임의 인덱스 접근이 O(1)로 처리된다"
    ],
    answer: 1,
    brief: "포인터 2개 = 메모리 추가 사용.",
    detailed: "이중 연결 리스트는 각 노드에 llink와 rlink 두 개의 포인터를 두므로 단순 연결 리스트보다 노드당 4~8바이트 추가 메모리를 쓴다. 대신 역방향 탐색 O(1).",
    source: "5차시 § 5.1"
  },
  {
    id: "DS_S3Q13",
    set: 3,
    week: 5,
    topic: "이중 LL 삽입 원칙",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이중 연결 리스트 삽입의 4줄 코드 중, new_node의 두 링크 필드(llink·rlink)를 설정하는 두 줄로 올바른 것은?",
    choices: [
      "before->rlink = new_node; before->rlink->llink = new_node;",
      "new_node->llink = before; new_node->rlink = before->rlink;",
      "new_node->rlink = new_node; new_node->llink = new_node;",
      "before->llink = new_node; new_node->rlink = before;"
    ],
    answer: 1,
    brief: "new_node의 llink와 rlink 둘 다 먼저 설정.",
    detailed: "new_node의 llink·rlink를 먼저 설정해야 before->rlink(원래 다음 노드)의 주소가 new_node에 안전하게 복사된 뒤, 이후 단계에서 before->rlink를 덮어써도 다음 노드 참조가 살아있다. `new_node->llink = before; new_node->rlink = before->rlink;`만 new_node의 두 링크를 다른 노드 변경 없이 정확히 설정한다.",
    source: "5차시 § 5.2"
  },
  {
    id: "DS_S3Q14",
    set: 3,
    week: 5,
    topic: "free 위치",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이중 연결 리스트에서 removed 노드 삭제 시, free(removed)를 가장 마지막에 호출해야 하는 이유로 적절한 것은?",
    choices: [
      "컴파일러의 명령어 최적화 순서를 보장하기 위해서",
      "free 직후 removed->llink·rlink 역참조 위험 때문에",
      "free는 함수 종료 직전에만 호출 가능하기 때문에",
      "free 호출 시 인접 노드도 함께 해제되기 때문에"
    ],
    answer: 1,
    brief: "free 후 포인터 역참조는 위험.",
    detailed: "free(removed) 후 removed가 가리키던 메모리는 유효하지 않아, 이후 removed->llink·rlink 접근은 정의되지 않은 동작. 먼저 양옆 재연결 후 free.",
    source: "5차시 § 5.3"
  },
  {
    id: "DS_S3Q15",
    set: 3,
    week: 5,
    topic: "이중 LL 삭제 순서",
    type: "multiple_choice",
    difficulty: "hard",
    question: "이중 연결 리스트에서 removed 노드를 삭제하는 올바른 순서의 코드는?",
    choices: [
      "free(removed); removed->llink->rlink = removed->rlink; removed->rlink->llink = removed->llink;",
      "removed->llink->rlink = removed->rlink; removed->rlink->llink = removed->llink; free(removed);",
      "removed->llink = NULL; removed->rlink = NULL; free(removed);",
      "removed->rlink = removed->llink; free(removed);"
    ],
    answer: 1,
    brief: "양옆 재연결 → free.",
    detailed: "반드시 removed의 양옆 노드를 서로 연결한 뒤 free를 호출한다. free를 먼저 하면 이후 removed->llink 등 역참조가 위험하다.",
    source: "5차시 § 5.3"
  },
  {
    id: "DS_S3Q16", set: 3, week: 5, topic: "LL 빈칸 — 삭제 코드", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트의 중간 노드 삭제 코드의 빈칸 ___ 에 들어갈 표현으로 옳은 것은?\n```\n// prev: removed의 이전 노드, removed: 삭제할 노드\nprev->link = ___ ;\nfree(removed);\n```",
    choices: [
      "prev",
      "removed",
      "removed->link",
      "NULL",
    ],
    answer: 2,
    brief: "removed를 건너뛰어 그 다음 노드로 연결.",
    detailed: "삭제는 removed의 다음 노드(removed->link)를 prev->link에 연결하면 된다. 그 후 free(removed)로 메모리 반환. removed나 NULL을 넣으면 리스트가 끊어진다.",
    source: "5차시 § 3.4",
  },
  {
    id: "DS_S3Q17", set: 3, week: 5, topic: "LL 빈칸 — 검색", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트에서 키가 key와 일치하는 노드를 찾는 함수의 루프 종료 조건으로 가장 적절한 것은?\n```\nNode *p = head;\nwhile ( ___ ) {\n  p = p->link;\n}\nreturn p;  // 못 찾으면 NULL 반환\n```",
    choices: [
      "p != NULL",
      "p->link != NULL",
      "p != NULL && p->data != key",
      "p->data == key",
    ],
    answer: 2,
    brief: "두 조건: 끝에 도달했거나 키를 찾았으면 종료.",
    detailed: "리스트 끝(p == NULL)이나 키 발견(p->data == key) 어느 쪽이든 루프를 빠져나와야 한다. p != NULL을 먼저 체크해야 NULL 역참조를 피할 수 있다(단락 평가).",
    source: "5차시 § 3.5",
  },

  // ── 6차시 ──
  {
    id: "DS_S3Q18",
    set: 3,
    week: 6,
    topic: "icp vs isp",
    type: "multiple_choice",
    difficulty: "hard",
    question: "스택을 이용한 중위→후위 변환에서 새 연산자의 우선순위(icp)가 스택 top 연산자의 우선순위(isp)와 같을 때의 처리는?",
    choices: [
      "새 연산자를 곧바로 스택에 PUSH한다",
      "top 연산자를 POP·출력한 뒤 새 연산자를 PUSH한다",
      "처리를 건너뛰고 다음 입력 토큰으로 넘어간다",
      "스택을 모두 비운 뒤 처음부터 다시 시작한다"
    ],
    answer: 1,
    brief: "isp ≥ icp면 POP 먼저.",
    detailed: "isp < icp면 PUSH, isp ≥ icp면 조건을 만족할 때까지 POP 후 출력, 그 다음 새 연산자 PUSH. 같을 때도 PUSH가 아니라 POP 먼저다.",
    source: "6차시 § 6.2"
  },
  {
    id: "DS_S3Q19", set: 3, week: 6, topic: "Infix→Postfix", type: "multiple_choice", difficulty: "hard",
    question: "중위 표기식 `(A + B) * C - D / E`의 후위 표기식은?",
    choices: [
      "A B + C * D E / -",
      "A B + C D / * E -",
      "A B C + * D E / -",
      "A + B C * D / E -",
    ],
    answer: 0,
    brief: "((A+B)*C) - (D/E).",
    detailed: "((A+B)*C) → A B + C *. (D/E) → D E /. 최종 `-`로 연결 → A B + C * D E / -.",
    source: "6차시 § 5.2",
  },
  {
    id: "DS_S3Q20", set: 3, week: 6, topic: "후위식 계산", type: "multiple_choice", difficulty: "hard",
    question: "후위 표기식 `5 1 2 + 4 * + 3 -`를 계산한 결과는?",
    choices: ["10", "14", "16", "17"],
    answer: 1,
    brief: "5 + ((1+2)×4) - 3 = 5+12-3 = 14.",
    detailed: "1,2 → + → 3, 3,4 → * → 12, 5,12 → + → 17, 17,3 → - → 14.",
    source: "6차시 § 7.3",
  },
  {
    id: "DS_S3Q21", set: 3, week: 6, topic: "후위식 op 순서", type: "multiple_choice", difficulty: "hard",
    question: "후위식 `6 2 /`를 계산할 때, 연산자 `/`를 만나 스택에서 2개를 POP한다고 하자. 첫 번째 POP 값과 두 번째 POP 값, 그리고 계산 결과로 옳은 것은?",
    choices: [
      "첫 POP=6, 두번째 POP=2, 결과=6/2=3",
      "첫 POP=2, 두번째 POP=6, 결과=6/2=3",
      "첫 POP=2, 두번째 POP=6, 결과=2/6",
      "첫 POP=6, 두번째 POP=2, 결과=2/6",
    ],
    answer: 1,
    brief: "먼저 POP=op2, 나중 POP=op1, op1 연산 op2.",
    detailed: "스택이 [6, 2] 상태에서 POP은 2 먼저, 6 나중. op2=2, op1=6, 계산은 op1/op2 = 6/2 = 3. 순서가 반대면 나눗셈·뺄셈 결과가 달라진다.",
    source: "6차시 § 7",
  },
  {
    id: "DS_S3Q22", set: 3, week: 6, topic: "Infix→Postfix 복합", type: "multiple_choice", difficulty: "hard",
    question: "중위 표기식 `((A / B) + C) - (D * E)`의 후위 표기식은?",
    choices: [
      "A B / C + D E * -",
      "A B C / + D E * -",
      "A / B C + D E * -",
      "A B / + C D E * -",
    ],
    answer: 0,
    brief: "안쪽 괄호부터 변환.",
    detailed: "(A/B) → A B /, +C → A B / C +, (D*E) → D E *, 최종 - → A B / C + D E * -.",
    source: "6차시 § 5.2",
  },
  {
    id: "DS_S3Q23", set: 3, week: 6, topic: "괄호 icp/isp", type: "multiple_choice", difficulty: "hard",
    question: "여는 괄호 `(` 의 icp(Incoming Precedence)와 isp(In-Stack Precedence) 관계로 옳은 것은?",
    choices: [
      "icp는 가장 높고, isp도 가장 높다",
      "icp는 가장 높고, isp는 가장 낮다",
      "icp는 가장 낮고, isp도 가장 낮다",
      "둘 다 다른 연산자와 동일하다",
    ],
    answer: 1,
    brief: "`(` 들어올 때 최고, 들어간 뒤 최저.",
    detailed: "`(`는 들어올 때 icp가 가장 높아 무조건 PUSH되지만, 스택 안에서는 isp가 가장 낮아져 다음 연산자가 그 위로 쌓이도록 한다. 이 이중 성질이 중첩 괄호를 기계적으로 처리하게 한다.",
    source: "6차시 § 6.3",
  },
  {
    id: "DS_S3Q24", set: 3, week: 6, topic: "후위→중위 역변환", type: "multiple_choice", difficulty: "medium",
    question: "후위 표기식 `A B C * +` 를 중위 표기식으로 옳게 변환한 것은?",
    choices: [
      "A + B + C",
      "(A + B) * C",
      "A + (B * C)",
      "A * B + C",
    ],
    answer: 2,
    brief: "B C * 먼저 → A + (B*C).",
    detailed: "후위식을 스택으로 따라가면 A 푸시 → [A], B 푸시 → [A, B], C 푸시 → [A, B, C], * 처리 → POP 두 번 후 (B*C) PUSH → [A, (B*C)], + 처리 → POP 두 번 후 (A+(B*C)) PUSH. 결과: A + (B*C).",
    source: "6차시 § 5",
  },

  // ── 7차시 ──
  {
    id: "DS_S3Q25",
    set: 3,
    week: 7,
    topic: "선형 큐 가짜 포화",
    type: "multiple_choice",
    difficulty: "medium",
    question: "선형 큐(Linear Queue)에서 발생하는 '가짜 포화 상태(False Full)'란?",
    choices: [
      "큐가 실제로 가득 차 더는 삽입할 수 없는 상태",
      "rear는 끝에 닿았지만 앞쪽에 빈 공간이 남은 상태",
      "front와 rear가 같은 위치를 가리키는 상태",
      "배열 전체가 null 포인터로 채워진 상태"
    ],
    answer: 1,
    brief: "뒤는 꽉, 앞은 비어있는 상태.",
    detailed: "선형 큐에서는 Dequeue 후 빈 앞 공간을 재사용하지 못하고 rear만 전진해 결국 rear가 끝에 도달하면 앞에 공간이 있어도 삽입 불가. 이를 해결한 것이 원형 큐.",
    source: "7차시 § 2.2"
  },
  {
    id: "DS_S3Q26",
    set: 3,
    week: 7,
    topic: "원형 큐 front > rear",
    type: "multiple_choice",
    difficulty: "medium",
    question: "원형 큐에서 front가 rear보다 큰 값을 가질 수 있는가?",
    choices: [
      "불가능하다 — 언제나 rear가 front 이상이다",
      "가능하다 — mod 순환으로 rear가 앞쪽으로 래핑되기 때문",
      "오직 큐가 비어 있는 Empty 상태에서만 가능하다",
      "오직 MAX_SIZE가 홀수로 설정된 경우에만 가능하다"
    ],
    answer: 1,
    brief: "mod 연산으로 순환 → 가능.",
    detailed: "원형 큐는 인덱스가 % MAX_SIZE로 돌아가므로 rear가 앞쪽으로 래핑되면 front > rear인 경우가 얼마든지 발생한다. 선형 큐와 다른 점.",
    source: "7차시 § 3.3"
  },
  {
    id: "DS_S3Q27",
    set: 3,
    week: 7,
    topic: "동적 큐 Full",
    type: "multiple_choice",
    difficulty: "medium",
    question: "연결 리스트로 구현한 동적 큐에서 Full 상태 검사가 필요하지 않은 이유는?",
    choices: [
      "연결 리스트의 노드 삽입 속도가 빠르기 때문",
      "Heap이 허용하는 한 노드를 계속 할당하기 때문",
      "C 컴파일러가 큐의 Full을 자동으로 처리하기 때문",
      "rear 포인터가 NULL이 될 수 없기 때문"
    ],
    answer: 1,
    brief: "동적 할당이라 크기 제한 없음.",
    detailed: "동적 큐는 Heap에서 필요할 때마다 노드를 malloc하므로 메모리가 허용하는 한 Full이 발생하지 않는다. Empty 검사만 필요하다. \"C 컴파일러가 큐의 Full을 자동 처리\"한다는 설명은 거짓 — C는 자료구조의 Full을 자동 처리하지 않는다.",
    source: "7차시 § 4.1"
  },
  {
    id: "DS_S3Q28",
    set: 3,
    week: 7,
    topic: "원형 큐 Full",
    type: "multiple_choice",
    difficulty: "medium",
    question: "크기가 MAX_SIZE인 원형 큐의 Full 조건은?",
    choices: [
      "rear == MAX_SIZE - 1 일 때",
      "front == rear 로 두 인덱스가 같을 때",
      "(rear + 1) % MAX_SIZE == front 일 때",
      "rear - front == MAX_SIZE 일 때"
    ],
    answer: 2,
    brief: "(rear+1) % MAX == front.",
    detailed: "원형 큐는 Empty와 Full을 구분하려고 한 칸을 비워둔다. Full 조건은 (rear + 1) % MAX_SIZE == front이며, 실제 최대 저장 개수는 MAX_SIZE - 1이다.",
    source: "7차시 § 3.2"
  },
  {
    id: "DS_S3Q29", set: 3, week: 7, topic: "우선순위 큐 응용", type: "multiple_choice", difficulty: "medium",
    question: "다음 중 우선순위 큐(Priority Queue)로 구현하기 가장 적합한 응용은?",
    choices: [
      "은행 창구의 일반 대기 줄 (도착 순서)",
      "병원 응급실의 환자 처리 (중증도 순서)",
      "프린터 작업 대기열 (요청 순서)",
      "함수 호출 스택 (중첩 호출)",
    ],
    answer: 1,
    brief: "중증도 = 우선순위 → 우선순위 큐.",
    detailed: "응급실은 도착 순서가 아니라 중증도(우선순위)에 따라 처리해야 하므로 우선순위 큐가 적합하다. 일반 대기·프린터 대기열은 일반 큐(FIFO), 함수 호출은 스택(LIFO).",
    source: "7차시 § 6.3",
  },
  {
    id: "DS_S3Q30",
    set: 3,
    week: 7,
    topic: "Heap 삽입 복잡도",
    type: "multiple_choice",
    difficulty: "medium",
    question: "n개의 원소를 가진 Max Heap에 새 원소를 삽입할 때의 시간 복잡도와 그 이유로 옳은 것은?",
    choices: [
      "O(1) — 배열 끝에 새 원소를 추가만 하면 되므로",
      "O(log n) — 부모와 비교하며 트리 높이만큼 올라가므로",
      "O(n) — 삽입마다 전체 원소 재정렬이 필요하므로",
      "O(n log n) — 비교 정렬 알고리즘과 동일하므로"
    ],
    answer: 1,
    brief: "Up-Heap: 트리 높이 만큼 비교 → O(log n).",
    detailed: "Heap 삽입은 ① 배열 끝에 새 원소 추가 후 ② 부모와 비교해 더 크면 교환하면서 위로 올라간다(Up-Heap). 이진 트리의 높이가 log n이므로 최악 비교 횟수는 O(log n).",
    source: "7차시 § 6.3"
  },
];

// ═══════════════════════════════════════════════════════════════
// SET 4 — 통합 모의고사 (Week 2:5 · 3:4 · 4:4 · 5:8 · 6:5 · 7:4 = 30)
// ═══════════════════════════════════════════════════════════════
export const set4 = [
  // ── 2차시 ──
  {
    id: "DS_S4Q1", set: 4, week: 2, topic: "시간 복잡도 계산", type: "multiple_choice", difficulty: "medium",
    question: "시간 복잡도 함수 T(n) = 2n² + 3n + 1의 빅오 표기로 가장 적절한(타이트한) 것은?",
    choices: ["O(n)", "O(n²)", "O(n³)", "O(2ⁿ)"],
    answer: 1,
    brief: "최고차항만 남기고 계수 제거 → O(n²).",
    detailed: "점근적 표기법에서는 최고차항만 남기고 계수·하위항을 제거한다. 2n² + 3n + 1 → O(n²). O(n)·O(log n)은 너무 낮고, O(n³)·O(2ⁿ)은 타이트하지 않은 더 큰 상한.",
    source: "2차시 § 6.1",
  },
  {
    id: "DS_S4Q2", set: 4, week: 2, topic: "빅오 계산 종합", type: "multiple_choice", difficulty: "medium",
    question: "T(n) = n² + n + n log n + 1의 빅오 표기는?",
    choices: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
    answer: 2,
    brief: "최고차 n²이 지배.",
    detailed: "n² > n log n > n > 1이므로 최고차 항은 n². 계수·하위 항 제거 → O(n²).",
    source: "2차시 § 6.1",
  },
  {
    id: "DS_S4Q3",
    set: 4,
    week: 2,
    topic: "O(n⁴) 판정",
    type: "multiple_choice",
    difficulty: "hard",
    question: "시간 복잡도 O(n⁴)에 대한 설명으로 옳은 것은?",
    choices: [
      "지수형이므로 컴퓨터로 해결할 수 없는 복잡도다",
      "다항식 시간이므로 현대 컴퓨터로 해결 가능하다",
      "로그형이므로 매우 빠르게 처리되는 복잡도다",
      "실제로는 존재하지 않는 가상의 복잡도다"
    ],
    answer: 1,
    brief: "O(n⁴)는 다항식 범위(폴리노미얼).",
    detailed: "O(n³)까지는 폴리노미얼, O(n⁴)도 현대 컴퓨팅 파워로는 해결 가능한 다항식 시간. O(2ⁿ), O(n!)만 실질적으로 불가능.",
    source: "2차시 § 6.4"
  },
  {
    id: "DS_S4Q4",
    set: 4,
    week: 2,
    topic: "알고리즘 기술 방법",
    type: "multiple_choice",
    difficulty: "basic",
    question: "알고리즘을 기술할 때 구조적이면서도 언어 문법에 얽매이지 않고 핵심 로직에 집중할 수 있는 방법은?",
    choices: [
      "자연어 (Natural Language)",
      "흐름도 (Flow Chart)",
      "유사 코드 (Pseudo-code)",
      "프로그래밍 언어 (Code)"
    ],
    answer: 2,
    brief: "Pseudo-code — 언어 문법 독립.",
    detailed: "자연어는 모호할 수 있고, 프로그래밍 언어는 문법에 치중되며, 흐름도는 복잡해지기 쉽다. 유사 코드는 로직에 집중하게 해준다.",
    source: "2차시 § 2.3"
  },
  {
    id: "DS_S4Q5",
    set: 4,
    week: 2,
    topic: "ADT vs 자료구조",
    type: "multiple_choice",
    difficulty: "medium",
    question: "ADT(추상 데이터 타입)와 자료구조(Data Structure)의 관계로 옳은 것은?",
    choices: [
      "ADT와 자료구조는 같은 뜻의 동의어다",
      "ADT는 명세(What), 자료구조는 그 구현(How)이다",
      "자료구조가 상위 개념이고 ADT는 그 일부다",
      "ADT는 정적, 자료구조는 동적인 것을 뜻한다"
    ],
    answer: 1,
    brief: "ADT=명세(What), 자료구조=구현(How).",
    detailed: "ADT는 객체와 연산만 정의한 추상 명세다. 자료구조는 그 ADT를 배열·연결 리스트 등 구체적 구현으로 옮긴 결과물이다. 같은 스택 ADT라도 배열 구현·연결 리스트 구현이 모두 가능하다.",
    source: "4차시 § 4.1"
  },

  // ── 3차시 ──
  {
    id: "DS_S4Q6", set: 4, week: 3, topic: "순환 4형태", type: "multiple_choice", difficulty: "medium",
    question: "함수 호출 직후 추가 연산이 필요 없는 순환 형태를 무엇이라 하는가?",
    choices: [
      "Linear Recursion",
      "Non-tail Recursion",
      "Tail Recursion",
      "Binary Recursion",
    ],
    answer: 2,
    brief: "Tail Recursion — 호출이 마지막 동작.",
    detailed: "Tail Recursion은 함수 호출이 마지막 동작이고 이후 추가 연산이 없는 형태다. 이진 검색이 대표적인 예다.",
    source: "3차시 § 3",
  },
  {
    id: "DS_S4Q7", set: 4, week: 3, topic: "팩토리얼 복잡도", type: "multiple_choice", difficulty: "medium",
    question: "순환으로 구현한 팩토리얼 factorial(n)의 시간 복잡도는?",
    choices: ["O(1)", "O(log n)", "O(n)", "O(2ⁿ)"],
    answer: 2,
    brief: "팩토리얼 순환은 n번 재귀 호출 → O(n).",
    detailed: "factorial(n) = n × factorial(n-1)로 n번 재귀 호출되므로 시간 복잡도는 O(n) + α(함수 호출 오버헤드)다.",
    source: "3차시 § 5.1",
  },
  {
    id: "DS_S4Q8", set: 4, week: 3, topic: "분할정복", type: "multiple_choice", difficulty: "medium",
    question: "분할정복(Divide-and-Conquer) 전략에 해당하는 알고리즘이 아닌 것은?",
    choices: [
      "이진 검색 (Binary Search)",
      "합병 정렬 (Merge Sort)",
      "퀵 정렬 (Quick Sort)",
      "버블 정렬 (Bubble Sort)",
    ],
    answer: 3,
    brief: "버블 정렬은 분할정복 아님.",
    detailed: "버블 정렬은 인접 원소를 반복 비교·교환하는 단순 전략으로 분할정복이 아니다. 이진 검색·합병·퀵은 문제를 분할해 해결하는 대표적 분할정복.",
    source: "3차시 § 9.1",
  },
  {
    id: "DS_S4Q9", set: 4, week: 3, topic: "메모이제이션", type: "multiple_choice", difficulty: "medium",
    question: "메모이제이션(Memoization)을 적용한 피보나치의 시간 복잡도는?",
    choices: ["O(log n)", "O(n)", "O(n²)", "O(2ⁿ)"],
    answer: 1,
    brief: "중복 제거 → O(n).",
    detailed: "메모이제이션은 이미 계산한 fib(k)를 저장하여 재호출을 막는다. 모든 fib(0) ~ fib(n)을 한 번씩만 계산하므로 O(n).",
    source: "3차시 § 7.2",
  },

  // ── 4차시 ──
  {
    id: "DS_S4Q10",
    set: 4,
    week: 4,
    topic: "정적 vs 동적",
    type: "multiple_choice",
    difficulty: "basic",
    question: "정적(Static) 구현과 동적(Dynamic) 구현에 대한 설명 중 옳은 것은?",
    choices: [
      "정적은 런타임에 크기가 결정되고, 동적은 컴파일 타임에 결정된다",
      "정적은 연속된 메모리를, 동적은 Heap의 비연속 메모리를 사용한다",
      "정적은 삽입·삭제 시 링크만 조작, 동적은 데이터 이동 필요",
      "동적 구현은 인덱스 접근이 항상 O(1)로 가능하다"
    ],
    answer: 1,
    brief: "정적=연속 메모리, 동적=Heap(비연속).",
    detailed: "정적 구현은 컴파일 타임에 연속된 메모리를 할당받아 인덱스 O(1) 접근이 가능하다. 동적 구현은 런타임에 Heap에서 비연속 메모리를 확보하며 포인터로 연결한다.",
    source: "4차시 § 1"
  },
  {
    id: "DS_S4Q11",
    set: 4,
    week: 4,
    topic: "배열 이름 주소",
    type: "multiple_choice",
    difficulty: "medium",
    question: "C언어에서 `int A[10];`으로 선언했을 때 배열 이름 `A`의 의미로 옳은 것은?",
    choices: [
      "배열 첫 원소의 값인 A[0]을 의미한다",
      "배열에 담긴 원소의 개수(10)를 의미한다",
      "첫 원소의 주소 상수 &A[0]을 의미한다",
      "값을 바꿀 수 있는 포인터 변수다"
    ],
    answer: 2,
    brief: "1차원 배열 이름 = 주소 상수.",
    detailed: "1차원 배열 이름은 그 자체로 배열 첫 원소의 주소를 나타내는 '주소 상수'다. 따라서 ptr = A; 는 ptr = &A[0]; 과 같다.",
    source: "4차시 § 2.2"
  },
  {
    id: "DS_S4Q12",
    set: 4,
    week: 4,
    topic: "자기참조 구조체",
    type: "multiple_choice",
    difficulty: "medium",
    question: "자기참조 구조체(Self-referential structure)의 필수 특징은?",
    choices: [
      "구조체 멤버로 int 타입이 하나 이상 있어야 한다",
      "자기 자신과 같은 타입을 가리키는 포인터를 멤버로 가진다",
      "malloc 동적 할당 없이는 선언할 수 없다",
      "멤버 필드를 최대 2개까지만 가질 수 있다"
    ],
    answer: 1,
    brief: "자기 타입 포인터 필드 필수.",
    detailed: "자기참조 구조체는 struct Listnode { int data; struct Listnode *link; } 처럼 자기 자신 타입의 포인터를 멤버로 가진다. 연결 리스트 노드의 기본 구조다.",
    source: "4차시 § 2.4"
  },
  {
    id: "DS_S4Q13",
    set: 4,
    week: 4,
    topic: "캡슐화",
    type: "multiple_choice",
    difficulty: "medium",
    question: "ADT의 캡슐화(Encapsulation) 원칙에 따라 사용자에게 노출되어야 하는 것은?",
    choices: [
      "데이터의 내부 저장 형태(배열·연결 리스트 여부)",
      "연산의 인터페이스(이름·매개변수·반환값)",
      "구현에 사용된 내부 변수의 이름",
      "노드가 저장된 메모리 주소 위치"
    ],
    answer: 1,
    brief: "사용자에게는 인터페이스(연산)만 노출.",
    detailed: "캡슐화는 내부 구현(How)을 감추고 외부에는 인터페이스(What)만 공개하는 원칙이다. 사용자는 push·pop 같은 연산만 알면 되며, 내부가 배열인지 연결 리스트인지 알 필요가 없다.",
    source: "4차시 § 4.1"
  },

  // ── 5차시 ──
  {
    id: "DS_S4Q14", set: 4, week: 5, topic: "원형 LL addLast", type: "multiple_choice", difficulty: "medium",
    question: "원형 연결 리스트에서 addLast 연산의 시간 복잡도는? (head가 마지막 노드를 가리킴)",
    choices: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 0,
    brief: "head = 마지막 → O(1).",
    detailed: "원형 연결 리스트는 head가 마지막 노드를 가리키므로 addLast 시 head->link를 통해 첫 노드에 O(1)로 접근·삽입 후 head를 갱신하면 된다.",
    source: "5차시 § 4.2",
  },
  {
    id: "DS_S4Q15",
    set: 4,
    week: 5,
    topic: "원형 LL head 의미",
    type: "multiple_choice",
    difficulty: "medium",
    question: "원형 연결 리스트에서 head가 마지막 노드를 가리키는 설계의 핵심 이점은?",
    choices: [
      "노드당 메모리 사용량을 절약할 수 있다",
      "addFirst와 addLast가 모두 O(1)로 가능하다",
      "중간 위치 삽입을 O(1)로 처리할 수 있다",
      "역방향 탐색을 O(1)로 수행할 수 있다"
    ],
    answer: 1,
    brief: "맨 앞·맨 뒤 모두 O(1) 삽입.",
    detailed: "head가 마지막 노드를 가리키면 head->link가 첫 노드이므로 addFirst는 O(1). 마지막 노드도 head이므로 addLast도 O(1).",
    source: "5차시 § 4.1"
  },
  {
    id: "DS_S4Q16",
    set: 4,
    week: 5,
    topic: "이중 원형 LL",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이중 원형 연결 리스트(Doubly Circular Linked List)의 특성으로 옳은 것은?",
    choices: [
      "addFirst O(1), addLast O(n), 역방향 탐색 불가",
      "addFirst O(1), addLast O(1), 역방향 탐색 가능",
      "addFirst O(n), addLast O(n), 역방향 탐색 가능",
      "addFirst O(n), addLast O(n), 인덱스 접근 O(1)"
    ],
    answer: 1,
    brief: "양 끝 삽입·삭제 O(1) + 양방향 탐색 가능.",
    detailed: "이중 원형 연결 리스트는 원형의 양끝 O(1) 장점과 이중의 역방향 탐색 가능성을 모두 가진다. 실무에서 가장 많이 사용되는 형태다.",
    source: "5차시 § 5 / 6차시 § 0.2"
  },
  {
    id: "DS_S4Q17", set: 4, week: 5, topic: "free 누락 결과", type: "multiple_choice", difficulty: "basic",
    question: "연결 리스트에서 노드 삭제 후 free()를 호출하지 않으면 발생하는 현상은?",
    choices: [
      "Segmentation Fault",
      "Stack Overflow",
      "Memory Leak",
      "Heap Overflow",
    ],
    answer: 2,
    brief: "Heap 할당 후 해제하지 않음 = Memory Leak.",
    detailed: "malloc으로 Heap에 할당받은 메모리를 free로 반환하지 않으면 사용 가능한 메모리가 점진적으로 줄어드는 Memory Leak이 발생한다.",
    source: "5차시 § 3.4",
  },
  {
    id: "DS_S4Q18", set: 4, week: 5, topic: "LL 비교", type: "multiple_choice", difficulty: "medium",
    question: "단순·원형·이중 연결 리스트 (Singly/Circular/Doubly Linked List)의 addLast 시간 복잡도로 올바른 조합은? (모두 head 포인터만 보유, tail 포인터 없음)",
    choices: [
      "단순: O(1), 원형: O(1), 이중: O(1)",
      "단순: O(n), 원형: O(1), 이중: O(n)",
      "단순: O(n), 원형: O(n), 이중: O(n)",
      "단순: O(1), 원형: O(n), 이중: O(n)",
    ],
    answer: 1,
    brief: "원형만 O(1), 나머지는 끝까지 순회.",
    detailed: "단순 연결 리스트는 head부터 끝까지 순회 O(n). 원형 연결 리스트는 head가 마지막 노드라 O(1). 이중 연결 리스트는 head→끝 순회 O(n) (이중 원형이어야 O(1)).",
    source: "5차시 § 종합",
  },
  {
    id: "DS_S4Q19", set: 4, week: 5, topic: "역순 구현", type: "multiple_choice", difficulty: "medium",
    question: "단순 연결 리스트를 역순으로 바꾸려 할 때 최소 몇 개의 포인터가 필요한가?",
    choices: ["1개", "2개", "3개", "불가능"],
    answer: 2,
    brief: "prev, curr, next 3개.",
    detailed: "단순 연결 리스트(Singly Linked List)는 역방향 링크가 없으므로 이전 노드(prev), 현재 노드(curr), 다음 노드(next)를 각각 가리키는 3개 포인터로 링크를 하나씩 뒤집어야 한다.",
    source: "5차시 § 3.5",
  },
  {
    id: "DS_S4Q20",
    set: 4,
    week: 5,
    topic: "이중 원형 LL 이점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이중 원형 연결 리스트가 실무에서 가장 널리 쓰이는 이유로 가장 적절한 것은?",
    choices: [
      "구조가 가장 단순해 구현이 쉽기 때문",
      "양 끝 삽입이 O(1)이고 양방향 탐색이 되기 때문",
      "메모리를 가장 적게 사용하는 구조이기 때문",
      "원소 정렬을 가장 쉽게 처리할 수 있기 때문"
    ],
    answer: 1,
    brief: "모든 끝 연산 O(1) + 양방향 탐색.",
    detailed: "이중(양방향) + 원형(양 끝 O(1))의 장점을 모두 가져 삽입·삭제·탐색의 균형이 가장 뛰어나 실무 표준이다.",
    source: "5차시 § 5.1 / 6차시 § 0.2"
  },
  {
    id: "DS_S4Q21", set: 4, week: 5, topic: "빅오 매트릭스 — 원형 LL 삽입", type: "multiple_choice", difficulty: "medium",
    question: "원형 연결 리스트(Circular Linked List, head가 마지막 노드를 가리킴)의 [add_first / add_last / 노드 p 뒤 삽입 / 노드 p 앞 삽입] 시간 복잡도로 옳은 것은? (노드 p의 주소는 주어졌다고 가정, 단일 링크)",
    choices: [
      "O(1) / O(1) / O(1) / O(n)",
      "O(1) / O(1) / O(1) / O(1)",
      "O(n) / O(n) / O(n) / O(n)",
      "O(1) / O(n) / O(1) / O(n)",
    ],
    answer: 0,
    brief: "양 끝은 O(1), p 앞 삽입만 선행 노드 못 찾아 O(n).",
    detailed: "원형 연결 리스트는 head가 마지막 노드를 가리키므로 head->link로 첫 노드에 O(1) 접근 가능 → add_first·add_last 모두 O(1). 노드 p가 주어진 상태에서 p 뒤 삽입은 p->link만 갱신해 O(1). 그러나 단일 링크 구조라 p 앞 삽입은 선행 노드를 head부터 다시 찾아야 하므로 O(n)이다(이중 링크가 있어야 O(1)).",
    source: "5차시 § 4 / 시간복잡도 매트릭스",
  },

  // ── 6차시 ──
  {
    id: "DS_S4Q22", set: 4, week: 6, topic: "top 초기값", type: "multiple_choice", difficulty: "basic",
    question: "배열 기반 스택에서 top 변수의 초기값으로 일반적으로 사용되는 값은?",
    choices: ["0", "-1", "MAX_SIZE - 1", "NULL"],
    answer: 1,
    brief: "top = -1 이 공백 상태.",
    detailed: "배열 인덱스 0부터 시작하므로 공백을 표현하려면 top = -1로 초기화한다. is_empty 조건은 top == -1.",
    source: "6차시 § 3.1",
  },
  {
    id: "DS_S4Q23",
    set: 4,
    week: 6,
    topic: "peek vs pop",
    type: "multiple_choice",
    difficulty: "basic",
    question: "스택의 peek(또는 top) 연산과 pop 연산의 차이로 옳은 것은?",
    choices: [
      "peek과 pop은 동작이 같은 동일한 연산이다",
      "peek은 top 값을 확인만 하고, pop은 반환과 함께 삭제한다",
      "peek은 삭제만 하고 값은 반환하지 않는다",
      "pop은 스택의 모든 원소를 한꺼번에 비운다"
    ],
    answer: 1,
    brief: "peek은 값만 확인, pop은 삭제 포함.",
    detailed: "peek(top)은 최상단 값을 확인만 하고 top을 변경하지 않는다. pop은 값을 반환하면서 top을 1 감소시켜 실제 삭제한다.",
    source: "6차시 § 2"
  },
  {
    id: "DS_S4Q24",
    set: 4,
    week: 6,
    topic: "PUSH 의미",
    type: "multiple_choice",
    difficulty: "medium",
    question: "C 코드 `stack[++top] = item;`의 동작 순서로 옳은 것은?",
    choices: [
      "stack[top]에 item을 대입한 뒤 top을 1 증가시킨다",
      "top을 먼저 1 증가시킨 뒤 stack[top]에 item을 넣는다",
      "item 값을 먼저 1 증가시킨 뒤 stack에 대입한다",
      "top을 먼저 1 감소시킨 뒤 stack[top]에 대입한다"
    ],
    answer: 1,
    brief: "전위 ++: 먼저 증가 후 대입.",
    detailed: "전위 ++는 변수를 먼저 증가시킨 후 그 값을 연산에 쓴다. top = -1에서 PUSH 시 top이 0이 된 뒤 stack[0]에 item 저장.",
    source: "6차시 § 3.1"
  },
  {
    id: "DS_S4Q25",
    set: 4,
    week: 6,
    topic: "스택 활용처",
    type: "multiple_choice",
    difficulty: "basic",
    question: "스택(Stack) 자료구조가 사용되는 대표적인 응용이 아닌 것은?",
    choices: [
      "함수 호출 스택 (Call Stack)",
      "수식의 중위→후위 변환 및 계산",
      "에디터의 Undo(되돌리기) 기능",
      "운영체제의 라운드 로빈 스케줄링"
    ],
    answer: 3,
    brief: "라운드 로빈은 큐(원형 연결 리스트).",
    detailed: "스택은 LIFO 구조로 함수 호출·수식 계산·Undo·브라우저 뒤로가기 등에 쓰인다. 라운드 로빈 스케줄링은 순차 실행을 위해 FIFO의 원형 큐/원형 연결 리스트(Circular Linked List)를 사용한다.",
    source: "6차시 § 1.1 / 7차시"
  },
  {
    id: "DS_S4Q26",
    set: 4,
    week: 6,
    topic: "괄호 매칭 알고리즘",
    type: "multiple_choice",
    difficulty: "medium",
    question: "수식의 괄호 짝(여는 괄호 / 닫는 괄호)을 검사하는 알고리즘에서 사용하는 자료구조와 동작으로 옳은 것은?",
    choices: [
      "큐 — 여는 괄호를 Enqueue, 닫는 괄호에서 Dequeue 후 비교",
      "스택 — 여는 괄호를 PUSH, 닫는 괄호에서 POP 후 짝 비교",
      "해시 테이블 — 괄호 인덱스를 키로 저장 후 검색",
      "이진 탐색 트리 — 괄호 위치를 정렬 후 in-order 순회"
    ],
    answer: 1,
    brief: "스택 PUSH/POP으로 가장 가까운 짝부터 검사.",
    detailed: "괄호 짝 검사는 스택을 사용한다. 여는 괄호가 등장하면 PUSH, 닫는 괄호를 만나면 스택 top을 POP해 짝이 맞는지 비교한다. 끝까지 모두 짝이 맞고 스택이 비어 있으면 올바른 수식이다.",
    source: "6차시 § 6 / 노트 응용"
  },

  // ── 7차시 ──
  {
    id: "DS_S4Q27",
    set: 4,
    week: 7,
    topic: "데크 구현",
    type: "multiple_choice",
    difficulty: "medium",
    question: "데크(Deque)를 동적으로 구현할 때 가장 적합한 자료구조는?",
    choices: [
      "단순 연결 리스트 (Singly)",
      "원형 연결 리스트 (단일 링크)",
      "이중 연결 리스트 (Doubly)",
      "해시 테이블 (Hash Table)"
    ],
    answer: 2,
    brief: "양방향 삽입·삭제 → 이중 연결 리스트.",
    detailed: "데크는 양쪽 끝에서 모두 삽입·삭제가 가능해야 하므로 양방향 링크를 가진 이중 연결 리스트가 적합하다. 원형 단일 연결 리스트는 deleteLast가 O(n)이므로 부적합.",
    source: "7차시 § 5.2"
  },
  {
    id: "DS_S4Q28",
    set: 4,
    week: 7,
    topic: "스택 vs 큐",
    type: "multiple_choice",
    difficulty: "basic",
    question: "스택(Stack)과 큐(Queue)의 비교 중 옳지 않은 것은?",
    choices: [
      "스택은 LIFO 방식, 큐는 FIFO 방식이다",
      "스택은 한쪽 끝에서만, 큐는 rear 삽입·front 삭제한다",
      "스택은 함수 호출, 큐는 프린터 대기열에 주로 쓰인다",
      "스택과 큐는 둘 다 양쪽 끝 삽입·삭제가 자유롭다"
    ],
    answer: 3,
    brief: "양쪽 끝 자유는 데크(Deque).",
    detailed: "양쪽 끝에서 모두 삽입·삭제가 가능한 것은 스택·큐가 아니라 데크(Deque)다. 스택·큐는 연산 위치에 제약이 있다.",
    source: "7차시 § 7.1"
  },
  {
    id: "DS_S4Q29",
    set: 4,
    week: 7,
    topic: "데크 head/tail",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이중 연결 리스트로 구현한 데크(Deque)에서 head와 tail 포인터의 역할은?",
    choices: [
      "head만 사용하고 tail 포인터는 필요하지 않다",
      "head는 front(앞쪽), tail은 rear(뒤쪽) 삽입·삭제를 맡는다",
      "head와 tail 모두 front를 가리키며 tail은 백업용이다",
      "head와 tail은 매번 무작위 노드를 가리킨다"
    ],
    answer: 1,
    brief: "head=front, tail=rear.",
    detailed: "데크는 양쪽 끝에서 삽입·삭제가 필요하므로 head(앞쪽)와 tail(뒤쪽) 두 포인터를 관리한다. 이중 연결 리스트(Doubly Linked List)이라 각 방향 연산 모두 O(1).",
    source: "7차시 § 5.2"
  },
  {
    id: "DS_S4Q30",
    set: 4,
    week: 7,
    topic: "Max vs Min Heap",
    type: "multiple_choice",
    difficulty: "basic",
    question: "Max Heap과 Min Heap에 대한 설명 중 옳은 것은?",
    choices: [
      "Max Heap은 루트에 최댓값, Min Heap은 루트에 최솟값이 온다",
      "Max Heap은 정렬된 배열, Min Heap은 무작위 배열이다",
      "둘 다 연결 리스트로 구현하는 것이 표준 방식이다",
      "Max Heap은 우선순위가 낮은 것을 먼저 꺼낸다"
    ],
    answer: 0,
    brief: "루트 = Max(최대) 또는 Min(최소).",
    detailed: "Max Heap은 부모 ≥ 자식 관계로 루트가 최댓값. Min Heap은 부모 ≤ 자식으로 루트가 최솟값. 우선순위 큐의 dequeue는 항상 루트를 꺼내 O(log n) 재정렬한다.",
    source: "7차시 § 6.3"
  },
];

// ═══════════════════════════════════════════════════════════════
// 메타 + 전체 모음
// ═══════════════════════════════════════════════════════════════
export const set5 = [
  {
    id: "DS_F5Q1",
    set: 5,
    week: 9,
    topic: "트리의 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "정점이 N개인 그래프가 '트리'가 되기 위한 조건으로 가장 적절한 것은?",
    choices: [
      "모든 정점이 연결되고 간선이 N−1개여서 사이클이 없다",
      "모든 정점의 차수가 2 이하라서 분기가 생기지 않는다",
      "간선이 N개 이상이라서 정점이 빠짐없이 이어진다",
      "루트가 2개 이상 존재해 어디서든 시작할 수 있다"
    ],
    answer: 0,
    brief: "연결 + 간선 N−1 = 사이클 없는 트리.",
    detailed: "트리는 1개 이상의 노드를 갖는, 사이클이 없는 연결 그래프다. 정점이 N개일 때 모든 정점이 연결되어 있으면서 간선이 정확히 N−1개이면 사이클이 없으므로 트리가 된다. 간선이 N개 이상이면 사이클이 생기고, 루트는 항상 1개다.",
    source: "9차시 §1 트리의 개념"
  },
  {
    id: "DS_F5Q2",
    set: 5,
    week: 9,
    topic: "트리 용어",
    type: "multiple_choice",
    difficulty: "basic",
    question: "트리 용어에 대한 설명으로 옳은 것은?",
    choices: [
      "노드의 차수(degree)는 그 노드가 가진 조상의 수이다",
      "단말 노드(leaf)는 차수가 0인, 자식이 없는 노드이다",
      "레벨(level)은 어떤 트리에서나 항상 0부터 시작한다",
      "트리의 높이는 전체 노드가 가지는 최소 레벨이다"
    ],
    answer: 1,
    brief: "단말 노드 = 차수 0(자식 없음).",
    detailed: "노드의 차수는 그 노드가 가진 부속 트리(자식)의 수다. 단말(leaf/terminal) 노드는 차수가 0인 노드로 자식이 없다. 강의 기준 레벨은 루트를 1로 시작하며, 트리의 높이(깊이)는 노드의 최대 레벨이다.",
    source: "9차시 §3 트리 용어"
  },
  {
    id: "DS_F5Q3",
    set: 5,
    week: 9,
    topic: "이진트리 수학적 성질",
    type: "multiple_choice",
    difficulty: "basic",
    question: "노드가 n개인 이진 트리의 간선(edge) 수는?",
    choices: [
      "n−1개 (노드 수보다 정확히 1개 적다)",
      "n개 (노드 수와 동일하다)",
      "2n개 (노드 수의 두 배이다)",
      "n+1개 (노드 수보다 1개 많다)"
    ],
    answer: 0,
    brief: "n개 노드 → 간선 n−1개.",
    detailed: "루트를 제외한 모든 노드는 자신의 부모와 연결되는 간선을 정확히 하나씩 갖는다. 따라서 노드가 n개이면 간선은 n−1개다(트리의 일반 성질).",
    source: "9차시 §5 이진 트리 수학적 성질"
  },
  {
    id: "DS_F5Q4",
    set: 5,
    week: 9,
    topic: "레벨 탐색",
    type: "multiple_choice",
    difficulty: "basic",
    question: "레벨 순서 탐색(Level Order Traversal)을 구현할 때 핵심적으로 사용하는 자료구조는?",
    choices: [
      "먼저 들어온 노드를 먼저 꺼내는 큐(Queue)",
      "나중에 들어온 노드를 먼저 꺼내는 스택(Stack)",
      "우선순위 큐(Priority Queue)로만 구현 가능",
      "키로 위치를 찾는 해시 테이블(Hash Table)"
    ],
    answer: 0,
    brief: "레벨 탐색 = 큐(FIFO).",
    detailed: "포인터는 부모→자식 방향만 연결되어 있어 같은 레벨의 옆 노드로 직접 이동할 수 없다. 큐(FIFO)를 사용해 방문한 노드의 자식들을 enqueue하고 먼저 들어온 노드를 dequeue하며 방문하면, 물리적 링크 없이도 레벨 순서대로 방문할 수 있다. (재귀 탐색은 콜 스택을 쓴다.)",
    source: "9차시 §7 레벨 탐색"
  },
  {
    id: "DS_F5Q5",
    set: 5,
    week: 9,
    topic: "BST 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "이진 탐색 트리(BST)의 절대 규칙으로 옳은 것은?",
    choices: [
      "왼쪽 서브트리의 모든 키 < 루트 < 오른쪽 서브트리의 모든 키",
      "부모의 키가 좌우 무관하게 항상 자식의 키보다 크다",
      "루트부터 모든 레벨이 빠짐없이 꽉 차 있어야 한다",
      "왼쪽 서브트리의 키가 오른쪽 서브트리의 키보다 항상 크다"
    ],
    answer: 0,
    brief: "L < Root < R.",
    detailed: "BST는 임의의 노드에 대해 '왼쪽 서브트리의 모든 키값 < 루트 키값 < 오른쪽 서브트리의 모든 키값'을 만족한다. 이 규칙 덕분에 검색을 O(log N)으로 할 수 있다. '부모가 항상 자식보다 크다'는 힙(Heap)의 성질이다.",
    source: "9차시 §10 BST 정의"
  },
  {
    id: "DS_F5Q6",
    set: 5,
    week: 9,
    topic: "BST 중위 탐색",
    type: "multiple_choice",
    difficulty: "basic",
    question: "이진 탐색 트리(BST)를 중위 탐색(Inorder)하면 출력되는 결과는?",
    choices: [
      "정해진 규칙 없이 무작위 순서로 출력된다",
      "키값이 작은 값부터 오름차순으로 정렬되어 출력된다",
      "키값이 큰 값부터 내림차순으로 정렬되어 출력된다",
      "같은 레벨끼리 묶여 레벨 순서대로 출력된다"
    ],
    answer: 1,
    brief: "BST 중위 탐색 = 오름차순 정렬.",
    detailed: "BST는 L < Root < R 규칙을 만족하므로 중위 탐색(L→V→R)으로 순회하면 항상 키값이 오름차순으로 정렬되어 출력된다. 이 성질은 정렬·범위 검색에 활용된다.",
    source: "9차시 §10 BST 중위 탐색"
  },
  {
    id: "DS_F5Q7",
    set: 5,
    week: 10,
    topic: "힙의 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙(Heap)의 정의로 가장 옳은 것은?",
    choices: [
      "부모 값이 자식보다 항상 크거나(또는 작거나) 한 완전 이진 트리",
      "왼쪽 서브트리 < 루트 < 오른쪽 서브트리 규칙을 만족하는 이진 트리",
      "모든 레벨이 빠짐없이 꽉 찬 포화 이진 트리만 가리키는 트리",
      "NULL 링크를 재활용해 재귀 없이 순회하는 스레드 이진 트리"
    ],
    answer: 0,
    brief: "힙 = 부모-자식 대소 규칙을 만족하는 완전 이진 트리.",
    detailed: "힙은 부모 노드의 원소 값이 자식 노드의 원소 값보다 항상 크거나(Max Heap) 작은(Min Heap) 완전 이진 트리다. 두 번째는 BST, 네 번째는 스레드 이진 트리 설명이다. 포화 이진 트리가 아니라 완전 이진 트리면 충분하다.",
    source: "10차시 슬라이드 3"
  },
  {
    id: "DS_F5Q8",
    set: 5,
    week: 10,
    topic: "Max Heap vs Min Heap",
    type: "multiple_choice",
    difficulty: "basic",
    question: "Max Heap과 Min Heap에 대한 설명으로 옳은 것은?",
    choices: [
      "Max Heap은 루트가 최솟값이고 Min Heap은 루트가 최댓값이다",
      "Max Heap은 부모 ≥ 자식이며 루트에 전체 최댓값이 온다",
      "Max Heap은 형제(좌·우) 노드 간에도 항상 왼쪽 < 오른쪽이다",
      "Min Heap은 완전 이진 트리가 아니어도 성립할 수 있다"
    ],
    answer: 1,
    brief: "Max Heap: 부모 ≥ 자식, 루트 = 최댓값.",
    detailed: "Max Heap은 부모 값이 자식보다 크거나 같아 루트에 전체 최댓값이 온다. Min Heap은 그 반대로 루트가 최솟값이다(첫 보기는 반대로 서술). 힙은 부모-자식 대소만 정해질 뿐 형제 간 대소는 정해지지 않으며(셋째 오답), 둘 다 완전 이진 트리여야 한다(넷째 오답).",
    source: "10차시 슬라이드 3"
  },
  {
    id: "DS_F5Q9",
    set: 5,
    week: 10,
    topic: "완전 이진 트리 조건",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙을 만들 때 반드시 만족해야 하는 완전 이진 트리(Complete Binary Tree)의 조건으로 옳은 것은?",
    choices: [
      "모든 레벨이 예외 없이 빈자리 하나 없이 완전히 꽉 차 있다",
      "한쪽 방향으로만 노드가 길게 이어진 편향 구조를 이룬다",
      "마지막 레벨 외 모든 레벨이 꽉 차고 마지막은 왼쪽부터 채운다",
      "모든 노드가 빠짐없이 정확히 2개의 자식을 가지고 있다"
    ],
    answer: 2,
    brief: "마지막 레벨 빼고 꽉 참 + 마지막 레벨은 왼쪽부터 채움.",
    detailed: "완전 이진 트리는 마지막 레벨을 제외하고는 모든 노드가 꽉 차 있고, 마지막 레벨은 왼쪽에서 오른쪽으로 차곡차곡 채워진다. '모든 레벨이 꽉 참'은 포화 이진 트리, '한쪽으로 편향'은 편향 트리 설명이다. 그래서 중간에 빈자리가 없어 배열 저장이 효율적이다.",
    source: "10차시 슬라이드 3"
  },
  {
    id: "DS_F5Q10",
    set: 5,
    week: 10,
    topic: "배열 인덱스 공식",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙을 배열(첨자 1부터)에 저장할 때, 인덱스 i 노드의 왼쪽 자식·오른쪽 자식·부모 위치를 옳게 짝지은 것은?",
    choices: [
      "왼쪽 2i+1, 오른쪽 2i+2, 부모 ⌊(i-1)/2⌋",
      "왼쪽 2i, 오른쪽 2i+1, 부모 ⌊i/2⌋",
      "왼쪽 i/2, 오른쪽 i/2+1, 부모 2i",
      "왼쪽 i-1, 오른쪽 i+1, 부모 i/2"
    ],
    answer: 1,
    brief: "1-인덱스: 좌 2i, 우 2i+1, 부모 ⌊i/2⌋.",
    detailed: "힙은 첨자 1부터 저장하므로 왼쪽 자식 2i, 오른쪽 자식 2i+1, 부모 ⌊i/2⌋(소수점 버림)이다. 첫 보기는 9차시의 0-인덱스 배열 트리 공식으로 혼동하면 안 된다.",
    source: "10차시 슬라이드 4, 7"
  },
  {
    id: "DS_F5Q11",
    set: 5,
    week: 10,
    topic: "힙의 저장 방식",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙을 연결 리스트보다 배열로 구현하는 것이 효율적인 이유로 옳은 것은?",
    choices: [
      "힙은 편향 트리라서 배열에 빈 공간이 거의 생기지 않기 때문",
      "배열은 포인터를 사용해 부모·자식 이동이 자유롭기 때문",
      "배열은 동적 할당 없이 트리 높이를 몰라도 삽입할 수 있기 때문",
      "완전 이진 트리라 빈틈없이 담겨 인덱스 수식으로 위치를 계산하기 때문"
    ],
    answer: 3,
    brief: "완전 이진 트리라 배열에 빈틈없이 담겨 인덱스 계산이 쉬움.",
    detailed: "힙은 완전 이진 트리라 중간에 빈 노드가 없어 배열에 빈틈없이 저장되고, ⌊i/2⌋·2i·2i+1 수식만으로 부모·자식 위치를 즉시 계산한다. 편향 트리(첫 보기)나 포인터 사용(둘째 보기)은 틀린 설명이다.",
    source: "10차시 슬라이드 3"
  },
  {
    id: "DS_F5Q12",
    set: 5,
    week: 10,
    topic: "삭제 위치",
    type: "multiple_choice",
    difficulty: "basic",
    question: "Max Heap에서 노드 삭제(deletion)는 항상 어느 노드를 대상으로 하는가?",
    choices: [
      "마지막 레벨에서 맨 오른쪽에 있는 단말 노드",
      "가장 최근에 삽입되어 들어온 마지막 노드",
      "전체에서 가장 큰 값을 가진 루트 노드",
      "왼쪽 서브트리에서 가장 작은 값을 가진 노드"
    ],
    answer: 2,
    brief: "힙 삭제는 항상 루트(최댓값)를 뺀다.",
    detailed: "힙에서의 삭제는 항상 루트 노드를 삭제(반환)한다. Max Heap이면 루트가 최댓값이므로 우선순위가 가장 높은 원소를 꺼내는 것과 같다. 삭제 후 마지막 노드를 루트로 올려 재구성한다.",
    source: "10차시 슬라이드 7"
  },
  {
    id: "DS_F5Q13",
    set: 5,
    week: 11,
    topic: "자료 관계 분류",
    type: "multiple_choice",
    difficulty: "basic",
    question: "자료들 간의 관계에 따른 자료구조 분류에서 'm:n 관계'를 표현하는 비선형 자료구조는?",
    choices: [
      "m:n 관계를 표현하는 그래프(Graph)",
      "1:1 선형 관계를 표현하는 리스트(List)",
      "후입선출 선형 구조인 스택(Stack)",
      "1:n 관계를 표현하는 이진 트리(Binary Tree)"
    ],
    answer: 0,
    brief: "1:1=리스트, 1:n=트리, m:n=그래프.",
    detailed: "교수님은 자료구조를 '자료들의 관계에 맞게 정리한 것'으로 보고 1:1(선형, 리스트), 1:n(트리), m:n(그래프)로 분류했다. 복잡하고 다양한 m:n 관계를 표현하는 대표 비선형 자료구조가 그래프다.",
    source: "11차시 슬라이드 6"
  },
  {
    id: "DS_F5Q14",
    set: 5,
    week: 11,
    topic: "쾨니히스베르크 추상화",
    type: "multiple_choice",
    difficulty: "basic",
    question: "오일러가 쾨니히스베르크 다리 문제를 그래프로 추상화(abstraction)할 때 대응시킨 것으로 옳은 것은?",
    choices: [
      "땅(지역)을 간선에, 다리를 정점에 대응",
      "강을 정점에, 도시를 간선에 대응",
      "땅(지역)을 정점에, 다리를 간선에 대응",
      "사람을 정점에, 이동 거리를 가중치에 대응"
    ],
    answer: 2,
    brief: "땅=정점(vertex), 다리=간선(edge).",
    detailed: "오일러는 나무, 집 같은 복잡한 지형을 무시하고 땅(지역)을 정점으로, 다리를 간선으로 단순화했다. 이것이 그래프 이론의 출발점인 추상화의 핵심이다.",
    source: "11차시 슬라이드 5"
  },
  {
    id: "DS_F5Q15",
    set: 5,
    week: 11,
    topic: "경로의 길이",
    type: "multiple_choice",
    difficulty: "basic",
    question: "그래프에서 '경로의 길이(length of a path)'의 정의로 옳은 것은?",
    choices: [
      "경로상에 거치는 정점(vertex)의 수",
      "경로의 시작 정점이 가지는 차수",
      "경로상에 놓인 간선(edge)의 수",
      "경로상에 거친 정점 번호들의 합"
    ],
    answer: 2,
    brief: "경로의 길이 = 경로상 간선의 수.",
    detailed: "경로의 길이는 경로상에 있는 간선의 수다. 교수님 설명대로 시작과 끝을 포함해 정점을 n+2개 거치면 그 사이 간선은 n+1개이므로 경로의 길이는 n+1이 된다(정점 수보다 1 적음).",
    source: "11차시 슬라이드 12"
  },
  {
    id: "DS_F5Q16",
    set: 5,
    week: 11,
    topic: "인접 리스트",
    type: "multiple_choice",
    difficulty: "basic",
    question: "인접 리스트(adjacency list) 표현 방식에 대한 설명으로 옳은 것은?",
    choices: [
      "어떤 경우에도 인접 행렬보다 메모리를 더 많이 쓴다",
      "N개의 연결 리스트로 각 정점의 인접 정점을 링크로 저장한다",
      "두 정점의 인접 여부를 O(1)에 즉시 확인할 수 있어 빠르다",
      "간선에 방향이 있는 방향 그래프에는 사용할 수 없다"
    ],
    answer: 1,
    brief: "정점별 연결 리스트 배열로 인접 정점 저장.",
    detailed: "인접 리스트는 N개의 연결 리스트 배열로, 각 정점마다 자신과 인접한 정점들을 링크 필드로 연결해 저장한다. 간선이 적은 희소 그래프에서 공간 효율이 좋아 실제로 많이 쓰인다. 다만 두 정점의 인접 여부 확인은 리스트를 순회해야 해 O(1)이 아니다(이건 인접 행렬의 장점).",
    source: "11차시 슬라이드 18"
  },
  {
    id: "DS_F5Q17",
    set: 5,
    week: 11,
    topic: "ADT adjacent",
    type: "multiple_choice",
    difficulty: "basic",
    question: "그래프 ADT 연산 adjacent(v)의 기능으로 옳은 것은?",
    choices: [
      "그래프 전체를 원소 없는 공백 상태로 초기화한다",
      "정점 v를 그래프에서 완전히 삭제한다",
      "정점 v에 인접한 정점들의 리스트를 반환한다",
      "두 정점 사이에 새로운 간선을 하나 삽입한다"
    ],
    answer: 2,
    brief: "adjacent(v) = 정점 v의 인접 정점 리스트 반환.",
    detailed: "adjacent(v)는 정점 v에 인접한 정점들의 리스트를 반환하는 연산이다. 탐색 시 '다음에 어디로 갈지'를 결정하는 가장 필수적인 연산이다.",
    source: "11차시 슬라이드 21"
  },
  {
    id: "DS_F5Q18",
    set: 5,
    week: 11,
    topic: "DFS 자료구조",
    type: "multiple_choice",
    difficulty: "basic",
    question: "깊이 우선 탐색(DFS)에서 후진(되돌아가기)을 위해 사용하는 자료구조와 시간 복잡도로 옳은 것은?",
    choices: [
      "스택(Stack)을 쓰며 간선 수에 비례한 O(e)",
      "큐(Queue)를 쓰며 정점 제곱에 비례한 O(N^2)",
      "힙(Heap)을 쓰며 정렬 비용 수준인 O(N log N)",
      "해시 테이블을 쓰며 상수 시간인 O(1)"
    ],
    answer: 0,
    brief: "DFS = 스택, O(e).",
    detailed: "DFS는 막다른 길에서 갈림길로 후진해야 하므로 LIFO인 스택을 사용한다(방문 노드 push, 막히면 pop). 인접 리스트 기반 DFS의 시간 복잡도는 간선 수에 비례해 O(e)다. 교수님은 '자동차로 직진만 하다 막히면 후진'에 비유했다.",
    source: "11차시 슬라이드 24, 26"
  },
  {
    id: "DS_F5Q19",
    set: 5,
    week: 12,
    topic: "신장트리 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "그래프 G의 신장트리(Spanning Tree) G'가 만족해야 하는 조건으로 옳지 않은 것은?",
    choices: [
      "V(G') = V(G): 원래 그래프의 모든 정점을 포함한다",
      "G'는 모든 정점이 이어진 연결(connected) 그래프이다",
      "간선 수가 정점 수보다 1개 많다: |E(G')| = n + 1",
      "어떤 정점에서도 자기로 돌아오는 사이클이 없다"
    ],
    answer: 2,
    brief: "신장트리 간선 수는 n-1이지 n+1이 아니다.",
    detailed: "신장트리는 모든 정점을 포함(V(G')=V(G))하고 연결되어 있으며 간선 수가 정점 수보다 1개 적은 n-1개여야 한다. 간선이 n-1개이므로 사이클이 생기지 않는다. 간선 수를 n+1이라고 한 보기가 틀렸다.",
    source: "12차시 슬라이드 4"
  },
  {
    id: "DS_F5Q20",
    set: 5,
    week: 12,
    topic: "비트리 에지",
    type: "multiple_choice",
    difficulty: "basic",
    question: "이미 만들어진 신장트리에 비트리 에지(nontree edge) (v,w)를 하나 추가하면 어떤 일이 생기는가?",
    choices: [
      "트리에 정점이 하나 더 새로 늘어난다",
      "두 정점 사이 경로가 둘이 되어 사이클이 생긴다",
      "연결이 끊겨 트리가 두 조각으로 분리된다",
      "구조에 아무런 변화도 일어나지 않는다"
    ],
    answer: 1,
    brief: "비트리 에지를 더하면 항상 사이클 발생.",
    detailed: "신장트리는 이미 모든 정점을 n-1개 간선으로 연결한 상태다. 여기에 트리에 없던 간선(비트리 에지)을 더하면 두 정점 사이에 경로가 두 개가 되어 반드시 사이클이 만들어진다. 슬라이드 명시 성질이다.",
    source: "12차시 슬라이드 7"
  },
  {
    id: "DS_F5Q21",
    set: 5,
    week: 12,
    topic: "DFS/BFS 보조 자료구조",
    type: "multiple_choice",
    difficulty: "basic",
    question: "그래프 탐색에서 DFS(깊이 우선)와 BFS(너비 우선)가 각각 사용하는 보조 자료구조로 옳은 것은?",
    choices: [
      "DFS는 큐(Queue), BFS는 스택(Stack)을 쓴다",
      "DFS와 BFS 둘 다 힙(Heap)을 보조로 쓴다",
      "DFS와 BFS 둘 다 우선순위 큐를 보조로 쓴다",
      "DFS는 되돌아오기용 스택, BFS는 예약용 큐를 쓴다"
    ],
    answer: 3,
    brief: "DFS=스택, BFS=큐.",
    detailed: "DFS는 '갈 때까지 간다'로 막히면 되돌아오기 위해 스택(Stack)을 쓴다. BFS는 인접 정점을 먼저 모두 방문하려고 다음 방문 노드를 큐(Queue)에 넣어둔다. 두 탐색의 방문 간선만 남기면 신장트리가 된다.",
    source: "12차시 슬라이드 5"
  },
  {
    id: "DS_F5Q22",
    set: 5,
    week: 12,
    topic: "최소신장트리 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "최소신장트리(Minimum Cost Spanning Tree, MCST)에 대한 설명으로 옳은 것은?",
    choices: [
      "간선 가중치의 합이 가장 커지는 신장트리이다",
      "그래프의 모든 간선 n개를 빠짐없이 포함한다",
      "n-1개 간선의 가중치 합이 최소인 신장트리이다",
      "정점 수와 무관하게 그래프마다 항상 하나뿐이다"
    ],
    answer: 2,
    brief: "MCST = n-1개 간선 가중치 합 최소, Kruskal·Prim.",
    detailed: "MCST는 각 간선에 비용(거리·시간)이 주어진 그래프에서 n-1개 간선을 택하되 그 가중치 합이 최소가 되는 신장트리다. 대표 알고리즘이 Kruskal(간선 기반)과 Prim(정점 기반)이다.",
    source: "12차시 슬라이드 10"
  },
  {
    id: "DS_F5Q23",
    set: 5,
    week: 12,
    topic: "최단경로 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "최단경로(Shortest Path) 문제의 정의로 옳은 것은?",
    choices: [
      "모든 정점을 사이클 없이 잇는 트리를 찾는 문제",
      "두 정점 사이 가중치 합이 최대인 경로를 찾는 문제",
      "한 정점의 차수를 가능한 한 최대로 만드는 문제",
      "출발점에서 목적지까지 가중치 합이 최소인 경로를 찾는 문제"
    ],
    answer: 3,
    brief: "출발점→목적지 가중치 합 최소 경로.",
    detailed: "최단경로는 하나의 출발 정점에서 다른 정점까지 이르는 경로 중 간선 가중치(시간·비용·거리)의 합이 최소가 되는 경로를 찾는 문제다. 가중치가 없어 간선 개수만 최소화하려는 경우에는 모든 간선 가중치를 1로 두면 된다. 첫 보기는 (최소)신장트리 문제다.",
    source: "12차시 슬라이드 19"
  },
  {
    id: "DS_F5Q24",
    set: 5,
    week: 12,
    topic: "추이적 관계",
    type: "multiple_choice",
    difficulty: "basic",
    question: "집합 X의 원소 a, b, c에 대해 추이적 관계(Transitive Relation)의 정의로 옳은 것은?",
    choices: [
      "aRb이면 항상 bRa도 성립한다 (대칭 관계)",
      "aRb이고 bRc이면 aRc도 성립한다 (추이 관계)",
      "모든 원소 a에 대해 aRa가 성립한다 (반사 관계)",
      "aRb이고 bRa이면 a=b이다 (반대칭 관계)"
    ],
    answer: 1,
    brief: "aRb ∧ bRc ⇒ aRc.",
    detailed: "추이적 관계는 a가 b와 관계가 있고 b가 c와 관계가 있으면 a도 c와 관계가 있다는 논리다(A→B, B→C ⇒ A→C). '크다·크거나 같다·같다'가 추이적 관계의 예다. 그래프에 적용하면 도달 가능성 문제가 된다.",
    source: "12차시 슬라이드 35"
  },
  {
    id: "DS_F5Q25",
    set: 5,
    week: 13,
    topic: "정렬의 목적",
    type: "multiple_choice",
    difficulty: "basic",
    question: "정렬(Sorting)을 수행하는 가장 근본적인 목적으로 가장 적절한 것은?",
    choices: [
      "데이터가 차지하는 저장 공간을 줄이기 위해",
      "이후의 검색(Search)을 더 빠르게 하기 위해",
      "데이터를 외부에 노출되지 않게 암호화하기 위해",
      "값이 같은 중복 데이터를 찾아 제거하기 위해"
    ],
    answer: 1,
    brief: "정렬의 목적 = 검색 가속.",
    detailed: "정렬은 데이터를 크기 순으로 나열하는 것으로, 핵심 목적은 이후 검색을 빠르게 하기 위함이다. 도서관 서지정보가 정렬돼 있어야 책을 빨리 찾듯, 정렬은 탐색 효율을 위한 전처리다.",
    source: "13차시 §1 정렬의 개념"
  },
  {
    id: "DS_F5Q26",
    set: 5,
    week: 13,
    topic: "내부/외부 정렬",
    type: "multiple_choice",
    difficulty: "basic",
    question: "정렬 방식의 분류에 대한 설명으로 옳은 것은?",
    choices: [
      "내부 정렬은 디스크 같은 외부 기억장치에서 수행한다",
      "외부 정렬은 데이터가 주기억장치 용량보다 작을 때 쓴다",
      "머지 정렬은 분할 후 합치는 대표적인 외부 정렬이다",
      "퀵 정렬은 디스크를 쓰는 대표적인 외부 정렬이다"
    ],
    answer: 2,
    brief: "외부 정렬 대표 = 머지.",
    detailed: "내부 정렬은 데이터가 주기억장치(RAM) 용량보다 작을 때 메모리 안에서 수행한다(선택·버블·삽입·퀵·힙). 외부 정렬은 데이터가 너무 커서 디스크 등으로 분할 정렬 후 합치는 방식이며 머지 정렬이 대표다.",
    source: "13차시 §1 정렬의 분류"
  },
  {
    id: "DS_F5Q27",
    set: 5,
    week: 13,
    topic: "Swap 이동 횟수",
    type: "multiple_choice",
    difficulty: "basic",
    question: "두 데이터 A와 B의 값을 서로 교환(Swap)할 때 발생하는 데이터 이동(저장) 연산 횟수는?",
    choices: [
      "이동 1번 (한 번의 대입으로 끝난다)",
      "이동 2번 (서로 한 번씩 대입한다)",
      "이동 3번 (임시 변수를 거쳐 대입한다)",
      "이동 0번 (값 이동 없이 포인터만 바꾼다)"
    ],
    answer: 2,
    brief: "Swap = temp 포함 이동 3번.",
    detailed: "두 값을 맞바꾸려면 임시 변수 temp가 필요하다. temp=A, A=B, B=temp로 총 3번의 저장(이동) 연산이 발생한다. 정렬의 이동 횟수를 셀 때 Swap 1회를 이동 3회로 계산하는 것이 핵심.",
    source: "13차시 §1-2 비교와 이동"
  },
  {
    id: "DS_F5Q28",
    set: 5,
    week: 13,
    topic: "버블 정렬 1단계",
    type: "multiple_choice",
    difficulty: "basic",
    question: "버블 정렬(Bubble Sort)의 1단계(한 번의 전체 패스)가 끝났을 때의 결과로 옳은 것은?",
    choices: [
      "가장 작은 값이 맨 앞자리로 이동해 자리잡는다",
      "가장 큰 값이 맨 뒷자리로 이동해 자리잡는다",
      "중앙값이 배열의 한가운데로 이동해 자리잡는다",
      "값들의 위치에 아무런 변화도 일어나지 않는다"
    ],
    answer: 1,
    brief: "큰 값이 맨 뒤로 → 정렬 그룹이 뒤에서 형성.",
    detailed: "버블 정렬은 인접한 두 값을 비교해 앞이 크면 뒤로 보낸다. 한 패스가 끝나면 가장 큰 값이 맨 뒤에 자리잡으며, 선택·삽입과 달리 정렬된 그룹이 '뒤에서부터' 형성된다.",
    source: "13차시 §5 버블 정렬"
  },
  {
    id: "DS_F5Q29",
    set: 5,
    week: 13,
    topic: "퀵 정렬 전략",
    type: "multiple_choice",
    difficulty: "basic",
    question: "퀵 정렬(Quick Sort)의 기본 전략에 대한 설명으로 옳은 것은?",
    choices: [
      "정렬된 그룹에 원소를 하나씩 끼워 넣어 정렬한다",
      "피벗 기준으로 분할·정복하며 평균적으로 가장 빠르다",
      "값을 비교하지 않고 버킷으로 분류해 정렬한다",
      "입력 상태와 무관하게 항상 O(N²) 시간이 걸린다"
    ],
    answer: 1,
    brief: "분할정복·피벗, 평균 최속.",
    detailed: "퀵 정렬은 피벗을 기준으로 작은 값/큰 값으로 리스트를 분할하고 재귀적으로 정복하는 분할 정복 알고리즘이다. 평균 시간 복잡도 O(N log N)으로 평균적으로 가장 빠른 정렬로 알려져 있다.",
    source: "13차시 §7 퀵 정렬"
  },
  {
    id: "DS_F5Q30",
    set: 5,
    week: 13,
    topic: "힙 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙(Heap)의 구조적 정의로 가장 정확한 것은?",
    choices: [
      "모든 노드가 두 자식을 갖춘 포화 이진 트리이다",
      "부모가 자식보다 크거나 작은 완전 이진 트리이다",
      "왼쪽 < 루트 < 오른쪽인 이진 탐색 트리(BST)이다",
      "모든 노드의 차수가 일정하게 같은 일반 트리이다"
    ],
    answer: 1,
    brief: "힙 = 완전 이진 트리(+부모·자식 대소).",
    detailed: "힙은 '부모 노드 값이 자식보다 크거나(Max) 작은(Min) 완전 이진 트리'다. 핵심은 반드시 완전 이진 트리라는 점이며, BST(L<Root<R)와 혼동하면 안 된다.",
    source: "13차시 §8 힙 정렬"
  }
];

export const set6 = [
  {
    id: "DS_F6Q1",
    set: 6,
    week: 9,
    topic: "Left-Child Right-Sibling",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Left-Child Right-Sibling(왼쪽 자식-오른쪽 형제) 표현법에 대한 설명으로 옳은 것은?",
    choices: [
      "노드마다 자식 수만큼 링크를 두어 메모리를 절약한다",
      "왼쪽 링크는 오른쪽 형제, 오른쪽 링크는 부모를 가리킨다",
      "모든 노드의 링크를 2개로 고정하고 45도 회전하면 이진 트리가 된다",
      "일반 트리는 표현할 수 없고 이진 트리에만 쓰이는 방식이다"
    ],
    answer: 2,
    brief: "링크 2개 고정 + 45도 회전 → 이진 트리.",
    detailed: "n-링크 표현법은 메모리 낭비가 크므로, 모든 노드에 링크를 딱 2개(왼쪽=가장 왼쪽 자식, 오른쪽=바로 오른쪽 형제)만 둔다. 이렇게 표현한 일반 트리를 45도 시계 방향으로 회전시키면 모든 노드가 자식 ≤ 2개인 이진 트리로 완벽히 변환된다.",
    source: "9차시 §4 표현 방법"
  },
  {
    "id": "DS_F6Q2",
    "set": 6,
    "week": 9,
    "topic": "이진트리 수학적 성질",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "이진 트리에서 레벨 i(루트=레벨 1)가 가질 수 있는 최대 노드 수는?",
    "choices": [
      "i개",
      "2i개",
      "i² 개",
      "2^(i−1) 개"
    ],
    "answer": 3,
    "brief": "레벨 i 최대 노드 = 2^(i−1).",
    "detailed": "레벨 1은 2^0=1개, 레벨 2는 2^1=2개, 레벨 3은 2^2=4개로 레벨 i의 최대 노드 수는 2^(i−1)개다. 매 레벨마다 자식이 최대 2배로 늘기 때문이다.",
    "source": "9차시 §5 이진 트리 수학적 성질"
  },
  {
    "id": "DS_F6Q3",
    "set": 6,
    "week": 9,
    "topic": "이진트리 종류",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "높이가 h인 포화 이진 트리(Full Binary Tree)의 노드 수는?",
    "choices": [
      "h개",
      "2^h − 1개",
      "2^(h−1)개",
      "h² 개"
    ],
    "answer": 1,
    "brief": "포화 이진 트리 노드 수 = 2^h − 1.",
    "detailed": "포화 이진 트리는 모든 레벨이 꽉 찬 트리다. 각 레벨 i의 노드 수(2^(i−1))를 레벨 1부터 h까지 합하면 2^0+2^1+...+2^(h−1) = 2^h − 1개가 된다. 한쪽으로만 치우친 편향 트리(높이 h)의 최소 노드 수는 h개다.",
    "source": "9차시 §5 이진 트리 종류"
  },
  {
    "id": "DS_F6Q4",
    "set": 6,
    "week": 9,
    "topic": "이진트리 최소 높이",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "노드가 n개일 때 이진 트리가 가질 수 있는 최소 높이는?",
    "choices": [
      "n",
      "n/2",
      "⌈log₂(n+1)⌉",
      "2^n"
    ],
    "answer": 2,
    "brief": "최소 높이 = ⌈log₂(n+1)⌉.",
    "detailed": "노드를 위 레벨부터 빈틈없이 꽉 채울 때 높이가 최소가 된다. 높이 h로 담을 수 있는 최대 노드가 2^h − 1 ≥ n 이어야 하므로, 최소 높이는 ⌈log₂(n+1)⌉이다. 이때 탐색이 O(log N)으로 가장 효율적이다.",
    "source": "9차시 §5 이진 트리 수학적 성질"
  },
  {
    id: "DS_F6Q5",
    set: 6,
    week: 9,
    topic: "이진트리 종류",
    type: "multiple_choice",
    difficulty: "medium",
    question: "완전 이진 트리(Complete Binary Tree)에 대한 설명으로 옳은 것은?",
    choices: [
      "모든 레벨이 예외 없이 빈틈없이 꽉 차 있는 트리이다",
      "한쪽 방향으로만 자식이 이어지는 선형 편향 구조이다",
      "모든 노드의 자식 수가 항상 정확히 1개인 트리이다",
      "마지막 레벨을 제외하고 꽉 차 있고 마지막 레벨은 왼쪽부터 채워진다"
    ],
    answer: 3,
    brief: "마지막 레벨만 왼쪽부터 빈틈없이 채움.",
    detailed: "완전 이진 트리는 마지막 레벨을 제외한 모든 레벨이 꽉 차 있고, 마지막 레벨은 왼쪽에서 오른쪽으로 빈틈없이 채워진 트리다. 모든 레벨이 꽉 찬 것은 포화 이진 트리, 한쪽으로만 이어진 것은 편향 트리다. 완전 이진 트리는 배열 저장에 적합하다.",
    source: "9차시 §5 이진 트리 종류"
  },
  {
    id: "DS_F6Q6",
    set: 6,
    week: 9,
    topic: "배열 저장 인덱스",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이진 트리를 0-인덱스(인덱스 0부터 시작) 배열로 저장할 때, 인덱스 i 노드의 왼쪽 자식 인덱스는?",
    choices: [
      "2i + 1",
      "2i",
      "i / 2",
      "2i + 2"
    ],
    answer: 0,
    brief: "0-인덱스: 왼쪽 자식 = 2i+1.",
    detailed: "0부터 시작하는 배열 저장에서 인덱스 i의 왼쪽 자식은 2i+1, 오른쪽 자식은 2i+2, 부모는 ⌊(i−1)/2⌋다. (주의: 히프처럼 1-인덱스를 쓰면 왼쪽 2i, 오른쪽 2i+1, 부모 ⌊i/2⌋로 공식이 달라진다.)",
    source: "9차시 §6 배열 저장"
  },
  {
    "id": "DS_F6Q7",
    "set": 6,
    "week": 10,
    "topic": "배열 저장 인덱스 적용",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "1-인덱스 힙 배열에서 인덱스 6 노드의 부모와, 인덱스 3 노드의 오른쪽 자식 인덱스를 옳게 구한 것은?",
    "choices": [
      "6의 부모 = 2, 3의 오른쪽 자식 = 7",
      "6의 부모 = 4, 3의 오른쪽 자식 = 6",
      "6의 부모 = 3, 3의 오른쪽 자식 = 7",
      "6의 부모 = 3, 3의 오른쪽 자식 = 6"
    ],
    "answer": 2,
    "brief": "6의 부모 ⌊6/2⌋=3, 3의 오른쪽 자식 2·3+1=7.",
    "detailed": "부모 = ⌊i/2⌋이므로 6의 부모는 ⌊6/2⌋ = 3. 오른쪽 자식 = 2i+1이므로 3의 오른쪽 자식은 2·3+1 = 7이다(왼쪽 자식은 2·3 = 6).",
    "source": "10차시 슬라이드 4, 7"
  },
  {
    id: "DS_F6Q8",
    set: 6,
    week: 10,
    topic: "삽입 위치 결정",
    type: "multiple_choice",
    difficulty: "medium",
    question: "힙(Heap)에 새 노드를 넣을 때 그 삽입 위치를 정하는 규칙으로 옳은 것은?",
    choices: [
      "루트와 비교해 작으면 왼쪽 서브트리, 크면 오른쪽 서브트리로 내려간다",
      "마지막 레벨 맨 왼쪽 빈자리부터 채운 뒤 부모와 비교해 위로 올린다",
      "항상 루트 자리에 먼저 넣은 다음 자식과 비교하며 아래로 내린다",
      "트리에서 가장 깊은 단말 노드의 왼쪽 자식 자리에 곧바로 넣는다"
    ],
    answer: 1,
    brief: "자리부터(마지막 레벨 왼→오 빈자리) 채우고 Up-heap.",
    detailed: "힙 삽입은 완전 이진 트리를 유지하려고 마지막 레벨 맨 오른쪽 다음 빈자리(왼→오)에 무조건 넣은 뒤, 부모와 비교해 크면 교환하며 위로 올린다(Up-heap). 루트와 비교해 작으면 왼쪽으로 내려가는 방식은 BST 삽입이라 힙과 다르다.",
    source: "10차시 슬라이드 5"
  },
  {
    id: "DS_F6Q9",
    set: 6,
    week: 10,
    topic: "삽입 재구성(Up-heap)",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Max Heap 삽입 시 재구성(adjust / Up-heap) 과정에 대한 설명으로 옳은 것은?",
    choices: [
      "부모와 비교해 부모가 작으면 교환하고 부모가 더 클 때까지 위로 반복한다",
      "자식과 비교해 더 큰 자식과 교환하며 아래쪽으로 계속 내려간다",
      "새 노드를 넣은 뒤 트리 전체를 처음부터 다시 정렬한다",
      "새 노드는 언제나 한 번만 교환하면 힙 조건이 완성된다"
    ],
    answer: 0,
    brief: "부모와 비교, 부모가 작으면 교환하며 위로(Up-heap).",
    detailed: "삽입은 새 노드와 부모를 비교해 부모가 작으면 교환하고, 루트에 닿거나 부모가 더 클 때까지 위로 올라간다. 자식과 비교해 내려가는 것은 삭제 시의 Down-heap 설명이다. 한 번만 교환한다는 보장은 없다.",
    source: "10차시 슬라이드 5"
  },
  {
    id: "DS_F6Q10",
    set: 6,
    week: 10,
    topic: "삭제 재구성(Down-heap)",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Max Heap 루트 삭제 후 재구성(Down-heap) 절차로 옳은 것은?",
    choices: [
      "마지막 노드를 루트로 올린 뒤 더 큰 자식과 교환하며 아래로 내려간다",
      "루트의 왼쪽 자식을 비교 없이 무조건 루트 자리로 끌어올린다",
      "마지막 노드를 루트로 올린 뒤 더 작은 자식과 교환하며 내려간다",
      "트리를 중위 탐색하여 정렬된 순서대로 처음부터 다시 채운다"
    ],
    answer: 0,
    brief: "마지막 노드를 루트로 올리고 더 큰 자식과 교환하며 하강.",
    detailed: "삭제 후 마지막 레벨 맨 마지막 노드를 빈 루트에 올린 뒤, 왼쪽·오른쪽 자식 중 더 큰 값과 교환하며 내려간다(Down-heap). 더 작은 자식과 바꾸면 그 자식이 형제보다 작아져 힙 규칙이 깨지므로 반드시 더 큰 자식과 교환한다.",
    source: "10차시 슬라이드 7, 8"
  },
  {
    id: "DS_F6Q11",
    set: 6,
    week: 10,
    topic: "삭제 그림 트레이싱",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Max Heap [20(루트), 15, 2, 14, 10]에서 루트 20을 삭제하고 재구성(Down-heap)했을 때, 새 루트와 그 두 자식은?",
    choices: [
      "루트 14, 자식 15·2",
      "루트 10, 자식 15·2",
      "루트 2, 자식 15·14",
      "루트 15, 자식 14·2"
    ],
    answer: 3,
    brief: "20 삭제→10 루트→15와 교환→14와 교환→루트 15, 자식 14·2.",
    detailed: "20 삭제 후 마지막 노드 10을 루트로 올리면 [10,15,2,14]. 10의 자식 15·2 중 큰 15와 교환 → [15,10,2,14]. 다시 10이 자식 14보다 작아 교환 → 최종 루트 15, 자식 14·2, 14의 자식 10이 된다.",
    source: "10차시 슬라이드 8"
  },
  {
    "id": "DS_F6Q12",
    "set": 6,
    "week": 10,
    "topic": "시간 복잡도",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "힙의 삽입·삭제 시간 복잡도와, N개 데이터를 모두 삽입해 힙을 구성하는 비용으로 옳은 것은?",
    "choices": [
      "삽입·삭제 O(N), 전체 구성 O(N²)",
      "삽입·삭제 O(1), 전체 구성 O(N)",
      "삽입 O(log N), 삭제 O(N), 전체 구성 O(N²)",
      "삽입·삭제 O(log N), 전체 구성 O(N log N)"
    ],
    "answer": 3,
    "brief": "삽입·삭제 모두 트리 높이 h = O(log N), 전체 구성 O(N log N).",
    "detailed": "삽입(Up-heap)·삭제(Down-heap) 모두 트리의 높이 h = log₂N + 1 만큼만 오르내리므로 O(log N)이다. N개를 모두 삽입해 힙을 구성하면 O(N log N)이 된다.",
    "source": "10차시 슬라이드 5, 7"
  },
  {
    id: "DS_F6Q13",
    set: 6,
    week: 11,
    topic: "BFS 자료구조",
    type: "multiple_choice",
    difficulty: "basic",
    question: "너비 우선 탐색(BFS)에 사용하는 자료구조와 그 이유로 옳은 것은?",
    choices: [
      "스택(Stack)을 쓴다. 방문을 후진해 되돌아가야 하기 때문이다",
      "큐(Queue)를 쓴다. 먼저 발견한 가까운 정점을 먼저 방문해야 하기 때문이다",
      "우선순위 큐를 쓴다. 간선 가중치가 작은 순으로 방문하기 때문이다",
      "트리(Tree)를 쓴다. 정점 간 계층 구조를 그대로 저장하기 때문이다"
    ],
    answer: 1,
    brief: "BFS = 큐(FIFO), 가까운 정점 먼저.",
    detailed: "BFS는 시작 정점에서 거리가 가까운(인접한) 정점을 먼저 다 방문하고 물결 퍼지듯 넓혀 간다. 먼저 발견한 정점을 먼저 방문해야 하므로 FIFO 구조인 큐를 사용한다(방문할 정점 enqueue, 방문 시 dequeue).",
    source: "11차시 슬라이드 27"
  },
  {
    id: "DS_F6Q14",
    set: 6,
    week: 11,
    topic: "차수(in/out-degree)",
    type: "multiple_choice",
    difficulty: "basic",
    question: "방향 그래프에서 정점의 차수(degree)에 대한 설명으로 옳은 것은?",
    choices: [
      "방향 그래프에서는 정점의 차수를 정의할 수 없다",
      "정점의 차수는 언제나 그래프의 정점 수와 같다",
      "진입 차수는 들어오는 간선 수, 진출 차수는 나가는 간선 수다",
      "한 정점의 진입 차수와 진출 차수는 항상 서로 같다"
    ],
    answer: 2,
    brief: "in-degree=들어오는 간선, out-degree=나가는 간선.",
    detailed: "차수는 정점에 부속된 간선의 수다. 방향 그래프에서는 들어오는 간선 수인 진입 차수(in-degree)와 나가는 간선 수인 진출 차수(out-degree)로 구분한다. 둘은 정점마다 다를 수 있다.",
    source: "11차시 슬라이드 14"
  },
  {
    id: "DS_F6Q15",
    set: 6,
    week: 11,
    topic: "오일러 경로 조건",
    type: "multiple_choice",
    difficulty: "medium",
    question: "오일러 경로(모든 다리를 한 번씩 건너 출발점 복귀)가 존재하기 위한 조건으로 옳은 것은?",
    choices: [
      "모든 정점의 차수가 짝수이기만 하면 항상 존재한다",
      "모든 정점이 연결되고 홀수 차수 정점이 2개 이하여야 한다",
      "간선의 수가 정점의 수보다 반드시 더 많아야 한다",
      "그래프가 간선에 방향이 있는 방향 그래프여야 한다"
    ],
    answer: 1,
    brief: "모든 정점 연결 + 홀수 차수 정점 2개 이하.",
    detailed: "오일러 정리: (1) 모든 정점이 연결, (2) 차수가 홀수인 정점이 2개 이하. 쾨니히스베르크 다리는 네 정점의 차수가 5,3,3,3으로 홀수 정점이 4개라 조건을 위배해 오일러 경로가 존재하지 않는다.",
    source: "11차시 슬라이드 5"
  },
  {
    id: "DS_F6Q16",
    set: 6,
    week: 11,
    topic: "방향/무방향 표기",
    type: "multiple_choice",
    difficulty: "medium",
    question: "무방향 그래프와 방향 그래프의 간선 표기 및 성질로 옳은 것은?",
    choices: [
      "무방향을 꺾쇠 <vi,vj>로 쓰고 (vi,vj)≠(vj,vi)로 본다",
      "둘 다 괄호 (vi,vj)로 쓰며 간선의 방향만 서로 다르다",
      "방향 그래프는 항상 무방향 그래프보다 간선 수가 적다",
      "무방향은 괄호로 쓰고 대칭, 방향은 꺾쇠로 쓰고 비대칭이다"
    ],
    answer: 3,
    brief: "무방향=괄호, 대칭 / 방향=꺾쇠, 비대칭.",
    detailed: "무방향 그래프는 괄호 (vi,vj)로 표기하며 (vi,vj)=(vj,vi)라 중복해서 쓰지 않는다. 방향 그래프는 꺾쇠 <vi,vj>로 표기하며 <vi,vj>≠<vj,vi>라 방향이 다르면 별개의 간선으로 따로 명시한다.",
    source: "11차시 슬라이드 6"
  },
  {
    id: "DS_F6Q17",
    set: 6,
    week: 11,
    topic: "완전 그래프 간선 수",
    type: "multiple_choice",
    difficulty: "medium",
    question: "정점이 n개인 무방향 완전 그래프와 방향 완전 그래프의 최대 간선 수를 바르게 짝지은 것은? (예: n=5)",
    choices: [
      "무방향 n(n-1)/2 (=10), 방향 n(n-1) (=20)",
      "무방향 n(n-1) (=20), 방향 n(n-1)/2 (=10)",
      "무방향 n^2 (=25), 방향 n^2-n (=20)",
      "무방향 n-1 (=4), 방향 2(n-1) (=8)"
    ],
    answer: 0,
    brief: "무방향 n(n-1)/2, 방향 n(n-1).",
    detailed: "완전 그래프는 가능한 최대 간선을 가진다. 무방향은 방향이 없어 중복 절반을 나눠 n(n-1)/2, 방향은 양방향을 모두 세어 n(n-1)이다. n=5면 각각 10, 20. 정점 3개면 무방향 최대 3개, 4개면 6개다.",
    source: "11차시 슬라이드 10"
  },
  {
    id: "DS_F6Q18",
    set: 6,
    week: 11,
    topic: "인접 vs 부속",
    type: "multiple_choice",
    difficulty: "medium",
    question: "무방향 그래프에서 간선 (a,b)가 존재할 때 '인접(adjacent)'과 '부속(incident)'의 구분으로 옳은 것은?",
    choices: [
      "정점 a와 간선 (a,b)가 서로 인접한 관계라고 부른다",
      "정점 a는 정점 b에 인접하고, 간선 (a,b)는 정점 a·b에 부속한다",
      "간선 (a,b)는 정점 a·b에 인접하고, 두 정점끼리는 부속한다",
      "인접과 부속은 사실상 같은 의미로 구분 없이 쓰인다"
    ],
    answer: 1,
    brief: "인접=정점끼리, 부속=간선이 정점에.",
    detailed: "인접(adjacent)은 간선으로 직접 연결된 두 정점의 관계(정점 a는 정점 b에 인접)다. 부속(incident)은 간선 입장에서 그 간선이 특정 정점에 연결되어 있음(간선 (a,b)는 정점 a, b에 부속)을 말한다. 주체가 정점이냐 간선이냐로 구분한다.",
    source: "11차시 슬라이드 10"
  },
  {
    id: "DS_F6Q19",
    set: 6,
    week: 12,
    topic: "완전 그래프 신장트리 개수",
    type: "multiple_choice",
    difficulty: "medium",
    question: "정점이 4개인 완전 그래프가 가질 수 있는 서로 다른 신장트리의 개수는?",
    choices: [
      "16개",
      "4개",
      "64개",
      "1개"
    ],
    answer: 0,
    brief: "n^(n-2) = 4^(4-2) = 4^2 = 16.",
    detailed: "정점이 n개인 완전 그래프의 신장트리 개수는 n^(n-2)개다(케일리 공식). n=4이면 4^(4-2) = 4^2 = 16개가 된다.",
    source: "12차시 슬라이드 7"
  },
  {
    id: "DS_F6Q20",
    set: 6,
    week: 12,
    topic: "Kruskal 알고리즘",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Kruskal 알고리즘의 동작 원리로 옳은 것은?",
    choices: [
      "시작 정점에서 인접한 정점을 하나씩 골라 트리에 추가해 나간다",
      "간선을 가중치 오름차순으로 정렬해 작은 것부터 택하되 사이클이면 버린다",
      "가장 가중치가 큰 간선부터 차례로 선택해 트리를 만들어 간다",
      "정점을 무작위 순서로 골라 임의로 연결해 트리를 완성한다"
    ],
    answer: 1,
    brief: "간선 오름차순, 작은 것부터, 사이클이면 버림.",
    detailed: "Kruskal은 간선 기반이다. 모든 간선을 가중치 오름차순 정렬 후 가장 작은 간선부터 택하고, 추가 시 사이클이 생기면 그 간선을 버린다(discard). 선택 간선이 n-1개가 될 때까지 반복한다. 시작 정점에서 인접 정점을 붙여 가는 것은 Prim이다.",
    source: "12차시 슬라이드 11"
  },
  {
    id: "DS_F6Q21",
    set: 6,
    week: 12,
    topic: "가중치 동률 규칙",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Kruskal·Prim에서 여러 간선의 가중치가 같을 때(동률), 어느 간선을 먼저 선택하는지에 대한 설명으로 옳은 것은?",
    choices: [
      "어느 간선을 먼저 택해도 모두 유효한 MST가 되며 총 가중치는 동일하다",
      "동률이면 반드시 알파벳이 앞선 정점의 간선만 택해야 유효한 MST가 된다",
      "동률인 간선은 모두 동시에 트리에 함께 선택해 넣는다",
      "동률인 간선은 전부 버리고 다음 가중치로 넘어간다"
    ],
    answer: 0,
    brief: "동률이면 어느 쪽을 택해도 유효한 MST, 총 가중치 동일.",
    detailed: "간선 가중치가 동률일 때 무엇을 먼저 고르는지는 알고리즘이 규정하지 않는다. 선택에 따라 트리 모양은 달라질 수 있으나 모두 유효한 최소 신장 트리이며 총 가중치는 같다. (강의 답안은 일관성을 위해 알파벳·작은 번호 정점을 우선하는 관례를 쓰지만, 이는 알고리즘의 성질이 아니라 채점 편의용 규칙이다.)",
    source: "12차시 슬라이드 11"
  },
  {
    id: "DS_F6Q22",
    set: 6,
    week: 12,
    topic: "Prim 알고리즘",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Prim 알고리즘의 정점 추가 규칙으로 옳은 것은?",
    choices: [
      "전체 간선을 정렬해 가중치가 작은 간선부터 무조건 추가해 간다",
      "현재 남은 간선 중 가중치가 가장 큰 간선의 정점을 추가한다",
      "트리 집합 안의 정점과 밖의 정점을 잇는 최소 간선의 정점을 추가한다",
      "시작점에서 도달이 불가능한 정점부터 먼저 골라 추가한다"
    ],
    answer: 2,
    brief: "TV 안↔밖 잇는 최소 간선 정점을 추가.",
    detailed: "Prim은 정점 기반이다. 시작 정점을 TV에 넣고, u∈TV이고 v∉TV인 간선 (u,v) 중 가중치가 최소인 것을 골라 v를 TV에 추가한다. 이미 TV에 있는 정점은 다시 잇지 않아 사이클이 생기지 않는다. 전체 간선을 정렬해 추가하는 것은 Kruskal이다.",
    source: "12차시 슬라이드 15"
  },
  {
    id: "DS_F6Q23",
    set: 6,
    week: 12,
    topic: "Kruskal vs Prim",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Kruskal과 Prim 알고리즘의 선택 단위(기준) 차이로 옳은 것은?",
    choices: [
      "Kruskal은 정점 기반이고, Prim은 간선 기반으로 선택한다",
      "Kruskal은 간선 기반이고, Prim은 정점 기반으로 선택한다",
      "두 알고리즘 모두 정점(Vertex)을 단위로 선택한다",
      "두 알고리즘 모두 간선(Edge)을 단위로 선택한다"
    ],
    answer: 1,
    brief: "Kruskal=간선 기반, Prim=정점 기반.",
    detailed: "Kruskal은 전체 간선을 가중치 순으로 정렬해 간선을 하나씩 택하는 간선 기반이다. Prim은 한 정점에서 시작해 트리에 정점을 하나씩 붙여 키우는 정점 기반이다. 둘 다 그리디로 n-1개 간선을 모아 최소신장트리를 만든다.",
    source: "12차시 슬라이드 11, 15"
  },
  {
    id: "DS_F6Q24",
    set: 6,
    week: 12,
    topic: "그리디 최적성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Kruskal/Prim이 매 단계 최소 간선만 고르는데도 전체적으로 더 짧은 다른 연결이 없는 이유로 옳은 것은?",
    choices: [
      "사이클을 막으며 단계마다 Local Min을 택해 Global Min이 보장된다",
      "운이 좋은 입력일 때만 최소신장트리가 우연히 만들어진다",
      "Kruskal만 최적이 보장되고 Prim은 최적이 보장되지 않는다",
      "정점 수가 매우 적은 경우에 한해서만 최적이 보장된다"
    ],
    answer: 0,
    brief: "Local Min 선택 → Global Min 수학적 보장.",
    detailed: "두 알고리즘 모두 사이클을 방지하면서 항상 현재 상황의 최소 가중치(Local Minimum)만 선택해 연결하므로, 궁극적으로 전체 가중치 합이 최소인 최소신장트리(Global Minimum)를 도출함이 수학적으로 보장된다(그리디 최적성).",
    source: "12차시 슬라이드 10"
  },
  {
    id: "DS_F6Q25",
    set: 6,
    week: 13,
    topic: "Max Heap 루트",
    type: "multiple_choice",
    difficulty: "basic",
    question: "최대 힙(Max Heap)에서 루트(Root) 노드에 대한 설명으로 옳은 것은?",
    choices: [
      "전체 원소 중 항상 가장 작은 값이 위치한다",
      "전체 원소 중 항상 가장 큰 값이 위치한다",
      "전체 원소의 중앙값에 해당하는 값이 위치한다",
      "가장 마지막에 삽입된 값이 그대로 위치한다"
    ],
    answer: 1,
    brief: "Max Heap 루트 = 최대값.",
    detailed: "Max Heap은 부모가 자식보다 항상 크므로 루트에 전체 최대값이 위치한다. 따라서 최대값 접근이 O(1)이고, 힙 정렬은 루트(최대)를 반복적으로 빼내 정렬한다.",
    source: "13차시 §8 힙 정렬"
  },
  {
    id: "DS_F6Q26",
    set: 6,
    week: 13,
    topic: "선택 정렬 비교 횟수",
    type: "multiple_choice",
    difficulty: "medium",
    question: "데이터 N개에 대한 선택 정렬(Selection Sort)의 총 비교 횟수로 옳은 것은?",
    choices: [
      "N",
      "N − 1",
      "N(N−1)/2",
      "N log N"
    ],
    answer: 2,
    brief: "(N−1)+…+1 = N(N−1)/2.",
    detailed: "선택 정렬은 1단계에서 N−1번, 2단계 N−2번 … 마지막 1번 비교한다. 합은 (N−1)+(N−2)+…+1 = N(N−1)/2이며 최고차항 기준 O(N²)이다.",
    source: "13차시 §4 선택 정렬"
  },
  {
    id: "DS_F6Q27",
    set: 6,
    week: 13,
    topic: "선택 정렬 이동·안정성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "선택 정렬의 이동 횟수와 안정성에 대한 설명으로 옳은 것은?",
    choices: [
      "단계마다 Swap이 일어나 총 이동 3(N−1)이고 불안정 정렬이다",
      "데이터 이동이 전혀 없으며 순서가 보존되는 안정 정렬이다",
      "총 이동 횟수가 N(N−1)/2이고 순서가 보존되는 안정 정렬이다",
      "데이터 이동은 N번뿐이지만 순서가 깨지는 불안정 정렬이다"
    ],
    answer: 0,
    brief: "이동 3(N−1), 불안정.",
    detailed: "선택 정렬은 각 단계에서 최소값을 그룹 맨 앞과 1번 Swap(이동 3)한다. 총 N−1단계이므로 이동은 3(N−1)이다. 같은 값의 상대 순서가 보장되지 않아 안정성을 만족하지 않는다(불안정).",
    source: "13차시 §4 선택 정렬"
  },
  {
    "id": "DS_F6Q28",
    "set": 6,
    "week": 13,
    "topic": "버블 정렬 최악 이동",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "데이터가 역순으로 정렬되어 있을 때 버블 정렬의 최악 이동 횟수로 옳은 것은?",
    "choices": [
      "N(N−1)/2",
      "3(N−1)",
      "3 × N(N−1)/2",
      "N log N"
    ],
    "answer": 2,
    "brief": "역순 → 비교마다 Swap → 3·N(N−1)/2.",
    "detailed": "버블 정렬의 비교는 항상 N(N−1)/2회다. 역순이면 비교할 때마다 100% Swap이 일어나고 Swap 1회는 이동 3회이므로 최악 이동은 3 × N(N−1)/2이다.",
    "source": "13차시 §5 버블 정렬"
  },
  {
    id: "DS_F6Q29",
    set: 6,
    week: 13,
    topic: "삽입 정렬 Shift",
    type: "multiple_choice",
    difficulty: "medium",
    question: "삽입 정렬(Insertion Sort)이 선택·버블 정렬과 비교해 데이터 이동에서 갖는 차이로 옳은 것은?",
    choices: [
      "두 값을 무조건 Swap(이동 3번)하는 방식만 사용한다",
      "타겟을 빼두고 큰 값들을 한 칸씩 미는 Shift로 이동을 줄인다",
      "정렬 과정에서 데이터를 전혀 이동하지 않고 처리한다",
      "어떤 입력에서도 항상 선택 정렬보다 이동이 더 많다"
    ],
    answer: 1,
    brief: "삽입 = Shift(이동 절약).",
    detailed: "선택·버블은 두 값을 무조건 Swap(이동 3)하지만, 삽입은 타겟을 임시변수에 빼고 정렬된 그룹의 큰 값들을 한 칸씩 뒤로 민(Shift) 뒤 제자리에 넣는다. 매번 3번 이동하는 Swap보다 이동 횟수를 줄일 수 있다.",
    source: "13차시 §6 삽입 정렬"
  },
  {
    "id": "DS_F6Q30",
    "set": 6,
    "week": 13,
    "topic": "삽입 정렬 최선",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "이미 오름차순으로 정렬된 데이터에 삽입 정렬을 적용할 때의 시간 복잡도는?",
    "choices": [
      "O(1)",
      "O(N)",
      "O(N log N)",
      "O(N²)"
    ],
    "answer": 1,
    "brief": "이미 정렬 → 최선 O(N).",
    "detailed": "이미 정렬돼 있으면 각 타겟은 앞의 값과 1번만 비교하고 이동이 거의 없어 전체 O(N)이다. 삽입 정렬은 '거의 정렬된' 데이터에서 매우 효율적이다. 반대로 역순이면 최악 O(N²).",
    "source": "13차시 §6 삽입 정렬"
  }
];

export const set7 = [
  {
    id: "DS_F7Q1",
    set: 7,
    week: 9,
    topic: "탐색 활용",
    type: "multiple_choice",
    difficulty: "medium",
    question: "이진 트리를 '복사(Copy)'할 때 가장 적합한 탐색 방법과 그 이유로 옳은 것은?",
    choices: [
      "레벨 탐색 — 큐로 한 층씩 차례대로 복사하면 되기 때문",
      "중위 탐색 — 좌·우 순서대로 오름차순으로 복사되기 때문",
      "전위 탐색 — 루트를 먼저 비교한 뒤 자식을 복사하기 때문",
      "후위 탐색 — 좌·우 서브트리를 먼저 복사한 뒤 루트를 연결하기 때문"
    ],
    answer: 3,
    brief: "복사 = 후위(자식 먼저 생성 후 루트).",
    detailed: "트리 복사는 후위 탐색(L→R→V)을 쓴다. 왼쪽·오른쪽 서브트리를 먼저 완전히 복사·생성한 뒤 마지막에 부모(루트) 노드를 생성해 자식들과 연결해야 하기 때문이다. 반면 두 트리의 비교(Compare)는 루트부터 확인하는 전위 탐색이 효율적이다.",
    source: "9차시 §8 이진 트리 알고리즘"
  },
  {
    "id": "DS_F7Q2",
    "set": 7,
    "week": 9,
    "topic": "쓰레드 이진트리",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "노드가 n개인 이진 트리에서 NULL인 링크(스레드로 재활용 가능한 링크)의 개수는?",
    "choices": [
      "n − 1개",
      "2n개",
      "n + 1개",
      "n개"
    ],
    "answer": 2,
    "brief": "전체 링크 2n − 자식 링크 (n−1) = n+1.",
    "detailed": "n개 노드는 각각 왼쪽·오른쪽 링크 2개씩, 총 2n개의 링크를 갖는다. 이 중 실제 자식을 가리키는 링크는 n−1개뿐이므로, 2n − (n−1) = n+1개의 링크가 NULL로 비어 낭비된다. 스레드 이진 트리는 이 n+1개의 NULL 링크를 재활용한다.",
    "source": "9차시 §9 쓰레드 이진 트리"
  },
  {
    id: "DS_F7Q3",
    set: 7,
    week: 9,
    topic: "쓰레드 이진트리",
    type: "multiple_choice",
    difficulty: "medium",
    question: "스레드 이진 트리에서 어떤 노드의 '오른쪽 링크가 NULL'일 때, 이 링크를 스레드로 사용하면 무엇을 가리키도록 설정하는가?",
    choices: [
      "트리의 루트 노드를 가리키게 한다",
      "자기 자신 노드를 가리키게 한다",
      "중위 탐색 순서상 바로 앞 노드(선행자)",
      "중위 탐색 순서상 바로 다음 노드(후속자)"
    ],
    answer: 3,
    brief: "오른쪽 NULL → 중위 후속자(successor).",
    detailed: "스레드 이진 트리는 NULL 링크를 중위 탐색 순서 정보로 재활용한다. 오른쪽 링크가 NULL이면 중위 탐색상 '바로 다음 노드(후속자, successor)'를, 왼쪽 링크가 NULL이면 '바로 앞 노드(선행자, predecessor)'를 가리키게 한다. 링크가 진짜 자식인지 스레드인지는 Boolean 플래그로 구분한다.",
    source: "9차시 §9 쓰레드 이진 트리"
  },
  {
    id: "DS_F7Q4",
    set: 7,
    week: 9,
    topic: "BST vs Heap",
    type: "multiple_choice",
    difficulty: "medium",
    question: "BST와 힙(Heap, Max Heap 기준)의 차이로 옳지 않은 것은?",
    choices: [
      "BST는 중위 탐색 시 오름차순이 되지만 힙은 그렇지 않다",
      "힙은 완전 이진 트리이지만 BST는 모양 제약이 없어 편향될 수 있다",
      "최댓값을 힙은 루트에서 O(1)에 얻지만 BST는 한쪽 끝까지 따라가야 한다",
      "BST와 힙 모두 '부모 ≥ 자식'이라는 동일한 키 규칙을 따른다"
    ],
    answer: 3,
    brief: "'부모 ≥ 자식'은 힙만의 규칙. 옳지 않음.",
    detailed: "BST는 'L < Root < R'(좌우 구분) 규칙을, 힙은 '부모 ≥ 자식'(좌우 무관) 규칙을 따른다. 둘은 서로 다른 규칙이므로 '부모 ≥ 자식을 둘 다 따른다'는 설명이 틀리다. 나머지는 모두 옳다: BST 중위=정렬, 힙=완전 이진 트리 강제, 힙 루트=최값 O(1).",
    source: "9차시 §11 BST vs Heap (기말 출제 예고)"
  },
  {
    id: "DS_F7Q5",
    set: 7,
    week: 9,
    topic: "탐색 트레이싱",
    type: "multiple_choice",
    difficulty: "hard",
    question: "루트 A, A의 왼쪽 자식 B·오른쪽 자식 C, B의 왼쪽 자식 D·오른쪽 자식 E, C의 왼쪽 자식 F인 이진 트리가 있다. 중위 탐색(Inorder) 결과는?",
    choices: [
      "A B D E C F",
      "D B E A F C",
      "D E B F C A",
      "A B C D E F"
    ],
    answer: 1,
    brief: "중위(L V R): D B E A F C.",
    detailed: "중위 탐색은 L→V→R이다. A에서 왼쪽 B를 먼저 처리: B의 왼쪽 D → B → 오른쪽 E = (D B E). 그다음 루트 A. 마지막으로 오른쪽 C: C의 왼쪽 F → C = (F C). 합치면 D B E A F C다. 'A B D E C F'는 전위, 'D E B F C A'는 후위, 'A B C D E F'는 레벨 순서다.",
    source: "9차시 §7 트리 탐색 (트레이싱)"
  },
  {
    id: "DS_F7Q6",
    set: 7,
    week: 9,
    topic: "BST 삭제",
    type: "multiple_choice",
    difficulty: "hard",
    question: "BST에서 자식을 2개 모두 가진 노드를 삭제할 때, 그 자리를 대체할 노드로 올바른 것은?",
    choices: [
      "트리 전체에서 가장 큰 값을 가진 노드",
      "삭제 노드의 부모(parent) 노드를 끌어올린다",
      "왼쪽 서브트리의 최댓값 또는 오른쪽 서브트리의 최솟값 노드",
      "어떤 경우든 항상 트리의 루트 노드로 대체한다"
    ],
    answer: 2,
    brief: "왼쪽 최댓값 또는 오른쪽 최솟값으로 대체.",
    detailed: "자식이 2개인 노드를 삭제할 때는 BST 규칙(L<Root<R)이 깨지지 않도록 '삭제되는 값과 가장 가까운' 노드로 대체해야 한다. 이는 왼쪽 서브트리에서 가장 큰 값(가장 오른쪽 노드, 직전 선행자) 또는 오른쪽 서브트리에서 가장 작은 값(가장 왼쪽 노드, 직후 후속자)이다. 자식 0개는 그냥 삭제, 1개는 그 자식을 끌어올린다.",
    source: "9차시 §10 BST 삭제 3 Case"
  },
  {
    "id": "DS_F7Q7",
    "set": 7,
    "week": 10,
    "topic": "삽입 코드 트레이싱",
    "type": "multiple_choice",
    "difficulty": "hard",
    "question": "다음 insert_max_heap 코드에서 while 루프의 반복 조건으로 빈칸에 들어갈 것은?\n  i = ++(*n);\n  while ( ____ ) { heap[i] = heap[i/2]; i /= 2; }\n  heap[i] = item;",
    "choices": [
      "(i != 1) && (item.key < heap[i/2].key)",
      "(i <= *n) && (item.key > heap[2*i].key)",
      "(i != 1) && (item.key > heap[i/2].key)",
      "(i == 1) || (item.key > heap[i*2].key)"
    ],
    "answer": 2,
    "brief": "루트가 아니고(i!=1) 새 값이 부모보다 클 때 계속 위로.",
    "detailed": "Max Heap 삽입은 i가 루트(1)가 아니고 새 값 item.key가 부모 heap[i/2].key보다 클 동안 부모를 끌어내리며 위로 올라간다. 조건은 (i != 1) && (item.key > heap[i/2].key)다. 루프 안에서는 swap 대신 부모를 내려 복사하고 마지막에 item을 한 번 넣는다.",
    "source": "10차시 슬라이드 6"
  },
  {
    id: "DS_F7Q8",
    set: 7,
    week: 10,
    topic: "삭제 코드 트레이싱",
    type: "multiple_choice",
    difficulty: "hard",
    question: "delete_max_heap 코드에서 두 자식 중 더 큰 자식을 고르고, 내려갈지 멈출지 판단하는 부분으로 옳은 것은? (Max Heap)",
    choices: [
      "항상 왼쪽 자식만 골라 temp.key <= heap[child].key면 break 한다",
      "heap[child].key < heap[child+1].key면 child++, temp.key >= heap[child].key면 break",
      "heap[child].key > heap[child+1].key면 child++, temp.key < heap[child].key면 break",
      "항상 오른쪽 자식만 골라 temp.key >= heap[child].key면 child *= 2 한다"
    ],
    answer: 1,
    brief: "오른쪽이 더 크면 child++로 큰 자식 선택, temp≥자식이면 break.",
    detailed: "child < *n(오른쪽 자식 존재) 이고 heap[child].key < heap[child+1].key면 child++로 더 큰 오른쪽 자식을 선택한다. 그 다음 올라온 값 temp.key가 그 자식보다 크거나 같으면(temp.key >= heap[child].key) 제자리이므로 break, 아니면 자식을 위로 올리고 child *= 2로 내려간다.",
    source: "10차시 슬라이드 9"
  },
  {
    id: "DS_F7Q9",
    set: 7,
    week: 10,
    topic: "BST vs Heap",
    type: "multiple_choice",
    difficulty: "hard",
    question: "BST와 Heap의 비교로 옳지 않은 것은?",
    choices: [
      "BST는 중위 탐색이 오름차순이지만, 힙은 형제 순서가 없어 정렬을 보장하지 않는다",
      "BST는 모양이 임의여서 편향될 수 있지만, 힙은 완전 이진 트리 형태가 강제된다",
      "최댓값을 찾을 때 Max Heap은 루트라 O(1)이지만, BST는 맨 오른쪽까지 따라가야 한다",
      "BST와 힙은 모두 자식이 항상 정확히 2개인 포화 이진 트리여야만 한다"
    ],
    answer: 3,
    brief: "BST·힙 모두 포화 이진 트리 강제는 틀린 설명.",
    detailed: "'둘 다 포화 이진 트리여야 한다'는 설명이 틀렸다. BST는 모양 제약이 없고(편향 가능), 힙은 완전 이진 트리이지 포화 이진 트리가 아니다. 나머지 세 설명은 모두 옳은 BST vs Heap 비교다.",
    source: "10차시 슬라이드 3, 9차시 연계"
  },
  {
    id: "DS_F7Q10",
    set: 7,
    week: 10,
    topic: "연습문제 Max Heap 구성",
    type: "multiple_choice",
    difficulty: "hard",
    question: "데이터 (21, 12, 33, 14, 25, 36, 7, 28, 39, 10)를 순서대로 삽입해 만든 Max Heap의 루트와 배열([1]~[10])로 옳은 것은?",
    choices: [
      "루트 39, 배열 [39, 36, 33, 28, 14, 21, 7, 12, 25, 10]",
      "루트 21, 배열 [21, 12, 33, 14, 25, 36, 7, 28, 39, 10]",
      "루트 39, 배열 [39, 33, 36, 28, 25, 14, 21, 12, 10, 7]",
      "루트 36, 배열 [36, 39, 33, 28, 14, 21, 7, 12, 25, 10]"
    ],
    answer: 0,
    brief: "Max Heap 최종 = [39,36,33,28,14,21,7,12,25,10], 루트 39.",
    detailed: "각 값을 마지막 빈자리에 넣고 부모와 비교해 Up-heap하면 최종 배열은 [39, 36, 33, 28, 14, 21, 7, 12, 25, 10]이다. 루트는 전체 최댓값 39, 모든 부모 ≥ 자식, 완전 이진 트리 형태를 유지한다.",
    source: "10차시 슬라이드 10"
  },
  {
    id: "DS_F7Q11",
    set: 7,
    week: 10,
    topic: "연습문제 Heap 삭제",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Max Heap [39, 36, 33, 28, 14, 21, 7, 12, 25, 10]에서 루트를 한 번 삭제하고 재구성한 결과 배열([1]~[9])은?",
    choices: [
      "[36, 33, 28, 25, 14, 21, 7, 12, 10]",
      "[10, 36, 33, 28, 14, 21, 7, 12, 25]",
      "[36, 28, 33, 25, 14, 21, 7, 12, 10]",
      "[33, 36, 28, 25, 14, 21, 7, 12, 10]"
    ],
    answer: 2,
    brief: "39 삭제→10 루트→36·28·25와 Down-heap→[36,28,33,25,14,21,7,12,10].",
    detailed: "루트 39를 빼고 마지막 노드 10을 루트로 올린 뒤 Down-heap: 10 vs (36,33)→36과 교환, 10 vs (28,14)→28과 교환, 10 vs 25→25와 교환. 최종 배열은 [36, 28, 33, 25, 14, 21, 7, 12, 10]이다.",
    source: "10차시 슬라이드 10"
  },
  {
    id: "DS_F7Q12",
    set: 7,
    week: 10,
    topic: "연습문제 BST 후위 탐색",
    type: "multiple_choice",
    difficulty: "hard",
    question: "같은 데이터로 만든 BST의 후위(Postorder, L-R-V) 탐색 결과는?",
    choices: [
      "10, 7, 14, 12, 28, 25, 39, 36, 33, 21",
      "7, 10, 12, 14, 21, 25, 28, 33, 36, 39",
      "21, 12, 7, 10, 14, 33, 25, 28, 36, 39",
      "39, 36, 33, 28, 25, 21, 14, 12, 10, 7"
    ],
    answer: 0,
    brief: "후위 = 10,7,14,12,28,25,39,36,33,21 (루트 21 마지막).",
    detailed: "후위 탐색(L-R-V)은 자식들을 모두 방문한 뒤 루트를 마지막에 방문하므로 루트 21이 맨 끝에 온다: 10, 7, 14, 12, 28, 25, 39, 36, 33, 21. '7,10,12,…'은 중위, '21,12,7,…'은 전위 결과이며 단순 내림차순은 오답이다.",
    source: "10차시 슬라이드 10, 9차시 연계"
  },
  {
    id: "DS_F7Q13",
    set: 7,
    week: 11,
    topic: "탐색-트리 대응",
    type: "multiple_choice",
    difficulty: "medium",
    question: "그래프 탐색과 트리 탐색의 대응 관계로 옳은 것은?",
    choices: [
      "DFS는 트리의 중위 탐색, BFS는 트리의 후위 탐색에 대응한다",
      "DFS는 트리의 레벨 탐색, BFS는 트리의 전위 탐색에 대응한다",
      "DFS와 BFS 모두 트리의 후위 탐색에 똑같이 대응한다",
      "DFS는 트리의 전위 탐색, BFS는 트리의 레벨 탐색에 대응한다"
    ],
    answer: 3,
    brief: "DFS=전위, BFS=레벨.",
    detailed: "DFS(깊이 우선)는 루트에서 한쪽 끝까지 파고드는 트리의 전위 탐색(preorder)에 대응하고, BFS(너비 우선)는 가까운 정점부터 방문하는 트리의 레벨 탐색(level order)에 대응한다. 자료구조도 DFS는 스택, BFS는 큐로 짝지어진다.",
    source: "11차시 슬라이드 22"
  },
  {
    id: "DS_F7Q14",
    set: 7,
    week: 11,
    topic: "탐색 공통 규칙",
    type: "multiple_choice",
    difficulty: "medium",
    question: "DFS/BFS에서 방문할 수 있는 인접 정점이 여러 개일 때 공통으로 적용하는 방문 순서 원칙은?",
    choices: [
      "정점 번호가 큰 것부터 먼저 방문한다",
      "간선 가중치가 큰 것부터 먼저 방문한다",
      "정점 번호가 작은 것(알파벳 빠른 것)부터 먼저 방문한다",
      "정해진 규칙 없이 무작위 순서로 방문한다"
    ],
    answer: 2,
    brief: "작은 번호부터 먼저 방문.",
    detailed: "갈 수 있는 인접 정점이 여러 개면 정점 번호가 작은 것부터 먼저 방문한다. BFS 트레이싱에서 큐에는 작은 숫자를 먼저 넣어야 순서가 꼬이지 않으며, 시험에서 흔히 틀리는 부분이라 큐를 직접 그려가며 추적하는 것이 좋다.",
    source: "11차시 슬라이드 25, 28"
  },
  {
    id: "DS_F7Q15",
    set: 7,
    week: 11,
    topic: "신장 트리",
    type: "multiple_choice",
    difficulty: "medium",
    question: "정점이 10개인 연결 그래프에서 DFS로 모든 정점을 방문하며 지나간 간선이 9개(n-1개)였다. 이로부터 내릴 수 있는 결론은?",
    choices: [
      "지나간 간선만 남기면 사이클 없이 모든 정점을 잇는 신장 트리가 된다",
      "그래프 안에 사이클이 반드시 하나 이상 존재한다는 증거가 된다",
      "그래프가 모든 정점쌍이 직접 이어진 완전 그래프임을 뜻한다",
      "DFS 수행이 도중에 잘못 진행되었음을 알리는 오류 신호다"
    ],
    answer: 0,
    brief: "탐색이 지난 간선 = n-1개 → 신장 트리.",
    detailed: "모든 정점을 방문하면서 거친 간선이 n-1개(여기선 9개)면 사이클이 없고 모든 정점이 연결된 트리가 된다. DFS/BFS를 통해 신장 트리(Spanning Tree)를 구할 수 있다는 핵심 결론이다.",
    source: "11차시 슬라이드 24-26"
  },
  {
    id: "DS_F7Q16",
    set: 7,
    week: 11,
    topic: "연결 요소 계산",
    type: "multiple_choice",
    difficulty: "medium",
    question: "connected() 함수가 for(i=0;i<n;i++)에서 visited가 안 된 정점마다 dfs(i)를 호출하고 줄바꿈을 출력한다. 정점 0~7이 {0,1,2,3}과 {4,5,6,7}의 두 덩어리로 나뉜 그래프 G4에 적용한 결과로 옳은 것은?",
    choices: [
      "출력은 한 줄로 나오고 연결 요소는 1개로 계산된다",
      "출력은 2줄이고 연결 요소는 2개다(0 1 2 3 / 4 5 6 7)",
      "출력은 8줄로 나오고 연결 요소는 8개로 계산된다",
      "dfs가 한 번도 호출되지 않아 아무것도 출력되지 않는다"
    ],
    answer: 1,
    brief: "dfs 호출 횟수 = 연결 요소 수 = 2.",
    detailed: "임의 정점에서 DFS를 한 번 돌리면 그 정점과 연결된 한 덩어리(연결 요소)를 모두 방문한다. 남은 미방문 정점에서 다시 호출하면 다음 요소를 찾는다. G4는 {0,1,2,3}과 {4,5,6,7} 두 덩어리라 dfs가 2번 호출되어 2줄이 출력되고 연결 요소는 2개다.",
    source: "11차시 슬라이드 30"
  },
  {
    id: "DS_F7Q17",
    set: 7,
    week: 11,
    topic: "12차시 예고 개념",
    type: "multiple_choice",
    difficulty: "medium",
    question: "다음 차시(그래프 II)에서 다루는 개념과 그 설명으로 옳지 않은 것은?",
    choices: [
      "신장 트리(Spanning Tree): 한 정점에서 퍼져 모든 정점을 잇는 사이클 없는 트리",
      "최소 신장 트리(MST): 간선 가중치의 합이 최소가 되는 신장 트리",
      "최단 경로(Shortest Path): 한 시작 정점에서 다른 모든 정점에 이르는 최소 비용 경로",
      "추이적 폐쇄(Transitive Closure): 두 정점 사이 간선을 하나로 제한하는 단순 그래프 규칙"
    ],
    answer: 3,
    brief: "추이적 폐쇄는 도달 가능성(A→B,B→C면 A→C) 판별이지 단순 그래프 규칙이 아니다.",
    detailed: "추이적 폐쇄(Transitive Closure)는 A가 B에, B가 C에 연결되면 A에서 C로도 도달 가능한지(Reachability)를 알아내는 개념으로, 두 정점 사이 간선 하나 제한(단순 그래프)과는 무관하다. 나머지 신장 트리, 최소 신장 트리, 최단 경로 설명은 모두 옳으며 12차시에서 다룬다.",
    source: "11차시 슬라이드 2(목차), 전사 12차시 예고"
  },
  {
    "id": "DS_F7Q18",
    "set": 7,
    "week": 11,
    "topic": "DFS 코드 추적",
    "type": "multiple_choice",
    "difficulty": "hard",
    "question": "다음 인접 리스트가 정점 0~5에 대해 [0:1,2] [1:0,3,4] [2:0,5] [3:1] [4:1] [5:2]로 주어질 때, dfs(0)이 작은 번호부터 방문하면 출력 순서는? (visited로 재방문 차단)",
    "choices": [
      "0 2 5 1 3 4",
      "0 1 2 3 4 5",
      "0 2 1 5 3 4",
      "0 1 3 4 2 5"
    ],
    "answer": 3,
    "brief": "0→1→3→(후진)→4→(후진)→2→5.",
    "detailed": "dfs(0): 0 방문 후 인접 {1,2} 중 작은 1로 감. dfs(1): 1 방문, 인접 {0(방문),3,4} 중 3으로 감. dfs(3): 3 방문, 인접 {1} 모두 방문됨→후진. 다시 1에서 4로 감, dfs(4): 4 방문→후진해 0으로 복귀. 0의 다음 인접 2로 감, dfs(2): 2 방문, 5로 감, dfs(5): 5 방문. 따라서 0 1 3 4 2 5.",
    "source": "11차시 슬라이드 25, 26"
  },
  {
    id: "DS_F7Q19",
    set: 7,
    week: 12,
    topic: "choose 함수 (정점 선택)",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Dijkstra의 choose 함수가 매 단계 선택하는 정점은?",
    choices: [
      "아직 방문(확정)하지 않은 정점 중 distance 값이 가장 작은 정점",
      "이미 방문 확정이 끝난 정점 중 distance 값이 가장 큰 정점",
      "방문 여부와 무관하게 인덱스 번호가 가장 큰 정점",
      "distance가 아직 무한대 초기값으로 남아 있는 정점"
    ],
    answer: 0,
    brief: "미방문 정점 중 distance 최소를 선택.",
    detailed: "choose는 !found[i](아직 S에 없음)인 정점 중 distance[i]가 최소인 위치를 반환한다. 그 정점을 found=TRUE로 확정(S에 추가)한 뒤, 그 정점을 경유하는 이웃들의 distance를 갱신한다.",
    source: "12차시 슬라이드 24, 25"
  },
  {
    id: "DS_F7Q20",
    set: 7,
    week: 12,
    topic: "Dijkstra 도달 불가 정점",
    type: "multiple_choice",
    difficulty: "medium",
    question: "방향 그래프에서 Dijkstra를 수행할 때, 들어오는(incoming) 간선이 전혀 없는 정점 V5의 distance는 끝까지 어떻게 되는가?",
    choices: [
      "0으로 초기화된 채 끝까지 그대로 남는다",
      "출발점 정점의 distance와 같은 값으로 맞춰진다",
      "수행 단계마다 점점 더 작은 값으로 갱신된다",
      "도달할 수 없으므로 끝까지 무한대(강의 표현 1000)로 남는다"
    ],
    answer: 3,
    brief: "incoming 없는 정점은 도달 불가 → ∞(1000) 유지.",
    detailed: "들어오는 간선이 없는 정점은 다른 어떤 정점을 통해서도 도달할 수 없으므로 distance가 갱신되지 않고 초기값 무한대(강의에서는 1000)로 끝까지 남는다. 방향 그래프의 한계를 보여주는 예다.",
    source: "12차시 슬라이드 23"
  },
  {
    id: "DS_F7Q21",
    set: 7,
    week: 12,
    topic: "추이적 폐쇄 행렬",
    type: "multiple_choice",
    difficulty: "medium",
    question: "추이적 폐쇄 행렬 A+ 의 원소 A+[i][j] 값의 의미로 옳은 것은?",
    choices: [
      "정점 i에서 j로 가는 경로(길이 > 0)가 하나라도 있으면 1, 없으면 0",
      "정점 i에서 j로 가는 경로상 간선들의 가중치를 모두 더한 합",
      "정점 i와 j 사이를 잇는 최단 경로의 거리(비용) 값",
      "정점 i의 차수와 정점 j의 차수를 서로 곱한 값"
    ],
    answer: 0,
    brief: "A+[i][j]=1 ⇔ i→j 경로(길이>0) 존재.",
    detailed: "추이적 폐쇄 행렬 A+는 도달 가능성을 나타낸다. 정점 i에서 j로 가는 경로(길이가 0보다 큰 경로)가 하나라도 존재하면 A+[i][j]=1, 전혀 갈 수 없으면 0이다. 인접 행렬 A를 곱해(또는 Floyd-Warshall로) 구한다.",
    source: "12차시 슬라이드 36"
  },
  {
    id: "DS_F7Q22",
    set: 7,
    week: 12,
    topic: "방향 그래프 도달 가능성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "방향 그래프에서 어떤 정점 c가 나가는(outgoing) 간선이 전혀 없을 때, 추이적 폐쇄 행렬에서 c에 해당하는 행(c→다른 정점)의 값은?",
    choices: [
      "모든 정점에 도달 가능해 그 행의 원소가 모두 1이 된다",
      "자기 자신을 뜻하는 대각선 원소만 1이고 나머지는 0이다",
      "방향과 무관하게 무방향 그래프처럼 대칭으로 채워진다",
      "c에서 갈 수 있는 정점이 없으므로 c행은 자기 자신 외 모두 0이다"
    ],
    answer: 3,
    brief: "나가는 간선 없는 정점 행은 도달 정점 없어 0.",
    detailed: "방향 그래프는 화살표 방향 때문에 도달 불가 정점이 생긴다. 나가는 간선이 없는 정점은 다른 어떤 정점에도 도달할 수 없으므로 추이적 폐쇄 행렬에서 그 행은 모두 0이 된다(슬라이드 예의 c행). 추이적 폐쇄는 분산·병렬 시스템 도달성 분석, 파싱 오토마타에 쓰인다.",
    source: "12차시 슬라이드 36"
  },
  {
    id: "DS_F7Q23",
    set: 7,
    week: 12,
    topic: "Kruskal 수행 추적",
    type: "multiple_choice",
    difficulty: "hard",
    question: "Kruskal 알고리즘에서 간선이 (0,5)10, (2,3)12, (1,6)14, (1,2)16 순으로 선택된 뒤 (3,6)18 차례가 되었다. 이 (3,6) 간선의 처리로 옳은 것은?",
    choices: [
      "남은 간선 중 가중치가 가장 작으므로 무조건 선택한다",
      "정점 6이 아직 트리에 없는 새 정점이므로 선택한다",
      "맨 처음 선택한 시작 간선이 아니므로 그냥 무시한다",
      "이미 3과 6이 연결돼 있어 사이클이 생기므로 버린다(discard)"
    ],
    answer: 3,
    brief: "(3,6)은 사이클을 만들어 버림.",
    detailed: "(2,3),(1,6),(1,2)가 이미 선택되어 3-2-1-6 경로로 3과 6이 연결돼 있다. 여기에 (3,6)을 더하면 사이클이 생기므로 버린다. 이후 (3,4)22 선택, (4,6)24 버림, (4,5)25 선택으로 마무리되어 총 비용 99가 된다.",
    source: "12차시 슬라이드 13, 14"
  },
  {
    id: "DS_F7Q24",
    set: 7,
    week: 12,
    topic: "Dijkstra 손풀이 (Boston 예)",
    type: "multiple_choice",
    difficulty: "hard",
    question: "도시 그래프 예에서 Boston(시작)→New York이 250, New York→Chicago가 1000, Boston→Chicago 직행이 1500이다. New York을 먼저 확정한 뒤 Chicago의 distance는 어떻게 갱신되는가?",
    choices: [
      "더 짧은 우회 경로가 없다고 보고 직행 1500을 그대로 유지한다",
      "Boston에서 New York까지의 거리인 250 값으로 그대로 갱신된다",
      "New York 경유 250+1000=1250이 직행 1500보다 작아 1250으로 갱신된다",
      "들어오는 경로가 하나도 없어 끝까지 도달 불가능으로 남는다"
    ],
    answer: 2,
    brief: "250+1000=1250 < 1500 → 1250으로 갱신.",
    detailed: "Boston→Chicago 직행 1500보다 New York 경유 경로(250+1000=1250)가 더 짧으므로 Chicago의 distance를 1250으로 갱신한다. 우회해도 합이 작으면 택하는 Dijkstra 핵심 원리의 대표 사례다.",
    source: "12차시 슬라이드 30, 32"
  },
  {
    "id": "DS_F7Q25",
    "set": 7,
    "week": 13,
    "topic": "힙 배열 인덱스",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "힙을 배열에 저장할 때(루트를 인덱스 1로 하는 1-인덱스 방식) 노드 i의 부모·왼쪽 자식·오른쪽 자식 인덱스로 옳은 것은?",
    "choices": [
      "부모 2i, 좌 i/2, 우 i/2+1",
      "부모 ⌊i/2⌋, 좌 2i, 우 2i+1",
      "부모 i−1, 좌 i+1, 우 i+2",
      "부모 ⌊i/2⌋, 좌 2i+1, 우 2i+2"
    ],
    "answer": 1,
    "brief": "1-인덱스: 부모 ⌊i/2⌋, 좌 2i, 우 2i+1.",
    "detailed": "1-인덱스 힙(배열 저장)에서 노드 i의 부모는 ⌊i/2⌋, 왼쪽 자식 2i, 오른쪽 자식 2i+1이다. 9차시 0-인덱스 트리의 좌 2i+1·우 2i+2·부모 ⌊(i−1)/2⌋와 혼동하지 말 것.",
    "source": "13차시 §8 힙 정렬"
  },
  {
    "id": "DS_F7Q26",
    "set": 7,
    "week": 13,
    "topic": "힙 정렬 복잡도",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "힙 정렬의 시간 복잡도에 대한 설명으로 옳은 것은?",
    "choices": [
      "평균 O(N), 최악 O(N²)",
      "평균·최악 모두 O(N log N)",
      "평균 O(N log N), 최악 O(N²)",
      "평균·최악 모두 O(N²)"
    ],
    "answer": 1,
    "brief": "힙 = 평균·최악 모두 O(N log N).",
    "detailed": "트리 높이가 log₂N이고 N개를 삭제·재구성하므로 O(N log₂N)이다. 퀵 정렬과 달리 입력에 상관없이 평균과 최악이 모두 O(N log N)으로 일정하다.",
    "source": "13차시 §8-3 힙 정렬 성능"
  },
  {
    id: "DS_F7Q27",
    set: 7,
    week: 13,
    topic: "기수 정렬",
    type: "multiple_choice",
    difficulty: "medium",
    question: "기수 정렬(Radix Sort)에 대한 설명으로 옳지 않은 것은?",
    choices: [
      "값을 서로 비교하지 않고 정렬할 수 있는 알고리즘이다",
      "자리수별로 버킷에 넣었다 빼며, 버킷은 선입선출을 위해 큐(Queue)로 구현한다",
      "시간 복잡도는 O(d·N)으로 비교 정렬보다 빠를 수 있다",
      "실수·한글·한자를 포함한 모든 종류의 데이터에 적용할 수 있다"
    ],
    answer: 3,
    brief: "실수·문자는 불가하므로 틀림.",
    detailed: "기수 정렬은 비교 없이 자리수 기준으로 버킷(큐)에 분배·수집하며 O(d·N)(d=최대 자리수)이다. 그러나 실수·한글·한자 등에는 적용할 수 없고, 동일한 길이의 숫자나 단순 알파벳에만 쓸 수 있다. 따라서 '모든 데이터에 적용할 수 있다'는 설명이 옳지 않다.",
    source: "13차시 §9-3 기수 정렬"
  },
  {
    id: "DS_F7Q28",
    set: 7,
    week: 13,
    topic: "퀵 정렬 분할",
    type: "multiple_choice",
    difficulty: "hard",
    question: "퀵 정렬의 분할 과정에서 왼쪽(Low)·오른쪽(High) 포인터가 엇갈렸을 때(Low > High) 수행하는 동작으로 옳은 것은?",
    choices: [
      "Low가 가리키는 값과 피벗을 서로 교환한다",
      "High가 가리키는 값과 피벗을 교환해 피벗 위치를 확정한다",
      "분할을 중단하고 리스트 전체를 처음부터 다시 시작한다",
      "피벗을 비교 없이 무조건 리스트 맨 뒤로 보낸다"
    ],
    answer: 1,
    brief: "엇갈리면 High값 ↔ 피벗.",
    detailed: "분할에서 Low는 피벗보다 큰 값을, High는 피벗보다 작은 값을 찾아 교환한다. 두 포인터가 엇갈리면(Low > High) 탐색을 멈추고 High가 가리키는 값과 피벗을 교환해 피벗의 최종 위치를 확정한다. 그 결과 피벗 왼쪽은 작은 값, 오른쪽은 큰 값으로 나뉜다.",
    source: "13차시 §7-2 퀵 정렬 분할"
  },
  {
    id: "DS_F7Q29",
    set: 7,
    week: 13,
    topic: "힙 정렬 과정",
    type: "multiple_choice",
    difficulty: "hard",
    question: "힙 정렬에서 루트를 삭제한 직후의 재구성(Down-heap) 절차로 옳은 것은?",
    choices: [
      "빈 루트에 마지막 노드를 올린 뒤 더 큰 자식과 비교하며 아래로 내려보낸다",
      "빈 루트 자리에 트리에서 가장 작은 값을 새로 삽입해 채운다",
      "기존 힙을 버리고 트리 전체를 처음부터 다시 쌓아 만든다",
      "빈 루트를 비운 그대로 둔 채 곧바로 다음 삭제 단계로 넘어간다"
    ],
    answer: 0,
    brief: "마지막→루트, 더 큰 자식과 비교 down.",
    detailed: "힙 삭제는 루트(최대)를 제거해 배열 맨 뒤로 보낸 뒤, 마지막 레벨 맨 오른쪽 노드를 빈 루트로 끌어올리고, 새 루트를 더 큰 자식과 비교하며 아래로 내려보내 힙 성질을 회복(Down-heap)한다. 이를 N번 반복하면 오름차순 정렬된다.",
    source: "13차시 §8-2 힙 정렬 과정"
  },
  {
    id: "DS_F7Q30",
    set: 7,
    week: 13,
    topic: "정렬 안정성 종합",
    type: "multiple_choice",
    difficulty: "hard",
    question: "다음 중 '안정 정렬(Stable Sort)'에 해당하는 것만 모두 고른 것은?",
    choices: [
      "선택, 퀵, 힙",
      "삽입, 머지, 기수",
      "선택, 버블, 셸",
      "퀵, 힙, 셸"
    ],
    answer: 1,
    brief: "안정 = 삽입·버블·머지·기수.",
    detailed: "안정 정렬(같은 키의 상대 순서를 보존)은 삽입·버블·머지·기수다. 선택·퀵·힙·셸은 불안정하다. 보기 중 모두 안정인 것은 '삽입, 머지, 기수'다.",
    source: "13차시 §5 정렬 비교표"
  }
];

export const set8 = [
  {
    id: "DS_F8Q1",
    set: 8,
    week: 9,
    topic: "트리의 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "정점이 N개인 그래프가 '트리'가 되기 위한 조건으로 가장 적절한 것은?",
    choices: [
      "모든 정점이 연결되고 간선 수가 N−1개여서 사이클이 없다",
      "모든 정점의 차수가 2 이하로만 유지되어 있다",
      "간선 수가 정점 수 N개 이상으로 존재한다",
      "트리의 루트가 2개 이상 동시에 존재한다"
    ],
    answer: 0,
    brief: "연결 + 간선 N−1 = 사이클 없는 트리.",
    detailed: "트리는 1개 이상의 노드를 갖는, 사이클이 없는 연결 그래프다. 정점이 N개일 때 모든 정점이 연결되어 있으면서 간선이 정확히 N−1개이면 사이클이 없으므로 트리가 된다. 간선이 N개 이상이면 사이클이 생기고, 루트는 항상 1개다.",
    source: "9차시 §1 트리의 개념"
  },
  {
    id: "DS_F8Q2",
    set: 8,
    week: 9,
    topic: "BST 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "이진 탐색 트리(BST)의 절대 규칙으로 옳은 것은?",
    choices: [
      "왼쪽 서브트리 모든 키 < 루트 키 < 오른쪽 서브트리 모든 키",
      "부모 키가 좌우 무관하게 항상 자식 키보다 크다",
      "모든 레벨이 빠짐없이 꽉 차 있어야 한다",
      "왼쪽 서브트리 키가 오른쪽 서브트리 키보다 항상 크다"
    ],
    answer: 0,
    brief: "L < Root < R.",
    detailed: "BST는 임의의 노드에 대해 '왼쪽 서브트리의 모든 키값 < 루트 키값 < 오른쪽 서브트리의 모든 키값'을 만족한다. 이 규칙 덕분에 검색을 O(log N)으로 할 수 있다. 부모가 자식보다 크다는 규칙은 힙(Heap)의 성질이다.",
    source: "9차시 §10 BST 정의"
  },
  {
    "id": "DS_F8Q3",
    "set": 8,
    "week": 9,
    "topic": "이진트리 종류",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "높이가 h인 포화 이진 트리(Full Binary Tree)의 노드 수는?",
    "choices": [
      "h개",
      "2^h − 1개",
      "2^(h−1)개",
      "h² 개"
    ],
    "answer": 1,
    "brief": "포화 이진 트리 노드 수 = 2^h − 1.",
    "detailed": "포화 이진 트리는 모든 레벨이 꽉 찬 트리다. 각 레벨 i의 노드 수(2^(i−1))를 레벨 1부터 h까지 합하면 2^0+2^1+...+2^(h−1) = 2^h − 1개가 된다. 한쪽으로만 치우친 편향 트리(높이 h)의 최소 노드 수는 h개다.",
    "source": "9차시 §5 이진 트리 종류"
  },
  {
    "id": "DS_F8Q4",
    "set": 8,
    "week": 9,
    "topic": "배열 저장 인덱스",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "0-인덱스 배열 저장에서 인덱스 6에 있는 노드의 부모 인덱스는? (부모 = ⌊(i−1)/2⌋)",
    "choices": [
      "3",
      "2",
      "5",
      "12"
    ],
    "answer": 1,
    "brief": "⌊(6−1)/2⌋ = ⌊2.5⌋ = 2.",
    "detailed": "부모 인덱스 공식 ⌊(i−1)/2⌋에 i=6을 넣으면 (6−1)/2 = 2.5이고 소수점을 버려 2가 된다. 한편 인덱스 3의 왼쪽 자식은 2×3+1 = 7이다.",
    "source": "9차시 §6 배열 저장"
  },
  {
    id: "DS_F8Q5",
    set: 8,
    week: 9,
    topic: "쓰레드 이진트리",
    type: "multiple_choice",
    difficulty: "medium",
    question: "스레드 이진 트리에서 어떤 노드의 '오른쪽 링크가 NULL'일 때, 이 링크를 스레드로 사용하면 무엇을 가리키도록 설정하는가?",
    choices: [
      "자기 자신 노드를 다시 가리키도록 설정한다",
      "트리 전체의 루트 노드를 가리키도록 설정한다",
      "중위 탐색 순서상 바로 앞 노드(선행자)를 가리킨다",
      "중위 탐색 순서상 바로 다음 노드(후속자)를 가리킨다"
    ],
    answer: 3,
    brief: "오른쪽 NULL → 중위 후속자(successor).",
    detailed: "스레드 이진 트리는 NULL 링크를 중위 탐색 순서 정보로 재활용한다. 오른쪽 링크가 NULL이면 중위 탐색상 '바로 다음 노드(후속자, successor)'를, 왼쪽 링크가 NULL이면 '바로 앞 노드(선행자, predecessor)'를 가리키게 한다. 링크가 진짜 자식인지 스레드인지는 Boolean 플래그로 구분한다.",
    source: "9차시 §9 쓰레드 이진 트리"
  },
  {
    id: "DS_F8Q6",
    set: 8,
    week: 9,
    topic: "BST 삭제",
    type: "multiple_choice",
    difficulty: "hard",
    question: "BST에서 자식을 2개 모두 가진 노드를 삭제할 때, 그 자리를 대체할 노드로 올바른 것은?",
    choices: [
      "트리 전체에서 가장 큰 값을 가진 노드로 대체한다",
      "위치와 무관하게 항상 루트 노드로 대체한다",
      "왼쪽 서브트리 최댓값 또는 오른쪽 서브트리 최솟값 노드",
      "삭제하려는 노드의 부모 노드로 끌어내려 대체한다"
    ],
    answer: 2,
    brief: "왼쪽 최댓값 또는 오른쪽 최솟값으로 대체.",
    detailed: "자식이 2개인 노드를 삭제할 때는 BST 규칙(L<Root<R)이 깨지지 않도록 '삭제되는 값과 가장 가까운' 노드로 대체해야 한다. 이는 왼쪽 서브트리에서 가장 큰 값(가장 오른쪽 노드, 직전 선행자) 또는 오른쪽 서브트리에서 가장 작은 값(가장 왼쪽 노드, 직후 후속자)이다. 자식 0개는 그냥 삭제, 1개는 그 자식을 끌어올린다.",
    source: "9차시 §10 BST 삭제 3 Case"
  },
  {
    id: "DS_F8Q7",
    set: 8,
    week: 10,
    topic: "힙의 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙(Heap)의 정의로 가장 옳은 것은?",
    choices: [
      "부모 값이 자식 값보다 항상 크거나 작은 완전 이진 트리",
      "왼쪽 서브트리 < 루트 < 오른쪽 서브트리를 만족하는 이진 트리",
      "모든 레벨이 빠짐없이 꽉 찬 포화 이진 트리만 가리키는 용어",
      "NULL 링크를 재활용해 재귀 없이 순회하는 이진 트리"
    ],
    answer: 0,
    brief: "힙 = 부모-자식 대소 규칙을 만족하는 완전 이진 트리.",
    detailed: "힙은 부모 노드의 원소 값이 자식 노드의 원소 값보다 항상 크거나(Max Heap) 작은(Min Heap) 완전 이진 트리다. 두 번째 보기는 BST, 네 번째 보기는 스레드 이진 트리 설명이다. 포화 이진 트리가 아니라 완전 이진 트리면 충분하다.",
    source: "10차시 슬라이드 3"
  },
  {
    id: "DS_F8Q8",
    set: 8,
    week: 10,
    topic: "힙의 저장 방식",
    type: "multiple_choice",
    difficulty: "basic",
    question: "힙을 연결 리스트보다 배열로 구현하는 것이 효율적인 이유로 옳은 것은?",
    choices: [
      "힙은 편향 트리라서 배열에 빈 공간이 거의 생기지 않기 때문",
      "배열은 포인터를 사용해 부모·자식 이동이 자유롭기 때문",
      "배열은 삽입 시 동적 할당이 없어 높이를 몰라도 되기 때문",
      "완전 이진 트리라 빈틈없이 담겨 인덱스 수식으로 부모·자식을 계산하기 때문"
    ],
    answer: 3,
    brief: "완전 이진 트리라 배열에 빈틈없이 담겨 인덱스 계산이 쉬움.",
    detailed: "힙은 완전 이진 트리라 중간에 빈 노드가 없어 배열에 빈틈없이 저장되고, ⌊i/2⌋·2i·2i+1 수식만으로 부모·자식 위치를 즉시 계산한다. 편향 트리나 포인터 사용은 틀린 설명이다.",
    source: "10차시 슬라이드 3"
  },
  {
    id: "DS_F8Q9",
    set: 8,
    week: 10,
    topic: "삽입 재구성(Up-heap)",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Max Heap 삽입 시 재구성(adjust / Up-heap) 과정에 대한 설명으로 옳은 것은?",
    choices: [
      "부모가 더 작으면 교환하며 루트나 큰 부모까지 위로 반복한다",
      "자식과 비교해 더 큰 자식과 교환하며 아래로 내려간다",
      "새 노드를 넣은 뒤 트리 전체를 처음부터 다시 정렬한다",
      "새 노드는 항상 한 번만 교환하면 힙 조건이 완성된다"
    ],
    answer: 0,
    brief: "부모와 비교, 부모가 작으면 교환하며 위로(Up-heap).",
    detailed: "삽입은 새 노드와 부모를 비교해 부모가 작으면 교환하고, 루트에 닿거나 부모가 더 클 때까지 위로 올라간다. 자식과 교환하며 내려가는 것은 삭제 시의 Down-heap 설명이다. 한 번만 교환한다는 보장은 없다.",
    source: "10차시 슬라이드 5"
  },
  {
    id: "DS_F8Q10",
    set: 8,
    week: 10,
    topic: "우선순위 큐",
    type: "multiple_choice",
    difficulty: "medium",
    question: "우선순위 큐(Priority Queue)와 힙의 관계로 옳은 것은?",
    choices: [
      "우선순위 큐는 FIFO 순서로만 동작해 힙과 무관하다",
      "우선순위 큐는 스택(LIFO) 구조로만 구현된다",
      "우선순위 큐는 BST 중위 탐색 구현이 표준이다",
      "높은 우선순위 먼저면 Max Heap, 낮으면 Min Heap이 맞다"
    ],
    answer: 3,
    brief: "높은 우선순위 먼저=Max Heap, 낮은 것 먼저=Min Heap.",
    detailed: "우선순위 큐는 우선순위가 높은 원소가 먼저 나가는 자료형으로 힙이 표준 구현이다. 값이 큰 것을 먼저 처리하면 Max Heap, 작은 것부터면 Min Heap을 쓴다. 들어온 순서(FIFO)나 LIFO와는 다르다.",
    source: "10차시 슬라이드(우선순위 큐 설명)"
  },
  {
    id: "DS_F8Q11",
    set: 8,
    week: 10,
    topic: "BST vs Heap",
    type: "multiple_choice",
    difficulty: "hard",
    question: "BST와 Heap의 차이를 비교한 설명으로 옳지 않은 것은?",
    choices: [
      "BST는 중위 탐색이 오름차순이지만 힙은 정렬을 보장하지 않는다",
      "BST는 모양이 임의로 편향될 수 있지만 힙은 완전 이진 트리다",
      "최댓값을 Max Heap은 루트라 O(1), BST는 맨 오른쪽까지 따라간다",
      "BST와 힙 모두 자식이 정확히 2개인 포화 이진 트리여야 한다"
    ],
    answer: 3,
    brief: "BST·힙 모두 포화 이진 트리 강제는 틀린 설명.",
    detailed: "네 번째 보기가 틀렸다. BST는 모양 제약이 없고(편향 가능), 힙은 완전 이진 트리이지 포화 이진 트리가 아니다. 나머지 세 보기는 모두 옳은 BST vs Heap 비교다.",
    source: "10차시 슬라이드 3, 9차시 연계"
  },
  {
    id: "DS_F8Q12",
    set: 8,
    week: 10,
    topic: "연습문제 BST 후위 탐색",
    type: "multiple_choice",
    difficulty: "hard",
    question: "같은 데이터로 만든 BST의 후위(Postorder, L-R-V) 탐색 결과는?",
    choices: [
      "10, 7, 14, 12, 28, 25, 39, 36, 33, 21",
      "7, 10, 12, 14, 21, 25, 28, 33, 36, 39",
      "21, 12, 7, 10, 14, 33, 25, 28, 36, 39",
      "39, 36, 33, 28, 25, 21, 14, 12, 10, 7"
    ],
    answer: 0,
    brief: "후위 = 10,7,14,12,28,25,39,36,33,21 (루트 21 마지막).",
    detailed: "후위 탐색(L-R-V)은 자식들을 모두 방문한 뒤 루트를 마지막에 방문하므로 루트 21이 맨 끝에 온다: 10, 7, 14, 12, 28, 25, 39, 36, 33, 21. 두 번째는 중위, 세 번째는 전위 결과이며 네 번째는 단순 내림차순으로 오답이다.",
    source: "10차시 슬라이드 10, 9차시 연계"
  },
  {
    id: "DS_F8Q13",
    set: 8,
    week: 11,
    topic: "자료 관계 분류",
    type: "multiple_choice",
    difficulty: "basic",
    question: "자료들 간의 관계에 따른 자료구조 분류에서 'm:n 관계'를 표현하는 비선형 자료구조는?",
    choices: [
      "그래프(Graph)",
      "리스트(List)",
      "스택(Stack)",
      "이진 트리(Binary Tree)"
    ],
    answer: 0,
    brief: "1:1=리스트, 1:n=트리, m:n=그래프.",
    detailed: "자료구조를 '자료들의 관계에 맞게 정리한 것'으로 보면 1:1(선형, 리스트), 1:n(트리), m:n(그래프)로 분류된다. 복잡하고 다양한 m:n 관계를 표현하는 대표 비선형 자료구조가 그래프다.",
    source: "11차시 슬라이드 6"
  },
  {
    id: "DS_F8Q14",
    set: 8,
    week: 11,
    topic: "ADT adjacent",
    type: "multiple_choice",
    difficulty: "basic",
    question: "그래프 ADT 연산 adjacent(v)의 기능으로 옳은 것은?",
    choices: [
      "그래프 전체를 공백 상태로 초기화한다",
      "정점 v를 그래프에서 완전히 삭제한다",
      "정점 v에 인접한 정점들의 리스트를 반환한다",
      "두 정점 사이에 새 간선을 하나 삽입한다"
    ],
    answer: 2,
    brief: "adjacent(v) = 정점 v의 인접 정점 리스트 반환.",
    detailed: "adjacent(v)는 정점 v에 인접한 정점들의 리스트를 반환하는 연산이다. 탐색 시 '다음에 어디로 갈지'를 결정하는 가장 필수적인 그래프 연산이다.",
    source: "11차시 슬라이드 21"
  },
  {
    id: "DS_F8Q15",
    set: 8,
    week: 11,
    topic: "오일러 경로 조건",
    type: "multiple_choice",
    difficulty: "medium",
    question: "오일러 경로(모든 다리를 한 번씩 건너 출발점 복귀)가 존재하기 위한 조건으로 옳은 것은?",
    choices: [
      "다른 조건 없이 모든 정점의 차수가 짝수이기만 하면 된다",
      "모든 정점이 연결되고 홀수 차수 정점이 2개 이하여야 한다",
      "그래프의 간선 수가 정점 수보다 많기만 하면 된다",
      "그래프가 반드시 방향 그래프 형태여야만 한다"
    ],
    answer: 1,
    brief: "모든 정점 연결 + 홀수 차수 정점 2개 이하.",
    detailed: "오일러 정리: (1) 모든 정점이 연결, (2) 차수가 홀수인 정점이 2개 이하. 쾨니히스베르크 다리는 네 정점의 차수가 5,3,3,3으로 홀수 정점이 4개라 조건을 위배해 오일러 경로가 존재하지 않는다.",
    source: "11차시 슬라이드 5"
  },
  {
    id: "DS_F8Q16",
    set: 8,
    week: 11,
    topic: "강연결",
    type: "multiple_choice",
    difficulty: "medium",
    question: "방향 그래프에서 두 정점 vi, vj가 '강연결(strongly connected)'이라는 것의 의미는?",
    choices: [
      "vi에서 vj로 가는 한 방향 경로만 존재하면 된다",
      "두 정점이 하나의 간선으로 직접 인접해 있다",
      "두 정점이 같은 가중치 간선으로 이어져 있다",
      "vi→vj 경로와 vj→vi 경로가 모두 존재한다"
    ],
    answer: 3,
    brief: "양방향 경로(상호 도달) 모두 존재.",
    detailed: "강연결은 방향 그래프에서 vi to vj 경로와 vj to vi 경로가 모두 존재해 정점들이 서로의 상대방으로 갈 수 있는 상태다. 강연결된 최대 부분 그래프를 강연결 요소(SCC)라 한다. 직접 인접(간선 하나)과는 다른 개념이다.",
    source: "11차시 슬라이드 14"
  },
  {
    id: "DS_F8Q17",
    set: 8,
    week: 11,
    topic: "신장 트리",
    type: "multiple_choice",
    difficulty: "medium",
    question: "정점이 10개인 연결 그래프에서 DFS로 모든 정점을 방문하며 지나간 간선이 9개(n-1개)였다. 이로부터 내릴 수 있는 결론은?",
    choices: [
      "지나간 간선만 남기면 사이클 없는 신장 트리가 된다",
      "그래프에 사이클이 반드시 하나 이상 존재한다",
      "이 그래프가 완전 그래프임을 뜻하는 신호다",
      "DFS 탐색이 잘못 수행되었다는 오류 신호다"
    ],
    answer: 0,
    brief: "탐색이 지난 간선 = n-1개 → 신장 트리.",
    detailed: "모든 정점을 방문하면서 거친 간선이 n-1개(여기선 9개)면 사이클이 없고 모든 정점이 연결된 트리가 된다. DFS/BFS를 통해 신장 트리(Spanning Tree)를 구할 수 있다.",
    source: "11차시 슬라이드 24-26"
  },
  {
    "id": "DS_F8Q18",
    "set": 8,
    "week": 11,
    "topic": "DFS 코드 추적",
    "type": "multiple_choice",
    "difficulty": "hard",
    "question": "다음 인접 리스트가 정점 0~5에 대해 [0:1,2] [1:0,3,4] [2:0,5] [3:1] [4:1] [5:2]로 주어질 때, dfs(0)이 작은 번호부터 방문하면 출력 순서는? (visited로 재방문 차단)",
    "choices": [
      "0 2 5 1 3 4",
      "0 1 2 3 4 5",
      "0 2 1 5 3 4",
      "0 1 3 4 2 5"
    ],
    "answer": 3,
    "brief": "0→1→3→(후진)→4→(후진)→2→5.",
    "detailed": "dfs(0): 0 방문 후 인접 {1,2} 중 작은 1로 감. dfs(1): 1 방문, 인접 {0(방문),3,4} 중 3으로 감. dfs(3): 3 방문, 인접 {1} 모두 방문됨→후진. 다시 1에서 4로 감, dfs(4): 4 방문→후진해 0으로 복귀. 0의 다음 인접 2로 감, dfs(2): 2 방문, 5로 감, dfs(5): 5 방문. 따라서 0 1 3 4 2 5.",
    "source": "11차시 슬라이드 25, 26"
  },
  {
    id: "DS_F8Q19",
    set: 8,
    week: 12,
    topic: "신장트리 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "그래프 G의 신장트리(Spanning Tree) G'가 만족해야 하는 조건으로 옳지 않은 것은?",
    choices: [
      "V(G') = V(G): 원래 그래프의 모든 정점을 포함한다",
      "G'는 모든 정점이 연결(connected)된 그래프이다",
      "간선 수가 정점 수보다 1개 많다: |E(G')| = n + 1",
      "G'에는 사이클(cycle)이 전혀 존재하지 않는다"
    ],
    answer: 2,
    brief: "신장트리 간선 수는 n-1이지 n+1이 아니다.",
    detailed: "신장트리는 모든 정점을 포함(V(G')=V(G))하고 연결되어 있으며 간선 수가 정점 수보다 1개 적은 n-1개여야 한다. 간선이 n-1개이므로 사이클이 생기지 않는다. n+1이라는 세 번째 보기가 틀렸다.",
    source: "12차시 슬라이드 4"
  },
  {
    id: "DS_F8Q20",
    set: 8,
    week: 12,
    topic: "최단경로 정의",
    type: "multiple_choice",
    difficulty: "basic",
    question: "최단경로(Shortest Path) 문제의 정의로 옳은 것은?",
    choices: [
      "모든 정점을 사이클 없이 잇는 경로를 찾는 문제",
      "경로 중 가중치 합이 최대인 경로를 찾는 문제",
      "특정 정점의 차수를 최대로 만드는 분배 문제",
      "출발 정점에서 목적지까지 가중치 합이 최소인 경로 찾기"
    ],
    answer: 3,
    brief: "출발점→목적지 가중치 합 최소 경로.",
    detailed: "최단경로는 하나의 출발 정점에서 다른 정점까지 이르는 경로 중 간선 가중치(시간·비용·거리)의 합이 최소가 되는 경로를 찾는 문제다. 가중치가 없어 간선 개수만 최소화하려는 경우에는 모든 간선 가중치를 1로 두면 된다. 첫 번째 보기는 (최소)신장트리 문제다.",
    source: "12차시 슬라이드 19"
  },
  {
    id: "DS_F8Q21",
    set: 8,
    week: 12,
    topic: "가중치 동률 규칙",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Kruskal·Prim에서 여러 간선의 가중치가 같을 때(동률), 어느 간선을 먼저 선택하는지에 대한 설명으로 옳은 것은?",
    choices: [
      "어느 간선을 먼저 택해도 모두 유효한 MST가 되며 총 가중치는 동일하다",
      "동률이면 반드시 알파벳이 앞선 정점의 간선만 택해야 유효한 MST가 된다",
      "동률인 간선들을 한꺼번에 동시에 모두 선택한다",
      "동률인 경우 그 간선들을 모두 후보에서 버린다"
    ],
    answer: 0,
    brief: "동률이면 어느 쪽을 택해도 유효한 MST, 총 가중치 동일.",
    detailed: "간선 가중치가 동률일 때 무엇을 먼저 고르는지는 알고리즘이 규정하지 않는다. 선택에 따라 트리 모양은 달라질 수 있으나 모두 유효한 최소 신장 트리이며 총 가중치는 같다. (강의 답안은 일관성을 위해 알파벳·작은 번호 정점을 우선하는 관례를 쓰지만, 이는 알고리즘의 성질이 아니라 채점 편의용 규칙이다.)",
    source: "12차시 슬라이드 11"
  },
  {
    id: "DS_F8Q22",
    set: 8,
    week: 12,
    topic: "Dijkstra 핵심 원리",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Dijkstra 알고리즘의 핵심 키포인트로 옳은 것은?",
    choices: [
      "언제나 간선 수가 가장 적은 경로만 골라서 택한다",
      "언제나 직접(바로) 가는 직행 경로만 골라서 택한다",
      "우회하더라도 가중치 합이 더 작으면 우회 경로를 택한다",
      "언제나 가중치 합이 가장 큰 경로를 골라서 택한다"
    ],
    answer: 2,
    brief: "우회해도 합이 작으면 우회 선택.",
    detailed: "핵심 키포인트는 돌아가더라도 가중치의 합이 작으면 우회 경로를 선택하는 것이다. 즉 바로 가는 distance와 특정 정점 u를 경유한 distance 합 중 더 작은(Minimum) 값으로 거리를 갱신한다(Relaxation).",
    source: "12차시 슬라이드 21, 22"
  },
  {
    id: "DS_F8Q23",
    set: 8,
    week: 12,
    topic: "추이적 폐쇄 행렬",
    type: "multiple_choice",
    difficulty: "medium",
    question: "추이적 폐쇄 행렬 A+ 의 원소 A+[i][j] 값의 의미로 옳은 것은?",
    choices: [
      "정점 i에서 j로 가는 경로가 하나라도 있으면 1, 없으면 0",
      "정점 i에서 j로 가는 간선들의 가중치를 모두 합한 값",
      "정점 i와 j 사이를 잇는 경로의 최단 거리 값",
      "정점 i의 차수와 정점 j의 차수를 서로 곱한 값"
    ],
    answer: 0,
    brief: "A+[i][j]=1 ⇔ i→j 경로(길이>0) 존재.",
    detailed: "추이적 폐쇄 행렬 A+는 도달 가능성을 나타낸다. 정점 i에서 j로 가는 경로(길이가 0보다 큰 경로)가 하나라도 존재하면 A+[i][j]=1, 전혀 갈 수 없으면 0이다. 인접 행렬 A를 곱해(또는 Floyd-Warshall로) 구한다.",
    source: "12차시 슬라이드 36"
  },
  {
    id: "DS_F8Q24",
    set: 8,
    week: 12,
    topic: "Dijkstra 손풀이 (Boston 예)",
    type: "multiple_choice",
    difficulty: "hard",
    question: "미국 도시 예에서 Boston(시작)→New York이 250, New York→Chicago가 1000, Boston→Chicago 직행이 1500이다. New York을 먼저 확정한 뒤 Chicago의 distance는 어떻게 갱신되는가?",
    choices: [
      "직행 경로 비용 1500을 그대로 유지한다",
      "New York까지 거리인 250으로 줄여 갱신한다",
      "경유 250+1000=1250<1500이라 1250으로 갱신",
      "어떤 경로로도 Chicago에 도달이 불가능하다"
    ],
    answer: 2,
    brief: "250+1000=1250 < 1500 → 1250으로 갱신.",
    detailed: "Boston→Chicago 직행 1500보다 New York 경유 경로(250+1000=1250)가 더 짧으므로 Chicago의 distance를 1250으로 갱신한다. 우회해도 합이 작으면 택하는 Dijkstra 핵심 원리의 대표 사례다.",
    source: "12차시 슬라이드 30, 32"
  },
  {
    id: "DS_F8Q25",
    set: 8,
    week: 13,
    topic: "정렬의 목적",
    type: "multiple_choice",
    difficulty: "basic",
    question: "정렬(Sorting)을 수행하는 가장 근본적인 목적으로 가장 적절한 것은?",
    choices: [
      "데이터의 저장 공간을 줄여 메모리를 아끼기 위해",
      "이후의 검색(Search)을 더 빠르게 하기 위해",
      "데이터를 외부에 안전하게 암호화하기 위해",
      "중복으로 들어온 데이터를 모두 제거하기 위해"
    ],
    answer: 1,
    brief: "정렬의 목적 = 검색 가속.",
    detailed: "정렬은 데이터를 크기 순으로 나열하는 것으로, 핵심 목적은 이후 검색을 빠르게 하기 위함이다. 도서관 서지정보가 정렬돼 있어야 책을 빨리 찾듯, 정렬은 탐색 효율을 위한 전처리다.",
    source: "13차시 §1 정렬의 개념"
  },
  {
    id: "DS_F8Q26",
    set: 8,
    week: 13,
    topic: "퀵 정렬 전략",
    type: "multiple_choice",
    difficulty: "basic",
    question: "퀵 정렬(Quick Sort)의 기본 전략에 대한 설명으로 옳은 것은?",
    choices: [
      "정렬된 그룹에 데이터를 하나씩 끼워 넣어 정렬한다",
      "피벗 기준으로 분할·정복하며 평균적으로 가장 빠르다",
      "값을 비교하지 않고 버킷에 분류해 정렬한다",
      "입력 분포와 무관하게 항상 O(N²)에 동작한다"
    ],
    answer: 1,
    brief: "분할정복·피벗, 평균 최속.",
    detailed: "퀵 정렬은 피벗을 기준으로 작은 값/큰 값으로 리스트를 분할하고 재귀적으로 정복하는 분할 정복 알고리즘이다. 평균 시간 복잡도 O(N log N)으로 평균적으로 가장 빠른 정렬로 알려져 있다.",
    source: "13차시 §7 퀵 정렬"
  },
  {
    id: "DS_F8Q27",
    set: 8,
    week: 13,
    topic: "선택 정렬 이동·안정성",
    type: "multiple_choice",
    difficulty: "medium",
    question: "선택 정렬의 이동 횟수와 안정성에 대한 설명으로 옳은 것은?",
    choices: [
      "단계마다 Swap이 일어나 총 이동 3(N−1)이고 불안정하다",
      "데이터 이동이 전혀 없고 안정 정렬에 해당한다",
      "총 이동이 N(N−1)/2이고 안정 정렬에 해당한다",
      "데이터 이동이 N번이고 불안정 정렬에 해당한다"
    ],
    answer: 0,
    brief: "이동 3(N−1), 불안정.",
    detailed: "선택 정렬은 각 단계에서 최소값을 그룹 맨 앞과 1번 Swap(이동 3)한다. 총 N−1단계이므로 이동은 3(N−1)이다. 같은 값의 상대 순서가 보장되지 않아 안정성을 만족하지 않는다(불안정).",
    source: "13차시 §4 선택 정렬"
  },
  {
    "id": "DS_F8Q28",
    "set": 8,
    "week": 13,
    "topic": "퀵 정렬 복잡도 유도",
    "type": "multiple_choice",
    "difficulty": "medium",
    "question": "퀵 정렬의 평균 복잡도 유도에서 T(N) ≤ cN + 2·T(N/2)를 전개해 N/2^k = 1이 될 때, k 값과 최종 시간 복잡도로 옳은 것은?",
    "choices": [
      "k = N, O(N²)",
      "k = log₂N, O(N log N)",
      "k = √N, O(N√N)",
      "k = 1, O(N)"
    ],
    "answer": 1,
    "brief": "2^k = N → k = log₂N → O(N log N).",
    "detailed": "전개하면 k·cN + 2^k·T(N/2^k)가 되고, 더 쪼갤 수 없어 N/2^k=1인 시점에서 2^k=N → k=log₂N이다. N번 비교가 log₂N단계 일어나므로 O(N log₂N)(로그 선형)이다.",
    "source": "13차시 §7-3 퀵 정렬 성능"
  },
  {
    id: "DS_F8Q29",
    set: 8,
    week: 13,
    topic: "기수 정렬",
    type: "multiple_choice",
    difficulty: "medium",
    question: "기수 정렬(Radix Sort)에 대한 설명으로 옳지 않은 것은?",
    choices: [
      "데이터를 비교하지 않고 정렬하는 유일한 알고리즘이다",
      "자리수별로 버킷에 넣고 빼며 버킷은 큐(Queue)로 구현한다",
      "시간 복잡도가 O(d·N)으로 비교 정렬보다 빠를 수 있다",
      "실수·한글·한자를 포함한 모든 데이터에 적용할 수 있다"
    ],
    answer: 3,
    brief: "모든 데이터 적용 가능 진술이 틀림: 실수·문자는 불가.",
    detailed: "기수 정렬은 비교 없이 자리수 기준으로 버킷(큐)에 분배·수집하며 O(d·N)(d=최대 자리수)이다. 그러나 실수·한글·한자 등에는 적용할 수 없고, 동일한 길이의 숫자나 단순 알파벳에만 쓸 수 있다. 따라서 마지막 보기가 옳지 않다.",
    source: "13차시 §9-3 기수 정렬"
  },
  {
    id: "DS_F8Q30",
    set: 8,
    week: 13,
    topic: "정렬 안정성 종합",
    type: "multiple_choice",
    difficulty: "hard",
    question: "다음 중 '안정 정렬(Stable Sort)'에 해당하는 것만 모두 고른 것은?",
    choices: [
      "선택, 퀵, 힙",
      "삽입, 머지, 기수",
      "선택, 버블, 셸",
      "퀵, 힙, 셸"
    ],
    answer: 1,
    brief: "안정 = 삽입·버블·머지·기수.",
    detailed: "안정 정렬(같은 키의 상대 순서를 보존)은 삽입·버블·머지·기수다. 선택·퀵·힙·셸은 불안정하다. 보기 중 모두 안정인 것은 삽입·머지·기수다.",
    source: "13차시 §5 정렬 비교표"
  }
];

const ALL = [...set1, ...set2, ...set3, ...set4, ...set5, ...set6, ...set7, ...set8];

export const META = {
  id: "ds",
  title: "자료구조",
  subtitle: "1~13차시 · 정기고사 중간4·기말4세트 + 주차별 확인문제(9~13차시)",
  emoji: "📊",
  color: "#1E7E5F",
  available: true,
  hasExam: true,
  examType: "multiple_choice", // 100% 객관식 (교수님 공지)
  sets: SETS_META,
  weekCount: 13,
  noteIndex: [
    { slug: "00_INDEX_전체_개요", title: "📚 00 INDEX — 전체 개요·족집게", week: 0 },
    { slug: "1차시_과목_오리엔테이션_및_자료구조_전체_숲보기", title: "1차시 — 오리엔테이션·숲보기", week: 1 },
    { slug: "2차시_알고리즘_기초와_성능_분석", title: "2차시 — 알고리즘·성능 분석", week: 2 },
    { slug: "3차시_순환_vs_반복과_알고리즘_설계_기법", title: "3차시 — 순환 vs 반복", week: 3 },
    { slug: "4차시_리스트_ADT와_정적_구현", title: "4차시 — 리스트·정적 구현", week: 4 },
    { slug: "5차시_연결_리스트_단순_원형_이중", title: "🌟 5차시 — 연결 리스트", week: 5 },
    { slug: "6차시_스택과_수식의_계산", title: "🌟 6차시 — 스택·수식 계산", week: 6 },
    { slug: "7차시_큐_데크_우선순위_큐", title: "🌟 7차시 — 큐·데크·우선순위 큐", week: 7 },
    { slug: "기말_INDEX_9to13차시", title: "📕 기말 INDEX — 트리·히프·그래프·정렬(9~13차시)", week: 8 },
    { slug: "9차시_트리1_이진트리_탐색_BST", title: "🌟 9차시 — 트리 I·이진 트리·탐색·BST", week: 9 },
    { slug: "10차시_히프와_우선순위_큐", title: "🌟 10차시 — 히프·우선순위 큐", week: 10 },
    { slug: "11차시_그래프_표현과_탐색", title: "🌟 11차시 — 그래프 I·표현·탐색", week: 11 },
    { slug: "12차시_그래프_최단경로_신장트리", title: "🌟 12차시 — 그래프 II·MST·최단경로", week: 12 },
    { slug: "13차시_정렬_완전정복", title: "🌟 13차시 — 정렬(Sorting) 완전 정복", week: 13 },
  ],
  weeklyExams: [
    { week: 9, slug: "9차시_트리_시험", title: "9차시 시험 — 트리·이진트리·탐색·BST (객관식 20)", count: 20 },
    { week: 10, slug: "10차시_히프_시험", title: "10차시 시험 — 히프·우선순위 큐 (객관식 20)", count: 20 },
    { week: 11, slug: "11차시_그래프_시험", title: "11차시 시험 — 그래프 표현·탐색 (객관식 20)", count: 20 },
    { week: 12, slug: "12차시_그래프2_시험", title: "12차시 시험 — MST·최단경로 (객관식 20)", count: 20 },
    { week: 13, slug: "13차시_정렬_시험", title: "13차시 시험 — 정렬 알고리즘 (객관식 20)", count: 20 },
  ],
};

export function getSetQuestions(setId) {
  switch (setId) {
    case 1: return set1;
    case 2: return set2;
    case 3: return set3;
    case 4: return set4;
    case 5: return set5;
    case 6: return set6;
    case 7: return set7;
    case 8: return set8;
    default: return [];
  }
}

export function getAllQuestions() { return ALL; }
