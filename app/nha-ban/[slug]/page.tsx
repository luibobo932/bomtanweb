import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";
import { ShareButtons } from "@/components/share-buttons";
import { SiteShell } from "@/components/site-shell";
import { WishlistButton } from "@/components/wishlist-button";
import { getListingBySlug, getPublicListings } from "@/lib/listing-repository";
import { getPublicVideos } from "@/lib/video-repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return {};

  const title = `${listing.title} — ${listing.district} | ${listing.priceLabel}`;
  const description = [
    listing.heroNote,
    `Diện tích: ${listing.dimensions}.`,
    listing.advantages.slice(0, 2).join(". "),
  ]
    .filter(Boolean)
    .join(" ");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com";
  const url = `${siteUrl}/nha-ban/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: listing.title }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: url },
  };
}

const statusMap: Record<string, { label: string; color: string }> = {
  con_ban: { label: "Còn bán", color: "bg-[#1d9e75] text-white" },
  dang_thuong_luong: { label: "Đang thương lượng", color: "bg-[#ef9f27] text-white" },
  da_ban: { label: "Đã bán", color: "bg-zinc-600 text-white" },
  ngung_ban: { label: "Ngừng bán", color: "bg-zinc-700 text-white" },
};

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) notFound();

  const listings = await getPublicListings();
  const relatedVideos = (await getPublicVideos()).filter(
    (item) => item.listingSlug === slug,
  );
  const similarListings = listings
    .filter((item) => item.slug !== slug && item.district === listing.district)
    .slice(0, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com";
  const pageUrl = `${siteUrl}/nha-ban/${slug}`;
  const status = statusMap[listing.status] ?? { label: listing.status, color: "bg-zinc-700 text-white" };

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    url: pageUrl,
    description: listing.heroNote,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.street,
      addressLocality: listing.district,
      addressRegion: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    offers: {
      "@type": "Offer",
      price: listing.priceLabel,
      priceCurrency: "VND",
      availability:
        listing.status === "con_ban"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <div className="container-wide py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">Trang chủ</Link>
          <span>/</span>
          <Link href="/nha-ban" className="hover:text-zinc-300">Nhà đang bán</Link>
          <span>/</span>
          <span className="text-zinc-400">{listing.district}</span>
        </nav>

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          {/* ─── Main content ─── */}
          <div className="min-w-0">
            {/* Hero */}
            <div className="editorial-panel overflow-hidden p-6 md:p-8">
              {/* Title row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="section-kicker">{listing.id}</div>
                  <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
                    {listing.title}
                  </h1>
                </div>
                <span className={`mt-1 shrink-0 rounded-[var(--r-full)] px-3 py-1 text-sm font-semibold ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <p className="mt-3 text-base leading-7 text-zinc-400">
                {listing.heroNote}
              </p>

              {/* Chips */}
              <div className="chip-row mt-4">
                <span className="chip">📍 {listing.district}</span>
                <span className="chip">🏘 {listing.street}</span>
                <span className="chip">{listing.houseType}</span>
                <span className="chip">📐 {listing.areaLabel}</span>
              </div>

              {/* Share + Wishlist */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ShareButtons title={listing.title} url={pageUrl} />
                <WishlistButton slug={listing.slug} title={listing.title} />
              </div>

              {/* Key metrics */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s5)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Giá chào
                  </div>
                  <div className="mt-1.5 text-2xl font-black text-white">
                    {listing.priceLabel}
                  </div>
                </div>
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s5)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Diện tích
                  </div>
                  <div className="mt-1.5 text-2xl font-black text-white">
                    {listing.dimensions}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500">{listing.areaLabel}</div>
                </div>
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s5)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Pháp lý
                  </div>
                  <div className="mt-1.5 text-sm font-bold text-white">
                    {listing.legal}
                  </div>
                </div>
              </div>
            </div>

            {/* Detail grid */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Hồ sơ căn nhà */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-6">
                <div className="section-kicker">Hồ sơ căn nhà</div>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    ["Địa chỉ", `${listing.street}, ${listing.ward}, ${listing.district}`],
                    ["Kết cấu", listing.layout],
                    ["Loại nhà", listing.houseType],
                    ["Pháp lý", listing.legal],
                    ["Hiện trạng", listing.occupancy],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="w-24 shrink-0 text-zinc-500">{label}</dt>
                      <dd className="text-zinc-300">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Phù hợp cho */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-6">
                <div className="section-kicker">Căn nhà này hợp ai?</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {listing.suitableFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-[var(--r-full)] border border-[var(--brand)]/40 bg-[var(--brand)]/10 px-3 py-1 text-sm text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 rounded-[var(--r-md)] bg-[var(--s5)] p-4">
                  <div className="text-xs text-zinc-500">Tình trạng thuê</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {listing.occupancy}
                  </div>
                </div>
              </div>

              {/* Ưu điểm */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-6">
                <div className="section-kicker">Ưu điểm chốt nhanh</div>
                <ul className="mt-4 space-y-2.5">
                  {listing.advantages.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 text-[var(--brand)]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lưu ý */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-6">
                <div className="section-kicker">Lưu ý khi dẫn khách</div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{listing.caution}</p>
              </div>
            </div>

            {/* Video liên quan */}
            <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-6">
              <div className="section-kicker">Video review liên quan</div>
              <div className="mt-4 space-y-3">
                {relatedVideos.length > 0 ? (
                  relatedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--s5)] p-4"
                    >
                      <div className="font-bold text-white">{video.title}</div>
                      <div className="mt-1.5 text-sm leading-6 text-zinc-400">
                        {video.summary}
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                        <span>👁 {video.viewCountLabel}</span>
                        <span>♥ {video.likeCountLabel}</span>
                        <span>💬 {video.commentCountLabel}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--s5)] p-4 text-sm text-zinc-500">
                    Chưa có video review gắn listing này.{" "}
                    <Link href="/feed" className="text-[var(--brand)] hover:underline">
                      Xem tất cả video →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Sticky sidebar ─── */}
          <aside className="hidden xl:block">
            <div className="sticky top-6 space-y-4">
              {/* CTA card */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Giá chào
                </div>
                <div className="text-3xl font-black text-[var(--brand)]">
                  {listing.priceLabel}
                </div>
                <div className="mt-1 text-sm text-zinc-500">
                  {listing.dimensions} · {listing.areaLabel}
                </div>

                <div className="mt-4 space-y-2.5">
                  <Link
                    href="/gui-nhu-cau"
                    className="primary-btn block w-full text-center"
                  >
                    Đăng ký xem nhà
                  </Link>
                  <Link
                    href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_URL?.replace(/\D/g, "") ?? ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-btn block w-full text-center"
                  >
                    Nhắn Zalo ngay
                  </Link>
                </div>
              </div>

              {/* Agent card */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Người phụ trách
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                    {listing.managerName
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{listing.managerName}</div>
                    <div className="text-xs text-zinc-500">Chuyên gia BomTan</div>
                  </div>
                </div>
                <Link
                  href={`/doi-ngu/${listing.managerSlug}`}
                  className="secondary-btn mt-4 block w-full text-center text-sm"
                >
                  Xem hồ sơ chuyên gia
                </Link>
              </div>

              {/* Quick info */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5">
                <dl className="space-y-3 text-sm">
                  {[
                    ["📍 Quận", listing.district],
                    ["🏠 Loại", listing.houseType],
                    ["📜 Pháp lý", listing.legal],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-2">
                      <dt className="text-zinc-500">{label}</dt>
                      <dd className="text-right text-zinc-300">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile CTA (shown below main content on small screens) */}
        <div className="mt-6 flex flex-wrap gap-3 xl:hidden">
          <Link href="/gui-nhu-cau" className="primary-btn flex-1 text-center">
            Đăng ký xem nhà
          </Link>
          <Link
            href={`/doi-ngu/${listing.managerSlug}`}
            className="secondary-btn flex-1 text-center"
          >
            Liên hệ người phụ trách
          </Link>
        </div>

        {/* Căn tương tự */}
        {similarListings.length > 0 && (
          <section className="mt-16">
            <div className="mb-2 section-kicker">Căn tương tự</div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Thêm hàng cùng khu vực để so sánh nhanh
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarListings.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
