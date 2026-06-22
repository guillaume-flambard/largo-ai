"use client";

import { useMemo, useState } from "react";
import { scoreQuiz, type QuizQuestion } from "@/lib/learn/scoring";
import { useLessonKey } from "@/components/learn/LessonProgress";
import { useProgress } from "@/lib/learn/progress";
import type { MarkLessonParams } from "@/lib/learn/progress";
import { Msi } from "@/components/sections/saas-ui";

type QuizCopy = {
  intro: (n: number) => string;
  submit: string;
  restart: string;
  validated: string;
};

const COPY: Record<"fr" | "en", QuizCopy> = {
  fr: {
    intro: (n) => `${n} question${n > 1 ? "s" : ""} · répondez puis validez.`,
    submit: "Valider mes réponses",
    restart: "Recommencer",
    validated: " — validé",
  },
  en: {
    intro: (n) => `${n} question${n > 1 ? "s" : ""} · answer then submit.`,
    submit: "Submit my answers",
    restart: "Restart",
    validated: " — passed",
  },
};

// Les questions sont passées en **prop données** (sérialisable RSC), pas via des
// enfants JSX — l'introspection d'enfants ne traverse pas la frontière
// serveur→client de façon fiable.
export function Quiz({
  questions = [],
  title,
  locale = "fr",
}: {
  questions?: QuizQuestion[];
  /** Titre du bloc (i18n) — défaut conservé pour compat des anciens appels. */
  title?: string;
  locale?: "fr" | "en";
}) {
  const initial = useMemo<number[][]>(() => questions.map(() => []), [questions]);
  const [answers, setAnswers] = useState<number[][]>(initial);
  const [submitted, setSubmitted] = useState(false);
  const lessonKey = useLessonKey();
  const markLesson = useProgress((s) => s.markLesson);
  const copy = COPY[locale] ?? COPY.fr;
  const heading = title ?? (locale === "en" ? "Check your understanding" : "Vérifiez votre compréhension");

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
    if (lessonKey) {
      const colonIdx = lessonKey.indexOf(":");
      const moduleSlug = colonIdx >= 0 ? lessonKey.slice(0, colonIdx) : lessonKey;
      const lessonSlug = colonIdx >= 0 ? lessonKey.slice(colonIdx + 1) : "";
      const params: MarkLessonParams = {
        moduleSlug,
        lessonSlug,
        completed: r.percent >= 70,
        quizScore: r.correct,
        quizTotal: r.total,
      };
      void markLesson(params);
    }
  }

  function restart() {
    setSubmitted(false);
    setAnswers(questions.map(() => []));
  }

  return (
    <section
      aria-label={heading}
      style={{
        margin: "40px 0 0",
        border: "1px solid var(--line-2)",
        background: "var(--surface)",
        borderRadius: 18,
        padding: "clamp(20px, 3vw, 26px)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <Msi size={22} style={{ color: "var(--sun-ink)" }}>
          quiz
        </Msi>
        <h2
          style={{
            margin: 0,
            font: "600 20px var(--font-display)",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          {heading}
        </h2>
      </div>
      <p style={{ margin: "0 0 22px", fontSize: 14, color: "var(--ink-3)" }}>
        {copy.intro(questions.length)}
      </p>

      {questions.map((q, qi) => (
        <fieldset key={qi} style={{ border: 0, margin: "0 0 24px", padding: 0 }}>
          <legend
            style={{
              font: "600 15.5px var(--font-display)",
              color: "var(--ink)",
              marginBottom: 12,
              display: "flex",
              gap: 9,
              alignItems: "baseline",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--sun)",
                flexShrink: 0,
                transform: "translateY(-2px)",
              }}
            />
            {q.prompt}
          </legend>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {q.choices.map((c, ci) => {
              const picked = answers[qi].includes(ci);
              const showCorrect = submitted && c.correct;
              const showWrong = submitted && picked && !c.correct;
              return (
                <label
                  key={ci}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    padding: "11px 14px",
                    borderRadius: 11,
                    cursor: submitted ? "default" : "pointer",
                    border: `1px solid ${
                      showCorrect
                        ? "var(--sun)"
                        : showWrong
                          ? "var(--line-2)"
                          : picked
                            ? "var(--sun)"
                            : "var(--line)"
                    }`,
                    background: showCorrect
                      ? "var(--sun-soft)"
                      : picked && !submitted
                        ? "var(--sun-soft)"
                        : "var(--surface-2)",
                    color: showWrong ? "var(--ink-3)" : "var(--ink-2)",
                    fontSize: 14.5,
                    transition: "border-color .15s ease, background .15s ease",
                  }}
                >
                  <input
                    type={q.multiple ? "checkbox" : "radio"}
                    name={`q${qi}`}
                    checked={picked}
                    disabled={submitted}
                    onChange={() => pick(qi, ci, q.multiple)}
                    style={{ accentColor: "var(--sun)" }}
                  />
                  <span style={{ paddingTop: 1 }}>{c.text}</span>
                  {showCorrect && (
                    <Msi size={18} style={{ color: "var(--sun-ink)", marginLeft: "auto" }}>
                      check_circle
                    </Msi>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={validate}
          className="lg-sun-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 22px",
            borderRadius: 11,
            background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
            color: "var(--on-sun)",
            font: "600 15px var(--font-sans)",
            border: "1px solid var(--sun-deep)",
            boxShadow: "var(--glow-sun)",
            cursor: "pointer",
          }}
        >
          {copy.submit}
          <Msi size={18}>check</Msi>
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            padding: "16px 18px",
            borderRadius: 12,
            background: "var(--surface-2)",
            border: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              font: "600 16px var(--font-display)",
              color: "var(--ink)",
            }}
          >
            <Msi size={24} style={{ color: "var(--sun-ink)" }}>
              military_tech
            </Msi>
            {result!.correct}/{result!.total} · {result!.percent}%
            {result!.percent >= 70 ? copy.validated : ""}
          </div>
          <button
            type="button"
            onClick={restart}
            className="lg-quiet-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 16px",
              borderRadius: 10,
              background: "var(--surface)",
              border: "1px solid var(--line-2)",
              color: "var(--ink)",
              font: "600 14px var(--font-sans)",
              cursor: "pointer",
            }}
          >
            <Msi size={17}>refresh</Msi>
            {copy.restart}
          </button>
        </div>
      )}
    </section>
  );
}

export type { QuizQuestion };
