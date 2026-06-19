import { Button } from "../Button";
import { ReserveButton } from "../ReserveButton";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";
import { ArrowIcon, PhoneIcon } from "../icons";

/** Largo IA — Closing beat. A broad ink section with the rising-sun horizon,
 *  rhyming with the hero: on revient au large pour conclure. */
export function FinalCta() {
  return (
    <section
      id="contact"
      className="section section--lg section--ink"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="container">
        <Reveal
          y={36}
          style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: "640px" }}
        >
          <h2
            style={{
              fontSize: "var(--fs-h1)",
              fontWeight: "var(--fw-light)",
              color: "var(--paper-on-ink)",
              letterSpacing: "var(--ls-display)",
              lineHeight: "var(--lh-snug)",
              maxWidth: "16ch",
            }}
          >
            Prêt à prendre le large avec votre équipe ?
          </h2>
          <p
            className="lead"
            style={{ color: "var(--paper-on-ink-muted)", maxWidth: "46ch" }}
          >
            Réservez un appel découverte de 30 minutes. On évalue vos besoins,
            sans engagement.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 4 }}>
            <Magnetic>
              <ReserveButton variant="primary" size="lg" iconRight={<ArrowIcon />}>
                Réserver un appel découverte
              </ReserveButton>
            </Magnetic>
            <Button
              variant="light"
              size="lg"
              href="mailto:contact@largo-ia.fr"
              iconLeft={<PhoneIcon />}
            >
              contact@largo-ia.fr
            </Button>
          </div>
        </Reveal>

        {/* Horizon : le soleil se couche sur le large — rime avec le hero. */}
        <div
          aria-hidden
          style={{
            position: "relative",
            marginTop: "clamp(3.5rem, 6vw, 6rem)",
            paddingTop: "clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "clamp(0px, 6vw, 80px)",
              bottom: 0,
              width: "clamp(56px, 7vw, 96px)",
              height: "clamp(56px, 7vw, 96px)",
              borderRadius: "999px",
              background: "var(--sun)",
            }}
          />
          <div style={{ height: 1, background: "var(--line-on-ink)" }} />
        </div>
      </div>
    </section>
  );
}
