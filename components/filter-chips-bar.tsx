"use client";

interface Chip {
  key: string;
  label: string;
}

interface FilterChipsBarProps {
  chips: Chip[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export function FilterChipsBar({ chips, onRemove, onClearAll }: FilterChipsBarProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="flex items-center gap-1.5 rounded-[var(--r-full)] border border-[var(--brand)] bg-[var(--brand)]/10 px-3 py-1 text-sm text-white"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            className="flex h-4 w-4 items-center justify-center rounded-full text-white/60 transition hover:bg-white/20 hover:text-white"
            aria-label={`Xóa lọc ${chip.label}`}
          >
            ✕
          </button>
        </span>
      ))}
      {chips.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
        >
          Xóa tất cả
        </button>
      )}
    </div>
  );
}
