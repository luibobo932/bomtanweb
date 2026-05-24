"use client";

import { useState, useTransition } from "react";
import { type AgentProfile, type ListingItem, type UserRole, type VideoItem } from "@/data/mock-data";
import type { AdminSession } from "@/lib/auth";

type FormState = {
  title: string;
  summary: string;
  videoUrl: string;
  embedCode: string;
  thumbnailUrl: string;
  durationSeconds: string;
  reviewerProfileId: string;
  districtTag: string;
  streetTag: string;
  priceTag: string;
  houseTypeTag: string;
  contentType: "review_nha" | "kien_thuc";
  listingId: string;
};

const emptyForm: FormState = {
  title: "",
  summary: "",
  videoUrl: "",
  embedCode: "",
  thumbnailUrl: "",
  durationSeconds: "45",
  reviewerProfileId: "minh-anh",
  districtTag: "Quan 3",
  streetTag: "Nguyen Dinh Chieu",
  priceTag: "14.8 ty",
  houseTypeTag: "Hem xe hoi",
  contentType: "review_nha",
  listingId: "",
};

export function AdminVideoManager({
  initialVideos,
  availableListings,
  profiles,
  session,
}: {
  initialVideos: VideoItem[];
  availableListings: ListingItem[];
  profiles: AgentProfile[];
  session: AdminSession;
}) {
  const [role] = useState<UserRole>(session.role);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            durationSeconds: Number(form.durationSeconds),
            listingId: form.listingId || undefined,
          }),
        });

        const payload = (await response.json()) as {
          video?: VideoItem;
          error?: string;
        };

        if (!response.ok || !payload.video) {
          throw new Error(payload.error ?? "Khong tao duoc video.");
        }

        setVideos((prev) => [payload.video!, ...prev]);
        setForm((prev) => ({
          ...emptyForm,
          reviewerProfileId: prev.reviewerProfileId,
          districtTag: prev.districtTag,
          streetTag: prev.streetTag,
          priceTag: prev.priceTag,
          houseTypeTag: prev.houseTypeTag,
        }));
        setMessage(
          payload.video.approvalStatus === "approved"
            ? "Video da duoc tao va publish ngay."
            : "Video da duoc tao o trang thai cho duyet.",
        );
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Khong tao duoc video.");
      }
    });
  }

  async function updateStatus(id: string, approvalStatus: "approved" | "rejected") {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/videos/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ approvalStatus }),
        });

        const payload = (await response.json()) as {
          video?: VideoItem;
          error?: string;
        };

        if (!response.ok || !payload.video) {
          throw new Error(payload.error ?? "Khong cap nhat duoc video.");
        }

        setVideos((prev) =>
          prev.map((item) => (item.id === id ? payload.video! : item)),
        );
        setMessage("Da cap nhat trang thai duyet video.");
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Khong cap nhat duoc video.",
        );
      }
    });
  }

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="glass-card rounded-[30px] p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="section-kicker">Video metadata</div>
            <h3 className="mt-3 text-2xl font-black">
              Nhap `video_url` hoac `embed_code`
            </h3>
          </div>

          <div className="rounded-full bg-[rgba(182,73,38,0.1)] px-4 py-3 text-sm font-semibold text-[var(--brand)]">
            Role hien tai: {role}
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          MVP chi nhung video tu TikTok, YouTube, Facebook hoac CDN khac. Website
          khong luu file video tren server app.
        </p>

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input
            className="field md:col-span-2"
            placeholder="Tieu de video"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
          <textarea
            className="field min-h-[120px] md:col-span-2"
            placeholder="Mo ta ngan / summary"
            value={form.summary}
            onChange={(event) => updateField("summary", event.target.value)}
          />
          <input
            className="field md:col-span-2"
            placeholder="video_url: link TikTok / YouTube / Facebook / CDN"
            value={form.videoUrl}
            onChange={(event) => updateField("videoUrl", event.target.value)}
          />
          <textarea
            className="field min-h-[120px] md:col-span-2"
            placeholder="embed_code (tuy chon, dung khi can nhung iframe co san)"
            value={form.embedCode}
            onChange={(event) => updateField("embedCode", event.target.value)}
          />
          <input
            className="field md:col-span-2"
            placeholder="Thumbnail URL (neu co)"
            value={form.thumbnailUrl}
            onChange={(event) => updateField("thumbnailUrl", event.target.value)}
          />
          <input
            className="field"
            placeholder="Thoi luong giay"
            value={form.durationSeconds}
            onChange={(event) => updateField("durationSeconds", event.target.value)}
          />
          <select
            className="field"
            value={form.contentType}
            onChange={(event) =>
              updateField("contentType", event.target.value as FormState["contentType"])
            }
          >
            <option value="review_nha">Review nha</option>
            <option value="kien_thuc">Kien thuc</option>
          </select>
          <select
            className="field"
            value={form.reviewerProfileId}
            onChange={(event) => updateField("reviewerProfileId", event.target.value)}
          >
            {profiles.map((agent) => (
              <option key={agent.slug} value={agent.slug}>
                {agent.name}
              </option>
            ))}
          </select>
          <select
            className="field"
            value={form.listingId}
            onChange={(event) => updateField("listingId", event.target.value)}
          >
            <option value="">Khong gan listing</option>
            {availableListings.map((listing) => (
              <option key={listing.id} value={listing.id}>
                {listing.id} - {listing.title}
              </option>
            ))}
          </select>
          <input
            className="field"
            placeholder="Tag quan"
            value={form.districtTag}
            onChange={(event) => updateField("districtTag", event.target.value)}
          />
          <input
            className="field"
            placeholder="Tag duong"
            value={form.streetTag}
            onChange={(event) => updateField("streetTag", event.target.value)}
          />
          <input
            className="field"
            placeholder="Tag gia"
            value={form.priceTag}
            onChange={(event) => updateField("priceTag", event.target.value)}
          />
          <input
            className="field"
            placeholder="Tag loai nha"
            value={form.houseTypeTag}
            onChange={(event) => updateField("houseTypeTag", event.target.value)}
          />
          <button className="primary-btn md:col-span-2" type="submit" disabled={isPending}>
            {isPending ? "Dang xu ly..." : "Luu video metadata"}
          </button>
        </form>

        {message ? <div className="mt-4 text-sm text-[var(--brand-deep)]">{message}</div> : null}
      </section>

      <section className="glass-card rounded-[30px] p-7">
        <div className="section-kicker">Queue duyet</div>
        <h3 className="mt-3 text-2xl font-black">Danh sach video hien tai</h3>
        <div className="mt-6 space-y-4">
          {videos.map((video) => (
            <article key={video.id} className="rounded-[24px] bg-[rgba(255,255,255,0.58)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold">{video.title}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {video.reviewerName} · {video.videoSourceType} · {video.approvalStatus}
                  </div>
                </div>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[var(--brand)]"
                >
                  Mo link
                </a>
              </div>

              <div className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
                <div>
                  {video.listingId
                    ? `Gan listing ${video.listingId}`
                    : "Video kien thuc / chua gan listing"}
                </div>
                <div>{video.embedCode ? "Da co embed_code" : "Dang dung auto-embed tu video_url"}</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => updateStatus(video.id, "approved")}
                  disabled={isPending || role !== "super_admin"}
                >
                  Duyet publish
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => updateStatus(video.id, "rejected")}
                  disabled={isPending || role !== "super_admin"}
                >
                  Tu choi
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
