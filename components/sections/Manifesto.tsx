import { ReserveButton } from "../ReserveButton";
import { LocaleLink } from "../LocaleLink";
import { Reveal } from "../motion/Reveal";
import { Msi, sunPill } from "./saas-ui";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Manifeste (refonte SaaS). Bandeau « ink » sombre, conviction +
 *  2 CTAs. Couleurs « ink » littérales comme dans le design. */
export function Manifesto({ copy }: { copy: Marketing["manifesto"] }) {
  return (
    <section style={{ background: "#0A0C12", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -60,
          width: 520,
          height: 420,
          background: "radial-gradient(closest-side,var(--sun-2),transparent 70%)",
          opacity: 0.22,
          filter: "blur(12px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(255,154,46,0.4),transparent)",
          pointerEvents: "none",
        }}
      />
      <Reveal
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "88px 24px",
          display: "flex",
          gap: 48,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <div style={{ flex: "1 1 520px", minWidth: 300 }}>
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
              color: "#FFB256",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 26,
                height: 2,
                borderRadius: 2,
                background: "linear-gradient(90deg,#FF9A2E,#FF6A2C)",
                flexShrink: 0,
              }}
            />
            {copy.kicker}
          </div>
          <p
            style={{
              margin: "20px 0 0",
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(26px,3.4vw,40px)",
              lineHeight: 1.28,
              letterSpacing: "-0.02em",
              color: "#F1F3F8",
              textWrap: "balance",
            }}
          >
            {copy.before}
            <span style={{ fontWeight: 600, color: "#FF9A2E" }}>{copy.emphasis}</span>
            {copy.after}
          </p>
        </div>

        <div style={{ flex: "0 0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ReserveButton
            className="lg-sun-btn"
            style={{ ...sunPill, padding: "13px 20px", fontSize: 15 }}
            iconRight={<Msi size={18}>arrow_forward</Msi>}
          >
            {copy.ctaPrimary}
          </ReserveButton>
          <LocaleLink
            href="/programme"
            className="lg-ghost-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 18px",
              borderRadius: 11,
              background: "transparent",
              color: "#F1F3F8",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 15,
              border: "1px solid rgba(255,255,255,0.18)",
              textDecoration: "none",
            }}
          >
            {copy.ctaSecondary}
          </LocaleLink>
        </div>
      </Reveal>
    </section>
  );
}
