# AI-First Engineering Pivot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot the Largo IA site from generic TPE/PME AI training to the "AI-First Engineering" niche (B2B intra training for dev teams), marketing + LMS content, FR/EN.

**Architecture:** Reuse the ratified refonte design system and the data-driven content architecture (`lib/marketing.ts`, `lib/pages.ts`, `content/`). Re-architect the homepage narrative (approach B): repurpose existing section components in place (no file renames), add 3 new sections (TechStack, Deliverables, FormulesTable), recompose the home. Reconvert the 6 LMS modules 1:1 to AI-First topics. Source of truth: `docs/superpowers/specs/2026-06-25-ai-first-engineering-pivot-design.md` + the internal "AI-First Engineering" dossier.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React, TypeScript, MDX (`next-mdx-remote`), next/font, vitest, pnpm (`corepack pnpm`), jj (colocated VCS).

## Global Constraints

- VCS = **jj**: after each task, `jj commit -m "..."` then `jj bookmark set main -r @-`. Keep `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer. Do NOT `jj git push` until the final verification task (or on explicit request).
- Brand stays **"Largo IA"** in logo/header/footer/metadata; "AI-First Engineering" is the product line / hero positioning. Domain unchanged.
- **Bilingual FR/EN**: every user-visible string exists in both. EN pages must show zero hardcoded French.
- **Honesty guardrails (spec §3):** no OPCO presented as available (write "prochainement éligible OPCO"); Qualiopi = "en cours d'obtention"; **no invented prices** → "sur devis / nous consulter"; RAG souverain / multi-agents = perspective/pattern only; proof SaaS stays generic (unnamed).
- **DESIGN.md compliance:** colors via tokens (no hardcoded hex except documented encre flats), `--ok` only for status, never `var(--ink)` as a button background, fixed-label components take a `locale` prop with a local COPY record, two page grammars respected.
- Verification gates per task: `corepack pnpm exec tsc --noEmit` (clean), `corepack pnpm exec eslint <files>` (0 errors), and where rendered: `corepack pnpm dev` + `curl | grep` French-on-EN check + visual screenshot. Build gate (`corepack pnpm build`) at the end.
- Level enum stays `["découverte","intermédiaire","avancé"]` (controlled vocab; `levelLabel()` localizes it).

---

### Task 1: Extend the `Marketing` type for the new narrative

**Files:**
- Modify: `lib/marketing.ts` (type block near top, ~lines 1-55)
- Test: `lib/marketing.test.ts` (create)

**Interfaces:**
- Produces: extended `Marketing` type with new `tech` and `deliverables` members; existing members keep their names but are repurposed semantically (atouts=promesse, how=cursus, manifesto=problème, trainer=preuve, offers=formules, faq=objections).

- [ ] **Step 1:** Add to the `Marketing` type (keep all existing keys; add these two):

```ts
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
```

- [ ] **Step 2:** Add `priceNote?: string` to the `Offer` type (used to render "sur devis" instead of a numeric price). Locate the `Offer` type in `lib/marketing.ts` and add the optional field.

- [ ] **Step 3: Write the FR/EN structural-parity test** in `lib/marketing.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getMarketing } from "@/lib/marketing";

function keyShape(o: unknown): unknown {
  if (Array.isArray(o)) return o.length ? [keyShape(o[0])] : [];
  if (o && typeof o === "object")
    return Object.fromEntries(Object.keys(o as object).sort().map((k) => [k, keyShape((o as Record<string, unknown>)[k])]));
  return 0;
}

