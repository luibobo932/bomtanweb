import Link from "next/link";
import { HomeVideoStrip } from "@/components/home-video-strip";
import { ListingCard } from "@/components/listing-card";
import { SiteShell } from "@/components/site-shell";
import { stats } from "@/data/mock-data";
import { getPublicListings } from "@/lib/listing-repository";
import { getPublicVideos } from "@/lib/video-repository";

export default async function HomePage() {
  const videos = await getPublicVideos();
  const listings = await getPublicListings();
  const homeVideos = videos.slice(0, 4);
  const homeListings = listings.slice(0, 4);

  return (
    <SiteShell>
      <section className="container-shell">
        <div className="px-4 pb-5 pt-8 text-center">
          <h1 className="text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-white">
            Xem <span className="text-[var(--brand)]">video review</span> nha pho
            <br />
            trung tam Sai Gon
          </h1>
          <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-6 text-zinc-400">
            Nen tang video BDS dau tien chuyen nha pho Q1, Q3, Q5, Q10
            <br />
            duoi 20 ty tu doi ngu chuyen gia va profile moi gioi that.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/feed" className="primary-btn">
              Xem video ngay
            </Link>
            <Link href="/nha-ban" className="secondary-btn">
              Tim nha phu hop
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[8px] border border-[#2e2e28] bg-[#1e1e1e] px-4 py-2 text-center"
              >
                <div className="text-[18px] font-bold text-[var(--brand)]">{item.value}</div>
                <div className="text-[11px] text-[var(--faint)]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="px-4 pb-3">
          <div className="section-header-row">
            <div>
              <div className="section-mini-title">🎬 Video moi nhat</div>
              <div className="section-mini-subtitle">Review nha thuc te, kien thuc BDS</div>
            </div>
            <Link href="/feed" className="see-all-link">
              Xem tat ca →
            </Link>
          </div>
        </section>

        <section className="px-4">
          <HomeVideoStrip videos={homeVideos} />
        </section>

        <section className="px-4 pb-3 pt-6">
          <div className="section-header-row">
            <div>
              <div className="section-mini-title">🏠 Nha dang ban</div>
              <div className="section-mini-subtitle">Cap nhat lien tuc</div>
            </div>
            <Link href="/nha-ban" className="see-all-link">
              Xem tat ca →
            </Link>
          </div>
        </section>

        <section className="px-4">
          <div className="home-listing-grid">
            {homeListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <section className="px-4 pb-8 pt-6">
          <div className="cta-banner p-5">
            <div className="text-[18px] font-semibold text-white">Ban nha? Gui thong tin ngay</div>
            <p className="mt-2 text-[13px] text-zinc-300">
              Doi ngu chung toi se lien he xac minh va tu van trong 2 gio lam viec.
            </p>
            <div className="mt-4">
              <Link href="/gui-nha-ban" className="secondary-btn border-[rgba(255,255,255,0.12)] bg-transparent text-white">
                Gui thong tin →
              </Link>
            </div>
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
