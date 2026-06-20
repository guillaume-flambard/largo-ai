"use client";

import { useProgress } from "@/lib/learn/progress";

/** Coche affichée sur une leçon validée (lit la progression locale). Rien sinon. */
export function LessonStatus({ lessonKey }: { lessonKey: string }) {
  const validated = useProgress((s) => s.progress[lessonKey]?.validated ?? false);
  if (!validated) return null;
  return (
    <span
      aria-label="Leçon validée"
      title="Leçon validée"
      style={{ color: "var(--sun-ink)", fontWeight: 700 }}
    >
      ✓
    </span>
  );
}
