import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";
import { SiteShell } from "@/components/site-shell";
import { getListingBySlug, getPublicListings } from "@/lib/listing-repository";
import { getPublicVideos } from "@/lib/video-repository";

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

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Gia chao</div>
                  <div className="mt-2 text-3xl font-black text-white">{listing.priceLabel}</div>
                </div>
                <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Dien tich</div>
                  <div className="mt-2 text-2xl font-black text-white">{listing.dimensions}</div>
                </div>
                <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                    Nguoi phu trach
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
                  <div className="mt-2 text-3xl font-black">Can nha nay hop ai</div>
                </div>
                <div className="dark-pill text-sm font-bold">{listing.status}</div>
              </div>

              <div className="relative z-10 mt-8 space-y-4">
                <div className="rounded-[28px] bg-white/10 p-5">
                  <div className="text-sm text-white/64">Phu hop</div>
                  <div className="mt-2 text-lg font-bold">{listing.suitableFor.join(" - ")}</div>
                </div>
                <div className="rounded-[28px] bg-white/10 p-5">
                  <div className="text-sm text-white/64">Phap ly</div>
                  <div className="mt-2 text-lg font-bold">{listing.legal}</div>
                </div>
                <div className="rounded-[28px] bg-white/10 p-5">
                  <div className="text-sm text-white/64">Tinh trang thue</div>
                  <div className="mt-2 text-lg font-bold">{listing.occupancy}</div>
                </div>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                <Link
                  href="/gui-nhu-cau"
                  className="secondary-btn border-white/18 bg-white/10 text-white"
                >
                  Dang ky xem nha
                </Link>
                <Link
                  href={`/doi-ngu/${listing.managerSlug}`}
                  className="secondary-btn border-white/18 bg-white/10 text-white"
                >
                  Mo Zalo nguoi phu trach
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Ho so can nha</div>
                <div className="mt-4 grid gap-4 text-sm leading-7 text-zinc-300">
                  <div>
                    Dia chi: {listing.street}, {listing.ward}, {listing.district}
                  </div>
                  <div>Ket cau: {listing.layout}</div>
                  <div>Loai nha: {listing.houseType}</div>
                  <div>Phap ly: {listing.legal}</div>
                  <div>Hien trang thue: {listing.occupancy}</div>
                </div>
              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Uu diem chot nhanh</div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                  {listing.advantages.map((item) => (
                    <div key={item}>- {item}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Luu y khi dan khach</div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">{listing.caution}</p>
              </div>

              <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
                <div className="section-kicker">Video lien quan</div>
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
                      Chua co video review gan listing nay.
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
            <div className="section-kicker">Can tuong tu</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Them hang cung khu vuc de so sanh nhanh
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
