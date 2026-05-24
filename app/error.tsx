"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-5xl font-black text-[var(--brand)]">!</div>
      <h2 className="text-2xl font-black">Co loi xay ra</h2>
      <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
        Trang nay gap su co khong mong muon. Vui long thu lai hoac lien he ho tro.
      </p>
      <button
        type="button"
        className="rounded-2xl bg-[var(--brand)] px-6 py-3 text-sm font-bold text-white"
        onClick={reset}
      >
        Thu lai
      </button>
    </div>
  );
}
