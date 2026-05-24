import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateOwnerLead } from "@/lib/lead-repository";

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
    const lead = await updateOwnerLead({
      id,
      status: String(body.status ?? "moi") as
        | "moi"
        | "dang_xac_minh"
        | "du_dieu_kien"
        | "tu_choi"
        | "da_chuyen_listing",
      assignedProfileId: body.assignedProfileId ? String(body.assignedProfileId) : undefined,
      assignedProfileName: body.assignedProfileName ? String(body.assignedProfileName) : undefined,
    });

    return NextResponse.json({ lead });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong cap nhat duoc owner lead." },
      { status: 400 },
    );
  }
}
