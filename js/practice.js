// practice.js — 주제별 문제. practice.html?s=sl
// 답을 고르면 바로 채점한다. 맞힌 문항을 표시하고 오답만 다시 푼다.
// 빈칸은 하나씩 즉시 채점하고, 맞은 빈칸은 다음 복습에서도 보존한다.
// 틀린 빈칸만 다시 풀 수 있고, 계산과 서술은 정답을 편 안의 체크리스트로 스스로 채점한다(js/checks.js).

import {
  subjectId, requireMeta, loadPrep, esc, renderMd, typeset, whenMathReady,
  buildTree, isWritten, gradingPrompt, promptItem, copyText, TYPE_KO, fillCrumb, store,
} from "./prep.js?v=b62c1c4c48";
import { attachBlanks, hasBlankChoices, scoreBlanks } from "./blanks.js?v=b62c1c4c48";
import { attachChecks, hasChecks } from "./checks.js?v=b62c1c4c48";

const meta = requireMeta();
const app = document.getElementById("app");
fillCrumb(meta, "주제별 문제");
const goMap = document.getElementById("go-map");
if (goMap) { goMap.href = `map.html?s=${subjectId}`; goMap.style.display = ""; }

const TYPE_ORDER = ["tf", "mc", "blank", "calc", "essay"];
const mapBase = `map.html?s=${subjectId}`;

