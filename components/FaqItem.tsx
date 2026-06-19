import type { ReactNode } from "react";

/**
 * Largo IA — FAQ accordion item.
 * Native <details>/<summary> for accessibility (keyboard, no JS needed).
 */
export function FaqItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      style={{ borderBottom: "1px solid var(--border-subtle)", padding: "4px 0" }}
    >
      <summary
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "22px 4px",
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h4)",
          fontWeight: "var(--fw-medium)",
          color: "var(--ink)",
          letterSpacing: "var(--ls-snug)",
        }}
      >
        {question}
        <span className="faq-chevron" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div
        style={{
          padding: "0 4px 24px",
          fontSize: "var(--fs-body)",
          color: "var(--muted)",
          lineHeight: "var(--lh-normal)",
          maxWidth: "60ch",
        }}
      >
        {children}
      </div>
    </details>
  );
}
