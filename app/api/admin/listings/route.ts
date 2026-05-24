import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createAdminListing, getAllListings } from "@/lib/listing-repository";
import { createListingSchema } from "@/lib/validation";

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

    const body = await request.json();
    const result = createListingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 422 },
      );
    }

    const data = result.data;
    const advantages = Array.isArray(data.advantages)
      ? data.advantages.map(String)
      : String(data.advantages).split("\n").map((s) => s.trim()).filter(Boolean);
    const suitableFor = Array.isArray(data.suitableFor)
      ? data.suitableFor.map(String)
      : String(data.suitableFor).split(",").map((s) => s.trim()).filter(Boolean);

    const listing = await createAdminListing({
      ...data,
      advantages,
      suitableFor,
      approvalStatus: session.role === "super_admin" ? "approved" : "pending",
      managerProfileId: data.managerProfileId || data.managerSlug,
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
