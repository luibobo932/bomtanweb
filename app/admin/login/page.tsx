import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { SiteShell } from "@/components/site-shell";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session && session.mode === "authenticated") {
    redirect("/admin");
  }

  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <div className="mx-auto max-w-xl glass-card rounded-[34px] p-8 md:p-10">
          <div className="section-kicker">Admin login</div>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Dang nhap khu quan tri</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Dang nhap bang Supabase Auth de tao video metadata, xem queue duyet va publish
            neu role la `super_admin`.
          </p>
          <AdminLoginForm />
          <div className="mt-6 text-sm text-[var(--muted)]">
            Neu repo dang chay local chua co env, anh co the vao{" "}
            <Link href="/admin" className="font-semibold text-[var(--brand)]">
              /admin
            </Link>{" "}
            de xem fallback demo mode.
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
