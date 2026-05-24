import { NextResponse } from "next/server";
import { getPublicVideos } from "@/lib/video-repository";

export async function GET() {
  try {
    const videos = await getPublicVideos();
    return NextResponse.json({ videos });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Khong tai duoc feed video.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
