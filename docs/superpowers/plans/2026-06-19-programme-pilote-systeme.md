# Programme — Système d'apprentissage (pilote) — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bâtir le système d'apprentissage bilingue (FR/EN) de Largo IA — routing i18n, pipeline MDX, modèle de contenu, composants pédagogiques, gabarits programme/module/leçon, mode formateur — prouvé par une leçon-témoin rendue en `/fr` et `/en`.

**Architecture:** App Router Next.js 16 avec un segment `[locale]`. Les leçons sont des fichiers MDX par locale dans `content/<locale>/programme/...`, listés/validés par des loaders côté serveur, rendus par un gabarit unique on-brand. Les textes d'UI viennent d'un dictionnaire par locale. Pas d'auth, pas de suivi de progression (forme « C-léger », évolutive vers un LMS plus tard).

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, MDX (`@next/mdx` ou `next-mdx-remote` — à confirmer dans la Task 2), `gray-matter` pour le frontmatter, `zod` pour valider le frontmatter, `vitest` pour les loaders. CSS tokens existants (`app/globals.css`).

## Global Constraints

- **Next.js 16, « PAS le Next.js de ton entraînement ».** Avant toute config couplée au framework (i18n routing, MDX), LIRE `node_modules/next/dist/docs/` et suivre la convention installée. (Imposé par `AGENTS.md`.)
- **Locales : `fr` (défaut), `en`.** Structure extensible à `th` (= ajouter un code + des fichiers, sans refonte). `type Locale = "fr" | "en"`.
- **Design system existant** (`DESIGN.md`) : encre/papier/ocre, Bricolage Grotesque, beaucoup d'air. Bans : navy/teal, cartes génériques, eyebrows majuscules, ghost-cards, gradient-text.
- **Accessibilité AA non négociable** : texte ≥ 4.5:1 (ocre EN TEXTE = `--sun-ink`, jamais `--sun-deep`), `prefers-reduced-motion`, reveals qui n'occultent jamais le contenu par défaut.
- **Prose** : mesure 65–75ch, `text-wrap: pretty`.
- **Pas** d'auth, de progression persistante, de paiement, de CMS.
- **`pnpm build` doit passer à la fin de chaque task.** `pnpm` uniquement.
- **Filtre marque** : « est-ce que ça aide un dirigeant inquiet à comprendre et à faire confiance ? ».

---

## File Structure

- `lib/i18n.ts` — `Locale`, `LOCALES`, `DEFAULT_LOCALE`, `isLocale()`, helpers de chemin.
- `content/i18n/fr.json`, `content/i18n/en.json` — dictionnaires d'UI.
- `lib/dictionary.ts` — chargement typé du dictionnaire selon la locale.
- `lib/content/schema.ts` — schéma `zod` du frontmatter + types `LessonMeta`, `ModuleMeta`.
- `lib/content/programme.ts` — loaders : `listModules(locale)`, `getModule(locale, slug)`, `getLesson(locale, moduleSlug, lessonSlug)`, `getAdjacentLessons(...)`.
- `content/<locale>/programme/<module>/_module.json` — métadonnées de module.
- `content/<locale>/programme/<module>/<lesson>.mdx` — leçons.
- `components/learn/mdx-components.tsx` — `Idee`, `Exemple`, `Exercice`, `Attention`, `Formateur`.
- `components/learn/LessonNav.tsx`, `components/learn/ModuleToc.tsx`, `components/learn/RoleToggle.tsx`.
- `components/learn/RoleContext.tsx` — état « mode formateur » (cookie/searchParam).
- `app/[locale]/layout.tsx` — layout localisé (dictionnaire, lang).
- `app/[locale]/programme/page.tsx` — vue d'ensemble du programme.
- `app/[locale]/programme/[module]/page.tsx` — page module (sommaire).
- `app/[locale]/programme/[module]/[lecon]/page.tsx` — page leçon (gabarit).
- `app/[locale]/page.tsx` + autres pages existantes — déplacées sous `[locale]` (Task 9).
- `middleware.ts` — redirection racine → locale par défaut (selon doc Next 16).
- `vitest.config.ts`, `lib/content/programme.test.ts` — tests des loaders.

