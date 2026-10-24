// paper.js — 화면에서 답을 고르는 모의시험. 인쇄도 지원한다.
// 참거짓, 객관식, 빈칸은 풀이 중에 고른다. 시작할 때 즉시 해설과 종료 뒤 해설 중 선택한다. 계산과 서술은 따로 풀이한다.
// 빈칸도 다섯 보기 가운데 고른다(js/blanks.js). 고른 답은 종료 뒤 자동 채점해 점수 칸에 넣는다.
// 채점된 뒤에는 틀린 빈칸만 다시 풀 수 있다. 다시 푼 결과는 점수에 넣지 않는다.
// 계산과 서술은 모범 답안 아래의 체크리스트로 스스로 채점할 수도 있다(js/checks.js). 체크한 점수의 합이 점수 칸에 들어간다.
//   표지 → 답 선택과 풀이(시계) → 자동 채점과 계산·서술 점수 확인 → 결과
// 상태는 이 브라우저(localStorage)에만 남는다. 랭킹에는 올리지 않는다(점수가 자기 채점이라서).

import {
  subjectId, params, requireMeta, loadPrep, esc, renderMd, typeset, whenMathReady,
  buildTree, sortQuestions, labelOf, isWritten, gradingPrompt, promptItem, copyText, store, fillCrumb,
} from "./prep.js?v=1c0b0c838e";
import { attachBlanks, hasBlankChoices, scoreBlanks } from "./blanks.js?v=1c0b0c838e";
import { attachChecks, hasChecks } from "./checks.js?v=1c0b0c838e";

const meta = requireMeta();
const app = document.getElementById("app");
const setId = params.get("set") || meta.prep.exams?.[0]?.set;
fillCrumb(meta, "모의시험");

const mapBase = `map.html?s=${subjectId}`;
const studyUrl = `paper.html?s=${subjectId}&set=${encodeURIComponent(setId)}&study=D#part-D`;
const goMap = document.getElementById("go-map");
if (goMap) { goMap.href = mapBase; goMap.style.display = ""; }
const num = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const mmss = (sec) => {
  const s = Math.max(0, Math.floor(sec));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};
const span = (sec) => {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  return m ? `${m}분 ${s % 60}초` : `${s}초`;
};

// 원본의 객관식 보기와 수식을 그대로 사용해 문항 안에서 선택하게 한다.
function selectableStem(q) {
  if (!["tf", "mc"].includes(q.type)) return renderMd(q.stem);
  const choices = q.type === "tf" ? ["T", "F"] : q.choices || ["a", "b", "c", "d"];
  const options = new Map();
  const prompt = q.type === "mc" ? q.stem.replace(/^- \(([a-z])\) (.+)$/gm, (line, value, body) => {
    if (!choices.includes(value)) return line;
    options.set(value, body);
    return "";
  }) : q.stem;
  const complete = q.type === "mc" && options.size === choices.length;
  const label = labelOf(q);
  return `${renderMd(complete ? prompt : q.stem)}
    <fieldset class="ex-picks" data-ex-picks="${label}"${q.type === "tf" ? ' data-compact="true"' : ""}>
      <legend lang="ko">${label} 답 선택</legend>
      <div class="ex-pick-options">${choices.map((value) => `
        <label class="ex-pick-option">
          <input type="radio" name="pick-${label}" data-ex-pick="${label}" value="${value}">
          <span class="ex-pick-in"><span class="ex-pick-mark">${value}</span>
            <span class="ex-pick-body">${q.type === "tf" ? (value === "T" ? "True · 참" : "False · 거짓") : complete ? renderMd(options.get(value)) : value}</span>
          </span>
        </label>`).join("")}</div>
    </fieldset>`;
}

// 문항의 정답 요약과 설명을 나누어 정오 → 정답 → 해설 순서로 읽게 한다.
function answerParts(q) {
  if (q.type === "tf") return {
    key: renderMd(q.answer === "T" ? "**T · 참**" : "**F · 거짓**"),
    explanation: q.solution.replace(/^\*\*(?:참|거짓)\.\*\*\s*/, ""),
  };
  if (q.type === "mc") {
    const body = q.stem.split("\n").find((line) => line.startsWith(`- (${q.answer}) `))?.slice(6) || "";
    return { key: renderMd(`**(${q.answer})** ${body}`), explanation: q.solution.replace(/^\*\*\([a-z]\)\.\*\*\s*/, "") };
  }
  if (hasBlankChoices(q)) {
    const [key, ...rest] = q.solution.split(/\n\s*\n/);
    const count = (key.match(/^- \(\d+\)/gm) || []).length;
    if (count === q.blanks.length && rest.length) return { key: renderMd(key), explanation: rest.join("\n\n") };
    return { key: renderMd(q.blanks.map((b) => `- (${b.n}) $${b.options.find((o) => o.ok).tex}$`).join("\n")), explanation: q.solution };
  }
  return { key: "", explanation: q.solution };
}

function feedbackHtml(q) {
  if (!["tf", "mc", "blank"].includes(q.type)) return "";
  return `<div class="ex-feedback" data-ex-feedback lang="ko" hidden>
    <p class="ex-q-verdict" data-q-verdict aria-live="polite"></p>
    <div class="ex-answer-key"><strong>정답</strong><div class="pp-md">${answerParts(q).key}</div></div>
    <p class="ex-answer-mine" data-q-mine></p>
  </div>`;
}

