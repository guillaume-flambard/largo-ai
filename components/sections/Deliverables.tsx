import { Reveal } from "../motion/Reveal";
import { Msi, SaasHeading, CONTAINER } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Deliverables (AI-First pivot §8).
 *  4 livrables opérationnels : playbook, templates, checklist, politique IA.
 *  Layout : CONTAINER 1180 · 2-col editorial grid at lg · ocre icon tiles. */

const ICONS = ["menu_book", "tune", "checklist", "policy"] as const;

export function Deliverables({ copy }: { copy: Marketing["deliverables"] }) {
  return (
    <section
      style={{
        background: "var(--bg-2)",
      }}
    >
      <div
        style={{
          maxWidth: CONTAINER,
          margin: "0 auto",
          padding: "96px 24px",
        }}
      >
        <Reveal>
          <SaasHeading
            kicker={copy.kicker}
            title={copy.title}
            subtitle={copy.subtitle}
          />
        </Reveal>

        <Reveal
          as="div"
          stagger={0.09}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 18,
          }}
        >
          {copy.items.map((item, i) => (
            <div
              key={item.t}
              className="lg-card"
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                borderRadius: 16,
                padding: 28,
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Icon tile */}
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
                  flexShrink: 0,
                }}
              >
                <Msi size={23}>{ICONS[i] ?? "check_circle"}</Msi>
              </div>

              {/* Title */}
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
                {item.t}
              </h3>

              {/* Description */}
              <p
                style={{
                  margin: "9px 0 0",
                  fontSize: 14.5,
                  lineHeight: 1.58,
                  color: "var(--ink-2)",
                }}
              >
                {item.d}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
