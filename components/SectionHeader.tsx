import type { ReactNode } from "react";

/** Largo IA — Section header. A restrained kicker (ocre rule + sentence-case
 *  label, never an uppercase tracked eyebrow), a light ample heading, and an
 *  optional lead. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        maxWidth: align === "center" ? "760px" : "680px",
        marginInline: align === "center" ? "auto" : 0,
      }}
    >
      {eyebrow && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "var(--fs-sm)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--ls-snug)",
            color: dark ? "var(--sun)" : "var(--sun-ink)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: "28px",
              height: "2px",
              borderRadius: "2px",
              background: "var(--sun)",
            }}
          />
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          fontSize: "var(--fs-h2)",
          fontWeight: "var(--fw-light)",
          letterSpacing: "var(--ls-display)",
          lineHeight: "var(--lh-snug)",
          color: dark ? "var(--paper-on-ink)" : "var(--ink)",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "var(--fs-lead)",
            lineHeight: "var(--lh-relaxed)",
            color: dark ? "var(--paper-on-ink-muted)" : "var(--ink-soft)",
            maxWidth: "58ch",
            textWrap: "pretty",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
