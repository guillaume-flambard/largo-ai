# Design

Système visuel de Largo IA. Concept : **« Largo » — le large, au tempo lent.**
Encre profonde, papier clair, un seul accent ocre-soleil, beaucoup d'air, la
typographie en vedette.

> **État du système (refonte « SaaS moderne », 2025).** Ce document décrit le
> système **tel qu'il est implémenté**. Une refonte a remplacé la première
> direction (famille unique Bricolage Grotesque, tokens OKLCH, boutons plats sans
> ombre) par une grammaire « SaaS moderne » : trois familles à rôles distincts,
> tokens hex avec mode sombre, boutons en pilule à dégradé + halo. Les anciens
> tokens restent en **alias de compat** dans `globals.css`. Source de vérité : le
> code (`app/[locale]/layout.tsx`, `app/globals.css`, `components/sections/saas-ui.tsx`).

## Deux grammaires de page

Le site assume **deux grammaires** cohérentes selon le rôle de la page :

- **Surfaces marketing** (accueil, à-propos, contact, mon-espace) : grammaire
  refonte — styles inline, rythme de section en px fixes, `Kicker` mono, cartes
  `lg-card` à ombre, CTA en pilule `sunPill`.
- **Surfaces contenu / prose** (module, leçon, mentions, confidentialité) :
  grammaire éditoriale — `PageHero`, classes `.section` / `.container` / `.rows`,
  espacement via tokens `clamp()` (`--section-y`), tokens typo `--fs-*`.
- **Index programme** : hybride assumé — héros refonte (`Kicker`, grille filigrane,
  filtres) puis **catalogue en rangées éditoriales** (`.rows` / `.row` / `.lg-row`),
  cohérent avec ses propres enfants (module, leçon). Pas de grille de cartes.

L'en-tête (`SiteHeader`) et le pied (`SiteFooter`) sont **partagés sur toutes les
pages** via `app/[locale]/layout.tsx`. Chaque page se clôt sur la **bande « encre »
sombre** (CTA contact) — la signature rythmique du site.

## Color

Papier comme canevas, l'encre fait le travail structurel, l'ocre est l'unique
accent (rare, intentionnel). Bandes sombres « encre » full-bleed pour rythmer le
scroll. **Mode clair par défaut, mode sombre via `[data-theme="dark"]`** (script
anti-flash dans `layout.tsx`, préférence stockée en `localStorage`).

Tokens hex (source de vérité dans `app/globals.css`, bloc `:root` refonte) :

| Role            | Light     | Dark      | Usage |
|-----------------|-----------|-----------|-------|
| `--bg`          | `#FAFBFC` | `#0A0C12` | Fond de page |
| `--bg-2`        | `#F3F5F8` | `#0D1018` | Bande alternée |
| `--surface`     | `#FFFFFF` | `#12151F` | Cartes, surfaces élevées |
| `--surface-2`   | `#F7F9FB` | `#171B27` | Surface secondaire |
| `--ink`         | `#0E1320` | `#F1F3F8` | Texte principal + fonds « encre » |
| `--ink-2`       | `#414B5E` | `#AEB6C6` | Texte secondaire |
| `--ink-3`       | `#6B7488` | `#7E8699` | Texte tertiaire / méta |
| `--line`        | `#E6E9EF` | `rgba(255,255,255,.09)` | Filets fins |
| `--line-2`      | `#D6DBE4` | `rgba(255,255,255,.16)` | Filets / bord hover |
| `--sun`         | `#F2870D` | `#FF9A2E` | **Accent unique** : aplats CTA, halos |
| `--sun-deep`    | `#D9760A` | `#F2870D` | Bas du dégradé pilule, hover |
| `--sun-2`       | `#FF6A2C` | `#FF6A2C` | Second point du dégradé (filets, halos) |
| `--sun-ink`     | `#B05707` | `#FFB256` | **Ocre EN TEXTE** (kicker, liens, chevrons) |
| `--on-sun`      | `#1B1204` | `#1B1204` | Texte sur aplat ocre |
| `--sun-soft`    | `rgba(242,135,13,.12)` | `rgba(255,154,46,.14)` | Wash ocre (fonds de badge) |
| `--grid-line`   | `rgba(14,19,32,.05)` | `rgba(255,255,255,.05)` | Grille filigrane des héros |
| `--nav-bg`      | `rgba(250,251,252,.78)` | `rgba(10,12,18,.72)` | Fond nav translucide |

Ombres et halo (assumés par la refonte) :

- `--glow-sun` : halo ocre sous les CTA pilule.
- `--shadow-card` : ombre douce des cartes (`lg-card`, badges).
- `--shadow-lg` : ombre des blocs mis en avant (carte sombre, modules).

**Alias de compat** (anciens composants non migrés, à terme à retirer) :
`--paper`→`--surface`, `--paper-2`→`--surface-2`, `--ink-soft`→`--ink-2`,
`--muted-ink`→`--ink-3`, `--paper-on-ink`→`#F1F3F8`.

Ban : l'ocre n'est jamais doré-ornemental — c'est une étincelle, pas une dorure.
Toujours référencer une variable ; éviter les hex en dur (quelques exceptions
décoratives d'aplats encre subsistent : `#0A0C12`/`#20283A` dans `Offers`,
`Manifesto`, `mon-espace` — à migrer vers un token de surface sombre).

## Typography

**Trois familles à rôles distincts** (refonte), via `next/font/google`
(`app/[locale]/layout.tsx`) :

- **Space Grotesk** → `--font-display` : titres H1–H2. Graisses **300** (héros,
  amplitude), **400** (titres de section), **600** (emphase, H3). Échelle fluide
  `clamp()`, `letter-spacing` display entre -0.02 et -0.035em, `text-wrap: balance`.
