export type QuizChoice = { text: string; correct: boolean };
export type QuizQuestion = {
  prompt: string;
  multiple: boolean;
  choices: QuizChoice[];
};
export type QuizAnswers = number[][];

/** Une question est correcte si l'ensemble des choix cochés est exactement
 *  l'ensemble des choix corrects (et qu'il existe au moins un choix correct). */
export function isQuestionCorrect(q: QuizQuestion, picked: number[]): boolean {
  const correctIdx = q.choices
    .map((c, i) => (c.correct ? i : -1))
    .filter((i) => i >= 0);
  if (correctIdx.length === 0) return false;
  const a = [...picked].sort((x, y) => x - y);
  const b = [...correctIdx].sort((x, y) => x - y);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function scoreQuiz(
  questions: QuizQuestion[],
  answers: QuizAnswers,
): { correct: number; total: number; percent: number } {
  const total = questions.length;
  const correct = questions.reduce(
    (n, q, i) => n + (isQuestionCorrect(q, answers[i] ?? []) ? 1 : 0),
    0,
  );
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}
