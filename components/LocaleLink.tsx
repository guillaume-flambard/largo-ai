"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

/** <Link> qui préfixe automatiquement les chemins internes par la locale courante
 *  (déduite de l'URL). `/programme` → `/fr/programme`. Les liens externes,
 *  ancres et mailto passent inchangés. */
export function LocaleLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  const seg = pathname.split("/")[1] ?? "";
  const locale = (LOCALES as readonly string[]).includes(seg)
    ? seg
    : DEFAULT_LOCALE;

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const finalHref = isInternal
    ? href === "/"
      ? `/${locale}`
      : `/${locale}${href}`
    : href;

  return <Link href={finalHref} {...props} />;
}
