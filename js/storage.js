// storage.js — LocalStorage 래퍼 (subject-aware, 하위 호환)
//
// subjectId를 인자로 받되 기본값은 "ml". "ml"일 때는 기존 키 스킴을 유지해
// 이전 사용자의 기계학습 best score · 오답노트가 보존되도록 한다.

const LEGACY_PREFIX = "ml-exam";

function prefix(subjectId) {
  if (!subjectId || subjectId === "ml") return LEGACY_PREFIX;  // 하위 호환
  return `ai-study:${subjectId}`;
}

const KEY = {
  BEST:     (setId, s) => `${prefix(s)}:best:set${setId}`,
  PROGRESS: (setId, s) => `${prefix(s)}:progress:set${setId}`,
  WRONG:    (s)        => `${prefix(s)}:wrong`,
  NICKNAME: ()         => "ml-exam:nickname", // 닉네임은 전역 공유 (사용자 동일)
};

function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}

function set(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function remove(key) { localStorage.removeItem(key); }

// ── 최고점 ──────────────────────────────────────────────
export function getBest(setId, subjectId = "ml") {
  return get(KEY.BEST(setId, subjectId), null);
}
export function saveBest(setId, record, subjectId = "ml") {
  const prev = getBest(setId, subjectId);
  if (!prev || record.score > prev.score ||
      (record.score === prev.score && record.durationSec < prev.durationSec)) {
    set(KEY.BEST(setId, subjectId), record);
    return true;
  }
  return false;
}

// ── 진행 중 세션 ────────────────────────────────────────
export function saveProgress(setId, state, subjectId = "ml") { set(KEY.PROGRESS(setId, subjectId), state); }
export function loadProgress(setId, subjectId = "ml") { return get(KEY.PROGRESS(setId, subjectId), null); }
export function clearProgress(setId, subjectId = "ml") { remove(KEY.PROGRESS(setId, subjectId)); }

// ── 오답노트 ────────────────────────────────────────────
export function getWrongList(subjectId = "ml") { return get(KEY.WRONG(subjectId), []); }
export function addWrong(qid, subjectId = "ml") {
  const list = getWrongList(subjectId);
  if (!list.includes(qid)) { list.push(qid); set(KEY.WRONG(subjectId), list); }
}
export function removeWrong(qid, subjectId = "ml") {
  set(KEY.WRONG(subjectId), getWrongList(subjectId).filter(id => id !== qid));
}

// ── 닉네임 (전역) ───────────────────────────────────────
export function getNickname() { return get(KEY.NICKNAME(), ""); }
export function saveNickname(name) { set(KEY.NICKNAME(), name); }

// ═════════════════════════════════════════════════════════
// 주차별 확인문제 (Weekly Quiz) — 정기고사와 완전 분리된 저장소
// 키 스킴: `${prefix}:weekly:best:w${week}` 등 별도 네임스페이스
// ═════════════════════════════════════════════════════════
const KEY_W = {
  BEST:     (week, s) => `${prefix(s)}:weekly:best:w${week}`,
  PROGRESS: (week, s) => `${prefix(s)}:weekly:progress:w${week}`,
  WRONG:    (s)       => `${prefix(s)}:weekly:wrong`,
};

export function getWeeklyBest(week, subjectId = "ml") {
  return get(KEY_W.BEST(week, subjectId), null);
}
export function saveWeeklyBest(week, record, subjectId = "ml") {
  const prev = getWeeklyBest(week, subjectId);
  if (!prev || record.score > prev.score ||
      (record.score === prev.score && record.durationSec < prev.durationSec)) {
    set(KEY_W.BEST(week, subjectId), record);
    return true;
  }
  return false;
}

export function saveWeeklyProgress(week, state, subjectId = "ml") {
  set(KEY_W.PROGRESS(week, subjectId), state);
}
export function loadWeeklyProgress(week, subjectId = "ml") {
  return get(KEY_W.PROGRESS(week, subjectId), null);
}
export function clearWeeklyProgress(week, subjectId = "ml") {
  remove(KEY_W.PROGRESS(week, subjectId));
}

export function getWeeklyWrongList(subjectId = "ml") { return get(KEY_W.WRONG(subjectId), []); }
export function addWeeklyWrong(qid, subjectId = "ml") {
  const list = getWeeklyWrongList(subjectId);
  if (!list.includes(qid)) { list.push(qid); set(KEY_W.WRONG(subjectId), list); }
}
export function removeWeeklyWrong(qid, subjectId = "ml") {
  set(KEY_W.WRONG(subjectId), getWeeklyWrongList(subjectId).filter(id => id !== qid));
}
