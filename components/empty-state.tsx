import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: string;
}

export function EmptyState({ title, description, action, icon = "◎" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--r-lg)] border border-[var(--border)] bg-[#0d0d0d] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--s3)] text-2xl text-zinc-600">
        {icon}
      </div>
      <div className="mt-4 font-black text-white">{title}</div>
      {description && (
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
