"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "bomtan_wishlist";

function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function WishlistButton({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getWishlist().includes(slug));
  }, [slug]);

  function toggle() {
    const list = getWishlist();
    const next = list.includes(slug)
      ? list.filter((s) => s !== slug)
      : [...list, slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={saved ? "Bỏ lưu" : "Lưu vào danh sách xem sau"}
      className={`secondary-btn flex items-center gap-2 transition-colors ${
        saved
          ? "border-[var(--brand)] text-[var(--brand)]"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      {saved ? "♥" : "♡"}{" "}
      <span className="hidden sm:inline">
        {saved ? "Đã lưu" : "Lưu xem sau"}
      </span>
    </button>
  );
}