function choiceStem(q) {
  if (!["tf", "mc"].includes(q.type)) return renderMd(q.stem);
  const values = q.type === "tf" ? ["T", "F"] : q.choices || ["a", "b", "c", "d"];
  const options = new Map();
  const prompt = q.type === "mc" ? q.stem.replace(/^- \(([a-z])\) (.+)$/gm, (line, value, body) => {
    if (!values.includes(value)) return line;
    options.set(value, body);
    return "";
  }) : q.stem;
  const complete = options.size === values.length;
  return `${renderMd(complete ? prompt : q.stem)}
    <fieldset class="ex-picks"${q.type === "tf" ? ' data-compact="true"' : ""}>
      <legend lang="ko">답을 고르면 바로 채점합니다</legend>
      <div class="ex-pick-options">${values.map((value) => `
        <label class="ex-pick-option">
          <input type="radio" name="practice-${esc(q.id)}" data-pr-pick="${esc(q.id)}" value="${value}">
          <span class="ex-pick-in"><span class="ex-pick-mark">${value}</span>
            <span class="ex-pick-body">${q.type === "tf" ? (value === "T" ? "True · 참" : "False · 거짓") : complete ? renderMd(options.get(value)) : value}</span>
          </span>
        </label>`).join("")}</div>
    </fieldset>`;
}

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
    <p class="pp-lead">참거짓·객관식·빈칸은 답을 고르면 바로 정답을 확인합니다. 맞힌 문제에는 ✓가 남고, 틀린 문제만 모아 다시 풀 수 있습니다. 계산·서술은 직접 푼 뒤 해설과 체크리스트를 보고 맞음 여부를 표시하세요.</p>
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
    <div class="pr-review-tools" role="group" aria-label="오답 복습">
      <button type="button" class="ex-chip" data-pr-view="all" aria-pressed="true">전체 보기</button>
      <button type="button" class="ex-chip" data-pr-view="wrong" aria-pressed="false">틀린 문제만 보기 <span data-pr-wrong-count>0</span></button>
      <button type="button" class="btn btn-secondary btn-sm" data-pr-retry-all>틀린 문제만 다시 풀기</button>
    </div>
    <p class="pr-progress" data-pr-progress aria-live="polite"></p>
    <p class="pr-review-note" data-pr-review-note hidden>맞힌 문제도 해설을 확인할 수 있도록 이번 복습 목록에 남겨 둡니다.</p>
    <nav class="pr-jump" aria-label="주제 이동">
      ${topics.map((t) => `<a href="#${t.slug}">${esc(t.title)} <span class="pp-count">${t.items.length}</span></a>`).join("")}
    </nav>
  </header>

  <p class="pr-empty" data-pr-empty hidden></p>
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
          <span class="pr-status" data-pr-badge lang="ko" aria-live="polite">미풀이</span>
          <span class="ex-pts" lang="ko">${TYPE_KO[q.type]}</span>
        </div>
        <div class="ex-sec ex-stem pp-md">${choiceStem(q)}</div>
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
          ${["calc", "essay"].includes(q.type) ? `<div class="pr-self" role="group" aria-label="직접 채점">
            <span>내 풀이를 확인했나요?</span>
            <button type="button" class="ex-chip" data-pr-self="right" aria-pressed="false">✓ 맞혔어요</button>
            <button type="button" class="ex-chip" data-pr-self="wrong" aria-pressed="false">다시 풀게요</button>
          </div>` : ""}
        </details>
        <p class="pr-result" lang="ko">
          <span data-pr-verdict aria-live="polite"></span>
          <button type="button" class="ex-link" data-pr-retry hidden>이 문제 다시 풀기</button>
        </p>
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

    const PKEY = `ai-study:${subjectId}:practice:progress`;
    const BKEY = `ai-study:${subjectId}:practice:blanks`;
    const CKEY = `ai-study:${subjectId}:practice:checks`;
    const RECALL_KEY = `ai-study:${subjectId}:prep:recall`;
    const progress = store.get(PKEY, {}) || {};
    const allPicks = store.get(BKEY, {}) || {};
    const allChecks = store.get(CKEY, {}) || {};
    const items = new Map([...root.querySelectorAll(".pr-q")].map((item) => [item.dataset.qId, item]));
    const blankCtrls = new Map();
    const checkCtrls = new Map();
    let recall = store.get(RECALL_KEY, false) === true;
    let typeFilter = "all";
    let reviewIds = null; // 맞힌 직후에도 해설을 읽을 수 있게 복습을 시작한 목록을 유지한다.
    const record = (id) => progress[id] || (progress[id] = {});
    const save = () => store.set(PKEY, progress);
    const wrongIds = () => questions.filter((q) => record(q.id).result === "wrong").map((q) => q.id);
    const paintCounts = () => {
      const right = questions.filter((q) => record(q.id).result === "right").length;
      const wrong = wrongIds().length;
      root.querySelector("[data-pr-wrong-count]").textContent = wrong;
      root.querySelector("[data-pr-progress]").textContent = `✓ 맞힘 ${right} · 오답 ${wrong} · 미완료 ${questions.length - right - wrong} / 전체 ${questions.length}문항`;
      root.querySelector("[data-pr-retry-all]").disabled = wrong === 0;
      root.querySelector('[data-pr-view="wrong"]').disabled = wrong === 0 && reviewIds === null;
    };
    const applyFilters = () => {
      let shown = 0;
      items.forEach((item, id) => {
        item.hidden = (typeFilter !== "all" && byId.get(id).type !== typeFilter) || (reviewIds !== null && !reviewIds.has(id));
        if (!item.hidden) shown += 1;
      });
      root.querySelectorAll(".pr-topic").forEach((sec) => {
        const count = sec.querySelectorAll(".pr-q:not([hidden])").length;
        sec.hidden = count === 0;
        const jump = root.querySelector(`.pr-jump a[href="#${sec.id}"]`);
        if (jump) { jump.hidden = !count; jump.querySelector(".pp-count").textContent = count; }
      });
      const empty = root.querySelector("[data-pr-empty]");
      empty.hidden = shown > 0;
      empty.textContent = reviewIds !== null && wrongIds().length === 0 ? "틀린 문제가 없습니다. 모두 잘 풀었습니다." : "선택한 조건에 맞는 문제가 없습니다.";
      root.querySelector("[data-pr-review-note]").hidden = reviewIds === null || shown === 0;
      root.querySelectorAll("[data-pr-view]").forEach((btn) => btn.setAttribute("aria-pressed", String((btn.dataset.prView === "wrong") === (reviewIds !== null))));
    };
    const paintStatus = (q) => {
      const p = record(q.id);
      const item = items.get(q.id);
      item.dataset.prStatus = p.result || "empty";
      item.querySelector("[data-pr-badge]").textContent = p.result === "right" ? "✓ 맞음" : p.retrying ? "다시 푸는 중" : p.result === "wrong" ? "오답" : p.result === "partial" ? "풀이 중" : "미풀이";
      item.querySelector("[data-pr-retry]").hidden = p.result !== "wrong" || !!p.retrying;
      item.querySelectorAll("[data-pr-self]").forEach((btn) => btn.setAttribute("aria-pressed", String(!p.retrying && btn.dataset.prSelf === p.result)));
      paintCounts();
    };
    const showSolution = (q, open) => {
      record(q.id).revealed = open;
      items.get(q.id).querySelector(".pr-reveal").open = open;
    };
    const paintChoice = (q) => {
      const p = record(q.id);
      const item = items.get(q.id);
      const answered = !!p.answer && !p.retrying;
      item.querySelectorAll("[data-pr-pick]").forEach((input) => {
        input.checked = answered && input.value === p.answer;
        input.disabled = answered;
        input.closest("label").dataset.verdict = !answered ? "" : input.value === q.answer ? "right" : input.checked ? "wrong" : "";
      });
      item.querySelector("[data-pr-verdict]").textContent = !answered ? "" : p.result === "right" ? "✓ 맞았습니다." : `내 답 ${p.answer} · 정답 ${q.answer}`;
      paintStatus(q);
    };
    const paintBlank = (q) => {
      const p = record(q.id);
      const s = scoreBlanks(q, allPicks[q.id]);
      const hadWrong = p.result === "wrong";
      if (hadWrong && s.picked < s.total && s.picked === s.right) { p.retrying = true; showSolution(q, false); }
      p.result = s.right === s.total ? "right" : s.picked > s.right || p.retrying ? "wrong" : s.picked ? "partial" : undefined;
      if (s.picked === s.total) { p.retrying = false; showSolution(q, true); }
      const item = items.get(q.id);
      const score = item.querySelector("[data-bk-score]");
      score.hidden = s.picked === 0;
      score.textContent = `${s.total}개 중 ${s.right}개 맞음`;
      item.querySelector("[data-pr-verdict]").textContent = s.picked ? `빈칸 ${s.picked}/${s.total}개 응답 · ✓ ${s.right}개 맞음` : p.retrying ? "맞힌 빈칸은 남기고 틀린 빈칸만 다시 풉니다." : "";
      paintStatus(q);
    };
    questions.forEach((q) => {
      const p = record(q.id);
      const item = items.get(q.id);
      if (["tf", "mc"].includes(q.type)) {
        if (p.answer) p.result = p.answer === q.answer ? "right" : "wrong";
        paintChoice(q);
      }
      if (hasBlankChoices(q)) {
        allPicks[q.id] = allPicks[q.id] || {};
        const ctrl = attachBlanks(item, q, {
          picks: allPicks[q.id], recall, autoOpen: true, lockAnswered: true,
          onChange: () => { store.set(BKEY, allPicks); paintBlank(q); save(); },
          concepts: q.concepts.map((slug) => ({ href: `${mapBase}&n=${slug}`, title: conceptTitle(slug) })),
        });
        ctrl.setFeedback(true);
        blankCtrls.set(q.id, ctrl);
        paintBlank(q);
      }
      if (hasChecks(q)) {
        allChecks[q.id] = allChecks[q.id] || {};
        const ctrl = attachChecks(item.querySelector(".pr-reveal .ex-solution"), q, {
          marks: allChecks[q.id],
          onChange: (s) => {
            p.result = s.done === s.total ? "right" : "wrong";
            p.retrying = false;
            store.set(CKEY, allChecks); paintStatus(q); save();
          },
        });
        checkCtrls.set(q.id, ctrl);
        const s = ctrl.score();
        if (!p.result && s.done) p.result = s.done === s.total ? "right" : "wrong";
      }
      item.querySelector(".pr-reveal").open = p.revealed === true;
      item.querySelector(".pr-reveal").addEventListener("toggle", (e) => { p.revealed = e.target.open; save(); });
      paintStatus(q);
    });
    root.addEventListener("change", (e) => {
      const input = e.target.closest("[data-pr-pick]");
      if (!input) return;
      const q = byId.get(input.dataset.prPick);
      const p = record(q.id);
      p.answer = input.value; p.retrying = false; p.result = input.value === q.answer ? "right" : "wrong";
      showSolution(q, true); paintChoice(q); save();
    });
    const retryQuestion = (q) => {
      const p = record(q.id);
      if (p.result !== "wrong") return;
      p.retrying = true;
      showSolution(q, false);
      if (hasBlankChoices(q)) blankCtrls.get(q.id).retryWrong();
      else if (["tf", "mc"].includes(q.type)) { delete p.answer; paintChoice(q); }
      else {
        allChecks[q.id] = {}; checkCtrls.get(q.id)?.setMarks(allChecks[q.id]);
        store.set(CKEY, allChecks); paintStatus(q);
      }
      save();
    };
    root.addEventListener("click", (e) => {
      const item = e.target.closest(".pr-q");
      if (!item) return;
      const q = byId.get(item.dataset.qId);
      if (e.target.closest("[data-pr-retry]")) retryQuestion(q);
      const self = e.target.closest("[data-pr-self]");
      if (self) { const p = record(q.id); p.result = self.dataset.prSelf; p.retrying = false; paintStatus(q); save(); }
    });
    root.querySelector(".pr-filter").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-pr-type]");
      if (!btn) return;
      typeFilter = btn.dataset.prType;
      root.querySelectorAll("[data-pr-type]").forEach((el) => el.setAttribute("aria-pressed", String(el === btn)));
      applyFilters();
    });
    root.querySelectorAll("[data-pr-view]").forEach((btn) => btn.addEventListener("click", () => {
      reviewIds = btn.dataset.prView === "all" ? null : new Set(wrongIds());
      applyFilters(); paintCounts();
    }));
    root.querySelector("[data-pr-retry-all]").addEventListener("click", () => {
      const ids = wrongIds();
      reviewIds = new Set(ids);
      typeFilter = "all";
      root.querySelectorAll("[data-pr-type]").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.prType === "all")));
      ids.forEach((id) => retryQuestion(byId.get(id)));
      applyFilters(); paintCounts();
      root.querySelector(".pr-q:not([hidden])")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
    applyFilters(); paintCounts(); save();

    const ko = root.querySelector("[data-pr-ko]");
    ko.addEventListener("click", () => {
      const on = root.getAttribute("data-ko") !== "on";
      root.setAttribute("data-ko", on ? "on" : "off");
      ko.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // 보기 늦게 보기: 빈칸을 눌러도 보기를 바로 보이지 않는다. 선택을 이 브라우저에 기억한다.
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
