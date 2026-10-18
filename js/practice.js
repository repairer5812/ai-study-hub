// practice.js — 주제별 문제. practice.html?s=sl
// 모의시험에서 약했던 가지만 골라 푼다. 종이에 먼저 풀고 정답을 펴 본다.
// 빈칸 유도는 빈칸을 눌러 다섯 보기 가운데 고를 수도 있고(js/blanks.js), 정답을 펴면 맞고 틀림이 보인다.
// 틀린 빈칸만 다시 풀 수 있고, 계산과 서술은 정답을 편 안의 체크리스트로 스스로 채점한다(js/checks.js).

import {
  subjectId, requireMeta, loadPrep, esc, renderMd, typeset, whenMathReady,
  buildTree, isWritten, gradingPrompt, promptItem, copyText, TYPE_KO, fillCrumb, store,
} from "./prep.js?v=20261018g";
import { attachBlanks, hasBlankChoices } from "./blanks.js";
import { attachChecks, hasChecks } from "./checks.js";

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
    const pickable = questions.some(hasBlankChoices);
    const conceptTitle = (slug) => tree.bySlug.get(slug)?.title ?? slug;

    document.title = `주제별 문제 · ${meta.title} · AI Study Hub`;
    app.innerHTML = `
<div class="pr" data-ko="off">
  <header class="pp-head">
    <a class="pp-back" href="subject.html?s=${subjectId}">${esc(meta.title)}</a>
    <h1 class="pp-title">주제별 문제</h1>
    <p class="pp-lead">모의시험에서 약했던 가지만 골라 풉니다. 종이에 먼저 풀고 정답을 펴 보세요. 빈칸 유도는 빈칸을 눌러 보기에서 고를 수도 있습니다.${questions.some(hasChecks) ? " 계산과 서술은 정답을 편 뒤 체크리스트로 스스로 채점할 수 있습니다." : ""}</p>
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
      <div class="pr-modes" role="group" aria-label="보기 설정">
        <button type="button" class="ex-chip" data-pr-ko aria-pressed="false">한국어 풀이</button>
        ${pickable ? '<button type="button" class="ex-chip" data-pr-recall aria-pressed="false" title="빈칸을 눌러도 보기를 바로 보이지 않습니다">보기 늦게 보기</button>' : ""}
      </div>
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
      <li class="ex-q pr-q" data-type="${q.type}" data-q-id="${esc(q.id)}">
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
            ${hasBlankChoices(q) ? '<span class="pr-key" data-bk-score hidden></span>' : ""}
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

    // 빈칸 유도: 빈칸을 눌러 보기에서 고르고, 정답을 펴면 채점한다. 고른 답은 이 브라우저에 남는다.
    // 틀린 빈칸만 다시 푼 기록은 남기지 않는다(정답을 접으면 처음 상태로 돌아가 다시 고칠 수 있다).
    const BKEY = `ai-study:${subjectId}:practice:blanks`;
    const RECALL_KEY = `ai-study:${subjectId}:prep:recall`;
    const allPicks = store.get(BKEY, {});
    let recall = store.get(RECALL_KEY, false) === true;
    const blankCtrls = [];
    root.querySelectorAll(".pr-q[data-q-id]").forEach((item) => {
      const q = byId.get(item.getAttribute("data-q-id"));
      if (!q || !hasBlankChoices(q)) return;
      allPicks[q.id] = allPicks[q.id] || {};
      const ctrl = attachBlanks(item, q, {
        picks: allPicks[q.id],
        onChange: () => store.set(BKEY, allPicks),
        recall,
        concepts: q.concepts.map((slug) => ({ href: `${mapBase}&n=${slug}`, title: conceptTitle(slug) })),
      });
      blankCtrls.push(ctrl);
      const reveal = item.querySelector(".pr-reveal");
      const scoreEl = item.querySelector("[data-bk-score]");
      reveal.addEventListener("toggle", () => {
        ctrl.setGraded(reveal.open);
        const s = ctrl.score();
        scoreEl.hidden = !(reveal.open && s.picked);
        scoreEl.textContent = `고른 빈칸 ${s.total}개 가운데 ${s.right}개 맞음, ${s.got} / ${s.max}점`;
      });
    });

    // 계산과 서술: 정답을 편 안에서 체크리스트로 스스로 채점한다. 체크한 항목은 이 브라우저에 남는다.
    const CKEY = `ai-study:${subjectId}:practice:checks`;
    const allChecks = store.get(CKEY, {});
    root.querySelectorAll(".pr-q[data-q-id]").forEach((item) => {
      const q = byId.get(item.getAttribute("data-q-id"));
      if (!q || !hasChecks(q)) return;
      allChecks[q.id] = allChecks[q.id] || {};
      attachChecks(item.querySelector(".pr-reveal .ex-solution"), q, {
        marks: allChecks[q.id],
        onChange: () => store.set(CKEY, allChecks),
      });
    });

    // 형식별로 골라 보기
    const filter = root.querySelector(".pr-filter");
    filter.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-pr-type]");
      if (!btn) return;
      const type = btn.getAttribute("data-pr-type");
      filter.querySelectorAll("[data-pr-type]").forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
      root.querySelectorAll(".pr-q").forEach((li) => { li.hidden = type !== "all" && li.getAttribute("data-type") !== type; });
      root.querySelectorAll(".pr-topic").forEach((sec) => {
        const shown = sec.querySelectorAll(".pr-q:not([hidden])").length;
        sec.hidden = !shown;
        const jump = root.querySelector(`.pr-jump a[href="#${sec.id}"]`);
        if (jump) { jump.hidden = !shown; jump.querySelector(".pp-count").textContent = shown; }
      });
    });

    const ko = root.querySelector("[data-pr-ko]");
    ko.addEventListener("click", () => {
      const on = root.getAttribute("data-ko") !== "on";
      root.setAttribute("data-ko", on ? "on" : "off");
      ko.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // 보기 늦게 보기: 빈칸을 눌러도 보기를 바로 보이지 않는다. 모의시험과 같은 설정을 쓴다.
    const recallBtn = root.querySelector("[data-pr-recall]");
    if (recallBtn) {
      recallBtn.setAttribute("aria-pressed", recall ? "true" : "false");
      recallBtn.addEventListener("click", () => {
        recall = !recall;
        store.set(RECALL_KEY, recall);
        blankCtrls.forEach((ctrl) => ctrl.setRecall?.(recall)); // 예전 blanks.js 가 캐시에 남아 있어도 죽지 않게
        recallBtn.setAttribute("aria-pressed", recall ? "true" : "false");
      });
    }

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
