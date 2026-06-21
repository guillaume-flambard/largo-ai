import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { signIn } from "@/auth";
import { devSignIn } from "@/lib/auth/dev-login";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

const IS_DEV = process.env.NODE_ENV !== "production";

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

          {IS_DEV && (
            <form action={devSignIn.bind(null, locale)}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px 18px",
                  marginTop: 8,
                  cursor: "pointer",
                  fontSize: "var(--fs-sm)",
                  color: "var(--muted-ink)",
                  background: "transparent",
                  border: "1px dashed var(--line-strong)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                Connexion dev (local uniquement)
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
