"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { AdminSession } from "@/lib/auth";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export function AdminAuthPanel({ session }: { session: AdminSession }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    startTransition(async () => {
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    });
  }

  return (
    <div className="glass-card rounded-[28px] p-6">
      <div className="section-kicker">
        {session.mode === "demo" ? "Demo mode" : "Admin session"}
      </div>
      <div className="mt-3 text-2xl font-black">{session.displayName}</div>
      <div className="mt-2 text-sm text-[var(--muted)]">
        Role: {session.role}
        {session.mode === "authenticated" && session.email ? ` · ${session.email}` : ""}
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
        {session.mode === "demo"
          ? "Chua cap env Supabase, nen admin dang chay fallback local de doi IT demo flow."
          : "Dang dung session Supabase that. API admin se doc role tu session thay vi header demo."}
      </p>
      {session.mode === "authenticated" ? (
        <button
          type="button"
          className="secondary-btn mt-5"
          onClick={handleSignOut}
          disabled={isPending}
        >
          {isPending ? "Dang dang xuat..." : "Dang xuat"}
        </button>
      ) : null}
    </div>
  );
}
