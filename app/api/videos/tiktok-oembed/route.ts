import { NextRequest, NextResponse } from "next/server";
import { resolveTikTokEmbedUrl } from "@/lib/tiktok-oembed";

export const runtime = "nodejs";

type TikTokOEmbedResponse = {
  title?: string;
  author_url?: string;
  author_name?: string;
  html?: string;
  thumbnail_url?: string;
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Thiếu tham số url" }, { status: 400 });
  }

  // Resolve embedUrl using multi-strategy (redirect follow + oEmbed)
  const embedUrl = await resolveTikTokEmbedUrl(url);

  // Also try to get full oEmbed metadata (for admin auto-fill — title, thumbnail, html)
  let oembedData: TikTokOEmbedResponse = {};
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (res.ok) {
      oembedData = (await res.json()) as TikTokOEmbedResponse;
    }
  } catch {
    // oEmbed unavailable — embedUrl may still be resolved via redirect
  }

  if (!embedUrl && !oembedData.html) {
    return NextResponse.json(
      { error: "Không thể lấy thông tin từ TikTok. Vui lòng thử lại." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    title: oembedData.title ?? null,
    authorName: oembedData.author_name ?? null,
    authorUrl: oembedData.author_url ?? null,
    thumbnailUrl: oembedData.thumbnail_url ?? null,
    html: oembedData.html ?? null,
    embedUrl,
  });
}
