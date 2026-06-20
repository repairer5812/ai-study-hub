// subject.js — 과목 랜딩 페이지 (복습/시험 분기 + 세트 그리드 + 주차별 확인문제)
import { getSubjectMeta } from "./subjects/index.js";
import { getBest, getWeeklyBest } from "./storage.js";

const params = new URLSearchParams(location.search);
const subjectId = params.get("s") || "ml";

let meta;
try {
  meta = getSubjectMeta(subjectId);
} catch (_) {
  location.href = "index.html";
  throw new Error("Unknown subject");
}

// ── 헤더 채우기 ───────────────────────────────────────
document.getElementById("crumb").textContent = `← 홈 / ${meta.title}`;
document.getElementById("hero-badge").textContent = `${meta.emoji} ${meta.title.toUpperCase()}`;
document.getElementById("hero-title").textContent = meta.title;
document.getElementById("hero-sub").textContent = meta.subtitle;
document.title = `${meta.title} · AI Study Hub`;

document.getElementById("link-review").href = `review.html?s=${subjectId}`;
document.getElementById("link-wrong").href = `exam.html?s=${subjectId}&mode=wrong&all=1&review=1`;
document.getElementById("link-ranking").href = `result.html?s=${subjectId}&view=ranking`;

// 작업형·서술형 예상문제 (LLM 첨삭) — 현재 ds(자료구조)만 제공
if (subjectId === "ds") {
  const ws = document.getElementById("work-section");
  if (ws) ws.style.display = "";
}

// ── 정기고사 섹션 표시 여부 ────────────────────────────
const hasRegularExam = meta.hasExam && meta.sets && meta.sets.length;
const hasWeeklyExam = Array.isArray(meta.weeklyExams) && meta.weeklyExams.length > 0;

if (!hasRegularExam && !hasWeeklyExam) {
  document.getElementById("no-exam-section").style.display = "block";
} else {
  if (hasRegularExam) {
    document.getElementById("exam-section").style.display = "";
    // 서술형(essay)은 한 세트당 1문제이므로 mode selector 숨김
    if (meta.examType === "essay") {
      const ms = document.getElementById("mode-selector");
      if (ms) ms.style.display = "none";
    }
    renderExamSection();
  }
  if (hasWeeklyExam) {
    document.getElementById("weekly-section").style.display = "";
    renderWeeklySection();
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function showTbaToast() {
  let t = document.getElementById("subj-toast");
  if (!t) { t = document.createElement("div"); t.id = "subj-toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = "기말고사 모의고사는 추후 공개 예정입니다 (TBA)";
  t.classList.add("show");
  clearTimeout(showTbaToast._t);
  showTbaToast._t = setTimeout(() => t.classList.remove("show"), 2400);
}

function renderExamSection() {
  const modeKey = `ai-study:${subjectId}:mode`;
  let mode = localStorage.getItem(modeKey) || "instant";
  const modeBtns = document.querySelectorAll("#mode-selector .mode-btn");
  modeBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
    btn.addEventListener("click", () => {
      mode = btn.dataset.mode;
      localStorage.setItem(modeKey, mode);
      modeBtns.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
      renderSets();
    });
  });
  renderSets();

  function renderSets() {
    const grid = document.getElementById("set-grid");
    const card = (s) => {
      const isJong = (s.label || "").includes("종합");
      // 준비 중(placeholder): 회색 · 비클릭
      if (s.placeholder) {
        return `
        <div class="set-card is-placeholder tba-card" role="button" tabindex="0" title="준비 중 — 추후 업데이트">
          <span class="placeholder-badge">🔒 TBA</span>
          ${isJong ? '<span class="jonghap-badge" style="left:12px; right:auto;">🏆 종합</span>' : ""}
          <div class="set-num">${s.label.toUpperCase()}</div>
          <div class="set-title">${s.title}</div>
          <div class="muted small">${s.desc}</div>
          <div class="set-meta"><span class="muted small">업데이트 예정</span></div>
        </div>`;
      }
      const best = getBest(s.id, subjectId);
      const bestHtml = best
        ? `<span class="set-best">${best.score}점</span><span class="muted small">${formatTime(best.durationSec)}</span>`
        : `<span class="set-best unplayed">미응시</span>`;
      return `
        <a class="${isJong ? 'set-card is-jonghap' : 'set-card'}" href="exam.html?s=${subjectId}&set=${s.id}&mode=${mode}" aria-label="${s.title} 시작">
          ${isJong ? '<span class="jonghap-badge">🏆 종합</span>' : ''}
          <div class="set-num">${s.label.toUpperCase()}</div>
          <div class="set-title">${s.title}</div>
          <div class="muted small">${s.desc}</div>
          <div class="set-meta">${bestHtml}</div>
        </a>`;
    };
    const mid = meta.sets.filter(s => (s.exam || "midterm") !== "final");
    const fin = meta.sets.filter(s => s.exam === "final");
    if (mid.length && fin.length) {
      const grp = (label, list) =>
        `<div class="exam-group" style="grid-column:1/-1; flex-basis:100%; width:100%; margin:10px 0 2px; font-weight:800; font-size:15px;">${label}</div>`
        + list.map(card).join("");
      grid.innerHTML = grp("🟦 중간고사", mid) + grp("🟥 기말고사", fin);
    } else {
      grid.innerHTML = meta.sets.map(card).join("");
    }
    grid.querySelectorAll(".tba-card").forEach(el => {
      el.addEventListener("click", showTbaToast);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showTbaToast(); } });
    });
  }
}

// ═══════════════════════════════════════════════════════════
// 주차별 확인문제 섹션 (정기고사와 독립)
// ═══════════════════════════════════════════════════════════
function renderWeeklySection() {
  const grid = document.getElementById("weekly-grid");
  if (!grid) return;

  // 주차별 풀이 모드: 정기고사와 별도 키로 격리, 기본값 instant(1문제씩 즉시 채점)
  const modeKey = `ai-study:${subjectId}:weekly-mode`;
  let mode = localStorage.getItem(modeKey) || "instant";
  const modeBtns = document.querySelectorAll("#weekly-mode-selector .mode-btn");
  modeBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
    btn.addEventListener("click", () => {
      mode = btn.dataset.mode;
      localStorage.setItem(modeKey, mode);
      modeBtns.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
      renderWeeklyCards();
    });
  });
  renderWeeklyCards();

  function renderWeeklyCards() {
    grid.innerHTML = meta.weeklyExams.map(w => {
      const best = getWeeklyBest(w.week, subjectId);
      const bestHtml = best
        ? `<span class="set-best">${best.score}점</span><span class="muted small">${formatTime(best.durationSec)}</span>`
        : `<span class="set-best unplayed">미응시</span>`;
      return `
        <a class="set-card" href="exam.html?s=${subjectId}&kind=weekly&w=${w.week}&mode=${mode}" aria-label="${w.title} 시작">
          <div class="set-num">WEEK ${w.week}</div>
          <div class="set-title">${w.title}</div>
          <div class="muted small">객관식 ${w.count || 20}문제</div>
          <div class="set-meta">${bestHtml}</div>
        </a>`;
    }).join("");
  }
}
