"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/feed", label: "Video" },
  { href: "/nha-ban", label: "Nhà bán" },
  { href: "/kien-thuc", label: "Kiến thức" },
  { href: "/doi-ngu", label: "Chuyên gia" },
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
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#050508]/85 backdrop-blur-xl">
        <div className="container-shell flex h-[56px] items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-0 text-[19px] font-black tracking-[-0.04em]"
          >
            <span className="text-[var(--brand)]">Nhà</span>
            <span className="text-white/85 font-light">Phố</span>
            <span className="text-white">SG</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-[7px] px-3 py-2 text-[13px] font-medium transition-all duration-150 ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-400 hover:bg-white/[0.05] hover:text-white/90"
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-1 left-1/2 h-[2px] w-3 -translate-x-1/2 rounded-full bg-[var(--brand)]" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/admin" className="secondary-btn secondary-btn--sm">
              Đăng nhập
            </Link>
            <Link href="/gui-nha-ban" className="primary-btn primary-btn--sm">
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
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed left-0 right-0 top-[56px] z-30 border-b border-white/[0.07] bg-[#050508]/95 backdrop-blur-xl transition-all duration-200 md:hidden ${
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
      <SiteFooter />
    </div>
  );
}
