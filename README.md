# 기계학습 중간고사 모의고사

Week 2~7 범위 · 30문제 × 5세트 · 객관식 + 주관식 혼합

> SW AI 융합정보대학원 61기 최경찬

## 기능
- 5세트 × 30문제 모의고사 (전범위 커버, 세트별 출제 비율 변형)
- 2가지 풀이 모드: 즉시 채점 / 일괄 채점
- 간단 해설 + 상세 해설 펼침
- 주차별 정답률 대시보드, 오답노트
- 실시간 랭킹 (닉네임, 점수, 소요시간)
- 라이트/다크 테마 전환

## 기술 스택
- Vanilla HTML/CSS/JS (프레임워크 없음)
- KaTeX (수식 렌더링)
- Firebase Firestore (랭킹 저장)
- GitHub Pages 배포

## 로컬 실행
```bash
# 정적 서버 아무거나 사용 (Python 예시)
python -m http.server 8080
# 브라우저에서 http://localhost:8080
```

## 배포 (GitHub Pages)
1. GitHub 저장소에 이 폴더 내용 push
2. Settings → Pages → Source: `main` 브랜치 / `/root`
3. 배포 URL: `https://{username}.github.io/{repo}/`

## Firebase 설정
`firebase-config.js`의 API 키는 공개해도 안전합니다. 보안은 `firestore.rules`로 담당합니다.
규칙 배포: Firebase 콘솔 → Firestore Database → 규칙 탭 → `firestore.rules` 내용 붙여넣기 → [게시]

## 라이선스
학습 목적 개인 프로젝트
