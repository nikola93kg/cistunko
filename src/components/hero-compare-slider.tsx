"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

type HeroImage = { src: string; alt: string };

type HeroCompareSliderProps = {
  beforeImage: HeroImage;
  afterImage: HeroImage;
  trustChip: string;
};

export function HeroCompareSlider({ beforeImage, afterImage, trustChip }: HeroCompareSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#3cc0cc]/15 bg-white p-2 shadow-[0_24px_60px_rgba(15,42,53,0.14)] sm:p-3">
      <div className="relative overflow-hidden rounded-xl">
        {mounted ? (
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={beforeImage.src}
                alt={beforeImage.alt}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={afterImage.src}
                alt={afterImage.alt}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            }
            defaultPosition={50}
            style={{ aspectRatio: "5 / 4", width: "100%" }}
          />
        ) : (
          <div className="relative aspect-[5/4] bg-[#f0fbfc]">
            <Image
              src={afterImage.src}
              alt={afterImage.alt}
              fill
              sizes="(min-width: 1024px) 56vw, (min-width: 768px) 54vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-3 sm:inset-x-4 sm:top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4a6a78] shadow-lg backdrop-blur">
            Pre
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#189cb4] shadow-lg backdrop-blur">
            Posle
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex justify-center sm:inset-x-4 sm:bottom-4 md:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#0f2a35] shadow-lg backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#3cc0cc]" aria-hidden />
            {trustChip}
          </span>
        </div>
      </div>
    </div>
  );
}
