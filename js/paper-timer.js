// paper-timer.js — 모의시험의 시계: 남은 시간, 일시정지와 재개, 남은 시간 알림.
// 일시정지한 시간은 푼 시간에 넣지 않는다(state.pausedMs 에 쌓는다).

export const mmss = (sec) => {
  const s = Math.max(0, Math.floor(sec));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};
export const span = (sec) => {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  return m ? `${m}분 ${s % 60}초` : `${s}초`;
};

/** 누적 휴식 시간과 지금 쉬는 시간을 뺀 푼 시간(ms). 남은 시간과 결과의 소요 시간을 같이 계산한다. */
export const elapsedMs = (state) => Math.max(0, (state.pausedAt ?? state.endedAt ?? Date.now()) - state.startedAt - state.pausedMs);

/** 쉬던 중이면 그 시간을 누적하고 쉼을 끝낸다. */
export function settlePause(state, now) {
  if (state.pausedAt === null) return;
  state.pausedMs += Math.max(0, now - state.pausedAt);
  state.pausedAt = null;
}

/**
 * 시계를 붙인다. getState 는 지금의 상태 객체를 돌려준다(새로 시작하면 객체가 바뀐다).
 * els: { clock, clockLabel, bar, announce, pauseBtn, resumeBtn }. paintPaused 는 일시정지 표시를 다시 그린다.
 */
export function createTimer({ getState, save, limit, els, paintPaused }) {
  const { clock, clockLabel, bar, announce, pauseBtn, resumeBtn } = els;
  let timer = null;
  let said = {};
  const tick = () => {
    const state = getState();
    if (state.phase !== "running" || !state.startedAt) return;
    const left = limit - elapsedMs(state) / 1000;
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
  const stop = () => clearInterval(timer);
  const run = () => {
    clearInterval(timer);
    said = {};
    tick();
    if (getState().pausedAt === null) timer = setInterval(tick, 1000);
  };
  const togglePause = () => {
    const state = getState();
    if (state.phase !== "running") return;
    if (state.pausedAt === null) {
      state.pauseY = window.scrollY;
      state.pausedAt = Date.now();
      clearInterval(timer);
      save();
      paintPaused();
      tick();
      announce.textContent = "시험을 일시정지했습니다.";
      resumeBtn.focus({ preventScroll: true });
    } else {
      settlePause(state, Date.now());
      save();
      paintPaused();
      run();
      announce.textContent = "시험을 이어서 풉니다.";
      requestAnimationFrame(() => {
        window.scrollTo({ top: state.pauseY, behavior: "instant" });
        pauseBtn.focus({ preventScroll: true });
      });
    }
  };
  return { tick, run, stop, togglePause };
}
