import type {
  VideoApprovalStatus,
  VideoContentType,
  VideoItem,
  VideoSourceType,
} from "@/data/mock-data";

type CreateVideoInput = {
  title: string;
  summary: string;
  videoUrl: string;
  embedCode?: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  reviewerProfileId: string;
  reviewerSlug: string;
  reviewerName: string;
  districtTag: string;
  streetTag: string;
  priceTag: string;
  houseTypeTag: string;
  contentType: VideoContentType;
  listingId?: string | null;
  listingSlug?: string | null;
  approvalStatus?: VideoApprovalStatus;
};

const SOURCE_HOSTS: Record<VideoSourceType, string[]> = {
  tiktok: ["tiktok.com", "www.tiktok.com", "vm.tiktok.com"],
  youtube: ["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"],
  facebook: ["facebook.com", "www.facebook.com", "fb.watch", "m.facebook.com"],
  cdn: [],
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseYouTubeId(url: URL) {
  if (url.hostname === "youtu.be") {
    return url.pathname.replace("/", "");
  }

  if (url.pathname.startsWith("/embed/")) {
    return url.pathname.split("/embed/")[1];
  }

  return url.searchParams.get("v");
}

function parseTikTokId(url: URL) {
  const matched = url.pathname.match(/\/video\/(\d+)/);
  return matched?.[1] ?? null;
}

function parseFacebookEmbedUrl(videoUrl: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false`;
}

function extractIframeSrc(embedCode: string) {
  const matched = embedCode.match(/src\s*=\s*["']([^"']+)["']/i);
  return matched?.[1]?.trim() ?? "";
}

function inferEmbedFromUrl(videoUrl: string, sourceType: VideoSourceType) {
  try {
    const url = new URL(videoUrl);

    if (sourceType === "youtube") {
      const youtubeId = parseYouTubeId(url);
      return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : "";
    }

    if (sourceType === "tiktok") {
      const tiktokId = parseTikTokId(url);
      return tiktokId ? `https://www.tiktok.com/embed/v2/${tiktokId}` : "";
    }

    if (sourceType === "facebook") {
      return parseFacebookEmbedUrl(videoUrl);
    }

    return videoUrl;
  } catch {
    return "";
  }
}

export function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function detectVideoSourceType(videoUrl: string): VideoSourceType {
  try {
    const hostname = new URL(videoUrl).hostname.toLowerCase();
    for (const [sourceType, hosts] of Object.entries(SOURCE_HOSTS) as [
      VideoSourceType,
      string[],
    ][]) {
      if (hosts.includes(hostname)) {
        return sourceType;
      }
    }
    return "cdn";
  } catch {
    return "cdn";
  }
}

export function validateExternalVideoInput(videoUrl: string, embedCode?: string) {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(videoUrl);
  } catch {
    return {
      ok: false,
      message: "Video URL khong hop le.",
      sourceType: null,
      embedUrl: "",
    } as const;
  }

  if (!["https:", "http:"].includes(parsedUrl.protocol)) {
    return {
      ok: false,
      message: "Chi chap nhan link http/https.",
      sourceType: null,
      embedUrl: "",
    } as const;
  }

  const sourceType = detectVideoSourceType(videoUrl);
  const embedUrl = embedCode?.trim()
    ? extractIframeSrc(embedCode.trim())
    : inferEmbedFromUrl(videoUrl, sourceType);

  if (!embedUrl) {
    return {
      ok: false,
      message: "Khong tao duoc embed cho video nay. Hay nhap them embed_code hop le.",
      sourceType: null,
      embedUrl: "",
    } as const;
  }

  return {
    ok: true,
    message: "",
    sourceType,
    embedUrl,
  } as const;
}

