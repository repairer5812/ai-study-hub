// subjects/sl.js — 통계적학습개론 (2026-2학기)
//
// 다른 과목과 달리 정기고사 엔진(exam.html)을 쓰지 않는다. 실제 시험이 종이로 보는 필기시험이고
// 유도를 빈칸으로 채우는 형식이라, 시험 준비 화면 세 가지를 따로 둔다.
//   map.html       개념 지도 (한 줄기에서 가지 치는 나무)
//   paper.html     종이로 푸는 모의시험 (끝난 뒤 화면에서 채점, 손으로 쓴 답은 채점 프롬프트를 복사해 LLM 으로)
//   practice.html  주제별 문제
// 내용은 notes/sl/_prep/ 의 마크다운이 원본이고, `node tools/build-prep.mjs sl` 이 notes/sl/prep.json 으로 묶는다.
// 내용을 고쳐 다시 묶었으면 prep.version 을 올려야 방문자의 브라우저가 새 파일을 받는다.

export const META = {
  id: "sl",
  title: "통계적학습개론",
  subtitle: "개념 지도, 종이로 푸는 중간고사 모의시험, 주제별 문제",
  emoji: "📈",
  color: "#8b1538",
  available: true,
  hasExam: true,
  examType: null,
  sets: [],          // 정기고사 엔진용 세트 없음
  weekCount: 0,
  noteIndex: [],     // 주차별 복습 노트 대신 개념 지도를 쓴다
  prep: {
    version: "20261014c",
    map: true,
    practice: true,
    exams: [
      { set: "midterm-1", title: "중간고사 모의시험 1회", minutes: 75, points: 100 },
    ],
    // 다른 곳에 있는 복습 자료. 시험 준비 목록 끝에 붙는다.
    links: [
      {
        name: "Preliminaries 복습노트",
        desc: "Topic 1의 확률, 선형대수, projection, 미분을 복습 순서대로 다시 묶은 노트입니다. 손으로 푸는 문제가 있습니다.",
        meta: "노트",
        url: "https://repairer5812.github.io/공부/stat-learning/preliminaries/",
      },
    ],
  },
};

export function getSetQuestions(_setId) { return []; }
export function getAllQuestions()        { return []; }
