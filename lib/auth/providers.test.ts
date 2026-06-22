import { describe, it, expect, afterEach, vi } from "vitest";

const G = "AUTH_GOOGLE_ID";
const M = "AUTH_MICROSOFT_ENTRA_ID_ID";

/** googleEnabled / microsoftEnabled sont figés au chargement depuis l'env.
 *  On recharge le module pour chaque combinaison. */
async function load(google: string | undefined, microsoft: string | undefined) {
  if (google === undefined) delete process.env[G];
  else process.env[G] = google;
  if (microsoft === undefined) delete process.env[M];
  else process.env[M] = microsoft;
  vi.resetModules();
  return import("./providers");
}

describe("providers (fournisseurs OAuth conditionnels)", () => {
  afterEach(() => {
    delete process.env[G];
    delete process.env[M];
    vi.resetModules();
  });

  it("Google activé uniquement si AUTH_GOOGLE_ID est présent", async () => {
    const m = await load("client-id", undefined);
    expect(m.googleEnabled).toBe(true);
    expect(m.microsoftEnabled).toBe(false);
  });

  it("Microsoft activé uniquement si AUTH_MICROSOFT_ENTRA_ID_ID est présent", async () => {
    const m = await load(undefined, "tenant-client-id");
    expect(m.googleEnabled).toBe(false);
    expect(m.microsoftEnabled).toBe(true);
  });

  it("les deux activés si les deux IDs sont présents", async () => {
    const m = await load("g", "ms");
    expect(m.googleEnabled).toBe(true);
    expect(m.microsoftEnabled).toBe(true);
  });

  it("les deux désactivés quand aucun ID n'est configuré", async () => {
    const m = await load(undefined, undefined);
    expect(m.googleEnabled).toBe(false);
    expect(m.microsoftEnabled).toBe(false);
  });
});
