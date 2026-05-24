import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { ListingsSection } from "@/components/listings-section";
import { getPublicListings } from "@/lib/listing-repository";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nhà đang bán — Nhà phố Q1, Q3, Q5, Q10",
  description:
    "Danh sách nhà phố đang bán tại trung tâm TP.HCM. Lọc theo quận, giá, loại nhà. Thông tin đầy đủ: pháp lý, diện tích, người phụ trách.",
};

export default async function ListingsPage() {
  const listings = await getPublicListings();

  return (
    <SiteShell>
      <section className="container-shell pt-10 md:pt-14">
        <div className="editorial-panel p-6 md:p-8">
          <SectionHeading
            kicker="Kho nhà đang bán"
            title="Dữ liệu căn nhà rõ ràng để khách ra quyết định nhanh hơn"
            description="Lọc theo quận, giá, loại hẻm. Mỗi căn có đầy đủ pháp lý, diện tích, người phụ trách liên hệ trực tiếp."
          />
        </div>
      </section>

      <section className="container-shell pb-16">
        <ListingsSection listings={listings} />
      </section>
    </SiteShell>
  );
}
