import type { Locale } from "@/lib/i18n";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { getMarketing, type Marketing } from "@/lib/marketing";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { Atouts } from "@/components/sections/Atouts";
import { Manifesto } from "@/components/sections/Manifesto";
import { Offers } from "@/components/sections/Offers";
import { FormulesTable } from "@/components/sections/FormulesTable";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrainerTeaser } from "@/components/sections/TrainerTeaser";
import { TechStack } from "@/components/sections/TechStack";
import { Deliverables } from "@/components/sections/Deliverables";
import { Faq } from "@/components/sections/Faq";

/** JSON-LD : organisme de formation + FAQ (rich snippets Google), localisé. */
function buildJsonLd(m: Marketing, locale: Locale) {
  const org = {
    "@type": "EducationalOrganization",
    name: "Largo IA",
    description:
      locale === "en"
        ? "AI-first engineering training for development teams. B2B in-house, practitioner method, AI Act compliant."
        : "Formation à l'ingénierie AI-first pour les équipes de développement. B2B intra-entreprise, méthode praticien, conforme AI Act.",
    url: SITE_URL,
    email: "contact@largo-ia.fr",
    founder: { "@type": "Person", name: "Guillaume Flambard" },
    areaServed: "FR",
    inLanguage: locale,
  };
  const faqPage = {
    "@type": "FAQPage",
    mainEntity: m.faq.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return { "@context": "https://schema.org", "@graph": [org, faqPage] };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const m = getMarketing(resolved);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(m, resolved)) }}
      />
      {/* 1. Hero */}
      <CinematicHero copy={m.hero} />
      {/* 2. Le problème — Shadow AI */}
      <Manifesto copy={m.manifesto} />
      {/* 3. La promesse */}
      <Atouts copy={m.atouts} />
      {/* 4. Preuve — Pourquoi moi */}
      <TrainerTeaser copy={m.trainer} />
      {/* 5. Les 3 formules + tableau comparatif */}
      <Offers copy={m.offers} />
      <FormulesTable items={m.offers.items} labels={m.offers.comparisonLabels} />
      {/* 6. Le cursus — aperçu */}
      <HowItWorks copy={m.how} />
      {/* 7. Techs & outils */}
      <TechStack copy={m.tech} />
      {/* 8. Livrables */}
      <Deliverables copy={m.deliverables} />
      {/* 9. Objections / FAQ */}
      <Faq copy={m.faq} />
    </>
  );
}
