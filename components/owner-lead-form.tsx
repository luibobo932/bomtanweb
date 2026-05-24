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

const PHONE_RE = /^(0[3-9]\d{8}|\+84[3-9]\d{8})$/;

export function OwnerLeadForm() {
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
        const res = await fetch("/api/owner-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const payload = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(payload.error ?? "Không gửi được thông tin.");
        setSubmitted(true);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Không gửi được thông tin.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-[34px] p-8 md:p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="mt-5 text-3xl font-black">Đã nhận thông tin!</h2>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Team NhàPhốSG sẽ gọi xác minh <span className="font-bold text-[var(--foreground)]">{form.phone}</span> trong <span className="font-bold text-[var(--foreground)]">2 giờ làm việc</span>.
        </p>
        <p className="mt-2 text-sm text-[var(--faint)]">
          Thông tin nhà của bạn sẽ được admin xem xét trước khi đăng lên hệ thống.
        </p>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setForm(initialForm); }}
          className="secondary-btn mt-6"
        >
          Gửi thêm thông tin khác
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[34px] p-8 md:p-10">
      <div className="section-kicker">Đăng ký bán nhà</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Chủ nhà gửi thông tin cần bán</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Thông tin không hiện công khai trước khi admin xác minh. Chúng tôi liên hệ trong 2 giờ.
      </p>

      <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          required
          className="field"
          placeholder="Họ tên chủ nhà *"
          value={form.ownerName}
          onChange={(e) => updateField("ownerName", e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <input
            required
            className={`field ${phoneError ? "border-red-500" : ""}`}
            placeholder="Số điện thoại / Zalo *"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={validatePhone}
          />
          {phoneError ? <p className="text-xs text-red-400">{phoneError}</p> : null}
        </div>
        <input className="field md:col-span-2" placeholder="Địa chỉ nhà (số, đường, phường, quận)" value={form.addressLine} onChange={(e) => updateField("addressLine", e.target.value)} />
        <input className="field" placeholder="Giá mong muốn (VD: 12 tỷ)" value={form.expectedPrice} onChange={(e) => updateField("expectedPrice", e.target.value)} />
        <input className="field" placeholder="Diện tích ngang x dài (VD: 4x15m)" value={form.dimensionsText} onChange={(e) => updateField("dimensionsText", e.target.value)} />
        <input className="field" placeholder="Kết cấu (VD: 1 trệt 3 lầu)" value={form.layoutText} onChange={(e) => updateField("layoutText", e.target.value)} />
        <input className="field" placeholder="Pháp lý (sổ hồng, sổ đỏ...)" value={form.legalStatus} onChange={(e) => updateField("legalStatus", e.target.value)} />
        <input className="field" placeholder="Tình trạng: đang ở / đang cho thuê" value={form.occupancyStatus} onChange={(e) => updateField("occupancyStatus", e.target.value)} />
        <textarea className="field min-h-[120px] md:col-span-2" placeholder="Mô tả thêm, link hình/video nếu có" value={form.mediaNotes} onChange={(e) => updateField("mediaNotes", e.target.value)} />

        <button type="submit" className="primary-btn md:col-span-2" disabled={isPending}>
          {isPending ? "Đang gửi..." : "Gửi thông tin nhà →"}
        </button>

        {errorMsg ? (
          <p className="md:col-span-2 text-sm text-red-400">{errorMsg}</p>
        ) : null}
      </form>
    </div>
  );
}
