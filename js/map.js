// map.js — 개념 지도. 한 줄기에서 가지 치는 나무를 타고 내려가며 개념을 복습한다.
//   map.html?s=sl            첫 화면: 전체 나무와 줄기 설명
//   map.html?s=sl&n=<slug>   개념 한 장: 왼쪽에 현재 경로가 펼쳐진 나무, 오른쪽에 개념
// 확인한 개념과 마지막으로 본 개념은 이 브라우저(localStorage)에만 남는다.

import {
  subjectId, requireMeta, loadPrep, esc, renderMd, typeset, whenMathReady,
  buildTree, pathTo, subtree, SIGNAL, sigChip, store, fillCrumb,
} from "./prep.js?v=20261018i";

const meta = requireMeta();
const app = document.getElementById("app");
const KEY = `ai-study:${subjectId}:prep:concepts`;
const state = Object.assign({ done: [], last: null }, store.get(KEY, {}));
if (!Array.isArray(state.done)) state.done = [];

fillCrumb(meta, "개념 지도");
const examLink = document.getElementById("go-paper");
const firstExam = meta.prep.exams?.[0];
if (examLink && firstExam) { examLink.href = `paper.html?s=${subjectId}&set=${firstExam.set}`; examLink.style.display = ""; }

const hrefOf = (slug, tree) => (slug === tree.root.slug ? `map.html?s=${subjectId}` : `map.html?s=${subjectId}&n=${slug}`);

/* ───────────── 나무 ───────────── */
function branchHtml(node, tree, { current, open, onPath }) {
  if (!node.children.length) return "";
  return `<ul class="ct" role="list">${node.children.map((c) => {
    const expanded = c.children.length > 0 && (!open || open.has(c.slug));
    const rest = subtree(c).length - 1;
    return `<li class="ct-item" data-node="${c.slug}">
      <a class="ct-link" href="${hrefOf(c.slug, tree)}" data-nav="${c.slug}"${c.slug === current ? ' aria-current="page"' : ""}${onPath?.has(c.slug) ? ' data-path="true"' : ""}>
        <span class="ct-mark" aria-hidden="true"></span>
        <span class="ct-title">${esc(c.title)}</span>
        ${sigChip(c.signal)}
        ${c.children.length && !expanded ? `<span class="ct-count" aria-label="하위 개념 ${rest}개">${rest}</span>` : ""}
      </a>
      ${expanded ? branchHtml(c, tree, { current, open, onPath }) : ""}
    </li>`;
  }).join("")}</ul>`;
}

/* ───────────── 첫 화면 ───────────── */
function overviewHtml(tree) {
  const root = tree.root;
  const nodes = tree.order.filter((n) => n !== root);
  const emph = nodes.filter((n) => n.signal === "emph").length;
  const homework = nodes.filter((n) => n.signal === "hw").length;
  return `
  <header class="pp-head">
    <a class="pp-back" href="subject.html?s=${subjectId}">${esc(meta.title)}</a>
    <h1 class="pp-title">개념 지도</h1>
    <p class="pp-lead">${esc(root.summary)}</p>
    <dl class="pp-facts">
      <div><dt>개념</dt><dd>${nodes.length}개, 가지 ${root.children.length}개</dd></div>
      <div><dt>수업에서 강조</dt><dd>${emph}개</dd></div>
      <div><dt>과제 핵심</dt><dd>${homework}개</dd></div>
      <div><dt>확인한 개념</dt><dd><span class="pp-num" data-done-count data-total="${nodes.length}">0 / ${nodes.length}</span></dd></div>
    </dl>
    <div class="pp-actions">
      <a class="btn btn-primary" href="#course-route">핵심 복습 순서</a>
      <a class="btn btn-secondary" href="#map-tree-h">나무에서 개념 찾기</a>
      <a class="btn btn-secondary" data-resume hidden href="#">이어서 보기: <span data-resume-name></span></a>
      ${firstExam ? `<a class="btn btn-secondary" href="paper.html?s=${subjectId}&set=${firstExam.set}">모의시험</a>` : ""}
    </div>
  </header>

  <div class="map-shell">
    <section class="map-tree" aria-labelledby="map-tree-h">
      <div class="map-tree-head">
        <h2 id="map-tree-h">${esc(root.title)}</h2>
        <p class="map-legend">
          <span><span class="ct-sig ct-sig-emph">강조</span> 수업에서 강조된 개념</span>
          <span><span class="ct-sig ct-sig-hw">과제</span> 이번 학기 과제의 핵심 개념</span>
          <span><span class="ct-sig ct-sig-out">범위 밖</span> 시험 범위 밖으로 언급된 개념</span>
          <span><span class="ct-sig ct-sig-skim">건너뜀</span> 슬라이드에는 있지만 수업에서 넘어간 개념</span>
        </p>
      </div>
      ${root.children.map((b) => {
        const narrow = window.matchMedia("(max-width: 980px)").matches;
        const slugs = subtree(b).map((n) => n.slug);
        return `<details class="ctb" ${narrow ? "" : "open"} data-node="${b.slug}">
          <summary>
            <span class="ctb-chev" aria-hidden="true"></span>
            <span class="ctb-title">${esc(b.title)}</span>
            ${b.en ? `<span class="ctb-en" lang="en">${esc(b.en)}</span>` : ""}
            <span class="ctb-meta"><span data-done-count data-total="${slugs.length}" data-slugs="${slugs.join(" ")}">0 / ${slugs.length}</span></span>
          </summary>
          <div class="ctb-body">
            <p class="ctb-sum">${esc(b.summary)} <a href="${hrefOf(b.slug, tree)}" data-nav="${b.slug}">가지 개요 보기</a></p>
            ${branchHtml(b, tree, {})}
          </div>
        </details>`;
      }).join("")}
    </section>
    <article id="course-route" class="map-root pp-md" aria-label="핵심 복습 순서와 줄기">${renderMd(root.body)}</article>
  </div>`;
}

