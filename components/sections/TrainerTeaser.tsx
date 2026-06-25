import { LocaleLink } from "../LocaleLink";
import { Reveal } from "../motion/Reveal";
import { Msi, Kicker } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Le formateur (refonte SaaS). Carte Guillaume (avatar GF) +
 *  méthode en 3 principes. */
const ICONS = ["translate", "target", "trending_up"];

export function TrainerTeaser({ copy }: { copy: Marketing["trainer"] }) {
  const { statusLabel, quote } = copy;

  return (
    <section id="formateur" style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 24px" }}>
      <div
        className="lg-col2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* carte formateur */}
        <Reveal
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            borderRadius: 20,
            padding: 32,
            boxShadow: "var(--shadow-card)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -80,
              right: -40,
              width: 260,
              height: 200,
              background: "radial-gradient(closest-side,var(--sun-2),transparent 72%)",
              opacity: 0.14,
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 18,
                background: "linear-gradient(150deg,var(--sun),var(--sun-deep))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 30,
                color: "var(--on-sun)",
                boxShadow: "var(--glow-sun)",
                flexShrink: 0,
              }}
            >
              GF
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                {copy.name}
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 3 }}>
                {copy.role}
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "var(--sun-ink)",
                }}
              >
                <span
                  aria-hidden
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ok)" }}
                />
                {statusLabel}
              </div>
            </div>
          </div>
          <p
            style={{
              position: "relative",
              margin: "22px 0 0",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            {quote}
          </p>
        </Reveal>

        {/* méthode en 3 principes */}
        <Reveal>
          <Kicker>{copy.kicker}</Kicker>
          <h2
            style={{
              margin: "14px 0 28px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(28px,3.4vw,42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {copy.title}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {copy.principles.map((p, i) => (
              <div
                key={p.t}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "18px 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom:
                    i === copy.principles.length - 1 ? "1px solid var(--line)" : undefined,
                }}
              >
                <Msi size={24} style={{ color: "var(--sun-ink)", flexShrink: 0 }}>
                  {ICONS[i] ?? "check_circle"}
                </Msi>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "var(--ink)",
                    }}
                  >
                    {p.t}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 3 }}>
                    {p.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <LocaleLink
            href="/a-propos"
            className="lg-link-soft"
            style={{
              marginTop: 26,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            {copy.cta}
            <Msi size={19}>arrow_forward</Msi>
          </LocaleLink>
        </Reveal>
      </div>
    </section>
  );
}
