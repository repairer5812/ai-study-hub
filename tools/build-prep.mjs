// 시험 준비 콘텐츠(개념 지도, 모의시험, 주제별 문제)를 검사하고 한 파일로 묶는다.
//
//   node tools/build-prep.mjs <과목 id>          검사하고 notes/<id>/prep.json 을 쓴다
//   node tools/build-prep.mjs <과목 id> --check  검사만 한다
//   node tools/build-prep.mjs <과목 id> --force  오류가 있어도 쓴다(화면 개발용)
//
// 원본(사람이 고치는 곳)
//   notes/<id>/_prep/concepts/<slug>.md           개념 노드 하나
//   notes/<id>/_prep/questions/<set>/<이름>.md    문항 하나 (set = midterm-1, practice ...)
//   notes/<id>/_prep/exams.json                   시험 표지 정보(제목, 시간, 파트)
//
// 빈칸 유도(type: blank) 문항에는 <section data-q="options"> 구역을 둔다. 화면에서 빈칸을 누르면
// 다섯 보기 가운데 고를 수 있게 하는 자료다. 빈칸마다 다음 여섯 줄을 쓴다.
//   (번호) 배점
//   = $정답$
//   - $틀린 보기$      (네 줄)
// 보기는 수식 하나($...$)로 쓰고, 낱말은 $\text{...}$ 로 쓴다. 보기의 순서는 여기서 섞어 고정한다.
//
// 계산과 서술(type: calc, essay) 문항에는 <section data-q="checks"> 구역을 둘 수 있다. 화면에서 스스로
// 채점하는 체크리스트다. 묶음의 머리줄과 항목을 다음처럼 쓴다. 항목 점수의 합은 문항 배점과 같아야 한다.
//   @ 묶음 라벨
//   - 점수 | 답안에 있으면 체크할 문장      (점수는 0.5 단위의 양수, 수식은 $...$)
// 결과(화면이 읽는 곳)
//   notes/<id>/prep.json
//
// 이 사이트에는 빌드 단계가 없어서, 화면에서 잡히지 않는 실수를 여기서 잡는다.
//   - 수식 안의 한글, 유도 옆 주석(&&), 금지 기호
//   - HTML 태그와 마크다운 사이의 빈 줄, 빈칸 번호와 답의 짝, 없는 slug 참조
//   - 실명과 발언 인용처럼 공개 사이트에 올리면 안 되는 표현
//
// 캐시 버전(모든 화면 공통)
//   node tools/build-prep.mjs --stamp           버전을 계산해 모든 자리에 쓴다
//   node tools/build-prep.mjs --stamp --check   쓰지 않고, 모든 자리가 지금 버전인지 본다
// 화면이 부르는 로컬 js, css 의 주소와 묶음(prep.json)의 주소 끝에 같은 ?v=<버전> 을 붙인다. 버전은 부르는
// 파일들과 묶음의 내용 해시라서 내용이 바뀌면 저절로 바뀌고, 그대로면 그대로다. 사람이 버전을 올리지 않는다.
// 과목 묶음을 쓸 때도 마지막에 저절로 쓰고, --check 는 버전이 맞지 않으면 오류로 센다.
// 같은 모듈을 한 화면에서 서로 다른 주소(?v= 가 있고 없고)로 부르면 두 번 실행되므로, 모든 자리를 같은 값으로 맞춘다.
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const stampOnly = process.argv[2] === '--stamp';
const subject = stampOnly ? null : process.argv[2];
const checkOnly = process.argv.includes('--check');
const force = process.argv.includes('--force'); // 오류가 있어도 묶음 파일을 쓴다(화면 개발용)
if (!subject && !stampOnly) {
  console.error('사용: node tools/build-prep.mjs <과목 id> [--check]   또는   node tools/build-prep.mjs --stamp [--check]');
  process.exit(2);
}

