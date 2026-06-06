import { listings, type ListingItem, type ListingStatus, type UserRole } from "@/data/mock-data";
import { getSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";

type CreateListingParams = Omit<ListingItem, "id" | "slug"> & {
  managerProfileId: string;
  role: UserRole;
};

const runtimeListings: ListingItem[] = process.env.NODE_ENV !== "production" ? [...listings] : [];

async function resolveManagerProfile(managerProfileId: string, managerSlug: string, managerName: string) {
  if (!hasSupabaseEnv()) {
    return {
      managerProfileId,
      managerSlug,
      managerName,
    };
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase!
    .from("profiles")
    .select("id, slug, full_name")
    .or(`id.eq.${managerProfileId},slug.eq.${managerSlug}`)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Khong doc duoc manager profile: ${error.message}`);
  }

  if (!data) {
    throw new Error("Manager profile khong ton tai hoac da ngung hoat dong.");
  }

  const profile = data as Record<string, unknown>;

  return {
    managerProfileId: String(profile.id),
    managerSlug: String(profile.slug ?? managerSlug),
    managerName: String(profile.full_name ?? managerName),
  };
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapListingRow(row: Record<string, unknown>): ListingItem {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    district: String(row.district ?? ""),
    ward: String(row.ward ?? ""),
    street: String(row.street ?? ""),
    addressLine: String(row.address_line ?? ""),
    priceLabel: String(row.price_label ?? ""),
    areaLabel: String(row.area_label ?? ""),
    dimensions: String(row.dimensions ?? ""),
    layout: String(row.layout_text ?? ""),
    houseType: String(row.house_type ?? ""),
    legal: String(row.legal_status ?? ""),
    occupancy: String(row.occupancy_status ?? ""),
    status: String(row.status ?? "con_ban") as ListingStatus,
    advantages: Array.isArray(row.advantages) ? row.advantages.map((item) => String(item)) : [],
    caution: String(row.caution_notes ?? ""),
    suitableFor: Array.isArray(row.suitable_for) ? row.suitable_for.map((item) => String(item)) : [],
    managerSlug: String(row.manager_slug ?? ""),
    managerName: String(row.manager_name ?? ""),
    heroNote: String(row.hero_note ?? ""),
    approvalStatus: String(row.approval_status ?? "pending") as ListingItem["approvalStatus"],
  };
}

function normalizeListingForSupabase(listing: ListingItem, managerProfileId?: string) {
  return {
    id: listing.id,
    slug: listing.slug,
    title: listing.title,
    district: listing.district,
    ward: listing.ward,
    street: listing.street,
    address_line: listing.addressLine ?? `${listing.street}, ${listing.ward}, ${listing.district}`,
    price_label: listing.priceLabel,
    area_label: listing.areaLabel,
    dimensions: listing.dimensions,
    layout_text: listing.layout,
    house_type: listing.houseType,
    legal_status: listing.legal,
    occupancy_status: listing.occupancy,
    status: listing.status,
    advantages: listing.advantages,
    caution_notes: listing.caution,
    suitable_for: listing.suitableFor,
    manager_profile_id: managerProfileId ?? listing.managerSlug,
    manager_slug: listing.managerSlug,
    manager_name: listing.managerName,
    hero_note: listing.heroNote,
    approval_status: listing.approvalStatus ?? "pending",
  };
}

const seedPublicListings = () =>
  listings.filter(
    (item) =>
      (item.approvalStatus ?? "approved") === "approved" &&
      ["con_ban", "dang_thuong_luong"].includes(item.status),
  );

export async function getPublicListings() {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("listings")
        .select("*")
        .eq("approval_status", "approved")
        .in("status", ["con_ban", "dang_thuong_luong"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[listing-repository] Supabase error:", error.message);
        return seedPublicListings();
      }

      const rows = (data ?? []).map((row) => mapListingRow(row));
      return rows.length > 0 ? rows : seedPublicListings();
    } catch (err) {
      console.error("[listing-repository] Connection error:", err);
      return seedPublicListings();
    }
  }

  const base = process.env.NODE_ENV !== "production" ? runtimeListings : listings;
  return base.filter(
    (item) =>
      (item.approvalStatus ?? "approved") === "approved" &&
      ["con_ban", "dang_thuong_luong"].includes(item.status),
  );
}

export async function getAllListings() {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[listing-repository] getAllListings Supabase error:", error.message);
        return [...listings];
      }

      const rows = (data ?? []).map((row) => mapListingRow(row));
      return rows.length > 0 ? rows : [...listings];
    } catch (err) {
      console.error("[listing-repository] getAllListings Connection error:", err);
      return [...listings];
    }
  }

  return process.env.NODE_ENV !== "production" ? [...runtimeListings] : [...listings];
}

export async function getListingBySlug(slug: string) {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("listings")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("[listing-repository] getListingBySlug Supabase error:", error.message);
        return listings.find((item) => item.slug === slug);
      }

      return data ? mapListingRow(data) : listings.find((item) => item.slug === slug);
    } catch (err) {
      console.error("[listing-repository] getListingBySlug Connection error:", err);
      return listings.find((item) => item.slug === slug);
    }
  }

  return runtimeListings.find((item) => item.slug === slug);
}

export async function getListingsByManager(slug: string) {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("listings")
        .select("*")
        .eq("manager_slug", slug)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []).map((row) => mapListingRow(row));
    } catch {
      return listings.filter((item) => item.managerSlug === slug);
    }
  }

  return runtimeListings.filter((item) => item.managerSlug === slug);
}

export async function createAdminListing(params: CreateListingParams) {
  const manager = await resolveManagerProfile(
    params.managerProfileId,
    params.managerSlug,
    params.managerName,
  );
  const listing: ListingItem = {
    ...params,
    id: `L-${Date.now()}`,
    slug: slugify(params.title),
    managerSlug: manager.managerSlug,
    managerName: manager.managerName,
    approvalStatus: params.role === "super_admin" ? "approved" : "pending",
  };

  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("listings")
      .insert(normalizeListingForSupabase(listing, manager.managerProfileId) as never)
      .select()
      .single();

    if (error) {
      throw new Error(`Khong tao duoc listing: ${error.message}`);
    }

    return mapListingRow(data);
  }

  runtimeListings.unshift(listing);
  return listing;
}

export async function updateListingStatus(params: {
  id: string;
  status: ListingStatus;
  approvalStatus?: ListingItem["approvalStatus"];
}) {
  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const payload: Record<string, unknown> = { status: params.status };
    if (params.approvalStatus) {
      payload.approval_status = params.approvalStatus;
    }

    const { data, error } = await supabase!
      .from("listings")
      .update(payload as never)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Khong cap nhat duoc listing: ${error.message}`);
    }

    return mapListingRow(data);
  }

  const index = runtimeListings.findIndex((item) => item.id === params.id);
  if (index === -1) {
    throw new Error("Khong tim thay listing can cap nhat.");
  }

  runtimeListings[index] = {
    ...runtimeListings[index],
    status: params.status,
    approvalStatus: params.approvalStatus ?? runtimeListings[index].approvalStatus,
  };

  return runtimeListings[index];
}