function pageHtml(exam, questions, parts, topicTitle) {
  const total = questions.reduce((s, q) => s + q.points, 0);
  const auto = questions.filter((q) => !isWritten(q));
  const written = questions.filter(isWritten);
  const pts = (list) => list.reduce((s, q) => s + q.points, 0);
  const choicesOf = (q) => (q.type === "tf" ? ["T", "F"] : q.choices?.length ? q.choices : ["a", "b", "c", "d"]);
  const pickable = questions.some(hasBlankChoices);
  const checked = questions.filter(hasChecks);

  return `
<div class="ex" data-phase="cover" data-ko="off" data-graded="false">
  <header class="pp-head ex-cover">
    <a class="pp-back" href="subject.html?s=${subjectId}">${esc(meta.title)}</a>
    <h1 class="pp-title">${esc(exam.title)}</h1>
    <p class="pp-lead">${esc(exam.lead || "화면에서 답을 고르고, 종료 뒤 채점합니다.")}</p>
    <dl class="pp-facts">
      <div><dt>시간</dt><dd>${exam.minutes}분</dd></div>
      <div class="pp-facts-wide"><dt>범위</dt><dd>${esc(exam.scope || "")}</dd></div>
    </dl>

    <div class="ex-cover-grid">
      <table class="ex-plan">
        <caption>구성</caption>
        <thead><tr><th scope="col">파트</th><th scope="col">형식</th><th scope="col">문항</th><th scope="col">배점</th></tr></thead>
        <tbody>${parts.map((p) => `<tr><th scope="row">${p.id}</th><td>${esc(p.ko)}</td><td class="num">${p.items.length}</td><td class="num">${pts(p.items)}</td></tr>`).join("")}</tbody>
        <tfoot><tr><th scope="row" colspan="2">합계</th><td class="num">${questions.length}</td><td class="num">${total}</td></tr></tfoot>
      </table>
      <div class="ex-rules">
        <h2>시작하기 전에</h2>
        <ul>
          <li>참거짓은 T/F, 객관식은 문제 아래의 보기를 눌러 답합니다.</li>
          ${pickable ? "<li>빈칸은 5지선다입니다. 빈칸 번호마다 보기 하나를 고르면 식에 답이 채워집니다.</li>" : ""}
          <li>계산과 서술만 종이나 별도 노트에 풉니다. 시험지 인쇄는 선택 사항입니다.</li>
          ${pickable ? "<li>보기를 보기 전에 답을 먼저 떠올리고 싶으면 위쪽 띠에서 보기 늦게 보기를 켭니다.</li>" : ""}
          <li>문제는 영어입니다. 막히면 위쪽 띠에서 한국어 풀이를 켤 수 있습니다.</li>
          <li>시작하면 시계가 돌고, 새로 고쳐도 이어집니다. 일시정지한 시간은 시험 시간에 포함하지 않습니다.</li>
          <li>정답을 바로 볼지, 종료 뒤 볼지 아래에서 선택하세요. 선택한 답은 자동 채점됩니다. 계산과 서술은 모범 답안이나 체크리스트로 채점할 수 있습니다.</li>
        </ul>
        <p class="ex-disclaimer">실제 기출이 아닙니다. 수업에서 다룬 내용과 강조된 부분을 바탕으로 만든 예상 문제이고, 실제 시험의 시간과 문항 수는 다를 수 있습니다.</p>
      </div>
    </div>

    <fieldset class="ex-modes" data-ex-modes>
      <legend>정답 확인 모드</legend>
      <div class="ex-mode-options">
        <label class="ex-mode"><input type="radio" name="feedback-mode" value="immediate" checked>
          <span><strong>정답 바로 보기</strong><small>답을 고르면 정답과 해설을 바로 확인합니다.</small></span>
        </label>
        <label class="ex-mode"><input type="radio" name="feedback-mode" value="final">
          <span><strong>최종 보기</strong><small>시험을 종료한 뒤 정답과 해설을 한꺼번에 확인합니다.</small></span>
        </label>
      </div>
      <p>바로 보기에서 계산·서술형은 직접 푼 뒤 ‘정답 보기’를 누르세요. 진행 중에도 위쪽 모드 버튼으로 바꿀 수 있습니다.</p>
    </fieldset>
    <div class="pp-actions">
      <button type="button" class="btn btn-primary btn-lg" data-ex-start>화면에서 시험 시작</button>
      <a class="btn btn-secondary" href="${studyUrl}">Part D 모범 답안 공부</a>
      <button type="button" class="btn btn-secondary" data-ex-print>시험지 인쇄</button>
      <a class="btn btn-secondary" href="${mapBase}">개념 지도</a>
    </div>
    <p class="ex-resume" data-ex-resume hidden>
      지난 결과가 남아 있습니다: <strong data-ex-resume-score></strong>
      <button type="button" class="ex-link" data-ex-review>결과 다시 보기</button>
    </p>
  </header>

  <section class="ex-study-head" data-ex-study hidden>
    <p>시험을 시작하지 않고 Part D의 풀이를 읽는 화면입니다. 각 소문항의 ‘한 단계씩 이해하기’를 펼쳐 식을 따라가세요.</p>
    <nav class="pp-actions" aria-label="Part D 공부">
      ${["D1", "D2", "D3"].map((label) => `<a class="btn btn-secondary btn-sm" href="#q-${label}">${label} 모범 답안</a>`).join("")}
      <button type="button" class="ex-chip" data-ex-study-ko aria-pressed="true">한국어 문제 설명</button>
      <a class="ex-link" href="paper.html?s=${subjectId}&set=${encodeURIComponent(exam.set)}">모의시험으로 돌아가기</a>
    </nav>
  </section>

  <dialog class="ex-mode-dialog" id="ex-mode-dialog" aria-labelledby="ex-mode-dialog-h">
    <form method="dialog" data-ex-mode-form>
      <h2 id="ex-mode-dialog-h" data-ex-mode-title>정답 확인 모드</h2>
      <p data-ex-mode-note>진행 중인 답과 시간은 유지됩니다.</p>
      <fieldset class="ex-modes">
        <legend>정답을 언제 확인할까요?</legend>
        <div class="ex-mode-options">
          <label class="ex-mode"><input type="radio" name="feedback-dialog" value="immediate">
            <span><strong>정답 바로 보기</strong><small>답을 고르면 정답과 해설을 바로 확인합니다.</small></span>
          </label>
          <label class="ex-mode"><input type="radio" name="feedback-dialog" value="final">
            <span><strong>최종 보기</strong><small>시험을 종료한 뒤 정답과 해설을 확인합니다.</small></span>
          </label>
        </div>
      </fieldset>
      <div class="pp-actions">
        <button type="submit" value="apply" class="btn btn-primary" data-ex-mode-apply>적용</button>
        <button type="submit" value="cancel" class="btn btn-secondary">취소</button>
      </div>
    </form>
  </dialog>

  <div class="ex-bar" data-ex-bar hidden>
    <div class="ex-bar-in">
      <p class="ex-clock">
        <span class="ex-clock-label" data-ex-clock-label>남은 시간</span>
        <span class="ex-clock-time" data-ex-clock>${String(exam.minutes).padStart(2, "0")}:00</span>
      </p>
      <button type="button" class="ex-chip ex-mode-status" data-ex-mode-status aria-haspopup="dialog" aria-controls="ex-mode-dialog"></button>
      <nav class="ex-jump" aria-label="파트 이동">${parts.map((p) => `<a href="#part-${p.id}">${p.id}</a>`).join("")}</nav>
      <div class="ex-bar-actions">
        <button type="button" class="ex-chip" data-ex-ko aria-pressed="false">한국어 풀이</button>
        ${pickable ? '<button type="button" class="ex-chip" data-ex-recall aria-pressed="false" title="빈칸을 눌러도 보기를 바로 보이지 않습니다">보기 늦게 보기</button>' : ""}
        <button type="button" class="ex-chip" data-ex-pause aria-pressed="false">일시정지</button>
        <button type="button" class="ex-chip" data-ex-restart>재시험</button>
        <span class="ex-end">
          <button type="button" class="btn btn-secondary btn-sm" data-ex-end>시험 종료</button>
          <span class="ex-end-confirm" data-ex-end-confirm hidden>
            끝내고 채점할까요?
            <button type="button" class="btn btn-primary btn-sm" data-ex-end-yes>종료</button>
            <button type="button" class="ex-link" data-ex-end-no>계속 풀기</button>
          </span>
        </span>
      </div>
    </div>
    <p class="sr-only" aria-live="polite" data-ex-announce></p>
  </div>

  <section class="ex-paused" data-ex-paused hidden aria-labelledby="ex-paused-h">
    <h2 id="ex-paused-h">시험을 잠시 멈췄습니다</h2>
    <p>쉬는 동안에는 시간이 줄어들지 않습니다. 선택한 답은 그대로 남아 있습니다.</p>
    <button type="button" class="btn btn-primary" data-ex-resume-exam>이어서 풀기</button>
  </section>

  <section class="ex-grade" data-ex-grade hidden aria-labelledby="ex-grade-h">
    <h2 id="ex-grade-h">채점</h2>
    <p class="ex-grade-time" data-ex-used></p>
    <p class="pp-actions"><button type="button" class="btn btn-secondary" data-ex-restart>처음부터 재시험</button><a class="btn btn-secondary" href="${studyUrl}">Part D 모범 답안 공부</a></p>

    <div class="ex-step"${auto.length ? "" : " hidden"}>
      <h3>1. 참거짓과 객관식 채점 결과 <span class="ex-step-pts">${pts(auto)}점</span></h3>
      <p class="ex-step-note">풀이 중 고른 답을 자동 채점했습니다. 종이에 풀었다면 아래에 답을 입력해 다시 채점할 수 있습니다. 비워 둔 문항은 0점입니다.</p>
      <form class="ex-card" data-ex-card>
        ${parts.filter((p) => p.items.some((q) => !isWritten(q))).map((p) => `
        <fieldset class="ex-card-part">
          <legend>Part ${p.id} <span>${esc(p.ko)}</span></legend>
          <div class="ex-card-rows">
            ${p.items.filter((q) => !isWritten(q)).map((q) => `
            <div class="ex-card-row" data-card-row="${labelOf(q)}" role="radiogroup" aria-label="${labelOf(q)}번 답">
              <span class="ex-card-no">${labelOf(q)}</span>
              <span class="ex-card-opts">${choicesOf(q).map((c) => `<label class="ex-bubble"><input type="radio" name="ans-${labelOf(q)}" value="${c}"><span>${c}</span></label>`).join("")}</span>
              <span class="ex-card-verdict" data-card-verdict></span>
            </div>`).join("")}
          </div>
        </fieldset>`).join("")}
        <p class="ex-card-foot">
          <button type="submit" class="btn btn-primary">선택한 답 다시 채점</button>
          <strong class="ex-card-score" data-ex-auto-score aria-live="polite"></strong>
        </p>
      </form>
    </div>

    ${written.length ? `
    <div class="ex-step">
      <h3>${auto.length ? "2. " : ""}빈칸 결과와 계산·서술 점수 확인 <span class="ex-step-pts">${pts(written)}점</span></h3>
      ${pickable ? '<p class="ex-step-note">빈칸에서 선택한 답의 점수는 자동으로 입력됩니다. 계산과 서술은 아래 방법이나 문항별 체크리스트로 채점하세요.</p>' : ""}
      <ol class="ex-how">
        <li>답안지를 사진으로 찍습니다. 문항 번호가 보이게 찍으면 채점이 정확해집니다.</li>
        <li>아래 버튼으로 채점 프롬프트를 복사해 ChatGPT, Claude, Gemini 같은 LLM에 붙여 넣고 사진을 함께 올립니다. 문제, 모범 답안, 채점 기준이 프롬프트에 들어 있습니다.</li>
        <li>답변 마지막 줄의 점수를 아래 칸에 옮겨 적습니다.</li>
      </ol>
      <p class="ex-copy">
        <button type="button" class="btn btn-primary" data-ex-copy="all">채점 프롬프트 복사</button>
        <span class="ex-copy-msg" data-ex-copy-msg aria-live="polite"></span>
      </p>
      <details class="ex-raw">
        <summary>복사가 안 되면 여기서 직접 선택해 복사</summary>
        <textarea readonly rows="10" name="grading-prompt" data-ex-raw aria-label="채점 프롬프트 전문"></textarea>
      </details>
      ${checked.length ? `<p class="ex-step-note">LLM 없이 스스로 채점할 수도 있습니다. ${checked.map((q) => `<a class="ex-link" href="#q-${labelOf(q)}">${labelOf(q)}</a>`).join(", ")}번은 시험지의 모범 답안 아래에 체크리스트가 있고, 내 답안에 있는 항목을 체크하면 아래 칸이 체크한 점수의 합으로 바뀝니다.</p>` : ""}
      <p class="ex-step-note" data-ex-blank-note hidden>빈칸을 화면에서 고른 문항은 맞은 빈칸의 배점을 아래 칸에 넣어 두었습니다. 종이에 쓴 답으로 채점했다면 그 점수로 고쳐 적으세요.</p>
      <form class="ex-scores" id="ex-scores" data-ex-scores novalidate>
        ${written.map((q) => `
        <label class="ex-score">
          <span class="ex-score-no">${labelOf(q)}</span>
          <input type="number" inputmode="decimal" min="0" max="${q.points}" step="0.5" name="score-${labelOf(q)}" placeholder="0">
          <span class="ex-score-max">/ ${q.points}</span>
        </label>`).join("")}
        <p class="ex-card-foot">
          <button type="submit" class="btn btn-primary">결과 보기</button>
          <span class="ex-copy-msg" data-ex-scores-msg aria-live="polite"></span>
        </p>
      </form>
    </div>` : ""}
  </section>

  <section class="ex-result" data-ex-result hidden aria-labelledby="ex-result-h" tabindex="-1">
    <h2 id="ex-result-h">결과</h2>
    <p class="ex-total"><span data-ex-total>0</span><span class="ex-total-max"> / ${total}</span></p>
    <div class="ex-result-grid">
      <table class="ex-plan">
        <caption>파트별</caption>
        <thead><tr><th scope="col">파트</th><th scope="col">형식</th><th scope="col">득점</th><th scope="col">배점</th></tr></thead>
        <tbody>${parts.map((p) => `<tr data-part-row="${p.id}"><th scope="row">${p.id}</th><td>${esc(p.ko)}</td><td class="num" data-earned>0</td><td class="num">${pts(p.items)}</td></tr>`).join("")}</tbody>
      </table>
      <div>
        <h3>약한 가지부터 다시 보기</h3>
        <ol class="ex-weak" data-ex-weak></ol>
      </div>
    </div>
    <p class="ex-miss" data-ex-miss hidden></p>
    <p class="pp-actions">
      <button type="button" class="btn btn-secondary" data-ex-reset data-ex-restart>처음부터 재시험</button>
      ${meta.prep.practice ? `<a class="btn btn-secondary" href="practice.html?s=${subjectId}">주제별 문제</a>` : ""}
    </p>
  </section>

  <article class="ex-paper" data-ex-paper lang="en">
    <header class="ex-paper-head">
      <h2>Mock Midterm Exam</h2>
      <dl class="ex-paper-meta">
        <div><dt>Course</dt><dd lang="ko">${esc(meta.title)}</dd></div>
        <div><dt>Time</dt><dd>${exam.minutes} minutes</dd></div>
        <div><dt>Total</dt><dd>${total} points</dd></div>
        <div><dt>Name</dt><dd class="ex-paper-blank"></dd></div>
      </dl>
      <p class="ex-paper-note ex-screen-note">Choose T/F and multiple-choice answers directly below each question.${pickable ? " In Part C, choose one of five options for each blank." : ""} Work out calculation and essay answers separately. Printing is optional.</p>
      <p class="ex-paper-note ex-print-note">Circle the T/F and multiple-choice answers. Complete the blank formulas and show your calculations on paper.</p>
    </header>
    ${parts.map((p) => `
    <section class="ex-part" id="part-${p.id}">
      <header class="ex-part-head"><h3>Part ${p.id}. ${esc(p.en)}</h3><span class="ex-pts">[${pts(p.items)} points]</span></header>
      <p class="ex-part-guide">${esc(p.guide || "")}</p>
      <ol class="ex-list" role="list">
        ${p.items.map((q) => `
        <li class="ex-q" id="q-${labelOf(q)}" data-q-item="${labelOf(q)}" data-type="${q.type}">
          <div class="ex-q-head">
            <span class="ex-q-no">${labelOf(q)}.</span>
            ${q.title ? `<span class="ex-q-title">${esc(q.title)}</span>` : ""}
            <span class="ex-pts">[${q.points} points]</span>
          </div>
          <div class="ex-sec ex-stem pp-md">${selectableStem(q)}</div>
          <div class="ex-sec ex-ko pp-md" lang="ko">${renderMd(q.ko)}</div>
          ${["calc", "essay"].includes(q.type) ? `<p class="ex-reveal-row" hidden data-ex-reveal-row><button type="button" class="btn btn-secondary btn-sm" data-ex-reveal="${labelOf(q)}" aria-expanded="false">모범 답안 보기</button></p>` : ""}
          ${feedbackHtml(q)}
          <div class="ex-sec ex-solution pp-md" lang="ko">${renderMd(answerParts(q).explanation)}</div>
          ${q.rubric ? `<div class="ex-sec ex-rubric pp-md" lang="ko">${renderMd(q.rubric)}</div>` : ""}
          <p class="ex-q-foot" lang="ko" data-ex-q-foot hidden>
            ${isWritten(q) ? `<button type="button" class="ex-link" data-ex-copy="${labelOf(q)}">이 문항만 채점 프롬프트 복사</button>` : ""}
            ${q.concepts[0] ? `<a class="ex-link" href="${mapBase}&n=${q.concepts[0]}">관련 개념 보기</a>` : ""}
          </p>
        </li>`).join("")}
      </ol>
    </section>`).join("")}
  </article>
</div>`;
}

