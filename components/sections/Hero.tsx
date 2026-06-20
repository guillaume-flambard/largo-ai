import { Badge } from "../Badge";
import { Button } from "../Button";
import { Card } from "../Card";
import { ReserveButton } from "../ReserveButton";
import { Stat } from "../Stat";
import { AlertIcon, ArrowIcon, CheckIcon, SparkleIcon } from "../icons";

const benefits = [
  "Rédiger et répondre 2× plus vite, sans perdre votre ton",
  "Créer contenus et visuels marketing en autonomie",
  "Automatiser les tâches répétitives du quotidien",
  "Utiliser l'IA en restant conforme (RGPD, AI Act)",
];

export function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--bg)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/wave-divider.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 200,
          opacity: 0.9,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "84px var(--gutter) 96px",
          position: "relative",
        }}
      >
        <div
          className="grid-hero"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <Badge tone="neutral" dot>
              Organisme de formation IA · TPE / PME
            </Badge>
            <h1
              style={{
                fontSize: "var(--fs-display)",
                fontWeight: 800,
                letterSpacing: "var(--ls-tight)",
                lineHeight: 1.04,
                color: "var(--navy)",
              }}
            >
              Prenez le large
              <br />
              avec l&apos;IA.
            </h1>
            <p
              style={{
                fontSize: "var(--fs-lead)",
                color: "var(--muted)",
                lineHeight: 1.55,
                maxWidth: "44ch",
                textWrap: "pretty",
              }}
            >
              Formez vos dirigeants et vos équipes à l&apos;IA générative, en
              visio, sans jargon — des résultats concrets dès la première
              semaine.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <ReserveButton variant="primary" size="lg" iconRight={<ArrowIcon />}>
                Réserver un appel découverte
              </ReserveButton>
              <Button variant="ghost" size="lg" href="#offres">
                Voir les formations
              </Button>
            </div>
            <div style={{ display: "flex", gap: 36, marginTop: 8, flexWrap: "wrap" }}>
              <Stat value="100 %" label="En visio" accent />
              <Stat value="3h30" label="Pour démarrer" />
              <Stat value="AI Act" label="& RGPD inclus" />
            </div>
          </div>

          <Card
            hover={false}
            style={{
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-lg)",
              padding: "32px 30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    display: "inline-flex",
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: "var(--surface-tint-teal)",
                    color: "var(--teal-dark)",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 auto",
                  }}
                >
                  <SparkleIcon />
                </span>
                <h3
                  style={{
                    fontSize: "var(--fs-h3)",
                    fontWeight: 800,
                    color: "var(--navy)",
                  }}
                >
                  Ce que vos équipes savent faire après
                </h3>
              </div>
              {benefits.map((b) => (
                <div
                  key={b}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <span
                    style={{ color: "var(--teal)", marginTop: 2, flex: "0 0 auto" }}
                  >
                    <CheckIcon />
                  </span>
                  <span style={{ fontSize: "var(--fs-body)", color: "var(--text-body)" }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function AiActBanner() {
  return (
    <div style={{ background: "var(--navy)", color: "var(--text-on-dark)" }}>
      <div
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          padding: "20px var(--gutter)",
          display: "flex",
          alignItems: "center",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 42,
            height: 42,
            flex: "0 0 auto",
            borderRadius: "var(--radius-md)",
            background: "rgba(242,166,90,0.18)",
            color: "var(--amber)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AlertIcon />
        </span>
        <p
          style={{
            fontSize: "var(--fs-body)",
            color: "var(--text-on-dark)",
            flex: 1,
            minWidth: 260,
          }}
        >
          <strong style={{ fontWeight: 700 }}>AI Act :</strong> depuis 2025,
          former vos équipes à l&apos;IA devient une obligation — premières
          sanctions dès août 2026. Mettez-vous en conformité dès maintenant.
        </p>
        <a
          href="#contact"
          style={{
            fontSize: "var(--fs-sm)",
            fontWeight: 700,
            color: "var(--amber)",
            whiteSpace: "nowrap",
          }}
        >
          En savoir plus →
        </a>
      </div>
    </div>
  );
}
