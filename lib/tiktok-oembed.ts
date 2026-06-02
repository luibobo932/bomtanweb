export async function resolveTikTokEmbedUrl(videoUrl: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; BomTanBot/1.0)" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { html?: string };
    const videoIdMatch = data.html?.match(/data-video-id="(\d+)"/);
    const videoId = videoIdMatch?.[1] ?? null;
    return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null;
  } catch {
    return null;
  }
}