export function createVideoRecord(input: CreateVideoInput): VideoItem {
  const validation = validateExternalVideoInput(input.videoUrl, input.embedCode);
  if (!validation.ok || !validation.sourceType) {
    throw new Error(validation.message || "Nguon video khong hop le.");
  }

  return {
    id: `vid-${Date.now()}`,
    title: input.title.trim(),
    slug: slugify(input.title),
    districtTag: input.districtTag.trim(),
    streetTag: input.streetTag.trim(),
    priceTag: input.priceTag.trim(),
    houseTypeTag: input.houseTypeTag.trim(),
    reviewerProfileId: input.reviewerProfileId.trim(),
    reviewerSlug: input.reviewerSlug.trim(),
    reviewerName: input.reviewerName.trim(),
    summary: input.summary.trim(),
    durationSeconds: input.durationSeconds,
    thumbnailUrl:
      input.thumbnailUrl?.trim() ||
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    videoSourceType: validation.sourceType,
    videoUrl: input.videoUrl.trim(),
    embedCode: input.embedCode?.trim() || undefined,
    embedUrl: validation.embedUrl,
    cta: input.listingSlug ? "Xem chi tiet can nha" : "Xem video",
    listingId: input.listingId ?? undefined,
    listingSlug: input.listingSlug ?? undefined,
    contentType: input.contentType,
    approvalStatus: input.approvalStatus ?? "pending",
    viewCountLabel: "0",
    likeCountLabel: "0",
    commentCountLabel: "0",
    shareCountLabel: "Share",
  };
}

export function normalizeVideoForSupabase(video: VideoItem) {
  return {
    id: video.id,
    slug: video.slug,
    title: video.title,
    description: video.summary,
    video_source_type: video.videoSourceType,
    video_url: video.videoUrl,
    embed_code: video.embedCode ?? null,
    embed_url: video.embedUrl ?? null,
    thumbnail_url: video.thumbnailUrl,
    duration_seconds: video.durationSeconds,
    content_type: video.contentType,
    listing_id: video.listingId ?? null,
    reviewer_profile_id: video.reviewerProfileId,
    reviewer_slug: video.reviewerSlug,
    reviewer_name: video.reviewerName,
    district_tag: video.districtTag,
    street_tag: video.streetTag,
    price_tag: video.priceTag,
    house_type_tag: video.houseTypeTag,
    approval_status: video.approvalStatus,
    view_count_label: video.viewCountLabel,
    like_count_label: video.likeCountLabel,
    comment_count_label: video.commentCountLabel,
    share_count_label: video.shareCountLabel,
  };
}

export function mapSupabaseVideo(row: Record<string, unknown>): VideoItem {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    districtTag: String(row.district_tag ?? ""),
    streetTag: String(row.street_tag ?? ""),
    priceTag: String(row.price_tag ?? ""),
    houseTypeTag: String(row.house_type_tag ?? ""),
    reviewerProfileId: String(row.reviewer_profile_id ?? ""),
    reviewerSlug: String(row.reviewer_slug ?? ""),
    reviewerName: String(row.reviewer_name ?? ""),
    summary: String(row.description ?? ""),
    durationSeconds: Number(row.duration_seconds ?? 0),
    thumbnailUrl: String(row.thumbnail_url ?? ""),
    videoSourceType: row.video_source_type as VideoSourceType,
    videoUrl: String(row.video_url ?? ""),
    embedCode: row.embed_code ? String(row.embed_code) : undefined,
    embedUrl: row.embed_url ? String(row.embed_url) : undefined,
    cta: row.listing_id ? "Xem chi tiet can nha" : "Xem video",
    listingSlug: row.listing_slug ? String(row.listing_slug) : undefined,
    listingId: row.listing_id ? String(row.listing_id) : undefined,
    contentType: row.content_type as VideoContentType,
    approvalStatus: row.approval_status as VideoApprovalStatus,
    viewCountLabel: String(row.view_count_label ?? "0"),
    likeCountLabel: String(row.like_count_label ?? row.view_count_label ?? "0"),
    commentCountLabel: String(row.comment_count_label ?? "0"),
    shareCountLabel: String(row.share_count_label ?? "Share"),
  };
}
