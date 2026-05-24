import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateVideoApprovalStatus } from "@/lib/video-repository";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const { id } = await params;
    const approvalStatus =
      body.approvalStatus === "approved" || body.approvalStatus === "rejected"
        ? body.approvalStatus
        : "pending";

    const video = await updateVideoApprovalStatus({
      id,
      approvalStatus,
      role: session.role,
      actorUserId: session.userId,
    });

    return NextResponse.json({ video });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Khong cap nhat duoc video.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
