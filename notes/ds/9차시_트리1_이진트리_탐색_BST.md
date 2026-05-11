# 🌟 9차시 — 트리 I (Trees I): 트리·이진 트리·탐색·쓰레드·BST

> **핵심 한 줄 요약**
> 트리는 **1:n 계층** 비선형 자료구조. **이진 트리**는 자식 ≤ 2개 + 순서 중요. **저장**은 배열(완전 트리)/연결 리스트, **탐색**은 루트 방문 위치에 따라 **전위·중위·후위** + 큐 기반 **레벨**. **쓰레드 이진 트리**는 NULL 링크를 재활용해 재귀 없이 탐색. **BST**는 `Left < Root < Right` 규칙으로 $O(\log N)$ 검색을 만드는 핵심 구조. **이 차시는 기말고사 핵심 출제 영역.**

---

## 🎯 9차시 핵심 출제 포인트 프리뷰 🌟

### ⭐ 핵심 출제 ①: 트리 탐색 (핵심 출제 패턴)
> 🗣️ **교수님**: "오늘 오신 분들은 **기말고사 1번 문제는 다 맞습니다**. 1번 문제가 바로 트리 탐색입니다!"
- 전위·중위·후위·레벨 4가지 — 루트를 언제 방문하느냐가 차이.

### ⭐ 핵심 출제 ②: BST 삭제 3 Case
- 자식 0개 / 1개 / 2개 — 특히 **2개일 때**(왼쪽 서브트리 최댓값 OR 오른쪽 서브트리 최솟값)가 까다로움.

### ⭐ 핵심 출제 ③: BST vs Heap 차이
> 🗣️ **교수님**: "기말고사에서 **'힙(Heap)과 이진 탐색 트리(BST)가 어떻게 다른가?'** 를 명확하게 구분하는 문제가 출제됩니다."

### ⭐ 핵심 출제 ④: 이진 트리 수학 성질
- 레벨 $i$ 최대 노드 수 = $2^{i-1}$
- $n$개 노드 → 간선 $n-1$개
- $n$개 노드 트리의 최소 높이 = $\lceil \log_2(n+1) \rceil$

### 📝 시험 형식
- **100% 객관식(선다형)** (전 차시 동일)
- "기말고사 만점이면 원하는 학점"

---

## 1. 트리의 개념 (Concept of Trees)

![w9 p3](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p03.jpg)

### 1.1 트리의 정의
- **1개 이상의 노드**를 갖는 집합, **사이클 없는 그래프(Acyclic graph)**, **계층 구조**.
- 자료들 간 관계가 **1:n** (일대다, 계층적 관계).
- **루트(Root)**: 트리의 시작점이 되는 특별한 노드.
- **부속 트리(Subtree)**: 루트를 제외한 나머지 노드들이 이루는 $n$개의 부분 트리. 각각 다시 서브트리의 루트가 됨 → **재귀(Recursive) 구조**.
- **포레스트(Forest)**: 트리에서 루트를 제거하면 남는 서브트리들의 집합. (Random Forest, Decision Tree에서 활용)

### 💡 그래프와의 관계 (출제 포인트)
> 모든 정점이 연결되어 있고, 정점 수가 $N$개일 때 **간선 수 = $N-1$** 이면 사이클이 없는 **트리**.

---

## 2. 트리의 응용

선형 자료구조(리스트·스택·큐)와 달리 **데이터의 계층적 관계(Parent-Child)** 를 효율적으로 저장.

- **회사·정부 조직도**, 나라/지방/시군별 계층 데이터
- **DBMS 인덱스**: B-Tree, B+ Tree
- **디렉토리·파일 시스템**
- **컴파일러 추상 문법 트리(AST)**: 코딩 시 문법 구조를 트리로 저장

---

## 3. 트리 용어 (Terminology) 🌟

![w9 p7](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p07.jpg)

> 🗣️ **교수님 농담**: "자식자식 하다 보니까 어감이 이상해서 **Parent / Child** 영어 용어를 선호합니다."

