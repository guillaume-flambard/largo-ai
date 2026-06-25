import { describe, it, expect } from "vitest";
import {
  listModules,
  getModule,
  getLesson,
  getAdjacentLessons,
} from "./programme";

const MOD = "m1-posture-ai-first";
const LESSON = "orchestrer-pas-coder";

describe("programme loaders (fr)", () => {
  it("liste les modules triés par order", async () => {
    const mods = await listModules("fr");
    expect(mods.find((m) => m.slug === MOD)).toBeTruthy();
  });

  it("charge une leçon avec frontmatter validé + corps sans frontmatter", async () => {
    const l = await getLesson("fr", MOD, LESSON);
    expect(l?.meta.title).toContain("orchestrer");
    expect(l?.meta.durationMin).toBe(15);
    expect(l?.meta.level).toBe("intermédiaire");
    expect(l?.body).not.toContain("---");
    expect(l?.body).toContain("<");
  });

  it("getModule retourne le module + ses leçons", async () => {
    const m = await getModule("fr", MOD);
    expect(m?.meta.title).toBe("Posture AI-first");
    expect(m?.lessons.map((l) => l.slug)).toContain(LESSON);
  });

  it("retourne null pour une leçon ou un module inconnu", async () => {
    expect(await getLesson("fr", MOD, "nope")).toBeNull();
    expect(await getModule("fr", "inconnu")).toBeNull();
  });

  it("calcule prev/next dans un module", async () => {
    const adj = await getAdjacentLessons("fr", MOD, LESSON);
    expect(adj).toHaveProperty("prev");
    expect(adj).toHaveProperty("next");
    expect(adj.prev).toBeNull(); // première leçon
  });

  it("charge la même leçon en en (slug stable)", async () => {
    const l = await getLesson("en", MOD, LESSON);
    expect(l?.meta.title).toContain("orchestrate");
  });
});
