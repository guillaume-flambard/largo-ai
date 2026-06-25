import { describe, it, expect } from "vitest";
import { listModules, getModule, getLesson, getAdjacentLessons } from "./programme";
import { LOCALES } from "@/lib/i18n";

const LEVELS = ["découverte", "intermédiaire", "avancé"];

describe("structure des modules", () => {
  it("liste 6 modules identiques en fr et en", async () => {
    const frSlugs = (await listModules("fr")).map((m) => m.slug).sort();
    const enSlugs = (await listModules("en")).map((m) => m.slug).sort();
    expect(frSlugs).toEqual(enSlugs);
    expect(frSlugs).toHaveLength(6);
  });

  it("aucun module n'est gaté (formateurOnly supprimé) — tous les modules sont publics", async () => {
    const mods = await listModules("fr");
    const gated = mods.filter((m) => m.formateurOnly).map((m) => m.slug);
    expect(gated).toHaveLength(0);
    expect(mods.filter((m) => !m.formateurOnly)).toHaveLength(6);
  });

  it("les modules sont triés par order croissant", async () => {
    const orders = (await listModules("fr")).map((m) => m.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("les slugs de leçons sont identiques entre fr et en, module par module", async () => {
    for (const m of await listModules("fr")) {
      const fr = await getModule("fr", m.slug);
      const en = await getModule("en", m.slug);
      expect(fr).not.toBeNull();
      expect(en).not.toBeNull();
      expect(fr!.lessons.map((l) => l.slug).sort()).toEqual(
        en!.lessons.map((l) => l.slug).sort(),
      );
    }
  });

  it("prev/next cohérents : 1re leçon sans précédente, dernière sans suivante", async () => {
    for (const m of await listModules("fr")) {
      const full = await getModule("fr", m.slug);
      const slugs = full!.lessons.map((l) => l.slug);
      expect(slugs.length).toBeGreaterThan(0);
      const first = await getAdjacentLessons("fr", m.slug, slugs[0]);
      const last = await getAdjacentLessons("fr", m.slug, slugs[slugs.length - 1]);
      expect(first.prev).toBeNull();
      expect(last.next).toBeNull();
    }
  });
});

describe.each([...LOCALES])("contenu des leçons (%s)", (locale) => {
  it("chaque module a au moins une leçon", async () => {
    for (const m of await listModules(locale)) {
      const full = await getModule(locale, m.slug);
      expect(full).not.toBeNull();
      expect(full!.lessons.length).toBeGreaterThan(0);
    }
  });

  it("chaque leçon : frontmatter valide + corps MDX sans délimiteur de tête", async () => {
    for (const m of await listModules(locale)) {
      const full = await getModule(locale, m.slug);
      for (const lm of full!.lessons) {
        expect(lm.title.trim().length).toBeGreaterThan(0);
        expect(lm.durationMin).toBeGreaterThan(0);
        expect(LEVELS).toContain(lm.level);
        const lesson = await getLesson(locale, m.slug, lm.slug);
        expect(lesson).not.toBeNull();
        expect(lesson!.body.trimStart().startsWith("---")).toBe(false);
      }
    }
  });

  it("chaque quiz : au moins 2 choix et 1 bonne réponse par question", async () => {
    for (const m of await listModules(locale)) {
      const full = await getModule(locale, m.slug);
      for (const lm of full!.lessons) {
        for (const q of lm.quiz ?? []) {
          expect(q.choices.length).toBeGreaterThanOrEqual(2);
          expect(q.choices.some((c) => c.correct)).toBe(true);
        }
      }
    }
  });
});
