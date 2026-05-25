/** Skeleton placeholders — dùng khi đang fetch data */

export function SkeletonListingCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[var(--r-md)] border border-[var(--border)] bg-[var(--s3)]">
      <div className="aspect-[4/3] bg-[var(--s5)]" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-1/3 rounded-[var(--r-sm)] bg-[var(--border)]" />
        <div className="h-3 w-2/3 rounded-[var(--r-sm)] bg-[var(--border)]" />
        <div className="mt-3 flex gap-1.5">
          <div className="h-5 w-14 rounded-[var(--r-sm)] bg-[var(--border)]" />
          <div className="h-5 w-14 rounded-[var(--r-sm)] bg-[var(--border)]" />
          <div className="h-5 w-10 rounded-[var(--r-sm)] bg-[var(--border)]" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonVideoCard() {
  return (
    <div className="animate-pulse w-[200px] flex-none">
      <div className="aspect-[9/16] rounded-[var(--r-md)] bg-[var(--s5)]" />
      <div className="mt-2 space-y-1.5 px-1">
        <div className="h-3 w-full rounded bg-[var(--border)]" />
        <div className="h-3 w-2/3 rounded bg-[var(--border)]" />
      </div>
    </div>
  );
}

export function SkeletonAgentCard() {
  return (
    <div className="animate-pulse rounded-[22px] border border-[var(--border)] bg-[var(--s2)] p-6">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 rounded-[18px] bg-[var(--s5)]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/2 rounded bg-[var(--border)]" />
          <div className="h-3 w-1/3 rounded bg-[var(--border)]" />
        </div>
      </div>
      <div className="mt-4 flex gap-1.5">
        <div className="h-6 w-14 rounded-[var(--r-sm)] bg-[var(--border)]" />
        <div className="h-6 w-14 rounded-[var(--r-sm)] bg-[var(--border)]" />
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="h-3 w-full rounded bg-[var(--border)]" />
        <div className="h-3 w-4/5 rounded bg-[var(--border)]" />
      </div>
      <div className="mt-4 h-8 rounded-[var(--r-md)] bg-[var(--s5)]" />
    </div>
  );
}
