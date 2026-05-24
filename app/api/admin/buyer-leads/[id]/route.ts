import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateBuyerLead } from "@/lib/lead-repository";

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
    const lead = await updateBuyerLead({
      id,
      status: String(body.status ?? "moi") as
        | "moi"
        | "da_lien_he"
        | "dang_tu_van"
        | "da_xem_nha"
        | "dang_dam_phan"
        | "chot"
        | "huy",
      assignedProfileId: body.assignedProfileId ? String(body.assignedProfileId) : undefined,
      assignedProfileName: body.assignedProfileName ? String(body.assignedProfileName) : undefined,
    });

    return NextResponse.json({ lead });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong cap nhat duoc buyer lead." },
      { status: 400 },
    );
  }
}
