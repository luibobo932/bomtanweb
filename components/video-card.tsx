import Link from "next/link";
import { VideoEmbed } from "@/components/video-embed";
import type { VideoItem } from "@/data/mock-data";
import { formatDuration } from "@/lib/video-utils";

const sourceLabel: Record<VideoItem["videoSourceType"], string> = {
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  cdn: "CDN",
};

export function VideoCard({ video, featured = false }: { video: VideoItem; featured?: boolean }) {
  return (
    <article
      className={`glass-card overflow-hidden rounded-[32px] ${
        featured ? "grid gap-0 xl:grid-cols-[1.02fr_0.98fr]" : ""
      }`}
    >
      <div className={`video-stage ${featured ? "xl:min-h-[620px]" : "min-h-[420px]"}`}>
        <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
          <div className="dark-pill text-xs font-bold uppercase tracking-[0.18em]">
            {video.contentType === "review_nha" ? "Review nhà" : "Kiến thức"}
          </div>
          <div className="dark-pill text-sm font-bold">{formatDuration(video.durationSeconds)}</div>
        </div>

        <div className={`relative h-full ${featured ? "xl:min-h-[620px]" : "min-h-[420px]"}`}>
          <VideoEmbed video={video} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />
        </div>

        <div className="absolute inset-x-5 bottom-5 z-10 space-y-3 text-white">
          <div className="chip-row">
            <span className="chip border-white/10 bg-white/10 text-white">{video.districtTag}</span>
            <span className="chip border-white/10 bg-white/10 text-white">{video.houseTypeTag}</span>
            <span className="chip border-white/10 bg-white/10 text-white">{video.priceTag}</span>
          </div>
          <h3 className="max-w-lg text-2xl font-black leading-tight md:text-3xl">{video.title}</h3>
          <p className="max-w-md text-sm leading-6 text-white/78">{video.summary}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgba(189,84,40,0.2),rgba(214,171,104,0.34))] text-lg font-black text-[var(--brand)]">
              {video.reviewerName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="text-lg font-black text-white">{video.reviewerName}</div>
              <div className="text-sm text-zinc-400">
                {video.streetTag} - {video.districtTag}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-zinc-800 bg-zinc-950 p-5">
            <div className="section-kicker">Nguồn video</div>
            <div className="mt-3 text-xl font-black text-white">{sourceLabel[video.videoSourceType]}</div>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Video được nhúng trực tiếp từ {sourceLabel[video.videoSourceType]} — xem mượt mà
              mà không cần lưu file lớn trên server.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Bước tiếp theo</div>
              <div className="mt-2 font-semibold text-white">
                Xem hồ sơ căn nhà và liên hệ Zalo ngay
              </div>
            </div>
            <div className="rounded-[22px] border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">Nguồn lead</div>
              <div className="mt-2 font-semibold text-white">Video · Listing · Profile</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {video.listingSlug ? (
            <Link href={`/nha-ban/${video.listingSlug}`} className="primary-btn">
              Xem hồ sơ căn nhà
            </Link>
          ) : (
            <a href={video.videoUrl} target="_blank" rel="noreferrer" className="primary-btn">
              Mở video gốc
            </a>
          )}
          <Link href={`/doi-ngu/${video.reviewerSlug}`} className="secondary-btn">
            Xem profile chuyên gia
          </Link>
        </div>
      </div>
    </article>
  );
}
