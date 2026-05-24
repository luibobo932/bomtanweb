import type { ReactNode } from "react";

export function LeadForm({
  title,
  description,
  fields,
  submitLabel,
}: {
  title: string;
  description: string;
  fields: ReactNode;
  submitLabel: string;
}) {
  return (
    <div className="glass-card rounded-[34px] p-8 md:p-10">
      <div className="section-kicker">CRM intake form</div>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">{description}</p>
      <form className="mt-8 grid gap-4 md:grid-cols-2">
        {fields}
        <button type="button" className="primary-btn md:col-span-2">
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
