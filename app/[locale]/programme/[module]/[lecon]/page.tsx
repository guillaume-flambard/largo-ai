import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { LocaleLink } from "@/components/LocaleLink";
import { Idee, Exemple, Exercice, Attention } from "@/components/learn/mdx-blocks";
import { Formateur } from "@/components/learn/Formateur";
import { RoleToggle } from "@/components/learn/RoleToggle";
import { LessonProvider } from "@/components/learn/LessonProgress";
import { Quiz } from "@/components/learn/quiz/Quiz";
import { getDictionary } from "@/lib/dictionary";
import { getPageCopy } from "@/lib/pages";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import {
  getLesson,
  getModule,
  getAdjacentLessons,
  listModules,
} from "@/lib/content/programme";

const mdxComponents = { Idee, Exemple, Exercice, Attention, Formateur };

export async function generateStaticParams() {
  const params: { locale: string; module: string; lecon: string }[] = [];
  for (const locale of LOCALES) {
    for (const m of await listModules(locale)) {
      const mod = await getModule(locale, m.slug);
      for (const lesson of mod?.lessons ?? []) {
        params.push({ locale, module: m.slug, lecon: lesson.slug });
      }
    }
  }
  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; module: string; lecon: string }>;
}) {
  const { locale, module: moduleSlug, lecon } = await params;
  if (!isLocale(locale)) notFound();
  const lesson = await getLesson(locale, moduleSlug, lecon);
  if (!lesson) notFound();

  const dict = await getDictionary(locale);
  const f = getPageCopy(locale).formateur;
  const mod = await getModule(locale, moduleSlug);
  const { prev, next } = await getAdjacentLessons(locale, moduleSlug, lecon);

  const { content } = await compileMDX({
    source: lesson.body,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="section">
      <div className="container container--narrow">
        {/* Fil d'Ariane + titre */}
        <LocaleLink href={`/programme/${moduleSlug}`} className="kicker" style={{ textDecoration: "none" }}>
          {mod?.meta.title ?? dict.nav.programme}
        </LocaleLink>
        <h1
          className="display"
          style={{
            fontSize: "var(--fs-h1)",
            fontWeight: "var(--fw-light)",
            margin: "16px 0 0",
          }}
        >
          {lesson.meta.title}
        </h1>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--muted-ink)" }}>
            {lesson.meta.durationMin}&nbsp;{dict.programme.dureeMin} · {lesson.meta.level}
          </p>
          <RoleToggle label={dict.programme.modeFormateur} stateOn={f.on} stateOff={f.off} />
        </div>

        {/* Objectifs */}
        {lesson.meta.objectives.length > 0 && (
          <div
            style={{
              margin: "28px 0",
              padding: "clamp(16px, 3vw, 24px)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)",
              background: "var(--paper-2)",
            }}
          >
            <div
              style={{
                fontSize: "var(--fs-sm)",
                fontWeight: "var(--fw-semibold)",
                color: "var(--sun-ink)",
                marginBottom: 8,
              }}
            >
              {dict.programme.objectifs}
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
              {lesson.meta.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Corps de la leçon + quiz (données frontmatter, rendu par la page) */}
        <LessonProvider moduleSlug={moduleSlug} lessonSlug={lecon}>
          <div className="prose" style={{ marginTop: 8 }}>
            {content}
          </div>
          {lesson.meta.quiz && lesson.meta.quiz.length > 0 && (
            <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
              <h2
                style={{
                  fontSize: "var(--fs-h3)",
                  fontWeight: "var(--fw-light)",
                  letterSpacing: "var(--ls-display)",
                  marginBottom: 8,
                }}
              >
                {dict.programme.quiz}
              </h2>
              <Quiz questions={lesson.meta.quiz} />
            </div>
          )}
        </LessonProvider>

        {/* Navigation prev / next */}
        <nav
          aria-label="Leçons"
          style={{
            marginTop: "clamp(40px, 6vw, 64px)",
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <LessonLink
            locale={locale}
            moduleSlug={moduleSlug}
            slug={prev?.slug}
            title={prev?.title}
            label={dict.programme.precedent}
            align="left"
          />
          <LessonLink
            locale={locale}
            moduleSlug={moduleSlug}
            slug={next?.slug}
            title={next?.title}
            label={dict.programme.suivant}
            align="right"
          />
        </nav>
      </div>
    </article>
  );
}

function LessonLink({
  moduleSlug,
  slug,
  title,
  label,
  align,
}: {
  locale: Locale;
  moduleSlug: string;
  slug?: string;
  title?: string;
  label: string;
  align: "left" | "right";
}) {
  if (!slug || !title) return <span />;
  return (
    <LocaleLink
      href={`/programme/${moduleSlug}/${slug}`}
      style={{ display: "flex", flexDirection: "column", textAlign: align, maxWidth: "45%" }}
    >
      <span style={{ fontSize: "var(--fs-sm)", color: "var(--sun-ink)", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 500 }}>{title}</span>
    </LocaleLink>
  );
}
