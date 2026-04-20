import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { firebaseConfig } from "../firebase-config.js";

let _app = null;
let _db = null;

const NICK_RE = /^[가-힣a-zA-Z0-9_]{1,16}$/;

export function initLeaderboard() {
  if (_app && _db) return;
  _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  _db = getFirestore(_app);
}

function ensureDb() {
  if (!_db) initLeaderboard();
  return _db;
}

function validateSubmission({ setId, nickname, score, totalQuestions, durationSec }) {
  if (typeof nickname !== "string" || !NICK_RE.test(nickname)) {
    return "닉네임은 한글·영문·숫자·밑줄 1~16자여야 합니다.";
  }
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    return "점수는 0~100 사이 정수여야 합니다.";
  }
  if (!Number.isInteger(setId) || setId < 1 || setId > 5) {
    return "세트 ID는 1~5 사이 정수여야 합니다.";
  }
  if (totalQuestions !== 30) {
    return "총 문항 수는 30이어야 합니다.";
  }
  if (!Number.isInteger(durationSec) || durationSec < 30 || durationSec > 10800) {
    return "소요 시간은 30~10800초 사이 정수여야 합니다.";
  }
  return null;
}

export async function submitScore({ setId, nickname, score, totalQuestions, durationSec }) {
  const err = validateSubmission({ setId, nickname, score, totalQuestions, durationSec });
  if (err) return { ok: false, error: err };

  try {
    const db = ensureDb();
    const ref = collection(db, "leaderboards", String(setId), "entries");
    await addDoc(ref, {
      nickname,
      score,
      totalQuestions,
      durationSec,
      setId,
      recordedAt: serverTimestamp()
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

export async function fetchTopRanking(setId, max = 20) {
  const db = ensureDb();
  const ref = collection(db, "leaderboards", String(setId), "entries");
  const snap = await getDocs(ref);
  const out = [];

  snap.forEach((doc) => {
    const d = doc.data();
    out.push({
      id: doc.id,
      nickname: d.nickname,
      score: d.score,
      totalQuestions: d.totalQuestions,
      durationSec: d.durationSec,
      setId: d.setId,
      recordedAt: d.recordedAt && typeof d.recordedAt.toDate === "function"
        ? d.recordedAt.toDate()
        : (d.recordedAt instanceof Date ? d.recordedAt : null)
    });
  });

  out.sort((a, b) => {
    const scoreDiff = Number(b.score || 0) - Number(a.score || 0);
    if (scoreDiff !== 0) return scoreDiff;

    const durationDiff = Number(a.durationSec || 0) - Number(b.durationSec || 0);
    if (durationDiff !== 0) return durationDiff;

    const timeA = a.recordedAt instanceof Date ? a.recordedAt.getTime() : Number.MAX_SAFE_INTEGER;
    const timeB = b.recordedAt instanceof Date ? b.recordedAt.getTime() : Number.MAX_SAFE_INTEGER;
    return timeA - timeB;
  });

  return out.slice(0, Math.max(0, max));
}
