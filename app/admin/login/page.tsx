import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { SiteShell } from "@/components/site-shell";
import { getAdminSession } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <div className="mx-auto max-w-xl glass-card rounded-[34px] p-8 md:p-10">
          <div className="mb-1 flex items-center justify-between">
            <div className="section-kicker">Admin login</div>
            <span className="rounded-full border border-[var(--border)] bg-[var(--s4)] px-2.5 py-0.5 text-[11px] text-zinc-500">
              Phiên bản 5
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Đăng nhập khu quản trị</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Đăng nhập bằng Supabase Auth để vào khu quản trị video, listing và lead.
          </p>
          <AdminLoginForm />
          {!hasSupabaseEnv() ? (
            <div className="mt-6 text-sm text-[var(--muted)]">
              Máy local chưa đủ env Supabase. Anh có thể quay lại{" "}
              <Link href="/admin" className="font-semibold text-[var(--brand)]">
                /admin
              </Link>{" "}
              để xem fallback demo mode.
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
