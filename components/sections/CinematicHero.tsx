"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "../Button";
import { ReserveButton } from "../ReserveButton";
import { Magnetic } from "../motion/Magnetic";
import { ArrowIcon } from "../icons";
import type { Marketing } from "@/lib/marketing";

/** Largo IA — Hero « le large, au tempo lent ».
 *  Typographie ample, beaucoup d'air, un seul geste de couleur : le soleil
 *  ocre qui se lève sur le filet d'horizon. Le contenu est visible par
 *  défaut ; GSAP ne fait qu'orchestrer une arrivée calme. */
export function CinematicHero({ copy }: { copy: Marketing["hero"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out", duration: 1.1 },
        });
        tl.from(".hero-line > span", {
          yPercent: 115,
          stagger: 0.12,
          duration: 1.2,
        })
          .from(
            ".hero-fade",
            { y: 18, autoAlpha: 0, stagger: 0.12, duration: 0.9 },
            "-=0.7",
          )
          .from(
            ".hero-horizon-line",
            { scaleX: 0, transformOrigin: "left center", duration: 1.3 },
            "-=0.9",
          )
          .from(
            ".hero-sun",
            { y: 26, scale: 0.4, autoAlpha: 0, duration: 1.1 },
            "-=0.9",
          );

        // Le soleil dérive très légèrement au scroll du hero.
        gsap.to(".hero-sun", {
          y: -22,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label={`${copy.titleBefore}${copy.titleEmphasis}${copy.titleAfter}`}
      style={{ paddingBlock: "clamp(7rem, 5rem + 9vw, 12rem) 0" }}
    >
      <div className="container">
        <span className="kicker hero-fade">{copy.kicker}</span>

        <h1
          className="display"
          style={{ margin: "clamp(20px, 3vw, 32px) 0 0", maxWidth: "16ch" }}
        >
          <span
            className="hero-line"
            style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}
          >
            <span style={{ display: "block" }}>
              {copy.titleBefore}
              <span
                style={{
                  fontWeight: 600,
                  borderBottom: "0.06em solid var(--sun)",
                  paddingBottom: "0.04em",
                }}
              >
                {copy.titleEmphasis}
              </span>
              {copy.titleAfter}
            </span>
          </span>
        </h1>

        <p
          className="lead hero-fade"
          style={{ margin: "clamp(22px, 3vw, 34px) 0 0", maxWidth: "48ch" }}
        >
          {copy.lead}
        </p>

        <div
          className="hero-fade"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 24px",
            alignItems: "center",
            margin: "clamp(28px, 4vw, 44px) 0 0",
          }}
        >
          <Magnetic>
            <ReserveButton variant="primary" size="lg" iconRight={<ArrowIcon />}>
              {copy.ctaPrimary}
            </ReserveButton>
          </Magnetic>
          <a href="#offres" className="link-underline">
            {copy.ctaSecondary}
          </a>
        </div>

        {/* Horizon : le filet se trace, le soleil se lève. */}
        <div
          aria-hidden
          style={{
            position: "relative",
            marginTop: "clamp(4.5rem, 4rem + 6vw, 9rem)",
            paddingTop: "clamp(2rem, 6vw, 5rem)",
          }}
        >
          <div
            className="hero-sun"
            style={{
              position: "absolute",
              left: "clamp(0px, 4vw, 56px)",
              bottom: 0,
              width: "clamp(52px, 6vw, 88px)",
              height: "clamp(52px, 6vw, 88px)",
              borderRadius: "999px",
              background: "var(--sun)",
              boxShadow: "0 0 26px 0 rgba(230,154,60,0.12)",
            }}
          />
          <div
            className="hero-horizon-line"
            style={{ height: 1, background: "var(--line-strong)" }}
          />
          <div
            className="hero-fade"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 28px",
              marginTop: 20,
              fontSize: "var(--fs-sm)",
              color: "var(--muted-ink)",
              fontWeight: 500,
            }}
          >
            {copy.proof.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
