export type UserRole = "super_admin" | "nhan_vien" | "cong_tac_vien";
export type ListingStatus = "con_ban" | "dang_thuong_luong" | "da_ban" | "ngung_ban";
export type VideoSourceType = "tiktok" | "youtube" | "facebook" | "cdn";
export type VideoApprovalStatus = "pending" | "approved" | "rejected";
export type VideoContentType = "review_nha" | "kien_thuc";
export type LeadSourceType = "video" | "listing" | "profile" | "kien_thuc" | "direct";
export type BuyerLeadStatus =
  | "moi"
  | "da_lien_he"
  | "dang_tu_van"
  | "da_xem_nha"
  | "dang_dam_phan"
  | "chot"
  | "huy";
export type OwnerLeadStatus = "moi" | "dang_xac_minh" | "du_dieu_kien" | "tu_choi" | "da_chuyen_listing";

export type VideoItem = {
  id: string;
  title: string;
  slug: string;
  districtTag: string;
  streetTag: string;
  priceTag: string;
  houseTypeTag: string;
  reviewerProfileId: string;
  reviewerSlug: string;
  reviewerName: string;
  summary: string;
  durationSeconds: number;
  thumbnailUrl: string;
  videoSourceType: VideoSourceType;
  videoUrl: string;
  embedCode?: string;
  embedUrl?: string;
  cta: string;
  listingSlug?: string;
  listingId?: string;
  contentType: VideoContentType;
  approvalStatus: VideoApprovalStatus;
  viewCountLabel: string;
  likeCountLabel: string;
  commentCountLabel: string;
  shareCountLabel: string;
};

export type ListingItem = {
  id: string;
  slug: string;
  title: string;
  district: string;
  ward: string;
  street: string;
  addressLine?: string;
  priceLabel: string;
  areaLabel: string;
  dimensions: string;
  layout: string;
  houseType: string;
  legal: string;
  occupancy: string;
  status: ListingStatus;
  advantages: string[];
  caution: string;
  suitableFor: string[];
  managerSlug: string;
  managerName: string;
  heroNote: string;
  thumbnailUrl?: string;
  approvalStatus?: VideoApprovalStatus;
};

export type AgentProfile = {
  slug: string;
  name: string;
  role: UserRole;
  specialtyDistricts: string[];
  specialtySegment: string;
  bio: string;
  achievements: string[];
  zalo: string;
  facebook: string;
  tiktok: string;
  followCount: number;
};

export type BuyerLeadItem = {
  id: string;
  fullName: string;
  phone: string;
  preferredDistrict: string;
  budgetLabel: string;
  houseType: string;
  dimensionsRequest: string;
  purpose: string;
  notes: string;
  sourceType: LeadSourceType;
  sourceId?: string;
  assignedProfileId?: string;
  assignedProfileName?: string;
  status: BuyerLeadStatus;
  createdAt: string;
};

export type OwnerLeadItem = {
  id: string;
  ownerName: string;
  phone: string;
  addressLine: string;
  expectedPrice: string;
  dimensionsText: string;
  layoutText: string;
  legalStatus: string;
  occupancyStatus: string;
  mediaNotes: string;
  sourceType: LeadSourceType;
  sourceId?: string;
  assignedProfileId?: string;
  assignedProfileName?: string;
  status: OwnerLeadStatus;
  createdAt: string;
};

export const quickFilters = [
  "Quận 1",
  "Quận 3",
  "Quận 5",
  "Quận 10",
  "Dưới 15 tỷ",
  "Hẻm xe hơi",
  "Mặt tiền",
  "Nhà cho thuê dòng tiền",
];

