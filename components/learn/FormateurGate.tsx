"use client";

import type { ReactNode } from "react";
import { useRole } from "./RoleContext";

/** Enveloppe transparente qui ne rend ses enfants qu'en « mode formateur ».
 *  Sert à révéler le module MF (et tout contenu réservé à la couche formateur)
 *  sans casser la génération statique : le contenu reste dans le HTML, masqué
 *  hors mode formateur — même modèle opt-in que <Formateur>. */
export function FormateurGate({ children }: { children: ReactNode }) {
  const { formateur } = useRole();
  if (!formateur) return null;
  return <>{children}</>;
}
