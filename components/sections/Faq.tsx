import { FaqItem } from "../FaqItem";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";
import type { Marketing } from "@/lib/marketing";

export function Faq({ copy }: { copy: Marketing["faq"] }) {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: "var(--container-narrow)",
          margin: "0 auto",
          padding: "var(--section-y) var(--gutter)",
        }}
      >
        <Reveal style={{ marginBottom: 40 }}>
          <SectionHeader eyebrow={copy.kicker} title={copy.title} />
        </Reveal>
        <Reveal as="div" stagger={0.08}>
          {copy.items.map((it) => (
            <FaqItem key={it.q} question={it.q} defaultOpen={it.open}>
              {it.a}
            </FaqItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
