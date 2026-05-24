"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/feed", label: "Video" },
  { href: "/nha-ban", label: "Nhà bán" },
  { href: "/doi-ngu/minh-anh", label: "Chuyên gia" },
  { href: "/gui-nhu-cau", label: "Tư vấn" },
  { href: "/admin", label: "Admin" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="site-shell">
      <header className="sticky top-0 z-40 border-b border-[#2e2e28] bg-[#0a0a0a]">
        <div className="container-shell flex h-[52px] items-center justify-between gap-3">
          <Link href="/" className="text-[18px] font-bold tracking-[-0.03em] text-[var(--brand)]">
            Nhà<span className="font-light text-[var(--foreground)]">Phố</span>SG
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-[6px] px-3 py-2 text-[13px] transition ${
                    active
                      ? "bg-[#1e1e1e] text-white"
                      : "text-zinc-400 hover:bg-[#1e1e1e] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/admin/login" className="secondary-btn !px-3 !py-1.5 !text-[12px]">
              Đăng nhập
            </Link>
            <Link href="/gui-nha-ban" className="primary-btn !px-3 !py-1.5 !text-[12px]">
              Đăng nhà bán
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
