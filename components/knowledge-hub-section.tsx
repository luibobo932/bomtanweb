"use client";

import Link from "next/link";
import { useState } from "react";
import { agents } from "@/data/mock-data";
import { type ArticleItem, tagColors, TOPIC_TAGS } from "@/data/articles";

function ArticleCard({ article, featured = false }: { article: ArticleItem; featured?: boolean }) {
  const tagStyle = tagColors[article.tag] ?? "bg-zinc-800 text-zinc-400 border-zinc-700";

  return (
    <Link href={`/kien-thuc/${article.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] transition-all hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-lg hover:shadow-black/20">
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
    </Link>
  );
}

export function KnowledgeHubSection({ articles }: { articles: ArticleItem[] }) {
  const [activeTag, setActiveTag] = useState<string>("Tất cả");

  const filtered =
    activeTag === "Tất cả" ? articles : articles.filter((a) => a.tag === activeTag);

  const featured = filtered.filter((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);

  return (
    <>
      {/* Filter chips */}
      <div className="container-shell mt-5">
        <div className="flex flex-wrap gap-2">
          {TOPIC_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`cursor-pointer rounded-[var(--r-full)] border px-3 py-1.5 text-sm transition-colors ${
                activeTag === tag
                  ? "border-[var(--brand)] bg-[var(--brand)] font-semibold text-white"
                  : "border-[var(--border)] bg-[var(--s4)] text-zinc-300 hover:border-[var(--brand)] hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="container-wide mt-8 pb-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_300px]">
          {/* Article list */}
          <div>
            {featured.length > 0 && (
              <div className="mb-8">
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                  Nổi bật
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featured.map((article) => (
                    <ArticleCard key={article.slug} article={article} featured />
                  ))}
                </div>
              </div>
            )}

            {regular.length > 0 && (
              <>
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                  {activeTag === "Tất cả" ? "Tất cả bài viết" : `Chủ đề: ${activeTag}`}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {regular.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </>
            )}

            {filtered.length === 0 && (
              <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-8 text-center text-zinc-500">
                Chưa có bài viết chủ đề này.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden xl:block">
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
                      <div className="truncate text-sm font-semibold text-white">{agent.name}</div>
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

            <div className="mt-4 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--s3)] p-5 text-center">
              <div className="text-sm font-bold text-white">Cần tư vấn cụ thể?</div>
              <p className="mt-1 text-xs text-zinc-500">Chuyên gia liên hệ trong 2 giờ</p>
              <Link href="/gui-nhu-cau" className="primary-btn mt-3 block w-full text-sm">
                Gửi nhu cầu →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
