import type { Locale } from "@/lib/i18n";

type TitleDesc = { t: string; d: string };
type OfferComparison = {
  /** Row "Format" in the comparison table (duration only, e.g. "1 jour"). */
  format: string;
  /** Row "Pour qui" in the comparison table (audience type, e.g. "Équipe dev"). */
  pourQui: string;
  /** Row "Objectif" in the comparison table (outcome, e.g. "Démarrer & révéler les écarts"). */
  objectif: string;
};

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
  /** Structured fields for the FormulesTable comparison table. */
  comparison?: OfferComparison;
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
  offers: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Offer[];
    /** Bilingual labels for the FormulesTable comparison rows. */
    comparisonLabels: { format: string; pourQui: string; objectif: string };
  };
  how: { kicker: string; title: string; steps: TitleDesc[] };
  trainer: {
    kicker: string;
    title: string;
    name: string;
    role: string;
    /** Status badge shown below name/role on the trainer card. */
    statusLabel: string;
    /** Proof quote displayed in the trainer card body. */
    quote: string;
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
  // Techs & outils (section §7) — catégories d'outils enseignés.
  tech: {
    kicker: string;
    title: string;
    subtitle: string;
    note: string; // « des principes transposables, pas un outil figé »
    categories: { name: string; items: string[] }[];
  };
  // Livrables (section §8) — ce que le client repart avec.
  deliverables: {
    kicker: string;
    title: string;
    subtitle: string;
    items: TitleDesc[];
  };
};

