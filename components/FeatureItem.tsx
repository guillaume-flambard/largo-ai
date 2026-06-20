import type { ReactNode } from "react";

type Tone = "teal" | "green" | "amber" | "navy";

const tiles: Record<Tone, { bg: string; fg: string }> = {
  teal: { bg: "var(--surface-tint-teal)", fg: "var(--teal-dark)" },
  green: { bg: "var(--surface-tint-green)", fg: "var(--green-dark)" },
  amber: { bg: "var(--surface-tint-amber)", fg: "var(--amber-dark)" },
  navy: { bg: "rgba(10,37,64,0.06)", fg: "var(--navy)" },
};

/** Largo IA — Feature item (icon tile + title + text). Used for the "4 atouts" row. */
export function FeatureItem({
  icon,
  title,
  children,
  tone = "teal",
}: {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
  tone?: Tone;
}) {
  const t = tiles[tone];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "52px",
          height: "52px",
          borderRadius: "var(--radius-md)",
          background: t.bg,
          color: t.fg,
        }}
      >
        {icon}
      </span>
      <h4
        style={{
          fontSize: "var(--fs-h4)",
          fontWeight: "var(--fw-bold)",
          color: "var(--navy)",
          letterSpacing: "var(--ls-snug)",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "var(--fs-body)",
          color: "var(--muted)",
          lineHeight: "var(--lh-normal)",
        }}
      >
        {children}
      </p>
    </div>
  );
}
