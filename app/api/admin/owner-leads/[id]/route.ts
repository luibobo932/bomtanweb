import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateOwnerLead } from "@/lib/lead-repository";
import { updateOwnerLeadSchema } from "@/lib/validation";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const body = await request.json();
    const result = updateOwnerLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 },
      );
    }

    const { id } = await params;
    const lead = await updateOwnerLead({ id, ...result.data });

    return NextResponse.json({ lead });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong cap nhat duoc lead." },
      { status: 400 },
    );
  }
}
