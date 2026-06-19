import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";

const items = [
  {
    t: "100 % en visio",
    d: "Aucun déplacement. Vos équipes se forment depuis leur bureau, partout en France — caméra allumée, en petit groupe.",
  },
  {
    t: "Du concret, vite",
    d: "On travaille sur vos vrais cas et vos propres outils. Des résultats applicables dès la première semaine, pas dans six mois.",
  },
  {
    t: "Conforme & sécurisé",
    d: "RGPD et AI Act intégrés à chaque parcours. Vos données restent protégées, vos usages restent dans les clous.",
  },
  {
    t: "Pensé pour les TPE / PME",
    d: "Petits groupes, sans jargon, au rythme d'équipes qui ont un métier à faire tourner et peu de temps à y consacrer.",
  },
];

export function Atouts() {
  return (
    <section className="section">
      <div className="container">
        <Reveal style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <SectionHeader
            align="left"
            eyebrow="Pourquoi Largo IA"
            title="Une formation faite pour les petites entreprises"
            subtitle="Pas une conférence théorique. Un accompagnement pragmatique, conçu pour des équipes qui n'ont pas de temps à perdre."
          />
        </Reveal>

        <Reveal as="div" stagger={0.1} className="rows">
          {items.map((it, i) => (
            <div className="row" key={it.t}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="row__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontSize: "var(--fs-h3)",
                    fontWeight: "var(--fw-regular)",
                    letterSpacing: "var(--ls-tight)",
                    lineHeight: "var(--lh-snug)",
                  }}
                >
                  {it.t}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--fs-lead)",
                  color: "var(--ink-soft)",
                  lineHeight: "var(--lh-relaxed)",
                  maxWidth: "54ch",
                }}
              >
                {it.d}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
