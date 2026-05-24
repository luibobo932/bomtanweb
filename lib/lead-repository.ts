import {
  buyerLeads,
  ownerLeads,
  type BuyerLeadItem,
  type BuyerLeadStatus,
  type LeadSourceType,
  type OwnerLeadItem,
  type OwnerLeadStatus,
} from "@/data/mock-data";
import { getSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";

const runtimeBuyerLeads: BuyerLeadItem[] = process.env.NODE_ENV !== "production" ? [...buyerLeads] : [];
const runtimeOwnerLeads: OwnerLeadItem[] = process.env.NODE_ENV !== "production" ? [...ownerLeads] : [];

type CreateBuyerLeadParams = Omit<
  BuyerLeadItem,
  "id" | "createdAt" | "status" | "assignedProfileId" | "assignedProfileName"
>;
type CreateOwnerLeadParams = Omit<
  OwnerLeadItem,
  "id" | "createdAt" | "status" | "assignedProfileId" | "assignedProfileName"
>;

function mapBuyerLeadRow(row: Record<string, unknown>): BuyerLeadItem {
  return {
    id: String(row.id),
    fullName: String(row.full_name ?? ""),
    phone: String(row.phone ?? ""),
    preferredDistrict: String(row.preferred_district ?? ""),
    budgetLabel: String(row.budget_label ?? ""),
    houseType: String(row.house_type ?? ""),
    dimensionsRequest: String(row.dimensions_request ?? ""),
    purpose: String(row.purpose ?? ""),
    notes: String(row.notes ?? ""),
    sourceType: String(row.source_type ?? "direct") as LeadSourceType,
    sourceId: row.source_id ? String(row.source_id) : undefined,
    assignedProfileId: row.assigned_profile_id ? String(row.assigned_profile_id) : undefined,
    assignedProfileName: row.assigned_profile_name ? String(row.assigned_profile_name) : undefined,
    status: String(row.status ?? "moi") as BuyerLeadStatus,
    createdAt: String(row.created_at ?? new Date().toISOString()),
  };
}

function mapOwnerLeadRow(row: Record<string, unknown>): OwnerLeadItem {
  return {
    id: String(row.id),
    ownerName: String(row.owner_name ?? ""),
    phone: String(row.phone ?? ""),
    addressLine: String(row.address_line ?? ""),
    expectedPrice: String(row.expected_price ?? ""),
    dimensionsText: String(row.dimensions_text ?? ""),
    layoutText: String(row.layout_text ?? ""),
    legalStatus: String(row.legal_status ?? ""),
    occupancyStatus: String(row.occupancy_status ?? ""),
    mediaNotes: String(row.media_notes ?? ""),
    sourceType: String(row.source_type ?? "direct") as LeadSourceType,
    sourceId: row.source_id ? String(row.source_id) : undefined,
    assignedProfileId: row.assigned_profile_id ? String(row.assigned_profile_id) : undefined,
    assignedProfileName: row.assigned_profile_name ? String(row.assigned_profile_name) : undefined,
    status: String(row.status ?? "moi") as OwnerLeadStatus,
    createdAt: String(row.created_at ?? new Date().toISOString()),
  };
}

export async function createBuyerLead(params: CreateBuyerLeadParams) {
  const lead: BuyerLeadItem = {
    ...params,
    id: `buyer-${Date.now()}`,
    status: "moi",
    createdAt: new Date().toISOString(),
  };

  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase!
      .from("buyer_leads")
      .insert({
        id: lead.id,
        full_name: lead.fullName,
        phone: lead.phone,
        preferred_district: lead.preferredDistrict,
        budget_label: lead.budgetLabel,
        house_type: lead.houseType,
        dimensions_request: lead.dimensionsRequest,
        purpose: lead.purpose,
        notes: lead.notes,
        source_type: lead.sourceType,
        source_id: lead.sourceId ?? null,
        status: lead.status,
      } as never);

    if (error) {
      throw new Error(`Khong tao duoc buyer lead: ${error.message}`);
    }

    return lead;
  }

  runtimeBuyerLeads.unshift(lead);
  return lead;
}

export async function createOwnerLead(params: CreateOwnerLeadParams) {
  const lead: OwnerLeadItem = {
    ...params,
    id: `owner-${Date.now()}`,
    status: "moi",
    createdAt: new Date().toISOString(),
  };

  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { error } = await supabase!
      .from("owner_leads")
      .insert({
        id: lead.id,
        owner_name: lead.ownerName,
        phone: lead.phone,
        address_line: lead.addressLine,
        expected_price: lead.expectedPrice,
        dimensions_text: lead.dimensionsText,
        layout_text: lead.layoutText,
        legal_status: lead.legalStatus,
        occupancy_status: lead.occupancyStatus,
        media_notes: lead.mediaNotes,
        source_type: lead.sourceType,
        source_id: lead.sourceId ?? null,
        status: lead.status,
      } as never);

    if (error) {
      throw new Error(`Khong tao duoc owner lead: ${error.message}`);
    }

    return lead;
  }

  runtimeOwnerLeads.unshift(lead);
  return lead;
}

export async function getBuyerLeads() {
  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("buyer_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Khong doc duoc buyer leads: ${error.message}`);
    }

    return (data ?? []).map((row) => mapBuyerLeadRow(row));
  }

  return [...runtimeBuyerLeads];
}

export async function getOwnerLeads() {
  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("owner_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Khong doc duoc owner leads: ${error.message}`);
    }

    return (data ?? []).map((row) => mapOwnerLeadRow(row));
  }

  return [...runtimeOwnerLeads];
}

export async function updateBuyerLead(params: {
  id: string;
  status: BuyerLeadStatus;
  assignedProfileId?: string;
  assignedProfileName?: string;
}) {
  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("buyer_leads")
      .update({
        status: params.status,
        assigned_profile_id: params.assignedProfileId ?? null,
        assigned_profile_name: params.assignedProfileName ?? null,
      } as never)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Khong cap nhat duoc buyer lead: ${error.message}`);
    }

    return mapBuyerLeadRow(data);
  }

  const index = runtimeBuyerLeads.findIndex((item) => item.id === params.id);
  if (index === -1) {
    throw new Error("Khong tim thay buyer lead can cap nhat.");
  }

  runtimeBuyerLeads[index] = {
    ...runtimeBuyerLeads[index],
    status: params.status,
    assignedProfileId: params.assignedProfileId,
    assignedProfileName: params.assignedProfileName,
  };

  return runtimeBuyerLeads[index];
}

export async function updateOwnerLead(params: {
  id: string;
  status: OwnerLeadStatus;
  assignedProfileId?: string;
  assignedProfileName?: string;
}) {
  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("owner_leads")
      .update({
        status: params.status,
        assigned_profile_id: params.assignedProfileId ?? null,
        assigned_profile_name: params.assignedProfileName ?? null,
      } as never)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Khong cap nhat duoc owner lead: ${error.message}`);
    }

    return mapOwnerLeadRow(data);
  }

  const index = runtimeOwnerLeads.findIndex((item) => item.id === params.id);
  if (index === -1) {
    throw new Error("Khong tim thay owner lead can cap nhat.");
  }

  runtimeOwnerLeads[index] = {
    ...runtimeOwnerLeads[index],
    status: params.status,
    assignedProfileId: params.assignedProfileId,
    assignedProfileName: params.assignedProfileName,
  };

  return runtimeOwnerLeads[index];
}
