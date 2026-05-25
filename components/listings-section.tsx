"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { FilterChipsBar } from "@/components/filter-chips-bar";
import { FilterDrawer } from "@/components/filter-drawer";
import { ListingCard } from "@/components/listing-card";
import { SortBar } from "@/components/sort-bar";
import { useFilterState } from "@/hooks/use-filter-state";
import type { ListingItem } from "@/data/mock-data";
import { applyFilter, filterToChips } from "@/lib/filter-utils";

const PAGE_SIZE = 9;

export function ListingsSection({ listings }: { listings: ListingItem[] }) {
  const [page, setPage] = useState(1);
  const {
    filter,
    draft,
    updateDraft,
    updateFilter,
    applyDraft,
    resetAll,
    removeChip,
    drawerOpen,
    openDrawer,
    closeDrawer,
  } = useFilterState();

  // Preview count inside drawer (based on draft, not applied filter)
  const previewCount = useMemo(
    () => applyFilter(listings, draft).length,
    [listings, draft],
  );

  // Applied filter results
  const filtered = useMemo(
    () => applyFilter(listings, filter),
    [listings, filter],
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const activeChips = useMemo(() => filterToChips(filter), [filter]);

  function handleApply() {
    applyDraft();
    setPage(1);
  }

  function handleRemoveChip(key: string) {
    removeChip(key);
    setPage(1);
  }

  function handleClearAll() {
    resetAll();
    setPage(1);
  }

  return (
    <>
      {/* Sort + filter bar */}
      <SortBar
        total={filtered.length}
        filter={filter}
        onOpenFilter={openDrawer}
        onSortChange={(sort) => {
          // Apply sort immediately without opening drawer
          updateFilter({ sortBy: sort });
          setPage(1);
        }}
      />

      {/* Active filter chips */}
      <FilterChipsBar
        chips={activeChips}
        onRemove={handleRemoveChip}
        onClearAll={handleClearAll}
      />

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon="🏠"
            title="Chưa có listing cho bộ lọc này"
            description="Thử điều chỉnh bộ lọc hoặc xem tất cả nhà đang bán"
            action={
              <button
                type="button"
                className="primary-btn"
                onClick={handleClearAll}
              >
                Xem tất cả nhà bán
              </button>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="secondary-btn flex items-center gap-2"
              >
                Xem thêm{" "}
                {Math.min(PAGE_SIZE, filtered.length - visible.length)} căn ↓
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-zinc-600">
            Hiển thị {visible.length} / {filtered.length} căn
          </p>
        </>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        draft={draft}
        onChange={updateDraft}
        onApply={handleApply}
        onReset={() => {
          resetAll();
          setPage(1);
        }}
        resultCount={previewCount}
      />
    </>
  );
}
