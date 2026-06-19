import type { InputHTMLAttributes, ReactNode } from "react";

/** Largo IA — Input / textarea field with label. Teal focus ring. */
export function Input({
  label,
  id,
  as = "input",
  hint,
  required = false,
  ...rest
}: {
  label?: ReactNode;
  id?: string;
  as?: "input" | "textarea";
  hint?: ReactNode;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>) {
  const className = `field ${as === "textarea" ? "field--textarea" : "field--input"}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "var(--fs-sm)",
            fontWeight: "var(--fw-semibold)",
            color: "var(--navy)",
          }}
        >
          {label}
          {required && <span style={{ color: "var(--green-dark)" }}> *</span>}
        </label>
      )}
      {as === "textarea" ? (
        <textarea id={id} className={className} required={required} {...rest} />
      ) : (
        <input id={id} className={className} required={required} {...rest} />
      )}
      {hint && (
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--muted)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}
