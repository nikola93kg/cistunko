// src/components/section-heading.tsx
type SectionHeadingProps = {
  title: string;
  description?: string;
  as?: "h1" | "h2";
  showAccentLine?: boolean;
  light?: boolean;
};

export function SectionHeading({
  title,
  description,
  as: Heading = "h1",
  showAccentLine = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {showAccentLine && <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />}
      <Heading
        className={`animate-item text-3xl font-bold tracking-tight md:text-4xl ${light ? "text-white" : "text-[#0f2a35]"}`}
        style={{ transitionDelay: "0.45s" }}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`animate-item text-base leading-7 md:text-lg ${light ? "text-white/70" : "text-[#4a6a78]"}`}
          style={{ transitionDelay: "0.6s" }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
