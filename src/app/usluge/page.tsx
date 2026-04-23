// src/app/usluge/page.tsx
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { homePage, servicesPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Usluge",
  description: servicesPage.intro,
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <div>
      {/* Page hero */}
      <section
        className="border-b border-[#3cc0cc]/10"
        style={{ background: "linear-gradient(135deg, #f0fbfc 0%, #e6f9fa 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading title={servicesPage.title} description={servicesPage.intro} />
          </AnimatedSection>
        </div>
      </section>

      {/* Service categories */}
      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading
              as="h2"
              title="Nameštaj, dušeci i auto enterijer"
              description="Dubinsko pranje prilagođavamo vrsti komada, materijalu i stepenu zaprljanja."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {servicesPage.categories.map((category, i) => (
              <AnimatedSection key={category.title}>
                <article
                  className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="mt-3 text-lg font-bold text-[#0f2a35]">{category.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a6a78]">{category.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading as="h2" title={servicesPage.processTitle} />
          </AnimatedSection>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {servicesPage.processSteps.map((step, index) => (
              <AnimatedSection key={step}>
                <li
                  className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-white p-8 shadow-sm"
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-[#4a6a78]">{step}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
