import { FaqItem } from "../FaqItem";
import { SectionHeader } from "../SectionHeader";
import { Reveal } from "../motion/Reveal";

const items = [
  {
    q: "Faut-il des prérequis techniques ?",
    a: "Aucun. On part de votre niveau actuel, de vos outils et de vos vrais cas. Si vous savez écrire un email, vous pouvez suivre.",
    open: true,
  },
  {
    q: "Comment se déroulent les sessions en visio ?",
    a: "En direct, en petits groupes, avec partage d'écran et exercices pratiques sur vos propres documents. Un support est fourni après chaque session.",
  },
  {
    q: "Les formations sont-elles finançables par mon OPCO ?",
    a: "La certification Qualiopi — celle qui ouvre le financement par votre OPCO — est en cours d'obtention. En attendant, on regarde ensemble votre situation lors de l'appel découverte et on vous indique les démarches. Dès la certification obtenue, nos parcours sont finançables OPCO.",
  },
  {
    q: "En quoi êtes-vous concernés par l'AI Act ?",
    a: "Depuis 2025, former vos équipes à un usage responsable de l'IA devient une obligation, avec premières sanctions dès août 2026. Chaque parcours intègre ce volet conformité.",
  },
  {
    q: "Quelle est la taille idéale des groupes ?",
    a: "De 1 à 8 personnes pour garder de l'interaction. Au-delà, on organise plusieurs sessions pour préserver la qualité.",
  },
];

export function Faq() {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: "var(--container-narrow)",
          margin: "0 auto",
          padding: "var(--section-y) var(--gutter)",
        }}
      >
        <Reveal style={{ marginBottom: 40 }}>
          <SectionHeader
            eyebrow="Questions fréquentes"
            title="Tout ce que vous vous demandez"
          />
        </Reveal>
        <Reveal as="div" stagger={0.08}>
          {items.map((it) => (
            <FaqItem key={it.q} question={it.q} defaultOpen={it.open}>
              {it.a}
            </FaqItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
