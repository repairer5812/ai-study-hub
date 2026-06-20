// viz.js — 트리·그래프를 SVG로 렌더 (테마 CSS 변수 사용, 라이트/다크 자동 대응)
//   tree:  { type:"tree", root:{ v, l?, r? } }              (이진 트리/힙)
//   graph: { type:"graph", directed?, nodes:[{id,x,y}], edges:[{a,b,w?}] }

const R = 16;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ── 이진 트리: 중위 순회 인덱스로 x, 깊이로 y ──
function layoutTree(root) {
  const nodes = [], edges = [];
  let idx = 0, maxD = 0;
  (function walk(n, d, parent) {
    if (!n) return;
    walk(n.l, d + 1, n);
    n._x = idx++; n._y = d; maxD = Math.max(maxD, d);
    nodes.push(n);
    if (parent) edges.push([parent, n]);
    walk(n.r, d + 1, n);
  })(root, 0, null);
  return { nodes, edges, cols: Math.max(1, idx), rows: maxD + 1 };
}

function treeSVG(root) {
  const { nodes, edges, cols, rows } = layoutTree(root);
  const dx = 48, dy = 62, pad = 22;
  const w = (cols - 1) * dx + pad * 2, h = (rows - 1) * dy + pad * 2;
  const X = (n) => pad + n._x * dx, Y = (n) => pad + n._y * dy;
  let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${Math.min(w, 540)}px;height:auto;display:block;margin:auto" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace,Consolas,monospace">`;
  for (const [p, c] of edges) s += `<line x1="${X(p)}" y1="${Y(p)}" x2="${X(c)}" y2="${Y(c)}" stroke="var(--c-text)" stroke-opacity="0.4" stroke-width="1.5"/>`;
  for (const n of nodes) {
    s += `<circle cx="${X(n)}" cy="${Y(n)}" r="${R}" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.6"/>`;
    s += `<text x="${X(n)}" y="${Y(n)}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="700" fill="var(--c-text)">${esc(n.v)}</text>`;
  }
  return s + `</svg>`;
}

function graphSVG(g) {
  const pad = 22;
  const w = Math.max(...g.nodes.map((n) => n.x)) + pad, h = Math.max(...g.nodes.map((n) => n.y)) + pad;
  const pos = (id) => g.nodes.find((n) => n.id === id);
  let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${Math.min(w, 480)}px;height:auto;display:block;margin:auto" xmlns="http://www.w3.org/2000/svg" font-family="ui-sans-serif,system-ui,sans-serif">`;
  if (g.directed) s += `<defs><marker id="vzarrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--c-text)" fill-opacity="0.55"/></marker></defs>`;
  for (const e of g.edges) {
    const a = pos(e.a), b = pos(e.b);
    if (!a || !b) continue;
    let ux = b.x - a.x, uy = b.y - a.y; const len = Math.hypot(ux, uy) || 1; ux /= len; uy /= len;
    const x1 = a.x + ux * R, y1 = a.y + uy * R;
    const off = R + (g.directed ? 3 : 0);
    const x2 = b.x - ux * off, y2 = b.y - uy * off;
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--c-text)" stroke-opacity="0.45" stroke-width="1.8"${g.directed ? ' marker-end="url(#vzarrow)"' : ""}/>`;
    if (e.w != null) {
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      s += `<rect x="${mx - 9}" y="${my - 9}" width="18" height="16" rx="3" fill="var(--c-surface)" stroke="var(--c-border-soft)" stroke-width="0.6"/>`;
      s += `<text x="${mx}" y="${my - 1}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="var(--c-text)">${esc(e.w)}</text>`;
    }
  }
  for (const n of g.nodes) {
    s += `<circle cx="${n.x}" cy="${n.y}" r="${R}" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.6"/>`;
    s += `<text x="${n.x}" y="${n.y}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="700" fill="var(--c-text)">${esc(n.id)}</text>`;
  }
  return s + `</svg>`;
}

export function renderViz(viz) {
  if (!viz || !viz.type) return "";
  try {
    if (viz.type === "tree" && viz.root) return treeSVG(viz.root);
    if (viz.type === "graph" && Array.isArray(viz.nodes)) return graphSVG(viz);
  } catch (_) { /* fall through */ }
  return "";
}
