// subject.js — 과목 랜딩 페이지 (복습/시험 분기 + 세트 그리드)
import { getSubjectMeta } from "./subjects/index.js";
import { getBest } from "./storage.js";

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

// ── 시험 섹션 표시 여부 ────────────────────────────────
if (!meta.hasExam || !meta.sets.length) {
  document.getElementById("no-exam-section").style.display = "block";
} else {
  document.getElementById("exam-section").style.display = "";
  // 서술형(essay)은 한 세트당 1문제이므로 mode selector 숨김
  if (meta.examType === "essay") {
    const ms = document.getElementById("mode-selector");
    if (ms) ms.style.display = "none";
  }
  renderExamSection();
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
