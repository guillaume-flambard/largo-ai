import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Largo IA.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Mentions légales"
        subtitle="Informations légales relatives au site et à l'éditeur."
      />
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <div className="prose">
            <p>
              <em>
                Modèle à compléter avant mise en ligne (raison sociale, statut,
                SIRET, adresse, hébergeur).
              </em>
            </p>

            <h2>Éditeur du site</h2>
            <p>
              Largo IA — Guillaume Flambard, organisme de formation à l&apos;IA
              générative pour les TPE et PME.
              <br />
              Email : <a href="mailto:contact@largo-ia.fr">contact@largo-ia.fr</a>
              <br />
              Statut juridique, SIRET et adresse : <em>à compléter.</em>
            </p>

            <h2>Directeur de la publication</h2>
            <p>Guillaume Flambard.</p>

            <h2>Hébergement</h2>
            <p>
              Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
              91789, États-Unis — <a href="https://vercel.com">vercel.com</a>.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus de ce site (textes, identité visuelle,
              logo, illustrations) est la propriété de Largo IA, sauf mention
              contraire. Toute reproduction sans autorisation est interdite.
            </p>

            <h2>Responsabilité</h2>
            <p>
              Largo IA s&apos;efforce de fournir des informations exactes et à
              jour, sans pouvoir en garantir l&apos;exhaustivité. Les tarifs
              indiqués sont donnés à titre indicatif (HT) et confirmés sur devis.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative au site, écrivez à{" "}
              <a href="mailto:contact@largo-ia.fr">contact@largo-ia.fr</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
