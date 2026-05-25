import type { Metadata } from "next";
import Link from "next/link";
import { AgentCard } from "@/components/agent-card";
import { SiteShell } from "@/components/site-shell";
import { getPublicProfiles } from "@/lib/profile-repository";

export const metadata: Metadata = {
  title: "Đội ngũ chuyên gia — NhàPhốSG",
  description:
    "Gặp gỡ đội ngũ chuyên gia nhà phố NhàPhốSG — kinh nghiệm thực chiến tại Q1, Q3, Q5, Q10 TP.HCM.",
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
          <AgentCard key={agent.slug} agent={agent} />
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