/* ---------- 캐시 버전 ---------- */
const HTML_REF = /(<(?:script|link)\b[^>]*?\b(?:src|href)=")((?:\.\/)?(?:js|css)\/[^"?]+\.(?:js|css))(?:\?v=[^"]*)?(")/g;
const MODULE_BLOCK = /(<script\b[^>]*type="module"[^>]*>)([\s\S]*?)(<\/script>)/g;
const JS_REF = /(\b(?:from|import)\s*["'])(\.{1,2}\/[^"'?]+\.js)(?:\?v=[^"']*)?(["'])/g;
const PREP_VERSION = /(\bprep:\s*\{\s*version:\s*")[^"]*(")/;
const walkExt = (dir, ext) =>
  !existsSync(dir)
    ? []
    : readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        return statSync(p).isDirectory() ? walkExt(p, ext) : p.endsWith(ext) ? [p] : [];
      });

function siteFiles() {
  const html = readdirSync(ROOT).filter((n) => n.endsWith('.html')).map((n) => join(ROOT, n)).sort();
  const js = walkExt(join(ROOT, 'js'), '.js').sort();
  return { html, js };
}

/** 화면이 부르는 로컬 파일(절대 경로)을 모두 모은다. */
function referencedFiles({ html, js }) {
  const out = new Set();
  const add = (from, spec) => out.add(resolve(dirname(from), spec));
  for (const f of html) {
    const text = readFileSync(f, 'utf8');
    for (const m of text.matchAll(HTML_REF)) add(f, m[2]);
    for (const block of text.matchAll(MODULE_BLOCK)) for (const m of block[2].matchAll(JS_REF)) add(f, m[2]);
  }
  for (const f of js) for (const m of readFileSync(f, 'utf8').matchAll(JS_REF)) add(f, m[2]);
  return out;
}

/** 부르는 파일과 묶음의 내용 해시. 버전 문자열 자체는 빼고 계산해서 다시 써도 값이 같다. */
function assetVersion(files) {
  const missing = [...files].filter((f) => !existsSync(f));
  if (missing.length) throw new Error(`없는 파일을 부른다: ${missing.map((f) => relative(ROOT, f)).join(', ')}`);
  const bundles = readdirSync(join(ROOT, 'notes')).map((d) => join(ROOT, 'notes', d, 'prep.json')).filter(existsSync);
  const h = createHash('sha256');
  for (const f of [...new Set([...files, ...bundles])].sort()) {
    // ?v= 를 통째로 빼고 계산한다. 버전이 붙기 전과 뒤의 해시가 같아야 다시 써도 값이 바뀌지 않는다.
    const text = readFileSync(f, 'utf8').replace(/\?v=[^"'\s)]*/g, '').replace(PREP_VERSION, '$1$2');
    h.update(`${relative(ROOT, f).replace(/\\/g, '/')}\0${text}\0`);
  }
  return h.digest('hex').slice(0, 10);
}

/** 모든 자리에 버전을 쓴다(write=false 면 고쳐야 할 파일만 돌려준다). */
function stamp(write) {
  const files = siteFiles();
  const ver = assetVersion(referencedFiles(files));
  const changed = [];
  const put = (f, next) => {
    if (next === readFileSync(f, 'utf8')) return;
    changed.push(relative(ROOT, f).replace(/\\/g, '/'));
    if (write) writeFileSync(f, next, 'utf8');
  };
  for (const f of files.html) {
    put(f, readFileSync(f, 'utf8')
      .replace(HTML_REF, `$1$2?v=${ver}$3`)
      .replace(MODULE_BLOCK, (_, open, body, close) => open + body.replace(JS_REF, `$1$2?v=${ver}$3`) + close));
  }
  for (const f of files.js) {
    let text = readFileSync(f, 'utf8').replace(JS_REF, `$1$2?v=${ver}$3`);
    if (f.includes(`${join('js', 'subjects')}`)) text = text.replace(PREP_VERSION, `$1${ver}$2`);
    put(f, text);
  }
  return { ver, changed };
}

function reportStamp(write) {
  const { ver, changed } = stamp(write);
  if (!changed.length) console.log(`캐시 버전 ${ver}: 모든 자리가 맞다`);
  else if (write) console.log(`캐시 버전 ${ver}: ${changed.length}개 파일에 썼다 (${changed.join(', ')})`);
  else console.log(`캐시 버전 ${ver}: 맞지 않는 파일 ${changed.length}개 (${changed.join(', ')}). node tools/build-prep.mjs --stamp 를 돌린다`);
  return changed.length === 0 || write;
}

if (stampOnly) process.exit(reportStamp(!checkOnly) ? 0 : 1);
const SRC = join(ROOT, 'notes', subject, '_prep');
const OUT = join(ROOT, 'notes', subject, 'prep.json');

const errors = [];
const warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warns.push(`${f}: ${m}`);

const walk = (dir) =>
  !existsSync(dir)
    ? []
    : readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
      });

function parse(file) {
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: null, body: raw };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].replace(/\s+#.*$/, '').trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    else if (v === 'null' || v === '~' || v === '') v = null;
    else if (/^-?\d+(\.\d+)?$/.test(v)) v = Number(v);
    else v = v.replace(/^['"]|['"]$/g, '');
    data[kv[1]] = v;
  }
  return { data, body: m[2].trim() };
}

/** 본문에서 수식 조각을 뽑는다. 블록은 `$$` 단독 줄 사이, 인라인은 한 줄 안의 $...$. */
function mathOf(body) {
  const blocks = [];
  const prose = [];
  const oneLine = [];
  let open = false;
  let buf = [];
  body.split('\n').forEach((line, i) => {
    const t = line.trim();
    if (t === '$$') {
      if (open) { blocks.push(buf.join('\n')); buf = []; }
      open = !open;
      return;
    }
    if (t.includes('$$')) oneLine.push(i + 1);
    if (open) buf.push(line);
    else prose.push(line);
  });
  const inline = [];
  const text = prose.map((l) => l.replace(/\$([^$\n]+)\$/g, (_, x) => { inline.push(x); return ' '; })).join('\n');
  return { blocks, inline, text, unclosed: open, oneLine };
}

const HANGUL = /[가-힣]/;
const BANNED = [[/—/, 'em dash(—)'], [/·/, '가운뎃점(·)'], [/[「」『』]/, '낫표'], [/→/, '화살표(→)']];
const LEAK = [
  /교수님/, /교수가\s/, /교수는\s/, /시험에\s*(꼭\s*)?(낸다|나온다|나옵니다|내겠)/, /라고\s*(말씀|하셨)/,
];
// 실명, 연구실 이름, 과목 코드처럼 그 자체가 올라가면 안 되는 문자열은 이 저장소에 적지 않는다.
// tools/leak.local.txt(커밋하지 않는 파일)에 한 줄에 하나씩 적어 두면 여기서 함께 검사한다.
const LEAK_LOCAL = join(ROOT, 'tools', 'leak.local.txt');
if (existsSync(LEAK_LOCAL)) {
  readFileSync(LEAK_LOCAL, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#'))
    .forEach((s) => LEAK.push(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')));
} else {
  warn('tools/leak.local.txt', '실명 검사 목록이 없다. 일반 표현만 검사했다');
}

function checkCommon(f, body) {
  const m = mathOf(body);
  if (m.unclosed) err(f, '블록 수식 `$$` 의 짝이 맞지 않는다');
  m.oneLine.forEach((n) => err(f, `${n}번째 줄: 블록 수식은 \`$$\` 만 있는 줄로 열고 닫는다`));
  [...m.blocks, ...m.inline].forEach((x) => {
    if (HANGUL.test(x)) err(f, `수식 안에 한글: ${x.trim().slice(0, 50)}`);
  });
  m.blocks.forEach((x) => {
    if (/&&/.test(x)) err(f, `유도 옆 주석(&&)은 화면 폭을 넘는다: ${x.trim().slice(0, 40)}`);
    x.split('\\\\').forEach((row) => {
      if (row.replace(/\\[a-zA-Z]+|[{}_^&\s]/g, '').length > 95) warn(f, `수식 한 줄이 길다(휴대폰에서 가로 스크롤): ${row.trim().slice(0, 50)}`);
    });
  });
  BANNED.forEach(([re, name]) => { if (re.test(m.text)) err(f, `금지 기호 ${name}`); });
  LEAK.forEach((re) => { const hit = body.match(re); if (hit) err(f, `공개 사이트에 올리면 안 되는 표현: "${hit[0]}"`); });
  const lines = body.split('\n');
  lines.forEach((line, i) => {
    const t = line.trim();
    const next = (lines[i + 1] ?? '').trim();
    if (/^<(div|section|details)\b[^>]*>$/.test(t) && next !== '' && !/^<summary/.test(next))
      err(f, `${i + 1}번째 줄: 여는 태그 다음 줄은 비워야 마크다운이 그려진다`);
    if (/^<\/(div|section|details)>$/.test(t) && (lines[i - 1] ?? '').trim() !== '')
      err(f, `${i + 1}번째 줄: 닫는 태그 앞 줄은 비워야 한다`);
    if (/^<summary>.*<\/summary>$/.test(t) && next !== '')
      err(f, `${i + 1}번째 줄: <summary> 다음 줄은 비워야 한다`);
  });
}

/* ---------- 개념 노드 ---------- */
const SIGNALS = ['emph', 'hw', 'out', 'skim', 'none'];
const nodes = new Map();
for (const file of walk(join(SRC, 'concepts'))) {
  const f = relative(ROOT, file).replace(/\\/g, '/');
  const { data, body } = parse(file);
  const slug = basename(file, '.md');
  if (!data) { err(f, 'frontmatter 가 없다'); continue; }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err(f, 'slug 는 영문 소문자 kebab-case');
  for (const k of ['title', 'summary']) if (!data[k]) err(f, `frontmatter ${k} 누락`);
  if (data.signal && !SIGNALS.includes(data.signal)) err(f, `signal 값 오류: ${data.signal}`);
  if (typeof data.summary === 'string' && data.summary.includes('$')) err(f, 'summary 에는 수식을 넣지 않는다');
  if (typeof data.title === 'string' && data.title.length > 34) warn(f, `제목이 길다(${data.title.length}자)`);
  nodes.set(slug, { f, data, body });
  checkCommon(f, body);
}
const roots = [...nodes].filter(([, n]) => !n.data.parent);
if (nodes.size && roots.length !== 1) err(`notes/${subject}/_prep/concepts`, `뿌리는 하나여야 한다(지금 ${roots.length}개)`);
const rootSlug = roots[0]?.[0];
const branches = [...nodes].filter(([, n]) => n.data.parent === rootSlug).map(([s]) => s);
const linkRe = new RegExp(`\\]\\(map\\.html\\?s=([a-z0-9]+)&n=([a-z0-9-]+)\\)`, 'g');
for (const [, n] of nodes) {
  if (n.data.parent && !nodes.has(n.data.parent)) err(n.f, `parent "${n.data.parent}" 가 없다`);
  for (const r of n.data.related ?? []) if (!nodes.has(r)) err(n.f, `related "${r}" 가 없다`);
  for (const m of n.body.matchAll(linkRe)) if (m[1] !== subject || !nodes.has(m[2])) err(n.f, `없는 노드로 가는 링크: ${m[2]}`);
  if (/\]\(\/수업\//.test(n.body)) err(n.f, '노드 링크는 map.html?s=<과목>&n=<slug> 꼴로 쓴다');
  const isLeaf = n.data.parent && n.data.parent !== rootSlug;
  if (isLeaf) {
    if (!/class="cal q"/.test(n.body)) warn(n.f, '확인 질문(cal q)이 없다');
    if (/class="cal q"/.test(n.body) && !/<details class="solve">/.test(n.body)) err(n.f, '확인 질문의 답(details.solve)이 없다');
  }
  if ((n.body.match(/class="cal key"/g) ?? []).length > 1) warn(n.f, 'cal key 박스는 노드당 하나');
}
// 순환 확인
for (const [slug] of nodes) {
  const seen = new Set();
  for (let s = slug; s; s = nodes.get(s)?.data.parent) {
    if (seen.has(s)) { err(nodes.get(slug).f, '부모 관계가 순환한다'); break; }
    seen.add(s);
  }
}

/* ---------- 빈칸의 보기 ---------- */
// 문항 id 와 빈칸 번호로 씨앗을 만들어 섞는다. 다시 묶어도 순서가 바뀌지 않아야 방문자가 고른 답이 유지된다.
function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const okPos = [0, 0, 0, 0, 0];
function parseOptions(f, src, nums, points, id) {
  if (!src) { err(f, '보기(options) 구역이 없다'); return null; }
  const out = [];
  let cur = null;
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const head = line.match(/^\((\d+)\)\s+(\d+(?:\.\d+)?)$/);
    if (head) { cur = { n: Number(head[1]), points: Number(head[2]), options: [] }; out.push(cur); continue; }
    const opt = line.match(/^([=-])\s+\$([^$]+)\$$/);
    if (!opt || !cur) { err(f, `보기 구역에서 읽지 못한 줄: ${line.slice(0, 50)}`); continue; }
    if (HANGUL.test(opt[2])) err(f, `보기에 한글: ${opt[2].slice(0, 40)}`);
    if (/\\blank/.test(opt[2])) err(f, '보기에 빈칸이 들어 있다');
    cur.options.push({ tex: opt[2].trim(), ok: opt[1] === '=' });
  }
  const got = out.map((b) => b.n);
  if (got.join(',') !== nums.join(',')) err(f, `보기의 빈칸 번호(${got.join(',')})가 문제의 빈칸(${nums.join(',')})과 다르다`);
  const sum = out.reduce((a, b) => a + b.points, 0);
  if (sum !== points) err(f, `보기의 배점 합 ${sum}점이 문항 배점 ${points}점과 다르다`);
  for (const b of out) {
    if (b.options.length !== 5) err(f, `빈칸 (${b.n}) 의 보기는 다섯 개여야 한다(지금 ${b.options.length}개)`);
    if (b.options.filter((o) => o.ok).length !== 1) err(f, `빈칸 (${b.n}) 의 정답(=)은 하나여야 한다`);
    const norm = b.options.map((o) => o.tex.replace(/\s+/g, ''));
    if (new Set(norm).size !== norm.length) err(f, `빈칸 (${b.n}) 에 같은 보기가 두 번 있다`);
    const rnd = seeded(`${id}/${b.n}`);
    for (let i = b.options.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b.options[i], b.options[j]] = [b.options[j], b.options[i]];
    }
    const at = b.options.findIndex((o) => o.ok);
    if (at >= 0 && at < 5) okPos[at] += 1;
  }
  return out;
}

/* ---------- 스스로 채점하는 체크리스트 ---------- */
// 묶음(@ 라벨) 아래에 항목(- 점수 | 문장)을 둔다. 화면은 체크한 항목의 점수를 더해 보여 준다.
function parseChecks(f, src, points) {
  const out = [];
  let cur = null;
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const head = line.match(/^@\s+(\S.*)$/);
    if (head) { cur = { label: head[1].trim(), items: [] }; out.push(cur); continue; }
    const item = line.match(/^-\s+(\d+(?:\.\d+)?)\s*\|\s*(\S.*)$/);
    if (!item || !cur) { err(f, `체크리스트(checks) 구역에서 읽지 못한 줄: ${line.slice(0, 50)}`); continue; }
    const pts = Number(item[1]);
    if (!(pts > 0) || !Number.isInteger(pts * 2)) err(f, `체크리스트 항목의 점수는 0.5 단위의 양수여야 한다: ${line.slice(0, 40)}`);
    if ((item[2].match(/\$/g) ?? []).length % 2) err(f, `체크리스트 항목에서 수식 기호 $ 의 짝이 맞지 않는다: ${item[2].slice(0, 40)}`);
    cur.items.push({ points: pts, text: item[2].trim() });
  }
  if (!out.length) err(f, '체크리스트(checks)에 묶음(@ 라벨)이 없다');
  for (const g of out) if (!g.items.length) err(f, `체크리스트 묶음 "${g.label}" 에 항목이 없다`);
  const sum = out.reduce((a, g) => a + g.items.reduce((b, it) => b + it.points, 0), 0);
  if (out.length && sum !== points) err(f, `체크리스트 항목 점수의 합 ${sum}점이 문항 배점 ${points}점과 다르다`);
  return out;
}

/* ---------- 문항 ---------- */
const PART_TYPE = { A: ['tf'], B: ['mc'], C: ['blank'], D: ['calc', 'essay'] };
const SECTION = (name) => new RegExp(`<section data-q="${name}"[^>]*>([\\s\\S]*?)</section>`, 'g');
const questions = [];
const seen = new Map();
let selfGradedCount = 0;
let noChecks = 0;
for (const file of walk(join(SRC, 'questions'))) {
  const f = relative(ROOT, file).replace(/\\/g, '/');
  const { data, body } = parse(file);
  if (!data) { err(f, 'frontmatter 가 없다'); continue; }
  const set = basename(dirname(file));
  for (const k of ['part', 'type', 'no', 'points', 'topic']) if (data[k] === undefined || data[k] === null) err(f, `frontmatter ${k} 누락`);
  if (data.set && data.set !== set) err(f, `set 이 폴더와 다르다: ${data.set}`);
  if (branches.length && !branches.includes(data.topic)) err(f, `topic "${data.topic}" 은 1단 가지가 아니다(${branches.join(', ')})`);
  for (const c of data.concepts ?? []) if (!nodes.has(c)) err(f, `concepts "${c}" 가 없다`);
  const key = set === 'practice' ? `practice/${data.topic}/${data.type}/${data.no}` : `${set}/${data.part}${data.no}`;
  if (seen.has(key)) err(f, `번호 중복: ${key} (${seen.get(key)})`);
  seen.set(key, f);
  if (set !== 'practice') {
    if (!PART_TYPE[data.part]?.includes(data.type)) err(f, `Part ${data.part} 에 ${data.type} 유형`);
    if (basename(file, '.md') !== `${data.part}${data.no}`) warn(f, `파일 이름이 번호(${data.part}${data.no})와 다르다`);
  }

  const sec = {};
  const has = {};
  for (const name of ['stem', 'ko', 'answer', 'rubric', 'options', 'checks']) {
    const all = [...body.matchAll(SECTION(name))];
    if (all.length > 1) err(f, `구역 ${name} 이 두 번 나온다`);
    has[name] = all.length > 0;
    sec[name] = all[0]?.[1].trim() ?? '';
  }
  if (/<section/.test(body.replace(/<section data-q="[a-z]+"[^>]*>|<\/section>/g, ''))) err(f, '구역 안에 <section> 중첩');
  const written = ['blank', 'calc', 'essay'].includes(data.type);
  for (const name of ['stem', 'ko', 'answer']) if (!sec[name]) err(f, `구역 ${name} 이 없다`);
  if (written && !sec.rubric) err(f, '손으로 쓰는 문항에는 rubric 구역이 필요하다');
  if (!written && sec.rubric) warn(f, '참거짓과 객관식에는 rubric 이 필요 없다');
  checkCommon(f, body);

  const stemText = mathOf(sec.stem).text;
  if (HANGUL.test(stemText)) err(f, 'stem(문제)은 영어로 쓴다');
  if (data.type === 'tf') {
    if (!['T', 'F'].includes(data.answer)) err(f, 'tf 의 answer 는 T 또는 F');
    if (data.answer === 'T' && /^\s*\*\*거짓/.test(sec.answer)) err(f, 'answer 값(T)과 해설(거짓)이 어긋난다');
    if (data.answer === 'F' && /^\s*\*\*참/.test(sec.answer)) err(f, 'answer 값(F)과 해설(참)이 어긋난다');
    if (sec.answer && !/^\s*\*\*(참|거짓)\.\*\*/.test(sec.answer)) warn(f, 'answer 는 "**참.**" 또는 "**거짓.**" 으로 시작');
  }
  let choices = null;
  if (data.type === 'mc') {
    choices = [...sec.stem.matchAll(/^\s*[-*]\s*\(([a-e])\)/gm)].map((m) => m[1]);
    if (choices.join('') !== 'abcd') err(f, `보기는 (a)~(d) 네 개여야 한다(지금 ${choices.join('') || '없음'})`);
    if (!choices.includes(String(data.answer))) err(f, `mc 의 answer "${data.answer}" 가 보기에 없다`);
    if (sec.answer && !new RegExp(`^\\s*\\*\\*\\(${data.answer}\\)`).test(sec.answer)) warn(f, `answer 해설은 "**(${data.answer}).**" 로 시작`);
  }
  if (written && data.answer) err(f, '손으로 쓰는 문항에는 frontmatter answer 를 쓰지 않는다');
  let blanks = null;
  if (data.type === 'blank') {
    const nums = [...new Set([...sec.stem.matchAll(/\\blank\{(\d+)\}/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
    if (!nums.length) err(f, '빈칸(\\blank{n})이 없다');
    nums.forEach((n, i) => { if (n !== i + 1) err(f, `빈칸 번호가 1부터 이어지지 않는다: ${nums.join(',')}`); });
    for (const n of nums) {
      if (!new RegExp(`^\\s*-\\s*\\(${n}\\)`, 'm').test(sec.answer)) err(f, `answer 에 (${n}) 의 답이 없다`);
      if (!new RegExp(`\\(${n}\\)`).test(sec.rubric)) err(f, `rubric 에 (${n}) 의 배점이 없다`);
    }
    if (nums.length < 4 || nums.length > 9) warn(f, `빈칸 수 ${nums.length}개(권장 5~8)`);
    if (/\\blank/.test(sec.answer)) err(f, 'answer 에 빈칸이 남아 있다');
    blanks = parseOptions(f, sec.options, nums, data.points, `${set}/${basename(file, '.md')}`);
  } else if (sec.options) {
    err(f, '보기(options) 구역은 blank 유형에서만 쓴다');
  }
  if (!written && /\\blank/.test(sec.stem)) err(f, '빈칸은 blank 유형에서만 쓴다');
  let checks = null;
  const selfGraded = data.type === 'calc' || data.type === 'essay';
  if (has.checks && !selfGraded) err(f, '체크리스트(checks) 구역은 calc 와 essay 유형에서만 쓴다');
  else if (has.checks) checks = parseChecks(f, sec.checks, data.points);
  else if (selfGraded) { warn(f, '체크리스트(checks) 구역이 없다. 화면에서 스스로 채점할 수 없다'); noChecks += 1; }
  if (selfGraded) selfGradedCount += 1;

  questions.push({
    id: `${set}/${basename(file, '.md')}`,
    set, part: data.part, type: data.type, no: data.no, points: data.points,
    topic: data.topic, concepts: data.concepts ?? [], answer: data.answer ?? null, title: data.title ?? null,
    choices, blanks, checks, stem: sec.stem, ko: sec.ko, solution: sec.answer, rubric: sec.rubric,
  });
}

/* ---------- 시험 표지 ---------- */
const examsFile = join(SRC, 'exams.json');
const exams = existsSync(examsFile) ? JSON.parse(readFileSync(examsFile, 'utf8')) : [];
for (const e of exams) {
  const qs = questions.filter((q) => q.set === e.set);
  const total = qs.reduce((s, q) => s + q.points, 0);
  const by = (p) => qs.filter((q) => q.part === p);
  console.log(`[${subject}] ${e.set}: ${qs.length}문항, ${total}점  (A ${by('A').length} / B ${by('B').length} / C ${by('C').length} / D ${by('D').length})`);
  const tf = by('A').filter((q) => q.answer === 'T').length;
  console.log(`  참거짓: 참 ${tf}, 거짓 ${by('A').length - tf}   객관식 정답: ${['a', 'b', 'c', 'd'].map((x) => `${x} ${by('B').filter((q) => q.answer === x).length}`).join(', ')}`);
  const topics = {};
  qs.forEach((q) => { topics[q.topic] = (topics[q.topic] ?? 0) + q.points; });
  console.log('  주제별 배점: ' + Object.entries(topics).map(([k, v]) => `${k} ${v}`).join(', '));
  if (e.points && total !== e.points) warn(`exams.json ${e.set}`, `배점 합 ${total}점이 표지의 ${e.points}점과 다르다`);
}
console.log(`[${subject}] 개념 ${nodes.size}개(가지 ${branches.length}), 문항 ${questions.length}개(연습 ${questions.filter((q) => q.set === 'practice').length})`);
if (okPos.some(Boolean)) console.log(`[${subject}] 빈칸 ${okPos.reduce((a, b) => a + b, 0)}개의 보기에서 정답 자리: ${okPos.map((n, i) => `${i + 1}번째 ${n}`).join(', ')}`);
if (selfGradedCount) console.log(`[${subject}] 계산과 서술 ${selfGradedCount}문항 가운데 체크리스트가 있는 문항 ${selfGradedCount - noChecks}개`);

if (checkOnly) {
  const { ver, changed } = stamp(false);
  if (changed.length) err('캐시 버전', `${changed.join(', ')} 의 ?v= 가 지금 내용의 버전(${ver})과 다르다. node tools/build-prep.mjs --stamp 를 돌린다`);
}

warns.forEach((w) => console.log('  경고  ' + w));
errors.forEach((e) => console.log('  오류  ' + e));
console.log(`\n오류 ${errors.length}건, 경고 ${warns.length}건`);
if (errors.length && !force) process.exit(1);

if (!checkOnly) {
  const bundle = {
    subject,
    concepts: [...nodes].map(([slug, n]) => ({
      slug,
      title: n.data.title,
      en: n.data.en ?? null,
      parent: n.data.parent ?? null,
      order: n.data.order ?? 0,
      summary: n.data.summary,
      signal: n.data.signal ?? 'none',
      related: n.data.related ?? [],
      body: n.body,
    })),
    exams,
    questions,
  };
  writeFileSync(OUT, JSON.stringify(bundle), 'utf8');
  console.log(`쓴 파일: ${relative(ROOT, OUT).replace(/\\/g, '/')} (${(JSON.stringify(bundle).length / 1024).toFixed(0)} KB)`);
  reportStamp(true); // 묶음이 바뀌면 버전도 바뀐다. 모든 자리에 새 버전을 쓴다.
}
