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
      router.push("/admin");
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
          ? "Chua du env Supabase tren may nay, nen admin dang chay fallback local de xem giao dien va flow."
          : "Dang dung session Supabase that. API admin dang doc role tu session va profiles thay vi mock header."}
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
