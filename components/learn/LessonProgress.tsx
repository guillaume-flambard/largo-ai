"use client";

import { createContext, useContext, type ReactNode } from "react";

// Clé de progression indépendante de la locale : `${moduleSlug}:${lessonSlug}`.
const LessonKeyContext = createContext<string | null>(null);

export function LessonProvider({
  moduleSlug,
  lessonSlug,
  children,
}: {
  moduleSlug: string;
  lessonSlug: string;
  children: ReactNode;
}) {
  return (
    <LessonKeyContext.Provider value={`${moduleSlug}:${lessonSlug}`}>
      {children}
    </LessonKeyContext.Provider>
  );
}

export function useLessonKey(): string | null {
  return useContext(LessonKeyContext);
}