describe("marketing FR/EN parity", () => {
  it("fr and en have the same key shape", () => {
    expect(keyShape(getMarketing("fr"))).toEqual(keyShape(getMarketing("en")));
  });
  it("exposes tech and deliverables", () => {
    const m = getMarketing("fr");
    expect(m.tech.categories.length).toBeGreaterThan(0);
    expect(m.deliverables.items.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 4:** Run `corepack pnpm exec tsc --noEmit`. Expected: FAILS (the `fr`/`en` objects don't yet have `tech`/`deliverables`). This is expected — Tasks 2-3 add the data.
- [ ] **Step 5: Commit** (type only; data follows next task):

```bash
jj commit -m "feat(marketing): extend Marketing type with tech + deliverables (AI-First pivot)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 2: Rewrite `lib/marketing.ts` — FR content

**Files:** Modify: `lib/marketing.ts` (the `const fr: Marketing = {...}` block)

**Content brief (from dossier §4-§8 — write final FR prose to this brief):**
- `hero`: kicker "AI-First Engineering"; title "Faites passer votre équipe dev en mode IA — sans casser votre prod ni votre qualité"; subtitle = the promise; CTAs "Réserver un appel" (primary) + "Voir les formules" (secondary, anchors to formules).
- `manifesto` (= problème / Shadow AI): "Vos devs utilisent déjà l'IA, mais sans méthode : copier-coller non revu, dette technique, failles, aucune mesure. L'AI Act approche — sanctions dès août 2026." Tone: grave, dark band.
- `atouts` (= promesse): title "En 2 jours, d'un usage anarchique à une méthode AI-first maîtrisée"; items = 3-4 promise points (livrer plus vite · sans sacrifier la qualité · sans ouvrir de failles · mesurer le gain).
- `offers` (= formules): 3 items — Diagnostic (1 j, équipe dev, "démarrer + révéler les écarts"), Flagship (2 j, équipe dev, "maîtrise complète"), Pack complet (2 j + ½ j direction, dev+direction, "maîtrise + gouvernance AI Act"). Each `priceNote: "Sur devis"`, `ctaLabel: "Réserver un appel"`. No numeric price.
- `how` (= cursus aperçu): the 5 "capable de…" objectives (§6) condensed as steps.
- `trainer` (= preuve / pourquoi moi): "Je dirige un SaaS en production en 100 % AI-first depuis plusieurs années — je n'écris plus de code à la main, j'orchestre. J'enseigne ce que je pratique." name "Guillaume Flambard", role "AI-First Engineering · Équipes de développement".
- `tech` (§7): note "L'outillage change vite : on enseigne des principes — cadrage, garde-fous, mesure — transposables, pas un outil figé." categories: Agents de code [Claude Code, Cursor], Context engineering [fichiers CLAUDE.md, specs exploitables, découpage], Intégration & MCP [MCP, QA navigateur Playwright, branchement Git/CI], Qualité & garde-fous [tests assistés, revue de code IA, ce qu'on ne délègue jamais], Automatisation [n8n, OCR/vision].
- `deliverables` (§8): playbook AI-first personnalisé · templates de configuration (fichiers de contexte, conventions agent) · checklist de garde-fous · politique d'usage IA + cadrage AI Act. subtitle stresses "des outils opérationnels, pas des slides".
- `faq` (= objections, §4): 4 items — "L'IA va remplacer mes devs ?" · "Mes devs s'y sont déjà mis seuls" · "On verra l'AI Act plus tard" · "C'est cher" — with the dossier's rebuttals.
- `footer`: tagline reframed to AI-First Engineering; cols/links updated (no TPE/PME wording).

- [ ] **Step 1:** Rewrite the entire `fr` object to the brief above, keeping the type shape from Task 1. Remove all TPE/PME / "100 % visio" / "sans jargon" wording.
- [ ] **Step 2:** Run `corepack pnpm exec tsc --noEmit`. Expected: still FAILS only on `en` missing `tech`/`deliverables` (fr now complete). If fr-side type errors appear, fix them.
- [ ] **Step 3: Commit:**

```bash
jj commit -m "content(marketing): rewrite FR to AI-First Engineering narrative
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 3: Rewrite `lib/marketing.ts` — EN content (mirror of FR)

**Files:** Modify: `lib/marketing.ts` (the `const en: Marketing = {...}` block)

- [ ] **Step 1:** Rewrite the `en` object as a faithful English mirror of the Task-2 FR content (hero "Move your dev team to AI-first — without breaking your prod or your quality", problem/Shadow AI, promise, 3 formulas with `priceNote: "On request"`, objectives, proof, tech, deliverables, objections, footer). Keep identical key shape.
- [ ] **Step 2:** Run `corepack pnpm exec tsc --noEmit`. Expected: PASS.
- [ ] **Step 3:** Run `corepack pnpm exec vitest run lib/marketing.test.ts`. Expected: PASS (FR/EN parity + tech/deliverables present).
- [ ] **Step 4: Commit:**

```bash
jj commit -m "content(marketing): mirror EN AI-First Engineering content
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 4: New `TechStack` section component

**Files:**
- Create: `components/sections/TechStack.tsx`
- Modify: `app/[locale]/page.tsx` (import only; wiring in Task 8)

**Interfaces:**
- Consumes: `Marketing["tech"]` (from Task 1).
- Produces: `export function TechStack({ copy }: { copy: Marketing["tech"] })`.

- [ ] **Step 1:** Create `TechStack.tsx` following the refonte grammar (CONTAINER 1180, `Kicker` mono, editorial rows or a category grid; ocre `--sun-ink` for category labels; no hardcoded hex). Render `copy.kicker/title/subtitle`, then one block per `copy.categories[]` (category name + its `items` as mono tags), then `copy.note` as a closing line. Model the markup/tokens on `components/sections/Atouts.tsx` for spacing/typography consistency.
- [ ] **Step 2:** Run `corepack pnpm exec tsc --noEmit && corepack pnpm exec eslint components/sections/TechStack.tsx`. Expected: clean.
- [ ] **Step 3: Commit:**

```bash
jj commit -m "feat(sections): add TechStack section (AI-First tools & principles)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 5: New `Deliverables` section component

**Files:**
- Create: `components/sections/Deliverables.tsx`

**Interfaces:**
- Consumes: `Marketing["deliverables"]`.
- Produces: `export function Deliverables({ copy }: { copy: Marketing["deliverables"] })`.

- [ ] **Step 1:** Create `Deliverables.tsx` (refonte grammar). Render kicker/title/subtitle + the 4 `items` (`TitleDesc`) as editorial rows or `lg-card`s with a `Msi` icon each, ocre accents via tokens. Reuse the `Msi` icon component from `components/sections/saas-ui`.
- [ ] **Step 2:** `corepack pnpm exec tsc --noEmit && corepack pnpm exec eslint components/sections/Deliverables.tsx`. Expected: clean.
- [ ] **Step 3: Commit:**

```bash
jj commit -m "feat(sections): add Deliverables section (playbook, templates, checklist, policy)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 6: `FormulesTable` + repurpose `Offers` to the 3 formules

**Files:**
- Create: `components/sections/FormulesTable.tsx`
- Modify: `components/sections/Offers.tsx`

**Interfaces:**
- `FormulesTable` consumes `Marketing["offers"]["items"]`; renders the comparison table (Format / Pour qui / Objectif / Rôle) responsively.
- `Offers` renders the 3 formula cards using `priceNote` instead of a numeric price.

- [ ] **Step 1:** In `Offers.tsx`, replace any numeric price rendering with `offer.priceNote` (e.g. "Sur devis"). Keep the dark "encre" featured-card treatment for the Flagship (middle) formula. No hardcoded hex beyond the documented encre flats.
- [ ] **Step 2:** Create `FormulesTable.tsx` rendering a 3-column comparison from `offers.items` (rows: Format, Pour qui, Objectif). Mobile: stack to per-formula blocks (`.lg-col2`/media query pattern already in globals.css).
- [ ] **Step 3:** `corepack pnpm exec tsc --noEmit && corepack pnpm exec eslint components/sections/Offers.tsx components/sections/FormulesTable.tsx`. Expected: clean.
- [ ] **Step 4: Commit:**

```bash
jj commit -m "feat(sections): formules cards (sur devis) + comparison table
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 7: Repurpose hero + remaining sections (data-driven, minimal structural change)

**Files:**
- Modify: `components/sections/CinematicHero.tsx` (remove the "Ma progression" mock product card; keep an uncluttered hero — headline + sub + CTAs + an abstract/dev-relevant visual or none)
- Modify: `components/sections/Manifesto.tsx`, `Atouts.tsx`, `HowItWorks.tsx`, `TrainerTeaser.tsx`, `Faq.tsx` only where the new copy needs a different shape (most are already data-driven and need no structural change)

- [ ] **Step 1:** In `CinematicHero.tsx`, remove the LMS mock progress card block and its helper labels (`progressLabel`/`modulesLabel`/`resumeLabel`). Keep the hero text + CTA wired to `copy`. Ensure no `var(--ink)`-as-background and no orphan tokens.
- [ ] **Step 2:** Skim `Manifesto/Atouts/HowItWorks/TrainerTeaser/Faq` — confirm they render purely from their `copy` prop. Adjust only if the new content count/shape differs (e.g. Atouts item count). No copy hardcoded in components.
- [ ] **Step 3:** `corepack pnpm exec tsc --noEmit && corepack pnpm exec eslint components/sections/CinematicHero.tsx`. Expected: clean.
- [ ] **Step 4: Commit:**

```bash
jj commit -m "refactor(sections): repurpose hero (drop LMS mock) + section shapes for AI-First
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 8: Recompose the homepage

**Files:** Modify: `app/[locale]/page.tsx`

- [ ] **Step 1:** Update the section order to the spec §5 arc: CinematicHero → Manifesto(problème) → Atouts(promesse) → TrainerTeaser(preuve) → Offers(formules) + FormulesTable → HowItWorks(cursus) → **TechStack** → **Deliverables** → Faq(objections). Pass the right `copy` slice to each (incl. `m.tech`, `m.deliverables`). Keep the existing locale/marketing data wiring.
- [ ] **Step 2:** `corepack pnpm exec tsc --noEmit`. Expected: clean.
- [ ] **Step 3:** Render check — `corepack pnpm dev`, then:

```bash
curl -s --max-time 8 http://localhost:3000/en | sed 's/<[^>]*>/ /g' | grep -ioE "\b(vous|votre|sans jargon|TPE|PME|visio)\b" | sort -u
```
Expected: no output (no French / old-positioning leftover on EN home).

- [ ] **Step 4:** Visual: screenshot `/fr` and `/en` (light + dark) via the browse tool; confirm the 9 sections render in order. Read the screenshots.
- [ ] **Step 5: Commit:**

```bash
jj commit -m "feat(home): recompose homepage to AI-First narrative (10 sections)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 9: `lib/pages.ts` (about/contact/programme copy) + i18n + metadata/SEO

**Files:**
- Modify: `lib/pages.ts` (FR + EN: `about`, `contact`, `programme`)
- Modify: `content/i18n/fr.json`, `content/i18n/en.json` (nav, footer, UI labels)
- Modify: `app/[locale]/layout.tsx` (metadata default title/description/keywords)

**Content brief:** about = the "pourquoi moi" expanded (SaaS en prod AI-first, orchestration, "j'enseigne ce que je pratique"); contact = B2B/dev-team framing; programme = cursus intro + objectives. metadata → AI-First Engineering (dev teams, AI Act, agents de code).

- [ ] **Step 1:** Rewrite `about`, `contact`, `programme` blocks in `lib/pages.ts` (FR + EN), removing TPE/PME framing. Remove numeric offer prices anywhere they appear (→ "sur devis"/"on request").
- [ ] **Step 2:** Update `content/i18n/{fr,en}.json` nav/footer/UI strings as needed (keep FR/EN parity).
- [ ] **Step 3:** Update `app/[locale]/layout.tsx` `metadata` (title default/template, description, keywords) to AI-First Engineering.
- [ ] **Step 4:** `corepack pnpm exec tsc --noEmit && corepack pnpm exec vitest run lib/pages.test.ts lib/dictionary.test.ts`. Expected: PASS (fix tests if they assert old copy).
- [ ] **Step 5:** Node FR/EN key-parity check for i18n:

```bash
node -e 'const f=require("./content/i18n/fr.json"),e=require("./content/i18n/en.json");const fl=(o,p="",a={})=>{for(const k in o){const v=o[k],x=p?p+"."+k:k;v&&typeof v=="object"&&!Array.isArray(v)?fl(v,x,a):a[x]=1}return a};const F=fl(f),E=fl(e);const miss=Object.keys(F).filter(k=>!(k in E)).concat(Object.keys(E).filter(k=>!(k in F)));console.log(miss.length?"PARITY GAP: "+miss.join(","):"i18n parity OK")'
```
Expected: `i18n parity OK`.

- [ ] **Step 6: Commit:**

```bash
jj commit -m "content(pages,i18n,seo): AI-First copy for about/contact/programme + metadata
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 10: Rebuild `/programme` as the cursus page

**Files:** Modify: `app/[locale]/programme/page.tsx`

- [ ] **Step 1:** Restructure to spec §6.1: hero → objectives ("capable de…") → 3 formules détaillées with the Jour 1 / Jour 2 / Diagnostic / Module Direction breakdown → the reconverted modules as editorial rows (keep the `.rows`/`.lg-row` pattern from the current page) → financing note rewritten to spec §3 (Qualiopi en cours, "prochainement éligible OPCO", no OPCO-as-available). Keep JSON-LD but update names. Pull copy from `lib/pages.ts` `programme` + `lib/marketing.ts` `offers`.
- [ ] **Step 2:** `corepack pnpm exec tsc --noEmit && corepack pnpm exec eslint "app/[locale]/programme/page.tsx"`. Expected: clean.
- [ ] **Step 3:** Render check `/fr/programme` and `/en/programme` (curl-grep for old wording + a screenshot). Expected: no TPE/PME, no numeric price, financing note conforms.
- [ ] **Step 4: Commit:**

```bash
jj commit -m "feat(programme): cursus page (objectives, 3 formules, modules, honest financing)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 11: LMS reconversion — rename modules + `_module.json` + lesson frontmatter (FR)

**Files:**
- Rename: `content/fr/programme/m1-fondamentaux` → `m1-posture-ai-first` (and the other 5 per spec §6.2)
- Modify: each renamed module's `_module.json` (slug/title/summary/order) + each lesson's frontmatter (`title`, `slug`, `module`, `objectives`, `prerequisites`, `level`, `durationMin`, `quiz` prompts)

- [ ] **Step 1:** For each of the 6 FR modules, `git mv`/`jj`-aware rename the folder to the new slug (spec §6.2 table), update `_module.json` (`slug`, `title`, `summary`, `order` 1-6; remove `formateurOnly` on the ex-MF module), and update each lesson file's frontmatter to the new AI-First lesson (title/slug/module/objectives/quiz) per the spec §6.2 lesson outlines. Keep `durationMin`; set `level` appropriately (more intermédiaire/avancé).
- [ ] **Step 2:** Verify the loader resolves new slugs:

```bash
corepack pnpm dev >/tmp/d.log 2>&1 &
sleep 6
for m in m1-posture-ai-first m2-context-engineering m3-livrer-ai-first m4-garde-fous-qualite m5-integration-pipeline m6-gouvernance-ai-act; do
  printf "%s -> %s\n" "$m" "$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 http://localhost:3000/fr/programme/$m)"
done
```
Expected: all `200`.

- [ ] **Step 3: Commit:**

```bash
jj commit -m "content(lms): rename + reframe 6 FR modules to AI-First (frontmatter, no train-the-trainer)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 12: LMS lesson bodies — FR (the ~24 MDX bodies)

**Files:** Modify: every `content/fr/programme/*/*.mdx` body (the prose under the frontmatter)

**Content brief:** Write each lesson body to its module/lesson topic (spec §6.2), using the existing MDX callouts (`Idee`, `Exemple`, `Exercice`, `Attention`) and a `Quiz` (frontmatter-driven). Technical, practitioner voice (orchestration, context engineering, guardrails). No invented tool claims beyond the dossier §7 stack.

- [ ] **Step 1:** Rewrite each FR lesson body to its topic, keeping at least one `Idee` and one `Exercice` per lesson, and a 2-3 question quiz in frontmatter. Iterate module by module (commit per module to keep changes reviewable).
- [ ] **Step 2:** After each module, render one lesson and screenshot (FR). Confirm callouts + quiz render.
- [ ] **Step 3: Commit per module:**

```bash
jj commit -m "content(lms): FR lesson bodies — <module name>
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 13: LMS — EN mirror (`_module.json` + frontmatter + bodies)

**Files:** Modify/rename: `content/en/programme/**` to mirror FR (folders, `_module.json`, frontmatter, MDX bodies)

- [ ] **Step 1:** Rename the 6 EN module folders to the new slugs; mirror `_module.json` and every lesson's frontmatter + body in English (faithful to the FR topic).
- [ ] **Step 2:** EN render + French-leftover check:

```bash
curl -s --max-time 8 "http://localhost:3000/en/programme/m1-posture-ai-first/$(ls content/en/programme/m1-posture-ai-first | grep mdx | head -1 | sed 's/^[0-9]*-//;s/.mdx//')" \
 | sed 's/<[^>]*>/ /g' | grep -ioE "\b(vous|votre|leçon|découverte)\b" | sort -u
```
Expected: no output.

- [ ] **Step 3: Commit (per module or grouped):**

```bash
jj commit -m "content(lms): EN mirror of AI-First modules + lessons
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 14: Remove train-the-trainer surface

**Files:** Modify: `app/[locale]/programme/[module]/[lecon]/page.tsx` (hide `RoleToggle`), and any `FormateurGate` usage in `programme/page.tsx` / `app/[locale]/layout.tsx`

- [ ] **Step 1:** Hide the `RoleToggle` ("mode formateur") in the lesson subbar (remove its render; keep the component file dormant). Ensure no module is `formateurOnly` (already handled in Task 11). Leave `FormateurGate`/`Formateur`/`RoleContext` files in place but unused.
- [ ] **Step 2:** Grep to confirm no live `formateurOnly` / visible toggle:

```bash
grep -rn "formateurOnly" content/ | grep -v node_modules || echo "no formateurOnly ✓"
```
Expected: `no formateurOnly ✓`.

- [ ] **Step 3:** `corepack pnpm exec tsc --noEmit && corepack pnpm exec eslint "app/[locale]/programme/[module]/[lecon]/page.tsx"`. Expected: clean.
- [ ] **Step 4: Commit:**

```bash
jj commit -m "refactor(lms): hide train-the-trainer (no formateurOnly, toggle hidden)
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
jj bookmark set main -r @-
```

---

### Task 15: Full verification + acceptance

**Files:** none (verification only)

- [ ] **Step 1: Build gate:** `corepack pnpm build`. Expected: success, all routes generated, TypeScript passes.
- [ ] **Step 2: Lint + tests:** `corepack pnpm exec eslint . ; corepack pnpm exec vitest run`. Expected: 0 errors / tests pass.
- [ ] **Step 3: Orphan-token check** (DESIGN.md compliance) — reuse the script from the design session (used-but-undefined CSS vars, fonts excepted). Expected: `NONE`.
- [ ] **Step 4: French-on-EN sweep** across all public EN routes (home, programme, a-propos, contact, the 6 modules, one lesson): curl + `sed` strip + grep for `\b(vous|votre|sans jargon|TPE|PME)\b`. Expected: clean on all.
- [ ] **Step 5: Visual acceptance:** screenshot home + programme + one lesson in FR & EN, light & dark. Read them. Confirm spec §11 acceptance criteria 1-7.
- [ ] **Step 6:** Report status (DONE / DONE_WITH_CONCERNS). Deployment is a separate step on explicit user request (`jj git push --bookmark main` → Vercel prod).

---

## Self-Review

- **Spec coverage:** §1 strat (Tasks 1-15 honor locked decisions) · §3 guardrails (T2/T3/T6/T10 "sur devis", T10 financing) · §5 home (T2-T8) · §6 programme+LMS (T10-T14) · §7 components (T4-T7) · §8 content files (T2/T3/T9/T11-T13) · §9 SEO (T9) · §11 acceptance (T15). No uncovered requirement.
- **Placeholder scan:** content tasks carry concrete briefs sourced from the dossier + exact files/verification, not vague "add copy". Structural tasks carry exact code/commands. (For a content pivot, final prose is produced at execution against the dossier — that is the implementation act, not a plan placeholder.)
- **Type consistency:** `Marketing.tech`/`deliverables` defined in T1, consumed in T4/T5/T8; `Offer.priceNote` defined T1, used T6/T2/T3. Module slugs from spec §6.2 used consistently in T10-T14.
