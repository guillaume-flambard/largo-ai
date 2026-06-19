import { describe, it, expect } from "vitest";
import { getDictionary } from "./dictionary";
import { LOCALES } from "./i18n";

describe("dictionaries", () => {
  it("expose les mêmes clés pour chaque locale", async () => {
    const fr = await getDictionary("fr");
    const en = await getDictionary("en");
    expect(Object.keys(fr.nav).sort()).toEqual(Object.keys(en.nav).sort());
    expect(Object.keys(fr.programme).sort()).toEqual(
      Object.keys(en.programme).sort(),
    );
    expect(fr.programme.suivant).toBeTruthy();
    expect(en.programme.suivant).toBeTruthy();
  });

  it("résout chaque locale connue", async () => {
    for (const locale of LOCALES) {
      const dict = await getDictionary(locale);
      expect(dict.nav.programme).toBeTruthy();
    }
  });
});
