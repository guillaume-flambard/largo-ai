import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/site";
import { listModules } from "@/lib/content/programme";

describe("sitemap", () => {
  it("contient l'accueil, le programme et au moins une leçon, toutes en /fr sous SITE_URL", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/fr`);
    expect(urls).toContain(`${SITE_URL}/fr/programme`);
    expect(urls.some((u) => /\/fr\/programme\/m1-fondamentaux\/.+/.test(u))).toBe(true);
    for (const u of urls) {
      expect(u.startsWith(`${SITE_URL}/fr`)).toBe(true);
    }
  });

  it("exclut le(s) module(s) formateur gaté(s)", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    const gated = (await listModules("fr")).filter((m) => m.formateurOnly);
    expect(gated.length).toBeGreaterThan(0);
    for (const m of gated) {
      expect(urls.some((u) => u.includes(m.slug))).toBe(false);
    }
  });

  it("chaque entrée déclare ses alternates hreflang fr + en", async () => {
    for (const e of await sitemap()) {
      const langs = e.alternates?.languages ?? {};
      expect(Object.keys(langs).sort()).toEqual(["en", "fr"]);
      expect(langs.fr).toMatch(/\/fr/);
      expect(langs.en).toMatch(/\/en/);
    }
  });

  it("n'a aucune URL en double", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
