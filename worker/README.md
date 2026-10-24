# ai-study-grader

서술형 답안을 LLM으로 채점하는 Cloudflare Worker.

## 🚀 배포 절차 (처음 한 번만)

**1. 이 폴더로 이동**

노트북 (Windows):
```bash
cd "c:/Users/User/Desktop/LLM_project/2. 계속관리/AI대학원/worker"
```

데스크탑 (Linux):
```bash
cd "$HOME/Nextcloud/2. 계속관리/AI대학원/worker"
```

> 위치 변경 이력: 2026-04 PARA 정리로 `1. 단기 프로젝트/AI_Study/`에서 현재 위치로 이동.

**2. Secret 3개 주입** — 터미널에서 한 줄씩 실행, 프롬프트에 값 붙여넣기

```bash
wrangler secret put LLM_PROVIDER
# 입력값: upstage

wrangler secret put LLM_MODEL
# 입력값: solar-mini
# (더 비싸고 똑똑한 solar-pro2 도 가능)

wrangler secret put LLM_API_KEY
# 입력값: up_v63J... (Upstage Console에서 받은 키 전체)
```

**3. 배포**
```bash
wrangler deploy
```

배포 성공 시 `https://ai-study-grader.<your-subdomain>.workers.dev` URL 출력됨. 이걸 프론트엔드에서 호출.

---

## 🧪 배포 후 동작 확인

**헬스체크** (브라우저에서 바로 열기):
```
https://ai-study-grader.<your-subdomain>.workers.dev/health
```
→ `{"ok":true,"provider":"upstage"}` 뜨면 성공.

**채점 테스트** (터미널):
```bash
curl -X POST https://ai-study-grader.<your-subdomain>.workers.dev/grade-text \
  -H "Content-Type: application/json" \
  -H "Origin: https://repairer5812.github.io" \
  -d '{
    "question": "오버피팅을 설명하시오",
    "correctAnswer": "학습 데이터에 과하게 적합되어 새 데이터 일반화가 떨어지는 현상",
    "userAnswer": "훈련 데이터는 잘 맞지만 테스트 데이터에서 성능이 나쁜 것"
  }'
```

---

## 🔄 Secret 변경 (키 교체·Provider 변경)

```bash
wrangler secret put LLM_API_KEY      # 새 키 덮어쓰기
wrangler deploy                       # 재배포
```

Claude/OpenRouter 전환 시:
```bash
wrangler secret put LLM_PROVIDER    # anthropic / openrouter
wrangler secret put LLM_MODEL       # claude-haiku-4-5 등
wrangler secret put LLM_API_KEY     # 새 키
wrangler deploy
```

---

## 📊 로그 보기 (디버깅)

```bash
wrangler tail
```
실시간 요청 로그 출력. 다른 터미널에서 열어두고 프론트엔드 테스트.

---

## ⚠️ 주의

- `wrangler.toml`의 `ALLOWED_ORIGINS`에 새 도메인 추가 시 재배포 필요.
- `.dev.vars` 파일은 로컬 개발용. git에 커밋 금지 (`.gitignore` 적용됨).
- Rate limit은 1분에 20회/IP. 필요 시 `wrangler.toml`에서 조정.
