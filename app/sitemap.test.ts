import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/site";
import { listModules } from "@/lib/content/programme";

describe("sitemap", () => {
  it("contient l'accueil, le programme et au moins une leçon, toutes en /fr sous SITE_URL", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/fr`);
    expect(urls).toContain(`${SITE_URL}/fr/programme`);
    expect(urls.some((u) => /\/fr\/programme\/m1-posture-ai-first\/.+/.test(u))).toBe(true);
    for (const u of urls) {
      expect(u.startsWith(`${SITE_URL}/fr`)).toBe(true);
    }
  });

  it("aucun module n'est gaté (formateurOnly supprimé) — tous les modules apparaissent dans le sitemap", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    const mods = await listModules("fr");
    const gated = mods.filter((m) => m.formateurOnly);
    expect(gated).toHaveLength(0);
    for (const m of mods) {
      expect(urls.some((u) => u.includes(m.slug))).toBe(true);
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
