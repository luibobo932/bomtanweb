import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { articles, tagColors } from "@/data/articles";
import { agents } from "@/data/mock-data";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com";
  const url = `${siteUrl}/kien-thuc/${slug}`;

  return {
    title: `${article.title} | BomTan Kiến thức`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.excerpt,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
    alternates: { canonical: url },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const tagStyle = tagColors[article.tag] ?? "bg-zinc-800 text-zinc-400 border-zinc-700";
  const relatedArticles = articles
    .filter((a) => a.slug !== slug && a.tag === article.tag)
    .slice(0, 3);

  const authorAgent = agents.find((ag) => ag.slug === article.authorSlug);

  return (
    <SiteShell>
      <div className="container-wide py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">Trang chủ</Link>
          <span>/</span>
          <Link href="/kien-thuc" className="hover:text-zinc-300">Kiến thức</Link>
          <span>/</span>
          <span className="text-zinc-400">{article.tag}</span>
        </nav>

        <div className="grid gap-8 xl:grid-cols-[1fr_300px]">
          {/* Article content */}
          <article>
            {/* Header */}
            <div className="editorial-panel p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-[var(--r-full)] border px-2.5 py-1 text-[11px] font-semibold ${tagStyle}`}>
                  {article.tag}
                </span>
                <span className="text-xs text-zinc-500">📍 {article.district}</span>
                <span className="text-xs text-zinc-500">· {article.readMinutes} phút đọc</span>
              </div>

              <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">
                {article.title}
              </h1>
              <p className="mt-3 text-base leading-7 text-zinc-400">{article.excerpt}</p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-xs font-bold text-white">
                  {article.author
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{article.author}</div>
                  <div className="text-xs text-zinc-500">Chuyên gia BomTan</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="prose-bomtan mt-6 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-6 md:p-8">
              {article.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} className="mb-3 mt-6 text-lg font-black text-white first:mt-0">
                      {block.replace(/^## /, "")}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3 key={i} className="mb-2 mt-5 text-base font-bold text-white">
                      {block.replace(/^### /, "")}
                    </h3>
                  );
                }
                if (block.startsWith("| ")) {
                  const rows = block.split("\n").filter((r) => !r.match(/^\|[-| ]+\|$/));
                  return (
                    <div key={i} className="my-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        {rows.map((row, ri) => {
                          const cells = row
                            .split("|")
                            .filter((_, ci) => ci > 0 && ci < row.split("|").length - 1)
                            .map((c) => c.trim());
                          return (
                            <tr key={ri} className={ri === 0 ? "border-b border-[var(--border)]" : ""}>
                              {cells.map((cell, ci) => (
                                ri === 0 ? (
                                  <th key={ci} className="py-2 pr-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-zinc-500">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={ci} className="border-b border-[var(--border)]/50 py-2.5 pr-4 text-zinc-300">
                                    {cell}
                                  </td>
                                )
                              ))}
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  );
                }
                if (block.startsWith("```")) {
                  const code = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
                  return (
                    <pre key={i} className="my-4 overflow-x-auto rounded-[var(--r-md)] bg-[var(--s5)] p-4 text-sm text-zinc-300">
                      <code>{code}</code>
                    </pre>
                  );
                }
                if (block.match(/^(\*\*[^*]+\*\*|[-✅⚠️] )/m)) {
                  const lines = block.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="my-3 space-y-2">
                      {lines.map((line, li) => {
                        const cleaned = line.replace(/^[-✅⚠️] /, "").replace(/\*\*([^*]+)\*\*/g, "$1");
                        const prefix = line.match(/^([-✅⚠️]) /)?.[1] ?? "–";
                        return (
                          <li key={li} className="flex items-start gap-2 text-sm leading-6 text-zinc-300">
                            <span className="mt-0.5 shrink-0 text-[var(--brand)]">{prefix === "-" ? "•" : prefix}</span>
                            <span dangerouslySetInnerHTML={{ __html: cleaned.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") }} />
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                if (block.match(/^\[[ x]\]/m)) {
                  const lines = block.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="my-3 space-y-2">
                      {lines.map((line, li) => (
                        <li key={li} className="flex items-start gap-2 text-sm leading-6 text-zinc-300">
                          <span className="mt-0.5 shrink-0 text-zinc-600">☐</span>
                          <span>{line.replace(/^\[[ x]\] /, "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                const html = block
                  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br/>");
                return (
                  <p
                    key={i}
                    className="my-3 text-sm leading-7 text-zinc-300"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-6 rounded-[var(--r-lg)] border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-6 text-center">
              <div className="text-base font-black text-white">
                Đã đọc xong, muốn tư vấn thực tế?
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                Chuyên gia BomTan liên hệ trong 2 giờ — miễn phí, không ràng buộc.
              </p>
              <Link href="/gui-nhu-cau" className="primary-btn mt-4 inline-block">
                Gửi nhu cầu tư vấn →
              </Link>
            </div>

            {/* Back link */}
            <Link
              href="/kien-thuc"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300"
            >
              ← Quay lại kho kiến thức
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="hidden xl:block">
            <div className="sticky top-6 space-y-4">
              {/* Author card */}
              {authorAgent && (
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                    Tác giả
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                      {authorAgent.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{authorAgent.name}</div>
                      <div className="text-xs text-zinc-500">
                        {(authorAgent.followCount / 1000).toFixed(0)}K followers
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/doi-ngu/${authorAgent.slug}`}
                    className="secondary-btn mt-4 block w-full text-center text-sm"
                  >
                    Xem hồ sơ chuyên gia
                  </Link>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5 text-center">
                <div className="text-sm font-bold text-white">Cần tư vấn cụ thể?</div>
                <p className="mt-1 text-xs text-zinc-500">Chuyên gia liên hệ trong 2 giờ</p>
                <Link href="/gui-nhu-cau" className="primary-btn mt-3 block w-full text-sm">
                  Gửi nhu cầu →
                </Link>
              </div>

              {/* Related */}
              {relatedArticles.length > 0 && (
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5">
                  <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                    Bài liên quan
                  </div>
                  <div className="space-y-3">
                    {relatedArticles.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/kien-thuc/${rel.slug}`}
                        className="block rounded-[var(--r-md)] p-2 text-sm font-medium text-zinc-300 transition hover:bg-[var(--s5)] hover:text-white"
                      >
                        {rel.title}
                        <div className="mt-0.5 text-xs text-zinc-600">{rel.readMinutes} phút đọc</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
