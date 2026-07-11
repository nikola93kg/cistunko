import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Icon } from "@/components/ui/icon";
import { buildMetadata } from "@/lib/seo";
import { homePage, servicesPage } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: servicesPage.title,
  description: servicesPage.intro,
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="accent-line hero-accent" />
            <h1 className="text-4xl font-bold tracking-tight text-[#0f2a35] md:text-5xl">{servicesPage.title}</h1>
            <p className="text-lg leading-8 text-[#4a6a78]">{servicesPage.intro}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {servicesPage.categories.map((category) => (
              <AnimatedSection key={category.title}>
                <article className="h-full rounded-2xl border border-[#3cc0cc]/15 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                    <Icon name={category.icon} size={24} weight="regular" aria-hidden />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f2a35]">{category.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#4a6a78]">{category.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <div className="max-w-3xl space-y-4">
              <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />
              <h2 className="animate-item text-3xl font-bold tracking-tight text-[#0f2a35] md:text-4xl" style={{ transitionDelay: "0.3s" }}>
                {servicesPage.processTitle}
              </h2>
            </div>
          </AnimatedSection>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {servicesPage.processSteps.map((step, index) => (
              <AnimatedSection key={step}>
                <div className="h-full rounded-2xl border border-[#3cc0cc]/15 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#3cc0cc] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-[#4a6a78]">{step}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="parni-cistac" className="scroll-mt-28 border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-24">
          <AnimatedSection>
            <div className="space-y-5">
              <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />
              <h2 className="animate-item text-3xl font-bold tracking-tight text-[#0f2a35] md:text-4xl" style={{ transitionDelay: "0.3s" }}>
                {servicesPage.steamCleaner.title}
              </h2>
              <p className="animate-item text-base leading-7 text-[#4a6a78]" style={{ transitionDelay: "0.45s" }}>
                {servicesPage.steamCleaner.intro}
              </p>
              <div className="grid gap-3">
                {servicesPage.steamCleaner.steps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-5">
                    <h3 className="text-sm font-bold text-[#0f2a35]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4a6a78]">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(15,42,53,0.14)]">
              <Image
                src={servicesPage.steamCleaner.image.src}
                alt={servicesPage.steamCleaner.image.alt}
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="alergije" className="scroll-mt-28 border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <div className="max-w-3xl space-y-4">
              <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />
              <h2 className="animate-item text-3xl font-bold tracking-tight text-[#0f2a35] md:text-4xl" style={{ transitionDelay: "0.3s" }}>
                {servicesPage.allergiesSection.title}
              </h2>
              <p className="animate-item text-base leading-7 text-[#4a6a78]" style={{ transitionDelay: "0.45s" }}>
                {servicesPage.allergiesSection.intro}
              </p>
            </div>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicesPage.allergiesSection.facts.map((fact) => (
              <AnimatedSection key={fact.title}>
                <article className="h-full rounded-2xl border border-[#3cc0cc]/15 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                    <Icon name={fact.icon} size={22} weight="regular" aria-hidden />
                  </div>
                  <h3 className="text-base font-bold text-[#0f2a35]">{fact.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4a6a78]">{fact.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="vizuelno-cisto" className="scroll-mt-28 border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <div className="max-w-3xl space-y-4">
              <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />
              <h2 className="animate-item text-3xl font-bold tracking-tight text-[#0f2a35] md:text-4xl" style={{ transitionDelay: "0.3s" }}>
                {servicesPage.visuallyCleanSection.title}
              </h2>
              <p className="animate-item text-base leading-7 text-[#4a6a78]" style={{ transitionDelay: "0.45s" }}>
                {servicesPage.visuallyCleanSection.intro}
              </p>
            </div>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[servicesPage.visuallyCleanSection.left, servicesPage.visuallyCleanSection.right].map((column) => (
              <AnimatedSection key={column.heading}>
                <div className="h-full rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-7">
                  <h3 className="text-xl font-bold text-[#0f2a35]">{column.heading}</h3>
                  <ul className="mt-5 space-y-3">
                    {column.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-[#4a6a78]">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3cc0cc]" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
