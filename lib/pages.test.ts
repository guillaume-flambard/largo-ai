import { describe, it, expect } from "vitest";
import { getPageCopy, type PageCopy } from "./pages";
import { LOCALES } from "./i18n";

const fr = getPageCopy("fr");
const en = getPageCopy("en");

describe("getPageCopy", () => {
  it("retourne un objet pour chaque locale", () => {
    for (const loc of LOCALES) {
      expect(getPageCopy(loc)).toBeTypeOf("object");
    }
  });

  it("expose les mêmes sections (auth, formateur, aPropos, contact, programme)", () => {
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
    expect(Object.keys(fr).sort()).toEqual(
      ["aPropos", "auth", "contact", "formateur", "programme"].sort(),
    );
  });

  it.each([
    ["auth", (c: PageCopy) => c.auth],
    ["formateur", (c: PageCopy) => c.formateur],
    ["aPropos", (c: PageCopy) => c.aPropos],
    ["contact", (c: PageCopy) => c.contact],
    ["programme", (c: PageCopy) => c.programme],
  ])("la section %s a les mêmes clés en fr/en", (_label, sel) => {
    expect(Object.keys(sel(fr)).sort()).toEqual(Object.keys(sel(en)).sort());
  });

  it.each([
    ["aPropos.principles", (c: PageCopy) => c.aPropos.principles],
    ["contact.steps", (c: PageCopy) => c.contact.steps],
    ["programme.offers", (c: PageCopy) => c.programme.offers],
  ])("%s est non vide et de même longueur en fr/en", (_label, sel) => {
    expect(sel(fr).length).toBeGreaterThan(0);
    expect(sel(fr).length).toBe(sel(en).length);
  });
});

describe("copy auth (boutons OAuth + libellés espace apprenant)", () => {
  it("propose les libellés Google et Microsoft dans les deux locales", () => {
    for (const c of [fr, en]) {
      expect(c.auth.withGoogle.trim().length).toBeGreaterThan(0);
      expect(c.auth.withMicrosoft.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("note de financement Qualiopi / OPCO (programme)", () => {
  it("est présente et mentionne le financement dans les deux locales", () => {
    expect(fr.programme.financingStrong.trim().length).toBeGreaterThan(0);
    expect(fr.programme.financingText).toMatch(/Qualiopi|OPCO/);
    expect(en.programme.financingStrong.trim().length).toBeGreaterThan(0);
    expect(en.programme.financingText).toMatch(/Qualiopi|OPCO/);
  });
});

describe("métadonnées SEO des pages", () => {
  it.each([
    ["aPropos", (c: PageCopy) => c.aPropos],
    ["contact", (c: PageCopy) => c.contact],
    ["programme", (c: PageCopy) => c.programme],
  ])("%s a un titre et une description de meta non vides", (_label, sel) => {
    for (const c of [fr, en]) {
      expect(sel(c).metaTitle.trim().length).toBeGreaterThan(0);
      expect(sel(c).metaDescription.trim().length).toBeGreaterThan(0);
    }
  });
});
