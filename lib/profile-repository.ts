import { agents, type AgentProfile } from "@/data/mock-data";
import { getSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";

const runtimeProfiles: AgentProfile[] = process.env.NODE_ENV !== "production" ? [...agents] : [];

function mapProfileRow(row: Record<string, unknown>): AgentProfile {
  return {
    slug: String(row.slug ?? ""),
    name: String(row.full_name ?? row.name ?? ""),
    role: String(row.role ?? "cong_tac_vien") as AgentProfile["role"],
    specialtyDistricts: Array.isArray(row.specialty_districts)
      ? row.specialty_districts.map((item) => String(item))
      : [],
    specialtySegment: String(row.specialty_segment ?? ""),
    bio: String(row.bio ?? ""),
    achievements: Array.isArray(row.achievements)
      ? row.achievements.map((item) => String(item))
      : [],
    zalo: String(row.zalo_url ?? row.zalo ?? ""),
    facebook: String(row.facebook_url ?? row.facebook ?? ""),
    tiktok: String(row.tiktok_url ?? row.tiktok ?? ""),
    followCount: Number(row.follow_count ?? 0),
  };
}

export async function getPublicProfiles() {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("profiles")
        .select("*")
        .eq("is_active", true)
        .order("follow_count", { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []).map((row) => mapProfileRow(row));
    } catch {
      return [...agents];
    }
  }

  return [...runtimeProfiles];
}

export async function getAllProfiles() {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("profiles")
        .select("*")
        .eq("is_active", true)
        .order("follow_count", { ascending: false });

      if (error) throw new Error(error.message);
      return (data ?? []).map((row) => mapProfileRow(row));
    } catch {
      return [...agents];
    }
  }

  return [...runtimeProfiles];
}

export async function getProfileBySlug(slug: string) {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("profiles")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw new Error(error.message);
      return data ? mapProfileRow(data) : undefined;
    } catch {
      return agents.find((item) => item.slug === slug);
    }
  }

  return runtimeProfiles.find((item) => item.slug === slug);
}
