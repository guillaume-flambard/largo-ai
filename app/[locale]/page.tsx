import { CinematicHero } from "@/components/sections/CinematicHero";
import { getMarketing } from "@/lib/marketing";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { Atouts } from "@/components/sections/Atouts";
import { Manifesto } from "@/components/sections/Manifesto";
import { Offers } from "@/components/sections/Offers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrainerTeaser } from "@/components/sections/TrainerTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Largo IA",
  description:
    "Organisme de formation à l'IA générative pour les TPE et PME françaises. 100 % en visio, sans jargon, conforme à l'AI Act.",
  url: "https://largo-ia.fr",
  email: "contact@largo-ia.fr",
  founder: { "@type": "Person", name: "Guillaume Flambard" },
  areaServed: "FR",
  knowsLanguage: "fr",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = getMarketing(isLocale(locale) ? locale : DEFAULT_LOCALE);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CinematicHero copy={m.hero} />
      <Atouts copy={m.atouts} />
      <Manifesto copy={m.manifesto} />
      <Offers copy={m.offers} />
      <HowItWorks copy={m.how} />
      <TrainerTeaser copy={m.trainer} />
      <Testimonials />
      <Faq copy={m.faq} />
    </>
  );
}
