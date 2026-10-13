// practice.js — 주제별 문제. practice.html?s=sl
// 모의시험에서 약했던 가지만 골라 푼다. 종이에 먼저 풀고 정답을 펴 본다.

import {
  subjectId, requireMeta, loadPrep, esc, renderMd, typeset, whenMathReady,
  buildTree, isWritten, gradingPrompt, promptItem, copyText, TYPE_KO, fillCrumb,
} from "./prep.js";

const meta = requireMeta();
const app = document.getElementById("app");
fillCrumb(meta, "주제별 문제");
const goMap = document.getElementById("go-map");
if (goMap) { goMap.href = `map.html?s=${subjectId}`; goMap.style.display = ""; }

const TYPE_ORDER = ["tf", "mc", "blank", "calc", "essay"];
const mapBase = `map.html?s=${subjectId}`;

(async function init() {
  try {
    const [data] = await Promise.all([loadPrep(meta), whenMathReady()]);
    const questions = data.questions.filter((q) => q.set === "practice");
    if (!questions.length) throw new Error("문항이 없습니다");
    const tree = buildTree(data.concepts);
    const branchOrder = tree.root ? tree.root.children.map((b) => b.slug) : [];
    const rank = (slug) => (branchOrder.indexOf(slug) + 1) || 99;
    const topics = [...new Set(questions.map((q) => q.topic))]
      .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
      .map((slug) => ({
        slug,
        title: tree.bySlug.get(slug)?.title ?? slug,
        inMap: tree.bySlug.has(slug),
        items: questions
          .filter((q) => q.topic === slug)
          .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || a.no - b.no),
      }));
    const types = TYPE_ORDER.filter((t) => questions.some((q) => q.type === t));
    const firstExam = meta.prep.exams?.[0];

    document.title = `주제별 문제 · ${meta.title} · AI Study Hub`;
    app.innerHTML = `
<div class="pr" data-ko="off">
  <header class="pp-head">
    <a class="pp-back" href="subject.html?s=${subjectId}">${esc(meta.title)}</a>
    <h1 class="pp-title">주제별 문제</h1>
    <p class="pp-lead">모의시험에서 약했던 가지만 골라 풉니다. 종이에 먼저 풀고 정답을 펴 보세요.</p>
    <dl class="pp-facts">
      <div><dt>문항</dt><dd>${questions.length}문항</dd></div>
      <div><dt>주제</dt><dd>${topics.length}개</dd></div>
    </dl>
    <p class="ex-disclaimer">실제 기출이 아닙니다. 수업에서 다룬 내용과 강조된 부분을 바탕으로 만든 예상 문제입니다.</p>
    <div class="pr-tools">
      <div class="pr-filter" role="group" aria-label="문제 형식">
        <button type="button" class="ex-chip" data-pr-type="all" aria-pressed="true">전체</button>
        ${types.map((t) => `<button type="button" class="ex-chip" data-pr-type="${t}" aria-pressed="false">${TYPE_KO[t]}</button>`).join("")}
      </div>
      <button type="button" class="ex-chip" data-pr-ko aria-pressed="false">한국어 풀이</button>
    </div>
    <nav class="pr-jump" aria-label="주제 이동">
      ${topics.map((t) => `<a href="#${t.slug}">${esc(t.title)} <span class="pp-count">${t.items.length}</span></a>`).join("")}
    </nav>
  </header>

  ${topics.map((t) => `
  <section class="pr-topic ex-paper" id="${t.slug}" lang="en">
    <header class="ex-part-head" lang="ko">
      <h2>${esc(t.title)}</h2>
      ${t.inMap ? `<a class="ex-link" href="${mapBase}&n=${t.slug}">이 가지의 개념 보기</a>` : ""}
    </header>
    <ol class="ex-list" role="list">
      ${t.items.map((q, i) => `
      <li class="ex-q pr-q" data-type="${q.type}">
        <div class="ex-q-head">
          <span class="ex-q-no">${i + 1}.</span>
          ${q.title ? `<span class="ex-q-title">${esc(q.title)}</span>` : ""}
          <span class="ex-pts" lang="ko">${TYPE_KO[q.type]}</span>
        </div>
        <div class="ex-sec ex-stem pp-md">${renderMd(q.stem)}</div>
        <div class="ex-sec ex-ko pp-md" lang="ko">${renderMd(q.ko)}</div>
        <details class="pr-reveal" lang="ko">
          <summary>정답과 해설</summary>
          <p class="pr-reveal-tools">
            ${q.answer ? `<span class="pr-key">정답 ${esc(q.answer)}</span>` : ""}
            ${isWritten(q) ? `<button type="button" class="ex-link" data-pr-copy="${esc(q.id)}">채점 프롬프트 복사</button>` : ""}
            ${q.concepts[0] ? `<a class="ex-link" href="${mapBase}&n=${q.concepts[0]}">관련 개념 보기</a>` : ""}
          </p>
          <div class="ex-sec ex-solution pp-md">${renderMd(q.solution)}</div>
          ${q.rubric ? `<div class="ex-sec ex-rubric pp-md">${renderMd(q.rubric)}</div>` : ""}
        </details>
      </li>`).join("")}
    </ol>
  </section>`).join("")}

  <p class="pp-actions pr-foot">
    ${firstExam ? `<a class="btn btn-secondary" href="paper.html?s=${subjectId}&set=${firstExam.set}">모의시험</a>` : ""}
    <a class="btn btn-secondary" href="${mapBase}">개념 지도</a>
  </p>
</div>`;
    typeset(app);

    const root = app.querySelector(".pr");
    const byId = new Map(questions.map((q) => [q.id, q]));

    // 형식별로 골라 보기
    const filter = root.querySelector(".pr-filter");
    filter.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-pr-type]");
      if (!btn) return;
      const type = btn.getAttribute("data-pr-type");
      filter.querySelectorAll("[data-pr-type]").forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
      root.querySelectorAll(".pr-q").forEach((li) => { li.hidden = type !== "all" && li.getAttribute("data-type") !== type; });
      root.querySelectorAll(".pr-topic").forEach((sec) => { sec.hidden = !sec.querySelector(".pr-q:not([hidden])"); });
    });

    const ko = root.querySelector("[data-pr-ko]");
    ko.addEventListener("click", () => {
      const on = root.getAttribute("data-ko") !== "on";
      root.setAttribute("data-ko", on ? "on" : "off");
      ko.setAttribute("aria-pressed", on ? "true" : "false");
    });

    root.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-pr-copy]");
      if (!btn) return;
      const q = byId.get(btn.getAttribute("data-pr-copy"));
      const original = btn.textContent;
      const ok = await copyText(gradingPrompt(meta.title, [promptItem(q, "연습")]));
      btn.textContent = ok ? "복사했습니다" : "복사하지 못했습니다";
      setTimeout(() => { btn.textContent = original; }, 2200);
    });
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="pp-empty"><h2>문제를 불러오지 못했습니다</h2><p>잠시 뒤 다시 열어 주세요. (${esc(err.message)})</p></div>`;
  }
})();
