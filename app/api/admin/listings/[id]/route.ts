import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateListingStatus } from "@/lib/listing-repository";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;
    const listing = await updateListingStatus({
      id,
      status: String(body.status ?? "con_ban") as
        | "con_ban"
        | "dang_thuong_luong"
        | "da_ban"
        | "ngung_ban",
      approvalStatus: body.approvalStatus
        ? (String(body.approvalStatus) as "pending" | "approved" | "rejected")
        : undefined,
    });

    return NextResponse.json({ listing });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong cap nhat duoc listing." },
      { status: 400 },
    );
  }
}
