import type { Locale } from "@/lib/i18n";

export type Marketing = {
  hero: {
    kicker: string;
    titleBefore: string;
    titleEmphasis: string;
    titleAfter: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    proof: string[];
  };
  footer: {
    kicker: string;
    voiceBefore: string;
    voiceEmphasis: string;
    voiceAfter: string;
    ctaPrimary: string;
    tagline: string;
    cols: { h: string; items: { label: string; href: string }[] }[];
    baseline: string;
  };
};

const fr: Marketing = {
  hero: {
    kicker: "Formation IA · TPE & PME",
    titleBefore: "Prenez le large avec l'",
    titleEmphasis: "IA",
    titleAfter: ".",
    lead: "Formez vos dirigeants et vos équipes à l'IA générative, en visio, sans jargon. Des résultats concrets dès la première semaine — et la conformité AI Act incluse.",
    ctaPrimary: "Réserver un appel découverte",
    ctaSecondary: "Voir les formations",
    proof: ["100 % en visio, partout en France", "Sans jargon", "Conforme AI Act & RGPD"],
  },
  footer: {
    kicker: "Restons en contact",
    voiceBefore: "Une question, un doute, un projet ? Écrivez à Guillaume — ",
    voiceEmphasis: "c'est lui qui vous répond",
    voiceAfter: ", en personne, sous 24 h.",
    ctaPrimary: "Réserver un appel découverte",
    tagline: "Formation à l'IA générative pour les TPE et PME françaises. 100 % en visio, sans jargon, au tempo qui vous va.",
    cols: [
      {
        h: "Se former",
        items: [
          { label: "Acculturation IA", href: "/programme" },
          { label: "L'IA au quotidien", href: "/programme" },
          { label: "Accompagnement dirigeant", href: "/programme" },
        ],
      },
      {
        h: "Largo IA",
        items: [
          { label: "Rencontrer Guillaume", href: "/a-propos" },
          { label: "Le programme", href: "/programme" },
          { label: "Réserver un appel", href: "/contact" },
        ],
      },
      {
        h: "Le sérieux",
        items: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Confidentialité", href: "/confidentialite" },
          { label: "AI Act & RGPD", href: "/confidentialite" },
        ],
      },
    ],
    baseline: "Basé entre la France et l'Asie · 100 % visio toute l'année",
  },
};

const en: Marketing = {
  hero: {
    kicker: "AI training · Small & mid-sized businesses",
    titleBefore: "Set sail with ",
    titleEmphasis: "AI",
    titleAfter: ".",
    lead: "Train your leaders and teams in generative AI, over video, without jargon. Concrete results from the very first week — AI Act compliance included.",
    ctaPrimary: "Book a discovery call",
    ctaSecondary: "See the courses",
    proof: ["100% remote, across France", "No jargon", "AI Act & GDPR compliant"],
  },
  footer: {
    kicker: "Let's stay in touch",
    voiceBefore: "A question, a doubt, a project? Write to Guillaume — ",
    voiceEmphasis: "he answers you himself",
    voiceAfter: ", in person, within 24 h.",
    ctaPrimary: "Book a discovery call",
    tagline: "Generative-AI training for small and mid-sized French businesses. 100% remote, no jargon, at a pace that suits you.",
    cols: [
      {
        h: "Learn",
        items: [
          { label: "AI awareness", href: "/programme" },
          { label: "AI every day", href: "/programme" },
          { label: "Leadership coaching", href: "/programme" },
        ],
      },
      {
        h: "Largo IA",
        items: [
          { label: "Meet Guillaume", href: "/a-propos" },
          { label: "The programme", href: "/programme" },
          { label: "Book a call", href: "/contact" },
        ],
      },
      {
        h: "The serious bits",
        items: [
          { label: "Legal notice", href: "/mentions-legales" },
          { label: "Privacy", href: "/confidentialite" },
          { label: "AI Act & GDPR", href: "/confidentialite" },
        ],
      },
    ],
    baseline: "Based between France and Asia · 100% remote, all year round",
  },
};

const MARKETING: Record<Locale, Marketing> = { fr, en };

export function getMarketing(locale: Locale): Marketing {
  return MARKETING[locale];
}
