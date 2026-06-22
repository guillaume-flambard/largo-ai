import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mergeProgress } from "./progress-shared";
import type { LessonProgress as SharedLessonProgress } from "./progress-shared";

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

/** Convert local store map to SharedLessonProgress array for merge. */
function toSharedArray(progress: Record<string, LessonProgress>): SharedLessonProgress[] {
  return Object.entries(progress).map(([key, v]) => {
    const [moduleSlug, lessonSlug] = key.split(":");
    return {
      moduleSlug: moduleSlug ?? key,
      lessonSlug: lessonSlug ?? "",
      completedAt: v.validated ? new Date().toISOString() : null,
      // bestScore is a percentage (0-100), not a raw count; raw quizTotal is
      // not recoverable, so do not fabricate counts. completedAt carries the
      // completion state needed for sync; server entries keep their real counts.
      quizScore: null,
      quizTotal: null,
    };
  });
}

/** Convert merged SharedLessonProgress array back to local store map. */
function fromSharedArray(entries: SharedLessonProgress[]): Record<string, LessonProgress> {
  const result: Record<string, LessonProgress> = {};
  for (const e of entries) {
    const key = `${e.moduleSlug}:${e.lessonSlug}`;
    // quizScore from DB is raw score; quizTotal is total questions. We store percent.
    const percent =
      e.quizScore !== null && e.quizTotal !== null && e.quizTotal > 0
        ? Math.round((e.quizScore / e.quizTotal) * 100)
        : e.completedAt
          ? PASS_THRESHOLD
          : 0;
    const bestScore = Math.max(result[key]?.bestScore ?? 0, percent);
    result[key] = { bestScore, validated: !!e.completedAt || bestScore >= PASS_THRESHOLD };
  }
  return result;
}

export type MarkLessonParams = {
  moduleSlug: string;
  lessonSlug: string;
  completed?: boolean;
  quizScore?: number;
  quizTotal?: number;
};

type ProgressStore = {
  progress: Record<string, LessonProgress>;
  isAuthed: boolean;
  record: (key: string, percent: number) => void;
  setAuthed: (v: boolean) => void;
  hydrateFromServer: (entries: SharedLessonProgress[]) => void;
  markLesson: (params: MarkLessonParams) => Promise<void>;
};

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      isAuthed: false,

      record: (key, percent) =>
        set((s) => ({ progress: applyRecord(s.progress, key, percent) })),

      setAuthed: (v: boolean) => set({ isAuthed: v }),

      hydrateFromServer: (entries: SharedLessonProgress[]) =>
        set((s) => {
          const localArray = toSharedArray(s.progress);
          const merged = mergeProgress(localArray, entries);
          return { progress: fromSharedArray(merged) };
        }),

      markLesson: async (params: MarkLessonParams) => {
        const { moduleSlug, lessonSlug, completed, quizScore, quizTotal } = params;
        const key = `${moduleSlug}:${lessonSlug}`;

        // (a) Update local state and persist via zustand/persist
        const percent =
          quizScore !== undefined && quizTotal !== undefined && quizTotal > 0
            ? Math.round((quizScore / quizTotal) * 100)
            : completed
              ? PASS_THRESHOLD
              : 0;

        set((s) => ({ progress: applyRecord(s.progress, key, percent) }));

        // (b) Write-through to server if authenticated
        if (get().isAuthed) {
          // Dynamic import — MUST NOT be static (progress-server is "use server")
          const { saveLessonProgress } = await import("@/lib/learn/progress-server");
          await saveLessonProgress({ moduleSlug, lessonSlug, completed, quizScore, quizTotal });
        }
      },
    }),
    {
      name: "largo-progress",
      // localStorage aujourd'hui ; remplacer ce `storage` par un adaptateur DB
      // le jour où des comptes existent — le reste du code ne bouge pas.
      // Fallback no-op côté serveur (SSG/SSR) où `window` n'existe pas.
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage,
      ),
      // Only persist progress data — transient fields like isAuthed must not
      // be written to localStorage or they will be incorrectly rehydrated.
      partialize: (s) => ({ progress: s.progress }),
    },
  ),
);
