# 기계학습 중간고사 모의고사

**🌐 배포: https://repairer5812.github.io/ml-midterm-mock/**

Week 2~7 전범위 · 150문제 · 5세트 · 실시간 랭킹

> SW AI 융합정보대학원 61기 최경찬

## 기능

- **150문제 × 5세트** (각 세트 30문제, Week 2~7 전범위 균형 배분)
  - SET 1 — 기본 균형 | SET 2 — 계산 중심 | SET 3 — 개념 중심 | SET 4 — 비교 유형 | SET 5 — 종합 심화
- **2가지 풀이 모드** — 즉시 채점(1문제씩 피드백) / 일괄 채점(30문제 후 제출)
- **주관식 20개** (계산형 11 + 서술형 9)
- **간단 해설 + 상세 해설 펼침**, 각 문제마다 출처(Week N § X) 표기
- **주차별 정답률 대시보드**
- **오답노트** — 세트별 또는 전 세트 통합 리뷰
- **주차별 필터 학습 모드** (`?week=N`)
- **실시간 랭킹** — Firebase Firestore, 닉네임·점수·소요시간 TOP 20
- **결과 이미지 저장** — html2canvas PNG 다운로드
- **키보드 단축키** — 1~4 선택, Enter 다음, ←/→ 이동, B 북마크
- **세션 복구** — 풀이 중 이탈해도 이어 풀기 (LocalStorage)
- **라이트/다크 테마 전환**
- **반응형 디자인** — 모바일 뷰 지원

## 기술 스택

- Vanilla HTML + CSS + ES Modules (프레임워크 없음)
- KaTeX 0.16.9 — 수식 렌더링
- Firebase Firestore v10.13.2 — 랭킹 저장 (ESM CDN)
- html2canvas 1.4.1 — 결과 이미지 출력
- Pretendard — 한글 폰트
- GitHub Pages — 정적 호스팅

## 로컬 실행

```bash
python -X utf8 -m http.server 8080
# 브라우저에서 http://localhost:8080
```

## 파일 구조

```
mock-exam/
├── index.html           홈 (5 세트 카드 + 모드 선택)
├── exam.html            시험 풀이 화면
├── result.html          결과 + 랭킹
├── firebase-config.js   Firebase 공개 설정 (보안은 firestore.rules)
├── firestore.rules      Firestore 보안 규칙 (수정·삭제 금지·필드 검증)
├── css/
│   ├── base.css
│   ├── theme-bento.css  라이트 테마
│   └── theme-dark.css   다크 테마
├── js/
│   ├── questions.js     150문제 데이터
│   ├── exam.js          풀이 로직
│   ├── scoring.js       채점·점수 환산
│   ├── leaderboard.js   Firebase 연동
│   ├── storage.js       LocalStorage 래퍼
│   ├── theme.js         테마 전환
│   └── app.js           (예약)
├── assets/
│   ├── favicon.svg
│   └── images/          (confusion_matrix, roc_curve)
└── tools/
    └── extract_images.py  PDF 페이지 → PNG 추출 스크립트
```

## Firebase 설정

`firebase-config.js`의 API 키는 **공개해도 안전**합니다. 보안은 `firestore.rules`로 담당합니다.

Firestore 규칙 배포:
1. Firebase 콘솔 → Firestore Database → 규칙 탭
2. `firestore.rules` 내용 붙여넣기 → [게시]

## 라이선스

학습 목적 비영리 개인 프로젝트.

---

**제작**: SW AI 융합정보대학원 61기 최경찬
