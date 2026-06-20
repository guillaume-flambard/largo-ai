import type { Locale } from "@/lib/i18n";

type TitleDesc = { t: string; d: string };
type Offer = {
  name: string;
  format: string;
  price: string;
  priceNote?: string;
  audience: string;
  benefits: string[];
  ctaLabel?: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
};

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
  atouts: { kicker: string; title: string; subtitle: string; items: TitleDesc[] };
  manifesto: {
    kicker: string;
    before: string;
    emphasis: string;
    after: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  offers: { kicker: string; title: string; subtitle: string; items: Offer[] };
  how: { kicker: string; title: string; steps: TitleDesc[] };
  trainer: {
    kicker: string;
    title: string;
    name: string;
    role: string;
    principles: TitleDesc[];
    cta: string;
  };
  faq: { kicker: string; title: string; items: { q: string; a: string; open?: boolean }[] };
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
  atouts: {
    kicker: "Pourquoi Largo IA",
    title: "Une formation faite pour les petites entreprises",
    subtitle:
      "Pas une conférence théorique. Un accompagnement pragmatique, conçu pour des équipes qui n'ont pas de temps à perdre.",
    items: [
      { t: "100 % en visio", d: "Aucun déplacement. Vos équipes se forment depuis leur bureau, partout en France — caméra allumée, en petit groupe." },
      { t: "Du concret, vite", d: "On travaille sur vos vrais cas et vos propres outils. Des résultats applicables dès la première semaine, pas dans six mois." },
      { t: "Conforme & sécurisé", d: "RGPD et AI Act intégrés à chaque parcours. Vos données restent protégées, vos usages restent dans les clous." },
      { t: "Pensé pour les TPE / PME", d: "Petits groupes, sans jargon, au rythme d'équipes qui ont un métier à faire tourner et peu de temps à y consacrer." },
    ],
  },
  manifesto: {
    kicker: "Notre conviction",
    before: "Pas besoin d'être technicien, ni de tout changer. Quelques heures, vos propres outils, une méthode claire — et l'IA devient ",
    emphasis: "un réflexe utile",
    after: ", pas une source de stress.",
    ctaPrimary: "Réserver un appel découverte",
    ctaSecondary: "Découvrir le programme",
  },
  offers: {
    kicker: "Les formations",
    title: "Trois façons de prendre le large",
    subtitle: "De la première sensibilisation à l'accompagnement sur-mesure du dirigeant.",
    items: [
      {
        name: "Acculturation IA",
        format: "Demi-journée (3h30) · visio",
        price: "dès 690 €",
        priceNote: "HT / groupe",
        audience: "Sensibiliser, lever les freins",
        ctaLabel: "Réserver un appel",
        ctaHref: "#contact",
        benefits: ["Comprendre l'IA sans jargon", "Repérer vos premiers cas d'usage", "Lever les craintes de l'équipe"],
      },
      {
        name: "L'IA au quotidien",
        format: "2 jours (4×3h30) · visio",
        price: "dès 1 900 €",
        priceNote: "HT / groupe",
        audience: "Monter en compétence toute l'équipe",
        ctaHref: "#contact",
        featured: true,
        ctaLabel: "Réserver un appel",
        badge: "Le plus choisi",
        benefits: ["Écrire & communiquer plus vite", "Marketing & création de contenu", "Productivité & automatisation", "Sécurité, RGPD & AI Act"],
      },
      {
        name: "Accompagnement dirigeant",
        format: "Parcours 4–6 semaines",
        price: "sur devis",
        audience: "Transformation + mise en conformité",
        ctaLabel: "En parler",
        ctaHref: "#contact",
        benefits: ["Feuille de route IA sur-mesure", "Sessions individuelles", "Conformité AI Act de l'entreprise"],
      },
    ],
  },
  how: {
    kicker: "Comment ça marche",
    title: "Du premier appel à l'autonomie",
    steps: [
      { t: "Appel découverte", d: "30 minutes pour comprendre votre activité, vos outils et vos objectifs." },
      { t: "Programme sur-mesure", d: "On construit un parcours adapté à vos vrais cas — rien d'inutile." },
      { t: "Sessions en visio", d: "En direct, en petits groupes, avec des exercices sur vos documents." },
      { t: "Suivi & autonomie", d: "On vérifie que les acquis tiennent dans la durée, sans dépendance." },
    ],
  },
  trainer: {
    kicker: "Le formateur",
    title: "Une méthode simple, en trois principes",
    name: "Guillaume Flambard",
    role: "Formateur IA · TPE / PME",
    principles: [
      { t: "Zéro jargon", d: "On parle métier, pas technique." },
      { t: "Sur vos vrais cas", d: "Vos documents, vos outils, vos objectifs." },
      { t: "Autonomie durable", d: "Vous repartez capables, sans dépendance." },
    ],
    cta: "En savoir plus sur Guillaume",
  },
  faq: {
    kicker: "Questions fréquentes",
    title: "Tout ce que vous vous demandez",
    items: [
      { q: "Faut-il des prérequis techniques ?", a: "Aucun. On part de votre niveau actuel, de vos outils et de vos vrais cas. Si vous savez écrire un email, vous pouvez suivre.", open: true },
      { q: "Comment se déroulent les sessions en visio ?", a: "En direct, en petits groupes, avec partage d'écran et exercices pratiques sur vos propres documents. Un support est fourni après chaque session." },
      { q: "Les formations sont-elles finançables par mon OPCO ?", a: "La certification Qualiopi — celle qui ouvre le financement par votre OPCO — est en cours d'obtention. En attendant, on regarde ensemble votre situation lors de l'appel découverte et on vous indique les démarches. Dès la certification obtenue, nos parcours sont finançables OPCO." },
      { q: "En quoi êtes-vous concernés par l'AI Act ?", a: "Depuis 2025, former vos équipes à un usage responsable de l'IA devient une obligation, avec premières sanctions dès août 2026. Chaque parcours intègre ce volet conformité." },
      { q: "Quelle est la taille idéale des groupes ?", a: "De 1 à 8 personnes pour garder de l'interaction. Au-delà, on organise plusieurs sessions pour préserver la qualité." },
    ],
  },
  footer: {
    kicker: "Restons en contact",
    voiceBefore: "Une question, un doute, un projet ? Écrivez à Guillaume — ",
    voiceEmphasis: "c'est lui qui vous répond",
    voiceAfter: ", en personne, sous 24 h.",
    ctaPrimary: "Réserver un appel découverte",
    tagline: "Formation à l'IA générative pour les TPE et PME françaises. 100 % en visio, sans jargon, au tempo qui vous va.",
    cols: [
      { h: "Se former", items: [{ label: "Acculturation IA", href: "/programme" }, { label: "L'IA au quotidien", href: "/programme" }, { label: "Accompagnement dirigeant", href: "/programme" }] },
      { h: "Largo IA", items: [{ label: "Rencontrer Guillaume", href: "/a-propos" }, { label: "Le programme", href: "/programme" }, { label: "Réserver un appel", href: "/contact" }] },
      { h: "Le sérieux", items: [{ label: "Mentions légales", href: "/mentions-legales" }, { label: "Confidentialité", href: "/confidentialite" }, { label: "AI Act & RGPD", href: "/confidentialite" }] },
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
  atouts: {
    kicker: "Why Largo IA",
    title: "Training built for small businesses",
    subtitle: "Not a theory lecture. Pragmatic support, built for teams with no time to waste.",
    items: [
      { t: "100% remote", d: "No travel. Your teams learn from their desk, anywhere in France — camera on, in small groups." },
      { t: "Concrete, fast", d: "We work on your real cases and your own tools. Results you can apply from week one, not in six months." },
      { t: "Compliant & secure", d: "GDPR and the AI Act built into every course. Your data stays protected, your usage stays within the rules." },
      { t: "Built for small & mid-sized firms", d: "Small groups, no jargon, at the pace of teams that have a business to run and little time to spare." },
    ],
  },
  manifesto: {
    kicker: "Our conviction",
    before: "No need to be technical, no need to change everything. A few hours, your own tools, a clear method — and AI becomes ",
    emphasis: "a useful habit",
    after: ", not a source of stress.",
    ctaPrimary: "Book a discovery call",
    ctaSecondary: "Explore the programme",
  },
  offers: {
    kicker: "The courses",
    title: "Three ways to set sail",
    subtitle: "From first awareness to tailored one-to-one coaching for leaders.",
    items: [
      {
        name: "AI awareness",
        format: "Half-day (3.5h) · remote",
        price: "from €690",
        priceNote: "excl. VAT / group",
        audience: "Raise awareness, ease concerns",
        ctaLabel: "Book a call",
        ctaHref: "#contact",
        benefits: ["Understand AI without jargon", "Spot your first use cases", "Ease the team's worries"],
      },
      {
        name: "AI every day",
        format: "2 days (4×3.5h) · remote",
        price: "from €1,900",
        priceNote: "excl. VAT / group",
        audience: "Upskill the whole team",
        ctaHref: "#contact",
        featured: true,
        ctaLabel: "Book a call",
        badge: "Most chosen",
        benefits: ["Write & communicate faster", "Marketing & content creation", "Productivity & automation", "Security, GDPR & AI Act"],
      },
      {
        name: "Leadership coaching",
        format: "4–6 week journey",
        price: "on quote",
        audience: "Transformation + compliance",
        ctaLabel: "Let's talk",
        ctaHref: "#contact",
        benefits: ["Tailored AI roadmap", "One-to-one sessions", "Company-wide AI Act compliance"],
      },
    ],
  },
  how: {
    kicker: "How it works",
    title: "From the first call to autonomy",
    steps: [
      { t: "Discovery call", d: "30 minutes to understand your business, your tools and your goals." },
      { t: "Tailored programme", d: "We build a path matched to your real cases — nothing wasted." },
      { t: "Remote sessions", d: "Live, in small groups, with exercises on your own documents." },
      { t: "Follow-up & autonomy", d: "We make sure the skills last, with no dependency." },
    ],
  },
  trainer: {
    kicker: "The trainer",
    title: "A simple method, in three principles",
    name: "Guillaume Flambard",
    role: "AI trainer · Small & mid-sized businesses",
    principles: [
      { t: "Zero jargon", d: "We talk business, not tech." },
      { t: "On your real cases", d: "Your documents, your tools, your goals." },
      { t: "Lasting autonomy", d: "You leave capable, with no dependency." },
    ],
    cta: "More about Guillaume",
  },
  faq: {
    kicker: "Frequently asked",
    title: "Everything you're wondering",
    items: [
      { q: "Any technical prerequisites?", a: "None. We start from your current level, your tools and your real cases. If you can write an email, you can follow along.", open: true },
      { q: "How do the remote sessions work?", a: "Live, in small groups, with screen sharing and hands-on exercises on your own documents. Notes are provided after each session." },
      { q: "Can the training be funded by my OPCO?", a: "The Qualiopi certification — the one that unlocks OPCO funding — is being obtained. In the meantime, we review your situation together on the discovery call and point you to the steps. Once certified, our courses are OPCO-fundable." },
      { q: "How does the AI Act concern you?", a: "Since 2025, training your teams in responsible AI use is becoming a legal obligation, with first penalties from August 2026. Every course includes this compliance dimension." },
      { q: "What's the ideal group size?", a: "1 to 8 people to keep interaction high. Beyond that, we run several sessions to preserve quality." },
    ],
  },
  footer: {
    kicker: "Let's stay in touch",
    voiceBefore: "A question, a doubt, a project? Write to Guillaume — ",
    voiceEmphasis: "he answers you himself",
    voiceAfter: ", in person, within 24 h.",
    ctaPrimary: "Book a discovery call",
    tagline: "Generative-AI training for small and mid-sized French businesses. 100% remote, no jargon, at a pace that suits you.",
    cols: [
      { h: "Learn", items: [{ label: "AI awareness", href: "/programme" }, { label: "AI every day", href: "/programme" }, { label: "Leadership coaching", href: "/programme" }] },
      { h: "Largo IA", items: [{ label: "Meet Guillaume", href: "/a-propos" }, { label: "The programme", href: "/programme" }, { label: "Book a call", href: "/contact" }] },
      { h: "The serious bits", items: [{ label: "Legal notice", href: "/mentions-legales" }, { label: "Privacy", href: "/confidentialite" }, { label: "AI Act & GDPR", href: "/confidentialite" }] },
    ],
    baseline: "Based between France and Asia · 100% remote, all year round",
  },
};

const MARKETING: Record<Locale, Marketing> = { fr, en };

export function getMarketing(locale: Locale): Marketing {
  return MARKETING[locale];
}
