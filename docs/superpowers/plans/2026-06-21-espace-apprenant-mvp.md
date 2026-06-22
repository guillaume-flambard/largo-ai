# Espace apprenant (LMS MVP) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un espace apprenant authentifié (Google/Microsoft) où chaque utilisateur connecté retrouve le curriculum M1→M5 comme « son programme » avec sa progression et ses scores de quiz sauvegardés sur son compte.

**Architecture:** Auth.js v5 (OAuth Google + Microsoft Entra ID) avec sessions en base, adapter Drizzle sur Neon Postgres. Le contenu reste en fichiers MDX, public. La base ne stocke que les utilisateurs/sessions (Auth.js) et une table `progress`. Protection des pages par vérification de session côté serveur (DAL) + redirection — PAS par middleware, car `proxy.ts` (Next 16) occupe déjà l'unique créneau et gère la locale.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript strict, `next-auth@beta` (v5), `@auth/drizzle-adapter`, `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`, Neon Postgres, `zod`, `vitest`.

## Global Constraints

- **Next.js 16** : APIs modifiées vs versions antérieures. Lire `node_modules/next/dist/docs/01-app/02-guides/authentication.md` et `.../01-getting-started/16-proxy.md` avant de coder. `params`/`cookies()`/`headers()` sont **async**.
- **Le middleware s'appelle `proxy.ts`** (un seul, déjà présent, gère la redirection locale `/`→`/fr`). NE PAS ajouter d'autre middleware ; NE PAS utiliser `export { auth as proxy }`. La protection se fait en server component.
- **pnpm** : pour ajouter une dépendance, utiliser **`corepack pnpm add <x>`** (le `pnpm` du PATH est en v10, store incompatible). `pnpm build` / `pnpm vitest` marchent normalement.
- **i18n** : toute chaîne visible passe par la copie bilingue (`lib/pages.ts` / dictionnaire) — FR + EN. Slugs de leçon **identiques entre locales**.
- **Design system maison** : classes sémantiques (`.card`, `.container`, `.section`, `.kicker`) + styles inline `var(--token)`. Pas de Tailwind utilitaire.
- **Clés de progression indépendantes de la locale** : `module_slug` + `lesson_slug` (mêmes valeurs FR/EN), comme l'actuel `module:lesson`.
- **Secrets** : jamais committés. `.env.local` (dev, gitignoré) + variables Vercel (prod).

---

## File Structure

- `lib/db/index.ts` — client Neon + Drizzle (`db`). *Créé T1.*
- `lib/db/schema.ts` — schéma Drizzle : tables Auth.js + `progress`. *Créé T1.*
- `drizzle.config.ts` — config drizzle-kit (migrations). *Créé T1.*
- `auth.ts` (racine) — config NextAuth v5 (adapter, providers, session, callbacks). *Créé T2.*
- `app/api/auth/[...nextauth]/route.ts` — handlers GET/POST. *Créé T2.*
- `proxy.ts` — vérifier/ajuster le matcher pour exclure `/api/*`. *Modifié T2.*
- `lib/auth/session.ts` — helper DAL `getSessionUser()` (cache la lecture session). *Créé T3.*
- `app/[locale]/connexion/page.tsx` — page de connexion (boutons OAuth). *Créé T3.*
- `components/SiteHeader.tsx` — état connecté/déconnecté. *Modifié T3.*
- `app/[locale]/layout.tsx` — lit la session, la passe au header. *Modifié T3.*
- `lib/pages.ts` — chaînes i18n `auth` (FR/EN). *Modifié T3.*
- `lib/learn/progress-shared.ts` — types + helpers purs (clé, complétion, prochaine leçon, merge). *Créé T4.*
- `lib/learn/progress-server.ts` — server actions DB (`"use server"`). *Créé T4.*
- `app/[locale]/mon-espace/page.tsx` — dashboard (gated). *Créé T5.*
- `lib/learn/progress.ts` — store zustand → couche de sync. *Modifié T6.*
- `components/learn/LessonStatus.tsx`, `components/learn/quiz/Quiz.tsx` — écrivent vers le compte si connecté. *Modifiés T6.*
- `app/[locale]/confidentialite/page.tsx` — mention RGPD (emails). *Modifié T7.*

---

## Task 1: Fondation base de données (Neon + Drizzle + schéma + migration)

