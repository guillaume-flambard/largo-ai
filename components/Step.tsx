import type { ReactNode } from "react";

/** Largo IA — Numbered process step. The order carries information here
 *  (a real sequence), so the numeral earns its place — large, light, ample. */
export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: ReactNode;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        paddingTop: "22px",
        borderTop: "1px solid var(--line)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.25rem, 1.6rem + 2vw, 3rem)",
          fontWeight: "var(--fw-thin)",
          letterSpacing: "var(--ls-display)",
          lineHeight: 1,
          color: "var(--sun-deep)",
        }}
      >
        {String(number).padStart(2, "0")}
      </span>
      <h3
        style={{
          fontSize: "var(--fs-h4)",
          fontWeight: "var(--fw-semibold)",
          color: "var(--ink)",
          letterSpacing: "var(--ls-snug)",
          marginTop: 4,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--fs-body)",
          color: "var(--ink-soft)",
          lineHeight: "var(--lh-normal)",
        }}
      >
        {children}
      </p>
    </div>
  );
}
