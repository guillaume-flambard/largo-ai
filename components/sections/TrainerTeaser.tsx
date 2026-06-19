import { Button } from "../Button";
import { Reveal } from "../motion/Reveal";
import { CompassIcon, MapIcon, SparkleIcon } from "../icons";

const principles = [
  {
    icon: <SparkleIcon />,
    t: "Zéro jargon",
    d: "On parle métier, pas technique.",
  },
  {
    icon: <CompassIcon />,
    t: "Sur vos vrais cas",
    d: "Vos documents, vos outils, vos objectifs.",
  },
  {
    icon: <MapIcon />,
    t: "Autonomie durable",
    d: "Vous repartez capables, sans dépendance.",
  },
];

export function TrainerTeaser() {
  return (
    <section id="formateur" className="section section--ink">
      <div className="container">
        <Reveal
          as="div"
          stagger={0.15}
          className="grid-trainer"
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "clamp(40px, 6vw, 72px)",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                width: 128,
                height: 128,
                borderRadius: "var(--radius-lg)",
                background: "var(--sun)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: 46,
                fontWeight: 600,
                letterSpacing: "var(--ls-display)",
                color: "var(--ink)",
              }}
            >
              GF
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h3)",
                  fontWeight: "var(--fw-medium)",
                  letterSpacing: "var(--ls-tight)",
                  color: "var(--paper-on-ink)",
                }}
              >
                Guillaume Flambard
              </div>
              <div
                style={{
                  fontSize: "var(--fs-sm)",
                  color: "var(--paper-on-ink-muted)",
                  marginTop: 4,
                }}
              >
                Formateur IA · TPE / PME
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <span className="kicker">Le formateur</span>
            <h2
              style={{
                fontSize: "var(--fs-h2)",
                fontWeight: "var(--fw-light)",
                color: "var(--paper-on-ink)",
                letterSpacing: "var(--ls-display)",
                lineHeight: "var(--lh-snug)",
                maxWidth: "16ch",
              }}
            >
              Une méthode simple, en trois principes
            </h2>
            <div
              className="grid-principles"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 28,
              }}
            >
              {principles.map((p) => (
                <div
                  key={p.t}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    paddingTop: 18,
                    borderTop: "1px solid var(--line-on-ink)",
                  }}
                >
                  <span style={{ color: "var(--sun)" }}>{p.icon}</span>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--fw-semibold)",
                      color: "var(--paper-on-ink)",
                      fontSize: "var(--fs-h4)",
                    }}
                  >
                    {p.t}
                  </div>
                  <div
                    style={{
                      fontSize: "var(--fs-sm)",
                      color: "var(--paper-on-ink-muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    {p.d}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button variant="light" href="/a-propos">
                En savoir plus sur Guillaume
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
