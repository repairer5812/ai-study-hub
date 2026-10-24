#!/usr/bin/env python3
"""AI Study Hub 점검. 정적 검사와 화면 흐름 검사를 한 번에 돌린다.

  python3 tools/verify_site.py                      전부. 이 폴더를 127.0.0.1:8931 에서 띄워 검사한다
  python3 tools/verify_site.py --port 8940          다른 포트(8765 는 쓰지 않는다)
  python3 tools/verify_site.py --base URL           이미 떠 있는 서버를 검사한다(정적 검사는 이 폴더 기준)
  python3 tools/verify_site.py --only exam,practice 일부만. static smoke exam study practice map
  python3 tools/verify_site.py --shots DIR          화면 캡처를 DIR 에 남긴다(1280 폭과 390 폭)
  python3 tools/verify_site.py --trace a.json       흐름의 단계마다 화면(DOM), 입력값, 저장값(localStorage)을 기록한다
  python3 tools/verify_site.py --trace b.json --compare a.json
                                                    고치기 전 기록과 비교한다. 리팩토링이 동작을 바꾸지 않았는지 본다

화면 흐름(exam)은 모의시험의 표지, 시작, 즉시 보기와 최종 보기, 문항 판정 순서, 빈칸 5지선다, 일시정지와 재개,
새로 고침 뒤 이어 하기, 시험 종료와 자동 채점, 체크리스트 채점과 결과, 틀린 빈칸만 다시 풀기, 정답 확인 방식 바꾸기,
재시험(제한 시간 처음부터), 시간 초과, 인쇄, 휴대폰 폭을 확인한다. 저장 키는 exams.json 의 revision 에서 만든다.

필요한 것: 파이썬 playwright, /usr/bin/google-chrome(--chrome 으로 바꿀 수 있다), node(정적 검사).
Firebase 요청은 막는다(점검이 랭킹에 쓰지 않게). 외부 CDN(KaTeX, marked)은 그대로 받는다.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_PORT = 8931
SECTIONS = ["static", "smoke", "exam", "study", "practice", "map"]
# 저장값에서 실행마다 달라지는 값. 앞의 것은 0 이 아닐 때만, 뒤의 것은 언제나 가린다.
TIME_KEYS = {"startedAt", "endedAt", "pausedAt", "pausedMs"}
ALWAYS_KEYS = {"pauseY", "priorElapsedMs", "updatedAt"}
# 과목 코드 꼴. 실명과 연구실 이름은 tools/leak.local.txt(커밋하지 않는 파일)에서 읽는다.
COURSE_CODE = re.compile(r"\b(?:AAI|BDC|BRI|COSE|DSC|AIX|AIE|KECE|SWAI)\d{3}\b")
TEXT_EXT = {".md", ".js", ".mjs", ".json", ".html", ".css", ".py", ".txt", ".webmanifest", ".rules", ".yml", ".yaml", ".toml", ".svg"}
SEED_RANDOM = """(() => { let s = 20261024; Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647; })();"""


class Report:
    def __init__(self):
        self.failed = []
        self.passed = []
        self.notes = []

    def ok(self, name):
        self.passed.append(name)
        print(f"  통과  {name}", flush=True)

    def fail(self, name, err):
        self.failed.append((name, err))
        print(f"  실패  {name}: {err}", flush=True)

    def note(self, msg):
        self.notes.append(msg)
        print(f"  참고  {msg}", flush=True)


def check(cond, msg="조건이 맞지 않는다"):
    if not cond:
        raise AssertionError(msg)


# ---------------------------------------------------------------- 정적 검사

def tracked_files():
    out = subprocess.run(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard"],
                         cwd=ROOT, capture_output=True, check=True).stdout.decode("utf-8")
    return sorted({f for f in out.split("\0") if f})


def leak_scan():
    """공개 저장소에 올라가면 안 되는 문자열(실명, 연구실, 과목 코드)을 찾는다."""
    local = ROOT / "tools" / "leak.local.txt"
    terms = []
    if local.exists():
        terms = [s.strip() for s in local.read_text(encoding="utf-8").splitlines() if s.strip() and not s.strip().startswith("#")]
    hits = []
    for f in tracked_files():
        if f == "tools/leak.local.txt":
            continue
        if COURSE_CODE.search(f):
            hits.append(f"{f}: 파일 이름에 과목 코드")
        p = ROOT / f
        if p.suffix.lower() not in TEXT_EXT or not p.is_file():
            continue
        try:
            text = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        low = text.lower()
        for i, t in enumerate(terms):
            if t.lower() in low:
                hits.append(f"{f}: 검사 목록 {i + 1}번째 문자열")
        for n, line in enumerate(text.splitlines(), 1):
            if COURSE_CODE.search(line):
                hits.append(f"{f}:{n}: 과목 코드")
    return hits, bool(terms)


IMPORT_RE = re.compile(r"""(?:\bimport\s*(?:[\w*{}\s,$]+?\s*from\s*)?|\bexport\s*[\w*{}\s,$]+?\s*from\s*)["']([^"']+)["']""")
ATTR_RE = re.compile(r"""<(?:script|link)\b[^>]*?\b(?:src|href)="([^"]+\.(?:js|css)(?:\?[^"]*)?)\"""")
MODULE_BLOCK_RE = re.compile(r"""<script\b[^>]*type="module"[^>]*>([\s\S]*?)</script>""")


def local_refs():
    """로컬 js, css 참조를 (참조한 파일, 대상 경로, 쿼리) 로 모은다."""
    refs = []

    def add(owner, base, spec):
        if re.match(r"^[a-z]+:|^//", spec):
            return
        path, _, query = spec.partition("?")
        target = (base / path).resolve()
        try:
            rel = target.relative_to(ROOT).as_posix()
        except ValueError:
            return
        refs.append((owner, rel, query))

    for p in sorted(ROOT.glob("*.html")):
        html = p.read_text(encoding="utf-8")
        for spec in ATTR_RE.findall(html):
            add(p.name, p.parent, spec)
        for block in MODULE_BLOCK_RE.findall(html):
            for spec in IMPORT_RE.findall(block):
                add(p.name, p.parent, spec)
    for p in sorted((ROOT / "js").rglob("*.js")):
        for spec in IMPORT_RE.findall(p.read_text(encoding="utf-8")):
            add(p.relative_to(ROOT).as_posix(), p.parent, spec)
    return refs


def static_checks(rep):
    print("[정적 검사]", flush=True)
    # 1. 시험 준비 묶음의 형식(build-prep --check)
    for prep in sorted((ROOT / "notes").glob("*/_prep")):
        subj = prep.parent.name
        name = f"build-prep {subj} --check"
        r = subprocess.run(["node", "tools/build-prep.mjs", subj, "--check"], cwd=ROOT, capture_output=True, text=True)
        tail = (r.stdout.strip().splitlines() or [""])[-1]
        if r.returncode == 0:
            rep.ok(f"{name} ({tail})")
            if "실명 검사 목록이 없다" in r.stdout:
                rep.note("tools/leak.local.txt 가 없어 build-prep 이 일반 표현만 검사했다")
        else:
            rep.fail(name, r.stdout[-600:])
    # 2. 캐시 버전: 모든 로컬 참조가 지금 내용의 버전을 쓰는가
    src = (ROOT / "tools" / "build-prep.mjs").read_text(encoding="utf-8")
    if "--stamp" in src:
        r = subprocess.run(["node", "tools/build-prep.mjs", "--stamp", "--check"], cwd=ROOT, capture_output=True, text=True)
        if r.returncode == 0:
            rep.ok(f"캐시 버전 ({r.stdout.strip().splitlines()[-1] if r.stdout.strip() else ''})")
        else:
            rep.fail("캐시 버전", (r.stdout + r.stderr)[-800:])
    else:
        rep.note("build-prep.mjs 에 --stamp 가 없어 캐시 버전 검사를 건너뛰었다")
    # 3. 같은 모듈을 서로 다른 주소로 부르지 않는가(같은 화면에서 두 번 실행된다)
    by_target = {}
    for owner, target, query in local_refs():
        by_target.setdefault(target, {}).setdefault(query, []).append(owner)
    mixed = {t: q for t, q in by_target.items() if len(q) > 1}
    if mixed:
        rep.fail("모듈 주소 일치", "; ".join(f"{t}: " + ", ".join(f"?{k or '(없음)'} <- {sorted(set(v))[:3]}" for k, v in q.items()) for t, q in mixed.items()))
    else:
        rep.ok(f"모듈 주소 일치 (로컬 대상 {len(by_target)}개)")
    # 4. 공개 규칙: 실명, 연구실, 과목 코드
    hits, has_list = leak_scan()
    if not has_list:
        rep.note("tools/leak.local.txt 가 없다. 과목 코드 꼴만 검사했다")
    if hits:
        rep.fail("공개 규칙(실명, 과목 코드)", "; ".join(hits[:20]))
    else:
        rep.ok("공개 규칙(실명, 연구실, 과목 코드) 0건")


# ---------------------------------------------------------------- 브라우저

SNAP_JS = r"""(sel) => {
  const root = document.querySelector(sel) || document.body;
  const clone = root.cloneNode(true);
  clone.querySelectorAll('[data-ex-clock],[data-ex-used],[data-ex-announce],#timer,#duration-line').forEach((e) => { e.textContent = ''; });
  const controls = [...root.querySelectorAll('input,textarea,select')].map((i) => [
    i.name || i.getAttribute('data-ex-pick') || i.id || '', i.type, i.type === 'checkbox' || i.type === 'radio' ? i.checked : i.value, i.disabled]);
  const store = {};
  for (let k = 0; k < localStorage.length; k++) { const key = localStorage.key(k); store[key] = localStorage.getItem(key); }
  return { html: clone.innerHTML, controls, store, url: location.pathname + location.search };
}"""


def scrub(v, key=None):
    if isinstance(v, dict):
        return {k: scrub(x, k) for k, x in v.items()}
    if isinstance(v, list):
        return [scrub(x) for x in v]
    if key in ALWAYS_KEYS and (isinstance(v, (int, float)) or v == "<시각>"):
        return "<값>"
    if key in TIME_KEYS and isinstance(v, (int, float)) and v:
        return "<시각>"
    return v


class Site:
    def __init__(self, pw, base, chrome, shots, trace):
        self.base = base.rstrip("/") + "/"
        self.pw = pw
        self.chrome = chrome
        self.browser = None
        self.contexts = []
        self.relaunches = 0
        self.ensure_browser()
        self.shots = Path(shots) if shots else None
        if self.shots:
            self.shots.mkdir(parents=True, exist_ok=True)
        self.trace = trace
        self.errors = []

    def ensure_browser(self):
        """브라우저가 없거나 끊겼으면 새로 띄운다(흐름 하나의 사고가 뒤 흐름까지 번지지 않게)."""
        if self.browser is not None and self.browser.is_connected():
            return
        if self.browser is not None:
            self.relaunches += 1
        self.browser = self.pw.chromium.launch(executable_path=self.chrome, headless=True, args=["--no-sandbox"])
        self.contexts = []

    def close_contexts(self):
        for ctx in self.contexts:
            try:
                ctx.close()
            except Exception:  # noqa: BLE001 (이미 닫힌 컨텍스트)
                pass
        self.contexts = []

    def page(self, width=1280, height=900, mobile=False):
        ctx = self.browser.new_context(viewport={"width": width, "height": height}, is_mobile=mobile,
                                       reduced_motion="reduce", device_scale_factor=1)
        self.contexts.append(ctx)
        ctx.add_init_script(SEED_RANDOM)
        # Firebase(랭킹, 통계)는 막는다. 점검이 실제 랭킹에 쓰지 않게 한다.
        ctx.route(re.compile(r"https://([a-z0-9-]+\.)*(googleapis\.com|firebaseio\.com|firebaseapp\.com)/"),
                  lambda route: route.abort() if "fonts.googleapis.com" not in route.request.url else route.continue_())
        pg = ctx.new_page()
        base = self.base

        def on_console(msg):
            if msg.type != "error":
                return
            text = msg.text
            if re.search(r"firestore|firebase|googleapis|ERR_FAILED|net::ERR", text, re.I):
                return
            self.errors.append(f"console: {text[:300]} ({pg.url})")

        def on_response(res):
            if res.url.startswith(base) and res.status >= 400:
                self.errors.append(f"HTTP {res.status}: {res.url}")

        pg.on("pageerror", lambda e: self.errors.append(f"pageerror: {e} ({pg.url})"))
        pg.on("console", on_console)
        pg.on("response", on_response)
        return pg

    def go(self, pg, path, wait="networkidle"):
        pg.goto(self.base + path, wait_until=wait)
        return pg

    def shot(self, pg, name, full=False):
        if self.shots:
            pg.screenshot(path=str(self.shots / f"{name}.png"), full_page=full)

    def snap(self, pg, name, sel="#app"):
        if self.trace is None:
            return
        check(name not in self.trace, f"기록 이름 중복: {name}")
        d = pg.evaluate(SNAP_JS, sel)
        store = {}
        for k, v in d["store"].items():
            try:
                store[k] = scrub(json.loads(v))
            except (TypeError, ValueError):
                store[k] = v
        self.trace[name] = {"url": d["url"], "html": d["html"], "controls": d["controls"], "store": store}


def no_hscroll(pg):
    return pg.evaluate("document.documentElement.scrollWidth <= innerWidth")


def load_prep(subj):
    return json.loads((ROOT / "notes" / subj / "prep.json").read_text(encoding="utf-8"))


def label(q):
    return q["id"].split("/")[1]


def right_index(row):
    return next(i for i, o in enumerate(row["options"]) if o["ok"])


def wrong_index(row):
    return next(i for i, o in enumerate(row["options"]) if not o["ok"])


class Exam:
    """모의시험 한 회분의 자료와 화면 조작."""

    def __init__(self, site, subj="sl"):
        self.site = site
        self.subj = subj
        data = load_prep(subj)
        self.data = data
        self.exam = data["exams"][0]
        self.set = self.exam["set"]
        rev = self.exam.get("revision")
        self.key = f"ai-study:{subj}:paper:{self.set}" + (f":{rev}" if rev else "")
        self.qs = [q for q in data["questions"] if q["set"] == self.set]
        self.by = {label(q): q for q in self.qs}
        self.auto = [q for q in self.qs if q["type"] in ("tf", "mc")]
        self.blanks = [q for q in self.qs if q.get("blanks")]
        self.manual = [q for q in self.qs if q.get("checks")]
        self.written_reveal = [q for q in self.qs if q["type"] in ("calc", "essay")]
        self.minutes = self.exam["minutes"]
        self.total = sum(q["points"] for q in self.qs)
        self.auto_pts = sum(q["points"] for q in self.auto)
        self.path = f"paper.html?s={subj}&set={self.set}"

    def open(self, width=1280, height=900, mobile=False):
        return self.site.go(self.site.page(width, height, mobile), self.path)

    def state(self, pg):
        return pg.evaluate("k => JSON.parse(localStorage.getItem(k))", self.key)

    def raw(self, pg):
        return pg.evaluate("k => localStorage.getItem(k)", self.key)

    @staticmethod
    def clock(pg):
        return pg.locator("[data-ex-clock]").inner_text()

    @staticmethod
    def start(pg):
        pg.locator("[data-ex-start]").click()

    @staticmethod
    def end(pg):
        pg.locator("[data-ex-end]").click()
        pg.locator("[data-ex-end-yes]").click()

    @staticmethod
    def pick(pg, lab, value):
        pg.locator(f'[data-ex-pick="{lab}"][value="{value}"]').check()

    @staticmethod
    def hidden_answers(pg):
        check(all(not x.is_visible() for x in pg.locator(".ex-solution,.ex-rubric").all()), "답이나 채점 기준이 보인다")

    def answer_all_auto(self, pg):
        for q in self.auto:
            self.pick(pg, label(q), q["answer"])

    def fill_blank(self, pg, q, choose=right_index, skip=()):
        item = pg.locator("#q-" + label(q))
        for row in q["blanks"]:
            if row["n"] in skip:
                continue
            item.locator(f'[data-bk-num="{row["n"]}"]').click()
            item.locator(".bk-opt").nth(choose(row)).click()

    def restart(self, pg, selector="[data-ex-bar] [data-ex-restart]", apply=True, mode=None):
        pg.locator(selector).click()
        check(pg.locator("#ex-mode-dialog").is_visible(), "재시험 창이 열리지 않는다")
        check(pg.locator("[data-ex-mode-title]").inner_text() == "재시험 시작", "재시험 창의 제목")
        check(f"{self.minutes}분" in pg.locator("[data-ex-mode-apply]").inner_text(), "재시험 단추에 제한 시간이 없다")
        check(pg.locator("[name=feedback-dialog][value=immediate]").is_checked(), "재시험은 바로 보기가 기본이어야 한다")
        if not apply:
            pg.locator("[data-ex-mode-form] [value=cancel]").click()
            return
        if mode:
            pg.locator(f"[name=feedback-dialog][value={mode}]").check()
        pg.locator("[data-ex-mode-apply]").click()

    def set_mode(self, pg, mode):
        pg.locator("[data-ex-mode-status]").click()
        check(pg.locator("#ex-mode-dialog").is_visible(), "방식 창이 열리지 않는다")
        pg.locator(f"[name=feedback-dialog][value={mode}]").check()
        pg.locator("[data-ex-mode-apply]").click()

    def clock_seconds(self, pg):
        m, s = map(int, self.clock(pg).split(":"))
        return m * 60 + s

    @staticmethod
    def check_order(pg, lab, status):
        item = pg.locator("#q-" + lab)
        check(item.locator("[data-ex-feedback]").is_visible(), f"{lab} 판정이 보이지 않는다")
        check(status in item.locator("[data-q-verdict]").inner_text(), f"{lab} 판정 문구에 '{status}' 가 없다")
        # 세 상자의 위치를 한 번에 잰다(따로 재면 그 사이에 화면이 움직일 수 있다).
        ys = item.evaluate("""e => ['[data-q-verdict]', '.ex-answer-key', '.ex-solution']
          .map((s) => { const r = e.querySelector(s).getBoundingClientRect(); return r.height ? r.top : null; })""")
        check(all(y is not None for y in ys) and ys[0] < ys[1] < ys[2], f"{lab} 판정, 정답, 해설 순서가 아니다: {ys}")
        check(item.locator(".ex-solution").evaluate('e => getComputedStyle(e, "::before").content') == '"해설"', f"{lab} 해설 머리말")


# ---------------------------------------------------------------- 모의시험 흐름

def flow_cover_immediate(site, ex):
    pg = ex.open()
    check(pg.locator("[data-q-item]").count() == len(ex.qs), "문항 수")
    check(f"{ex.minutes}분" in pg.locator(".pp-facts").inner_text(), "표지의 시간")
    check("시험지 인쇄는 선택" in pg.locator(".ex-rules").inner_text(), "표지 안내")
    check(pg.locator("[name=feedback-mode][value=immediate]").is_checked(), "바로 보기가 기본이어야 한다")
    site.snap(pg, "exam/cover")
    site.shot(pg, "paper-cover-1280")
    # 연습 화면의 '보기 늦게 보기'가 시험의 보기를 가리지 않는다.
    pg.evaluate('localStorage.setItem("ai-study:sl:prep:recall", "true")')
    pg.reload(wait_until="networkidle")
    ex.start(pg)
    check(pg.locator(".ex").get_attribute("data-phase") == "running", "시작 뒤 단계")
    check(pg.locator("[data-ex-mode-status]").inner_text() == "정답 바로 보기 · 변경", "방식 단추 문구")
    ex.hidden_answers(pg)
    for q in ex.auto:
        n = 2 if q["type"] == "tf" else 4
        check(pg.locator(f'#q-{label(q)} [data-ex-pick]').count() == n, f"{label(q)} 보기 수")
        if q["type"] == "mc":
            check(pg.locator(f"#q-{label(q)} .ex-pick-body").first.inner_text().strip() not in "abcd", f"{label(q)} 보기 본문")
    for q in ex.blanks:
        check(pg.locator(f"#q-{label(q)} [data-bk-opts]").is_visible(), f"{label(q)} 첫 빈칸 보기가 펼쳐져야 한다")
        check(pg.locator(f"#q-{label(q)} [data-bk-opts] input").count() == 5, f"{label(q)} 보기 다섯 개")
    check(pg.locator("[data-card-verdict]").first.inner_text() == "", "채점 전 판정 칸")
    # 참거짓과 객관식: 틀린 답, 고친 답. 다른 문항의 해설은 열리지 않는다.
    tf = next(q for q in ex.auto if q["type"] == "tf")
    mc = next(q for q in ex.auto if q["type"] == "mc")
    for q in (tf, mc):
        lab = label(q)
        choices = ["T", "F"] if q["type"] == "tf" else ["a", "b", "c", "d"]
        wrong = next(v for v in choices if v != q["answer"])
        ex.pick(pg, lab, wrong)
        check(pg.locator("#q-" + lab).get_attribute("data-verdict") == "wrong", f"{lab} 틀림 판정")
        ex.check_order(pg, lab, "틀렸습니다")
        check(pg.locator(f"#q-{lab} [data-q-mine]").inner_text() == f"내 답: {wrong}", f"{lab} 내 답")
        if q["type"] == "tf":
            want = "T · 참" if q["answer"] == "T" else "F · 거짓"
            check(want in pg.locator(f"#q-{lab} .ex-answer-key").inner_text(), f"{lab} 정답 요약")
        else:
            check(f"({q['answer']})" in pg.locator(f"#q-{lab} .ex-answer-key").inner_text(), f"{lab} 정답 요약")
        ex.pick(pg, lab, q["answer"])
        check(pg.locator("#q-" + lab).get_attribute("data-verdict") == "right", f"{lab} 맞음 판정")
        ex.check_order(pg, lab, "맞았습니다")
    others = [q for q in ex.auto if q not in (tf, mc)]
    if others:
        check(not pg.locator(f"#q-{label(others[0])} .ex-solution").is_visible(), "고르지 않은 문항의 해설이 보인다")
    # 빈칸: 빈칸마다 바로 판정. 고르지 않은 빈칸과 전체 유도는 가린다. 고른 답은 고칠 수 있다.
    q = ex.blanks[0]
    item = pg.locator("#q-" + label(q))
    row = q["blanks"][0]
    item.locator(".bk-opt").nth(wrong_index(row)).click()
    check(item.locator(f'[data-bk-num="{row["n"]}"]').get_attribute("data-state") == "wrong", "빈칸 틀림")
    check(item.locator(".bk-opt[data-verdict=right]").count() == 1, "빈칸 정답 표시")
    check("틀렸습니다" in item.locator(".bk-verdict").inner_text(), "빈칸 판정 문구")
    check(item.locator(".bk-answer .katex").count() == 1, "빈칸 정답 식")
    check(item.locator(".bk-opt input:disabled").count() == 0, "바로 보기에서도 고칠 수 있어야 한다")
    check(not item.locator(".ex-solution").is_visible(), "빈칸 전체 해설이 일찍 보인다")
    check(not item.locator("[data-ex-feedback]").is_visible(), "빈칸 문항 판정이 일찍 보인다")
    item.locator(".bk-opt").nth(right_index(row)).click()
    check(item.locator(f'[data-bk-num="{row["n"]}"]').get_attribute("data-state") == "right", "빈칸 맞음")
    second = q["blanks"][1]
    item.locator(f'[data-bk-num="{second["n"]}"]').click()
    check(item.locator(".bk-opt[data-verdict]").count() == 0, "고르지 않은 빈칸의 정답이 보인다")
    check(item.locator(".bk-feedback").count() == 0, "고르지 않은 빈칸의 판정이 보인다")
    check(item.locator(f'[data-bk-num="{second["n"]}"]').get_attribute("data-state") == "empty", "빈칸 빈 상태")
    # 계산과 서술: 직접 연 문항만 모범 답안이 열린다.
    if len(ex.written_reveal) >= 2:
        d1, d2 = label(ex.written_reveal[0]), label(ex.written_reveal[1])
        pg.locator(f"[data-ex-reveal={d1}]").click()
        check(pg.locator(f"#q-{d1} .ex-solution").is_visible(), "연 모범 답안")
        check(not pg.locator(f"#q-{d2} .ex-solution").is_visible(), "열지 않은 모범 답안")
        if pg.locator(f"#q-{d1} [data-ck]").count():
            pg.locator(f"#q-{d1} [data-ck]").first.check()
    site.snap(pg, "exam/immediate-mid")
    site.shot(pg, "paper-running-1280")
    started = ex.state(pg)["startedAt"]
    pg.reload(wait_until="networkidle")
    check(pg.locator(f"#q-{label(tf)} .ex-solution").is_visible(), "새로 고친 뒤 고른 문항의 해설")
    check(item.locator(f'[data-bk-num="{row["n"]}"]').get_attribute("data-state") == "right", "새로 고친 뒤 빈칸")
    check(ex.state(pg)["startedAt"] == started, "새로 고치면 시작 시각이 바뀌면 안 된다")
    if len(ex.written_reveal) >= 2:
        pg.locator(f"[data-ex-reveal={d1}]").click()
        check(not pg.locator(f"#q-{d1} .ex-solution").is_visible(), "모범 답안 접기")
    site.snap(pg, "exam/immediate-reload")
    ex.fill_blank(pg, q)
    check(item.locator(".ex-solution").is_visible(), "빈칸을 모두 고르면 전체 유도가 열린다")
    ex.check_order(pg, label(q), "맞았습니다")
    item.locator("[data-bk-clear]").click()
    check(not item.locator(".ex-solution").is_visible(), "지운 뒤 유도가 닫힌다")
    # 모두 맞히고 종료: 자동 채점, 빈칸 점수, 체크리스트로 만점
    ex.answer_all_auto(pg)
    for b in ex.blanks:
        ex.fill_blank(pg, b)
    check(pg.locator(".katex-error").count() == 0, "수식 오류")
    site.snap(pg, "exam/all-answered")
    ex.end(pg)
    check(pg.locator("[data-ex-auto-score]").inner_text() == f"{ex.auto_pts} / {ex.auto_pts}점", "자동 채점 점수")
    check(pg.locator(".ex").get_attribute("data-graded") == "true", "채점 표시")
    check(pg.locator("[data-ex-pick]").first.is_disabled(), "종료 뒤 보기 잠금")
    for b in ex.blanks:
        check(float(pg.locator(f'[name="score-{label(b)}"]').input_value()) == b["points"], f"{label(b)} 빈칸 점수")
    for qq in ex.auto:
        check(pg.locator(f'[name="ans-{label(qq)}"][value="{qq["answer"]}"]').is_checked(), f"{label(qq)} 답안 카드")
    site.snap(pg, "exam/graded")
    site.shot(pg, "paper-grading-1280")
    for m in ex.manual:
        for cb in pg.locator(f"#q-{label(m)} [data-ck]").all():
            cb.check()
    pg.locator("[data-ex-scores] button[type=submit]").click()
    check(pg.locator(".ex").get_attribute("data-phase") == "result", "결과 단계")
    check(pg.locator("[data-ex-total]").inner_text() == str(ex.total), "만점 합계")
    site.snap(pg, "exam/result")
    site.shot(pg, "paper-result-1280")
    pg.reload(wait_until="networkidle")
    check(pg.locator("[data-ex-total]").inner_text() == str(ex.total), "새로 고친 뒤 합계")
    # 인쇄: 보기와 문항은 남고 답과 판정은 숨는다.
    pg.emulate_media(media="print")
    check(pg.locator("[data-ex-paper]").is_visible(), "인쇄 시험지")
    ex.hidden_answers(pg)
    check(all(not e.is_visible() for e in pg.locator("[data-ex-feedback]").all()), "인쇄에 판정이 보인다")
    mc_lab = label(mc)
    check(not pg.locator(f"#q-{mc_lab} [data-ex-pick]").first.is_visible(), "인쇄에 선택 단추가 보인다")
    check(pg.locator(f"#q-{mc_lab} .ex-pick-body").count() == 4, "인쇄의 객관식 보기")
    check(pg.locator(".ex-print-note").is_visible(), "인쇄 안내")
    pg.emulate_media(media="screen")
    # 재시험: 방식은 다시 고르고, 연 해설과 답은 모두 지운다.
    ex.restart(pg, "[data-ex-reset]")
    ex.hidden_answers(pg)
    check(pg.locator(".ex").get_attribute("data-feedback") == "immediate", "재시험 방식")
    check(pg.locator("[data-ex-pick]:checked").count() == 0, "재시험 뒤 고른 답")
    check(ex.state(pg)["revealed"] == {}, "재시험 뒤 연 모범 답안 기록")
    if ex.written_reveal:
        pg.locator(f"[data-ex-reveal={label(ex.written_reveal[0])}]").click()
        pg.emulate_media(media="print")
        ex.hidden_answers(pg)
        check(not pg.locator(f"[data-ex-reveal={label(ex.written_reveal[0])}]").is_visible(), "인쇄에 모범 답안 단추")
        pg.emulate_media(media="screen")
    site.snap(pg, "exam/retake")


def flow_final_and_legacy(site, ex):
    pg = ex.open()
    pg.locator("[name=feedback-mode][value=final]").check()
    pg.reload(wait_until="networkidle")
    check(pg.locator("[name=feedback-mode][value=final]").is_checked(), "표지에서 고른 방식이 남아야 한다")
    ex.start(pg)
    check(pg.locator("[data-ex-mode-status]").inner_text() == "최종 보기 · 변경", "최종 보기 단추 문구")
    ex.answer_all_auto(pg)
    for q in ex.blanks:
        ex.fill_blank(pg, q, choose=lambda row: 0)
        check(pg.locator(f"#q-{label(q)} .bk-opt[data-verdict]").count() == 0, "최종 보기에서 빈칸 판정이 보인다")
    ex.hidden_answers(pg)
    first = label(ex.auto[0])
    check(pg.locator("#q-" + first).get_attribute("data-verdict") == "", "최종 보기에서 판정이 보인다")
    if ex.written_reveal:
        check(not pg.locator(f"[data-ex-reveal={label(ex.written_reveal[0])}]").is_visible(), "최종 보기에서 모범 답안 단추")
    site.snap(pg, "final/running")
    pg.reload(wait_until="networkidle")
    ex.hidden_answers(pg)
    ex.end(pg)
    check(pg.locator(f"#q-{first} .ex-solution").is_visible(), "종료 뒤 해설")
    check(pg.locator(f"#q-{label(ex.blanks[0])} .ex-solution").is_visible(), "종료 뒤 빈칸 해설")
    check(pg.locator("[data-ex-auto-score]").inner_text() == f"{ex.auto_pts} / {ex.auto_pts}점", "최종 보기 자동 채점")
    want = sum(sum(b["points"] for b in q["blanks"] if b["options"][0]["ok"]) for q in ex.blanks)
    got = sum(float(pg.locator(f'[name="score-{label(q)}"]').input_value() or 0) for q in ex.blanks)
    check(got == want, f"첫째 보기만 고른 빈칸 점수 {got} != {want}")
    site.snap(pg, "final/graded")
    # 예전 기록(방식 값이 없는 진행 중 시험)은 최종 보기로 이어 간다.
    legacy = ex.open()
    legacy.evaluate("""([k, a, b]) => localStorage.setItem(k, JSON.stringify({phase: 'running', startedAt: Date.now(), answers: {[a]: 'T'}, blanks: {[b]: {1: 0}}, ko: false}))""",
                    [ex.key, first, label(ex.blanks[0])])
    legacy.reload(wait_until="networkidle")
    ex.hidden_answers(legacy)
    check(legacy.locator(".ex").get_attribute("data-feedback") == "final", "예전 기록의 방식")
    check(legacy.locator(f'[data-ex-pick="{first}"][value=T]').is_checked(), "예전 기록의 답")
    site.snap(legacy, "final/legacy-record")


def flow_order_retry(site, ex):
    pg = ex.open()
    ex.start(pg)
    check(all(not e.is_visible() for e in pg.locator("[data-ex-feedback]").all()), "시작 직후 판정이 보인다")
    tf = next(q for q in ex.auto if q["type"] == "tf")
    mc = next(q for q in ex.auto if q["type"] == "mc")
    unanswered = next(q for q in ex.auto if q not in (tf, mc))
    bq = ex.blanks[0]
    lab_b = label(bq)
    ex.pick(pg, label(tf), tf["answer"])
    ex.pick(pg, label(mc), next(v for v in "abcd" if v != mc["answer"]))
    # 빈칸 문항: 둘째 빈칸만 틀리게 고른다.
    second = bq["blanks"][1]["n"]
    for row in bq["blanks"]:
        pg.locator(f'#q-{lab_b} [data-bk-num="{row["n"]}"]').click()
        idx = wrong_index(row) if row["n"] == second else right_index(row)
        pg.locator(f"#q-{lab_b} .bk-opt").nth(idx).click()
    ex.check_order(pg, lab_b, "틀린 빈칸")
    check(pg.locator(f"#q-{lab_b} .ex-answer-key li").count() == len(bq["blanks"]), "빈칸 정답 목록")
    old = ex.state(pg)
    pg.reload(wait_until="networkidle")
    ex.check_order(pg, label(tf), "맞았습니다")
    ex.check_order(pg, lab_b, "틀린 빈칸")
    check(ex.state(pg)["startedAt"] == old["startedAt"], "새로 고친 뒤 시작 시각")
    # 일시정지 중에는 판정을 숨긴다. 최종 보기로 바꾸면 모든 판정을 숨긴다.
    pg.locator("[data-ex-pause]").click()
    check(not pg.locator(f"#q-{label(tf)} [data-ex-feedback]").is_visible(), "일시정지 중 판정")
    pg.locator("[data-ex-resume-exam]").click()
    ex.set_mode(pg, "final")
    check(all(not e.is_visible() for e in pg.locator("[data-ex-feedback]").all()), "최종 보기로 바꾼 뒤 판정")
    check(pg.locator(f"#q-{lab_b} .bk-feedback").count() == 0, "최종 보기로 바꾼 뒤 빈칸 판정")
    site.snap(pg, "order/final-running")
    ex.end(pg)
    ex.check_order(pg, label(tf), "맞았습니다")
    ex.check_order(pg, label(mc), "틀렸습니다")
    ex.check_order(pg, lab_b, "틀린 빈칸")
    ex.check_order(pg, label(unanswered), "미응답")
    lost = next(b["points"] for b in bq["blanks"] if b["n"] == second)
    want = bq["points"] - lost
    check(float(pg.locator(f"[name=score-{lab_b}]").input_value()) == want, "틀린 빈칸을 뺀 점수")
    site.snap(pg, "order/graded")
    # 틀린 빈칸만 다시 풀기: 그동안 정답과 해설을 가리고, 다시 채점해도 점수는 그대로다.
    pg.locator(f"#q-{lab_b} [data-bk-retry-start]").click()
    check(pg.get_attribute(f"#q-{lab_b}", "data-bk-retry") == "open", "다시 풀기 상태")
    check(not pg.locator(f"#q-{lab_b} [data-ex-feedback]").is_visible(), "다시 푸는 동안 판정")
    check(not pg.locator(f"#q-{lab_b} .ex-solution").is_visible(), "다시 푸는 동안 해설")
    pg.locator(f'#q-{lab_b} [data-bk-num="{second}"]').click()
    check(pg.locator(f"#q-{lab_b} .bk-feedback").count() == 0, "다시 푸는 빈칸의 정답")
    check(pg.locator(f"#q-{lab_b} .bk-opt input:disabled").count() == 0, "다시 푸는 빈칸은 고를 수 있다")
    row = next(b for b in bq["blanks"] if b["n"] == second)
    pg.locator(f"#q-{lab_b} .bk-opt").nth(right_index(row)).click()
    site.snap(pg, "order/retry-open")
    pg.locator(f"#q-{lab_b} [data-bk-retry-grade]").click()
    check(pg.locator(f"#q-{lab_b} [data-ex-feedback]").is_visible(), "다시 채점 뒤 판정")
    check(float(pg.locator(f"[name=score-{lab_b}]").input_value()) == want, "다시 푼 결과가 점수에 들어갔다")
    check(ex.state(pg)["retry"][lab_b]["graded"] is True, "다시 풀기 기록")
    site.snap(pg, "order/retry-graded")
    pg.locator(f"#q-{lab_b} [data-bk-retry-exit]").click()
    check(pg.get_attribute(f"#q-{lab_b}", "data-bk-retry") == "off", "처음 고른 답 보기")
    # 답안 카드에서 고치면 다시 채점할 때까지 판정을 숨긴다.
    wrong_tf = "F" if tf["answer"] == "T" else "T"
    pg.locator(f'[name="ans-{label(tf)}"][value="{wrong_tf}"]').check()
    check(not pg.locator(f"#q-{label(tf)} [data-ex-feedback]").is_visible(), "고친 뒤 옛 판정")
    pg.locator("[data-ex-card] button[type=submit]").click()
    ex.check_order(pg, label(tf), "틀렸습니다")
    # 이 흐름에서 답한 것은 참거짓(이제 틀림)과 객관식(틀림)뿐이다.
    check(pg.locator("[data-ex-auto-score]").inner_text() == f"0 / {ex.auto_pts}점", "다시 채점한 점수")
    pg.reload(wait_until="networkidle")
    check(pg.locator(f'[name="ans-{label(tf)}"][value="{wrong_tf}"]').is_checked(), "답안 카드 저장")
    pg.emulate_media(media="print")
    check(all(not e.is_visible() for e in pg.locator("[data-ex-feedback]").all()), "인쇄에 판정")
    pg.emulate_media(media="screen")
    # 결과: 약한 가지와 빈칸이 틀린 문항
    pg.locator("[data-ex-scores] button[type=submit]").click()
    check(pg.locator("[data-ex-miss]").is_visible() and lab_b in pg.locator("[data-ex-miss]").inner_text(), "빈칸이 틀린 문항 줄")
    check(pg.locator("[data-ex-weak] li").count() == len({q["topic"] for q in ex.qs}), "가지별 점수 줄")
    site.snap(pg, "order/result")


def flow_pause(site, ex):
    bq = label(ex.blanks[0])
    first = label(ex.auto[0])

    def paused(pg):
        check(pg.locator(".ex").get_attribute("data-paused") == "true", "일시정지 표시")
        check(pg.locator("[data-ex-paused]").is_visible(), "일시정지 안내")
        check(not pg.locator("[data-ex-paper]").is_visible(), "일시정지 중 시험지가 보인다")
        check(pg.locator("[data-ex-paper]").evaluate("e => e.inert"), "일시정지 중 시험지를 누를 수 있다")
        check(pg.locator("[data-ex-pause]").inner_text() == "이어서 풀기", "일시정지 단추 문구")
        check(pg.locator("[data-ex-ko]").is_disabled(), "일시정지 중 한국어 단추")

    for mode in ("immediate", "final"):
        pg = ex.open()
        pg.locator(f"[name=feedback-mode][value={mode}]").check()
        ex.start(pg)
        ex.pick(pg, first, "T")
        pg.locator(f"#q-{bq} .bk-opt").first.click()
        if mode == "immediate" and ex.written_reveal:
            pg.locator(f"[data-ex-reveal={label(ex.written_reveal[0])}]").click()
        pg.clock.install()
        pg.clock.run_for(12000)
        pg.locator("[data-ex-pause]").click()
        paused(pg)
        before = ex.state(pg)
        frozen = ex.clock(pg)
        site.snap(pg, f"pause/{mode}-paused")
        pg.clock.fast_forward(600000)
        check(ex.clock(pg) == frozen, "일시정지 중 시계가 간다")
        pg.reload(wait_until="networkidle")
        paused(pg)
        check(ex.clock(pg) == frozen, "새로 고친 뒤 시계")
        after = ex.state(pg)
        for field in ("answers", "blanks", "revealed", "startedAt", "pausedAt", "feedback"):
            check(before[field] == after[field], f"일시정지 중 {field} 가 바뀌었다")
        pg.clock.fast_forward(600000)
        check(ex.clock(pg) == frozen, "다시 기다린 뒤 시계")
        pg.locator("[data-ex-resume-exam]").click()
        check(pg.locator(".ex").get_attribute("data-paused") == "false", "이어서 풀기")
        check(pg.locator("[data-ex-paper]").is_visible() and not pg.locator("[data-ex-paper]").evaluate("e => e.inert"), "이어서 푼 시험지")
        check(not pg.locator("[data-ex-ko]").is_disabled(), "이어서 푼 뒤 한국어 단추")
        check(pg.locator(f'[data-ex-pick="{first}"][value=T]').is_checked(), "이어서 푼 뒤 고른 답")
        check(pg.locator(f"#q-{bq} [data-bk-opts] input:checked").count() == 1, "이어서 푼 뒤 빈칸")
        s = ex.state(pg)
        check(s["pausedMs"] >= 1200000 and s["pausedAt"] is None, f"쉰 시간 누적 {s['pausedMs']}")
        if mode == "immediate":
            check(pg.locator(f"#q-{first} .ex-solution").is_visible(), "바로 보기 해설 유지")
        else:
            check(not pg.locator(f"#q-{first} .ex-solution").is_visible(), "최종 보기 해설")
        pg.clock.run_for(4000)
        check(ex.clock(pg) != frozen, "이어서 푼 뒤 시계가 멈춰 있다")
        # 두 번째 일시정지 중에 종료해도 쉰 시간은 빼고 잰다.
        pg.locator("[data-ex-pause]").click()
        paused(pg)
        pg.clock.fast_forward(300000)
        ex.end(pg)
        s = ex.state(pg)
        check(s["pausedAt"] is None and s["pausedMs"] >= 1500000, "종료할 때 쉰 시간 정리")
        check(s["phase"] == "grading" and not pg.locator("[data-ex-paused]").is_visible(), "일시정지 중 종료")
        actual = (s["endedAt"] - s["startedAt"] - s["pausedMs"]) / 1000
        check(12 <= actual <= 30, f"푼 시간 {actual}초")
        used = pg.locator("[data-ex-used]").inner_text()
        check("분" not in used.split(". 제한")[0], f"걸린 시간 문구: {used}")
        # 재시험은 쉰 시간 없이 제한 시간 처음부터 시작한다.
        ex.restart(pg, "[data-ex-grade] [data-ex-restart]", mode=mode)
        s = ex.state(pg)
        check(s["pausedAt"] is None and s["pausedMs"] == 0 and s["feedback"] == mode, "재시험 상태")
        check(ex.clock(pg).startswith((f"{ex.minutes}:", f"{ex.minutes - 1}:")), "재시험 시계")
        check(pg.locator("[data-ex-paper]").is_visible(), "재시험 시험지")
        # 일시정지 중 재시험: 취소하면 그대로, 시작하면 새로.
        pg.locator("[data-ex-pause]").click()
        frozen_state = ex.state(pg)
        ex.restart(pg, apply=False)
        check(ex.state(pg) == frozen_state, "재시험 취소가 기록을 바꿨다")
        ex.restart(pg, mode=mode)
        check(ex.state(pg)["pausedAt"] is None and pg.locator("[data-ex-paper]").is_visible(), "일시정지 중 재시험")
        # 제한 시간을 넘긴 뒤에도 일시정지할 수 있다.
        pg.evaluate("k => { const s = JSON.parse(localStorage.getItem(k)); s.startedAt -= (%d * 60 + 100) * 1000; localStorage.setItem(k, JSON.stringify(s)); }" % ex.minutes, ex.key)
        pg.reload(wait_until="networkidle")
        check(ex.clock(pg).startswith("+"), "시간 초과 표시")
        check(pg.locator("[data-ex-bar]").get_attribute("data-over") == "true", "시간 초과 띠")
        pg.locator("[data-ex-pause]").click()
        frozen = ex.clock(pg)
        pg.clock.fast_forward(30000)
        check(ex.clock(pg) == frozen, "시간 초과 뒤 일시정지")
        pg.locator("[data-ex-pause]").click()
        pg.clock.run_for(2000)
        check(ex.clock(pg) != frozen, "시간 초과 뒤 이어서 풀기")
    for width in (390, 320):
        pg = ex.open(width, 844, mobile=True)
        ex.start(pg)
        pg.locator("[data-ex-pause]").click()
        paused(pg)
        check(no_hscroll(pg), f"{width}px 가로 넘침")
        site.shot(pg, f"paper-paused-{width}")
        pg.locator("[data-ex-resume-exam]").click()
        check(pg.locator("[data-ex-paper]").is_visible(), "휴대폰 이어서 풀기")


def flow_restart(site, ex):
    bq = label(ex.blanks[0])
    first = label(ex.auto[0])
    d1 = label(ex.manual[0]) if ex.manual else None
    pg = ex.open()
    ex.start(pg)
    ex.pick(pg, first, "T")
    pg.locator(f"#q-{bq} .bk-opt").first.click()
    # 앞선 풀이의 시간, 체크, 적다 만 점수, 다시 풀기 기록을 넣어 둔다.
    pg.evaluate("""([k, d, b]) => { const s = JSON.parse(localStorage.getItem(k)); s.startedAt -= 600000; s.ko = true;
      if (d) { s.checks = {[d]: {'0.0': true}}; s.draft = {[d]: '2'}; s.scores = {[d]: 2}; }
      s.retry = {[b]: {open: [1], picks: {1: 1}, graded: true}}; localStorage.setItem(k, JSON.stringify(s));
      localStorage.setItem('ai-study:sl:prep:concepts', JSON.stringify({done: ['polynomial-regression'], last: 'polynomial-regression'})); }""",
                [ex.key, d1, bq])
    pg.reload(wait_until="networkidle")
    before = ex.raw(pg)
    old_started = json.loads(before)["startedAt"]
    check(pg.locator(f'[data-ex-pick="{first}"][value=T]').is_checked(), "넣어 둔 답")
    check(pg.locator("[data-ex-restart]").first.is_visible(), "재시험 단추")
    ex.restart(pg, apply=False)
    check(ex.raw(pg) == before, "재시험 취소가 기록을 바꿨다")
    pg.locator("[data-ex-bar] [data-ex-restart]").click()
    pg.keyboard.press("Escape")
    check(not pg.locator("#ex-mode-dialog").is_visible() and ex.raw(pg) == before, "Esc 로 닫은 재시험")
    # 종료 확인을 연 채로 재시험해도 확인 줄은 닫힌다.
    pg.locator("[data-ex-end]").click()
    check(pg.locator("[data-ex-end-confirm]").is_visible(), "종료 확인")
    ex.restart(pg)

    def clean_running():
        check(pg.locator(".ex").get_attribute("data-phase") == "running", "재시험 단계")
        check(pg.locator("[data-ex-pick]:checked").count() == 0, "재시험 뒤 고른 답")
        check(pg.locator(".bk input:checked").count() == 0, "재시험 뒤 빈칸")
        check(not pg.locator(".ex-solution").first.is_visible(), "재시험 뒤 해설")
        check(pg.locator("[data-ex-end]").is_visible() and not pg.locator("[data-ex-end-confirm]").is_visible(), "재시험 뒤 종료 단추")
        s = ex.state(pg)
        for field in ("answers", "scores", "draft", "retry"):
            check(not s[field], f"재시험 뒤 {field}")
        check(all(not marks for marks in s["checks"].values()), "재시험 뒤 체크")
        check(s["endedAt"] is None and s["total"] is None and not s["graded"], "재시험 뒤 결과")
        check(not any(s["blanks"].values()), "재시험 뒤 빈칸 기록")
        check(s["ko"] is True, "재시험은 한국어 풀이 설정을 남긴다")
        secs = ex.clock_seconds(pg)
        check(ex.minutes * 60 - 10 <= secs <= ex.minutes * 60, f"재시험 시계 {secs}")
        check(pg.locator(f"#q-{bq} [data-bk-opts] input").count() == 5, "재시험 뒤 빈칸 보기")
        return s

    fresh = clean_running()
    check(fresh["startedAt"] > old_started, "재시험 시작 시각")
    site.snap(pg, "restart/fresh")
    pg.reload(wait_until="networkidle")
    check(clean_running()["startedAt"] == fresh["startedAt"], "재시험 뒤 새로 고침")
    check(pg.evaluate('localStorage.getItem("ai-study:sl:prep:concepts")'), "개념 진도는 남아야 한다")
    # 채점 단계에서 재시험
    ex.pick(pg, first, "T")
    ex.end(pg)
    check(pg.locator("[data-ex-grade] [data-ex-restart]").is_visible(), "채점 단계 재시험 단추")
    if d1:
        pg.locator(f"#q-{d1} [data-ck]").first.check()
    ex.restart(pg, "[data-ex-grade] [data-ex-restart]")
    clean_running()
    # 결과 단계에서 재시험
    ex.end(pg)
    pg.locator("[data-ex-scores] button[type=submit]").click()
    check(pg.locator(".ex").get_attribute("data-phase") == "result", "결과 단계")
    check(pg.locator("[data-ex-total]").inner_text() == "0", "빈 답의 합계")
    ex.restart(pg, "[data-ex-reset]", apply=False)
    check(pg.locator(".ex").get_attribute("data-phase") == "result", "결과 단계 재시험 취소")
    ex.restart(pg, "[data-ex-reset]")
    clean_running()
    check(pg.locator(".katex-error").count() == 0, "수식 오류")
    for width in (390, 320):
        pg.set_viewport_size({"width": width, "height": 844})
        check(no_hscroll(pg), f"{width}px 가로 넘침")
        check(pg.locator("[data-ex-bar] [data-ex-restart]").is_visible(), f"{width}px 재시험 단추")
        ex.restart(pg)
        clean_running()
        site.shot(pg, f"paper-restart-{width}")


def flow_layout_modes(site, ex):
    labels = [label(q) for q in ex.blanks[:3]]
    for width in (1440, 1280, 1100):
        pg = ex.open(width)
        ex.start(pg)
        for lab in labels:
            q = pg.locator("#q-" + lab)
            n = min(3, len(ex.by[lab]["blanks"]))
            q.locator(f'[data-bk-num="{n}"]').click()
            q.scroll_into_view_if_needed()
            dims = q.evaluate("""e => ({font: parseFloat(getComputedStyle(e.querySelector('.bk-opt-body .katex')).fontSize),
              panel: e.querySelector('.bk').getBoundingClientRect().toJSON(), stem: e.querySelector('.ex-stem').getBoundingClientRect().toJSON()})""")
            check(dims["panel"]["left"] >= dims["stem"]["right"] + 20, f"{width}px {lab} 보기가 문제 오른쪽에 있지 않다")
            check(dims["font"] <= 14, f"{width}px {lab} 보기 글자 {dims['font']}")
            check(q.locator(".bk-opt").count() == 5, "보기 다섯 개")
            q.locator(".bk-opt").nth(1).click()
            check(q.locator(".bk input:checked").count() == 1, "보기 고르기")
            check(no_hscroll(pg), f"{width}px 가로 넘침")
            if lab == labels[0]:
                el = q.locator(".ex-stem .pp-blank").first
                el.scroll_into_view_if_needed()
                y = pg.evaluate("scrollY")
                el.click()
                check(abs(pg.evaluate("scrollY") - y) < 8, "식의 빈칸을 누르면 화면이 튄다")
        site.snap(pg, f"layout/{width}")
    # 이어 하는 시험에서도 방식을 바꿀 수 있다. 답과 시간은 그대로다.
    pg = ex.open()
    ex.start(pg)
    first = label(ex.auto[0])
    ex.pick(pg, first, "T")
    pg.locator(f"#q-{labels[0]} .bk-opt").first.click()
    pg.reload(wait_until="networkidle")
    check(pg.locator("[data-ex-mode-status]").is_visible(), "방식 단추")
    before = ex.state(pg)
    pg.locator("[data-ex-mode-status]").click()
    check(pg.locator("#ex-mode-dialog").is_visible(), "방식 창")
    check(pg.locator("[data-ex-mode-title]").inner_text() == "정답 확인 모드", "방식 창 제목")
    check(pg.locator("[name=feedback-dialog][value=immediate]").is_checked(), "지금 방식이 골라져 있어야 한다")
    pg.locator("[name=feedback-dialog][value=final]").check()
    pg.locator("[data-ex-mode-apply]").click()
    after = ex.state(pg)
    check(after["feedback"] == "final", "바꾼 방식")
    for field in ("answers", "blanks", "startedAt", "pausedMs"):
        check(before[field] == after[field], f"방식을 바꾸면서 {field} 가 바뀌었다")
    check(not pg.locator(f"#q-{first} .ex-solution").is_visible(), "최종 보기로 바꾼 뒤 해설")
    pg.reload(wait_until="networkidle")
    check("최종 보기" in pg.locator("[data-ex-mode-status]").inner_text(), "새로 고친 뒤 방식")
    ex.set_mode(pg, "immediate")
    check(pg.locator(f"#q-{first} .ex-solution").is_visible(), "바로 보기로 돌린 뒤 해설")
    # 재시험은 언제나 방식을 먼저 고른다. 취소와 Esc 는 그대로 둔다.
    before = ex.state(pg)
    ex.restart(pg, apply=False)
    check(ex.state(pg) == before, "재시험 취소")
    pg.locator("[data-ex-bar] [data-ex-restart]").click()
    pg.keyboard.press("Escape")
    check(ex.state(pg) == before, "재시험 Esc")
    site.shot(pg, "paper-modes-1280")
    ex.restart(pg, mode="final")
    s = ex.state(pg)
    check(s["feedback"] == "final" and not s["answers"] and not any(s["blanks"].values()), "최종 보기 재시험")
    check(s["pausedAt"] is None and s["pausedMs"] == 0 and s["startedAt"] >= before["startedAt"], "재시험 시각")
    check(ex.clock(pg).startswith((f"{ex.minutes}:", f"{ex.minutes - 1}:")), "재시험 시계")
    pg.locator("[data-ex-pause]").click()
    check(not pg.locator("[data-ex-paper]").is_visible(), "일시정지")
    ex.restart(pg)
    check(pg.locator("[data-ex-paper]").is_visible() and ex.state(pg)["feedback"] == "immediate", "일시정지 중 재시험")
    ex.end(pg)
    pg.locator("[data-ex-grade] [data-ex-restart]").click()
    check(pg.locator("#ex-mode-dialog").is_visible(), "채점 단계 재시험 창")
    pg.locator("[data-ex-mode-form] [value=cancel]").click()
    pg.locator("[data-ex-scores] button[type=submit]").click()
    pg.reload(wait_until="networkidle")
    ex.restart(pg, "[data-ex-reset]")
    pg.emulate_media(media="print")
    check(not pg.locator(".bk").first.is_visible(), "인쇄에 빈칸 보기")
    check(pg.locator(f"#q-{labels[0]} .ex-stem").is_visible(), "인쇄에 빈칸 식")
    pg.emulate_media(media="screen")
    for width in (1024, 768, 390, 320):
        m = ex.open(width, 900, mobile=width <= 560)
        ex.start(m)
        q = m.locator(f"#q-{labels[0]}")
        q.locator('[data-bk-num="1"]').click()
        q.scroll_into_view_if_needed()
        check(no_hscroll(m), f"{width}px 가로 넘침")
        box = q.locator(".bk").bounding_box()
        if width <= 560:
            check(box["height"] <= 900 * 0.36 + 1, f"{width}px 보기 상자 높이 {box['height']}")
        q.locator(".bk-opt").first.click()
        check(q.locator(".bk input:checked").count() == 1, f"{width}px 보기 고르기")
        site.shot(m, f"paper-blank-{width}")
        m.locator("[data-ex-mode-status]").click()
        check(m.locator("#ex-mode-dialog").is_visible() and no_hscroll(m), f"{width}px 방식 창")
        m.locator("[data-ex-mode-form] [value=cancel]").click()


def exam_flows(site, rep):
    print("[모의시험]", flush=True)
    ex = Exam(site)
    for name, fn in [("표지, 바로 보기, 채점, 결과, 인쇄, 재시험", flow_cover_immediate),
                     ("최종 보기와 예전 기록", flow_final_and_legacy),
                     ("판정 순서, 틀린 빈칸 다시 풀기, 답안 카드", flow_order_retry),
                     ("일시정지와 재개, 시간 초과", flow_pause),
                     ("재시험(제한 시간 처음부터)", flow_restart),
                     ("빈칸 보기 배치와 방식 바꾸기", flow_layout_modes)]:
        run(rep, f"모의시험: {name}", fn, site, ex)


# ---------------------------------------------------------------- 공부 화면(Part D)

def study_flows(site, rep):
    print("[Part D 공부]", flush=True)
    run(rep, "Part D 모범 답안 공부", flow_study, site, Exam(site))


def flow_study(site, ex):
    dq = [q for q in ex.qs if q["part"] == "D"]
    if not dq:
        return
    study = ex.path + "&study=D"
    guides = sum(q["solution"].count('class="ex-answer-guide"') for q in dq)
    pg = site.go(site.page(), study)
    check(pg.locator(".ex").get_attribute("data-phase") == "study", "공부 단계")
    check(pg.locator("[data-ex-study]").is_visible() and not pg.locator("[data-ex-bar]").is_visible(), "공부 머리말")
    check(not pg.locator(".ex-paper-head").is_visible(), "공부 화면의 시험지 머리")
    check(pg.locator(".ex-part:not([hidden])").count() == 1 and pg.locator("#part-D").is_visible(), "Part D 만 보인다")
    check(pg.locator("#part-D .ex-solution").count() == len(dq), "모범 답안 수")
    check(all(e.is_visible() for e in pg.locator("#part-D .ex-solution").all()), "모범 답안이 보인다")
    check(pg.locator(".ex-answer-guide").count() == guides, "한 단계씩 이해하기 수")
    check(ex.raw(pg) is None, "공부 화면이 시험 기록을 만들었다")
    for g in pg.locator(".ex-answer-guide").all():
        check(not g.get_attribute("open"), "처음에는 접혀 있어야 한다")
        g.locator("summary").click()
        check(g.get_attribute("open") is not None, "펼치기")
    check(pg.locator(".katex-error").count() == 0, "수식 오류")
    check(all(not s.is_visible() for s in pg.locator("#part-A,#part-B,#part-C").all()), "다른 파트가 보인다")
    site.snap(pg, "study/open")
    pg.emulate_media(media="print")
    check(pg.locator(f"#q-{label(dq[0])} .ex-solution").is_visible() and not pg.locator("#part-A").is_visible(), "공부 화면 인쇄")
    pg.emulate_media(media="screen")
    # 진행 중인 시험을 두고 공부 화면을 열어도 답, 시계, 점수는 그대로다.
    site.go(pg, ex.path)
    check(pg.locator("[data-ex-start]").is_visible() and pg.locator('.ex-cover a[href*="study=D"]').is_visible(), "표지의 공부 링크")
    ex.start(pg)
    ex.pick(pg, label(ex.auto[0]), "T")
    pg.locator(f"#q-{label(ex.blanks[0])} .bk-opt").first.click()
    pg.locator("[data-ex-pause]").click()
    before = ex.raw(pg)
    site.go(pg, study)
    check(ex.raw(pg) == before, "공부 화면이 시험 기록을 바꿨다")
    pg.locator("[data-ex-study-ko]").click()
    check(not pg.locator(f"#q-{label(dq[0])} .ex-ko").is_visible(), "한국어 설명 끄기")
    pg.locator("[data-ex-study-ko]").click()
    check(pg.locator(f"#q-{label(dq[0])} .ex-ko").is_visible(), "한국어 설명 켜기")
    pg.locator(f'[data-ex-study] a[href="{ex.path}"]').click()
    pg.wait_for_selector("[data-ex-resume-exam]")
    check(pg.locator(".ex").get_attribute("data-paused") == "true" and ex.raw(pg) == before, "시험으로 돌아가기")
    pg.locator("[data-ex-resume-exam]").click()
    d1, d2 = label(dq[0]), label(dq[1]) if len(dq) > 1 else None
    check(not pg.locator(f"#q-{d1} .ex-solution").is_visible(), "시험 중 모범 답안")
    pg.locator(f"[data-ex-reveal={d1}]").click()
    check(pg.locator(f"#q-{d1} .ex-solution").is_visible(), "모범 답안 보기")
    if d2:
        check(not pg.locator(f"#q-{d2} .ex-solution").is_visible(), "다른 문항 모범 답안")
    if pg.locator(f"#q-{d1} .ex-answer-guide summary").count():
        pg.locator(f"#q-{d1} .ex-answer-guide summary").first.click()
    check(pg.locator(".katex-error").count() == 0, "수식 오류")
    ex.set_mode(pg, "final")
    check(not pg.locator(f"#q-{d1} .ex-solution").is_visible(), "최종 보기로 바꾼 뒤 모범 답안")
    ex.end(pg)
    for q in dq:
        lab = label(q)
        check(pg.locator(f"#q-{lab} .ex-solution").is_visible(), f"{lab} 종료 뒤 모범 답안")
        for cb in pg.locator(f"#q-{lab} [data-ck]").all():
            cb.check()
        if q.get("checks"):
            check(float(pg.locator(f"[name=score-{lab}]").input_value()) == q["points"], f"{lab} 체크리스트 합")
    pg.locator("[data-ex-scores] button[type=submit]").click()
    want = sum(q["points"] for q in dq if q.get("checks"))
    check(pg.locator("[data-part-row=D] [data-earned]").inner_text() == str(want), "Part D 득점")
    for width in (390, 320):
        m = site.go(site.page(width, 844, mobile=True), study)
        for g in m.locator(".ex-answer-guide").all():
            g.locator("summary").click()
        check(m.locator(".katex-error").count() == 0, "수식 오류")
        for q in dq:
            m.locator(f"#q-{label(q)} .ex-solution").scroll_into_view_if_needed()
            check(no_hscroll(m), f"{width}px {label(q)} 가로 넘침")
        site.shot(m, f"paper-study-{width}")


# ---------------------------------------------------------------- 주제별 문제

def practice_flows(site, rep):
    print("[주제별 문제]", flush=True)
    run(rep, "주제별 문제: 바로 판정, 틀린 문제만 다시 풀기, 자기 채점, 이어 하기", flow_practice, site)


def flow_practice(site):
    data = load_prep("sl")
    qs = [q for q in data["questions"] if q["set"] == "practice"]
    tfs = [q for q in qs if q["type"] == "tf"]
    mcs = [q for q in qs if q["type"] == "mc"]
    blanks = [q for q in qs if q["type"] == "blank"]
    manual = [q for q in qs if q["type"] in ("calc", "essay")]
    PKEY, BKEY, CKEY = "ai-study:sl:practice:progress", "ai-study:sl:practice:blanks", "ai-study:sl:practice:checks"
    path = "practice.html?s=sl"

    def item(pg, q):
        return pg.locator(f'[data-q-id="{q["id"]}"]')

    def choose(pg, q, value):
        item(pg, q).locator(f'[data-pr-pick][value="{value}"]').check()

    def status(pg, q):
        return item(pg, q).get_attribute("data-pr-status")

    def saved(pg, key=PKEY):
        return pg.evaluate("k => JSON.parse(localStorage.getItem(k))", key)

    pg = site.go(site.page(1440), path)
    check(pg.locator(".pr-q").count() == len(qs), "문항 수")
    check(pg.locator("[data-pr-wrong-count]").inner_text() == "0" and pg.locator("[data-pr-retry-all]").is_disabled(), "처음 오답 수")
    check(all(not x.is_visible() for x in pg.locator(".pr-reveal .ex-solution").all()), "처음부터 해설이 보인다")
    site.snap(pg, "practice/open")
    site.shot(pg, "practice-1280")
    tf, good, mc = tfs[0], tfs[1], mcs[0]
    choose(pg, tf, "T" if tf["answer"] == "F" else "F")
    check(status(pg, tf) == "wrong" and item(pg, tf).locator(".ex-solution").is_visible(), "참거짓 틀림")
    check("정답 " + tf["answer"] in item(pg, tf).locator("[data-pr-verdict]").inner_text(), "참거짓 정답 표시")
    choose(pg, good, good["answer"])
    check(status(pg, good) == "right" and "✓" in item(pg, good).locator("[data-pr-badge]").inner_text(), "참거짓 맞음")
    check(item(pg, good).locator("[data-pr-pick]:disabled").count() == 2, "맞힌 문항 잠금")
    choose(pg, mc, next(v for v in mc["choices"] if v != mc["answer"]))
    check(status(pg, mc) == "wrong" and item(pg, mc).locator(".ex-solution").is_visible(), "객관식 틀림")
    check(not item(pg, tfs[2]).locator(".ex-solution").is_visible(), "풀지 않은 문항 해설")
    q = blanks[0]
    it = item(pg, q)
    first, second = q["blanks"][0], q["blanks"][1]
    it.locator(f'[data-bk-num="{first["n"]}"]').click()
    it.locator(".bk-opt").nth(right_index(first)).click()
    check(it.locator(f'[data-bk-num="{first["n"]}"]').get_attribute("data-state") == "right", "빈칸 맞음")
    check(it.locator(".bk-opt input:disabled").count() == 5, "맞힌 빈칸 잠금")
    check(not it.locator(".ex-solution").is_visible(), "빈칸 해설이 일찍 보인다")
    it.locator(f'[data-bk-num="{second["n"]}"]').click()
    check(it.locator(".bk-opt[data-verdict]").count() == 0, "고르지 않은 빈칸 정답")
    it.locator(".bk-opt").nth(wrong_index(second)).click()
    check(status(pg, q) == "wrong" and it.locator(".bk-opt[data-verdict=right]").count() == 1, "빈칸 틀림")
    it.locator("[data-bk-clear]").click()
    check(status(pg, q) == "wrong", "틀린 빈칸만 지운 뒤 상태")
    check(str(second["n"]) not in saved(pg, BKEY)[q["id"]], "틀린 빈칸 기록이 남았다")
    check(saved(pg, BKEY)[q["id"]][str(first["n"])] == right_index(first), "맞힌 빈칸 기록이 지워졌다")
    site.snap(pg, "practice/mid")
    pg.reload(wait_until="networkidle")
    check(status(pg, q) == "wrong" and status(pg, good) == "right", "새로 고친 뒤 상태")
    man, other = manual[0], manual[1]
    item(pg, man).locator(".pr-reveal summary").click()
    check(status(pg, man) == "empty", "해설만 보면 맞음이 아니다")
    item(pg, man).locator("[data-pr-self=wrong]").click()
    check(status(pg, man) == "wrong", "스스로 틀림")
    item(pg, other).locator(".pr-reveal summary").click()
    for cb in item(pg, other).locator("[data-ck]").all():
        cb.check()
    check(status(pg, other) == "right", "체크리스트 만점")
    check(pg.locator("[data-pr-wrong-count]").inner_text() == "4", "오답 수")
    pg.locator("[data-pr-view=wrong]").click()
    check(pg.locator(".pr-q:not([hidden])").count() == 4 and not item(pg, good).is_visible(), "틀린 문제만 보기")
    pg.locator("[data-pr-type=tf]").click()
    check(pg.locator(".pr-q:not([hidden])").count() == 1, "유형 거르기")
    pg.locator("[data-pr-retry-all]").click()
    check(pg.locator(".pr-q:not([hidden])").count() == 4, "틀린 문제 모두 다시 풀기")
    check(not item(pg, tf).locator(".ex-solution").is_visible() and not item(pg, tf).locator("[data-pr-pick]:checked").count(), "다시 풀기 초기화")
    check(saved(pg, BKEY)[q["id"]][str(first["n"])] == right_index(first), "다시 풀기가 맞힌 빈칸을 지웠다")
    check(saved(pg)[good["id"]]["answer"] == good["answer"] and saved(pg, CKEY)[other["id"]], "다시 풀기가 맞힌 문항을 지웠다")
    site.snap(pg, "practice/retry-all")
    choose(pg, tf, tf["answer"])
    check(status(pg, tf) == "right" and item(pg, tf).is_visible() and item(pg, tf).locator(".ex-solution").is_visible(), "고친 뒤 해설")
    choose(pg, mc, mc["answer"])
    check(status(pg, mc) == "right", "객관식 고침")
    for row in q["blanks"]:
        if row["n"] == first["n"]:
            continue
        item(pg, q).locator(f'[data-bk-num="{row["n"]}"]').click()
        item(pg, q).locator(".bk-opt").nth(right_index(row)).click()
    check(status(pg, q) == "right" and item(pg, q).locator(".ex-solution").is_visible(), "빈칸 고침")
    item(pg, man).locator(".pr-reveal summary").click()
    item(pg, man).locator("[data-pr-self=right]").click()
    check(status(pg, man) == "right" and pg.locator("[data-pr-wrong-count]").inner_text() == "0", "모두 고침")
    pg.locator("[data-pr-view=wrong]").click()
    check(pg.locator("[data-pr-empty]").is_visible(), "틀린 문제 없음 안내")
    pg.locator("[data-pr-view=all]").click()
    check(pg.locator(".pr-q:not([hidden])").count() == len(qs), "전체 보기")
    pg.reload(wait_until="networkidle")
    for done in (tf, good, mc, q, man, other):
        check(status(pg, done) == "right", f"새로 고친 뒤 {done['id']}")
    q2 = mcs[1]
    choose(pg, q2, next(v for v in q2["choices"] if v != q2["answer"]))
    item(pg, q2).locator("[data-pr-retry]").click()
    check(not item(pg, q2).locator(".ex-solution").is_visible() and item(pg, q2).locator("[data-verdict=right]").count() == 0, "한 문항 다시 풀기")
    pg.reload(wait_until="networkidle")
    check(status(pg, q2) == "wrong" and item(pg, q2).locator("[data-pr-pick]:disabled").count() == 0, "다시 푸는 문항 저장")
    choose(pg, q2, q2["answer"])
    check(status(pg, q2) == "right", "다시 푼 문항 맞음")
    site.snap(pg, "practice/done")
    legacy = site.go(site.page(1440), path)
    legacy.evaluate("""a => { localStorage.setItem(a.bkey, JSON.stringify(a.picks)); localStorage.setItem(a.ckey, JSON.stringify(a.checks)); }""",
                    {"bkey": BKEY, "ckey": CKEY, "picks": {blanks[1]["id"]: {str(blanks[1]["blanks"][0]["n"]): right_index(blanks[1]["blanks"][0])}},
                     "checks": {manual[2]["id"]: {"0.0": True}}})
    legacy.reload(wait_until="networkidle")
    check(saved(legacy, BKEY)[blanks[1]["id"]] and status(legacy, manual[2]) == "wrong", "예전 기록 옮기기")
    site.snap(legacy, "practice/legacy")
    for width in (390, 320):
        m = site.go(site.page(width, 844, mobile=True), path)
        choose(m, tfs[0], tfs[0]["answer"])
        check(status(m, tfs[0]) == "right", "휴대폰 참거짓")
        choose(m, mcs[0], mcs[0]["answer"])
        check(status(m, mcs[0]) == "right", "휴대폰 객관식")
        bq = blanks[0]
        it = item(m, bq)
        it.locator(".bk-opt").nth(wrong_index(bq["blanks"][0])).click()
        check(status(m, bq) == "wrong" and no_hscroll(m), f"{width}px 빈칸")
        site.shot(m, f"practice-{width}")
        it.locator("[data-pr-retry]").click()
        check(it.locator(".bk-opt[data-verdict]").count() == 0, "휴대폰 다시 풀기")
        it.locator(".bk-opt").nth(right_index(bq["blanks"][0])).click()
        m.locator("[data-pr-recall]").click()
        it.locator('[data-bk-num="2"]').click()
        check(it.locator("[data-bk-show]").is_visible(), "보기 늦게 보기")
        it.locator("[data-bk-show]").click()
        check(it.locator(".bk-opt").count() == 5, "보기 보기")
        m.locator("[data-pr-view=wrong]").click()
        check(it.is_visible() and m.locator(".katex-error").count() == 0, "휴대폰 틀린 문제 보기")
    # 같은 빈칸 부품을 쓰는 모의시험은 연습 기록을 건드리지 않는다.
    before = pg.evaluate("k => localStorage.getItem(k)", PKEY)
    ex = Exam(site)
    site.go(pg, ex.path)
    ex.start(pg)
    pg.locator(f"#q-{label(ex.blanks[0])} .bk-opt").first.click()
    check(pg.locator(f"#q-{label(ex.blanks[0])} .bk-opt input:disabled").count() == 0, "시험 빈칸은 고칠 수 있다")
    check(pg.evaluate("k => localStorage.getItem(k)", PKEY) == before, "시험이 연습 기록을 바꿨다")


# ---------------------------------------------------------------- 개념 지도

def map_flows(site, rep):
    print("[개념 지도]", flush=True)
    run(rep, "개념 지도: 모든 개념, 진도, 링크, 휴대폰", flow_map, site)


def flow_map(site):
    data = load_prep("sl")
    concepts = data["concepts"]
    root_slug = next(c["slug"] for c in concepts if not c["parent"])
    pg = site.go(site.page(1440, 1000), "map.html?s=sl")
    check(pg.locator(".map-shell").count() == 1, "지도 틀")
    site.snap(pg, "map/root")
    site.shot(pg, "map-1280")
    hw = [c["slug"] for c in concepts if c["signal"] == "hw"]
    seed = [c["slug"] for c in concepts if c["parent"]][:2]
    pg.evaluate('s => localStorage.setItem("ai-study:sl:prep:concepts", JSON.stringify(s))', {"done": seed, "last": seed[-1]})
    pg.reload(wait_until="networkidle")
    check(pg.locator(".pp-facts [data-done-count]").inner_text() == f"2 / {len(concepts) - 1}", "확인한 개념 수")
    check(pg.locator("[data-resume]").is_visible(), "이어 보기")

    def go(p, slug):
        p.evaluate("""slug => { history.pushState({}, '', 'map.html?s=sl' + (slug ? '&n=' + slug : '')); dispatchEvent(new PopStateEvent('popstate')); }""", slug)

    for c in concepts:
        go(pg, "" if c["slug"] == root_slug else c["slug"])
        check(pg.locator(".katex-error").count() == 0, f"{c['slug']} 수식 오류")
        if c["slug"] != root_slug:
            check(pg.locator(".cs-head h1").inner_text() == c["title"], f"{c['slug']} 제목")
        if c["signal"] == "hw":
            check("과제" in pg.locator(".cs-signal").inner_text(), f"{c['slug']} 과제 표지")
    # 본문의 다른 개념 링크가 있는 개념에서 확인 표시, 새로 고침, 링크 이동, 뒤로 가기
    linked = next(c for c in concepts if c["parent"] and re.search(r"map\.html\?s=sl&n=[\w-]+", c["body"]))
    target = re.search(r"map\.html\?s=sl&n=([\w-]+)", linked["body"])[1]
    go(pg, linked["slug"])
    site.snap(pg, "map/node")
    toggle = pg.locator("[data-done-toggle]")
    was = toggle.get_attribute("aria-pressed")
    toggle.click()
    check(toggle.get_attribute("aria-pressed") != was, "확인 표시 바꾸기")
    toggle.click()
    check(toggle.get_attribute("aria-pressed") == was, "확인 표시 되돌리기")
    if was == "false":
        toggle.click()
    pg.reload(wait_until="networkidle")
    check(pg.locator("[data-done-toggle]").get_attribute("aria-pressed") == "true", "확인 표시 저장")
    pg.locator(f'.cs-body a[href*="n={target}"]').first.click()
    check(f"n={target}" in pg.url, "본문 링크 이동")
    pg.go_back()
    check(f"n={linked['slug']}" in pg.url, "뒤로 가기")
    site.shot(pg, "map-node-1280", full=False)
    m = site.go(site.page(390, 844, mobile=True), "map.html?s=sl")
    check(no_hscroll(m), "390px 가로 넘침")
    site.shot(m, "map-390")
    if m.locator('a[href="#course-route"]').count():
        m.locator('a[href="#course-route"]').click()
        m.wait_for_function('Math.abs(document.querySelector("#course-route").getBoundingClientRect().y) < 100')
    for slug in hw + [linked["slug"]] + [c["slug"] for c in concepts if c["signal"] in ("emph", "out", "skim")][:6]:
        go(m, slug)
        check(no_hscroll(m), f"390px {slug} 가로 넘침")
        check(m.locator(".katex-error").count() == 0, f"390px {slug} 수식 오류")
    site.shot(m, "map-node-390")


# ---------------------------------------------------------------- 다른 화면들

def smoke_flows(site, rep):
    print("[화면 열기]", flush=True)
    run(rep, "허브와 과목 화면", flow_smoke_hub, site)
    run(rep, "복습 노트(모든 노트 파일)", flow_smoke_review, site)
    run(rep, "정기고사, 주차별 확인문제, 결과, 작업형", flow_smoke_exam, site)


def subject_ids(pg):
    return pg.evaluate("async () => (await import('./js/subjects/index.js')).SUBJECT_LIST")


def flow_smoke_hub(site):
    pg = site.go(site.page(), "index.html")
    check(pg.locator("#hub-grid > *").count() >= 1, "허브 카드")
    site.snap(pg, "smoke/index", "main")
    ids = subject_ids(pg)
    for sid in ids:
        site.go(pg, f"subject.html?s={sid}")
        pg.wait_for_timeout(200)
        site.snap(pg, f"smoke/subject-{sid}", "body")
        site.shot(pg, f"subject-{sid}-1280")
    m = site.go(site.page(390, 844, mobile=True), "subject.html?s=sl")
    check(no_hscroll(m), "390px 과목 화면 가로 넘침")
    site.shot(m, "subject-sl-390")
    site.go(m, "index.html")
    check(no_hscroll(m), "390px 허브 가로 넘침")


def flow_smoke_review(site):
    pg = site.go(site.page(), "index.html")
    metas = pg.evaluate("async () => (await import('./js/subjects/index.js')).getAllSubjectMetas().map((m) => [m.id, m.noteIndex.map((n) => n.slug)])")
    total = 0
    for sid, slugs in metas:
        if not slugs:
            continue
        site.go(pg, f"review.html?s={sid}")
        for slug in slugs:
            pg.locator(f'#week-list a[data-slug="{slug}"]').click()
            pg.wait_for_function("() => !document.querySelector('#note-body .loading')")
            body = pg.locator("#note-body").inner_text()
            check("불러오지 못" not in body and body.strip(), f"{sid}/{slug} 노트")
            total += 1
        site.snap(pg, f"smoke/review-{sid}-last", "#note-body")
    check(total > 0, "노트가 없다")


def flow_smoke_exam(site):
    pg = site.page()
    for path in ("exam.html?s=ml&set=1", "exam.html?s=dl&set=1", "exam.html?s=ds&set=1", "exam.html?s=ml&kind=weekly&w=9", "work.html"):
        site.go(pg, path, wait="load")
        pg.wait_for_function("() => (document.querySelector('#q-text')?.textContent || '').trim().length > 0", timeout=15000)
        site.snap(pg, "smoke/" + re.sub(r"[^\w]+", "-", path), "#question-area")
    site.go(pg, "result.html?s=ml&view=ranking", wait="load")
    pg.wait_for_timeout(800)


def run(rep, name, fn, site, *args):
    t = time.time()
    site.ensure_browser()
    try:
        fn(site, *args)
        rep.ok(f"{name} ({time.time() - t:.0f}초)")
    except Exception as e:  # noqa: BLE001 (흐름 하나가 실패해도 나머지를 돌린다)
        rep.fail(name, f"{type(e).__name__}: {str(e)[:1500]}")
    finally:
        site.close_contexts()


# ---------------------------------------------------------------- 비교

def compare(before, after):
    diffs = []
    missing = sorted(set(before) - set(after))
    if missing:
        diffs.append(f"새 기록에 없는 단계: {missing}")
    for name in sorted(set(before) & set(after)):
        a, b = dict(before[name]), dict(after[name])
        a["store"], b["store"] = scrub(a["store"]), scrub(b["store"])  # 기록할 때와 같은 정규화를 다시 건다
        for part in ("url", "controls", "store"):
            if a[part] != b[part]:
                diffs.append(f"{name}: {part} 가 다르다\n    전: {json.dumps(a[part], ensure_ascii=False)[:400]}\n    후: {json.dumps(b[part], ensure_ascii=False)[:400]}")
        # 캐시 버전(?v=)은 내용이 바뀌면 바뀌는 것이 정상이라 비교에서 뺀다.
        x, y = (re.sub(r"\?v=[\w.-]+", "?v=", h) for h in (a["html"], b["html"]))
        if x != y:
            i = next((k for k in range(min(len(x), len(y))) if x[k] != y[k]), min(len(x), len(y)))
            diffs.append(f"{name}: 화면(DOM)이 {i}번째 글자부터 다르다\n    전: …{x[max(0, i - 80):i + 120]}\n    후: …{y[max(0, i - 80):i + 120]}")
    return diffs


# ---------------------------------------------------------------- 실행

def serve(port):
    proc = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1", "--directory", str(ROOT)],
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    url = f"http://127.0.0.1:{port}/"
    for _ in range(50):
        try:
            urllib.request.urlopen(url + "index.html", timeout=1)
            return proc, url
        except OSError:
            time.sleep(0.1)
    proc.terminate()
    raise SystemExit(f"{port} 포트에 서버를 띄우지 못했다(이미 쓰는 중인지 확인)")


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--port", type=int, default=DEFAULT_PORT)
    ap.add_argument("--base", help="이미 떠 있는 서버 주소(예: http://127.0.0.1:8931/)")
    ap.add_argument("--only", help="쉼표로 구분: " + ",".join(SECTIONS))
    ap.add_argument("--chrome", default="/usr/bin/google-chrome")
    ap.add_argument("--shots", help="화면 캡처를 남길 폴더")
    ap.add_argument("--trace", help="단계별 화면과 저장값을 기록할 JSON 파일")
    ap.add_argument("--compare", help="비교할 이전 기록 JSON 파일")
    args = ap.parse_args()
    if args.port == 8765:
        raise SystemExit("8765 포트는 쓰지 않는다(다른 미리보기 서버와 겹친다)")
    only = args.only.split(",") if args.only else SECTIONS
    bad = [s for s in only if s not in SECTIONS]
    if bad:
        raise SystemExit(f"모르는 구역: {bad}")
    rep = Report()
    if "static" in only:
        static_checks(rep)
    browser_sections = [s for s in only if s != "static"]
    trace = {} if args.trace else None
    if browser_sections:
        from playwright.sync_api import sync_playwright
        proc, base = (None, args.base) if args.base else serve(args.port)
        try:
            with sync_playwright() as pw:
                site = Site(pw, base, args.chrome, args.shots, trace)
                for s in browser_sections:
                    {"smoke": smoke_flows, "exam": exam_flows, "study": study_flows, "practice": practice_flows, "map": map_flows}[s](site, rep)
                if site.relaunches:
                    rep.note(f"브라우저가 중간에 끊겨 {site.relaunches}번 다시 띄웠다")
                if site.errors:
                    uniq = list(dict.fromkeys(site.errors))
                    rep.fail("브라우저 오류(콘솔, 페이지 오류, 404)", "; ".join(uniq[:15]))
                else:
                    rep.ok("브라우저 오류 0건(콘솔, 페이지 오류, 같은 출처 404)")
                site.browser.close()
        finally:
            if proc:
                proc.terminate()
    if trace is not None:
        Path(args.trace).write_text(json.dumps(trace, ensure_ascii=False), encoding="utf-8")
        print(f"기록: {args.trace} (단계 {len(trace)}개)")
    if args.compare and trace is not None:
        diffs = compare(json.loads(Path(args.compare).read_text(encoding="utf-8")), trace)
        if diffs:
            rep.fail(f"이전 기록과 비교({args.compare})", f"{len(diffs)}건\n  " + "\n  ".join(diffs[:12]))
        else:
            rep.ok(f"이전 기록과 비교: 단계 {len(trace)}개의 화면, 입력값, 저장값이 같다")
    print(f"\n통과 {len(rep.passed)}, 실패 {len(rep.failed)}, 참고 {len(rep.notes)}")
    sys.exit(1 if rep.failed else 0)


if __name__ == "__main__":
    main()
