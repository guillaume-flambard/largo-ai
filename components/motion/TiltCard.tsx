"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Pointer-driven 3D tilt. No-op on coarse pointers / reduced motion.
 */
export function TiltCard({
  children,
  max = 7,
  className,
  style,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(el, { transformPerspective: 900 });
          const rotX = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });
          const rotY = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });

          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rotY(px * max * 2);
            rotX(-py * max * 2);
          };
          const onLeave = () => {
            rotX(0);
            rotY(0);
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          };
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}
