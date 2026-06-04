import Link from "next/link";

const footerLinks = [
  {
    heading: "Khám phá",
    items: [
      { label: "Video review nhà", href: "/feed" },
      { label: "Nhà đang bán", href: "/nha-ban" },
      { label: "Kiến thức BDS", href: "/kien-thuc" },
      { label: "Đội ngũ chuyên gia", href: "/doi-ngu" },
    ],
  },
  {
    heading: "Liên hệ",
    items: [
      { label: "Gửi nhu cầu mua nhà", href: "/gui-nhu-cau" },
      { label: "Đăng nhà cần bán", href: "/gui-nha-ban" },
      { label: "Chat Zalo ngay", href: process.env.NEXT_PUBLIC_ZALO_URL ?? "https://zalo.me/0911380022" },
    ],
  },
];

const districts = ["Quận 1", "Quận 3", "Quận 5", "Quận 10", "Phú Nhuận", "Bình Thạnh"];

export function SiteFooter() {
  return (
    <footer className="relative mt-16 border-t border-[var(--border)]">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[320px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--brand)]/30 to-transparent" />
      <div className="bg-[var(--s2)]">
        <div className="container-shell py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-0 text-[20px] font-black tracking-[-0.04em]"
              >
                <span className="text-[var(--brand)]">Nhà</span>
                <span className="font-light text-white/80">Phố</span>
                <span className="text-white">SG</span>
              </Link>
              <p className="mt-3 max-w-[260px] text-[13px] leading-[1.8] text-zinc-500">
                Nền tảng video review nhà phố đầu tiên tại TP.HCM — xem thực tế trước khi quyết định.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {districts.map((d) => (
                  <span
                    key={d}
                    className="rounded-[6px] border border-[var(--border)] bg-[var(--s3)] px-2.5 py-1 text-[11px] text-zinc-500"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">
                  {col.heading}
                </div>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-[13px] text-zinc-400 transition-colors duration-150 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--border)] pt-6 text-[12px] text-zinc-600 md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} NhàPhốSG · Chuyên nhà phố trung tâm TP.HCM</span>
            <span>
              Hotline & Zalo:{" "}
              <a href="tel:0911380022" className="text-zinc-400 transition-colors hover:text-white">
                0911 380 022
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
