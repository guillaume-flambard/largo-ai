import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Réservez un appel découverte de 30 minutes avec Guillaume Flambard, ou écrivez-nous. On évalue vos besoins en IA, sans engagement.",
};

const steps = [
  { n: "1", t: "Vous nous écrivez", d: "Quelques mots sur votre activité, votre équipe et vos objectifs." },
  { n: "2", t: "Appel découverte (30 min)", d: "On clarifie vos besoins et on vérifie que l'on peut vous aider." },
  { n: "3", t: "Proposition sur-mesure", d: "Un programme et un format adaptés, avec un devis clair." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Réservez un appel découverte ou envoyez-nous un message. Réponse sous 24 h ouvrées, sans engagement."
      />

      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <div
            className="grid-trainer"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 56,
              alignItems: "start",
            }}
          >
            <Reveal
              className="card"
              style={{ padding: "32px 30px" }}
            >
              <ContactForm />
            </Reveal>

            <Reveal as="div" stagger={0.1} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="kicker">Comment ça se passe</span>
                <h2
                  style={{
                    fontSize: "var(--fs-h2)",
                    fontWeight: "var(--fw-light)",
                    letterSpacing: "var(--ls-display)",
                    lineHeight: "var(--lh-snug)",
                    color: "var(--ink)",
                  }}
                >
                  Trois étapes, sans pression
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {steps.map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        width: 40,
                        height: 40,
                        flex: "0 0 auto",
                        borderRadius: "var(--radius-pill)",
                        background: "var(--ink)",
                        color: "var(--paper-on-ink)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--fw-semibold)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <div style={{ fontWeight: "var(--fw-semibold)", color: "var(--ink)", fontSize: "var(--fs-h4)" }}>
                        {s.t}
                      </div>
                      <div style={{ fontSize: "var(--fs-body)", color: "var(--muted)", lineHeight: 1.5 }}>
                        {s.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="mailto:contact@largo-ia.fr"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 600,
                  color: "var(--sun-ink)",
                }}
              >
                <PhoneIcon width={20} height={20} />
                contact@largo-ia.fr
              </a>

              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  border: "1px dashed var(--border-strong)",
                  background: "var(--bg-soft)",
                  padding: "20px 22px",
                  color: "var(--muted)",
                  fontSize: "var(--fs-sm)",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "var(--navy)" }}>Prise de rendez-vous —</strong>{" "}
                l&apos;agenda de réservation (Cal.com) s&apos;intègre ici. En
                attendant, écrivez-nous : on vous propose un créneau rapidement.
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
