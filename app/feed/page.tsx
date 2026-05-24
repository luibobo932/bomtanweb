import { SiteShell } from "@/components/site-shell";
import { VideoFeedSection } from "@/components/video-feed-section";
import { getPublicVideos } from "@/lib/video-repository";

export default async function FeedPage() {
  const videos = await getPublicVideos();

  return (
    <SiteShell>
      <section className="container-shell px-1 py-5">
        <div className="rounded-[16px] border border-zinc-900 bg-[#0d0d0d] px-4 py-5">
          <div className="section-kicker">Feed video</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Xem review nhà phố như TikTok, nhưng chốt lead theo logic CRM
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Lướt video, lọc nhanh theo quận và mở ngay hồ sơ căn nhà phù hợp.
          </p>
        </div>
      </section>

      <VideoFeedSection videos={videos} />
    </SiteShell>
  );
}
