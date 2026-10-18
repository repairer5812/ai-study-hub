// prep.js — 시험 준비 화면(개념 지도, 모의시험, 주제별 문제)이 함께 쓰는 도우미.
//   - notes/<과목>/prep.json 을 불러온다(tools/build-prep.mjs 가 만든 묶음).
//   - 마크다운을 marked 로 그리고 수식은 KaTeX 로 그린다(review.js 와 같은 방식).
//   - 개념 나무를 만들고, 다른 LLM 에 붙여 넣을 채점 프롬프트를 조립한다.

import { getSubjectMeta } from "./subjects/index.js?v=20261018i";

export const params = new URLSearchParams(location.search);
export const subjectId = params.get("s") || "sl";

/** 과목 메타. 시험 준비 자료가 없는 과목이면 과목 화면으로 돌려보낸다. */
export function requireMeta() {
  let meta;
  try { meta = getSubjectMeta(subjectId); } catch (_) { meta = null; }
  if (!meta || !meta.prep) {
    location.replace(meta ? `subject.html?s=${subjectId}` : "index.html");
    throw new Error("No prep content for this subject");
  }
  return meta;
}

export async function loadPrep(meta) {
  const v = meta.prep.version ? `?v=${meta.prep.version}` : "";
  const resp = await fetch(`notes/${meta.id}/prep.json${v}`);
  if (!resp.ok) throw new Error(`prep.json ${resp.status}`);
  return resp.json();
}

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ───────────── 마크다운과 수식 ───────────── */

const SENTINEL = "§§MATH§§";

/** 마크다운 → HTML. marked 가 수식 안의 `_` 와 `\\` 를 건드리지 못하게 수식을 먼저 빼 둔다. */
export function renderMd(md) {
  const math = [];
  const keep = (m) => { math.push(m); return `${SENTINEL}${math.length - 1}${SENTINEL}`; };
  let src = String(md || "");
  src = src.replace(/\$\$[\s\S]+?\$\$/g, keep);
  src = src.replace(/\$(?!\s)[^\n$]*?(?<!\s)\$/g, keep);
  window.marked.setOptions({ gfm: true, breaks: false });
  let html = window.marked.parse(src);
  html = html.replace(new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, "g"), (_, i) => esc(math[+i] ?? ""));
  // 표는 휴대폰에서 가로로만 스크롤되게 감싼다.
  return html.replace(/<table>/g, '<div class="pp-table"><table>').replace(/<\/table>/g, "</table></div>");
}

/** 빈칸 상자. 누를 수 있게 class 와 data-blank 를 단다(js/blanks.js 가 이 표시를 읽는다). */
const blankBox = (cls, body) => `\\htmlClass{pp-blank ${cls}}{\\htmlData{blank=#1}{\\boxed{${body}}}}`;
const BLANK_MACROS = {
  "\\blank": blankBox("", "\\,\\text{(#1)}\\hspace{2.8em}"),              // 빈 빈칸: 번호만 든 상자
  "\\blankfill": blankBox("pp-blank-filled", "{\\scriptstyle\\text{(#1)}}\\;#2"),              // 고른 답을 채운 상자
  "\\blankok": blankBox("pp-blank-filled pp-blank-ok", "{\\scriptstyle\\text{(#1)}}\\;#2"),    // 채점 뒤: 맞음
  "\\blankno": blankBox("pp-blank-filled pp-blank-no", "{\\scriptstyle\\text{(#1)}}\\;#2"),    // 채점 뒤: 틀림
};

/** el 안의 $...$, $$...$$ 를 그린다. \blank{n} 은 모의시험의 n번 빈칸(번호 붙은 상자). */
export function typeset(el) {
  if (!window.renderMathInElement) return;
  window.renderMathInElement(el, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    macros: { ...BLANK_MACROS },
    // 빈칸 상자에 붙이는 class 와 data 속성만 허용한다.
    trust: (ctx) => ctx.command === "\\htmlClass" || ctx.command === "\\htmlData",
    throwOnError: false,
    strict: false,
  });
}

/** KaTeX 는 defer 로 불러오므로, 준비될 때까지 기다린다. */
export function whenMathReady() {
  return new Promise((resolve) => {
    const ok = () => window.marked && window.renderMathInElement;
    if (ok()) return resolve();
    const t = setInterval(() => { if (ok()) { clearInterval(t); resolve(); } }, 30);
    window.addEventListener("load", () => { clearInterval(t); resolve(); }, { once: true });
  });
}

/* ───────────── 개념 나무 ───────────── */

export function buildTree(concepts) {
  const bySlug = new Map(concepts.map((c) => [c.slug, { ...c, depth: 0, up: null, children: [] }]));
  let root = null;
  for (const node of bySlug.values()) {
    if (!node.parent) { root = node; continue; }
    const up = bySlug.get(node.parent);
    if (!up) continue;
    node.up = up;
    up.children.push(node);
  }
  const order = [];
  const walk = (node, depth) => {
    node.depth = depth;
    order.push(node);
    node.children.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
    node.children.forEach((c) => walk(c, depth + 1));
  };
  if (root) walk(root, 0);
  return { root, bySlug, order };
}

export function pathTo(node) {
  const path = [];
  for (let n = node; n; n = n.up) path.unshift(n);
  return path;
}

export function subtree(node) {
  return [node, ...node.children.flatMap(subtree)];
}

