"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { VideoItem } from "@/data/mock-data";

type ResolvedEmbed = { embedUrl?: string; html?: string } | null;

function useTikTokEmbed(video: VideoItem): ResolvedEmbed {
  const [resolved, setResolved] = useState<ResolvedEmbed>(null);

  const needsResolution =
    video.videoSourceType === "tiktok" &&
    !video.embedCode?.includes("tiktok-embed") &&
    !video.embedUrl;

  useEffect(() => {
    if (!needsResolution) return;
    let cancelled = false;

    fetch(`/api/videos/tiktok-oembed?url=${encodeURIComponent(video.videoUrl)}`)
      .then((r) => r.json())
      .then((data: { embedUrl?: string; html?: string }) => {
        if (!cancelled) setResolved(data);
      })
      .catch(() => {
        if (!cancelled) setResolved({});
      });

    return () => { cancelled = true; };
  }, [video.videoUrl, needsResolution]);

  return needsResolution ? resolved : null;
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

  // Native TikTok embed (blockquote + embed.js) — shows live likes/views/comments
  const embedHtml = video.embedCode?.includes("tiktok-embed")
    ? video.embedCode
    : resolved?.html;

  if (video.videoSourceType === "tiktok" && embedHtml) {
    return (
      <div className={`flex h-full w-full items-center justify-center overflow-auto ${className}`}>
        <div className="w-full" dangerouslySetInnerHTML={{ __html: embedHtml }} />
        <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      </div>
    );
  }

  // Resolved iframe URL from oEmbed (fallback if no html)
  const embedUrl = video.embedUrl || resolved?.embedUrl;

  // Short URL still resolving
  if (!embedUrl && video.videoSourceType === "tiktok" && resolved === null) {
    return (
      <div className={`flex h-full w-full items-center justify-center text-sm text-white/60 ${className}`}>
        Đang tải video...
      </div>
    );
  }

  // oEmbed resolved nhưng không có URL lẫn HTML → TikTok có thể bị block
  if (!embedUrl && video.videoSourceType === "tiktok") {
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

  if (!embedUrl) {
    return (
      <div className={`flex h-full w-full items-center justify-center text-sm text-white/80 ${className}`}>
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