<table header-row="true">
<tr>
<td>용어</td>
<td>정의</td>
</tr>
<tr>
<td>**노드의 차수 (Degree)**</td>
<td>해당 노드가 가진 부속 트리(Child) 수</td>
</tr>
<tr>
<td>**트리의 차수**</td>
<td>트리 내 노드들의 차수 중 **최댓값**</td>
</tr>
<tr>
<td>**단말 노드 (Leaf / Terminal)**</td>
<td>차수가 0인 노드 (자식 없음)</td>
</tr>
<tr>
<td>**내부 노드 (Internal)**</td>
<td>차수 ≥ 1인 노드</td>
</tr>
<tr>
<td>**형제 (Sibling)**</td>
<td>부모가 같은 자식들</td>
</tr>
<tr>
<td>**조상 (Ancestor)**</td>
<td>루트~해당 노드 경로의 모든 부모</td>
</tr>
<tr>
<td>**자손 (Descendant)**</td>
<td>특정 노드의 부속 트리에 속하는 모든 노드</td>
</tr>
<tr>
<td>**레벨 (Level)**</td>
<td>루트로부터의 깊이 (루트 = 1)</td>
</tr>
<tr>
<td>**트리의 높이 (Height/Depth)**</td>
<td>트리에 속한 노드의 **최대 레벨**</td>
</tr>
</table>

---

## 4. 트리의 표현: Left-Child Right-Sibling 🌟

자식이 $n$명일 때 링크를 $n$개씩 두면(n-링크 표현법) **메모리 낭비 심함**. → 모든 노드에 링크를 **딱 2개**만 두는 표현법.

![w9 p10](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p10.jpg)

- **L-link**: 가장 왼쪽 자식(Left-most child)
- **R-link**: 바로 오른쪽 형제(Right sibling)

### 💡 마법
이렇게 표현한 트리를 **45도 시계 방향**으로 회전시키면 → 모든 노드가 **자식 ≤ 2개**가 되어 **이진 트리(Binary Tree)** 로 완벽 변환!

---

## 5. 이진 트리 (Binary Tree)

> 🗣️ **교수님 비유**: "옛날에 형제가 너무 많아서 '둘만 낳아 잘 기르자' 표어가 있었죠. 효율적으로 둘만 낳아 잘 키워보자가 바로 **이진 트리**입니다."

### 5.1 정의와 특징

![w9 p13](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p13.jpg)

- **자식 ≤ 2개** (0, 1, 2).
- 일반 트리와 달리 **공집합(Empty Tree)** 도 이진 트리로 인정.
- **순서 매우 중요**: Left ≠ Right (위치만 달라도 다른 트리).

### 5.2 수학적 성질 (계산 문제 대비) 🌟

<table header-row="true">
<tr>
<td>항목</td>
<td>값</td>
</tr>
<tr>
<td>**레벨 $i$ 최대 노드 수**</td>
<td>$2^{i-1}$ (레벨 1 → 1개, 레벨 3 → 4개)</td>
</tr>
<tr>
<td>**$n$개 노드 트리의 간선 수**</td>
<td>$n - 1$</td>
</tr>
<tr>
<td>**높이 $h$의 최소 노드 수**</td>
<td>$h$ (편향 트리)</td>
</tr>
<tr>
<td>**높이 $h$의 최대 노드 수**</td>
<td>$2^h - 1$ (포화 트리)</td>
</tr>
<tr>
<td>**$n$개 노드의 최소 높이**</td>
<td>$\lceil \log_2(n+1) \rceil$</td>
</tr>
</table>

> 🗣️ **교수님 강조**: "알고리즘 복잡도의 **이상형**은 $O(\log N)$. 검색을 정복하기 위해 트리를 배웁니다. **이진 탐색 트리**를 잘 구성하면 $O(\log N)$만에 찾아낼 수 있어 **엄청나게 효율적**입니다."

### 5.3 이진 트리의 종류

![w9 p17](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p17.jpg)

- **포화 이진 트리 (Full Binary Tree)**: 모든 레벨이 꽉 차서 $2^h - 1$개의 노드.
- **완전 이진 트리 (Complete Binary Tree)**: 마지막 레벨 제외 모두 꽉 차고, 마지막 레벨은 **왼쪽부터 빈틈없이** 채움.
- **편향 이진 트리 (Skewed Tree)**: 한쪽으로만 자식이 이어진 선형 구조 → 공간 낭비 + $O(N)$ 탐색. (해결: 추후 **AVL 등 균형 트리**)

---

## 6. 이진 트리의 저장 (Storage)

### 6.1 배열 정적 저장

![w9 p21](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p21.jpg)

