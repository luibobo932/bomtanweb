"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/feed", label: "Video" },
  { href: "/nha-ban", label: "Nhà bán" },
  { href: "/kien-thuc", label: "Kiến thức" },
  { href: "/doi-ngu/minh-anh", label: "Chuyên gia" },
  { href: "/gui-nhu-cau", label: "Tư vấn" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Đóng menu khi navigate
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Khoá scroll body khi menu mở
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <header className="sticky top-0 z-40 border-b border-[#2e2e28] bg-[#0a0a0a]">
        <div className="container-shell flex h-[52px] items-center justify-between gap-3">
          <Link
            href="/"
            className="text-[18px] font-bold tracking-[-0.03em] text-[var(--brand)]"
          >
            Nhà<span className="font-light text-[var(--foreground)]">Phố</span>SG
          </Link>

          {/* Desktop nav */}
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
            <Link href="/admin" className="secondary-btn !px-3 !py-1.5 !text-[12px]">
              Đăng nhập
            </Link>
            <Link href="/gui-nha-ban" className="primary-btn !px-3 !py-1.5 !text-[12px]">
              Đăng nhà bán
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[8px] md:hidden"
          >
            <span
              className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed left-0 right-0 top-[52px] z-30 border-b border-[#2e2e28] bg-[#0d0d0d] transition-all duration-200 md:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="container-shell flex flex-col gap-1 py-4">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[10px] px-4 py-3 text-[15px] font-medium transition ${
                  active
                    ? "bg-[#1e1e1e] text-white"
                    : "text-zinc-400 hover:bg-[#1e1e1e] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-3 flex flex-col gap-2 border-t border-[#2e2e28] pt-4">
            <Link
              href="/gui-nha-ban"
              className="primary-btn w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Đăng nhà bán
            </Link>
            <Link
              href="/admin"
              className="secondary-btn w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Đăng nhập Admin
            </Link>
          </div>
        </nav>
      </div>

      <main>{children}</main>
    </div>
  );
}
