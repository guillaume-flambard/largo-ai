import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
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
import { SITE_URL } from "@/lib/site";

// Refonte « SaaS moderne » : Space Grotesk pour les titres, Geist pour le corps,
// Geist Mono pour les kickers/labels techniques.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
const fontVars = `${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable}`;

// Script anti-flash : applique data-theme depuis localStorage avant la 1re peinture.
const themeScript = `(function(){try{var t=localStorage.getItem('largo_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

const siteUrl = SITE_URL;

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
    <html lang={locale} className={fontVars} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&display=block"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <RoleProvider>
          <ProgressSync authed={!!user} serverEntries={serverEntries} />
          <BookingProvider locale={locale}>
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
