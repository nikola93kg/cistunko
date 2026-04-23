// src/components/before-after-gallery.tsx
"use client";

import { useEffect, useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";

type BeforeAfterItem = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
};

type BeforeAfterGalleryProps = {
  items: readonly BeforeAfterItem[];
};

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="border-b border-[#3cc0cc]/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <AnimatedSection>
          <SectionHeading
            as="h2"
            title="Before/After — vidite razliku"
            description="Stvarni primeri rada. Pomerite klizač da vidite rezultat dubinskog pranja."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <AnimatedSection key={item.label}>
              <figure className="animate-item overflow-hidden rounded-2xl border border-[#3cc0cc]/15 shadow-md">
                {mounted ? (
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.beforeSrc}
                        alt={item.beforeAlt}
                        style={{ objectFit: "cover" }}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={item.afterSrc}
                        alt={item.afterAlt}
                        style={{ objectFit: "cover" }}
                      />
                    }
                    style={{ height: "320px" }}
                  />
                ) : (
                  <div style={{ height: "320px" }} aria-hidden="true" />
                )}
                <figcaption className="flex items-center justify-between bg-[#f0fbfc] px-5 py-3 text-sm font-semibold text-[#0f2a35]">
                  <span>{item.label}</span>
                  <span className="flex gap-3 text-xs text-[#4a6a78]">
                    <span>← Pre</span>
                    <span>Posle →</span>
                  </span>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
