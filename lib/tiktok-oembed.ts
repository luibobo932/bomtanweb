function embedUrlFromId(videoId: string) {
  return `https://www.tiktok.com/embed/v2/${videoId}`;
}

function nativeEmbedFromId(videoId: string, originalUrl: string): string {
  return `<blockquote class="tiktok-embed" cite="${originalUrl}" data-video-id="${videoId}" style="max-width:605px;min-width:325px"><section></section></blockquote>`;
}

function extractIdFromHtml(html: string): string | null {
  const fromAttr = html.match(/data-video-id=["'](\d+)["']/)?.[1];
  if (fromAttr) return fromAttr;
  const fromCite = html.match(/cite=["'][^"']*\/video\/(\d+)/)?.[1];
  if (fromCite) return fromCite;
  const fromPath = html.match(/\/video\/(\d{15,20})/)?.[1];
  if (fromPath) return fromPath;
  return null;
}

async function resolveVideoId(videoUrl: string): Promise<string | null> {
  // Strategy 1: Full URL already contains video ID — no network call needed
  const directId = videoUrl.match(/\/video\/(\d+)/)?.[1];
  if (directId) return directId;

  // Strategy 2: Follow HTTP redirect from short URL (e.g. vt.tiktok.com/ZSxwxHuGG/)
  try {
    const r = await fetch(videoUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      signal: AbortSignal.timeout(8000),
    });
    const finalUrl = r.url;
    const idFromRedirect = finalUrl.match(/\/video\/(\d+)/)?.[1];
    if (idFromRedirect) {
      console.log(`[tiktok] resolved ${videoUrl} → ${finalUrl} (id: ${idFromRedirect})`);
      return idFromRedirect;
    }
  } catch (err) {
    console.warn("[tiktok] redirect follow failed:", err);
  }

  // Strategy 3: TikTok oEmbed API — may be blocked on some server IPs
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (res.ok) {
      const data = (await res.json()) as { html?: string };
      const idFromOembed = data.html ? extractIdFromHtml(data.html) : null;
      if (idFromOembed) {
        console.log(`[tiktok] oEmbed resolved id: ${idFromOembed}`);
        return idFromOembed;
      }
    } else {
      console.warn(`[tiktok] oEmbed returned ${res.status}`);
    }
  } catch (err) {
    console.warn("[tiktok] oEmbed failed:", err);
  }

  console.warn(`[tiktok] all strategies failed for ${videoUrl}`);
  return null;
}

export async function resolveTikTokEmbedUrl(videoUrl: string): Promise<string | null> {
  const videoId = await resolveVideoId(videoUrl);
  return videoId ? embedUrlFromId(videoId) : null;
}

export async function resolveTikTokNativeEmbed(
  videoUrl: string,
): Promise<{ embedUrl: string; embedCode: string } | null> {
  const videoId = await resolveVideoId(videoUrl);
  if (!videoId) return null;
  return {
    embedUrl: embedUrlFromId(videoId),
    embedCode: nativeEmbedFromId(videoId, videoUrl),
  };
}