// 공부 화면은 시험 저장 상태나 타이머를 생성하거나 바꾸지 않는다.
function wireStudy(root) {
  root.setAttribute("data-phase", "study");
  root.setAttribute("data-ko", "on");
  root.querySelector(".pp-title").textContent = "Part D 모범 답안 공부";
  root.querySelector("[data-ex-study]").hidden = false;
  root.querySelector(".ex-paper-head").hidden = true;
  root.querySelectorAll(".ex-part").forEach((part) => { part.hidden = part.id !== "part-D"; });
  const ko = root.querySelector("[data-ex-study-ko]");
  ko.addEventListener("click", () => {
    const on = root.getAttribute("data-ko") !== "on";
    root.setAttribute("data-ko", on ? "on" : "off");
    ko.setAttribute("aria-pressed", String(on));
  });
  document.title = `Part D 모범 답안 공부 · ${meta.title}`;
}

function wire(root, exam, questions, topicTitle) {
  const $ = (sel) => root.querySelector(sel);
  const $$ = (sel) => Array.from(root.querySelectorAll(sel));
  const KEY = `ai-study:${subjectId}:paper:${exam.set}${exam.revision ? `:${exam.revision}` : ""}`;
  // blanks: 처음 고른 빈칸의 답(점수에 들어간다). retry: 틀린 빈칸을 다시 푼 기록(점수에 들어가지 않는다).
  // checks: 체크리스트에서 체크한 항목. draft: 점수 칸에 적혀 있는 값(결과 보기를 누르기 전에도 남긴다).
  const blank = () => ({
    phase: "cover", startedAt: null, endedAt: null, pausedAt: null, pausedMs: 0, pauseY: 0, answers: {}, graded: false, scores: {},
    blanks: {}, retry: {}, checks: {}, draft: {}, revealed: {}, feedback: "immediate", ko: false, total: null,
  });
  const saved = store.get(KEY, {});
  let state = Object.assign(blank(), saved);
  // 진행 중인 예전 시험은 종료 뒤 보기로 이어 가며, 새 시험은 바로 보기가 기본이다.
  if (!["immediate", "final"].includes(saved.feedback)) state.feedback = state.phase === "cover" ? "immediate" : "final";
  ["answers", "scores", "blanks", "retry", "checks", "draft", "revealed"].forEach((k) => {
    if (!state[k] || typeof state[k] !== "object") state[k] = {};
  });
  const save = () => store.set(KEY, state);
  const RECALL_KEY = `ai-study:${subjectId}:paper:${exam.set}:recall`;
  let recall = store.get(RECALL_KEY, false) === true;
  let setRecall = () => {};

  const total = questions.reduce((s, q) => s + q.points, 0);
  const autoQs = questions.filter((q) => !isWritten(q));
  const writtenQs = questions.filter(isWritten);
  const prompts = { all: gradingPrompt(meta.title, writtenQs.map((q) => promptItem(q))) };
  writtenQs.forEach((q) => { prompts[labelOf(q)] = gradingPrompt(meta.title, [promptItem(q)]); });

  const bar = $("[data-ex-bar]");
  const grade = $("[data-ex-grade]");
  const result = $("[data-ex-result]");
  const cover = $(".ex-cover");
  const clock = $("[data-ex-clock]");
  const clockLabel = $("[data-ex-clock-label]");
  const announce = $("[data-ex-announce]");
  const card = $("[data-ex-card]");
  const scoresForm = $("[data-ex-scores]");
  const limit = exam.minutes * 60;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 시계 띠가 두 줄이 되어도 오른쪽 보기가 띠 아래에 붙게 한다.
  new ResizeObserver(() => {
    root.style.setProperty("--bk-top", `${Math.ceil(bar.getBoundingClientRect().height) + 20}px`);
  }).observe(bar);

  /* 빈칸 유도: 빈칸을 눌러 보기에서 고르기 */
  const blankQs = questions.filter(hasBlankChoices);
  const blankCtrl = new Map();
  blankQs.forEach((q) => {
    const label = labelOf(q);
    state.blanks[label] = state.blanks[label] || {};
    blankCtrl.set(label, attachBlanks(root.querySelector(`[data-q-item="${label}"]`), q, {
      picks: state.blanks[label],
      retry: state.retry[label] || null,
      onChange: () => { save(); paintFeedback(); },
      // 다시 푼 기록은 처음 고른 답(state.blanks)과 따로 남긴다. 점수는 건드리지 않는다.
      onRetry: (r) => { if (r) state.retry[label] = r; else delete state.retry[label]; save(); },
      recall,
      autoOpen: true,
      onRecall: (on) => setRecall(on),
      concepts: q.concepts.map((slug) => ({ href: `${mapBase}&n=${slug}`, title: topicTitle(slug) })),
      retryNote: "다시 푼 결과는 점수에 넣지 않습니다. 처음 고른 답의 점수가 남습니다.",
    }));
  });
  // 단계가 바뀌거나 새로 시작할 때: 답 묶음을 다시 잇고, 채점 단계면 맞고 틀림을 보이고 점수 칸을 채운다.
  const syncBlanks = () => {
    const done = state.phase === "grading" || state.phase === "result";
    let filled = false;
    blankCtrl.forEach((ctrl, label) => {
      state.blanks[label] = state.blanks[label] || {};
      ctrl.setPicks(state.blanks[label], state.retry[label] || null);
      ctrl.setGraded(done);
      ctrl.setFeedback(state.phase === "running" && state.feedback === "immediate");
      const s = ctrl.score();
      if (!done || !s.picked || !scoresForm) return;
      filled = true;
      const input = scoresForm.querySelector(`input[name="score-${label}"]`);
      if (input && input.value.trim() === "") input.value = s.got;
    });
    const note = $("[data-ex-blank-note]");
    if (note) note.hidden = !filled;
  };

  /* 계산과 서술: 모범 답안 아래의 체크리스트로 스스로 채점하기 */
  const checkCtrl = new Map();
  questions.filter(hasChecks).forEach((q) => {
    const label = labelOf(q);
    state.checks[label] = state.checks[label] || {};
    const item = root.querySelector(`[data-q-item="${label}"]`);
    checkCtrl.set(label, attachChecks(item.querySelector(".ex-solution"), q, {
      marks: state.checks[label],
      noteHtml: `체크한 점수의 합이 ${label} 점수 칸에 들어갑니다. 점수 칸에서 직접 고칠 수도 있습니다. <a class="ex-link" href="#ex-scores">점수 칸으로 가기</a>`,
      onChange: (s) => {
        const got = Math.min(s.got, q.points);
        const input = scoresForm?.querySelector(`input[name="score-${label}"]`);
        if (input) input.value = got;
        state.draft[label] = String(got);
        // 결과를 본 뒤에 체크를 고치면 결과의 합계도 함께 고친다.
        if (state.phase === "result") { state.scores[label] = got; paintResult(); }
        save();
      },
    }));
  });
  // 새로 시작하면 체크 묶음도 새 상태에 다시 잇는다.
  const syncChecks = () => {
    checkCtrl.forEach((ctrl, label) => {
      state.checks[label] = state.checks[label] || {};
      ctrl.setMarks(state.checks[label]);
    });
  };

  /* 단계 */
  const setPhase = (phase, scroll) => {
    state.phase = phase;
    save(); // 단계가 바뀔 때마다 남겨야 새로 고쳐도 같은 자리에서 이어진다
    root.setAttribute("data-phase", phase);
    bar.hidden = phase !== "running";
    grade.hidden = !(phase === "grading" || phase === "result");
    result.hidden = phase !== "result";
    $$("[data-ex-q-foot]").forEach((el) => { el.hidden = !(phase === "grading" || phase === "result"); });
    syncBlanks();
    syncChecks();
    syncChoices();
    paintFeedback();
    paintPaused();
    if (!scroll) return;
    const target = { paper: $("[data-ex-paper]"), grade, result, cover }[scroll];
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start", behavior: calm ? "auto" : "smooth" });
      if (scroll === "result") result.focus({ preventScroll: true });
    });
  };

  /* 시계 */
  let timer = null;
  let said = {};
  // 누적 휴식 시간과 현재 쉬는 시간을 빼서 남은 시간과 결과의 소요 시간을 같이 계산한다.
  const elapsedMs = () => Math.max(0, (state.pausedAt ?? state.endedAt ?? Date.now()) - state.startedAt - state.pausedMs);
  const settlePause = (now) => {
    if (state.pausedAt === null) return;
    state.pausedMs += Math.max(0, now - state.pausedAt);
    state.pausedAt = null;
  };
  const paintPaused = () => {
    const paused = state.phase === "running" && state.pausedAt !== null;
    root.setAttribute("data-paused", String(paused));
    $("[data-ex-paused]").hidden = !paused;
    $("[data-ex-paper]").inert = paused;
    $(".ex-jump").inert = paused;
    [$("[data-ex-ko]"), $("[data-ex-recall]")].forEach((btn) => { if (btn) btn.disabled = paused; });
    const btn = $("[data-ex-pause]");
    btn.textContent = paused ? "이어서 풀기" : "일시정지";
    btn.setAttribute("aria-pressed", String(paused));
  };
  const tick = () => {
    if (state.phase !== "running" || !state.startedAt) return;
    const left = limit - elapsedMs() / 1000;
    if (left >= 0) {
      clockLabel.textContent = state.pausedAt !== null ? "일시정지 · 남은 시간" : "남은 시간";
      clock.textContent = mmss(left);
      bar.removeAttribute("data-over");
    } else {
      clockLabel.textContent = state.pausedAt !== null ? "일시정지 · 넘긴 시간" : "시간 종료, 넘긴 시간";
      clock.textContent = `+${mmss(-left)}`;
      bar.setAttribute("data-over", "true");
    }
    if (state.pausedAt !== null) return;
    [[600, "10분 남았습니다."], [300, "5분 남았습니다."], [0, "제한 시간이 끝났습니다. 실제 시험이라면 여기서 펜을 놓습니다."]].forEach(([t, msg]) => {
      if (left <= t && !said[t]) {
        said[t] = true;
        if (left > t - 3) announce.textContent = msg; // 다시 열었을 때 이미 지난 구간은 알리지 않는다
      }
    });
  };
  const run = () => {
    clearInterval(timer);
    said = {};
    tick();
    if (state.pausedAt === null) timer = setInterval(tick, 1000);
  };
  const togglePause = () => {
    if (state.phase !== "running") return;
    if (state.pausedAt === null) {
      state.pauseY = window.scrollY;
      state.pausedAt = Date.now();
      clearInterval(timer);
      save();
      paintPaused();
      tick();
      announce.textContent = "시험을 일시정지했습니다.";
      $("[data-ex-resume-exam]").focus({ preventScroll: true });
    } else {
      settlePause(Date.now());
      save();
      paintPaused();
      run();
      announce.textContent = "시험을 이어서 풉니다.";
      requestAnimationFrame(() => {
        window.scrollTo({ top: state.pauseY, behavior: "instant" });
        $("[data-ex-pause]").focus({ preventScroll: true });
      });
    }
  };
  $("[data-ex-pause]").addEventListener("click", togglePause);
  $("[data-ex-resume-exam]").addEventListener("click", togglePause);

  /* 한국어 풀이 */
  const koBtn = $("[data-ex-ko]");
  const paintKo = () => {
    root.setAttribute("data-ko", state.ko ? "on" : "off");
    koBtn.setAttribute("aria-pressed", state.ko ? "true" : "false");
  };
  koBtn.addEventListener("click", () => { state.ko = !state.ko; save(); paintKo(); });

  /* 보기 늦게 보기: 빈칸을 눌러도 보기를 바로 보이지 않는다. 주제별 문제와 같은 설정을 쓴다. */
  const recallBtn = $("[data-ex-recall]");
  const paintRecall = () => { if (recallBtn) recallBtn.setAttribute("aria-pressed", recall ? "true" : "false"); };
  // 위쪽 띠의 단추와 보기 상자 안의 단추(채점 뒤 다시 풀 때)가 같은 값을 쓴다.
  setRecall = (on) => {
    recall = !!on;
    store.set(RECALL_KEY, recall);
    blankCtrl.forEach((ctrl) => ctrl.setRecall?.(recall)); // 예전 blanks.js 가 캐시에 남아 있어도 죽지 않게
    paintRecall();
  };
  if (recallBtn) recallBtn.addEventListener("click", () => {
    setRecall(!recall);
    paintRecall();
  });

  /* 답을 고른 문항만 해설을 연다. 빈칸의 전체 유도는 모두 고른 뒤에 연다. */
  const paintFeedback = () => {
    const immediate = state.phase === "running" && state.feedback === "immediate";
    const done = state.phase === "grading" || state.phase === "result";
    root.setAttribute("data-feedback", state.feedback);
    $("[data-ex-mode-status]").textContent = state.feedback === "immediate" ? "정답 바로 보기 · 변경" : "최종 보기 · 변경";
    questions.forEach((q) => {
      const label = labelOf(q);
      const item = root.querySelector(`[data-q-item="${label}"]`);
      let revealed = false;
      if (immediate) {
        if (["tf", "mc"].includes(q.type)) revealed = !!state.answers[label];
        else if (hasBlankChoices(q)) revealed = blankCtrl.get(label).score().picked === q.blanks.length;
        else revealed = state.revealed[label] === true;
      }
      item.setAttribute("data-revealed", revealed ? "true" : "false");
      const feedback = item.querySelector("[data-ex-feedback]");
      if (feedback) feedback.hidden = !(revealed || (done && (q.type === "blank" || state.graded)));
      if (hasBlankChoices(q)) {
        const s = blankCtrl.get(label).score();
        const show = done || revealed;
        item.setAttribute("data-verdict", !show ? "" : s.right === s.total ? "right" : "wrong");
        item.querySelector("[data-q-verdict]").textContent = !s.picked ? "미응답입니다." : s.right === s.total ? "✓ 모두 맞았습니다." : "✕ 틀린 빈칸이 있습니다.";
        item.querySelector("[data-q-mine]").textContent = `${s.total}개 중 ${s.right}개 정답 · ${s.got} / ${s.max}점`;
      }
      item.querySelector("[data-ex-q-foot]").hidden = !(done || revealed);
      const row = item.querySelector("[data-ex-reveal-row]");
      if (row) {
        row.hidden = !immediate;
        const btn = row.querySelector("button");
        btn.textContent = revealed ? "모범 답안 접기" : "모범 답안 보기";
        btn.setAttribute("aria-expanded", String(revealed));
      }
    });
  };
  $$("[data-ex-reveal]").forEach((btn) => btn.addEventListener("click", () => {
    if (state.phase !== "running" || state.feedback !== "immediate") return;
    const label = btn.getAttribute("data-ex-reveal");
    state.revealed[label] = !state.revealed[label];
    save();
    paintFeedback();
  }));
  $$("[name=feedback-mode]").forEach((input) => {
    input.checked = input.value === state.feedback;
    input.addEventListener("change", () => {
      if (state.phase !== "cover") return;
      state.feedback = input.value;
      save();
    });
  });

  /* 시작과 종료 */
  $("[data-ex-print]").addEventListener("click", () => window.print());
  const startExam = () => {
    clearInterval(timer);
    state = Object.assign(blank(), { ko: state.ko, feedback: state.feedback, startedAt: Date.now() });
    resetForms();
    endConfirm.hidden = true;
    endBtn.hidden = false;
    announce.textContent = "";
    paintUsed();
    setPhase("running", "paper");
    paintResume();
    run();
  };
  $("[data-ex-start]").addEventListener("click", startExam);
  const modeDialog = $("#ex-mode-dialog");
  let modeRestarts = false;
  const openModes = (restart) => {
    modeRestarts = restart;
    $("[data-ex-mode-title]").textContent = restart ? "재시험 시작" : "정답 확인 모드";
    $("[data-ex-mode-note]").textContent = restart
      ? "모드를 고르고 시작하면 이전 답과 점수를 지우고 처음부터 풉니다."
      : "진행 중인 답과 시간은 유지됩니다.";
    $("[data-ex-mode-apply]").textContent = restart ? `${exam.minutes}분 시험 시작` : "적용";
    $$("[name=feedback-dialog]").forEach((input) => { input.checked = input.value === (restart ? "immediate" : state.feedback); });
    modeDialog.showModal();
  };
  $("[data-ex-mode-status]").addEventListener("click", () => openModes(false));
  $$("[data-ex-restart]").forEach((btn) => btn.addEventListener("click", () => openModes(true)));
  $("[data-ex-mode-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.submitter?.value !== "apply") { modeDialog.close(); return; }
    state.feedback = $("[name=feedback-dialog]:checked").value;
    $$("[name=feedback-mode]").forEach((input) => { input.checked = input.value === state.feedback; });
    modeDialog.close();
    if (modeRestarts) startExam();
    else {
      save();
      syncBlanks();
      paintAuto();
      paintFeedback();
    }
  });
  const endBtn = $("[data-ex-end]");
  const endConfirm = $("[data-ex-end-confirm]");
  endBtn.addEventListener("click", () => { endBtn.hidden = true; endConfirm.hidden = false; $("[data-ex-end-yes]").focus(); });
  $("[data-ex-end-no]").addEventListener("click", () => { endConfirm.hidden = true; endBtn.hidden = false; endBtn.focus(); });
  $("[data-ex-end-yes]").addEventListener("click", () => {
    clearInterval(timer);
    state.endedAt = Date.now();
    settlePause(state.endedAt);
    endConfirm.hidden = true;
    endBtn.hidden = false;
    paintUsed();
    state.graded = true;
    paintAuto();
    setPhase("grading", "grade");
  });
  const paintUsed = () => {
    const el = $("[data-ex-used]");
    if (!state.startedAt || !state.endedAt) { el.textContent = ""; return; }
    const used = elapsedMs() / 1000;
    el.textContent = used <= limit
      ? `걸린 시간 ${span(used)}. 제한 시간은 ${exam.minutes}분입니다.`
      : `걸린 시간 ${span(used)}. 제한 시간 ${exam.minutes}분을 ${span(used - limit)} 넘겼습니다.`;
  };

  /* 답안 카드: 참거짓과 객관식 */
  const syncChoices = () => {
    root.querySelectorAll("[data-ex-pick]").forEach((input) => {
      input.checked = state.answers[input.getAttribute("data-ex-pick")] === input.value;
      input.disabled = state.phase !== "running";
    });
    autoQs.forEach((q) => {
      const label = labelOf(q);
      card.querySelectorAll(`input[name="ans-${label}"]`).forEach((input) => {
        input.checked = state.answers[label] === input.value;
      });
    });
  };
  root.addEventListener("change", (e) => {
    const input = e.target.closest("[data-ex-pick]");
    if (!input || state.phase !== "running" || state.pausedAt !== null) return;
    state.answers[input.getAttribute("data-ex-pick")] = input.value;
    state.graded = false;
    save();
    paintAuto();
    paintFeedback();
  });
  const readCard = () => {
    const out = {};
    autoQs.forEach((q) => {
      const picked = card.querySelector(`input[name="ans-${labelOf(q)}"]:checked`);
      if (picked) out[labelOf(q)] = picked.value;
    });
    return out;
  };
  const paintAuto = () => {
    autoQs.forEach((q) => {
      const label = labelOf(q);
      const mine = state.answers[label];
      const ok = mine === q.answer;
      const show = state.graded || (state.phase === "running" && state.feedback === "immediate" && !!mine);
      const verdict = !show ? "" : ok ? "right" : "wrong";
      const row = card.querySelector(`[data-card-row="${label}"]`);
      row.setAttribute("data-verdict", verdict);
      row.querySelector("[data-card-verdict]").textContent = !state.graded ? "" : ok ? "맞음" : `틀림, 정답 ${q.answer}`;
      const item = root.querySelector(`[data-q-item="${label}"]`);
      item.setAttribute("data-verdict", verdict);
      item.querySelector("[data-ex-feedback]").hidden = !show;
      item.querySelector("[data-q-verdict]").textContent = !show ? "" : !mine ? "미응답입니다." : ok ? "✓ 맞았습니다." : "✕ 틀렸습니다.";
      item.querySelector("[data-q-mine]").textContent = show ? `내 답: ${mine || "없음"}` : "";
    });
    const max = autoQs.reduce((s, q) => s + q.points, 0);
    const got = autoQs.reduce((s, q) => s + (state.answers[labelOf(q)] === q.answer ? q.points : 0), 0);
    $("[data-ex-auto-score]").textContent = state.graded ? `${got} / ${max}점` : "";
    root.setAttribute("data-graded", state.graded ? "true" : "false");
    syncChoices();
  };
  card.addEventListener("submit", (e) => {
    e.preventDefault();
    state.answers = readCard();
    state.graded = true;
    save();
    paintAuto();
    if (state.phase === "result") paintResult();
    if (!writtenQs.length) finish();
  });
  card.addEventListener("change", () => {
    // 채점한 뒤 답을 고치면 판정을 지워 다시 채점해야 한다는 것을 보인다.
    state.graded = false;
    state.answers = readCard();
    save();
    paintAuto();
  });

  /* 채점 프롬프트 복사 */
  const raw = $("[data-ex-raw]");
  if (raw) raw.value = prompts.all;
  $$("[data-ex-copy]").forEach((btn) => {
    const original = btn.textContent;
    btn.addEventListener("click", async () => {
      const key = btn.getAttribute("data-ex-copy");
      const ok = await copyText(prompts[key]);
      if (key === "all") {
        $("[data-ex-copy-msg]").textContent = ok
          ? "복사했습니다. LLM에 붙여 넣고 답안 사진을 함께 올리세요."
          : "복사하지 못했습니다. 아래에서 직접 선택해 복사해 주세요.";
      } else {
        btn.textContent = ok ? "복사했습니다" : "복사하지 못했습니다";
        setTimeout(() => { btn.textContent = original; }, 2200);
      }
      if (!ok) { const d = $(".ex-raw"); if (d) d.open = true; }
    });
  });

  /* 손으로 쓴 문항의 점수 */
  if (scoresForm) {
    // 적어 둔 점수는 결과 보기를 누르기 전에도 남긴다(새로 고쳐도 체크리스트의 합계와 어긋나지 않게).
    scoresForm.addEventListener("input", (e) => {
      const input = e.target.closest('input[name^="score-"]');
      if (!input) return;
      state.draft[input.name.slice("score-".length)] = input.value;
      save();
    });
    scoresForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("[data-ex-scores-msg]");
      const out = {};
      for (const q of writtenQs) {
        const input = scoresForm.querySelector(`input[name="score-${labelOf(q)}"]`);
        const v = input.value.trim() === "" ? 0 : Number(input.value);
        if (!Number.isFinite(v) || v < 0 || v > q.points) {
          msg.textContent = `${labelOf(q)}번 점수는 0에서 ${q.points} 사이로 적어 주세요.`;
          input.focus();
          return;
        }
        out[labelOf(q)] = v;
      }
      if (autoQs.length && !state.graded) {
        msg.textContent = "먼저 1번에서 참거짓과 객관식 답을 채점해 주세요.";
        card.querySelector('button[type="submit"]').focus();
        return;
      }
      msg.textContent = "";
      state.scores = out;
      finish();
    });
  }

  /* 결과 */
  const earnedOf = (q) => (isWritten(q) ? state.scores[labelOf(q)] || 0 : state.answers[labelOf(q)] === q.answer ? q.points : 0);
  const paintResult = () => {
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
  const finish = () => { paintResult(); setPhase("result", "result"); paintResume(); };

  /* 되돌리기와 이어 하기 */
  const resetForms = () => { card.reset(); if (scoresForm) scoresForm.reset(); paintAuto(); };
  const resume = $("[data-ex-resume]");
  const paintResume = () => {
    const has = state.total !== null && state.phase === "cover";
    resume.hidden = !has;
    if (has) $("[data-ex-resume-score]").textContent = `${num(state.total)} / ${total}점`;
  };
  $("[data-ex-review]").addEventListener("click", () => { paintResult(); setPhase("result", "result"); paintResume(); });

  /* 처음 그리기 */
  Object.entries(state.answers).forEach(([label, value]) => {
    const input = card.querySelector(`input[name="ans-${label}"][value="${value}"]`);
    if (input) input.checked = true;
  });
  if (scoresForm) writtenQs.forEach((q) => {
    const label = labelOf(q);
    const value = state.draft[label] ?? state.scores[label]; // 적다 만 값이 있으면 그것부터
    const input = scoresForm.querySelector(`input[name="score-${label}"]`);
    if (input && value !== undefined && value !== null) input.value = value;
  });
  paintKo();
  paintRecall();
  paintAuto();
  paintUsed();
  if (state.phase === "result") paintResult();
  setPhase(state.phase);
  paintResume();
  if (state.phase === "running") run();
}

