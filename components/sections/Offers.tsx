import { OfferCard } from "../OfferCard";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import type { Marketing } from "@/lib/marketing";

export function Offers({ copy }: { copy: Marketing["offers"] }) {
  return (
    <section id="offres" style={{ background: "var(--bg-soft)" }}>
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "var(--section-y) var(--gutter)",
        }}
      >
        <Reveal>
          <SectionHeader eyebrow={copy.kicker} title={copy.title} subtitle={copy.subtitle} />
        </Reveal>
        <Reveal
          as="div"
          stagger={0.14}
          className="grid-offers"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            alignItems: "start",
            marginTop: 56,
          }}
        >
          {copy.items.map((o) => (
            <TiltCard key={o.name} max={5}>
              <OfferCard
                name={o.name}
                format={o.format}
                price={o.price}
                priceNote={o.priceNote}
                audience={o.audience}
                benefits={o.benefits}
                ctaLabel={o.ctaLabel}
                ctaHref={o.ctaHref}
                featured={o.featured}
                badgeLabel={o.badge}
              />
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
