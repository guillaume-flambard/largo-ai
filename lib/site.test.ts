import { describe, it, expect, afterEach, vi } from "vitest";

const KEY = "NEXT_PUBLIC_SITE_URL";

/** SITE_URL est figée au chargement du module depuis l'env. On la recharge donc
 *  à chaque cas après avoir posé/retiré la variable, via resetModules + import. */
async function loadSiteUrl(value: string | undefined): Promise<string> {
  if (value === undefined) delete process.env[KEY];
  else process.env[KEY] = value;
  vi.resetModules();
  const mod = await import("./site");
  return mod.SITE_URL;
}

describe("SITE_URL", () => {
  afterEach(() => {
    delete process.env[KEY];
    vi.resetModules();
  });

  it("par défaut = domaine de marque", async () => {
    expect(await loadSiteUrl(undefined)).toBe("https://largo-ia.fr");
  });

  it("surchargée par NEXT_PUBLIC_SITE_URL", async () => {
    expect(await loadSiteUrl("https://largo-ai.vercel.app")).toBe(
      "https://largo-ai.vercel.app",
    );
  });

  it("retire le slash final", async () => {
    expect(await loadSiteUrl("https://example.com/")).toBe("https://example.com");
  });

  it("retire plusieurs slashes finaux", async () => {
    expect(await loadSiteUrl("https://example.com///")).toBe("https://example.com");
  });

  it("ne contient jamais de slash final", async () => {
    for (const v of [undefined, "https://a.io", "https://a.io/", "https://a.io//"]) {
      expect(await loadSiteUrl(v)).not.toMatch(/\/$/);
    }
  });
});
