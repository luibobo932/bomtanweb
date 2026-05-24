"use client";

import { useState, useTransition } from "react";
import { agents, type BuyerLeadItem, type OwnerLeadItem } from "@/data/mock-data";

export function AdminLeadManager({
  initialBuyerLeads,
  initialOwnerLeads,
}: {
  initialBuyerLeads: BuyerLeadItem[];
  initialOwnerLeads: OwnerLeadItem[];
}) {
  const [buyerLeads, setBuyerLeads] = useState(initialBuyerLeads);
  const [ownerLeads, setOwnerLeads] = useState(initialOwnerLeads);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function updateBuyer(id: string, status: BuyerLeadItem["status"], assignedProfileId: string) {
    const agent = agents.find((item) => item.slug === assignedProfileId);
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/buyer-leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            assignedProfileId,
            assignedProfileName: agent?.name ?? "",
          }),
        });
        const payload = (await response.json()) as { lead?: BuyerLeadItem; error?: string };
        if (!response.ok || !payload.lead) {
          throw new Error(payload.error ?? "Khong cap nhat duoc buyer lead.");
        }
        setBuyerLeads((prev) => prev.map((item) => (item.id === id ? payload.lead! : item)));
        setMessage("Da cap nhat buyer lead.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong cap nhat duoc buyer lead.");
      }
    });
  }

  async function updateOwner(id: string, status: OwnerLeadItem["status"], assignedProfileId: string) {
    const agent = agents.find((item) => item.slug === assignedProfileId);
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/owner-leads/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            assignedProfileId,
            assignedProfileName: agent?.name ?? "",
          }),
        });
        const payload = (await response.json()) as { lead?: OwnerLeadItem; error?: string };
        if (!response.ok || !payload.lead) {
          throw new Error(payload.error ?? "Khong cap nhat duoc owner lead.");
        }
        setOwnerLeads((prev) => prev.map((item) => (item.id === id ? payload.lead! : item)));
        setMessage("Da cap nhat owner lead.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong cap nhat duoc owner lead.");
      }
    });
  }

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-2">
      <section className="glass-card rounded-[30px] p-7">
        <div className="section-kicker">Buyer leads</div>
        <h3 className="mt-3 text-2xl font-black">Lead khách mua</h3>
        <div className="mt-6 space-y-4">
          {buyerLeads.map((lead) => (
            <article key={lead.id} className="rounded-[24px] bg-zinc-950 p-5">
              <div className="font-bold text-white">{lead.fullName}</div>
              <div className="mt-1 text-sm text-zinc-400">
                {lead.preferredDistrict} · {lead.budgetLabel} · {lead.sourceType}
              </div>
              <div className="mt-3 text-sm text-zinc-300">{lead.notes}</div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <select className="field" defaultValue={lead.status} onChange={(e) => updateBuyer(lead.id, e.target.value as BuyerLeadItem["status"], lead.assignedProfileId ?? "minh-anh")} disabled={isPending}>
                  <option value="moi">Mới</option>
                  <option value="da_lien_he">Đã liên hệ</option>
                  <option value="dang_tu_van">Đang tư vấn</option>
                  <option value="da_xem_nha">Đã xem nhà</option>
                  <option value="dang_dam_phan">Đang đàm phán</option>
                  <option value="chot">Chốt</option>
                  <option value="huy">Hủy</option>
                </select>
                <select className="field" defaultValue={lead.assignedProfileId ?? "minh-anh"} onChange={(e) => updateBuyer(lead.id, lead.status, e.target.value)} disabled={isPending}>
                  {agents.map((agent) => (
                    <option key={agent.slug} value={agent.slug}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-[30px] p-7">
        <div className="section-kicker">Owner leads</div>
        <h3 className="mt-3 text-2xl font-black">Lead chủ nhà gửi bán</h3>
        <div className="mt-6 space-y-4">
          {ownerLeads.map((lead) => (
            <article key={lead.id} className="rounded-[24px] bg-zinc-950 p-5">
              <div className="font-bold text-white">{lead.ownerName}</div>
              <div className="mt-1 text-sm text-zinc-400">
                {lead.expectedPrice} · {lead.addressLine}
              </div>
              <div className="mt-3 text-sm text-zinc-300">{lead.mediaNotes}</div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <select className="field" defaultValue={lead.status} onChange={(e) => updateOwner(lead.id, e.target.value as OwnerLeadItem["status"], lead.assignedProfileId ?? "ngoc-han")} disabled={isPending}>
                  <option value="moi">Mới</option>
                  <option value="dang_xac_minh">Đang xác minh</option>
                  <option value="du_dieu_kien">Đủ điều kiện</option>
                  <option value="tu_choi">Từ chối</option>
                  <option value="da_chuyen_listing">Đã chuyển listing</option>
                </select>
                <select className="field" defaultValue={lead.assignedProfileId ?? "ngoc-han"} onChange={(e) => updateOwner(lead.id, lead.status, e.target.value)} disabled={isPending}>
                  {agents.map((agent) => (
                    <option key={agent.slug} value={agent.slug}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      </section>
      {message ? <div className="xl:col-span-2 text-sm text-[var(--brand)]">{message}</div> : null}
    </div>
  );
}
