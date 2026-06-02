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
