import {
  agents,
  listings,
  videos as seedVideos,
  type UserRole,
  type VideoItem,
} from "@/data/mock-data";
import { getSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";
import {
  createVideoRecord,
  mapSupabaseVideo,
  normalizeVideoForSupabase,
  resolveExternalVideo,
} from "@/lib/video-utils";

type CreateVideoParams = {
  title: string;
  summary: string;
  videoUrl: string;
  embedCode?: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  reviewerProfileId: string;
  districtTag: string;
  streetTag: string;
  priceTag: string;
  houseTypeTag: string;
  contentType: VideoItem["contentType"];
  listingId?: string | null;
  role: UserRole;
  actorUserId?: string;
};

type UpdateVideoStatusParams = {
  id: string;
  approvalStatus: VideoItem["approvalStatus"];
  role: UserRole;
  actorUserId?: string;
};

// Chỉ dùng trong dev khi chưa có Supabase env. Trên serverless production sẽ reset mỗi invocation.
const runtimeVideos: VideoItem[] = process.env.NODE_ENV !== "production" ? [...seedVideos] : [];

async function writeAuditLog(params: {
  actorUserId?: string;
  entityId: string;
  action: string;
  payload: Record<string, unknown>;
}) {
  if (!hasSupabaseEnv() || !params.actorUserId) {
    return;
  }

  const supabase = getSupabaseClient();
  await supabase!
    .from("activity_logs")
    .insert({
      id: crypto.randomUUID(),
      actor_profile_id: params.actorUserId,
      entity_type: "video",
      entity_id: params.entityId,
      action: params.action,
      payload: params.payload,
      created_at: new Date().toISOString(),
    } as never);
}

function enrichReviewer(reviewerProfileId: string) {
  const agent = agents.find((item) => item.slug === reviewerProfileId);
  if (!agent) {
    throw new Error("Khong tim thay reviewer_profile_id hop le.");
  }

  return {
    reviewerProfileId: agent.slug,
    reviewerSlug: agent.slug,
    reviewerName: agent.name,
  };
}

async function enrichReviewerFromSupabase(reviewerProfileId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase!
    .from("profiles")
    .select("id, slug, full_name")
    .or(`id.eq.${reviewerProfileId},slug.eq.${reviewerProfileId}`)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Khong doc duoc reviewer profile: ${error.message}`);
  }

  if (!data) {
    throw new Error("reviewer_profile_id khong ton tai trong profiles.");
  }

  const profile = data as Record<string, unknown>;

  return {
    reviewerProfileId: String(profile.id),
    reviewerSlug: String(profile.slug ?? ""),
    reviewerName: String(profile.full_name ?? ""),
  };
}

function resolveListing(listingId?: string | null) {
  if (!listingId) {
    return {
      listingId: undefined,
      listingSlug: undefined,
    };
  }

  const listing = listings.find((item) => item.id === listingId);
  if (!listing) {
    throw new Error("listing_id khong ton tai trong danh sach mau.");
  }

  return {
    listingId: listing.id,
    listingSlug: listing.slug,
  };
}

async function resolveListingFromSupabase(listingId?: string | null) {
  if (!listingId) {
    return {
      listingId: undefined,
      listingSlug: undefined,
    };
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase!
    .from("listings")
    .select("id, slug")
    .eq("id", listingId)
    .maybeSingle();

  if (error) {
    throw new Error(`Khong doc duoc listing lien ket: ${error.message}`);
  }

  if (!data) {
    throw new Error("listing_id khong ton tai trong danh sach that.");
  }

  const listing = data as Record<string, unknown>;

  return {
    listingId: String(listing.id),
    listingSlug: String(listing.slug ?? ""),
  };
}

export async function getPublicVideos() {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("videos")
        .select("*")
        .eq("approval_status", "approved")
        .order("published_at", { ascending: false, nullsFirst: false });

      if (error) throw new Error(error.message);
      return (data ?? []).map((row) => mapSupabaseVideo(row));
    } catch {
      // Fallback về mock data khi Supabase không kết nối được (dev local)
      return seedVideos.filter((item) => item.approvalStatus === "approved");
    }
  }

  return runtimeVideos.filter((item) => item.approvalStatus === "approved");
}

export async function getAllVideos() {
  if (hasSupabaseEnv()) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase!
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false, nullsFirst: false });

      if (error) throw new Error(error.message);
      return (data ?? []).map((row) => mapSupabaseVideo(row));
    } catch {
      return [...seedVideos];
    }
  }

  return [...runtimeVideos];
}

export async function createAdminVideo(params: CreateVideoParams) {
  const reviewer = hasSupabaseEnv()
    ? await enrichReviewerFromSupabase(params.reviewerProfileId)
    : enrichReviewer(params.reviewerProfileId);
  const listing = hasSupabaseEnv()
    ? await resolveListingFromSupabase(params.listingId)
    : resolveListing(params.listingId);

  // Resolve embed (xử lý cả link TikTok rút gọn qua oEmbed) trước khi tạo record.
  const resolved = await resolveExternalVideo(params.videoUrl, params.embedCode);
  if (!resolved.ok || !resolved.sourceType) {
    throw new Error(resolved.message || "Nguon video khong hop le.");
  }

  const video = createVideoRecord({
    title: params.title,
    summary: params.summary,
    videoUrl: params.videoUrl,
    embedCode: params.embedCode,
    // Nếu admin không nhập thumbnail, dùng thumbnail TikTok lấy từ oEmbed.
    thumbnailUrl: params.thumbnailUrl?.trim() || resolved.thumbnailUrl,
    durationSeconds: params.durationSeconds,
    reviewerProfileId: reviewer.reviewerProfileId,
    reviewerSlug: reviewer.reviewerSlug,
    reviewerName: reviewer.reviewerName,
    districtTag: params.districtTag,
    streetTag: params.streetTag,
    priceTag: params.priceTag,
    houseTypeTag: params.houseTypeTag,
    contentType: params.contentType,
    listingId: listing.listingId,
    listingSlug: listing.listingSlug,
    approvalStatus: params.role === "super_admin" ? "approved" : "pending",
    embedUrl: resolved.embedUrl,
    sourceType: resolved.sourceType,
  });

  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!
      .from("videos")
      .insert(normalizeVideoForSupabase(video) as never)
      .select()
      .single();

    if (error) {
      throw new Error(`Khong tao duoc video metadata: ${error.message}`);
    }

    const createdVideo = mapSupabaseVideo(data);
    await writeAuditLog({
      actorUserId: params.actorUserId,
      entityId: createdVideo.id,
      action: "create_video_metadata",
      payload: {
        role: params.role,
        video_source_type: createdVideo.videoSourceType,
        video_url: createdVideo.videoUrl,
        has_embed_code: Boolean(createdVideo.embedCode),
        approval_status: createdVideo.approvalStatus,
      },
    });

    return createdVideo;
  }

  runtimeVideos.unshift(video);
  return video;
}

export async function updateVideoApprovalStatus(params: UpdateVideoStatusParams) {
  if (params.role !== "super_admin") {
    throw new Error("Chi super_admin moi duoc duyet video.");
  }

  if (hasSupabaseEnv()) {
    const supabase = getSupabaseClient();
    const payload: Record<string, unknown> = {
      approval_status: params.approvalStatus,
    };
    if (params.approvalStatus === "approved") {
      payload.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase!
      .from("videos")
      .update(payload as never)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Khong cap nhat duyet video: ${error.message}`);
    }

    const updatedVideo = mapSupabaseVideo(data);
    await writeAuditLog({
      actorUserId: params.actorUserId,
      entityId: updatedVideo.id,
      action: "update_video_approval_status",
      payload: {
        role: params.role,
        approval_status: updatedVideo.approvalStatus,
      },
    });

    return updatedVideo;
  }

  const index = runtimeVideos.findIndex((item) => item.id === params.id);
  if (index === -1) {
    throw new Error("Khong tim thay video can cap nhat.");
  }

  runtimeVideos[index] = {
    ...runtimeVideos[index],
    approvalStatus: params.approvalStatus,
  };

  return runtimeVideos[index];
}
