// review.js — 주차별 복습 뷰어
//   - 사이드바: 주차 목록 (과목별 noteIndex)
//   - 본문: 선택한 md 파일을 fetch하여 marked로 렌더 → KaTeX로 수식 렌더
//   - 체크리스트: md의 `- [ ]` 문법을 checkbox로 렌더하고 localStorage에 진행도 저장

import { getSubjectMeta } from "./subjects/index.js";
import { SLIDE_MAP, CURATED_SLUGS } from "./slide-map.js";

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

    // 섹션별 맥락 슬라이드 삽입 + 기존 끝 갤러리 숨김 (큐레이션 완료 주차만)
    injectContextSlides(body, slug);

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

// ── 섹션별 맥락 슬라이드 삽입 ──────────────────────────
function normalizeKey(s) {
  // 한글·영숫자만 남기고 소문자화
  return String(s || "")
    .toLowerCase()
    .replace(/[\s ·\-–—:().,'"\[\]{}!?#$%^&*+=/\\|<>~`]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

function findMatchingKey(headingText, mappingObj) {
  if (!mappingObj) return null;
  const hk = normalizeKey(headingText);
  if (!hk) return null;
  for (const [key, slides] of Object.entries(mappingObj)) {
    const exact = key.startsWith("^");
    const bare = exact ? key.slice(1) : key;
    const bk = normalizeKey(bare);
    if (!bk) continue;
    if (exact) {
      if (hk === bk) return slides;
    } else {
      if (hk.includes(bk) || bk.includes(hk)) return slides;
    }
  }
  return null;
}

function injectContextSlides(body, slug) {
  const subjMap = SLIDE_MAP[subjectId] || {};
  const mapping = subjMap[slug];

  // 1) 큐레이션 완료 주차면 기존 끝 <details> 갤러리 숨김
  if (CURATED_SLUGS.has(slug)) {
    const all = body.innerHTML;
    // AUTO:SLIDES 마커 범위 제거 (marked가 HTML 주석을 그대로 통과시키므로 innerHTML에 포함됨)
    // marker는 주석이라 그대로 존재할 수도, sanitize됐을 수도 — 양쪽 대응
    body.innerHTML = all.replace(
      /<!--\s*AUTO:SLIDES:START\s*-->[\s\S]*?<!--\s*AUTO:SLIDES:END\s*-->/g,
      ""
    );
    // marker 없이 <details>만 남았을 수도 — 직후 렌더된 '강의 슬라이드' 섹션 탐색·제거
    body.querySelectorAll("h2").forEach(h2 => {
      if (h2.textContent.includes("강의 슬라이드") && h2.textContent.includes("원본 PDF")) {
        // 이 h2부터 body 끝까지 전부 제거
        let node = h2.previousSibling;
        // h2 위에 hr(---)이 있으면 함께 제거
        if (node && node.nodeType === 1 && node.tagName === "HR") node.remove();
        let cursor = h2;
        while (cursor) {
          const next = cursor.nextSibling;
          cursor.remove();
          cursor = next;
        }
      }
    });
  }

  // 2) 매핑 없으면 종료
  if (!mapping || Object.keys(mapping).length === 0) return;

  // 3) 모든 h2·h3 순회하며 해당 섹션 끝에 슬라이드 삽입
  const headings = body.querySelectorAll("h2, h3");
  const insertedKeys = new Set();
  headings.forEach(h => {
    const slides = findMatchingKey(h.textContent, mapping);
    if (!slides || slides.length === 0) return;
    const key = slides.join("|");
    if (insertedKeys.has(key)) return; // 중복 삽입 방지
    insertedKeys.add(key);

    const block = document.createElement("div");
    block.className = "context-slides";
    block.style.cssText =
      "margin:10px 0 22px; display:grid; " +
      "grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:8px;";
    slides.forEach(fn => {
      const img = document.createElement("img");
      img.src = `assets/images/${subjectId}/${fn}`;
      img.loading = "lazy";
      img.alt = fn;
      img.style.cssText =
        "width:100%; border:1px solid var(--c-border-soft); " +
        "border-radius:8px; cursor:zoom-in; background:#fff;";
      img.addEventListener("click", () => openLightbox(img.src));
      block.appendChild(img);
    });

    // 해당 섹션의 '끝'에 삽입 = 다음 같은 레벨 heading 바로 앞
    // 간단히: h 다음 sibling 앞에 삽입 (h 바로 아래)
    h.insertAdjacentElement("afterend", block);
  });
}

// Lightbox
let __lightboxEl = null;
function openLightbox(src) {
  if (!__lightboxEl) {
    __lightboxEl = document.createElement("div");
    __lightboxEl.style.cssText =
      "position:fixed; inset:0; background:rgba(0,0,0,0.85); " +
      "display:flex; align-items:center; justify-content:center; z-index:10000; cursor:zoom-out;";
    __lightboxEl.innerHTML = `<img style="max-width:95vw; max-height:95vh; box-shadow:0 4px 40px rgba(0,0,0,0.4);">`;
    __lightboxEl.addEventListener("click", () => __lightboxEl.remove());
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.contains(__lightboxEl)) __lightboxEl.remove();
    });
  }
  __lightboxEl.querySelector("img").src = src;
  document.body.appendChild(__lightboxEl);
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