레벨 순서·왼쪽→오른쪽 순으로 배열에 차곡차곡 저장.

#### 인덱스 계산법 (0-based)

<table header-row="true">
<tr>
<td>관계</td>
<td>인덱스</td>
</tr>
<tr>
<td>**왼쪽 자식**</td>
<td>$i \times 2 + 1$</td>
</tr>
<tr>
<td>**오른쪽 자식**</td>
<td>$i \times 2 + 2$</td>
</tr>
<tr>
<td>**부모**</td>
<td>$\lfloor (i - 1) / 2 \rfloor$ (소수점 버림)</td>
</tr>
</table>

**교수님 예시**:
- 인덱스 6(G)의 부모 = $(6-1)/2 = 2.5 \to$ **인덱스 2 (C)**
- 인덱스 3(D)의 왼쪽 자식 = $3 \times 2 + 1 =$ **7 (H)**

#### 장단점
- ✅ **수식만으로 부모·자식 위치 즉시 계산** (포인터 불필요).
- ❌ 편향 트리에선 **빈 공간 폭증**. 트리 깊이를 미리 알아야 함.

### 6.2 연결 리스트 동적 저장

![w9 p25](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p25.jpg)

```c
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;
```

- 데이터 1 + 링크 2 (L, R).
- 단말 노드의 링크는 **NULL**.
- 부모 링크 추가도 가능하지만 관리 복잡 → 보통 2개만.

---

## 7. 이진 트리 탐색 (Tree Traversal) 🌟 (핵심 출제 패턴)

> 🗣️ **교수님 핵심 원리**: "트리는 항상 **왼쪽에서 오른쪽**으로 간다. 단지 **'루트(Root)를 언제 방문하느냐'** 에 따라 탐색 방법이 나뉩니다."

### 7.1 재귀적 탐색 3가지 (수식 표기와 직결)

![w9 p32](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p32.jpg)

<table header-row="true">
<tr>
<td>탐색</td>
<td>순서</td>
<td>수식 표기</td>
<td>특징</td>
</tr>
<tr>
<td>**중위 (Inorder)**</td>
<td>L → V → R</td>
<td>**Infix** (우리가 흔히 쓰는 식)</td>
<td>루트를 **중간에** 방문</td>
</tr>
<tr>
<td>**전위 (Preorder)**</td>
<td>V → L → R</td>
<td>**Prefix**</td>
<td>루트를 **제일 먼저** 방문</td>
</tr>
<tr>
<td>**후위 (Postorder)**</td>
<td>L → R → V</td>
<td>**Postfix**</td>
<td>루트를 **맨 마지막에** 방문 (컴파일러 수식 계산)</td>
</tr>
</table>

```c
// 중위 탐색 예시
void inorder(TreeNode *root) {
    if (root != NULL) {
        inorder(root->left);     // L
        printf("%d ", root->data); // V
        inorder(root->right);    // R
    }
}
```

> 🔥 **반드시 손으로 그려보기**: NULL 만나면 출력 멈추고 부모로 올라가는 재귀 흐름을 칠판 따라가며 직접 추적!

### 7.2 레벨 탐색 (Level Order)

![w9 p40](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p40.jpg)

루트부터 **계층(레벨) 순서대로** 위→아래, 왼쪽→오른쪽 방문.

#### 💡 핵심 자료구조: 큐(Queue)

> 🗣️ **교수님 질문**: "포인터는 부모→자식만 연결되어 있는데, **같은 레벨 옆 노드**(예: 3번 → 4번)로 어떻게 이동할까요?"
> **해답**: **큐(Queue, FIFO)** 사용!

```c
void level_order(TreeNode *root) {
    Queue q = createQueue();
    enqueue(q, root);
    while (!isEmpty(q)) {
        TreeNode *node = dequeue(q);
        printf("%d ", node->data);
        if (node->left)  enqueue(q, node->left);
        if (node->right) enqueue(q, node->right);
    }
}
```

#### 동작 원리
1. 노드 방문 시 그 노드의 **왼쪽·오른쪽 자식**을 큐에 enqueue.
2. 방문 끝나면 큐에서 **먼저 들어온 노드 dequeue**해서 다시 방문.
3. → 물리적 링크 없어도 같은 레벨 노드 순서대로 방문 가능.

---

## 8. 이진 트리 알고리즘 (재귀의 정수)

