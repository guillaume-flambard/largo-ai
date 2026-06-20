import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const PASS_THRESHOLD = 70;

// Storage neutre côté serveur (pas de window) : la persistance ne s'active qu'au
// navigateur, le prerender statique ne casse pas.
const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};
export type LessonProgress = { bestScore: number; validated: boolean };

/** Mise à jour pure : garde le meilleur score, `validated` au seuil. Testable
 *  sans localStorage. */
export function applyRecord(
  state: Record<string, LessonProgress>,
  key: string,
  percent: number,
): Record<string, LessonProgress> {
  const prev = state[key]?.bestScore ?? 0;
  const bestScore = Math.max(prev, percent);
  return { ...state, [key]: { bestScore, validated: bestScore >= PASS_THRESHOLD } };
}

type ProgressStore = {
  progress: Record<string, LessonProgress>;
  record: (key: string, percent: number) => void;
};

export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: {},
      record: (key, percent) =>
        set((s) => ({ progress: applyRecord(s.progress, key, percent) })),
    }),
    {
      name: "largo-progress",
      // localStorage aujourd'hui ; remplacer ce `storage` par un adaptateur DB
      // le jour où des comptes existent — le reste du code ne bouge pas.
      // Fallback no-op côté serveur (SSG/SSR) où `window` n'existe pas.
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage,
      ),
    },
  ),
);
