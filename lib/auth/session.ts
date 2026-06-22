import { cache } from "react";
import { unstable_rethrow } from "next/navigation";
import { auth } from "@/auth";

/** Utilisateur de la session courante, ou null si déconnecté.
 *
 *  Appelé dans le layout racine → exécuté sur CHAQUE page. On encapsule `auth()`
 *  dans un try/catch : si la config Auth.js échoue (ex. `AUTH_SECRET` absent en
 *  prod, base injoignable), on dégrade proprement en « déconnecté » au lieu de
 *  faire tomber tout le site. L'erreur est loggée (visible dans les logs Vercel)
 *  pour ne pas masquer un vrai problème de configuration. */
export const getSessionUser = cache(async () => {
  try {
    const session = await auth();
    return session?.user ?? null;
  } catch (err) {
    // Ne JAMAIS avaler les erreurs de contrôle de Next (bailout dynamique via
    // headers(), redirect(), notFound()) : on les re-jette pour préserver la
    // détection statique/dynamique des routes.
    unstable_rethrow(err);
    // Vraie erreur (ex. AUTH_SECRET absent, base injoignable) → dégradation
    // propre en « déconnecté » plutôt que de faire tomber tout le site.
    console.error("[auth] getSessionUser a échoué — traité comme déconnecté:", err);
    return null;
  }
});
