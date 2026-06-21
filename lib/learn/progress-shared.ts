export type LessonProgress = {
  moduleSlug: string; lessonSlug: string;
  completedAt: string | null; quizScore: number | null; quizTotal: number | null;
};

export function moduleCompletion(entries: LessonProgress[], moduleSlug: string, lessonSlugs: string[]) {
  const doneSet = new Set(
    entries.filter((e) => e.completedAt && e.moduleSlug === moduleSlug).map((e) => e.lessonSlug)
  );
  return { done: lessonSlugs.filter((s) => doneSet.has(s)).length, total: lessonSlugs.length };
}

export function nextUnfinished(
  entries: LessonProgress[],
  ordered: { moduleSlug: string; lessonSlug: string }[],
) {
  const done = new Set(entries.filter((e) => e.completedAt).map((e) => `${e.moduleSlug}:${e.lessonSlug}`));
  return ordered.find((o) => !done.has(`${o.moduleSlug}:${o.lessonSlug}`)) ?? null;
}

export function mergeProgress(local: LessonProgress[], server: LessonProgress[]): LessonProgress[] {
  const byKey = new Map<string, LessonProgress>();
  for (const e of [...server, ...local]) {
    const key = `${e.moduleSlug}:${e.lessonSlug}`;
    const prev = byKey.get(key);
    if (!prev) { byKey.set(key, e); continue; }
    byKey.set(key, {
      ...prev,
      completedAt: prev.completedAt ?? e.completedAt,
      quizScore: Math.max(prev.quizScore ?? -1, e.quizScore ?? -1) === -1 ? null : Math.max(prev.quizScore ?? -1, e.quizScore ?? -1),
      quizTotal: prev.quizTotal ?? e.quizTotal,
    });
  }
  return [...byKey.values()];
}