export const SIGNAL = {
  emph: { chip: "강조", cls: "ct-sig-emph", line: "수업에서 강조된 개념입니다. 유도나 비교를 직접 써 볼 수 있어야 합니다." },
  hw: { chip: "과제", cls: "ct-sig-hw", line: "이번 학기 과제의 핵심 개념입니다. 해당 과제에서 요구한 계산이나 코드를 직접 확인하세요." },
  out: { chip: "범위 밖", cls: "ct-sig-out", line: "수업에서 시험 범위 밖으로 언급된 내용입니다. 흐름을 이해하는 용도로만 읽으세요." },
  skim: { chip: "건너뜀", cls: "ct-sig-skim", line: "슬라이드에는 있지만 수업에서는 다루지 않고 넘어간 내용입니다. 범위에서 빠졌다는 뜻은 아니니 결론만은 알아 두세요." },
};
export const sigChip = (signal) => (SIGNAL[signal] ? `<span class="ct-sig ${SIGNAL[signal].cls}">${SIGNAL[signal].chip}</span>` : "");

/* ───────────── 문항 ───────────── */

const PART_ORDER = ["A", "B", "C", "D"];
export const sortQuestions = (qs) =>
  [...qs].sort((a, b) => PART_ORDER.indexOf(a.part) - PART_ORDER.indexOf(b.part) || a.no - b.no);
export const labelOf = (q) => `${q.part}${q.no}`;
export const isWritten = (q) => q.type === "blank" || q.type === "calc" || q.type === "essay";
export const TYPE_KO = { tf: "참거짓", mc: "객관식", blank: "빈칸 유도", calc: "계산", essay: "서술" };

/**
 * 다른 LLM 에 붙여 넣을 채점 프롬프트. 문제, 모범 답안, 채점 기준을 모두 담아
 * 그 LLM 이 과목을 몰라도 기준표대로 채점할 수 있게 한다.
 */
export function gradingPrompt(courseName, items) {
  const total = items.reduce((s, i) => s + i.points, 0);
  const blocks = items
    .map((i) => `### 문항 ${i.key} (${i.points}점)\n\n[문제]\n${i.stem}\n\n[모범 답안]\n${i.solution}\n\n[채점 기준]\n${i.rubric}`)
    .join("\n\n---\n\n");
  const keys = items.map((i) => `${i.key}=__`).join(", ");
  return `당신은 대학원 과목 "${courseName}"의 채점 조교입니다. 아래에 모의시험 문제, 모범 답안, 채점 기준이 있습니다.
제가 손으로 쓴 답안지 사진을 함께 올립니다. 사진을 읽고 채점 기준대로 채점해 주세요.

## 채점 규칙

1. 모범 답안과 수학적으로 같은 식이면 표기나 정리 순서가 달라도 정답입니다. 예: 상수배를 밖으로 뺀 꼴, 항의 순서, 지수와 로그를 풀어 쓴 꼴.
2. 문제의 \\blank{n} 은 n번 빈칸입니다. 빈칸 문항은 빈칸 번호별로 따로 채점합니다.
3. 앞 빈칸이 틀려서 뒤 빈칸이 틀린 경우, 뒤 빈칸이 앞의 틀린 답과 논리적으로 일관되면 그 빈칸 배점의 절반을 줍니다. 다만 채점 기준이 그 답의 점수를 적어 두었으면 이 규칙을 쓰지 말고 채점 기준의 점수만 줍니다.
4. 부호, 첨자, 합의 범위, 로그의 유무는 수학적 내용입니다. 틀리면 감점합니다. 값이 달라지지 않는 차이는 틀린 것이 아닙니다. 예: 절댓값이나 제곱 안에서 빼는 순서를 바꾼 것.
5. 글씨를 읽을 수 없는 부분은 짐작하지 말고 "판독 불가"라고 적고, 그 부분은 0점 처리한 뒤 제가 다시 적어 드리면 재채점하겠다고 말해 주세요.
6. 채점 기준에 없는 이유로 점수를 더하거나 빼지 마세요. 후하게도 박하게도 주지 말고 기준표대로만. 이 규칙들과 문항의 채점 기준이 어긋나면 문항의 채점 기준이 우선합니다.

## 출력 형식

1. 문항별 표: 문항(빈칸), 득점/배점, 근거 한 줄.
2. 틀린 곳마다: 제가 쓴 것, 맞는 것, 어디서부터 어긋났는지. 틀린 곳이 없으면 "없음".
3. 다시 볼 개념 세 가지. 틀린 곳에서 고릅니다. 틀린 곳이 없으면 "없음".
4. 마지막 줄에 점수만 이 형식으로 한 줄(사이트에 옮겨 적을 용도, 총 ${total}점 만점):
   ${keys}

---

${blocks}
`;
}

export const promptItem = (q, key = labelOf(q)) => ({ key, points: q.points, stem: q.stem, solution: q.solution, rubric: q.rubric });

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_e) { ok = false; }
    ta.remove();
    return ok;
  }
}

/* ───────────── 브라우저 저장 ───────────── */

export const store = {
  get(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "null");
      return v ?? fallback;
    } catch (_) {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
  },
};

/** 화면 머리(빵부스러기, 제목)를 과목에 맞춘다. */
export function fillCrumb(meta, tail) {
  const crumb = document.getElementById("crumb");
  if (crumb) crumb.textContent = `← 홈 / ${meta.title}${tail ? ` / ${tail}` : ""}`;
  const back = document.getElementById("back-subject");
  if (back) { back.href = `subject.html?s=${meta.id}`; back.textContent = meta.title; }
}
