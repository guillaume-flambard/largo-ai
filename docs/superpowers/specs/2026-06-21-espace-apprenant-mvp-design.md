# Espace apprenant (LMS MVP) — Design

**Date :** 2026-06-21
**Statut :** validé (design), en attente de relecture spec avant plan.

## Contexte

Largo IA a aujourd'hui un curriculum **statique et public** (M1→M5 + module
formateur MF, FR/EN, quiz QCM, progression en `localStorage` via zustand). C'est
l'approche « C-léger » de la spec initiale (`2026-06-19-programme-systeme-…`),
qui listait explicitement en **non-objectif** : comptes, auth, suivi de
progression, LMS — « évolutif plus tard si la demande apparaît ».

La demande est arrivée : Guillaume veut un **espace apprenant authentifié** où
chaque personne **se connecte et retrouve son programme** avec sa progression.
Cette spec décrit le **MVP** de cet espace.

## Objectifs (MVP)

1. Un apprenant peut **se connecter** (Google ou Microsoft, OAuth).
2. Connecté, il accède à **« Mon espace »** : le curriculum M1→M5 = son
   programme, avec **sa progression et ses scores de quiz** sauvegardés sur son
   compte (cross-device, plus seulement `localStorage`).
3. La **vitrine `/programme` et les leçons restent publiques** (SEO, aperçu) ; le
   suivi/dashboard est la couche qui exige un compte.

## Non-objectifs (YAGNI — phase 2)

- Affectation de modules par cohorte / par apprenant (MVP = **même curriculum
  pour tous**).
- Espace admin formateur, gestion d'inscrits.
- Attestations / certificats de complétion.
- Multi-entreprise (orgs multi-utilisateurs).
- Lien magique par email / mot de passe (MVP = **OAuth seulement**).
- Paiement.

## Décisions (issues du brainstorming)

| Sujet | Décision |
|---|---|
| Modèle d'accès | B2B/cohorte **dans l'esprit**, mais MVP = inscription **ouverte à tous** |
| Personnalisation | **Même curriculum pour tous** + progression par compte |
| Public vs gated | **Aperçu public** + progression/dashboard **gated** |
| Méthode d'auth | **OAuth Google + Microsoft** (pas de mot de passe, pas d'email d'auth) |
| Stack | **Auth.js v5 + Drizzle + Neon Postgres** |

## Architecture

### Données (Neon Postgres)

- **Tables Auth.js** (gérées par l'adapter Drizzle) : `users`, `accounts`,
  `sessions`, `verification_tokens`. Remplies par les providers OAuth.
- **Table `progress`** (la nôtre) :
  - `user_id` (FK users)
  - `module_slug` · `lesson_slug` (réfèrent le contenu fichier, **indépendants
    de la locale** — même clé qu'aujourd'hui `module:lesson`)
  - `completed_at` (nullable)
  - `quiz_score` · `quiz_total` (nullable)
  - `updated_at`
  - Clé unique `(user_id, module_slug, lesson_slug)`.

Le **contenu reste en fichiers MDX** (public). La base ne stocke que **qui** et
**où en est chacun**. Pas de contenu en base.

### Auth & accès

- **Page connexion** `/[locale]/connexion` : boutons « Continuer avec Google » /
  « …Microsoft » (Auth.js v5).
- **Gating** : `/programme` + leçons **publiques** ; **`/[locale]/mon-espace`**
  et la **persistance de progression** exigent une session.
- **Protection par session côté serveur + redirection**, **PAS par middleware** :
  `proxy.ts` (renommage middleware→proxy de Next 16) occupe déjà l'unique
  créneau middleware. Le dashboard vérifie la session en server component et
  redirige vers `/connexion` si absente.
- **`proxy.ts` doit exclure `/api/auth/*`** (et autres routes non localisées) de
  la redirection locale, sinon le flux OAuth casse.

### Progression : `localStorage` → compte

- `useProgress` (zustand) devient une **couche de synchronisation** :
  - **connecté** → lit/écrit la progression en base via **server actions**.
  - **déconnecté** → retombe sur `localStorage` (aperçu, comme aujourd'hui).
- **Au premier login**, proposer de **rapatrier** la progression locale vers le
  compte (merge non destructif) puis vider le local.
- `<LessonStatus>` (coche sommaire) et `<Quiz>` (score, validé ≥ 70 %) écrivent
  vers la base quand une session existe.

### Interfaces (UI)

- **Header** : déconnecté → « Se connecter » ; connecté → « Mon espace » + nom/
  avatar + « Déconnexion ». Bilingue (copie i18n).
- **`/[locale]/connexion`** : deux boutons OAuth, on-brand (tokens existants).
- **`/[locale]/mon-espace`** (gated) : modules **avec progression** (« M2 · 2/4
  leçons · quiz 80 % »), bouton **« Reprendre »** vers la dernière leçon non
  finie, % global. C'est « mon programme ».
- Pages leçon/sommaire : coche et score reflètent la progression **du compte**
  quand connecté.

## Configuration requise (par l'utilisateur, guidé)

- **Google** : OAuth 2.0 client (Google Cloud Console) → `AUTH_GOOGLE_ID` /
  `AUTH_GOOGLE_SECRET`, redirect URIs prod + `localhost`.
- **Microsoft** : app Entra/Azure AD → `AUTH_MICROSOFT_ENTRA_ID_ID` / `…_SECRET`
  (+ issuer/tenant).
- **`AUTH_SECRET`** (généré).
- **`DATABASE_URL`** : base Neon — **provisionnable via le MCP Neon** côté
  assistant ; la chaîne est fournie en env.
- Variables posées dans **Vercel** (prod) + **`.env.local`** (dev).

## Risques & vérifications (1ʳᵉ étape du plan)

1. **Auth.js v5 × Next 16** : Next 16 est récent — **spike de compat** avant de
   construire le reste. Repli documenté si blocage (ex. option Neon Auth/Clerk).
   Lire `node_modules/next/dist/docs/` (cf. AGENTS.md).
2. **`proxy.ts`** : vérifier/ajuster l'exclusion de `/api/auth/*` du traitement
   locale.
3. **RGPD** : stocker des emails = traitement de données perso → mentionner dans
   la page confidentialité (cohérent avec M5). PII minimisée (email + nom + photo
   du provider).

## Périmètre MVP (résumé)

1. Fondation : Neon + Drizzle + Auth.js v5 (Google + Microsoft), session.
2. Schéma `progress` + server actions lecture/écriture.
3. Header (état connecté) + page `/connexion`.
4. Dashboard `/mon-espace` (gated, progression).
5. Câblage `<LessonStatus>` + `<Quiz>` vers la base, avec repli `localStorage` et
   rapatriement au premier login.

## Critères de succès

- Un utilisateur se connecte avec Google **ou** Microsoft, voit « Mon espace ».
- Sa progression (coche leçon + score quiz) **persiste** entre deux sessions et
  deux appareils.
- Déconnecté, `/programme` et les leçons restent **lisibles** ; tenter de
  sauvegarder invite à se connecter.
- Build vert, lint propre, flux OAuth fonctionnel en local **et** en prod
  (Vercel).
