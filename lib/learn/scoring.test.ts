import { describe, it, expect } from "vitest";
import { scoreQuiz, isQuestionCorrect, type QuizQuestion } from "./scoring";

const single: QuizQuestion = {
  prompt: "?",
  multiple: false,
  choices: [
    { text: "a", correct: true },
    { text: "b", correct: false },
  ],
};
const multi: QuizQuestion = {
  prompt: "?",
  multiple: true,
  choices: [
    { text: "a", correct: true },
    { text: "b", correct: true },
    { text: "c", correct: false },
  ],
};

describe("isQuestionCorrect", () => {
  it("choix unique : bonne réponse", () => expect(isQuestionCorrect(single, [0])).toBe(true));
  it("choix unique : mauvaise", () => expect(isQuestionCorrect(single, [1])).toBe(false));
  it("multi : exactement les bonnes", () => expect(isQuestionCorrect(multi, [0, 1])).toBe(true));
  it("multi : partiel = faux", () => expect(isQuestionCorrect(multi, [0])).toBe(false));
  it("multi : avec un mauvais = faux", () => expect(isQuestionCorrect(multi, [0, 1, 2])).toBe(false));
  it("aucune sélection = faux", () => expect(isQuestionCorrect(single, [])).toBe(false));
});

describe("scoreQuiz", () => {
  it("compte les questions correctes et le pourcentage", () => {
    const r = scoreQuiz([single, multi], [[0], [0]]);
    expect(r.correct).toBe(1);
    expect(r.total).toBe(2);
    expect(r.percent).toBe(50);
  });
  it("quiz vide = 0 %", () => {
    expect(scoreQuiz([], []).percent).toBe(0);
  });
});
