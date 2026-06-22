import { Reveal } from "../motion/Reveal";
import { Msi, SaasHeading } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Atouts (refonte SaaS). 4 cartes : tuile d'icône + titre + texte. */
const ICONS = ["videocam", "bolt", "verified_user", "diversity_3"];

export function Atouts({ copy }: { copy: Marketing["atouts"] }) {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 24px" }}>
      <Reveal>
        <SaasHeading kicker={copy.kicker} title={copy.title} subtitle={copy.subtitle} />
      </Reveal>

      <Reveal
        as="div"
        stagger={0.1}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))",
          gap: 18,
        }}
      >
        {copy.items.map((it, i) => (
          <div
            key={it.t}
            className="lg-card"
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              borderRadius: 16,
              padding: 26,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                background: "var(--sun-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--sun-ink)",
              }}
            >
              <Msi size={23}>{ICONS[i] ?? "check_circle"}</Msi>
            </div>
            <h3
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              {it.t}
            </h3>
            <p
              style={{
                margin: "9px 0 0",
                fontSize: 14.5,
                lineHeight: 1.58,
                color: "var(--ink-2)",
              }}
            >
              {it.d}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
