"use client";

import { useMemo, useState } from "react";
import { scoreQuiz, type QuizQuestion } from "@/lib/learn/scoring";
import { useLessonKey } from "@/components/learn/LessonProgress";
import { useProgress } from "@/lib/learn/progress";

// Les questions sont passées en **prop données** (sérialisable RSC), pas via des
// enfants JSX — l'introspection d'enfants ne traverse pas la frontière
// serveur→client de façon fiable.
export function Quiz({ questions = [] }: { questions?: QuizQuestion[] }) {
  const initial = useMemo<number[][]>(() => questions.map(() => []), [questions]);
  const [answers, setAnswers] = useState<number[][]>(initial);
  const [submitted, setSubmitted] = useState(false);
  const lessonKey = useLessonKey();
  const record = useProgress((s) => s.record);

  if (!questions || questions.length === 0) return null;
  const result = submitted ? scoreQuiz(questions, answers) : null;

  function pick(qi: number, ci: number, multiple: boolean) {
    setAnswers((prev) => {
      const next = prev.map((a) => [...a]);
      if (multiple) {
        next[qi] = next[qi].includes(ci)
          ? next[qi].filter((x) => x !== ci)
          : [...next[qi], ci];
      } else {
        next[qi] = [ci];
      }
      return next;
    });
  }

  function validate() {
    setSubmitted(true);
    const r = scoreQuiz(questions, answers);
    if (lessonKey) record(lessonKey, r.percent);
  }

  function restart() {
    setSubmitted(false);
    setAnswers(questions.map(() => []));
  }

  return (
    <section
      aria-label="Quiz"
      style={{
        margin: "32px 0",
        border: "1px solid var(--line-strong)",
        borderRadius: "var(--radius-lg)",
        padding: "clamp(20px, 3vw, 28px)",
      }}
    >
      {questions.map((q, qi) => (
        <fieldset key={qi} style={{ border: 0, margin: "0 0 20px", padding: 0 }}>
          <legend
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--fw-semibold)",
              color: "var(--ink)",
              marginBottom: 10,
            }}
          >
            {q.prompt}
          </legend>
          {q.choices.map((c, ci) => {
            const picked = answers[qi].includes(ci);
            const showState = submitted && (c.correct || picked);
            return (
              <label
                key={ci}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: "6px 0",
                  cursor: submitted ? "default" : "pointer",
                  color: showState
                    ? c.correct
                      ? "var(--sun-ink)"
                      : "var(--muted-ink)"
                    : "var(--ink-soft)",
                }}
              >
                <input
                  type={q.multiple ? "checkbox" : "radio"}
                  name={`q${qi}`}
                  checked={picked}
                  disabled={submitted}
                  onChange={() => pick(qi, ci, q.multiple)}
                />
                {c.text}
                {submitted && c.correct ? " ✓" : ""}
              </label>
            );
          })}
        </fieldset>
      ))}

      {!submitted ? (
        <button type="button" className="btn btn--primary btn--md" onClick={validate}>
          Valider
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <strong style={{ fontSize: "var(--fs-h4)", color: "var(--ink)" }}>
            {result!.correct}/{result!.total} · {result!.percent}%
            {result!.percent >= 70 ? " — validé" : ""}
          </strong>
          <button type="button" className="btn btn--ghost btn--sm" onClick={restart}>
            Recommencer
          </button>
        </div>
      )}
    </section>
  );
}

export type { QuizQuestion };
