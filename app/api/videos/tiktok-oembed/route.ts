import { NextRequest, NextResponse } from "next/server";
import { resolveTikTokEmbedUrl } from "@/lib/tiktok-oembed";

export const runtime = "nodejs";

type TikTokOEmbedResponse = {
  version: string;
  type: string;
  title: string;
  author_url: string;
  author_name: string;
  width: number;
  height: number;
  html: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  provider_name: string;
  provider_url: string;
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Thiếu tham số url" }, { status: 400 });
  }

  try {
    const oEmbedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const res = await fetch(oEmbedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BomTanBot/1.0)" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `TikTok oEmbed trả về lỗi: ${res.status}` },
        { status: 502 },
      );
    }

    const data: TikTokOEmbedResponse = await res.json();

    const videoIdMatch = data.html?.match(/data-video-id="(\d+)"/);
    const videoId = videoIdMatch?.[1] ?? null;
    const embedUrl = await resolveTikTokEmbedUrl(url);

    return NextResponse.json({
      title: data.title,
      authorName: data.author_name,
      authorUrl: data.author_url,
      thumbnailUrl: data.thumbnail_url,
      html: data.html,
      videoId,
      embedUrl,
    });
  } catch (err) {
    console.error("[tiktok-oembed] fetch failed:", err);
    return NextResponse.json(
      { error: "Không thể lấy thông tin từ TikTok. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
