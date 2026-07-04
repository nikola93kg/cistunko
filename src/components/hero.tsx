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

export function Hero({ eyebrow, title, description, trustChip, mainImage }: HeroProps) {
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
        <div className="relative hidden origin-center md:block md:scale-[1.06] lg:scale-[1.08]">
          <div className="relative overflow-hidden rounded-2xl border border-[#3cc0cc]/15 bg-white p-3 shadow-[0_24px_60px_rgba(15,42,53,0.14)]">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={640}
                height={480}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
                priority
              />
              <div className="absolute inset-y-0 left-0 w-1/2 bg-[#0f2a35]/20 backdrop-saturate-50" aria-hidden />
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/90 shadow-[0_0_18px_rgba(15,42,53,0.35)]" aria-hidden />
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#189cb4] shadow-lg backdrop-blur" aria-hidden>
                <Icon name="CheckCircle" size={20} weight="fill" />
              </div>

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#0f2a35] shadow-lg backdrop-blur">
                <Icon name="CheckCircle" size={16} weight="fill" className="text-[#3cc0cc]" aria-hidden />
                {trustChip}
              </div>
            </div>
          </div>

          {/* Pre/Posle badge */}
          <div className="absolute -right-3 top-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] px-4 py-2 text-xs font-bold text-white shadow-[0_14px_30px_rgba(24,156,180,0.28)]">
            <Icon name="CheckCircle" size={14} weight="fill" aria-hidden />
            Pre i posle
          </div>
        </div>
      </div>
    </section>
  );
}
