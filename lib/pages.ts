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

/** One half-day or full-day block inside a formule (e.g. Flagship Jour 1, Diagnostic, etc.) */
type CurriculumBlock = {
  title: string;
  items: string[];
};

/** One formule with its day-by-day curriculum breakdown. */
type CurriculumItem = {
  /** e.g. "flagship-j1" — stable identifier, not rendered */
  key: string;
  /** e.g. "Flagship — Jour 1" */
  label: string;
  /** e.g. "Journée complète" */
  format: string;
  blocks: CurriculumBlock[];
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
    savePrompt: string;
    importPrompt: string;
    importCta: string;
    importDismiss: string;
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
    whyTitle: string;
    location: string;
    locationIcon: string;
    reserveLabel: string;
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
    emailHint: string;
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
    /** Section heading for the 5 learning objectives. */
    objectivesEyebrow: string;
    objectivesTitle: string;
    /** The 5 "capable de…" learning objectives (dossier §6). */
    objectives: string[];
    /** Section heading for the detailed formules. */
    formulesEyebrow: string;
    formulesTitle: string;
    formulesSubtitle: string;
    /** Day-by-day curriculum breakdown for each formule. */
    curriculum: CurriculumItem[];
    formatsEyebrow: string;
    formatsTitle: string;
    formatsSubtitle: string;
    financingStrong: string;
    financingText: string;
    filterAll: string;
    filterTeams: string;
    filterTrainer: string;
    lessonsWord: string;
    viewModule: string;
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
    savePrompt: "Connectez-vous pour sauvegarder votre progression et la retrouver sur tous vos appareils.",
    importPrompt: "Vous avez de la progression enregistrée hors connexion. La rapatrier sur votre compte ?",
    importCta: "Importer",
    importDismiss: "Plus tard",
  },
  formateur: {
    label: "Mode formateur",
    on: "activé",
    off: "désactivé",
    hint: "Vous animez des formations ? Activez le mode formateur pour afficher, dans chaque leçon, les notes d'animation réservées — et le module « Devenir formateur ».",
  },
  aPropos: {
    metaTitle: "Le formateur — AI-First Engineering",
    metaDescription:
      "Guillaume Flambard orchestre un SaaS en production 100 % AI-first depuis plusieurs années. Il forme les équipes de développement à l'ingénierie augmentée par l'IA — il enseigne ce qu'il pratique.",
    heroEyebrow: "Le formateur",
    heroSubtitle:
      "Je dirige le développement d'un SaaS en production en mode 100 % AI-first. Je n'écris plus de code à la main — j'orchestre des agents, j'automatise, j'opère. J'enseigne ce que je pratique.",
    cardRole: "AI-First Engineering · Équipes de développement",
    bodyTitle: "Une expertise pratique, pas théorique",
    bodyP1:
      "La quasi-totalité des formations IA s'arrêtent à ChatGPT et au prompt de base. Ce segment est saturé — et inutile pour une équipe dev. Ce qui compte pour vos équipes, c'est comment travailler réellement avec des agents de code en production : cadrer, orchestrer, livrer, garder la qualité.",
    bodyP2:
      "Je pratique cette méthode au quotidien sur ma propre codebase. Je sais où l'IA aide, où elle dégrade, ce qu'on ne délègue jamais. Chaque formation intègre le volet réglementaire (AI Act, politique d'usage, gouvernance) pour que vos équipes avancent sans risque juridique.",
    whyTitle: "Pourquoi Largo IA",
    location: "Basé entre la France et l'Asie · Intra-entreprise, sur site ou remote",
    locationIcon: "apartment",
    reserveLabel: "Réserver un appel",
    methodEyebrow: "La méthode",
    methodTitle: "Une méthode en trois principes",
    principles: [
      { t: "J'enseigne ce que je pratique", d: "SaaS en prod 100 % AI-first — pas un consultant qui a lu la doc." },
      { t: "Sur votre vraie codebase", d: "On travaille sur vos projets réels, vos outils, vos contraintes — pas des exemples génériques." },
      { t: "Des garde-fous, pas des slides", d: "Chaque formation produit un playbook, des templates et une checklist opérationnels — vous repartez avec des outils, pas des notes." },
    ],
  },
  contact: {
    metaTitle: "Contact — AI-First Engineering",
    metaDescription:
      "Réservez un appel avec Guillaume Flambard pour évaluer les besoins de votre équipe dev en ingénierie AI-first. Formation intra-entreprise, sur devis, sans engagement.",
    heroEyebrow: "Contact",
    heroTitle: "Parlons de votre équipe dev",
    heroSubtitle:
      "Réservez un appel ou envoyez-nous un message. On évalue vos besoins, on calibre le format — réponse sous 24 h ouvrées, sans engagement.",
    stepsEyebrow: "Comment ça se passe",
    stepsTitle: "Trois étapes, sans pression",
    steps: [
      { t: "Vous nous écrivez", d: "Quelques mots sur votre équipe, votre stack, vos usages IA actuels et vos objectifs." },
      { t: "Appel découverte (30 min)", d: "On clarifie vos besoins, on identifie les écarts et on vérifie qu'on peut vous aider." },
      { t: "Proposition sur-mesure", d: "Un format et un programme adaptés à votre équipe, avec un devis clair." },
    ],
    bookingStrong: "Prise de rendez-vous —",
    bookingText:
      " l'agenda de réservation (Cal.com) s'intègre ici. En attendant, écrivez-nous : on vous propose un créneau rapidement.",
    emailHint: "Ou écrivez directement à",
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
      needPh: "En quelques mots : vos objectifs, la taille de l'équipe dev, vos outils et usages IA actuels…",
      submit: "Envoyer ma demande",
      privacy: "Vos données ne servent qu'à vous recontacter (RGPD). Aucune newsletter, aucun partage.",
      badge: "Réponse sous 24 h ouvrées",
    },
  },
  programme: {
    metaTitle: "Programme — Le cursus AI-First Engineering",
    metaDescription:
      "Le cursus AI-First Engineering : maîtrisez l'ingénierie augmentée par l'IA en équipe dev. Posture AI-first, context engineering, livraison, garde-fous, pipeline et gouvernance AI Act. Formation intra, sur devis.",
    heroEyebrow: "Le cursus",
    heroTitle: "AI-First Engineering — Le cursus pour équipes dev",
    heroSubtitle:
      "6 modules, de la posture AI-first à la gouvernance AI Act. Conçu pour les développeurs en activité — on travaille sur votre vraie codebase, avec vos outils.",
    contentEyebrow: "Le contenu",
    contentTitle: "Des modules du fondamental à la gouvernance",
    objectivesEyebrow: "Ce que vous saurez faire",
    objectivesTitle: "À l'issue, capable de…",
    objectives: [
      "Cadrer une tâche pour un agent — contexte, specs, contraintes — et obtenir un résultat exploitable du premier coup.",
      "Livrer une feature de bout en bout sur une vraie codebase en mode AI-first.",
      "Appliquer les garde-fous : revue de code IA, tests, sécurité — et identifier ce qu'on ne délègue jamais.",
      "Intégrer le workflow IA dans un pipeline réel (Git, CI, QA automatisée).",
      "Mesurer le gain de productivité et arbitrer : où l'IA aide vs. dégrade.",
    ],
    formulesEyebrow: "Les formules en détail",
    formulesTitle: "Trois niveaux d'engagement, un seul objectif",
    formulesSubtitle:
      "Choisissez la formule adaptée à vos besoins — toutes sont sur devis, intra-entreprise.",
    curriculum: [
      {
        key: "flagship-j1",
        label: "Flagship — Jour 1",
        format: "Journée complète · équipe dev",
        blocks: [
          {
            title: "Matin — Fondations",
            items: [
              "Orchestrer ≠ coder : le nouveau rôle du développeur",
              "Choisir et configurer les outils (Claude Code, Cursor)",
              "Context engineering : cadrer un agent pour qu'il livre juste (fichiers CLAUDE.md, specs, conventions)",
            ],
          },
          {
            title: "Après-midi — Premier workflow réel",
            items: [
              "Atelier : chaque développeur livre une première fonctionnalité sur sa propre codebase",
              "De la spec au commit, en mode AI-first",
            ],
          },
        ],
      },
      {
        key: "flagship-j2",
        label: "Flagship — Jour 2",
        format: "Journée complète · équipe dev",
        blocks: [
          {
            title: "Matin — Passage à l'échelle",
            items: [
              "Dev piloté par les specs, découpage des tâches",
              "Revue de code assistée par IA",
              "Tests & QA automatisée",
            ],
          },
          {
            title: "Après-midi — Qualité & gouvernance",
            items: [
              "Garde-fous : sécurité, dette, ce qu'on ne délègue jamais",
              "Intégration pipeline Git/CI",
              "Patterns avancés (multi-agents = pattern) — aperçu",
              "Mesurer et arbitrer le ROI",
            ],
          },
        ],
      },
      {
        key: "diagnostic",
        label: "Diagnostic",
        format: "1 jour · équipe dev",
        blocks: [
          {
            title: "Matin",
            items: [
              "Posture AI-first + configuration des outils",
              "Context engineering en pratique",
            ],
          },
          {
            title: "Après-midi",
            items: [
              "Atelier : première fonctionnalité livrée",
              "Identification des écarts",
              "Livrable : mini-rapport d'écarts + recommandations",
            ],
          },
        ],
      },
      {
        key: "module-direction",
        label: "Module Direction",
        format: "½ jour · direction / DSI / DRH",
        blocks: [
          {
            title: "Contenu",
            items: [
              "Essentiel de l'AI Act + échéance août 2026",
              "Construire une politique d'usage IA",
              "Sortir du Shadow AI — cadre et gouvernance",
              "Mesurer le ROI business de la formation",
            ],
          },
        ],
      },
    ],
    formatsEyebrow: "Les formats",
    formatsTitle: "Trois formules, selon vos objectifs",
    formatsSubtitle:
      "Diagnostic 1 j · Flagship 2 j · Pack complet 2 j + ½ j direction. Sur devis, intra-entreprise.",
    financingStrong: "Financement —",
    financingText:
      " La certification Qualiopi est en cours d'obtention (prochainement éligible OPCO). Parlons de votre situation lors de l'appel découverte.",
    filterAll: "Tous les modules",
    filterTeams: "Pour les équipes",
    filterTrainer: "Train-the-trainer",
    lessonsWord: "leçons",
    viewModule: "Voir le module",
    offers: [
      {
        name: "Diagnostic",
        format: "1 jour · intra-entreprise",
        price: "sur devis",
        audience: "Équipe dev",
        ctaLabel: "Réserver un appel",
        benefits: [
          "Posture AI-first + config outils",
          "Context engineering",
          "Atelier première fonctionnalité",
          "Mini-rapport d'écarts + recommandations",
        ],
      },
      {
        name: "Flagship",
        format: "2 jours · intra-entreprise",
        price: "sur devis",
        audience: "Équipe dev",
        ctaLabel: "Réserver un appel",
        benefits: [
          "Fondations & premier workflow réel (Jour 1)",
          "Passage à l'échelle & qualité (Jour 2)",
          "Garde-fous, pipeline Git/CI, mesure du ROI",
          "Playbook AI-first personnalisé",
        ],
      },
      {
        name: "Pack complet",
        format: "2 jours + ½ jour direction",
        price: "sur devis",
        audience: "Dev + direction",
        ctaLabel: "Réserver un appel",
        benefits: [
          "Tout le Flagship (2 j équipe dev)",
          "Module Direction : AI Act, politique d'usage, Shadow AI, ROI business",
          "Maîtrise technique + gouvernance AI Act",
        ],
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
    savePrompt: "Sign in to save your progress and find it on all your devices.",
    importPrompt: "You have progress saved while signed out. Bring it over to your account?",
    importCta: "Import",
    importDismiss: "Later",
  },
  formateur: {
    label: "Trainer mode",
    on: "on",
    off: "off",
    hint: "Run training sessions? Turn on trainer mode to reveal, in each lesson, the reserved facilitation notes — and the « Becoming a trainer » module.",
  },
  aPropos: {
    metaTitle: "The trainer — AI-First Engineering",
    metaDescription:
      "Guillaume Flambard has been running a production SaaS 100% AI-first for several years. He trains development teams in AI-augmented engineering — teaching what he practises.",
    heroEyebrow: "The trainer",
    heroSubtitle:
      "I lead the development of a production SaaS in 100% AI-first mode. I no longer write code by hand — I orchestrate agents, automate, operate. I teach what I practise.",
    cardRole: "AI-First Engineering · Development teams",
    bodyTitle: "Practical expertise, not theory",
    bodyP1:
      "Most AI training stops at ChatGPT and basic prompts. That segment is saturated — and useless for a dev team. What matters for your teams is how to actually work with code agents in production: framing, orchestrating, shipping, keeping quality.",
    bodyP2:
      "I use this method every day on my own codebase. I know where AI helps, where it degrades, and what you should never delegate. Every programme includes the regulatory dimension (AI Act, usage policy, governance) so your teams move forward without legal risk.",
    whyTitle: "Why Largo IA",
    location: "Based between France and Asia · On-site or remote, intra-company",
    locationIcon: "apartment",
    reserveLabel: "Book a call",
    methodEyebrow: "The method",
    methodTitle: "A method in three principles",
    principles: [
      { t: "I teach what I practise", d: "A production SaaS running 100% AI-first — not a consultant who read the docs." },
      { t: "On your real codebase", d: "We work on your actual projects, your tools, your constraints — not generic examples." },
      { t: "Guardrails, not slides", d: "Every programme produces an operational playbook, templates and a checklist — you leave with tools, not notes." },
    ],
  },
  contact: {
    metaTitle: "Contact — AI-First Engineering",
    metaDescription:
      "Book a call with Guillaume Flambard to assess your dev team's AI-first engineering needs. Intra-company training, on request, no commitment.",
    heroEyebrow: "Contact",
    heroTitle: "Let's talk about your dev team",
    heroSubtitle:
      "Book a call or send a message. We assess your needs, calibrate the format — reply within 24 working hours, no commitment.",
    stepsEyebrow: "How it works",
    stepsTitle: "Three steps, no pressure",
    steps: [
      { t: "You write to us", d: "A few words about your team, your stack, your current AI usage and your goals." },
      { t: "Discovery call (30 min)", d: "We clarify your needs, identify the gaps and confirm we can help." },
      { t: "Tailored proposal", d: "A format and programme adapted to your team, with a clear quote." },
    ],
    bookingStrong: "Booking —",
    bookingText:
      " the booking calendar (Cal.com) plugs in here. In the meantime, write to us: we'll offer you a slot quickly.",
    emailHint: "Or write directly to",
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
      needPh: "In a few words: your goals, the dev team size, your tools and current AI usage…",
      submit: "Send my request",
      privacy: "Your data is only used to get back to you (GDPR). No newsletter, no sharing.",
      badge: "Reply within 24 working hours",
    },
  },
  programme: {
    metaTitle: "Programme — The AI-First Engineering Curriculum",
    metaDescription:
      "The AI-First Engineering curriculum: master AI-augmented engineering as a dev team. AI-first posture, context engineering, shipping, guardrails, pipeline and AI Act governance. Intra-company training, on request.",
    heroEyebrow: "The curriculum",
    heroTitle: "AI-First Engineering — The curriculum for dev teams",
    heroSubtitle:
      "6 modules, from AI-first posture to AI Act governance. Designed for working developers — we train on your real codebase, with your tools.",
    contentEyebrow: "The content",
    contentTitle: "Modules from fundamentals to governance",
    objectivesEyebrow: "What you will be able to do",
    objectivesTitle: "After this, capable of…",
    objectives: [
      "Frame a task for an agent — context, specs, constraints — and get a usable result on the first try.",
      "Ship a feature end-to-end on a real codebase in AI-first mode.",
      "Apply the guardrails: AI code review, testing, security — and identify what you never delegate.",
      "Integrate the AI workflow into a real pipeline (Git, CI, automated QA).",
      "Measure the productivity gain and decide: where AI helps vs. degrades.",
    ],
    formulesEyebrow: "Formulas in detail",
    formulesTitle: "Three engagement levels, one objective",
    formulesSubtitle:
      "Choose the format that fits your needs — all are on request, intra-company.",
    curriculum: [
      {
        key: "flagship-j1",
        label: "Flagship — Day 1",
        format: "Full day · dev team",
        blocks: [
          {
            title: "Morning — Foundations",
            items: [
              "Orchestrating ≠ coding: the developer's new role",
              "Choosing and configuring tools (Claude Code, Cursor)",
              "Context engineering: framing an agent to deliver right (CLAUDE.md files, specs, conventions)",
            ],
          },
          {
            title: "Afternoon — First real workflow",
            items: [
              "Workshop: each developer ships a first feature on their own codebase",
              "From spec to commit, AI-first",
            ],
          },
        ],
      },
      {
        key: "flagship-j2",
        label: "Flagship — Day 2",
        format: "Full day · dev team",
        blocks: [
          {
            title: "Morning — Scaling up",
            items: [
              "Spec-driven development, task decomposition",
              "AI-assisted code review",
              "Automated testing & QA",
            ],
          },
          {
            title: "Afternoon — Quality & governance",
            items: [
              "Guardrails: security, debt, what you never delegate",
              "Git/CI pipeline integration",
              "Advanced patterns (multi-agents = pattern) — overview",
              "Measuring and deciding on ROI",
            ],
          },
        ],
      },
      {
        key: "diagnostic",
        label: "Diagnostic",
        format: "1 day · dev team",
        blocks: [
          {
            title: "Morning",
            items: [
              "AI-first posture + tool setup",
              "Context engineering in practice",
            ],
          },
          {
            title: "Afternoon",
            items: [
              "Workshop: first feature shipped",
              "Gap identification",
              "Deliverable: mini gap report + recommendations",
            ],
          },
        ],
      },
      {
        key: "module-direction",
        label: "Leadership Module",
        format: "½ day · leadership / CTO / CHRO",
        blocks: [
          {
            title: "Content",
            items: [
              "AI Act essentials + August 2026 deadline",
              "Building an AI usage policy",
              "Exiting Shadow AI — framework and governance",
              "Measuring the business ROI of the training",
            ],
          },
        ],
      },
    ],
    formatsEyebrow: "The formats",
    formatsTitle: "Three formulas, depending on your goals",
    formatsSubtitle:
      "Diagnostic 1 day · Flagship 2 days · Full pack 2 days + ½ day leadership. On request, intra-company.",
    financingStrong: "Funding —",
    financingText:
      " Qualiopi certification is being obtained (OPCO eligibility coming soon). Let's discuss your situation on the discovery call.",
    filterAll: "All modules",
    filterTeams: "For teams",
    filterTrainer: "Train-the-trainer",
    lessonsWord: "lessons",
    viewModule: "View module",
    offers: [
      {
        name: "Diagnostic",
        format: "1 day · intra-company",
        price: "on request",
        audience: "Dev team",
        ctaLabel: "Book a call",
        benefits: [
          "AI-first posture + tool setup",
          "Context engineering",
          "First feature workshop",
          "Gap report + recommendations",
        ],
      },
      {
        name: "Flagship",
        format: "2 days · intra-company",
        price: "on request",
        audience: "Dev team",
        ctaLabel: "Book a call",
        benefits: [
          "Foundations & first real workflow (Day 1)",
          "Scaling & quality (Day 2)",
          "Guardrails, Git/CI pipeline, ROI measurement",
          "Personalised AI-first playbook",
        ],
      },
      {
        name: "Full pack",
        format: "2 days + ½ day leadership",
        price: "on request",
        audience: "Dev + leadership",
        ctaLabel: "Book a call",
        benefits: [
          "Full Flagship (2 days dev team)",
          "Leadership module: AI Act, usage policy, Shadow AI, business ROI",
          "Technical mastery + AI Act governance",
        ],
      },
    ],
  },
};

const PAGES: Record<Locale, PageCopy> = { fr, en };

export function getPageCopy(locale: Locale): PageCopy {
  return PAGES[locale];
}
