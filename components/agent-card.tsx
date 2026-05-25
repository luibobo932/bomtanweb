import Link from "next/link";
import type { AgentProfile } from "@/data/mock-data";

const roleLabel: Record<AgentProfile["role"], string> = {
  super_admin: "Trưởng nhóm",
  nhan_vien: "Nhân viên",
  cong_tac_vien: "Cộng tác viên",
};

export function AgentCard({ agent }: { agent: AgentProfile }) {
  const initials = agent.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <Link
      href={`/doi-ngu/${agent.slug}`}
      className="group relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--s2)] p-6 transition duration-200 hover:border-[var(--brand)] hover:bg-[#161616]"
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-[rgba(216,78,30,0.2)] to-[rgba(216,78,30,0.08)] text-[18px] font-black text-[var(--brand)]">
          {initials}
        </div>
        <div>
          <div className="font-black text-white">{agent.name}</div>
          <div className="mt-0.5 text-xs text-zinc-500">
            {roleLabel[agent.role] ?? agent.role}
          </div>
        </div>
      </div>

      {/* District tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {agent.specialtyDistricts.map((d) => (
          <span
            key={d}
            className="rounded-[var(--r-sm)] border border-[var(--border)] px-2.5 py-1 text-[11px] text-zinc-400"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-500">{agent.bio}</p>

      {/* Specialty segment */}
      <div className="mt-4 rounded-[var(--r-md)] bg-[var(--s4)] px-3 py-2 text-xs text-zinc-400">
        {agent.specialtySegment}
      </div>

      {/* Arrow */}
      <div className="mt-4 text-xs font-semibold text-zinc-600 transition group-hover:text-[var(--brand)]">
        Xem profile →
      </div>
    </Link>
  );
}
