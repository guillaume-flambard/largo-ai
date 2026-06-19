import { OfferCard } from "../OfferCard";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

export function Offers() {
  return (
    <section id="offres" style={{ background: "var(--bg-soft)" }}>
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "var(--section-y) var(--gutter)",
        }}
      >
        <Reveal>
          <SectionHeader
            eyebrow="Les formations"
            title="Trois façons de prendre le large"
            subtitle="De la première sensibilisation à l'accompagnement sur-mesure du dirigeant."
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
              ctaHref="#contact"
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
              ctaHref="#contact"
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
              ctaHref="#contact"
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
  );
}