**Files:**
- Create: `lib/db/schema.ts`, `lib/db/index.ts`, `drizzle.config.ts`
- Modify: `package.json` (deps + script), `.gitignore` (drizzle), `.env.local` (DATABASE_URL)
- Test: `lib/db/schema.test.ts`

**Interfaces:**
- Produces: `db` (Drizzle client) ; tables `users`, `accounts`, `sessions`, `verificationTokens`, `progress` ; types `Progress`, `NewProgress`.

- [ ] **Step 1 : Provisionner la base Neon.** Via le MCP Neon (`create_project` ou `create_branch` sur un projet existant), créer une base pour Largo et récupérer la **connection string** (pooled). La poser dans `.env.local` :

```bash
# .env.local
DATABASE_URL="postgresql://<user>:<pwd>@<host>/<db>?sslmode=require"
```

- [ ] **Step 2 : Installer les dépendances.**

Run :
```bash
corepack pnpm add drizzle-orm @neondatabase/serverless
corepack pnpm add -D drizzle-kit
```
Expected : ajout dans `package.json`, pas d'erreur de store.

- [ ] **Step 3 : Écrire le client DB** `lib/db/index.ts` :

```ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

- [ ] **Step 4 : Écrire le schéma** `lib/db/schema.ts` — tables Auth.js (schéma officiel `@auth/drizzle-adapter` pour Postgres) + `progress` :

```ts
import {
  pgTable, text, timestamp, primaryKey, integer, uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (a) => [primaryKey({ columns: [a.provider, a.providerAccountId] })]);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (v) => [primaryKey({ columns: [v.identifier, v.token] })]);

export const progress = pgTable("progress", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  moduleSlug: text("moduleSlug").notNull(),
  lessonSlug: text("lessonSlug").notNull(),
  completedAt: timestamp("completedAt", { mode: "date" }),
  quizScore: integer("quizScore"),
  quizTotal: integer("quizTotal"),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(() => new Date()),
}, (p) => [uniqueIndex("progress_user_lesson").on(p.userId, p.moduleSlug, p.lessonSlug)]);

export type Progress = typeof progress.$inferSelect;
export type NewProgress = typeof progress.$inferInsert;
```

> ⚠️ Vérifier que les colonnes correspondent à la version installée de `@auth/drizzle-adapter` (le schéma officiel peut varier d'une version à l'autre — la page `getting-started/adapters/drizzle` est la référence). Ajuster si l'adapter exige `authenticators`.

- [ ] **Step 5 : Config drizzle-kit** `drizzle.config.ts` :

```ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
```

Ajouter à `package.json` scripts : `"db:push": "drizzle-kit push"`. Ajouter `/drizzle` au `.gitignore` si on ne committe pas les migrations générées (sinon les garder).

- [ ] **Step 6 : Pousser le schéma vers Neon.**

Run : `corepack pnpm exec drizzle-kit push` (charge `.env.local` ; sinon préfixer `DATABASE_URL=...`).
Expected : tables `user`, `account`, `session`, `verificationToken`, `progress` créées (le confirmer via le MCP Neon `get_database_tables` ou `run_sql "\\dt"`).

- [ ] **Step 7 : Test de schéma** `lib/db/schema.test.ts` (vérifie que les tables/colonnes attendues sont définies, sans toucher au réseau) :

```ts
import { describe, it, expect } from "vitest";
import { progress, users } from "./schema";
import { getTableColumns } from "drizzle-orm";

