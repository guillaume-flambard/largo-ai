import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { LocaleLink } from "@/components/LocaleLink";
import { CheckIcon } from "@/components/icons";
import { getSessionUser } from "@/lib/auth/session";
import { getMyProgress } from "@/lib/learn/progress-server";
import { moduleCompletion, nextUnfinished } from "@/lib/learn/progress-shared";
import { listModules, getModule } from "@/lib/content/programme";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

/** Barre de progression on-brand. */
function ProgressBar({ pct, height = 6 }: { pct: number; height?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height,
        borderRadius: 999,
        background: "var(--line)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: 999,
          background: pct === 100 ? "var(--teal)" : "var(--sun)",
          transition: "width var(--dur) var(--ease-out)",
        }}
      />
    </div>
  );
}

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

  // Progression globale (somme des modules publics).
  const totals = publicMods.reduce(
    (acc, m) => {
      const c = moduleCompletion(
        entries.filter((e) => e.moduleSlug === m.meta.slug),
        m.lessons.map((l) => l.slug),
      );
      return { done: acc.done + c.done, total: acc.total + c.total };
    },
    { done: 0, total: 0 },
  );
  const overallPct = totals.total ? Math.round((totals.done / totals.total) * 100) : 0;

  return (
    <>
      <PageHero eyebrow={t.mySpace} title={t.dashboardTitle} subtitle={user.name ?? user.email ?? ""} />
      <section className="section">
        <div className="container">
          {/* Progression globale */}
          <div className="card" style={{ padding: "22px 24px", marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--ink)" }}>
                {t.overall}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--sun-ink)" }}>
                {overallPct}%
              </span>
            </div>
            <ProgressBar pct={overallPct} height={8} />
            <div style={{ marginTop: 10, fontSize: "var(--fs-sm)", color: "var(--muted-ink)" }}>
              {totals.done}/{totals.total} {t.lessonsDone}
            </div>
          </div>

          {next && (
            <LocaleLink href={`/programme/${next.moduleSlug}/${next.lessonSlug}`} className="card" style={{ display: "inline-block", padding: "12px 18px", marginBottom: 28, fontWeight: "var(--fw-semibold)" }}>
              {t.resume} <span aria-hidden="true">→</span>
            </LocaleLink>
          )}

          <ol className="rows" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {publicMods.map((m) => {
              const moduleEntries = entries.filter((e) => e.moduleSlug === m.meta.slug);
              const c = moduleCompletion(moduleEntries, m.lessons.map((l) => l.slug));
              const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
              const complete = c.done === c.total && c.total > 0;
              return (
                <li key={m.meta.slug} className="row" style={{ alignItems: "center", gap: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {complete && (
                        <span aria-hidden="true" style={{ color: "var(--teal)", display: "inline-flex", flex: "0 0 auto" }}>
                          <CheckIcon width={20} height={20} />
                        </span>
                      )}
                      <LocaleLink href={`/programme/${m.meta.slug}`} style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", color: "var(--ink)" }}>
                        {m.meta.title}
                      </LocaleLink>
                    </div>
                    <ProgressBar pct={pct} />
                  </div>
                  <span style={{ color: "var(--muted-ink)", fontSize: "var(--fs-sm)", flex: "0 0 auto", fontVariantNumeric: "tabular-nums" }}>
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
