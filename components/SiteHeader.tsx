"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { LocaleLink } from "./LocaleLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ReserveButton } from "./ReserveButton";
import { ThemeToggle } from "./ThemeToggle";
import { Msi, sunPill } from "./sections/saas-ui";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

type Nav = { programme: string; aPropos: string; contact: string; reserver: string };

type AuthCopy = { signIn: string; mySpace: string; signOut: string };
type UserInfo = { name?: string | null; image?: string | null } | null;

/** Pastille avatar : photo du fournisseur, ou initiale sur fond ocre. */
function Avatar({ user, size = 32 }: { user: NonNullable<UserInfo>; size?: number }) {
  const initial = (user.name ?? "?").trim().charAt(0).toUpperCase() || "?";
  const common: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 999,
    flex: "0 0 auto",
    objectFit: "cover",
  };
  if (user.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt="" style={common} />;
  }
  return (
    <span
      aria-hidden="true"
      style={{
        ...common,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(150deg,var(--sun),var(--sun-deep))",
        color: "var(--on-sun)",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size * 0.45,
      }}
    >
      {initial}
    </span>
  );
}

/** Menu compte (desktop) : avatar → déroulant Mon espace / Déconnexion. */
function AccountMenu({
  user,
  auth,
  accountSlot,
}: {
  user: NonNullable<UserInfo>;
  auth: AuthCopy;
  accountSlot?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={user.name ?? auth.mySpace}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 2,
          borderRadius: 999,
        }}
      >
        <Avatar user={user} />
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            minWidth: 200,
            background: "var(--surface)",
            border: "1px solid var(--line-2)",
            borderRadius: 12,
            boxShadow: "var(--shadow-lg)",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 60,
          }}
        >
          {user.name && (
            <div
              style={{
                padding: "6px 10px 8px",
                fontSize: 13,
                color: "var(--ink-3)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {user.name}
            </div>
          )}
          <LocaleLink
            href="/mon-espace"
            role="menuitem"
            onClick={() => setOpen(false)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {auth.mySpace}
          </LocaleLink>
          <div style={{ padding: "2px 4px" }}>{accountSlot}</div>
        </div>
      )}
    </div>
  );
}

const navLinkStyle: CSSProperties = {
  padding: "8px 13px",
  borderRadius: 9,
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: 14.5,
  color: "var(--ink-2)",
  cursor: "pointer",
  textDecoration: "none",
};

export function SiteHeader({
  nav,
  auth,
  user,
  accountSlot,
}: {
  nav: Nav;
  auth?: AuthCopy;
  user?: UserInfo;
  accountSlot?: ReactNode;
}) {
  const pathname = usePathname();
  const seg = pathname.split("/")[1] ?? "";
  const locale = isLocale(seg) ? seg : DEFAULT_LOCALE;
  const accueilLabel = locale === "en" ? "Home" : "Accueil";

  const links = [
    { label: accueilLabel, href: "/" },
    { label: nav.programme, href: "/programme" },
    { label: nav.aPropos, href: "/a-propos" },
    { label: nav.contact, href: "/contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "saturate(1.4) blur(14px)",
        WebkitBackdropFilter: "saturate(1.4) blur(14px)",
        background: "var(--nav-bg)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
          height: 66,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* logo */}
        <LocaleLink
          href="/"
          aria-label="Largo IA — accueil"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logomark.svg" alt="" style={{ width: 34, height: 34, display: "block" }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: "-0.03em",
            }}
          >
            Largo<span style={{ color: "var(--sun-ink)" }}> IA</span>
          </span>
        </LocaleLink>

        {/* liens desktop */}
        <div
          className="lg-desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 14 }}
        >
          {links.map((l) => (
            <LocaleLink key={l.href} href={l.href} className="lg-nav-link" style={navLinkStyle}>
              {l.label}
            </LocaleLink>
          ))}
        </div>

        {/* droite */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <LanguageSwitcher className="lg-hide-xs" />
          <ThemeToggle />
          {auth &&
            (user ? (
              <div className="lg-desktop-nav">
                <AccountMenu user={user} auth={auth} accountSlot={accountSlot} />
              </div>
            ) : (
              <LocaleLink href="/connexion" className="lg-desktop-nav lg-nav-link" style={navLinkStyle}>
                {auth.signIn}
              </LocaleLink>
            ))}
          <ReserveButton
            className="lg-sun-btn"
            style={{ ...sunPill, padding: "10px 17px", fontSize: 14.5 }}
            iconRight={<Msi size={18}>north_east</Msi>}
          >
            {nav.reserver}
          </ReserveButton>
          <button
            className="lg-mobile-only"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--line-2)",
              background: "var(--surface)",
              borderRadius: 10,
              cursor: "pointer",
              color: "var(--ink)",
            }}
          >
            <Msi size={22}>{menuOpen ? "close" : "menu"}</Msi>
          </button>
        </div>
      </div>

      {/* menu mobile */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--line)",
            background: "var(--nav-bg)",
            padding: "10px 18px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {links.map((l) => (
            <LocaleLink
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="lg-nav-link"
              style={{
                padding: "13px 12px",
                borderRadius: 10,
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 16,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </LocaleLink>
          ))}
          {auth &&
            (user ? (
              <>
                <LocaleLink
                  href="/mon-espace"
                  onClick={() => setMenuOpen(false)}
                  className="lg-nav-link"
                  style={{
                    padding: "13px 12px",
                    borderRadius: 10,
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "var(--ink)",
                    textDecoration: "none",
                    borderTop: "1px solid var(--line)",
                    marginTop: 6,
                    paddingTop: 16,
                  }}
                >
                  {auth.mySpace}
                </LocaleLink>
                <div style={{ padding: "8px 12px" }}>{accountSlot}</div>
              </>
            ) : (
              <LocaleLink
                href="/connexion"
                onClick={() => setMenuOpen(false)}
                className="lg-nav-link"
                style={{
                  padding: "13px 12px",
                  borderRadius: 10,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "var(--ink-2)",
                  textDecoration: "none",
                  borderTop: "1px solid var(--line)",
                  marginTop: 6,
                  paddingTop: 16,
                }}
              >
                {auth.signIn}
              </LocaleLink>
            ))}
        </div>
      )}
    </nav>
  );
}
