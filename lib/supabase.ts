import { createClient } from "@supabase/supabase-js";

let supabaseSingleton: ReturnType<typeof createClient> | null = null;

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getSupabaseClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  if (!supabaseSingleton) {
    supabaseSingleton = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }

  return supabaseSingleton;
}
