// scoring.js — 채점 및 점수 환산 로직

const MC_POINTS = 3;
const SA_POINTS = 5;
const ESSAY_POINTS = 10;

function isEmpty(v) {
  return v === undefined || v === null || (typeof v === "string" && v.trim() === "");
}

// 서술형은 exam.js에서 Worker 응답을 answers[qid]에 {graded, correct, ...} 로 저장함.
// grade()에 직접 answer 객체가 올 때도 있고(서술형: saved 전체), 값만 올 때도 있음.
// 안전하게 두 케이스 모두 처리.
export function grade(question, userAnswer) {
  if (question.type === "essay") {
    // userAnswer가 {graded,correct,...} 객체이거나, text 문자열일 수 있음
    const obj = (userAnswer && typeof userAnswer === "object") ? userAnswer : null;
    if (!obj || !obj.graded) {
      return { correct: false, reason: "미채점" };
    }
    return { correct: Boolean(obj.correct), reason: null, confidence: obj.confidence };
  }

  if (question.type === "multiple_choice") {
    if (isEmpty(userAnswer)) {
      return { correct: false, reason: "미응답" };
    }
    return { correct: userAnswer === question.answer, reason: null };
  }

  if (question.type === "short_answer") {
    if (isEmpty(userAnswer)) {
      return { correct: false, reason: "미응답" };
    }
    const raw = String(userAnswer);

    if (question.answer_type === "number") {
      const num = parseFloat(raw);
      if (isNaN(num)) {
        return { correct: false, reason: null };
      }
      const target = parseFloat(question.answer);
      const tol = typeof question.tolerance === "number" ? question.tolerance : 0;
      return { correct: Math.abs(num - target) <= tol, reason: null };
    }

    if (question.answer_type === "exact") {
      return { correct: raw.trim() === String(question.answer).trim(), reason: null };
    }

    if (question.answer_type === "text") {
      const lower = raw.toLowerCase();
      const kws = Array.isArray(question.keywords) ? question.keywords : [];
      if (kws.length === 0) {
        return { correct: false, reason: null };
      }
      const ok = kws.every(k => lower.includes(String(k).toLowerCase()));
      return { correct: ok, reason: null };
    }
  }

  return { correct: false, reason: null };
}

export function scoreSet(questions, answersMap) {
  const perQuestion = [];
  const byWeek = {};

  let correctCount = 0;
  let gotPoints = 0;
  let maxPoints = 0;

  for (const q of questions) {
    const entry = answersMap ? answersMap[q.id] : undefined;
    let userAnswer;
    if (q.type === "multiple_choice") {
      userAnswer = entry && entry.choice !== undefined ? entry.choice : undefined;
    } else if (q.type === "essay") {
      // 서술형은 entry 전체를 grade()에 넘겨 graded/correct 판독
      userAnswer = entry;
    } else {
      userAnswer = entry && entry.text !== undefined ? entry.text : undefined;
    }

    const points =
      q.type === "multiple_choice" ? MC_POINTS :
      q.type === "essay" ? ESSAY_POINTS : SA_POINTS;
    maxPoints += points;

    const res = grade(q, userAnswer);

    let correctAnswer;
    if (q.type === "multiple_choice") {
      correctAnswer = q.answer;
    } else if (q.type === "essay") {
      correctAnswer = q.modelAnswer || q.keywords || null;
    } else if (q.answer_type === "text") {
      correctAnswer = q.keywords;
    } else {
      correctAnswer = q.answer;
    }

    const reason = res.correct
      ? null
      : (res.reason !== undefined ? res.reason : null);

    perQuestion.push({
      qid: q.id,
      correct: res.correct,
      userAnswer: userAnswer === undefined ? null : userAnswer,
      correctAnswer,
      reason
    });

    if (res.correct) {
      correctCount++;
      gotPoints += points;
    }

    const w = q.week;
    if (!byWeek[w]) byWeek[w] = { total: 0, correct: 0 };
    byWeek[w].total++;
    if (res.correct) byWeek[w].correct++;
  }

  const total = questions.length;
  const wrong = total - correctCount;
  const score100 = maxPoints > 0 ? Math.round((gotPoints / maxPoints) * 100) : 0;

  return {
    total,
    correct: correctCount,
    wrong,
    score100,
    maxScore100: 100,
    perQuestion,
    byWeek
  };
}

export function collectWrongIds(result) {
  if (!result || !Array.isArray(result.perQuestion)) return [];
  return result.perQuestion.filter(p => !p.correct).map(p => p.qid);
}
