import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateListingStatus } from "@/lib/listing-repository";
import { updateListingSchema } from "@/lib/validation";

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
    const result = updateListingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 },
      );
    }

    const { id } = await params;
    const listing = await updateListingStatus({ id, ...result.data });

    return NextResponse.json({ listing });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong cap nhat duoc listing." },
      { status: 400 },
    );
  }
}
