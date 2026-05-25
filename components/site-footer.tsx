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
    <footer className="mt-16 border-t border-[#2e2e28] bg-[#080808]">
      <div className="container-shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="text-[22px] font-bold tracking-[-0.03em] text-[var(--brand)]">
              Nhà<span className="font-light text-white">Phố</span>SG
            </Link>
            <p className="mt-3 max-w-[280px] text-sm leading-6 text-zinc-500">
              Nền tảng video review nhà phố đầu tiên tại TP.HCM — xem thực tế trước khi quyết định.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {districts.map((d) => (
                <span key={d} className="rounded-[6px] border border-[#2e2e28] px-2.5 py-1 text-[11px] text-zinc-500">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                {col.heading}
              </div>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-400 transition hover:text-white"
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
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#2e2e28] pt-6 text-xs text-zinc-600 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} NhàPhốSG. Chuyên nhà phố trung tâm TP.HCM.</span>
          <span>Hotline & Zalo: <a href="tel:0911380022" className="text-zinc-400 hover:text-white transition">0911 380 022</a></span>
        </div>
      </div>
    </footer>
  );
}
