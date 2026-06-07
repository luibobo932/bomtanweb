import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Bản đồ quy hoạch Quận 10",
  description:
    "Công cụ xem bản đồ quy hoạch Quận 10 phục vụ tham khảo nội bộ cho đội ngũ nhà phố.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlanningMapPage() {
  return (
    <SiteShell>
      <section className="border-b border-[#2e2e28] bg-[#0d0d0d]">
        <div className="container-shell px-4 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
                Công cụ nội bộ
              </p>
              <h1 className="mt-1 text-[24px] font-black tracking-[-0.03em] text-white md:text-[32px]">
                Bản đồ quy hoạch Quận 10
              </h1>
              <p className="mt-1 max-w-2xl text-[13px] leading-6 text-zinc-400">
                Dùng để tra cứu nhanh lớp quy hoạch theo phường. Thông tin chỉ phục vụ tham khảo nội bộ,
                cần đối chiếu nguồn pháp lý chính thức khi giao dịch.
              </p>
            </div>
            <Link href="/" className="secondary-btn secondary-btn--sm w-fit">
              Về trang chủ
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-0 pb-6 md:px-4 md:pt-4">
        <div className="mx-auto h-[calc(100vh-150px)] min-h-[680px] w-full overflow-hidden border-[#2e2e28] bg-[#111] md:max-w-[1500px] md:rounded-[18px] md:border">
          <iframe
            title="Bản đồ quy hoạch Quận 10"
            src="/quy-hoach/index.html"
            className="h-full w-full border-0"
            loading="eager"
          />
        </div>
      </section>
    </SiteShell>
  );
}
