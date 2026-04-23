// src/components/cta-band.tsx
import { AnimatedSection } from "@/components/ui/animated-section";
import { PillButton } from "@/components/ui/pill-button";
import { siteConfig } from "@/lib/content";

type CtaBandProps = {
  title: string;
  description: string;
};

export function CtaBand({ title, description }: CtaBandProps) {
  return (
    <section style={{ background: "#0f2a35" }} className="relative overflow-hidden">
      {/* Wave separator at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3cc0cc]/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="accent-line animate-item mx-auto" style={{ transitionDelay: "0.1s" }} />
            <h2
              className="animate-item text-3xl font-bold tracking-tight text-white md:text-4xl"
              style={{ transitionDelay: "0.3s" }}
            >
              {title}
            </h2>
            <p
              className="animate-item text-base leading-7 text-white/70"
              style={{ transitionDelay: "0.45s" }}
            >
              {description}
            </p>
            <div
              className="animate-item flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ transitionDelay: "0.6s" }}
            >
              <PillButton href={siteConfig.whatsAppHref} variant="whatsapp">
                Pišite na WhatsApp
              </PillButton>
              <PillButton href={siteConfig.phoneHref} variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                {siteConfig.phoneDisplay}
              </PillButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
