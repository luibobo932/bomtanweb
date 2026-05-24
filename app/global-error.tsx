"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="vi">
      <body
        style={{
          background: "#0a0a0a",
          color: "#f5f5f0",
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "1.5rem",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <div style={{ fontSize: "3rem", fontWeight: 900, color: "#d84e1e" }}>!</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 900, margin: 0 }}>
          Ung dung gap loi nghiem trong
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#a1a1aa", maxWidth: 400, lineHeight: 1.7 }}>
          Co su co khong mong muon. Vui long tai lai trang hoac lien he ho tro.
        </p>
        <button
          type="button"
          style={{
            background: "#d84e1e",
            color: "#fff",
            border: "none",
            borderRadius: "1rem",
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={reset}
        >
          Thu lai
        </button>
      </body>
    </html>
  );
}
