import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";

/** Largo IA — Preuve sociale.
 *
 *  Règle de marque : aucune invention. Tant que Guillaume n'a pas fourni de
 *  retours réels (avec accord de publication), `testimonials` reste vide et la
 *  section ne s'affiche pas. On ne publie pas de faux témoignage sur une marque
 *  dont la promesse est la confiance.
 *
 *  Pour activer : remplir le tableau ci-dessous. Une entrée = un retour réel.
 *  {
 *    quote: "Ce que la personne a dit, dans ses mots. Court, concret, sans superlatif.",
 *    name: "Prénom",                         // prénom suffit (RGPD léger)
 *    company: "Entreprise · secteur",        // ex. « Atelier Renaud · menuiserie »
 *    result: "Le résultat tangible.",        // ex. « 3 h gagnées par semaine sur les devis »
 *  }
 */
type Testimonial = {
  quote: string;
  name: string;
  company: string;
  result?: string;
};

const testimonials: Testimonial[] = [
  // En attente des retours réels de Guillaume (voir LAR-4).
];

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section section--paper2">
      <div className="container">
        <Reveal style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <SectionHeader
            align="left"
            eyebrow="Retours d'expérience"
            title="Ce qu'en disent les équipes formées"
            subtitle="Des dirigeants et des équipes de TPE / PME qui sont passés de l'appréhension à l'autonomie."
          />
        </Reveal>

        <Reveal as="div" stagger={0.12} className="rows">
          {testimonials.map((t) => (
            <figure
              key={t.name + t.company}
              className="row"
              style={{ margin: 0 }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h3)",
                  fontWeight: "var(--fw-light)",
                  letterSpacing: "var(--ls-tight)",
                  lineHeight: "var(--lh-snug)",
                  color: "var(--ink)",
                  maxWidth: "24ch",
                }}
              >
                « {t.quote} »
              </blockquote>
              <figcaption
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--fw-semibold)",
                    fontSize: "var(--fs-h4)",
                    color: "var(--ink)",
                  }}
                >
                  {t.name}
                </span>
                <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-soft)" }}>
                  {t.company}
                </span>
                {t.result && (
                  <span
                    style={{
                      marginTop: 8,
                      fontSize: "var(--fs-lead)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--sun-ink)",
                      maxWidth: "44ch",
                    }}
                  >
                    {t.result}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
