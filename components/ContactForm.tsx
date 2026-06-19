"use client";

import { useState } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Input } from "./Input";
import { ArrowIcon, CheckIcon } from "./icons";

/** Contact form — client-side validation + success state, honeypot anti-spam.
 *  Front-end only: wire the submit to a Server Action / Resend before launch. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "flex-start",
          padding: "8px 0",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 56,
            height: 56,
            borderRadius: "var(--radius-pill)",
            background: "var(--sun-wash)",
            color: "var(--sun-ink)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckIcon />
        </span>
        <h2
          style={{
            fontSize: "var(--fs-h3)",
            fontWeight: "var(--fw-light)",
            letterSpacing: "var(--ls-display)",
            color: "var(--ink)",
          }}
        >
          Message envoyé !
        </h2>
        <p style={{ color: "var(--muted)" }}>
          Merci. Guillaume vous recontacte sous 24 h ouvrées pour échanger sur
          votre projet.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (new FormData(e.currentTarget).get("website")) return; // honeypot
        setSent(true);
      }}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <Input label="Nom" id="ct-nom" name="nom" placeholder="Votre nom" required />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Input
          label="Entreprise"
          id="ct-ent"
          name="entreprise"
          placeholder="Votre société"
        />
        <Input
          label="Taille d'équipe"
          id="ct-size"
          name="taille"
          placeholder="ex. 8"
        />
      </div>
      <Input
        label="Email professionnel"
        id="ct-email"
        name="email"
        type="email"
        required
        placeholder="vous@entreprise.fr"
      />
      <Input
        as="textarea"
        label="Votre besoin"
        id="ct-besoin"
        name="besoin"
        placeholder="En quelques mots : vos objectifs, votre équipe, vos outils…"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />
      <Button variant="primary" type="submit" iconRight={<ArrowIcon />}>
        Envoyer ma demande
      </Button>
      <p style={{ fontSize: "var(--fs-xs)", color: "var(--muted)" }}>
        Vos données ne servent qu&apos;à vous recontacter (RGPD). Aucune
        newsletter, aucun partage.
      </p>
      <Badge tone="neutral" dot>
        Réponse sous 24 h ouvrées
      </Badge>
    </form>
  );
}
