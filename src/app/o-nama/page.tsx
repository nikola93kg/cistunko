import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Icon } from "@/components/ui/icon";
import { aboutPage, homePage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: aboutPage.title,
  description: aboutPage.intro,
  path: "/o-nama",
});

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-24">
          <div className="space-y-5">
            <div className="accent-line hero-accent" />
            <h1 className="text-4xl font-bold tracking-tight text-[#0f2a35] md:text-5xl">{aboutPage.title}</h1>
            <p className="text-lg leading-8 text-[#4a6a78]">{aboutPage.intro}</p>
            <ul className="space-y-3">
              {aboutPage.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm font-semibold leading-6 text-[#0f2a35]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3cc0cc]" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(15,42,53,0.14)]">
            <Image
              src={aboutPage.storyImage.src}
              alt={aboutPage.storyImage.alt}
              width={800}
              height={600}
              priority
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {aboutPage.values.map((value) => (
              <AnimatedSection key={value.title}>
                <article className="h-full rounded-2xl border border-[#3cc0cc]/15 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                    <Icon name={value.icon} size={24} weight="regular" aria-hidden />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f2a35]">{value.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#4a6a78]">{value.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