트리의 가장 큰 특징: **재귀(Recursive)**. 노드 수·높이도 서브 트리로 쪼개어 내려가는 순환 알고리즘.

### 8.1 노드 개수
**원리**: 왼쪽 서브트리 노드 수 + 오른쪽 서브트리 노드 수 + 1(자기 자신)
```c
int count(TreeNode *root) {
    if (root == NULL) return 0;
    return count(root->left) + count(root->right) + 1;
}
```

### 8.2 트리 높이
**원리**: $\max(\text{왼쪽 높이}, \text{오른쪽 높이}) + 1$
```c
int height(TreeNode *root) {
    if (root == NULL) return 0;
    int lh = height(root->left), rh = height(root->right);
    return (lh > rh ? lh : rh) + 1;
}
```

### 8.3 탐색 방법별 활용
<table header-row="true">
<tr>
<td>작업</td>
<td>탐색</td>
<td>이유</td>
</tr>
<tr>
<td>**복사 (Copy)**</td>
<td>**후위(Postorder)**</td>
<td>자식 둘 다 복사한 뒤 루트 생성</td>
</tr>
<tr>
<td>**비교 (Compare)**</td>
<td>**전위(Preorder)**</td>
<td>루트 먼저 비교 → 다르면 즉시 중단</td>
</tr>
</table>

---

## 9. 쓰레드 이진 트리 (Threaded Binary Tree) 🌟

> 🗣️ **교수님**: "자료구조를 배우는 이유는 결국 **'효율성'** 때문입니다."

### 9.1 등장 배경 (문제 제기)

![w9 p52](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p52.jpg)

- 기존 중위 탐색 등은 모두 **재귀(Recursive)** 호출.
- 재귀 → 메모리 **콜 스택**에 스택 프레임 할당/해제 반복 → **오버헤드(Overhead)**.
- **목표**: "콜 스택 안 쓰고 **링크만 따라가서** 모든 노드 방문할 수 없을까?"

### 9.2 남는 NULL 링크의 재활용 🌟

<table header-row="true">
<tr>
<td>항목</td>
<td>개수</td>
</tr>
<tr>
<td>**$n$개 노드의 총 링크 수**</td>
<td>$2n$ (L + R)</td>
</tr>
<tr>
<td>**실제 자식 가리키는 링크**</td>
<td>$n - 1$</td>
</tr>
<tr>
<td>**낭비되는 NULL 링크**</td>
<td>$2n - (n-1) =$ **$n + 1$**</td>
</tr>
</table>

> 💡 **출제 포인트**: 이 $n+1$개의 NULL 링크를 **버리지 않고**, 중위 탐색 시 **'바로 앞 노드'** 또는 **'바로 다음 노드'** 를 가리키도록 (실처럼) 연결 = **쓰레드(Thread)**.

### 9.3 쓰레드 이진 트리의 규칙

![w9 p57](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p57.jpg)

<table header-row="true">
<tr>
<td>NULL 링크 방향</td>
<td>가리키는 대상</td>
</tr>
<tr>
<td>**왼쪽 NULL**</td>
<td>중위 탐색 순서상 **바로 앞** (Predecessor, 선행자)</td>
</tr>
<tr>
<td>**오른쪽 NULL**</td>
<td>중위 탐색 순서상 **바로 다음** (Successor, 후속자)</td>
</tr>
</table>

### 9.4 플래그(Flag)의 도입

**문제**: 링크가 **'진짜 자식'** 을 가리키는지 **'쓰레드'** 를 가리키는지 컴퓨터는 구분 불가.
**해결**: Boolean 플래그 추가.

```c
typedef struct ThreadedNode {
    int data;
    struct ThreadedNode *left, *right;
    bool left_thread;   // true: 쓰레드, false: 진짜 자식
    bool right_thread;
} ThreadedNode;
```

### 9.5 탐색 장점
중위 탐색 시 **재귀 함수 호출 X**. `insuccessor()` 함수로 **오른쪽 링크만 쭉 따라가면** (자식 없으면 쓰레드 타고 이동) **빠르고 효율적** 으로 모든 노드 순회.

---

## 10. 이진 탐색 트리 (Binary Search Tree, BST) 🌟 [기말고사 변별력 핵심]

