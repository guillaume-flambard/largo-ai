import { LocaleLink } from "./LocaleLink";
import { ReserveButton } from "./ReserveButton";
import { RoleToggle } from "./learn/RoleToggle";
import { Reveal } from "./motion/Reveal";
import { Msi, sunPill } from "./sections/saas-ui";
import type { Marketing } from "@/lib/marketing";
import type { PageCopy } from "@/lib/pages";

/** Largo IA — Footer (refonte SaaS). Bandeau de clôture sombre (final CTA porté
 *  par la voix du formateur) + colonnes de liens + contrôle « mode formateur »
 *  (RoleToggle) préservé pour la couche apprenant. */
export function SiteFooter({
  copy,
  formateur,
}: {
  copy: Marketing["footer"];
  formateur: PageCopy["formateur"];
}) {
  return (
    <footer style={{ background: "#07090E", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      {/* ---- Clôture : voix du formateur + CTA (sur ink sombre) ---- */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -260,
            left: "50%",
            transform: "translateX(-50%)",
            width: 760,
            height: 520,
            background: "radial-gradient(closest-side,var(--sun-2),transparent 70%)",
            opacity: 0.2,
            filter: "blur(16px)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 200,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(255,154,46,0.5),transparent)",
            pointerEvents: "none",
          }}
        />
        <Reveal style={{ position: "relative", maxWidth: 780, margin: "0 auto", padding: "104px 24px 96px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFB256",
              justifyContent: "center",
            }}
          >
            {copy.kicker}
          </span>
          <p
            style={{
              margin: "20px auto 0",
              maxWidth: "26ch",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(30px,4.4vw,52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#F1F3F8",
              textWrap: "balance",
            }}
          >
            {copy.voiceBefore}
            <span style={{ fontWeight: 600, color: "#FF9A2E" }}>{copy.voiceEmphasis}</span>
            {copy.voiceAfter}
          </p>
          <div
            style={{
              marginTop: 34,
              display: "flex",
              gap: 13,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ReserveButton
              className="lg-sun-btn"
              style={{ ...sunPill, padding: "15px 26px", fontSize: 16 }}
              iconRight={<Msi size={20}>arrow_forward</Msi>}
            >
              {copy.ctaPrimary}
            </ReserveButton>
            <a
              href="mailto:contact@largo-ia.fr"
              className="lg-ghost-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "15px 22px",
                borderRadius: 12,
                background: "transparent",
                color: "#F1F3F8",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 16,
                border: "1px solid rgba(255,255,255,0.18)",
                textDecoration: "none",
              }}
            >
              <Msi size={20}>mail</Msi>
              contact@largo-ia.fr
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---- Colonnes ---- */}
      <div
        className="lg-footer-grid"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "64px 24px 40px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div style={{ minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-wordmark-light.svg"
              alt="Largo IA"
              style={{ height: 32, width: "auto" }}
            />
          </div>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#8B94A8",
              maxWidth: "30em",
            }}
          >
            {copy.tagline}
          </p>
          <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={badgeStyle}>
              <Msi size={15} style={{ color: "#FF9A2E" }}>
                verified_user
              </Msi>
              {isEnFooter(copy) ? "AI Act compliant" : "Conforme AI Act"}
            </span>
            <span style={badgeStyle}>
              <Msi size={15} style={{ color: "#FF9A2E" }}>
                lock
              </Msi>
              RGPD
            </span>
          </div>
        </div>

        {copy.cols.map((c) => (
          <div key={c.h}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#6B7488",
                marginBottom: 14,
              }}
            >
              {c.h}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {c.items.map((i) => (
                <LocaleLink
                  key={i.label}
                  href={i.href}
                  className="lg-foot-link"
                  style={{ fontSize: 14 }}
                >
                  {i.label}
                </LocaleLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---- Contrôle mode formateur (couche apprenant) ---- */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "22px 24px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 13, color: "#6B7488", maxWidth: "52ch", lineHeight: 1.5 }}>
          {formateur.hint}
        </span>
        <RoleToggle
          label={formateur.label}
          stateOn={formateur.on}
          stateOff={formateur.off}
          tone="dark"
        />
      </div>

      {/* ---- Bas de page ---- */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "22px 24px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 13, color: "#6B7488" }}>
          © 2026 Largo IA · contact@largo-ia.fr
        </span>
        <span style={{ fontSize: 13, color: "#6B7488" }}>{copy.baseline}</span>
      </div>
    </footer>
  );
}

function isEnFooter(copy: Marketing["footer"]) {
  return copy.ctaPrimary.toLowerCase().startsWith("book");
}

const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "5px 11px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  fontFamily: "var(--font-mono)",
  fontWeight: 500,
  fontSize: 11.5,
  color: "#AEB6C6",
} as const;
