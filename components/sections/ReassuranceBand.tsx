import type { Locale } from "@/lib/i18n";
import { Msi } from "./saas-ui";

/** Largo IA — Bandeau de réassurance (refonte SaaS). 4 preuves rapides,
 *  séparées par des filets. Contenu court, bilingue inline (absent de
 *  marketing.ts). */
type Item = { icon: string; strong: string; rest?: string };

const ITEMS: Record<Locale, Item[]> = {
  fr: [
    { icon: "bolt", strong: "Résultats dès la 1re semaine" },
    { icon: "groups", strong: "1 à 8 personnes", rest: " par groupe" },
    { icon: "schedule", strong: "Demi-journée", rest: " pour démarrer" },
    { icon: "gavel", strong: "AI Act", rest: " inclus" },
  ],
  en: [
    { icon: "bolt", strong: "Results from week one" },
    { icon: "groups", strong: "1 to 8 people", rest: " per group" },
    { icon: "schedule", strong: "Half a day", rest: " to get started" },
    { icon: "gavel", strong: "AI Act", rest: " included" },
  ],
};

export function ReassuranceBand({ locale }: { locale: Locale }) {
  const items = ITEMS[locale] ?? ITEMS.fr;
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "22px 24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px 40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {items.flatMap((it, i) => [
          ...(i > 0
            ? [
                <span
                  key={`sep-${i}`}
                  aria-hidden
                  className="lg-hide-xs"
                  style={{ width: 1, height: 22, background: "var(--line-2)" }}
                />,
              ]
            : []),
          <div key={it.strong} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Msi size={20} style={{ color: "var(--sun-ink)" }}>
              {it.icon}
            </Msi>
            <span style={{ fontSize: 14, color: "var(--ink-2)" }}>
              <b style={{ color: "var(--ink)", fontWeight: 600 }}>{it.strong}</b>
              {it.rest}
            </span>
          </div>,
        ])}
      </div>
    </section>
  );
}
