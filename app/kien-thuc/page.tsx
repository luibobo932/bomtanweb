import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

const topics = [
  "Kinh nghiem mua nha pho",
  "Checklist truoc khi dat coc",
  "Phan tich hem xe hoi, hem ba gac, mat tien",
  "Cach dinh gia nha va doc dong tien",
  "Cach kiem tra quy hoach",
  "Phap ly va luu y khi mua ban",
];

export default function KnowledgePage() {
  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <SectionHeading
          kicker="Kho kien thuc"
          title="Noi dung giao duc de tao uy tin, khong chi dang nha"
          description="Kho nay se chua bai viet, video ngan, FAQ va chuyen de theo quan/deal type. Day la surface de SEO, social seeding va warm-up lead."
        />
      </section>

      <section className="container-shell mt-10 grid gap-6 lg:grid-cols-2">
        {topics.map((topic, index) => (
          <article key={topic} className="glass-card rounded-[28px] p-7">
            <div className="section-kicker">Chuyen de {String(index + 1).padStart(2, "0")}</div>
            <h3 className="mt-3 text-2xl font-black">{topic}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Trong phase that, moi bai kien thuc can co author, tag khu vuc, tag muc dich mua,
              schema SEO va CTA dan ve form nhu cau.
            </p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
