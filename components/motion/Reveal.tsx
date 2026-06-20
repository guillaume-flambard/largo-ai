"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered entrance. Content is fully visible without JS / under
 * prefers-reduced-motion — the animation only enhances.
 *
 * Pass `stagger` to animate the element's direct children in sequence.
 */
export function Reveal({
  children,
  as: Tag = "div",
  y = 28,
  delay = 0,
  stagger,
  duration = 0.8,
  start = "top 85%",
  className,
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current!;
        const targets = stagger ? (el.children as unknown as Element[]) : el;
        // fromTo + immediateRender:false: elements stay at their visible
        // default until the trigger actually fires. If it never fires
        // (headless render, background tab, slow JS), content stays visible
        // instead of shipping blank — the reveal only ever enhances.
        gsap.fromTo(
          targets,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration,
            delay,
            ease: "expo.out",
            stagger: stagger ?? 0,
            immediateRender: false,
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
