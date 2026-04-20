// exam.js — 시험 풀이 로직 (5.01~5.14 통합)

import { getSetQuestions, ALL_QUESTIONS } from "./questions.js";
import { grade, scoreSet, collectWrongIds } from "./scoring.js";
import {
  saveProgress, loadProgress, clearProgress,
  getWrongList, addWrong, removeWrong
} from "./storage.js";

// ── 설정 ────────────────────────────────────────────────
const params = new URLSearchParams(location.search);
const setId = parseInt(params.get("set") || "1", 10);
const mode = params.get("mode") || "batch";  // "instant" | "batch"
const reviewMode = params.get("review") === "1" || params.get("mode") === "wrong";
const allSets = params.get("all") === "1";   // 세트 무관 전역 오답 모드
const weekFilter = parseInt(params.get("week") || "0", 10); // 0이면 주차 필터 없음

// ── 문제 로드 ───────────────────────────────────────────
let questions = allSets ? ALL_QUESTIONS : getSetQuestions(setId);

// 주차별 필터 모드
if (weekFilter >= 2 && weekFilter <= 7) {
  questions = questions.filter(q => q.week === weekFilter);
  if (!questions.length) {
    alert(`Week ${weekFilter} 문제가 없습니다. 홈으로 돌아갑니다.`);
    location.href = "index.html";
  }
}

// 오답 리뷰 모드: 저장된 오답 ID 목록에서 해당 범위의 문제만 필터
if (reviewMode) {
  const wrongIds = new Set(getWrongList());
  questions = questions.filter(q => wrongIds.has(q.id));
  if (!questions.length) {
    alert("오답노트가 비어 있습니다. 홈으로 돌아갑니다.");
    location.href = "index.html";
  }
}

// ── 상태 ────────────────────────────────────────────────
let currentIdx = 0;
const answers = {};            // { [qid]: {choice} | {text} }  — choice는 원본 정답 기준
const bookmarks = new Set();   // Set<qid>
const lockedInstant = new Set(); // instant 모드에서 답 확정된 qid
const shuffleMaps = {};        // { [qid]: [displayIdx → originalIdx] }  셔플 순서 유지
const startTime = Date.now();
let endTime = null;

// 셔플 매핑 생성: 최초 1회, 세션 동안 유지
function getShuffleMap(q) {
  if (shuffleMaps[q.id]) return shuffleMaps[q.id];
  const indices = q.choices.map((_, i) => i);
  // Fisher-Yates
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  shuffleMaps[q.id] = indices;
  return indices;
}

// ── 세션 복구 ──────────────────────────────────────────
(function restoreSession() {
  const saved = loadProgress(setId);
  if (!saved || reviewMode) return;
  if (saved.mode !== mode) return; // 모드 다르면 복구 안 함
  if (confirm("이전 풀이 내용이 있습니다. 이어서 풀까요?")) {
    Object.assign(answers, saved.answers || {});
    (saved.bookmarks || []).forEach(id => bookmarks.add(id));
    (saved.lockedInstant || []).forEach(id => lockedInstant.add(id));
    currentIdx = Math.min(saved.currentIdx || 0, questions.length - 1);
  } else {
    clearProgress(setId);
  }
})();

function persistProgress() {
  if (reviewMode) return; // 리뷰 모드는 저장 안 함
  saveProgress(setId, {
    mode,
    currentIdx,
    answers,
    bookmarks: [...bookmarks],
    lockedInstant: [...lockedInstant],
    updatedAt: Date.now(),
  });
}

// ── DOM ─────────────────────────────────────────────────
const el = {
  setInfo:    document.getElementById("set-info"),
  qno:        document.getElementById("qno"),
  progress:   document.getElementById("progress-fill"),
  tagWeek:    document.getElementById("tag-week"),
  tagTopic:   document.getElementById("tag-topic"),
  tagDiff:    document.getElementById("tag-difficulty"),
  bookmark:   document.getElementById("bookmark-btn"),
  qNum:       document.getElementById("q-num"),
  qText:      document.getElementById("q-text"),
  qImage:     document.getElementById("q-image"),
  answerArea: document.getElementById("answer-area"),
  explainArea:document.getElementById("explain-area"),
  prevBtn:    document.getElementById("prev-btn"),
  nextBtn:    document.getElementById("next-btn"),
  navStatus:  document.getElementById("nav-status"),
};

