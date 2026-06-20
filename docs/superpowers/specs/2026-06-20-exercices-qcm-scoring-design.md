# Exercices interactifs — QCM avec scoring (design)

Date : 2026-06-20 · Statut : validé (design), en attente de plan.

## Contexte & objectif

Ajouter aux leçons des **exercices interactifs avec scoring**. Phase 1 = **QCM
auto-corrigé** (côté client, statique). Conçu pour qu'une phase 2 (réponse libre
notée par IA) s'y branche plus tard sans réécriture.

Décisions de cadrage (validées) :

- **QCM d'abord** ; architecture extensible à la notation IA (phase 2, projet à part).
- **État : zustand + persist localStorage**, derrière l'option `storage` du store
  = **interface de persistance**. Le site reste 100 % statique. Une DB (Neon)
  pourra remplacer le storage plus tard, **quand des comptes existeront** — pas avant.
- **Scoring éphémère** affiché en fin de quiz ; un état **« validée »** (score ≥ 70 %)
  est mémorisé pour la progression.
- **Clé de progression indépendante de la locale** (`moduleSlug:lessonSlug`) :
  réussir en FR ou EN = même leçon validée.

## Non-objectifs (YAGNI)

- Pas de comptes / auth / DB maintenant.
- Pas de notation IA / backend / appel LLM maintenant.
- Pas de tableau de bord formateur ni de synchro multi-appareils (la limite
  « par navigateur » est assumée).

## Architecture (4 unités isolées)

1. **Composants d'exercice (MDX, client)** — authoring déclaratif :
   `<Quiz>` contient des `<Question prompt level>` qui contiennent des
   `<Choice correct?>`. `multiple` sur une `<Question>` = cases (multi-choix),
   sinon radio (choix unique). `<Quiz>` gère l'état des réponses, le bouton
   **Valider**, l'affichage **résultat + feedback par question**, **Recommencer**.
2. **Fonction de scoring (pure)** — `scoreQuiz(questions, answers)` →
   `{ correct, total, percent }`. Pure, déterministe, **testée au unit** (vitest).
3. **Store de progression (zustand + persist)** — `useProgress` :
   `progress: Record<string, { bestScore: number; validated: boolean }>` +
   `record(key, percent)` (validated = percent ≥ 70). Persisté via `storage`
   (localStorage aujourd'hui ; seam DB demain). Dégrade proprement si localStorage
   indisponible (mode privé).
4. **Coche de progression** — `<LessonStatus lessonKey>` (client) lit le store et
   affiche une coche sur les leçons validées dans le sommaire du module.

## Flux de données

- La page leçon pose un `LessonContext` `{ moduleSlug, lessonSlug }`.
- `<Quiz>` lit ce contexte → à la validation, appelle `useProgress.record(key, percent)`.
- La page module rend la liste des leçons ; chaque ligne monte `<LessonStatus>`
  qui lit `useProgress`.

## Gestion d'erreurs / bord

- `<Quiz>` sans `<Question>` → ne rend rien (avertissement console en dev).
- `<Question>` sans `<Choice correct>` → considérée non notable (score ignore).
- localStorage inaccessible → persist no-op, le quiz fonctionne quand même
  (juste pas de mémoire de progression).

## Tests

- `scoreQuiz()` : cas choix unique, multi-choix (tout/partiel/faux), question
  sans bonne réponse → unit (vitest).
- `useProgress.record` : met à jour bestScore (garde le meilleur), validated au
  seuil → unit.
- Rendu + interaction (sélection, valider, recommencer, coche) → navigateur.

## Extensibilité (phase 2)

Un futur `<ExerciceIA>` (réponse libre notée par IA) enregistre dans **le même
store** via **la même interface** ; le store ignore le type d'exercice. Quand des
comptes seront introduits, l'option `storage` du store passe de localStorage à un
adaptateur DB (Neon) — le reste ne bouge pas.

## Critères de succès

- Un `<Quiz>` dans la leçon-témoin M1 : répondable, corrigé, score + feedback,
  recommençable.
- L'état « validée » persiste (rechargement de page) et affiche une coche dans le
  sommaire du module. Indépendant de la locale.
- `pnpm build` vert (site statique préservé), tests verts, a11y (radio/checkbox
  natifs, focus visible), FR & EN.
