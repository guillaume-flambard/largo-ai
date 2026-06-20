import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneIcon } from "@/components/icons";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getPageCopy(isLocale(locale) ? locale : "fr").contact;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageCopy(locale as Locale).contact;
  const steps = t.steps.map((s, i) => ({ ...s, n: String(i + 1) }));

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
      />

      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <div
            className="grid-trainer"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 56,
              alignItems: "start",
            }}
          >
            <Reveal
              className="card"
              style={{ padding: "32px 30px" }}
            >
              <ContactForm copy={t.form} />
            </Reveal>

            <Reveal as="div" stagger={0.1} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="kicker">{t.stepsEyebrow}</span>
                <h2
                  style={{
                    fontSize: "var(--fs-h2)",
                    fontWeight: "var(--fw-light)",
                    letterSpacing: "var(--ls-display)",
                    lineHeight: "var(--lh-snug)",
                    color: "var(--ink)",
                  }}
                >
                  {t.stepsTitle}
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {steps.map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        width: 40,
                        height: 40,
                        flex: "0 0 auto",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--ink)",
                        color: "var(--paper-on-ink)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--fw-semibold)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <div style={{ fontWeight: "var(--fw-semibold)", color: "var(--ink)", fontSize: "var(--fs-h4)" }}>
                        {s.t}
                      </div>
                      <div style={{ fontSize: "var(--fs-body)", color: "var(--muted)", lineHeight: 1.5 }}>
                        {s.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="mailto:contact@largo-ia.fr"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 600,
                  color: "var(--sun-ink)",
                }}
              >
                <PhoneIcon width={20} height={20} />
                contact@largo-ia.fr
              </a>

              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  border: "1px dashed var(--border-strong)",
                  background: "var(--bg-soft)",
                  padding: "20px 22px",
                  color: "var(--muted)",
                  fontSize: "var(--fs-sm)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "var(--navy)" }}>{t.bookingStrong}</strong>
                {t.bookingText}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
