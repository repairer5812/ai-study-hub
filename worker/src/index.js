/**
 * ai-study-grader — Cloudflare Worker
 * 서술형 답안을 LLM으로 채점하는 보안 프록시.
 *
 * 엔드포인트
 *   GET  /health        → 상태 체크
 *   POST /grade-text    → 서술형 답안 채점
 *
 * 방어 레이어
 *   L1 Origin whitelist  (ALLOWED_ORIGINS env)
 *   L2 Rate limit        (IP당 RATE_LIMIT_PER_MINUTE)
 *   L3 Payload 크기 제한 (MAX_REQUEST_BYTES)
 *
 * LLM Provider는 env.LLM_PROVIDER로 전환 (현재: upstage)
 */

const rateLimitBuckets = new Map(); // ip -> { count, resetAt }

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    // CORS preflight
    if (request.method === "OPTIONS") {
      return preflight(request, env);
    }

    // Health check (누구나 가능, 키 검증용)
    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, provider: env.LLM_PROVIDER || "unset" }, 200, origin, env);
    }

    // === 이 아래는 전부 보호된 엔드포인트 ===

    // L1. Origin 검증
    if (!isAllowedOrigin(origin, env)) {
      return json({ error: "Forbidden origin" }, 403, origin, env);
    }

    // L2. Rate limit
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (!checkRateLimit(ip, env)) {
      return json({ error: "Rate limit exceeded. 1분 후 다시 시도해 주세요." }, 429, origin, env);
    }

    // L3. Payload 크기
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    const maxBytes = Number(env.MAX_REQUEST_BYTES || 8192);
    if (contentLength > maxBytes) {
      return json({ error: `Payload too large (max ${maxBytes} bytes)` }, 413, origin, env);
    }

    // === 라우팅 ===
    if (url.pathname === "/grade-text" && request.method === "POST") {
      return handleGradeText(request, env, origin);
    }

    // 작업형(추적·작도)·서술형 채점 (로컬 LLM Ollama 터널 경유)
    if (url.pathname === "/grade" && request.method === "POST") {
      return handleGrade(request, env, origin);
    }

    return json({ error: "Not found" }, 404, origin, env);
  },
};

// ============================================================
// /grade-text — 서술형 채점
// ============================================================
async function handleGradeText(request, env, origin) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin, env);
  }

  const { question, correctAnswer, userAnswer, criteria } = body || {};
  if (!question || !correctAnswer || !userAnswer) {
    return json(
      { error: "question, correctAnswer, userAnswer 필수" },
      400,
      origin,
      env
    );
  }

  const prompt = buildGradingPrompt({ question, correctAnswer, userAnswer, criteria });

  try {
    const result = await callLLM(env, prompt);
    const parsed = parseGradingResponse(result);
    return json(parsed, 200, origin, env);
  } catch (err) {
    console.error("LLM error:", err);
    return json(
      { error: "LLM 호출 실패", detail: String(err?.message || err) },
      502,
      origin,
      env
    );
  }
}

function buildGradingPrompt({ question, correctAnswer, userAnswer, criteria }) {
  return [
    {
      role: "system",
      content:
        "당신은 엄격하지만 공정한 한국어 교수 조교입니다. " +
        "학생 답안이 정답의 핵심 개념을 담고 있으면 정답으로 판정하세요. " +
        "용어 순서·표현 차이는 허용하되, 의미가 다르면 오답입니다. " +
        "반드시 다음 JSON 포맷으로만 응답하세요. 다른 텍스트 금지.\n" +
        '{"correct": true|false, "confidence": 0.0~1.0, "feedback": "한 문장 피드백"}',
    },
    {
      role: "user",
      content:
        `문제: ${question}\n` +
        `모범답안: ${correctAnswer}\n` +
        (criteria ? `채점 기준: ${criteria}\n` : "") +
        `학생 답안: ${userAnswer}\n\n` +
        "위 학생 답안을 채점하세요. JSON만 반환.",
    },
  ];
}

