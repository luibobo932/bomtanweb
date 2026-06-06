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
        <div className="relative overflow-hidden px-4 pb-10 pt-14 text-center md:pt-20">

          {/* Multi-layer ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[var(--brand)] opacity-[0.07] blur-[140px]" />
          <div className="pointer-events-none absolute left-[30%] top-[20%] h-[200px] w-[300px] rounded-full bg-[#4040ff] opacity-[0.03] blur-[80px]" />

          <div className="relative">
            {/* Badge */}
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-1.5 text-[12px] text-zinc-400 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              </span>
              Nền tảng video BDS đầu tiên tại TP.HCM
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-3xl text-[38px] font-black leading-[1.12] tracking-[-0.04em] text-white md:text-[54px] lg:text-[64px]">
              Xem{" "}
              <span className="brand-gradient-text">video review nhà phố</span>
              <br className="hidden md:block" />
              {" "}trước khi xuống tiền
            </h1>

            <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-[1.8] text-zinc-400 md:text-[16px]">
              Q1 · Q3 · Q5 · Q10 — Dưới 20 tỷ
              <br />
              Chuyên gia review thực tế, không tô vẽ, không che nhược điểm.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/feed" className="primary-btn primary-btn--lg">
                Xem video ngay →
              </Link>
              <Link href="/gui-nhu-cau" className="secondary-btn secondary-btn--lg">
                Tư vấn miễn phí
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[12px] border border-white/[0.08] border-t-white/[0.12] bg-white/[0.03] px-5 py-3.5 text-center backdrop-blur-sm"
                >
                  <div className="text-[24px] font-black tracking-tight brand-gradient-text">
                    {item.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="container-shell px-4 py-3.5">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[12px] text-zinc-500">
            {[
              "Review thực tế, không tô vẽ",
              "Pháp lý minh bạch",
              "Chuyên gia 10+ năm kinh nghiệm",
              "Tư vấn miễn phí, không ép mua",
            ].map((text) => (
              <span key={text} className="flex items-center gap-1.5">
                <span className="text-[var(--brand)] text-[10px]">✓</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video strip ── */}
      <section className="container-shell px-4 pb-3 pt-10">
        <div className="section-header-row">
          <div>
            <div className="section-mini-title">Video mới nhất</div>
            <div className="section-mini-subtitle">Review nhà thực tế, kiến thức BDS</div>
          </div>
          <Link href="/feed" className="see-all-link">Xem tất cả →</Link>
        </div>
      </section>

      <section className="px-4">
        <HomeVideoStrip videos={homeVideos} />
      </section>

      {/* ── Listings ── */}
      <section className="container-shell px-4 pb-3 pt-10">
        <div className="section-header-row">
          <div>
            <div className="section-mini-title">Nhà đang bán</div>
            <div className="section-mini-subtitle">Cập nhật liên tục từ đội ngũ</div>
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
      <section className="container-shell px-4 pb-14 pt-10">
        <div className="cta-banner relative overflow-hidden p-6 md:p-8">
          {/* Glow orb */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--brand)] opacity-[0.12] blur-[50px]" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
                Chủ nhà chú ý
              </div>
              <div className="mt-2 text-[20px] font-black text-white md:text-[23px] tracking-tight">
                Bán nhà? Gửi thông tin — miễn phí
              </div>
              <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                Đội ngũ liên hệ xác minh và tư vấn trong 2 giờ làm việc.
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
