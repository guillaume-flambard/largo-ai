import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

// Next.js 16 renames Middleware to Proxy: file `proxy.ts`, exported `proxy()`.
// Redirige toute route sans locale vers la locale par défaut (/  -> /fr).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Exclut les routes API (dont /api/auth/*), les fichiers internes Next.js,
  // et les assets/metadata servis à la racine.
  matcher: [
    "/((?!api|_next/static|_next/image|_next|icon.svg|opengraph-image|brand|favicon.ico).*)",
  ],
};
