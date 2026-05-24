export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="section-kicker">{kicker}</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--foreground)] md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
        {description}
      </p>
    </div>
  );
}
