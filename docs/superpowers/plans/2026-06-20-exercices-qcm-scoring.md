# Exercices QCM interactifs + scoring — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter aux leçons des QCM interactifs auto-corrigés avec score + feedback, et une progression « leçon validée » persistée par navigateur (zustand + localStorage), site statique préservé.

**Architecture:** Logique pure (scoring, mise à jour de progression) isolée et testée ; composants client déclaratifs en MDX (`<Quiz>/<Question>/<Choice>`) ; store global zustand persisté en localStorage derrière l'option `storage` (seam DB) ; coche de progression lue depuis le store dans le sommaire du module.

**Tech Stack:** Next 16 (RSC + îlots client), React 19, TypeScript strict, **zustand** (+ middleware persist), vitest, next-mdx-remote (map de composants existante).

## Global Constraints

- **Site statique préservé** : aucune dépendance réseau/serveur. Tout en client + localStorage.
- **Dépendances** : installer avec **`corepack pnpm add <x>`** (le `pnpm` du PATH est cassé pour les `add`).
- **Persistance derrière l'option `storage` de zustand** = interface pour une DB plus tard. Pas de DB / comptes / auth maintenant.
- **Clé de progression indépendante de la locale** : `\`${moduleSlug}:${lessonSlug}\``.
- **Validé = score ≥ 70 %.**
- **A11y** : `<input type="radio|checkbox">` natifs, `<fieldset>/<legend>` par question, focus visible.
- **On-brand** : tokens `app/globals.css` (encre/papier/ocre, `--sun-ink` pour l'ocre-texte, jamais `--sun-deep` en texte). Pas de side-stripe, pas de ghost-card.
- **`pnpm build` + `./node_modules/.bin/vitest run` doivent passer à la fin de chaque task.**

## File Structure

- `lib/learn/scoring.ts` — types `QuizQuestion`, `QuizAnswers` ; `scoreQuiz()` (pur).
- `lib/learn/scoring.test.ts` — tests de `scoreQuiz`.
- `lib/learn/progress.ts` — `applyRecord()` (pur) + store `useProgress` (zustand+persist).
- `lib/learn/progress.test.ts` — tests de `applyRecord`.
- `components/learn/quiz/Quiz.tsx` — `Quiz`, `Question`, `Choice` (client ; Question/Choice = config lue par Quiz).
- `components/learn/LessonProgress.tsx` — `LessonProvider` (contexte `{moduleSlug,lessonSlug}`) + `useLessonKey()`.
- `components/learn/LessonStatus.tsx` — coche de progression (client).
- Modifs : `mdx-components.tsx` (mapper Quiz/Question/Choice), page leçon (LessonProvider), page module (LessonStatus).

---

## Task 1 — `scoreQuiz()` pur + tests  ([Quiz 2])

**Files:** Create `lib/learn/scoring.ts`, `lib/learn/scoring.test.ts`

**Interfaces — Produces:**
- `type QuizChoice = { text: string; correct: boolean }`
- `type QuizQuestion = { prompt: string; multiple: boolean; choices: QuizChoice[] }`
- `type QuizAnswers = number[][]` (par question, indices des choix cochés)
- `scoreQuiz(questions: QuizQuestion[], answers: QuizAnswers): { correct: number; total: number; percent: number }`
- `isQuestionCorrect(q: QuizQuestion, picked: number[]): boolean`

- [ ] **Step 1 : test**

```ts
// lib/learn/scoring.test.ts
import { describe, it, expect } from "vitest";
import { scoreQuiz, isQuestionCorrect, type QuizQuestion } from "./scoring";

const single: QuizQuestion = {
  prompt: "?", multiple: false,
  choices: [{ text: "a", correct: true }, { text: "b", correct: false }],
};
const multi: QuizQuestion = {
  prompt: "?", multiple: true,
  choices: [{ text: "a", correct: true }, { text: "b", correct: true }, { text: "c", correct: false }],
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
});
```

- [ ] **Step 2 : run, échoue** — `./node_modules/.bin/vitest run lib/learn/scoring.test.ts` → FAIL (module manquant).
- [ ] **Step 3 : implémenter**

```ts
// lib/learn/scoring.ts
export type QuizChoice = { text: string; correct: boolean };
export type QuizQuestion = { prompt: string; multiple: boolean; choices: QuizChoice[] };
export type QuizAnswers = number[][];

export function isQuestionCorrect(q: QuizQuestion, picked: number[]): boolean {
  const correctIdx = q.choices.map((c, i) => (c.correct ? i : -1)).filter((i) => i >= 0);
  if (correctIdx.length === 0) return false;
  const a = [...picked].sort();
  const b = [...correctIdx].sort();
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function scoreQuiz(questions: QuizQuestion[], answers: QuizAnswers) {
  const total = questions.length;
  const correct = questions.reduce(
    (n, q, i) => n + (isQuestionCorrect(q, answers[i] ?? []) ? 1 : 0),
    0,
  );
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}
```

- [ ] **Step 4 : run, passe** → PASS.
- [ ] **Step 5 : commit** — `git add lib/learn/scoring.ts lib/learn/scoring.test.ts && git commit -m "feat(learn): scoreQuiz() pur + tests ([Quiz 2])"`

---

## Task 2 — store de progression (zustand + persist) + tests  ([Quiz 1])

**Files:** Create `lib/learn/progress.ts`, `lib/learn/progress.test.ts`. Install `zustand`.

**Interfaces:**
- Consumes : rien.
- Produces :
  - `type LessonProgress = { bestScore: number; validated: boolean }`
  - `applyRecord(state: Record<string, LessonProgress>, key: string, percent: number): Record<string, LessonProgress>` (pur ; garde le meilleur score ; `validated = percent >= 70`)
  - `useProgress` (zustand) : `{ progress: Record<string, LessonProgress>; record(key: string, percent: number): void }`
  - `PASS_THRESHOLD = 70`

- [ ] **Step 1 : installer zustand** — `corepack pnpm add zustand` puis vérifier `node -e "require('zustand/package.json')"`.
- [ ] **Step 2 : test (logique pure)**

```ts
// lib/learn/progress.test.ts
import { describe, it, expect } from "vitest";
import { applyRecord } from "./progress";

describe("applyRecord", () => {
  it("crée une entrée et valide à >= 70", () => {
    const s = applyRecord({}, "m:l", 80);
    expect(s["m:l"]).toEqual({ bestScore: 80, validated: true });
  });
  it("ne valide pas en dessous de 70", () => {
    expect(applyRecord({}, "m:l", 50)["m:l"].validated).toBe(false);
  });
  it("garde le meilleur score", () => {
    const s1 = applyRecord({}, "m:l", 80);
    const s2 = applyRecord(s1, "m:l", 60);
    expect(s2["m:l"].bestScore).toBe(80);
    expect(s2["m:l"].validated).toBe(true);
  });
});
```

- [ ] **Step 3 : run, échoue** → FAIL.
- [ ] **Step 4 : implémenter**

```ts
// lib/learn/progress.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const PASS_THRESHOLD = 70;
export type LessonProgress = { bestScore: number; validated: boolean };

export function applyRecord(
  state: Record<string, LessonProgress>,
  key: string,
  percent: number,
): Record<string, LessonProgress> {
  const prev = state[key]?.bestScore ?? 0;
  const bestScore = Math.max(prev, percent);
  return { ...state, [key]: { bestScore, validated: bestScore >= PASS_THRESHOLD } };
}

type ProgressStore = {
  progress: Record<string, LessonProgress>;
  record: (key: string, percent: number) => void;
};

export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: {},
      record: (key, percent) =>
        set((s) => ({ progress: applyRecord(s.progress, key, percent) })),
    }),
    {
      name: "largo-progress",
      // localStorage aujourd'hui ; remplacer ce storage par un adaptateur DB plus tard.
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

- [ ] **Step 5 : run, passe** → PASS. Puis `pnpm build` → PASS.
- [ ] **Step 6 : commit** — `git add lib/learn/progress.ts lib/learn/progress.test.ts package.json pnpm-lock.yaml && git commit -m "feat(learn): store de progression zustand+persist ([Quiz 1])"`

---

## Task 3 — composants `<Quiz>/<Question>/<Choice>` + map MDX  ([Quiz 3])

**Files:** Create `components/learn/quiz/Quiz.tsx`. Modify `mdx-components.tsx`.

**Interfaces:**
- Consumes : `scoreQuiz`, `QuizQuestion` (Task 1).
- Produces : `Quiz`, `Question`, `Choice` (composants). `Question`/`Choice` ne rendent rien seuls : ce sont des marqueurs de config lus par `Quiz` via `React.Children`.

- [ ] **Step 1 : implémenter** (`"use client"`)

```tsx
// components/learn/quiz/Quiz.tsx
"use client";
import { Children, isValidElement, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { scoreQuiz, type QuizQuestion } from "@/lib/learn/scoring";

export function Choice(_: { correct?: boolean; children: ReactNode }) { return null; }
export function Question(_: { prompt: string; multiple?: boolean; children: ReactNode }) { return null; }

function parse(children: ReactNode): QuizQuestion[] {
  return Children.toArray(children)
    .filter((c): c is ReactElement<{ prompt: string; multiple?: boolean; children: ReactNode }> =>
      isValidElement(c) && (c.type as { name?: string })?.name === "Question")
    .map((q) => ({
      prompt: q.props.prompt,
      multiple: Boolean(q.props.multiple),
      choices: Children.toArray(q.props.children)
        .filter((c): c is ReactElement<{ correct?: boolean; children: ReactNode }> =>
          isValidElement(c) && (c.type as { name?: string })?.name === "Choice")
        .map((c) => ({ text: String(c.props.children), correct: Boolean(c.props.correct) })),
    }));
}

export function Quiz({ children, onValidated }: { children: ReactNode; onValidated?: (percent: number) => void }) {
  const questions = useMemo(() => parse(children), [children]);
  const [answers, setAnswers] = useState<number[][]>(() => questions.map(() => []));
  const [submitted, setSubmitted] = useState(false);
  if (questions.length === 0) return null;
  const result = submitted ? scoreQuiz(questions, answers) : null;

  function pick(qi: number, ci: number, multiple: boolean) {
    setAnswers((prev) => {
      const next = prev.map((a) => [...a]);
      if (multiple) next[qi] = next[qi].includes(ci) ? next[qi].filter((x) => x !== ci) : [...next[qi], ci];
      else next[qi] = [ci];
      return next;
    });
  }

  return (
    <section style={{ margin: "32px 0", border: "1px solid var(--line-strong)", borderRadius: "var(--radius-lg)", padding: "clamp(20px,3vw,28px)" }}>
      {questions.map((q, qi) => (
        <fieldset key={qi} style={{ border: 0, margin: "0 0 20px", padding: 0 }}>
          <legend style={{ fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: 10 }}>{q.prompt}</legend>
          {q.choices.map((c, ci) => {
            const picked = answers[qi].includes(ci);
            const showState = submitted && (c.correct || picked);
            return (
              <label key={ci} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0",
                color: showState ? (c.correct ? "var(--sun-ink)" : "var(--muted-ink)") : "var(--ink-soft)" }}>
                <input type={q.multiple ? "checkbox" : "radio"} name={`q${qi}`} checked={picked}
                  disabled={submitted} onChange={() => pick(qi, ci, q.multiple)} />
                {c.text}{submitted && c.correct ? " ✓" : ""}
              </label>
            );
          })}
        </fieldset>
      ))}
      {!submitted ? (
        <button className="btn btn--primary btn--md" onClick={() => { setSubmitted(true); const r = scoreQuiz(questions, answers); onValidated?.(r.percent); }}>
          Valider
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <strong style={{ fontSize: "var(--fs-h4)", color: "var(--ink)" }}>
            {result!.correct}/{result!.total} · {result!.percent}%{result!.percent >= 70 ? " — validé" : ""}
          </strong>
          <button className="btn btn--ghost btn--sm" onClick={() => { setSubmitted(false); setAnswers(questions.map(() => [])); }}>
            Recommencer
          </button>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2 : mapper dans MDX** — modifier `mdx-components.tsx` : importer `{ Quiz, Question, Choice }` et les ajouter à l'objet `components`.
- [ ] **Step 3 : vérifier** — `pnpm build` → PASS. (Pas encore branché à une leçon ; vérif visuelle en Task 6.)
- [ ] **Step 4 : commit** — `git add components/learn/quiz mdx-components.tsx && git commit -m "feat(learn): composants Quiz/Question/Choice + map MDX ([Quiz 3])"`

---

## Task 4 — `LessonProvider` + enregistrement de la progression  ([Quiz 4])

**Files:** Create `components/learn/LessonProgress.tsx`. Modify the lesson page (`app/[locale]/programme/[module]/[lecon]/page.tsx`) and `components/learn/quiz/Quiz.tsx`.

**Interfaces:**
- Produces : `LessonProvider` (`{ moduleSlug, lessonSlug, children }`, client) ; `useLessonKey(): string | null` (retourne `\`${moduleSlug}:${lessonSlug}\`` ou null hors contexte).
- Consumes : `useProgress` (Task 2).

- [ ] **Step 1 : `LessonProgress.tsx`**

```tsx
// components/learn/LessonProgress.tsx
"use client";
import { createContext, useContext, type ReactNode } from "react";
const Ctx = createContext<string | null>(null);
export function LessonProvider({ moduleSlug, lessonSlug, children }: { moduleSlug: string; lessonSlug: string; children: ReactNode }) {
  return <Ctx.Provider value={`${moduleSlug}:${lessonSlug}`}>{children}</Ctx.Provider>;
}
export function useLessonKey(): string | null { return useContext(Ctx); }
```

- [ ] **Step 2 : Quiz enregistre la progression** — dans `Quiz.tsx`, importer `useLessonKey` et `useProgress` ; au lieu de `onValidated`, à la validation appeler `record(key, percent)` si `key` non nul. Remplacer le bouton Valider :

```tsx
// en tête de Quiz.tsx ajouter :
import { useLessonKey } from "@/components/learn/LessonProgress";
import { useProgress } from "@/lib/learn/progress";
// dans Quiz() :
const lessonKey = useLessonKey();
const record = useProgress((s) => s.record);
// onClick Valider :
onClick={() => { setSubmitted(true); const r = scoreQuiz(questions, answers); if (lessonKey) record(lessonKey, r.percent); }}
```

(supprimer la prop `onValidated`, devenue inutile.)

- [ ] **Step 3 : envelopper le corps de la leçon** — dans la page leçon, importer `LessonProvider` et envelopper le `<div className="prose">{content}</div>` :
  `<LessonProvider moduleSlug={moduleSlug} lessonSlug={lecon}><div className="prose">{content}</div></LessonProvider>`.
- [ ] **Step 4 : vérifier** — `pnpm build` + `./node_modules/.bin/vitest run` → PASS.
- [ ] **Step 5 : commit** — `git add -A && git commit -m "feat(learn): LessonProvider + enregistrement progression depuis le Quiz ([Quiz 4])"`

---

## Task 5 — coche de progression dans le sommaire  ([Quiz 5])

**Files:** Create `components/learn/LessonStatus.tsx`. Modify the module page (`app/[locale]/programme/[module]/page.tsx`).

**Interfaces:**
- Produces : `LessonStatus` (`{ lessonKey: string }`, client) → affiche une coche ocre si `useProgress` marque la leçon validée, sinon rien.
- Consumes : `useProgress` (Task 2).

- [ ] **Step 1 : `LessonStatus.tsx`**

```tsx
// components/learn/LessonStatus.tsx
"use client";
import { useProgress } from "@/lib/learn/progress";
export function LessonStatus({ lessonKey }: { lessonKey: string }) {
  const validated = useProgress((s) => s.progress[lessonKey]?.validated ?? false);
  if (!validated) return null;
  return (
    <span aria-label="Validée" title="Validée" style={{ color: "var(--sun-ink)", fontWeight: 700 }}>✓</span>
  );
}
```

- [ ] **Step 2 : monter dans la page module** — pour chaque leçon, ajouter `<LessonStatus lessonKey={`${moduleSlug}:${lesson.slug}`} />` à côté de la durée.
- [ ] **Step 3 : vérifier** — `pnpm build` → PASS.
- [ ] **Step 4 : commit** — `git add -A && git commit -m "feat(learn): coche de progression dans le sommaire du module ([Quiz 5])"`

---

## Task 6 — quiz réel dans la leçon M1 + QA  ([Quiz 6])

**Files:** Modify `content/fr/programme/m1-fondamentaux/01-ce-que-l-ia-sait-faire.mdx` et la version `en`.

- [ ] **Step 1 : ajouter un `<Quiz>`** à la fin du corps des deux leçons (avant `<Formateur>`), 2–3 questions sur le contenu de la leçon (FR ; EN traduit). Ex. FR :

```mdx
<Quiz>
  <Question prompt="L'IA générative est avant tout faite pour…">
    <Choice correct>produire du texte plausible</Choice>
    <Choice>connaître vos chiffres exacts</Choice>
    <Choice>remplacer toute vérification</Choice>
  </Question>
  <Question prompt="Que faut-il systématiquement vérifier ?" multiple>
    <Choice correct>les chiffres</Choice>
    <Choice correct>les citations et références</Choice>
    <Choice>le ton du texte</Choice>
  </Question>
</Quiz>
```

- [ ] **Step 2 : QA navigateur** — `pnpm build` PASS ; `pnpm start` ; sur `/fr/programme/m1-fondamentaux/ce-que-l-ia-sait-faire` : répondre, Valider (score + ✓), Recommencer ; recharger → la coche apparaît dans `/fr/programme/m1-fondamentaux` (progression persistée) ; vérifier `/en/...` (même clé → même validation) ; focus clavier sur radios/cases. Captures desktop + mobile.
- [ ] **Step 3 : commit** — `git add -A && git commit -m "feat(content): quiz QCM dans la leçon M1 (FR+EN) + QA ([Quiz 6])"`

---

## Self-Review

- **Couverture spec :** authoring déclaratif (T3) ✓ · scoring pur + feedback (T1, T3) ✓ · store zustand+persist+seam (T2) ✓ · clé locale-agnostique (T4) ✓ · seuil 70 % (T2) ✓ · coche sommaire (T5) ✓ · éphémère + validé persisté (T3/T4/T5) ✓ · statique préservé (aucun backend) ✓ · a11y inputs natifs (T3) ✓ · FR/EN (T6) ✓ · extensibilité B (store agnostique du type) ✓.
- **Placeholders :** aucun ; code complet à chaque step.
- **Cohérence des types :** `QuizQuestion`/`scoreQuiz` (T1) réutilisés T3 ; `applyRecord`/`useProgress`/`record` (T2) consommés T4/T5 ; `useLessonKey` (T4) utilisé dans Quiz ; clé `\`${moduleSlug}:${lessonSlug}\`` identique en T4 et T5.