// ============================================================
// /grade — 작업형(시퀀스 정확대조 + LLM 첨삭) · 서술형(루브릭 LLM 채점)
// 요청: { gradeMode:"exact"|"llm", type, question, modelAnswer,
//        parts:[{label,seq}], rubric:[...], userAnswer }
// ============================================================
async function handleGrade(request, env, origin) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, origin, env);
  }

  const { gradeMode, type, question, modelAnswer, parts, rubric, userAnswer } = body || {};
  if (!question || !userAnswer) {
    return json({ error: "question, userAnswer 필수" }, 400, origin, env);
  }

  try {
    if (gradeMode === "exact" && Array.isArray(parts) && parts.length) {
      return json(await gradeExact({ question, modelAnswer, parts, userAnswer }, env), 200, origin, env);
    }
    return json(await gradeLLM({ type, question, modelAnswer, rubric, userAnswer }, env), 200, origin, env);
  } catch (err) {
    console.error("grade error:", err);
    return json({ error: "채점 실패", detail: String(err?.message || err) }, 502, origin, env);
  }
}

// 작업형: 워커가 시퀀스를 정확 대조(점수 확정) → 틀리면 LLM이 친절히 첨삭
async function gradeExact({ question, modelAnswer, parts, userAnswer }, env) {
  const studentParts = extractStudentParts(userAnswer, parts);
  const results = parts.map((p, i) => {
    const canon = normalizeTokens(p.seq, p.edge);
    const stud = normalizeTokens(studentParts[i] || "", p.edge);
    const cmp = compareSeq(canon, stud);
    return { label: p.label, ok: cmp.ok, matched: cmp.matched, total: canon.length, studLen: stud.length, issue: cmp.issue, canon, stud };
  });
  const allOk = results.every((r) => r.ok);
  const totalMatched = results.reduce((a, r) => a + r.matched, 0);
  // 분모 = max(정답 항목수, 학생 항목수) → 초과·부족 항목 모두 감점
  const totalDenom = results.reduce((a, r) => a + Math.max(r.total, r.studLen), 0) || 1;
  const score = allOk ? 100 : Math.round((totalMatched / totalDenom) * 100);
  const verdict = allOk ? "정답" : score >= 50 ? "부분정답" : "오답";
  const publicParts = results.map((r) => ({ label: r.label, ok: r.ok, matched: r.matched, total: r.total, issue: r.issue }));

  // 완전 정답이면 LLM 호출 없이 즉시 응답
  if (allOk) {
    return {
      ok: true, mode: "exact", verdict, score, parts: publicParts,
      good: "정확합니다. 순서가 모범답안과 완전히 일치해요.",
      fix: "", modelAnswer: modelAnswer || "",
    };
  }

  const summary = results
    .map((r) => {
      if (r.ok) return `· ${r.label}: 정답 (전체=${r.canon.join(",")})`;
      const i = r.issue || {};
      let desc;
      if (i.type === "extra") desc = `정답 항목 ${r.total}개는 모두 맞았으나 뒤에 불필요한 항목 ${i.count}개가 더 붙음`;
      else if (i.type === "missing") desc = `정답 ${r.total}개 중 ${r.matched}개까지만 적어 ${i.count}개 부족`;
      else desc = `${i.at + 1}번째 항목부터 어긋남 — 그 자리 정답값='${i.correct ?? ""}', 학생값='${i.got ?? "없음"}'`;
      return `· ${r.label}: ${desc} | 전체 정답=${r.canon.join(",")} / 학생=${r.stud.join(",") || "없음"}`;
    })
    .join("\n");

  const messages = [
    { role: "system", content:
      "너는 학생의 답안을 1:1로 읽고 피드백하는 친절한 자료구조 조교다. " +
      "★가장 중요: 반드시 학생이 실제로 쓴 답(채점 결과의 '학생값')을 직접 언급하며 그 학생에게 말하듯 2인칭으로 피드백하라. " +
      "'N번째에 X라고 쓰셨는데 거기는 Y가 맞아요'처럼 학생 답과 정답을 비교해 설명하라. 학생 답을 읽지 않고 정답만 일반적으로 늘어놓는 '답정너'식 설명은 절대 금지. " +
      "아래 '채점 결과'(정오·위치·정답값·학생값)는 확정 사실이니 바꾸지 마라. 정답값은 채점 결과에 적힌 것을 그대로 쓰고(순회·정렬을 직접 다시 계산하지 마라, 틀릴 위험), 모범답안 밖 사실은 지어내지 마라. " +
      "good: 학생이 실제로 맞게 쓴 부분을 콕 집어 칭찬(예: '전위·중위는 …로 정확히 쓰셨어요'). " +
      "fix: 줄바꿈(\\n)으로 단계를 나눠 — ① 학생이 몇 번째에 무엇('학생값')을 썼고 거기 정답은 무엇('정답값')인지, ② 왜 그 값이 와야 하는지 규칙·개념(예: 후위는 자식 다 본 뒤 부모), ③ 학생이 헷갈렸을 이유 추정 + 팁 + 격려. " +
      "채점 결과가 '불필요한 항목이 더 붙음'이면 '여기까지는 맞는데 뒤에 덧붙인 …만 빼면 돼요'라고, '부족'이면 어디까지 맞고 무엇이 빠졌는지 알려줘라. " +
      "good·fix는 각각 하나의 문자열이어야 한다(배열·객체 금지, 여러 단계는 \\n 줄바꿈). " +
      '반드시 JSON만 출력: {"good":"...","fix":"..."}' },
    { role: "user", content:
      `문제: ${question}\n모범답안: ${modelAnswer || ""}\n채점 결과(확정):\n${summary}\n학생 답안: ${userAnswer}\n\n위 채점 결과를 바탕으로 자세하고 친절하게 첨삭해라. JSON만 반환.` },
  ];
  let fb = { good: "", fix: "" };
  try { fb = JSON.parse(stripFence(await callLLM(env, messages, { provider: "ollama", json: true, maxTokens: 900, temperature: 0.2 }))); } catch {}

  return {
    ok: true, mode: "exact", verdict, score, parts: publicParts,
    good: toText(fb.good) || "부분적으로 맞았어요.",
    fix: toText(fb.fix) || summary,
    modelAnswer: modelAnswer || "",
  };
}

