export default function NhaBanLoading() {
  return (
    <div className="container-shell pt-12">
      <div className="h-8 w-48 animate-pulse rounded-xl bg-[var(--surface-soft)]" />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card animate-pulse rounded-[26px] p-6">
            <div className="h-5 w-3/4 rounded-lg bg-[var(--surface-soft)]" />
            <div className="mt-3 h-4 w-1/2 rounded-lg bg-[var(--surface-soft)]" />
            <div className="mt-4 h-4 w-1/3 rounded-lg bg-[var(--surface-soft)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
