import { NextResponse } from "next/server";
import { createBuyerLead } from "@/lib/lead-repository";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const lead = await createBuyerLead({
      fullName: String(body.fullName ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      preferredDistrict: String(body.preferredDistrict ?? "").trim(),
      budgetLabel: String(body.budgetLabel ?? "").trim(),
      houseType: String(body.houseType ?? "").trim(),
      dimensionsRequest: String(body.dimensionsRequest ?? "").trim(),
      purpose: String(body.purpose ?? "").trim(),
      notes: String(body.notes ?? "").trim(),
      sourceType: String(body.sourceType ?? "direct") as
        | "video"
        | "listing"
        | "profile"
        | "kien_thuc"
        | "direct",
      sourceId: body.sourceId ? String(body.sourceId) : undefined,
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong tao duoc buyer lead." },
      { status: 400 },
    );
  }
}
