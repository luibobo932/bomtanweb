"use client";

import { createBrowserClient } from "@supabase/ssr";

let browserClientSingleton: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  if (!browserClientSingleton) {
    browserClientSingleton = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }

  return browserClientSingleton;
}
