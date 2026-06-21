import { describe, it, expect } from "vitest";
import { moduleCompletion, nextUnfinished, mergeProgress } from "./progress-shared";

const done = (m: string, l: string) => ({ moduleSlug: m, lessonSlug: l, completedAt: "2026-01-01T00:00:00Z", quizScore: null, quizTotal: null });

describe("moduleCompletion", () => {
  it("compte les leçons terminées du module", () => {
    const r = moduleCompletion([done("m1", "a"), done("m1", "b")], ["a", "b", "c"]);
    expect(r).toEqual({ done: 2, total: 3 });
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
    const server = [{ moduleSlug: "m1", lessonSlug: "a", completedAt: null, quizScore: null, quizTotal: null }];
    expect(mergeProgress(local, server)[0].completedAt).toBeTruthy();
  });
});
