import type { CSSProperties, ReactNode } from "react";

/* ============================================================
   SaaS redesign — shared inline-style atoms (Largo IA.dc.html).
   Kept as plain objects/components so both server and client
   sections can reuse the exact design tokens & markup.
   ============================================================ */

/** Gradient "sun" pill — the design's primary CTA styling. */
export const sunPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "14px 22px",
  borderRadius: 11,
  background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
  color: "var(--on-sun)",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 15.5,
  border: "1px solid var(--sun-deep)",
  boxShadow: "var(--glow-sun)",
  cursor: "pointer",
  textDecoration: "none",
  lineHeight: 1,
};

/** Quiet "surface" pill (secondary action on light surfaces). */
export const surfacePill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "14px 20px",
  borderRadius: 11,
  background: "var(--surface)",
  color: "var(--ink)",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 15.5,
  border: "1px solid var(--line-2)",
  cursor: "pointer",
  textDecoration: "none",
  lineHeight: 1,
};

/** Material Symbol glyph. */
export function Msi({
  children,
  size = 20,
  style,
}: {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <span className="msi" style={{ fontSize: size, ...style }}>
      {children}
    </span>
  );
}

/** Kicker: mono uppercase label with a short sun rule. */
export function Kicker({
  children,
  color = "var(--sun-ink)",
  ruleA = "var(--sun)",
  ruleB = "var(--sun-2)",
}: {
  children: ReactNode;
  color?: string;
  ruleA?: string;
  ruleB?: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 26,
          height: 2,
          borderRadius: 2,
          background: `linear-gradient(90deg,${ruleA},${ruleB})`,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

/** Section heading block: kicker + h2 + optional subtitle. */
export function SaasHeading({
  kicker,
  title,
  subtitle,
  maxWidth = 680,
  marginBottom = 54,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  maxWidth?: number;
  marginBottom?: number;
}) {
  return (
    <div style={{ maxWidth, marginBottom }}>
      <Kicker>{kicker}</Kicker>
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
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: "18px 0 0",
            fontSize: 17.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            maxWidth: "34em",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export const CONTAINER = 1180;
