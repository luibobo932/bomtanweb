"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { VideoEmbed } from "@/components/video-embed";
import { agents, quickFilters, type VideoItem } from "@/data/mock-data";

const feedFilters = ["Tất cả", ...quickFilters, "Kiến thức"];

function isVideoMatched(video: VideoItem, filter: string) {
  if (filter === "Tất cả") {
    return true;
  }

  if (filter === "Kiến thức") {
    return video.contentType === "kien_thuc";
  }

  if (filter === "Quận 1" || filter === "Quận 3" || filter === "Quận 5" || filter === "Quận 10") {
    return video.districtTag === filter;
  }

  if (filter === "Dưới 15 tỷ") {
    return video.priceTag.includes("8-10") || video.priceTag.includes("14") || video.priceTag.includes("Guide");
  }

  return video.houseTypeTag === filter || video.title.includes(filter) || video.summary.includes(filter);
}

function VerifiedBadge() {
  return (
    <span className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
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

function SkeletonCard() {
  return (
    <div className="rounded-[20px] border border-zinc-900 bg-[#111111] p-4 animate-pulse">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-zinc-800" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-1/3 rounded bg-zinc-800" />
          <div className="h-2.5 w-1/4 rounded bg-zinc-800" />
        </div>
      </div>
      <div
        className="mb-3 w-full rounded-xl bg-zinc-800"
        style={{ aspectRatio: "9/16", maxHeight: "280px" }}
      />
      <div className="space-y-2">
        <div className="h-3 w-3/4 rounded bg-zinc-800" />
        <div className="h-3 w-1/2 rounded bg-zinc-800" />
      </div>
    </div>
  );
}

function FeedCard({ video }: { video: VideoItem }) {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const agent = agents.find((item) => item.slug === video.reviewerSlug);
  const isVerified = (agent?.followCount ?? 0) > 100000;

  return (
    <article className="overflow-hidden rounded-[20px] border border-zinc-800 bg-[#111111]">
      <div className="flex items-center gap-3 border-b border-zinc-900 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
          {video.reviewerName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center text-sm font-semibold text-white">
            <span className="truncate">{video.reviewerName}</span>
            {isVerified ? <VerifiedBadge /> : null}
          </div>
          <div className="text-xs text-zinc-500">
            {video.contentType === "review_nha" ? "Review nhà" : "Kiến thức"}
          </div>
        </div>
        <div className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
          {video.viewCountLabel} views
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-xl bg-zinc-900"
        style={{ aspectRatio: "9/16", maxHeight: "65vh" }}
      >
        <VideoEmbed video={video} />
      </div>

      <div className="px-4 py-4">
        <h3
          className="text-base font-semibold leading-6 text-white"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">📍 {video.districtTag}</span>
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">💰 {video.priceTag}</span>
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">{video.houseTypeTag}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <button
              onClick={() => {
                setLiked((value) => !value);
                setAnimating(true);
              }}
              onAnimationEnd={() => setAnimating(false)}
              className={`${animating ? "animate-like" : ""} ${liked ? "text-orange-500" : ""} transition-colors`}
            >
              ♥ {video.likeCountLabel}
            </button>
            <button className="transition-colors hover:text-white">💬 {video.commentCountLabel}</button>
            <button className="transition-colors hover:text-white">↗ {video.shareCountLabel}</button>
          </div>

          <Link
            href={video.listingSlug ? `/nha-ban/${video.listingSlug}` : "/gui-nhu-cau"}
            className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
          >
            Xem nhà →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VideoFeedSection({ videos }: { videos: VideoItem[] }) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
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

  const resetFilter = () => setActiveFilter("Tất cả");

  return (
    <>
      <section className="container-shell mt-4 pb-10">
        <div className="mb-4 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2">
            {feedFilters.map((item) => {
              const active = activeFilter === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-transparent bg-orange-600 font-semibold text-white"
                      : "border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {active ? (
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-white" />
                  ) : null}
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-4 text-5xl">🎬</div>
            <h3 className="mb-2 text-base font-semibold">Chưa có video cho bộ lọc này</h3>
            <p className="mb-4 text-sm text-zinc-500">Thử chọn quận khác hoặc xem tất cả video</p>
            <button
              onClick={resetFilter}
              className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm text-white transition-colors hover:bg-orange-700"
            >
              Xem tất cả video
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredVideos.map((video) => (
              <FeedCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>

      {showScrollTop ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
        >
          ↑
        </button>
      ) : null}
    </>
  );
}
