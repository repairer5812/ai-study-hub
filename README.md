# AI Study Hub

**🌐 배포: https://repairer5812.github.io/ai-study-hub/**

다과목 학습 허브 · 복습 노트 · 모의고사 · 주차별 확인문제 · 실시간 랭킹

> SW AI 융합정보대학원 61기 최경찬 · repairer5812@gmail.com

## 과목

| 과목 | 복습 노트 | 정기고사 | 주차별 확인문제 |
|------|---------|---------|----------------|
| 🤖 기계학습 | ✅ 1~7, 9~13주차 | ✅ 중간 5세트(150) · 기말 5세트(130) | ✅ 9~13주차 |
| 💻 딥러닝 | ✅ 1~10주차 + 예상문제·모범답안 | ✅ 중간 서술형 8세트 | ✅ 8주차 |
| 📊 자료구조 | ✅ 1~12차시 + 기말 INDEX | 중간 4세트 · 기말 준비 중 | ✅ 9~12차시 |
| 🔒 AI 보안기술 | 🔒 자료 수집 예정 | 🔒 | 🔒 |
| 📈 통계적학습개론 (2026-2) | 개념 지도 55개 | 종이로 푸는 중간고사 모의시험 1회(100점) | 주제별 문제 35문항 |

## 시험 갈래 (독립 점수 트랙)

- **정기고사 (중간/기말)** — 한 세트 전체 풀이, 세트별 랭킹 집계.
- **주차별 확인문제** — 주차 단위 객관식 20문제, 주차별 별도 점수·랭킹.
  · LocalStorage 키: `${prefix}:weekly:best:w${week}` 등으로 자동 격리.
  · Firebase 컬렉션: `leaderboards/${subjectId}_weekly_w${week}/entries`.

## 화면 구조

```
index.html                          ← 허브 (과목 카드 4개)
├─ subject.html?s=ml                ← 과목 랜딩 (정기고사 + 주차별 확인문제 그리드)
├─ review.html?s=ml&w=…             ← 주차별 복습 뷰어 (marked + KaTeX, 체크박스 저장)
├─ exam.html?s=ml&set=1             ← 정기고사 풀이
├─ exam.html?s=ml&kind=weekly&w=9   ← 주차별 확인문제 풀이
└─ result.html?…                    ← 결과·랭킹·오답 복기 (kind 파라미터로 분기)
```

## 주요 기능

### 학습 (복습)
- **주차별 md 뷰어**: 사이드바 + 본문 2단 구조
- **마크다운 렌더**: `marked.js` (GFM·체크박스)
- **수식 렌더**: `KaTeX` auto-render (`$...$`, `$$...$$`)
- **체크박스 진행도**: 각 문서의 체크리스트를 localStorage에 자동 저장
- **URL 딥링크**: `?s=dl&w=7주차_RNN_Recurrent_Neural_Networks`로 특정 노트 직진입

### 시험 (기계학습)
- **150문제 × 5세트** (Week 2~7 전범위 균형 배분)
- 2가지 풀이 모드 — 즉시 채점 / 일괄 채점
- 주관식 20개 (계산형 11 + 서술형 9)
- 해설 (간단·상세), 출처 표기
- 주차별 정답률 대시보드
- 오답노트 (세트별·전 세트 통합)
- 실시간 랭킹 — Firebase Firestore TOP 20
- 결과 이미지 저장 (html2canvas PNG)

## 아키텍처

### 프론트엔드
- Vanilla HTML + ES Modules (빌드 도구 없음)
- CSS 테마: `theme-bento.css`, `theme-dark.css`
- 과목별 모듈: `js/subjects/{sl,ml,dl,ds,sec}.js` + `index.js` 레지스트리
- 과목 추가 = 모듈 파일 하나 + 노트 폴더 + `SUBJECT_LIST` 등록

### 데이터
- 문제: `js/questions.js` (기계학습 150문제, 향후 과목별 분리)
- 노트: `notes/{subject}/*.md`
- 저장: localStorage (subject-aware 키, 기계학습은 기존 `ml-exam:*` 유지)
- 랭킹: Firebase Firestore (기계학습 전용, 향후 subject별 컬렉션 확장)

### 서버
- 호스팅: GitHub Pages
- LLM 채점 프록시: Cloudflare Worker (`../worker/`, 서술형 채점용)

## 로컬 실행

```bash
# 이 폴더에서 (모듈 import를 위해 HTTP 서버 필요)
python -m http.server 8000
# → http://localhost:8000
```

## 보안·프라이버시

- API 키는 전부 Cloudflare Worker secret에 보관 (저장소·브라우저에 노출 0)
- Firestore Rules로 점수 위·변조 차단
- 사용자 제출 이미지는 채점 후 즉시 폐기, 저장하지 않음

## 폴더 구조

