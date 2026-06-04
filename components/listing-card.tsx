import Image from "next/image";
import Link from "next/link";
import type { ListingItem } from "@/data/mock-data";
import { parseAreaM2, parsePriceTy } from "@/lib/filter-utils";

const statusMap: Record<ListingItem["status"], string> = {
  con_ban: "Còn bán",
  dang_thuong_luong: "Đang TL",
  da_ban: "Đã bán",
  ngung_ban: "Ngừng",
};

const statusStyleMap: Record<ListingItem["status"], string> = {
  con_ban: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  dang_thuong_luong: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  da_ban: "bg-zinc-600/20 text-zinc-400 border-zinc-600/20",
  ngung_ban: "bg-zinc-700/20 text-zinc-500 border-zinc-700/20",
};

export function ListingCard({ listing }: { listing: ListingItem }) {
  const price = parsePriceTy(listing.priceLabel);
  const area = parseAreaM2(listing.areaLabel);
  const pricePerM2 = area > 0 && price > 0 ? (price / area).toFixed(1) : null;

  const initials = listing.managerName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="group relative overflow-hidden rounded-[16px] border border-[var(--border)] border-t-[var(--border-bright)] bg-gradient-to-b from-[var(--s3)] to-[var(--s2)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(232,92,30,0.30)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(232,92,30,0.08)]">
      <Link href={`/nha-ban/${listing.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--s5)]">
          {/* Status badge */}
          <div
            className={`absolute left-2.5 top-2.5 z-10 rounded-full border px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm ${statusStyleMap[listing.status]}`}
          >
            {statusMap[listing.status]}
          </div>
          {/* House type badge */}
          <div className="absolute right-2.5 top-2.5 z-10 rounded-full border border-white/[0.12] bg-black/60 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm">
            {listing.houseType}
          </div>
          {/* Thumbnail or placeholder */}
          {listing.thumbnailUrl ? (
            <>
              <Image
                src={listing.thumbnailUrl}
                alt={listing.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-zinc-700">
                <path d="M3 12L12 3l9 9v9H3v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5">
          {/* Price row */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-[18px] font-black tracking-[-0.02em] text-[var(--brand)]">
              {listing.priceLabel}
            </div>
            {pricePerM2 && (
              <div className="text-[11px] text-zinc-600">
                ~{pricePerM2} tỷ/m²
              </div>
            )}
          </div>

          {/* Address */}
          <div className="mt-1 truncate text-[12px] font-medium text-zinc-300">
            {listing.street},{" "}
            <span className="text-zinc-500">{listing.district}</span>
          </div>

          {/* Specs chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-[6px] border border-[var(--border)] bg-[var(--s4)] px-2 py-0.5 text-[11px] text-zinc-400">
              {listing.areaLabel}
            </span>
            <span className="rounded-[6px] border border-[var(--border)] bg-[var(--s4)] px-2 py-0.5 text-[11px] text-zinc-400">
              {listing.dimensions}
            </span>
            <span className="rounded-[6px] border border-[var(--border)] bg-[var(--s4)] px-2 py-0.5 text-[11px] text-zinc-400">
              {listing.layout.split(",")[0]}
            </span>
          </div>

          {/* Manager row */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)] text-[9px] font-bold text-white">
                {initials}
              </div>
              <span className="text-[11px] text-zinc-500">{listing.managerName}</span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--brand)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              Xem →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
