import type { ReactNode } from "react";
import { Reveal } from "./motion/Reveal";

/** Inner-page header: a restrained kicker, a light ample title, a lead, and
 *  the horizon rule that runs through the whole site. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section style={{ background: "var(--paper)" }}>
      <div
        className="container"
        style={{ padding: "clamp(8rem, 6rem + 8vw, 12rem) var(--gutter) clamp(2.5rem, 4vw, 4rem)" }}
      >
        <Reveal as="div" stagger={0.1}>
          <span
            className="kicker"
            style={{ display: "inline-flex", marginBottom: 24 }}
          >
            {eyebrow}
          </span>
          <h1
            className="display"
            style={{
              fontSize: "var(--fs-h1)",
              fontWeight: "var(--fw-light)",
              letterSpacing: "var(--ls-display)",
              maxWidth: "18ch",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="lead"
              style={{ maxWidth: "60ch", marginTop: 22 }}
            >
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
      <div className="container">
        <div className="horizon" aria-hidden>
          <span className="horizon__sun" />
        </div>
      </div>
    </section>
  );
}
