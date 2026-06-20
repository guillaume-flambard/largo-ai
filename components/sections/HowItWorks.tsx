import { SectionHeader } from "../SectionHeader";
import { Step } from "../Step";
import { Reveal } from "../motion/Reveal";
import type { Marketing } from "@/lib/marketing";

export function HowItWorks({ copy }: { copy: Marketing["how"] }) {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "var(--section-y) var(--gutter)",
        }}
      >
        <Reveal>
          <SectionHeader eyebrow={copy.kicker} title={copy.title} />
        </Reveal>
        <Reveal
          as="div"
          stagger={0.12}
          className="grid-steps"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            marginTop: 56,
          }}
        >
          {copy.steps.map((s, i) => (
            <Step key={s.t} number={i + 1} title={s.t} last={i === copy.steps.length - 1}>
              {s.d}
            </Step>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
