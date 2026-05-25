"use client";

import type { SortOption } from "@/lib/filter-utils";
import { SORT_OPTIONS, countActiveFilters } from "@/lib/filter-utils";
import type { FilterState } from "@/lib/filter-utils";

interface SortBarProps {
  total: number;
  filter: FilterState;
  onOpenFilter: () => void;
  onSortChange: (sort: SortOption) => void;
}

export function SortBar({ total, filter, onOpenFilter, onSortChange }: SortBarProps) {
  const activeCount = countActiveFilters(filter);

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      {/* Left: result count + filter button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilter}
          className="secondary-btn relative flex items-center gap-2 py-2 pl-3 pr-4 text-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Bộ lọc</span>
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
        <span className="text-sm text-zinc-500">
          <span className="font-semibold text-white">{total}</span> căn
        </span>
      </div>

      {/* Right: sort dropdown */}
      <select
        value={filter.sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--s3)] px-3 py-2 text-sm text-zinc-300 focus:border-[var(--brand)] focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
