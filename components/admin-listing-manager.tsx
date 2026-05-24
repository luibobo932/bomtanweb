"use client";

import { useState, useTransition } from "react";
import { type AgentProfile, type ListingItem, type UserRole } from "@/data/mock-data";
import type { AdminSession } from "@/lib/auth";

type FormState = {
  title: string;
  district: string;
  ward: string;
  street: string;
  addressLine: string;
  priceLabel: string;
  areaLabel: string;
  dimensions: string;
  layout: string;
  houseType: string;
  legal: string;
  occupancy: string;
  status: ListingItem["status"];
  advantages: string;
  caution: string;
  suitableFor: string;
  managerSlug: string;
  managerName: string;
  heroNote: string;
};

const emptyForm: FormState = {
  title: "",
  district: "Quận 3",
  ward: "",
  street: "",
  addressLine: "",
  priceLabel: "",
  areaLabel: "",
  dimensions: "",
  layout: "",
  houseType: "Hẻm xe hơi",
  legal: "",
  occupancy: "",
  status: "con_ban",
  advantages: "",
  caution: "",
  suitableFor: "Ở, Đầu tư",
  managerSlug: "minh-anh",
  managerName: "Trần Minh Anh",
  heroNote: "",
};

export function AdminListingManager({
  initialListings,
  profiles,
  session,
}: {
  initialListings: ListingItem[];
  profiles: AgentProfile[];
  session: AdminSession;
}) {
  const [role] = useState<UserRole>(session.role);
  const [listings, setListings] = useState<ListingItem[]>(initialListings);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/listings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            managerProfileId: form.managerSlug,
          }),
        });

        const payload = (await response.json()) as { listing?: ListingItem; error?: string };
        if (!response.ok || !payload.listing) {
          throw new Error(payload.error ?? "Khong tao duoc listing.");
        }

        setListings((prev) => [payload.listing!, ...prev]);
        setForm(emptyForm);
        setMessage("Da tao listing moi.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong tao duoc listing.");
      }
    });
  }

  async function updateStatus(
    id: string,
    status: ListingItem["status"],
    approvalStatus?: ListingItem["approvalStatus"],
  ) {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/listings/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, approvalStatus }),
        });
        const payload = (await response.json()) as { listing?: ListingItem; error?: string };
        if (!response.ok || !payload.listing) {
          throw new Error(payload.error ?? "Khong cap nhat duoc listing.");
        }

        setListings((prev) => prev.map((item) => (item.id === id ? payload.listing! : item)));
        setMessage("Da cap nhat listing.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong cap nhat duoc listing.");
      }
    });
  }

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-card rounded-[30px] p-7">
        <div className="section-kicker">Listing production</div>
        <h3 className="mt-3 text-2xl font-black">Tao listing va dua vao queue duyet</h3>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input className="field md:col-span-2" placeholder="Tieu de listing" value={form.title} onChange={(e) => updateField("title", e.target.value)} />
          <input className="field" placeholder="Quận" value={form.district} onChange={(e) => updateField("district", e.target.value)} />
          <input className="field" placeholder="Phường" value={form.ward} onChange={(e) => updateField("ward", e.target.value)} />
          <input className="field" placeholder="Đường" value={form.street} onChange={(e) => updateField("street", e.target.value)} />
          <input className="field" placeholder="Địa chỉ đầy đủ" value={form.addressLine} onChange={(e) => updateField("addressLine", e.target.value)} />
          <input className="field" placeholder="Giá chào" value={form.priceLabel} onChange={(e) => updateField("priceLabel", e.target.value)} />
          <input className="field" placeholder="Diện tích label" value={form.areaLabel} onChange={(e) => updateField("areaLabel", e.target.value)} />
          <input className="field" placeholder="Kích thước" value={form.dimensions} onChange={(e) => updateField("dimensions", e.target.value)} />
          <input className="field" placeholder="Kết cấu" value={form.layout} onChange={(e) => updateField("layout", e.target.value)} />
          <input className="field" placeholder="Loại nhà" value={form.houseType} onChange={(e) => updateField("houseType", e.target.value)} />
          <input className="field" placeholder="Pháp lý" value={form.legal} onChange={(e) => updateField("legal", e.target.value)} />
          <input className="field" placeholder="Hiện trạng thuê / ở" value={form.occupancy} onChange={(e) => updateField("occupancy", e.target.value)} />
          <textarea className="field min-h-[110px] md:col-span-2" placeholder="Ưu điểm, mỗi dòng một ý" value={form.advantages} onChange={(e) => updateField("advantages", e.target.value)} />
          <textarea className="field min-h-[100px] md:col-span-2" placeholder="Lưu ý khi dẫn khách" value={form.caution} onChange={(e) => updateField("caution", e.target.value)} />
          <input className="field md:col-span-2" placeholder="Phù hợp cho ai, ngăn cách bởi dấu phẩy" value={form.suitableFor} onChange={(e) => updateField("suitableFor", e.target.value)} />
          <select
            className="field"
            value={form.managerSlug}
            onChange={(e) => {
              const agent = profiles.find((item) => item.slug === e.target.value);
              updateField("managerSlug", e.target.value);
              updateField("managerName", agent?.name ?? "");
            }}
          >
            {profiles.map((agent) => (
              <option key={agent.slug} value={agent.slug}>
                {agent.name}
              </option>
            ))}
          </select>
          <select className="field" value={form.status} onChange={(e) => updateField("status", e.target.value as ListingItem["status"])}>
            <option value="con_ban">Còn bán</option>
            <option value="dang_thuong_luong">Đang thương lượng</option>
            <option value="da_ban">Đã bán</option>
            <option value="ngung_ban">Ngưng bán</option>
          </select>
          <textarea className="field min-h-[100px] md:col-span-2" placeholder="Hero note / góc bán nổi bật" value={form.heroNote} onChange={(e) => updateField("heroNote", e.target.value)} />
          <button type="submit" className="primary-btn md:col-span-2" disabled={isPending}>
            {isPending ? "Dang xu ly..." : "Luu listing"}
          </button>
        </form>
        {message ? <div className="mt-4 text-sm text-[var(--brand)]">{message}</div> : null}
      </section>

      <section className="glass-card rounded-[30px] p-7">
        <div className="section-kicker">Queue listing</div>
        <h3 className="mt-3 text-2xl font-black">Danh sach listing</h3>
        <div className="mt-6 space-y-4">
          {listings.map((listing) => (
            <article key={listing.id} className="rounded-[24px] bg-zinc-950 p-5">
              <div className="font-bold text-white">{listing.title}</div>
              <div className="mt-1 text-sm text-zinc-400">
                {listing.district} · {listing.priceLabel} · {listing.status} · {listing.approvalStatus ?? "approved"}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="secondary-btn" onClick={() => updateStatus(listing.id, "con_ban", "approved")} disabled={isPending || role !== "super_admin"}>
                  Publish còn bán
                </button>
                <button type="button" className="secondary-btn" onClick={() => updateStatus(listing.id, "dang_thuong_luong", listing.approvalStatus)} disabled={isPending}>
                  Đang TL
                </button>
                <button type="button" className="secondary-btn" onClick={() => updateStatus(listing.id, "da_ban", listing.approvalStatus)} disabled={isPending}>
                  Đã bán
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
