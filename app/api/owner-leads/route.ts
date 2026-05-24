import { NextResponse } from "next/server";
import { createOwnerLead } from "@/lib/lead-repository";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const lead = await createOwnerLead({
      ownerName: String(body.ownerName ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      addressLine: String(body.addressLine ?? "").trim(),
      expectedPrice: String(body.expectedPrice ?? "").trim(),
      dimensionsText: String(body.dimensionsText ?? "").trim(),
      layoutText: String(body.layoutText ?? "").trim(),
      legalStatus: String(body.legalStatus ?? "").trim(),
      occupancyStatus: String(body.occupancyStatus ?? "").trim(),
      mediaNotes: String(body.mediaNotes ?? "").trim(),
      sourceType: "direct",
      sourceId: undefined,
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong tao duoc owner lead." },
      { status: 400 },
    );
  }
}
