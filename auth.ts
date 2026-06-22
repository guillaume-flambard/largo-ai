import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

/** Fournisseurs activés uniquement si leurs variables d'env sont présentes.
 *  Évite d'enregistrer un provider à moitié configuré (bouton qui échoue) :
 *  cf. `lib/auth/providers.ts` qui expose la même logique à la page /connexion. */
const providers = [
  process.env.AUTH_GOOGLE_ID ? Google : null,
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID
    ? MicrosoftEntraID({
        clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
        issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      })
    : null,
].filter((p) => p !== null);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "database" },
  providers,
  callbacks: {
    // Stratégie database : `user` est présent → exposer l'id dans la session.
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: { signIn: "/fr/connexion" },
});
