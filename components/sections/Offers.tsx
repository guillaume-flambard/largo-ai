import { ReserveButton } from "../ReserveButton";
import { Reveal } from "../motion/Reveal";
import { Msi, SaasHeading } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

type Offer = Marketing["offers"]["items"][number];

/** Largo IA — Formats + prix (refonte SaaS). 3 cartes ; celle du milieu
 *  est « featured » (fond ink sombre + badge « Le plus choisi »). */
export function Offers({ copy }: { copy: Marketing["offers"] }) {
  return (
    <section id="offres" style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 24px" }}>
      <Reveal>
        <SaasHeading kicker={copy.kicker} title={copy.title} subtitle={copy.subtitle} />
      </Reveal>
      <Reveal
        as="div"
        stagger={0.12}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 18,
          alignItems: "start",
        }}
      >
        {copy.items.map((o) =>
          o.featured ? (
            <FeaturedCard key={o.name} offer={o} />
          ) : (
            <PlainCard key={o.name} offer={o} />
          ),
        )}
      </Reveal>
    </section>
  );
}

const cardBase = {
  borderRadius: 18,
  padding: 28,
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
};

function PlainCard({ offer }: { offer: Offer }) {
  return (
    <div
      className="lg-card"
      style={{
        ...cardBase,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}
      >
        {offer.format}
      </div>
      <h3
        style={{
          margin: "10px 0 0",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 21,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
        }}
      >
        {offer.name}
      </h3>
      <div style={{ margin: "16px 0", display: "flex", alignItems: "baseline", gap: 7 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 34,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
          }}
        >
          {offer.price}
        </span>
        {offer.priceNote && (
          <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{offer.priceNote}</span>
        )}
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: "var(--sun-ink)",
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        {offer.audience}
      </div>
      <div style={{ height: 1, background: "var(--line)", marginBottom: 18 }} />
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 11,
          flex: 1,
        }}
      >
        {offer.benefits.map((b) => (
          <li
            key={b}
            style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--ink-2)" }}
          >
            <Msi size={19} style={{ color: "var(--sun-ink)", flexShrink: 0 }}>
              check_circle
            </Msi>
            {b}
          </li>
        ))}
      </ul>
      <ReserveButton
        className="lg-quiet-btn"
        style={{
          marginTop: 24,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: 12,
          borderRadius: 10,
          background: "var(--surface)",
          color: "var(--ink)",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: 14.5,
          border: "1px solid var(--line-2)",
        }}
      >
        {offer.ctaLabel ?? offer.name}
      </ReserveButton>
    </div>
  );
}

function FeaturedCard({ offer }: { offer: Offer }) {
  return (
    <div
      style={{
        ...cardBase,
        position: "relative",
        border: "1px solid #20283A",
        background: "#0A0C12",
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -90,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          height: 240,
          background: "radial-gradient(closest-side,var(--sun-2),transparent 70%)",
          opacity: 0.28,
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#8B94A8",
          }}
        >
          {offer.format}
        </div>
        {offer.badge && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 10.5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--on-sun)",
              background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
              padding: "4px 9px",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            {offer.badge}
          </span>
        )}
      </div>
      <h3
        style={{
          position: "relative",
          margin: "10px 0 0",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 21,
          letterSpacing: "-0.02em",
          color: "#F1F3F8",
        }}
      >
        {offer.name}
      </h3>
      <div
        style={{
          position: "relative",
          margin: "16px 0",
          display: "flex",
          alignItems: "baseline",
          gap: 7,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 34,
            letterSpacing: "-0.03em",
            color: "#fff",
          }}
        >
          {offer.price}
        </span>
        {offer.priceNote && (
          <span style={{ fontSize: 13, color: "#8B94A8" }}>{offer.priceNote}</span>
        )}
      </div>
      <div
        style={{
          position: "relative",
          fontSize: 13.5,
          color: "#FFB256",
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        {offer.audience}
      </div>
      <div
        style={{
          position: "relative",
          height: 1,
          background: "rgba(255,255,255,0.1)",
          marginBottom: 18,
        }}
      />
      <ul
        style={{
          position: "relative",
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 11,
          flex: 1,
        }}
      >
        {offer.benefits.map((b) => (
          <li key={b} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "#C4CBD9" }}>
            <Msi size={19} style={{ color: "#FF9A2E", flexShrink: 0 }}>
              check_circle
            </Msi>
            {b}
          </li>
        ))}
      </ul>
      <ReserveButton
        className="lg-sun-btn"
        style={{
          position: "relative",
          marginTop: 24,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: 12,
          borderRadius: 10,
          background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
          color: "var(--on-sun)",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: 14.5,
          border: "1px solid var(--sun-deep)",
          boxShadow: "var(--glow-sun)",
        }}
        iconRight={<Msi size={18}>arrow_forward</Msi>}
      >
        {offer.ctaLabel ?? offer.name}
      </ReserveButton>
    </div>
  );
}
