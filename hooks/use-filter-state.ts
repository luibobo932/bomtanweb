"use client";

import { useCallback, useState } from "react";
import type { FilterState } from "@/lib/filter-utils";
import { DEFAULT_FILTER } from "@/lib/filter-utils";

export function useFilterState() {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  // draft = state inside the drawer before Apply is clicked
  const [draft, setDraft] = useState<FilterState>(DEFAULT_FILTER);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setDraft(filter); // sync draft with current applied filter
    setDrawerOpen(true);
  }, [filter]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const updateDraft = useCallback((updates: Partial<FilterState>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const applyDraft = useCallback(() => {
    setFilter(draft);
    setDrawerOpen(false);
  }, [draft]);

  const resetAll = useCallback(() => {
    setFilter(DEFAULT_FILTER);
    setDraft(DEFAULT_FILTER);
  }, []);

  /** Remove a single chip (applied filter) by key */
  const removeChip = useCallback((key: string) => {
    setFilter((prev) => {
      if (key.startsWith("district:")) {
        const d = key.replace("district:", "");
        return { ...prev, districts: prev.districts.filter((x) => x !== d) };
      }
      if (key === "houseType") return { ...prev, houseType: "", lanewayTypes: [] };
      if (key.startsWith("lane:")) {
        const lt = key.replace("lane:", ""); // e.g. "Xe hơi"
        return { ...prev, lanewayTypes: prev.lanewayTypes.filter((x) => x !== lt) };
      }
      if (key === "price") return { ...prev, priceMin: 0, priceMax: 0 };
      if (key === "area") return { ...prev, areaMin: 0, areaMax: 0 };
      return prev;
    });
  }, []);

  /** Directly update the applied filter (e.g. sort change without opening drawer) */
  const updateFilter = useCallback((updates: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
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
  };
}
