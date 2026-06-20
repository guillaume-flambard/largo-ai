"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Counts from `from` to `to` when scrolled into view.
 * Static (shows the final value) under prefers-reduced-motion.
 */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  style,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { val: from };
        gsap.to(obj, {
          val: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(obj.val);
          },
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className} style={style}>
      {format(to)}
    </span>
  );
}
