// config.js — 화면이 부르는 바깥 주소를 한 곳에 둔다.
// 채점 워커: 이 저장소의 worker/ (Cloudflare Workers, 이름은 worker/wrangler.toml 의 name).
//   /grade-text  서술형(정기고사 essay 세트, js/exam.js)
//   /grade       작업형(work.html, js/work.js)
export const GRADER_BASE = "https://ai-study-grader.repairer5812.workers.dev";
