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
  const initials = video.reviewerName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <article
      className={`glass-card overflow-hidden rounded-[20px] ${
        featured ? "grid gap-0 xl:grid-cols-[1.02fr_0.98fr]" : ""
      }`}
    >
      {/* Video pane */}
      <div className={`video-stage ${featured ? "xl:min-h-[620px]" : "min-h-[420px]"}`}>
        {/* Top overlays */}
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
          <div className="rounded-full border border-white/[0.15] bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
            {video.contentType === "review_nha" ? "Review nhà" : "Kiến thức"}
          </div>
          <div className="rounded-full border border-white/[0.12] bg-black/60 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md">
            {formatDuration(video.durationSeconds)}
          </div>
        </div>

        {/* Embed */}
        <div className={`relative h-full ${featured ? "xl:min-h-[620px]" : "min-h-[420px]"}`}>
          <VideoEmbed video={video} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        </div>

        {/* Bottom overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 space-y-2.5 text-white">
          <div className="flex flex-wrap gap-1.5">
            {[video.districtTag, video.houseTypeTag, video.priceTag].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.16] bg-white/[0.10] px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="max-w-lg text-[22px] font-black leading-tight tracking-[-0.02em] md:text-[28px]">
            {video.title}
          </h3>
          <p className="max-w-md text-[13px] leading-[1.6] text-white/70">{video.summary}</p>
        </div>
      </div>

      {/* Info pane */}
      <div className="flex flex-col justify-between gap-5 p-5 md:p-7">
        <div className="space-y-4">
          {/* Reviewer */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[rgba(232,92,30,0.25)] to-[rgba(200,100,50,0.15)] text-[15px] font-black text-[var(--brand)] ring-1 ring-[var(--brand)]/20">
              {initials}
            </div>
            <div>
              <div className="font-bold text-white">{video.reviewerName}</div>
              <div className="text-[12px] text-zinc-500">
                {video.streetTag} · {video.districtTag}
              </div>
            </div>
          </div>

          {/* Source info */}
          <div className="rounded-[14px] border border-[var(--border)] border-t-[var(--border-bright)] bg-[var(--s3)] p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--brand)]">
              Nguồn video
            </div>
            <div className="mt-1.5 text-[18px] font-black text-white">
              {sourceLabel[video.videoSourceType]}
            </div>
            <p className="mt-2 text-[12px] leading-[1.7] text-zinc-500">
              Video nhúng trực tiếp từ {sourceLabel[video.videoSourceType]} — xem mượt mà ngay trên trang.
            </p>
          </div>

          {/* Metric tiles */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-[12px] border border-[var(--border)] bg-[var(--s3)] p-3.5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                Bước tiếp theo
              </div>
              <div className="mt-1.5 text-[13px] font-semibold leading-snug text-white">
                Xem hồ sơ & liên hệ Zalo
              </div>
            </div>
            <div className="rounded-[12px] border border-[var(--border)] bg-[var(--s3)] p-3.5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                Nguồn lead
              </div>
              <div className="mt-1.5 text-[13px] font-semibold leading-snug text-white">
                Video · Listing · Profile
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2.5">
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
            Xem chuyên gia
          </Link>
        </div>
      </div>
    </article>
  );
}
