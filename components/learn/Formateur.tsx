"use client";

import type { ReactNode } from "react";
import { useRole } from "./RoleContext";
import { Msi } from "@/components/sections/saas-ui";

/** Zone réservée au formateur (déroulé, timing, questions fréquentes…).
 *  Ne rend rien hors « mode formateur ». Carte indigo pointillée (refonte SaaS). */
export function Formateur({ children }: { children: ReactNode }) {
  const { formateur } = useRole();
  if (!formateur) return null;

  return (
    <aside
      style={{
        margin: "24px 0",
        borderRadius: 14,
        background: "rgba(99,102,241,0.08)",
        border: "1px dashed #6366f1",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          font: "600 13px var(--font-display)",
          color: "#6d6df5",
          marginBottom: 8,
        }}
      >
        <Msi size={20}>co_present</Msi>
        Note formateur · animation
      </div>
      <div style={{ color: "var(--ink-2)", lineHeight: 1.64, fontSize: 15 }}>
        {children}
      </div>
    </aside>
  );
}
