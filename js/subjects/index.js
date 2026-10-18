// subjects/index.js — 과목 레지스트리 및 동적 로더
import * as mlModule from "./ml.js";
import * as dlModule from "./dl.js";
import * as dsModule from "./ds.js";
import * as secModule from "./sec.js";
import * as slModule from "./sl.js?v=20261018j";

const REGISTRY = {
  ml:  mlModule,
  dl:  dlModule,
  ds:  dsModule,
  sec: secModule,
  sl:  slModule,
};

// 이번 학기 과목을 앞에 둔다.
export const SUBJECT_LIST = ["sl", "ml", "dl", "ds", "sec"];

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
