// scoring.js — 채점 및 점수 환산 로직

const MC_POINTS = 3;
const SA_POINTS = 5;

function isEmpty(v) {
  return v === undefined || v === null || (typeof v === "string" && v.trim() === "");
}

export function grade(question, userAnswer) {
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
    } else {
      userAnswer = entry && entry.text !== undefined ? entry.text : undefined;
    }

    const points = q.type === "multiple_choice" ? MC_POINTS : SA_POINTS;
    maxPoints += points;

    const res = grade(q, userAnswer);

    let correctAnswer;
    if (q.type === "multiple_choice") {
      correctAnswer = q.answer;
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
