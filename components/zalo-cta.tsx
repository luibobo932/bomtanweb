"use client";

import { useState } from "react";

const ZALO_URL =
  process.env.NEXT_PUBLIC_ZALO_URL ?? "https://zalo.me/0000000000";

export function ZaloCta() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={ZALO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Liên hệ qua Zalo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full shadow-lg transition-all duration-200"
      style={{
        background: "linear-gradient(135deg,#0068ff,#0050cc)",
        padding: hovered ? "0.6rem 1rem 0.6rem 0.85rem" : "0.6rem",
      }}
    >
      {/* Zalo icon SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.15" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill="white"
          fontFamily="Arial, sans-serif"
          letterSpacing="-0.5"
        >
          Z
        </text>
      </svg>

      <span
        className="overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-200"
        style={{
          maxWidth: hovered ? "120px" : "0px",
          opacity: hovered ? 1 : 0,
        }}
      >
        Chat Zalo ngay
      </span>

      {/* Pulse ring */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 0 0 rgba(0,104,255,0.5)",
          animation: "zalo-pulse 2s ease-out infinite",
        }}
      />

      <style>{`
        @keyframes zalo-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(0,104,255,0.45); }
          70%  { box-shadow: 0 0 0 12px rgba(0,104,255,0);   }
          100% { box-shadow: 0 0 0 0   rgba(0,104,255,0);    }
        }
      `}</style>
    </a>
  );
}
