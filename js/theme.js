// theme.js — 라이트/다크 테마 토글
const THEME_KEY = "ml-exam-theme";

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "bento");
  applyTheme(initial);
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  updateToggleIcon(theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "bento";
  applyTheme(current === "bento" ? "dark" : "bento");
}

function updateToggleIcon(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.textContent = theme === "dark" ? "☀" : "☾";
  btn.setAttribute("aria-label", theme === "dark" ? "라이트 테마로 전환" : "다크 테마로 전환");
}

// 자동 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}

// 전역 노출 (스크립트 태그에서 직접 호출 가능)
window.__theme = { toggleTheme, applyTheme };
