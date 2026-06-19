import type { Locale } from "./i18n";
import fr from "@/content/i18n/fr.json";
import en from "@/content/i18n/en.json";

export type Dict = typeof fr;

const DICTS: Record<Locale, Dict> = { fr, en: en as Dict };

export async function getDictionary(locale: Locale): Promise<Dict> {
  return DICTS[locale];
}
