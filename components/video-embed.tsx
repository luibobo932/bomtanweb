"use client";

import { useEffect, useState } from "react";
import type { VideoItem } from "@/data/mock-data";

type ResolvedEmbed = { embedUrl?: string } | null;

function useTikTokEmbed(video: VideoItem): ResolvedEmbed {
  const [resolved, setResolved] = useState<ResolvedEmbed>(null);

  const needsResolution =
    video.videoSourceType === "tiktok" && !video.embedUrl;

  useEffect(() => {
    if (!needsResolution) return;
    let cancelled = false;

    fetch(`/api/videos/tiktok-oembed?url=${encodeURIComponent(video.videoUrl)}`)
      .then((r) => r.json())
      .then((data: { embedUrl?: string }) => {
        if (!cancelled) setResolved(data);
      })
      .catch(() => {
        if (!cancelled) setResolved({});
      });

    return () => {
      cancelled = true;
    };
  }, [video.videoUrl, needsResolution]);

  return needsResolution ? resolved : null;
}

function TikTokPlayer({
  embedUrl,
  title,
  className,
}: {
  embedUrl: string;
  title: string;
  className: string;
}) {
  return (
    <iframe
      className={`h-full w-full border-0 ${className}`}
      src={`${embedUrl}?autoplay=1`}
      title={title}
      allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function TikTokClickToPlay({
  embedUrl,
  thumbnailUrl,
  title,
  className,
}: {
  embedUrl: string;
  thumbnailUrl: string;
  title: string;
  className: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <TikTokPlayer embedUrl={embedUrl} title={title} className={className} />;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Xem video: ${title}`}
      className={`relative h-full w-full cursor-pointer overflow-hidden ${className}`}
      onClick={() => setPlaying(true)}
      onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
    >
      <img src={thumbnailUrl} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
        <div className="rounded-full bg-black/60 p-4 ring-2 ring-white/20 backdrop-blur-sm transition-transform hover:scale-105 active:scale-95">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <polygon points="6,2 26,14 6,26" fill="white" />
          </svg>
        </div>
        <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/90">
          Nhấn để xem video
        </span>
      </div>
    </div>
  );
}

export function VideoEmbed({
  video,
  className = "",
}: {
  video: VideoItem;
  className?: string;
}) {
  const resolved = useTikTokEmbed(video);

  if (video.videoSourceType === "cdn") {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        controls
        preload="metadata"
        poster={video.thumbnailUrl}
        src={video.videoUrl}
      />
    );
  }

  // Non-TikTok: YouTube, Facebook (admin sets embedUrl/embedCode)
  if (video.videoSourceType !== "tiktok") {
    const embedUrl = video.embedUrl;
    if (!embedUrl) {
      return (
        <div
          className={`flex h-full w-full items-center justify-center text-sm text-white/80 ${className}`}
        >
          Chưa có embed hợp lệ
        </div>
      );
    }
    return (
      <iframe
        className={`h-full w-full border-0 ${className}`}
        src={embedUrl}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  // TikTok — click-to-play pattern
  const embedUrl = video.embedUrl || resolved?.embedUrl;

  // Still resolving short URL client-side
  if (!embedUrl && resolved === null) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center text-sm text-white/60 ${className}`}
      >
        Đang tải video...
      </div>
    );
  }

  // Resolution failed — link to TikTok directly
  if (!embedUrl) {
    return (
      <a
        href={video.videoUrl}
        target="_blank"
        rel="noreferrer"
        className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-90">
            <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.5)" />
            <polygon points="18,14 38,24 18,34" fill="white" />
          </svg>
          <span className="text-white text-xs font-semibold">Xem trên TikTok ↗</span>
        </div>
      </a>
    );
  }

  return (
    <TikTokClickToPlay
      embedUrl={embedUrl}
      thumbnailUrl={video.thumbnailUrl}
      title={video.title}
      className={className}
    />
  );
}
