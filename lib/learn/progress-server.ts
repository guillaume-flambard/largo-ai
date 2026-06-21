"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { getSessionUser } from "@/lib/auth/session";
import type { LessonProgress } from "./progress-shared";

const toShared = (r: typeof progress.$inferSelect): LessonProgress => ({
  moduleSlug: r.moduleSlug, lessonSlug: r.lessonSlug,
  completedAt: r.completedAt ? r.completedAt.toISOString() : null,
  quizScore: r.quizScore, quizTotal: r.quizTotal,
});

export async function getMyProgress(): Promise<LessonProgress[]> {
  const user = await getSessionUser();
  if (!user) return [];
  const rows = await db.select().from(progress).where(eq(progress.userId, user.id));
  return rows.map(toShared);
}

const saveSchema = z.object({
  moduleSlug: z.string().min(1), lessonSlug: z.string().min(1),
  completed: z.boolean().optional(),
  quizScore: z.number().int().optional(), quizTotal: z.number().int().optional(),
});

export async function saveLessonProgress(input: z.infer<typeof saveSchema>) {
  const user = await getSessionUser();
  if (!user) return { ok: false as const };
  const v = saveSchema.parse(input);
  await db.insert(progress).values({
    userId: user.id, moduleSlug: v.moduleSlug, lessonSlug: v.lessonSlug,
    completedAt: v.completed ? new Date() : null,
    quizScore: v.quizScore ?? null, quizTotal: v.quizTotal ?? null,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: [progress.userId, progress.moduleSlug, progress.lessonSlug],
    set: {
      completedAt: v.completed ? new Date() : undefined,
      quizScore: v.quizScore ?? undefined, quizTotal: v.quizTotal ?? undefined,
      updatedAt: new Date(),
    },
  });
  return { ok: true as const };
}

export async function importLocalProgress(entries: LessonProgress[]) {
  const user = await getSessionUser();
  if (!user) return { imported: 0 };
  let imported = 0;
  for (const e of entries) {
    await saveLessonProgress({
      moduleSlug: e.moduleSlug, lessonSlug: e.lessonSlug,
      completed: !!e.completedAt,
      quizScore: e.quizScore ?? undefined, quizTotal: e.quizTotal ?? undefined,
    });
    imported++;
  }
  return { imported };
}
