import { siteConfig } from "@/lib/content";
import { HeroCompareSlider } from "@/components/hero-compare-slider";
import { Icon } from "@/components/ui/icon";
import { PillButton } from "@/components/ui/pill-button";

type HeroImage = { src: string; alt: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  trustChip: string;
  beforeImage: HeroImage;
  afterImage: HeroImage;
};

export function Hero({ eyebrow, title, description, trustChip, beforeImage, afterImage }: HeroProps) {
  return (
    <section
      className="overflow-hidden border-b border-[#3cc0cc]/15 bg-[#f7fdfe]"
    >
      <div className="mx-auto grid max-w-[1480px] gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-28 lg:py-24 xl:gap-32">
        <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
          <p
            className="hero-item-1 inline-flex items-center gap-2 rounded-full border border-[#3cc0cc]/20 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#189cb4] shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#3cc0cc]" aria-hidden />
            {eyebrow}
          </p>

          <h1
            className="hero-item-2 mt-5 text-4xl font-bold leading-tight tracking-tight text-[#0f2a35] md:text-5xl"
          >
            {title}
          </h1>

          <p className="hero-item-3 mt-5 text-lg leading-8 text-[#4a6a78]">
            {description}
          </p>

          <div className="hero-item-4 mt-7 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            <PillButton href={siteConfig.whatsAppHref} variant="whatsapp" className="h-12 w-[50vw] px-5 py-0 sm:w-auto">
              <Icon name="WhatsappLogo" size={18} weight="bold" aria-hidden />
              WhatsApp
            </PillButton>
            <PillButton href={siteConfig.viberHref} variant="viber" className="h-12 w-[50vw] px-5 py-0 sm:w-auto">
              <Icon name="ChatCircleText" size={18} weight="bold" aria-hidden />
              Viber
            </PillButton>
            <PillButton href={siteConfig.phoneHref} variant="secondary" className="h-12 w-[50vw] px-5 py-0 sm:w-auto">
              <Icon name="Phone" size={18} weight="bold" aria-hidden />
              Pozovi
            </PillButton>
          </div>

          <p className="hero-item-5 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4a6a78]">
            <Icon name="CheckCircle" size={18} weight="fill" className="text-[#3cc0cc]" aria-hidden />
            {trustChip}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[640px] justify-self-center md:mx-0 md:max-w-none md:justify-self-end lg:max-w-[820px]">
          <HeroCompareSlider beforeImage={beforeImage} afterImage={afterImage} trustChip={trustChip} />
        </div>
      </div>
    </section>
  );
}
