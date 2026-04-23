// src/components/hero.tsx
import Image from "next/image";
import { siteConfig } from "@/lib/content";
import { Icon } from "@/components/ui/icon";
import { PillButton } from "@/components/ui/pill-button";

type HeroImage = { src: string; alt: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  trustChip: string;
  mainImage: HeroImage;
  thumbImages: readonly [HeroImage, HeroImage];
};

export function Hero({ eyebrow, title, description, trustChip, mainImage, thumbImages }: HeroProps) {
  return (
    <section
      className="overflow-hidden border-b border-[#3cc0cc]/10"
      style={{ background: "linear-gradient(135deg, #f0fbfc 0%, #e6f9fa 100%)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        {/* Left: Content */}
        <div className="space-y-6">
          <div className="hero-accent accent-line" />

          <p
            className="hero-item-1 inline-block rounded-full border border-[#3cc0cc]/30 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#3cc0cc]"
          >
            {eyebrow}
          </p>

          <h1
            className="hero-item-2 text-4xl font-bold leading-tight tracking-tight text-[#0f2a35] md:text-5xl"
          >
            {title}
          </h1>

          <p className="hero-item-3 text-lg leading-8 text-[#4a6a78]">
            {description}
          </p>

          <div className="hero-item-4 flex flex-col gap-3 sm:flex-row">
            <PillButton href={siteConfig.whatsAppHref} variant="whatsapp">
              Zakažite na WhatsApp
            </PillButton>
            <PillButton href={siteConfig.phoneHref} variant="secondary">
              {siteConfig.phoneDisplay}
            </PillButton>
          </div>
        </div>

        {/* Right: Image grid */}
        <div className="relative hidden md:block">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
            {/* Floating trust chip */}
            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#0f2a35] shadow-lg backdrop-blur">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <Icon name="CheckCircle" size={16} weight="fill" aria-hidden />
                {trustChip}
              </span>
            </div>
          </div>

          {/* Two thumbnails */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {thumbImages.map((img) => (
              <div key={img.src} className="overflow-hidden rounded-xl shadow-md">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={200}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pre/Posle badge */}
          <div className="absolute -right-2 top-4 rounded-full bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] px-4 py-2 text-xs font-bold text-white shadow-lg">
            Pre & Posle ✓
          </div>
        </div>
      </div>
    </section>
  );
}