/* ───────────── 개념 한 장 ───────────── */
function nodeHtml(tree, node) {
  const path = pathTo(node);
  const onPath = new Set(path.map((n) => n.slug));
  const ctx = { current: node.slug, open: onPath, onPath };
  const i = tree.order.indexOf(node);
  const prev = i > 1 ? tree.order[i - 1] : null;
  const next = i < tree.order.length - 1 ? tree.order[i + 1] : null;
  const related = node.related.map((s) => tree.bySlug.get(s)).filter(Boolean);
  const rows = (list) => `<ul class="cs-rows">${list.map((c) => `
    <li data-node="${c.slug}"><a href="${hrefOf(c.slug, tree)}" data-nav="${c.slug}">
      <span class="ct-mark" aria-hidden="true"></span>
      <strong>${esc(c.title)} ${sigChip(c.signal)}</strong>
      <span class="cs-row-sum">${esc(c.summary)}</span>
    </a></li>`).join("")}</ul>`;
  const treeNav = branchHtml(tree.root, tree, ctx);

  return `
  <div class="prep-shell">
    <nav class="ct-rail" aria-label="개념 지도">
      <a class="ct-home" href="${hrefOf(tree.root.slug, tree)}" data-nav="">${esc(tree.root.title)}</a>
      ${treeNav}
    </nav>

    <article class="cs">
      <nav class="cs-path" aria-label="경로"><ol>
        ${path.slice(0, -1).map((p) => `<li><a href="${hrefOf(p.slug, tree)}" data-nav="${p === tree.root ? "" : p.slug}">${p === tree.root ? "개념 지도" : esc(p.title)}</a></li>`).join("")}
      </ol></nav>

      <details class="ct-drawer">
        <summary>지도에서 위치 보기</summary>
        ${treeNav}
      </details>

      <header class="cs-head">
        <h1 tabindex="-1">${esc(node.title)}</h1>
        ${node.en ? `<p class="cs-en" lang="en">${esc(node.en)}</p>` : ""}
        <p class="cs-summary">${esc(node.summary)}</p>
        ${SIGNAL[node.signal] ? `<p class="cs-signal">${sigChip(node.signal)} ${SIGNAL[node.signal].line}</p>` : ""}
      </header>

      <div class="cs-body pp-md">${renderMd(node.body)}</div>

      <p class="cs-done">
        <button type="button" class="cs-done-btn" data-done-toggle="${node.slug}" aria-pressed="false">
          <span class="cs-done-box" aria-hidden="true"></span>
          <span data-done-label>이 개념 확인함</span>
        </button>
      </p>

      ${node.children.length ? `<section class="cs-next"><h2>여기서 갈라지는 가지 <span class="pp-count">${node.children.length}</span></h2>${rows(node.children)}</section>` : ""}
      ${related.length ? `<section class="cs-next"><h2>함께 비교할 개념</h2>${rows(related)}</section>` : ""}

      <nav class="cs-step" aria-label="앞뒤 개념">
        ${prev
          ? `<a class="cs-step-prev" href="${hrefOf(prev.slug, tree)}" data-nav="${prev.slug}"><span class="cs-step-dir">이전</span><span class="cs-step-name">${esc(prev.title)}</span></a>`
          : `<a class="cs-step-prev" href="${hrefOf(tree.root.slug, tree)}" data-nav=""><span class="cs-step-dir">처음</span><span class="cs-step-name">개념 지도</span></a>`}
        ${next
          ? `<a class="cs-step-next" href="${hrefOf(next.slug, tree)}" data-nav="${next.slug}"><span class="cs-step-dir">다음</span><span class="cs-step-name">${esc(next.title)}</span></a>`
          : firstExam
            ? `<a class="cs-step-next" href="paper.html?s=${subjectId}&set=${firstExam.set}"><span class="cs-step-dir">마지막 개념입니다</span><span class="cs-step-name">모의시험으로</span></a>`
            : ""}
      </nav>
    </article>
  </div>`;
}

