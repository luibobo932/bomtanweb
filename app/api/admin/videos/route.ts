import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createAdminVideo, getAllVideos } from "@/lib/video-repository";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const videos = await getAllVideos();
    return NextResponse.json({ videos, session });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Khong doc duoc danh sach video.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const created = await createAdminVideo({
      title: String(body.title ?? ""),
      summary: String(body.summary ?? ""),
      videoUrl: String(body.videoUrl ?? ""),
      embedCode: body.embedCode ? String(body.embedCode) : undefined,
      thumbnailUrl: body.thumbnailUrl ? String(body.thumbnailUrl) : undefined,
      durationSeconds: Number(body.durationSeconds ?? 0),
      reviewerProfileId: String(body.reviewerProfileId ?? ""),
      districtTag: String(body.districtTag ?? ""),
      streetTag: String(body.streetTag ?? ""),
      priceTag: String(body.priceTag ?? ""),
      houseTypeTag: String(body.houseTypeTag ?? ""),
      contentType:
        body.contentType === "kien_thuc" ? "kien_thuc" : "review_nha",
      listingId: body.listingId ? String(body.listingId) : undefined,
      role: session.role,
      actorUserId: session.userId,
    });

    return NextResponse.json({ video: created }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Khong tao duoc video metadata.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
