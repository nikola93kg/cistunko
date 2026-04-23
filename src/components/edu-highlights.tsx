// src/components/edu-highlights.tsx
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";
import type { EduItem } from "@/lib/content";

type EduHighlightsProps = {
  items: readonly EduItem[];
};

export function EduHighlights({ items }: EduHighlightsProps) {
  return (
    <section className="border-b border-[#3cc0cc]/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <AnimatedSection>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#3cc0cc]">Edukacija</p>
          <SectionHeading title="Zašto je dubinsko pranje važno" as="h2" />
        </AnimatedSection>

        <div className="mt-16 flex flex-col gap-24">
          {items.map((item) => (
            <AnimatedSection key={item.id}>
              <div className="grid items-center gap-10 md:grid-cols-2">
                {/* Text side */}
                <div className={item.imagePosition === "right" ? "md:order-first" : "md:order-last"}>
                  <h3 className="text-2xl font-bold text-[#0f2a35] md:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#4a6a78]">{item.summary}</p>
                  <Link
                    href={`/usluge#${item.id}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3cc0cc] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc]"
                  >
                    Saznaj više →
                  </Link>
                </div>

                {/* Image side */}
                <div className={`overflow-hidden rounded-2xl ${item.imagePosition === "right" ? "md:order-last" : "md:order-first"}`}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover md:h-80"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
