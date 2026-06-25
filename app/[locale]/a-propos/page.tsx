import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ReserveButton } from "@/components/ReserveButton";
import { Msi, Kicker } from "@/components/sections/saas-ui";
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

const PRINCIPLE_ICONS = ["translate", "target", "trending_up"];

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageCopy(locale as Locale).aPropos;
  const en = locale === "en";
  const reserveLabel = en ? "Book a call" : "Réserver un appel";

  return (
    <>
      {/* ── Hero : grille filigrane + soleil ── */}
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
          className="lg-col2"
          style={{
            position: "relative",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "72px 24px 64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <Kicker>{t.heroEyebrow}</Kicker>
            <h1
              style={{
                margin: "16px 0 0",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px,5vw,58px)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                textWrap: "balance",
              }}
            >
              {t.bodyTitle}
            </h1>
            <p
              style={{
                margin: "20px 0 0",
                maxWidth: "32em",
                fontSize: 17.5,
                lineHeight: 1.62,
                color: "var(--ink-2)",
              }}
            >
              {t.heroSubtitle}
            </p>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <ReserveButton
                className="lg-sun-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 20px",
                  borderRadius: 11,
                  background:
                    "linear-gradient(180deg,var(--sun),var(--sun-deep))",
                  color: "var(--on-sun)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "1px solid var(--sun-deep)",
                  boxShadow: "var(--glow-sun)",
                  cursor: "pointer",
                }}
                iconRight={<Msi size={18}>arrow_forward</Msi>}
              >
                {reserveLabel}
              </ReserveButton>
            </div>
          </div>

          {/* carte GF */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 248,
                  height: 300,
                  borderRadius: 22,
                  background:
                    "linear-gradient(160deg,var(--sun),var(--sun-deep))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 92,
                  color: "var(--on-sun)",
                  boxShadow: "var(--glow-sun)",
                }}
              >
                GF
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  padding: "10px 18px",
                  borderRadius: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--line-2)",
                  boxShadow: "var(--shadow-card)",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--ok)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--ink)",
                  }}
                >
                  Guillaume Flambard
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Narration ── */}
      <section
        style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px 40px" }}
      >
        <Reveal
          as="h2"
          style={{
            margin: "0 0 22px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          {en ? "Why Largo IA" : "Pourquoi Largo IA"}
        </Reveal>
        <Reveal
          as="p"
          style={{ fontSize: 17, lineHeight: 1.74, color: "var(--ink-2)" }}
        >
          {t.bodyP1}
        </Reveal>
        <Reveal
          as="p"
          style={{
            marginTop: 18,
            fontSize: 17,
            lineHeight: 1.74,
            color: "var(--ink-2)",
          }}
        >
          {t.bodyP2}
        </Reveal>
        <Reveal
          as="div"
          style={{
            marginTop: 26,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "13px 18px",
            borderRadius: 12,
            border: "1px solid var(--line-2)",
            background: "var(--surface)",
            boxShadow: "var(--shadow-card)",
            color: "var(--ink)",
            fontWeight: 600,
            fontSize: 14.5,
          }}
        >
          <Msi size={20} style={{ color: "var(--sun-ink)" }}>
            videocam
          </Msi>
          {t.location}
        </Reveal>
      </section>

      {/* ── Méthode, 3 principes ── */}
      <section
        style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 88px" }}
      >
        <Reveal as="div" style={{ marginBottom: 24 }}>
          <Kicker>{t.methodEyebrow}</Kicker>
          <h2
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(28px,3.4vw,42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {t.methodTitle}
          </h2>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))",
            gap: 18,
          }}
        >
          {t.principles.map((p, i) => (
            <Reveal
              key={p.t}
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                borderRadius: 16,
                padding: 26,
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Msi size={28} style={{ color: "var(--sun-ink)" }}>
                {PRINCIPLE_ICONS[i] ?? "check_circle"}
              </Msi>
              <h3
                style={{
                  margin: "14px 0 0",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--ink)",
                }}
              >
                {p.t}
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 14.5,
                  lineHeight: 1.58,
                  color: "var(--ink-2)",
                }}
              >
                {p.d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
