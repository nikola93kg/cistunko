type SectionHeadingProps = {
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ title, description, as: Heading = "h1" }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <Heading className="text-3xl font-semibold tracking-tight text-black md:text-5xl">{title}</Heading>
      {description ? <p className="text-base leading-7 text-black/70 md:text-lg">{description}</p> : null}
    </div>
  );
}
