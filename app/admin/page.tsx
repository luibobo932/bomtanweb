import Link from "next/link";
import { AdminAuthPanel } from "@/components/admin-auth-panel";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminLeadManager } from "@/components/admin-lead-manager";
import { AdminListingManager } from "@/components/admin-listing-manager";
import { AdminVideoManager } from "@/components/admin-video-manager";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { adminHighlights } from "@/data/mock-data";
import { getAdminSession } from "@/lib/auth";
import { getBuyerLeads, getOwnerLeads } from "@/lib/lead-repository";
import { getAllListings } from "@/lib/listing-repository";
import { getAllVideos } from "@/lib/video-repository";

const modules = [
  {
    title: "Quan ly video",
    bullets: [
      "Them / sua / xoa video metadata bang external URL",
      "Duyet video nhan vien va CTV dang len",
      "Gan listing, tag quan, duong, loai nha, nguoi dang",
    ],
  },
  {
    title: "Quan ly listing",
    bullets: [
      "Trang thai con ban / dang thuong luong / da ban / ngung ban",
      "Gan nguoi phu trach va video review",
      "Luu lich su cap nhat gia va phap ly",
    ],
  },
  {
    title: "Lead buyer / owner",
    bullets: [
      "Ghi source lead: video / listing / profile / kien thuc",
      "Phan cong nhan vien phu trach",
      "Theo doi trang thai moi, da lien he, tu van, xem nha, dam phan, chot, huy",
    ],
  },
  {
    title: "RBAC",
    bullets: [
      "Super Admin co toan quyen",
      "Nhan vien / CTV chi tao metadata va xem du lieu duoc phep",
      "Khong xuat toan bo data cho role thap",
    ],
  },
];

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
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

  const videos = await getAllVideos();
  const listings = await getAllListings();
  const buyerLeads = await getBuyerLeads();
  const ownerLeads = await getOwnerLeads();

  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <SectionHeading
          kicker="Admin CRM"
          title="Mot man hinh quan tri tap trung de giu du lieu va quy trinh trong tam kiem soat"
          description="Trang nay da duoc noi session Supabase. API admin doc role tu session that, khong con phu thuoc header demo."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminHighlights.map((item) => (
            <div key={item.label} className="glass-card rounded-[26px] p-6">
              <div className="text-4xl font-black text-[var(--brand)]">{item.value}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell mt-12 grid gap-6 lg:grid-cols-2">
        <AdminAuthPanel session={session} />
        {modules.map((module) => (
          <article key={module.title} className="glass-card rounded-[30px] p-7">
            <div className="section-kicker">Module</div>
            <h3 className="mt-3 text-2xl font-black">{module.title}</h3>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--ink-soft)]">
              {module.bullets.map((item) => (
                <div key={item}>- {item}</div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="container-shell">
        <AdminListingManager initialListings={listings} session={session} />
      </section>

      <section className="container-shell">
        <AdminVideoManager initialVideos={videos} session={session} />
      </section>

      <section className="container-shell">
        <AdminLeadManager initialBuyerLeads={buyerLeads} initialOwnerLeads={ownerLeads} />
      </section>
    </SiteShell>
  );
}