describe("db schema", () => {
  it("progress a la clé métier attendue", () => {
    const cols = Object.keys(getTableColumns(progress));
    expect(cols).toEqual(expect.arrayContaining(["userId", "moduleSlug", "lessonSlug", "completedAt", "quizScore", "quizTotal"]));
  });
  it("users expose email", () => {
    expect(Object.keys(getTableColumns(users))).toContain("email");
  });
});
```

- [ ] **Step 8 : Lancer le test.** Run : `corepack pnpm vitest run lib/db/schema.test.ts` → PASS.

- [ ] **Step 9 : Commit.**
```bash
git add lib/db drizzle.config.ts package.json pnpm-lock.yaml .gitignore
git commit -m "feat(db): base Neon + schéma Drizzle (auth tables + progress)"
```

---

## Task 2: Auth.js v5 — config, providers OAuth, route handler (de-risque Next 16)

**Files:**
- Create: `auth.ts`, `app/api/auth/[...nextauth]/route.ts`
- Modify: `proxy.ts` (matcher), `.env.local`, `package.json`
- Test: smoke manuel (login Google) + vérif ligne `session` en base

**Interfaces:**
- Consumes: `db` (T1).
- Produces: `auth()` (server, retourne `Session | null` avec `session.user.id`), `signIn`, `signOut`, `handlers`.

- [ ] **Step 1 : Lire le guide.** Lire `node_modules/next/dist/docs/01-app/02-guides/authentication.md` (sections « Auth Libraries », « Proxy ») et `.../16-proxy.md` (matcher). Confirmer qu'aucun second middleware n'est requis.

- [ ] **Step 2 : Installer.**
```bash
corepack pnpm add next-auth@beta @auth/drizzle-adapter
```

- [ ] **Step 3 : Générer le secret.** Run : `corepack pnpm exec auth secret` (écrit `AUTH_SECRET` dans `.env.local`) — ou `openssl rand -base64 33` et coller `AUTH_SECRET=...`.

- [ ] **Step 4 : Renseigner les identifiants OAuth dans `.env.local`** (créés par l'utilisateur, cf. § Configuration). Pour la 1ʳᵉ vérif, Google suffit :
```bash
AUTH_GOOGLE_ID="...apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="..."
# Microsoft (ajout ensuite) :
AUTH_MICROSOFT_ENTRA_ID_ID="..."
AUTH_MICROSOFT_ENTRA_ID_SECRET="..."
AUTH_MICROSOFT_ENTRA_ID_ISSUER="https://login.microsoftonline.com/<tenant>/v2.0"
```
URL de redirection à déclarer côté Google : `http://localhost:3000/api/auth/callback/google` (+ `https://largo-ai.vercel.app/api/auth/callback/google` pour la prod).

- [ ] **Step 5 : Écrire `auth.ts`** (racine) :

```ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "database" },
  providers: [
    Google,
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
  ],
  callbacks: {
    // Stratégie database : `user` est présent → exposer l'id dans la session.
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: { signIn: "/fr/connexion" },
});
```

> Note : avec providers Google/Microsoft sans `clientId` explicite, Auth.js lit `AUTH_GOOGLE_ID/SECRET` par convention. Le `pages.signIn` pointe la page custom (T3) ; la locale par défaut suffit pour la redirection d'erreur.

- [ ] **Step 6 : Route handler** `app/api/auth/[...nextauth]/route.ts` :

