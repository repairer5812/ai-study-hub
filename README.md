# AI Study Hub

**🌐 배포: https://repairer5812.github.io/ai-study-hub/** (리네임 예정)
**현재 URL: https://repairer5812.github.io/ml-midterm-mock/**

다과목 학습 허브 · 복습 노트 · 모의고사 · 실시간 랭킹

> SW AI 융합정보대학원 61기 최경찬 · repairer5812@gmail.com

## 과목

| 과목 | 복습 노트 | 모의고사 |
|------|---------|---------|
| 🤖 기계학습 | ✅ 7주차 | ✅ 150문제 · 5세트 |
| 💻 딥러닝 | ✅ 7주차 + 예상문제·모범답안 | 🔜 서술형 준비 중 |
| 📊 자료구조 | ✅ 7차시 + INDEX | 🔜 3세트 준비 중 |
| 🔒 AI 보안기술 | 🔒 자료 수집 예정 | 🔒 |

## 화면 구조

```
index.html                  ← 허브 (과목 카드 4개)
├─ subject.html?s=ml        ← 과목 랜딩 (복습/시험 메뉴, 세트 그리드)
├─ review.html?s=ml&w=…     ← 주차별 복습 뷰어 (marked + KaTeX, 체크박스 저장)
├─ exam.html?s=ml&set=1     ← 시험 화면 (기존 기계학습 150문제)
└─ result.html?s=ml&set=1   ← 결과·랭킹·오답 복기
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
- 과목별 모듈: `js/subjects/{ml,dl,ds,sec}.js` + `index.js` 레지스트리
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
mock-exam/                  ← GitHub에서 ai-study-hub 로 rename 예정
├─ index.html               # 허브
├─ subject.html             # 과목 랜딩
├─ review.html              # 복습 뷰어
├─ exam.html                # 시험
├─ result.html              # 결과
├─ css/
├─ js/
│  ├─ app.js, exam.js, scoring.js, storage.js, leaderboard.js, theme.js
│  ├─ hub 로직은 index.html 인라인
│  ├─ subject.js, review.js
│  └─ subjects/
│     ├─ ml.js, dl.js, ds.js, sec.js
│     └─ index.js            # 레지스트리
├─ notes/
│  ├─ ml/ *.md  (7개)
│  ├─ dl/ *.md  (7개 + 예상문제·모범답안)
│  ├─ ds/ *.md  (7개 + INDEX)
│  └─ sec/ (빈 폴더)
├─ assets/
├─ firebase-config.js
└─ firestore.rules
```
