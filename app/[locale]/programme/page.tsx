import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeader } from "@/components/SectionHeader";
import { LocaleLink } from "@/components/LocaleLink";
import { FormateurGate } from "@/components/learn/FormateurGate";
import { RoleToggle } from "@/components/learn/RoleToggle";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { isLocale, type Locale } from "@/lib/i18n";
import { listModules, getModule } from "@/lib/content/programme";
import { getPageCopy } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(isLocale(locale) ? locale : "fr").programme;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getPageCopy(locale as Locale);
  const c = copy.programme;
  const f = copy.formateur;

  const modulesMeta = await listModules(locale);
  const modules = (
    await Promise.all(modulesMeta.map((m) => getModule(locale, m.slug)))
  ).filter((m): m is NonNullable<typeof m> => m !== null);

  return (
    <>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow={c.contentEyebrow}
              title={c.contentTitle}
            />
          </Reveal>
          <Reveal
            as="div"
            style={{
              marginTop: 28,
              padding: "18px 22px",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)",
              background: "var(--paper-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                margin: 0,
                maxWidth: "56ch",
                fontSize: "var(--fs-sm)",
                lineHeight: "var(--lh-normal)",
                color: "var(--ink-soft)",
              }}
            >
              {f.hint}
            </p>
            <RoleToggle label={f.label} stateOn={f.on} stateOff={f.off} />
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
            {modules.map(({ meta, lessons }) => {
              const card = (
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
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
                  {meta.formateurOnly && (
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--fs-xs)",
                        fontWeight: "var(--fw-semibold)",
                        color: "var(--sun-ink)",
                        border: "1px solid var(--line-strong)",
                        borderRadius: "var(--radius-pill)",
                        padding: "3px 10px",
                      }}
                    >
                      Formateur
                    </span>
                  )}
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
              );
              return meta.formateurOnly ? (
                <FormateurGate key={meta.slug}>{card}</FormateurGate>
              ) : (
                card
              );
            })}
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <Reveal>
            <SectionHeader
              eyebrow={c.formatsEyebrow}
              title={c.formatsTitle}
              subtitle={c.formatsSubtitle}
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
            {c.offers.map((offer, i) => (
              <TiltCard key={offer.name} max={5}>
                <OfferCard
                  featured={i === 1}
                  name={offer.name}
                  format={offer.format}
                  price={offer.price}
                  priceNote={offer.priceNote}
                  audience={offer.audience}
                  ctaLabel={offer.ctaLabel}
                  ctaHref="/contact"
                  benefits={offer.benefits}
                />
              </TiltCard>
            ))}
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
                {c.financingStrong}
              </strong>
              {c.financingText}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
