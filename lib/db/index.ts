import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// `neon()` exige une chaîne au format valide à la construction, mais ne se
// connecte qu'à la PREMIÈRE requête. Sans fallback, un build où `DATABASE_URL`
// est absent (preview Vercel sans secret) échoue : `neon(undefined)` jette dès
// la collecte des pages, et le DrizzleAdapter ne peut pas introspecter le client.
// On fournit donc une URL inerte quand la vraie n'est pas définie : le build
// passe, l'introspection fonctionne, et seules les requêtes réelles à l'exécution
// exigent un vrai `DATABASE_URL`.
const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgresql://build:build@localhost:5432/build";

export const db = drizzle(neon(DATABASE_URL), { schema });
