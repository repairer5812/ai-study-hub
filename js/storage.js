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
