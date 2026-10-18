// blanks.js — 빈칸 유도 문항에서 빈칸을 눌러 다섯 보기 가운데 고르게 한다.
// 실제 시험은 빈칸에 손으로 쓴다. 이 화면은 종이 없이도 풀 수 있게 하는 보조 수단이고,
// 고른 답은 빈칸 자리에 바로 채워져 유도의 줄이 이어지는지 눈으로 볼 수 있다.
// 보기 자료는 문항의 <section data-q="options"> 에서 온다(tools/build-prep.mjs 가 q.blanks 로 묶는다).
//
// 채점된 뒤에는 틀렸거나 안 고른 빈칸만 비워 다시 풀 수 있다. 다시 푼 답은 처음 고른 답(picks)과
// 따로 둔다(retry). 처음 고른 답과 그 점수는 바뀌지 않는다.
// "보기 늦게 보기"를 켜면 빈칸을 눌러도 보기를 바로 보이지 않고, 먼저 떠올려 보게 한다.

import { esc, renderMd, typeset } from "./prep.js";

const MARK = ["①", "②", "③", "④", "⑤"];
const STATE_KO = { empty: "", picked: "고름", right: "맞음", wrong: "틀림", missed: "안 고름" };
const LOOK = { fill: "\\blankfill", ok: "\\blankok", no: "\\blankno" };
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

/** 빈칸 자리에 답을 넣은 문제 원문. show(n) 은 { i: 보기 순번, look: fill | ok | no } 또는 null(빈 상자). */
function filledStem(q, show) {
  const byN = new Map(q.blanks.map((b) => [String(b.n), b]));
  return q.stem.replace(/\\blank\{(\d+)\}/g, (whole, n) => {
    const b = byN.get(n);
    const s = b && show(b.n);
    const opt = s && b.options[s.i];
    return opt ? `${LOOK[s.look]}{${n}}{${opt.tex}}` : whole;
  });
}

/**
 * 문항 하나에 보기 고르기를 붙인다.
 * item: 문항 요소(.ex-stem 을 품고 있어야 한다).
 * picks: { 빈칸번호: 보기 순번 } 처음 고른 답(이 객체를 그대로 고쳐 쓴다).
 * retry: 다시 풀기 기록 { open: [빈칸번호], picks: { 빈칸번호: 보기 순번 }, graded } 또는 null. 바뀔 때마다 onRetry 로 알린다.
 * recall: 보기 늦게 보기. concepts: 틀린 빈칸이 있을 때 보일 개념 링크 [{ href, title }].
 * retryNote: 다시 풀기 버튼 옆에 적을 한 줄(모의시험에서는 점수에 들어가지 않는다는 안내).
 */
