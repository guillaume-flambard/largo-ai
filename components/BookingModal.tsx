"use client";

import { useEffect, useState } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Input } from "./Input";
import { ArrowIcon, CheckIcon, CloseIcon } from "./icons";
import { buildContactMailto, CONTACT_EMAIL } from "@/lib/mailto";

type BookingCopy = {
  dialogLabel: string;
  close: string;
  sentTitle: string;
  sentBody: string;
  sentFallbackPre: string;
  badge: string;
  formTitle: string;
  nameLabel: string;
  namePh: string;
  companyLabel: string;
  companyPh: string;
  sizeLabel: string;
  sizePh: string;
  emailLabel: string;
  emailPh: string;
  submit: string;
  privacy: string;
};

const BOOKING_COPY: Record<"fr" | "en", BookingCopy> = {
  fr: {
    dialogLabel: "Réservez votre appel découverte",
    close: "Fermer",
    sentTitle: "Demande envoyée !",
    sentBody:
      "Votre messagerie s'ouvre avec votre demande pré-remplie — il ne reste qu'à l'envoyer. Guillaume cale votre créneau sous 24 h ouvrées.",
    sentFallbackPre: "Rien ne s'est ouvert ? Écrivez à ",
    badge: "Appel découverte · 30 min · gratuit",
    formTitle: "Réservez votre appel",
    nameLabel: "Nom",
    namePh: "Votre nom",
    companyLabel: "Entreprise",
    companyPh: "Votre société",
    sizeLabel: "Taille d'équipe",
    sizePh: "ex. 8",
    emailLabel: "Email professionnel",
    emailPh: "vous@entreprise.fr",
    submit: "Demander un créneau",
    privacy: "Vos données ne servent qu'à vous recontacter (RGPD). Aucune newsletter.",
  },
  en: {
    dialogLabel: "Book your discovery call",
    close: "Close",
    sentTitle: "Request sent!",
    sentBody:
      "Your email client opens with your request pre-filled — just hit send. Guillaume books your slot within one business day.",
    sentFallbackPre: "Nothing opened? Email ",
    badge: "Discovery call · 30 min · free",
    formTitle: "Book your call",
    nameLabel: "Name",
    namePh: "Your name",
    companyLabel: "Company",
    companyPh: "Your company",
    sizeLabel: "Team size",
    sizePh: "e.g. 8",
    emailLabel: "Work email",
    emailPh: "you@company.com",
    submit: "Request a slot",
    privacy: "Your data is only used to get back to you (GDPR). No newsletter.",
  },
};

/** Largo IA — Booking modal. Honeypot anti-spam, client-side success state. */
export function BookingModal({
  open,
  onClose,
  locale = "fr",
}: {
  open: boolean;
  onClose: () => void;
  locale?: "fr" | "en";
}) {
  const t = BOOKING_COPY[locale] ?? BOOKING_COPY.fr;
  const [sent, setSent] = useState(false);

  // Reset the success state whenever the modal transitions closed,
  // without an effect (React's "adjust state on prop change" pattern).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setSent(false);
  }

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10,37,64,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.dialogLabel}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "var(--surface-card)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          padding: "32px 30px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label={t.close}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "var(--bg-soft)",
            border: "none",
            borderRadius: "var(--radius-pill)",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted)",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>

        {sent ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              textAlign: "center",
              padding: "24px 0",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: 64,
                height: 64,
                borderRadius: "var(--radius-pill)",
                background: "var(--surface-tint-teal)",
                color: "var(--teal-dark)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckIcon />
            </span>
            <h3
              style={{
                fontSize: "var(--fs-h3)",
                fontWeight: "var(--fw-light)",
                letterSpacing: "var(--ls-display)",
                color: "var(--ink)",
              }}
            >
              {t.sentTitle}
            </h3>
            <p style={{ color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
              {t.sentBody}
            </p>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--muted-ink)" }}>
              {t.sentFallbackPre}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--sun-ink)", fontWeight: 600 }}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <Button variant="ghost" onClick={onClose}>
              {t.close}
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              if (fd.get("website")) return; // honeypot caught a bot
              // Pas de backend : on ouvre la messagerie avec la demande pré-remplie.
              window.location.href = buildContactMailto(fd, "booking");
              setSent(true);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Badge tone="neutral" dot>
                {t.badge}
              </Badge>
              <h3
                style={{
                  fontSize: "var(--fs-h3)",
                  fontWeight: "var(--fw-light)",
                  letterSpacing: "var(--ls-display)",
                  color: "var(--ink)",
                  marginTop: 8,
                }}
              >
                {t.formTitle}
              </h3>
            </div>
            <Input label={t.nameLabel} id="bk-nom" name="nom" placeholder={t.namePh} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Input
                label={t.companyLabel}
                id="bk-ent"
                name="entreprise"
                placeholder={t.companyPh}
              />
              <Input
                label={t.sizeLabel}
                id="bk-size"
                name="taille"
                placeholder={t.sizePh}
              />
            </div>
            <Input
              label={t.emailLabel}
              id="bk-email"
              name="email"
              type="email"
              required
              placeholder={t.emailPh}
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px" }}
            />
            <Button
              variant="primary"
              fullWidth
              type="submit"
              iconRight={<ArrowIcon />}
            >
              {t.submit}
            </Button>
            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              {t.privacy}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
