import { Reveal } from "../motion/Reveal";
import { SaasHeading, CONTAINER } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — TechStack (AI-First pivot §7). Categories of tools taught,
 *  rendered as editorial rows with mono tags. */
export function TechStack({ copy }: { copy: Marketing["tech"] }) {
  return (
    <section
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

      <Reveal as="div" stagger={0.08}>
        {copy.categories.map((cat) => (
          <div
            key={cat.name}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingBottom: 40,
              marginBottom: 40,
              borderBottom: "1px solid var(--line)",
            }}
          >
            {/* Category name */}
            <h3
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "-0.01em",
                color: "var(--sun-ink)",
              }}
            >
              {cat.name}
            </h3>

            {/* Items as Geist Mono chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {cat.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 11.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 7,
                    padding: "5px 11px",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      {/* Closing note */}
      <Reveal>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 26,
              height: 2,
              borderRadius: 2,
              background:
                "linear-gradient(90deg,var(--sun),var(--sun-2))",
              flexShrink: 0,
            }}
          />
          {copy.note}
        </p>
      </Reveal>
    </section>
  );
}
