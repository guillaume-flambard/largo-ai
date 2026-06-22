import { describe, it, expect } from "vitest";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "./i18n";

describe("i18n", () => {
  it("expose exactement fr + en", () => {
    expect([...LOCALES]).toEqual(["fr", "en"]);
  });

  it("la locale par défaut est fr et fait partie des locales", () => {
    expect(DEFAULT_LOCALE).toBe("fr");
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("isLocale accepte les locales connues", () => {
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("isLocale rejette tout le reste (casse, variantes, vides, espaces)", () => {
    for (const v of ["", "FR", "EN", "de", "en-US", "fr-FR", "xx", " fr", "fr "]) {
      expect(isLocale(v)).toBe(false);
    }
  });
});