---

## Task 1 : Fondations i18n (types + dictionnaire)

**Files:**
- Create: `lib/i18n.ts`, `content/i18n/fr.json`, `content/i18n/en.json`, `lib/dictionary.ts`
- Test: `lib/dictionary.test.ts`

**Interfaces:**
- Produces : `type Locale = "fr" | "en"`; `LOCALES: Locale[]`; `DEFAULT_LOCALE: "fr"`; `isLocale(s: string): s is Locale`; `getDictionary(locale: Locale): Promise<Dict>` où `Dict` a au moins `{ nav: {programme,aPropos,contact,reserver}, programme: {sommaire,module,lecon,suivant,precedent,modeFormateur,dureeMin,objectifs,prerequis}, langue: {fr,en} }`.

- [ ] **Step 1 : Écrire le test des dictionnaires**

```ts
// lib/dictionary.test.ts
import { describe, it, expect } from "vitest";
import { getDictionary } from "./dictionary";
import { LOCALES } from "./i18n";

describe("dictionaries", () => {
  it("expose les mêmes clés pour chaque locale", async () => {
    const fr = await getDictionary("fr");
    const en = await getDictionary("en");
    expect(Object.keys(fr.nav).sort()).toEqual(Object.keys(en.nav).sort());
    expect(fr.programme.suivant).toBeTruthy();
    expect(en.programme.suivant).toBeTruthy();
  });
});
```

- [ ] **Step 2 : Lancer le test, vérifier l'échec** — `pnpm vitest run lib/dictionary.test.ts` → FAIL (module manquant). (vitest est installé en Task 3 ; si absent ici, faire Task 3 step 1 d'abord puis revenir.)

- [ ] **Step 3 : Écrire `lib/i18n.ts`**

```ts
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";
export function isLocale(s: string): s is Locale {
  return (LOCALES as readonly string[]).includes(s);
}
```

- [ ] **Step 4 : Écrire les dictionnaires** (`content/i18n/fr.json` puis `en.json`, mêmes clés). Exemple FR :

```json
{
  "nav": { "programme": "Programme", "aPropos": "Le formateur", "contact": "Contact", "reserver": "Réserver un appel" },
  "programme": { "sommaire": "Sommaire", "module": "Module", "lecon": "Leçon", "suivant": "Suivant", "precedent": "Précédent", "modeFormateur": "Mode formateur", "dureeMin": "min", "objectifs": "Objectifs", "prerequis": "Prérequis" },
  "langue": { "fr": "Français", "en": "English" }
}
```

- [ ] **Step 5 : Écrire `lib/dictionary.ts`**

```ts
import type { Locale } from "./i18n";
import fr from "@/content/i18n/fr.json";
import en from "@/content/i18n/en.json";
export type Dict = typeof fr;
const DICTS: Record<Locale, Dict> = { fr, en: en as Dict };
export async function getDictionary(locale: Locale): Promise<Dict> {
  return DICTS[locale];
}
```

- [ ] **Step 6 : Lancer le test** — `pnpm vitest run lib/dictionary.test.ts` → PASS.
- [ ] **Step 7 : Commit** — `git add lib/i18n.ts lib/dictionary.ts lib/dictionary.test.ts content/i18n && git commit -m "feat(i18n): locales + dictionnaires FR/EN typés"`

---

## Task 2 : Recherche framework — i18n routing + MDX (Next 16)

> Tâche de recherche obligatoire (AGENTS.md). Pas de code applicatif final ici : on confirme les APIs, on note les patterns, on installe les deps.

**Files:** Modify: `next.config.ts`, `package.json`

