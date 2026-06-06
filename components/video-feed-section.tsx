"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { SkeletonFeedCard } from "@/components/skeleton";
import { VideoEmbed } from "@/components/video-embed";
import { agents, quickFilters, type ListingItem, type VideoItem } from "@/data/mock-data";

const feedFilters = ["Tất cả", ...quickFilters, "Kiến thức"];

function isVideoMatched(video: VideoItem, filter: string) {
  if (filter === "Tất cả") return true;
  if (filter === "Kiến thức") return video.contentType === "kien_thuc";
  if (["Quận 1", "Quận 3", "Quận 5", "Quận 10"].includes(filter))
    return video.districtTag === filter;
  if (filter === "Dưới 15 tỷ") {
    return (
      video.priceTag.includes("8-10") ||
      video.priceTag.includes("14") ||
      video.priceTag.includes("Guide")
    );
  }
  return (
    video.houseTypeTag === filter ||
    video.title.includes(filter) ||
    video.summary.includes(filter)
  );
}

function VerifiedBadge() {
  return (
    <span className="ml-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]">
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

function FeedCard({ video, listings }: { video: VideoItem; listings: ListingItem[] }) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [saved, setSaved] = useState(false);
  const agent = agents.find((item) => item.slug === video.reviewerSlug);
  const isVerified = (agent?.followCount ?? 0) > 100000;

  // Khi video gắn listing, hiển thị chips theo dữ liệu listing (nguồn sự thật)
  // để tránh lệch thông tin giữa video và bài đăng.
  const matchedListing = video.listingSlug
    ? listings.find((item) => item.slug === video.listingSlug)
    : undefined;
  const displayDistrict = matchedListing?.district ?? video.districtTag;
  const displayPrice = matchedListing?.priceLabel ?? video.priceTag;
  const displayType = matchedListing?.houseType ?? video.houseTypeTag;

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const list: string[] = JSON.parse(
        localStorage.getItem("bomtan_saved_videos") ?? "[]",
      );
      setSaved(list.includes(video.id));
    } catch {}
  }, [video.id]);

  function toggleSave() {
    try {
      const list: string[] = JSON.parse(
        localStorage.getItem("bomtan_saved_videos") ?? "[]",
      );
      const next = list.includes(video.id)
        ? list.filter((id) => id !== video.id)
        : [...list, video.id];
      localStorage.setItem("bomtan_saved_videos", JSON.stringify(next));
      setSaved(next.includes(video.id));
    } catch {}
  }

  return (
    <article className="overflow-hidden rounded-[20px] border border-[var(--border)] border-t-[var(--border-bright)] bg-gradient-to-b from-[var(--s3)] to-[var(--s2)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-deep)] text-[13px] font-bold text-white">
          {video.reviewerName
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center text-[13px] font-semibold text-white">
            <span className="truncate">{video.reviewerName}</span>
            {isVerified && <VerifiedBadge />}
          </div>
          <div className="text-[11px] text-zinc-500">
            {video.contentType === "review_nha" ? "Review nhà" : "Kiến thức"}
          </div>
        </div>
        <div className="rounded-full border border-[var(--border)] bg-[var(--s4)] px-2.5 py-1 text-[11px] text-zinc-500">
          {video.viewCountLabel} lượt xem
        </div>
      </div>

      {/* Video */}
      <div
        className="relative mx-auto w-full overflow-hidden bg-[var(--s5)]"
        style={{ aspectRatio: "9/16", maxWidth: "calc(65vh * 9 / 16)", minHeight: "320px" }}
      >
        <VideoEmbed video={video} />
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white">
          {video.title}
        </h3>

        {/* Chips */}
        <div className="chip-row mt-3">
          <span className="chip">{displayDistrict}</span>
          <span className="chip">{displayPrice}</span>
          <span className="chip">{displayType}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[13px] text-zinc-500">
            <button
              type="button"
              onClick={() => {
                setLiked((v) => !v);
                setAnimating(true);
              }}
              onAnimationEnd={() => setAnimating(false)}
              className={`flex items-center gap-1 transition-colors ${animating ? "animate-like" : ""} ${liked ? "text-[var(--brand)]" : "hover:text-white"}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M8 13.5S2 9.8 2 5.5A3.5 3.5 0 0 1 8 3a3.5 3.5 0 0 1 6 2c0 4.3-6 8-6 8z" />
              </svg>
              {video.likeCountLabel}
            </button>
            <button
              type="button"
              onClick={toggleSave}
              title={saved ? "Bỏ lưu video" : "Lưu video này"}
              className={`flex items-center gap-1 transition-colors ${saved ? "text-[var(--brand)]" : "hover:text-white"}`}
            >
              <svg width="13" height="14" viewBox="0 0 14 16" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2h10v13l-5-3-5 3V2z" />
              </svg>
              <span>{saved ? "Đã lưu" : "Lưu"}</span>
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

export function VideoFeedSection({
  videos,
  listings = [],
}: {
  videos: VideoItem[];
  listings?: ListingItem[];
}) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);

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

  function selectFilter(f: string) {
    setActiveFilter(f);
    setPage(1);
  }

  const resetFilter = () => selectFilter("Tất cả");

  return (
    <>
      <section className="container-shell mt-4 pb-10">
        {/* Filter pills */}
        <div
          ref={filterBarRef}
          className="sticky top-0 z-10 -mx-3 mb-4 overflow-x-auto bg-[var(--s1)] pb-2 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-max gap-2 px-3">
            {feedFilters.map((item) => {
              const active = activeFilter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectFilter(item)}
                  className={`rounded-[var(--r-full)] px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-[var(--brand)] font-semibold text-white"
                      : "border border-[var(--border)] bg-[var(--s3)] text-zinc-300 hover:border-[var(--brand)] hover:text-white"
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

        {/* Video count */}
        {!isLoading && (
          <p className="mb-3 text-sm text-zinc-500">
            <span className="font-semibold text-white">{filteredVideos.length}</span>{" "}
            video
            {activeFilter !== "Tất cả" && (
              <button
                type="button"
                onClick={resetFilter}
                className="ml-2 text-xs text-[var(--brand)] hover:underline"
              >
                Xóa bộ lọc
              </button>
            )}
          </p>
        )}

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
                <FeedCard key={video.id} video={video} listings={listings} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="secondary-btn flex items-center gap-2"
                >
                  Xem thêm{" "}
                  {Math.min(PAGE_SIZE, filteredVideos.length - visibleVideos.length)}{" "}
                  video ↓
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
          className="fixed bottom-20 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--s3)] text-white transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          ↑
        </button>
      )}
    </>
  );
}
