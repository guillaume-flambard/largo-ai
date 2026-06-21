/** URL canonique du site, centralisée. Sert au metadataBase, au sitemap et au
 *  robots. Par défaut le domaine de marque (`largo-ia.fr`) ; surchargeable via
 *  `NEXT_PUBLIC_SITE_URL` (ex. l'URL Vercel tant que le domaine n'est pas branché,
 *  ou le domaine final). Toujours sans slash final. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://largo-ia.fr"
).replace(/\/+$/, "");
