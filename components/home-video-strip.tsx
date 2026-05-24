import Link from "next/link";
import type { VideoItem } from "@/data/mock-data";
import { formatDuration } from "@/lib/video-utils";

export function HomeVideoStrip({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="video-scroll-row">
      {videos.map((video) => (
        <article key={video.id} className="home-video-card">
          <div className="home-video-thumb">
            <div className="absolute left-2 top-2 rounded-[4px] bg-[var(--brand)] px-2 py-0.5 text-[10px] font-semibold text-white">
              {video.contentType === "review_nha" ? "Review" : "Kien thuc"}
            </div>
            <div className="absolute bottom-2 right-2 rounded-[3px] bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
              {formatDuration(video.durationSeconds)}
            </div>
            <div className="flex h-full items-center justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(216,78,30,0.92)] text-lg text-white">
                ▷
              </div>
            </div>
          </div>

          <div className="p-3">
            <h3 className="line-clamp-2 text-[12px] font-medium leading-[1.35] text-white">
              {video.title}
            </h3>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand)] text-[8px] font-bold text-white">
                  {video.reviewerName[0]}
                </div>
                <div className="text-[10px] text-[var(--faint)]">{video.reviewerName}</div>
              </div>
              <div className="text-[10px] text-[var(--faint)]">{video.priceTag}</div>
            </div>
            <div className="mt-3">
              <Link
                href={video.listingSlug ? `/nha-ban/${video.listingSlug}` : "/feed"}
                className="text-[11px] font-medium text-[var(--brand)]"
              >
                Xem chi tiet →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
