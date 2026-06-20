"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Role = { formateur: boolean; toggle: () => void };

// Par défaut « apprenant ». L'état est lu côté client (cookie) au montage, ce qui
// laisse les pages statiques — au prix d'un léger révèle post-hydratation des
// zones <Formateur> si le cookie est posé (acceptable pour une option opt-in).
const RoleContext = createContext<Role>({ formateur: false, toggle: () => {} });
const COOKIE = "largo_role";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [formateur, setFormateur] = useState(false);

  useEffect(() => {
    const has = document.cookie
      .split("; ")
      .some((c) => c === `${COOKIE}=formateur`);
    if (has) setFormateur(true);
  }, []);

  function toggle() {
    setFormateur((prev) => {
      const next = !prev;
      document.cookie = `${COOKIE}=${
        next ? "formateur" : "apprenant"
      }; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      return next;
    });
  }

  return (
    <RoleContext.Provider value={{ formateur, toggle }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): Role {
  return useContext(RoleContext);
}