- [ ] **Step 1 : Lire la doc i18n installée** — lire `node_modules/next/dist/docs/` (chercher « internationalization », « i18n », « middleware », « generateStaticParams »). Noter : approche recommandée pour App Router (segment `[locale]` + middleware vs config), signature de `middleware.ts`, comment forcer le rendu statique par locale.
- [ ] **Step 2 : Lire la doc MDX installée** — chercher « mdx », « @next/mdx », « mdx-components ». Déterminer : `@next/mdx` (config `next.config` + `mdx-components.tsx` racine) OU `next-mdx-remote` (rendu à la volée). **Recommandation par défaut : `@next/mdx`** si supporté (rendu statique, composants globaux), sinon `next-mdx-remote`.
- [ ] **Step 3 : Installer les dépendances** — `pnpm add gray-matter zod` et, selon Step 2, `pnpm add @next/mdx @mdx-js/loader @mdx-js/react` (ou `pnpm add next-mdx-remote`). Dev : `pnpm add -D vitest`.
- [ ] **Step 4 : Configurer MDX dans `next.config.ts`** selon la convention lue au Step 2 (ajouter `pageExtensions`/plugin MDX si `@next/mdx`). Ajouter `vitest.config.ts` minimal (`test.environment: "node"`).
- [ ] **Step 5 : Vérifier** — `pnpm build` → PASS (aucune régression ; config MDX acceptée).
- [ ] **Step 6 : Commit** — `git add -A && git commit -m "chore: deps + config MDX/i18n confirmées sur Next 16"`

---

## Task 3 : Schéma de contenu + loaders programme (TDD)

**Files:**
- Create: `lib/content/schema.ts`, `lib/content/programme.ts`, `vitest.config.ts`
- Create (fixtures): `content/fr/programme/_pilote/_module.json`, `content/fr/programme/_pilote/intro.mdx`, `content/en/programme/_pilote/_module.json`, `content/en/programme/_pilote/intro.mdx`
- Test: `lib/content/programme.test.ts`

**Interfaces:**
- Produces :
  - `LessonMeta = { title: string; slug: string; module: string; order: number; durationMin: number; level: "découverte"|"intermédiaire"|"avancé"; objectives: string[]; prerequisites: string[] }`
  - `ModuleMeta = { slug: string; title: string; summary: string; order: number }`
  - `listModules(locale): Promise<ModuleMeta[]>` (triés par `order`)
  - `getModule(locale, slug): Promise<{ meta: ModuleMeta; lessons: LessonMeta[] } | null>` (leçons triées par `order`)
  - `getLesson(locale, moduleSlug, lessonSlug): Promise<{ meta: LessonMeta; body: string } | null>` (`body` = MDX brut, sans frontmatter)
  - `getAdjacentLessons(locale, moduleSlug, lessonSlug): Promise<{ prev: LessonMeta | null; next: LessonMeta | null }>`

- [ ] **Step 1 : Écrire les fixtures** — deux modules-jouets `_pilote` (fr + en) avec `_module.json` (`{ "slug":"_pilote","title":"Pilote","summary":"Module de test.","order":1 }`) et une leçon `intro.mdx` avec frontmatter complet (title, slug:"intro", module:"_pilote", order:1, durationMin:10, level:"découverte", objectives:["..."], prerequisites:[]) + un corps MDX court.

- [ ] **Step 2 : Écrire le test des loaders**

```ts
// lib/content/programme.test.ts
import { describe, it, expect } from "vitest";
import { listModules, getModule, getLesson, getAdjacentLessons } from "./programme";

describe("programme loaders (fr)", () => {
  it("liste les modules triés par order", async () => {
    const mods = await listModules("fr");
    expect(mods.find((m) => m.slug === "_pilote")).toBeTruthy();
  });
  it("charge une leçon avec frontmatter validé + corps", async () => {
    const l = await getLesson("fr", "_pilote", "intro");
    expect(l?.meta.title).toBeTruthy();
    expect(l?.meta.durationMin).toBe(10);
    expect(l?.body).not.toContain("---"); // frontmatter retiré
  });
  it("retourne null pour une leçon inconnue", async () => {
    expect(await getLesson("fr", "_pilote", "nope")).toBeNull();
  });
  it("calcule prev/next dans un module", async () => {
    const adj = await getAdjacentLessons("fr", "_pilote", "intro");
    expect(adj).toHaveProperty("prev");
    expect(adj).toHaveProperty("next");
  });
});
```

- [ ] **Step 3 : Lancer, vérifier l'échec** — `pnpm vitest run lib/content/programme.test.ts` → FAIL (loaders manquants).

