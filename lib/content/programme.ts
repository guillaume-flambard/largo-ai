import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import { lessonFrontmatter, moduleMeta, type LessonMeta, type ModuleMeta } from "./schema";

function programmeDir(locale: Locale): string {
  return path.join(process.cwd(), "content", locale, "programme");
}

/** Modules d'une locale, triés par `order`. Dossiers sans `_module.json` valide ignorés. */
export async function listModules(locale: Locale): Promise<ModuleMeta[]> {
  const dir = programmeDir(locale);
  let names: string[];
  try {
    names = (await fs.readdir(dir, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
  const mods: ModuleMeta[] = [];
  for (const name of names) {
    try {
      const raw = await fs.readFile(path.join(dir, name, "_module.json"), "utf8");
      mods.push(moduleMeta.parse(JSON.parse(raw)));
    } catch {
      // dossier sans module valide → ignoré
    }
  }
  return mods.sort((a, b) => a.order - b.order);
}

async function readLessons(
  locale: Locale,
  moduleSlug: string,
): Promise<{ meta: LessonMeta; body: string }[]> {
  const dir = path.join(programmeDir(locale), moduleSlug);
  let files: string[];
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
  const lessons: { meta: LessonMeta; body: string }[] = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    lessons.push({ meta: lessonFrontmatter.parse(data), body: content });
  }
  return lessons.sort((a, b) => a.meta.order - b.meta.order);
}

/** Module + ses leçons (métadonnées), triées par `order`. `null` si inconnu. */
export async function getModule(
  locale: Locale,
  slug: string,
): Promise<{ meta: ModuleMeta; lessons: LessonMeta[] } | null> {
  try {
    const raw = await fs.readFile(
      path.join(programmeDir(locale), slug, "_module.json"),
      "utf8",
    );
    const meta = moduleMeta.parse(JSON.parse(raw));
    const lessons = (await readLessons(locale, slug)).map((l) => l.meta);
    return { meta, lessons };
  } catch {
    return null;
  }
}

/** Une leçon (métadonnées + corps MDX sans frontmatter). `null` si inconnue. */
export async function getLesson(
  locale: Locale,
  moduleSlug: string,
  lessonSlug: string,
): Promise<{ meta: LessonMeta; body: string } | null> {
  const lessons = await readLessons(locale, moduleSlug);
  return lessons.find((l) => l.meta.slug === lessonSlug) ?? null;
}

/** Leçons précédente / suivante dans le module. */
export async function getAdjacentLessons(
  locale: Locale,
  moduleSlug: string,
  lessonSlug: string,
): Promise<{ prev: LessonMeta | null; next: LessonMeta | null }> {
  const lessons = await readLessons(locale, moduleSlug);
  const i = lessons.findIndex((l) => l.meta.slug === lessonSlug);
  if (i === -1) return { prev: null, next: null };
  return { prev: lessons[i - 1]?.meta ?? null, next: lessons[i + 1]?.meta ?? null };
}
