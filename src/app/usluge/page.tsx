import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { homePage, servicesPage } from "@/lib/content";

export default function ServicesPage() {
  return (
    <div className="bg-zinc-50 text-black">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading title={servicesPage.title} description={servicesPage.intro} />
        </div>
      </section>

      <section className="border-b border-black/10 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            as="h2"
            title="Nameštaj, dušeci i auto enterijer"
            description="Dubinsko pranje prilagođavamo vrsti komada, materijalu i stepenu zaprljanja."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {servicesPage.categories.map((category) => (
              <article key={category} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-black">{category}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading as="h2" title={servicesPage.processTitle} />
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {servicesPage.processSteps.map((step, index) => (
              <li key={step} className="rounded-3xl border border-black/10 bg-zinc-50 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
                  Korak {index + 1}
                </p>
                <p className="mt-3 text-base leading-7 text-black/80">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
