// paper-result.js — 모의시험 결과: 문항별 득점, 파트별 합계, 약한 가지, 빈칸이 틀린 문항, 걸린 시간, 지난 결과 줄.
import { esc, isWritten, labelOf } from "./prep.js?v=b62c1c4c48";
import { scoreBlanks } from "./blanks.js?v=b62c1c4c48";
import { elapsedMs, span } from "./paper-timer.js?v=b62c1c4c48";

export const num = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** getState 는 지금의 상태 객체를 돌려준다. 결과를 그리면 state.total 을 고친다. */
export function createResult({ root, exam, questions, blankQs, topicTitle, mapBase, getState }) {
  const $ = (sel) => root.querySelector(sel);
  const $$ = (sel) => Array.from(root.querySelectorAll(sel));
  const total = questions.reduce((s, q) => s + q.points, 0);
  const limit = exam.minutes * 60;

  const earnedOf = (q) => {
    const state = getState();
    return isWritten(q) ? state.scores[labelOf(q)] || 0 : state.answers[labelOf(q)] === q.answer ? q.points : 0;
  };

  const paint = () => {
    const state = getState();
    const sum = questions.reduce((s, q) => s + earnedOf(q), 0);
    state.total = sum;
    $("[data-ex-total]").textContent = num(sum);
    $$("[data-part-row]").forEach((row) => {
      const part = row.getAttribute("data-part-row");
      row.querySelector("[data-earned]").textContent = num(questions.filter((q) => q.part === part).reduce((s, q) => s + earnedOf(q), 0));
    });
    const topics = [...new Set(questions.map((q) => q.topic))].map((slug) => {
      const qs = questions.filter((q) => q.topic === slug);
      const max = qs.reduce((s, q) => s + q.points, 0);
      const got = qs.reduce((s, q) => s + earnedOf(q), 0);
      return { slug, title: topicTitle(slug), got, max, ratio: max ? got / max : 1 };
    }).sort((a, b) => a.ratio - b.ratio);
    $("[data-ex-weak]").innerHTML = topics.map((t) => `
      <li${t.ratio < 0.6 ? ' data-weak="true"' : ""}>
        <a href="${mapBase}&n=${t.slug}">${esc(t.title)}</a>
        ${t.ratio < 0.6 ? '<span class="ct-sig ct-sig-emph">먼저 보기</span>' : ""}
        <span class="ex-weak-score">${num(t.got)} / ${t.max}</span>
      </li>`).join("");
    // 화면에서 고른 빈칸 가운데 틀리거나 비운 것이 있는 문항으로 바로 간다(거기서 틀린 빈칸만 다시 풀 수 있다).
    const missed = blankQs
      .map((q) => ({ label: labelOf(q), s: scoreBlanks(q, state.blanks[labelOf(q)] || {}) }))
      .filter(({ s }) => s.picked > 0 && s.right < s.total);
    const miss = $("[data-ex-miss]");
    miss.hidden = !missed.length;
    miss.innerHTML = !missed.length ? "" : `
      <strong>빈칸이 틀린 문항</strong>
      <span>${missed.map(({ label, s }) => `<a class="ex-link" href="#q-${label}">${label}번 ${s.total - s.right}개</a>`).join(", ")}</span>
      <span>문항으로 가면 틀린 빈칸만 다시 풀 수 있습니다.</span>`;
  };

  const paintUsed = () => {
    const state = getState();
    const el = $("[data-ex-used]");
    if (!state.startedAt || !state.endedAt) { el.textContent = ""; return; }
    const used = elapsedMs(state) / 1000;
    el.textContent = used <= limit
      ? `걸린 시간 ${span(used)}. 제한 시간은 ${exam.minutes}분입니다.`
      : `걸린 시간 ${span(used)}. 제한 시간 ${exam.minutes}분을 ${span(used - limit)} 넘겼습니다.`;
  };

  const resume = $("[data-ex-resume]");
  const paintResume = () => {
    const state = getState();
    const has = state.total !== null && state.phase === "cover";
    resume.hidden = !has;
    if (has) $("[data-ex-resume-score]").textContent = `${num(state.total)} / ${total}점`;
  };

  return { paint, paintUsed, paintResume, earnedOf };
}
