# Design

Visual system for Largo IA. Concept: **« Largo » — le large, au tempo lent.**
Encre profonde sur papier clair, un seul accent ocre-soleil, beaucoup d'air, la
typographie en vedette. Reference points: la confiance posée de Basecamp/37signals
+ l'amplitude typographique d'un spécimen Klim, sans le réflexe magazine.

## Color

Stratégie : **Committed.** Papier comme canevas, l'encre fait le travail
structurel, l'ocre est l'unique accent (rare, intentionnel). Sections sombres
« encre » full-bleed pour rythmer le scroll (les temps forts du largo).

Tokens (OKLCH source of truth, hex fallback in `globals.css`):

| Role            | OKLCH                     | Usage |
|-----------------|---------------------------|-------|
| `--paper`       | oklch(0.985 0.004 250)    | Surface principale, presque blanc, soupçon froid (pas crème) |
| `--paper-2`     | oklch(0.965 0.006 250)    | Surface alternée discrète |
| `--ink`         | oklch(0.205 0.028 255)    | Texte principal + fonds sombres « encre » (remplace le navy) |
| `--ink-soft`    | oklch(0.34 0.025 255)     | Texte secondaire sur papier |
| `--muted`       | oklch(0.46 0.018 255)     | Texte tertiaire (≥4.5:1 sur papier) |
| `--sun`         | oklch(0.74 0.142 66)      | **Accent unique** : aplats CTA, filet d'horizon, soleil, ocre sur fond encre |
| `--sun-deep`    | oklch(0.64 0.135 56)      | Hover des aplats ocre, marques graphiques (non-texte) — ne pas utiliser en texte sur papier |
| `--sun-ink`     | #9c5e1a                   | **Ocre EN TEXTE sur fond clair** (kicker, index, ligne audience, liens, chevrons FAQ, prose) — 5.07:1 papier / 4.72 papier-2, AA |
| `--line`        | oklch(0.90 0.006 250)     | Filets fins sur papier |
| `--paper-on-ink`| oklch(0.96 0.006 250)     | Texte clair sur encre |

Bans hérités : pas de navy/teal, pas de dégradé-texte, pas de glassmorphism par
défaut, pas de cartes à `border 1px + ombre large` (ghost cards). L'ocre n'est
jamais doré-ornemental — c'est une étincelle, pas une dorure.

## Typography

**Une seule famille, exploitée en fort contraste de graisse et d'échelle** —
choix explicitement préféré au couple display+body timide.

- Famille : **Bricolage Grotesque** (variable, via `next/font/google`), exposée en
  `--font-display` / `--font-sans`. Grotesque de caractère (ink traps, optique
  variable) : moderne, posée, « faite par quelqu'un », jamais template.
- Display / H1–H2 : graisses **200–300** à grande échelle pour l'amplitude ;
  emphase ponctuelle en 600–700.
- Corps : 400, lecture posée ; libellés/CTA en 600.
- Échelle fluide `clamp()`, ratio ≥ 1.25. Plafond display ~5rem. `letter-spacing`
  display entre -0.02 et -0.03em (jamais sous -0.04em). `text-wrap: balance` sur
  titres, `pretty` sur prose. Corps capé à 65–72ch.
- Pas de monospace (la marque n'est pas « dev »). Pas d'eyebrow en majuscules
  espacées comme grammaire de section.

## Motion

GSAP (déjà en place). Mouvement **calme et ample**, jamais nerveux :
- Reveals lents, ease-out-expo, échelonnés à l'intérieur d'une liste (pas un
  fondu uniforme sur chaque section).
- Motif signature : un **filet d'horizon** qui se trace et un **soleil** ocre qui
  se lève (hero + CTA final).
- `prefers-reduced-motion` : tout devient état final immédiat ; le contenu est
  visible par défaut, jamais gaté par une classe.

## Layout

- Rythme « largo » : espacement de section généreux et **varié** (`clamp()`),
  alternance papier / encre.
- Compositions amples, souvent asymétriques. **Pas de bento, pas de grille de
  cartes identiques** comme réflexe.
- Listes éditoriales (rangées séparées par filets) plutôt que cartes, sauf quand
  la carte est vraiment la bonne affordance (ex. les 3 formations).
- Conteneur ~1120px, variante étroite ~720ch pour la prose. Filets fins (`--line`)
  pour structurer, pas d'ombres décoratives.
- Numéros (01/02/03) autorisés uniquement là où c'est une vraie séquence
  (les étapes), pas comme scaffolding sur chaque section.

## Components

- **Boutons** : plats, sans ghost-card. Primaire = aplat ocre, texte encre.
  Secondaire = lien souligné encre / contour fin. Pas d'ombre + bordure cumulées.
- **Formations** : 3 colonnes, plates, filet fin ; la mise en avant se fait par
  un bloc **encre drenché**, pas par une ombre plus grosse.
- **FAQ** : `<details>` natif, sobre, filet fin, chevron ocre.
- **Horizon rule** : filet + soleil, motif réutilisable (hero, séparateurs, CTA).
