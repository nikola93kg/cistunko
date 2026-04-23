import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { aboutPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "O nama",
  description: aboutPage.intro,
  path: "/o-nama",
});

export default function AboutPage() {
  return (
    <div className="bg-zinc-50 text-black">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading title={aboutPage.title} description={aboutPage.intro} />
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {aboutPage.points.map((point) => (
              <article key={point} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-base leading-7 text-black/80">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
