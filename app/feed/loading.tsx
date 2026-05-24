export default function FeedLoading() {
  return (
    <div className="container-shell pt-12">
      <div className="h-8 w-40 animate-pulse rounded-xl bg-[var(--surface-soft)]" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-video animate-pulse rounded-2xl bg-[var(--surface-soft)]" />
        ))}
      </div>
    </div>
  );
}
