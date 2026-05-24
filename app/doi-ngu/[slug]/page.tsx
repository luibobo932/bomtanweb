import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getListingsByManager } from "@/lib/listing-repository";
import { getProfileBySlug } from "@/lib/profile-repository";
import { getPublicVideos } from "@/lib/video-repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getProfileBySlug(slug);
  if (!agent) return {};

  const title = `${agent.name} — Chuyên gia nhà phố ${agent.specialtyDistricts.join(", ")}`;
  const description = agent.bio;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com";
  const url = `${siteUrl}/doi-ngu/${slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "profile",
      url,
      title,
      description,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: agent.name }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: url },
  };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getProfileBySlug(slug);

  if (!agent) {
    notFound();
  }

  const ownListings = await getListingsByManager(slug);
  const ownVideos = (await getPublicVideos()).filter((item) => item.reviewerSlug === slug);

  return (
    <SiteShell>
      <section className="container-shell pt-12">
        <div className="glass-card rounded-[34px] p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="section-kicker">Profile ca nhan</div>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
                {agent.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-zinc-400">{agent.bio}</p>
              <div className="chip-row mt-6">
                {agent.specialtyDistricts.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
                <span className="chip">{agent.specialtySegment}</span>
              </div>
            </div>

            <div className="w-full max-w-md rounded-[30px] border border-[rgba(216,78,30,0.35)] bg-[linear-gradient(180deg,rgba(176,58,16,0.92),rgba(216,78,30,0.88))] p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                Lien he nhanh
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div>Zalo: {agent.zalo}</div>
                <div>Facebook: {agent.facebook}</div>
                <div>TikTok: {agent.tiktok}</div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/gui-nhu-cau"
                  className="secondary-btn border-white/20 bg-white/10 text-white"
                >
                  Gui nhu cau
                </Link>
                <Link href="/feed" className="secondary-btn border-white/20 bg-white/10 text-white">
                  Xem video
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
              <div className="section-kicker">Thanh tich</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                {agent.achievements.map((item) => (
                  <div key={item}>- {item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6">
              <div className="section-kicker">Vai tro trong he thong</div>
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                Nhan vien va cong tac vien duoc dang video va listing o trang thai cho duyet.
                Super Admin la diem kiem soat cuoi cung cho noi dung, lead va user.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-16 grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-[30px] p-6">
          <div className="section-kicker">Video da dang</div>
          <div className="mt-4 space-y-4">
            {ownVideos.map((video) => (
              <div key={video.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="font-bold text-white">{video.title}</div>
                <div className="mt-1 text-sm text-zinc-400">{video.summary}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-[30px] p-6">
          <div className="section-kicker">Listing dang phu trach</div>
          <div className="mt-4 space-y-4">
            {ownListings.map((listing) => (
              <div key={listing.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div className="font-bold text-white">{listing.title}</div>
                <div className="mt-1 text-sm text-zinc-400">
                  {listing.district} - {listing.priceLabel} - {listing.houseType}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