// ── 렌더링 ──────────────────────────────────────────────
function render() {
  if (!questions.length) {
    el.qText.textContent = `SET ${setId}의 문제가 없습니다.`;
    return;
  }

  const q = questions[currentIdx];

  // 상단 바
  const weekTag = weekFilter >= 2 && weekFilter <= 7 ? ` · Week ${weekFilter}` : "";
  el.setInfo.textContent = reviewMode
    ? (allSets ? `전 세트 오답 리뷰${weekTag}` : `SET ${setId} · 오답 리뷰${weekTag}`)
    : `SET ${setId}${weekTag} · ${mode === "instant" ? "즉시 채점" : "일괄 채점"}`;
  el.qno.textContent = `문제 ${currentIdx + 1} / ${questions.length}`;
  el.progress.style.width = `${((currentIdx + 1) / questions.length) * 100}%`;

  // 메타 태그
  el.tagWeek.textContent = `Week ${q.week}`;
  el.tagTopic.textContent = q.topic || "";
  el.tagDiff.textContent = {
    easy: "쉬움", medium: "보통", hard: "어려움"
  }[q.difficulty] || q.difficulty;
  el.tagDiff.className = `tag tag-difficulty-${q.difficulty}`;

  // 북마크 토글 표시
  el.bookmark.classList.toggle("active", bookmarks.has(q.id));

  // 문제 본문
  el.qNum.textContent = `Q ${currentIdx + 1}`;
  el.qText.textContent = q.question;

  // 이미지
  if (q.image) {
    el.qImage.src = q.image;
    el.qImage.alt = q.topic || "";
    el.qImage.style.display = "block";
  } else {
    el.qImage.style.display = "none";
  }

  // 선택지 / 입력 영역
  el.answerArea.innerHTML = "";
  if (q.type === "multiple_choice") {
    renderChoices(q);
  } else if (q.type === "short_answer") {
    renderShortAnswer(q);
  }

  // 이전/다음 버튼
  el.prevBtn.disabled = currentIdx === 0;
  el.nextBtn.textContent = currentIdx === questions.length - 1 ? "제출" : "다음 →";

  // 해설 영역: instant 모드에서 이미 확정된 문제면 해설 노출
  el.explainArea.innerHTML = "";
  if (mode === "instant" && lockedInstant.has(q.id)) {
    showExplain(q);
  }

  // 네비 상태 문구 (답한 개수)
  const answeredCount = Object.keys(answers).length;
  el.navStatus.textContent = `답함 ${answeredCount} / ${questions.length}${bookmarks.size ? ` · 🔖 ${bookmarks.size}` : ""}`;

  // KaTeX
  if (typeof window.renderMath === "function") window.renderMath();
}

function renderChoices(q) {
  const container = document.createElement("div");
  container.className = "choices";

  const saved = getAnswer(q.id);
  const selectedOrigIdx = saved?.choice;  // 원본 정답 기준 저장값
  const locked = mode === "instant" && lockedInstant.has(q.id);

  const shuffle = getShuffleMap(q);  // displayIdx → originalIdx

  shuffle.forEach((origIdx, displayIdx) => {
    // 원본 선택지에 하드코딩된 ①②③④ 기호 제거 (셔플된 순서와 안 맞으니까)
    const text = q.choices[origIdx].replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/, "");
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.dataset.origIdx = origIdx;
    btn.innerHTML = `
      <span class="choice-index">${displayIdx + 1}</span>
      <span class="choice-text">${escapeHtml(text)}</span>
    `;

    if (locked) {
      btn.classList.add("locked");
      btn.disabled = true;
      if (origIdx === q.answer) btn.classList.add("correct");
      else if (origIdx === selectedOrigIdx) btn.classList.add("incorrect");
    } else if (selectedOrigIdx === origIdx) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => handleChoiceClick(q, origIdx, container));
    container.appendChild(btn);
  });

  el.answerArea.appendChild(container);
}

