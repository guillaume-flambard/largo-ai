import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { CompassIcon, MapIcon, SparkleIcon, VideoIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Le formateur",
  description:
    "Guillaume Flambard, formateur IA pour les TPE et PME. Une méthode en trois principes : zéro jargon, sur vos vrais cas, autonomie durable. 100 % en visio, toute l'année.",
};

const principles = [
  { icon: <SparkleIcon />, t: "Zéro jargon", d: "On parle métier, résultats et temps gagné — jamais technique pour la technique." },
  { icon: <CompassIcon />, t: "Sur vos vrais cas", d: "On travaille sur vos documents, vos outils et vos objectifs, pas des exemples génériques." },
  { icon: <MapIcon />, t: "Autonomie durable", d: "Vous repartez capables de continuer seuls, sans dépendance à un prestataire." },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="Le formateur"
        title="Guillaume Flambard"
        subtitle="Formateur IA pour les TPE et PME. J'aide les dirigeants et leurs équipes à utiliser l'IA générative de façon concrète, utile et conforme — sans jargon."
      />

      <section className="section">
        <div className="container">
          <div
            className="grid-trainer"
            style={{
              display: "grid",
              gridTemplateColumns: "0.85fr 1.15fr",
              gap: "clamp(40px, 6vw, 72px)",
              alignItems: "start",
            }}
          >
            <Reveal>
              <div
                className="card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <div
                  style={{
                    aspectRatio: "1 / 1",
                    background: "var(--sun)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 96,
                    fontWeight: "var(--fw-light)",
                    letterSpacing: "var(--ls-display)",
                    color: "var(--ink)",
                  }}
                >
                  GF
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--fs-h4)",
                      fontWeight: "var(--fw-semibold)",
                      color: "var(--ink)",
                    }}
                  >
                    Guillaume Flambard
                  </div>
                  <div style={{ fontSize: "var(--fs-sm)", color: "var(--muted-ink)", marginTop: 2 }}>
                    Formateur IA · TPE / PME
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="div" stagger={0.1} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <h2
                style={{
                  fontSize: "var(--fs-h2)",
                  fontWeight: "var(--fw-light)",
                  color: "var(--ink)",
                  letterSpacing: "var(--ls-display)",
                  lineHeight: "var(--lh-snug)",
                }}
              >
                Rendre l&apos;IA simple, utile et conforme
              </h2>
              <p style={{ fontSize: "var(--fs-lead)", color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
                La plupart des dirigeants de TPE/PME entendent parler d&apos;IA
                partout, sans savoir par où commencer ni comment rester dans les
                clous. Mon métier : transformer ce flou en gestes concrets, sur
                vos propres cas, en quelques sessions.
              </p>
              <p style={{ fontSize: "var(--fs-body)", color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
                Pas de conférence théorique : on ouvre vos outils, on travaille
                vos vrais documents, et on repart avec des méthodes réutilisables.
                Chaque parcours intègre le volet conformité (RGPD, AI Act) pour
                que vous avanciez l&apos;esprit tranquille.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--line)",
                  color: "var(--ink)",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              >
                <span style={{ color: "var(--sun-ink)", display: "inline-flex" }}>
                  <VideoIcon width={22} height={22} />
                </span>
                Basé entre la France et l&apos;Asie · 100 % visio toute l&apos;année
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container">
          <Reveal style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}>
            <SectionHeader
              eyebrow="La méthode"
              title="Une méthode simple, en trois principes"
            />
          </Reveal>
          <Reveal
            as="div"
            stagger={0.12}
            className="grid-principles"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(24px, 4vw, 44px)",
            }}
          >
            {principles.map((p) => (
              <div
                key={p.t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  paddingTop: 22,
                  borderTop: "1px solid var(--line-strong)",
                }}
              >
                <span style={{ color: "var(--sun-ink)" }}>{p.icon}</span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--fs-h4)",
                    fontWeight: "var(--fw-semibold)",
                    color: "var(--ink)",
                  }}
                >
                  {p.t}
                </h3>
                <p style={{ fontSize: "var(--fs-body)", color: "var(--ink-soft)", lineHeight: "var(--lh-normal)" }}>
                  {p.d}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
