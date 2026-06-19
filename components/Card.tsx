import type { CSSProperties, ReactNode } from "react";

/** Largo IA — Card surface. Soft navy-tinted shadow, 20px radius, gentle hover lift. */
export function Card({
  children,
  padding = "28px",
  hover = true,
  dark = false,
  style = {},
}: {
  children: ReactNode;
  padding?: string;
  hover?: boolean;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={hover ? "card card--hover" : "card"}
      style={{
        padding,
        ...(dark
          ? {
              background: "var(--surface-dark)",
              color: "var(--text-on-dark)",
              border: "1px solid rgba(255,255,255,0.10)",
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
