"use client";

import { useState } from "react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const zaloUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500">Chia sẻ:</span>
      <a
        href={fbUrl}
        target="_blank"
        rel="noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#2e2e28] bg-[#141414] text-[13px] text-zinc-400 transition hover:border-[var(--brand)] hover:text-white"
        aria-label="Chia sẻ Facebook"
      >
        f
      </a>
      <a
        href={zaloUrl}
        target="_blank"
        rel="noreferrer"
        className="flex h-8 items-center justify-center rounded-[8px] border border-[#2e2e28] bg-[#141414] px-2 text-[11px] font-bold text-zinc-400 transition hover:border-[var(--brand)] hover:text-white"
        aria-label="Chia sẻ Zalo"
      >
        Zalo
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-8 items-center justify-center rounded-[8px] border border-[#2e2e28] bg-[#141414] px-2.5 text-[11px] text-zinc-400 transition hover:border-[var(--brand)] hover:text-white"
      >
        {copied ? "Đã copy ✓" : "Copy link"}
      </button>
    </div>
  );
}
