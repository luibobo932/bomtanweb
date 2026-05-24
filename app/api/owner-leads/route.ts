import { NextResponse } from "next/server";
import { sendOwnerLeadNotification } from "@/lib/email";
import { createOwnerLead } from "@/lib/lead-repository";
import { ownerLeadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ownerLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 },
      );
    }

    const lead = await createOwnerLead({ ...result.data, sourceType: "direct" });
    await sendOwnerLeadNotification(lead).catch(console.error);
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong tao duoc yeu cau." },
      { status: 400 },
    );
  }
}
