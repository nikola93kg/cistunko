type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight text-black md:text-5xl">{title}</h1>
      {description ? <p className="text-base leading-7 text-black/70 md:text-lg">{description}</p> : null}
    </div>
  );
}