// 서술형·추적형: LLM이 루브릭·모범답안에 비춰 채점
async function gradeLLM({ type, question, modelAnswer, rubric, userAnswer }, env) {
  const rubricText = Array.isArray(rubric) && rubric.length
    ? rubric.map((r, i) => `${i + 1}. ${r}`).join("\n")
    : "(루브릭 없음 — 모범답안 기준으로 핵심 일치 여부 평가)";
  const messages = [
    { role: "system", content:
      "너는 학생의 서술 답안을 1:1로 읽고 피드백하는 친절한 한국어 자료구조 조교다. " +
      "★가장 중요: 반드시 학생이 실제로 쓴 문장을 인용·언급하며('~라고 쓰셨는데') 그 학생에게 말하듯 2인칭으로 평가하라. 학생 답과 무관하게 모범답안만 늘어놓는 '답정너'식 설명은 절대 금지. " +
      "채점은 루브릭·모범답안에 비춰 공정하게(표현이 달라도 핵심 맞으면 인정), 모범답안·루브릭 밖 사실은 지어내지 마라. " +
      "good: 학생이 실제로 잘 쓴 부분을 인용하며 칭찬. " +
      "fix: 줄바꿈(\\n)으로 항목을 나눠, 학생이 놓치거나 틀린 루브릭마다 ① 학생 답에 무엇이 빠졌/틀렸는지, ② 왜 중요한지, ③ 올바른 서술 예시. 마지막에 격려. " +
      "good·fix는 각각 하나의 문자열이어야 한다(배열·객체 금지, 여러 단계는 \\n 줄바꿈). " +
      '반드시 JSON만 출력: {"score":0~100,"verdict":"정답|부분정답|오답","hits":[{"point":"루브릭 항목","hit":true|false}],"good":"...","fix":"..."}' },
    { role: "user", content:
      `문제: ${question}\n채점 기준(루브릭):\n${rubricText}\n모범답안: ${modelAnswer || ""}\n학생 답안: ${userAnswer}\n\n자세하고 친절하게 평가·첨삭해라. JSON만 반환.` },
  ];
  let parsed;
  try {
    parsed = JSON.parse(stripFence(await callLLM(env, messages, { provider: "ollama", json: true, maxTokens: 1000, temperature: 0.2 })));
  } catch {
    return { ok: true, mode: "llm", verdict: "채점불가", score: 0, good: "", fix: "채점 응답을 해석하지 못했습니다. 다시 시도해 주세요.", modelAnswer: modelAnswer || "" };
  }
  return {
    ok: true, mode: "llm",
    verdict: String(parsed.verdict || "부분정답"),
    score: clampScore(parsed.score),
    rubricHits: Array.isArray(parsed.hits) ? parsed.hits : [],
    good: toText(parsed.good),
    fix: toText(parsed.fix),
    modelAnswer: modelAnswer || "",
  };
}

