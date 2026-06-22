"use client";

import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n";

/** Bascule FR/EN (refonte SaaS — pastille). Remplace le segment de locale dans
 *  le chemin courant. Le rendu est une pastille FR | EN ; la logique de bascule
 *  est inchangée. */
export function LanguageSwitcher({ className }: { className?: string }) {
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
    <div role="group" aria-label="Langue" className={`lg-lang-pill ${className ?? ""}`.trim()}>
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => swapTo(loc)}
          aria-current={loc === current ? "true" : undefined}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