function handleChoiceClick(q, origIdx, container) {
  if (mode === "instant" && lockedInstant.has(q.id)) return;

  setMultiChoice(q.id, origIdx);  // 원본 정답 기준으로 저장 (채점 정확성 유지)

  if (mode === "instant") {
    lockedInstant.add(q.id);
    container.querySelectorAll(".choice").forEach((btn) => {
      const bOrig = parseInt(btn.dataset.origIdx, 10);
      btn.disabled = true;
      btn.classList.add("locked");
      btn.classList.remove("selected");
      if (bOrig === q.answer) btn.classList.add("correct");
      else if (bOrig === origIdx) btn.classList.add("incorrect");
    });
    if (origIdx !== q.answer) addWrong(q.id); else removeWrong(q.id);
    showExplain(q);
  } else {
    container.querySelectorAll(".choice").forEach((btn) => {
      const bOrig = parseInt(btn.dataset.origIdx, 10);
      btn.classList.toggle("selected", bOrig === origIdx);
    });
  }

  persistProgress();
  updateNavStatus();
}

function renderShortAnswer(q) {
  const wrap = document.createElement("div");

  const input = document.createElement("input");
  input.className = "short-input";
  input.id = "short-input";
  input.autocomplete = "off";
  input.spellcheck = false;

  if (q.answer_type === "number") {
    input.type = "text";
    input.inputMode = "decimal";
    input.placeholder = q.tolerance
      ? `숫자 입력 (허용 오차 ±${q.tolerance})`
      : "숫자 입력";
  } else {
    input.type = "text";
    input.placeholder = q.keywords?.length
      ? `한 문장 서술 (핵심 키워드: ${q.keywords.join(", ")})`
      : "한 문장 서술";
  }

  const saved = getAnswer(q.id);
  if (saved?.text !== undefined) input.value = saved.text;

  const locked = mode === "instant" && lockedInstant.has(q.id);
  if (locked) input.disabled = true;

  input.addEventListener("input", () => {
    setShortAnswer(q.id, input.value);
    persistProgress();
    updateNavStatus();
  });

  // Enter로 즉시 채점 확정 (instant 모드)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && mode === "instant" && !locked) {
      e.preventDefault();
      confirmShortAnswer(q);
    }
  });

  wrap.appendChild(input);

  if (q.answer_type === "text" && q.keywords?.length && !locked) {
    const hint = document.createElement("div");
    hint.className = "muted small";
    hint.style.marginTop = "10px";
    hint.textContent = `채점 기준: 답안에 아래 키워드가 모두 포함되어야 정답 — ${q.keywords.map(k => `"${k}"`).join(" · ")}`;
    wrap.appendChild(hint);
  }

  // instant 모드: 확정 버튼
  if (mode === "instant" && !locked) {
    const confirmBtn = document.createElement("button");
    confirmBtn.className = "btn btn-primary btn-sm";
    confirmBtn.style.marginTop = "12px";
    confirmBtn.textContent = "답안 확정 (Enter)";
    confirmBtn.addEventListener("click", () => confirmShortAnswer(q));
    wrap.appendChild(confirmBtn);
  }

  el.answerArea.appendChild(wrap);
}

function confirmShortAnswer(q) {
  lockedInstant.add(q.id);
  const userText = getAnswer(q.id)?.text ?? "";
  const g = grade(q, userText);
  if (!g.correct) addWrong(q.id); else removeWrong(q.id);
  persistProgress();
  render(); // 잠금 상태로 다시 렌더
}

