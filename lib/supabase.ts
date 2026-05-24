import { createClient } from "@supabase/supabase-js";
import { getSupabasePublishableKey, getSupabaseUrl, hasSupabasePublicEnv } from "@/lib/supabase-env";

let supabaseSingleton: ReturnType<typeof createClient> | null = null;

export function hasSupabaseEnv() {
  return hasSupabasePublicEnv();
}

export function getSupabaseClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  if (!supabaseSingleton) {
    supabaseSingleton = createClient(getSupabaseUrl(), getSupabasePublishableKey());
  }

  return supabaseSingleton;
}