```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

- [ ] **Step 7 : Exclure `/api/*` du proxy locale.** Ouvrir `proxy.ts`, vérifier le `config.matcher`. Il DOIT ignorer `/api`, `/_next`, fichiers statiques. Forme attendue :

```ts
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|brand|icon.svg|opengraph-image|.*\\.).*)"],
};
```
Adapter à l'existant sans casser la redirection `/`→`/fr`.

- [ ] **Step 8 : Type augment** `types/next-auth.d.ts` (pour `session.user.id`) :

```ts
import type { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
```

- [ ] **Step 9 : Build de vérif (compat Next 16).**

Run : `corepack pnpm build`
Expected : compile sans erreur. **Si échec lié à next-auth × Next 16**, c'est le point de bascule : consigner l'erreur, et envisager le repli (cf. spec — Neon Auth/Clerk) avant de continuer.

- [ ] **Step 10 : Smoke test login.** `pnpm dev`, ouvrir `http://localhost:3000/api/auth/signin`, se connecter avec Google. Vérifier (MCP Neon `run_sql`) qu'une ligne existe dans `user` et `session`.

- [ ] **Step 11 : Commit.**
```bash
git add auth.ts app/api/auth types/next-auth.d.ts proxy.ts package.json pnpm-lock.yaml
git commit -m "feat(auth): Auth.js v5 (Google+Microsoft) + adapter Drizzle/Neon, sessions DB"
```

---

## Task 3: Page de connexion + état d'auth dans le header

**Files:**
- Create: `lib/auth/session.ts`, `app/[locale]/connexion/page.tsx`
- Modify: `components/SiteHeader.tsx`, `app/[locale]/layout.tsx`, `lib/pages.ts`
- Test: build + vérif navigateur (header bascule, login redirige)

**Interfaces:**
- Consumes: `auth`, `signIn`, `signOut` (T2), `getPageCopy` (existant).
- Produces: `getSessionUser()` → `{ id, name, email, image } | null` ; copie i18n `auth`.

- [ ] **Step 1 : Helper DAL** `lib/auth/session.ts` :

```ts
import { cache } from "react";
import { auth } from "@/auth";

export const getSessionUser = cache(async () => {
  const session = await auth();
  return session?.user ?? null;
});
```

- [ ] **Step 2 : Ajouter la copie i18n** `auth` dans `lib/pages.ts` (type `PageCopy` + `fr` + `en`) :

```ts
// dans PageCopy :
auth: {
  signIn: string; mySpace: string; signOut: string;
  pageTitle: string; pageSubtitle: string;
  withGoogle: string; withMicrosoft: string;
  // ajoutées en T5 :
  dashboardTitle: string; resume: string; lessonsDone: string; overall: string;
};
```
Valeurs FR : `signIn:"Se connecter"`, `mySpace:"Mon espace"`, `signOut:"Déconnexion"`, `pageTitle:"Connexion à votre espace"`, `pageSubtitle:"Connectez-vous pour suivre votre progression et retrouver votre programme."`, `withGoogle:"Continuer avec Google"`, `withMicrosoft:"Continuer avec Microsoft"`.
EN : `signIn:"Sign in"`, `mySpace:"My space"`, `signOut:"Sign out"`, `pageTitle:"Sign in to your space"`, `pageSubtitle:"Sign in to track your progress and find your programme."`, `withGoogle:"Continue with Google"`, `withMicrosoft:"Continue with Microsoft"`.

- [ ] **Step 3 : Page connexion** `app/[locale]/connexion/page.tsx` :

```tsx
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { signIn } from "@/auth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

export default async function ConnexionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getPageCopy(locale as Locale).auth;

  async function withProvider(provider: "google" | "microsoft-entra-id") {
    "use server";
    await signIn(provider, { redirectTo: `/${locale}/mon-espace` });
  }

  return (
    <>
      <PageHero eyebrow={t.signIn} title={t.pageTitle} subtitle={t.pageSubtitle} />
      <section className="section">
        <div className="container container--narrow" style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
          <form action={withProvider.bind(null, "google")}>
            <button className="card" style={{ width: "100%", padding: "14px 18px", cursor: "pointer", fontWeight: "var(--fw-semibold)" }}>
              {t.withGoogle}
            </button>
          </form>
          <form action={withProvider.bind(null, "microsoft-entra-id")}>
            <button className="card" style={{ width: "100%", padding: "14px 18px", cursor: "pointer", fontWeight: "var(--fw-semibold)" }}>
              {t.withMicrosoft}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4 : Layout passe la session au header.** Dans `app/[locale]/layout.tsx`, importer `getSessionUser` et `getPageCopy`, puis :

```tsx
const user = await getSessionUser();
// ...
<SiteHeader nav={dict.nav} auth={pageCopy.auth} user={user ? { name: user.name, image: user.image } : null} />
```

- [ ] **Step 5 : Header bascule** `components/SiteHeader.tsx` — ajouter props `auth` + `user`, et un bloc compte. Déconnecté → `<LocaleLink href="/connexion">{auth.signIn}</LocaleLink>`. Connecté → lien `<LocaleLink href="/mon-espace">{auth.mySpace}</LocaleLink>` + un form de déconnexion :

```tsx
// import { signOut } from "@/auth";  (SiteHeader doit être server, ou extraire un petit composant SignOutButton server-action)
{user ? (
  <>
    <LocaleLink href="/mon-espace">{auth.mySpace}</LocaleLink>
    <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
      <button type="submit" className="link-underline">{auth.signOut}</button>
    </form>
  </>
) : (
  <LocaleLink href="/connexion">{auth.signIn}</LocaleLink>
)}
```
> Si `SiteHeader` est client, extraire `components/auth/SignOutButton.tsx` (server component avec le form action) et l'y insérer. Suivre le pattern existant du header.

- [ ] **Step 6 : Build + vérif navigateur.** Run : `corepack pnpm build` (PASS). Puis `pnpm dev` : `/fr/connexion` affiche les 2 boutons ; déconnecté le header montre « Se connecter » ; après login, « Mon espace » + « Déconnexion » ; `/en/connexion` est en anglais.

- [ ] **Step 7 : Commit.**
```bash
git add lib/auth app/[locale]/connexion components/SiteHeader.tsx app/[locale]/layout.tsx lib/pages.ts components/auth 2>/dev/null
git commit -m "feat(auth): page de connexion OAuth + état compte dans le header (FR/EN)"
```

---

## Task 4: Progression — helpers purs + server actions DB

**Files:**
- Create: `lib/learn/progress-shared.ts`, `lib/learn/progress-server.ts`
- Test: `lib/learn/progress-shared.test.ts`

**Interfaces:**
- Consumes: `db`, `progress` (T1), `getSessionUser` (T3).
- Produces (shared, purs) :
  - `type LessonProgress = { moduleSlug: string; lessonSlug: string; completedAt: string | null; quizScore: number | null; quizTotal: number | null }`
  - `moduleCompletion(entries: LessonProgress[], lessonSlugs: string[]): { done: number; total: number }`
  - `nextUnfinished(entries, orderedLessons: {moduleSlug:string;lessonSlug:string}[]): {moduleSlug:string;lessonSlug:string} | null`
  - `mergeProgress(local: LessonProgress[], server: LessonProgress[]): LessonProgress[]` (le plus avancé gagne)
- Produces (server) :
  - `getMyProgress(): Promise<LessonProgress[]>`
  - `saveLessonProgress(input: { moduleSlug; lessonSlug; completed?: boolean; quizScore?: number; quizTotal?: number }): Promise<{ ok: boolean }>`
  - `importLocalProgress(entries: LessonProgress[]): Promise<{ imported: number }>`

- [ ] **Step 1 : Test des helpers purs** `lib/learn/progress-shared.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { moduleCompletion, nextUnfinished, mergeProgress } from "./progress-shared";

const done = (m: string, l: string) => ({ moduleSlug: m, lessonSlug: l, completedAt: "2026-01-01T00:00:00Z", quizScore: null, quizTotal: null });

describe("moduleCompletion", () => {
  it("compte les leçons terminées du module", () => {
    const r = moduleCompletion([done("m1", "a"), done("m1", "b")], ["a", "b", "c"]);
    expect(r).toEqual({ done: 2, total: 3 });
  });
});

describe("nextUnfinished", () => {
  it("retourne la première leçon non terminée dans l'ordre", () => {
    const ordered = [{ moduleSlug: "m1", lessonSlug: "a" }, { moduleSlug: "m1", lessonSlug: "b" }];
    expect(nextUnfinished([done("m1", "a")], ordered)).toEqual({ moduleSlug: "m1", lessonSlug: "b" });
  });
  it("null si tout est terminé", () => {
    const ordered = [{ moduleSlug: "m1", lessonSlug: "a" }];
    expect(nextUnfinished([done("m1", "a")], ordered)).toBeNull();
  });
});

describe("mergeProgress", () => {
  it("garde l'entrée terminée face à une non terminée", () => {
    const local = [done("m1", "a")];
    const server = [{ moduleSlug: "m1", lessonSlug: "a", completedAt: null, quizScore: null, quizTotal: null }];
    expect(mergeProgress(local, server)[0].completedAt).toBeTruthy();
  });
});
```

- [ ] **Step 2 : Lancer → FAIL.** Run : `corepack pnpm vitest run lib/learn/progress-shared.test.ts` → échec (module introuvable).

- [ ] **Step 3 : Implémenter les helpers purs** `lib/learn/progress-shared.ts` :

```ts
export type LessonProgress = {
  moduleSlug: string; lessonSlug: string;
  completedAt: string | null; quizScore: number | null; quizTotal: number | null;
};

export function moduleCompletion(entries: LessonProgress[], lessonSlugs: string[]) {
  const doneSet = new Set(entries.filter((e) => e.completedAt).map((e) => e.lessonSlug));
  return { done: lessonSlugs.filter((s) => doneSet.has(s)).length, total: lessonSlugs.length };
}

export function nextUnfinished(
  entries: LessonProgress[],
  ordered: { moduleSlug: string; lessonSlug: string }[],
) {
  const done = new Set(entries.filter((e) => e.completedAt).map((e) => `${e.moduleSlug}:${e.lessonSlug}`));
  return ordered.find((o) => !done.has(`${o.moduleSlug}:${o.lessonSlug}`)) ?? null;
}

export function mergeProgress(local: LessonProgress[], server: LessonProgress[]): LessonProgress[] {
  const byKey = new Map<string, LessonProgress>();
  for (const e of [...server, ...local]) {
    const key = `${e.moduleSlug}:${e.lessonSlug}`;
    const prev = byKey.get(key);
    if (!prev) { byKey.set(key, e); continue; }
    byKey.set(key, {
      ...prev,
      completedAt: prev.completedAt ?? e.completedAt,
      quizScore: Math.max(prev.quizScore ?? -1, e.quizScore ?? -1) === -1 ? null : Math.max(prev.quizScore ?? -1, e.quizScore ?? -1),
      quizTotal: prev.quizTotal ?? e.quizTotal,
    });
  }
  return [...byKey.values()];
}
```

- [ ] **Step 4 : Lancer → PASS.** Run : `corepack pnpm vitest run lib/learn/progress-shared.test.ts` → PASS.

- [ ] **Step 5 : Server actions** `lib/learn/progress-server.ts` :

```ts
"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { getSessionUser } from "@/lib/auth/session";
import type { LessonProgress } from "./progress-shared";

const toShared = (r: typeof progress.$inferSelect): LessonProgress => ({
  moduleSlug: r.moduleSlug, lessonSlug: r.lessonSlug,
  completedAt: r.completedAt ? r.completedAt.toISOString() : null,
  quizScore: r.quizScore, quizTotal: r.quizTotal,
});

export async function getMyProgress(): Promise<LessonProgress[]> {
  const user = await getSessionUser();
  if (!user) return [];
  const rows = await db.select().from(progress).where(eq(progress.userId, user.id));
  return rows.map(toShared);
}

const saveSchema = z.object({
  moduleSlug: z.string().min(1), lessonSlug: z.string().min(1),
  completed: z.boolean().optional(),
  quizScore: z.number().int().optional(), quizTotal: z.number().int().optional(),
});

export async function saveLessonProgress(input: z.infer<typeof saveSchema>) {
  const user = await getSessionUser();
  if (!user) return { ok: false as const };
  const v = saveSchema.parse(input);
  await db.insert(progress).values({
    userId: user.id, moduleSlug: v.moduleSlug, lessonSlug: v.lessonSlug,
    completedAt: v.completed ? new Date() : null,
    quizScore: v.quizScore ?? null, quizTotal: v.quizTotal ?? null,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: [progress.userId, progress.moduleSlug, progress.lessonSlug],
    set: {
      completedAt: v.completed ? new Date() : undefined,
      quizScore: v.quizScore ?? undefined, quizTotal: v.quizTotal ?? undefined,
      updatedAt: new Date(),
    },
  });
  return { ok: true as const };
}

export async function importLocalProgress(entries: LessonProgress[]) {
  const user = await getSessionUser();
  if (!user) return { imported: 0 };
  let imported = 0;
  for (const e of entries) {
    await saveLessonProgress({
      moduleSlug: e.moduleSlug, lessonSlug: e.lessonSlug,
      completed: !!e.completedAt,
      quizScore: e.quizScore ?? undefined, quizTotal: e.quizTotal ?? undefined,
    });
    imported++;
  }
  return { imported };
}
```

- [ ] **Step 6 : Build.** Run : `corepack pnpm build` → PASS (vérifie types Drizzle/onConflict).

- [ ] **Step 7 : Commit.**
```bash
git add lib/learn/progress-shared.ts lib/learn/progress-shared.test.ts lib/learn/progress-server.ts
git commit -m "feat(progress): helpers purs + server actions (get/save/import) sur Neon"
```

---

## Task 5: Dashboard « Mon espace » (gated)

**Files:**
- Create: `app/[locale]/mon-espace/page.tsx`
- Modify: `lib/pages.ts` (chaînes dashboard)
- Test: build + vérif navigateur (redirige si déconnecté, progression si connecté)

**Interfaces:**
- Consumes: `getSessionUser` (T3), `getMyProgress` (T4), `moduleCompletion`/`nextUnfinished` (T4), `listModules`/`getModule` (existant).

- [ ] **Step 1 : Chaînes i18n** dans `lib/pages.ts` `auth` (ajout) : `dashboardTitle` (FR « Mon programme » / EN « My programme »), `resume` (FR « Reprendre » / EN « Resume »), `lessonsDone` (FR « leçons » / EN « lessons »), `overall` (FR « Progression globale » / EN « Overall progress »).

- [ ] **Step 2 : Page dashboard** `app/[locale]/mon-espace/page.tsx` :

```tsx
import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { LocaleLink } from "@/components/LocaleLink";
import { getSessionUser } from "@/lib/auth/session";
import { getMyProgress } from "@/lib/learn/progress-server";
import { moduleCompletion, nextUnfinished } from "@/lib/learn/progress-shared";
import { listModules, getModule } from "@/lib/content/programme";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

export default async function MonEspacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();
  if (!user) redirect(`/${locale}/connexion`);

  const t = getPageCopy(locale as Locale).auth;
  const entries = await getMyProgress();
  const mods = await listModules(locale);
  const full = (await Promise.all(mods.map((m) => getModule(locale, m.slug)))).filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getModule>>>[];

  const ordered = full.flatMap((m) => m.lessons.map((l) => ({ moduleSlug: m.meta.slug, lessonSlug: l.slug })));
  const next = nextUnfinished(entries, ordered);

  return (
    <>
      <PageHero eyebrow={t.mySpace} title={t.dashboardTitle} subtitle={user.name ?? user.email ?? ""} />
      <section className="section">
        <div className="container">
          {next && (
            <LocaleLink href={`/programme/${next.moduleSlug}/${next.lessonSlug}`} className="card" style={{ display: "inline-block", padding: "12px 18px", marginBottom: 28, fontWeight: "var(--fw-semibold)" }}>
              {t.resume} →
            </LocaleLink>
          )}
          <ol className="rows" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {full.filter((m) => !m.meta.formateurOnly).map((m) => {
              const moduleEntries = entries.filter((e) => e.moduleSlug === m.meta.slug);
              const c = moduleCompletion(moduleEntries, m.lessons.map((l) => l.slug));
              return (
                <li key={m.meta.slug} className="row" style={{ alignItems: "center" }}>
                  <LocaleLink href={`/programme/${m.meta.slug}`} style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--ink)" }}>
                    {m.meta.title}
                  </LocaleLink>
                  <span style={{ color: "var(--muted-ink)", fontSize: "var(--fs-sm)" }}>
                    {c.done}/{c.total} {t.lessonsDone}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
```
> Le dashboard liste les modules publics (le module MF reste gaté par le mode formateur ailleurs ; ici on l'exclut via `formateurOnly`).

- [ ] **Step 3 : Build + vérif navigateur.** Run : `corepack pnpm build` (PASS). `pnpm dev` : déconnecté, `/fr/mon-espace` redirige vers `/fr/connexion` ; connecté, affiche les modules avec `0/4` puis se met à jour après progression (T6).

- [ ] **Step 4 : Commit.**
```bash
git add app/[locale]/mon-espace lib/pages.ts
git commit -m "feat(espace): dashboard « Mon espace » gaté avec progression par module"
```

---

## Task 6: Câbler la progression au compte (LessonStatus + Quiz + sync store)

**Files:**
- Modify: `lib/learn/progress.ts` (store), `components/learn/LessonStatus.tsx`, `components/learn/quiz/Quiz.tsx`
- Create: `components/learn/ProgressSync.tsx` (hydrate + propose le rapatriement au login)
- Test: build + vérif navigateur (coche/score persistent après reconnexion)

**Interfaces:**
- Consumes: `saveLessonProgress`, `getMyProgress`, `importLocalProgress` (T4), `mergeProgress` (T4).
- Produces: store enrichi `useProgress` avec `isAuthed`, `hydrateFromServer(entries)`, écriture write-through.

- [ ] **Step 1 : Lire l'état actuel.** Lire `lib/learn/progress.ts` (store zustand + persist), `LessonStatus.tsx`, `quiz/Quiz.tsx` — repérer où la complétion/score sont écrits (clé `module:lesson`, validé ≥ 70 %).

- [ ] **Step 2 : Étendre le store** `lib/learn/progress.ts` : garder `localStorage` comme aujourd'hui (déconnecté), mais ajouter une action `markLesson({moduleSlug, lessonSlug, completed, quizScore, quizTotal})` qui (a) met à jour le state local ET (b) si `isAuthed`, appelle l'action serveur `saveLessonProgress`. Ajouter `hydrateFromServer(entries)` qui fusionne via `mergeProgress`. Le flag `isAuthed` est posé par `ProgressSync`.

```ts
// extrait — adapter à la forme existante du store
markLesson: async (p) => {
  set((s) => applyLocal(s, p));               // état + persist localStorage
  if (get().isAuthed) {
    const { saveLessonProgress } = await import("./progress-server");
    await saveLessonProgress(p);
  }
},
hydrateFromServer: (entries) => set((s) => ({ ...s, ...fromMerged(mergeProgress(toLocalArray(s), entries)) })),
setAuthed: (v: boolean) => set({ isAuthed: v }),
```

- [ ] **Step 3 : Composant de sync** `components/learn/ProgressSync.tsx` (client) — monté dans le layout sous `RoleProvider` : reçoit `authed` + (si authed) la progression serveur en prop depuis un wrapper server ; au montage : `setAuthed(authed)`, `hydrateFromServer(serverEntries)`, et si du local existait, propose (un petit bandeau) « Importer votre progression locale ? » → appelle `importLocalProgress`.

```tsx
"use client";
import { useEffect } from "react";
import { useProgress } from "@/lib/learn/progress";
import type { LessonProgress } from "@/lib/learn/progress-shared";

export function ProgressSync({ authed, serverEntries }: { authed: boolean; serverEntries: LessonProgress[] }) {
  const { setAuthed, hydrateFromServer } = useProgress();
  useEffect(() => {
    setAuthed(authed);
    if (authed) hydrateFromServer(serverEntries);
  }, [authed, serverEntries, setAuthed, hydrateFromServer]);
  return null;
}
```
Wrapper server dans le layout : `const entries = user ? await getMyProgress() : [];` puis `<ProgressSync authed={!!user} serverEntries={entries} />`.

- [ ] **Step 4 : Brancher LessonStatus + Quiz.** Remplacer les écritures directes au store par `markLesson(...)`. `Quiz` : à la validation, `markLesson({moduleSlug, lessonSlug, completed: score/total>=0.7, quizScore: score, quizTotal: total})`. `LessonStatus` lit l'état comme avant (il reflète désormais state local hydraté du serveur).

- [ ] **Step 5 : Build + vérif navigateur (le test qui compte).** Run : `corepack pnpm build` (PASS). `pnpm dev` :
  1. Connecté, valider un quiz → coche au sommaire.
  2. Recharger / autre appareil (autre navigateur connecté au même compte) → la coche/score **persistent** (lecture serveur).
  3. Déconnecté → la progression locale fonctionne toujours (aperçu) ; au login, bandeau d'import proposé.

- [ ] **Step 6 : Commit.**
```bash
git add lib/learn/progress.ts components/learn/LessonStatus.tsx components/learn/quiz/Quiz.tsx components/learn/ProgressSync.tsx app/[locale]/layout.tsx
git commit -m "feat(progress): sync progression compte (write-through + hydratation + import local)"
```

---

## Task 7: RGPD, configuration prod, smoke test prod

**Files:**
- Modify: `app/[locale]/confidentialite/page.tsx`
- Config: variables d'environnement Vercel

**Interfaces:** —

- [ ] **Step 1 : Mention RGPD.** Ajouter dans `confidentialite` une ligne : on collecte email + nom + photo via le fournisseur d'identité (Google/Microsoft) à la seule fin de gérer le compte et la progression ; pas de revente ; suppression sur demande. (FR + EN si la page est bilingue ; sinon FR + ticket pour la trad — cohérent avec l'état des pages légales.)

- [ ] **Step 2 : Variables d'env Vercel (prod).** Via `vercel env add` (CLI authentifié) ou le dashboard : `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID/SECRET`, `AUTH_MICROSOFT_ENTRA_ID_ID/SECRET/ISSUER`. Déclarer l'URL de callback prod côté Google + Microsoft : `https://largo-ai.vercel.app/api/auth/callback/{google,microsoft-entra-id}`.

- [ ] **Step 3 : Déployer + smoke prod.** Merge sur `main` (auto-deploy Vercel). Vérifier en prod : `/fr/connexion` → login Google **et** Microsoft → `/fr/mon-espace` → progression persiste. Vérifier qu'un visiteur anonyme garde l'aperçu public.

- [ ] **Step 4 : Commit (RGPD).**
```bash
git add app/[locale]/confidentialite/page.tsx
git commit -m "docs(legal): mention RGPD du traitement des comptes (auth)"
```

---

## Self-review (couverture spec)

- Auth Google + Microsoft → T2, T3. ✅
- Même curriculum pour tous + dashboard → T5. ✅
- Progression par compte (remplace localStorage) → T4, T6. ✅
- Aperçu public + dashboard gated → gating server-side T5 ; leçons inchangées (publiques). ✅
- Sans toucher le proxy locale (DAL server-side) → T2 step 7, T5. ✅
- `proxy.ts` exclut `/api/auth` → T2 step 7. ✅
- Rapatriement progression locale au 1ᵉʳ login → T6 step 3. ✅
- RGPD (emails) → T7 step 1. ✅
- Config OAuth + env → T2 step 4, T7 step 2. ✅
- Risque Auth.js × Next 16 levé tôt → T2 step 9 (build) + step 10 (smoke). ✅
- Hors-scope (cohortes, admin, attestations) → absents du plan. ✅
