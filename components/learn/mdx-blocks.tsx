import type { CSSProperties, ReactNode } from "react";

/** Coque commune des encarts pédagogiques. Filets pleins + libellé ocre-texte
 *  (jamais de side-stripe ni d'ombre+bordure cumulées). */
function Callout({
  label,
  children,
  background = "var(--paper-2)",
  border = "var(--line)",
  labelColor = "var(--sun-ink)",
}: {
  label: string;
  children: ReactNode;
  background?: CSSProperties["background"];
  border?: string;
  labelColor?: string;
}) {
  return (
    <div
      style={{
        background,
        border: `1px solid ${border}`,
        borderRadius: "var(--radius-md)",
        padding: "clamp(16px, 3vw, 24px)",
        margin: "28px 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-sm)",
          fontWeight: "var(--fw-semibold)",
          letterSpacing: "var(--ls-snug)",
          color: labelColor,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
        {children}
      </div>
    </div>
  );
}

export function Idee({ children }: { children: ReactNode }) {
  return <Callout label="Idée clé">{children}</Callout>;
}

export function Exemple({ children }: { children: ReactNode }) {
  return <Callout label="Exemple">{children}</Callout>;
}

export function Exercice({ children }: { children: ReactNode }) {
  return (
    <Callout label="Exercice" background="var(--sun-wash)" border="#f0dcc0">
      {children}
    </Callout>
  );
}

export function Attention({ children }: { children: ReactNode }) {
  return (
    <Callout label="Attention" border="var(--line-strong)" labelColor="var(--ink)">
      {children}
    </Callout>
  );
}
