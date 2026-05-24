import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-shell relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--brand)] opacity-[0.05] blur-[100px]" />

        <div className="relative">
          <div className="text-[96px] font-black leading-none tracking-[-0.06em] text-[var(--brand)] opacity-20 md:text-[160px]">
            404
          </div>
          <div className="-mt-6 text-[28px] font-black tracking-tight text-white md:text-[40px]">
            Không tìm thấy trang
          </div>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-zinc-400">
            Trang này không tồn tại hoặc đã bị xóa. Thử tìm kiếm listing hoặc video khác nhé.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="primary-btn !px-6 !py-3">
              Về trang chủ
            </Link>
            <Link href="/nha-ban" className="secondary-btn !px-6 !py-3">
              Xem nhà bán
            </Link>
            <Link href="/feed" className="secondary-btn !px-6 !py-3">
              Xem video
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3 text-[12px] text-zinc-600">
            <Link href="/kien-thuc" className="transition hover:text-zinc-400">Kiến thức</Link>
            <span>·</span>
            <Link href="/doi-ngu" className="transition hover:text-zinc-400">Đội ngũ</Link>
            <span>·</span>
            <Link href="/gui-nhu-cau" className="transition hover:text-zinc-400">Tư vấn miễn phí</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
