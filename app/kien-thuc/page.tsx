import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { agents } from "@/data/mock-data";

const TOPIC_TAGS = ["Tất cả", "Pháp lý", "Định giá", "Khu vực", "Tài chính", "Phong thủy"] as const;

const articles = [
  {
    slug: "kinh-nghiem-mua-nha-pho",
    title: "Kinh nghiệm mua nhà phố — những điều cần biết trước khi xuống cọc",
    excerpt:
      "Từ người đã mua nhà thực tế tại Q1, Q3, Q5 — các bẫy phổ biến và cách tránh.",
    tag: "Pháp lý",
    author: "Trần Minh Anh",
    authorSlug: "minh-anh",
    readMinutes: 5,
    district: "Quận 3",
    featured: true,
  },
  {
    slug: "checklist-truoc-khi-dat-coc",
    title: "Checklist 15 điểm trước khi đặt cọc — pháp lý, kết cấu, quy hoạch",
    excerpt:
      "15 điểm kiểm tra pháp lý, kết cấu và quy hoạch để không mất tiền oan khi mua nhà phố.",
    tag: "Pháp lý",
    author: "Lê Ngọc Hân",
    authorSlug: "ngoc-han",
    readMinutes: 7,
    district: "Quận 10",
    featured: false,
  },
  {
    slug: "hem-xe-hoi-vs-mat-tien",
    title: "Hẻm xe hơi, hẻm ba gác, mặt tiền — giá trị và thanh khoản khác nhau thế nào?",
    excerpt:
      "Phân tích giá trị và thanh khoản của từng loại hẻm theo từng quận. Mua loại nào có lợi hơn?",
    tag: "Định giá",
    author: "Phạm Bảo Long",
    authorSlug: "bao-long",
    readMinutes: 6,
    district: "Quận 5",
    featured: true,
  },
  {
    slug: "cach-dinh-gia-nha-dong-tien",
    title: "Cách định giá nhà và đọc dòng tiền — công thức tính lợi suất cho thuê",
    excerpt:
      "Công thức định giá nhanh và cách tính lợi suất cho thuê để biết mua có lời không.",
    tag: "Tài chính",
    author: "Lê Ngọc Hân",
    authorSlug: "ngoc-han",
    readMinutes: 8,
    district: "Quận 10",
    featured: false,
  },
  {
    slug: "kiem-tra-quy-hoach-truoc-khi-mua",
    title: "Cách kiểm tra quy hoạch trước khi mua — tra quy hoạch 1/2000 trực tuyến",
    excerpt:
      "Hướng dẫn từng bước tra quy hoạch — tránh mua phải đất dính quy hoạch.",
    tag: "Pháp lý",
    author: "Trần Minh Anh",
    authorSlug: "minh-anh",
    readMinutes: 4,
    district: "Quận 1",
    featured: false,
  },
  {
    slug: "so-hong-so-do-rui-ro-phap-ly",
    title: "Sổ hồng, sổ đỏ, giấy tờ tay — rủi ro nào cần tránh và khi nào cần luật sư",
    excerpt:
      "Phân biệt các loại giấy tờ nhà đất và cách đọc sổ để không bị lừa khi giao dịch.",
    tag: "Pháp lý",
    author: "Lê Ngọc Hân",
    authorSlug: "ngoc-han",
    readMinutes: 9,
    district: "Quận 3",
    featured: false,
  },
  {
    slug: "phong-thuy-nha-pho-co-dang-quan-tam",
    title: "Phong thủy nhà phố — có đáng quan tâm không và những điểm nào thực sự ảnh hưởng giá trị?",
    excerpt:
      "Góc nhìn thực tế từ chuyên gia: yếu tố phong thủy nào được người mua để ý và ảnh hưởng đến giá.",
    tag: "Phong thủy",
    author: "Phạm Bảo Long",
    authorSlug: "bao-long",
    readMinutes: 5,
    district: "Quận 5",
    featured: false,
  },
  {
    slug: "tong-quan-gia-nha-quan-1-q3-q5",
    title: "Tổng quan giá nhà Q1, Q3, Q5 năm 2026 — mua khu nào có lợi nhất?",
    excerpt:
      "So sánh giá thực tế từng khu vực, xu hướng giá và lý do người mua ở nên chọn Q3.",
    tag: "Khu vực",
    author: "Trần Minh Anh",
    authorSlug: "minh-anh",
    readMinutes: 6,
    district: "Quận 1",
    featured: true,
  },
];

