import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CompassIcon, MapIcon, SparkleIcon, VideoIcon } from "@/components/icons";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(isLocale(locale) ? locale : "fr").aPropos;
  return { title: t.metaTitle, description: t.metaDescription };
}

const principleIcons = [<SparkleIcon key="s" />, <CompassIcon key="c" />, <MapIcon key="m" />];

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageCopy(locale as Locale).aPropos;
  const principles = t.principles.map((p, i) => ({ ...p, icon: principleIcons[i] }));

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title="Guillaume Flambard"
        subtitle={t.heroSubtitle}
      />

      <section className="section">
        <div className="container">
          <div
            className="grid-trainer"
            style={{
              display: "grid",
              gridTemplateColumns: "0.85fr 1.15fr",
              gap: "clamp(40px, 6vw, 72px)",
              alignItems: "start",
            }}
          >
            <Reveal>
              <div
                className="card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <div
                  style={{
                    aspectRatio: "1 / 1",
                    background: "var(--sun)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 96,
                    fontWeight: "var(--fw-light)",
                    letterSpacing: "var(--ls-display)",
                    color: "var(--ink)",
                  }}
                >
                  GF
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--fs-h4)",
                      fontWeight: "var(--fw-semibold)",
                      color: "var(--ink)",
                    }}
                  >
                    Guillaume Flambard
                  </div>
                  <div style={{ fontSize: "var(--fs-sm)", color: "var(--muted-ink)", marginTop: 2 }}>
                    {t.cardRole}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="div" stagger={0.1} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <h2
                style={{
                  fontSize: "var(--fs-h2)",
                  fontWeight: "var(--fw-light)",
                  color: "var(--ink)",
                  letterSpacing: "var(--ls-display)",
                  lineHeight: "var(--lh-snug)",
                }}
              >
                {t.bodyTitle}
              </h2>
              <p style={{ fontSize: "var(--fs-lead)", color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
                {t.bodyP1}
              </p>
              <p style={{ fontSize: "var(--fs-body)", color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
                {t.bodyP2}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--line)",
                  color: "var(--ink)",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              >
                <span style={{ color: "var(--sun-ink)", display: "inline-flex" }}>
                  <VideoIcon width={22} height={22} />
                </span>
                {t.location}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container">
          <Reveal style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}>
            <SectionHeader
              eyebrow={t.methodEyebrow}
              title={t.methodTitle}
            />
          </Reveal>
          <Reveal
            as="div"
            stagger={0.12}
            className="grid-principles"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(24px, 4vw, 44px)",
            }}
          >
            {principles.map((p) => (
              <div
                key={p.t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  paddingTop: 22,
                  borderTop: "1px solid var(--line-strong)",
                }}
              >
                <span style={{ color: "var(--sun-ink)" }}>{p.icon}</span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--fs-h4)",
                    fontWeight: "var(--fw-semibold)",
                    color: "var(--ink)",
                  }}
                >
                  {p.t}
                </h3>
                <p style={{ fontSize: "var(--fs-body)", color: "var(--ink-soft)", lineHeight: "var(--lh-normal)" }}>
                  {p.d}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
