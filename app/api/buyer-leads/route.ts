import { NextResponse } from "next/server";
import { sendBuyerLeadNotification } from "@/lib/email";
import { createBuyerLead } from "@/lib/lead-repository";
import { buyerLeadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = buyerLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 },
      );
    }

    const lead = await createBuyerLead(result.data);
    // Fire-and-forget: không block response nếu email lỗi
    sendBuyerLeadNotification(lead).catch(console.error);
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong tao duoc yeu cau." },
      { status: 400 },
    );
  }
}
