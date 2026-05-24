import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";
import { ShareButtons } from "@/components/share-buttons";
import { SiteShell } from "@/components/site-shell";
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

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const listings = await getPublicListings();
  const relatedVideos = (await getPublicVideos()).filter((item) => item.listingSlug === slug);
  const similarListings = listings.filter(
    (item) => item.slug !== slug && item.district === listing.district,
  );

  return (
    <SiteShell>
      <section className="container-shell pt-10 md:pt-14">
        <div className="editorial-panel overflow-hidden p-6 md:p-8 xl:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="section-kicker">{listing.id}</div>
              <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                {listing.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">{listing.heroNote}</p>

              <div className="chip-row mt-6">
                <span className="chip">{listing.district}</span>
                <span className="chip">{listing.street}</span>
                <span className="chip">{listing.houseType}</span>
                <span className="chip">{listing.areaLabel}</span>
              </div>

              <div className="mt-5">
                <ShareButtons
                  title={listing.title}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com"}/nha-ban/${listing.slug}`}
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Giá chào</div>
                  <div className="mt-2 text-3xl font-black text-white">{listing.priceLabel}</div>
                </div>
                <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Diện tích</div>
                  <div className="mt-2 text-2xl font-black text-white">{listing.dimensions}</div>
                </div>
                <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                    Người phụ trách
                  </div>
                  <div className="mt-2 text-2xl font-black text-white">{listing.managerName}</div>
                </div>
              </div>
            </div>

            <div className="video-stage min-h-[520px] p-6 text-white">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/62">
                    Video / lead action
                  </div>
                  <div className="mt-2 text-3xl font-black">Căn nhà này hợp ai?</div>
                </div>
                <div className="dark-pill text-sm font-bold">
                  {{ con_ban: "Còn bán", dang_thuong_luong: "Đang TL", da_ban: "Đã bán", ngung_ban: "Ngừng" }[listing.status] ?? listing.status}
                </div>
              </div>

              <div className="relative z-10 mt-8 space-y-4">
                <div className="rounded-[28px] bg-white/10 p-5">
                  <div className="text-sm text-white/64">Phù hợp cho</div>
                  <div className="mt-2 text-lg font-bold">{listing.suitableFor.join(" - ")}</div>
                </div>
                <div className="rounded-[28px] bg-white/10 p-5">
                  <div className="text-sm text-white/64">Pháp lý</div>
                  <div className="mt-2 text-lg font-bold">{listing.legal}</div>
                </div>
                <div className="rounded-[28px] bg-white/10 p-5">
                  <div className="text-sm text-white/64">Tình trạng thuê</div>
                  <div className="mt-2 text-lg font-bold">{listing.occupancy}</div>
                </div>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                <Link
                  href="/gui-nhu-cau"
                  className="secondary-btn border-white/18 bg-white/10 text-white"
                >
                  Đăng ký xem nhà
                </Link>
                <Link
                  href={`/doi-ngu/${listing.managerSlug}`}
                  className="secondary-btn border-white/18 bg-white/10 text-white"
                >
                  Liên hệ người phụ trách
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Hồ sơ căn nhà</div>
                <div className="mt-4 grid gap-4 text-sm leading-7 text-zinc-300">
                  <div>
                    Địa chỉ: {listing.street}, {listing.ward}, {listing.district}
                  </div>
                  <div>Kết cấu: {listing.layout}</div>
                  <div>Loại nhà: {listing.houseType}</div>
                  <div>Pháp lý: {listing.legal}</div>
                  <div>Hiện trạng thuê: {listing.occupancy}</div>
                </div>
              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Ưu điểm chốt nhanh</div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                  {listing.advantages.map((item) => (
                    <div key={item}>- {item}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Lưu ý khi dẫn khách</div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{listing.caution}</p>
              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Video liên quan</div>
                <div className="mt-4 space-y-4">
                  {relatedVideos.length > 0 ? (
                    relatedVideos.map((video) => (
                      <div
                        key={video.id}
                        className="rounded-[22px] border border-zinc-800 bg-black/30 p-4"
                      >
                        <div className="font-black text-white">{video.title}</div>
                        <div className="mt-2 text-sm leading-7 text-zinc-400">{video.summary}</div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[22px] border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-400">
                      Chưa có video review gắn listing này.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Căn tương tự</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Thêm hàng cùng khu vực để so sánh nhanh
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {similarListings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
