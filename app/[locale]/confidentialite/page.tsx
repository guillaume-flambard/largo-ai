import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données (RGPD) — Largo IA.",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Politique de confidentialité"
        subtitle="Comment vos données sont collectées, utilisées et protégées (RGPD)."
      />
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <div className="prose">
            <p>
              <em>
                Modèle conforme au RGPD à faire valider avant mise en ligne.
              </em>
            </p>

            <h2>Données collectées</h2>
            <p>
              Lorsque vous remplissez un formulaire de contact ou de réservation,
              nous collectons les informations que vous fournissez : nom,
              entreprise, email professionnel, taille d&apos;équipe et le détail
              de votre besoin.
            </p>

            <h2>Finalité</h2>
            <p>
              Ces données servent uniquement à vous recontacter et à préparer
              votre appel découverte. Elles ne sont jamais revendues, et nous ne
              vous inscrivons à aucune newsletter sans votre accord.
            </p>

            <h2>Base légale</h2>
            <p>
              Le traitement repose sur votre consentement et sur l&apos;intérêt
              légitime de répondre à votre demande.
            </p>

            <h2>Durée de conservation</h2>
            <p>
              Les données sont conservées le temps nécessaire au traitement de
              votre demande, puis archivées ou supprimées conformément à nos
              obligations légales.
            </p>

            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, de limitation et d&apos;opposition
              sur vos données. Pour les exercer, écrivez à{" "}
              <a href="mailto:contact@largo-ia.fr">contact@largo-ia.fr</a>.
            </p>

            <h2>Cookies & mesure d&apos;audience</h2>
            <p>
              Le site privilégie une mesure d&apos;audience respectueuse de la vie
              privée, sans traceurs publicitaires. La configuration exacte (ex.
              Vercel Analytics ou Plausible) est <em>à confirmer.</em>
            </p>

            <h2>Espace apprenant — données de connexion et progression</h2>
            <p>
              Lorsqu&apos;un visiteur se connecte à son espace apprenant via Google
              ou Microsoft, Largo IA reçoit de ce fournisseur d&apos;identité son
              adresse e-mail, son nom et sa photo de profil, afin de créer et
              d&apos;identifier son compte. Largo IA enregistre également sa
              progression pédagogique (leçons suivies, scores de quiz). Ces données
              servent uniquement à gérer son compte et son suivi de formation ; elles
              ne sont ni revendues ni partagées avec des tiers. Pour en demander la
              suppression, il suffit d&apos;écrire à{" "}
              <a href="mailto:contact@largo-ia.fr">contact@largo-ia.fr</a>.
            </p>

            <h2>Responsable du traitement</h2>
            <p>
              Largo IA — Guillaume Flambard.{" "}
              <a href="mailto:contact@largo-ia.fr">contact@largo-ia.fr</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
