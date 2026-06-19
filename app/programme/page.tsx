import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { OfferCard } from "@/components/OfferCard";
import { SectionHeader } from "@/components/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Programme",
  description:
    "Un parcours IA en 4 modules conçu pour les TPE/PME : fondamentaux & conformité, écrire & communiquer, marketing & contenu, productivité & automatisation. Trois formats au choix.",
};

const modules = [
  {
    n: "01",
    t: "Fondamentaux & état d'esprit IA",
    d: "Comprendre ce que l'IA générative sait (et ne sait pas) faire, et l'utiliser en confiance.",
    points: [
      "Panorama des outils utiles à votre métier",
      "Bons réflexes : vérifier, recouper, garder la main",
      "Sécurité, RGPD & AI Act : ce que vous devez savoir",
    ],
  },
  {
    n: "02",
    t: "Écrire & communiquer",
    d: "Gagner du temps sur tout ce qui s'écrit, sans perdre votre ton ni votre exigence.",
    points: [
      "Emails, comptes-rendus, propositions",
      "Reformuler, résumer, traduire",
      "Créer vos modèles réutilisables",
    ],
  },
  {
    n: "03",
    t: "Marketing & contenu",
    d: "Produire du contenu utile et à votre image, en autonomie.",
    points: [
      "Posts, articles, pages — du brief au texte final",
      "Visuels et idées de campagnes",
      "Garder une ligne éditoriale cohérente",
    ],
  },
  {
    n: "04",
    t: "Productivité & automatisation",
    d: "Alléger les tâches répétitives et fluidifier vos process.",
    points: [
      "Automatiser le récurrent du quotidien",
      "Connecter l'IA à vos outils",
      "Mesurer le temps réellement gagné",
    ],
  },
];

export default function ProgrammePage() {
  return (
    <>
      <PageHero
        eyebrow="Le programme"
        title="Un parcours IA conçu pour votre métier"
        subtitle="Quatre modules concrets, travaillés sur vos vrais cas et vos propres outils. On adapte la profondeur de chaque module à votre format et à votre équipe."
      />

      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Le contenu"
              title="Quatre modules, du fondamental à l'automatisation"
            />
          </Reveal>
          <Reveal
            as="div"
            stagger={0.12}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              marginTop: 56,
            }}
            className="grid-offers"
          >
            {modules.map((m) => (
              <TiltCard
                key={m.n}
                max={4}
                className="card"
                style={{ padding: 30 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--fs-h2)",
                    fontWeight: "var(--fw-thin)",
                    color: "var(--sun-deep)",
                    letterSpacing: "var(--ls-display)",
                  }}
                >
                  {m.n}
                </div>
                <h3
                  style={{
                    fontSize: "var(--fs-h3)",
                    fontWeight: "var(--fw-medium)",
                    color: "var(--ink)",
                    margin: "10px 0 8px",
                  }}
                >
                  {m.t}
                </h3>
                <p
                  style={{
                    fontSize: "var(--fs-body)",
                    color: "var(--muted)",
                    lineHeight: "var(--lh-normal)",
                    marginBottom: 18,
                  }}
                >
                  {m.d}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {m.points.map((p) => (
                    <li
                      key={p}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        fontSize: "var(--fs-body)",
                        color: "var(--text-body)",
                      }}
                    >
                      <span style={{ color: "var(--teal)", flex: "0 0 auto", marginTop: 2 }}>
                        <CheckIcon width={20} height={20} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg-soft)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <Reveal>
            <SectionHeader
              eyebrow="Les formats"
              title="Trois intensités, selon vos objectifs"
              subtitle="Le même fond, calibré différemment : de la sensibilisation à l'accompagnement sur-mesure du dirigeant."
            />
          </Reveal>
          <Reveal
            as="div"
            stagger={0.14}
            className="grid-offers"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              alignItems: "start",
              marginTop: 56,
            }}
          >
            <TiltCard max={5}>
              <OfferCard
                name="Acculturation IA"
                format="Demi-journée (3h30) · visio"
                price="dès 690 €"
                priceNote="HT / groupe"
                audience="Sensibiliser, lever les freins"
                ctaLabel="Réserver un appel"
                ctaHref="/contact"
                benefits={[
                  "Comprendre l'IA sans jargon",
                  "Repérer vos premiers cas d'usage",
                  "Lever les craintes de l'équipe",
                ]}
              />
            </TiltCard>
            <TiltCard max={5}>
              <OfferCard
                featured
                name="L'IA au quotidien"
                format="2 jours (4×3h30) · visio"
                price="dès 1 900 €"
                priceNote="HT / groupe"
                audience="Monter en compétence toute l'équipe"
                ctaHref="/contact"
                benefits={[
                  "Écrire & communiquer plus vite",
                  "Marketing & création de contenu",
                  "Productivité & automatisation",
                  "Sécurité, RGPD & AI Act",
                ]}
              />
            </TiltCard>
            <TiltCard max={5}>
              <OfferCard
                name="Accompagnement dirigeant"
                format="Parcours 4–6 semaines"
                price="sur devis"
                audience="Transformation + mise en conformité"
                ctaLabel="En parler"
                ctaHref="/contact"
                benefits={[
                  "Feuille de route IA sur-mesure",
                  "Sessions individuelles",
                  "Conformité AI Act de l'entreprise",
                ]}
              />
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
