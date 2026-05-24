import Link from "next/link";
import type { AgentProfile } from "@/data/mock-data";

const roleMap: Record<AgentProfile["role"], string> = {
  super_admin: "Trưởng nhóm",
  nhan_vien: "Nhân viên",
  cong_tac_vien: "Cộng tác viên",
};

export function AgentCard({ agent }: { agent: AgentProfile }) {
  return (
    <article className="glass-card rounded-[30px] p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(216,78,30,0.16),rgba(216,78,30,0.28))] text-lg font-black text-[var(--brand)]">
          {agent.name
            .split(" ")
            .map((item) => item[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <div className="text-xl font-black text-white">{agent.name}</div>
          <div className="text-sm text-zinc-400">{roleMap[agent.role]}</div>
        </div>
      </div>

      <div className="chip-row mt-5">
        {agent.specialtyDistricts.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] bg-zinc-900 p-5 text-sm">
        <div className="section-kicker">Phân khúc chuyên môn</div>
        <div className="mt-3 text-lg font-black text-white">{agent.specialtySegment}</div>
      </div>

      <p className="mt-5 text-sm leading-7 text-zinc-400">{agent.bio}</p>

      <Link href={`/doi-ngu/${agent.slug}`} className="primary-btn mt-6">
        Xem profile
      </Link>
    </article>
  );
}
