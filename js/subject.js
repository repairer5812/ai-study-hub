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

function renderExamSection() {
  const modeKey = `ai-study:${subjectId}:mode`;
  let mode = localStorage.getItem(modeKey) || "batch";
  const modeBtns = document.querySelectorAll(".mode-btn");
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
    grid.innerHTML = meta.sets.map(s => {
      const best = getBest(s.id, subjectId);
      const bestHtml = best
        ? `<span class="set-best">${best.score}점</span><span class="muted small">${formatTime(best.durationSec)}</span>`
        : `<span class="set-best unplayed">미응시</span>`;
      return `
        <a class="set-card" href="exam.html?s=${subjectId}&set=${s.id}&mode=${mode}" aria-label="${s.title} 시작">
          <div class="set-num">${s.label.toUpperCase()}</div>
          <div class="set-title">${s.title}</div>
          <div class="muted small">${s.desc}</div>
          <div class="set-meta">${bestHtml}</div>
        </a>`;
    }).join("");
  }
}

// ═══════════════════════════════════════════════════════════
// 주차별 확인문제 섹션 (정기고사와 독립)
// ═══════════════════════════════════════════════════════════
function renderWeeklySection() {
  const grid = document.getElementById("weekly-grid");
  if (!grid) return;

  grid.innerHTML = meta.weeklyExams.map(w => {
    const best = getWeeklyBest(w.week, subjectId);
    const bestHtml = best
      ? `<span class="set-best">${best.score}점</span><span class="muted small">${formatTime(best.durationSec)}</span>`
      : `<span class="set-best unplayed">미응시</span>`;
    return `
      <a class="set-card" href="exam.html?s=${subjectId}&kind=weekly&w=${w.week}&mode=batch" aria-label="${w.title} 시작">
        <div class="set-num">WEEK ${w.week}</div>
        <div class="set-title">${w.title}</div>
        <div class="muted small">객관식 ${w.count || 20}문제</div>
        <div class="set-meta">${bestHtml}</div>
      </a>`;
  }).join("");
}
