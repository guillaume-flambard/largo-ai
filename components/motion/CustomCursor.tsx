"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * A subtle trailing ring that follows the pointer and grows over interactive
 * elements. Purely additive — the native cursor stays visible, so the pointer
 * can never "disappear". Only active on fine-pointer, non-reduced-motion
 * devices.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const ring = ringRef.current!;
        gsap.set(ring, { autoAlpha: 0 });

        const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

        let shown = false;
        const show = () => {
          if (shown) return;
          shown = true;
          gsap.to(ring, { autoAlpha: 1, duration: 0.3 });
        };
        const onMove = (e: MouseEvent) => {
          show();
          ringX(e.clientX);
          ringY(e.clientY);
        };

        const interactive = "a, button, summary, input, textarea, [data-cursor]";
        const onOver = (e: MouseEvent) => {
          if ((e.target as Element)?.closest?.(interactive)) {
            gsap.to(ring, { scale: 1.8, borderColor: "var(--green)", duration: 0.3 });
          }
        };
        const onOut = (e: MouseEvent) => {
          if ((e.target as Element)?.closest?.(interactive)) {
            gsap.to(ring, { scale: 1, borderColor: "var(--teal)", duration: 0.3 });
          }
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        return () => {
          window.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseover", onOver);
          document.removeEventListener("mouseout", onOut);
        };
      },
    );
    return () => mm.revert();
  });

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
