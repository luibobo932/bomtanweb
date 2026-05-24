import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createAdminListing, getAllListings } from "@/lib/listing-repository";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const listings = await getAllListings();
    return NextResponse.json({ listings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong doc duoc listings." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Can dang nhap admin." }, { status: 401 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const listing = await createAdminListing({
      title: String(body.title ?? ""),
      district: String(body.district ?? ""),
      ward: String(body.ward ?? ""),
      street: String(body.street ?? ""),
      addressLine: String(body.addressLine ?? ""),
      priceLabel: String(body.priceLabel ?? ""),
      areaLabel: String(body.areaLabel ?? ""),
      dimensions: String(body.dimensions ?? ""),
      layout: String(body.layout ?? ""),
      houseType: String(body.houseType ?? ""),
      legal: String(body.legal ?? ""),
      occupancy: String(body.occupancy ?? ""),
      status: String(body.status ?? "con_ban") as
        | "con_ban"
        | "dang_thuong_luong"
        | "da_ban"
        | "ngung_ban",
      advantages: Array.isArray(body.advantages)
        ? body.advantages.map((item) => String(item))
        : String(body.advantages ?? "")
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
      caution: String(body.caution ?? ""),
      suitableFor: Array.isArray(body.suitableFor)
        ? body.suitableFor.map((item) => String(item))
        : String(body.suitableFor ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      managerSlug: String(body.managerSlug ?? ""),
      managerName: String(body.managerName ?? ""),
      heroNote: String(body.heroNote ?? ""),
      approvalStatus: session.role === "super_admin" ? "approved" : "pending",
      managerProfileId: String(body.managerProfileId ?? body.managerSlug ?? ""),
      role: session.role,
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Khong tao duoc listing." },
      { status: 400 },
    );
  }
}
