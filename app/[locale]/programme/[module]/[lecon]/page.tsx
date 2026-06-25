import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { LocaleLink } from "@/components/LocaleLink";
import { Idee, Exemple, Exercice, Attention } from "@/components/learn/mdx-blocks";
import { Formateur } from "@/components/learn/Formateur";
import { LessonProvider } from "@/components/learn/LessonProgress";
import { LessonAside } from "@/components/learn/LessonAside";
import { Quiz } from "@/components/learn/quiz/Quiz";
import { Msi } from "@/components/sections/saas-ui";
import { getDictionary } from "@/lib/dictionary";
import { getPageCopy } from "@/lib/pages";
import { getSessionUser } from "@/lib/auth/session";
import { isLocale, LOCALES } from "@/lib/i18n";
import {
  getLesson,
  getModule,
  getAdjacentLessons,
  listModules,
  levelLabel,
} from "@/lib/content/programme";

/** Encarts MDX avec la locale liée (les libellés viennent du composant, pas du MDX). */
function mdxComponentsFor(locale: "fr" | "en") {
  return {
    Idee: (p: { children: React.ReactNode }) => <Idee {...p} locale={locale} />,
    Exemple: (p: { children: React.ReactNode }) => <Exemple {...p} locale={locale} />,
    Exercice: (p: { children: React.ReactNode }) => <Exercice {...p} locale={locale} />,
    Attention: (p: { children: React.ReactNode }) => <Attention {...p} locale={locale} />,
    Formateur: (p: { children: React.ReactNode }) => <Formateur {...p} locale={locale} />,
  };
}

