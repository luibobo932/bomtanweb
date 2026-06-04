import Link from "next/link";
import type { VideoItem } from "@/data/mock-data";
import { formatDuration } from "@/lib/video-utils";

export function HomeVideoStrip({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="video-scroll-row">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={video.listingSlug ? `/nha-ban/${video.listingSlug}` : "/feed"}
          className="home-video-card block"
        >
          <div className="home-video-thumb">
            {/* Badges */}
            <div className="absolute left-2 top-2 z-10 rounded-full bg-[var(--brand)] px-2 py-0.5 text-[9px] font-bold text-white">
              {video.contentType === "review_nha" ? "Review" : "KT"}
            </div>
            <div className="absolute bottom-2 right-2 z-10 rounded-full bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-sm">
              {formatDuration(video.durationSeconds)}
            </div>

            {/* Thumbnail or play placeholder */}
            {video.thumbnailUrl ? (
              <>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/20">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                      <polygon points="4,2 14,8 4,14" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-b from-[var(--s4)] to-[var(--s3)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand)]/80 ring-1 ring-[var(--brand)]/30">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                    <polygon points="4,2 14,8 4,14" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="p-3">
            <h3 className="line-clamp-2 text-[12px] font-semibold leading-[1.4] text-white">
              {video.title}
            </h3>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)] text-[8px] font-bold text-white">
                  {video.reviewerName[0]}
                </div>
                <div className="text-[10px] text-zinc-500">{video.reviewerName.split(" ").slice(-1)[0]}</div>
              </div>
              <div className="text-[10px] text-zinc-500">{video.priceTag}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
