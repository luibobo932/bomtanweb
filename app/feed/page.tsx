import { SiteShell } from "@/components/site-shell";
import { VideoFeedSection } from "@/components/video-feed-section";
import { getPublicVideos } from "@/lib/video-repository";
import { resolveTikTokEmbedUrl } from "@/lib/tiktok-oembed";

export default async function FeedPage() {
  const rawVideos = await getPublicVideos();

  const videos = await Promise.all(
    rawVideos.map(async (video) => {
      if (video.videoSourceType !== "tiktok" || video.embedUrl) {
        return video;
      }
      const embedUrl = await resolveTikTokEmbedUrl(video.videoUrl);
      return embedUrl ? { ...video, embedUrl } : video;
    }),
  );

  return (
    <SiteShell>
      <section className="container-shell px-4 pt-10 md:pt-14">
        <div className="editorial-panel p-6 md:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand)]">
            Video review
          </div>
          <h1 className="mt-2 text-[24px] font-black tracking-[-0.03em] text-white md:text-[30px]">
            Xem nhà thật trước khi quyết định
          </h1>
          <p className="mt-2 text-[14px] leading-[1.7] text-zinc-400">
            Lọc theo quận, giá, loại nhà — bấm vào video nào ưng là xem ngay hồ sơ căn đó.
          </p>
        </div>
      </section>

      <VideoFeedSection videos={videos} />
    </SiteShell>
  );
}
