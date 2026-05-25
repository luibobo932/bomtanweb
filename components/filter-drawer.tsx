"use client";

import { useEffect, useRef } from "react";
import type { FilterState } from "@/lib/filter-utils";
import {
  AREA_PRESETS,
  DISTRICTS,
  LANEWAY_TYPES,
  PRICE_PRESETS,
  SORT_OPTIONS,
  countActiveFilters,
} from "@/lib/filter-utils";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  draft: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onApply: () => void;
  onReset: () => void;
  resultCount: number;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
      {children}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[var(--r-full)] px-3 py-1.5 text-sm transition-colors ${
        active
          ? "bg-[var(--brand)] font-semibold text-white"
          : "border border-[var(--border)] bg-[var(--s4)] text-zinc-300 hover:border-[var(--brand)] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function FilterDrawer({
  isOpen,
  onClose,
  draft,
  onChange,
  onApply,
  onReset,
  resultCount,
}: FilterDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const activeCount = countActiveFilters(draft);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function toggleDistrict(d: string) {
    const next = draft.districts.includes(d)
      ? draft.districts.filter((x) => x !== d)
      : [...draft.districts, d];
    onChange({ districts: next });
  }

  function toggleLaneway(lt: string) {
    const next = draft.lanewayTypes.includes(lt)
      ? draft.lanewayTypes.filter((x) => x !== lt)
      : [...draft.lanewayTypes, lt];
    onChange({ lanewayTypes: next });
  }

  function setHouseType(ht: string) {
    if (draft.houseType === ht) {
      onChange({ houseType: "", lanewayTypes: [] });
    } else {
      onChange({ houseType: ht, lanewayTypes: [] });
    }
  }

  function applyPricePreset(min: number, max: number) {
    const alreadySet = draft.priceMin === min && draft.priceMax === max;
    onChange(alreadySet ? { priceMin: 0, priceMax: 0 } : { priceMin: min, priceMax: max });
  }

  function applyAreaPreset(min: number, max: number) {
    const alreadySet = draft.areaMin === min && draft.areaMax === max;
    onChange(alreadySet ? { areaMin: 0, areaMax: 0 } : { areaMin: min, areaMax: max });
  }

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[440px] flex-col bg-[var(--s2)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white">Bộ lọc</span>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand)] px-1.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="text-sm text-zinc-400 underline-offset-2 hover:text-white hover:underline"
              >
                Xóa tất cả
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-zinc-400 transition hover:border-zinc-600 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Quận */}
          <section className="mb-6">
            <SectionTitle>📍 Quận / Khu vực</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {DISTRICTS.map((d) => (
                <Chip
                  key={d}
                  label={d}
                  active={draft.districts.includes(d)}
                  onClick={() => toggleDistrict(d)}
                />
              ))}
            </div>
          </section>

          {/* Loại nhà */}
          <section className="mb-6">
            <SectionTitle>🏠 Loại nhà</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {["Mặt tiền", "Hẻm xe hơi"].map((ht) => (
                <Chip
                  key={ht}
                  label={ht}
                  active={draft.houseType === ht}
                  onClick={() => setHouseType(ht)}
                />
              ))}
            </div>

            {/* Sub-filter loại hẻm */}
            {draft.houseType === "Hẻm xe hơi" && (
              <div className="mt-3 rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--s4)] p-3">
                <div className="mb-2 text-xs text-zinc-500">Loại hẻm</div>
                <div className="flex flex-wrap gap-2">
                  {LANEWAY_TYPES.map((lt) => (
                    <Chip
                      key={lt}
                      label={lt}
                      active={draft.lanewayTypes.includes(lt)}
                      onClick={() => toggleLaneway(lt)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Khoảng giá */}
          <section className="mb-6">
            <SectionTitle>💰 Khoảng giá</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((p) => (
                <Chip
                  key={p.label}
                  label={p.label}
                  active={draft.priceMin === p.min && draft.priceMax === p.max}
                  onClick={() => applyPricePreset(p.min, p.max)}
                />
              ))}
            </div>
            {/* Manual inputs */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  min={0}
                  placeholder="Từ (tỷ)"
                  value={draft.priceMin || ""}
                  onChange={(e) =>
                    onChange({ priceMin: parseFloat(e.target.value) || 0 })
                  }
                  className="field py-2.5 text-sm"
                />
              </div>
              <span className="text-zinc-500">–</span>
              <div className="flex-1">
                <input
                  type="number"
                  min={0}
                  placeholder="Đến (tỷ)"
                  value={draft.priceMax || ""}
                  onChange={(e) =>
                    onChange({ priceMax: parseFloat(e.target.value) || 0 })
                  }
                  className="field py-2.5 text-sm"
                />
              </div>
            </div>
          </section>

          {/* Diện tích */}
          <section className="mb-6">
            <SectionTitle>📐 Diện tích (m²)</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {AREA_PRESETS.map((p) => (
                <Chip
                  key={p.label}
                  label={p.label}
                  active={draft.areaMin === p.min && draft.areaMax === p.max}
                  onClick={() => applyAreaPreset(p.min, p.max)}
                />
              ))}
            </div>
            {/* Manual inputs */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  min={0}
                  placeholder="Từ (m²)"
                  value={draft.areaMin || ""}
                  onChange={(e) =>
                    onChange({ areaMin: parseFloat(e.target.value) || 0 })
                  }
                  className="field py-2.5 text-sm"
                />
              </div>
              <span className="text-zinc-500">–</span>
              <div className="flex-1">
                <input
                  type="number"
                  min={0}
                  placeholder="Đến (m²)"
                  value={draft.areaMax || ""}
                  onChange={(e) =>
                    onChange({ areaMax: parseFloat(e.target.value) || 0 })
                  }
                  className="field py-2.5 text-sm"
                />
              </div>
            </div>
          </section>

          {/* Sắp xếp */}
          <section className="mb-6">
            <SectionTitle>↕ Sắp xếp theo</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {SORT_OPTIONS.map((opt) => (
                <Chip
                  key={opt.value}
                  label={opt.label}
                  active={draft.sortBy === opt.value}
                  onClick={() => onChange({ sortBy: opt.value })}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Footer — Apply button */}
        <div className="border-t border-[var(--border)] px-5 py-4">
          <button
            type="button"
            onClick={onApply}
            className="primary-btn w-full py-3 text-base"
          >
            {resultCount > 0
              ? `Xem ${resultCount} căn →`
              : "Không tìm thấy căn nào"}
          </button>
        </div>
      </div>
    </>
  );
}
