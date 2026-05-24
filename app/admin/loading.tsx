export default function AdminLoading() {
  return (
    <div className="container-shell pt-12">
      <div className="h-8 w-56 animate-pulse rounded-xl bg-[var(--surface-soft)]" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card animate-pulse rounded-[26px] p-6">
            <div className="h-10 w-16 rounded-lg bg-[var(--surface-soft)]" />
            <div className="mt-3 h-4 w-24 rounded-lg bg-[var(--surface-soft)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