export function attachBlanks(item, q, {
  picks = {}, retry = null, onChange = () => {}, onRetry = () => {}, recall = false, onRecall = null, concepts = [], retryNote = "", autoOpen = false,
} = {}) {
  const stem = item.querySelector(".ex-stem");
  const uid = `bk${++seq}`;
  const byN = new Map(q.blanks.map((b) => [b.n, b]));
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = new Set(); // 보기 늦게 보기에서 "보기 보기"를 누른 빈칸
  let active = autoOpen ? q.blanks[0]?.n ?? null : null;
  let graded = false;
  let feedback = false; // 바로 보기에서도 미응답의 정답은 가리고, 고른 답은 고칠 수 있다.

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
    <div class="bk-scroll"><fieldset class="bk-opts" data-bk-opts hidden></fieldset></div>
    <p class="bk-foot">
      <span data-bk-count aria-live="polite"></span>
      <button type="button" class="ex-link" data-bk-close hidden>보기 접기</button>
      <button type="button" class="ex-link" data-bk-clear>고른 답 지우기</button>
    </p>
    <div class="bk-retry" data-bk-retry hidden>
      <button type="button" class="btn btn-secondary btn-sm" data-bk-retry-start>틀린 빈칸만 다시 풀기</button>
      <button type="button" class="btn btn-primary btn-sm" data-bk-retry-grade>다시 채점</button>
      <button type="button" class="ex-link" data-bk-retry-exit>처음 고른 답 보기</button>
      <span class="bk-retry-note" data-bk-retry-note></span>
      ${onRecall ? '<button type="button" class="ex-chip" data-bk-recall aria-pressed="false" title="빈칸을 눌러도 보기를 바로 보이지 않습니다">보기 늦게 보기</button>' : ""}
    </div>
    ${concepts.length ? `
    <p class="bk-concepts" data-bk-concepts hidden>
      <span>다시 볼 개념</span>
      ${concepts.map((c) => `<a class="ex-link" href="${esc(c.href)}">${esc(c.title)}</a>`).join("")}
    </p>` : ""}`;
  stem.after(panel);
  const nums = panel.querySelector(".bk-nums");
  const optsBox = panel.querySelector("[data-bk-opts]");
  const clearBtn = panel.querySelector("[data-bk-clear]");
  const closeBtn = panel.querySelector("[data-bk-close]");
  const retryRow = panel.querySelector("[data-bk-retry]");
  const startBtn = panel.querySelector("[data-bk-retry-start]");
  const gradeBtn = panel.querySelector("[data-bk-retry-grade]");
  const exitBtn = panel.querySelector("[data-bk-retry-exit]");
  const retryNoteEl = panel.querySelector("[data-bk-retry-note]");
  const conceptsRow = panel.querySelector("[data-bk-concepts]");
  // 채점 뒤에는 위쪽 띠가 없으므로, 다시 풀 때 쓸 수 있게 이 줄에도 '보기 늦게 보기'를 둔다.
  const recallBtn = panel.querySelector("[data-bk-recall]");
  const paintRecallBtn = () => { if (recallBtn) recallBtn.setAttribute("aria-pressed", recall ? "true" : "false"); };
  paintRecallBtn();
  const numBtn = (n) => panel.querySelector(`[data-bk-num="${n}"]`);

  const valid = (n, i) => i !== undefined && i !== null && !!byN.get(n)?.options[i];
  /** 저장돼 있던 다시 풀기 기록을 지금의 문항에 맞춘다. 쓸 수 없으면 null. */
  const cleanRetry = (r) => {
    if (!r || !Array.isArray(r.open)) return null;
    r.open = r.open.filter((n) => byN.has(n));
    if (!r.open.length) return null;
    r.picks = r.picks && typeof r.picks === "object" ? r.picks : {};
    r.graded = !!r.graded;
    return r;
  };
  retry = cleanRetry(retry);

  const retrying = () => graded && !!retry;
  const reopened = (n) => retrying() && retry.open.includes(n);
  /** 지금 답을 고를 수 있는 빈칸인가. 채점된 뒤에는 다시 푸는 빈칸만 고를 수 있다. */
  const editable = (n) => !graded || (reopened(n) && !retry.graded);
  /** 지금 빈칸에 보이는 답(보기 순번). 없으면 undefined. */
  const shown = (n) => {
    let i = picks[n];
    if (retrying()) i = valid(n, retry.picks[n]) ? retry.picks[n] : reopened(n) ? undefined : picks[n];
    return valid(n, i) ? i : undefined;
  };
  /** empty, picked(고칠 수 있는 동안) / right, wrong, missed(채점된 뒤) */
  const stateOf = (n) => {
    const i = shown(n);
    if (editable(n) && !(feedback && !graded && i !== undefined)) return i === undefined ? "empty" : "picked";
    if (i === undefined) return "missed";
    return byN.get(n).options[i].ok ? "right" : "wrong";
  };
  const notRight = () => q.blanks.map((b) => b.n).filter((n) => ["wrong", "missed"].includes(stateOf(n)));

  const markActive = () => {
    stem.querySelectorAll(".pp-blank-active").forEach((el) => el.classList.remove("pp-blank-active"));
    if (active === null) return;
    stem.querySelectorAll(`[data-blank="${active}"]`).forEach((el) => {
      (el.closest(".pp-blank") || el).classList.add("pp-blank-active");
    });
  };

  const paintStem = () => {
    stem.innerHTML = renderMd(filledStem(q, (n) => {
      const i = shown(n);
      if (i === undefined) return null;
      const st = stateOf(n);
      return { i, look: st === "right" ? "ok" : st === "wrong" ? "no" : "fill" };
    }));
    typeset(stem);
    markActive();
  };

  const paintNums = () => {
    q.blanks.forEach((b) => {
      const btn = numBtn(b.n);
      const state = stateOf(b.n);
      btn.setAttribute("data-state", state);
      btn.setAttribute("aria-pressed", active === b.n ? "true" : "false");
      btn.querySelector("[data-bk-state]").textContent = STATE_KO[state];
    });
    const s = scoreBlanks(q, picks);
    const left = notRight().length;
    const count = panel.querySelector("[data-bk-count]");
    const round = retrying() && !retry.graded; // 다시 풀고 있고 아직 다시 채점하지 않았다
    if (!graded) {
      count.textContent = `${s.total}개 가운데 ${s.picked}개 고름`;
    } else if (!retry) {
      count.textContent = `${s.total}개 가운데 ${s.right}개 맞음, ${s.got} / ${s.max}점`;
    } else {
      const n = retry.open.length;
      const done = retry.open.filter((k) => shown(k) !== undefined).length;
      const right = retry.open.filter((k) => stateOf(k) === "right").length;
      count.textContent = round ? `다시 푸는 빈칸 ${n}개 가운데 ${done}개 고름`
        : right === n ? (n === 1 ? "다시 푼 빈칸을 맞혔습니다" : `다시 푼 빈칸 ${n}개를 모두 맞혔습니다`)
        : `다시 푼 빈칸 ${n}개 가운데 ${right}개 맞음`;
      gradeBtn.disabled = done === 0;
    }
    clearBtn.hidden = graded || s.picked === 0;
    panel.setAttribute("data-graded", graded ? "true" : "false");

    // 다시 풀기: 채점된 뒤 틀렸거나 안 고른 빈칸이 있을 때만 보인다.
    startBtn.hidden = !graded || round || left === 0;
    gradeBtn.hidden = !round;
    exitBtn.hidden = !retrying();
    retryRow.hidden = startBtn.hidden && gradeBtn.hidden && exitBtn.hidden;
    retryNoteEl.textContent = retryRow.hidden ? ""
      : round ? `다시 푸는 동안 모범 답안은 가려 둡니다.${retryNote ? " 점수는 처음 고른 답 그대로입니다." : ""}`
      : startBtn.hidden ? "" : retryNote;
    // 문항 요소에 알려 모범 답안을 가리게 한다(css/prep.css).
    item.setAttribute("data-bk-retry", round ? "open" : retrying() ? "done" : "off");
    // 처음 고른 답에 틀린 빈칸이 있으면 관련 개념으로 가는 링크를 보인다.
    if (conceptsRow) conceptsRow.hidden = !(graded && s.picked > 0 && s.right < s.total);
  };

  const paintOpts = () => {
    // 보기가 열려 있는 동안 상자는 화면 아래쪽에 붙는다(CSS). 긴 유도에서도 누른 줄과 보기가 함께 보인다.
    panel.setAttribute("data-open", active === null ? "false" : "true");
    closeBtn.hidden = active === null;
    if (active === null) { optsBox.hidden = true; optsBox.innerHTML = ""; return; }
    const b = byN.get(active);
    const mine = shown(b.n);
    const open = editable(b.n);
    const legend = `<legend>빈칸 (${b.n}) <span class="bk-pts">${b.points}점</span></legend>`;
    optsBox.hidden = false;
    optsBox.setAttribute("data-feedback", feedback && !graded && mine !== undefined ? "true" : "false");
    optsBox.setAttribute("data-locked", open ? "false" : "true"); // 잠긴 빈칸은 맞고 틀림만 보인다
    // 보기 늦게 보기: 아직 고르지 않은 빈칸은 먼저 떠올려 본 뒤에 보기를 연다.
    if (recall && open && mine === undefined && !seen.has(b.n)) {
      optsBox.innerHTML = `${legend}
      <div class="bk-gate">
        <p>먼저 답을 떠올리거나 종이에 써 보세요.</p>
        <button type="button" class="btn btn-secondary btn-sm" data-bk-show>보기 보기</button>
      </div>`;
      return;
    }
    optsBox.innerHTML = legend + b.options.map((o, i) => {
      const show = !open || (feedback && !graded && mine !== undefined);
      const verdict = !show ? "" : o.ok ? "right" : mine === i ? "wrong" : "";
      const tag = verdict === "right" ? '<span class="bk-tag bk-tag-ok">정답</span>'
        : verdict === "wrong" ? '<span class="bk-tag bk-tag-no">내가 고른 답</span>' : "";
      return `
      <label class="bk-opt"${verdict ? ` data-verdict="${verdict}"` : ""}>
        <input type="radio" name="${uid}-${b.n}" value="${i}"${mine === i ? " checked" : ""}${open ? "" : " disabled"}>
        <span class="bk-opt-in">
          <span class="bk-opt-mark" aria-hidden="true">${MARK[i] || i + 1}</span>
          <span class="bk-opt-body">$${esc(o.tex)}$</span>
          ${tag}
        </span>
      </label>`;
    }).join("");
    typeset(optsBox);
  };

  const paintAll = () => { paintStem(); paintNums(); paintOpts(); };

  const activate = (n, reveal) => {
    if (!byN.has(n)) return;
    active = n;
    paintNums();
    paintOpts();
    markActive();
    // 번호 단추 줄이 가로로 넘치면(휴대폰) 누른 번호가 보이게 옆으로만 옮긴다.
    const btn = numBtn(n);
    if (nums.scrollWidth > nums.clientWidth) {
      const from = btn.offsetLeft - nums.offsetLeft;
      if (from < nums.scrollLeft) nums.scrollLeft = from - 8;
      else if (from + btn.offsetWidth > nums.scrollLeft + nums.clientWidth) nums.scrollLeft = from + btn.offsetWidth - nums.clientWidth + 8;
    }
    if (!reveal) return;
    // 누른 빈칸이 아래쪽에 붙은 보기 상자에 가려지면 그만큼만 올린다.
    requestAnimationFrame(() => {
      const box = stem.querySelector(`[data-blank="${n}"]`);
      if (!box) return;
      const hidden = box.getBoundingClientRect().bottom + 28 - panel.getBoundingClientRect().top;
      if (hidden > 0) window.scrollBy({ top: hidden, behavior: calm ? "auto" : "smooth" });
    });
  };

  /** 틀렸거나 안 고른 빈칸만 비워 다시 풀게 한다. 앞선 다시 풀기에서 맞힌 답은 남긴다. */
  const startRetry = () => {
    const open = notRight();
    if (!graded || !open.length) return;
    const keep = {};
    if (retry) Object.keys(retry.picks).forEach((k) => { if (!open.includes(Number(k))) keep[k] = retry.picks[k]; });
    retry = { open, picks: keep, graded: false };
    open.forEach((n) => seen.delete(n));
    active = null;
    onRetry(retry);
    paintAll();
    numBtn(open[0])?.focus({ preventScroll: true });
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
    if (e.target.closest("[data-bk-show]")) {
      seen.add(active);
      paintOpts();
      optsBox.querySelector("input")?.focus({ preventScroll: true });
      return;
    }
    if (e.target.closest("[data-bk-close]")) {
      const back = active;
      active = null;
      paintAll();
      numBtn(back)?.focus({ preventScroll: true });
      return;
    }
    if (e.target.closest("[data-bk-clear]")) {
      Object.keys(picks).forEach((k) => delete picks[k]);
      active = null;
      seen.clear();
      onChange(picks);
      paintAll();
      numBtn(q.blanks[0].n)?.focus({ preventScroll: true });
      return;
    }
    if (e.target.closest("[data-bk-recall]")) { if (onRecall) onRecall(!recall); return; }
    if (e.target.closest("[data-bk-retry-start]")) return startRetry();
    if (e.target.closest("[data-bk-retry-grade]")) {
      if (!retrying() || retry.graded) return;
      retry.graded = true;
      active = null;
      onRetry(retry);
      paintAll();
      (startBtn.hidden ? exitBtn : startBtn).focus({ preventScroll: true });
      return;
    }
    if (e.target.closest("[data-bk-retry-exit]")) {
      if (!retry) return;
      retry = null;
      active = null;
      onRetry(null);
      paintAll();
      (startBtn.hidden ? numBtn(q.blanks[0].n) : startBtn)?.focus({ preventScroll: true });
    }
  });
  optsBox.addEventListener("change", (e) => {
    const input = e.target.closest('input[type="radio"]');
    if (!input || active === null || !editable(active)) return;
    if (retrying()) { retry.picks[active] = Number(input.value); onRetry(retry); }
    else { picks[active] = Number(input.value); onChange(picks); }
    paintStem();
    paintNums();
    if (feedback && !graded) {
      paintOpts();
      optsBox.querySelector('input:checked')?.focus({ preventScroll: true });
    }
  });

  paintStem();
  paintNums();
  paintOpts();

  return {
    /** 선택한 빈칸만 즉시 채점한다. 미응답은 가리고, 선택은 계속 고칠 수 있다. */
    setFeedback(on) {
      if (feedback === !!on) return;
      feedback = !!on;
      paintAll();
    },
    /** 채점 상태로 바꾼다(고칠 수 없고, 맞고 틀림과 정답이 보인다). 채점을 풀면 다시 풀기 기록도 버린다. */
    setGraded(on) {
      if (graded === !!on) return;
      graded = !!on;
      if (!graded && retry) { retry = null; onRetry(null); }
      paintAll();
    },
    /** 다른 답 묶음으로 바꾼다(새로 시작할 때). 다시 풀기 기록도 함께 바꾼다. */
    setPicks(next, nextRetry = null) {
      if (next === picks && (nextRetry || null) === retry) return;
      picks = next;
      retry = cleanRetry(nextRetry);
      active = autoOpen ? q.blanks[0]?.n ?? null : null;
      seen.clear();
      paintAll();
    },
    /** 보기 늦게 보기를 켜고 끈다. */
    setRecall(on) {
      if (recall === !!on) return;
      recall = !!on;
      paintRecallBtn();
      paintOpts();
    },
    score: () => scoreBlanks(q, picks),
  };
}