// 시퀀스 정규화: 대괄호/괄호/화살표 제거, 쉼표·공백·가운뎃점으로 분리, 소문자화.
// edge=true면 간선 토큰(A-B)을 두 정점 정렬로 정규화해 A-B=B-A 동일 취급.
function normalizeTokens(s, edge = false) {
  let toks = String(s || "")
    .replace(/[[\]()（）]/g, " ")
    .replace(/[→]/g, " ")
    .split(/[,\s·:]+/)
    .map((t) => t.replace(/^[.;]+|[.;]+$/g, "").trim().toLowerCase())
    .filter((t) => t && /[a-z0-9]/.test(t));
  if (edge) toks = toks.map((t) => (t.includes("-") ? t.split("-").map((x) => x.trim()).filter(Boolean).sort().join("-") : t));
  return toks;
}

// 학생 답안을 부분(label)별 텍스트로 분리: 라벨 첫 단어로 위치 탐색, 못 찾으면 줄 순서
function extractStudentParts(userAnswer, parts) {
  const text = String(userAnswer || "");
  if (parts.length === 1) return [text];
  const keys = parts.map((p) => String(p.label).split(/[\s(（]/)[0]);
  const positions = keys.map((k) => text.toLowerCase().indexOf(k.toLowerCase()));
  if (positions.every((p) => p < 0)) {
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    return parts.map((_, i) => lines[i] || "");
  }
  const order = positions.map((pos, i) => ({ i, pos })).filter((x) => x.pos >= 0).sort((a, b) => a.pos - b.pos);
  const out = new Array(parts.length).fill("");
  for (let j = 0; j < order.length; j++) {
    const cur = order[j];
    const start = cur.pos + keys[cur.i].length;
    const end = j + 1 < order.length ? order[j + 1].pos : text.length;
    out[cur.i] = text.slice(start, end);
  }
  return out;
}

// 토큰 시퀀스 정확 비교 → { ok, matched(일치 접두 길이), firstError(첫 불일치 index) }
function compareSeq(canon, stud) {
  let matched = 0;
  const n = Math.min(canon.length, stud.length);
  while (matched < n && canon[matched] === stud[matched]) matched++;
  const ok = matched === canon.length && stud.length === canon.length;
  let issue = null;
  if (!ok) {
    if (matched < n) issue = { type: "wrong", at: matched, correct: canon[matched], got: stud[matched] };
    else if (stud.length > canon.length) issue = { type: "extra", at: canon.length, count: stud.length - canon.length };
    else issue = { type: "missing", at: stud.length, count: canon.length - stud.length };
  }
  return { ok, matched, issue };
}

function clampScore(v) {
  const n = Math.round(Number(v));
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(100, n));
}

