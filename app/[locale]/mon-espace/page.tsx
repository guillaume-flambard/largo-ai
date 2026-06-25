import { notFound, redirect } from "next/navigation";
import { LocaleLink } from "@/components/LocaleLink";
import { Msi } from "@/components/sections/saas-ui";
import { getSessionUser } from "@/lib/auth/session";
import { getMyProgress } from "@/lib/learn/progress-server";
import { moduleCompletion, nextUnfinished } from "@/lib/learn/progress-shared";
import { listModules, getModule } from "@/lib/content/programme";
import { isLocale, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/pages";

/** Initials for the avatar tile. */
function initials(name: string | null | undefined, email: string | null | undefined): string {
  const src = (name ?? email ?? "").trim();
  if (!src) return "—";
  const parts = src.split(/[\s@.]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return letters.join("") || src[0]?.toUpperCase() || "—";
}

export default async function MonEspacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const user = await getSessionUser();
  if (!user) redirect(`/${locale}/connexion`);

  const fr = loc === "fr";
  const t = getPageCopy(loc).auth;
  const entries = await getMyProgress();
  const mods = await listModules(loc);
  const full = (
    await Promise.all(mods.map((m) => getModule(loc, m.slug)))
  ).filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getModule>>>[];

  const publicMods = full.filter((m) => !m.meta.formateurOnly);
  const ordered = publicMods.flatMap((m) =>
    m.lessons.map((l) => ({ moduleSlug: m.meta.slug, lessonSlug: l.slug })),
  );
  // Prochaine leçon non terminée — toujours dans un module public (jamais MF/gated).
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
  const modsDone = publicMods.filter((m) => {
    const c = moduleCompletion(
      entries.filter((e) => e.moduleSlug === m.meta.slug),
      m.lessons.map((l) => l.slug),
    );
    return c.total > 0 && c.done === c.total;
  }).length;

  // Carte « reprendre » : module/leçon ciblés par la prochaine leçon non finie.
  const nextModule = next ? publicMods.find((m) => m.meta.slug === next.moduleSlug) : undefined;
  const nextLesson = nextModule?.lessons.find((l) => l.slug === next?.lessonSlug);
  const nextModuleEntries = next ? entries.filter((e) => e.moduleSlug === next.moduleSlug) : [];
  const nextModulePct =
    nextModule && nextModule.lessons.length
      ? Math.round(
          (moduleCompletion(
            nextModuleEntries,
            nextModule.lessons.map((l) => l.slug),
          ).done /
            nextModule.lessons.length) *
            100,
        )
      : 0;

  return (
    <>
      {/* greeting band */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--surface-2)" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "34px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              aria-hidden="true"
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(150deg,var(--sun),var(--sun-deep))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "600 20px var(--font-display)",
                color: "var(--on-sun)",
                boxShadow: "var(--glow-sun)",
              }}
            >
              {initials(user.name, user.email)}
            </div>
            <div>
              <div
                style={{
                  font: "400 clamp(24px,3vw,32px)/1.1 var(--font-display)",
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                }}
              >
                {fr ? "Bonjour" : "Hello"}
                {user.name ? `, ${user.name.split(" ")[0]}` : ""}
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 2 }}>
                {t.dashboardTitle} ·{" "}
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {modsDone}/{publicMods.length} {fr ? "modules terminés" : "modules done"}
                </b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-col2
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "36px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* main column */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* resume card */}
          {next && nextModule ? (
            <div
              style={{
                position: "relative",
                border: "1px solid #20283A",
                background: "#0A0C12",
                borderRadius: 18,
                padding: 28,
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -90,
                  right: -40,
                  width: 340,
                  height: 240,
                  background: "radial-gradient(closest-side,var(--sun-2),transparent 70%)",
                  opacity: 0.24,
                  filter: "blur(10px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  font: "500 11px var(--font-mono)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFB256",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 26,
                    height: 2,
                    borderRadius: 2,
                    background: "linear-gradient(90deg,#FF9A2E,#FF6A2C)",
                    flexShrink: 0,
                  }}
                />
                {fr ? "Reprendre où vous en étiez" : "Pick up where you left off"}
              </div>
              <h2
                style={{
                  position: "relative",
                  margin: "12px 0 0",
                  font: "600 24px var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "#F1F3F8",
                }}
              >
                {nextModule.meta.title}
              </h2>
              {nextLesson && (
                <p style={{ position: "relative", margin: "8px 0 0", fontSize: 15, color: "#AEB6C6" }}>
                  {nextLesson.title}
                </p>
              )}
              <div
                aria-hidden="true"
                style={{
                  position: "relative",
                  margin: "20px 0",
                  height: 6,
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.1)",
                  maxWidth: 420,
                }}
              >
                <div
                  style={{
                    width: `${nextModulePct}%`,
                    height: "100%",
                    borderRadius: 99,
                    background: "linear-gradient(90deg,var(--sun),var(--sun-2))",
                  }}
                />
              </div>
              <LocaleLink
                href={`/programme/${next.moduleSlug}/${next.lessonSlug}`}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 22px",
                  borderRadius: 11,
                  background: "linear-gradient(180deg,var(--sun),var(--sun-deep))",
                  color: "var(--on-sun)",
                  font: "600 15px var(--font-sans)",
                  border: "1px solid var(--sun-deep)",
                  boxShadow: "var(--glow-sun)",
                  textDecoration: "none",
                }}
              >
                <Msi size={19}>play_arrow</Msi>
                {t.resume}
              </LocaleLink>
            </div>
          ) : (
            <div
              style={{
                border: "1px solid var(--line)",
                background: "var(--surface)",
                borderRadius: 18,
                padding: 28,
                boxShadow: "var(--shadow-card)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Msi size={26} style={{ color: "var(--ok)" }}>
                workspace_premium
              </Msi>
              <div style={{ font: "600 16px var(--font-display)", color: "var(--ink)" }}>
                {fr ? "Parcours terminé — bravo !" : "Programme complete — well done!"}
              </div>
            </div>
          )}

          {/* modules list */}
          <div
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              borderRadius: 18,
              padding: "8px 24px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              style={{
                padding: "18px 0 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  font: "600 17px var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                {fr ? "Vos modules" : "Your modules"}
              </h3>
              <span style={{ font: "500 12px var(--font-mono)", color: "var(--ink-3)" }}>
                {modsDone} / {publicMods.length} {fr ? "terminés" : "done"}
              </span>
            </div>

            {publicMods.map((m, i) => {
              const c = moduleCompletion(
                entries.filter((e) => e.moduleSlug === m.meta.slug),
                m.lessons.map((l) => l.slug),
              );
              const pct = c.total ? Math.round((c.done / c.total) * 100) : 0;
              const complete = c.total > 0 && c.done === c.total;
              const current = next?.moduleSlug === m.meta.slug;
              const last = i === publicMods.length - 1;
              const icon = complete ? "check_circle" : current ? "play_circle" : "radio_button_unchecked";
              const iconColor = complete
                ? "var(--ok)"
                : current
                  ? "var(--sun-ink)"
                  : "var(--ink-3)";
              const barFill = complete
                ? "var(--ok)"
                : current
                  ? "linear-gradient(90deg,var(--sun),var(--sun-2))"
                  : "var(--sun)";

              return (
                <LocaleLink
                  key={m.meta.slug}
                  href={`/programme/${m.meta.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 0",
                    borderBottom: last ? "none" : "1px solid var(--line)",
                    textDecoration: "none",
                    ...(current
                      ? {
                          background: "var(--sun-soft)",
                          margin: "0 -24px",
                          paddingLeft: 24,
                          paddingRight: 24,
                        }
                      : {}),
                  }}
                >
                  <Msi size={26} style={{ color: iconColor, flexShrink: 0 }}>
                    {icon}
                  </Msi>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: "600 15px var(--font-display)", color: "var(--ink)" }}>
                      {m.meta.title}
                    </div>
                    <div
                      aria-hidden="true"
                      style={{
                        marginTop: 7,
                        height: 5,
                        borderRadius: 99,
                        background: "var(--surface-3)",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          borderRadius: 99,
                          background: barFill,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    style={{
                      font: "600 13px var(--font-mono)",
                      color: current ? "var(--sun-ink)" : "var(--ink-3)",
                      width: 46,
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {pct}%
                  </span>
                </LocaleLink>
              );
            })}
          </div>
        </div>

        {/* right rail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              borderRadius: 18,
              padding: 26,
              boxShadow: "var(--shadow-card)",
              textAlign: "center",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "relative",
                width: 128,
                height: 128,
                margin: "0 auto",
                borderRadius: "50%",
                background: `conic-gradient(var(--sun) 0% ${overallPct}%,var(--surface-3) ${overallPct}% 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 98,
                  height: 98,
                  borderRadius: "50%",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    font: "500 32px var(--font-display)",
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                  }}
                >
                  {overallPct}%
                </span>
                <span
                  style={{
                    font: "500 10px var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--ink-3)",
                  }}
                >
                  {fr ? "complété" : "complete"}
                </span>
              </div>
            </div>
            <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 24 }}>
              <div>
                <div style={{ font: "600 22px var(--font-display)", color: "var(--ink)" }}>
                  {totals.done}
                </div>
                <div
                  style={{
                    font: "500 11px var(--font-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  {t.lessonsDone}
                </div>
              </div>
              <div style={{ width: 1, background: "var(--line)" }} />
              <div>
                <div style={{ font: "600 22px var(--font-display)", color: "var(--ink)" }}>
                  {totals.total}
                </div>
                <div
                  style={{
                    font: "500 11px var(--font-mono)",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  {fr ? "au total" : "in total"}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--line)",
              background: "var(--surface)",
              borderRadius: 18,
              padding: 22,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Msi size={22} style={{ color: "var(--sun-ink)" }}>
                school
              </Msi>
              <LocaleLink
                href="/programme"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  font: "600 14px var(--font-sans)",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {fr ? "Voir tout le programme" : "View the full programme"}
                <Msi size={16} style={{ color: "var(--sun-ink)" }}>
                  arrow_forward
                </Msi>
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
