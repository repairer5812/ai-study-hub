// work.js — 작업형·서술형 예상문제 1문제씩 풀이 + LLM 첨삭 채점
import { WORK_PROBLEMS, WORK_META } from "./subjects/ds-work.js";

const GRADER_URL = "https://ai-study-grader.repairer5812.workers.dev/grade";
const ANS_KEY = "ai-study:ds:work:answers";

const $ = (id) => document.getElementById(id);
const el = {
  qno: $("qno"), jump: $("jump"), progress: $("progress-fill"),
  tagType: $("tag-type"), tagWeek: $("tag-week"), tagFlag: $("tag-flag"),
  qNum: $("q-num"), qText: $("q-text"), qHint: $("q-hint"),
  input: $("answer-input"), gradeBtn: $("grade-btn"), modelBtn: $("model-btn"),
  gradeNote: $("grade-note"), result: $("result-area"),
  prev: $("prev-btn"), next: $("next-btn"), navStatus: $("nav-status"),
  exit: $("exit-btn"), toast: $("toast"),
};

const problems = WORK_PROBLEMS;
let idx = 0;
const results = {};                 // id -> 채점 응답 (세션 메모리)
const answers = loadAnswers();      // id -> 학생 답안 (localStorage)

function loadAnswers() {
  try { return JSON.parse(localStorage.getItem(ANS_KEY)) || {}; } catch { return {}; }
}
function saveAnswers() {
  try { localStorage.setItem(ANS_KEY, JSON.stringify(answers)); } catch {}
}
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.toast.classList.remove("show"), 2600);
}

const TYPE_LABEL = { work: "✍️ 작업형", essay: "📝 서술형" };

function buildJump() {
  el.jump.innerHTML = problems
    .map((p, i) => `<option value="${i}">${i + 1}. ${esc(p.topic)} (${p.type === "work" ? "작업" : "서술"})</option>`)
    .join("");
  el.jump.value = String(idx);
}

function render() {
  const p = problems[idx];
  el.qno.textContent = `${idx + 1} / ${problems.length}`;
  el.jump.value = String(idx);
  el.progress.style.width = `${((idx + 1) / problems.length) * 100}%`;

  el.tagType.textContent = TYPE_LABEL[p.type] || p.type;
  el.tagWeek.textContent = `Week ${p.week}`;
  if (p.flag) { el.tagFlag.style.display = ""; el.tagFlag.textContent = `🌟 ${p.flag}`; }
  else el.tagFlag.style.display = "none";

  el.qNum.textContent = `Q${idx + 1}`;
  el.qText.textContent = p.question;
  el.qHint.textContent = p.inputHint ? `✏️ 작성 형식: ${p.inputHint}` : "";

  el.input.value = answers[p.id] || "";
  el.input.disabled = false;
  el.gradeBtn.disabled = false;
  el.gradeBtn.textContent = "🤖 채점받기";
  el.gradeNote.textContent = "";

  // 이전 채점 결과 복원
  if (results[p.id]) renderResult(p, results[p.id]);
  else el.result.innerHTML = "";

  el.prev.disabled = idx === 0;
  el.next.disabled = idx === problems.length - 1;
  el.navStatus.textContent = `${TYPE_LABEL[p.type]} · ${p.topic}`;

  if (window.renderMath) window.renderMath(document.getElementById("question-area"));
}

function verdictColor(v) {
  return { "정답": "#16a34a", "부분정답": "#d97706", "오답": "#dc2626" }[v] || "#6b7280";
}