(async function init() {
  if (subjectId === "sl" && ["midterm-2", "midterm-3"].includes(setId)) {
    location.replace("paper.html?s=sl&set=midterm-1");
    return;
  }
  try {
    const [data] = await Promise.all([loadPrep(meta), whenMathReady()]);
    const exam = data.exams.find((e) => e.set === setId);
    const questions = sortQuestions(data.questions.filter((q) => q.set === setId));
    if (!exam || !questions.length) throw new Error("모의시험 문항이 없습니다");
    const tree = buildTree(data.concepts);
    const topicTitle = (slug) => tree.bySlug.get(slug)?.title ?? slug;
    const parts = exam.parts.map((p) => ({ ...p, items: questions.filter((q) => q.part === p.id) })).filter((p) => p.items.length);

    document.title = `${exam.title} · ${meta.title} · AI Study Hub`;
    app.innerHTML = pageHtml(exam, questions, parts, topicTitle);
    typeset(app);
    if (params.get("study") === "D" && questions.some((q) => q.part === "D")) wireStudy(app.querySelector(".ex"));
    else wire(app.querySelector(".ex"), exam, questions, topicTitle);
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="pp-empty"><h2>모의시험을 불러오지 못했습니다</h2><p>잠시 뒤 다시 열어 주세요. (${esc(err.message)})</p></div>`;
  }
})();
