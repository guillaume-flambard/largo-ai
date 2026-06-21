import type { Locale } from "@/lib/i18n";

/** Copies bilingues des pages secondaires (a-propos, contact, chrome /programme).
 *  Même esprit que lib/marketing.ts : la page lit la locale et pioche ici. */

export type ContactFormCopy = {
  sentTitle: string;
  sentBody: string;
  sentFallbackPre: string;
  name: string;
  namePh: string;
  company: string;
  companyPh: string;
  teamSize: string;
  teamSizePh: string;
  email: string;
  emailPh: string;
  need: string;
  needPh: string;
  submit: string;
  privacy: string;
  badge: string;
};

type OfferCopy = {
  name: string;
  format: string;
  price: string;
  priceNote?: string;
  audience: string;
  ctaLabel?: string;
  benefits: string[];
};

export type PageCopy = {
  auth: {
    signIn: string;
    mySpace: string;
    signOut: string;
    pageTitle: string;
    pageSubtitle: string;
    withGoogle: string;
    withMicrosoft: string;
    dashboardTitle: string;
    resume: string;
    lessonsDone: string;
    overall: string;
  };
  formateur: {
    label: string;
    on: string;
    off: string;
    hint: string;
  };
  aPropos: {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroSubtitle: string;
    cardRole: string;
    bodyTitle: string;
    bodyP1: string;
    bodyP2: string;
    location: string;
    methodEyebrow: string;
    methodTitle: string;
    principles: { t: string; d: string }[];
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    stepsEyebrow: string;
    stepsTitle: string;
    steps: { t: string; d: string }[];
    bookingStrong: string;
    bookingText: string;
    form: ContactFormCopy;
  };
  programme: {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    contentEyebrow: string;
    contentTitle: string;
    formatsEyebrow: string;
    formatsTitle: string;
    formatsSubtitle: string;
    financingStrong: string;
    financingText: string;
    offers: OfferCopy[];
  };
};

