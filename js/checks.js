// checks.js: 계산과 서술 문항을 스스로 채점하는 체크리스트.
// 채점 기준을 "했다, 안 했다"로 답할 수 있는 항목으로 나눈 것이다. 내 답안에 있는 항목을 체크하면
// 체크한 항목의 점수를 더해 보여 준다. 채점 프롬프트를 LLM 에 넣는 방법과 함께 쓸 수 있다.
// 자료는 문항의 <section data-q="checks"> 에서 온다(tools/build-prep.mjs 가 q.checks 로 묶는다).
// checks 가 없는 문항에는 아무것도 그리지 않는다(hasChecks 로 먼저 거른다).

import { renderMd, typeset } from "./prep.js";

let seq = 0;
const num = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const keyOf = (g, i) => `${g}.${i}`;

export const hasChecks = (q) =>
  (q.type === "calc" || q.type === "essay") && Array.isArray(q.checks) && q.checks.some((g) => g.items?.length);

/** 체크한 항목의 점수 합. marks: { "묶음 순번.항목 순번": true } */
export function scoreChecks(q, marks) {
  const out = { got: 0, max: 0, done: 0, total: 0, groups: [] };
  q.checks.forEach((group, g) => {
    const row = { got: 0, max: 0 };
    group.items.forEach((item, i) => {
      out.total += 1;
      row.max += item.points;
      if (marks[keyOf(g, i)]) { out.done += 1; row.got += item.points; }
    });
    out.got += row.got;
    out.max += row.max;
    out.groups.push(row);
  });
  return out;
}

/** 한 줄짜리 마크다운. 바깥의 <p> 를 벗겨 label 안에 넣는다(수식은 typeset 이 뒤에 그린다). */
function inlineMd(md) {
  const html = renderMd(md).trim();
  const m = html.match(/^<p>([\s\S]*)<\/p>$/);
  return m && !/<\/?p>/.test(m[1]) ? m[1] : html;
}

/**
 * 문항 하나에 체크리스트를 붙인다. anchor 바로 뒤에 넣는다(모범 답안 아래).
 * marks: { "묶음.항목": true } (이 객체를 그대로 고쳐 쓴다). onChange 는 체크가 바뀔 때마다 점수와 함께 불린다.
 * noteHtml: 합계가 어디에 쓰이는지 알리는 한 줄(모의시험에서는 점수 칸으로 옮겨진다는 안내).
 */
export function attachChecks(anchor, q, { marks = {}, onChange = () => {}, noteHtml = "" } = {}) {
  const uid = `ck${++seq}`;
  const box = document.createElement("section");
  box.className = "ck";
  box.lang = "ko";
  box.setAttribute("aria-labelledby", `${uid}-h`);
  box.innerHTML = `
    <div class="ck-head">
      <p class="ck-title" id="${uid}-h">스스로 채점하기</p>
      <p class="ck-sum" aria-live="polite">체크한 점수 <strong data-ck-got>0</strong> / ${num(scoreChecks(q, {}).max)}점</p>
    </div>
    <p class="ck-lead">내 답안에 있는 항목만 체크합니다. 체크한 항목의 점수를 더합니다.</p>
    ${q.checks.map((group, g) => `
    <fieldset class="ck-group">
      <legend><span class="ck-group-label">${inlineMd(group.label)}</span> <span class="ck-group-pts" data-ck-group="${g}"></span></legend>
      ${group.items.map((item, i) => `
      <label class="ck-item">
        <input type="checkbox" name="${uid}-${keyOf(g, i)}" data-ck="${keyOf(g, i)}">
        <span class="ck-box" aria-hidden="true"></span>
        <span class="ck-text">${inlineMd(item.text)}</span>
        <span class="ck-pts">${num(item.points)}점</span>
      </label>`).join("")}
    </fieldset>`).join("")}
    <p class="ck-foot">
      ${noteHtml ? `<span class="ck-note">${noteHtml}</span>` : ""}
      <button type="button" class="ex-link" data-ck-clear hidden>체크 모두 지우기</button>
    </p>`;
  anchor.after(box);
  typeset(box);

  const got = box.querySelector("[data-ck-got]");
  const clearBtn = box.querySelector("[data-ck-clear]");
  const inputs = Array.from(box.querySelectorAll("input[data-ck]"));

  const paint = () => {
    const s = scoreChecks(q, marks);
    inputs.forEach((el) => { el.checked = !!marks[el.getAttribute("data-ck")]; });
    got.textContent = num(s.got);
    s.groups.forEach((row, g) => {
      box.querySelector(`[data-ck-group="${g}"]`).textContent = `${num(row.got)} / ${num(row.max)}점`;
    });
    clearBtn.hidden = s.done === 0;
    box.setAttribute("data-done", s.done === 0 ? "none" : s.done === s.total ? "all" : "some");
    return s;
  };

  box.addEventListener("change", (e) => {
    const el = e.target.closest("input[data-ck]");
    if (!el) return;
    const key = el.getAttribute("data-ck");
    if (el.checked) marks[key] = true; else delete marks[key];
    onChange(paint());
  });
  clearBtn.addEventListener("click", () => {
    Object.keys(marks).forEach((k) => delete marks[k]);
    onChange(paint());
    inputs[0]?.focus({ preventScroll: true });
  });

  paint();

  return {
    el: box,
    /** 다른 체크 묶음으로 바꾼다(새로 시작할 때). */
    setMarks(next) {
      if (next === marks) return;
      marks = next;
      paint();
    },
    score: () => scoreChecks(q, marks),
  };
}