> 🗣️ **교수님 극찬**: "컴퓨터 사이언티스트들이 너무나 사랑하는 트리. **B-Tree, B+ Tree, AVL Tree** 등 수많은 변형의 **근본**입니다."

### 10.1 교수님의 '이상형' 시간 복잡도

![w9 p61](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p61.jpg)

> 🗣️ **교수님 농담**: "알고리즘을 짰는데 복잡도가 $O(\log N)$으로 나오기를 간절히 바라면서 **ChatGPT나 Claude한테도 반드시 로그 시간 복잡도로 코드를 짜오라**고 얘기하죠."

**BST의 존재 이유**: $N$개 데이터 중 검색 시 $O(N)$이 아닌 **$O(\log N)$** 의 압도적 속도.

### 10.2 BST의 핵심 정의 (절대 규칙) 🌟

> 💡 **왼쪽 서브트리의 모든 키값 < 루트 키값 < 오른쪽 서브트리의 모든 키값**

![w9 p64](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p64.jpg)

#### 중위 탐색의 마법 🌟
이 규칙 때문에 BST를 **중위 탐색(L → V → R)** 으로 순회하면 → 데이터가 **오름차순으로 완벽하게 정렬** 되어 출력!

### 10.3 BST 기본 연산

#### ① 검색 (Search)
```c
TreeNode* search(TreeNode *root, int key) {
    if (root == NULL || root->key == key) return root;
    if (key < root->key) return search(root->left, key);
    else                 return search(root->right, key);
}
```

#### ② 삽입 (Insert)
- **반드시 먼저 검색**을 수행.
- 검색 실패해서 끝나는 자리(NULL) **= 새 노드 삽입 위치**.

```c
TreeNode* insert(TreeNode *root, int key) {
    if (root == NULL) return newNode(key);
    if (key < root->key)  root->left  = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}
```

#### ③ 삭제 (Delete) 🌟 [출제 확률 매우 높음]

![w9 p70](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p70.jpg)

규칙(Left < Root < Right)을 깨뜨리지 않으면서 삭제 → **자식 개수에 따라 3 Case**:

<table header-row="true">
<tr>
<td>Case</td>
<td>상황</td>
<td>처리</td>
</tr>
<tr>
<td>**1**</td>
<td>자식 0개 (Leaf)</td>
<td>부모와 연결 끊고 삭제 (가장 간단)</td>
</tr>
<tr>
<td>**2**</td>
<td>자식 1개</td>
<td>유일한 자식을 부모에게 **입양**(직접 연결)</td>
</tr>
<tr>
<td>**3** 🌟</td>
<td>자식 2개</td>
<td>**왼쪽 서브트리의 최댓값** 또는 **오른쪽 서브트리의 최솟값** 으로 대체</td>
</tr>
</table>

> 💡 **Case 3 핵심**: 빈 자리에 들어갈 노드는 **'삭제되는 노드와 값이 가장 가까운'** 노드 — 왼쪽 가장 오른쪽 또는 오른쪽 가장 왼쪽 노드.

### 10.4 BST 성능 분석 (한계)

