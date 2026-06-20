"use client";

import { useRole } from "./RoleContext";

/** Bascule « mode formateur » : révèle les zones <Formateur> (et, à terme, le
 *  module MF). Le libellé vient du dictionnaire (server → prop). */
export function RoleToggle({ label }: { label: string }) {
  const { formateur, toggle } = useRole();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={formateur}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${formateur ? "var(--ink)" : "var(--line-strong)"}`,
        background: formateur ? "var(--ink)" : "transparent",
        color: formateur ? "var(--paper-on-ink)" : "var(--ink)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-sm)",
        fontWeight: "var(--fw-semibold)",
        cursor: "pointer",
        transition: "all var(--dur) var(--ease-out)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: formateur ? "var(--sun)" : "var(--line-strong)",
        }}
      />
      {label}
    </button>
  );
}
