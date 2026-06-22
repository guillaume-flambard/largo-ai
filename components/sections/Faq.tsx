import { Reveal } from "../motion/Reveal";
import { Kicker } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — FAQ (refonte SaaS). Accordéon natif <details> en cartes. */
export function Faq({ copy }: { copy: Marketing["faq"] }) {
  return (
    <section style={{ borderTop: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "96px 24px" }}>
        <Reveal style={{ marginBottom: 44 }}>
          <Kicker>{copy.kicker}</Kicker>
          <h2
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(30px,3.8vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {copy.title}
          </h2>
        </Reveal>
        <Reveal as="div" stagger={0.08} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {copy.items.map((it) => (
            <details
              key={it.q}
              open={it.open}
              className="lg-detail"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                borderRadius: 14,
                padding: "0 20px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "18px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  alignItems: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "var(--ink)",
                }}
              >
                {it.q}
                <span
                  className="msi lg-detail__chevron"
                  style={{ fontSize: 22, color: "var(--sun-ink)", display: "inline-block" }}
                >
                  expand_more
                </span>
              </summary>
              <p
                style={{
                  margin: 0,
                  padding: "0 0 20px",
                  fontSize: 15,
                  lineHeight: 1.62,
                  color: "var(--ink-2)",
                }}
              >
                {it.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
