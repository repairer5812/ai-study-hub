// blanks.js — 빈칸 유도 문항에서 빈칸을 눌러 다섯 보기 가운데 고르게 한다.
// 실제 시험은 빈칸에 손으로 쓴다. 이 화면은 종이 없이도 풀 수 있게 하는 보조 수단이고,
// 고른 답은 빈칸 자리에 바로 채워져 유도의 줄이 이어지는지 눈으로 볼 수 있다.
// 보기 자료는 문항의 <section data-q="options"> 에서 온다(tools/build-prep.mjs 가 q.blanks 로 묶는다).

import { esc, renderMd, typeset } from "./prep.js";

const MARK = ["①", "②", "③", "④", "⑤"];
let seq = 0;

export const hasBlankChoices = (q) => q.type === "blank" && Array.isArray(q.blanks) && q.blanks.length > 0;

/** 고른 답의 채점. got 은 맞은 빈칸의 배점 합. */
export function scoreBlanks(q, picks) {
  const out = { got: 0, right: 0, picked: 0, total: q.blanks.length, max: 0 };
  q.blanks.forEach((b) => {
    out.max += b.points;
    const i = picks[b.n];
    if (i === undefined || i === null || !b.options[i]) return;
    out.picked += 1;
    if (b.options[i].ok) { out.right += 1; out.got += b.points; }
  });
  return out;
}

/** 고른 답을 빈칸 자리에 넣은 문제 원문. graded 이면 맞고 틀림을 상자 모양으로 함께 보인다. */
function filledStem(q, picks, graded) {
  const byN = new Map(q.blanks.map((b) => [String(b.n), b]));
  return q.stem.replace(/\\blank\{(\d+)\}/g, (whole, n) => {
    const b = byN.get(n);
    const opt = b && b.options[picks[n]];
    if (!opt) return whole;
    const macro = !graded ? "\\blankfill" : opt.ok ? "\\blankok" : "\\blankno";
    return `${macro}{${n}}{${opt.tex}}`;
  });
}

/**
 * 문항 하나에 보기 고르기를 붙인다.
 * item: 문항 요소(.ex-stem 을 품고 있어야 한다). picks: { 빈칸번호: 보기 순번 } (이 객체를 그대로 고쳐 쓴다).
 */
