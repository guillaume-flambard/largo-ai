import { ReserveButton } from "../ReserveButton";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";
import { ArrowIcon } from "../icons";

/** Largo IA — Manifeste sur aplat ocre. L'unique champ de couleur pleine du
 *  parcours : une conviction qui rassure (pas qui vante), façon « statement »
 *  d'Instrument mais au service d'un dirigeant inquiet. */
export function Manifesto() {
  return (
    <section
      className="section section--lg"
      style={{ background: "var(--sun)", color: "var(--ink)" }}
    >
      <div className="container">
        <Reveal as="div" stagger={0.12} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: "var(--fs-sm)",
              fontWeight: "var(--fw-semibold)",
              letterSpacing: "var(--ls-snug)",
              color: "var(--ink)",
            }}
          >
            <span
              aria-hidden
              style={{ width: 28, height: 2, borderRadius: 2, background: "var(--ink)" }}
            />
            Notre conviction
          </span>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 1.2rem + 2.1vw, 2.85rem)",
              fontWeight: "var(--fw-light)",
              letterSpacing: "var(--ls-display)",
              lineHeight: 1.28,
              color: "var(--ink)",
              maxWidth: "20ch",
              textWrap: "balance",
            }}
          >
            Pas besoin d&apos;être technicien, ni de tout changer. Quelques
            heures, vos propres outils, une méthode claire —&nbsp;et l&apos;IA
            devient{" "}
            <span style={{ fontWeight: "var(--fw-semibold)" }}>
              un réflexe utile
            </span>
            , pas une source de stress.
          </p>

          <div style={{ display: "flex", gap: "16px 24px", flexWrap: "wrap", alignItems: "center", marginTop: 4 }}>
            <Magnetic>
              <ReserveButton variant="ink" size="lg" iconRight={<ArrowIcon />}>
                Réserver un appel découverte
              </ReserveButton>
            </Magnetic>
            <a
              href="/programme"
              style={{
                fontWeight: "var(--fw-semibold)",
                color: "var(--ink)",
                borderBottom: "2px solid var(--ink)",
                paddingBottom: 2,
              }}
            >
              Découvrir le programme
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
