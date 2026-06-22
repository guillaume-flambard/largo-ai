/** Fournisseurs OAuth activés = ceux dont les variables d'env sont présentes.
 *  Source unique de vérité pour `auth.ts` (enregistrement des providers) et la
 *  page `/connexion` (affichage des boutons), afin de ne jamais montrer un bouton
 *  qui échouerait au clic. Lu côté serveur uniquement. */
export const googleEnabled = !!process.env.AUTH_GOOGLE_ID;
export const microsoftEnabled = !!process.env.AUTH_MICROSOFT_ENTRA_ID_ID;
