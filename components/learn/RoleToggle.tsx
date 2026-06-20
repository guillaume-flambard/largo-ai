"use client";

import { useRole } from "./RoleContext";

/** Bascule « mode formateur » : révèle les zones <Formateur> et le module MF.
 *  `tone` adapte les couleurs au fond (clair par défaut, « dark » pour le footer).
 *  Le libellé vient du serveur (dictionnaire/copie) → prop. */
export function RoleToggle({
  label,
  stateOn = "activé",
  stateOff = "désactivé",
  tone = "light",
}: {
  label: string;
  stateOn?: string;
  stateOff?: string;
  tone?: "light" | "dark";
}) {
  const { formateur, toggle } = useRole();

  const palette =
    tone === "dark"
      ? {
          onBorder: "var(--sun)",
          offBorder: "var(--line-on-ink)",
          onBg: "var(--sun)",
          onColor: "var(--ink)",
          offColor: "var(--paper-on-ink)",
          offDot: "var(--paper-on-ink-muted)",
        }
      : {
          onBorder: "var(--ink)",
          offBorder: "var(--line-strong)",
          onBg: "var(--ink)",
          onColor: "var(--paper-on-ink)",
          offColor: "var(--ink)",
          offDot: "var(--line-strong)",
        };

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
        border: `1px solid ${formateur ? palette.onBorder : palette.offBorder}`,
        background: formateur ? palette.onBg : "transparent",
        color: formateur ? palette.onColor : palette.offColor,
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
          background: formateur ? "var(--sun)" : palette.offDot,
        }}
      />
      {label}
      <span style={{ opacity: 0.7, fontWeight: "var(--fw-regular)" }}>
        · {formateur ? stateOn : stateOff}
      </span>
    </button>
  );
}
