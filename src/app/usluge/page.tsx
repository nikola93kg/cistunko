import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/ui/icon";
import { servicesPage } from "@/lib/content";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight text-[#0f2a35] md:text-5xl">
              {servicesPage.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#4a6a78]">{servicesPage.intro}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service categories */}
      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading title="Šta čistimo" />
          </AnimatedSection>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {servicesPage.categories.map((cat) => (
              <AnimatedSection key={cat.title}>
                <div className="flex flex-col gap-3 rounded-2xl border border-[#3cc0cc]/20 bg-[#f0fbfc] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#3cc0cc]">
                    <Icon name={cat.icon} size={22} weight="regular" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-[#0f2a35]">{cat.title}</h3>
                  <p className="text-sm text-[#4a6a78]">{cat.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Steam cleaner */}
      <section id="parni-cistac" className="border-b border-[#3cc0cc]/10 bg-white scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading title={servicesPage.steamCleaner.title} />
            <p className="mt-4 max-w-2xl text-base text-[#4a6a78]">{servicesPage.steamCleaner.intro}</p>
          </AnimatedSection>

          <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              {servicesPage.steamCleaner.steps.map((step, i) => (
                <AnimatedSection key={step.title}>
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3cc0cc] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#0f2a35]">{step.title}</h3>
                      <p className="mt-1 text-sm text-[#4a6a78]">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection>
              <Image
                src={servicesPage.steamCleaner.image.src}
                alt={servicesPage.steamCleaner.image.alt}
                width={600}
                height={400}
                className="h-72 w-full rounded-2xl object-cover md:h-96"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Allergies */}
      <section id="alergije" className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc] scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading title={servicesPage.allergiesSection.title} />
            <p className="mt-4 max-w-2xl text-base text-[#4a6a78]">{servicesPage.allergiesSection.intro}</p>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {servicesPage.allergiesSection.facts.map((fact) => (
              <AnimatedSection key={fact.title}>
                <div className="flex gap-4 rounded-2xl border border-[#3cc0cc]/20 bg-white p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                    <Icon name={fact.icon} size={22} weight="regular" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0f2a35]">{fact.title}</h3>
                    <p className="mt-1 text-sm text-[#4a6a78]">{fact.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Visually clean */}
      <section id="vizuelno-cisto" className="bg-white scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading title={servicesPage.visuallyCleanSection.title} />
            <p className="mt-4 max-w-2xl text-base text-[#4a6a78]">{servicesPage.visuallyCleanSection.intro}</p>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <AnimatedSection>
              <div className="rounded-2xl border border-[#3cc0cc]/20 bg-[#f0fbfc] p-8">
                <h3 className="mb-4 font-semibold text-[#4a6a78]">
                  {servicesPage.visuallyCleanSection.left.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {servicesPage.visuallyCleanSection.left.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-[#4a6a78]">
                      <Icon name="CheckCircle" size={16} weight="fill" className="mt-0.5 shrink-0 text-[#4a6a78]" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-2xl border border-[#3cc0cc] bg-[#3cc0cc]/5 p-8">
                <h3 className="mb-4 font-semibold text-[#3cc0cc]">
                  {servicesPage.visuallyCleanSection.right.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {servicesPage.visuallyCleanSection.right.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-[#0f2a35]">
                      <Icon name="CheckCircle" size={16} weight="fill" className="mt-0.5 shrink-0 text-[#3cc0cc]" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
