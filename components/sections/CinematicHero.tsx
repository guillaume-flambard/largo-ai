"use client";

import { ReserveButton } from "../ReserveButton";
import { LocaleLink } from "../LocaleLink";
import { Msi, sunPill, surfacePill } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Hero (AI-First Engineering pivot).
 *  Grille en filigrane + soleil qui se lève, titre avec accent IA,
 *  2 CTAs, pastilles de réassurance. Contenu peint dès la 1re frame ;
 *  animations CSS douces (globals.css). */
export function CinematicHero({ copy }: { copy: Marketing["hero"] }) {
  const proofIcons = ["groups", "verified_user", "code"];
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
      </div>
    </section>
  );
}
