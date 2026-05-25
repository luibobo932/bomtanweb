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

const PHONE_RE = /^(0[3-9]\d{8}|\+84[3-9]\d{8})$/;

export function BuyerLeadForm() {
  const [form, setForm] = useState(initialForm);
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField(key: keyof typeof initialForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "phone") setPhoneError("");
  }

  function validatePhone() {
    if (!PHONE_RE.test(form.phone.trim())) {
      setPhoneError("Số điện thoại chưa đúng định dạng. VD: 0901234567");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    if (!validatePhone()) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/buyer-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, sourceType: "direct" }),
        });
        const payload = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(payload.error ?? "Không gửi được yêu cầu.");
        setSubmitted(true);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Không gửi được yêu cầu.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-[34px] p-8 md:p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="mt-5 text-3xl font-black">Đã nhận yêu cầu!</h2>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Team NhàPhốSG sẽ liên hệ <span className="font-bold text-[var(--foreground)]">{form.phone}</span> trong vòng <span className="font-bold text-[var(--foreground)]">2 giờ làm việc</span> để tư vấn chi tiết.
        </p>
        <p className="mt-2 text-sm text-[var(--faint)]">
          Trong lúc chờ, bạn có thể xem thêm video review nhà bên dưới.
        </p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setForm(initialForm); }}
          className="secondary-btn mt-6"
        >
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[34px] p-8 md:p-10">
      <div className="section-kicker">Tư vấn miễn phí</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Gửi nhu cầu mua nhà</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Điền thông tin để chuyên gia NhàPhốSG tìm nhà phù hợp và liên hệ trong 2 giờ.
      </p>

      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-xs font-medium text-zinc-400">Họ tên <span className="text-[var(--brand)]">*</span></label>
          <input
            id="fullName"
            required
            className="field"
            placeholder="Nguyễn Văn A"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-zinc-400">Số điện thoại / Zalo <span className="text-[var(--brand)]">*</span></label>
          <input
            id="phone"
            required
            className={`field ${phoneError ? "border-red-500" : ""}`}
            placeholder="0901 234 567"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={validatePhone}
          />
          {phoneError ? <p className="text-xs text-red-400">{phoneError}</p> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredDistrict" className="text-xs font-medium text-zinc-400">Khu vực quan tâm</label>
          <input id="preferredDistrict" className="field" placeholder="VD: Quận 3, Quận 1" value={form.preferredDistrict} onChange={(e) => updateField("preferredDistrict", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="budgetLabel" className="text-xs font-medium text-zinc-400">Tầm tài chính</label>
          <input id="budgetLabel" className="field" placeholder="VD: 8–12 tỷ" value={form.budgetLabel} onChange={(e) => updateField("budgetLabel", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="houseType" className="text-xs font-medium text-zinc-400">Loại nhà</label>
          <input id="houseType" className="field" placeholder="Nhà phố, hẻm xe hơi..." value={form.houseType} onChange={(e) => updateField("houseType", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="dimensionsRequest" className="text-xs font-medium text-zinc-400">Diện tích mong muốn</label>
          <input id="dimensionsRequest" className="field" placeholder="VD: ngang 4m trở lên" value={form.dimensionsRequest} onChange={(e) => updateField("dimensionsRequest", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="purpose" className="text-xs font-medium text-zinc-400">Mục đích</label>
          <input id="purpose" className="field" placeholder="Ở / đầu tư / kinh doanh / cho thuê" value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="notes" className="text-xs font-medium text-zinc-400">Ghi chú thêm</label>
          <textarea id="notes" className="field min-h-[100px]" placeholder="Thông tin thêm để chuyên gia tư vấn chính xác hơn..." value={form.notes} onChange={(e) => updateField("notes", e.target.value)} />
        </div>

        <button type="submit" className="primary-btn md:col-span-2" disabled={isPending}>
          {isPending ? "Đang gửi..." : "Gửi yêu cầu tư vấn →"}
        </button>

        {errorMsg ? (
          <p className="md:col-span-2 text-sm text-red-400">{errorMsg}</p>
        ) : null}
      </form>
    </div>
  );
}
