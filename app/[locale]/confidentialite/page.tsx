import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { isLocale } from "@/lib/i18n";

const EMAIL = "contact@largo-ia.fr";

function Mail() {
  return <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;
}

type LegalCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  disclaimer: ReactNode;
  sections: { h: string; body: ReactNode }[];
};

const COPY: Record<"fr" | "en", LegalCopy> = {
  fr: {
    metaTitle: "Politique de confidentialité",
    metaDescription:
      "Politique de confidentialité et traitement des données (RGPD) — Largo IA.",
    eyebrow: "Légal",
    title: "Politique de confidentialité",
    subtitle: "Comment vos données sont collectées, utilisées et protégées (RGPD).",
    disclaimer: "Modèle conforme au RGPD à faire valider avant mise en ligne.",
    sections: [
      {
        h: "Données collectées",
        body: (
          <p>
            Lorsque vous remplissez un formulaire de contact ou de réservation,
            nous collectons les informations que vous fournissez : nom,
            entreprise, email professionnel, taille d&apos;équipe et le détail de
            votre besoin.
          </p>
        ),
      },
      {
        h: "Finalité",
        body: (
          <p>
            Ces données servent uniquement à vous recontacter et à préparer votre
            appel découverte. Elles ne sont jamais revendues, et nous ne vous
            inscrivons à aucune newsletter sans votre accord.
          </p>
        ),
      },
      {
        h: "Base légale",
        body: (
          <p>
            Le traitement repose sur votre consentement et sur l&apos;intérêt
            légitime de répondre à votre demande.
          </p>
        ),
      },
      {
        h: "Durée de conservation",
        body: (
          <p>
            Les données sont conservées le temps nécessaire au traitement de votre
            demande, puis archivées ou supprimées conformément à nos obligations
            légales.
          </p>
        ),
      },
      {
        h: "Vos droits",
        body: (
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement, de limitation et d&apos;opposition
            sur vos données. Pour les exercer, écrivez à <Mail />.
          </p>
        ),
      },
      {
        h: "Cookies & mesure d'audience",
        body: (
          <p>
            Le site privilégie une mesure d&apos;audience respectueuse de la vie
            privée, sans traceurs publicitaires. La configuration exacte (ex.
            Vercel Analytics ou Plausible) est <em>à confirmer.</em>
          </p>
        ),
      },
      {
        h: "Espace apprenant — données de connexion et progression",
        body: (
          <p>
            Lorsqu&apos;un visiteur se connecte à son espace apprenant via Google
            ou Microsoft, Largo IA reçoit de ce fournisseur d&apos;identité son
            adresse e-mail, son nom et sa photo de profil, afin de créer et
            d&apos;identifier son compte. Largo IA enregistre également sa
            progression pédagogique (leçons suivies, scores de quiz). Ces données
            servent uniquement à gérer son compte et son suivi de formation ; elles
            ne sont ni revendues ni partagées avec des tiers. Pour en demander la
            suppression, il suffit d&apos;écrire à <Mail />.
          </p>
        ),
      },
      {
        h: "Responsable du traitement",
        body: (
          <p>
            Largo IA — Guillaume Flambard. <Mail />.
          </p>
        ),
      },
    ],
  },
  en: {
    metaTitle: "Privacy policy",
    metaDescription: "Privacy policy and data processing (GDPR) — Largo IA.",
    eyebrow: "Legal",
    title: "Privacy policy",
    subtitle: "How your data is collected, used and protected (GDPR).",
    disclaimer: "GDPR-compliant template to be validated before going live.",
    sections: [
      {
        h: "Data collected",
        body: (
          <p>
            When you fill in a contact or booking form, we collect the
            information you provide: name, company, work email, team size and the
            details of your need.
          </p>
        ),
      },
      {
        h: "Purpose",
        body: (
          <p>
            This data is used only to get back to you and to prepare your
            discovery call. It is never resold, and we do not sign you up to any
            newsletter without your consent.
          </p>
        ),
      },
      {
        h: "Legal basis",
        body: (
          <p>
            Processing is based on your consent and on the legitimate interest of
            responding to your request.
          </p>
        ),
      },
      {
        h: "Retention period",
        body: (
          <p>
            Data is kept for as long as necessary to handle your request, then
            archived or deleted in accordance with our legal obligations.
          </p>
        ),
      },
      {
        h: "Your rights",
        body: (
          <p>
            Under the GDPR, you have a right to access, rectify, erase, restrict
            and object to the processing of your data. To exercise these, write to{" "}
            <Mail />.
          </p>
        ),
      },
      {
        h: "Cookies & analytics",
        body: (
          <p>
            The site favors privacy-friendly analytics, with no advertising
            trackers. The exact setup (e.g. Vercel Analytics or Plausible) is{" "}
            <em>to be confirmed.</em>
          </p>
        ),
      },
      {
        h: "Learner area — sign-in and progress data",
        body: (
          <p>
            When a visitor signs in to their learner area via Google or Microsoft,
            Largo IA receives from that identity provider their email address,
            name and profile picture, in order to create and identify their
            account. Largo IA also records their learning progress (lessons taken,
            quiz scores). This data is used only to manage their account and
            training follow-up; it is neither resold nor shared with third
            parties. To request deletion, simply write to <Mail />.
          </p>
        ),
      },
      {
        h: "Data controller",
        body: (
          <p>
            Largo IA — Guillaume Flambard. <Mail />.
          </p>
        ),
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = COPY[isLocale(locale) ? locale : "fr"];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: { index: false },
  };
}

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = COPY[locale];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <section style={{ background: "var(--bg)" }}>
        <div className="container" style={{ padding: "var(--section-y) var(--gutter)" }}>
          <div className="prose">
            <p>
              <em>{t.disclaimer}</em>
            </p>
            {t.sections.map((s) => (
              <Fragment key={s.h}>
                <h2>{s.h}</h2>
                {s.body}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
