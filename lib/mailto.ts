/**
 * Construit un lien `mailto:` pré-rempli depuis un formulaire.
 * Solution honnête sans backend : un clic atteint réellement Guillaume.
 * À remplacer par un Server Action / Cal.com quand ils seront en place.
 */
export const CONTACT_EMAIL = "contact@largo-ia.fr";

export function buildContactMailto(
  fd: FormData,
  kind: "booking" | "contact",
): string {
  const get = (k: string) => (fd.get(k)?.toString() ?? "").trim();
  const nom = get("nom");
  const entreprise = get("entreprise");
  const taille = get("taille");
  const email = get("email");
  const besoin = get("besoin");

  const subject =
    kind === "booking"
      ? `Appel découverte — ${nom || "Largo IA"}`
      : `Demande de contact — ${nom || "Largo IA"}`;

  const body = [
    nom && `Nom : ${nom}`,
    entreprise && `Entreprise : ${entreprise}`,
    taille && `Taille d'équipe : ${taille}`,
    email && `Email : ${email}`,
    besoin && `\nBesoin :\n${besoin}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
