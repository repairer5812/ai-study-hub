// subjects/ml.js — 기계학습 과목 메타 + 문제 로드 래퍼
import { getSetQuestions as mlGetSet, ALL_QUESTIONS as ML_ALL, SETS_META as ML_SETS } from "../questions.js";
import { FINAL_SETS, FINAL_META } from "./ml-final.js";

// 중간고사 = 기존 5세트(Week 2~7). 기말고사 = 9~13주차 각 1세트 + 전범위 종합 1세트(ml-final.js).
const ML_MID = ML_SETS.map(s => ({ ...s, exam: "midterm" }));
const ML_FINAL = FINAL_META;

export const META = {
  id: "ml",
  title: "기계학습",
  subtitle: "중간 5세트(150문제) · 주차별 9~13 · 기말 6세트(130문제)",
  emoji: "🤖",
  color: "#234E70",
  available: true,
  hasExam: true,
  examType: "mixed", // 객관식 + 주관식
  sets: [...ML_MID, ...ML_FINAL],
  weekCount: 13,
  noteIndex: [
    { slug: "00_개요",           title: "00 개요",                  week: 0 },
    { slug: "1주차_오리엔테이션",   title: "1주차 — 오리엔테이션",       week: 1 },
    { slug: "2주차_기초_학습법_일반화", title: "2주차 — 기초·학습법·일반화", week: 2 },
    { slug: "3주차_선형회귀_로지스틱_GLM", title: "3주차 — 선형회귀·로지스틱·GLM", week: 3 },
    { slug: "4주차_정규화_나이브베이즈_LDA", title: "4주차 — 정규화·나이브베이즈·LDA", week: 4 },
    { slug: "5주차_KNN_Tree_Ensemble", title: "5주차 — KNN·Tree·Ensemble", week: 5 },
    { slug: "6주차_SVM_커널",       title: "6주차 — SVM·커널",        week: 6 },
    { slug: "7주차_평가지표_ROC",    title: "7주차 — 평가지표·ROC",     week: 7 },
    { slug: "9주차_밀도추정_KDE_KNN_GMM", title: "9주차 — 밀도추정·KDE·KNN·GMM", week: 9 },
    { slug: "10주차_클러스터링_KMeans_GMM_EM_Hierarchical", title: "10주차 — 클러스터링·K-Means·GMM·EM·계층", week: 10 },
    { slug: "11주차_차원축소_PCA_ICA", title: "11주차 — 차원축소·PCA·ICA", week: 11 },
    { slug: "12주차_매니폴드_MDS_tSNE_UMAP", title: "12주차 — 매니폴드·MDS·t-SNE·UMAP", week: 12 },
    { slug: "13주차_신경망_퍼셉트론_Adaline_NN", title: "13주차 — 신경망·Perceptron·Adaline·NN", week: 13 },
  ],
  weeklyExams: [
    { week: 9, slug: "9주차_밀도추정_시험", title: "9주차 시험 — 밀도 추정 (객관식 20)", count: 20 },
    { week: 10, slug: "10주차_클러스터링_시험", title: "10주차 시험 — 클러스터링 (객관식 20)", count: 20 },
    { week: 11, slug: "11주차_차원축소_시험", title: "11주차 시험 — 차원 축소 (객관식 20)", count: 20 },
    { week: 12, slug: "12주차_매니폴드_시험", title: "12주차 시험 — 매니폴드 학습 (객관식 20)", count: 20 },
    { week: 13, slug: "13주차_신경망_시험", title: "13주차 시험 — 신경망 (객관식 20)", count: 20 },
  ],
};

// 정기고사: 기말 세트(106·109~113)는 FINAL_SETS에서, 중간 세트(1~5)는 questions.js에서 로드
export function getSetQuestions(setId) { return FINAL_SETS[setId] || mlGetSet(setId); }
export function getAllQuestions()        { return ML_ALL; }
