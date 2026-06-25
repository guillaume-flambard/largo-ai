# Spec — Pivot « AI-First Engineering »

> Conception validée le 2026-06-25 (brainstorming). Source unique pour le plan
> d'implémentation. Repositionne le site Largo IA (actuellement TPE/PME, sans
> jargon, dirigeants) vers la niche **AI-First Engineering** : formation B2B
> intra à l'ingénierie augmentée par l'IA pour les équipes de développement.
> Source produit : dossier de référence interne « AI-First Engineering ».

## 1. Décisions stratégiques (verrouillées)

- **Pivot complet** : le site DEVIENT AI-First Engineering. L'ancien positionnement
  TPE/PME est retiré (pas d'archive publique).
- **Marque** : « Largo IA » reste le nom affiché (logo, header, footer, metadata,
  domaine `largo-ia.fr` / `largo-ai.vercel.app`). « AI-First Engineering » = ligne
  produit / accroche hero. Nom commercial définitif = TODO ultérieur (dossier §12).
- **Bilingue FR/EN** conservé partout.
- **Design system** : la refonte ratifiée (DESIGN.md) est réutilisée telle quelle.
  Toutes les nouvelles sections suivent sa grammaire (Space Grotesk/Geist/Geist Mono,
  accent ocre `--sun`, mode sombre, deux grammaires marketing/éditoriale).
- **LMS gardé & reconverti** en cursus/playbook AI-First (pas d'e-learning TPE/PME).
- **Approche d'exécution = B** : re-architecture narrative complète de la home
  (nouvelles sections, sections retirées/repurposées), pas seulement un swap de copy.
- **Un seul lot** : marketing + reconversion LMS dans ce spec.

## 2. Cibles (rappel produit)

- Acheteur technique : CTO / Lead dev de PME, scale-up, studio, ESN.
- Sponsor : Dirigeant / DSI / DRH (porte d'entrée AI Act).
- Bénéficiaires : développeurs en activité.
- 100 % B2B intra-entreprise (l'entreprise signe et paie). CPF/B2C hors scope.

## 3. Garde-fous honnêteté (dossier §10) — appliqués partout

- **Pas de financement OPCO présenté comme disponible** tant que Qualiopi n'est pas
  obtenu : écrire « prochainement éligible OPCO » ou retirer la mention. Qualiopi =
  « en cours d'obtention ».
- **Prix** : la grille tarifaire est un TODO (§12). Le site affiche **« sur devis /
  nous consulter »** — aucun prix inventé. (L'actuel « dès 690 € / 1 900 € » disparaît.)
- **RAG souverain / IA souveraine** : présenté comme perspective, hors catalogue.
- **Multi-agents** : présenté comme *pattern* à connaître, pas cœur de maîtrise.
- **Le SaaS de preuve reste générique** (non nommé) sauf décision contraire.
- Ne jamais prétendre maîtriser un outil non réellement pratiqué.

## 4. Information architecture (pages)

| Route | Rôle après pivot |
|---|---|
| `/[locale]` | Home : arc narratif AI-First (§5) |
| `/[locale]/programme` | « Le cursus AI-First Engineering » (§6) |
| `/[locale]/a-propos` | « Le formateur » — pourquoi moi développé |
| `/[locale]/contact` | Booking, copy reframée B2B/équipe dev |
| `/[locale]/connexion` + `/mon-espace` | Accès LMS = playbook/ressources post-formation |
| `/[locale]/programme/[module]/[lecon]` | Leçons du playbook reconverti |
| `/[locale]/mentions-legales` + `/confidentialite` | Inchangées (déjà bilingues) |

Nav (header) : libellés conservés (Accueil · Programme · Le formateur · Contact),
contenu derrière chaque lien repositionné.

## 5. Composition de la home (re-architecture narrative)

Ordre = arc du dossier §4→§8. Composants : « repurposé » = fichier conservé,
re-contenu + forme adaptée ; « neuf » = nouveau fichier.

| # | Section | Contenu (source) | Composant |
|---|---------|------------------|-----------|
| 1 | **Hero** | Kicker « AI-First Engineering ». H1 « Faites passer votre équipe dev en mode IA — sans casser votre prod ni votre qualité ». Sous-titre = la promesse. CTA primaire « Réserver un appel » + secondaire « Voir les formules ». **Retirer le mock card « Ma progression »** (LMS) → visuel épuré/dev-relevant. | CinematicHero (repurposé) |
| 2 | **Le problème — Shadow AI** | « Vos devs utilisent déjà l'IA, mais sans méthode : copier-coller non revu, dette technique, failles, aucune mesure. L'AI Act approche (sanctions août 2026). » Bande encre sombre (gravité). | Manifesto → ProblemSection (repurposé) |
| 3 | **La promesse** | « En 2 jours, d'un usage anarchique à une méthode d'ingénierie AI-first maîtrisée : livrer plus vite, sans sacrifier la qualité ni ouvrir des failles. » | Atouts → PromiseSection (repurposé) |
| 4 | **Pourquoi moi (preuve)** | « Je dirige un SaaS en production en 100 % AI-first depuis plusieurs années — je n'écris plus de code à la main, j'orchestre. J'enseigne ce que je pratique. » | TrainerTeaser → ProofSection (repurposé) |
| 5 | **Les 3 formules** | Diagnostic 1j / Flagship 2j / Pack complet 2j+½j + tableau comparatif (Format / Pour qui / Objectif / Rôle). CTA par formule = « Réserver un appel » (pas de prix → « sur devis »). | Offers → Formules (repurposé) + FormulesTable (neuf) |
| 6 | **Le cursus (aperçu)** | Les 5 objectifs « capable de… » (§6) + aperçu Jour 1 / Jour 2. Lien « Voir le cursus détaillé » → /programme. | HowItWorks → CursusTeaser (repurposé) |
| 7 | **Techs & outils** *(neuf)* | Grille par catégorie : Agents de code (Claude Code, Cursor) · Context engineering · Intégration/MCP (Playwright) · Qualité & garde-fous · Automatisation (n8n). Note « des principes transposables, pas un outil figé ». | TechStack (neuf) |
| 8 | **Livrables** *(neuf)* | 4 livrables : playbook AI-first · templates de config · checklist garde-fous · politique d'usage IA + cadrage AI Act. « Le client repart avec des outils, pas des slides. » | Deliverables (neuf) |
| 9 | **Objections** | Les 4 objections du §4 (remplace mes devs / déjà mis seuls / AI Act plus tard / c'est cher) + réponses. | Faq → Objections (repurposé) |
| 10 | **Clôture + CTA** | Voix footer porte la fermeture + booking (pattern de clôture conservé, pas de 2e bloc sombre). | SiteFooter (re-contenu) |

## 6. Page Programme + reconversion LMS

### 6.1 `/programme` = « Le cursus AI-First Engineering »
1. Hero cursus.
2. **Objectifs pédagogiques** — les 5 « capable de… » (§6) : cadrer une tâche pour
   un agent ; livrer une feature de bout en bout en AI-first ; appliquer les
   garde-fous (revue/tests/sécurité, ce qu'on ne délègue jamais) ; intégrer le
   workflow dans un pipeline (Git/CI/QA) ; mesurer le gain et arbitrer.
3. **Les 3 formules détaillées** avec le découpage : Flagship Jour 1 (Fondations &
   premier workflow réel) ; Jour 2 (Échelle & qualité) ; Diagnostic 1j (condensé +
   mini-rapport d'écarts) ; Module Direction ½j (AI Act, politique d'usage, Shadow
   AI, ROI).
4. **Modules du playbook** (LMS reconverti) en rangées éditoriales → liens module/leçon.
5. **Note financement** honnête (§3) : Qualiopi en cours, « prochainement éligible OPCO ».

### 6.2 Reconversion LMS — remap 1:1 des 6 modules
Renommer dossiers + `_module.json` (titre/summary/order) + réécrire les leçons.

| Slug actuel | Nouveau slug | Nouveau module | Leçons (~4) |
|---|---|---|---|
| m1-fondamentaux | m1-posture-ai-first | **Posture AI-first** | AI-first c'est quoi · orchestrer ≠ coder · choisir/configurer (Claude Code, Cursor) · le nouveau rôle du dev |
| m2-ecrire-communiquer | m2-context-engineering | **Context engineering** | fichiers `CLAUDE.md` · écrire des specs exploitables · découper les tâches · boucles de feedback |
| m3-marketing-contenu | m3-livrer-ai-first | **Livrer en AI-first** | de la spec au commit · sur vraie codebase · dev piloté par specs · une feature de bout en bout |
| m4-productivite-automatisation | m4-garde-fous-qualite | **Garde-fous & qualité** | revue de code IA · tests assistés · sécurité/secrets · ce qu'on ne délègue jamais |
| m5-securite-conformite | m5-integration-pipeline | **Intégration pipeline** | Git/CI · MCP (QA Playwright) · automatisation n8n · mesurer le ROI |
| mf-devenir-formateur | m6-gouvernance-ai-act | **Gouvernance & AI Act** | AI Act & échéance août 2026 · politique d'usage · sortir du Shadow AI · ROI business |

- Volume : **6 `_module.json` ×2 langues + ~24 leçons ×2 langues ≈ 48 MDX** réécrits
  (frontmatter `title/slug/module/order/durationMin/level/objectives/prerequisites/quiz`
  + corps avec callouts `Idee/Exemple/Exercice/Attention` + `Quiz`).
- Niveaux (`découverte/intermédiaire/avancé`) : enum conservé, davantage d'`intermédiaire`
  / `avancé` (public dev). `levelLabel()` déjà i18n.
- **Train-the-trainer retiré** : plus de module `formateurOnly` ; le module Gouvernance
  devient normal. Mécanisme « mode formateur » (RoleToggle + bloc `Formateur` +
  FormateurGate) → toggle **masqué**, code gardé dormant.

## 7. Composants

- **Neufs** : `TechStack`, `Deliverables`, `FormulesTable`.
- **Repurposés (fichiers conservés, re-contenu + forme adaptée)** : CinematicHero,
  Manifesto, Atouts, Offers, HowItWorks, TrainerTeaser, Faq, SiteHeader, SiteFooter.
- **Retirés/dormants** : mock « Ma progression » du hero ; FormateurGate / RoleToggle /
  bloc `Formateur` (toggle masqué, code conservé).
- Règle : pas de renommage de fichiers pour les repurposés (limiter le churn) ; noms
  sémantiques new uniquement pour les composants neufs.

## 8. Fichiers de contenu (FR + EN)

- `lib/marketing.ts` — type `Marketing` étendu : **ajouter `tech` et `deliverables`**,
  repurposer `atouts`→promesse, `how`→cursus, `manifesto`→problème, `trainer`→preuve,
  `offers`→formules, `faq`→objections. Réécrire toutes les valeurs FR + EN.
- `lib/pages.ts` — réécrire `about`, `contact`, `programme` (FR + EN). Retirer les prix
  des offres → « sur devis ».
- `content/i18n/{fr,en}.json` — nav, footer cols, libellés UI restants.
- `content/{fr,en}/programme/**` — renommer les 6 modules, réécrire les ~48 MDX + 12
  `_module.json`.

## 9. SEO / metadata

- `app/[locale]/layout.tsx` : `title.default`/`template`, `description`, `keywords`
  → AI-First Engineering (dev teams, AI Act, orchestration d'agents…).
- Metadata par page (`programme`, `a-propos`, `contact`) réécrites.
- JSON-LD `/programme` (ItemList de `Course`) → modules reconvertis.
- OG/Twitter : copy alignée.

## 10. Hors scope (ce spec) / placeholders honnêtes

- Grille tarifaire réelle (→ « sur devis »).
- Docs Qualiopi officielles, durées en heures, délais d'accès, accessibilité handicap,
  indicateurs de résultats (dossier §11) — non rendus publics ici.
- Nom du SaaS de preuve (générique).
- Certification RS/RNCP, offre B2C/CPF, RAG souverain (perspective uniquement).

## 11. Critères d'acceptation

1. `/[locale]` rend les 10 sections de §5 dans l'ordre, FR et EN, sans contenu TPE/PME
   résiduel, zéro chaîne FR codée en dur côté EN.
2. `/programme` rend les objectifs + 3 formules détaillées + modules reconvertis ;
   aucun prix chiffré ; mention financement conforme §3.
3. Les 6 modules reconvertis + leurs leçons rendent en FR et EN ; quiz fonctionnels ;
   plus aucun module `formateurOnly` ; toggle « mode formateur » non visible.
4. Metadata/SEO et JSON-LD reflètent AI-First Engineering.
5. `tsc --noEmit` clean, `eslint` clean, `pnpm build` vert (82+ routes), zéro erreur console.
6. Respecte DESIGN.md (tokens, deux grammaires, dark-mode safe, i18n discipline) et les
   garde-fous honnêteté §3.
7. Vérification visuelle FR+EN, light+dark, sur home + programme + une leçon.

## 12. Séquencement d'implémentation suggéré (pour le plan)

1. Étendre le type `Marketing` + réécrire `lib/marketing.ts` FR/EN (sections 1-10).
2. Composants neufs (`TechStack`, `Deliverables`, `FormulesTable`) + repurposer les
   sections existantes ; recomposer la home.
3. `lib/pages.ts` (about/contact/programme) + `content/i18n` + metadata/SEO.
4. Page `/programme` (cursus + formules détaillées).
5. Reconversion LMS : renommer modules, réécrire `_module.json` + MDX FR/EN, retirer
   le train-the-trainer.
6. Vérif build + visuelle FR/EN light/dark ; déploiement (séparé, sur demande).
