import { z } from "zod";

/** Frontmatter d'une leçon MDX. Le `level` est en français (vocabulaire métier). */
export const lessonFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  module: z.string(),
  order: z.number(),
  durationMin: z.number(),
  level: z.enum(["découverte", "intermédiaire", "avancé"]),
  objectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
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
