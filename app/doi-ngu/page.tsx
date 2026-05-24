import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getPublicProfiles } from "@/lib/profile-repository";

export const metadata: Metadata = {
  title: "Đội ngũ chuyên gia — NhàPhốSG",
  description:
    "Gặp gỡ đội ngũ chuyên gia nhà phố NhàPhốSG — kinh nghiệm thực chiến tại Q1, Q3, Q5, Q10 TP.HCM.",
};

const roleLabel: Record<string, string> = {
  super_admin: "Trưởng nhóm",
  nhan_vien: "Chuyên gia",
  cong_tac_vien: "Cộng tác viên",
};

export default async function TeamPage() {
  const agents = await getPublicProfiles();

  return (
    <SiteShell>
      {/* Header */}
      <section className="container-shell pt-10 md:pt-14">
        <div className="px-4 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#2e2e28] bg-[#141414] px-4 py-1.5 text-[12px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            {agents.length} chuyên gia đang hoạt động
          </div>
          <h1 className="text-[36px] font-black tracking-[-0.03em] text-white md:text-[48px]">
            Đội ngũ <span className="text-[var(--brand)]">NhàPhốSG</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-zinc-400">
            Chuyên gia có kinh nghiệm thực chiến — review trung thực, tư vấn tận tâm,
            không hoa hồng ẩn.
          </p>
        </div>
      </section>

      {/* Agent grid */}
      <section className="container-shell mt-10 grid gap-5 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Link
            key={agent.slug}
            href={`/doi-ngu/${agent.slug}`}
            className="group relative overflow-hidden rounded-[22px] border border-[#2e2e28] bg-[#111] p-6 transition duration-200 hover:border-[var(--brand)] hover:bg-[#161616]"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[rgba(216,78,30,0.2)] to-[rgba(216,78,30,0.08)] text-[18px] font-black text-[var(--brand)]">
                {agent.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-black text-white">{agent.name}</div>
                <div className="mt-0.5 text-xs text-zinc-500">
                  {roleLabel[agent.role] ?? agent.role}
                </div>
              </div>
            </div>

            {/* Districts */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {agent.specialtyDistricts.map((d) => (
                <span
                  key={d}
                  className="rounded-[6px] border border-[#2e2e28] px-2.5 py-1 text-[11px] text-zinc-400"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-500">{agent.bio}</p>

            {/* Segment */}
            <div className="mt-4 rounded-[10px] bg-[#1a1a1a] px-3 py-2 text-xs text-zinc-400">
              {agent.specialtySegment}
            </div>

            {/* Arrow */}
            <div className="mt-4 text-xs font-semibold text-zinc-600 transition group-hover:text-[var(--brand)]">
              Xem profile →
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="container-shell px-4 pb-16">
        <div className="rounded-[20px] border border-[#2e2e28] bg-[#0d0d0d] p-6 text-center md:p-8">
          <p className="text-xl font-black text-white">Muốn được tư vấn trực tiếp?</p>
          <p className="mt-2 text-sm text-zinc-500">
            Gửi nhu cầu — chuyên gia phù hợp nhất sẽ liên hệ trong 2 giờ
          </p>
          <Link href="/gui-nhu-cau" className="primary-btn mt-5 inline-block">
            Tư vấn miễn phí →
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
