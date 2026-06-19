import type { ReactNode } from "react";

type BadgeTone = "sun" | "ink" | "neutral";

const tones: Record<BadgeTone, { bg: string; fg: string; dot: string }> = {
  sun: { bg: "var(--sun)", fg: "var(--ink)", dot: "var(--ink)" },
  ink: { bg: "var(--ink)", fg: "var(--paper-on-ink)", dot: "var(--sun)" },
  neutral: { bg: "var(--paper-2)", fg: "var(--ink-soft)", dot: "var(--sun)" },
};

/** Largo IA — Badge / pill label. Sentence-case, no tracked caps. */
export function Badge({
  children,
  tone = "sun",
  dot = false,
  icon,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  icon?: ReactNode;
}) {
  const t = tones[tone] ?? tones.sun;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 14px",
        background: t.bg,
        color: t.fg,
        fontSize: "var(--fs-xs)",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "var(--ls-snug)",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1.1,
        whiteSpace: "nowrap",
      }}
    >
      {dot && (
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "999px",
            background: t.dot,
            flex: "0 0 auto",
          }}
        />
      )}
      {icon}
      {children}
    </span>
  );
}
