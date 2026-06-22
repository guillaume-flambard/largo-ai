import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleLink } from "@/components/LocaleLink";
import { ReserveButton } from "@/components/ReserveButton";
import { FormateurGate } from "@/components/learn/FormateurGate";
import { Msi, Kicker, CONTAINER } from "@/components/sections/saas-ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { listModules, getModule } from "@/lib/content/programme";
import type { LessonMeta, ModuleMeta } from "@/lib/content/schema";
import { getPageCopy } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(isLocale(locale) ? locale : "fr").programme;
  return { title: t.metaTitle, description: t.metaDescription };
}

/* ── Petites étiquettes dérivées des vraies données (pas de modules en dur) ── */

/** Libellé de "tonalité" du module, dérivé du niveau dominant des leçons. */
function moduleTone(
  lessons: LessonMeta[],
  formateurOnly: boolean,
  locale: Locale,
): string {
  if (formateurOnly) return locale === "fr" ? "Formateurs" : "Trainers";
  // Niveau le plus fréquent parmi les leçons.
  const counts = new Map<LessonMeta["level"], number>();
  for (const l of lessons) counts.set(l.level, (counts.get(l.level) ?? 0) + 1);
  let dominant: LessonMeta["level"] = "découverte";
  let best = -1;
  for (const [lvl, n] of counts) {
    if (n > best) {
      best = n;
      dominant = lvl;
    }
  }
  const map: Record<LessonMeta["level"], { fr: string; en: string }> = {
    découverte: { fr: "Découverte", en: "Discovery" },
    intermédiaire: { fr: "Pratique", en: "Hands-on" },
    avancé: { fr: "Avancé", en: "Advanced" },
  };
  return map[dominant][locale];
}

