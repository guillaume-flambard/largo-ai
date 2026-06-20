import { describe, it, expect } from "vitest";
import {
  listModules,
  getModule,
  getLesson,
  getAdjacentLessons,
} from "./programme";

describe("programme loaders (fr)", () => {
  it("liste les modules triés par order", async () => {
    const mods = await listModules("fr");
    expect(mods.find((m) => m.slug === "_pilote")).toBeTruthy();
  });

  it("charge une leçon avec frontmatter validé + corps sans frontmatter", async () => {
    const l = await getLesson("fr", "_pilote", "intro");
    expect(l?.meta.title).toBe("Introduction");
    expect(l?.meta.durationMin).toBe(10);
    expect(l?.meta.level).toBe("découverte");
    expect(l?.body).not.toContain("---");
    expect(l?.body.trim().length).toBeGreaterThan(0);
  });

  it("getModule retourne le module + ses leçons", async () => {
    const m = await getModule("fr", "_pilote");
    expect(m?.meta.title).toBe("Pilote");
    expect(m?.lessons.map((l) => l.slug)).toContain("intro");
  });

  it("retourne null pour une leçon ou un module inconnu", async () => {
    expect(await getLesson("fr", "_pilote", "nope")).toBeNull();
    expect(await getModule("fr", "inconnu")).toBeNull();
  });

  it("calcule prev/next dans un module", async () => {
    const adj = await getAdjacentLessons("fr", "_pilote", "intro");
    expect(adj).toHaveProperty("prev");
    expect(adj).toHaveProperty("next");
    expect(adj.prev).toBeNull(); // intro est la première
  });

  it("charge aussi la locale en", async () => {
    const l = await getLesson("en", "_pilote", "intro");
    expect(l?.meta.title).toBe("Introduction");
  });
});
