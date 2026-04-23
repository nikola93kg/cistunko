// src/app/o-nama/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Icon } from "@/components/ui/icon";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { aboutPage, homePage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "O nama",
  description: aboutPage.intro,
  path: "/o-nama",
});

export default function AboutPage() {
  return (
    <div>
      {/* Page hero */}
      <section
        className="border-b border-[#3cc0cc]/10"
        style={{ background: "linear-gradient(135deg, #f0fbfc 0%, #e6f9fa 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading title={aboutPage.title} description={aboutPage.intro} />
          </AnimatedSection>
        </div>
      </section>

      {/* Values grid */}
      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading as="h2" title="Zašto Čistunko?" />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {aboutPage.values.map((value, i) => (
              <AnimatedSection key={value.title}>
                <article
                  className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                    <Icon name={value.icon} size={24} weight="regular" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0f2a35]">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a6a78]">{value.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story / photo section */}
      <section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
          <AnimatedSection>
            <div className="space-y-4">
              <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />
              <h2
                className="animate-item text-2xl font-bold text-[#0f2a35] md:text-3xl"
                style={{ transitionDelay: "0.3s" }}
              >
                Vaš partner za čistoću
              </h2>
              <ul className="space-y-3">
                {aboutPage.points.map((point, i) => (
                  <li
                    key={point}
                    className="animate-item flex items-start gap-3 text-sm leading-7 text-[#4a6a78]"
                    style={{ transitionDelay: `${0.45 + i * 0.15}s` }}
                  >
                    <span className="mt-1 text-[#3cc0cc]">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={aboutPage.storyImage.src}
              alt={aboutPage.storyImage.alt}
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
