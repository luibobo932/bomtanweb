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

const statusClassMap: Record<ListingItem["status"], string> = {
  con_ban: "bg-[#1d9e75] text-white",
  dang_thuong_luong: "bg-[#ef9f27] text-white",
  da_ban: "bg-zinc-600 text-white",
  ngung_ban: "bg-zinc-700 text-white",
};

export function ListingCard({ listing }: { listing: ListingItem }) {
  const price = parsePriceTy(listing.priceLabel);
  const area = parseAreaM2(listing.areaLabel);
  const pricePerM2 = area > 0 && price > 0 ? (price / area).toFixed(2) : null;

  return (
    <article className="group overflow-hidden rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--s3)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-lg hover:shadow-black/30">
      <Link href={`/nha-ban/${listing.slug}`} className="block">
        {/* Thumbnail area */}
        <div className="relative aspect-[4/3] bg-[var(--s5)]">
          {/* Status badge */}
          <div
            className={`absolute left-2.5 top-2.5 rounded-[var(--r-xs)] px-2 py-0.5 text-[10px] font-bold ${statusClassMap[listing.status]}`}
          >
            {statusMap[listing.status]}
          </div>
          {/* House type badge */}
          <div className="absolute right-2.5 top-2.5 rounded-[var(--r-xs)] bg-black/70 px-2 py-0.5 text-[10px] text-white">
            {listing.houseType}
          </div>
          {/* Thumbnail or placeholder */}
          {listing.thumbnailUrl ? (
            <Image
              src={listing.thumbnailUrl}
              alt={listing.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl text-zinc-700">
              ⌂
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Price row */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-[17px] font-extrabold text-[var(--brand)]">
              {listing.priceLabel}
            </div>
            {pricePerM2 && (
              <div className="text-[11px] text-zinc-500">
                ~{pricePerM2} tỷ/m²
              </div>
            )}
          </div>

          {/* Address */}
          <div className="mt-1 truncate text-[12px] font-medium text-zinc-300">
            {listing.street},{" "}
            <span className="text-zinc-500">{listing.district}</span>
          </div>

          {/* Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-[var(--r-xs)] bg-[var(--s5)] px-2 py-0.5 text-[11px] text-zinc-400">
              📐 {listing.areaLabel}
            </span>
            <span className="rounded-[var(--r-xs)] bg-[var(--s5)] px-2 py-0.5 text-[11px] text-zinc-400">
              {listing.dimensions}
            </span>
            <span className="rounded-[var(--r-xs)] bg-[var(--s5)] px-2 py-0.5 text-[11px] text-zinc-400">
              {listing.layout.split(",")[0]}
            </span>
          </div>

          {/* Manager */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)] text-[9px] font-bold text-white">
                {listing.managerName
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <span className="text-[11px] text-zinc-500">
                {listing.managerName}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[var(--brand)] opacity-0 transition-opacity group-hover:opacity-100">
              Xem →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
