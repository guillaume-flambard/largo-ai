"use client";

import { useState } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Input } from "./Input";
import { ArrowIcon, CheckIcon } from "./icons";
import { buildContactMailto, CONTACT_EMAIL } from "@/lib/mailto";
import type { ContactFormCopy } from "@/lib/pages";

/** Contact form — client-side validation + success state, honeypot anti-spam.
 *  Front-end only: wire the submit to a Server Action / Resend before launch. */
export function ContactForm({ copy }: { copy: ContactFormCopy }) {
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
          {copy.sentTitle}
        </h2>
        <p style={{ color: "var(--ink-soft)", lineHeight: "var(--lh-relaxed)" }}>
          {copy.sentBody}
        </p>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--muted-ink)" }}>
          {copy.sentFallbackPre}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--sun-ink)", fontWeight: 600 }}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        if (fd.get("website")) return; // honeypot
        // Pas de backend : on ouvre la messagerie avec la demande pré-remplie.
        window.location.href = buildContactMailto(fd, "contact");
        setSent(true);
      }}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <Input label={copy.name} id="ct-nom" name="nom" placeholder={copy.namePh} required />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Input
          label={copy.company}
          id="ct-ent"
          name="entreprise"
          placeholder={copy.companyPh}
        />
        <Input
          label={copy.teamSize}
          id="ct-size"
          name="taille"
          placeholder={copy.teamSizePh}
        />
      </div>
      <Input
        label={copy.email}
        id="ct-email"
        name="email"
        type="email"
        required
        placeholder={copy.emailPh}
      />
      <Input
        as="textarea"
        label={copy.need}
        id="ct-besoin"
        name="besoin"
        placeholder={copy.needPh}
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
        {copy.submit}
      </Button>
      <p style={{ fontSize: "var(--fs-xs)", color: "var(--muted)" }}>
        {copy.privacy}
      </p>
      <Badge tone="neutral" dot>
        {copy.badge}
      </Badge>
    </form>
  );
}