![w9 p73](https://repairer5812.github.io/ai-study-hub/assets/images/ds/ds_w9_p73.jpg)

탐색·삽입·삭제 모두 **트리 높이 $h$에 비례**.

<table header-row="true">
<tr>
<td>경우</td>
<td>트리 형태</td>
<td>높이</td>
<td>시간 복잡도</td>
</tr>
<tr>
<td>**Best**</td>
<td>균형 트리 (Balanced)</td>
<td>$\log_2 N$</td>
<td>$O(\log N)$ ⭐ 이상형</td>
</tr>
<tr>
<td>**Worst**</td>
<td>편향 트리 (Skewed)</td>
<td>$N$</td>
<td>$O(N)$ — 순차 탐색과 동일!</td>
</tr>
</table>

> 📝 데이터가 **이미 정렬된 채로 삽입** 되면 한쪽으로만 길게 늘어진 편향 트리가 되어 BST의 의미가 사라짐. → 이 최악을 막기 위해 **AVL Tree** 등 자가 균형 트리가 등장.

---

## 11. 다음 시간 예고 + 기말고사 핵심 팁 🌟

- **다음 시간**: 큐의 일종인 **우선순위 큐(Priority Queue)** 를 비선형 구조 **힙(Heap)** 으로 구현 (7차시 예고와 연결).
- **초특급 힌트** 🌟: "기말고사에서 **'힙(Heap)과 이진 탐색 트리(BST)가 어떻게 다른가?'** 를 명확하게 구분하는 문제가 출제됩니다. 이 개념을 확실히 잡아야 높은 학점을 받을 수 있어요!"

### 미리 정리: BST vs Heap

<table header-row="true">
<tr>
<td>구분</td>
<td>**BST**</td>
<td>**Heap (Max Heap 기준)**</td>
</tr>
<tr>
<td>**규칙**</td>
<td>L < Root < R</td>
<td>Parent ≥ Child (좌우 무관)</td>
</tr>
<tr>
<td>**모양**</td>
<td>임의 (균형 보장 없음)</td>
<td>**완전 이진 트리** 강제</td>
</tr>
<tr>
<td>**중위 탐색 결과**</td>
<td>**오름차순 정렬**</td>
<td>의미 없음</td>
</tr>
<tr>
<td>**최솟값/최댓값 찾기**</td>
<td>$O(\log N)$ (가장 왼쪽/오른쪽 따라가기)</td>
<td>**루트 = $O(1)$**</td>
</tr>
<tr>
<td>**주 용도**</td>
<td>**검색**</td>
<td>**우선순위 큐, 힙 정렬**</td>
</tr>
</table>

---

## 🎯 9차시 최종 암기 체크리스트

### 트리 기본
- [ ] 1:n 계층, 사이클 없는 그래프, 재귀 구조
- [ ] 정점 $N$개 + 간선 $N-1$개 + 모두 연결 = 트리
- [ ] 루트 / 부속 트리 / 포레스트 / Parent-Child / Sibling / Ancestor / Descendant
- [ ] 차수 / Leaf / Internal / Level / Height

### Left-Child Right-Sibling
- [ ] 모든 노드 링크 2개로 한정 (L = leftmost child, R = right sibling)
- [ ] 45도 회전 → 이진 트리

### 이진 트리 수학 🌟
- [ ] 자식 ≤ 2개, 순서 중요, Empty도 인정
- [ ] 레벨 $i$ 최대 노드 = $2^{i-1}$
- [ ] $n$개 노드 → 간선 $n-1$
- [ ] 높이 $h$ → 최소 $h$개, 최대 $2^h - 1$개
- [ ] $n$개 → 최소 높이 $\lceil \log_2(n+1) \rceil$
- [ ] 종류: 포화 / 완전 / 편향

### 저장 방식
- [ ] 배열: 부모 $\lfloor (i-1)/2 \rfloor$, 좌 $2i+1$, 우 $2i+2$
- [ ] 배열은 완전 트리에 적합, 편향 트리는 메모리 낭비
- [ ] 연결 리스트: 데이터 + L-link + R-link, NULL은 단말

### 탐색 4종 🌟 (핵심 출제 패턴)
- [ ] 중위 (L V R) → Infix
- [ ] 전위 (V L R) → Prefix
- [ ] 후위 (L R V) → Postfix → 컴파일러 수식 계산
- [ ] 레벨 → **큐(Queue)** 사용
- [ ] 복사 = 후위 / 비교 = 전위

### 쓰레드 이진 트리 🌟
- [ ] 등장 배경: 재귀 콜 스택 오버헤드 제거
- [ ] $n+1$개 NULL 링크 재활용
- [ ] 왼쪽 NULL → predecessor / 오른쪽 NULL → successor
- [ ] 플래그(Flag)로 진짜 자식 vs 쓰레드 구분

### BST 🌟 [변별력 핵심]
- [ ] 절대 규칙: **L < Root < R**
- [ ] 중위 탐색 → **오름차순 정렬**
- [ ] 검색·삽입은 단순, 삽입은 검색 실패 위치
- [ ] **삭제 3 Case** (자식 0/1/2)
- [ ] Case 3: 왼쪽 서브트리 최댓값 OR 오른쪽 서브트리 최솟값
- [ ] Best $O(\log N)$ / Worst $O(N)$ (편향)
- [ ] 균형 보장 → **AVL** 등 자가 균형 트리

### 다음 시간 + 핵심 포인트 🌟
- [ ] **BST vs Heap 차이** (핵심 출제 패턴)
- [ ] BST: L<R<R, 검색용 / Heap: 완전 이진, 우선순위 큐