// LLM이 good/fix를 문자열 대신 배열·객체로 줄 때 읽을 수 있는 텍스트로 평탄화 ([object Object] 방지)
function toText(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(toText).filter(Boolean).join("\n");
  if (typeof v === "object") return Object.values(v).map(toText).filter(Boolean).join(" ");
  return String(v);
}

function stripFence(t) {
  return String(t).replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
}

function parseGradingResponse(rawText) {
  // 코드펜스(```json ... ```) 제거
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  try {
    const parsed = JSON.parse(cleaned);
    return {
      correct: Boolean(parsed.correct),
      confidence: clamp01(parsed.confidence ?? 0.5),
      feedback: String(parsed.feedback || ""),
    };
  } catch {
    // 파싱 실패 시 원문 그대로 반환 (디버깅용)
    return { correct: false, confidence: 0, feedback: rawText };
  }
}

function clamp01(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return 0.5;
  return Math.max(0, Math.min(1, n));
}

// ============================================================
// LLM Provider 어댑터 (Upstage Solar · OpenAI 호환)
// ============================================================
async function callLLM(env, messages, opts = {}) {
  const provider = (opts.provider || env.LLM_PROVIDER || "upstage").toLowerCase();
  const maxTokens = opts.maxTokens || 250;
  const temperature = opts.temperature ?? 0;

  // 로컬 LLM (Ollama, cloudflared 터널 + proxy.py Bearer 토큰)
  if (provider === "ollama") {
    const base = (env.OLLAMA_URL || "").replace(/\/+$/, "");
    if (!base) throw new Error("OLLAMA_URL secret not set");
    const resp = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(env.LLM_PROXY_TOKEN ? { Authorization: `Bearer ${env.LLM_PROXY_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        model: env.OLLAMA_MODEL || "qwen3.5:9b",
        messages,
        stream: false,
        think: false,
        ...(opts.json ? { format: "json" } : {}),
        options: { temperature, num_predict: maxTokens },
      }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      throw new Error(`ollama ${resp.status}: ${t.slice(0, 300)}`);
    }
    const data = await resp.json();
    const content = data?.message?.content;
    if (!content) throw new Error("ollama 응답에 content 없음");
    return content;
  }

  // OpenAI 호환 (upstage/openai/openrouter)
  const model = env.LLM_MODEL || "solar-mini";
  const apiKey = env.LLM_API_KEY;
  if (!apiKey) throw new Error("LLM_API_KEY secret not set");

  const endpoint = resolveEndpoint(provider);

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`${provider} ${resp.status}: ${errText.slice(0, 300)}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("LLM 응답에 content 없음");
  return content;
}

function resolveEndpoint(provider) {
  switch (provider) {
    case "upstage":
      return "https://api.upstage.ai/v1/chat/completions";
    case "openai":
      return "https://api.openai.com/v1/chat/completions";
    case "openrouter":
      return "https://openrouter.ai/api/v1/chat/completions";
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

// ============================================================
// 보안 유틸
// ============================================================
function isAllowedOrigin(origin, env) {
  const allowlist = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return allowlist.includes(origin);
}

function checkRateLimit(ip, env) {
  const limit = Number(env.RATE_LIMIT_PER_MINUTE || 20);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

// ============================================================
// CORS 응답
// ============================================================
function preflight(request, env) {
  const origin = request.headers.get("Origin") || "";
  const headers = corsHeaders(origin, env);
  return new Response(null, { status: 204, headers });
}

function corsHeaders(origin, env) {
  const allowed = isAllowedOrigin(origin, env) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(obj, status, origin, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin, env),
    },
  });
}
