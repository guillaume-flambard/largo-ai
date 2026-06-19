import { CinematicHero } from "@/components/sections/CinematicHero";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CinematicHero />
      <Atouts />
      <Manifesto />
      <Offers />
      <HowItWorks />
      <TrainerTeaser />
      <Testimonials />
      <Faq />
    </>
  );
}