export const listings: ListingItem[] = [
  {
    id: "L-Q3-001",
    slug: "hem-xe-hoi-nguyen-dinh-chieu-q3",
    title: "Nhà hẻm xe hơi 5 tầng gần Võ Văn Tần",
    district: "Quận 3",
    ward: "Võ Thị Sáu",
    street: "Nguyễn Đình Chiểu",
    addressLine: "Nguyễn Đình Chiểu, Võ Thị Sáu, Quận 3",
    priceLabel: "14.8 tỷ",
    areaLabel: "58 m2",
    dimensions: "4.1m x 14.2m",
    layout: "1 trệt 3 lầu sân thượng, 5 phòng ngủ",
    houseType: "Hẻm xe hơi",
    legal: "Sổ hồng riêng, hoàn công đầy đủ",
    occupancy: "Chủ đang ở, có thể bàn giao sớm",
    status: "con_ban",
    advantages: [
      "Hẻm sạch, xe hơi quay đầu",
      "Nội thất đồng bộ, vào ở ngay",
      "Phù hợp gia đình ở kết hợp văn phòng nhỏ",
    ],
    caution: "Giá thương lượng tốt khi thanh toán nhanh, cần hẹn trước để xem nhà.",
    suitableFor: ["Ở gia đình", "Văn phòng", "Cho thuê phòng"],
    managerSlug: "minh-anh",
    managerName: "Trần Minh Anh",
    heroNote: "Căn nhà dễ lên video review nhờ ánh sáng tốt, bố cục rõ ràng.",
    approvalStatus: "approved",
  },
  {
    id: "L-Q10-002",
    slug: "mat-tien-su-van-hanh-q10",
    title: "Mặt tiền Sư Vạn Hạnh có dòng tiền sẵn",
    district: "Quận 10",
    ward: "Phường 12",
    street: "Sư Vạn Hạnh",
    addressLine: "Sư Vạn Hạnh, Phường 12, Quận 10",
    priceLabel: "26 tỷ",
    areaLabel: "72 m2",
    dimensions: "4m x 18m",
    layout: "1 trệt 2 lầu, mặt bằng kinh doanh",
    houseType: "Mặt tiền",
    legal: "Sổ hồng riêng",
    occupancy: "Đang cho thuê 55 triệu/tháng",
    status: "dang_thuong_luong",
    advantages: [
      "Mặt tiền dễ nhận diện thương hiệu",
      "Dòng tiền có sẵn",
      "Trục giao thông lớn, phù hợp retail",
    ],
    caution: "Cần kiểm tra điều khoản hợp đồng thuê hiện tại trước khi chốt.",
    suitableFor: ["Đầu tư", "Kinh doanh", "Giữ tài sản dòng tiền"],
    managerSlug: "ngoc-han",
    managerName: "Lê Ngọc Hân",
    heroNote: "Điểm bán là dòng tiền thật, không phải chỉ đẹp bề ngoài.",
    approvalStatus: "approved",
  },
  {
    id: "L-Q5-003",
    slug: "hem-ba-gac-tran-hung-dao-q5",
    title: "Nhà hẻm ba gác gần bệnh viện Chợ Rẫy",
    district: "Quận 5",
    ward: "Phường 4",
    street: "Trần Hưng Đạo",
    addressLine: "Trần Hưng Đạo, Phường 4, Quận 5",
    priceLabel: "9.6 tỷ",
    areaLabel: "45 m2",
    dimensions: "3.8m x 11.8m",
    layout: "1 trệt 2 lầu, 4 phòng ngủ",
    houseType: "Hẻm ba gác",
    legal: "Sổ hồng riêng",
    occupancy: "Đang trống",
    status: "con_ban",
    advantages: [
      "Giá tầm trung dễ tiếp cận",
      "Gần bệnh viện, dễ cho thuê",
      "Khu vực có nhu cầu ở thực",
    ],
    caution: "Hẻm không vào được xe hơi, cần định đúng phân khúc khách.",
    suitableFor: ["Ở", "Cho thuê", "Đầu tư vừa tầm"],
    managerSlug: "bao-long",
    managerName: "Phạm Bảo Long",
    heroNote: "Căn này hợp video dạng so sánh value theo ngân sách 10 tỷ.",
    approvalStatus: "approved",
  },
];

