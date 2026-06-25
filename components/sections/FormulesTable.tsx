import type { Marketing } from "@/lib/marketing";

type FormulesLabels = {
  format: string;
  pourQui: string;
  objectif: string;
};

type Props = {
  items: Marketing["offers"]["items"];
  labels: FormulesLabels;
};

/**
 * Largo IA — Tableau comparatif des 3 formules.
 * Colonnes : une par formule. Lignes : Format / Pour qui / Objectif.
 * Responsive : 3 colonnes sur desktop, blocs empilés sur mobile (≤ 860px).
 */
export function FormulesTable({ items, labels }: Props) {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 64px" }}>
      {/* Desktop: grid 3 columns */}
      <div
        className="lg-formules-table"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          border: "1px solid var(--line)",
          borderRadius: 16,
          overflow: "hidden",
          background: "var(--surface)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Header row: formula names */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {items.map((offer, i) => (
            <div
              key={offer.name}
              style={{
                padding: "16px 20px",
                borderRight: i < items.length - 1 ? "1px solid var(--line)" : undefined,
                background: offer.featured ? "#0A0C12" : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: offer.featured ? "var(--sun)" : "var(--sun-ink)",
                }}
              >
                {offer.badge}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                  color: offer.featured ? "var(--paper-on-ink)" : "var(--ink)",
                  marginTop: 4,
                }}
              >
                {offer.name}
              </div>
            </div>
          ))}
        </div>

        {/* Row: Format */}
        <TableRow label={labels.format} items={items} field="format" />

        {/* Row: Pour qui */}
        <TableRow label={labels.pourQui} items={items} field="pourQui" />

        {/* Row: Objectif */}
        <TableRow label={labels.objectif} items={items} field="objectif" isLast />
      </div>

    </div>
  );
}

type RowField = "format" | "pourQui" | "objectif";

function TableRow({
  label,
  items,
  field,
  isLast,
}: {
  label: string;
  items: Props["items"];
  field: RowField;
  isLast?: boolean;
}) {
  return (
    <div
      className="lg-formules-row"
      style={{
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderBottom: isLast ? undefined : "1px solid var(--line)",
      }}
    >
      {items.map((offer, i) => {
        const value = offer.comparison?.[field] ?? "—";
        return (
          <div
            key={offer.name}
            className="lg-formules-row-cell"
            style={{
              padding: "14px 20px",
              borderRight: i < items.length - 1 ? "1px solid var(--line)" : undefined,
              background: offer.featured ? "#0A0C12" : undefined,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: offer.featured ? "var(--paper-on-ink-muted)" : "var(--ink-3)",
                marginBottom: 4,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: "var(--font-sans)",
                color: offer.featured ? "var(--paper-on-ink-muted)" : "var(--ink-2)",
                lineHeight: 1.4,
              }}
            >
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