const fr: Marketing = {
  hero: {
    kicker: "AI-First Engineering",
    titleBefore: "Faites passer votre équipe dev en mode ",
    titleEmphasis: "IA",
    titleAfter: " — sans casser votre prod ni votre qualité.",
    lead: "Formation B2B intra pour équipes de développement. En 2 jours, d'un usage anarchique à une méthode d'ingénierie AI-first maîtrisée.",
    ctaPrimary: "Réserver un appel",
    ctaSecondary: "Voir les formules",
    proof: ["100 % B2B intra-entreprise", "Conforme AI Act · sanctions dès août 2026", "Formateur praticien — SaaS en prod AI-first"],
  },
  manifesto: {
    kicker: "Le problème — Shadow AI",
    before: "Vos devs utilisent déjà l'IA, mais sans méthode : copier-coller non revu, dette technique, failles, aucune mesure du gain. L'AI Act approche — ",
    emphasis: "sanctions dès août 2026",
    after: ". C'est le Shadow AI : partout, sans cadre.",
    ctaPrimary: "Réserver un appel",
    ctaSecondary: "Voir le cursus",
  },
  atouts: {
    kicker: "La promesse",
    title: "En 2 jours, d'un usage anarchique à une méthode AI-first maîtrisée",
    subtitle: "Votre équipe repart avec une méthode d'ingénierie opérationnelle, pas une initiation théorique.",
    items: [
      { t: "Livrer plus vite", d: "Chaque développeur orchestre un agent de code sur sa propre codebase dès le Jour 1. Le gain est mesurable immédiatement." },
      { t: "Sans sacrifier la qualité", d: "Revue de code, tests assistés, ce qu'on ne délègue jamais : les garde-fous sont au cœur de la méthode, pas en option." },
      { t: "Sans ouvrir de failles", d: "Sécurité, gestion des secrets, dette technique IA : on couvre ce que l'usage spontané ignore systématiquement." },
      { t: "Mesurer le gain", d: "On calibre ensemble où l'IA aide vs dégrade. Vos leads repartent capables d'arbitrer, pas de subir." },
    ],
  },
  offers: {
    kicker: "Les formules",
    title: "Trois formules, un objectif",
    subtitle: "De l'audit éclair à la maîtrise complète avec cadrage AI Act pour la direction.",
    comparisonLabels: { format: "Format", pourQui: "Pour qui", objectif: "Objectif" },
    items: [
      {
        name: "Diagnostic",
        format: "1 jour · équipe dev",
        price: "Sur devis",
        priceNote: "Sur devis",
        audience: "Démarrer et révéler les écarts",
        ctaLabel: "Réserver un appel",
        ctaHref: "#contact",
        comparison: {
          format: "1 jour",
          pourQui: "Équipe dev",
          objectif: "Démarrer & révéler les écarts",
        },
        benefits: [
          "Posture AI-first + config des outils",
          "Context engineering en pratique",
          "Atelier première fonctionnalité",
          "Mini-rapport d'écarts + recommandations",
        ],
      },
      {
        name: "Flagship",
        format: "2 jours · équipe dev",
        price: "Sur devis",
        priceNote: "Sur devis",
        audience: "Maîtrise complète",
        ctaLabel: "Réserver un appel",
        ctaHref: "#contact",
        featured: true,
        badge: "Cœur de l'offre",
        comparison: {
          format: "2 jours",
          pourQui: "Équipe dev",
          objectif: "Maîtrise complète de l'ingénierie AI-first",
        },
        benefits: [
          "Jour 1 — Fondations & premier workflow réel",
          "Jour 2 — Passage à l'échelle & qualité",
          "Garde-fous, sécurité, tests assistés",
          "Intégration Git/CI + mesurer le ROI",
        ],
      },
      {
        name: "Pack complet",
        format: "2 j + ½ j direction · dev + direction",
        price: "Sur devis",
        priceNote: "Sur devis",
        audience: "Maîtrise + gouvernance AI Act",
        ctaLabel: "Réserver un appel",
        ctaHref: "#contact",
        badge: "Montée en gamme",
        comparison: {
          format: "2 j + ½ j direction",
          pourQui: "Dev + direction",
          objectif: "Maîtrise complète + gouvernance AI Act",
        },
        benefits: [
          "Formation complète équipe dev (2 j)",
          "Module direction ½ j : AI Act, politique d'usage, ROI business",
          "Sortir du Shadow AI à l'échelle de l'entreprise",
          "Politique d'usage IA formalisée",
        ],
      },
    ],
  },
  how: {
    kicker: "Le cursus — aperçu",
    title: "Ce que votre équipe sera capable de faire",
    steps: [
      { t: "Cadrer une tâche pour un agent", d: "Contexte, specs, contraintes : obtenir un résultat exploitable du premier coup, sans itérations inutiles." },
      { t: "Livrer une feature de bout en bout", d: "De la spec au commit sur une vraie codebase, en mode AI-first. Exercice réel dès le Jour 1." },
      { t: "Appliquer les garde-fous", d: "Revue de code IA, tests, sécurité — et identifier ce qu'on ne délègue jamais à un agent." },
      { t: "Intégrer le workflow dans le pipeline", d: "Git, CI, QA automatisée : l'IA s'insère dans ce qui existe, sans tout casser." },
      { t: "Mesurer le gain et arbitrer", d: "Où l'IA aide vs dégrade ? Vos leads repartent avec les outils pour décider, pas pour subir." },
    ],
  },
  trainer: {
    kicker: "Pourquoi moi — la preuve",
    title: "J'enseigne ce que je pratique",
    name: "Guillaume Flambard",
    role: "AI-First Engineering · Équipes de développement",
    statusLabel: "Formateur-praticien · en production",
    quote: "« Je ne suis pas un consultant qui a lu la doc. Je dirige un SaaS en production en 100 % AI-first depuis plusieurs années — j'orchestre, je n'écris plus de code à la main. J'enseigne exactement ce que je pratique. »",
    principles: [
      { t: "Praticien, pas consultant", d: "Je dirige un SaaS en production en 100 % AI-first depuis plusieurs années. Je n'écris plus de code à la main, j'orchestre." },
      { t: "Méthode issue du terrain", d: "Chaque pattern enseigné vient d'un vrai contexte de production : contexte engineering, garde-fous, mesure du ROI." },
      { t: "Formation sur votre codebase", d: "Pas des slides fictifs. Vos devs travaillent sur leur propre environnement, leurs propres problèmes, dès le Jour 1." },
    ],
    cta: "En savoir plus sur Guillaume",
  },
  faq: {
    kicker: "Objections",
    title: "Ce que vous vous demandez sûrement",
    items: [
      {
        q: "L'IA va remplacer mes devs ?",
        a: "Non. Elle déplace leur travail vers l'orchestration et la revue. Le rôle du développeur monte en valeur — il pilote des agents plutôt que d'écrire mécaniquement. La formation porte précisément sur ce nouveau rôle.",
        open: true,
      },
      {
        q: "Mes devs s'y sont déjà mis seuls.",
        a: "Sans méthode ni garde-fous, c'est là que naissent la dette technique IA et les failles. On ne repart pas de zéro : on structure et sécurise ce qui existe déjà.",
      },
      {
        q: "On verra l'AI Act plus tard.",
        a: "Les sanctions nationales sont applicables dès août 2026. Se mettre en conformité (politique d'usage, formation documentée) prend des mois — pas des jours. Attendre, c'est déjà prendre du retard.",
      },
      {
        q: "C'est cher.",
        a: "Comparé au coût d'une dette technique IA non maîtrisée, d'un incident de sécurité ou d'une non-conformité AI Act, c'est un investissement défensif. Et l'équipe livre plus vite dès la semaine suivante.",
      },
    ],
  },
  footer: {
    kicker: "Prêt à passer en mode AI-first ?",
    voiceBefore: "Un projet, une question sur les formules ? Écrivez à Guillaume — ",
    voiceEmphasis: "c'est lui qui vous répond",
    voiceAfter: ", sous 24 h.",
    ctaPrimary: "Réserver un appel",
    tagline: "Formation à l'ingénierie AI-first pour les équipes de développement. Méthode praticien, garde-fous, conforme AI Act.",
    cols: [
      {
        h: "Les formules",
        items: [
          { label: "Diagnostic (1 j)", href: "/programme" },
          { label: "Flagship (2 j)", href: "/programme" },
          { label: "Pack complet", href: "/programme" },
        ],
      },
      {
        h: "Largo IA",
        items: [
          { label: "Rencontrer Guillaume", href: "/a-propos" },
          { label: "Le cursus détaillé", href: "/programme" },
          { label: "Réserver un appel", href: "/contact" },
        ],
      },
      {
        h: "Le sérieux",
        items: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Confidentialité", href: "/confidentialite" },
          { label: "AI Act & conformité", href: "/confidentialite" },
        ],
      },
    ],
    baseline: "Largo IA · Formation AI-First Engineering · B2B intra-entreprise",
  },
  tech: {
    kicker: "Technologies & outils",
    title: "L'outillage AI-first en pratique",
    subtitle: "Ce qu'on utilise, comment on le choisit, et surtout comment on l'encadre.",
    note: "L'outillage change vite : on enseigne des principes — cadrage, garde-fous, mesure — transposables, pas un outil figé.",
    categories: [
      {
        name: "Agents de code",
        items: ["Claude Code", "Cursor"],
      },
      {
        name: "Context engineering",
        items: ["Fichiers CLAUDE.md", "Specs exploitables par un agent", "Découpage de tâches", "Boucles de feedback"],
      },
      {
        name: "Intégration & MCP",
        items: ["MCP (Model Context Protocol)", "QA navigateur — Playwright", "Branchement Git / revue de PR", "CI assistée"],
      },
      {
        name: "Qualité & garde-fous",
        items: ["Tests automatisés assistés", "Revue de code IA", "Sécurité & gestion des secrets", "Ce qu'on ne délègue jamais"],
      },
      {
        name: "Automatisation des process",
        items: ["n8n (workflows métier)", "OCR / vision pour la dématérialisation"],
      },
    ],
  },
  deliverables: {
    kicker: "Livrables",
    title: "Le client repart avec des outils, pas des slides",
    subtitle: "Quatre livrables opérationnels, personnalisés à votre stack et votre contexte.",
    items: [
      {
        t: "Playbook AI-first personnalisé",
        d: "Adapté à votre stack technique, votre pipeline et vos conventions d'équipe. Réutilisable immédiatement en production.",
      },
      {
        t: "Templates de configuration",
        d: "Fichiers de contexte projet (CLAUDE.md), conventions agent, structures de specs exploitables par un agent de code.",
      },
      {
        t: "Checklist de garde-fous",
        d: "Revue de code, sécurité, gestion des secrets, dette technique IA — ce qu'on vérifie avant chaque merge.",
      },
      {
        t: "Politique d'usage IA + cadrage AI Act",
        d: "Document prêt à l'emploi pour formaliser les usages autorisés, les gardes-fous et la conformité AI Act (module direction).",
      },
    ],
  },
};