function renderResult(p, d) {
  if (d.error) {
    el.result.innerHTML = `<div style="border:1px solid #dc262644; border-radius:12px; padding:14px 16px; background:var(--c-surface); color:#dc2626;">⚠️ ${esc(d.error)}</div>`;
    return;
  }
  let detail = "";
  if (d.mode === "exact" && Array.isArray(d.parts)) {
    const partIcon = (pt) => pt.ok ? "✅" : (pt.issue && (pt.issue.type === "extra" || pt.issue.type === "missing") ? "⚠️" : "❌");
    const partMsg = (pt) => {
      if (pt.ok) return "정답";
      const i = pt.issue || {};
      if (i.type === "extra") return `<span class="muted">— 정답 ${pt.total}개는 맞췄지만 뒤에 불필요한 항목 ${i.count}개가 더 있어요</span>`;
      if (i.type === "missing") return `<span class="muted">— 항목 ${i.count}개 부족 (${pt.matched}/${pt.total}개 맞음)</span>`;
      return `<span class="muted">— ${(i.at ?? pt.matched) + 1}번째 항목이 틀림 (정답 ${esc(i.correct ?? "?")}, ${pt.matched}/${pt.total} 일치)</span>`;
    };
    detail = `<ul style="margin:6px 0 0; padding-left:4px; list-style:none; display:flex; flex-direction:column; gap:4px;">` +
      d.parts.map((pt) => `<li>${partIcon(pt)} <strong>${esc(pt.label)}</strong> ${partMsg(pt)}</li>`).join("") + `</ul>`;
  } else if (Array.isArray(d.rubricHits) && d.rubricHits.length) {
    detail = `<ul style="margin:6px 0 0; padding-left:4px; list-style:none; display:flex; flex-direction:column; gap:4px;">` +
      d.rubricHits.map((h) => `<li>${h.hit ? "✅" : "⬜"} ${esc(h.point)}</li>`).join("") + `</ul>`;
  }

  el.result.innerHTML = `
    <div style="border:1px solid var(--c-border-soft); border-radius:12px; padding:16px 18px; background:var(--c-surface);">
      <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:8px;">
        <span style="font-weight:800; font-size:16px; color:${verdictColor(d.verdict)};">${esc(d.verdict || "채점")}</span>
        <span style="font-size:24px; font-weight:800;">${Number(d.score) || 0}<span class="muted" style="font-size:13px; font-weight:600;">/100</span></span>
      </div>
      ${detail}
      ${d.good ? `<div style="margin-top:12px;"><strong>💚 잘한 점</strong><div style="margin-top:3px; line-height:1.75; white-space:pre-line;">${esc(d.good)}</div></div>` : ""}
      ${d.fix ? `<div style="margin-top:12px;"><strong>🔧 보완할 점 · 자세한 풀이</strong><div style="margin-top:3px; line-height:1.75; white-space:pre-line;">${esc(d.fix)}</div></div>` : ""}
      <details style="margin-top:14px;" open>
        <summary style="cursor:pointer; font-weight:600;">📖 모범답안 / 해설</summary>
        <div style="margin-top:8px; line-height:1.7;">${esc(d.modelAnswer || p.modelAnswer || "")}</div>
        ${p.explain ? `<div class="muted small" style="margin-top:8px; line-height:1.6;">💡 ${esc(p.explain)}</div>` : ""}
      </details>
    </div>`;
  if (window.renderMath) window.renderMath(el.result);
}

async function gradeNow() {
  const p = problems[idx];
  const userAnswer = (el.input.value || "").trim();
  if (userAnswer.length < 2) { toast("답안을 입력해 주세요."); return; }
  answers[p.id] = el.input.value; saveAnswers();

  el.gradeBtn.disabled = true;
  el.gradeBtn.textContent = "⏳ 채점 중… (5~20초)";
  el.gradeNote.textContent = "AI가 풀이를 살펴보는 중…";

  const payload = {
    gradeMode: p.gradeMode, type: p.type, question: p.question,
    modelAnswer: p.modelAnswer || "", parts: p.parts || null,
    rubric: p.rubric || null, userAnswer,
  };

  try {
    const resp = await fetch(GRADER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      let msg = `채점 서버 오류 (${resp.status})`;
      if (resp.status === 429) msg = "요청이 많습니다. 1분 후 다시 시도해 주세요.";
      else if (resp.status === 403) msg = "허용되지 않은 접근입니다.";
      else if (resp.status === 502) msg = "LLM 연결 실패(터널 점검 필요). 잠시 후 다시 시도해 주세요.";
      results[p.id] = { error: msg };
    } else {
      results[p.id] = await resp.json();
    }
  } catch (e) {
    results[p.id] = { error: `네트워크 오류: ${e.message}` };
  }

  el.gradeBtn.disabled = false;
  el.gradeBtn.textContent = "🤖 다시 채점";
  el.gradeNote.textContent = "";
  renderResult(p, results[p.id]);
}

function showModel() {
  const p = problems[idx];
  el.result.innerHTML = `
    <div style="border:1px dashed var(--c-border-soft); border-radius:12px; padding:16px 18px; background:var(--c-surface);">
      <strong>📖 모범답안</strong>
      <div style="margin-top:8px; line-height:1.7;">${esc(p.modelAnswer || "")}</div>
      ${p.explain ? `<div class="muted small" style="margin-top:10px; line-height:1.6;">💡 ${esc(p.explain)}</div>` : ""}
    </div>`;
  if (window.renderMath) window.renderMath(el.result);
}

function go(n) {
  idx = Math.max(0, Math.min(problems.length - 1, n));
  render();
  document.getElementById("question-area").scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── 이벤트 ──
el.gradeBtn.addEventListener("click", gradeNow);
el.modelBtn.addEventListener("click", showModel);
el.prev.addEventListener("click", () => go(idx - 1));
el.next.addEventListener("click", () => go(idx + 1));
el.jump.addEventListener("change", () => go(Number(el.jump.value)));
el.input.addEventListener("input", () => { answers[problems[idx].id] = el.input.value; saveAnswers(); });
el.exit.addEventListener("click", () => { location.href = "subject.html?s=ds"; });

// ── init ──
buildJump();
render();
