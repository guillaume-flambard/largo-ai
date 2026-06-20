"use client";

import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n";

/** Bascule FR/EN : remplace le segment de locale dans le chemin courant. */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const seg = pathname.split("/")[1] ?? "";
  const current = isLocale(seg) ? seg : DEFAULT_LOCALE;

  function swapTo(loc: string) {
    if (loc === current) return;
    const parts = pathname.split("/");
    if (isLocale(parts[1] ?? "")) parts[1] = loc;
    else parts.splice(1, 0, loc);
    router.push(parts.join("/") || `/${loc}`);
  }

  return (
    <div
      role="group"
      aria-label="Langue"
      style={{ display: "inline-flex", alignItems: "center", gap: 2 }}
    >
      {LOCALES.map((loc, i) => (
        <span key={loc} style={{ display: "inline-flex", alignItems: "center" }}>
          {i > 0 && (
            <span aria-hidden style={{ color: "var(--line-strong)", margin: "0 4px" }}>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => swapTo(loc)}
            aria-current={loc === current ? "true" : undefined}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 2px",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-sm)",
              fontWeight: loc === current ? "var(--fw-semibold)" : "var(--fw-medium)",
              color: loc === current ? "var(--ink)" : "var(--muted-ink)",
            }}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
