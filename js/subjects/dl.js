// subjects/dl.js — 딥러닝 과목 (서술형 중심, 문제 추후 추가)
export const META = {
  id: "dl",
  title: "딥러닝",
  subtitle: "Week 1~7 · 서술형 중심",
  emoji: "💻",
  color: "#7B2D8E",
  available: true,
  hasExam: false,              // 문제 세트 준비 전이라 시험 진입 버튼은 잠김
  examType: "essay",
  sets: [],
  weekCount: 7,
  noteIndex: [
    { slug: "1주차_응용_오리엔테이션_및_수업_운영_방침",   title: "1주차 — 오리엔테이션·운영 방침",   week: 1 },
    { slug: "2주차_인공지능과_기계학습의_기초",             title: "2주차 — AI·ML 기초",            week: 2 },
    { slug: "3주차_인공신경망의_기초와_딥러닝의_발전",      title: "3주차 — 인공신경망·딥러닝 발전",   week: 3 },
    { slug: "4주차_실습환경_구축_및_PyTorch_기초",         title: "4주차 — PyTorch 기초",          week: 4 },
    { slug: "5주차_CNN_Convolutional_Neural_Networks",    title: "5주차 — CNN",                   week: 5 },
    { slug: "6주차_CIFAR-10_및_CNN_최적화_기법",           title: "6주차 — CIFAR-10·CNN 최적화",   week: 6 },
    { slug: "7주차_RNN_Recurrent_Neural_Networks",         title: "7주차 — RNN",                   week: 7 },
    { slug: "예상문제_모범답안",                            title: "📌 예상문제·모범답안",           week: 99 },
    { slug: "딥러닝_기출문제",                              title: "📝 기출문제 (2025)",            week: 98 },
  ],
};

export function getSetQuestions(_setId) { return []; }
export function getAllQuestions()        { return []; }
