import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NhàPhốSG — Video review nhà phố trung tâm Sài Gòn";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a05 60%, #2d0e06 100%)",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(216,78,30,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(216,78,30,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Brand dot */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 64,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,78,30,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#d84e1e",
              borderRadius: 8,
              padding: "5px 14px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            NhàPhốSG
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          Video review{" "}
          <span style={{ color: "#d84e1e" }}>nhà phố</span>
          {" "}trung tâm Sài Gòn
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            color: "#a1a1aa",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          Q1 · Q3 · Q5 · Q10 · Dưới 20 tỷ · Kiến thức mua nhà
        </div>

        {/* Domain */}
        <div
          style={{
            marginTop: 36,
            fontSize: 18,
            color: "#52525b",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          nhaphosg.com
        </div>
      </div>
    ),
    { ...size },
  );
}
