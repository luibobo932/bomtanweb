function embedUrlFromId(videoId: string) {
  return `https://www.tiktok.com/embed/v2/${videoId}`;
}

function extractIdFromHtml(html: string): string | null {
  // Try data-video-id attribute (both quote styles)
  const fromAttr = html.match(/data-video-id=["'](\d+)["']/)?.[1];
  if (fromAttr) return fromAttr;
  // Try cite attribute: cite="https://www.tiktok.com/@user/video/1234567890"
  const fromCite = html.match(/cite=["'][^"']*\/video\/(\d+)/)?.[1];
  if (fromCite) return fromCite;
  // Try any /video/{id} pattern in the html
  const fromPath = html.match(/\/video\/(\d{15,20})/)?.[1];
  if (fromPath) return fromPath;
  return null;
}

export async function resolveTikTokEmbedUrl(videoUrl: string): Promise<string | null> {
  // Strategy 1: Full URL already contains video ID — no network call needed
  const directId = videoUrl.match(/\/video\/(\d+)/)?.[1];
  if (directId) return embedUrlFromId(directId);

  // Strategy 2: Follow HTTP redirect from short URL (e.g. vt.tiktok.com/ZSxwxHuGG/)
  // Short URLs simply redirect to tiktok.com/@user/video/{id} — no API key needed
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
      return embedUrlFromId(idFromRedirect);
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
        return embedUrlFromId(idFromOembed);
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
