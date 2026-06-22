import { Reveal } from "../motion/Reveal";
import { SaasHeading } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Comment ça marche (refonte SaaS). 4 étapes numérotées,
 *  reliées par un filet pointillé. */
export function HowItWorks({ copy }: { copy: Marketing["how"] }) {
  return (
    <section style={{ borderTop: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 24px" }}>
        <Reveal>
          <SaasHeading kicker={copy.kicker} title={copy.title} />
        </Reveal>
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 28,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 24,
              height: 1,
              background:
                "repeating-linear-gradient(90deg,var(--line-2) 0 6px,transparent 6px 12px)",
              pointerEvents: "none",
            }}
          />
          {copy.steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08} style={{ position: "relative" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--line-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "var(--sun-ink)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  margin: "18px 0 0",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 14,
                  lineHeight: 1.56,
                  color: "var(--ink-2)",
                }}
              >
                {s.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
