type VideoResolution = { id: string; canonicalUrl: string };

function embedUrlFromId(videoId: string) {
  return `https://www.tiktok.com/embed/v2/${videoId}`;
}

function nativeEmbedHtml(videoId: string, canonicalUrl: string): string {
  return `<blockquote class="tiktok-embed" cite="${canonicalUrl}" data-video-id="${videoId}" style="max-width:605px;min-width:325px"><section></section></blockquote>`;
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

async function resolveVideo(videoUrl: string): Promise<VideoResolution | null> {
  // Strategy 1: Full URL already contains video ID — no network call needed
  const directId = videoUrl.match(/\/video\/(\d+)/)?.[1];
  if (directId) {
    const canonical = videoUrl.startsWith("https://www.tiktok.com")
      ? videoUrl
      : `https://www.tiktok.com/video/${directId}`;
    return { id: directId, canonicalUrl: canonical };
  }

  // Strategy 2: Follow HTTP redirect from short URL (e.g. vt.tiktok.com/ZSxwxHuGG/)
  // Captures the full canonical URL https://www.tiktok.com/@user/video/{id}
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
      const canonical = finalUrl.startsWith("https://www.tiktok.com")
        ? finalUrl
        : `https://www.tiktok.com/video/${idFromRedirect}`;
      return { id: idFromRedirect, canonicalUrl: canonical };
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
      const id = data.html ? extractIdFromHtml(data.html) : null;
      const citeMatch = data.html?.match(/cite=["'](https:\/\/www\.tiktok\.com[^"']+\/video\/\d+)/)?.[1];
      if (id) {
        console.log(`[tiktok] oEmbed resolved id: ${id}`);
        return { id, canonicalUrl: citeMatch ?? `https://www.tiktok.com/video/${id}` };
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
  const resolved = await resolveVideo(videoUrl);
  return resolved ? embedUrlFromId(resolved.id) : null;
}

export async function resolveTikTokNativeEmbed(
  videoUrl: string,
): Promise<{ embedUrl: string; embedCode: string } | null> {
  const resolved = await resolveVideo(videoUrl);
  if (!resolved) return null;
  return {
    embedUrl: embedUrlFromId(resolved.id),
    embedCode: nativeEmbedHtml(resolved.id, resolved.canonicalUrl),
  };
}