- [ ] **Step 4 : Écrire `lib/content/schema.ts`**

```ts
import { z } from "zod";
export const lessonFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  module: z.string(),
  order: z.number(),
  durationMin: z.number(),
  level: z.enum(["découverte", "intermédiaire", "avancé"]),
  objectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
});
export type LessonMeta = z.infer<typeof lessonFrontmatter>;
export const moduleMeta = z.object({
  slug: z.string(), title: z.string(), summary: z.string(), order: z.number(),
});
export type ModuleMeta = z.infer<typeof moduleMeta>;
```

- [ ] **Step 5 : Écrire `lib/content/programme.ts`** — utiliser `node:fs/promises` + `node:path` + `gray-matter`. Racine = `path.join(process.cwd(), "content", locale, "programme")`. `listModules` lit chaque sous-dossier `_module.json` (valider via `moduleMeta`), trie par `order`. `getModule` lit le module + ses `*.mdx` (frontmatter via `gray-matter` validé par `lessonFrontmatter`), trie par `order`. `getLesson` retourne `{ meta, body: matter(raw).content }`. `getAdjacentLessons` calcule prev/next depuis la liste triée. Les inconnus → `null`.

- [ ] **Step 6 : Lancer le test** — `pnpm vitest run lib/content/programme.test.ts` → PASS.
- [ ] **Step 7 : Commit** — `git add lib/content vitest.config.ts content/fr/programme/_pilote content/en/programme/_pilote && git commit -m "feat(content): schéma frontmatter + loaders programme (TDD)"`

---

## Task 4 : Composants MDX pédagogiques

**Files:**
- Create: `components/learn/mdx-components.tsx`, `components/learn/RoleContext.tsx`
- (Si `@next/mdx`) Create/Modify: `mdx-components.tsx` (racine) pour exposer les composants globalement.

**Interfaces:**
- Consumes : `RoleContext` (Task fournit ici) — `useRole(): { formateur: boolean }`.
- Produces : `Idee`, `Exemple`, `Exercice`, `Attention`, `Formateur` (composants). `Formateur` ne rend RIEN si `formateur` est faux.

