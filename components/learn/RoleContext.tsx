"use client";

import { createContext, useContext, type ReactNode } from "react";

type Role = { formateur: boolean };

// Par défaut « apprenant » : si aucun provider n'enveloppe l'arbre, les zones
// réservées <Formateur> restent masquées (comportement sûr).
const RoleContext = createContext<Role>({ formateur: false });

export function RoleProvider({
  formateur,
  children,
}: {
  formateur: boolean;
  children: ReactNode;
}) {
  return (
    <RoleContext.Provider value={{ formateur }}>{children}</RoleContext.Provider>
  );
}

export function useRole(): Role {
  return useContext(RoleContext);
}
