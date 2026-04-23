// src/components/service-cards.tsx
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";

type ServiceCardItem = {
  title: string;
  description: string;
  icon: string;
  priceLabel: string;
};

type ServiceCardsProps = {
  items: readonly ServiceCardItem[];
};

export function ServiceCards({ items }: ServiceCardsProps) {
  return (
    <section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <AnimatedSection>
          <SectionHeading as="h2" title="Naše usluge" description="Dubinsko pranje za svaki komad i prostor." />
        </AnimatedSection>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection key={item.title}>
              <article
                className="animate-item group rounded-2xl border border-[#3cc0cc]/15 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="rounded-full bg-[#f0fbfc] px-3 py-1 text-xs font-semibold text-[#3cc0cc]">
                    {item.priceLabel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#0f2a35]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#4a6a78]">{item.description}</p>
                <p className="mt-4 text-xs font-semibold text-[#3cc0cc] transition-colors group-hover:text-[#189cb4]">
                  Saznaj više →
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
