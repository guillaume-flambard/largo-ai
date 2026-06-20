import { ImageResponse } from "next/og";

// Largo IA — image de partage social (Open Graph + Twitter).
// Reprend le système de marque : encre, un seul ocre, motif horizon/soleil.
export const alt = "Largo IA — Prenez le large avec l'IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A222E",
          color: "#EEF2F6",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "30px",
            fontWeight: 600,
            color: "#E69A3C",
          }}
        >
          <div style={{ display: "flex", width: "40px", height: "4px", background: "#E69A3C", borderRadius: "2px" }} />
          Formation IA · TPE &amp; PME
        </div>

        {/* Titre */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "104px",
            lineHeight: 1.02,
            letterSpacing: "-3px",
            color: "#EEF2F6",
          }}
        >
          <div style={{ display: "flex" }}>Prenez le large</div>
          <div style={{ display: "flex" }}>
            avec l&apos;<span style={{ color: "#E69A3C" }}>IA</span>.
          </div>
        </div>

        {/* Horizon : filet + soleil, + wordmark */}
        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div style={{ display: "flex", alignItems: "center", height: "56px" }}>
            <div
              style={{
                display: "flex",
                width: "56px",
                height: "56px",
                borderRadius: "999px",
                background: "#E69A3C",
              }}
            />
            <div style={{ display: "flex", flex: 1, height: "2px", background: "rgba(238,242,246,0.18)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "28px", color: "#9AA7B6" }}>
            <div style={{ display: "flex", fontSize: "34px", fontWeight: 700, color: "#EEF2F6" }}>
              Largo&nbsp;<span style={{ color: "#E69A3C" }}>IA</span>
            </div>
            <div style={{ display: "flex" }}>100 % en visio · sans jargon · conforme AI Act</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
