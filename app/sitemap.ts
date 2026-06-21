import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import { listModules, getModule } from "@/lib/content/programme";

// Pages statiques (hors leçons), relatives à la locale.
const STATIC_PATHS = [
  "",
  "/programme",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
];

/** Alternates hreflang : chaque URL déclare ses équivalents FR/EN (slugs
 *  identiques entre locales). Google les lit pour le ciblage linguistique. */
function languagesFor(path: string): Record<string, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const add = (path: string, priority: number) => {
    entries.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      changeFrequency: "monthly",
      priority,
      alternates: { languages: languagesFor(path) },
    });
  };

  for (const p of STATIC_PATHS) add(p, p === "" ? 1 : 0.8);

  // Modules publics + leçons (le module formateur, gaté, est exclu).
  for (const m of await listModules(DEFAULT_LOCALE)) {
    if (m.formateurOnly) continue;
    add(`/programme/${m.slug}`, 0.7);
    const full = await getModule(DEFAULT_LOCALE, m.slug);
    for (const lesson of full?.lessons ?? []) {
      add(`/programme/${m.slug}/${lesson.slug}`, 0.6);
    }
  }

  return entries;
}
