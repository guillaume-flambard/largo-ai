import { Badge } from "./Badge";
import { Button } from "./Button";

/**
 * Largo IA — Offer / pricing column. Flat, thin rule; emphasis on the
 * featured plan comes from an ink-drenched surface, not a bigger shadow.
 */
export function OfferCard({
  name,
  format,
  price,
  priceNote,
  audience,
  benefits = [],
  ctaLabel = "Réserver un appel",
  ctaHref = "#contact",
  featured = false,
  badgeLabel = "Le plus choisi",
}: {
  name: string;
  format?: string;
  price: string;
  priceNote?: string;
  audience?: string;
  benefits?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featured?: boolean;
  badgeLabel?: string;
}) {
  const heading = featured ? "var(--paper-on-ink)" : "var(--ink)";
  const muted = featured ? "var(--paper-on-ink-muted)" : "var(--muted-ink)";
  const body = featured ? "var(--paper-on-ink)" : "var(--ink-soft)";
  const accent = featured ? "var(--sun)" : "var(--sun-deep)";

  return (
    <div className={featured ? "offer offer--featured" : "offer"}>
      {featured && (
        <div style={{ position: "absolute", top: "-13px", left: "28px" }}>
          <Badge tone="sun" dot>
            {badgeLabel}
          </Badge>
        </div>
      )}

      <h3
        style={{
          fontSize: "var(--fs-h3)",
          fontWeight: "var(--fw-medium)",
          letterSpacing: "var(--ls-tight)",
          color: heading,
          marginBottom: "6px",
        }}
      >
        {name}
      </h3>
      {format && (
        <p style={{ fontSize: "var(--fs-sm)", color: muted, marginBottom: "24px" }}>
          {format}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
        <span
          className="offer__price"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h2)",
            fontWeight: "var(--fw-light)",
            letterSpacing: "var(--ls-display)",
            color: heading,
          }}
        >
          {price}
        </span>
      </div>
      {priceNote && (
        <p style={{ fontSize: "var(--fs-sm)", color: muted, marginBottom: "22px" }}>
          {priceNote}
        </p>
      )}

      {audience && (
        <p
          style={{
            fontSize: "var(--fs-sm)",
            fontWeight: "var(--fw-semibold)",
            color: accent,
            marginBottom: "22px",
          }}
        >
          {audience}
        </p>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 28px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {benefits.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              fontSize: "var(--fs-body)",
              color: body,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--sun)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "0 0 auto", marginTop: "3px" }}
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Button variant={featured ? "primary" : "ghost"} href={ctaHref} fullWidth>
        {ctaLabel}
      </Button>
    </div>
  );
}
