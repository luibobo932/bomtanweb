import type { ListingItem } from "@/data/mock-data";

export type SortOption =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "area_desc"
  | "area_asc";

export type FilterState = {
  districts: string[];
  houseType: string; // "" | "Mặt tiền" | "Hẻm xe hơi"
  lanewayTypes: string[]; // sub-filter khi chọn hẻm
  priceMin: number; // tỷ
  priceMax: number; // tỷ, 0 = không giới hạn
  areaMin: number; // m²
  areaMax: number; // m², 0 = không giới hạn
  sortBy: SortOption;
};

export const DEFAULT_FILTER: FilterState = {
  districts: [],
  houseType: "",
  lanewayTypes: [],
  priceMin: 0,
  priceMax: 0,
  areaMin: 0,
  areaMax: 0,
  sortBy: "newest",
};

export const DISTRICTS = [
  "Quận 1",
  "Quận 3",
  "Quận 5",
  "Quận 10",
  "Phú Nhuận",
  "Bình Thạnh",
  "Tân Bình",
  "Gò Vấp",
];

export const LANEWAY_TYPES = ["Xe hơi", "Ba gác", "Xe máy 2 bánh"];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "price_asc", label: "Giá tăng dần" },
  { value: "price_desc", label: "Giá giảm dần" },
  { value: "area_desc", label: "Diện tích lớn nhất" },
  { value: "area_asc", label: "Diện tích nhỏ nhất" },
];

export const PRICE_PRESETS: { label: string; min: number; max: number }[] = [
  { label: "0–3 tỷ", min: 0, max: 3 },
  { label: "3–5 tỷ", min: 3, max: 5 },
  { label: "5–10 tỷ", min: 5, max: 10 },
  { label: "10–20 tỷ", min: 10, max: 20 },
  { label: "20–50 tỷ", min: 20, max: 50 },
];

export const AREA_PRESETS: { label: string; min: number; max: number }[] = [
  { label: "≤ 50m²", min: 0, max: 50 },
  { label: "50–80m²", min: 50, max: 80 },
  { label: "80–120m²", min: 80, max: 120 },
  { label: "> 120m²", min: 120, max: 0 },
];

/** Nonlinear slider: position 0–1 → giá tỷ
 * 0–0.33  → 0–20 tỷ (chi tiết)
 * 0.33–1  → 20–500 tỷ (coarse)
 */
export function sliderToPrice(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped <= 0.33) return Math.round((clamped / 0.33) * 20);
  return Math.round(20 + ((clamped - 0.33) / 0.67) * 480);
}

export function priceToSlider(price: number): number {
  if (price <= 0) return 0;
  if (price <= 20) return (price / 20) * 0.33;
  return 0.33 + ((price - 20) / 480) * 0.67;
}

/** Đếm số filter đang active (để hiện badge) */
export function countActiveFilters(f: FilterState): number {
  let n = 0;
  if (f.districts.length > 0) n++;
  if (f.houseType) n++;
  if (f.lanewayTypes.length > 0) n++;
  if (f.priceMin > 0 || f.priceMax > 0) n++;
  if (f.areaMin > 0 || f.areaMax > 0) n++;
  return n;
}

/** Parse "14.8 tỷ" → 14.8 */
export function parsePriceTy(label: string): number {
  return parseFloat(label.replace(/[^\d.]/g, "")) || 0;
}

/** Parse "58 m2" → 58 */
export function parseAreaM2(label: string): number {
  return parseFloat(label.replace(/[^\d.]/g, "")) || 0;
}

/** Apply FilterState to a listings array */
export function applyFilter(listings: ListingItem[], f: FilterState): ListingItem[] {
  let result = listings.filter((l) => {
    // Quận
    if (f.districts.length > 0 && !f.districts.includes(l.district)) return false;

    // Loại nhà
    if (f.houseType === "Mặt tiền") {
      if (!l.houseType.toLowerCase().includes("mặt tiền")) return false;
    } else if (f.houseType === "Hẻm xe hơi") {
      if (!l.houseType.toLowerCase().includes("hẻm")) return false;
      // Sub-filter loại hẻm
      if (f.lanewayTypes.length > 0) {
        const type = l.houseType.toLowerCase();
        const matched = f.lanewayTypes.some((lt) => {
          if (lt === "Xe hơi") return type.includes("xe hơi") || type.includes("xe hoi");
          if (lt === "Ba gác") return type.includes("ba gác") || type.includes("ba gac");
          if (lt === "Xe máy 2 bánh") return type.includes("xe máy") || type.includes("2 bánh");
          return false;
        });
        if (!matched) return false;
      }
    }

    // Giá
    const price = parsePriceTy(l.priceLabel);
    if (f.priceMin > 0 && price < f.priceMin) return false;
    if (f.priceMax > 0 && price > f.priceMax) return false;

    // Diện tích
    const area = parseAreaM2(l.areaLabel);
    if (f.areaMin > 0 && area < f.areaMin) return false;
    if (f.areaMax > 0 && area > f.areaMax) return false;

    return true;
  });

  // Sắp xếp
  result = [...result].sort((a, b) => {
    switch (f.sortBy) {
      case "price_asc":
        return parsePriceTy(a.priceLabel) - parsePriceTy(b.priceLabel);
      case "price_desc":
        return parsePriceTy(b.priceLabel) - parsePriceTy(a.priceLabel);
      case "area_asc":
        return parseAreaM2(a.areaLabel) - parseAreaM2(b.areaLabel);
      case "area_desc":
        return parseAreaM2(b.areaLabel) - parseAreaM2(a.areaLabel);
      case "newest":
      default:
        return b.id.localeCompare(a.id);
    }
  });

  return result;
}

/** Build human-readable label for active filter chips */
export function filterToChips(f: FilterState): { key: string; label: string }[] {
  const chips: { key: string; label: string }[] = [];
  f.districts.forEach((d) => chips.push({ key: `district:${d}`, label: d }));
  if (f.houseType) chips.push({ key: "houseType", label: f.houseType });
  f.lanewayTypes.forEach((lt) => chips.push({ key: `lane:${lt}`, label: `Hẻm ${lt.toLowerCase()}` }));
  if (f.priceMin > 0 || f.priceMax > 0) {
    const minStr = f.priceMin > 0 ? `${f.priceMin} tỷ` : "0";
    const maxStr = f.priceMax > 0 ? `${f.priceMax} tỷ` : "∞";
    chips.push({ key: "price", label: `${minStr}–${maxStr}` });
  }
  if (f.areaMin > 0 || f.areaMax > 0) {
    const minStr = f.areaMin > 0 ? `${f.areaMin}m²` : "0";
    const maxStr = f.areaMax > 0 ? `${f.areaMax}m²` : "∞";
    chips.push({ key: "area", label: `${minStr}–${maxStr}` });
  }
  return chips;
}
