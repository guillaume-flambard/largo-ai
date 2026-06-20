import { z } from "zod";

const quizChoice = z.object({
  text: z.string(),
  correct: z.boolean().default(false),
});
const quizQuestion = z.object({
  prompt: z.string(),
  multiple: z.boolean().default(false),
  choices: z.array(quizChoice),
});

/** Frontmatter d'une leçon MDX. Le `level` est en français (vocabulaire métier).
 *  `quiz` (optionnel) = données structurées rendues par la page (pas en MDX). */
export const lessonFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  module: z.string(),
  order: z.number(),
  durationMin: z.number(),
  level: z.enum(["découverte", "intermédiaire", "avancé"]),
  objectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  quiz: z.array(quizQuestion).optional(),
});
export type LessonMeta = z.infer<typeof lessonFrontmatter>;

/** Métadonnées d'un module (`_module.json`). */
export const moduleMeta = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  order: z.number(),
});
export type ModuleMeta = z.infer<typeof moduleMeta>;
