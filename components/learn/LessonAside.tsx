"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { Msi } from "@/components/sections/saas-ui";
import { useProgress } from "@/lib/learn/progress";

type AsideLesson = { slug: string; title: string };

/**
 * Barre latérale de la leçon (refonte SaaS) : liste des leçons du module avec
 * leur état (validée / en cours / à faire) + barre de progression du module.
 * Lit la progression côté client (store zustand) ; masquée < 860px via la
 * règle CSS `[data-lecon-aside]` (cf. globals.css, bloc refonte leçon).
 *
 * `progressLabel` est passé par le serveur (i18n) : ex. « 25 % du module ».
 */
export function LessonAside({
  moduleSlug,
  moduleLabel,
  lessons,
  currentSlug,
  progressSuffix,
}: {
  moduleSlug: string;
  moduleLabel: string;
  lessons: AsideLesson[];
  currentSlug: string;
  /** Texte après le pourcentage, ex. « du module » / « of the module ». */
  progressSuffix: string;
}) {
  const progress = useProgress((s) => s.progress);

  const doneCount = lessons.filter(
    (l) => progress[`${moduleSlug}:${l.slug}`]?.validated,
  ).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <aside
      data-lecon-aside
      style={{
        position: "sticky",
        top: 130,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          font: "500 11px var(--font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          marginBottom: 10,
          paddingLeft: 4,
        }}
      >
        {moduleLabel}
      </div>

      {lessons.map((l) => {
        const isCurrent = l.slug === currentSlug;
        const validated = progress[`${moduleSlug}:${l.slug}`]?.validated ?? false;
        const icon = isCurrent
          ? "play_circle"
          : validated
            ? "check_circle"
            : "radio_button_unchecked";
        const iconColor = isCurrent
          ? "var(--sun-ink)"
          : validated
            ? "var(--ok)"
            : "var(--ink-3)";
        return (
          <LocaleLink
            key={l.slug}
            href={`/programme/${moduleSlug}/${l.slug}`}
            aria-current={isCurrent ? "page" : undefined}
            style={{
              display: "flex",
              gap: 11,
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: 10,
              textDecoration: "none",
              color: isCurrent ? "var(--ink)" : "var(--ink-3)",
              background: isCurrent ? "var(--sun-soft)" : "transparent",
              border: isCurrent ? "1px solid var(--sun)" : "1px solid transparent",
            }}
          >
            <Msi size={20} style={{ color: iconColor, flexShrink: 0 }}>
              {icon}
            </Msi>
            <span
              style={{
                font: isCurrent
                  ? "600 14px var(--font-sans)"
                  : "400 14px var(--font-sans)",
                lineHeight: 1.3,
              }}
            >
              {l.title}
            </span>
          </LocaleLink>
        );
      })}

      <div style={{ marginTop: 14, padding: "0 4px" }}>
        <div
          style={{
            height: 5,
            borderRadius: 99,
            background: "var(--surface-3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: 99,
              background: "var(--sun)",
              transition: "width .3s ease",
            }}
          />
        </div>
        <div
          style={{
            font: "500 11px var(--font-mono)",
            color: "var(--ink-3)",
            marginTop: 7,
          }}
        >
          {pct}&nbsp;% {progressSuffix}
        </div>
      </div>
    </aside>
  );
}
