import type { Locale } from "@/lib/i18n";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { getMarketing, type Marketing } from "@/lib/marketing";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { ReassuranceBand } from "@/components/sections/ReassuranceBand";
import { Atouts } from "@/components/sections/Atouts";
import { Manifesto } from "@/components/sections/Manifesto";
import { Offers } from "@/components/sections/Offers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrainerTeaser } from "@/components/sections/TrainerTeaser";
import { Faq } from "@/components/sections/Faq";

/** JSON-LD : organisme de formation + FAQ (rich snippets Google), localisé. */
function buildJsonLd(m: Marketing, locale: Locale) {
  const org = {
    "@type": "EducationalOrganization",
    name: "Largo IA",
    description:
      locale === "en"
        ? "Generative-AI training for French small and medium businesses. 100% remote, jargon-free, AI Act compliant."
        : "Organisme de formation à l'IA générative pour les TPE et PME françaises. 100 % en visio, sans jargon, conforme à l'AI Act.",
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
      <CinematicHero copy={m.hero} />
      <ReassuranceBand locale={resolved} />
      <Atouts copy={m.atouts} />
      <Manifesto copy={m.manifesto} />
      <Offers copy={m.offers} />
      <HowItWorks copy={m.how} />
      <TrainerTeaser copy={m.trainer} />
      <Faq copy={m.faq} />
    </>
  );
}
