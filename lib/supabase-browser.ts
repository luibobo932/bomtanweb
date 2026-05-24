"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublishableKey, getSupabaseUrl, hasSupabasePublicEnv } from "@/lib/supabase-env";

let browserClientSingleton: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  if (!browserClientSingleton) {
    browserClientSingleton = createBrowserClient(
      getSupabaseUrl(),
      getSupabasePublishableKey(),
    );
  }

  return browserClientSingleton;
}
