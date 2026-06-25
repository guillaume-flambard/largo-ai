import { describe, it, expect } from "vitest";
import { getMarketing, type Marketing } from "./marketing";
import { LOCALES } from "./i18n";

const fr = getMarketing("fr");
const en = getMarketing("en");

/** Sélecteurs de listes qui DOIVENT exister à l'identique (même cardinalité)
 *  dans les deux locales — sinon une section a été oubliée à la traduction. */
const LISTS: ReadonlyArray<[string, (m: Marketing) => readonly unknown[]]> = [
  ["hero.proof", (m) => m.hero.proof],
  ["atouts.items", (m) => m.atouts.items],
  ["offers.items", (m) => m.offers.items],
  ["how.steps", (m) => m.how.steps],
  ["trainer.principles", (m) => m.trainer.principles],
  ["faq.items", (m) => m.faq.items],
  ["footer.cols", (m) => m.footer.cols],
  ["tech.categories", (m) => m.tech.categories],
  ["deliverables.items", (m) => m.deliverables.items],
];

describe("getMarketing", () => {
  it("retourne un objet pour chaque locale", () => {
    for (const loc of LOCALES) {
      expect(getMarketing(loc)).toBeTypeOf("object");
    }
  });

  it("expose les mêmes sections de premier niveau en fr et en", () => {
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
  });

  it.each([
    ["hero", (m: Marketing) => m.hero],
    ["manifesto", (m: Marketing) => m.manifesto],
    ["trainer", (m: Marketing) => m.trainer],
    ["footer", (m: Marketing) => m.footer],
    ["tech", (m: Marketing) => m.tech],
    ["deliverables", (m: Marketing) => m.deliverables],
  ])("la section %s a les mêmes clés en fr/en", (_label, sel) => {
    expect(Object.keys(sel(fr)).sort()).toEqual(Object.keys(sel(en)).sort());
  });

  it.each(LISTS)("%s est non vide et de même longueur en fr/en", (_label, sel) => {
    expect(sel(fr).length).toBeGreaterThan(0);
    expect(sel(fr).length).toBe(sel(en).length);
  });
});

describe("contenu marketing", () => {
  it("le hero porte l'acronyme signature (IA en fr, AI en en)", () => {
    expect(fr.hero.titleEmphasis).toBe("IA");
    expect(en.hero.titleEmphasis).toBe("AI");
  });

  it("toutes les paires titre/description (atouts, étapes, principes) sont remplies", () => {
    for (const m of [fr, en]) {
      for (const td of [...m.atouts.items, ...m.how.steps, ...m.trainer.principles]) {
        expect(td.t.trim().length).toBeGreaterThan(0);
        expect(td.d.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("les liens du footer sont internes (commencent par /) et libellés", () => {
    for (const m of [fr, en]) {
      for (const col of m.footer.cols) {
        expect(col.h.trim().length).toBeGreaterThan(0);
        for (const item of col.items) {
          expect(item.label.trim().length).toBeGreaterThan(0);
          expect(item.href.startsWith("/")).toBe(true);
        }
      }
    }
  });

  it("la FAQ a au moins une question ouverte par défaut", () => {
    for (const m of [fr, en]) {
      expect(m.faq.items.some((q) => q.open)).toBe(true);
    }
  });

  it("chaque offre a un nom, un prix et au moins une puce", () => {
    for (const m of [fr, en]) {
      for (const o of m.offers.items) {
        expect(o.name.trim().length).toBeGreaterThan(0);
        expect(o.price.trim().length).toBeGreaterThan(0);
        expect(o.benefits.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("honesty guardrails", () => {
  it("aucun prix ne commence par un chiffre (ni price ni priceNote)", () => {
    const startsWithDigit = /^\s*\d/;
    for (const m of [fr, en]) {
      for (const o of m.offers.items) {
        expect(o.price).not.toMatch(startsWithDigit);
        if (o.priceNote !== undefined) {
          expect(o.priceNote).not.toMatch(startsWithDigit);
        }
      }
    }
  });
});

// FR/EN structural parity + tech/deliverables (plan Task 1 Step 3)
function keyShape(o: unknown): unknown {
  if (Array.isArray(o)) return o.length ? [keyShape(o[0])] : [];
  if (o && typeof o === "object")
    return Object.fromEntries(
      Object.keys(o as object)
        .sort()
        .map((k) => [k, keyShape((o as Record<string, unknown>)[k])]),
    );
  return 0;
}

describe("marketing FR/EN parity", () => {
  it("fr and en have the same key shape", () => {
    expect(keyShape(getMarketing("fr"))).toEqual(keyShape(getMarketing("en")));
  });
  it("exposes tech and deliverables", () => {
    const m = getMarketing("fr");
    expect(m.tech.categories.length).toBeGreaterThan(0);
    expect(m.deliverables.items.length).toBeGreaterThan(0);
  });
});
