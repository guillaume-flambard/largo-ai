import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { LocaleLink } from "@/components/LocaleLink";
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
    metaTitle: "Mentions légales",
    metaDescription: "Mentions légales du site Largo IA.",
    eyebrow: "Légal",
    title: "Mentions légales",
    subtitle: "Informations légales relatives au site et à l'éditeur.",
    disclaimer:
      "Modèle à compléter avant mise en ligne. Les champs marqués « à compléter » attendent les informations officielles de l'éditeur.",
    sections: [
      {
        h: "Éditeur du site",
        body: (
          <p>
            Largo IA — Guillaume Flambard, organisme de formation à l&apos;IA
            générative pour les TPE et PME.
            <br />
            Forme juridique : <em>à compléter</em> (ex. entreprise individuelle,
            SASU…).
            <br />
            SIRET : <em>à compléter.</em>
            <br />
            Numéro de TVA intracommunautaire : <em>à compléter</em> (ou « non
            applicable, TVA non applicable — art. 293 B du CGI » le cas échéant).
            <br />
            Siège : <em>à compléter.</em>
            <br />
            Email : <Mail />
          </p>
        ),
      },
      {
        h: "Activité de formation",
        body: (
          <p>
            Déclaration d&apos;activité enregistrée sous le numéro{" "}
            <em>à compléter</em> auprès du préfet de région <em>à compléter.</em>
            <br />
            Cet enregistrement ne vaut pas agrément de l&apos;État.
          </p>
        ),
      },
      { h: "Directeur de la publication", body: <p>Guillaume Flambard.</p> },
      {
        h: "Hébergement",
        body: (
          <p>
            Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
            91789, États-Unis — <a href="https://vercel.com">vercel.com</a>.
          </p>
        ),
      },
      {
        h: "Propriété intellectuelle",
        body: (
          <p>
            L&apos;ensemble des contenus de ce site (textes, identité visuelle,
            logo, illustrations) est la propriété de Largo IA, sauf mention
            contraire. Toute reproduction sans autorisation est interdite.
          </p>
        ),
      },
      {
        h: "Responsabilité",
        body: (
          <p>
            Largo IA s&apos;efforce de fournir des informations exactes et à
            jour, sans pouvoir en garantir l&apos;exhaustivité. Les tarifs
            indiqués sont donnés à titre indicatif (HT) et confirmés sur devis.
          </p>
        ),
      },
      {
        h: "Données personnelles",
        body: (
          <p>
            Le traitement de vos données est décrit dans notre{" "}
            <LocaleLink href="/confidentialite">politique de confidentialité</LocaleLink>.
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification et de suppression de vos données, exerçable à <Mail />.
          </p>
        ),
      },
      {
        h: "Contact",
        body: (
          <p>
            Pour toute question relative au site, écrivez à <Mail />.
          </p>
        ),
      },
    ],
  },
  en: {
    metaTitle: "Legal notice",
    metaDescription: "Legal notice for the Largo IA website.",
    eyebrow: "Legal",
    title: "Legal notice",
    subtitle: "Legal information about the site and its publisher.",
    disclaimer:
      "Template to be completed before going live. Fields marked “to be completed” await the publisher's official information.",
    sections: [
      {
        h: "Site publisher",
        body: (
          <p>
            Largo IA — Guillaume Flambard, a training provider for generative AI
            aimed at small and medium businesses.
            <br />
            Legal form: <em>to be completed</em> (e.g. sole proprietorship,
            single-member company…).
            <br />
            Company ID (SIRET): <em>to be completed.</em>
            <br />
            EU VAT number: <em>to be completed</em> (or “not applicable, VAT not
            charged — art. 293 B of the French CGI” where relevant).
            <br />
            Registered office: <em>to be completed.</em>
            <br />
            Email: <Mail />
          </p>
        ),
      },
      {
        h: "Training activity",
        body: (
          <p>
            Activity declaration registered under number <em>to be completed</em>{" "}
            with the regional prefecture <em>to be completed.</em>
            <br />
            This registration does not constitute State accreditation.
          </p>
        ),
      },
      { h: "Publication director", body: <p>Guillaume Flambard.</p> },
      {
        h: "Hosting",
        body: (
          <p>
            Site hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
            USA — <a href="https://vercel.com">vercel.com</a>.
          </p>
        ),
      },
      {
        h: "Intellectual property",
        body: (
          <p>
            All content on this site (text, visual identity, logo,
            illustrations) is the property of Largo IA unless otherwise stated.
            Any reproduction without authorization is prohibited.
          </p>
        ),
      },
      {
        h: "Liability",
        body: (
          <p>
            Largo IA strives to provide accurate, up-to-date information but
            cannot guarantee its completeness. Prices shown are indicative (excl.
            tax) and confirmed by quote.
          </p>
        ),
      },
      {
        h: "Personal data",
        body: (
          <p>
            The processing of your data is described in our{" "}
            <LocaleLink href="/confidentialite">privacy policy</LocaleLink>. Under
            the GDPR, you have a right to access, rectify and delete your data,
            which you can exercise at <Mail />.
          </p>
        ),
      },
      {
        h: "Contact",
        body: (
          <p>
            For any question about the site, write to <Mail />.
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

export default async function MentionsLegalesPage({
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