```
ai-study-hub/
├─ index.html               # 허브
├─ subject.html             # 과목 랜딩 (정기고사 + 주차별 확인문제 섹션)
├─ review.html              # 복습 뷰어
├─ exam.html                # 시험 (정기/주차별 공용, kind 파라미터로 분기)
├─ result.html              # 결과 (정기/주차별 공용)
├─ css/
├─ js/
│  ├─ exam.js, scoring.js, storage.js, leaderboard.js, theme.js
│  ├─ hub 로직은 index.html 인라인
│  ├─ subject.js, review.js
│  └─ subjects/
│     ├─ ml.js, dl.js, ds.js, sec.js  # noteIndex + sets + weeklyExams 메타
│     └─ index.js                       # 레지스트리
├─ notes/
│  ├─ ml/ *.md (1~7, 9주차) + 9주차_밀도추정_시험.json
│  ├─ dl/ *.md (1~8주차 + 예상문제·모범답안) + 8주차_LSTM_GRU_시험.json
│  ├─ ds/ *.md  (7차시 + INDEX)
│  └─ sec/ (빈 폴더)
├─ assets/
├─ firebase-config.js
└─ firestore.rules
```

## 시험 준비 화면 (개념 지도, 종이로 푸는 모의시험, 주제별 문제)

필기시험을 보는 과목을 위한 화면이다. 정기고사 엔진(`exam.html`)과 랭킹을 쓰지 않는다. 답을 종이에 쓰고 스스로 채점하기 때문이다.

```
map.html?s=sl                       ← 개념 지도 (한 줄기에서 가지 치는 나무)
map.html?s=sl&n=<slug>              ← 개념 한 장 (정의, 수식, 흔한 오해, 확인 질문)
paper.html?s=sl&set=midterm-1       ← 종이로 푸는 모의시험 (표지 → 시계 → 채점 → 결과)
practice.html?s=sl                  ← 주제별 문제
```

- 모의시험은 화면이 시험지와 시계 역할만 한다. 끝난 뒤 참거짓과 객관식은 답을 옮기면 채점되고, 손으로 쓴 유도와 서술은 **채점 프롬프트를 복사해** 방문자가 쓰는 LLM에 답안 사진과 함께 넣는다. 프롬프트에 문제, 모범 답안, 채점 기준이 들어 있다.
- 진도와 점수는 방문자의 브라우저(localStorage)에만 남는다. 키: `ai-study:<과목>:prep:concepts`, `ai-study:<과목>:paper:<set>`.
- 개념의 표지는 세 가지다: 강조(수업에서 강조), 범위 밖(시험 범위 밖으로 언급), 건너뜀(슬라이드에는 있지만 수업에서 넘어감).
- 예상 문제는 실제 기출이 아니다. 수업 내용으로 만든 것임을 화면에 적는다.

### 내용을 고치는 법

원본은 마크다운이고, 화면은 묶음 파일 하나를 읽는다.

```
notes/<과목>/_prep/concepts/<slug>.md          개념 노드 하나 (frontmatter: title, en, parent, order, summary, signal, related)
notes/<과목>/_prep/questions/<set>/<이름>.md   문항 하나 (본문은 <section data-q="stem|ko|answer|rubric"> 네 구역)
notes/<과목>/_prep/exams.json                  시험 표지(제목, 시간, 파트)
notes/<과목>/prep.json                         화면이 읽는 묶음 (직접 고치지 않는다)
```

```bash
node tools/build-prep.mjs sl --check   # 형식 검사만
node tools/build-prep.mjs sl           # 검사하고 notes/sl/prep.json 을 다시 쓴다
```

묶음을 다시 만들었으면 `js/subjects/sl.js` 의 `prep.version` 을 올려야 방문자의 브라우저가 새 파일을 받는다.
원본 폴더 이름이 밑줄로 시작하는 것은 GitHub Pages(Jekyll)가 frontmatter 있는 마크다운을 변환하거나 수식의 중괄호를 템플릿 문법으로 읽지 않게 하려는 것이다.

### 과목을 더하는 법

1. `js/subjects/<과목>.js` 의 `META` 에 `prep: { version, map, practice, exams: [...] }` 를 넣는다(`sl.js` 참고).
2. `notes/<과목>/_prep/` 에 개념과 문항을 쓰고 `node tools/build-prep.mjs <과목>` 을 돌린다.
3. 과목 화면(`subject.html`)에 "시험 준비" 묶음이 자동으로 나온다.

## 주차별 확인문제 추가 방법

1. `notes/<sub>/<N>주차_<제목>_시험.json` 작성 (스키마: `{subject, week, title, set_meta, questions[]}`)
2. `js/subjects/<sub>.js`의 `weeklyExams` 배열에 한 줄 추가:
   ```js
   { week: N, slug: "<N>주차_<제목>_시험", title: "...", count: 20 }
   ```
3. 끝. 과목 페이지에 자동으로 새 카드가 표시되고, 점수·랭킹은 자동으로 격리된 키에 저장됨.