- [ ] **Step 1 : Écrire `RoleContext.tsx`** (client) — provider qui lit l'état « formateur » (depuis une prop initiale fournie par le serveur via cookie/searchParam) ; `useRole()`.
- [ ] **Step 2 : Écrire `mdx-components.tsx`** — chaque composant stylé avec les tokens (`--sun-ink` pour accents texte, filets `--line`, jamais d'ombre+bordure cumulées). `Formateur` : `const { formateur } = useRole(); if (!formateur) return null;` puis un bloc encadré (fond `--paper-2`, libellé « Pour le formateur »).
- [ ] **Step 3 : Vérifier le typage** — `pnpm build` → PASS.
- [ ] **Step 4 : Commit** — `git add components/learn mdx-components.tsx && git commit -m "feat(learn): composants MDX (Idee/Exemple/Exercice/Attention/Formateur)"`

---

## Task 5 : Layout localisé `[locale]` + migration des pages existantes

**Files:**
- Create: `app/[locale]/layout.tsx`, `middleware.ts`
- Move: `app/page.tsx` → `app/[locale]/page.tsx`; idem `a-propos/`, `contact/`, `programme/` (provisoire), `mentions-legales/`, `confidentialite/`. Supprimer l'ancien `app/layout.tsx` racine au profit d'un layout racine minimal + layout `[locale]`.
- Modify: `components/SiteHeader.tsx`, `components/SiteFooter.tsx` (liens préfixés par la locale + sélecteur de langue).

**Interfaces:**
- Consumes : `getDictionary`, `LOCALES`, `isLocale`.
- Produces : `generateStaticParams` exporte `LOCALES`. Toutes les pages reçoivent `params: { locale }`.

- [ ] **Step 1 : Écrire `middleware.ts`** selon la doc Next 16 (Task 2) : rediriger `/` → `/fr` (et toute route sans locale → locale par défaut). Matcher excluant `/_next`, assets, `content`.
- [ ] **Step 2 : Layout racine minimal** — `app/layout.tsx` ne garde que `<html><body>` neutres (ou est remplacé par le layout `[locale]` qui pose `lang={locale}`). Suivre la convention Next 16 lue en Task 2.
- [ ] **Step 3 : `app/[locale]/layout.tsx`** — `generateStaticParams` = `LOCALES.map(l => ({locale:l}))` ; charge le dictionnaire ; pose `<html lang={locale}>` ; monte `BookingProvider`, `SiteHeader`, `SiteFooter`, `RoleProvider`.
- [ ] **Step 4 : Déplacer les pages** sous `app/[locale]/` ; chaque `page.tsx` accepte `params` et lit la locale ; remplacer les libellés d'UI codés en dur par le dictionnaire là où c'est trivial (le reste = Prog 12).
- [ ] **Step 5 : Header/Footer** — préfixer les `href` par `/${locale}` ; ajouter un **sélecteur de langue** (composant client) qui swappe le segment de locale dans l'URL courante.
- [ ] **Step 6 : Vérifier** — `pnpm build` → PASS ; `curl -s -o /dev/null -w "%{http_code}" localhost:3000/fr` = 200 ; `/en` = 200 ; `/` → redirige vers `/fr`.
- [ ] **Step 7 : Commit** — `git add -A && git commit -m "feat(i18n): segment [locale], migration des pages, sélecteur de langue"`

---

## Task 6 : Pages programme + module + gabarit de leçon + navigation

**Files:**
- Create: `app/[locale]/programme/page.tsx` (remplace la page programme marketing), `app/[locale]/programme/[module]/page.tsx`, `app/[locale]/programme/[module]/[lecon]/page.tsx`
- Create: `components/learn/ModuleToc.tsx`, `components/learn/LessonNav.tsx`

**Interfaces:**
- Consumes : loaders Task 3, composants MDX Task 4, dictionnaire Task 1.
- Produces : `generateStaticParams` sur chaque route (énumère locales × modules × leçons via les loaders).

- [ ] **Step 1 : Page programme** — liste des modules (`listModules`) en style éditorial (rangées `.row`, pas de grille de cartes), liens vers chaque module. Reprend le `PageHero` localisé.
- [ ] **Step 2 : Page module** — `getModule` ; titre + résumé + **sommaire** (`ModuleToc` : liste des leçons avec durée + objectifs courts) ; chaque entrée lie vers la leçon.
- [ ] **Step 3 : Gabarit de leçon** — `getLesson` + rendu du `body` MDX (via `@next/mdx` compilé ou `next-mdx-remote` selon Task 2) avec les composants Task 4 ; en-tête (titre, durée, objectifs, prérequis depuis le dictionnaire) ; prose en mesure 65–75ch ; `LessonNav` (prev/next via `getAdjacentLessons`).
- [ ] **Step 4 : `generateStaticParams`** sur les 3 routes pour pré-rendre statiquement (locales × modules × leçons).
- [ ] **Step 5 : Vérifier** — `pnpm build` → PASS (les routes `_pilote/intro` se génèrent) ; `curl` `/fr/programme`, `/fr/programme/_pilote`, `/fr/programme/_pilote/intro` = 200 ; idem `/en/...`.
- [ ] **Step 6 : Commit** — `git add -A && git commit -m "feat(learn): pages programme/module/leçon + navigation prev/next"`

---

## Task 7 : Mode formateur (bascule + persistance)

**Files:**
- Create: `components/learn/RoleToggle.tsx`
- Modify: `app/[locale]/layout.tsx` (lire l'état initial), `components/learn/RoleContext.tsx`

**Interfaces:**
- Produces : un toggle qui persiste `role=formateur` (cookie) ; le serveur lit le cookie pour l'état initial (évite le flash) ; révèle les `<Formateur>` et l'accès au module `MF`.

- [ ] **Step 1 : Persistance** — `RoleToggle` (client) écrit un cookie `largo_role` (`formateur`/`apprenant`) et rafraîchit. Le layout serveur lit le cookie (`cookies()` selon doc Next 16) et passe l'état initial au `RoleProvider`.
- [ ] **Step 2 : Effet** — quand `formateur` actif : les blocs `<Formateur>` s'affichent ; le module `MF` apparaît dans la liste programme (filtré sinon). Placer le `RoleToggle` dans l'en-tête de la section programme.
- [ ] **Step 3 : Vérifier** — `pnpm build` → PASS ; manuellement : sans cookie, `<Formateur>` absent ; avec cookie, présent (vérif via navigateur/Playwright).
- [ ] **Step 4 : Commit** — `git add -A && git commit -m "feat(learn): mode formateur (cookie + zones réservées + module MF)"`

---

## Task 8 : Leçon-témoin réelle (FR + EN) + QA pilote système

> Prouve le pipeline de bout en bout avec une vraie leçon courte (pas le M1 complet — voir « Suite »).

**Files:**
- Create: `content/fr/programme/m1-fondamentaux/_module.json` + `01-ce-que-lia-sait.mdx` (+ zone `<Formateur>`)
- Create: `content/en/programme/m1-fondamentaux/_module.json` + `01-what-ai-can-do.mdx`
- Remove: fixtures `_pilote` (fr + en) si plus nécessaires (ou les garder hors build via underscore).

- [ ] **Step 1 : Rédiger la leçon-témoin FR** — module `m1-fondamentaux` (order 1), leçon `01` avec toutes les sections (Pourquoi/Idée/Exemple/Pas-à-pas/Exercice/Récap) + une zone `<Formateur>`. Respecter le filtre marque + AA.
- [ ] **Step 2 : Traduire la leçon-témoin EN** (même frontmatter, `slug` EN, contenu traduit).
- [ ] **Step 3 : QA** — `pnpm build` PASS ; parcours `/fr/programme/m1-fondamentaux/01-ce-que-lia-sait` et `/en/...` (200, rendu correct, prev/next, mode formateur) ; captures desktop+mobile ; vérifier contrastes (kicker/lien = `--sun-ink`) ; `prefers-reduced-motion`.
- [ ] **Step 4 : Commit** — `git add -A && git commit -m "feat(content): leçon-témoin M1 FR+EN — pipeline prouvé"`

---

## Suite (hors de ce plan — efforts d'écriture/traduction)

Ces étapes tournent **contre le système ci-dessus une fois livré** ; ce sont des efforts de **rédaction** (co-écriture agent + Guillaume), pas d'ingénierie nouvelle. Suivies dans Paperclip :

- **[Prog 8]** Rédiger M1 Fondamentaux en entier (FR) + couche formateur par leçon.
- **[Prog 9]** Traduire M1 en EN.
- **[Prog 10]** Amorcer le module MF (Devenir formateur — posture).
- **[Prog 12]** Traduire le site marketing existant FR→EN (utilise l'infra i18n posée ici).

Quand le format M1 est validé par Guillaume : industrialiser M2–M5 (même gabarit).

---

## Self-Review

- **Couverture spec :** routing i18n (T1,T2,T5) ✓ · MDX (T2,T4,T6) ✓ · modèle de contenu/loaders (T3) ✓ · composants pédagogiques (T4) ✓ · gabarits programme/module/leçon + nav (T6) ✓ · mode formateur (T7) ✓ · leçon FR+EN témoin + QA (T8) ✓ · carte des modules → M1 amorcé en T8, complété en [Prog 8] ✓ · « pas de LMS » respecté (aucune auth/progression) ✓ · extensible `th` (locale en données, T1) ✓.
- **Placeholders :** les « lire la doc Next » (T2) sont des actions concrètes mandatées par AGENTS.md, pas des placeholders. Aucun « TODO/à compléter » de code.
- **Cohérence des types :** `LessonMeta`/`ModuleMeta` (T3) réutilisés tels quels en T6 ; `getDictionary`/`Locale` (T1) en T5/T6 ; `useRole()` (T4) consommé en T6/T7. Signatures alignées.
- **Périmètre :** ce plan = le SYSTÈME + une leçon-témoin (logiciel fonctionnel et testable seul). La rédaction du contenu complet est explicitement sortie (« Suite »).