export const agents: AgentProfile[] = [
  {
    slug: "minh-anh",
    name: "Trần Minh Anh",
    role: "nhan_vien",
    specialtyDistricts: ["Quận 3", "Phú Nhuận"],
    specialtySegment: "Nhà ở kết hợp khai thác cho thuê 12-20 tỷ",
    bio: "Tập trung nhà phố có tính thanh khoản, ưu tiên căn có video review thật và chủ nhà hợp tác.",
    achievements: ["38 video trong 60 ngày", "12 lead xem nhà/tháng", "Tỉ lệ hẹn xem nhà 31%"],
    zalo: "0909000001",
    facebook: "fb.com/minhanh.bomtan",
    tiktok: "tiktok.com/@minhanh.nhapho",
    followCount: 142000,
  },
  {
    slug: "ngoc-han",
    name: "Lê Ngọc Hân",
    role: "nhan_vien",
    specialtyDistricts: ["Quận 10", "Quận 11"],
    specialtySegment: "Mặt tiền kinh doanh và tài sản dòng tiền",
    bio: "Mạnh ở video phân tích dòng tiền, hợp với khách mua đầu tư cần số liệu nhanh, rõ, dễ ra quyết định.",
    achievements: ["Giá trị hàng đang quản lý 180 tỷ", "7 căn dòng tiền đang phụ trách"],
    zalo: "0909000002",
    facebook: "fb.com/ngochan.bomtan",
    tiktok: "tiktok.com/@ngochan.matien",
    followCount: 118000,
  },
  {
    slug: "bao-long",
    name: "Phạm Bảo Long",
    role: "cong_tac_vien",
    specialtyDistricts: ["Quận 5", "Quận 6"],
    specialtySegment: "Nhà tầm trung 8-12 tỷ",
    bio: "Tập trung tìm hàng vừa tầm, dễ ra giao dịch nhanh, nội dung gần gũi và dễ hiểu cho người mua ở thực.",
    achievements: ["17 chủ nhà gửi thông tin từ profile cá nhân"],
    zalo: "0909000003",
    facebook: "fb.com/baolong.bomtan",
    tiktok: "tiktok.com/@baolong.q5",
    followCount: 64000,
  },
];

export const videos: VideoItem[] = [
  {
    id: "vid-001",
    title: "Nhà phố Quận 3 hẻm xe hơi 8 tỷ - pháp lý đẹp",
    slug: "nha-hem-xe-hoi-nguyen-dinh-chieu",
    districtTag: "Quận 3",
    streetTag: "Nguyễn Đình Chiểu",
    priceTag: "8-10 tỷ",
    houseTypeTag: "Hẻm xe hơi",
    reviewerProfileId: "minh-anh",
    reviewerSlug: "minh-anh",
    reviewerName: "Trần Minh Anh",
    summary: "Video dẫn khách đi từ mặt hẻm vào phòng khách, lên sân thượng và chạm mạnh vào độ sáng cùng khả năng ở kết hợp cho thuê.",
    durationSeconds: 46,
    thumbnailUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
    videoSourceType: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    cta: "Xem nhà",
    listingSlug: "hem-xe-hoi-nguyen-dinh-chieu-q3",
    listingId: "L-Q3-001",
    contentType: "review_nha",
    approvalStatus: "pending",
    viewCountLabel: "12.4K",
    likeCountLabel: "12.4K",
    commentCountLabel: "284",
    shareCountLabel: "Share",
  },
  {
    id: "vid-002",
    title: "Giá nhà Q10 năm 2026 - mua lúc này có lời?",
    slug: "mat-tien-cho-thue-quan-10",
    districtTag: "Quận 10",
    streetTag: "Sư Vạn Hạnh",
    priceTag: "20-30 tỷ",
    houseTypeTag: "Mặt tiền",
    reviewerProfileId: "ngoc-han",
    reviewerSlug: "ngoc-han",
    reviewerName: "Lê Ngọc Hân",
    summary: "Phân tích nhanh tiền đoạn, giá trị khai thác và góc nhìn nhà đầu tư muốn có dòng tiền ổn định.",
    durationSeconds: 65,
    thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    videoSourceType: "facebook",
    videoUrl: "https://www.facebook.com/reel/123456789012345",
    embedCode:
      "<iframe src=\"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F123456789012345&show_text=false\" width=\"560\" height=\"315\" style=\"border:none;overflow:hidden\" scrolling=\"no\" allowfullscreen=\"true\"></iframe>",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F123456789012345&show_text=false",
    cta: "Xem nhà",
    listingSlug: "mat-tien-su-van-hanh-q10",
    listingId: "L-Q10-002",
    contentType: "review_nha",
    approvalStatus: "pending",
    viewCountLabel: "8.7K",
    likeCountLabel: "8.7K",
    commentCountLabel: "146",
    shareCountLabel: "Share",
  },
  {
    id: "vid-003",
    title: "Sổ hồng vs Sổ đỏ - khác nhau chỗ nào?",
    slug: "phan-biet-hem-xe-hoi-va-hem-ba-gac",
    districtTag: "Kiến thức",
    streetTag: "Chuyên đề",
    priceTag: "Pháp lý",
    houseTypeTag: "Kiến thức",
    reviewerProfileId: "bao-long",
    reviewerSlug: "bao-long",
    reviewerName: "Phạm Bảo Long",
    summary: "Nội dung giáo dục giúp khách biết cách đánh giá độ rộng hẻm, giá trị thanh khoản và rủi ro khi đi xem nhà.",
    durationSeconds: 59,
    thumbnailUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    videoSourceType: "tiktok",
    videoUrl: "https://www.tiktok.com/@example/video/7298140012345678901",
    embedUrl: "https://www.tiktok.com/embed/v2/7298140012345678901",
    cta: "Xem nhà",
    contentType: "kien_thuc",
    approvalStatus: "pending",
    viewCountLabel: "22.1K",
    likeCountLabel: "22.1K",
    commentCountLabel: "512",
    shareCountLabel: "Share",
  },
  {
    id: "vid-004",
    title: "Review nhà phố thật — BomTan",
    slug: "bomtan-review-thuc-te",
    districtTag: "TP.HCM",
    streetTag: "BomTan",
    priceTag: "",
    houseTypeTag: "Review thực tế",
    reviewerProfileId: "minh-anh",
    reviewerSlug: "minh-anh",
    reviewerName: "Trần Minh Anh",
    summary: "Video review nhà phố thực tế từ đội ngũ BomTan — xem trước khi quyết định.",
    durationSeconds: 60,
    thumbnailUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    videoSourceType: "tiktok",
    videoUrl: "https://vt.tiktok.com/ZSxwxHuGG/",
    embedUrl: "",
    cta: "Xem video",
    contentType: "review_nha",
    approvalStatus: "approved",
    viewCountLabel: "—",
    likeCountLabel: "—",
    commentCountLabel: "—",
    shareCountLabel: "Share",
  },
];

