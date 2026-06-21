"use client";

import { useEffect, useState } from "react";
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
              <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <LocaleLink href="/mon-espace" className="nav-link">
                  {auth.mySpace}
                </LocaleLink>
                {accountSlot}
              </span>
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
