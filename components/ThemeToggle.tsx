"use client";

/** Bascule light/dark (refonte SaaS). Le thème vit sur <html data-theme>,
 *  posé avant la 1re peinture par le script anti-flash du layout et persisté
 *  dans localStorage('largo_theme'). Pas de state React : les deux icônes sont
 *  rendues et l'affichage bascule en CSS via [data-theme] (voir globals.css),
 *  ce qui évite tout mismatch d'hydratation. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("largo_theme", next);
    } catch {
      /* localStorage indisponible — non bloquant */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="lg-theme-toggle"
      aria-label="Basculer le thème clair / sombre"
      style={{
        width: 36,
        height: 36,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--line-2)",
        background: "var(--surface)",
        borderRadius: 10,
        cursor: "pointer",
        color: "var(--ink-2)",
      }}
    >
      <span className="msi lg-icon-light" style={{ fontSize: 20 }}>
        dark_mode
      </span>
      <span className="msi lg-icon-dark" style={{ fontSize: 20 }}>
        light_mode
      </span>
    </button>
  );
}
