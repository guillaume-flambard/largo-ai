import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Msi, Kicker } from "@/components/sections/saas-ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";
import { CONTACT_EMAIL } from "@/lib/mailto";

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
  const en = locale === "en";
  const steps = t.steps.map((s, i) => ({ ...s, n: String(i + 1) }));
  const emailHint = en ? "Or write directly to" : "Ou écrivez directement à";

  return (
    <section
      className="lg-col2"
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "72px 24px 88px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: 56,
        alignItems: "start",
      }}
    >
      {/* ── Colonne formulaire ── */}
      <div>
        <Kicker>{t.heroEyebrow}</Kicker>
        <h1
          style={{
            margin: "14px 0 0",
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(34px,4.6vw,52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "var(--ink)",
            textWrap: "balance",
          }}
        >
          {t.heroTitle}
        </h1>
        <p
          style={{
            margin: "18px 0 32px",
            maxWidth: "30em",
            fontSize: 17.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          {t.heroSubtitle}
        </p>

        <Reveal
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            borderRadius: 18,
            padding: 28,
            boxShadow: "var(--shadow-card)",
          }}
        >
          <ContactForm copy={t.form} />
        </Reveal>
      </div>

      {/* ── Colonne étapes + e-mail ── */}
      <Reveal
        as="div"
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <div
          style={{
            border: "1px solid var(--line)",
            background: "var(--bg-2)",
            borderRadius: 18,
            padding: 26,
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <Kicker>{t.stepsEyebrow}</Kicker>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  gap: 14,
                  padding:
                    i === 0
                      ? "0 0 20px"
                      : i === steps.length - 1
                        ? "20px 0 0"
                        : "20px 0",
                  borderTop: i === 0 ? undefined : "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "var(--surface)",
                    border: "1px solid var(--line-2)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--sun-ink)",
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "var(--ink)",
                    }}
                  >
                    {s.t}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      marginTop: 3,
                      lineHeight: 1.5,
                    }}
                  >
                    {s.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="lg-card"
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            borderRadius: 16,
            padding: 20,
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
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
              background: "var(--sun-soft)",
              color: "var(--sun-ink)",
              flexShrink: 0,
            }}
          >
            <Msi size={22}>mail</Msi>
          </span>
          <div>
            <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
              {emailHint}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 15,
                color: "var(--ink)",
              }}
            >
              {CONTACT_EMAIL}
            </div>
          </div>
        </a>

        <div
          style={{
            borderRadius: 16,
            border: "1px dashed var(--line-2)",
            background: "var(--surface-2)",
            padding: "18px 20px",
            color: "var(--ink-2)",
            fontSize: 13.5,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "var(--ink)" }}>{t.bookingStrong}</strong>
          {t.bookingText}
        </div>
      </Reveal>
    </section>
  );
}
