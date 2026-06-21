import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { LocaleLink } from "@/components/LocaleLink";
import { getSessionUser } from "@/lib/auth/session";
import { getMyProgress } from "@/lib/learn/progress-server";
import { moduleCompletion, nextUnfinished } from "@/lib/learn/progress-shared";
import { listModules, getModule } from "@/lib/content/programme";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

export default async function MonEspacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const user = await getSessionUser();
  if (!user) redirect(`/${locale}/connexion`);

  const t = getPageCopy(locale as Locale).auth;
  const entries = await getMyProgress();
  const mods = await listModules(locale as Locale);
  const full = (await Promise.all(mods.map((m) => getModule(locale as Locale, m.slug)))).filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getModule>>>[];

  const publicMods = full.filter((m) => !m.meta.formateurOnly);
  const ordered = publicMods.flatMap((m) => m.lessons.map((l) => ({ moduleSlug: m.meta.slug, lessonSlug: l.slug })));
  const next = nextUnfinished(entries, ordered);

  return (
    <>
      <PageHero eyebrow={t.mySpace} title={t.dashboardTitle} subtitle={user.name ?? user.email ?? ""} />
      <section className="section">
        <div className="container">
          {next && (
            <LocaleLink href={`/programme/${next.moduleSlug}/${next.lessonSlug}`} className="card" style={{ display: "inline-block", padding: "12px 18px", marginBottom: 28, fontWeight: "var(--fw-semibold)" }}>
              {t.resume} <span aria-hidden="true">→</span>
            </LocaleLink>
          )}
          <ol className="rows" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {publicMods.map((m) => {
              const moduleEntries = entries.filter((e) => e.moduleSlug === m.meta.slug);
              const c = moduleCompletion(moduleEntries, m.lessons.map((l) => l.slug));
              return (
                <li key={m.meta.slug} className="row" style={{ alignItems: "center" }}>
                  <LocaleLink href={`/programme/${m.meta.slug}`} style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--ink)" }}>
                    {m.meta.title}
                  </LocaleLink>
                  <span style={{ color: "var(--muted-ink)", fontSize: "var(--fs-sm)" }}>
                    {c.done}/{c.total} {t.lessonsDone}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
