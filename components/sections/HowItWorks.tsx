import { SectionHeader } from "../SectionHeader";
import { Step } from "../Step";
import { Reveal } from "../motion/Reveal";

const steps = [
  {
    t: "Appel découverte",
    d: "30 minutes pour comprendre votre activité, vos outils et vos objectifs.",
  },
  {
    t: "Programme sur-mesure",
    d: "On construit un parcours adapté à vos vrais cas — rien d'inutile.",
  },
  {
    t: "Sessions en visio",
    d: "En direct, en petits groupes, avec des exercices sur vos documents.",
  },
  {
    t: "Suivi & autonomie",
    d: "On vérifie que les acquis tiennent dans la durée, sans dépendance.",
  },
];

export function HowItWorks() {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "var(--section-y) var(--gutter)",
        }}
      >
        <Reveal>
          <SectionHeader
            eyebrow="Comment ça marche"
            title="Du premier appel à l'autonomie"
          />
        </Reveal>
        <Reveal
          as="div"
          stagger={0.12}
          className="grid-steps"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            marginTop: 56,
          }}
        >
          {steps.map((s, i) => (
            <Step
              key={s.t}
              number={i + 1}
              title={s.t}
              last={i === steps.length - 1}
            >
              {s.d}
            </Step>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
