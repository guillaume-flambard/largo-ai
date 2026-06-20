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
  it("garde le meilleur score (et reste validé)", () => {
    const s1 = applyRecord({}, "m:l", 80);
    const s2 = applyRecord(s1, "m:l", 60);
    expect(s2["m:l"].bestScore).toBe(80);
    expect(s2["m:l"].validated).toBe(true);
  });
  it("n'écrase pas les autres clés", () => {
    const s = applyRecord(applyRecord({}, "a", 90), "b", 40);
    expect(s["a"].bestScore).toBe(90);
    expect(s["b"].bestScore).toBe(40);
  });
});
