import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { homePage } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="bg-zinc-50 pb-28 text-black md:pb-0">
      <Hero {...homePage.hero} />
      <ServiceCards items={homePage.serviceCards} />
      <BeforeAfterGallery items={homePage.beforeAfterItems} />
      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
