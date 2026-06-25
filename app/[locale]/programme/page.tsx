import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleLink } from "@/components/LocaleLink";
import { ReserveButton } from "@/components/ReserveButton";
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

  const lessonsWord = c.lessonsWord;
  const viewModule = c.viewModule;
  const filters = [c.filterAll, c.filterTeams, c.filterTrainer];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseList) }}
      />

      {/* ── 1. Bande héros : grille filigrane + masque soleil ── */}
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

      {/* ── 2. Objectifs pédagogiques ── */}
      <section
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-2)",
        }}
      >
        <div
          className="lg-reveal"
          style={{
            maxWidth: CONTAINER,
            margin: "0 auto",
            padding: "64px 24px",
          }}
        >
          <Kicker>{c.objectivesEyebrow}</Kicker>
          <h2
            style={{
              margin: "12px 0 32px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(26px,3.5vw,40px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            {c.objectivesTitle}
          </h2>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {c.objectives.map((obj, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 18,
                  padding: "20px 0",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--sun-ink)",
                    paddingTop: 3,
                    minWidth: "2ch",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16.5,
                    lineHeight: 1.55,
                    color: "var(--ink)",
                  }}
                >
                  {obj}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3. Formules détaillées avec découpage jour par jour ── */}
      <section
        style={{
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="lg-reveal"
          style={{
            maxWidth: CONTAINER,
            margin: "0 auto",
            padding: "64px 24px",
          }}
        >
          <Kicker>{c.formulesEyebrow}</Kicker>
          <h2
            style={{
              margin: "12px 0 8px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(26px,3.5vw,40px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            {c.formulesTitle}
          </h2>
          <p
            style={{
              margin: "0 0 48px",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              maxWidth: "44em",
            }}
          >
            {c.formulesSubtitle}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {c.curriculum.map((item) => (
              <div
                key={item.key}
                style={{
                  padding: "28px 26px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  boxShadow: "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--sun-ink)",
                      marginBottom: 8,
                    }}
                  >
                    {item.format}
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "var(--fs-h3)",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {item.label}
                  </h3>
                </div>

                {item.blocks.map((block, bi) => (
                  <div key={bi}>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "var(--ink-2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {block.title}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {block.items.map((it, ii) => (
                        <li
                          key={ii}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: 14.5,
                            lineHeight: 1.5,
                            color: "var(--ink-2)",
                          }}
                        >
                          <Msi
                            size={16}
                            style={{
                              color: "var(--sun-ink)",
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            check_small
                          </Msi>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Modules du playbook (rangées éditoriales) ── */}
      <section
        style={{
          maxWidth: CONTAINER,
          margin: "0 auto",
          padding: "40px 24px 8px",
        }}
      >
        <div className="rows lg-reveal">
          {modules.map(({ meta, lessons }) => {
            const trainer = meta.formateurOnly;
            const totalMin = lessons.reduce((s, l) => s + l.durationMin, 0);
            const lessonsLine = `${lessons.length} ${lessonsWord} · ~${totalMin} min`;
            const tone = moduleTone(lessons, meta.formateurOnly, loc);

            const row = (
              <LocaleLink
                key={meta.slug}
                href={`/programme/${meta.slug}`}
                className="row lg-row"
                style={{
                  alignItems: "center",
                  textDecoration: "none",
                  paddingInline: 12,
                  borderRadius: "var(--radius-lg)",
                }}
              >
                {/* Colonne primaire : badge module + titre + résumé */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: trainer ? "var(--ink-3)" : "var(--sun-ink)",
                    }}
                  >
                    {moduleBadge(meta)}
                    {trainer ? " · Train-the-trainer" : ""}
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--fs-h3)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {meta.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14.5,
                      lineHeight: 1.56,
                      color: "var(--ink-2)",
                      maxWidth: "46em",
                    }}
                  >
                    {meta.summary}
                  </p>
                </div>

                {/* Colonne méta : leçons · tonalité · affordance */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "var(--ink-3)",
                    }}
                  >
                    {lessonsLine}
                  </span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "var(--surface-2)",
                      border: "1px solid var(--line)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: 11,
                      color: "var(--ink-3)",
                    }}
                  >
                    {tone}
                  </span>
                  <span
                    className="lg-row__cta"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      marginLeft: "auto",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 13.5,
                      color: "var(--sun-ink)",
                    }}
                  >
                    {viewModule}
                    <Msi size={17}>arrow_forward</Msi>
                  </span>
                </div>
              </LocaleLink>
            );

            return row;
          })}
        </div>
      </section>

      {/* ── 5. Bande formats + CTA réserver ── */}
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
            {c.offers[0]?.ctaLabel}
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
