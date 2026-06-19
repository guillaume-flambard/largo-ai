"use client";

import { useEffect, useState } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Input } from "./Input";
import { ArrowIcon, CheckIcon, CloseIcon } from "./icons";

/** Largo IA — Booking modal. Honeypot anti-spam, client-side success state. */
export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
        aria-label="Réservez votre appel découverte"
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
          aria-label="Fermer"
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
              Demande envoyée !
            </h3>
            <p style={{ color: "var(--muted)" }}>
              Merci. Guillaume vous recontacte sous 24 h ouvrées pour caler votre
              appel découverte.
            </p>
            <Button variant="ghost" onClick={onClose}>
              Fermer
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const hp = new FormData(e.currentTarget).get("website");
              if (hp) return; // honeypot caught a bot
              setSent(true);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Badge tone="neutral" dot>
                Appel découverte · 30 min · gratuit
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
                Réservez votre appel
              </h3>
            </div>
            <Input label="Nom" id="bk-nom" name="nom" placeholder="Votre nom" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Input
                label="Entreprise"
                id="bk-ent"
                name="entreprise"
                placeholder="Votre société"
              />
              <Input
                label="Taille d'équipe"
                id="bk-size"
                name="taille"
                placeholder="ex. 8"
              />
            </div>
            <Input
              label="Email professionnel"
              id="bk-email"
              name="email"
              type="email"
              required
              placeholder="vous@entreprise.fr"
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
              Demander un créneau
            </Button>
            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              Vos données ne servent qu&apos;à vous recontacter (RGPD). Aucune
              newsletter.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
