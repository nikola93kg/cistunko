// src/app/page.tsx
import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { CtaBand } from "@/components/cta-band";
import { EduHighlights } from "@/components/edu-highlights";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { homePage } from "@/lib/content";

export default function HomePage() {
  return (
    <div>
      <Hero
        eyebrow={homePage.hero.eyebrow}
        title={homePage.hero.title}
        description={homePage.hero.description}
        trustChip={homePage.hero.trustChip}
        mainImage={homePage.hero.mainImage}
        thumbImages={homePage.hero.thumbImages}
      />
      <ServiceCards />
      <EduHighlights items={homePage.eduHighlights} />
      <BeforeAfterGallery items={homePage.beforeAfterItems} />
      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
