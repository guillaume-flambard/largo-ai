import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeader } from "@/components/SectionHeader";
import { LocaleLink } from "@/components/LocaleLink";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { isLocale } from "@/lib/i18n";
import { listModules, getModule } from "@/lib/content/programme";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Un parcours IA en 4 modules conçu pour les TPE/PME : fondamentaux & conformité, écrire & communiquer, marketing & contenu, productivité & automatisation. Trois formats au choix.",
};

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const modulesMeta = await listModules(locale);
  const modules = (
    await Promise.all(modulesMeta.map((m) => getModule(locale, m.slug)))
  ).filter((m): m is NonNullable<typeof m> => m !== null);

  return (
    <>
      <PageHero
        eyebrow="Le programme"
        title="Un parcours IA conçu pour votre métier"
        subtitle="Quatre modules concrets, travaillés sur vos vrais cas et vos propres outils. On adapte la profondeur de chaque module à votre format et à votre équipe."
      />

      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Le contenu"
              title="Quatre modules, du fondamental à l'automatisation"
            />
          </Reveal>
          <Reveal
            as="div"
            stagger={0.12}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              marginTop: 56,
            }}
            className="grid-offers"
          >
            {modules.map(({ meta, lessons }) => (
              <LocaleLink
                key={meta.slug}
                href={`/programme/${meta.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <TiltCard
                  max={4}
                  className="card"
                  style={{ padding: 30, height: "100%" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--fs-h2)",
                      fontWeight: "var(--fw-thin)",
                      color: "var(--sun-ink)",
                      letterSpacing: "var(--ls-display)",
                    }}
                  >
                    {String(meta.order).padStart(2, "0")}
                  </div>
                  <h3
                    style={{
                      fontSize: "var(--fs-h3)",
                      fontWeight: "var(--fw-medium)",
                      color: "var(--ink)",
                      margin: "10px 0 8px",
                    }}
                  >
                    {meta.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--fs-body)",
                      color: "var(--muted)",
                      lineHeight: "var(--lh-normal)",
                      marginBottom: 18,
                    }}
                  >
                    {meta.summary}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {lessons.map((lesson, i) => (
                      <li
                        key={lesson.slug}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "baseline",
                          fontSize: "var(--fs-body)",
                          color: "var(--text-body)",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--sun-ink)",
                            flex: "0 0 auto",
                            fontVariantNumeric: "tabular-nums",
                            fontSize: "var(--fs-sm)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </LocaleLink>
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <Reveal>
            <SectionHeader
              eyebrow="Les formats"
              title="Trois intensités, selon vos objectifs"
              subtitle="Le même fond, calibré différemment : de la sensibilisation à l'accompagnement sur-mesure du dirigeant."
            />
          </Reveal>
          <Reveal
            as="div"
            stagger={0.14}
            className="grid-offers"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              alignItems: "start",
              marginTop: 56,
            }}
          >
            <TiltCard max={5}>
              <OfferCard
                name="Acculturation IA"
                format="Demi-journée (3h30) · visio"
                price="dès 690 €"
                priceNote="HT / groupe"
                audience="Sensibiliser, lever les freins"
                ctaLabel="Réserver un appel"
                ctaHref="/contact"
                benefits={[
                  "Comprendre l'IA sans jargon",
                  "Repérer vos premiers cas d'usage",
                  "Lever les craintes de l'équipe",
                ]}
              />
            </TiltCard>
            <TiltCard max={5}>
              <OfferCard
                featured
                name="L'IA au quotidien"
                format="2 jours (4×3h30) · visio"
                price="dès 1 900 €"
                priceNote="HT / groupe"
                audience="Monter en compétence toute l'équipe"
                ctaHref="/contact"
                benefits={[
                  "Écrire & communiquer plus vite",
                  "Marketing & création de contenu",
                  "Productivité & automatisation",
                  "Sécurité, RGPD & AI Act",
                ]}
              />
            </TiltCard>
            <TiltCard max={5}>
              <OfferCard
                name="Accompagnement dirigeant"
                format="Parcours 4–6 semaines"
                price="sur devis"
                audience="Transformation + mise en conformité"
                ctaLabel="En parler"
                ctaHref="/contact"
                benefits={[
                  "Feuille de route IA sur-mesure",
                  "Sessions individuelles",
                  "Conformité AI Act de l'entreprise",
                ]}
              />
            </TiltCard>
          </Reveal>

          <Reveal>
            <p
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
                fontSize: "var(--fs-sm)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--muted)",
                maxWidth: "64ch",
              }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: "var(--fw-semibold)" }}>
                Financement —
              </strong>{" "}
              La certification Qualiopi, qui ouvre le financement par votre OPCO,
              est en cours d&apos;obtention. Parlons de votre situation lors de
              l&apos;appel découverte : on vous oriente vers les dispositifs
              mobilisables.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
