// review.js — 주차별 복습 뷰어
//   - 사이드바: 주차 목록 (과목별 noteIndex)
//   - 본문: 선택한 md 파일을 fetch하여 marked로 렌더 → KaTeX로 수식 렌더
//   - 체크리스트: md의 `- [ ]` 문법을 checkbox로 렌더하고 localStorage에 진행도 저장

import { getSubjectMeta } from "./subjects/index.js";

const params = new URLSearchParams(location.search);
const subjectId = params.get("s") || "ml";
const initialSlug = params.get("w"); // 특정 주차 바로 열기 (선택)

let meta;
try {
  meta = getSubjectMeta(subjectId);
} catch (_) {
  location.href = "index.html";
  throw new Error("Unknown subject");
}

// ── 헤더 & 브레드크럼 ────────────────────────────────
document.getElementById("crumb").textContent = `← 홈 / ${meta.title} / 복습`;
document.getElementById("hero-badge").textContent = `${meta.emoji} ${meta.title.toUpperCase()} · REVIEW`;
document.getElementById("hero-title").textContent = `${meta.title} 복습`;
document.getElementById("hero-sub").textContent = meta.subtitle;
document.title = `${meta.title} 복습 · AI Study Hub`;

const goExamBtn = document.getElementById("go-exam");
if (meta.hasExam && meta.sets.length) {
  goExamBtn.style.display = "";
  goExamBtn.href = `subject.html?s=${subjectId}`;
}

// ── 사이드바 렌더 ─────────────────────────────────────
const list = document.getElementById("week-list");
list.innerHTML = meta.noteIndex.map(n => `
  <li><a href="?s=${subjectId}&w=${encodeURIComponent(n.slug)}" data-slug="${n.slug}">${n.title}</a></li>
`).join("");

list.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const slug = a.dataset.slug;
    history.pushState({}, "", `?s=${subjectId}&w=${encodeURIComponent(slug)}`);
    loadNote(slug);
  });
});

// ── 초기 로드 ────────────────────────────────────────
if (meta.noteIndex.length === 0) {
  document.getElementById("note-body").innerHTML = `
    <div class="empty">
      <div style="font-size:48px; margin-bottom:12px;">📭</div>
      <h2>자료 준비 중</h2>
      <p>이 과목의 학습 노트는 아직 업로드되지 않았습니다.</p>
    </div>`;
} else {
  const target = initialSlug || meta.noteIndex[0].slug;
  loadNote(target);
}

// ── 노트 로드 ─────────────────────────────────────────
async function loadNote(slug) {
  // 사이드바 active 갱신
  list.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.dataset.slug === slug));

  const body = document.getElementById("note-body");
  body.innerHTML = `<div class="loading">불러오는 중…</div>`;

  const url = `notes/${subjectId}/${slug}.md`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    const md = await resp.text();

    // ── 수식 보호 ─────────────────────────────────────
    // marked가 `$h_t$`의 `_`를 <em>으로 해석해 KaTeX 파싱을 깨뜨리는 문제 방지.
    // $$...$$ 와 $...$ 블록을 placeholder로 치환 → marked 렌더 → 복원.
    const mathBlocks = [];
    const MATH_SENTINEL = "§§MATH§§";
    let protectedMd = md;

    // 1) $$...$$ 블록 수식 (여러 줄 가능)
    protectedMd = protectedMd.replace(/\$\$[\s\S]+?\$\$/g, (m) => {
      mathBlocks.push(m);
      return `${MATH_SENTINEL}${mathBlocks.length - 1}${MATH_SENTINEL}`;
    });
    // 2) $...$ 인라인 수식 (같은 줄 내, $ 미포함)
    protectedMd = protectedMd.replace(/\$(?!\s)[^\n$]*?(?<!\s)\$/g, (m) => {
      mathBlocks.push(m);
      return `${MATH_SENTINEL}${mathBlocks.length - 1}${MATH_SENTINEL}`;
    });

    // marked 렌더 (GFM + 체크박스)
    marked.setOptions({ gfm: true, breaks: false });
    let html = marked.parse(protectedMd);

    // placeholder 복원
    html = html.replace(
      new RegExp(`${MATH_SENTINEL}(\\d+)${MATH_SENTINEL}`, "g"),
      (_, idx) => mathBlocks[+idx] ?? ""
    );
    body.innerHTML = html;

    // 체크박스 진행도 복원 + 저장
    hydrateCheckboxes(slug);

    // KaTeX 렌더링
    if (window.renderMathInElement) {
      window.renderMathInElement(body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$",  right: "$",  display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error(err);
    body.innerHTML = `
      <div class="empty">
        <div style="font-size:48px;">⚠️</div>
        <h2>노트를 불러오지 못했습니다</h2>
        <p class="muted">파일: <code>${url}</code></p>
        <p class="muted">에러: ${err.message}</p>
      </div>`;
  }
}

// ── 체크박스 진행도 (localStorage) ───────────────────
function hydrateCheckboxes(slug) {
  const key = `review:${subjectId}:${slug}:checks`;
  const saved = JSON.parse(localStorage.getItem(key) || "{}");

  const body = document.getElementById("note-body");
  // marked가 생성한 체크박스는 disabled 상태. 활성화해서 저장 기능 붙이기
  const checks = body.querySelectorAll("input[type=checkbox]");
  checks.forEach((cb, idx) => {
    cb.disabled = false;
    if (saved[idx] !== undefined) cb.checked = saved[idx];
    cb.addEventListener("change", () => {
      const snap = {};
      checks.forEach((c, i) => { snap[i] = c.checked; });
      localStorage.setItem(key, JSON.stringify(snap));
    });
  });
}

// ── 브라우저 뒤로가기 지원 ────────────────────────────
window.addEventListener("popstate", () => {
  const sp = new URLSearchParams(location.search);
  const slug = sp.get("w") || meta.noteIndex[0]?.slug;
  if (slug) loadNote(slug);
});
