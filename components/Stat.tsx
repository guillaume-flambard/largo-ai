/** Largo IA — Stat / proof figure (e.g. "100 % visio"). */
export function Stat({
  value,
  label,
  accent = false,
  align = "left",
}: {
  value: string;
  label: string;
  accent?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h2)",
          fontWeight: "var(--fw-extrabold)",
          letterSpacing: "var(--ls-tight)",
          lineHeight: 1,
          color: accent ? "var(--teal-dark)" : "var(--navy)",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "var(--fs-sm)",
          fontWeight: "var(--fw-medium)",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
