"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/learn/progress";
import type { LessonProgress } from "@/lib/learn/progress-shared";

export function ProgressSync({
  authed,
  serverEntries,
}: {
  authed: boolean;
  serverEntries: LessonProgress[];
}) {
  const setAuthed = useProgress((s) => s.setAuthed);
  const hydrateFromServer = useProgress((s) => s.hydrateFromServer);

  useEffect(() => {
    setAuthed(authed);
    if (authed) hydrateFromServer(serverEntries);
  }, [authed, serverEntries, setAuthed, hydrateFromServer]);

  return null;
}
