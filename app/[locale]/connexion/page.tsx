import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { signIn } from "@/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

export default async function ConnexionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageCopy(locale as Locale).auth;

  async function withProvider(provider: "google" | "microsoft-entra-id") {
    "use server";
    await signIn(provider, { redirectTo: `/${locale}/mon-espace` });
  }

  return (
    <>
      <PageHero eyebrow={t.signIn} title={t.pageTitle} subtitle={t.pageSubtitle} />
      <section className="section">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 420,
          }}
        >
          <form action={withProvider.bind(null, "google")}>
            <button
              className="card"
              style={{
                width: "100%",
                padding: "14px 18px",
                cursor: "pointer",
                fontWeight: "var(--fw-semibold)",
              }}
            >
              {t.withGoogle}
            </button>
          </form>
          <form action={withProvider.bind(null, "microsoft-entra-id")}>
            <button
              className="card"
              style={{
                width: "100%",
                padding: "14px 18px",
                cursor: "pointer",
                fontWeight: "var(--fw-semibold)",
              }}
            >
              {t.withMicrosoft}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
