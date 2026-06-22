import { notFound } from "next/navigation";
import { signIn } from "@/auth";
import { googleEnabled, microsoftEnabled } from "@/lib/auth/providers";
import { devSignIn } from "@/lib/auth/dev-login";
import { Msi } from "@/components/sections/saas-ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

const IS_DEV = process.env.NODE_ENV !== "production";

/** Google brand glyph. */
function GoogleMark() {
  return (
    <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5C29.6 34.5 26.9 35.5 24 35.5c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.5 5.5C39.3 35.7 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

/** Microsoft brand glyph. */
function MicrosoftMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 23 23" aria-hidden="true">
      <path fill="#f25022" d="M1 1h10v10H1z" />
      <path fill="#7fba00" d="M12 1h10v10H12z" />
      <path fill="#00a4ef" d="M1 12h10v10H1z" />
      <path fill="#ffb900" d="M12 12h10v10H12z" />
    </svg>
  );
}

const providerBtn: React.CSSProperties = {
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 11,
  padding: 13,
  borderRadius: 11,
  background: "var(--surface)",
  border: "1px solid var(--line-2)",
  color: "var(--ink)",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
};

export default async function ConnexionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const t = getPageCopy(loc).auth;
  const fr = loc === "fr";

  async function withProvider(provider: "google" | "microsoft-entra-id") {
    "use server";
    await signIn(provider, { redirectTo: `/${locale}/mon-espace` });
  }

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100vh - 66px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      {/* grid filigree */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
          backgroundSize: "58px 58px",
          WebkitMaskImage:
            "radial-gradient(80% 70% at 50% 40%,#000 30%,transparent 75%)",
          maskImage:
            "radial-gradient(80% 70% at 50% 40%,#000 30%,transparent 75%)",
          pointerEvents: "none",
        }}
      />
      {/* sun glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 560,
          height: 380,
          background: "radial-gradient(closest-side,var(--sun-2),transparent 72%)",
          opacity: 0.14,
          filter: "blur(16px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: 412 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "linear-gradient(150deg,var(--sun),var(--sun-deep))",
              color: "var(--on-sun)",
              boxShadow: "var(--glow-sun)",
            }}
          >
            <Msi size={26}>wb_sunny</Msi>
          </span>
          <h1
            style={{
              margin: "18px 0 0",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 27,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              textAlign: "center",
            }}
          >
            {t.pageTitle}
          </h1>
          <p
            style={{
              margin: "9px 0 0",
              fontSize: 15,
              color: "var(--ink-2)",
              textAlign: "center",
            }}
          >
            {t.pageSubtitle}
          </p>
        </div>

        <div
          style={{
            border: "1px solid var(--line)",
            background: "var(--surface)",
            borderRadius: 18,
            padding: 26,
            boxShadow: "var(--shadow-card)",
          }}
        >
          {googleEnabled && (
            <form action={withProvider.bind(null, "google")}>
              <button type="submit" style={{ ...providerBtn, marginBottom: microsoftEnabled ? 11 : 0 }}>
                <GoogleMark />
                {t.withGoogle}
              </button>
            </form>
          )}
          {microsoftEnabled && (
            <form action={withProvider.bind(null, "microsoft-entra-id")}>
              <button type="submit" style={providerBtn}>
                <MicrosoftMark />
                {t.withMicrosoft}
              </button>
            </form>
          )}

          {IS_DEV && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  margin: "20px 0",
                }}
              >
                <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "var(--ink-3)",
                  }}
                >
                  {fr ? "OU" : "OR"}
                </span>
                <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
              </div>
              <form action={devSignIn.bind(null, locale)}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: 12,
                    borderRadius: 11,
                    background: "transparent",
                    border: "1px dashed var(--line-2)",
                    color: "var(--ink-3)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  <Msi size={16} style={{ color: "var(--ink-3)" }}>terminal</Msi>
                  {fr ? "Connexion dev (local uniquement)" : "Dev sign-in (local only)"}
                </button>
              </form>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: 12.5,
            color: "var(--ink-3)",
            textAlign: "center",
          }}
        >
          <Msi size={16} style={{ color: "#16a34a" }}>lock</Msi>
          {fr
            ? "Connexion chiffrée · vos données restent en Europe (RGPD)"
            : "Encrypted sign-in · your data stays in Europe (GDPR)"}
        </div>
      </div>
    </section>
  );
}
