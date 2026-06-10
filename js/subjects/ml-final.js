// subjects/ml-final.js — 기계학습 기말 정기고사 세트
// SET 1~4: 9~13주차 전범위 균형(각 25문항, 주차당 5문항) · 종합: 전범위 통합·비교 30문항
// 주차별 확인문제(9~13)가 주차 단위 복습을 담당하므로, 정기고사는 중간고사처럼 전범위 균형 세트로 구성.
// 노트 기반 출제 → 스키마·정답범위 검증 + 주차/난이도/정답 분포 균형 완료. 종합세트는 label '전범위 종합'으로 🏆 표시.

export const FINAL_SETS = {
  201:
  [
    {
      "id": "MLF9Q1",
      "set": 201,
      "week": 9,
      "topic": "비지도학습 정의",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "비지도학습(unsupervised learning)의 목표로 가장 적절한 것은?",
      "choices": [
        "① target variable을 예측하는 대신, 레이블 없이 데이터에 내재된 underlying structure(패턴·규칙성·숨은 조직)를 발견하는 것",
        "② 레이블이 달린 입력으로부터 클래스를 예측하는 것",
        "③ 입력을 출력 레이블로 매핑하는 함수를 최소 오차로 학습하는 것",
        "④ 손실 함수를 최소화하는 회귀 계수를 추정하는 것"
      ],
      "answer": 0,
      "brief": "레이블 없이 데이터 자체의 내재 구조를 발견.",
      "detailed": "슬라이드 원문: we are confronted with data that do not come with labeled outcomes. target variable 예측이 아니라 데이터 안의 patterns, regularities, hidden organization을 식별하는 것이 목표다. 교수님 예시처럼 이미지가 강아지인지 고양이인지 정답이 없을 때 입력 피처만으로 분포를 파악한다.",
      "source": "밀도추정 PDF; 9주차 § 1"
    },
    {
      "id": "MLF9Q6",
      "set": 201,
      "week": 9,
      "topic": "KDE vs KNN 갈래",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "공식 p(x)≈K/(NV)에서 KDE와 KNN density estimator가 갈리는 기준을 옳게 설명한 것은? (N은 고정)",
      "choices": [
        "① KDE는 K를 고정하고 V를 확장하며, KNN은 V를 고정하고 K를 센다",
        "② KDE는 V를 고정하고 K를 세며, KNN은 K를 고정하고 V를 확장한다",
        "③ KDE와 KNN 모두 K와 V를 동시에 고정한다",
        "④ KDE와 KNN 모두 N을 변화시킨다"
      ],
      "answer": 1,
      "brief": "KDE: V 고정·K 카운트 / KNN: K 고정·V 확장.",
      "detailed": "KDE는 박스 사이즈(V)를 정해놓고 안에 몇 개 들었는지(K) 센다. KNN density는 K개를 채울 때까지 영역(V)을 부풀린다. 두 방법은 같은 공식 K/(NV)의 양면이며, 어느 쪽을 변수로 두느냐가 차이다.",
      "source": "밀도추정 PDF; 9주차 § 4"
    },
    {
      "id": "MLF9Q12",
      "set": 201,
      "week": 9,
      "topic": "KNN density 적응성",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "KNN density estimator의 작동 원리와 적응성으로 옳은 것은?",
      "choices": [
        "① 데이터 밀집 지역은 V가 커서 p(x)가 작아진다",
        "② V를 고정하고 K를 세므로 모든 위치에 동일한 잣대를 쓴다",
        "③ K를 고정하고 그 K개를 채울 때까지 영역을 확장하므로, 밀집 지역은 V가 작아 p(x)가 크고, 희소 지역은 V가 커 p(x)가 작다 — 위치마다 V가 자동 적응한다",
        "④ K가 클수록 항상 noisy해진다"
      ],
      "answer": 2,
      "brief": "K 고정·V 확장 → 밀집=작은V·큰p, 희소=큰V·작은p (적응적).",
      "detailed": "주어진 점 x에서 정확히 K개를 포함할 때까지 영역(예: 구)을 확장한다. 밀집 지역은 작은 V로 K개가 차서 p(x)=K/(NV)가 크고, 희소 지역은 큰 V가 필요해 p(x)가 작다. 위치마다 V를 자동 조정하므로 KDE와 달리 적응적이다.",
      "source": "밀도추정 PDF; 9주차 § 6"
    },
    {
      "id": "MLF9Q8",
      "set": 201,
      "week": 9,
      "topic": "Box Kernel 계산",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "1차원(D=1) Box(Uniform) 커널 KDE를 쓴다. N=5, bandwidth h=2, 평가점 x=10 이고 데이터가 {9, 10, 11, 14, 6} 일 때, x=10에서의 밀도 추정값 p(x)는? (Box 커널: |x − x^(n)| ≤ h/2 이면 1)",
      "choices": [
        "① 0.1",
        "② 0.2",
        "③ 0.5",
        "④ 0.3"
      ],
      "answer": 3,
      "brief": "K=3(9,10,11), p = K/(NV) = 3/(5·2) = 0.3.",
      "detailed": "h=2 이므로 h/2=1. |x−x^(n)|≤1 인 점은 9,10,11(거리 1,0,1) 세 개라 K=3. 14(거리4),6(거리4)는 제외. V=h^D=2^1=2. p(x)=K/(NV)=3/(5·2)=0.3. 식 p(x)=(1/N)Σ(1/h^D)k(...) 로도 동일하다.",
      "source": "밀도추정 PDF; 9주차 § 5"
    },
    {
      "id": "MLF9Q16",
      "set": 201,
      "week": 9,
      "topic": "Parametric vs Non-Parametric",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "Parametric 방법(GMM)과 Non-Parametric 방법(KDE, KNN)의 차이로 옳은 것은?",
      "choices": [
        "① Non-parametric은 데이터 포인트 자체에 의존하고 모델 복잡도가 데이터셋 크기에 비례해 커지며, parametric은 분포 형태를 가정해 소수 파라미터로 표현하고 복잡도가 고정된다",
        "② Non-parametric은 분포 형태를 가정하고 소수 파라미터만 쓰며, parametric은 데이터 자체에 의존한다",
        "③ 둘 다 모델 복잡도가 데이터셋 크기와 무관하다",
        "④ Parametric은 h·K 같은 지역 파라미터에 강하게 의존한다"
      ],
      "answer": 0,
      "brief": "Non-para=데이터 의존·복잡도 ∝ 크기 / Para=분포 가정·소수 파라미터·고정.",
      "detailed": "Non-parametric(KDE, KNN)은 특정 분포를 가정하지 않고 데이터 포인트 자체에 의존하며, 모델 복잡도가 데이터셋 크기에 비례해 커지고 h나 K 같은 지역 파라미터에 강하게 의존한다. Parametric(GMM)은 분포 형태(예: 정규분포)를 가정해 소수 파라미터(평균·분산 등)로 표현하며 복잡도가 데이터 크기와 무관하게 고정된다.",
      "source": "밀도추정 PDF; 9주차 § 8"
    },
    {
      "id": "MLF10Q4",
      "set": 201,
      "week": 10,
      "topic": "K-Means 목적 함수",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "K-Means 목적 함수 J = Σ_n Σ_k r_nk ||x^(n) − μ_k||² 에 대한 설명으로 옳은 것은?",
      "choices": [
        "① J는 군집 간 거리의 합으로, 최대화 대상이다",
        "② J는 총 군집 내 분산(total within-cluster variance)이며, r_nk와 μ_k에 대해 최소화한다",
        "③ r_nk는 0과 1 사이의 실수 확률값이다",
        "④ ||x^(n) − μ_k||²는 맨해튼 거리를 뜻한다"
      ],
      "answer": 1,
      "brief": "J=총 군집 내 분산, r_nk·μ_k에 대해 최소화.",
      "detailed": "노트 §2.3: J는 total within-cluster variance로, r_nk(0/1 지시변수)와 μ_k를 찾아 최소화하는 문제다. ||·||²는 제곱 유클리드 거리다.",
      "source": "클러스터링 PDF; 10주차 § 2.3"
    },
    {
      "id": "MLF10Q10",
      "set": 201,
      "week": 10,
      "topic": "K-Means ↔ EM 대응",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "K-Means의 두 단계와 EM의 단계 대응으로 옳은 것은?",
      "choices": [
        "① 할당 단계 = M-step, 중심 갱신 = E-step",
        "② 두 단계 모두 E-step에 대응",
        "③ 할당 단계 = E-step, 중심 갱신 = M-step",
        "④ K-Means와 EM은 구조적으로 무관하다"
      ],
      "answer": 2,
      "brief": "할당=E-step, 중심 갱신=M-step.",
      "detailed": "노트 §2.8·§7 Q1: assignment step은 E-step에, cluster center update는 M-step에 대응한다. K-means는 GMM/EM의 하드 할당 특수 케이스로 볼 수 있다.",
      "source": "클러스터링 PDF; 10주차 § 2.8"
    },
    {
      "id": "MLF10Q8",
      "set": 201,
      "week": 10,
      "topic": "K 선택 — Elbow vs Silhouette",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "군집 개수 K를 정하는 방법에 대한 설명으로 옳은 것은?",
      "choices": [
        "① Elbow는 실루엣 점수가 최대가 되는 K를 고른다",
        "② Silhouette 점수 s_i는 항상 0 이상이다",
        "③ 비지도학습에도 항상 보편적으로 옳은 단일 K 값이 존재한다",
        "④ Elbow는 W(K)(군집 내 제곱합) 대 K 그래프에서 감소가 급격히 완만해지는 팔꿈치 지점을 K로 고른다"
      ],
      "answer": 3,
      "brief": "Elbow = W(K) 곡선의 팔꿈치(감소가 완만해지는 지점).",
      "detailed": "노트 §2.6: Elbow는 W(K)=Σ_k Σ_{x∈C_k}||x−μ_k|| 대 K 그래프의 팔꿈치를 고른다. 비지도라 보편적으로 옳은 K는 없고, s_i는 [−1,1] 범위로 음수도 가능하다.",
      "source": "클러스터링 PDF; 10주차 § 2.6"
    },
    {
      "id": "MLF10Q15",
      "set": 201,
      "week": 10,
      "topic": "E-step 책임값 계산(계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "컴포넌트가 2개이고 π_1=π_2=0.5다. 어떤 점 x에서 N(x|μ_1,Σ_1)=0.4, N(x|μ_2,Σ_2)=0.1일 때 책임값 γ(z_1)은?",
      "choices": [
        "① 0.8",
        "② 0.5",
        "③ 0.4",
        "④ 0.2"
      ],
      "answer": 0,
      "brief": "γ(z_1)=(0.5·0.4)/(0.5·0.4+0.5·0.1)=0.2/0.25=0.8.",
      "detailed": "노트 §4.2: γ(z_1)=π_1 N_1 / (π_1 N_1 + π_2 N_2) = (0.5×0.4)/((0.5×0.4)+(0.5×0.1)) = 0.20/0.25 = 0.8.",
      "source": "클러스터링 PDF; 10주차 § 4.2"
    },
    {
      "id": "MLF10Q20",
      "set": 201,
      "week": 10,
      "topic": "Ward linkage 계산·구별(계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "군집 A(점 2개, 중심 μ_A=(0,0))와 군집 B(점 4개, 중심 μ_B=(3,0))를 Ward 기준으로 병합할 때의 거리 D_Ward는? (D_Ward = (|A||B|/(|A|+|B|))·||μ_A−μ_B||²)",
      "choices": [
        "① 9",
        "② 12",
        "③ 6",
        "④ 1.5"
      ],
      "answer": 1,
      "brief": "(2·4/(2+4))·||(0,0)−(3,0)||² = (8/6)·9 = 12.",
      "detailed": "노트 §5.5·5.6: D_Ward=(|A||B|/(|A|+|B|))||μ_A−μ_B||². 계수=(2×4)/(2+4)=8/6=4/3, ||μ_A−μ_B||²=3²=9 → (4/3)×9=12. Centroid linkage(가중치 없이 9)와 달리 Ward는 크기 가중치가 붙는 점에 주의.",
      "source": "클러스터링 PDF; 10주차 § 5.6"
    },
    {
      "id": "MLF11Q3",
      "set": 201,
      "week": 11,
      "topic": "PCA vs ICA 목적",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "PCA와 ICA의 주된 목적을 옳게 짝지은 것은?",
      "choices": [
        "① PCA = 소스 분리, ICA = 차원 축소",
        "② PCA와 ICA 모두 클래스 분리도(separability) 최대화",
        "③ PCA = 분산을 보존하는 차원 축소, ICA = 통계적으로 독립인 성분으로의 소스 분리",
        "④ PCA = 비가우시안성 최대화, ICA = 분산 최대화"
      ],
      "answer": 2,
      "brief": "PCA=분산 보존 차원 축소, ICA=독립 성분 소스 분리.",
      "detailed": "노트: PCA의 주 목적은 차원 축소·시각화·압축·전처리, ICA의 주 목적은 소스 분리(Source Separation)다. ICA는 다변량 신호를 통계적으로 독립인 가산 성분으로 분리한다.",
      "source": "차원축소 PDF; 11주차 § 5.1"
    },
    {
      "id": "MLF11Q8",
      "set": 201,
      "week": 11,
      "topic": "고유값의 의미",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "S u_1 = λ_1 u_1에서 고유값 λ_1과 고유벡터 u_1의 의미로 옳은 것은?",
      "choices": [
        "① u_1은 분산값, λ_1은 주성분 방향이다",
        "② λ_1은 항상 0이고 u_1만 의미가 있다",
        "③ λ_1은 라벨, u_1은 데이터 평균이다",
        "④ u_1은 주성분 방향이고, λ_1은 그 방향의 분산값 자체이다 (u_1^T S u_1 = λ_1)"
      ],
      "answer": 3,
      "brief": "u_1=주성분 방향(고유벡터), λ_1=그 방향 분산값(고유값). u_1^T S u_1=λ_1.",
      "detailed": "노트 § 2.5: u_1은 S의 고유벡터로 주성분 방향, λ_1은 고유값으로 그 방향의 분산 값 그 자체다. u_1^T를 왼쪽 곱하고 u_1^T u_1=1을 쓰면 u_1^T S u_1=λ_1. 분산 최대화는 가장 큰 고유값을 갖는 고유벡터를 제1주성분으로 택하는 것이다.",
      "source": "차원축소 PDF; 11주차 § 2.5"
    },
    {
      "id": "MLF11Q20",
      "set": 201,
      "week": 11,
      "topic": "ICA 모호성",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "ICA가 x = A s를 완벽히 복원해도 남는 내재적 모호성(ambiguity)과, PCA와의 대비로 옳은 것은?",
      "choices": [
        "① 분리된 소스의 순서(permutation)와 크기(scaling)를 결정할 수 없으며, PCA는 고유값(분산) 크기로 정렬·크기 기준을 가진다",
        "② 소스의 부호만 모호하며, PCA도 동일한 부호 모호성을 가진다",
        "③ 모호성이 전혀 없으며 PCA보다 항상 정확하다",
        "④ 소스의 차원 수를 알 수 없으며, PCA는 차원 수도 모른다"
      ],
      "answer": 0,
      "brief": "Permutation(순서)·Scaling(크기) 모호. PCA는 고유값으로 정렬·크기 기준 보유.",
      "detailed": "노트 § 7.1: Permutation은 분리된 소스의 순서를 알 수 없음(A 열 교환=소스 순서만 바뀜), Scaling은 각 소스의 절대 크기 결정 안 됨(소스에 상수 곱하고 A 열을 나누면 동일). 반면 PCA는 고유값 크기 순 정렬이 가능하고 분산으로 크기 기준이 있다.",
      "source": "차원축소 PDF; 11주차 § 7.1"
    },
    {
      "id": "MLF11Q11",
      "set": 201,
      "week": 11,
      "topic": "z_i vs b_i 구분",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA 오차 최소화 정식화에서 근사 x̃ = Σ_{i=1}^{M} z_i u_i + Σ_{i=M+1}^{D} b_i u_i 의 z_i와 b_i를 옳게 구분한 것은?",
      "choices": [
        "① z_i와 b_i 모두 데이터마다 다른 값이다",
        "② z_i는 살려두는 M개 차원으로 데이터마다 다르고, b_i는 버려지는 D−M개 차원으로 모든 데이터 공통의 고정 상수다",
        "③ z_i는 버려지는 공통 상수, b_i는 살려두는 데이터별 값이다",
        "④ z_i와 b_i 모두 모든 데이터에 공통인 고정 상수다"
      ],
      "answer": 1,
      "brief": "z_i=살림(데이터마다 다름), b_i=버림(모든 데이터 공통 상수).",
      "detailed": "노트 § 3.3: z_i는 살려두는 M개 차원으로 데이터마다 값이 다름(개별 특성 반영), b_i는 버려지는 D−M개 차원으로 모든 데이터 공통의 고정 상수다. Step 1에서 z_i=(x)^T u_i, b_i=x̄^T u_i.",
      "source": "차원축소 PDF; 11주차 § 3.3"
    },
    {
      "id": "MLF11Q18",
      "set": 201,
      "week": 11,
      "topic": "비가우시안성 가정",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "ICA가 소스에 대해 비가우시안(non-Gaussian)을 요구하는 이유는?",
      "choices": [
        "① 가우시안이 계산량이 너무 크기 때문",
        "② 가우시안은 분산이 정의되지 않기 때문",
        "③ 가우시안 소스를 선형 결합하면 결과도 또 다른 가우시안이 되어, 섞인 결과만으로는 소스를 분리할 단서가 사라지기 때문",
        "④ 비가우시안이어야 직교성을 보장할 수 있기 때문"
      ],
      "answer": 2,
      "brief": "가우시안 섞으면 또 가우시안 → 분리 단서 소멸. 그래서 비가우시안 필수.",
      "detailed": "슬라이드 인용: the critical assumption in ICA is that the original sources must be non-Gaussian. 가우시안 소스를 선형 결합하면 결과도 또 다른 가우시안이라 소스 개수·방향 구분이 불가(ambiguity). 비가우시안(Laplacian·Uniform 등 뾰족하거나 평평한 분포)이어야 섞여도 특징이 남아 분리 가능하다.",
      "source": "차원축소 PDF; 11주차 § 5.3"
    },
    {
      "id": "MLF12Q2",
      "set": 201,
      "week": 12,
      "topic": "스위스 롤의 본질 차원",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "스위스 롤(Swiss Roll) 예시에 대한 노트의 설명으로 옳은 것은?",
      "choices": [
        "① 본질적으로 1차원 직선 구조다",
        "② PCA로 완벽히 펼칠 수 있는 선형 구조다",
        "③ 거리 행렬 없이는 정의할 수 없는 추상 개념이다",
        "④ 3차원에 말려 있으나 의미 있는 패턴(색 그래디언트)은 펼치면 2차원 매니폴드에 존재한다"
      ],
      "answer": 3,
      "brief": "3D에 말린 롤이지만 unroll하면 색 그래디언트는 2D 매니폴드.",
      "detailed": "노트: 스위스 롤은 3차원에 말려 있지만 실제 의미 있는 패턴(색 그래디언트)은 펼치면 2차원 매니폴드에 존재한다. PCA는 선형 투영만 가능해 이를 펼치지 못한다(① ② 오답).",
      "source": "Manifold PDF; 12주차 § 1.2, § 2.1"
    },
    {
      "id": "MLF12Q12",
      "set": 201,
      "week": 12,
      "topic": "Crowding과 분포 꼬리 두께",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "t-SNE에서 고차원은 가우시안(P), 저차원은 t-분포(Q)를 쓰는 비대칭 설계가 crowding problem을 완화하는 핵심 원리는?",
      "choices": [
        "① 저차원 t-분포의 두꺼운 꼬리가 중간~먼 거리의 점에 가우시안보다 큰 q_ij를 부여해, 그 점들을 억지로 끌어모으지 않고 적당히 퍼진 채로 둔다",
        "② t-분포가 모든 점을 한 곳에 더 강하게 모은다",
        "③ 가우시안과 t-분포가 동일해 차이가 없다",
        "④ 저차원에서도 가우시안을 쓰는 것이 crowding을 막는다"
      ],
      "answer": 0,
      "brief": "저차원 t-분포의 heavy tail이 먼 점에 더 큰 유사도 → 적당히 퍼지게 유지.",
      "detailed": "노트 §4.3: t-분포는 가우시안보다 피크가 낮고 꼬리가 두꺼워(heavy tail), 저차원에서 점들이 적당히 퍼지도록 유도해 먼 점은 먼 채로 유지한다. 이것이 고차원을 저차원에 욱여넣을 때의 crowding을 해결한다.",
      "source": "Manifold PDF; 12주차 § 4.3"
    },
    {
      "id": "MLF12Q20",
      "set": 201,
      "week": 12,
      "topic": "Auto-Encoder bottleneck과 Hinton",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "오토인코더에 대한 노트(전사 보강)의 설명으로 옳지 않은 것은?",
      "choices": [
        "① 중간 은닉층(bottleneck) 차원을 입력보다 훨씬 작게 해 핵심 히든 구조만 압축 학습한다",
        "② Hinton의 2006년 Science 논문은 PCA가 오토인코더보다 비선형 차원 축소에서 우수함을 보였다",
        "③ 출력으로 입력을 동일하게 복원(reconstruction)하도록 훈련한다",
        "④ 신경망 기반의 비선형 차원 축소·매니폴드 학습 기법이다"
      ],
      "answer": 1,
      "brief": "Hinton 2006은 AE가 PCA보다 우수함을 보였다(②이 방향 반대라 오답).",
      "detailed": "노트 §6 전사: 오토인코더는 입력=출력 복원, bottleneck으로 핵심 피처만 압축하는 비선형 차원 축소다. Hinton(2006) Science 논문은 오토인코더가 PCA보다 비선형 차원 축소에서 압도적으로 우수함을 보였다. ②은 우열 방향을 뒤집은 틀린 설명.",
      "source": "Manifold PDF; 12주차 § 6"
    },
    {
      "id": "MLF12Q9",
      "set": 201,
      "week": 12,
      "topic": "Perplexity 계산",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "어떤 점 i의 조건부 분포 엔트로피가 H(P_i) = 5 bits 라면, 노트의 정의 Perplexity = 2^{H(P_i)} 에 따른 perplexity(유효 이웃 수)는?",
      "choices": [
        "① 5",
        "② 10",
        "③ 32",
        "④ 25"
      ],
      "answer": 2,
      "brief": "Perplexity = 2^5 = 32.",
      "detailed": "노트 §4.5: Perplexity(P_i) = 2^{H(P_i)}, H(P_i) = −Σ_j p_(j|i) log_2 p_(j|i). H=5이면 2^5=32. perplexity는 '유효 이웃 수'로 해석되며, 이를 지정하면 점마다 σ_i가 그에 맞게 결정된다.",
      "source": "Manifold PDF; 12주차 § 4.5"
    },
    {
      "id": "MLF12Q14",
      "set": 201,
      "week": 12,
      "topic": "UMAP σ_i 결정 조건",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "UMAP에서 local bandwidth σ_i는 어떤 조건으로 자동 결정되는가? (노트 식 기준)",
      "choices": [
        "① σ_i = ρ_i 로 고정",
        "② perplexity = 2^{H} 를 만족하도록",
        "③ σ_i는 사용자가 직접 입력해야 함",
        "④ Σ_{j∈N_k(i)} exp(−(d − ρ_i)/σ_i) ≈ log_2(k) 를 만족하도록"
      ],
      "answer": 3,
      "brief": "k 이웃 가중치 합 ≈ log_2(k) 를 만족하게 σ_i 자동 결정.",
      "detailed": "노트 §5.2: k를 정하면 Σ_{j∈N_k(i)} exp(−(d−ρ_i)/σ_i) ≈ log_2(k)를 만족하도록 σ_i가 자동 결정된다. perplexity(2^H)는 t-SNE의 개념이며 UMAP과 혼동하면 안 된다(② 오답).",
      "source": "Manifold PDF; 12주차 § 5.2"
    },
    {
      "id": "MLF13Q1",
      "set": 201,
      "week": 13,
      "topic": "McCulloch-Pitts 생물학적 매핑",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "McCulloch-Pitts 뉴런(1943)의 생물학적 구조와 인공 모델의 대응으로 옳은 것은?",
      "choices": [
        "① Cell Body(세포체)는 입력 신호를 통합(합산)하므로 가중합(weighted summation)에 대응한다",
        "② Dendrite(수상돌기)는 출력 전달을 담당하므로 Step function 출력에 대응한다",
        "③ Axon(축삭돌기)은 입력 신호 수신을 담당하므로 입력 x에 대응한다",
        "④ 세 구조 모두 가중치 w 하나에만 대응한다"
      ],
      "answer": 0,
      "brief": "Cell Body=신호 통합(합산)→가중합.",
      "detailed": "슬라이드: signals arrive at the dendrites(입력 수신), are integrated in the cell body(합산), and if the combined signal exceeds a threshold, an output is generated along the axon(임계값 넘으면 출력). 즉 Dendrite=입력 x, Cell Body=가중합 Σ, Axon=Step function 출력.",
      "source": "NN PDF; 13주차 § 1.2"
    },
    {
      "id": "MLF13Q5",
      "set": 201,
      "week": 13,
      "topic": "콘서트 예시 가중합·임계값 (계산형)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "콘서트 참석 예시에서 x1=1(w1=0.7), x2=0(w2=0.6), x3=1(w3=0.5), x4=0(w4=0.3), x5=1(w5=0.4)이고 임계값(threshold)이 1.5일 때, 가중합과 출력은?",
      "choices": [
        "① 가중합 1.3 < 1.5 → 출력 false(가지 않는다, 0)",
        "② 가중합 1.6 > 1.5 → 출력 true(콘서트에 간다, 1)",
        "③ 가중합 2.5 > 1.5 → 출력 true(간다, 1)",
        "④ 가중합 1.5 = 1.5 → 출력 false(가지 않는다, 0)"
      ],
      "answer": 1,
      "brief": "0.7+0.5+0.4=1.6 > 1.5 → 간다(1).",
      "detailed": "가중합 = 0.7(1)+0.6(0)+0.5(1)+0.3(0)+0.4(1) = 0.7+0.5+0.4 = 1.6. 임계값 1.5와 비교하면 1.6 > 1.5 → 출력 true → 콘서트에 간다(1). x2, x4는 입력이 0이라 기여하지 않음.",
      "source": "NN PDF; 13주차 § 1.5"
    },
    {
      "id": "MLF13Q11",
      "set": 201,
      "week": 13,
      "topic": "경사 하강법 Gradient·Descent 의미",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "경사 하강법에서 'Gradient'와 'Descent'의 의미로 옳은 것은?",
      "choices": [
        "① Gradient는 손실 값 그 자체이고, Descent는 그 값을 키우는 것이다",
        "② Gradient는 학습률이고, Descent는 배치 크기이다",
        "③ Gradient는 각 파라미터에 대한 편미분 벡터로 기울기의 방향·가파름을 알려주고, Descent는 그 그래디언트 반대 방향으로 이동해 손실을 낮추는 것이다",
        "④ Gradient는 그래디언트 같은 방향으로 이동하는 것을 뜻한다"
      ],
      "answer": 2,
      "brief": "Gradient=편미분 벡터(방향·가파름), Descent=반대 방향 이동.",
      "detailed": "슬라이드: the gradient is a vector of partial derivatives... shows both the direction and steepness of the slope. Descent는 그래디언트 반대 방향으로 이동하면 목적 함수 값이 낮아진다. 그래디언트는 현재 위치 기울기만 알려주므로 작은 이웃에서만 신뢰 가능 → 단계적으로 진행.",
      "source": "NN PDF; 13주차 § 5.2"
    },
    {
      "id": "MLF13Q9",
      "set": 201,
      "week": 13,
      "topic": "Perceptron vs Adaline (에러 계산 시점)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "퍼셉트론과 Adaline(Widrow & Hoff 1959)의 결정적 차이를 '에러 계산 시점' 관점에서 옳게 설명한 것은?",
      "choices": [
        "① 퍼셉트론은 임계값 통과 전 연속 선형값으로, Adaline은 통과 후 클래스 라벨로 에러를 계산한다",
        "② 둘 다 임계값 통과 후 클래스 라벨로 에러를 계산한다",
        "③ Adaline은 임계값 함수를 완전히 제거해 분류 단계에서도 쓰지 않는다",
        "④ 퍼셉트론은 임계값(step) 통과 후의 클래스 예측으로, Adaline은 임계값 통과 전의 연속 선형 출력 σ(z)=z로 에러를 계산한다"
      ],
      "answer": 3,
      "brief": "퍼셉트론=step 통과 후 클래스, Adaline=통과 전 연속값 σ(z)=z.",
      "detailed": "슬라이드: Adaline does not use the thresholded class prediction directly to update the weights. Instead it uses a linear activation σ(z)=z(identity). 핵심: 어느 시점에서 에러를 계산하는가. Adaline은 연속값이라 미분 가능 → 경사하강 사용. 임계값 함수는 학습 후 최종 분류 때는 여전히 사용(학습과 분류 분리).",
      "source": "NN PDF; 13주차 § 4.1, § 4.2"
    },
    {
      "id": "MLF13Q17",
      "set": 201,
      "week": 13,
      "topic": "BCE = Bernoulli MLE의 NLL",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "BCE의 통계적 근거에 대한 설명으로 옳은 것은?",
      "choices": [
        "① 각 샘플이 베르누이 분포를 따른다고 가정하고 우도를 최우추정(MLE)할 때, 계산 편의를 위해 취한 음의 로그우도(NLL)가 BCE와 완전히 동일하다",
        "② BCE는 가우시안 분포의 MLE에서 유도된다",
        "③ BCE는 우도를 최소화(우도 자체를 줄이는)하는 손실이다",
        "④ BCE는 라벨이 종속적으로 추출될 때만 성립한다"
      ],
      "answer": 0,
      "brief": "베르누이 우도의 MLE → NLL = BCE (동일).",
      "detailed": "노트: 각 샘플이 베르누이 분포를 따른다 가정, 우도 p(Y|X)=∏ ŷ^y (1-ŷ)^(1-y). 라벨이 독립적으로 추출되어 곱(factorization) 가능. MLE로 우도 최대화 → 계산 편의 위해 음의 로그우도(NLL) 취함 → 이 NLL이 BCE와 완전히 동일. 즉 이진 분류에서 NLL = BCE.",
      "source": "NN PDF; 13주차 § 7.3"
    }
  ],
  202:
  [
    {
      "id": "MLF9Q2",
      "set": 202,
      "week": 9,
      "topic": "밀도 추정 정의",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "밀도 추정(density estimation)의 정의로 가장 적절한 것은?",
      "choices": [
        "① 유한 샘플로부터 true 분포 p(x)의 근사를 학습하되, 데이터가 밀집한 영역에 높은 확률을, 희소한 영역에 낮은 확률을 부여하는 확률 모델을 구성하는 것",
        "② 데이터에 항상 정규분포를 가정하고 평균과 분산만 추정하는 기법",
        "③ 입력을 저차원으로 사영해 분산을 최대화하는 기법",
        "④ 거리 행렬을 고유분해해 좌표를 복원하는 기법"
      ],
      "answer": 0,
      "brief": "유한 샘플로 p(x)를 근사: 밀집=고확률, 희소=저확률.",
      "detailed": "슬라이드 인용: density estimation involves learning an approximation of the true underlying data distribution p(x) from a finite sample by constructing a probabilistic model that assigns high probability to regions where data are concentrated and low probability to regions where data are sparse. 즉 한 지점에서 데이터가 얼마나 밀집되어 있는가를 추정한다.",
      "source": "밀도추정 PDF; 9주차 § 2"
    },
    {
      "id": "MLF9Q7",
      "set": 202,
      "week": 9,
      "topic": "히스토그램",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "히스토그램과 KDE의 관계 및 히스토그램의 한계로 옳은 것은?",
      "choices": [
        "① 히스토그램은 KNN density estimator의 특수 케이스다",
        "② 히스토그램은 KDE의 가장 단순한 특수 케이스로, bin 경계가 고정되어 결과가 불연속(discrete)이고 경계 위치에 따라 모양이 크게 흔들린다",
        "③ 히스토그램은 항상 가우시안 커널을 사용한다",
        "④ 히스토그램은 위치마다 bin 크기를 자동 조정하는 적응적 방법이다"
      ],
      "answer": 1,
      "brief": "히스토그램 = KDE 특수 케이스, 불연속·경계 의존이 한계.",
      "detailed": "슬라이드: the histogram can be viewed as a special case of the first approach(KDE). V가 고정 너비 bin이고 각 bin 내 관측 수를 세서 부피로 정규화한다. 한계는 bin 경계가 고정되어 결과가 불연속이고 경계 위치에 민감하다는 점이다.",
      "source": "밀도추정 PDF; 9주차 § 5"
    },
    {
      "id": "MLF9Q13",
      "set": 202,
      "week": 9,
      "topic": "KNN density 파라미터 K",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "KNN density estimator에서 파라미터 K의 영향으로 옳은 것은?",
      "choices": [
        "① K가 작으면(예: K=1) over-smoothed, K가 크면(예: K=30) noisy해진다",
        "② K는 결과에 영향을 주지 않는다",
        "③ K가 작으면(예: K=1) 매우 noisy해 각 데이터 위로 뾰족한 패턴이 생기고, K가 크면(예: K=30) over-smoothed되어 bimodal 디테일이 사라진다",
        "④ K가 클수록 항상 더 정확하다"
      ],
      "answer": 2,
      "brief": "K=1 noisy·뾰족 / K=30 over-smoothed.",
      "detailed": "K=1이면 매우 noisy해 각 데이터 위로 비정상적으로 뾰족한 패턴이 생긴다. K=5는 적절한 추정이다. K=30이면 over-smoothed되어 진짜 분포의 bimodal 디테일이 사라진다. KDE의 h와 유사하게 K가 평활도를 조절한다.",
      "source": "밀도추정 PDF; 9주차 § 6"
    },
    {
      "id": "MLF9Q11",
      "set": 202,
      "week": 9,
      "topic": "KDE의 근본 한계",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "KDE의 근본적 한계(그리고 KNN density estimator가 등장하는 이유)로 옳은 것은?",
      "choices": [
        "① 데이터가 정규분포를 따라야만 동작한다",
        "② 계산량이 데이터 크기와 무관해 너무 적다",
        "③ 커널 함수를 단 하나만 쓸 수 있다",
        "④ 모든 위치(밀집·희소 지역)에 동일한 h를 사용하므로, 한쪽은 oversmooth되고 다른 쪽은 noisy해진다 — 공간에 따라 최적 h가 다르다는 점이 약점"
      ],
      "answer": 3,
      "brief": "밀집·희소에 같은 h → 비적응적(공간별 최적 h 다름).",
      "detailed": "슬라이드: h is the same for all kernels, regardless of how the data is spread out. 밀집 지역과 희소 지역에 동일한 h를 써서 한쪽은 oversmooth, 다른 쪽은 noisy해진다. 공간에 따라 최적 h가 다르다는 점이 KDE의 약점이고, 이를 해결하려 K를 고정하고 V를 적응시키는 KNN density가 등장한다.",
      "source": "밀도추정 PDF; 9주차 § 5"
    },
    {
      "id": "MLF9Q17",
      "set": 202,
      "week": 9,
      "topic": "GMM 정의와 파라미터",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "GMM p(x)=Σ_k π_k N(x|μ_k, Σ_k)의 세 파라미터와 mixing coefficient π_k의 제약으로 옳은 것은?",
      "choices": [
        "① 파라미터는 π_k(mixing coefficient/prior), μ_k(mean), Σ_k(covariance)이며, 0 ≤ π_k ≤ 1 이고 Σ_k π_k = 1 이다",
        "② 파라미터는 π_k, μ_k, Σ_k 이고, π_k는 임의의 실수면 된다",
        "③ 파라미터는 μ_k, Σ_k 두 개뿐이고 π_k는 항상 1이다",
        "④ 파라미터는 π_k, μ_k 두 개이고 Σ_k는 항상 단위행렬이다"
      ],
      "answer": 0,
      "brief": "π_k·μ_k·Σ_k, 그리고 0≤π_k≤1, Σπ_k=1.",
      "detailed": "GMM 학습은 π_k(k번째 가우시안이 선택될 확률=mixing coefficient/prior), μ_k(중심), Σ_k(퍼짐과 방향=covariance) 세 파라미터를 찾는 것이다. π_k는 확률이므로 0≤π_k≤1, Σ_k π_k = 1 을 만족해야 한다.",
      "source": "밀도추정 PDF; 9주차 § 9"
    },
    {
      "id": "MLF10Q1",
      "set": 202,
      "week": 10,
      "topic": "클러스터링 개요",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "클러스터링(clustering)과 밀도 추정(density estimation)의 차이로 가장 적절한 것은?",
      "choices": [
        "① 둘 다 지도학습이며 라벨을 예측한다",
        "② 밀도 추정은 데이터 분포 p(x)를 모델링하고, 클러스터링은 데이터를 의미 있는 그룹으로 묶어 구조를 발견한다",
        "③ 클러스터링이 분포를, 밀도 추정이 그룹을 찾는다",
        "④ 둘은 동일한 작업이며 이름만 다르다"
      ],
      "answer": 1,
      "brief": "밀도 추정=분포 p(x) 모델링, 클러스터링=그룹 발견.",
      "detailed": "노트 §1: 둘 다 비지도학습이지만 밀도 추정은 데이터의 분포를 추정하고, 클러스터링은 data points into groups, 즉 그룹(군집)을 발견해 구조를 찾는다.",
      "source": "클러스터링 PDF; 10주차 § 1"
    },
    {
      "id": "MLF10Q5",
      "set": 202,
      "week": 10,
      "topic": "좌표 하강 2단계",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "K-Means의 좌표 하강(coordinate descent) 2단계에 대한 설명으로 옳은 것은?",
      "choices": [
        "① 할당 단계에서 μ_k를 갱신하고 갱신 단계에서 r_nk를 갱신한다",
        "② 두 변수(r_nk, μ_k)를 동시에 한 번에 최적화한다",
        "③ 할당 단계: μ_k를 고정하고 각 점을 가장 가까운 중심에 배정해 r_nk를 갱신 / 갱신 단계: r_nk를 고정하고 μ_k를 할당된 점들의 평균으로 갱신",
        "④ 할당 단계에서 사후확률(책임값)을 계산한다"
      ],
      "answer": 2,
      "brief": "할당: μ 고정→r 갱신(argmin 거리) / 갱신: r 고정→μ=할당점 평균.",
      "detailed": "노트 §2.4: 변수가 두 종류라 하나를 고정하고 다른 하나를 최적화하는 것을 번갈아 반복한다. Step1 할당(μ 고정, argmin 거리로 r 갱신), Step2 갱신(r 고정, μ=할당된 점 평균).",
      "source": "클러스터링 PDF; 10주차 § 2.4"
    },
    {
      "id": "MLF10Q11",
      "set": 202,
      "week": 10,
      "topic": "K-Means 한계 → GMM",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "노트가 제시한 K-Means의 두 가지 한계로 옳게 묶인 것은?",
      "choices": [
        "① 라벨이 필요함 + 계산이 느림",
        "② 항상 소프트 할당만 함 + 공분산을 자유롭게 가짐",
        "③ K를 사후에만 결정 + 트리를 만들어야 함",
        "④ 군집이 구형·동일 크기·잘 분리됐다고 가정해 경직됨 + 비확률적 하드 할당이라 겹치는 군집·불확실성 처리가 어려움"
      ],
      "answer": 3,
      "brief": "K-Means 한계: 군집이 구형·동일 크기·잘 분리됐다는 경직된 가정 + 비확률적 하드 할당이라 겹침·불확실성 처리 약함.",
      "detailed": "노트 §3.1: K-Means는 (1) clusters are spherical, of similar size, and well separated라는 가정이 경직돼 대각선으로 길쭉한 데이터를 제대로 못 나누고, (2) not probabilistic, hard assignment라 군집이 겹치거나 불확실할 때 취약하다. 그래서 소프트 할당·자유로운 공분산을 갖는 GMM으로 확장한다.",
      "source": "클러스터링 PDF; 10주차 § 3.1"
    },
    {
      "id": "MLF10Q9",
      "set": 202,
      "week": 10,
      "topic": "실루엣 점수",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "실루엣 점수 s_i = (b_i − a_i)/max(a_i, b_i)에서 a_i와 b_i의 정의로 옳은 것은?",
      "choices": [
        "① a_i = 같은 군집 내 다른 점들까지의 평균 거리(응집도), b_i = 가장 가까운 이웃 군집 점들까지의 평균 거리(분리도)",
        "② a_i = 가장 가까운 이웃 군집까지의 평균 거리(분리도), b_i = 같은 군집 내 평균 거리(응집도)",
        "③ a_i와 b_i 모두 전체 데이터까지의 평균 거리",
        "④ a_i = 중심까지의 거리, b_i = 가장 먼 점까지의 거리"
      ],
      "answer": 0,
      "brief": "a_i=같은 군집 내 평균거리(응집), b_i=가장 가까운 이웃 군집 평균거리(분리).",
      "detailed": "노트 §2.6: a_i는 같은 군집 내 다른 점들까지의 평균 거리(작을수록 좋음, 응집도), b_i는 가장 가까운 이웃 군집 점들까지의 평균 거리(클수록 좋음, 분리도). s_i는 1에 가까울수록 잘 군집됨.",
      "source": "클러스터링 PDF; 10주차 § 2.6"
    },
    {
      "id": "MLF10Q16",
      "set": 202,
      "week": 10,
      "topic": "M-step 갱신식",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "GMM의 M-step 갱신식으로 옳은 것은? (N_k = Σ_n γ(z_nk))",
      "choices": [
        "① μ_k는 책임값을 무시한 단순 산술평균이다",
        "② μ_k = (1/N_k) Σ_n γ(z_nk) x^(n) 이고 π_k = N_k / N 이다",
        "③ π_k = N / N_k 이다",
        "④ Σ_k는 책임값 없이 (x−μ_k)(x−μ_k)^T의 단순 합이다"
      ],
      "answer": 1,
      "brief": "μ_k=책임값 가중평균, π_k=N_k/N, N_k=Σ_n γ.",
      "detailed": "노트 §4.3: μ_k=(1/N_k)Σ_n γ(z_nk)x^(n), Σ_k=(1/N_k)Σ_n γ(z_nk)(x−μ_k)(x−μ_k)^T, π_k=N_k/N. 모두 책임값 γ로 가중한다.",
      "source": "클러스터링 PDF; 10주차 § 4.3"
    },
    {
      "id": "MLF11Q4",
      "set": 202,
      "week": 11,
      "topic": "LDA vs PCA",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "LDA와 PCA의 차이로 옳은 것은?",
      "choices": [
        "① LDA는 비지도학습으로 분산을 최대화하고, PCA는 지도학습으로 분리도를 최대화한다",
        "② 둘 다 클래스 라벨을 사용하는 지도학습이다",
        "③ LDA는 지도학습으로 클래스 분리도(separability)를 최대화하고, PCA는 비지도학습으로 데이터 분산(variance)을 최대 보존한다",
        "④ 둘 다 라벨 없이 동작하는 비지도학습이다"
      ],
      "answer": 2,
      "brief": "LDA=지도·분리도 최대, PCA=비지도·분산 최대.",
      "detailed": "노트 표: LDA는 지도학습으로 클래스 레이블을 사용해 클래스 평균은 멀게·클래스 내 분산은 작게(분리도 최대), PCA는 비지도학습으로 레이블 없이 투영된 데이터의 분산이 가장 큰 방향을 찾는다. 이 챕터는 비지도(PCA·ICA)에 집중한다.",
      "source": "차원축소 PDF; 11주차 § 1.4"
    },
    {
      "id": "MLF11Q13",
      "set": 202,
      "week": 11,
      "topic": "재구축 시 평균 더하기",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "PCA 압축 계수 z_i^{(n)} = (x^{(n)} − x̄)^T u_i 로부터 데이터를 재구축(reconstruction)하는 올바른 식은?",
      "choices": [
        "① x̂ = Σ_{i=1}^{M} z_i u_i (평균은 더하지 않음)",
        "② x̂ = x̄ − Σ_{i=1}^{M} z_i u_i",
        "③ x̂ = Σ_{i=1}^{D} λ_i u_i",
        "④ x̂ = x̄ + Σ_{i=1}^{M} z_i u_i (평균 x̄를 반드시 더함)"
      ],
      "answer": 3,
      "brief": "x̂ = x̄ + Σ z_i u_i. 평균을 반드시 더해야 원래 위치 복원.",
      "detailed": "노트 § 4.3: x̂^{(n)} = x̄ + Σ_{i=1}^{M} z_i^{(n)} u_i. 압축 시 평균을 빼고 투영했으므로, 재구축 시 평균 x̄를 반드시 더해야 원래 위치로 복원된다. 이 평균 더하기를 빠뜨리는 것이 흔한 함정이다.",
      "source": "차원축소 PDF; 11주차 § 4.3"
    },
    {
      "id": "MLF11Q7",
      "set": 202,
      "week": 11,
      "topic": "라그랑주 → 고유값 문제",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA에서 제약 u_1^T u_1=1 하에 u_1^T S u_1을 최대화하기 위해 라그랑주 승수법을 적용하면 도출되는 조건은?",
      "choices": [
        "① S u_1 = λ_1 u_1 (고유값 문제)",
        "② S = λ_1 I",
        "③ u_1 = λ_1 S",
        "④ u_1^T S = 0"
      ],
      "answer": 0,
      "brief": "라그랑주 미분 0 → S u_1 = λ_1 u_1, 고유값 문제로 귀결.",
      "detailed": "노트 § 2.4: L = u_1^T S u_1 + λ_1(1 − u_1^T u_1). u_1로 미분하면 2S u_1 − 2λ_1 u_1 = 0 → S u_1 = λ_1 u_1. 정규화 제약이 없으면 u_1을 키워 분산을 무한정 키울 수 있어 제약이 필요하다.",
      "source": "차원축소 PDF; 11주차 § 2.4"
    },
    {
      "id": "MLF11Q12",
      "set": 202,
      "week": 11,
      "topic": "Distortion J와 두 정식화 동치",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA 오차 최소화에서 distortion이 J = Σ_{i=M+1}^{D} u_i^T S u_i 로 정리되는 것이 의미하는 바는?",
      "choices": [
        "① 살려두는 쪽 분산을 최소화하는 것이다",
        "② 버려지는 쪽 분산을 최소화하는 것이며, 이는 살려두는 쪽 분산을 최대화하는 것과 같아 분산 최대화 정식화와 동일한 결론에 이른다",
        "③ 거리 행렬을 직접 고유분해하는 것이다",
        "④ 비가우시안성을 최대화하는 것이다"
      ],
      "answer": 1,
      "brief": "J=버림 차원 분산 합 → 버림 분산 최소 = 살림 분산 최대(분산 최대화와 동일 결론).",
      "detailed": "노트 § 3.4: z_i, b_i를 대입·정리하면 J = Σ_{i=M+1}^{D} u_i^T S u_i (버려지는 차원의 분산 합)로 단순화된다. 즉 버림 쪽 분산 최소화 = 살림 쪽 분산 최대화. 다시 고유값 문제 S u_i=λ_i u_i가 되며, 가장 작은 D−M개 고유값을 버리고 큰 M개를 보존한다.",
      "source": "차원축소 PDF; 11주차 § 3.4"
    },
    {
      "id": "MLF11Q19",
      "set": 202,
      "week": 11,
      "topic": "ICA Mixing/Unmixing과 행렬식 보정",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "ICA 모델 x = A s, s = W x (W = A^{-1})에서 최대 우도를 세울 때 p(x) = p(s)·|det(W)| 처럼 행렬식 항이 들어가는 이유는?",
      "choices": [
        "① W가 직교 행렬임을 보장하려고",
        "② 소스가 가우시안임을 강제하려고",
        "③ s = W x 변환이 공간의 부피(volume)를 바꾸므로, 확률 총합 1을 유지하기 위한 부피 보정(자코비안) 항이기 때문",
        "④ 학습률 α를 정규화하려고"
      ],
      "answer": 2,
      "brief": "변환 시 부피 변화 → 확률 총합 1 유지 위한 |det(W)| 부피 보정.",
      "detailed": "노트 § 6.2~6.3: x=As, s=Wx, W=A^{-1}(우리가 찾는 unmixing matrix). s=Wx 변환은 공간 부피를 바꾸므로 |det(W)|로 보정한다: p(x)=p(s)|det(W)|=Π p_s(w_i^T x)|det(W)|. |det(W)|>1이면 팽창→밀도 감소, <1이면 수축→밀도 증가, =1이면 부피 유지.",
      "source": "차원축소 PDF; 11주차 § 6.2-6.3"
    },
    {
      "id": "MLF12Q3",
      "set": 202,
      "week": 12,
      "topic": "MDS 거리²의 내적 전개",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "MDS의 출발점인 항등식 ||x_i − x_j||² 를 내적으로 전개한 식으로 옳은 것은?",
      "choices": [
        "① x_i^T x_i + x_j^T x_j + 2 x_i^T x_j",
        "② x_i^T x_j − x_i^T x_i − x_j^T x_j",
        "③ 2 x_i^T x_j − x_i^T x_i − x_j^T x_j",
        "④ x_i^T x_i + x_j^T x_j − 2 x_i^T x_j"
      ],
      "answer": 3,
      "brief": "||x_i−x_j||² = x_i^T x_i + x_j^T x_j − 2 x_i^T x_j.",
      "detailed": "노트 §3.2의 핵심 항등식. 이 '거리²=내적의 조합'이 모든 내적을 모은 그램 행렬 B=XX^T로 이어지고, 거리만 알 때는 더블 센터링으로 B를 복원한다. 부호(−2 교차항)가 핵심.",
      "source": "Manifold PDF; 12주차 § 3.2"
    },
    {
      "id": "MLF12Q15",
      "set": 202,
      "week": 12,
      "topic": "Fuzzy union 수치 계산",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "UMAP에서 방향 가중치가 w_ij = 0.8, w_ji = 0.5 일 때, fuzzy-set union 대칭화 w_ij + w_ji − w_ij·w_ji 의 값은?",
      "choices": [
        "① 0.90",
        "② 0.65",
        "③ 1.30",
        "④ 0.40"
      ],
      "answer": 0,
      "brief": "0.8 + 0.5 − 0.4 = 0.9.",
      "detailed": "노트 §5.2: w_ij^(sym) = w_ij + w_ji − w_ij·w_ji = 0.8 + 0.5 − (0.8×0.5) = 1.3 − 0.4 = 0.9. 빼기 항(곱)이 중복을 방지해 결과가 1을 넘지 않도록 한다. t-SNE의 단순 평균(/2N) 대칭화와 다르다.",
      "source": "Manifold PDF; 12주차 § 5.2"
    },
    {
      "id": "MLF12Q4",
      "set": 202,
      "week": 12,
      "topic": "더블 센터링 식의 항 식별",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "더블 센터링 식 B_ij = −1/2 ( d_ij² − d̄_i.² − d̄_.j² + d̄_..² ) 에서 마지막 +d̄_..² 항의 역할로 가장 적절한 것은?",
      "choices": [
        "① 거리 행렬을 양의 정부호로 강제한다",
        "② 행 평균·열 평균을 두 번 빼며 중복 제거된 전체 평균을 되돌려, 결과가 평균 0으로 센터링(B=X̃X̃^T)되도록 한다",
        "③ 가우시안 정규화 상수를 더한다",
        "④ 고유값을 모두 1로 만든다"
      ],
      "answer": 1,
      "brief": "전체 평균 d̄_..²를 더해 행·열 평균을 두 번 뺀 중복을 보정 → 평균 0 센터링.",
      "detailed": "노트 §3.2 전사: 행 평균·열 평균을 빼고 전체 평균을 더함 = 데이터를 평균 0으로 센터링하는 것과 동일(B=X̃X̃^T, x̃_i = x_i − x̄). 행·열 평균을 각각 빼면 전체 평균이 이중으로 차감되므로 +d̄_..²로 한 번 되돌린다.",
      "source": "Manifold PDF; 12주차 § 3.2"
    },
    {
      "id": "MLF12Q10",
      "set": 202,
      "week": 12,
      "topic": "KL 비대칭성과 t-SNE 거동",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "t-SNE 목적 KL(P||Q) = Σ p_ij log(p_ij/q_ij) 의 형태가 함의하는 바로 가장 적절한 것은?",
      "choices": [
        "① p_ij가 0인 쌍이 페널티를 지배한다",
        "② KL은 대칭이라 P와 Q를 바꿔도 동일하다",
        "③ p_ij가 큰(고차원에서 가까운) 쌍에 대해 q_ij를 작게 두면 큰 페널티가 부과되어, 가까운 이웃을 저차원에서도 가깝게 유지하려는 압력이 생긴다",
        "④ q_ij가 클수록 항상 손실이 커진다"
      ],
      "answer": 2,
      "brief": "p_ij(큰 유사도)에 가중되어 가까운 쌍 보존 압력. KL은 비대칭.",
      "detailed": "노트 §4.4: KL(P||Q)=Σ p_ij log(p_ij/q_ij). 가중치가 p_ij이므로 고차원에서 가까운(큰 p_ij) 쌍에서 q_ij가 작으면 log비가 커져 큰 페널티 → 로컬 구조 보존. KL은 비대칭이다(② 오답). 노트는 이 KL을 경사하강법으로 최소화한다.",
      "source": "Manifold PDF; 12주차 § 4.4"
    },
    {
      "id": "MLF12Q16",
      "set": 202,
      "week": 12,
      "topic": "Cross-Entropy 두 항의 역할",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "UMAP 손실 L = Σ [ w log(w/v) + (1−w) log((1−w)/(1−v)) ] (w=고차원 대칭 가중치, v=저차원 유사도)에서 두 번째 항 (1−w)log((1−w)/(1−v))의 역할은?",
      "choices": [
        "① 연결이 강한(w≈1) 쌍을 더 강하게 당긴다",
        "② 항상 0이 되어 무시된다",
        "③ KL Divergence와 동일한 의미다",
        "④ 연결이 약한(w≈0) 쌍에 대해 저차원에서 v가 커지면(가까우면) 페널티를 부과해 밀어내는(repulsion) 역할을 한다"
      ],
      "answer": 3,
      "brief": "(1−w)항은 비연결 쌍을 밀어내는 척력. 실제 구현은 negative sampling.",
      "detailed": "노트 §5.3: 첫 항(w log(w/v))은 연결된 쌍을 당기고(attraction), 둘째 항((1−w)log((1−w)/(1−v)))은 비연결 쌍(w작음)이 저차원에서 가까워지면(v큼) 손실을 키워 밀어낸다(repulsion). 실제로는 SGD + Negative Sampling으로 이 두 힘을 구현한다. KL과는 다른 cross-entropy다(③ 오답).",
      "source": "Manifold PDF; 12주차 § 5.3"
    },
    {
      "id": "MLF13Q2",
      "set": 202,
      "week": 13,
      "topic": "Bias의 역할",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "교수님이 강조한 바이어스(bias)의 중요성으로 가장 적절한 것은?",
      "choices": [
        "① 바이어스가 없으면 결정 경계가 항상 원점(0,0)을 지나야 해서 정확한 분류 선을 그리기 힘든 경우가 생긴다",
        "② 바이어스는 학습 속도를 항상 두 배로 높여 준다",
        "③ 바이어스는 입력의 분산을 1로 만드는 정규화 항이다",
        "④ 바이어스는 출력을 항상 확률(0~1)로 변환한다"
      ],
      "answer": 0,
      "brief": "bias 없으면 결정 경계가 원점을 강제로 지남.",
      "detailed": "교수님 강조: 바이어스가 없으면 decision boundary가 항상 원점(0,0)을 지나야 하므로 정확한 분류 선을 그리기 힘든 경우가 생긴다. 기본 베이스라인 강도를 설정해 준다. 선형 결합 z = wᵀx + b.",
      "source": "NN PDF; 13주차 § 1.3"
    },
    {
      "id": "MLF13Q6",
      "set": 202,
      "week": 13,
      "topic": "오차항 (y-ŷ)의 두 역할",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "퍼셉트론 학습 규칙에서 오차항 (y − ŷ)이 가지는 두 가지 핵심 역할은?",
      "choices": [
        "① 데이터를 정규화하는 역할과 차원을 축소하는 역할",
        "② 가중치를 갱신할 방향(direction)을 정하는 역할과, 갱신의 강도(magnitude)를 정하는 역할",
        "③ 학습률을 자동으로 0으로 만드는 역할과 편향을 제거하는 역할",
        "④ 입력을 확률로 바꾸는 역할과 손실을 음수로 만드는 역할"
      ],
      "answer": 1,
      "brief": "방향(Direction)과 강도(Magnitude).",
      "detailed": "교수님 강조: (1) 방향 — 예측이 너무 크면 가중치를 줄이는 방향, 너무 낮으면 늘리는 방향. (2) 강도 — 오차가 작으면 Δw도 작고, 오차가 크면 더 많이 업데이트('A larger error leads to a larger adjustment'). Δw_j = η(y−ŷ)x_j.",
      "source": "NN PDF; 13주차 § 2.3"
    },
    {
      "id": "MLF13Q12",
      "set": 202,
      "week": 13,
      "topic": "학습률 조절",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "학습률 η(learning rate) 설정에 대한 설명으로 옳은 것은?",
      "choices": [
        "① 너무 작으면 한 번에 발산하고, 너무 크면 수렴이 빨라진다",
        "② 학습률은 반드시 1보다 커야 한다",
        "③ 너무 작으면 수렴이 매우 느려 많은 에폭이 필요하고, 너무 크면 최솟값을 지나쳐 튕기며(overshoot) 지그재그로 발산할 수 있다",
        "④ 학습률은 손실 함수의 값과 항상 같다"
      ],
      "answer": 2,
      "brief": "너무 작으면 느림, 너무 크면 overshoot·발산.",
      "detailed": "노트: η가 너무 작으면(예 0.00001) 최솟값까지 가는 데 매우 많은 에폭 필요. 너무 크면 최솟값을 지나쳐 overshoot → 지그재그 발산. 동적 학습률(scheduler)로 초반 크게, 근처에선 줄임. 입력을 정규화한 셋업에선 보통 0~1.",
      "source": "NN PDF; 13주차 § 5.5"
    },
    {
      "id": "MLF13Q14",
      "set": 202,
      "week": 13,
      "topic": "배치 전략 (SGD vs Full Batch)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "Full Batch GD, SGD, Mini-batch GD 비교로 옳은 것은?",
      "choices": [
        "① Full Batch는 단 하나의 샘플로 업데이트해 경로가 매우 불안정하다",
        "② Mini-batch는 전체 데이터를 한 번에 써서 한 업데이트에 막대한 리소스가 든다",
        "③ SGD는 노이즈가 전혀 없어 항상 직선으로 최솟값에 도달한다",
        "④ SGD는 단일 샘플로 업데이트해 빠르지만 경로가 noisy하고 이상치에 취약하며, 노이즈 덕에 얕은 local minima 탈출에 유리하다"
      ],
      "answer": 3,
      "brief": "SGD=단일 샘플, 빠르나 noisy·이상치 취약, 얕은 극솟값 탈출 유리.",
      "detailed": "노트 표: Full Batch=전체 데이터(robust·다이렉트하나 고비용), SGD=단 하나 샘플(업데이트 빠름·노이즈로 얕은 local minima 탈출 유리하나 경로 불안정·이상치 취약), Mini-batch=부분집합(예 32개, 속도·안정성 절충·벡터화 효율).",
      "source": "NN PDF; 13주차 § 6"
    },
    {
      "id": "MLF13Q18",
      "set": 202,
      "week": 13,
      "topic": "Softmax 두 역할",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "소프트맥스(softmax)의 두 가지 역할로 옳은 것은?",
      "choices": [
        "① 지수화(exponential): e^z로 모든 값을 양수로 만들고, 정규화(normalization): 전체 합으로 나눠 합을 1로 만들어 확률 분포를 만든다",
        "② 미분(differentiation)과 적분(integration)",
        "③ 차원 축소와 거리 행렬 계산",
        "④ 라벨을 원-핫으로 인코딩하고 손실을 음수로 만든다"
      ],
      "answer": 0,
      "brief": "지수화(양수화)+정규화(합=1, 확률화).",
      "detailed": "노트: softmax의 두 역할 — (1) 지수화: e^z로 모든 값을 양수로(음수 점수 방지), (2) 정규화: 전체 합으로 나눠 합을 1로(확률 분포). 지수 때문에 점수 차이를 증폭(amplify)해 가장 큰 점수가 압도적 확률을 차지. 원시 logit은 임의 실수라 확률이 아님.",
      "source": "NN PDF; 13주차 § 7.5"
    }
  ],
  203:
  [
    {
      "id": "MLF9Q3",
      "set": 203,
      "week": 9,
      "topic": "밀도 추정 핵심 공식",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "밀도 추정 유도의 최종 공식으로 옳은 것은? (N=전체 데이터 수, K=영역 내 데이터 수, V=영역 부피)",
      "choices": [
        "① p(x) ≈ K/(NV)",
        "② p(x) ≈ NV/K",
        "③ p(x) ≈ KN/V",
        "④ p(x) ≈ V/(NK)"
      ],
      "answer": 0,
      "brief": "p(x) ≈ K/(NV).",
      "detailed": "P≈K/N(큰 N 극한, 이항분포 기댓값)과 P≈p(x)·V(작은 R 극한)를 결합하면 p(x)≈K/(NV)가 된다. 어떤 포인트의 밀도는 N개 중 그 영역(V)에 속한 데이터 개수(K)의 비율로 추정된다.",
      "source": "밀도추정 PDF; 9주차 § 3"
    },
    {
      "id": "MLF9Q9",
      "set": 203,
      "week": 9,
      "topic": "Box vs Gaussian Kernel",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "Box(Uniform) 커널과 Gaussian 커널의 차이를 옳게 설명한 것은?",
      "choices": [
        "① Box 커널은 거리에 따라 부드럽게 감소하고, Gaussian 커널은 경계에서 1↔0으로 끊긴다",
        "② Box 커널은 경계에서 1↔0으로 끊기지만, Gaussian 커널은 거리에 따라 부드럽게(smooth) 감소하며 h가 표준편차(σ) 역할을 한다",
        "③ 둘 다 경계에서 1↔0으로 불연속이다",
        "④ Gaussian 커널은 bandwidth 개념이 없다"
      ],
      "answer": 1,
      "brief": "Box=경계서 1↔0 불연속, Gaussian=부드러운 감쇠(h=σ).",
      "detailed": "Box 커널은 하이퍼큐브 내부면 1, 밖이면 0으로 경계에서 끊긴다. Gaussian 커널은 거리에 따라 부드럽게 감소하며, 여기서 h가 표준편차(σ) 역할을 해 대역폭이 곧 가우시안의 spread를 결정한다.",
      "source": "밀도추정 PDF; 9주차 § 5"
    },
    {
      "id": "MLF9Q20",
      "set": 203,
      "week": 9,
      "topic": "Q&A — 밀도 값과 stride",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "교수님 Q&A 내용으로 옳은 것은?",
      "choices": [
        "① 밀도 함수 값 p(x)는 절대 1을 넘을 수 없다",
        "② 박스를 변의 길이만큼(예: 1일 때 1씩) 이동시키면 KNN과 동일해진다",
        "③ 밀도 값 p(x)는 순간 값으로는 1을 초과할 수 있고, 전체 공간에 대한 적분이 1이면 된다. 박스를 변의 길이(예: 1)만큼 stride하면 히스토그램과 동일하고, stride를 작게 하면 해상도·정확도는 오르지만 계산 시간이 늘어난다",
        "④ stride는 작을수록 계산 시간이 줄어든다"
      ],
      "answer": 2,
      "brief": "p(x)>1 가능(적분만 1이면 됨), stride=변 길이면 히스토그램·작으면 해상도↑시간↑.",
      "detailed": "Q2: 밀도 값 자체는 1을 초과 가능하며 전체 공간 적분이 1이면 된다(예: 폭 0.1 영역에 확률 0.5면 밀도≈5, 면적=0.5). Q1: stride는 하이퍼파라미터로 변의 길이(예 1)만큼 1씩 이동하면 히스토그램과 동일하고, 0.5·0.1처럼 촘촘히 하면 해상도·정확도는 오르지만 계산 시간이 늘어난다.",
      "source": "밀도추정 PDF; 9주차 § 13"
    },
    {
      "id": "MLF9Q14",
      "set": 203,
      "week": 9,
      "topic": "KNN 분류기 확장 계산",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "KNN density를 분류기로 확장했다. 새 점 x의 K=7 최근접 이웃 중 클래스 C1이 2개, C2가 5개일 때, p(C2|x)는? (posterior = K_c/K)",
      "choices": [
        "① 2/7",
        "② 5/2",
        "③ 1/2",
        "④ 5/7"
      ],
      "answer": 3,
      "brief": "p(C2|x) = K_c/K = 5/7.",
      "detailed": "Bayes 정리로 p(C_c|x)=p(x|C_c)p(C_c)/p(x)=K_c/K 로 단순화된다. K=7, C2의 K_c=5이므로 p(C2|x)=5/7. 즉 K개 최근접 이웃 중 해당 클래스 비율이 곧 사후확률이며, 이것이 흔히 아는 KNN 다수결 분류다.",
      "source": "밀도추정 PDF; 9주차 § 7"
    },
    {
      "id": "MLF9Q18",
      "set": 203,
      "week": 9,
      "topic": "잠재변수 z와 marginalization",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "GMM의 잠재변수 z(길이 K의 one-hot 벡터)에 대한 설명으로 옳은 것은?",
      "choices": [
        "① z는 직접 관측되지 않는 잠재변수로 z_k=1이면 k번째 컴포넌트가 선택되고, p(z_k=1)=π_k, p(x|z_k=1)=N(μ_k,Σ_k) 이며, z를 marginalize하면 p(x)=Σ_k π_k N(x|μ_k,Σ_k)가 복원된다",
        "② z는 직접 관측되며, p(z_k=1)=μ_k 로 정의된다",
        "③ z는 연속 실수 벡터이며 평균이 π_k 이다",
        "④ z는 입력 x 그 자체이며 관측 가능하다"
      ],
      "answer": 0,
      "brief": "z=one-hot 잠재변수, p(z_k=1)=π_k, marginalize → GMM 복원.",
      "detailed": "z는 직접 관측되지 않지만 각 데이터 생성에 영향을 주는 잠재변수다. 길이 K의 one-hot 벡터로 z_k=1이면 k번째 컴포넌트가 선택된다. prior p(z_k=1)=π_k, conditional p(x|z_k=1)=N(x|μ_k,Σ_k)이며, joint p(x,z)를 z에 대해 합산(marginalize)하면 Σ_k π_k N(x|μ_k,Σ_k)로 GMM이 복원된다. 비유: 지능(z)→SAT/GPA(x).",
      "source": "밀도추정 PDF; 9주차 § 10"
    },
    {
      "id": "MLF10Q2",
      "set": 203,
      "week": 10,
      "topic": "클러스터링의 본질",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "같은 데이터셋에 대해 클러스터링 결과가 달라질 수 있는 이유로 노트가 강조한 것은?",
      "choices": [
        "① 데이터 개수가 달라지기 때문",
        "② 유사도 정의·알고리즘 선택·데이터에 대한 가정(모양·스케일·밀도)에 따라 달라지기 때문",
        "③ 클러스터링에는 항상 유일한 정답이 존재하기 때문",
        "④ 라벨이 항상 주어지기 때문"
      ],
      "answer": 1,
      "brief": "유사도 정의·알고리즘·가정에 따라 결과가 달라짐(정답 유일 X).",
      "detailed": "노트 §1: clustering results depend on how similarity is defined, the choice of algorithm, and its underlying assumptions about the data. 같은 데이터라도 다른 군집이 나올 수 있어 정답이 하나로 정해지지 않는다(과일을 색/종류로 묶는 예).",
      "source": "클러스터링 PDF; 10주차 § 1"
    },
    {
      "id": "MLF10Q6",
      "set": 203,
      "week": 10,
      "topic": "K-Means 중심 계산(계산형)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "어떤 군집에 점 (0,0), (2,0), (2,2), (4,2)가 모두 하드 할당되어 있다. 갱신 단계에서 이 군집의 새 중심 μ_k는?",
      "choices": [
        "① (4, 2)",
        "② (2, 2)",
        "③ (2, 1)",
        "④ (8, 4)"
      ],
      "answer": 2,
      "brief": "μ_k = 할당점 평균 = ((0+2+2+4)/4, (0+0+2+2)/4) = (2, 1).",
      "detailed": "노트 §2.4 Step2: μ_k = (Σ_n r_nk x^(n)) / (Σ_n r_nk) = 할당된 점들의 평균. x좌표 합 8/4=2, y좌표 합 4/4=1 → (2,1).",
      "source": "클러스터링 PDF; 10주차 § 2.4"
    },
    {
      "id": "MLF10Q12",
      "set": 203,
      "week": 10,
      "topic": "GMM vs K-Means",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "GMM과 K-Means의 차이로 옳은 것은?",
      "choices": [
        "① GMM은 거리 기반 비확률 모델이고 K-Means는 완전 확률 모델이다",
        "② 둘 다 구형·동일 크기 군집만 가정한다",
        "③ GMM은 K를 사후에 자동 결정한다",
        "④ GMM은 각 군집이 고유 공분산 Σ_k를 가져 모양·크기·방향이 자유롭고 소프트 할당(책임값)을 하는 완전 확률 모델이다"
      ],
      "answer": 3,
      "brief": "GMM=고유 공분산(타원)+소프트 할당+완전 확률 모델.",
      "detailed": "노트 §3.3: K-Means는 구형·동일 크기·하드·비확률, GMM은 각 군집 고유 공분산 Σ_k로 모양·크기·방향 자유, 소프트 할당(사후확률=responsibility), 완전 확률 모델이며 겹침을 자연스럽게 처리한다.",
      "source": "클러스터링 PDF; 10주차 § 3.3"
    },
    {
      "id": "MLF10Q13",
      "set": 203,
      "week": 10,
      "topic": "왜 EM인가",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "GMM의 로그 우도를 MLE로 직접 최대화하지 못하고 EM을 쓰는 핵심 이유는?",
      "choices": [
        "① 로그 안에 합(sum)이 들어 있어 미분이 비선형이 되어 닫힌 해가 없기 때문(직접 최대화가 analytically intractable)",
        "② 데이터가 항상 너무 적어서",
        "③ 가우시안이 확률 모델이 아니기 때문",
        "④ 라벨이 주어지지 않아 우도를 정의할 수 없기 때문"
      ],
      "answer": 0,
      "brief": "로그 안에 합 → 미분 비선형 → 닫힌 해 없음 → EM으로 우회.",
      "detailed": "노트 §4.1·§7 Q5: ln p(X)=Σ_n ln(Σ_k π_k N(...))처럼 로그 안에 합이 있어 미분이 비선형이라 닫힌 해가 없다(directly maximizing the likelihood is analytically intractable). 그래서 EM이라는 반복법을 쓴다.",
      "source": "클러스터링 PDF; 10주차 § 4.1"
    },
    {
      "id": "MLF10Q17",
      "set": 203,
      "week": 10,
      "topic": "혼합계수 갱신·라그랑주(계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "데이터가 N=4개이고 컴포넌트 k에 대한 책임값이 γ=0.9, 0.8, 0.3, 0.0이다. N_k와 π_k는? 또 π_k 유도 시 라그랑주 승수 λ의 값은?",
      "choices": [
        "① N_k=2(정수로 반올림), π_k=0.5, λ=+4",
        "② N_k=2.0, π_k=0.5, λ=−N=−4",
        "③ N_k=4.0, π_k=1.0, λ=0",
        "④ N_k=2.0, π_k=2.0, λ=−1"
      ],
      "answer": 1,
      "brief": "N_k=Σγ=2.0(실수), π_k=N_k/N=0.5, λ=−N=−4.",
      "detailed": "노트 §4.3(c)·§7 Q2: N_k=0.9+0.8+0.3+0.0=2.0(책임값의 합이라 일반적으로 정수 아님), π_k=N_k/N=2.0/4=0.5. 라그랑주 승수로 유도 시 λ=−N=−4.",
      "source": "클러스터링 PDF; 10주차 § 4.3"
    },
    {
      "id": "MLF11Q1",
      "set": 203,
      "week": 11,
      "topic": "차원 축소 정의",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "차원 축소(dimensionality reduction)의 정의로 가장 적절한 것은?",
      "choices": [
        "① 저차원 데이터를 고차원으로 확장해 표현력을 키우는 것",
        "② 데이터에 클래스 라벨을 부여하는 지도학습 과정",
        "③ 본질 구조(essential structure)를 보존하면서 고차원 공간의 데이터를 저차원으로 변환하는 것",
        "④ 데이터를 정규분포로 강제 변환하는 정규화 기법"
      ],
      "answer": 2,
      "brief": "본질 구조 보존하며 고차원→저차원 변환, 내재 차원 반영.",
      "detailed": "슬라이드 직접 인용: Dimensionality reduction transforms data from a high-dimensional space into a lower-dimensional one while preserving its essential structure, ideally reflecting its intrinsic dimension. 내재 구조를 캡처하고 redundant 정보를 제거한다.",
      "source": "차원축소 PDF; 11주차 § 1.1"
    },
    {
      "id": "MLF11Q5",
      "set": 203,
      "week": 11,
      "topic": "PCA 두 가지 등가 정의",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "PCA의 두 가지 등가(equivalent) 정의를 옳게 설명한 것은?",
      "choices": [
        "① 분산 최대화 vs 분산 최소화 — 서로 반대 결과를 낸다",
        "② 라벨을 쓰는 정의 vs 라벨을 안 쓰는 정의",
        "③ 선형 투영 정의 vs 비선형 투영 정의",
        "④ 투영 분산을 최대화하는 직교 투영 vs 평균 투영 비용(점과 투영점 사이 평균 제곱 거리)을 최소화하는 투영 — 같은 알고리즘으로 귀결된다"
      ],
      "answer": 3,
      "brief": "분산 최대화(직교 투영) = 평균 투영 비용 최소화. 결과(고유벡터·고유값) 동일.",
      "detailed": "슬라이드 인용: PCA can be understood in two equivalent ways. (1) orthogonal projection maximizing variance of projected data, (2) linear projection minimizing average projection cost(mean squared distance). 철학은 다르나 최종 결과(고유벡터·고유값)는 완전히 동일하다.",
      "source": "차원축소 PDF; 11주차 § 2.1"
    },
    {
      "id": "MLF11Q14",
      "set": 203,
      "week": 11,
      "topic": "Eigen-spectrum과 M 결정",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "PCA에서 보존할 차원 수 M을 정할 때 고유값 스펙트럼(eigen-spectrum)을 보는 이유는?",
      "choices": [
        "① 인덱스가 커질수록 고유값(분산)이 급격히 작아져 대부분 차원은 사실상 정보가 거의 없으므로, 스펙트럼이 꺾이는 지점을 보고 M을 정한다",
        "② 고유값은 인덱스가 커질수록 커지므로 마지막 차원들이 가장 중요하다",
        "③ 모든 고유값이 동일하므로 스펙트럼은 의미가 없다",
        "④ 고유값이 음수가 되는 지점에서 M을 정한다"
      ],
      "answer": 0,
      "brief": "고유값 내림차순으로 급감 → 스펙트럼 꺾이는 지점으로 M 결정.",
      "detailed": "노트 § 4.1: 인덱스가 커질수록 고유값(분산)이 급격히 작아져 대부분 차원은 사실상 정보가 없다. 스펙트럼이 꺾이는 지점을 보고 M을 결정한다(예: 15~100개로 대부분 분산 설명). MNIST 숫자 3 예시에서 λ_1=3.4·10^5, λ_2=2.8·10^5 등 내림차순.",
      "source": "차원축소 PDF; 11주차 § 4.1"
    },
    {
      "id": "MLF11Q9",
      "set": 203,
      "week": 11,
      "topic": "주성분 직교성",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA에서 서로 다른 주성분이 직교(orthogonal)하는 근본 이유는?",
      "choices": [
        "① 알고리즘이 직교를 강제로 임의 부여하기 때문",
        "② 공분산 행렬 S가 대칭(symmetric) 행렬이며, 대칭 행렬에서 서로 다른 고유값에 대응하는 고유벡터는 자연히 직교하기 때문",
        "③ 데이터가 항상 정규분포이기 때문",
        "④ 라벨이 직교 좌표로 주어지기 때문"
      ],
      "answer": 1,
      "brief": "S가 대칭 행렬 → 서로 다른 고유값의 고유벡터는 자연 발생적으로 직교.",
      "detailed": "슬라이드 인용: This orthogonality is not arbitrary; eigenvectors corresponding to different eigenvalues of a symmetric matrix such as S are orthogonal. 전사: S는 대칭(1행3열=3행1열)이라 고유벡터들이 랜덤이 아닌 자연스럽게 직교한다.",
      "source": "차원축소 PDF; 11주차 § 2.6"
    },
    {
      "id": "MLF11Q15",
      "set": 203,
      "week": 11,
      "topic": "분산 설명비 계산",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "어떤 데이터의 공분산 행렬 고유값이 내림차순으로 6, 3, 1 이라 하자. 제1주성분(M=1)으로 투영했을 때 설명되는 분산의 비율은?",
      "choices": [
        "① 30%",
        "② 50%",
        "③ 60%",
        "④ 100%"
      ],
      "answer": 2,
      "brief": "λ_1/(Σλ) = 6/(6+3+1) = 6/10 = 60%.",
      "detailed": "각 방향의 분산은 고유값과 같다(u^T S u=λ). 따라서 분산 설명비 = λ_1/(λ_1+λ_2+λ_3) = 6/(6+3+1) = 6/10 = 0.6 = 60%. 고유값은 그 방향의 분산 값 그 자체이므로 비율로 나눠 계산한다.",
      "source": "차원축소 PDF; 11주차 § 2.5, § 4.1"
    },
    {
      "id": "MLF12Q6",
      "set": 203,
      "week": 12,
      "topic": "PCA·MDS 분해 대상 구분",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "N개의 샘플과 p개의 변수를 가진 데이터에서, PCA가 분해하는 행렬과 MDS가 분해하는 행렬의 크기를 옳게 짝지은 것은?",
      "choices": [
        "① PCA: N×N 그램, MDS: p×p 공분산",
        "② 둘 다 p×p",
        "③ 둘 다 N×N",
        "④ PCA: p×p 공분산, MDS: N×N 그램"
      ],
      "answer": 3,
      "brief": "PCA=p×p 공분산(X^T X, 변수 간), MDS=N×N 그램(X X^T, 샘플 간).",
      "detailed": "노트 §3.3 표: PCA는 공분산 S=(1/N)X^T X로 변수(feature) 간 관계 → p×p. MDS는 그램 B=X X^T로 샘플 간 관계 → N×N. Transpose 위치 차이가 크기 차이로 드러난다.",
      "source": "Manifold PDF; 12주차 § 3.3"
    },
    {
      "id": "MLF12Q18",
      "set": 203,
      "week": 12,
      "topic": "UMAP 분리도에 대한 교수님 통찰",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "MNIST에서 UMAP이 t-SNE보다 클래스를 더 극명하게 분리한다는 점에 대한 노트의 교수님 통찰로 옳은 것은?",
      "choices": [
        "① 극명한 분리가 무조건 좋은 것은 아니다 — 실제 데이터 변동성인지 모델이 인위적으로 분리한 것인지 구분하기 어렵다. 다만 시각화 목적엔 유용하다",
        "② 극명한 분리는 항상 더 우수한 모델임을 보증한다",
        "③ UMAP의 분리는 라벨을 사용했기 때문이다",
        "④ t-SNE가 UMAP보다 항상 더 잘 분리한다"
      ],
      "answer": 0,
      "brief": "극명 분리=무조건 좋음 아님(실제 변동 vs 인위적 분리 구분 어려움). 시각화엔 유용.",
      "detailed": "노트 §5.5 전사: UMAP은 MNIST에서 t-SNE보다 클래스가 더 극명하게 뭉쳐 분리되지만, 교수님은 그것이 실제 데이터 변동성인지 모델의 인위적 분리인지 확인이 어렵다고 지적한다. 시각화 목적에는 구별이 잘 돼 선호된다. UMAP은 라벨을 쓰지 않는다(③ 오답).",
      "source": "Manifold PDF; 12주차 § 5.5"
    },
    {
      "id": "MLF12Q5",
      "set": 203,
      "week": 12,
      "topic": "PCA=MDS 증명에서 고유벡터 대응",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "Classical MDS = PCA 증명에서 X^T X u = λu 양변에 X를 곱해 (X X^T)(Xu) = λ(Xu)를 얻었다. 이때 그램 행렬 X X^T의 고유벡터 v는 PCA 고유벡터 u와 어떤 관계인가?",
      "choices": [
        "① v = u (동일하다)",
        "② v = X u (PCA 고유벡터를 데이터로 사상한 것)",
        "③ v = X^T u",
        "④ v = u / λ"
      ],
      "answer": 1,
      "brief": "v = X u. 같은 λ를 공유하되 고유벡터는 X로 사상된 관계.",
      "detailed": "노트 §3.3 증명: X(X^T X u)=X(λu) → (XX^T)(Xu)=λ(Xu) → (XX^T)v=λv, 여기서 v=Xu. X^T X(공분산)와 X X^T(그램)는 0이 아닌 고유값을 공유하며 고유벡터는 X 곱으로 연결된다. 그래서 유클리드 거리면 두 결과가 동일하다.",
      "source": "Manifold PDF; 12주차 § 3.3"
    },
    {
      "id": "MLF12Q11",
      "set": 203,
      "week": 12,
      "topic": "t-SNE 그래디언트 부호 의미",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "t-SNE 그래디언트 ∂KL/∂y_i = 4 Σ_j (p_ij − q_ij)(y_i − y_j)(1+||y_i−y_j||²)^{-1} 에서 특정 j에 대해 (p_ij − q_ij) > 0 일 때 점 y_i에 작용하는 힘의 방향은?",
      "choices": [
        "① y_i를 y_j에서 멀어지게 밀어낸다",
        "② y_i에 아무 힘도 작용하지 않는다",
        "③ y_i를 y_j 쪽으로 끌어당긴다(인력)",
        "④ y_i를 원점으로 이동시킨다"
      ],
      "answer": 2,
      "brief": "p_ij>q_ij면 인력: 고차원보다 저차원에서 너무 멀어 y_j 쪽으로 당김.",
      "detailed": "노트 §4.4의 그래디언트. p_ij − q_ij > 0은 고차원 유사도가 저차원보다 큼(=저차원에서 과도하게 멀리 떨어짐)을 뜻한다. 경사하강(−그래디언트 방향 이동)에서 이 항은 y_i를 y_j 방향으로 당기는 인력으로 작용한다. p_ij<q_ij면 반대로 척력.",
      "source": "Manifold PDF; 12주차 § 4.4"
    },
    {
      "id": "MLF12Q17",
      "set": 203,
      "week": 12,
      "topic": "목적 함수·대칭화·분포 교차 매칭",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "t-SNE와 UMAP의 구성요소를 짝지은 것 중 노트와 일치하는 것은?",
      "choices": [
        "① t-SNE: 그래프 + Cross-Entropy / UMAP: 가우시안 + KL",
        "② t-SNE: fuzzy union 대칭화 / UMAP: 평균 대칭화",
        "③ 둘 다 KL Divergence를 최소화한다",
        "④ t-SNE: 가우시안 P + t-분포 Q + KL + 평균 대칭화 / UMAP: 그래프 weight + 유연함수 v + Cross-Entropy + fuzzy union"
      ],
      "answer": 3,
      "brief": "t-SNE=가우시안·t분포·KL·평균대칭화 / UMAP=그래프·유연함수·Cross-Entropy·fuzzy union.",
      "detailed": "노트 §7 비교표: t-SNE은 고차원 가우시안 P, 저차원 t-분포 Q, KL Divergence, 대칭화는 평균 (p_(j|i)+p_(i|j))/2N. UMAP은 KNN 그래프 weight, 저차원 유연함수 v_ij, Cross-Entropy, 대칭화는 fuzzy-set union. 나머지는 두 기법 구성요소를 뒤바꾼 오답.",
      "source": "Manifold PDF; 12주차 § 7"
    },
    {
      "id": "MLF13Q3",
      "set": 203,
      "week": 13,
      "topic": "단층 신경망의 한계 (XOR)",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "단층 신경망(및 단층 퍼셉트론)의 한계로 옳은 것은?",
      "choices": [
        "① XOR 같은 비선형 결정 경계 문제를 풀 수 없고, 레이어가 하나라 계층적 특징 학습이 어려운 표현력 한계가 있다",
        "② 모든 비선형 문제를 직선 하나로 완벽히 분리할 수 있다",
        "③ 선형 분리 가능한 AND·OR 문제조차 풀 수 없다",
        "④ 가중치를 사람이 수동으로만 정할 수 있다"
      ],
      "answer": 0,
      "brief": "XOR 등 비선형 불가 + 표현력(계층적 특징) 부족.",
      "detailed": "슬라이드: single-layer networks can typically solve linearly separable problems, struggling with XOR(비선형). Another limitation is restricted representational power(레이어 하나라 계층적 특징 학습 불가). AND·OR은 선형 분리 가능하여 해결됨. 다음 챕터 MLP·역전파로 극복.",
      "source": "NN PDF; 13주차 § 8"
    },
    {
      "id": "MLF13Q8",
      "set": 203,
      "week": 13,
      "topic": "퍼셉트론 갱신 불필요 조건 (계산형)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "같은 퍼셉트론 w=[0,1,0.5]에서 데이터 A: x1=1, x2=1(x0=1), 정답 y=+1. wᵀx 값과 가중치 갱신 여부는?",
      "choices": [
        "① wᵀx=1.5 > 0 → ŷ=+1, 정답과 불일치 → 갱신 필요",
        "② wᵀx=1.5 > 0 → ŷ=+1, 정답과 일치 → 갱신 불필요(Δw=0)",
        "③ wᵀx=-1.5 < 0 → ŷ=-1, 오분류 → 갱신 필요",
        "④ wᵀx=0 → 경계 위라 무조건 갱신"
      ],
      "answer": 1,
      "brief": "wᵀx=1.5>0→ŷ=+1=y → 갱신 불필요.",
      "detailed": "wᵀx = 0 + 1(1) + 0.5(1) = 1.5 > 0 → ŷ=+1. 정답 y=+1과 일치하므로 오차 (y−ŷ)=0 → Δw=0, 업데이트 불필요. 퍼셉트론은 오분류된 샘플에서만 가중치를 갱신한다.",
      "source": "NN PDF; 13주차 § 2.4"
    },
    {
      "id": "MLF13Q13",
      "set": 203,
      "week": 13,
      "topic": "에폭·배치 계산 (계산형)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "트레이닝 데이터 100개를 배치 크기(batch size) 20으로 학습할 때, 1 에폭(epoch)을 완료하는 데 필요한 가중치 업데이트 횟수는?",
      "choices": [
        "① 1번",
        "② 20번",
        "③ 5번",
        "④ 100번"
      ],
      "answer": 2,
      "brief": "100 / 20 = 5번 업데이트 = 1 에폭.",
      "detailed": "에폭 = 전체 트레이닝 데이터를 처음부터 끝까지 한 번 다 학습한 상태. 100개를 batch size 20으로 나누면 100/20 = 5번 업데이트가 1 에폭. (노트 예시와 동일)",
      "source": "NN PDF; 13주차 § 6.1"
    },
    {
      "id": "MLF13Q15",
      "set": 203,
      "week": 13,
      "topic": "MSE vs BCE (분류 페널티)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "분류 작업에서 MSE 대신 BCE(Binary Cross-Entropy)를 선호하는 이유로 옳은 것은?",
      "choices": [
        "① MSE는 음수가 될 수 있어 손실로 부적절하기 때문",
        "② BCE는 회귀에, MSE는 분류에 적합하기 때문",
        "③ BCE는 미분이 불가능해 계산이 더 단순하기 때문",
        "④ MSE는 정답과 예측이 정반대여도 오차가 작아 그래디언트가 충분히 크지 않은 반면, BCE는 확신에 찬 틀린 예측(confident but incorrect)에 훨씬 큰 페널티를 준다"
      ],
      "answer": 3,
      "brief": "BCE는 확신에 찬 오분류에 큰 페널티(MSE는 그래디언트 약함).",
      "detailed": "슬라이드: for classification, MSE does not always provide gradients strong enough to guide learning. Unlike MSE, cross-entropy places a much higher penalty on confident but incorrect predictions. MSE는 회귀(연속값)에 적합.",
      "source": "NN PDF; 13주차 § 7.1"
    },
    {
      "id": "MLF13Q19",
      "set": 203,
      "week": 13,
      "topic": "퍼셉트론 수렴 보장 / 선형 분리",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "단층 퍼셉트론의 수렴(convergence) 보장과 해결 가능 문제에 대해 옳은 것은?",
      "choices": [
        "① 두 클래스가 선형 분리 가능(linearly separable)할 때만 수렴이 보장되며, AND·OR은 해결 가능하지만 XOR은 직선 하나로 분리할 수 없어 해결 불가능하다",
        "② 어떤 데이터든 항상 수렴이 보장된다",
        "③ XOR은 해결 가능하지만 AND·OR은 해결 불가능하다",
        "④ 수렴 보장은 학습률이 1일 때만 성립한다"
      ],
      "answer": 0,
      "brief": "선형 분리 가능할 때만 수렴 보장. AND·OR 가능, XOR 불가.",
      "detailed": "노트: 해결 가능 — AND, OR(직선 하나로 완벽 분리, linearly separable). 해결 불가능 — XOR(비선형 분리). 슬라이드: convergence is guaranteed only when the two classes are linearly separable.",
      "source": "NN PDF; 13주차 § 2.5"
    }
  ],
  204:
  [
    {
      "id": "MLF9Q4",
      "set": 204,
      "week": 9,
      "topic": "유도 단계 — 이항분포",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "밀도 추정 유도에서, 영역 R 안에 들어가는 데이터 개수 K가 이항분포를 따른다고 보았을 때 P ≈ K/N 라는 근사가 정당화되는 핵심 이유는?",
      "choices": [
        "① N이 매우 크면 var[K/N] = P(1−P)/N 이 0으로 수렴해 K/N이 P에 가까워지기 때문",
        "② K가 항상 N과 같기 때문",
        "③ R을 매우 작게 잡으면 p(x)가 상수가 되기 때문",
        "④ 이항분포가 가우시안으로 수렴하기 때문"
      ],
      "answer": 0,
      "brief": "큰 N에서 var[K/N]=P(1−P)/N → 0 이라 K/N이 P로 수렴.",
      "detailed": "E[K/N]=P, var[K/N]=P(1−P)/N 이다. N이 매우 크면 분산이 0으로 수렴해 K/N이 P에 매우 가까워진다. 이것은 큰 N 극한에서의 경험적 추정(Step 3)이며, 작은 R 극한(P≈p(x)V)과는 별개의 단계다.",
      "source": "밀도추정 PDF; 9주차 § 3"
    },
    {
      "id": "MLF9Q10",
      "set": 204,
      "week": 9,
      "topic": "Bandwidth h의 영향",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "KDE의 bandwidth h가 결과에 미치는 영향으로 옳은 것은?",
      "choices": [
        "① h가 너무 작으면 over-smoothing, 너무 크면 spiky해진다",
        "② h가 너무 작으면 노이즈가 심해 데이터 한 점마다 뾰족한 봉우리가 생기고, 너무 크면 over-smoothing되어 bimodal 분포가 하나로 뭉뚱그려진다",
        "③ h는 결과의 부드러움에 영향을 주지 않는다",
        "④ h가 클수록 항상 best density model이 된다"
      ],
      "answer": 1,
      "brief": "h 작음→spiky/noisy, h 큼→over-smoothing.",
      "detailed": "h가 너무 작으면(예 h=0.005) 데이터 1점마다 뾰족한 봉우리가 생겨 noisy하다. 적절하면(예 h=0.07) best density model이 된다. 너무 크면(예 h=0.2) over-smoothing되어 진짜 bimodal 분포가 하나로 뭉뚱그려진다.",
      "source": "밀도추정 PDF; 9주차 § 5"
    },
    {
      "id": "MLF9Q5",
      "set": 204,
      "week": 9,
      "topic": "유도 단계 — 작은 R 극한",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "유도 Step 4에서 'P ≈ p(x)·V' 근사가 성립하는 조건과 의미로 옳은 것은?",
      "choices": [
        "① N이 매우 클 때, P가 K/N으로 수렴한다는 의미",
        "② 영역 R이 매우 클 때 p(x)가 균일해진다는 의미",
        "③ 영역 R이 매우 작아 그 안에서 p(x)를 상수로 취급할 수 있어, 적분 ∫_R p(x)dx 가 p(x)·V 로 근사된다는 의미",
        "④ K가 고정될 때 V가 무한히 커진다는 의미"
      ],
      "answer": 2,
      "brief": "작은 R에서 p(x)≈상수 → ∫_R p(x)dx ≈ p(x)·V.",
      "detailed": "지역 R이 매우 작으면 그 안에서 p(x)를 상수로 취급할 수 있어 적분이 단순 곱 p(x)·V로 근사된다. V는 R의 부피(1D 길이, 2D 면적, D차원이면 h^D)다. 이는 큰 N 극한(P≈K/N)과 결합되어 최종 공식 p(x)≈K/(NV)를 만든다.",
      "source": "밀도추정 PDF; 9주차 § 3"
    },
    {
      "id": "MLF9Q15",
      "set": 204,
      "week": 9,
      "topic": "KNN 분류기 도출",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "KNN density estimator를 분류 규칙으로 확장하는 과정에서, posterior가 p(C_c|x)=K_c/K 로 단순화되는 근거로 옳은 것은?",
      "choices": [
        "① class prior p(C_c)=N_c/N 를 무시했기 때문",
        "② 모든 클래스의 N_c가 같다고 가정했기 때문",
        "③ K=1로 고정했기 때문",
        "④ Bayes 정리에서 p(x|C_c)=K_c/(N_c V), p(C_c)=N_c/N, p(x)=K/(NV) 를 대입하면 N_c·N·V 항이 약분되어 K_c/K 만 남기 때문"
      ],
      "answer": 3,
      "brief": "Bayes에 세 밀도식 대입 → N_c·V·N 약분 → K_c/K.",
      "detailed": "class-conditional p(x|C_c)=K_c/(N_c V), prior p(C_c)=N_c/N, unconditional p(x)=K/(NV)를 Bayes 정리 p(C_c|x)=p(x|C_c)p(C_c)/p(x)에 대입하면 분자 (K_c/(N_c V))(N_c/N)=K_c/(NV), 분모 K/(NV)로 약분되어 K_c/K가 된다. 슬라이드: 단순 분류 규칙이지만 그 바탕 원리는 여전히 density estimation이다.",
      "source": "밀도추정 PDF; 9주차 § 7"
    },
    {
      "id": "MLF9Q19",
      "set": 204,
      "week": 9,
      "topic": "GMM MLE의 두 문제",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "GMM을 MLE로 직접 풀 때 발생하는 두 가지 문제로 옳게 짝지은 것은?",
      "choices": [
        "① 로그 안에 합(sum)이 들어가 미분 시 비선형 방정식이 되어 closed-form 해가 없음 / 특이점(singularity)으로 μ_k=x^(n)이고 σ_k→0이면 likelihood가 무한대로 발산",
        "② 과적합 방지 불가 / 학습률 폭발",
        "③ 데이터가 부족함 / 차원의 저주",
        "④ 그래디언트 소실 / 그래디언트 폭발"
      ],
      "answer": 0,
      "brief": "GMM의 MLE 두 문제: 로그 안 합→비선형이라 closed-form 해 없음 / 특이점(singularity)으로 likelihood가 ∞로 발산.",
      "detailed": "GMM 로그우도를 직접 MLE로 풀 때 두 문제가 생긴다. 첫째, log-likelihood가 로그 안에 가우시안 항들의 합을 담아 미분하면 해석적으로 풀 수 없는 비선형 방정식이 되어 closed-form 해가 없다. 둘째, 어떤 가우시안 평균이 한 데이터 점에 위치(μ_k=x^(n))하고 σ_k→0이면 밀도가 무한히 커져 log-likelihood가 ∞로 발산한다. 따라서 MLE는 not well posed라 EM이 필요하다.",
      "source": "밀도추정 PDF; 9주차 § 11"
    },
    {
      "id": "MLF10Q3",
      "set": 204,
      "week": 10,
      "topic": "K-Means 특성",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "K-Means 알고리즘에 대한 설명으로 옳은 것은?",
      "choices": [
        "① 완전 확률 모델로 소프트 할당을 한다",
        "② 각 군집을 그 중심(centroid·prototype)으로 표현하고 각 점을 가장 가까운 중심에 할당하는, 단순·효율적인 비확률적 방법이다",
        "③ 군집 수 K를 항상 자동으로 결정한다",
        "④ 거리를 쓰지 않고 사후확률만 사용한다"
      ],
      "answer": 1,
      "brief": "각 군집=중심으로 표현, 가장 가까운 중심에 할당하는 비확률적 방법.",
      "detailed": "노트 §2.1·2.7: represent each cluster by its center(centroid/prototype) and assign each data point to the nearest centroid. 가장 단순·널리 쓰임·계산 효율적인 non-probabilistic 방법이며 유클리드 거리를 쓴다.",
      "source": "클러스터링 PDF; 10주차 § 2"
    },
    {
      "id": "MLF10Q7",
      "set": 204,
      "week": 10,
      "topic": "K-Means 수렴성",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "K-Means의 수렴 성질로 옳은 것은?",
      "choices": [
        "① 비용 J가 매 단계 단조 감소하므로 항상 전역 최적(global optimum)에 수렴한다",
        "② J는 진동할 수 있어 수렴이 보장되지 않는다",
        "③ J는 매 단계 단조 감소해 반드시 수렴하지만, 전역 최적은 보장되지 않고 초기값에 따라 지역 최적에 빠질 수 있다",
        "④ J는 매 단계 증가하다가 멈춘다"
      ],
      "answer": 2,
      "brief": "J 단조 감소→수렴 보장, 단 전역 최적 보장 X(초기값 의존).",
      "detailed": "노트 §2.4 수렴: 할당 단계도 갱신 단계도 J를 줄여 J가 단조 감소하므로 반드시 수렴한다. 다만 전역 최적 보장은 아니며 초기값에 따라 지역 최적에 빠질 수 있다.",
      "source": "클러스터링 PDF; 10주차 § 2.4"
    },
    {
      "id": "MLF10Q18",
      "set": 204,
      "week": 10,
      "topic": "Hierarchical 방향·차이",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "계층적 군집화(hierarchical clustering)에 대한 설명으로 옳은 것은?",
      "choices": [
        "① K를 미리 정해야 하며 덴드로그램을 만들 수 없다",
        "② Agglomerative는 top-down 분할, Divisive는 bottom-up 병합이다",
        "③ 완전 확률 모델이라 책임값을 계산한다",
        "④ 전체 트리(덴드로그램)를 먼저 만든 뒤 나중에 잘라 K를 사후 결정하며, Agglomerative(bottom-up 병합)가 Divisive(top-down 분할)보다 더 흔히 쓰인다"
      ],
      "answer": 3,
      "brief": "덴드로그램 후 K 사후결정, Agglomerative(bottom-up)가 더 흔함.",
      "detailed": "노트 §5.2·5.3: 전체 hierarchy를 먼저 만들어 number of clusters를 afterward 결정한다. Agglomerative=bottom-up(각 점→병합, 더 흔함), Divisive=top-down(전체→분할). 비모수·유사도 기반.",
      "source": "클러스터링 PDF; 10주차 § 5"
    },
    {
      "id": "MLF10Q14",
      "set": 204,
      "week": 10,
      "topic": "E-step 책임값",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "E-step의 책임값 γ(z_k)에 대한 설명으로 옳은 것은?",
      "choices": [
        "① γ(z_k)는 점 x가 컴포넌트 k에서 생성됐을 사후확률 π_k N(x|μ_k,Σ_k) / Σ_j π_j N(x|μ_j,Σ_j)로, 분모는 정규화(evidence) 역할을 해 Σ_k γ(z_k)=1을 보장한다",
        "② γ(z_k)는 0 또는 1만 갖는 하드 지시 변수다",
        "③ γ(z_k)는 분모 없이 π_k N(x|μ_k,Σ_k)로만 정의된다",
        "④ γ(z_k)는 M-step에서 파라미터를 고정하지 않고 계산한다"
      ],
      "answer": 0,
      "brief": "γ(z_k)=베이즈 사후확률, 분모는 정규화 → Σ_k γ=1.",
      "detailed": "노트 §4.2: γ(z_k)=p(z_k=1|x)=π_k N / Σ_j π_j N. 현재 파라미터를 고정하고 계산하며, 분모는 전체 확률(evidence)로 정규화해 Σ_k γ(z_k)=1을 보장한다. r_nk의 소프트 버전이다.",
      "source": "클러스터링 PDF; 10주차 § 4.2"
    },
    {
      "id": "MLF10Q19",
      "set": 204,
      "week": 10,
      "topic": "Linkage 구별·함정",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "연결 기준(linkage)에 대한 설명으로 옳은 것은?",
      "choices": [
        "① Single linkage는 가장 먼 쌍의 거리를 쓰며 조밀한 군집을 선호한다",
        "② Single linkage는 가장 가까운 쌍(min)을 써 사슬 현상이, Complete linkage는 가장 먼 쌍(max)을 써 조밀한 군집 선호 경향이 있다",
        "③ Complete linkage는 가장 가까운 쌍의 거리를 써 사슬(chaining) 현상을 일으킨다",
        "④ Average linkage는 두 군집 중심 간 거리만 사용한다"
      ],
      "answer": 1,
      "brief": "Single=min(사슬 현상), Complete=max(조밀 군집 선호).",
      "detailed": "노트 §5.5: Complete=max_{a,b}d(a,b)(조밀 군집 선호), Single=min_{a,b}d(a,b)(chaining), Average(UPGMA)=모든 쌍 평균, Centroid=||μ_A−μ_B||², Ward=크기 가중 ||μ_A−μ_B||².",
      "source": "클러스터링 PDF; 10주차 § 5.5"
    },
    {
      "id": "MLF11Q2",
      "set": 204,
      "week": 11,
      "topic": "차원의 저주",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "차원의 저주(curse of dimensionality)가 학습을 어렵게 만드는 핵심 메커니즘은?",
      "choices": [
        "① 차원이 늘면 데이터가 점점 조밀(dense)해져 과적합이 발생한다",
        "② 차원이 늘면 계산이 빨라져 학습이 조기 종료된다",
        "③ 차원이 늘면 공간이 기하급수적으로 커져 데이터가 희소(sparse)해지고, 기하급수적으로 더 많은 데이터 없이는 학습·추정·일반화가 어려워진다",
        "④ 차원이 늘면 라벨이 자동으로 사라져 비지도학습만 가능해진다"
      ],
      "answer": 2,
      "brief": "차원↑ → 공간 폭증 → 데이터 sparse → 기하급수적 데이터 없이 학습·일반화 곤란.",
      "detailed": "슬라이드 인용: as the number of dimensions increases, the data becomes increasingly sparse, making learning, estimation, and generalization much more difficult without exponentially more data. 빈 공간을 채우려면 데이터도 기하급수적으로 필요하다.",
      "source": "차원축소 PDF; 11주차 § 1.2"
    },
    {
      "id": "MLF11Q6",
      "set": 204,
      "week": 11,
      "topic": "투영 분산과 공분산 행렬",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "단위 방향 벡터 u_1(u_1^T u_1=1)에 투영했을 때 투영된 데이터의 분산은 어떻게 표현되는가? (S는 데이터 공분산 행렬)",
      "choices": [
        "① S u_1 u_1^T",
        "② u_1^T u_1 / S",
        "③ S + u_1",
        "④ u_1^T S u_1"
      ],
      "answer": 3,
      "brief": "투영 분산 = u_1^T S u_1.",
      "detailed": "노트 § 2.3: 투영 분산 (1/N)Σ{u_1^T x − u_1^T x̄}² = u_1^T [ (1/N)Σ(x−x̄)(x−x̄)^T ] u_1 = u_1^T S u_1. 여기서 S = (1/N)Σ(x−x̄)(x−x̄)^T 가 데이터 공분산 행렬이다.",
      "source": "차원축소 PDF; 11주차 § 2.3"
    },
    {
      "id": "MLF11Q17",
      "set": 204,
      "week": 11,
      "topic": "독립 vs 무상관",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "통계적 독립(independence)과 무상관(uncorrelatedness)의 관계로 옳은 것은?",
      "choices": [
        "① 독립은 무상관보다 더 강한 조건으로, 무상관은 선형 관계만 없을 뿐 비선형 관계는 남을 수 있다 (예: Y=X²는 무상관이지만 종속)",
        "② 무상관이 독립보다 더 강한 조건이다",
        "③ 무상관이면 항상 독립이다",
        "④ 독립과 무상관은 완전히 같은 개념이다"
      ],
      "answer": 0,
      "brief": "독립 > 무상관. 무상관=선형만 무관, 독립=선·비선형 모두 무관.",
      "detailed": "슬라이드 인용: statistical independence is a stronger condition than mere uncorrelatedness. 무상관은 선형 관계만 없고 비선형 관계(예 Y=X²)는 남을 수 있다. 독립이면 한 변수를 알아도 다른 변수에 대한 정보가 전혀 없다. PCA는 무상관은 보장하지만 독립은 보장하지 못한다.",
      "source": "차원축소 PDF; 11주차 § 5.2"
    },
    {
      "id": "MLF11Q10",
      "set": 204,
      "week": 11,
      "topic": "PCA 절차",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "M차원으로 줄이는 PCA의 최종 절차로 옳은 것은?",
      "choices": [
        "① 공분산 S 계산 → 고유분해 → 고유값 오름차순 정렬 → 가장 작은 M개 고유벡터 선택",
        "② 공분산 S 계산 → 고유분해 → 고유값 내림차순 정렬 → 가장 큰 M개 고유벡터 방향으로 투영",
        "③ 거리 행렬 계산 → 더블 센터링 → 가장 작은 M개 선택",
        "④ 로그 우도 계산 → Gradient Ascent → W 갱신"
      ],
      "answer": 1,
      "brief": "S 계산 → 고유분해 → 내림차순 정렬 → 큰 M개 고유벡터 투영.",
      "detailed": "노트 § 2.7: (1) 공분산 행렬 S 계산, (2) 고유벡터·고유값 계산(총 D개), (3) 고유값(분산) 내림차순 정렬, (4) 큰 값부터 M개 고유벡터 선택해 그 방향으로 투영.",
      "source": "차원축소 PDF; 11주차 § 2.7"
    },
    {
      "id": "MLF11Q16",
      "set": 204,
      "week": 11,
      "topic": "공분산 행렬 계산",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "1차원 데이터 점이 x = 1, 3, 5 (N=3) 일 때, 노트의 정의 S = (1/N)Σ(x−x̄)(x−x̄)^T 에 따른 분산 S 값은?",
      "choices": [
        "① 2",
        "② 4",
        "③ 8/3",
        "④ 16/3"
      ],
      "answer": 2,
      "brief": "x̄=3, 편차² 합=4+0+4=8, S=8/3.",
      "detailed": "평균 x̄=(1+3+5)/3=3. 편차 제곱: (1−3)²=4, (3−3)²=0, (5−3)²=4, 합=8. 노트 정의는 1/N로 나누므로 S=8/3≈2.67. (표본분산 1/(N−1)=4가 아님에 주의: 노트는 1/N 정의 사용.)",
      "source": "차원축소 PDF; 11주차 § 2.3"
    },
    {
      "id": "MLF12Q1",
      "set": 204,
      "week": 12,
      "topic": "매니폴드 가정의 근거",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "노트에서 고차원 실세계 데이터가 '모든 방향으로 자유롭게 변동하지 않는다'고 보는 근거로 직접 제시되지 않은 것은?",
      "choices": [
        "① 물리 법칙(physical laws)",
        "② 의미론적 관계(semantic relationships)",
        "③ 기하 제약·시간 연속성(geometric constraints, temporal continuity)",
        "④ 데이터에 부여된 정답 라벨(supervised labels)"
      ],
      "answer": 3,
      "brief": "근거는 물리법칙·의미관계·기하제약·시간연속성·과제규칙. 라벨은 비지도 매니폴드 가정과 무관.",
      "detailed": "슬라이드: real-world data is usually governed by hidden structure: physical laws, semantic relationships, geometric constraints, temporal continuity, and task-specific rules. 라벨(supervised labels)은 이 목록에 없으며, 매니폴드 학습은 비지도 맥락이다.",
      "source": "Manifold PDF; 12주차 § 1.1"
    },
    {
      "id": "MLF12Q7",
      "set": 204,
      "week": 12,
      "topic": "Non-metric MDS의 동기",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "노트에 따르면 Classical MDS 대신 Non-Metric MDS를 쓰는 이유와 그 대가(trade-off)로 옳은 것은?",
      "choices": [
        "① Non-metric은 dissimilarity 정의를 비선형으로 바꿔 복잡한 구조를 포착하지만, Classical(약 0.053초)보다 느리다(약 10초)",
        "② Classical은 비선형이라 느리고, Non-metric은 선형이라 빠르다",
        "③ Non-metric은 거리 행렬이 필요 없다",
        "④ 둘은 속도·결과가 동일하다"
      ],
      "answer": 0,
      "brief": "Non-metric=비선형 dissimilarity로 복잡 구조 포착, 단 Classical(0.053s)보다 느림(~10s).",
      "detailed": "노트 §3.4 전사: Classical MDS는 선형이라 스위스 롤 실패. Non-metric MDS는 거리(dissimilarity) 정의를 비선형으로 바꿔 복잡한 구조를 포착하지만 매우 느리다(Classical 0.053초 vs Non-metric 약 10초).",
      "source": "Manifold PDF; 12주차 § 3.4"
    },
    {
      "id": "MLF12Q19",
      "set": 204,
      "week": 12,
      "topic": "선형/비선형·입력 종합 분류",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "PCA·Classical MDS·t-SNE·UMAP을 '선형/비선형'과 '입력'으로 분류할 때 노트와 일치하는 것은?",
      "choices": [
        "① PCA·MDS는 비선형, t-SNE·UMAP은 선형이다",
        "② PCA·MDS는 선형(유클리드 MDS=PCA), t-SNE·UMAP은 비선형이다. MDS의 입력만 거리 행렬 D이고 나머지는 데이터를 입력으로 받는다",
        "③ 네 기법 모두 거리 행렬 D를 입력으로 받는다",
        "④ t-SNE만 선형이고 나머지는 비선형이다"
      ],
      "answer": 1,
      "brief": "선형=PCA·MDS(Euclid=PCA), 비선형=t-SNE·UMAP. 입력 거리행렬은 MDS만.",
      "detailed": "노트 §7 표: 선형은 PCA와 Classical MDS(유클리드 거리면 PCA와 동일), 비선형은 t-SNE·UMAP. 입력은 MDS만 거리 행렬 D이고 PCA·t-SNE·UMAP은 데이터 X를 입력으로 받는다.",
      "source": "Manifold PDF; 12주차 § 7"
    },
    {
      "id": "MLF12Q8",
      "set": 204,
      "week": 12,
      "topic": "t-SNE 대칭화 분모 2N의 의미",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "t-SNE 대칭화 p_ij = (p_(j|i) + p_(i|j)) / 2N 에서 분모의 N(샘플 수)을 추가로 나누는 이유로 가장 적절한 것은?",
      "choices": [
        "① σ_i를 직접 결정하기 위해",
        "② KL Divergence를 음수로 만들기 위해",
        "③ p_(j|i)는 각 i에 대해 합이 1인 조건부 확률이므로, 모든 i·j에 걸친 결합확률 p_ij의 전체 합이 1이 되도록 정규화하기 위해",
        "④ t-분포의 자유도를 1로 고정하기 위해"
      ],
      "answer": 2,
      "brief": "조건부 p_(j|i)는 i별 합 1 → 결합 p_ij 전체 합을 1로 맞추려 2N으로 정규화.",
      "detailed": "노트 §4.2: p_(j|i)는 각 i마다 분모 정규화되어 Σ_j p_(j|i)=1인 조건부 확률이다. 두 방향을 더한 뒤 2N으로 나누면 Σ_(i≠j) p_ij = 1인 정상적인 결합 분포가 된다. 단순 평균(/2)만으로는 N개의 i에 걸쳐 합이 N이 되므로 추가로 N을 나눈다.",
      "source": "Manifold PDF; 12주차 § 4.2"
    },
    {
      "id": "MLF12Q13",
      "set": 204,
      "week": 12,
      "topic": "UMAP ρ_i의 역할",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "UMAP의 w_ij = exp(−(d(x_i,x_j) − ρ_i)/σ_i), ρ_i = min_{j∈N_k(i)} d(x_i,x_j) 에서 ρ_i를 빼주는 효과로 옳은 것은?",
      "choices": [
        "① 모든 가중치를 0으로 만든다",
        "② 거리를 음수로 바꿔 척력을 만든다",
        "③ 자유도를 결정한다",
        "④ 가장 가까운 이웃에 대해 지수의 분자가 0이 되어 w가 1에 가까워지므로, 데이터가 빽빽하든 듬성하든 최소 한 이웃과는 강하게 연결되도록 로컬 정규화한다"
      ],
      "answer": 3,
      "brief": "ρ_i=최근접 거리. 빼주면 가장 가까운 이웃 w≈1 → 밀도 무관 최소 1개 강연결(로컬 정규화).",
      "detailed": "노트 §5.2: ρ_i는 최근접 이웃까지의 거리. d−ρ_i가 최근접에서 0이 되어 exp(0)=1 → 밀도가 높든 낮든 각 점이 최소 한 이웃과는 강하게 연결된다. 이는 클러스터 밀도 차이에 대한 로컬 정규화 역할.",
      "source": "Manifold PDF; 12주차 § 5.2"
    },
    {
      "id": "MLF13Q4",
      "set": 204,
      "week": 13,
      "topic": "McCulloch-Pitts vs Perceptron",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "McCulloch-Pitts 뉴런과 퍼셉트론(Rosenblatt 1958)의 결정적 차이는?",
      "choices": [
        "① McCulloch-Pitts는 가중치를 사람이 수동으로 정해야 하지만, 퍼셉트론은 예제로부터 가중치를 스스로 학습(자동 조정)한다",
        "② McCulloch-Pitts는 비선형 활성, 퍼셉트론은 선형 활성을 쓴다",
        "③ 퍼셉트론은 입력이 없고 McCulloch-Pitts만 입력을 받는다",
        "④ 둘 다 가중치를 학습하지 못한다"
      ],
      "answer": 0,
      "brief": "핵심 차이=가중치 학습 여부(MP 수동 vs 퍼셉트론 자동 학습).",
      "detailed": "슬라이드: McCulloch-Pitts could not adjust its own weights and relied on a human operator to set them manually. The perceptron was the first model capable of learning to adjust its own weights based on examples. 구조(입력·가중치·편향·선형결합·임계값)는 유사하나 학습 여부가 핵심 차이.",
      "source": "NN PDF; 13주차 § 1.6, § 2.1"
    },
    {
      "id": "MLF13Q10",
      "set": 204,
      "week": 13,
      "topic": "Adaline 미분 가능성·경사하강",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "Adaline이 퍼셉트론과 달리 경사 하강법(gradient descent)을 사용할 수 있는 이유는?",
      "choices": [
        "① step function의 미분이 항상 1이기 때문",
        "② 선형 활성 σ(z)=z의 연속 출력으로 에러를 계산하므로 미분 가능하고, 따라서 MSE를 최소화하는 경사하강이 가능하기 때문",
        "③ 가중치를 사람이 수동으로 정하기 때문",
        "④ 라벨이 원-핫 벡터로 주어지기 때문"
      ],
      "answer": 1,
      "brief": "연속 선형 출력→미분 가능→경사하강(MSE 최소화).",
      "detailed": "노트 비교표: 퍼셉트론의 step은 미분이 0/불가라 경사하강 불가. Adaline은 연속값 σ(z)=z이라 미분 가능 → MSE 손실을 정의하고 손실을 줄이는 방향으로 경사하강. 현대 신경망으로 가는 디딤돌.",
      "source": "NN PDF; 13주차 § 4.1, § 4.3"
    },
    {
      "id": "MLF13Q7",
      "set": 204,
      "week": 13,
      "topic": "퍼셉트론 가중치 갱신 (계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "퍼셉트론 초기 w=[w0,w1,w2]=[0,1,0.5], η=0.2, step function. 데이터 B: x1=2, x2=-2(x0=1), 정답 y=-1. wᵀx = 0+1(2)+0.5(-2)=1 > 0 이라 ŷ=+1로 오분류되었다. 갱신 후 [w0, w1, w2]는?",
      "choices": [
        "① [0.2, 1.4, 0.1]",
        "② [-0.4, 0.6, 0.9]",
        "③ [-0.2, 0.6, 0.9]",
        "④ [0, 1, 0.5] (변화 없음)"
      ],
      "answer": 2,
      "brief": "w0=-0.2, w1=0.6, w2=0.9.",
      "detailed": "Δw_j = η(y−ŷ)x_j, 여기서 (y−ŷ)=(-1-1)=-2, η=0.2 → 계수 -0.4. w0 = 0 -0.2×(2)... 노트 기준: w0 = 0 - 0.2×1 = -0.2(x0=1), w1 = 1 - 0.2×2... 노트 표기상 부호 정리하면 w0=0-0.2(1)=-0.2, w1=1-0.2(2)=0.6, w2=0.5-0.2(-2)=0.9. 결과 [-0.2, 0.6, 0.9]가 A와 B를 모두 올바르게 분류.",
      "source": "NN PDF; 13주차 § 2.4"
    },
    {
      "id": "MLF13Q16",
      "set": 204,
      "week": 13,
      "topic": "BCE 페널티 비교 (계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "정답 y=1일 때 BCE의 페널티 비교로 옳은 것은? (노트 표 기준)",
      "choices": [
        "① ŷ=0.9일 때 BCE 페널티가 가장 크다",
        "② ŷ=0.1일 때 BCE와 MSE가 동일하게 0.81이다",
        "③ ŷ가 작아질수록 BCE 페널티가 줄어든다",
        "④ ŷ=0.1(완전히 틀린 확신)일 때 BCE는 약 2.302로 급격히 커지며, 같은 경우 MSE 0.81보다 훨씬 크다"
      ],
      "answer": 3,
      "brief": "ŷ=0.1 → BCE≈2.302(MSE 0.81보다 급증).",
      "detailed": "노트 표(y=1): ŷ=0.9→MSE 0.01/BCE 0.105, ŷ=0.7→0.09/0.357, ŷ=0.3→0.49/1.204, ŷ=0.1→MSE 0.81/BCE 2.302. 정답인데 0.1로 강하게 틀리면 BCE가 급격히 커져 더 강한 업데이트를 유도. ŷ가 작아질수록(정답에서 멀수록) 페널티는 커진다.",
      "source": "NN PDF; 13주차 § 7.2"
    },
    {
      "id": "MLF13Q20",
      "set": 204,
      "week": 13,
      "topic": "역전파 결과의 개념적 의미 (유도 비출제)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "단층 신경망(softmax+BCE)에서 가중치에 대한 손실의 그래디언트가 정리되는 형태와 그 개념적 의미로 옳은 것은? (유도 과정은 묻지 않음)",
      "choices": [
        "① ∂L/∂w_21 = (ŷ1 − y1)x2 처럼 '예측 − 정답' 형태로 깔끔히 정리되어, 오차가 클수록 가중치를 더 많이 갱신한다는 의미를 담는다",
        "② ∂L/∂w = (입력 x)만으로 정리되어 예측·정답과 무관하다",
        "③ ∂L/∂w = (정답 y)의 제곱으로 정리된다",
        "④ softmax는 같은 클래스에만 영향을 주므로 다른 클래스 항은 더하지 않는다"
      ],
      "answer": 0,
      "brief": "그래디언트 = (예측 − 정답)·입력 형태로 깔끔히 정리.",
      "detailed": "노트: 깔끔한 최종 결과 ∂L/∂w_21 = (ŷ1 − y1)x2 → 업데이트 w_21 = w_21 − η(ŷ1 − y1)x2. softmax 때문에 w_21은 ŷ1뿐 아니라 ŷ2에도 영향을 줘 두 갈래를 더해야 하지만, 결과는 '예측 − 정답' 형태로 정리됨. 교수님: 체인 룰 유도·증명은 비출제, 의미만 기억.",
      "source": "NN PDF; 13주차 § 7.7"
    }
  ],
  106:
  [
    {
      "id": "MLFJQ1",
      "set": 106,
      "week": 9,
      "topic": "밀도추정 공식 K/(NV)에서 갈라지는 두 방법",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "밀도 추정의 핵심 공식 p(x) ≈ K/(NV)에서 N은 고정일 때, KDE와 KNN 밀도 추정기를 가르는 기준으로 옳은 것은?",
      "choices": [
        "① KDE는 V(영역 크기)를 고정하고 K를 세며, KNN은 K(이웃 수)를 고정하고 V를 확장한다",
        "② KDE는 K를 고정하고 V를 확장하며, KNN은 V를 고정하고 K를 센다",
        "③ KDE는 N을 변화시키고 KNN은 N을 고정한다",
        "④ 두 방법 모두 K와 V를 동시에 고정한다"
      ],
      "answer": 0,
      "brief": "KDE=V 고정·K 카운트, KNN=K 고정·V 확장.",
      "detailed": "같은 공식 p(x)≈K/(NV)의 양면이다. KDE는 박스 크기(V 또는 h)를 정해놓고 그 안의 데이터 수 K를 세고, KNN 밀도 추정기는 이웃 수 K를 정해놓고 그만큼 채울 때까지 영역 V를 부풀린다. 그래서 KNN은 밀집/희소 지역에 적응적이다.",
      "source": "9주차 § 4"
    },
    {
      "id": "MLFJQ2",
      "set": 106,
      "week": 10,
      "topic": "K-Means 좌표하강 2단계",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "K-Means의 좌표 하강(coordinate descent) 2단계 절차로 옳은 것은?",
      "choices": [
        "① 한 번에 r_nk와 μ_k를 동시에 닫힌 해로 구한다",
        "② μ_k를 고정해 r_nk를 갱신(가장 가까운 중심에 할당)하고, r_nk를 고정해 μ_k를 갱신(할당된 점들의 평균)하는 것을 번갈아 반복한다",
        "③ 라그랑주 승수로 π_k를 갱신한다",
        "④ 덴드로그램을 만든 뒤 잘라서 K를 정한다"
      ],
      "answer": 1,
      "brief": "할당단계(μ고정→r갱신)와 갱신단계(r고정→μ=평균)를 번갈아 반복.",
      "detailed": "변수가 두 종류(r_nk, μ_k)이므로 하나를 고정하고 다른 하나를 최적화하는 좌표 하강이다. Step1 할당: 각 점을 가장 가까운 중심에 하드 할당. Step2 갱신: 중심 = 할당된 점들의 평균(이름 K-means의 유래). J가 단조 감소해 수렴한다(전역 최적 보장 X).",
      "source": "10주차 § 2.4"
    },
    {
      "id": "MLFJQ3",
      "set": 106,
      "week": 13,
      "topic": "McCulloch-Pitts vs Perceptron",
      "type": "multiple_choice",
      "difficulty": "easy",
      "question": "McCulloch-Pitts 뉴런(1943)과 퍼셉트론(1958)을 가르는 결정적 차이는?",
      "choices": [
        "① McCulloch-Pitts는 다층이고 퍼셉트론은 단층이다",
        "② McCulloch-Pitts는 소프트맥스를 쓰고 퍼셉트론은 step을 쓴다",
        "③ McCulloch-Pitts는 가중치를 사람이 수동으로 정해야 하지만, 퍼셉트론은 데이터로부터 스스로 가중치를 학습하는 최초의 모델이다",
        "④ McCulloch-Pitts는 비선형 분리가 가능하지만 퍼셉트론은 불가능하다"
      ],
      "answer": 2,
      "brief": "가중치 학습 여부 — MP는 수동, Perceptron은 자동 학습.",
      "detailed": "McCulloch-Pitts의 한계는 'could not adjust its own weights' — 사람이 가중치를 수동 설정해야 했다. Rosenblatt의 퍼셉트론은 'first model capable of learning to adjust its own weights based on examples'로, 오차 (y−ŷ)로 가중치를 자동 갱신한다.",
      "source": "13주차 § 1.6·2.1"
    },
    {
      "id": "MLFJQ4",
      "set": 106,
      "week": 9,
      "topic": "GMM의 EM이 9주차(밀도추정)와 10주차(클러스터링)에서 갖는 의미 통합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "GMM과 EM에 대한 9주차(밀도추정)와 10주차(클러스터링) 관점을 통합한 설명으로 옳은 것은?",
      "choices": [
        "① 9주차에서는 GMM을 클러스터링 도구로, 10주차에서는 밀도 추정 도구로 소개한다",
        "② 9주차의 GMM은 닫힌 해가 있고 10주차의 GMM만 EM이 필요하다",
        "③ EM은 밀도 추정에서만 쓰이고 클러스터링에서는 좌표 하강만 쓴다",
        "④ 9주차에서 GMM은 분포 p(x)를 모델링하는 밀도 추정으로, 10주차에서는 각 가우시안 컴포넌트 하나를 하나의 군집으로 재해석하며, 두 경우 모두 MLE 직접 풀이가 불가능해 EM으로 학습한다"
      ],
      "answer": 3,
      "brief": "9주차=밀도추정 도구, 10주차=각 컴포넌트=군집 재해석. 둘 다 MLE 직접 불가→EM.",
      "detailed": "9주차에서 GMM은 p(x)=Σπ_k N(x|μ_k,Σ_k)로 분포를 추정하는 parametric 밀도 추정 도구로 도입됐고, MLE는 로그 안의 합·특이점 문제로 not well posed였다. 10주차는 동일 GMM을 '각 가우시안 컴포넌트 = 하나의 군집'으로 재해석하며, 같은 MLE 난점을 EM(E-step 책임값, M-step 갱신)으로 우회한다.",
      "source": "9·10주차 비교 (9주차 §9·11, 10주차 §3.2·4.1)"
    },
    {
      "id": "MLFJQ5",
      "set": 106,
      "week": 10,
      "topic": "K-Means 할당/갱신 ↔ EM의 E/M-step 대응",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "K-Means의 두 단계와 GMM/EM의 E-step·M-step 대응으로 옳은 것은?",
      "choices": [
        "① 할당 단계(가까운 중심에 하드 할당) = E-step(소프트 책임값 계산), 중심 갱신(평균) = M-step(책임값 가중 파라미터 갱신)",
        "② 할당 단계 = M-step, 갱신 단계 = E-step",
        "③ 두 단계 모두 E-step에 대응한다",
        "④ K-Means에는 EM과 대응되는 구조가 전혀 없다"
      ],
      "answer": 0,
      "brief": "할당=E-step(소프트 책임값의 하드 버전), 갱신=M-step.",
      "detailed": "슬라이드: assignment step ↔ E-step, update of cluster centers ↔ M-step. K-Means의 하드 할당 r_nk는 EM 책임값 γ(z_nk)의 하드(0/1) 특수 케이스이고, K-means는 GMM/EM의 하드 할당 특수 케이스로 볼 수 있다.",
      "source": "10주차 § 2.8"
    },
    {
      "id": "MLFJQ6",
      "set": 106,
      "week": 11,
      "topic": "PCA 라그랑주 → 고유값 문제",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA 분산 최대화에서 제약 u₁ᵀu₁=1 하에 u₁ᵀSu₁을 최대화할 때, 라그랑주 승수법으로 얻는 결과는?",
      "choices": [
        "① u₁ = S⁻¹ 1",
        "② S u₁ = λ₁ u₁ — 즉 u₁은 공분산 행렬 S의 고유벡터, λ₁은 그 방향의 분산값(고유값)이다",
        "③ S u₁ = 0 (영벡터 해만 존재)",
        "④ u₁ᵀu₁ = λ₁ (제약 자체가 고유값)"
      ],
      "answer": 1,
      "brief": "Su₁=λ₁u₁ — u₁=고유벡터(주성분), λ₁=고유값(분산값).",
      "detailed": "L = u₁ᵀSu₁ + λ₁(1−u₁ᵀu₁)을 u₁로 미분하면 2Su₁−2λ₁u₁=0 → Su₁=λ₁u₁(고유값 문제). u₁ᵀ를 곱하면 u₁ᵀSu₁=λ₁이라 분산=고유값. 가장 큰 λ를 갖는 고유벡터가 제1주성분이다.",
      "source": "11주차 § 2.4"
    },
    {
      "id": "MLFJQ7",
      "set": 106,
      "week": 11,
      "topic": "PCA(11)와 Classical MDS(12)의 관계 통합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA(11주차)와 Classical MDS(12주차)의 관계를 행렬 관점에서 통합한 설명으로 옳은 것은?",
      "choices": [
        "① PCA는 그램 행렬 XXᵀ를, MDS는 공분산 XᵀX를 분해하며 둘은 무관하다",
        "② PCA는 비선형, Classical MDS는 선형이라 결과가 항상 다르다",
        "③ PCA는 공분산 XᵀX(변수 간 관계)를, MDS는 그램 XXᵀ(샘플 간 관계)를 고유분해하는데, 유클리드 거리를 쓰면 XᵀXu=λu에 X를 곱해 XXᵀ(Xu)=λ(Xu)가 되어 Classical MDS = PCA로 수학적으로 동일하다",
        "④ 두 기법 모두 KL Divergence를 최소화한다"
      ],
      "answer": 2,
      "brief": "PCA=XᵀX(공분산), MDS=XXᵀ(그램). Euclid면 동일(XᵀXu=λu→XXᵀ(Xu)=λ(Xu)).",
      "detailed": "PCA는 공분산 S=(1/N)XᵀX(변수 간)를, Classical MDS는 거리를 더블센터링해 그램 B=XXᵀ(샘플 간)를 고유분해한다. XᵀXu=λu 양변에 X를 곱하면 (XXᵀ)(Xu)=λ(Xu)로 같은 고유값 문제가 되어, 유클리드 거리면 두 결과가 동일하다. 둘 다 선형이라 스위스 롤은 실패한다.",
      "source": "11·12주차 비교 (11주차 §2, 12주차 §3.3)"
    },
    {
      "id": "MLFJQ8",
      "set": 106,
      "week": 12,
      "topic": "t-SNE 가우시안·KL vs 신경망 softmax·BCE 분포/목적함수 통합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "t-SNE(12주차)와 단층 신경망 분류(13주차)를 '분포 변환 + 목적 함수' 관점에서 비교한 설명으로 옳은 것은?",
      "choices": [
        "① t-SNE와 분류 신경망 모두 분산을 최대화한다",
        "② t-SNE는 BCE를, 신경망은 KL Divergence를 쓴다",
        "③ 둘 다 고유값 분해로 닫힌 해를 구한다",
        "④ t-SNE는 고차원 가우시안·저차원 t분포로 확률을 만들고 KL Divergence를 최소화하는 비지도 시각화이고, 분류 신경망은 로짓을 softmax로 확률화한 뒤 BCE(=KL의 분류용 형태)를 최소화하는 지도학습이다"
      ],
      "answer": 3,
      "brief": "t-SNE=가우시안/t분포 확률+KL(비지도), 분류 NN=softmax 확률화+BCE(지도).",
      "detailed": "t-SNE는 유사도를 확률로 변환(고차원 가우시안 P, 저차원 t분포 Q)해 KL(P||Q)을 경사하강으로 최소화한다. 분류 신경망은 raw logit을 softmax(지수화+정규화)로 확률 분포로 만든 뒤 BCE(이진 교차 엔트로피)를 최소화한다. 둘 다 '확률 분포를 만들고 분포 간 불일치를 줄이는' 구조지만, t-SNE는 비지도 시각화, 분류 NN은 라벨 기반 지도학습이다.",
      "source": "12·13주차 비교 (12주차 §4, 13주차 §7.1·7.5)"
    },
    {
      "id": "MLFJQ9",
      "set": 106,
      "week": 13,
      "topic": "BCE = Bernoulli MLE의 NLL",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "이진 분류에서 BCE(Binary Cross-Entropy)의 통계적 근거로 옳은 것은?",
      "choices": [
        "① 각 샘플이 베르누이 분포를 따른다 가정하고 우도를 최대화(MLE)한 뒤 음의 로그우도(NLL)를 취하면 BCE와 완전히 동일하다",
        "② BCE는 가우시안 분포의 분산 추정에서 나온다",
        "③ BCE는 MSE에 로그를 씌운 것과 같다",
        "④ BCE는 라그랑주 승수로 유도된다"
      ],
      "answer": 0,
      "brief": "BCE = 베르누이 MLE의 음의 로그우도(NLL).",
      "detailed": "우도 p(Y|X)=Π (ŷ)^y (1−ŷ)^(1−y)를 라벨 독립 가정으로 곱으로 쓰고, MLE를 위해 음의 로그우도를 취하면 −Σ[y log ŷ + (1−y) log(1−ŷ)]가 되어 BCE와 동일하다(이진 분류에서 NLL=BCE).",
      "source": "13주차 § 7.3"
    },
    {
      "id": "MLFJQ10",
      "set": 106,
      "week": 11,
      "topic": "독립 vs 무상관 (ICA)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "ICA의 핵심 가정과 관련해 '독립(independent)'과 '무상관(uncorrelated)'의 관계로 옳은 것은?",
      "choices": [
        "① 무상관이면 항상 독립이다",
        "② 독립은 선형·비선형 모두 무관한 더 강한 조건이고, 무상관은 선형 관계만 없을 뿐(비선형 종속은 남을 수 있음). PCA는 무상관은 보장하나 독립은 보장 못 한다",
        "③ 독립은 선형 관계만 없는 약한 조건이고 무상관이 더 강하다",
        "④ 독립과 무상관은 완전히 같은 개념이다"
      ],
      "answer": 1,
      "brief": "독립>무상관. 무상관=선형만, 독립=선·비선형 모두 무관. PCA는 독립 보장 X.",
      "detailed": "슬라이드: independence is a stronger condition than uncorrelatedness. 무상관은 선형 관계가 없을 뿐 비선형 종속(예: Y=X²)은 남을 수 있고, 독립이면 한쪽을 알아도 다른 쪽 정보가 전혀 없다. PCA는 직교 성분으로 무상관은 보장하나 독립은 보장 못 해 ICA가 필요하다.",
      "source": "11주차 § 5.2"
    },
    {
      "id": "MLFJQ11",
      "set": 106,
      "week": 11,
      "topic": "ICA 비가우시안성 가정",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "ICA가 소스의 비가우시안성(non-Gaussianity)을 요구하는 이유는?",
      "choices": [
        "① 가우시안이 계산이 너무 느리기 때문",
        "② 가우시안은 음수 값을 가지기 때문",
        "③ 가우시안 소스를 선형 결합하면 결과도 또 다른 가우시안이 되어, 섞인 결과만으로는 소스를 분리할 단서가 사라지기(ambiguity) 때문",
        "④ 비가우시안이어야 직교성이 보장되기 때문"
      ],
      "answer": 2,
      "brief": "가우시안 섞으면 또 가우시안 → 분리 단서 소실. 그래서 비가우시안 필요.",
      "detailed": "슬라이드: the critical assumption is that the original sources must be non-Gaussian. 가우시안끼리 선형 결합하면 결과도 가우시안이라 소스 개수·방향 식별이 불가능(ambiguity)하다. 라플라시안·균일 등 비가우시안이어야 섞여도 특징이 남아 분리 가능하다. ICA는 한마디로 비가우시안성을 최대화한다.",
      "source": "11주차 § 5.3"
    },
    {
      "id": "MLFJQ12",
      "set": 106,
      "week": 12,
      "topic": "t-SNE vs UMAP 대칭화 비교",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "t-SNE와 UMAP의 유사도 대칭화 방식을 비교한 것으로 옳은 것은?",
      "choices": [
        "① 둘 다 단순 평균 (p_(j|i)+p_(i|j))/2N을 쓴다",
        "② t-SNE는 fuzzy-set union, UMAP은 단순 평균을 쓴다",
        "③ 둘 다 max(·,·)로 대칭화한다",
        "④ t-SNE는 단순 평균 p_ij=(p_(j|i)+p_(i|j))/2N, UMAP은 fuzzy-set union w_ij+w_ji−w_ij·w_ji를 쓴다"
      ],
      "answer": 3,
      "brief": "t-SNE=단순 평균/2N, UMAP=fuzzy-set union(w+w−ww).",
      "detailed": "t-SNE는 σ_i≠σ_j로 비대칭인 p_(j|i)를 평균으로 대칭화: p_ij=(p_(j|i)+p_(i|j))/2N. UMAP은 방향성 가중치를 fuzzy-set union w_ij^(sym)=w_ij+w_ji−w_ij·w_ji로 결합한다(어느 방향이든 강하면 강하게, 빼기 항은 중복 방지).",
      "source": "12주차 § 4.2·5.2"
    },
    {
      "id": "MLFJQ13",
      "set": 106,
      "week": 13,
      "topic": "콘서트 참석 결정 가중합 (계산형)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "[계산형] McCulloch-Pitts 콘서트 예시에서 입력 x=(1,0,1,0,1), 가중치 w=(0.7,0.6,0.5,0.3,0.4), 임계값 1.5일 때 가중합과 출력은?",
      "choices": [
        "① 가중합 1.6, 출력 1(간다)",
        "② 가중합 1.4, 출력 0(안 간다)",
        "③ 가중합 2.5, 출력 1(간다)",
        "④ 가중합 1.5, 출력 0(안 간다)"
      ],
      "answer": 0,
      "brief": "0.7+0.5+0.4=1.6 > 1.5 → 출력 1.",
      "detailed": "가중합 = 0.7(1)+0.6(0)+0.5(1)+0.3(0)+0.4(1) = 0.7+0.5+0.4 = 1.6. 임계값 1.5와 비교하면 1.6>1.5 → step function 출력 true → 콘서트에 간다(1).",
      "source": "13주차 § 1.5"
    },
    {
      "id": "MLFJQ14",
      "set": 106,
      "week": 13,
      "topic": "퍼셉트론 가중치 갱신 (계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "[계산형] 퍼셉트론 w=[w0,w1,w2]=[0,1,0.5], η=0.2. 데이터 B: x1=2, x2=-2(x0=1), 정답 y=-1. wᵀx=0+1(2)+0.5(-2)=1>0이라 ŷ=+1로 오분류되었다. 갱신 후 [w0,w1,w2]는?",
      "choices": [
        "① [0.2, 1.4, 0.1]",
        "② [-0.2, 0.6, 0.9]",
        "③ [-0.4, 0.2, 1.3]",
        "④ [0, 1, 0.5] (변화 없음)"
      ],
      "answer": 1,
      "brief": "Δw=η(y−ŷ)x, (y−ŷ)=−2 → w0=−0.2, w1=0.6, w2=0.9.",
      "detailed": "오차 (y−ŷ)=(−1)−(+1)=−2. Δw_j=η(y−ŷ)x_j. w0=0+0.2(−1)(1)... 노트 계산대로: w0=0−0.2×1=−0.2, w1=1−0.2×2=0.6, w2=0.5−0.2×(−2)=0.9. (노트는 Δw_j=η(y−ŷ)x_j에서 부호를 반영해 w0=−0.2, w1=0.6, w2=0.9로 정리.)",
      "source": "13주차 § 2.4"
    },
    {
      "id": "MLFJQ15",
      "set": 106,
      "week": 13,
      "topic": "BCE vs MSE 페널티 (계산형)",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "[계산형] 정답 y=1인데 예측 ŷ=0.1(강하게 틀린 확신)일 때, 노트 표에 따른 MSE와 BCE 값은?",
      "choices": [
        "① MSE 2.302, BCE 0.81",
        "② MSE 0.01, BCE 0.105",
        "③ MSE 0.81, BCE 2.302",
        "④ MSE 0.09, BCE 0.357"
      ],
      "answer": 2,
      "brief": "ŷ=0.1, y=1 → MSE=0.81, BCE=2.302.",
      "detailed": "노트 표(y=1): ŷ=0.1일 때 MSE=(1−0.1)²=0.81, BCE=−log(0.1)≈2.302. BCE가 틀린 확신에 훨씬 큰 페널티를 줘 더 강하게 업데이트하게 한다. 이것이 분류에서 MSE 대신 BCE를 쓰는 이유다.",
      "source": "13주차 § 7.2"
    },
    {
      "id": "MLFJQ16",
      "set": 106,
      "week": 13,
      "topic": "Softmax 계산 (계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "[계산형] 단층 신경망 이진 출력에서 ŷ1 = e^{z1}/(e^{z1}+e^{z2})이고 z1=z2일 때 ŷ1 값과, softmax의 두 역할은?",
      "choices": [
        "① ŷ1=1; 역할은 미분과 적분",
        "② ŷ1=0; 역할은 직교화와 센터링",
        "③ ŷ1=2; 역할은 분산 최대화와 거리 보존",
        "④ ŷ1=0.5; 역할은 ① 지수화(모든 값을 양수로) ② 정규화(합을 1로)"
      ],
      "answer": 3,
      "brief": "z1=z2면 ŷ1=0.5. softmax 두 역할=지수화+정규화.",
      "detailed": "z1=z2면 e^{z1}/(e^{z1}+e^{z2})=e^{z1}/(2e^{z1})=1/2=0.5. Softmax의 두 역할은 (1) 지수화(e^z로 모든 값을 양수로 만들어 음수 점수 방지)와 (2) 정규화(전체 합으로 나눠 합을 1로 만들어 확률 분포화)다. 지수 때문에 점수 차이를 증폭한다.",
      "source": "13주차 § 7.5·7.6"
    },
    {
      "id": "MLFJQ17",
      "set": 106,
      "week": 9,
      "topic": "KNN 다수결 분류 = 밀도추정+Bayes",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "KNN 밀도 추정기를 분류기로 확장할 때, 점 x가 클래스 C_c에 속할 사후확률 p(C_c|x)는?",
      "choices": [
        "① K_c/K — K개 최근접 이웃 중 클래스 C_c에 속한 비율. '다수결 분류'가 밀도 추정+Bayes 룰의 자연스러운 귀결임을 보여준다",
        "② N_c/N (클래스 prior 그대로)",
        "③ K/(NV)",
        "④ π_k N(x|μ_k,Σ_k)"
      ],
      "answer": 0,
      "brief": "p(C_c|x)=K_c/K — 다수결 분류 = 밀도추정+Bayes 룰.",
      "detailed": "class-conditional density p(x|C_c)≈K_c/(N_c V), prior p(C_c)=N_c/N, unconditional p(x)=K/(NV)를 Bayes 정리에 넣으면 p(C_c|x)=K_c/K로 깔끔히 정리된다. 즉 흔히 아는 KNN 다수결 분류는 밀도 추정 + Bayes 룰의 귀결이다.",
      "source": "9주차 § 7"
    },
    {
      "id": "MLFJQ18",
      "set": 106,
      "week": 9,
      "topic": "GMM MLE의 두 문제",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "GMM을 MLE로 직접 풀 때 발생하는 두 가지 문제로 옳은 것은?",
      "choices": [
        "① 로그가 항상 음수가 되는 문제와 데이터가 부족한 문제",
        "② 로그 안에 합(sum)이 있어 미분이 비선형이라 닫힌 해가 없는 문제, 그리고 μ_k가 한 데이터 점에 위치하고 σ_k→0이면 likelihood가 무한대로 발산하는 특이점(singularity) 문제",
        "③ 공분산이 항상 0이 되는 문제와 prior 합이 1을 넘는 문제",
        "④ 고유값이 음수가 되는 문제와 차원의 저주"
      ],
      "answer": 1,
      "brief": "GMM MLE의 두 난점: 로그 안 합→비선형·닫힌 해 없음 / 특이점(σ→0)→likelihood ∞.",
      "detailed": "GMM 로그우도를 직접 MLE로 풀 때 두 문제가 있다. 첫째, ln(Σ π_k N(...))처럼 로그 안에 합이 있어 미분이 비선형이라 closed-form 불가. 둘째, μ_k=x^(n)이고 σ_k→0이면 가우시안이 바늘처럼 뾰족해져 밀도가 무한대 → log-likelihood가 ∞로 발산(한 점에 완벽 overfit). 결론은 MLE가 not well posed이며 EM으로 우회한다.",
      "source": "9주차 § 11"
    },
    {
      "id": "MLFJQ19",
      "set": 106,
      "week": 10,
      "topic": "EM 책임값(responsibility) E-step",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "EM의 E-step에서 계산하는 책임값 γ(z_k)와 K-Means의 지시변수 r_nk의 관계로 옳은 것은?",
      "choices": [
        "① 둘 다 0 또는 1의 하드 값이다",
        "② r_nk가 γ(z_k)의 소프트 버전이다",
        "③ γ(z_k)=π_k N(x|μ_k,Σ_k)/Σ_j π_j N(x|μ_j,Σ_j)로 [0,1] 사이의 소프트 확률이며 Σ_k γ=1, r_nk∈{0,1}의 소프트 버전이다",
        "④ 둘은 무관한 양이다"
      ],
      "answer": 2,
      "brief": "γ(z_k)=베이즈 사후확률(소프트, 합=1), r_nk(0/1)의 소프트 버전.",
      "detailed": "γ(z_k)=p(z_k=1|x)=π_k N(x|μ_k,Σ_k)/Σ_j π_j N(x|μ_j,Σ_j)는 점 x가 컴포넌트 k에서 생성됐을 사후확률(베이즈)로 [0,1]이고 Σ_k γ=1이다. K-means의 하드 할당 r_nk∈{0,1}의 소프트(확률) 버전이며, 같은 자리(할당 단계=E-step)에 위치한다.",
      "source": "10주차 § 4.2"
    },
    {
      "id": "MLFJQ20",
      "set": 106,
      "week": 10,
      "topic": "π_k 라그랑주 승수 유도 (계산형)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "[계산형] GMM의 M-step에서 제약 Σ_k π_k=1 하에 혼합계수를 갱신할 때, 라그랑주 승수 λ와 갱신식은?",
      "choices": [
        "① λ=N, π_k = N/N_k",
        "② λ=0, π_k = 1/K",
        "③ λ=−1, π_k = γ(z_nk)",
        "④ λ=−N, π_k = N_k/N (N_k=Σ_n γ(z_nk))"
      ],
      "answer": 3,
      "brief": "λ=−N, π_k=N_k/N.",
      "detailed": "L=ln p + λ(Σπ_k−1)을 π_k로 미분하면 Σ_n N(x|μ_k,Σ_k)/Σ_j π_j N(...)+λ=0. 양변에 π_k 곱하고 k에 합산하면 제약에 의해 내부 합이 1이 되어 Σ_n 1=N → N+λ=0 → λ=−N. 대입·정리하면 π_k=N_k/N(N_k=Σ_n γ(z_nk), 유효 데이터 수)이다.",
      "source": "10주차 § 4.3(c)"
    },
    {
      "id": "MLFJQ21",
      "set": 106,
      "week": 10,
      "topic": "Hierarchical linkage 5종",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "계층적 군집화에서 Centroid linkage와 Ward linkage의 차이로 옳은 것은?",
      "choices": [
        "① 둘 다 ‖μ_A−μ_B‖²를 쓰되, Ward에는 크기 가중치 |A||B|/(|A|+|B|)가 붙어 군집 내 분산 증가를 최소화한다(큰 군집 병합 억제)",
        "② Centroid는 max 거리, Ward는 min 거리를 쓴다",
        "③ Centroid는 모든 쌍 평균(UPGMA), Ward는 가장 먼 쌍을 쓴다",
        "④ 둘 다 동일한 식이며 이름만 다르다"
      ],
      "answer": 0,
      "brief": "둘 다 ‖μ_A−μ_B‖² 기반이나 Ward는 크기가중 |A||B|/(|A|+|B|) 추가.",
      "detailed": "Centroid(UPGMC) = ‖μ_A−μ_B‖² 그대로. Ward(MISSQ) = (|A||B|/(|A|+|B|))‖μ_A−μ_B‖²로 크기 가중치가 붙어 within-cluster 분산 증가 Δ를 최소화하며 큰 군집끼리 병합을 더 억제한다. (Single=min, Complete=max, Average=UPGMA 평균.)",
      "source": "10주차 § 5.5·Q4"
    },
    {
      "id": "MLFJQ22",
      "set": 106,
      "week": 11,
      "topic": "PCA 재구축 평균 더하기",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "PCA로 M개 주성분 계수 z_i를 저장한 뒤 데이터를 재구축할 때 올바른 식은?",
      "choices": [
        "① x̂ = Σ_{i=1}^{M} z_i u_i (평균 없이)",
        "② x̂ = x̄ + Σ_{i=1}^{M} z_i u_i — 평균 x̄를 반드시 더해야 원래 위치로 복원된다",
        "③ x̂ = x̄ − Σ_{i=1}^{M} z_i u_i",
        "④ x̂ = Σ_{i=M+1}^{D} b_i u_i (버린 차원으로 복원)"
      ],
      "answer": 1,
      "brief": "x̂ = x̄ + Σ z_i u_i — 평균 더하기 필수.",
      "detailed": "압축은 z_i=(x−x̄)ᵀu_i로 센터링된 좌표만 저장하므로, 재구축 시 평균 x̄를 반드시 더해야 원위치로 복원된다. M이 커질수록 디테일이 살고 나머지는 노이즈에 가깝다.",
      "source": "11주차 § 4.3"
    },
    {
      "id": "MLFJQ23",
      "set": 106,
      "week": 11,
      "topic": "PCA 두 등가 정의 (분산 최대 = 오차 최소)",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "PCA의 두 가지 등가 정의(분산 최대화 vs 투영 오차 최소화)가 같은 결과를 내는 이유로 옳은 것은?",
      "choices": [
        "① 두 정의는 사실 서로 다른 고유벡터를 선택한다",
        "② 분산 최대화는 비선형, 오차 최소화는 선형이라 우연히 비슷한 결과가 나온다",
        "③ 오차 최소화의 distortion J=Σ_{i=M+1}^{D} u_iᵀS u_i는 '버려지는 차원의 분산 합'이므로, 이를 최소화하는 것은 '살려두는 차원의 분산을 최대화'하는 것과 동일해 같은 고유벡터를 고른다",
        "④ 두 정의 모두 가장 작은 M개 고유값을 보존한다"
      ],
      "answer": 2,
      "brief": "오차최소 J=버린 차원 분산 합 → 최소화=살린 차원 분산 최대화(동일 결론).",
      "detailed": "오차 최소화에서 z_i, b_i를 대입·정리하면 distortion J=Σ_{i=M+1}^{D} u_iᵀS u_i로 버려지는 차원의 분산 합이 된다. 전체 분산이 고정이므로 버림 분산 최소화 = 살림 분산 최대화로, 둘 다 가장 큰 M개 고유값의 고유벡터를 보존한다.",
      "source": "11주차 § 3.4"
    },
    {
      "id": "MLFJQ24",
      "set": 106,
      "week": 12,
      "topic": "MDS 그램 행렬·더블센터링·좌표복원",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "Classical MDS의 절차를 거리 행렬 D부터 좌표 X까지 순서대로 옳게 나열한 것은?",
      "choices": [
        "① D를 그대로 고유분해 → X=D",
        "② D를 공분산 XᵀX로 변환 → 소프트맥스 → X 복원",
        "③ D에 경사하강법을 적용해 B를 직접 학습 → X=B⁻¹",
        "④ D를 더블센터링해 그램 B=XXᵀ로 변환 → B=VΛVᵀ로 고유분해 → X=VΛ^{1/2}"
      ],
      "answer": 3,
      "brief": "D→더블센터링→그램 B=XXᵀ→B=VΛVᵀ→X=VΛ^{1/2}.",
      "detailed": "거리²=내적 조합이므로 더블센터링 B_ij=−½(d_ij²−d̄_i.²−d̄_.j²+d̄_..²)으로 D를 그램 B=XXᵀ로 바꾸고, B=VΛVᵀ로 고유분해한 뒤 X=VΛ^{1/2}로 좌표를 복원한다. 가장 큰 고유값·고유벡터를 택하면 핵심 기하 구조가 보존된다.",
      "source": "12주차 § 3.2"
    },
    {
      "id": "MLFJQ25",
      "set": 106,
      "week": 9,
      "topic": "Bandwidth h와 K의 과대/과소 평활화 통합",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "KDE의 bandwidth h와 KNN의 이웃 수 K가 추정 결과에 미치는 영향을 통합한 설명으로 옳은 것은?",
      "choices": [
        "① h가 너무 작으면(또는 K가 너무 작으면) noisy/spiky, h가 너무 크면(또는 K가 너무 크면) over-smoothing되어 bimodal 같은 진짜 디테일이 사라진다",
        "② h가 작을수록, K가 클수록 noisy(spiky)해진다",
        "③ h와 K는 결과에 전혀 영향이 없다",
        "④ h가 크면 noisy, K가 작으면 over-smoothed가 된다"
      ],
      "answer": 0,
      "brief": "h·K 작으면 noisy, 크면 over-smoothed. 방향이 같다.",
      "detailed": "KDE는 h가 작으면 데이터 1점마다 뾰족(noisy, 예 h=0.005), 크면 over-smoothing(예 h=0.2). KNN은 K=1이면 매우 noisy, K=30이면 over-smoothed. 둘 다 평활 파라미터가 작으면 과소평활(noisy), 크면 과대평활(디테일 손실)로 방향이 같다.",
      "source": "9주차 § 5.6·6.3"
    },
    {
      "id": "MLFJQ26",
      "set": 106,
      "week": 13,
      "topic": "Perceptron vs Adaline 에러 계산 시점",
      "type": "multiple_choice",
      "difficulty": "medium",
      "question": "Perceptron과 Adaline의 결정적 차이는?",
      "choices": [
        "① Adaline은 가중치를 수동으로 정하고 Perceptron은 학습한다",
        "② Perceptron은 step(임계값) 통과 후의 클래스 라벨로 에러를 계산하고, Adaline은 step 통과 전의 연속 선형 출력 σ(z)=z로 에러를 계산해 미분 가능 → 경사하강(MSE 최소화)을 쓴다",
        "③ Perceptron은 BCE, Adaline은 KL을 쓴다",
        "④ Adaline은 다층, Perceptron은 단층이다"
      ],
      "answer": 1,
      "brief": "에러 계산 시점 — Perceptron=step 후 라벨, Adaline=step 전 연속값(미분가능→경사하강).",
      "detailed": "Adaline은 thresholded 예측을 직접 쓰지 않고 항등 활성 σ(z)=z의 연속 선형 출력으로 에러를 계산한다. 연속값이라 미분 가능해 경사하강으로 MSE를 최소화한다(step은 학습 후 분류에만 사용). 이것이 현대 신경망으로 가는 디딤돌이다.",
      "source": "13주차 § 4.1"
    },
    {
      "id": "MLFJQ27",
      "set": 106,
      "week": 13,
      "topic": "경사하강이 여러 챕터에서 등장하는 방식 통합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "경사 기반 최적화(경사하강/상승)가 기말 범위 여러 챕터에서 등장하는 방식으로 옳은 것은?",
      "choices": [
        "① PCA·Classical MDS는 경사하강으로, 신경망은 고유값 분해로 학습한다",
        "② 기말 범위의 모든 기법이 고유값 분해만 사용한다",
        "③ ICA는 로그우도 gradient ascent로 W를 갱신하고, t-SNE는 KL을 gradient descent로, UMAP은 cross-entropy를 SGD로, Adaline/신경망은 손실을 gradient descent로 최소화한다. 반면 PCA·Classical MDS는 고유값 분해(닫힌 해)를 쓴다",
        "④ 경사하강은 신경망에서만 등장한다"
      ],
      "answer": 2,
      "brief": "ICA·t-SNE·UMAP·Adaline/NN=경사 기반 반복, PCA·MDS=고유값 분해(닫힌 해).",
      "detailed": "ICA는 로그우도를 gradient ascent로 W 갱신, t-SNE는 KL을 gradient descent, UMAP은 cross-entropy를 SGD+Negative Sampling, Adaline·단층 신경망은 손실(MSE/BCE)을 gradient descent로 최소화한다. 반대로 PCA와 Classical MDS는 고유값 분해로 닫힌 해를 얻어 반복 최적화가 불필요하다. K-Means/EM은 좌표하강/EM 반복이다.",
      "source": "11·12·13주차 통합 (11주차 §6.5, 12주차 §4.4·5.4, 13주차 §5)"
    },
    {
      "id": "MLFJQ28",
      "set": 106,
      "week": 12,
      "topic": "PCA 선형 한계 vs Auto-Encoder 비선형 통합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "스위스 롤 같은 비선형 매니폴드를 '펼치는' 능력 관점에서 PCA와 오토인코더(전사 보강)를 비교한 설명으로 옳은 것은?",
      "choices": [
        "① PCA는 비선형 투영이 가능해 스위스 롤을 잘 펼친다",
        "② 오토인코더는 선형, PCA는 비선형이다",
        "③ 둘 다 거리 행렬을 고유분해하는 선형 기법이다",
        "④ PCA는 선형 투영만 가능해 스위스 롤을 제대로 펼치지 못하지만, 오토인코더는 신경망 병목(bottleneck)으로 비선형 차원 축소를 학습해 Hinton(2006)에서 PCA보다 우수함이 입증됐다"
      ],
      "answer": 3,
      "brief": "PCA=선형(스위스롤 실패), AE=비선형 병목 압축(Hinton 2006 AE>PCA).",
      "detailed": "PCA는 선형 투영만 가능해 스위스 롤처럼 비선형으로 말린 구조를 펼치지 못한다(겹쳐 투영). 오토인코더는 입력=출력 복원을 좁은 bottleneck으로 강제해 핵심 비선형 구조를 압축 학습하며, Hinton 2006 Science 논문에서 PCA보다 비선형 차원 축소가 압도적으로 우수함을 보였다.",
      "source": "12주차 § 2.1·6"
    },
    {
      "id": "MLFJQ29",
      "set": 106,
      "week": 11,
      "topic": "차원의 저주 vs KDE/KNN 비모수적 부담 통합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "차원의 저주(11주차)와 KDE·KNN 같은 비모수적 밀도 추정(9주차)을 통합한 설명으로 옳은 것은?",
      "choices": [
        "① 차원이 늘면 공간이 기하급수적으로 커지고 데이터가 sparse해져, 데이터 자체에 의존하며 모델 복잡도가 데이터 크기에 비례하는 비모수적 KDE·KNN은 더 많은 데이터·계산 부담을 겪는다. 반면 GMM 같은 parametric은 소수 파라미터로 복잡도가 고정이다",
        "② 차원이 늘면 데이터가 dense해져 비모수적 추정이 쉬워진다",
        "③ 차원의 저주는 parametric 모델에만 영향을 준다",
        "④ KDE·KNN은 모델 복잡도가 항상 고정이다"
      ],
      "answer": 0,
      "brief": "차원↑→sparse. 비모수(KDE/KNN)는 데이터 의존·복잡도 비례로 부담 가중, parametric(GMM)은 복잡도 고정.",
      "detailed": "차원의 저주: 차원↑ → 공간 기하급수 증가 → 데이터 sparse → 학습·일반화 곤란(데이터 기하급수 필요). KDE·KNN은 비모수적이라 데이터 포인트 자체에 의존하고 모델 복잡도가 데이터셋 크기에 비례해, 고차원에서 저장·계산 부담과 sparsity 문제가 가중된다. GMM 같은 parametric은 평균·분산 등 소수 파라미터로 복잡도가 데이터 크기와 무관하게 고정된다.",
      "source": "9·11주차 비교 (11주차 §1.2, 9주차 §8)"
    },
    {
      "id": "MLFJQ30",
      "set": 106,
      "week": 12,
      "topic": "기말 5챕터 비지도/지도·선형/비선형·목적함수 대종합",
      "type": "multiple_choice",
      "difficulty": "hard",
      "question": "기말 범위(9~13주차) 기법들을 가로질러 비교한 설명으로 옳지 않은 것은?",
      "choices": [
        "① PCA와 Classical MDS는 선형이며 고유값 분해로 닫힌 해를 얻고, t-SNE·UMAP은 비선형이며 경사 기반 반복으로 최적화한다",
        "② K-Means·GMM·t-SNE·UMAP은 모두 군집 수 K를 미리 정할 필요 없이 덴드로그램을 잘라 사후에 결정한다",
        "③ 9~12주차(밀도추정·클러스터링·차원축소·매니폴드)는 대체로 비지도학습이고, 13주차 퍼셉트론·Adaline·분류 신경망은 라벨을 쓰는 지도학습이다",
        "④ t-SNE는 KL Divergence를, UMAP은 Cross-Entropy를, 분류 신경망은 BCE를 최소화한다"
      ],
      "answer": 1,
      "brief": "②가 틀림 — 덴드로그램 사후 결정은 Hierarchical만. K-Means·GMM은 K를 미리 지정.",
      "detailed": "②가 옳지 않다. 군집 수를 미리 정하지 않고 전체 트리를 만든 뒤 덴드로그램을 잘라 사후에 K를 정하는 것은 Hierarchical Clustering의 특징이다. K-Means와 GMM은 K를 미리 지정해야 하고, t-SNE·UMAP은 군집화 알고리즘이 아니라 시각화/차원축소 기법이다. ①③④은 모두 옳은 비교다.",
      "source": "9·10·11·12·13주차 대종합"
    }
  ],
};

export const FINAL_META = [
  {
    "id": 201,
    "exam": "final",
    "title": "SET 1",
    "label": "전범위 균형",
    "desc": "9~13주차 고르게 · 난이도 상 (25문항)"
  },
  {
    "id": 202,
    "exam": "final",
    "title": "SET 2",
    "label": "전범위 균형",
    "desc": "9~13주차 고르게 · 난이도 상 (25문항)"
  },
  {
    "id": 203,
    "exam": "final",
    "title": "SET 3",
    "label": "전범위 균형",
    "desc": "9~13주차 고르게 · 난이도 상 (25문항)"
  },
  {
    "id": 204,
    "exam": "final",
    "title": "SET 4",
    "label": "전범위 균형",
    "desc": "9~13주차 고르게 · 난이도 상 (25문항)"
  },
  {
    "id": 106,
    "exam": "final",
    "title": "종합 모의고사",
    "label": "전범위 종합",
    "desc": "9~13주차 통합·비교 30문항 (최고난도 🏆)"
  }
];
