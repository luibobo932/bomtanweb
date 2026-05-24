import { z } from "zod";

const phoneRegex = /^(0[3-9]\d{8}|\+84[3-9]\d{8})$/;

export const buyerLeadSchema = z.object({
  fullName: z.string().min(2, "Ho ten toi thieu 2 ky tu").max(100).trim(),
  phone: z
    .string()
    .regex(phoneRegex, "So dien thoai khong hop le (VD: 0901234567)")
    .trim(),
  preferredDistrict: z.string().max(100).trim().optional().default(""),
  budgetLabel: z.string().max(100).trim().optional().default(""),
  houseType: z.string().max(100).trim().optional().default(""),
  dimensionsRequest: z.string().max(200).trim().optional().default(""),
  purpose: z.string().max(200).trim().optional().default(""),
  notes: z.string().max(1000).trim().optional().default(""),
  sourceType: z
    .enum(["video", "listing", "profile", "kien_thuc", "direct"])
    .optional()
    .default("direct"),
  sourceId: z.string().max(100).optional(),
});

export const ownerLeadSchema = z.object({
  ownerName: z.string().min(2, "Ho ten toi thieu 2 ky tu").max(100).trim(),
  phone: z
    .string()
    .regex(phoneRegex, "So dien thoai khong hop le (VD: 0901234567)")
    .trim(),
  addressLine: z.string().max(300).trim().optional().default(""),
  expectedPrice: z.string().max(100).trim().optional().default(""),
  dimensionsText: z.string().max(200).trim().optional().default(""),
  layoutText: z.string().max(300).trim().optional().default(""),
  legalStatus: z.string().max(200).trim().optional().default(""),
  occupancyStatus: z.string().max(200).trim().optional().default(""),
  mediaNotes: z.string().max(1000).trim().optional().default(""),
});

export const createVideoSchema = z.object({
  title: z.string().min(5, "Tieu de toi thieu 5 ky tu").max(300).trim(),
  summary: z.string().max(2000).trim().optional().default(""),
  videoUrl: z.string().url("URL video khong hop le"),
  embedCode: z.string().max(5000).optional(),
  thumbnailUrl: z.string().url("URL thumbnail khong hop le").optional(),
  durationSeconds: z.number().int().min(0).max(7200).optional().default(0),
  reviewerProfileId: z.string().min(1, "Can chon reviewer").max(200),
  districtTag: z.string().max(100).trim().optional().default(""),
  streetTag: z.string().max(100).trim().optional().default(""),
  priceTag: z.string().max(100).trim().optional().default(""),
  houseTypeTag: z.string().max(100).trim().optional().default(""),
  contentType: z.enum(["review_nha", "kien_thuc"]).optional().default("review_nha"),
  listingId: z.string().max(100).optional().nullable(),
});

export const updateVideoStatusSchema = z.object({
  approvalStatus: z.enum(["pending", "approved", "rejected"]),
});

const listingStatusEnum = z.enum(["con_ban", "dang_thuong_luong", "da_ban", "ngung_ban"]);
const approvalStatusEnum = z.enum(["pending", "approved", "rejected"]);

export const createListingSchema = z.object({
  title: z.string().min(5).max(300).trim(),
  district: z.string().max(100).trim().optional().default(""),
  ward: z.string().max(100).trim().optional().default(""),
  street: z.string().max(200).trim().optional().default(""),
  addressLine: z.string().max(400).trim().optional().default(""),
  priceLabel: z.string().max(100).trim().optional().default(""),
  areaLabel: z.string().max(100).trim().optional().default(""),
  dimensions: z.string().max(200).trim().optional().default(""),
  layout: z.string().max(300).trim().optional().default(""),
  houseType: z.string().max(100).trim().optional().default(""),
  legal: z.string().max(200).trim().optional().default(""),
  occupancy: z.string().max(200).trim().optional().default(""),
  status: listingStatusEnum.optional().default("con_ban"),
  advantages: z.union([z.array(z.string()), z.string()]).optional().default([]),
  caution: z.string().max(1000).trim().optional().default(""),
  suitableFor: z.union([z.array(z.string()), z.string()]).optional().default([]),
  managerProfileId: z.string().max(200).optional().default(""),
  managerSlug: z.string().max(200).optional().default(""),
  managerName: z.string().max(200).optional().default(""),
  heroNote: z.string().max(500).trim().optional().default(""),
  approvalStatus: approvalStatusEnum.optional().default("pending"),
});

export const updateListingSchema = z.object({
  status: listingStatusEnum,
  approvalStatus: approvalStatusEnum.optional(),
});

const buyerLeadStatusEnum = z.enum([
  "moi", "da_lien_he", "dang_tu_van", "da_xem_nha", "dang_dam_phan", "chot", "huy",
]);
const ownerLeadStatusEnum = z.enum([
  "moi", "dang_xac_minh", "du_dieu_kien", "tu_choi", "da_chuyen_listing",
]);

export const updateBuyerLeadSchema = z.object({
  status: buyerLeadStatusEnum,
  assignedProfileId: z.string().max(200).optional(),
  assignedProfileName: z.string().max(200).optional(),
});

export const updateOwnerLeadSchema = z.object({
  status: ownerLeadStatusEnum,
  assignedProfileId: z.string().max(200).optional(),
  assignedProfileName: z.string().max(200).optional(),
});
