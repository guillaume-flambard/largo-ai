"use client";

import type { ReactNode } from "react";
import { useRole } from "./RoleContext";

/** Zone réservée au formateur (déroulé, timing, questions fréquentes…).
 *  Ne rend rien hors « mode formateur ». */
export function Formateur({ children }: { children: ReactNode }) {
  const { formateur } = useRole();
  if (!formateur) return null;

  return (
    <aside
      style={{
        background: "var(--paper-2)",
        border: "1px solid var(--line-strong)",
        borderRadius: "var(--radius-md)",
        padding: "clamp(18px, 3vw, 26px)",
        margin: "28px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-sm)",
          fontWeight: "var(--fw-semibold)",
          color: "var(--sun-ink)",
          marginBottom: 10,
        }}
      >
        <span aria-hidden style={{ width: 24, height: 2, background: "var(--sun)", borderRadius: 2 }} />
        Pour le formateur
      </div>
      <div style={{ color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
        {children}
      </div>
    </aside>
  );
}
