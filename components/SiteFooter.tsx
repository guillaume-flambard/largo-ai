import { LocaleLink } from "./LocaleLink";
import { ReserveButton } from "./ReserveButton";
import { RoleToggle } from "./learn/RoleToggle";
import { Magnetic } from "./motion/Magnetic";
import { ArrowIcon } from "./icons";
import type { Marketing } from "@/lib/marketing";
import type { PageCopy } from "@/lib/pages";

export function SiteFooter({
  copy,
  formateur,
}: {
  copy: Marketing["footer"];
  formateur: PageCopy["formateur"];
}) {
  return (
    <footer className="section--ink" style={{ paddingTop: "var(--section-y)" }}>
      <div className="container">
        {/* Voix — une invitation personnelle qui porte la clôture, et l'action. */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
          <span className="kicker" style={{ marginBottom: 20, display: "inline-flex" }}>
            {copy.kicker}
          </span>
          <p
            style={{
              maxWidth: "32ch",
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-h2)",
              fontWeight: "var(--fw-light)",
              letterSpacing: "var(--ls-display)",
              lineHeight: "var(--lh-snug)",
              color: "var(--paper-on-ink)",
            }}
          >
            {copy.voiceBefore}
            <span style={{ color: "var(--sun)" }}>{copy.voiceEmphasis}</span>
            {copy.voiceAfter}
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Magnetic>
              <ReserveButton variant="primary" iconRight={<ArrowIcon />}>
                {copy.ctaPrimary}
              </ReserveButton>
            </Magnetic>
            <a href="mailto:contact@largo-ia.fr" className="link-underline">
              contact@largo-ia.fr
            </a>
          </div>
        </div>

        <div className="rule" style={{ marginBottom: "clamp(40px, 5vw, 64px)" }} />

        <div
          className="grid-footer"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 40,
            paddingBottom: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-wordmark-light.svg"
              alt="Largo IA"
              style={{ height: 38, width: "auto" }}
            />
            <p
              style={{
                color: "var(--paper-on-ink-muted)",
                fontSize: "var(--fs-sm)",
                lineHeight: "var(--lh-normal)",
              }}
            >
              {copy.tagline}
            </p>
          </div>
          {copy.cols.map((c) => (
            <div key={c.h} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-sm)",
                  fontWeight: "var(--fw-semibold)",
                  letterSpacing: "var(--ls-snug)",
                  color: "var(--paper-on-ink)",
                  marginBottom: 4,
                }}
              >
                {c.h}
              </div>
              {c.items.map((i) => (
                <LocaleLink
                  key={i.label}
                  href={i.href}
                  style={{ fontSize: "var(--fs-sm)", color: "var(--paper-on-ink-muted)" }}
                >
                  {i.label}
                </LocaleLink>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line-on-ink)",
            padding: "28px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <p
            style={{
              maxWidth: "52ch",
              fontSize: "var(--fs-sm)",
              lineHeight: "var(--lh-normal)",
              color: "var(--paper-on-ink-muted)",
              margin: 0,
            }}
          >
            {formateur.hint}
          </p>
          <RoleToggle
            label={formateur.label}
            stateOn={formateur.on}
            stateOff={formateur.off}
            tone="dark"
          />
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line-on-ink)",
            padding: "24px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--paper-on-ink-muted)" }}>
            © 2026 Largo IA — contact@largo-ia.fr
          </span>
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--paper-on-ink-muted)" }}>
            {copy.baseline}
          </span>
        </div>
      </div>
    </footer>
  );
}
