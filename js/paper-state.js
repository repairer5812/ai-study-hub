// paper-state.js — 모의시험 한 회분의 저장 상태(localStorage).
// 키와 구조를 바꾸면 방문자의 풀이와 점수가 사라진다. 이름과 순서를 그대로 둔다.
import { store } from "./prep.js?v=b62c1c4c48";

/** 풀이 기록의 키. exams.json 의 revision 이 바뀌면 새 시험으로 친다. */
export const examKey = (subjectId, exam) => `ai-study:${subjectId}:paper:${exam.set}${exam.revision ? `:${exam.revision}` : ""}`;
/** '보기 늦게 보기' 설정의 키(시험마다 따로, 연습과도 따로). */
export const recallKey = (subjectId, exam) => `ai-study:${subjectId}:paper:${exam.set}:recall`;

// blanks: 처음 고른 빈칸의 답(점수에 들어간다). retry: 틀린 빈칸을 다시 푼 기록(점수에 들어가지 않는다).
// checks: 체크리스트에서 체크한 항목. draft: 점수 칸에 적혀 있는 값(결과 보기를 누르기 전에도 남긴다).
export const emptyState = () => ({
  phase: "cover", startedAt: null, endedAt: null, pausedAt: null, pausedMs: 0, pauseY: 0, answers: {}, graded: false, scores: {},
  blanks: {}, retry: {}, checks: {}, draft: {}, revealed: {}, feedback: "immediate", ko: false, total: null,
});

/** 저장된 풀이를 읽고 빠진 칸을 채운다. */
export function loadState(key) {
  const saved = store.get(key, {});
  const state = Object.assign(emptyState(), saved);
  // 진행 중인 예전 시험은 종료 뒤 보기로 이어 가며, 새 시험은 바로 보기가 기본이다.
  if (!["immediate", "final"].includes(saved.feedback)) state.feedback = state.phase === "cover" ? "immediate" : "final";
  ["answers", "scores", "blanks", "retry", "checks", "draft", "revealed"].forEach((k) => {
    if (!state[k] || typeof state[k] !== "object") state[k] = {};
  });
  return state;
}

export const saveState = (key, state) => store.set(key, state);

/** 새로 시작하는 시험. 한국어 풀이 설정과 정답 확인 방식은 이어 간다. */
export const freshState = (prev, startedAt) => Object.assign(emptyState(), { ko: prev.ko, feedback: prev.feedback, startedAt });
