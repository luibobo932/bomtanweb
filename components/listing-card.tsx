import Link from "next/link";
import type { ListingItem } from "@/data/mock-data";

const statusMap: Record<ListingItem["status"], string> = {
  con_ban: "Con ban",
  dang_thuong_luong: "Dang TL",
  da_ban: "Da ban",
  ngung_ban: "Ngung",
};

const statusClassMap: Record<ListingItem["status"], string> = {
  con_ban: "bg-[#1d9e75] text-white",
  dang_thuong_luong: "bg-[#ef9f27] text-white",
  da_ban: "bg-zinc-600 text-white",
  ngung_ban: "bg-zinc-700 text-white",
};

export function ListingCard({ listing }: { listing: ListingItem }) {
  return (
    <article className="overflow-hidden rounded-[10px] border border-[#2e2e28] bg-[#141414] transition hover:border-[var(--brand)]">
      <Link href={`/nha-ban/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-[#1e1e1e]">
          <div className={`absolute left-2 top-2 rounded-[4px] px-2 py-1 text-[10px] font-semibold ${statusClassMap[listing.status]}`}>
            {statusMap[listing.status]}
          </div>
          <div className="absolute right-2 top-2 rounded-[4px] bg-black/70 px-2 py-1 text-[9px] text-white">
            {listing.houseType}
          </div>
          <div className="flex h-full items-center justify-center text-3xl text-zinc-500">⌂</div>
        </div>

        <div className="p-3">
          <div className="text-[16px] font-bold text-[var(--brand)]">{listing.priceLabel}</div>
          <div className="mt-1 truncate text-[11px] text-zinc-300">
            {listing.street}, {listing.district}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-[4px] bg-[#1e1e1e] px-2 py-0.5 text-[10px] text-[var(--faint)]">
              {listing.dimensions}
            </span>
            <span className="rounded-[4px] bg-[#1e1e1e] px-2 py-0.5 text-[10px] text-[var(--faint)]">
              {listing.areaLabel}
            </span>
            <span className="rounded-[4px] bg-[#1e1e1e] px-2 py-0.5 text-[10px] text-[var(--faint)]">
              {listing.layout.split(",")[0]}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
