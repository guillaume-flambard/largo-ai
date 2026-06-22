"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";

/** Connexion de DÉVELOPPEMENT uniquement. Crée (ou retrouve) un utilisateur de
 *  test et une vraie session en base, puis pose le cookie de session que lit
 *  Auth.js — exactement le chemin « database session » qu'emprunte un vrai login
 *  OAuth. Permet de tester/développer les fonctionnalités connectées sans apps
 *  OAuth. STRICTEMENT désactivé en production (double garde : NODE_ENV ici +
 *  rendu conditionnel du bouton). */

const DEV_EMAIL = "dev@largo-ia.fr";
// Nom du cookie de session Auth.js v5 en dev (http, non sécurisé).
const SESSION_COOKIE = "authjs.session-token";

export async function devSignIn(locale: string) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("La connexion dev est désactivée en production.");
  }

  // 1. Utilisateur de test (idempotent).
  let user = (await db.select().from(users).where(eq(users.email, DEV_EMAIL)))[0];
  if (!user) {
    user = (
      await db.insert(users).values({ email: DEV_EMAIL, name: "Dev User" }).returning()
    )[0];
  }

  // 2. Vraie session en base (stratégie database).
  const sessionToken = `${crypto.randomUUID()}${crypto.randomUUID()}`;
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ sessionToken, userId: user.id, expires });

  // 3. Cookie de session lu par Auth.js.
  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
    secure: false,
  });

  redirect(`/${locale}/mon-espace`);
}
