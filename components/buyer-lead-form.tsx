"use client";

import { useState, useTransition } from "react";

const initialForm = {
  fullName: "",
  phone: "",
  preferredDistrict: "",
  budgetLabel: "",
  houseType: "",
  dimensionsRequest: "",
  purpose: "",
  notes: "",
};

export function BuyerLeadForm() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField(key: keyof typeof initialForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/buyer-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            sourceType: "direct",
          }),
        });

        const payload = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(payload.error ?? "Khong gui duoc nhu cau mua nha.");
        }

        setForm(initialForm);
        setMessage("Da gui nhu cau mua nha. Team se lien he som.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong gui duoc nhu cau.");
      }
    });
  }

  return (
    <div className="glass-card rounded-[34px] p-8 md:p-10">
      <div className="section-kicker">CRM intake form</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Khách mua gửi nhu cầu</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Form này ghi thẳng vào buyer leads để admin phân công, theo dõi nguồn và trạng thái tư vấn.
      </p>
      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <input className="field" placeholder="Họ tên" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
        <input className="field" placeholder="Số điện thoại / Zalo" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
        <input className="field" placeholder="Khu vực quan tâm" value={form.preferredDistrict} onChange={(e) => updateField("preferredDistrict", e.target.value)} />
        <input className="field" placeholder="Tầm tài chính" value={form.budgetLabel} onChange={(e) => updateField("budgetLabel", e.target.value)} />
        <input className="field" placeholder="Loại nhà mong muốn" value={form.houseType} onChange={(e) => updateField("houseType", e.target.value)} />
        <input className="field" placeholder="Diện tích / ngang nhà mong muốn" value={form.dimensionsRequest} onChange={(e) => updateField("dimensionsRequest", e.target.value)} />
        <input className="field md:col-span-2" placeholder="Mục đích mua: ở / đầu tư / kinh doanh / cho thuê" value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)} />
        <textarea className="field min-h-[140px] md:col-span-2" placeholder="Ghi chú thêm" value={form.notes} onChange={(e) => updateField("notes", e.target.value)} />
        <button type="submit" className="primary-btn md:col-span-2" disabled={isPending}>
          {isPending ? "Đang gửi..." : "Gửi nhu cầu mua nhà"}
        </button>
      </form>
      {message ? <div className="mt-4 text-sm text-[var(--brand)]">{message}</div> : null}
    </div>
  );
}
