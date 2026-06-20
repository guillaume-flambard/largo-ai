import { notFound } from "next/navigation";
import { LocaleLink } from "@/components/LocaleLink";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, LOCALES } from "@/lib/i18n";
import { getModule, listModules } from "@/lib/content/programme";

export async function generateStaticParams() {
  const params: { locale: string; module: string }[] = [];
  for (const locale of LOCALES) {
    for (const m of await listModules(locale)) {
      params.push({ locale, module: m.slug });
    }
  }
  return params;
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ locale: string; module: string }>;
}) {
  const { locale, module: moduleSlug } = await params;
  if (!isLocale(locale)) notFound();
  const mod = await getModule(locale, moduleSlug);
  if (!mod) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero eyebrow={dict.nav.programme} title={mod.meta.title} subtitle={mod.meta.summary} />

      <section className="section">
        <div className="container">
          <ol className="rows" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {mod.lessons.map((lesson, i) => (
              <li key={lesson.slug} className="row" style={{ alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="row__index">{String(i + 1).padStart(2, "0")}</span>
                  <LocaleLink
                    href={`/programme/${moduleSlug}/${lesson.slug}`}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--fs-h3)",
                      fontWeight: "var(--fw-regular)",
                      letterSpacing: "var(--ls-tight)",
                      color: "var(--ink)",
                    }}
                  >
                    {lesson.title}
                  </LocaleLink>
                </div>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--muted-ink)" }}>
                  {lesson.durationMin}&nbsp;{dict.programme.dureeMin} · {lesson.level}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