const en: Marketing = {
  hero: {
    kicker: "AI-First Engineering",
    titleBefore: "Move your dev team to ",
    titleEmphasis: "AI",
    titleAfter: "-first — without breaking your prod or your quality.",
    lead: "B2B in-house training for development teams. In 2 days, from chaotic AI use to a mastered AI-first engineering method.",
    ctaPrimary: "Book a call",
    ctaSecondary: "See the formulas",
    proof: ["100% B2B in-house", "AI Act compliant · penalties from August 2026", "Practitioner trainer — SaaS running AI-first in prod"],
  },
  manifesto: {
    kicker: "The problem — Shadow AI",
    before: "Your devs are already using AI, but without a method: unreviewed copy-paste, technical debt, vulnerabilities, no ROI measurement. The AI Act is closing in — ",
    emphasis: "penalties from August 2026",
    after: ". That's Shadow AI: everywhere, uncontrolled.",
    ctaPrimary: "Book a call",
    ctaSecondary: "See the curriculum",
  },
  atouts: {
    kicker: "The promise",
    title: "In 2 days, from chaotic use to a mastered AI-first method",
    subtitle: "Your team leaves with an operational engineering method, not a theoretical introduction.",
    items: [
      { t: "Ship faster", d: "Every developer orchestrates a code agent on their own codebase from Day 1. The gain is measurable immediately." },
      { t: "Without sacrificing quality", d: "Code review, assisted testing, what you never delegate: guardrails are at the core of the method, not an afterthought." },
      { t: "Without opening vulnerabilities", d: "Security, secrets management, AI technical debt: we cover what spontaneous usage systematically ignores." },
      { t: "Measure the gain", d: "We calibrate together where AI helps vs. degrades. Your leads leave able to decide, not to follow blindly." },
    ],
  },
  offers: {
    kicker: "The formulas",
    title: "Three formulas, one objective",
    subtitle: "From a quick audit to full mastery with AI Act governance for leadership.",
    comparisonLabels: { format: "Format", pourQui: "For whom", objectif: "Objective" },
    items: [
      {
        name: "Diagnostic",
        format: "1 day · dev team",
        price: "On request",
        priceNote: "On request",
        audience: "Get started and reveal the gaps",
        ctaLabel: "Book a call",
        ctaHref: "#contact",
        comparison: {
          format: "1 day",
          pourQui: "Dev team",
          objectif: "Get started & reveal the gaps",
        },
        benefits: [
          "AI-first posture + tool setup",
          "Context engineering in practice",
          "First feature workshop",
          "Mini gap report + recommendations",
        ],
      },
      {
        name: "Flagship",
        format: "2 days · dev team",
        price: "On request",
        priceNote: "On request",
        audience: "Full mastery",
        ctaLabel: "Book a call",
        ctaHref: "#contact",
        featured: true,
        badge: "Core offer",
        comparison: {
          format: "2 days",
          pourQui: "Dev team",
          objectif: "Full AI-first engineering mastery",
        },
        benefits: [
          "Day 1 — Foundations & first real workflow",
          "Day 2 — Scaling & quality",
          "Guardrails, security, assisted testing",
          "Git/CI integration + measuring ROI",
        ],
      },
      {
        name: "Full pack",
        format: "2 d + ½ d leadership · dev + leadership",
        price: "On request",
        priceNote: "On request",
        audience: "Mastery + AI Act governance",
        ctaLabel: "Book a call",
        ctaHref: "#contact",
        badge: "Premium tier",
        comparison: {
          format: "2 d + ½ d leadership",
          pourQui: "Dev + leadership",
          objectif: "Full mastery + AI Act governance",
        },
        benefits: [
          "Full dev team training (2 d)",
          "Leadership module ½ d: AI Act, usage policy, business ROI",
          "Exit Shadow AI at company scale",
          "Formalized AI usage policy",
        ],
      },
    ],
  },
  how: {
    kicker: "The curriculum — overview",
    title: "What your team will be able to do",
    steps: [
      { t: "Frame a task for an agent", d: "Context, specs, constraints: get a usable result on the first try, without unnecessary back-and-forth." },
      { t: "Ship a feature end-to-end", d: "From spec to commit on a real codebase, AI-first. A real exercise from Day 1." },
      { t: "Apply the guardrails", d: "AI code review, testing, security — and identify what you never delegate to an agent." },
      { t: "Integrate the workflow into the pipeline", d: "Git, CI, automated QA: AI slots into what already exists, without breaking it." },
      { t: "Measure the gain and decide", d: "Where does AI help vs. degrade? Your leads leave with the tools to decide, not to react." },
    ],
  },
  trainer: {
    kicker: "Why me — the proof",
    title: "I teach what I practice",
    name: "Guillaume Flambard",
    role: "AI-First Engineering · Development Teams",
    statusLabel: "Practitioner trainer · in production",
    quote: `“I’m not a consultant who read the docs. I’ve been running a SaaS in production 100% AI-first for several years — I orchestrate, I no longer write code by hand. I teach exactly what I practise.”`,
    principles: [
      { t: "Practitioner, not consultant", d: "I run a SaaS in production 100% AI-first for several years. I no longer write code by hand — I orchestrate." },
      { t: "Method from real production", d: "Every pattern taught comes from a real production context: context engineering, guardrails, ROI measurement." },
      { t: "Training on your codebase", d: "No fictional slides. Your devs work on their own environment and their own problems, from Day 1." },
    ],
    cta: "More about Guillaume",
  },
  faq: {
    kicker: "Objections",
    title: "What you're probably wondering",
    items: [
      {
        q: "Will AI replace my devs?",
        a: "No. It shifts their work toward orchestration and review. The developer's role gains in value — they drive agents rather than writing mechanically. That's exactly what the training covers.",
        open: true,
      },
      {
        q: "My devs are already doing it on their own.",
        a: "Without a method or guardrails, that's exactly where AI technical debt and vulnerabilities come from. We don't start from scratch: we structure and secure what already exists.",
      },
      {
        q: "We'll deal with the AI Act later.",
        a: "National penalties apply from August 2026. Getting compliant — usage policy, documented training — takes months, not days. Waiting means falling behind.",
      },
      {
        q: "It's expensive.",
        a: "Compared to the cost of unmanaged AI technical debt, a security incident, or an AI Act non-compliance, it's a defensive investment. And the team ships faster the week after.",
      },
    ],
  },
  footer: {
    kicker: "Ready to go AI-first?",
    voiceBefore: "A project, a question about the formulas? Write to Guillaume — ",
    voiceEmphasis: "he answers you himself",
    voiceAfter: ", within 24 h.",
    ctaPrimary: "Book a call",
    tagline: "AI-first engineering training for development teams. Practitioner method, guardrails, AI Act compliant.",
    cols: [
      {
        h: "The formulas",
        items: [
          { label: "Diagnostic (1 d)", href: "/programme" },
          { label: "Flagship (2 d)", href: "/programme" },
          { label: "Full pack", href: "/programme" },
        ],
      },
      {
        h: "Largo IA",
        items: [
          { label: "Meet Guillaume", href: "/a-propos" },
          { label: "Full curriculum", href: "/programme" },
          { label: "Book a call", href: "/contact" },
        ],
      },
      {
        h: "The serious bits",
        items: [
          { label: "Legal notice", href: "/mentions-legales" },
          { label: "Privacy", href: "/confidentialite" },
          { label: "AI Act & compliance", href: "/confidentialite" },
        ],
      },
    ],
    baseline: "Largo IA · AI-First Engineering Training · B2B in-house",
  },
  tech: {
    kicker: "Technologies & tools",
    title: "The AI-first toolset in practice",
    subtitle: "What we use, how we choose it, and above all how we govern it.",
    note: "Tooling evolves fast: we teach transferable principles — framing, guardrails, measurement — not a fixed tool set.",
    categories: [
      {
        name: "Code agents",
        items: ["Claude Code", "Cursor"],
      },
      {
        name: "Context engineering",
        items: ["CLAUDE.md context files", "Agent-ready specs", "Task decomposition", "Feedback loops"],
      },
      {
        name: "Integration & MCP",
        items: ["MCP (Model Context Protocol)", "Browser QA — Playwright", "Git branching / PR review", "Assisted CI"],
      },
      {
        name: "Quality & guardrails",
        items: ["Assisted automated testing", "AI code review", "Security & secrets management", "What you never delegate"],
      },
      {
        name: "Process automation",
        items: ["n8n (business workflows)", "OCR / vision for document processing"],
      },
    ],
  },
  deliverables: {
    kicker: "Deliverables",
    title: "Clients leave with tools, not slides",
    subtitle: "Four operational deliverables, tailored to your stack and context.",
    items: [
      {
        t: "Tailored AI-first playbook",
        d: "Matched to your tech stack, pipeline, and team conventions. Ready to use in production immediately.",
      },
      {
        t: "Configuration templates",
        d: "Project context files (CLAUDE.md), agent conventions, spec structures ready for a code agent.",
      },
      {
        t: "Guardrail checklist",
        d: "Code review, security, secrets management, AI technical debt — what you verify before every merge.",
      },
      {
        t: "AI usage policy + AI Act framing",
        d: "A ready-to-use document formalizing authorized uses, guardrails, and AI Act compliance (leadership module).",
      },
    ],
  },
};

const MARKETING: Record<Locale, Marketing> = { fr, en };

export function getMarketing(locale: Locale): Marketing {
  return MARKETING[locale];
}
