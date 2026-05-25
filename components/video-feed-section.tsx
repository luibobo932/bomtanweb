"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { SkeletonFeedCard } from "@/components/skeleton";
import { VideoEmbed } from "@/components/video-embed";
import { agents, quickFilters, type VideoItem } from "@/data/mock-data";

const feedFilters = ["Tất cả", ...quickFilters, "Kiến thức"];

function isVideoMatched(video: VideoItem, filter: string) {
  if (filter === "Tất cả") return true;
  if (filter === "Kiến thức") return video.contentType === "kien_thuc";
  if (["Quận 1", "Quận 3", "Quận 5", "Quận 10"].includes(filter)) return video.districtTag === filter;
  if (filter === "Dưới 15 tỷ") {
    return video.priceTag.includes("8-10") || video.priceTag.includes("14") || video.priceTag.includes("Guide");
  }
  return video.houseTypeTag === filter || video.title.includes(filter) || video.summary.includes(filter);
}

function VerifiedBadge() {
  return (
    <span className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]">
      <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function FeedCard({ video }: { video: VideoItem }) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const agent = agents.find((item) => item.slug === video.reviewerSlug);
  const isVerified = (agent?.followCount ?? 0) > 100000;

  return (
    <article className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--s2)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
          {video.reviewerName.split(" ").map((p) => p[0]).join("").slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center text-sm font-semibold text-white">
            <span className="truncate">{video.reviewerName}</span>
            {isVerified && <VerifiedBadge />}
          </div>
          <div className="text-xs text-zinc-500">
            {video.contentType === "review_nha" ? "Review nhà" : "Kiến thức"}
          </div>
        </div>
        <div className="rounded-[var(--r-full)] bg-[var(--s1)] px-2.5 py-1 text-xs text-zinc-400">
          {video.viewCountLabel} views
        </div>
      </div>

      {/* Video */}
      <div
        className="relative w-full overflow-hidden bg-[var(--s5)]"
        style={{ aspectRatio: "9/16", maxHeight: "65vh" }}
      >
        <VideoEmbed video={video} />
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white">
          {video.title}
        </h3>

        {/* Chips — dùng class hệ thống */}
        <div className="chip-row mt-3">
          <span className="chip">📍 {video.districtTag}</span>
          <span className="chip">💰 {video.priceTag}</span>
          <span className="chip">{video.houseTypeTag}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <button
              type="button"
              onClick={() => { setLiked((v) => !v); setAnimating(true); }}
              onAnimationEnd={() => setAnimating(false)}
              className={`${animating ? "animate-like" : ""} ${liked ? "text-[var(--brand)]" : ""} transition-colors`}
            >
              ♥ {video.likeCountLabel}
            </button>
            <button type="button" className="transition-colors hover:text-white">
              💬 {video.commentCountLabel}
            </button>
            <button type="button" className="transition-colors hover:text-white">
              ↗ {video.shareCountLabel}
            </button>
          </div>

          <Link
            href={video.listingSlug ? `/nha-ban/${video.listingSlug}` : "/gui-nhu-cau"}
            className="primary-btn primary-btn--sm"
          >
            Xem nhà →
          </Link>
        </div>
      </div>
    </article>
  );
}

const PAGE_SIZE = 6;

export function VideoFeedSection({ videos }: { videos: VideoItem[] }) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredVideos = useMemo(
    () => videos.filter((video) => isVideoMatched(video, activeFilter)),
    [activeFilter, videos],
  );

  const visibleVideos = filteredVideos.slice(0, page * PAGE_SIZE);
  const hasMore = visibleVideos.length < filteredVideos.length;

  const resetFilter = () => { setActiveFilter("Tất cả"); setPage(1); };

  return (
    <>
      <section className="container-shell mt-4 pb-10">
        {/* Filter pills */}
        <div className="mb-4 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2">
            {feedFilters.map((item) => {
              const active = activeFilter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => { setActiveFilter(item); setPage(1); }}
                  className={`rounded-[var(--r-full)] px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-[var(--brand)] font-semibold text-white"
                      : "border border-[var(--border)] bg-[var(--s1)] text-zinc-300 hover:border-[var(--brand)] hover:text-white"
                  }`}
                >
                  {active && (
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-4">
            <SkeletonFeedCard />
            <SkeletonFeedCard />
            <SkeletonFeedCard />
          </div>
        ) : filteredVideos.length === 0 ? (
          <EmptyState
            icon="🎬"
            title="Chưa có video cho bộ lọc này"
            description="Thử chọn quận khác hoặc xem tất cả video"
            action={
              <button type="button" className="primary-btn" onClick={resetFilter}>
                Xem tất cả video
              </button>
            }
          />
        ) : (
          <>
            <div className="grid gap-4">
              {visibleVideos.map((video) => (
                <FeedCard key={video.id} video={video} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="secondary-btn flex items-center gap-2"
                >
                  Xem thêm {Math.min(PAGE_SIZE, filteredVideos.length - visibleVideos.length)} video ↓
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--s3)] text-white transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          ↑
        </button>
      )}
    </>
  );
}
