import { SiteShell } from "@/components/site-shell";
import { VideoFeedSection } from "@/components/video-feed-section";
import { getPublicVideos } from "@/lib/video-repository";
import { resolveTikTokEmbedUrl } from "@/lib/tiktok-oembed";

export default async function FeedPage() {
  const rawVideos = await getPublicVideos();

  const videos = await Promise.all(
    rawVideos.map(async (video) => {
      if (
        video.videoSourceType !== "tiktok" ||
        video.embedUrl ||
        video.embedCode?.includes("tiktok-embed")
      ) {
        return video;
      }
      const embedUrl = await resolveTikTokEmbedUrl(video.videoUrl);
      return embedUrl ? { ...video, embedUrl } : video;
    }),
  );

  return (
    <SiteShell>
      <section className="container-shell pt-10 md:pt-14">
        <div className="editorial-panel p-6 md:p-8">
          <div className="section-kicker">Video review</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Xem nhà thật trước khi quyết định — nhanh như lướt TikTok
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Lọc theo quận, giá, loại nhà — bấm vào video nào ưng là xem ngay hồ sơ căn đó.
          </p>
        </div>
      </section>

      <VideoFeedSection videos={videos} />
    </SiteShell>
  );
}
