import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";
import type { Marketing } from "@/lib/marketing";

export function Atouts({ copy }: { copy: Marketing["atouts"] }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <SectionHeader
            align="left"
            eyebrow={copy.kicker}
            title={copy.title}
            subtitle={copy.subtitle}
          />
        </Reveal>

        <Reveal as="div" stagger={0.1} className="rows">
          {copy.items.map((it, i) => (
            <div className="row" key={it.t}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="row__index">{String(i + 1).padStart(2, "0")}</span>
                <h3
                  style={{
                    fontSize: "var(--fs-h3)",
                    fontWeight: "var(--fw-regular)",
                    letterSpacing: "var(--ls-tight)",
                    lineHeight: "var(--lh-snug)",
                  }}
                >
                  {it.t}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--fs-lead)",
                  color: "var(--ink-soft)",
                  lineHeight: "var(--lh-relaxed)",
                  maxWidth: "54ch",
                }}
              >
                {it.d}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
