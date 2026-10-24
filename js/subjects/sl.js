// subjects/sl.js — 통계적학습개론 (2026-2학기)
//
// 다른 과목과 달리 정기고사 엔진(exam.html)을 쓰지 않는다. 실제 시험이 종이로 보는 필기시험이고
// 유도를 빈칸으로 채우는 형식이라, 시험 준비 화면 세 가지를 따로 둔다.
//   map.html       개념 지도 (한 줄기에서 가지 치는 나무)
//   paper.html     화면에서 선택하는 모의시험 (자동 채점, 계산과 서술은 자기 채점)
//   practice.html  주제별 문제
// 내용은 notes/sl/_prep/ 의 마크다운이 원본이고, `node tools/build-prep.mjs sl` 이 notes/sl/prep.json 으로 묶는다.
// prep.version 은 손으로 고치지 않는다. 묶을 때 tools/build-prep.mjs 가 내용 해시로 채운다(모든 화면의 ?v= 와 같은 값).

export const META = {
  id: "sl",
  title: "통계적학습개론",
  subtitle: "모의시험 1회 · 90분 · 과제와 출제 핵심 14문항",
  emoji: "📈",
  color: "#8b1538",
  available: true,
  hasExam: true,
  examType: null,
  sets: [],          // 정기고사 엔진용 세트 없음
  weekCount: 0,
  noteIndex: [],     // 주차별 복습 노트 대신 개념 지도를 쓴다
  prep: {
    version: "7de49de224",
    map: true,
    practice: true,
    // 없앤 회차의 옛 링크는 남은 회차로 넘긴다.
    retiredSets: { "midterm-2": "midterm-1", "midterm-3": "midterm-1" },
    exams: [
      { set: "midterm-1", title: "모의시험: 필수 핵심", minutes: 90, points: 100, desc: "시험에 포함되는 과제 1·2와 출제 예고·강조 내용을 모은 14문항입니다. 90분·100점입니다." },
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
