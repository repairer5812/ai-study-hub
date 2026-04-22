// subjects/index.js — 과목 레지스트리 및 동적 로더
import * as mlModule from "./ml.js";
import * as dlModule from "./dl.js";
import * as dsModule from "./ds.js";
import * as secModule from "./sec.js";

const REGISTRY = {
  ml:  mlModule,
  dl:  dlModule,
  ds:  dsModule,
  sec: secModule,
};

export const SUBJECT_LIST = ["ml", "dl", "ds", "sec"];

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
