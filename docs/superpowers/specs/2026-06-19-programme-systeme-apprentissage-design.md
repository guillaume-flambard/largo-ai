# Largo IA — Système d'apprentissage & curriculum (design)

Date : 2026-06-19 · Statut : validé (design), en attente de plan d'implémentation.

## Contexte & objectif

Largo IA passe d'un simple site de marque à un **produit pédagogique** : un vrai
curriculum, de vraies leçons rédigées, hébergées comme un système d'apprentissage
sur le site. Deux audiences :

1. **PME** — dirigeants/équipes qui veulent utiliser l'IA dans leur métier.
2. **Futurs formateurs** — personnes qui veulent à leur tour former leurs proches
   / des tiers (« train-the-trainer »).

Décisions de cadrage (validées en brainstorming) :

- **Le contenu est l'actif.** Forme « C-léger » : leçons rédigées, publiées comme
  pages structurées et navigables ; le live de Guillaume reste la valeur ajoutée.
  **Pas de LMS** (pas de comptes, pas de suivi de progression, pas de paiement) au
  départ — évolutif vers un LMS plus tard si la demande self-serve apparaît.
- **Tronc commun + couche formateur.** Mêmes leçons de fond pour tous ; chaque
  leçon porte une zone « Pour le formateur » ; un module dédié « Devenir formateur ».
- **Architecture réorganisée** : on garde l'esprit des 4 modules existants et on
  sort un module dédié « Sécurité, RGPD & AI Act ».
- **i18n dès le départ : FR + EN** (Thai ajouté plus tard sans refonte). Le site
  **et** les leçons sont multilingues.
- **Pilote** : construire le système + **1 module complet (M1)** rédigé en FR et EN.

## Non-objectifs (YAGNI)

- Pas de comptes utilisateurs, d'authentification, de suivi de progression, de
  quiz à état, de paiement, de certificats.
- Pas de CMS headless (on co-rédige dans le repo en MDX).
- Pas de Thai dans le pilote (la structure le permettra ; on ajoutera la locale).
- Pas de traduction complète du site marketing existant **dans le pilote** : c'est
  un chantier séparé qui suit immédiatement (l'infra i18n est posée par le pilote).

## Carte du curriculum

Tronc commun (les deux audiences) :

| Code | Module | Cœur |
|------|--------|------|
| M1 | Fondamentaux & posture IA | Ce que l'IA sait/ne sait pas, bons réflexes, écrire une bonne instruction, garder la main. |
| M2 | Écrire & communiquer | Emails, comptes-rendus, reformuler/résumer/traduire, modèles réutilisables. |
| M3 | Marketing & contenu | Posts, articles, visuels, ligne éditoriale cohérente. |
| M4 | Productivité & automatisation | Automatiser le récurrent, connecter l'IA aux outils, mesurer le gain. |
| M5 | Sécurité, RGPD & AI Act | (Dédié) Données, conformité, usage responsable. |

Couche train-the-trainer :

| Code | Module | Cœur |
|------|--------|------|
| MF | Devenir formateur | Posture, animer une session, gérer un groupe, réutiliser le matériel. |

+ **chaque leçon** des modules M1–M5 porte une zone « Pour le formateur ».

## Anatomie d'une leçon

- **Métadonnées** (frontmatter) : `title`, `slug`, `module`, `order`, `durationMin`,
  `level`, `objectives` (résultats d'apprentissage), `prerequisites`.
- **Corps** (MDX) : Pourquoi c'est utile → L'idée clé → Exemple concret →
  Pas-à-pas → **Exercice** → Récap / points clés.
- **Composants MDX maison** : `<Idee>`, `<Exemple>`, `<Exercice>`, `<Attention>`
  (piège), `<Formateur>` (zone réservée : déroulé, timing, questions fréquentes,
  erreurs courantes, variantes — affichée seulement en **mode formateur**).

## Modèle de contenu & i18n

- **Routing** : `app/[locale]/…`, `locale ∈ {fr, en}` (extensible à `th`). `fr` par
  défaut. Programme :
  `/[locale]/programme` → `/[locale]/programme/[module]` → `/[locale]/programme/[module]/[lecon]`.
- **Leçons** : MDX par locale → `content/{fr,en}/programme/<module>/<lecon>.mdx`.
  Une leçon = un fichier par langue. Loaders qui listent modules/leçons depuis le
  système de fichiers + valident le frontmatter.
- **Textes d'interface** (nav, boutons, libellés de section) : dictionnaire
  `content/i18n/<locale>.json`, lu côté serveur selon la locale.
- **Mode formateur** : bascule (ex. `?role=formateur` persistée, ou un sélecteur)
  qui révèle les zones `<Formateur>` et donne accès au module MF.
- **Navigation** : sommaire de module + prev/next entre leçons. Pas d'état de
  progression persistant.
- **Rendu** : un gabarit de leçon unique, on-brand (système encre/papier/ocre,
  Bricolage Grotesque, accessibilité AA), prose lisible (mesure ~65–75ch).
- **MDX sur Next 16** : à valider contre `node_modules/next/dist/docs/` avant
  implémentation (convention `@next/mdx` ou `next-mdx-remote`).

## Périmètre du pilote

**Système** (réutilisable pour tous les modules) :
- Routing i18n `[locale]` + sélecteur de langue + dictionnaire FR/EN.
- Pipeline MDX + modèle de contenu (frontmatter typé) + loaders module/leçon.
- Composants MDX (`<Idee>`, `<Exemple>`, `<Exercice>`, `<Attention>`, `<Formateur>`).
- Gabarit de leçon + page module + page programme (sommaire, prev/next).
- Mode formateur (bascule + zones réservées).

**Contenu** :
- **M1 · Fondamentaux & posture IA** rédigé **entièrement en FR et EN**, couche
  formateur incluse.
- Amorce du module **MF** (posture) suffisante pour valider la couche formateur.

## Conséquences / chantiers suivants (hors pilote)

- **Traduire le site marketing existant** (accueil, à-propos, contact, légal) en
  EN, une fois l'infra i18n posée par le pilote.
- Rédiger M2–M5 + compléter MF (après validation du format sur M1).
- Ajouter la locale **Thai** (traductions + ajout `th` à la liste des locales).
- Éventuel passage LMS (comptes, progression) si la demande self-serve émerge.

## Critères de succès du pilote

- M1 navigable en `/fr/programme/...` **et** `/en/programme/...`, contenu réel.
- Le mode formateur révèle les zones `<Formateur>` et le module MF.
- `pnpm build` vert ; pages statiques ; accessibilité AA ; responsive desktop+mobile.
- Le format de leçon est jugé bon par Guillaume **avant** d'industrialiser M2–M5.
- Ajouter une 3ᵉ locale = ajouter un code + des fichiers, sans refonte.
