// storage.js — LocalStorage 래퍼
const KEY = {
  BEST: (setId) => `ml-exam:best:set${setId}`,       // 세트별 개인 최고점
  PROGRESS: (setId) => `ml-exam:progress:set${setId}`, // 풀이 중 세션 복구용
  WRONG: "ml-exam:wrong",                             // 오답노트 (id 배열)
  NICKNAME: "ml-exam:nickname",                       // 기억된 닉네임
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

// 최고점
export function getBest(setId) {
  return get(KEY.BEST(setId), null); // { score, total, durationSec, at }
}
export function saveBest(setId, record) {
  const prev = getBest(setId);
  if (!prev || record.score > prev.score ||
      (record.score === prev.score && record.durationSec < prev.durationSec)) {
    set(KEY.BEST(setId), record);
    return true;
  }
  return false;
}

// 진행 중 세션
export function saveProgress(setId, state) { set(KEY.PROGRESS(setId), state); }
export function loadProgress(setId) { return get(KEY.PROGRESS(setId), null); }
export function clearProgress(setId) { remove(KEY.PROGRESS(setId)); }

// 오답노트
export function getWrongList() { return get(KEY.WRONG, []); }
export function addWrong(qid) {
  const list = getWrongList();
  if (!list.includes(qid)) { list.push(qid); set(KEY.WRONG, list); }
}
export function removeWrong(qid) {
  set(KEY.WRONG, getWrongList().filter(id => id !== qid));
}

// 닉네임
export function getNickname() { return get(KEY.NICKNAME, ""); }
export function saveNickname(name) { set(KEY.NICKNAME, name); }
