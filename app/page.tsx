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
      {/* ── Hero ── */}
      <section className="container-shell">
        <div className="relative overflow-hidden px-4 pb-8 pt-12 text-center md:pt-16">
          {/* Glow background */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--brand)] opacity-[0.06] blur-[120px]" />

          <div className="relative">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#2e2e28] bg-[#141414] px-4 py-1.5 text-[12px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              Nền tảng video BDS đầu tiên tại TP.HCM
            </div>

            <h1 className="mx-auto max-w-3xl text-[36px] font-black leading-[1.15] tracking-[-0.04em] text-white md:text-[52px] lg:text-[60px]">
              Xem{" "}
              <span className="text-[var(--brand)]">video review nhà phố</span>
              <br className="hidden md:block" />
              {" "}trước khi xuống tiền
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-zinc-400 md:text-[16px]">
              Q1 · Q3 · Q5 · Q10 — Dưới 20 tỷ · Đội ngũ chuyên gia review thực tế,
              không quảng cáo, không che giấu nhược điểm.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/feed" className="primary-btn primary-btn--lg">
                Xem video ngay →
              </Link>
              <Link href="/gui-nhu-cau" className="secondary-btn secondary-btn--lg">
                Tư vấn miễn phí
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[10px] border border-[#2e2e28] bg-[#141414] px-5 py-3 text-center"
                >
                  <div className="text-[22px] font-black text-[var(--brand)]">{item.value}</div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-[#2e2e28] bg-[#0d0d0d]">
        <div className="container-shell px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] text-zinc-500">
            <span className="flex items-center gap-2"><span className="text-[var(--brand)]">✓</span> Review thực tế, không tô vẽ</span>
            <span className="flex items-center gap-2"><span className="text-[var(--brand)]">✓</span> Pháp lý minh bạch</span>
            <span className="flex items-center gap-2"><span className="text-[var(--brand)]">✓</span> Chuyên gia có kinh nghiệm 10+ năm</span>
            <span className="flex items-center gap-2"><span className="text-[var(--brand)]">✓</span> Tư vấn miễn phí, không ép mua</span>
          </div>
        </div>
      </section>

      {/* ── Video strip ── */}
      <section className="container-shell px-4 pb-3 pt-8">
        <div className="section-header-row">
          <div>
            <div className="section-mini-title">🎬 Video mới nhất</div>
            <div className="section-mini-subtitle">Review nhà thực tế, kiến thức BDS</div>
          </div>
          <Link href="/feed" className="see-all-link">Xem tất cả →</Link>
        </div>
      </section>

      <section className="px-4">
        <HomeVideoStrip videos={homeVideos} />
      </section>

      {/* ── Listings ── */}
      <section className="container-shell px-4 pb-3 pt-8">
        <div className="section-header-row">
          <div>
            <div className="section-mini-title">🏠 Nhà đang bán</div>
            <div className="section-mini-subtitle">Cập nhật liên tục</div>
          </div>
          <Link href="/nha-ban" className="see-all-link">Xem tất cả →</Link>
        </div>
      </section>

      <section className="px-4">
        <div className="home-listing-grid">
          {homeListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="container-shell px-4 pb-12 pt-8">
        <div className="relative overflow-hidden rounded-[24px] border border-[#2e2e28] bg-gradient-to-br from-[#1a0a04] to-[#0a0a0a] p-6 md:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[var(--brand)] opacity-[0.08] blur-[60px]" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">Chủ nhà chú ý</div>
              <div className="mt-2 text-[20px] font-black text-white md:text-[24px]">
                Bán nhà? Gửi thông tin ngay — miễn phí
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Đội ngũ sẽ liên hệ xác minh và tư vấn trong 2 giờ làm việc.
              </p>
            </div>
            <Link
              href="/gui-nha-ban"
              className="primary-btn shrink-0 !px-6 !py-3 !text-[15px]"
            >
              Đăng nhà cần bán →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