// ── 해설 패널 ──────────────────────────────────────────
function showExplain(q) {
  const saved = getAnswer(q.id);
  const userAns = q.type === "multiple_choice" ? saved?.choice : (saved?.text ?? "");
  const g = grade(q, userAns);
  const correctMark = g.correct ? "✅ 정답" : "❌ 오답";

  const html = `
    <div class="explain">
      <div class="explain-title">${correctMark} · 해설</div>
      <div class="explain-brief">${escapeHtml(q.brief)}</div>
      ${q.detailed ? `
        <details class="explain-toggle">
          <summary>자세한 해설 보기</summary>
          <div class="explain-detailed">${escapeHtml(q.detailed)}</div>
        </details>
      ` : ""}
      ${q.source ? `<span class="explain-source">출처 · ${escapeHtml(q.source)}</span>` : ""}
    </div>
  `;
  el.explainArea.innerHTML = html;
  if (typeof window.renderMath === "function") window.renderMath();
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── 답안 헬퍼 ──────────────────────────────────────────
function getAnswer(qid) { return answers[qid]; }
function setMultiChoice(qid, idx) { answers[qid] = { choice: idx }; }
function setShortAnswer(qid, text) { answers[qid] = { text }; }

// ── 네비게이션 ────────────────────────────────────────
function go(delta) {
  const next = currentIdx + delta;
  if (next < 0 || next >= questions.length) return;
  currentIdx = next;
  persistProgress();
  render();
}

function updateNavStatus() {
  const answeredCount = Object.keys(answers).length;
  el.navStatus.textContent = `답함 ${answeredCount} / ${questions.length}${bookmarks.size ? ` · 🔖 ${bookmarks.size}` : ""}`;
}

el.prevBtn?.addEventListener("click", () => go(-1));
el.nextBtn?.addEventListener("click", () => {
  if (currentIdx === questions.length - 1) handleSubmit();
  else go(1);
});

// ── 북마크 ──────────────────────────────────────────────
el.bookmark?.addEventListener("click", () => {
  const q = questions[currentIdx];
  if (bookmarks.has(q.id)) bookmarks.delete(q.id);
  else bookmarks.add(q.id);
  el.bookmark.classList.toggle("active", bookmarks.has(q.id));
  persistProgress();
  updateNavStatus();
});

// ── 키보드 단축키 ──────────────────────────────────────
document.addEventListener("keydown", (e) => {
  // 입력 필드 포커스 중엔 숫자 키 단축키 비활성
  const target = e.target;
  const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

  if (e.key === "ArrowLeft" && !isInput) { e.preventDefault(); go(-1); }
  else if (e.key === "ArrowRight" && !isInput) { e.preventDefault(); go(1); }
  else if (e.key === "Enter" && !isInput) {
    e.preventDefault();
    if (currentIdx === questions.length - 1) handleSubmit();
    else go(1);
  }
  else if (e.key.toLowerCase() === "b" && !isInput) {
    e.preventDefault();
    el.bookmark?.click();
  }
  else if (!isInput && /^[1-4]$/.test(e.key)) {
    const q = questions[currentIdx];
    if (q.type === "multiple_choice") {
      const displayIdx = parseInt(e.key, 10) - 1;
      const shuffle = getShuffleMap(q);
      const origIdx = shuffle[displayIdx];
      if (origIdx !== undefined) {
        const container = el.answerArea.querySelector(".choices");
        if (container) handleChoiceClick(q, origIdx, container);
      }
    }
  }
});

// ── 제출 ────────────────────────────────────────────────
function handleSubmit() {
  // 미응답 체크
  const unanswered = questions.filter(q => !answers[q.id]).length;
  if (unanswered > 0) {
    if (!confirm(`미응답 문제가 ${unanswered}개 있습니다. 그래도 제출할까요?`)) return;
  }

  endTime = Date.now();
  const durationSec = Math.round((endTime - startTime) / 1000);

  // 채점
  const result = scoreSet(questions, answers);
  const wrongQids = collectWrongIds(result);

  // 오답노트 업데이트 (이미 instant 모드에서 진행 중이지만 batch 모드 대응)
  wrongQids.forEach(id => addWrong(id));
  result.perQuestion.filter(p => p.correct).forEach(p => removeWrong(p.qid));

  // sessionStorage에 결과 저장
  const payload = {
    setId,
    total: result.total,
    correct: result.correct,
    wrong: result.wrong,
    score100: result.score100,
    durationSec,
    byWeek: result.byWeek,
    wrongQids,
  };
  try {
    sessionStorage.setItem("ml-exam:lastResult", JSON.stringify(payload));
  } catch (e) {
    console.error("결과 저장 실패:", e);
  }

  // 세션 클리어
  clearProgress(setId);

  // 결과 페이지로
  location.href = `result.html?set=${setId}`;
}

// ── 나가기 확인 오버라이드 ────────────────────────────
window.__exam = {
  confirmExit: () => {
    const answered = Object.keys(answers).length;
    const msg = answered > 0
      ? `시험을 중단하고 홈으로 돌아가시겠습니까? (답한 ${answered}문제는 이어 풀기로 저장됩니다)`
      : "시험을 중단하고 홈으로 돌아가시겠습니까?";
    if (confirm(msg)) {
      persistProgress();
      location.href = "index.html";
    }
  }
};

// ── 초기 렌더링 ────────────────────────────────────────
render();

// 디버깅용
window.__examState = { setId, mode, questions, answers, bookmarks, get currentIdx() { return currentIdx; } };