export const buyerLeads: BuyerLeadItem[] = [
  {
    id: "buyer-001",
    fullName: "Nguyễn Văn A",
    phone: "0912 300 001",
    preferredDistrict: "Quận 3",
    budgetLabel: "8-12 tỷ",
    houseType: "Hẻm xe hơi",
    dimensionsRequest: "Ngang 4m+",
    purpose: "Ở",
    notes: "Ưu tiên pháp lý chuẩn, xem nhà cuối tuần.",
    sourceType: "video",
    sourceId: "vid-001",
    assignedProfileId: "minh-anh",
    assignedProfileName: "Trần Minh Anh",
    status: "moi",
    createdAt: "2026-05-24T08:30:00.000Z",
  },
];

export const ownerLeads: OwnerLeadItem[] = [
  {
    id: "owner-001",
    ownerName: "Trần Thị B",
    phone: "0908 400 002",
    addressLine: "142 Lê Văn Sỹ, Phường 10, Quận 3",
    expectedPrice: "12.5 tỷ",
    dimensionsText: "4m x 18m",
    layoutText: "1 trệt 2 lầu",
    legalStatus: "Sổ hồng",
    occupancyStatus: "Đang ở",
    mediaNotes: "Có sẵn 8 ảnh và 1 video quay bằng điện thoại.",
    sourceType: "direct",
    assignedProfileId: "ngoc-han",
    assignedProfileName: "Lê Ngọc Hân",
    status: "dang_xac_minh",
    createdAt: "2026-05-24T09:10:00.000Z",
  },
];

export const stats = [
  { label: "Followers", value: "417K+" },
  { label: "Listing active", value: "120+" },
  { label: "Video review", value: "250+" },
  { label: "Chuyên gia", value: "5" },
];

export const adminHighlights = [
  { label: "Video chờ duyệt", value: 14 },
  { label: "Listing chờ duyệt", value: 9 },
  { label: "Lead mới chưa phân", value: 11 },
  { label: "CTV đang hoạt động", value: 23 },
];
