import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import { BookingProvider } from "@/components/BookingContext";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { RoleProvider } from "@/components/learn/RoleContext";
import { LOCALES, isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getMarketing } from "@/lib/marketing";
import { getPageCopy } from "@/lib/pages";
import { getSessionUser } from "@/lib/auth/session";
import { getMyProgress } from "@/lib/learn/progress-server";
import { ProgressSync } from "@/components/learn/ProgressSync";
import { ImportBanner } from "@/components/learn/ImportBanner";

// One characterful family, exploited across the full weight range
// (200 → 800) for strong contrast. Variable axis loaded in full.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://largo-ia.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Largo IA — Prenez le large avec l'IA",
    template: "%s · Largo IA",
  },
  description:
    "Formez vos dirigeants et vos équipes à l'IA générative, en visio, sans jargon. Des résultats concrets dès la première semaine — conforme à l'AI Act et au RGPD.",
  keywords: [
    "formation IA",
    "intelligence artificielle",
    "TPE",
    "PME",
    "IA générative",
    "AI Act",
    "formation visio",
  ],
  authors: [{ name: "Guillaume Flambard" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Largo IA",
    title: "Largo IA — Prenez le large avec l'IA",
    description:
      "Formation à l'IA générative pour les TPE et PME françaises. 100 % en visio, sans jargon, conforme à l'AI Act.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Largo IA — Prenez le large avec l'IA",
    description:
      "Formation à l'IA générative pour les TPE et PME françaises. 100 % en visio, sans jargon.",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const m = getMarketing(locale);
  const pageCopy = getPageCopy(locale);
  const user = await getSessionUser();
  const serverEntries = user ? await getMyProgress() : [];

  return (
    <html lang={locale} className={bricolage.variable}>
      <body>
        <RoleProvider>
          <ProgressSync authed={!!user} serverEntries={serverEntries} />
          <BookingProvider>
            <SiteHeader
              nav={dict.nav}
              auth={pageCopy.auth}
              user={user ? { name: user.name, image: user.image } : null}
              accountSlot={user ? <SignOutButton label={pageCopy.auth.signOut} /> : undefined}
            />
            <main>
              {user && (
                <ImportBanner
                  serverEntries={serverEntries}
                  copy={{
                    importPrompt: pageCopy.auth.importPrompt,
                    importCta: pageCopy.auth.importCta,
                    importDismiss: pageCopy.auth.importDismiss,
                  }}
                />
              )}
              {children}
            </main>
            <SiteFooter copy={m.footer} formateur={pageCopy.formateur} />
          </BookingProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
