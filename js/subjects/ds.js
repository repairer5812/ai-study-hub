// subjects/ds.js — 자료구조 과목 (모의고사 3세트 제작 예정)
export const META = {
  id: "ds",
  title: "자료구조",
  subtitle: "1~7차시 · 3세트 준비 중",
  emoji: "📊",
  color: "#1E7E5F",
  available: true,
  hasExam: false,              // 3세트 제작 후 true로 전환
  examType: "multiple_choice", // 100% 객관식 (교수님 공지)
  sets: [],
  weekCount: 7,
  noteIndex: [
    { slug: "00_INDEX_전체_개요", title: "📚 00 INDEX — 전체 개요·족집게", week: 0 },
    { slug: "1차시_과목_오리엔테이션_및_자료구조_전체_숲보기", title: "1차시 — 오리엔테이션·숲보기", week: 1 },
    { slug: "2차시_알고리즘_기초와_성능_분석", title: "2차시 — 알고리즘·성능 분석", week: 2 },
    { slug: "3차시_순환_vs_반복과_알고리즘_설계_기법", title: "3차시 — 순환 vs 반복", week: 3 },
    { slug: "4차시_리스트_ADT와_정적_구현", title: "4차시 — 리스트·정적 구현", week: 4 },
    { slug: "5차시_연결_리스트_단순_원형_이중", title: "🌟 5차시 — 연결 리스트", week: 5 },
    { slug: "6차시_스택과_수식의_계산", title: "🌟 6차시 — 스택·수식 계산", week: 6 },
    { slug: "7차시_큐_데크_우선순위_큐", title: "🌟 7차시 — 큐·데크·우선순위 큐", week: 7 },
  ],
};

export function getSetQuestions(_setId) { return []; }
export function getAllQuestions()        { return []; }
