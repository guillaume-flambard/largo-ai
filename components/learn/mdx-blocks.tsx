import type { CSSProperties, ReactNode } from "react";
import { Msi } from "@/components/sections/saas-ui";

/** Coque commune des encarts pédagogiques (refonte SaaS).
 *  Carte arrondie : icône + libellé en tête, corps en dessous. */
function Callout({
  label,
  icon,
  children,
  background = "var(--surface-2)",
  border = "var(--line)",
  borderLeft,
  labelColor = "var(--sun-ink)",
  iconColor,
}: {
  label: string;
  icon: string;
  children: ReactNode;
  background?: CSSProperties["background"];
  border?: string;
  borderLeft?: string;
  labelColor?: string;
  iconColor?: string;
}) {
  return (
    <div
      style={{
        margin: "24px 0",
        borderRadius: 14,
        background,
        border: `1px solid ${border}`,
        ...(borderLeft ? { borderLeft } : null),
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          font: "600 13px var(--font-display)",
          color: labelColor,
          marginBottom: 8,
        }}
      >
        <Msi size={20} style={iconColor ? { color: iconColor } : undefined}>
          {icon}
        </Msi>
        {label}
      </div>
      <div style={{ color: "var(--ink-2)", lineHeight: 1.66, fontSize: 15.5 }}>
        {children}
      </div>
    </div>
  );
}

export function Idee({ children }: { children: ReactNode }) {
  return (
    <Callout
      label="L'idée à retenir"
      icon="lightbulb"
      background="var(--sun-soft)"
      border="var(--sun)"
      borderLeft="4px solid var(--sun)"
      labelColor="var(--sun-ink)"
    >
      {children}
    </Callout>
  );
}

export function Exemple({ children }: { children: ReactNode }) {
  return (
    <Callout
      label="Exemple"
      icon="draft"
      background="var(--surface-2)"
      border="var(--line)"
      labelColor="var(--ink-2)"
      iconColor="var(--ink-2)"
    >
      {children}
    </Callout>
  );
}

export function Exercice({ children }: { children: ReactNode }) {
  return (
    <Callout
      label="À votre tour"
      icon="fitness_center"
      background="var(--surface-3)"
      border="var(--line-2)"
      labelColor="var(--ink)"
      iconColor="var(--sun-ink)"
    >
      {children}
    </Callout>
  );
}

export function Attention({ children }: { children: ReactNode }) {
  return (
    <Callout
      label="Attention"
      icon="warning"
      background="rgba(245,158,11,0.10)"
      border="rgba(245,158,11,0.35)"
      borderLeft="4px solid #f59e0b"
      labelColor="var(--sun-ink)"
      iconColor="var(--sun-ink)"
    >
      {children}
    </Callout>
  );
}
