import { ImageResponse } from "next/og";

export const alt = "CodeSharePro — Instant Code & Text Sharing";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06080c 0%, #0b111a 40%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 10,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "64px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f8fafc",
              }}
            >
              CodeShare
            </span>
            <span
              style={{
                fontSize: "64px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #60a5fa, #2dd4bf)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Pro
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "26px",
              color: "#94a3b8",
              fontWeight: 400,
              margin: 0,
            }}
          >
            Paste once. Share anywhere. No signup required.
          </p>
        </div>

        {/* URL at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
          }}
        >
          <span style={{ color: "#64748b", fontSize: "15px", fontWeight: 500 }}>
            codesharepro.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
