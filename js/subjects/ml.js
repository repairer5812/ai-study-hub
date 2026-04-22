// subjects/ml.js — 기계학습 과목 메타 + 문제 로드 래퍼
import { getSetQuestions as mlGetSet, ALL_QUESTIONS as ML_ALL, SETS_META as ML_SETS } from "../questions.js";

export const META = {
  id: "ml",
  title: "기계학습",
  subtitle: "Week 2~7 · 150문제",
  emoji: "🤖",
  color: "#234E70",
  available: true,
  hasExam: true,
  examType: "mixed", // 객관식 + 주관식
  sets: ML_SETS,
  weekCount: 7,
  noteIndex: [
    { slug: "00_개요",           title: "00 개요",                  week: 0 },
    { slug: "1주차_오리엔테이션",   title: "1주차 — 오리엔테이션",       week: 1 },
    { slug: "2주차_기초_학습법_일반화", title: "2주차 — 기초·학습법·일반화", week: 2 },
    { slug: "3주차_선형회귀_로지스틱_GLM", title: "3주차 — 선형회귀·로지스틱·GLM", week: 3 },
    { slug: "4주차_정규화_나이브베이즈_LDA", title: "4주차 — 정규화·나이브베이즈·LDA", week: 4 },
    { slug: "5주차_KNN_Tree_Ensemble", title: "5주차 — KNN·Tree·Ensemble", week: 5 },
    { slug: "6주차_SVM_커널",       title: "6주차 — SVM·커널",        week: 6 },
    { slug: "7주차_평가지표_ROC",    title: "7주차 — 평가지표·ROC",     week: 7 },
  ],
};

export function getSetQuestions(setId) { return mlGetSet(setId); }
export function getAllQuestions()        { return ML_ALL; }
