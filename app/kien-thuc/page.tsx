import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { KnowledgeHubSection } from "@/components/knowledge-hub-section";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Kiến thức mua nhà phố TP.HCM | BomTan",
  description:
    "Kiến thức thực chiến từ chuyên gia: pháp lý, định giá, chọn khu vực. Đọc xong tự tin hơn trước khi gặp môi giới.",
  openGraph: {
    title: "Kiến thức mua nhà phố TP.HCM | BomTan",
    description:
      "Kiến thức thực chiến từ chuyên gia: pháp lý, định giá, chọn khu vực. Đọc xong tự tin hơn trước khi gặp môi giới.",
  },
};

export default function KnowledgePage() {
  return (
    <SiteShell>
      <section className="container-shell pt-10 md:pt-14">
        <div className="editorial-panel p-6 md:p-8">
          <div className="section-kicker">Kho kiến thức</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white md:text-3xl">
            Học trước, mua sau — để không hối hận
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Kiến thức thực chiến từ chuyên gia: pháp lý, định giá, chọn khu vực.
            Đọc xong tự tin hơn trước khi gặp môi giới.
          </p>
        </div>
      </section>

      <KnowledgeHubSection articles={articles} />
    </SiteShell>
  );
}
