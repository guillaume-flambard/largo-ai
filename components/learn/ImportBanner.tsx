"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/learn/progress";
import type { LessonProgress } from "@/lib/learn/progress-shared";

type Copy = { importPrompt: string; importCta: string; importDismiss: string };

/** Propose, une fois connecté, de rapatrier la progression faite hors connexion
 *  (présente dans le store local mais pas encore sur le compte). N'apparaît que
 *  s'il y a des leçons validées localement absentes du serveur. */
export function ImportBanner({
  serverEntries,
  copy,
}: {
  serverEntries: LessonProgress[];
  copy: Copy;
}) {
  const router = useRouter();
  const progress = useProgress((s) => s.progress);
  const isAuthed = useProgress((s) => s.isAuthed);
  const [dismissed, setDismissed] = useState(false);
  const [importing, setImporting] = useState(false);

  // Clés déjà terminées côté serveur.
  const serverDone = useMemo(
    () => new Set(serverEntries.filter((e) => e.completedAt).map((e) => `${e.moduleSlug}:${e.lessonSlug}`)),
    [serverEntries],
  );

  // Leçons validées localement, absentes du serveur → importables.
  const importable = useMemo<LessonProgress[]>(
    () =>
      Object.entries(progress)
        .filter(([key, v]) => v.validated && !serverDone.has(key))
        .map(([key]) => {
          const [moduleSlug, lessonSlug] = key.split(":");
          return {
            moduleSlug: moduleSlug ?? key,
            lessonSlug: lessonSlug ?? "",
            completedAt: new Date().toISOString(),
            quizScore: null,
            quizTotal: null,
          };
        })
        .filter((e) => e.moduleSlug && e.lessonSlug),
    [progress, serverDone],
  );

  if (!isAuthed || dismissed || importable.length === 0) return null;

  async function doImport() {
    setImporting(true);
    try {
      const { importLocalProgress } = await import("@/lib/learn/progress-server");
      await importLocalProgress(importable);
      setDismissed(true);
      router.refresh();
    } catch {
      // Échec (réseau / session expirée) : on ne masque pas le bandeau, l'utilisateur
      // peut réessayer ; on réactive juste le bouton.
    } finally {
      setImporting(false);
    }
  }

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px 0" }}>
      <div
        role="status"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          padding: "14px 18px",
          border: "1px solid var(--line-2)",
          borderRadius: "var(--radius-lg)",
          background: "var(--sun-soft)",
        }}
      >
        <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink)", lineHeight: 1.5 }}>
          {copy.importPrompt}
        </span>
        <span style={{ display: "inline-flex", gap: 10, flex: "0 0 auto" }}>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            style={{
              padding: "8px 14px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--line-2)",
              background: "transparent",
              color: "var(--ink)",
              fontSize: "var(--fs-sm)",
              cursor: "pointer",
            }}
          >
            {copy.importDismiss}
          </button>
          <button
            type="button"
            onClick={doImport}
            disabled={importing}
            className="lg-sun-btn"
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--sun-deep)",
              background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
              color: "var(--on-sun)",
              fontSize: "var(--fs-sm)",
              fontWeight: "var(--fw-semibold)",
              boxShadow: "var(--glow-sun)",
              cursor: importing ? "default" : "pointer",
              opacity: importing ? 0.7 : 1,
            }}
          >
            {copy.importCta}
          </button>
        </span>
      </div>
    </div>
  );
}
