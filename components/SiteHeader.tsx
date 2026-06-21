"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LocaleLink } from "./LocaleLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ReserveButton } from "./ReserveButton";
import { Magnetic } from "./motion/Magnetic";
import { ArrowIcon, CloseIcon, MenuIcon } from "./icons";

type Nav = { programme: string; aPropos: string; contact: string; reserver: string };

type AuthCopy = {
  signIn: string;
  mySpace: string;
  signOut: string;
};

type UserInfo = { name?: string | null; image?: string | null } | null;

/** Pastille avatar : photo du fournisseur, ou initiale sur fond ocre. */
function Avatar({ user, size = 32 }: { user: NonNullable<UserInfo>; size?: number }) {
  const initial = (user.name ?? "?").trim().charAt(0).toUpperCase() || "?";
  const common = {
    width: size,
    height: size,
    borderRadius: 999,
    flex: "0 0 auto" as const,
    objectFit: "cover" as const,
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
        background: "var(--sun)",
        color: "var(--ink)",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-semibold)",
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
            background: "var(--paper)",
            border: "1px solid var(--line-strong)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md, 0 10px 30px rgba(0,0,0,0.10))",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 60,
          }}
        >
          {user.name && (
            <div style={{ padding: "6px 10px 8px", fontSize: "var(--fs-sm)", color: "var(--muted-ink)", borderBottom: "1px solid var(--line)" }}>
              {user.name}
            </div>
          )}
          <LocaleLink
            href="/mon-espace"
            role="menuitem"
            onClick={() => setOpen(false)}
            style={{ padding: "8px 10px", borderRadius: "var(--radius-sm)", color: "var(--ink)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)" }}
          >
            {auth.mySpace}
          </LocaleLink>
          <div style={{ padding: "2px 4px" }}>{accountSlot}</div>
        </div>
      )}
    </div>
  );
}

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
  const links = [
    { label: nav.programme, href: "/programme" },
    { label: nav.aPropos, href: "/a-propos" },
    { label: nav.contact, href: "/contact" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(251,252,253,0.82)" : "rgba(251,252,253,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
        transition: "all var(--dur) var(--ease-out)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "14px var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <LocaleLink href="/" aria-label="Largo IA — accueil" style={{ display: "block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-wordmark.svg"
            alt="Largo IA"
            style={{ display: "block", height: 36, width: "auto" }}
          />
        </LocaleLink>

        <nav
          className="nav-desktop"
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
        >
          {links.map((l) => (
            <LocaleLink key={l.label} href={l.href} className="nav-link">
              {l.label}
            </LocaleLink>
          ))}
          {auth && (
            user ? (
              <AccountMenu user={user} auth={auth} accountSlot={accountSlot} />
            ) : (
              <LocaleLink href="/connexion" className="nav-link">
                {auth.signIn}
              </LocaleLink>
            )
          )}
          <LanguageSwitcher />
          <Magnetic>
            <ReserveButton variant="primary" size="sm" iconRight={<ArrowIcon />}>
              {nav.reserver}
            </ReserveButton>
          </Magnetic>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--navy)",
            cursor: "pointer",
            padding: 4,
          }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            padding: "8px var(--gutter) 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {links.map((l) => (
            <LocaleLink
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "var(--fs-body)",
                fontWeight: 600,
                color: "var(--navy)",
                padding: "8px 0",
              }}
            >
              {l.label}
            </LocaleLink>
          ))}
          {auth && (
            user ? (
              <>
                <LocaleLink
                  href="/mon-espace"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "var(--fs-body)",
                    fontWeight: 600,
                    color: "var(--navy)",
                    padding: "8px 0",
                  }}
                >
                  {auth.mySpace}
                </LocaleLink>
                {accountSlot}
              </>
            ) : (
              <LocaleLink
                href="/connexion"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "var(--fs-body)",
                  fontWeight: 600,
                  color: "var(--navy)",
                  padding: "8px 0",
                }}
              >
                {auth.signIn}
              </LocaleLink>
            )
          )}
          <ReserveButton variant="primary" fullWidth iconRight={<ArrowIcon />}>
            {nav.reserver}
          </ReserveButton>
          <div style={{ paddingTop: 4 }}>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
