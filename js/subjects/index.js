// subjects/index.js — 과목 레지스트리 및 동적 로더
// 과목 목록은 여기 한 곳에 둔다. 적은 순서가 허브와 과목 목록의 순서다(이번 학기 과목을 앞에).
// 과목마다 다른 기능은 각 과목 META 의 플래그로 켠다.
//   leaderboard: true  정기고사와 주차별 확인문제 점수를 랭킹(Firestore)에 올린다.
//                      firestore.rules 의 과목 목록(ml|ds|dl|sec)과 같아야 한다. 규칙은 따로 배포한다.
//   work: true         작업형 예상문제(work.html) 묶음을 과목 화면에 보인다.
//   prep: { ... }      시험 준비 화면(개념 지도, 모의시험, 주제별 문제). prep.retiredSets 는 없앤 회차의 옛 링크를 넘길 곳.
import * as mlModule from "./ml.js?v=d1bffc1d6d";
import * as dlModule from "./dl.js?v=d1bffc1d6d";
import * as dsModule from "./ds.js?v=d1bffc1d6d";
import * as secModule from "./sec.js?v=d1bffc1d6d";
import * as slModule from "./sl.js?v=d1bffc1d6d";

const REGISTRY = {
  sl:  slModule,
  ml:  mlModule,
  dl:  dlModule,
  ds:  dsModule,
  sec: secModule,
};

export const SUBJECT_LIST = Object.keys(REGISTRY);

/** 랭킹에 점수를 올리는 과목(META.leaderboard). */
export const LEADERBOARD_SUBJECTS = SUBJECT_LIST.filter((id) => REGISTRY[id].META.leaderboard === true);

export function getSubjectMeta(id) {
  const mod = REGISTRY[id];
  if (!mod) throw new Error(`Unknown subject: ${id}`);
  return mod.META;
}

export function getSubjectModule(id) {
  const mod = REGISTRY[id];
  if (!mod) throw new Error(`Unknown subject: ${id}`);
  return mod;
}

export function getAllSubjectMetas() {
  return SUBJECT_LIST.map(id => REGISTRY[id].META);
}
