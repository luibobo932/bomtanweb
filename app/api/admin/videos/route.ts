import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createAdminVideo, getAllVideos } from "@/lib/video-repository";
import { createVideoSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const videos = await getAllVideos();
    return NextResponse.json({ videos, session });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong doc duoc danh sach video." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const body = await request.json();
    const result = createVideoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 },
      );
    }

    const created = await createAdminVideo({
      ...result.data,
      role: session.role,
      actorUserId: session.userId,
    });

    return NextResponse.json({ video: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong tao duoc video metadata." },
      { status: 400 },
    );
  }
}