- **Geist** → `--font-sans` : corps, libellés, CTA. Corps 400 ; libellés/boutons 600.
- **Geist Mono** → `--font-mono` : **kickers, badges (M1…MF), méta et lignes
  techniques uniquement.** Toujours en `uppercase`, `letter-spacing: 0.1em`,
  taille 11–13px, graisse 500. Jamais en corps de texte.

Tokens typo prose (`--fs-h3`, `--fw-regular`, `--ls-tight`, …) pour les surfaces
contenu. Corps capé à ~34em / 65–72ch.

## Motion

Mouvement **calme et ample**, jamais nerveux :
- Keyframes refonte : `lg-fade` (apparition douce, 0.7s, ease `cubic-bezier(.2,.7,.2,1)`),
  `lg-rise`, `lg-sun` (le soleil ocre qui se lève sur héros + CTA).
- Hover sans JS : `lg-card` (translateY -3px + bord), `lg-sun-btn` (brightness),
  `lg-nav-link`, chevrons `lg-detail`.
- `prefers-reduced-motion` : toute animation `lg-*` passe à l'état final immédiat ;
  le contenu est visible par défaut, jamais gaté par une classe.

## Layout

- Conteneur `CONTAINER = 1180px` (`components/sections/saas-ui.tsx`), variante
  prose étroite via `.container`.
- **Rythme refonte** : sections en padding px fixes (`64px 24px`, `96px 24px`,
  héros `78px…`) — rythme coordonné, propre à la grammaire marketing.
- **Rythme prose** : `--section-y: clamp(5rem, 3.5rem + 6vw, 8.5rem)` (+ `-sm` / `-lg`),
  gouttière `--gutter: clamp(20px, 5vw, 40px)` sur les pages contenu/légales.
- Héros : grille filigrane (`--grid-line`) masquée en radial + masque soleil.
- Listes éditoriales (`.rows` / `.row` / `.row__index`, hover `.lg-row`) pour le
  contenu séquentiel **et** le catalogue de modules (`/programme`) : rangées
  séparées par filets, pas de cartes. Numéros (01/02) là où c'est une vraie séquence.
- Rayons : `--radius-sm` 8 → `--radius-xl` 16, `--radius-pill` 999.

## Components

- **Boutons** : primaire = pilule `sunPill` (dégradé `--sun`→`--sun-deep`, halo
  `--glow-sun`, texte `--on-sun`, rayon 11). Secondaire = `surfacePill` (surface +
  filet `--line-2`). Legacy `.btn--*` conservés pour la prose. Atomes hover `lg-*-btn`.
- **Kicker** (`saas-ui.tsx`) : label mono uppercase + court filet ocre en dégradé.
- **SaasHeading** : kicker + H2 display + sous-titre — bloc d'en-tête de section.
- **Cartes** `lg-card` : surface, filet `--line`, `--shadow-card`, hover lift
  (home `Offers`/`Atouts`, contact, nav leçon préc./suiv.).
- **Formations** (home `Offers`) : la mise en avant (formule du milieu) se fait par
  bloc encre drenché `#0A0C12` + halo soleil, pas par une ombre plus grosse. Le
  catalogue `/programme`, lui, est en rangées (cf. Layout) — pas de carte sombre.
- **FAQ** : `<details>` natif (`lg-detail`), filet fin, chevron ocre.
- **Icônes** : Material Symbols Outlined (`.msi` / composant `Msi`).

## Discipline — dark mode

Les tokens de couleur **basculent** entre `:root` (clair) et `[data-theme="dark"]`.
Conséquence : ne jamais détourner un token de son rôle.

- `--ink` est une couleur de **premier plan** : en sombre elle devient quasi-blanche.
  **Ne jamais l'utiliser comme fond de bouton/surface** (sinon fond blanc + texte
  blanc = libellé invisible). Régression vue sur le bouton de l'`ImportBanner`.
- Pour un aplat sombre indépendant du thème, utiliser une valeur encre fixe
  (`#0A0C12`) ou un token de surface, pas `--ink`.
- **CTA primaire = pilule ocre** (`--sun`→`--sun-deep`, texte `--on-sun`) : ces
  tokens sont **stables entre les deux thèmes**, donc lisibles partout. C'est le
  défaut pour toute action primaire.
- Tester chaque écran dans les deux thèmes ; `--on-sun` reste foncé sur ocre, les
  paires texte/fond doivent garder un contraste AA en clair **et** en sombre.

## Discipline — i18n (fr / en)

Locales `fr` (défaut) + `en` (`lib/i18n.ts`). Aucune chaîne visible ne doit être
codée en dur dans un seul langage.

- Copy de page/section : `lib/pages.ts` (`PageCopy`, typé `Record<Locale, …>`) et
  `lib/marketing.ts` ; libellés courts : `content/i18n/{fr,en}.json` (`getDictionary`).
- **Composants à libellés fixes** (encarts MDX, modale de réservation, quiz, note
  formateur, bannières) : recevoir une prop `locale` et lire un enregistrement local
  `COPY: Record<"fr"|"en", …>` (modèle : `Quiz`, `BookingModal`, `mdx-blocks`). La
  locale se propage depuis `app/[locale]/layout.tsx` / la page leçon.
- Les libellés d'encarts MDX viennent du **composant**, pas du MDX — donc ils doivent
  être traduits dans le composant (sinon ils restent en français sur le site EN).
- `en.json` est casté `as Dict` : la complétude des clés n'est pas garantie par le
  type — vérifier le parity fr/en (un diff de clés) après toute évolution.
