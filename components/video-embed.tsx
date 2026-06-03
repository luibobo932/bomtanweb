import type { VideoItem } from "@/data/mock-data";

export function VideoEmbed({
  video,
  className = "",
}: {
  video: VideoItem;
  className?: string;
}) {
  if (video.videoSourceType === "cdn") {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        controls
        preload="metadata"
        playsInline
        poster={video.thumbnailUrl}
        src={video.videoUrl}
      />
    );
  }

  if (!video.embedUrl) {
    return (
      <div className={`flex h-full w-full items-center justify-center text-sm text-white/80 ${className}`}>
        Chua co embed hop le
      </div>
    );
  }

  return (
    <iframe
      className={`h-full w-full border-0 ${className}`}
      src={video.embedUrl}
      title={video.title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