/* ───────────── 진도 ───────────── */
function paintProgress(tree) {
  const valid = new Set(tree.order.map((n) => n.slug));
  const done = new Set(state.done.filter((s) => valid.has(s)));
  app.querySelectorAll("[data-node]").forEach((el) => {
    if (done.has(el.getAttribute("data-node"))) el.setAttribute("data-done", "true");
    else el.removeAttribute("data-done");
  });
  app.querySelectorAll("[data-done-count]").forEach((el) => {
    const total = Number(el.getAttribute("data-total")) || 0;
    const slugs = (el.getAttribute("data-slugs") || "").split(" ").filter(Boolean);
    const n = slugs.length ? slugs.filter((s) => done.has(s)).length : [...done].filter((s) => s !== tree.root.slug).length;
    el.textContent = `${n} / ${total}`;
  });
  app.querySelectorAll("[data-done-toggle]").forEach((btn) => {
    const on = done.has(btn.getAttribute("data-done-toggle"));
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.querySelector("[data-done-label]").textContent = on ? "확인한 개념입니다" : "이 개념 확인함";
  });
  const resume = app.querySelector("[data-resume]");
  if (resume && state.last && tree.bySlug.has(state.last)) {
    resume.href = hrefOf(state.last, tree);
    resume.setAttribute("data-nav", state.last);
    resume.querySelector("[data-resume-name]").textContent = tree.bySlug.get(state.last).title;
    resume.hidden = false;
  }
}

/* ───────────── 그리기와 이동 ───────────── */
function render(tree, slug, { scroll = true } = {}) {
  const node = slug ? tree.bySlug.get(slug) : null;
  if (slug && (!node || node === tree.root)) return render(tree, "", { scroll });
  app.innerHTML = node ? nodeHtml(tree, node) : overviewHtml(tree);
  document.title = node ? `${node.title} · ${meta.title} 개념 지도` : `${meta.title} 개념 지도 · AI Study Hub`;
  typeset(app);
  if (node) { state.last = node.slug; store.set(KEY, state); }
  paintProgress(tree);
  if (scroll) {
    window.scrollTo({ top: 0 });
    const h1 = node && app.querySelector("h1[tabindex]");
    if (h1) h1.focus({ preventScroll: true });
  }
}

const sameMap = (a) => {
  // 본문 안의 map.html?s=..&n=.. 링크도 새로 불러오지 않고 바로 옮겨 간다.
  if (a.hasAttribute("data-nav")) return a.getAttribute("data-nav");
  const href = a.getAttribute("href") || "";
  if (!/^map\.html\?/.test(href)) return null;
  const q = new URLSearchParams(href.split("?")[1]);
  return q.get("s") === subjectId ? q.get("n") || "" : null;
};

(async function init() {
  try {
    const [data] = await Promise.all([loadPrep(meta), whenMathReady()]);
    const tree = buildTree(data.concepts);
    if (!tree.root) throw new Error("개념이 없습니다");

    app.addEventListener("click", (e) => {
      const toggle = e.target.closest("[data-done-toggle]");
      if (toggle) {
        const slug = toggle.getAttribute("data-done-toggle");
        const i = state.done.indexOf(slug);
        if (i >= 0) state.done.splice(i, 1); else state.done.push(slug);
        store.set(KEY, state);
        paintProgress(tree);
        return;
      }
      const a = e.target.closest("a");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      const slug = sameMap(a);
      if (slug === null) return;
      e.preventDefault();
      history.pushState({}, "", hrefOf(slug || tree.root.slug, tree));
      render(tree, slug);
    });
    window.addEventListener("popstate", () => {
      render(tree, new URLSearchParams(location.search).get("n") || "", { scroll: false });
    });

    render(tree, new URLSearchParams(location.search).get("n") || "", { scroll: false });
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="pp-empty"><h2>개념 지도를 불러오지 못했습니다</h2><p>잠시 뒤 다시 열어 주세요. (${esc(err.message)})</p></div>`;
  }
})();
