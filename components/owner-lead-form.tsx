"use client";

import { useState, useTransition } from "react";

const initialForm = {
  ownerName: "",
  phone: "",
  addressLine: "",
  expectedPrice: "",
  dimensionsText: "",
  layoutText: "",
  legalStatus: "",
  occupancyStatus: "",
  mediaNotes: "",
};

export function OwnerLeadForm() {
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
        const response = await fetch("/api/owner-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const payload = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(payload.error ?? "Khong gui duoc thong tin chu nha.");
        }

        setForm(initialForm);
        setMessage("Da gui thong tin can ban. Admin se goi xac minh.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong gui duoc thong tin.");
      }
    });
  }

  return (
    <div className="glass-card rounded-[34px] p-8 md:p-10">
      <div className="section-kicker">CRM intake form</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Chủ nhà gửi thông tin cần bán</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Form này tạo owner lead nội bộ. Thông tin không tự public ra ngoài trước khi admin duyệt.
      </p>
      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <input className="field" placeholder="Họ tên chủ nhà" value={form.ownerName} onChange={(e) => updateField("ownerName", e.target.value)} />
        <input className="field" placeholder="Số điện thoại / Zalo" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
        <input className="field md:col-span-2" placeholder="Địa chỉ nhà" value={form.addressLine} onChange={(e) => updateField("addressLine", e.target.value)} />
        <input className="field" placeholder="Giá mong muốn" value={form.expectedPrice} onChange={(e) => updateField("expectedPrice", e.target.value)} />
        <input className="field" placeholder="Diện tích ngang x dài" value={form.dimensionsText} onChange={(e) => updateField("dimensionsText", e.target.value)} />
        <input className="field" placeholder="Kết cấu" value={form.layoutText} onChange={(e) => updateField("layoutText", e.target.value)} />
        <input className="field" placeholder="Pháp lý" value={form.legalStatus} onChange={(e) => updateField("legalStatus", e.target.value)} />
        <input className="field" placeholder="Tình trạng: đang ở / cho thuê" value={form.occupancyStatus} onChange={(e) => updateField("occupancyStatus", e.target.value)} />
        <textarea className="field min-h-[140px] md:col-span-2" placeholder="Mô tả thêm, link hình/video nếu có" value={form.mediaNotes} onChange={(e) => updateField("mediaNotes", e.target.value)} />
        <button type="submit" className="primary-btn md:col-span-2" disabled={isPending}>
          {isPending ? "Đang gửi..." : "Gửi thông tin nhà"}
        </button>
      </form>
      {message ? <div className="mt-4 text-sm text-[var(--brand)]">{message}</div> : null}
    </div>
  );
}