const fr: PageCopy = {
  auth: {
    signIn: "Se connecter",
    mySpace: "Mon espace",
    signOut: "Déconnexion",
    pageTitle: "Connexion à votre espace",
    pageSubtitle: "Connectez-vous pour suivre votre progression et retrouver votre programme.",
    withGoogle: "Continuer avec Google",
    withMicrosoft: "Continuer avec Microsoft",
    dashboardTitle: "Mon programme",
    resume: "Reprendre",
    lessonsDone: "leçons",
    overall: "Progression globale",
  },
  formateur: {
    label: "Mode formateur",
    on: "activé",
    off: "désactivé",
    hint: "Vous animez des formations ? Activez le mode formateur pour afficher, dans chaque leçon, les notes d'animation réservées — et le module « Devenir formateur ».",
  },
  aPropos: {
    metaTitle: "Le formateur",
    metaDescription:
      "Guillaume Flambard, formateur IA pour les TPE et PME. Une méthode en trois principes : zéro jargon, sur vos vrais cas, autonomie durable. 100 % en visio, toute l'année.",
    heroEyebrow: "Le formateur",
    heroSubtitle:
      "Formateur IA pour les TPE et PME. J'aide les dirigeants et leurs équipes à utiliser l'IA générative de façon concrète, utile et conforme — sans jargon.",
    cardRole: "Formateur IA · TPE / PME",
    bodyTitle: "Rendre l'IA simple, utile et conforme",
    bodyP1:
      "La plupart des dirigeants de TPE/PME entendent parler d'IA partout, sans savoir par où commencer ni comment rester dans les clous. Mon métier : transformer ce flou en gestes concrets, sur vos propres cas, en quelques sessions.",
    bodyP2:
      "Pas de conférence théorique : on ouvre vos outils, on travaille vos vrais documents, et on repart avec des méthodes réutilisables. Chaque parcours intègre le volet conformité (RGPD, AI Act) pour que vous avanciez l'esprit tranquille.",
    location: "Basé entre la France et l'Asie · 100 % visio toute l'année",
    methodEyebrow: "La méthode",
    methodTitle: "Une méthode simple, en trois principes",
    principles: [
      { t: "Zéro jargon", d: "On parle métier, résultats et temps gagné — jamais technique pour la technique." },
      { t: "Sur vos vrais cas", d: "On travaille sur vos documents, vos outils et vos objectifs, pas des exemples génériques." },
      { t: "Autonomie durable", d: "Vous repartez capables de continuer seuls, sans dépendance à un prestataire." },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Réservez un appel découverte de 30 minutes avec Guillaume Flambard, ou écrivez-nous. On évalue vos besoins en IA, sans engagement.",
    heroEyebrow: "Contact",
    heroTitle: "Parlons de votre projet",
    heroSubtitle:
      "Réservez un appel découverte ou envoyez-nous un message. Réponse sous 24 h ouvrées, sans engagement.",
    stepsEyebrow: "Comment ça se passe",
    stepsTitle: "Trois étapes, sans pression",
    steps: [
      { t: "Vous nous écrivez", d: "Quelques mots sur votre activité, votre équipe et vos objectifs." },
      { t: "Appel découverte (30 min)", d: "On clarifie vos besoins et on vérifie que l'on peut vous aider." },
      { t: "Proposition sur-mesure", d: "Un programme et un format adaptés, avec un devis clair." },
    ],
    bookingStrong: "Prise de rendez-vous —",
    bookingText:
      " l'agenda de réservation (Cal.com) s'intègre ici. En attendant, écrivez-nous : on vous propose un créneau rapidement.",
    form: {
      sentTitle: "Message envoyé !",
      sentBody:
        "Votre messagerie s'ouvre avec votre demande pré-remplie — il ne reste qu'à l'envoyer. Guillaume vous répond sous 24 h ouvrées.",
      sentFallbackPre: "Rien ne s'est ouvert ? Écrivez directement à",
      name: "Nom",
      namePh: "Votre nom",
      company: "Entreprise",
      companyPh: "Votre société",
      teamSize: "Taille d'équipe",
      teamSizePh: "ex. 8",
      email: "Email professionnel",
      emailPh: "vous@entreprise.fr",
      need: "Votre besoin",
      needPh: "En quelques mots : vos objectifs, votre équipe, vos outils…",
      submit: "Envoyer ma demande",
      privacy: "Vos données ne servent qu'à vous recontacter (RGPD). Aucune newsletter, aucun partage.",
      badge: "Réponse sous 24 h ouvrées",
    },
  },
  programme: {
    metaTitle: "Programme",
    metaDescription:
      "Un parcours IA en modules conçu pour les TPE/PME : fondamentaux & posture, écrire & communiquer, marketing & contenu, productivité & automatisation, sécurité & conformité. Trois formats au choix.",
    heroEyebrow: "Le programme",
    heroTitle: "Un parcours IA conçu pour votre métier",
    heroSubtitle:
      "Des modules concrets, travaillés sur vos vrais cas et vos propres outils. On adapte la profondeur de chaque module à votre format et à votre équipe.",
    contentEyebrow: "Le contenu",
    contentTitle: "Des modules, du fondamental à la conformité",
    formatsEyebrow: "Les formats",
    formatsTitle: "Trois intensités, selon vos objectifs",
    formatsSubtitle:
      "Le même fond, calibré différemment : de la sensibilisation à l'accompagnement sur-mesure du dirigeant.",
    financingStrong: "Financement —",
    financingText:
      " La certification Qualiopi, qui ouvre le financement par votre OPCO, est en cours d'obtention. Parlons de votre situation lors de l'appel découverte : on vous oriente vers les dispositifs mobilisables.",
    offers: [
      {
        name: "Acculturation IA",
        format: "Demi-journée (3h30) · visio",
        price: "dès 690 €",
        priceNote: "HT / groupe",
        audience: "Sensibiliser, lever les freins",
        ctaLabel: "Réserver un appel",
        benefits: ["Comprendre l'IA sans jargon", "Repérer vos premiers cas d'usage", "Lever les craintes de l'équipe"],
      },
      {
        name: "L'IA au quotidien",
        format: "2 jours (4×3h30) · visio",
        price: "dès 1 900 €",
        priceNote: "HT / groupe",
        audience: "Monter en compétence toute l'équipe",
        benefits: [
          "Écrire & communiquer plus vite",
          "Marketing & création de contenu",
          "Productivité & automatisation",
          "Sécurité, RGPD & AI Act",
        ],
      },
      {
        name: "Accompagnement dirigeant",
        format: "Parcours 4–6 semaines",
        price: "sur devis",
        audience: "Transformation + mise en conformité",
        ctaLabel: "En parler",
        benefits: ["Feuille de route IA sur-mesure", "Sessions individuelles", "Conformité AI Act de l'entreprise"],
      },
    ],
  },
};

const en: PageCopy = {
  auth: {
    signIn: "Sign in",
    mySpace: "My space",
    signOut: "Sign out",
    pageTitle: "Sign in to your space",
    pageSubtitle: "Sign in to track your progress and find your programme.",
    withGoogle: "Continue with Google",
    withMicrosoft: "Continue with Microsoft",
    dashboardTitle: "My programme",
    resume: "Resume",
    lessonsDone: "lessons",
    overall: "Overall progress",
  },
  formateur: {
    label: "Trainer mode",
    on: "on",
    off: "off",
    hint: "Run training sessions? Turn on trainer mode to reveal, in each lesson, the reserved facilitation notes — and the « Becoming a trainer » module.",
  },
  aPropos: {
    metaTitle: "The trainer",
    metaDescription:
      "Guillaume Flambard, AI trainer for small and medium businesses. A method in three principles: zero jargon, on your real cases, lasting autonomy. 100% remote, all year round.",
    heroEyebrow: "The trainer",
    heroSubtitle:
      "AI trainer for small and medium businesses. I help leaders and their teams use generative AI in a concrete, useful and compliant way — without jargon.",
    cardRole: "AI trainer · Small & medium business",
    bodyTitle: "Making AI simple, useful and compliant",
    bodyP1:
      "Most small-business leaders hear about AI everywhere, without knowing where to start or how to stay on the right side of the rules. My job: turning that fog into concrete moves, on your own cases, in a few sessions.",
    bodyP2:
      "No theoretical lecture: we open your tools, work on your real documents, and you leave with reusable methods. Every programme includes the compliance side (GDPR, AI Act) so you can move forward with peace of mind.",
    location: "Based between France and Asia · 100% remote, all year round",
    methodEyebrow: "The method",
    methodTitle: "A simple method, in three principles",
    principles: [
      { t: "Zero jargon", d: "We talk trade, results and time saved — never technique for its own sake." },
      { t: "On your real cases", d: "We work on your documents, your tools and your goals, not generic examples." },
      { t: "Lasting autonomy", d: "You leave able to carry on alone, with no dependence on a provider." },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Book a 30-minute discovery call with Guillaume Flambard, or write to us. We assess your AI needs, with no commitment.",
    heroEyebrow: "Contact",
    heroTitle: "Let's talk about your project",
    heroSubtitle:
      "Book a discovery call or send us a message. Reply within 24 working hours, no commitment.",
    stepsEyebrow: "How it works",
    stepsTitle: "Three steps, no pressure",
    steps: [
      { t: "You write to us", d: "A few words about your activity, your team and your goals." },
      { t: "Discovery call (30 min)", d: "We clarify your needs and check that we can help." },
      { t: "Tailored proposal", d: "A programme and format that fit, with a clear quote." },
    ],
    bookingStrong: "Booking —",
    bookingText:
      " the booking calendar (Cal.com) plugs in here. In the meantime, write to us: we'll offer you a slot quickly.",
    form: {
      sentTitle: "Message sent!",
      sentBody:
        "Your email app opens with your request pre-filled — all that's left is to send it. Guillaume replies within 24 working hours.",
      sentFallbackPre: "Nothing opened? Write directly to",
      name: "Name",
      namePh: "Your name",
      company: "Company",
      companyPh: "Your company",
      teamSize: "Team size",
      teamSizePh: "e.g. 8",
      email: "Work email",
      emailPh: "you@company.com",
      need: "Your need",
      needPh: "In a few words: your goals, your team, your tools…",
      submit: "Send my request",
      privacy: "Your data is only used to get back to you (GDPR). No newsletter, no sharing.",
      badge: "Reply within 24 working hours",
    },
  },
  programme: {
    metaTitle: "Programme",
    metaDescription:
      "An AI programme in modules designed for small and medium businesses: fundamentals & posture, writing & communicating, marketing & content, productivity & automation, security & compliance. Three formats to choose from.",
    heroEyebrow: "The programme",
    heroTitle: "An AI journey designed for your trade",
    heroSubtitle:
      "Concrete modules, worked on your real cases and your own tools. We adapt the depth of each module to your format and your team.",
    contentEyebrow: "The content",
    contentTitle: "Modules, from the fundamentals to compliance",
    formatsEyebrow: "The formats",
    formatsTitle: "Three intensities, depending on your goals",
    formatsSubtitle:
      "The same substance, calibrated differently: from awareness-raising to bespoke support for the leader.",
    financingStrong: "Funding —",
    financingText:
      " Qualiopi certification, which unlocks funding through your OPCO, is being obtained. Let's discuss your situation on the discovery call: we'll point you to the available schemes.",
    offers: [
      {
        name: "AI awareness",
        format: "Half-day (3h30) · remote",
        price: "from €690",
        priceNote: "excl. tax / group",
        audience: "Raise awareness, lift the blockers",
        ctaLabel: "Book a call",
        benefits: ["Understand AI without jargon", "Spot your first use cases", "Ease the team's worries"],
      },
      {
        name: "AI in daily work",
        format: "2 days (4×3h30) · remote",
        price: "from €1,900",
        priceNote: "excl. tax / group",
        audience: "Upskill the whole team",
        benefits: [
          "Write & communicate faster",
          "Marketing & content creation",
          "Productivity & automation",
          "Security, GDPR & AI Act",
        ],
      },
      {
        name: "Leader support",
        format: "4–6 week journey",
        price: "on quote",
        audience: "Transformation + compliance",
        ctaLabel: "Discuss it",
        benefits: ["Bespoke AI roadmap", "One-to-one sessions", "Company AI Act compliance"],
      },
    ],
  },
};

const PAGES: Record<Locale, PageCopy> = { fr, en };

export function getPageCopy(locale: Locale): PageCopy {
  return PAGES[locale];
}
