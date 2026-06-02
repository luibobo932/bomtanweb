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
          <div className="section-kicker">Admin login</div>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Dang nhap khu quan tri</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Dang nhap bang Supabase Auth de vao khu quan tri video, listing va lead.
          </p>
          <AdminLoginForm />
          {!hasSupabaseEnv() ? (
            <div className="mt-6 text-sm text-[var(--muted)]">
              May local chua du env Supabase. Anh co the quay lai{" "}
              <Link href="/admin" className="font-semibold text-[var(--brand)]">
                /admin
              </Link>{" "}
              de xem fallback demo mode.
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
