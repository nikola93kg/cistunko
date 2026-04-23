// src/components/service-cards.tsx
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Icon } from "@/components/ui/icon";
import { homePage } from "@/lib/content";

export function ServiceCards() {
  return (
    <section className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {homePage.serviceCards.map((card) => (
            <AnimatedSection key={card.title}>
              <div className="flex flex-col gap-4 rounded-2xl border border-[#3cc0cc]/20 bg-white p-7 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                    <Icon name={card.icon} size={24} weight="regular" aria-hidden />
                  </div>
                  <span className="rounded-full bg-[#3cc0cc] px-3 py-1 text-xs font-semibold text-white">
                    {card.priceLabel}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f2a35]">{card.title}</h3>
                  <p className="mt-1 text-sm text-[#4a6a78]">{card.description}</p>
                </div>
                <Link
                  href="/usluge"
                  className="mt-auto text-sm font-semibold text-[#3cc0cc] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc]"
                >
                  Saznaj više →
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