const tagColors: Record<string, string> = {
  "Pháp lý": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Định giá": "bg-green-500/10 text-green-400 border-green-500/30",
  "Tài chính": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  "Phong thủy": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Khu vực": "bg-orange-500/10 text-[var(--brand)] border-[var(--brand)]/30",
};

export default function KnowledgePage() {
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <SiteShell>
      {/* Hero */}
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

          {/* Topic filter chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {TOPIC_TAGS.map((tag) => (
              <span
                key={tag}
                className={`cursor-pointer rounded-[var(--r-full)] border px-3 py-1.5 text-sm transition-colors ${
                  tag === "Tất cả"
                    ? "border-[var(--brand)] bg-[var(--brand)] font-semibold text-white"
                    : "border-[var(--border)] bg-[var(--s4)] text-zinc-300 hover:border-[var(--brand)] hover:text-white"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide mt-8 pb-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div>
            {/* Featured articles */}
            {featuredArticles.length > 0 && (
              <div className="mb-8">
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                  Nổi bật
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All articles */}
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
              Tất cả bài viết
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regularArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden xl:block">
            {/* Influencers */}
            <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5">
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                Chuyên gia chia sẻ
              </div>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/doi-ngu/${agent.slug}`}
                    className="flex items-center gap-3 rounded-[var(--r-md)] p-2 transition hover:bg-[var(--s5)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                      {agent.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">
                        {agent.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {(agent.followCount / 1000).toFixed(0)}K followers
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/doi-ngu"
                className="mt-4 block text-center text-xs text-[var(--brand)] hover:underline"
              >
                Xem tất cả chuyên gia →
              </Link>
            </div>

            {/* CTA */}
            <div className="mt-4 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5 text-center">
              <div className="text-sm font-bold text-white">Cần tư vấn cụ thể?</div>
              <p className="mt-1 text-xs text-zinc-500">
                Chuyên gia liên hệ trong 2 giờ
              </p>
              <Link
                href="/gui-nhu-cau"
                className="primary-btn mt-3 block w-full text-sm"
              >
                Gửi nhu cầu →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: (typeof articles)[0];
  featured?: boolean;
}) {
  const tagStyle =
    tagColors[article.tag] ??
    "bg-zinc-800 text-zinc-400 border-zinc-700";

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-lg hover:shadow-black/20">
      {/* Thumbnail placeholder */}
      <div className="relative aspect-[16/9] bg-[var(--s5)]">
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-zinc-700">
          📝
        </div>
        <span
          className={`absolute left-3 top-3 rounded-[var(--r-full)] border px-2.5 py-1 text-[11px] font-semibold ${tagStyle}`}
        >
          {article.tag}
        </span>
        {featured && (
          <span className="absolute right-3 top-3 rounded-[var(--r-full)] bg-[var(--brand)] px-2 py-0.5 text-[10px] font-bold text-white">
            Nổi bật
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-5 text-white">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-5 text-zinc-500">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)] text-[8px] font-bold text-white">
              {article.author
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span className="text-[11px] text-zinc-500">{article.author}</span>
          </div>
          <span className="text-[11px] text-zinc-600">{article.readMinutes} phút đọc</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-[var(--r-xs)] bg-[var(--s5)] px-2 py-0.5 text-[10px] text-zinc-500">
            📍 {article.district}
          </span>
          <span className="text-xs font-semibold text-[var(--brand)] opacity-0 transition-opacity group-hover:opacity-100">
            Đọc →
          </span>
        </div>
      </div>
    </article>
  );
}