export function attachBlanks(item, q, { picks = {}, onChange = () => {} } = {}) {
  const stem = item.querySelector(".ex-stem");
  const uid = `bk${++seq}`;
  const byN = new Map(q.blanks.map((b) => [b.n, b]));
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = null;
  let graded = false;

  const panel = document.createElement("div");
  panel.className = "bk";
  panel.lang = "ko";
  panel.innerHTML = `
    <p class="bk-lead">빈칸을 누르면 보기 다섯 개가 나옵니다. 그 줄에 실제로 들어갈 것을 하나 고르면 빈칸에 채워집니다.</p>
    <div class="bk-nums" role="group" aria-label="빈칸">
      ${q.blanks.map((b) => `
      <button type="button" class="bk-num" data-bk-num="${b.n}" aria-pressed="false">
        <span class="bk-num-no">(${b.n})</span><span class="bk-num-state" data-bk-state></span>
      </button>`).join("")}
    </div>
    <fieldset class="bk-opts" data-bk-opts hidden></fieldset>
    <p class="bk-foot">
      <span data-bk-count></span>
      <button type="button" class="ex-link" data-bk-close hidden>보기 접기</button>
      <button type="button" class="ex-link" data-bk-clear>고른 답 지우기</button>
    </p>`;
  stem.after(panel);
  const optsBox = panel.querySelector("[data-bk-opts]");
  const clearBtn = panel.querySelector("[data-bk-clear]");
  const closeBtn = panel.querySelector("[data-bk-close]");

  const picked = (n) => picks[n] !== undefined && picks[n] !== null && !!byN.get(n).options[picks[n]];

  const paintStem = () => {
    stem.innerHTML = renderMd(filledStem(q, picks, graded));
    typeset(stem);
    if (active !== null) {
      stem.querySelectorAll(`[data-blank="${active}"]`).forEach((el) => {
        (el.closest(".pp-blank") || el).classList.add("pp-blank-active");
      });
    }
  };

  const paintNums = () => {
    panel.querySelectorAll("[data-bk-num]").forEach((btn) => {
      const n = Number(btn.getAttribute("data-bk-num"));
      const b = byN.get(n);
      const has = picked(n);
      const state = !graded ? (has ? "picked" : "empty") : !has ? "missed" : b.options[picks[n]].ok ? "right" : "wrong";
      btn.setAttribute("data-state", state);
      btn.setAttribute("aria-pressed", active === n ? "true" : "false");
      btn.querySelector("[data-bk-state]").textContent = { empty: "", picked: "고름", right: "맞음", wrong: "틀림", missed: "안 고름" }[state];
    });
    const s = scoreBlanks(q, picks);
    panel.querySelector("[data-bk-count]").textContent = graded
      ? `${s.total}개 가운데 ${s.right}개 맞음, ${s.got} / ${s.max}점`
      : `${s.total}개 가운데 ${s.picked}개 고름`;
    clearBtn.hidden = graded || s.picked === 0;
    panel.setAttribute("data-graded", graded ? "true" : "false");
  };

  const paintOpts = () => {
    // 보기가 열려 있는 동안 상자는 화면 아래쪽에 붙는다(CSS). 긴 유도에서도 누른 줄과 보기가 함께 보인다.
    panel.setAttribute("data-open", active === null ? "false" : "true");
    closeBtn.hidden = active === null;
    if (active === null) { optsBox.hidden = true; optsBox.innerHTML = ""; return; }
    const b = byN.get(active);
    const mine = picks[b.n];
    optsBox.hidden = false;
    optsBox.innerHTML = `<legend>빈칸 (${b.n}) <span class="bk-pts">${b.points}점</span></legend>` + b.options.map((o, i) => {
      const verdict = !graded ? "" : o.ok ? "right" : mine === i ? "wrong" : "";
      const tag = verdict === "right" ? '<span class="bk-tag bk-tag-ok">정답</span>'
        : verdict === "wrong" ? '<span class="bk-tag bk-tag-no">내가 고른 답</span>' : "";
      return `
      <label class="bk-opt"${verdict ? ` data-verdict="${verdict}"` : ""}>
        <input type="radio" name="${uid}-${b.n}" value="${i}"${mine === i ? " checked" : ""}${graded ? " disabled" : ""}>
        <span class="bk-opt-in">
          <span class="bk-opt-mark" aria-hidden="true">${MARK[i] || i + 1}</span>
          <span class="bk-opt-body">$${esc(o.tex)}$</span>
          ${tag}
        </span>
      </label>`;
    }).join("");
    typeset(optsBox);
  };

  const activate = (n, reveal) => {
    if (!byN.has(n)) return;
    active = n;
    paintNums();
    paintOpts();
    stem.querySelectorAll(".pp-blank-active").forEach((el) => el.classList.remove("pp-blank-active"));
    stem.querySelectorAll(`[data-blank="${n}"]`).forEach((el) => (el.closest(".pp-blank") || el).classList.add("pp-blank-active"));
    if (!reveal) return;
    // 누른 빈칸이 아래쪽에 붙은 보기 상자에 가려지면 그만큼만 올린다.
    requestAnimationFrame(() => {
      const box = stem.querySelector(`[data-blank="${n}"]`);
      if (!box) return;
      const hidden = box.getBoundingClientRect().bottom + 28 - panel.getBoundingClientRect().top;
      if (hidden > 0) window.scrollBy({ top: hidden, behavior: calm ? "auto" : "smooth" });
    });
  };

  // 유도 안의 빈칸을 누르면 그 빈칸의 보기를 편다.
  stem.addEventListener("click", (e) => {
    const box = e.target.closest(".pp-blank");
    if (!box || !stem.contains(box)) return;
    const el = box.matches("[data-blank]") ? box : box.querySelector("[data-blank]");
    if (el) activate(Number(el.getAttribute("data-blank")), true);
  });
  panel.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-bk-num]");
    if (btn) return activate(Number(btn.getAttribute("data-bk-num")), false);
    if (e.target.closest("[data-bk-close]")) {
      active = null;
      paintStem(); paintNums(); paintOpts();
      return;
    }
    if (e.target.closest("[data-bk-clear]")) {
      Object.keys(picks).forEach((k) => delete picks[k]);
      active = null;
      onChange(picks);
      paintStem(); paintNums(); paintOpts();
    }
  });
  optsBox.addEventListener("change", (e) => {
    const input = e.target.closest('input[type="radio"]');
    if (!input || graded || active === null) return;
    picks[active] = Number(input.value);
    onChange(picks);
    paintStem();
    paintNums();
  });

  paintStem();
  paintNums();

  return {
    /** 채점 상태로 바꾼다(고칠 수 없고, 맞고 틀림과 정답이 보인다). */
    setGraded(on) {
      if (graded === !!on) return;
      graded = !!on;
      paintStem(); paintNums(); paintOpts();
    },
    /** 다른 답 묶음으로 바꾼다(새로 시작할 때). */
    setPicks(next) {
      if (next === picks) return;
      picks = next;
      active = null;
      paintStem(); paintNums(); paintOpts();
    },
    score: () => scoreBlanks(q, picks),
  };
}
