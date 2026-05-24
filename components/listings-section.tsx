"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/listing-card";
import type { ListingItem } from "@/data/mock-data";

const PAGE_SIZE = 9;

const FILTERS = [
  { label: "Tất cả", match: () => true },
  { label: "Quận 1",   match: (l: ListingItem) => l.district === "Quận 1" },
  { label: "Quận 3",   match: (l: ListingItem) => l.district === "Quận 3" },
  { label: "Quận 5",   match: (l: ListingItem) => l.district === "Quận 5" },
  { label: "Quận 10",  match: (l: ListingItem) => l.district === "Quận 10" },
  { label: "Dưới 15 tỷ", match: (l: ListingItem) => {
    const n = parseFloat(l.priceLabel.replace(/[^\d.]/g, ""));
    return !isNaN(n) && n < 15;
  }},
  { label: "15–30 tỷ", match: (l: ListingItem) => {
    const n = parseFloat(l.priceLabel.replace(/[^\d.]/g, ""));
    return !isNaN(n) && n >= 15 && n <= 30;
  }},
  { label: "Hẻm xe hơi", match: (l: ListingItem) =>
    l.houseType?.toLowerCase().includes("hẻm") ||
    l.advantages?.some((a) => a.toLowerCase().includes("xe hơi")) },
  { label: "Mặt tiền", match: (l: ListingItem) =>
    l.houseType?.toLowerCase().includes("mặt tiền") ||
    l.advantages?.some((a) => a.toLowerCase().includes("mặt tiền")) },
];

export function ListingsSection({ listings }: { listings: ListingItem[] }) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const f = FILTERS.find((item) => item.label === activeFilter);
    return f ? listings.filter(f.match) : listings;
  }, [activeFilter, listings]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  function selectFilter(label: string) {
    setActiveFilter(label);
    setPage(1);
  }

  return (
    <>
      {/* Filter chips */}
      <div className="mt-6 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {FILTERS.map(({ label }) => {
            const active = activeFilter === label;
            return (
              <button
                key={label}
                onClick={() => selectFilter(label)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[var(--brand)] font-semibold text-white"
                    : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-4xl">🏠</div>
          <p className="text-zinc-400">Chưa có listing cho bộ lọc này.</p>
          <button
            onClick={() => selectFilter("Tất cả")}
            className="rounded-xl bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Xem tất cả
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {visible.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                Xem thêm {Math.min(PAGE_SIZE, filtered.length - visible.length)} căn ↓
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-zinc-600">
            Hiển thị {visible.length} / {filtered.length} căn
          </p>
        </>
      )}
    </>
  );
}