const LEVEL_ICON: Record<string, string> = {
  découverte: "signal_cellular_alt_1_bar",
  intermédiaire: "signal_cellular_alt_2_bar",
  avancé: "signal_cellular_alt",
};

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
  const pageCopy = getPageCopy(locale);
  const user = await getSessionUser();
  const mod = await getModule(locale, moduleSlug);
  const { prev, next } = await getAdjacentLessons(locale, moduleSlug, lecon);

  const { content } = await compileMDX({
    source: lesson.body,
    components: mdxComponentsFor(locale),
    options: { parseFrontmatter: false },
  });

  const isFr = locale === "fr";
  const lessons = mod?.lessons ?? [];
  const lessonCount = lessons.length;
  const lessonsWord = isFr
    ? lessonCount > 1
      ? "leçons"
      : "leçon"
    : lessonCount > 1
      ? "lessons"
      : "lesson";
  const asideModuleLabel = `${mod?.meta.title ?? dict.nav.programme} · ${lessonCount} ${lessonsWord}`;
  const progressSuffix = isFr ? "du module" : "of the module";
  const lessonIndex = lessons.findIndex((l) => l.slug === lecon);
  const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : lesson.meta.order;
  const lessonNumberLabel = `${dict.programme.lecon} ${String(lessonNumber).padStart(2, "0")}`;
  const lessonLevelLabel = levelLabel(lesson.meta.level, locale);

  return (
    <LessonProvider moduleSlug={moduleSlug} lessonSlug={lecon}>
      {/* Sous-barre collante : fil d'Ariane */}
      <div className="lg-lecon-subbar">
        <div className="lg-lecon-subbar__inner">
          <nav
            aria-label={dict.programme.sommaire}
            className="lg-lecon-crumbs"
          >
            <LocaleLink href="/programme" className="lg-lecon-crumb-link">
              {dict.nav.programme}
            </LocaleLink>
            <Msi size={16} style={{ color: "var(--ink-3)" }}>
              chevron_right
            </Msi>
            <span>{mod?.meta.title ?? dict.programme.module}</span>
            <Msi size={16} style={{ color: "var(--ink-3)" }}>
              chevron_right
            </Msi>
            <span style={{ color: "var(--ink)" }}>{lesson.meta.title}</span>
          </nav>
        </div>
      </div>

      {/* Grille 2 colonnes : aside (liste leçons) + article */}
      <div data-col2 className="lg-lecon-grid lg-col2">
        <LessonAside
          moduleSlug={moduleSlug}
          moduleLabel={asideModuleLabel}
          lessons={lessons.map((l) => ({ slug: l.slug, title: l.title }))}
          currentSlug={lecon}
          progressSuffix={progressSuffix}
        />

        <article className="lg-lecon-main">
          {/* Pastilles méta */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <LessonMetaPill icon="schedule">
              {lesson.meta.durationMin}&nbsp;{dict.programme.dureeMin}
            </LessonMetaPill>
            <LessonMetaPill icon={LEVEL_ICON[lesson.meta.level] ?? "signal_cellular_alt_1_bar"}>
              {lessonLevelLabel}
            </LessonMetaPill>
            <LessonMetaPill>{lessonNumberLabel}</LessonMetaPill>
          </div>

          <h1
            style={{
              margin: 0,
              font: "400 clamp(30px,4vw,46px)/1.08 var(--font-display)",
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            {lesson.meta.title}
          </h1>

          {/* Objectifs */}
          {lesson.meta.objectives.length > 0 && (
            <div
              style={{
                margin: "26px 0",
                border: "1px solid var(--line)",
                background: "var(--surface-2)",
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  font: "500 11px var(--font-mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--sun-ink)",
                  marginBottom: 12,
                }}
              >
                {dict.programme.objectifs}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {lesson.meta.objectives.map((o) => (
                  <li
                    key={o}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 15,
                      color: "var(--ink-2)",
                      lineHeight: 1.5,
                    }}
                  >
                    <Msi size={19} style={{ color: "var(--sun-ink)", flexShrink: 0 }}>
                      arrow_forward
                    </Msi>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Invitation à se connecter (visiteurs déconnectés) */}
          {!user && (
            <LocaleLink
              href="/connexion"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
                margin: "0 0 8px",
                padding: "14px 18px",
                border: "1px dashed var(--line-2)",
                borderRadius: 12,
                background: "var(--surface-2)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                {pageCopy.auth.savePrompt}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--sun-ink)",
                  flex: "0 0 auto",
                }}
              >
                {pageCopy.auth.signIn} <span aria-hidden="true">→</span>
              </span>
            </LocaleLink>
          )}

          {/* Corps MDX (prose) — inclut les zones <Formateur> (gated mode formateur) */}
          <div className="prose lg-lecon-prose">{content}</div>

          {/* Quiz */}
          {lesson.meta.quiz && lesson.meta.quiz.length > 0 && (
            <Quiz
              questions={lesson.meta.quiz}
              title={dict.programme.quiz}
              locale={locale}
            />
          )}

          {/* prev / next */}
          <nav
            aria-label={dict.programme.sommaire}
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <PrevNextCard
              moduleSlug={moduleSlug}
              slug={prev?.slug}
              title={prev?.title}
              label={dict.programme.precedent}
              dir="prev"
            />
            <PrevNextCard
              moduleSlug={moduleSlug}
              slug={next?.slug}
              title={next?.title}
              label={dict.programme.suivant}
              dir="next"
            />
          </nav>
        </article>
      </div>
    </LessonProvider>
  );
}

function LessonMetaPill({
  icon,
  children,
}: {
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 11px",
        borderRadius: 999,
        border: "1px solid var(--line-2)",
        background: "var(--surface)",
        font: "500 12px var(--font-mono)",
        color: "var(--ink-2)",
      }}
    >
      {icon && (
        <Msi size={15} style={{ color: "var(--sun-ink)" }}>
          {icon}
        </Msi>
      )}
      {children}
    </span>
  );
}

function PrevNextCard({
  moduleSlug,
  slug,
  title,
  label,
  dir,
}: {
  moduleSlug: string;
  slug?: string;
  title?: string;
  label: string;
  dir: "prev" | "next";
}) {
  const isNext = dir === "next";
  if (!slug || !title) return <span />;
  return (
    <LocaleLink
      href={`/programme/${moduleSlug}/${slug}`}
      className="lg-card lg-lecon-nav"
      style={{
        display: "block",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        borderRadius: 14,
        padding: 18,
        textDecoration: "none",
        textAlign: isNext ? "right" : "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isNext ? "flex-end" : "flex-start",
          gap: 6,
          font: "500 12px var(--font-mono)",
          color: isNext ? "var(--sun-ink)" : "var(--ink-3)",
        }}
      >
        {!isNext && <Msi size={17}>arrow_back</Msi>}
        {label}
        {isNext && <Msi size={17}>arrow_forward</Msi>}
      </div>
      <div
        style={{
          marginTop: 6,
          font: "600 15px var(--font-display)",
          color: "var(--ink)",
        }}
      >
        {title}
      </div>
    </LocaleLink>
  );
}