/** Badge "M1…M5" / "MF" depuis l'ordre du module. */
function moduleBadge(meta: ModuleMeta): string {
  return meta.formateurOnly ? "MF" : `M${meta.order}`;
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const copy = getPageCopy(loc);
  const c = copy.programme;
  const isFr = loc === "fr";

  const modulesMeta = await listModules(loc);
  const modules = (
    await Promise.all(modulesMeta.map((m) => getModule(loc, m.slug)))
  ).filter((m): m is NonNullable<typeof m> => m !== null);

  // JSON-LD : catalogue de cours (modules publics) pour les rich results Google.
  const courseList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: modules
      .filter((m) => !m.meta.formateurOnly)
      .map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Course",
          name: m.meta.title,
          description: m.meta.summary,
          url: `${SITE_URL}/${loc}/programme/${m.meta.slug}`,
          inLanguage: loc,
          provider: { "@type": "Organization", name: "Largo IA", url: SITE_URL },
        },
      })),
  };

  const lessonsWord = isFr ? "leçons" : "lessons";
  const viewModule = isFr ? "Voir le module" : "View module";
  const filters = isFr
    ? ["Tous les modules", "Pour les équipes", "Train-the-trainer"]
    : ["All modules", "For teams", "Train-the-trainer"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseList) }}
      />

      {/* ── Bande héros : grille filigrane + masque soleil ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
            backgroundSize: "58px 58px",
            WebkitMaskImage:
              "radial-gradient(110% 80% at 50% 0%,#000 35%,transparent 80%)",
            maskImage:
              "radial-gradient(110% 80% at 50% 0%,#000 35%,transparent 80%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="lg-reveal"
          style={{
            position: "relative",
            maxWidth: CONTAINER,
            margin: "0 auto",
            padding: "64px 24px 52px",
          }}
        >
          <Kicker>{c.heroEyebrow}</Kicker>
          <h1
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(36px,5vw,58px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {c.heroTitle}
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              maxWidth: "34em",
              fontSize: 17.5,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            {c.heroSubtitle}
          </p>
          <ul
            style={{
              listStyle: "none",
              margin: "26px 0 0",
              padding: 0,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {filters.map((label, i) => (
              <li
                key={label}
                style={
                  i === 0
                    ? {
                        padding: "8px 15px",
                        borderRadius: 999,
                        background: "var(--ink)",
                        color: "var(--bg)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: 13,
                      }
                    : {
                        padding: "8px 15px",
                        borderRadius: 999,
                        background: "var(--surface)",
                        border: "1px solid var(--line-2)",
                        color: "var(--ink-2)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: 13,
                      }
                }
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Liste des modules ── */}
      <section
        style={{
          maxWidth: CONTAINER,
          margin: "0 auto",
          padding: "64px 24px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(330px,100%),1fr))",
            gap: 18,
          }}
        >
          {modules.map(({ meta, lessons }) => {
            const dark = meta.formateurOnly;
            const totalMin = lessons.reduce((s, l) => s + l.durationMin, 0);
            const lessonsLine = `${lessons.length} ${lessonsWord} · ~${totalMin} min`;
            const tone = moduleTone(lessons, meta.formateurOnly, loc);

            const card = (
              <LocaleLink
                key={meta.slug}
                href={`/programme/${meta.slug}`}
                className="lg-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  textDecoration: "none",
                  border: dark ? "1px solid #20283A" : "1px solid var(--line)",
                  background: dark ? "#0A0C12" : "var(--surface)",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: dark ? "var(--shadow-lg)" : "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {dark && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: -70,
                      right: -30,
                      width: 220,
                      height: 170,
                      background:
                        "radial-gradient(closest-side,var(--sun-2),transparent 72%)",
                      opacity: 0.22,
                      filter: "blur(8px)",
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 42,
                      height: 42,
                      borderRadius: 11,
                      background: dark
                        ? "rgba(255,154,46,0.16)"
                        : "var(--sun-soft)",
                      color: dark ? "#FF9A2E" : "var(--sun-ink)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {moduleBadge(meta)}
                  </span>
                  {dark ? (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        fontSize: 10.5,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "var(--on-sun)",
                        background:
                          "linear-gradient(180deg,var(--sun),var(--sun-deep))",
                        padding: "4px 9px",
                        borderRadius: 999,
                      }}
                    >
                      Train-the-trainer
                    </span>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        fontSize: 11.5,
                        color: "var(--ink-3)",
                      }}
                    >
                      {lessonsLine}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    position: "relative",
                    margin: "18px 0 0",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 19,
                    letterSpacing: "-0.02em",
                    color: dark ? "#F1F3F8" : "var(--ink)",
                  }}
                >
                  {meta.title}
                </h3>
                <p
                  style={{
                    position: "relative",
                    margin: "9px 0 0",
                    fontSize: 14,
                    lineHeight: 1.56,
                    color: dark ? "#AEB6C6" : "var(--ink-2)",
                    flex: 1,
                  }}
                >
                  {meta.summary}
                </p>

                <div
                  style={{
                    position: "relative",
                    marginTop: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: dark
                        ? "rgba(255,255,255,0.06)"
                        : "var(--surface-2)",
                      border: dark
                        ? "1px solid rgba(255,255,255,0.12)"
                        : "1px solid var(--line)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: 11,
                      color: dark ? "#AEB6C6" : "var(--ink-3)",
                    }}
                  >
                    {tone}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 13.5,
                      color: dark ? "#FF9A2E" : "var(--sun-ink)",
                    }}
                  >
                    {viewModule}
                    <Msi size={17}>arrow_forward</Msi>
                  </span>
                </div>
              </LocaleLink>
            );

            return meta.formateurOnly ? (
              <FormateurGate key={meta.slug}>{card}</FormateurGate>
            ) : (
              card
            );
          })}
        </div>
      </section>

      {/* ── Bande formats + CTA réserver ── */}
      <section
        style={{
          borderTop: "1px solid var(--line)",
          background: "var(--bg-2)",
        }}
      >
        <div
          style={{
            maxWidth: CONTAINER,
            margin: "0 auto",
            padding: "64px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(24px,3vw,34px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              {c.formatsTitle}
            </h2>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 16,
                color: "var(--ink-2)",
              }}
            >
              {c.formatsSubtitle}
            </p>
          </div>
          <ReserveButton
            className="lg-sun-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 22px",
              borderRadius: 11,
              background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
              color: "var(--on-sun)",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 15,
              border: "1px solid var(--sun-deep)",
              boxShadow: "var(--glow-sun)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
            iconRight={<Msi size={18}>arrow_forward</Msi>}
          >
            {c.offers[0]?.ctaLabel ?? (isFr ? "Réserver un appel" : "Book a call")}
          </ReserveButton>
        </div>

        {/* ── Note financement Qualiopi / OPCO ── */}
        <div
          style={{
            maxWidth: CONTAINER,
            margin: "0 auto",
            padding: "0 24px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              padding: "16px 18px",
              borderRadius: 14,
              border: "1px solid var(--line)",
              background: "var(--surface)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Msi size={20} style={{ color: "var(--sun-ink)", flexShrink: 0, marginTop: 1 }}>
              school
            </Msi>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)" }}>
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{c.financingStrong}</strong>
              {c.financingText}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
