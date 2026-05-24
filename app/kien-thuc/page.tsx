import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

const topics = [
  {
    title: "Kinh nghiệm mua nhà phố",
    desc: "Những điều cần biết trước khi xuống cọc — từ người đã mua nhà thực tế tại Q1, Q3, Q5.",
  },
  {
    title: "Checklist trước khi đặt cọc",
    desc: "15 điểm kiểm tra pháp lý, kết cấu và quy hoạch để không mất tiền oan.",
  },
  {
    title: "Hẻm xe hơi, hẻm ba gác, mặt tiền — khác nhau thế nào?",
    desc: "Phân tích giá trị và thanh khoản của từng loại hẻm theo từng quận.",
  },
  {
    title: "Cách định giá nhà và đọc dòng tiền",
    desc: "Công thức định giá nhanh và cách tính lợi suất cho thuê để biết mua có lời không.",
  },
  {
    title: "Cách kiểm tra quy hoạch trước khi mua",
    desc: "Hướng dẫn tra quy hoạch 1/2000 trực tuyến — tránh mua phải đất dính quy hoạch.",
  },
  {
    title: "Pháp lý và lưu ý khi mua bán nhà",
    desc: "Sổ hồng, sổ đỏ, giấy tờ tay — rủi ro nào cần tránh và khi nào cần luật sư.",
  },
];

export default function KnowledgePage() {
  return (
    <SiteShell>
      <section className="container-shell pt-10 md:pt-14">
        <div className="editorial-panel p-6 md:p-8">
          <SectionHeading
            kicker="Kho kiến thức"
            title="Học trước, mua sau — để không hối hận"
            description="Kiến thức thực chiến từ chuyên gia: pháp lý, định giá, chọn khu vực. Đọc xong tự tin hơn trước khi gặp môi giới."
          />
        </div>
      </section>

      <section className="container-shell mt-8 grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, index) => (
          <article
            key={topic.title}
            className="group relative overflow-hidden rounded-[20px] border border-[#2e2e28] bg-[#111] p-6 transition hover:border-[var(--brand)]"
          >
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
              Chủ đề {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-[17px] font-black leading-tight text-white">{topic.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-500">{topic.desc}</p>
            <div className="mt-5 text-xs font-semibold text-zinc-600 transition group-hover:text-[var(--brand)]">
              Sắp ra mắt →
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="container-shell px-4 pb-16">
        <div className="rounded-[20px] border border-[#2e2e28] bg-[#0d0d0d] p-6 text-center md:p-8">
          <p className="text-sm text-zinc-500">Muốn được tư vấn trực tiếp?</p>
          <p className="mt-1 text-xl font-black text-white">
            Gửi nhu cầu — chuyên gia liên hệ trong 2 giờ
          </p>
          <Link href="/gui-nhu-cau" className="primary-btn mt-4 inline-block">
            Tư vấn miễn phí →
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
