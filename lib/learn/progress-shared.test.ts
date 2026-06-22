import { describe, it, expect } from "vitest";
import { moduleCompletion, nextUnfinished, mergeProgress } from "./progress-shared";

const done = (m: string, l: string) => ({ moduleSlug: m, lessonSlug: l, completedAt: "2026-01-01T00:00:00Z", quizScore: null, quizTotal: null });
const incomplete = (m: string, l: string) => ({ moduleSlug: m, lessonSlug: l, completedAt: null, quizScore: null, quizTotal: null });

describe("moduleCompletion", () => {
  it("compte les leçons terminées du module (entrées déjà filtrées par module)", () => {
    // Caller pre-filters entries for m1; we pass only m1 entries + lessonSlugs for m1
    const r = moduleCompletion([done("m1", "a"), done("m1", "b")], ["a", "b", "c"]);
    expect(r).toEqual({ done: 2, total: 3 });
  });

  it("ne compte pas une leçon dont le slug n'est pas dans lessonSlugs", () => {
    // "x" is in entries but NOT in lessonSlugs — must not inflate the count
    const r = moduleCompletion([done("m1", "a"), done("m1", "x")], ["a", "b"]);
    expect(r).toEqual({ done: 1, total: 2 });
  });
});

describe("nextUnfinished", () => {
  it("retourne la première leçon non terminée dans l'ordre", () => {
    const ordered = [{ moduleSlug: "m1", lessonSlug: "a" }, { moduleSlug: "m1", lessonSlug: "b" }];
    expect(nextUnfinished([done("m1", "a")], ordered)).toEqual({ moduleSlug: "m1", lessonSlug: "b" });
  });
  it("null si tout est terminé", () => {
    const ordered = [{ moduleSlug: "m1", lessonSlug: "a" }];
    expect(nextUnfinished([done("m1", "a")], ordered)).toBeNull();
  });
});

describe("mergeProgress", () => {
  it("garde l'entrée terminée face à une non terminée", () => {
    const local = [done("m1", "a")];
    const server = [incomplete("m1", "a")];
    expect(mergeProgress(local, server)[0].completedAt).toBeTruthy();
  });

  it("retient le meilleur quizScore entre local et server", () => {
    const local = [{ moduleSlug: "m1", lessonSlug: "a", completedAt: null, quizScore: 8, quizTotal: 10 }];
    const server = [{ moduleSlug: "m1", lessonSlug: "a", completedAt: null, quizScore: 5, quizTotal: 10 }];
    expect(mergeProgress(local, server)[0].quizScore).toBe(8);
  });

  it("conserve les entrées présentes uniquement en local ou uniquement sur le serveur (union)", () => {
    const local = [done("m1", "local-only")];
    const server = [done("m2", "server-only")];
    const merged = mergeProgress(local, server);
    const slugs = merged.map((e) => e.lessonSlug);
    expect(slugs).toContain("local-only");
    expect(slugs).toContain("server-only");
    expect(merged).toHaveLength(2);
  });
});
