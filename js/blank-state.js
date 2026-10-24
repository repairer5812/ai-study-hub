// blank-state.js — 빈칸 유도 문항에서 빈칸 하나하나의 상태를 계산한다. 화면은 그리지 않는다(js/blanks.js 가 그린다).
// 함수는 모두 지금의 값 묶음 c 를 받는다.
//   c = { byN: Map(빈칸 번호 → 빈칸), picks: 처음 고른 답 { 번호: 보기 순번 }, retry: 다시 풀기 기록 또는 null,
//         graded: 채점됐는가, feedback: 바로 보기인가, lockAnswered: 연습처럼 고른 빈칸을 잠그는가 }
// 다시 풀기 기록: { open: [다시 푸는 빈칸 번호], picks: { 번호: 보기 순번 }, graded: 다시 채점했는가 }

/** 보기 순번 i 가 빈칸 n 의 보기인가. */
export const validPick = (byN, n, i) => i !== undefined && i !== null && !!byN.get(n)?.options[i];

/** 저장돼 있던 다시 풀기 기록을 지금의 문항에 맞춘다. 쓸 수 없으면 null. */
export function cleanRetry(byN, r) {
  if (!r || !Array.isArray(r.open)) return null;
  r.open = r.open.filter((n) => byN.has(n));
  if (!r.open.length) return null;
  r.picks = r.picks && typeof r.picks === "object" ? r.picks : {};
  r.graded = !!r.graded;
  return r;
}

export const isRetrying = (c) => c.graded && !!c.retry;
export const isReopened = (c, n) => isRetrying(c) && c.retry.open.includes(n);

/** 지금 답을 고를 수 있는 빈칸인가. 채점된 뒤에는 다시 푸는 빈칸만 고를 수 있다. */
export const isEditable = (c, n) => !c.graded ? !(c.lockAnswered && validPick(c.byN, n, c.picks[n])) : (isReopened(c, n) && !c.retry.graded);

/** 지금 빈칸에 보이는 답(보기 순번). 없으면 undefined. */
export function shownPick(c, n) {
  let i = c.picks[n];
  if (isRetrying(c)) i = validPick(c.byN, n, c.retry.picks[n]) ? c.retry.picks[n] : isReopened(c, n) ? undefined : c.picks[n];
  return validPick(c.byN, n, i) ? i : undefined;
}

/** empty, picked(고칠 수 있는 동안) / right, wrong, missed(채점된 뒤) */
export function blankState(c, n) {
  const i = shownPick(c, n);
  if (isEditable(c, n) && !(c.feedback && !c.graded && i !== undefined)) return i === undefined ? "empty" : "picked";
  if (i === undefined) return "missed";
  return c.byN.get(n).options[i].ok ? "right" : "wrong";
}

/** 틀렸거나 안 고른 빈칸의 번호. */
export const notRightBlanks = (q, c) => q.blanks.map((b) => b.n).filter((n) => ["wrong", "missed"].includes(blankState(c, n)));
