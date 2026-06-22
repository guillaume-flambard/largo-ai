"use client";

import { ReserveButton } from "../ReserveButton";
import { LocaleLink } from "../LocaleLink";
import { Msi, sunPill, surfacePill } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Hero (refonte SaaS).
 *  Grille en filigrane + soleil qui se lève, titre avec accent "IA",
 *  2 CTAs, pastilles de réassurance, et la carte produit (progression)
 *  à droite. Le contenu est peint dès la 1re frame ; seules quelques
 *  animations CSS douces l'accompagnent (voir globals.css). */
export function CinematicHero({ copy }: { copy: Marketing["hero"] }) {
  const proofIcons = ["videocam", "chat_bubble", "verified_user"];
  return (
    <section
      aria-label={`${copy.titleBefore}${copy.titleEmphasis}${copy.titleAfter}`}
      style={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* grille en filigrane */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
          backgroundSize: "58px 58px",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%,#000 38%,transparent 78%)",
          maskImage:
            "radial-gradient(120% 90% at 50% 0%,#000 38%,transparent 78%)",
          pointerEvents: "none",
        }}
      />
      {/* soleil */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 720,
          height: 520,
          background: "radial-gradient(closest-side,var(--sun-2),transparent 72%)",
          opacity: 0.18,
          filter: "blur(20px)",
          pointerEvents: "none",
          animation: "lg-sun 1.4s cubic-bezier(.2,.7,.2,1) both",
        }}
      />

      <div
        className="lg-col2"
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "78px 24px 84px",
          display: "flex",
          gap: 56,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* colonne texte */}
        <div className="lg-reveal" style={{ flex: "1 1 460px", minWidth: 300 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--sun-ink)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 26,
                height: 2,
                borderRadius: 2,
                background: "linear-gradient(90deg,var(--sun),var(--sun-2))",
              }}
            />
            {copy.kicker}
          </div>

          <h1
            style={{
              margin: "22px 0 0",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(44px,6vw,76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {copy.titleBefore}
            <span
              style={{
                fontWeight: 600,
                position: "relative",
                color: "var(--sun-ink)",
              }}
            >
              {copy.titleEmphasis}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 6,
                  height: 10,
                  background: "var(--sun-soft)",
                  zIndex: -1,
                  borderRadius: 3,
                }}
              />
            </span>
            {copy.titleAfter}
          </h1>

          <p
            style={{
              margin: "24px 0 0",
              maxWidth: "30em",
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            {copy.lead}
          </p>

          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <ReserveButton
              className="lg-sun-btn"
              style={sunPill}
              iconRight={<Msi size={19}>arrow_forward</Msi>}
            >
              {copy.ctaPrimary}
            </ReserveButton>
            <LocaleLink href="/programme" className="lg-quiet-btn" style={surfacePill}>
              {copy.ctaSecondary}
            </LocaleLink>
          </div>

          <div
            style={{ marginTop: 30, display: "flex", gap: 10, flexWrap: "wrap" }}
          >
            {copy.proof.map((p, i) => (
              <span
                key={p}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "7px 13px",
                  borderRadius: 999,
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "var(--ink-2)",
                }}
              >
                <Msi size={17} style={{ color: "var(--sun-ink)" }}>
                  {proofIcons[i] ?? "check_circle"}
                </Msi>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* carte produit (progression) */}
        <div
          className="lg-reveal"
          style={{ flex: "1 1 380px", minWidth: 300, animationDelay: ".1s" }}
        >
          <div
            style={{
              position: "relative",
              border: "1px solid var(--line-2)",
              borderRadius: 18,
              background: "var(--surface)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "13px 16px",
                borderBottom: "1px solid var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
              <span
                style={{
                  marginLeft: 10,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "var(--ink-3)",
                }}
              >
                largo-ia.fr/mon-programme
              </span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    position: "relative",
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    background:
                      "conic-gradient(var(--sun) 0% 69%,var(--surface-3) 69% 100%)",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "var(--surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 18,
                      color: "var(--ink)",
                    }}
                  >
                    69%
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    {progressLabel(copy)}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 17,
                      color: "var(--ink)",
                      marginTop: 3,
                    }}
                  >
                    L&apos;IA au quotidien
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2 }}>
                    {modulesLabel(copy)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <ProgressRow label="M3 · Marketing & contenu" pct={100} />
                <ProgressRow label="M4 · Productivité & automatisation" pct={45} />
                <ProgressRow label="M5 · Sécurité, RGPD & AI Act" pct={0} muted />
              </div>

              <LocaleLink
                href="/mon-espace"
                className="lg-ink-btn"
                style={{
                  marginTop: 20,
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: 11,
                  borderRadius: 10,
                  background: "var(--ink)",
                  color: "var(--bg)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <Msi size={18}>play_arrow</Msi>
                {resumeLabel(copy)}
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressRow({
  label,
  pct,
  muted = false,
}: {
  label: string;
  pct: number;
  muted?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
          color: muted ? "var(--ink-3)" : "var(--ink-2)",
          marginBottom: 6,
        }}
      >
        <span>{label}</span>
        <span style={muted ? undefined : { color: "var(--sun-ink)", fontWeight: 600 }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "var(--surface-3)" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 99,
            background:
              pct > 0
                ? "linear-gradient(90deg,var(--sun),var(--sun-2))"
                : "var(--sun)",
          }}
        />
      </div>
    </div>
  );
}

/* Petits libellés bilingues du mock produit (absents de marketing.ts). */
function isEn(copy: Marketing["hero"]) {
  return copy.ctaPrimary.toLowerCase().startsWith("book");
}
function progressLabel(copy: Marketing["hero"]) {
  return isEn(copy) ? "My progress" : "Ma progression";
}
function modulesLabel(copy: Marketing["hero"]) {
  return isEn(copy) ? "3 of 5 modules done" : "3 modules sur 5 terminés";
}
function resumeLabel(copy: Marketing["hero"]) {
  return isEn(copy) ? "Resume the module" : "Reprendre le module";
}
