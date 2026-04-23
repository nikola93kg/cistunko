# Čistunko Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all UX/accessibility issues from the Phase 2 design review, remove car-cleaning service entirely, and add three educational content sections (parni čistač, alergije, vizuelno čisto) based on real Instagram posts.

**Architecture:** Content-first — all new data shapes land in `content.ts` first, then components consume them. A new `Icon` utility component (`src/components/ui/icon.tsx`) centralises all Phosphor icon rendering; existing components swap emoji strings for `<Icon name="..." />` calls. Three new edu sections on `/usluge` are the full-detail counterparts of homepage `EduHighlights` teasers, linked via anchor IDs (`#parni-cistac`, `#alergije`, `#vizuelno-cisto`).

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, `@phosphor-icons/react` (new), `@testing-library/react`, `@testing-library/user-event`, Vitest.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `package.json` | Add `@phosphor-icons/react` |
| Modify | `src/lib/content.ts` | Remove auto service, add icon name strings, add 4 new content shapes, define `EduItem` type |
| Create | `src/components/ui/icon.tsx` | Registry of Phosphor icons + `Icon` renderer component + `IconName` type |
| Modify | `src/components/site-header.tsx` | Mobile hamburger nav (`"use client"`, `useState`, `List`/`X` Phosphor icons) |
| Modify | `src/app/layout.tsx` | Skip-to-content link + `id="main-content"` on `<main>`, update metadata description |
| Modify | `src/components/contact-form.tsx` | Focus ring opacity `/20` → `/50` on all 3 inputs |
| Modify | `src/components/service-cards.tsx` | `Icon` component, price chip contrast fix, `Saznaj više` → `<Link>` |
| Modify | `src/components/before-after-gallery.tsx` | Empty skeleton div → `animate-pulse bg-[#f0fbfc]` |
| Modify | `src/components/hero.tsx` | Remove hardcoded `⭐` from trust chip |
| Modify | `src/app/o-nama/page.tsx` | Emoji span → `<Icon>` on values grid |
| Modify | `src/app/kontakt/page.tsx` | Emoji span → `<Icon>` on contact links; `<h2>Zona rada</h2>` → `SectionHeading` + `AnimatedSection` |
| Modify | `src/app/usluge/page.tsx` | Emoji → Icon, section heading fix, 3 new edu sections with anchor IDs |
| Create | `src/components/edu-highlights.tsx` | Alternating text/image rows; "Saznaj više →" links to `/usluge#<id>` |
| Modify | `src/app/page.tsx` | Import + render `EduHighlights` between `BeforeAfterGallery` and `CtaBand` |
| Modify | `src/app/__tests__/home-page.test.tsx` | Replace "Auto enterijer" assertion, add edu highlights assertions |
| Create | `src/app/__tests__/layout-shell.test.tsx` | Test mobile hamburger toggle |
| Create | `src/components/__tests__/edu-highlights.test.tsx` | Test all items render + anchor links |
| Modify | `src/app/__tests__/services-page.test.tsx` | Add 3 new edu section assertions; assert no auto service |

---

### Task 1: Install dependencies + update content.ts

**Files:**
- Modify: `package.json`
- Modify: `src/lib/content.ts`
- Modify: `src/app/__tests__/home-page.test.tsx`

- [ ] **Step 1: Update home-page test to reflect content changes (write the failing test first)**

Replace `src/app/__tests__/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("home page", () => {
  it("renders the homepage sections", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /moderan i pouzdan servis/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nameštaj i dušeci")).toBeInTheDocument();
    expect(screen.getByText("Dušeci i jastuci")).toBeInTheDocument();
    expect(screen.queryByText("Auto enterijer")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /before\/after/i })).toBeInTheDocument();
    expect(screen.getByText(/pozovite ili pišite na whatsapp/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the failing test**

```bash
cd /Users/apple/Projects/cistunko-rs
npx vitest run src/app/__tests__/home-page.test.tsx
```

Expected: FAIL — "Unable to find an element with the text: Dušeci i jastuci"

- [ ] **Step 3: Install @phosphor-icons/react**

```bash
npm install @phosphor-icons/react
```

- [ ] **Step 4: Replace src/lib/content.ts**

```ts
// src/lib/content.ts
import { siteConfig } from "@/lib/site-config";

// Inline type — matches icon.tsx after Task 2 is complete
export type IconName =
  | "Armchair"
  | "Bed"
  | "Chair"
  | "Leaf"
  | "Wrench"
  | "CheckCircle"
  | "Phone"
  | "WhatsappLogo"
  | "InstagramLogo"
  | "Wind"
  | "ShieldCheck"
  | "Baby"
  | "HeartStraight";

export type EduItem = {
  id: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  imagePosition: "left" | "right";
};

export const navigationItems = [
  { label: "Početna", href: "/" },
  { label: "Usluge", href: "/usluge" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const homePage = {
  hero: {
    eyebrow: "Dubinsko pranje",
    title: "Moderan i pouzdan servis dubinskog pranja za vaš dom.",
    description:
      "Čistunko spaja premium rezultat, brz odgovor i autentičan dokaz rada kroz stvarne before/after primere.",
    trustChip: "100+ zadovoljnih klijenata",
    mainImage: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      alt: "Dubinski čista garnitura",
    },
    thumbImages: [
      {
        src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
        alt: "Profesionalno pranje tepiha",
      },
      {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
        alt: "Profesionalno pranje dušeka",
      },
    ] as const,
  },
  serviceCards: [
    {
      title: "Nameštaj i dušeci",
      description: "Ugaone garniture, fotelje, stolice, dušeci i tapacirani komadi.",
      icon: "Armchair" as IconName,
      priceLabel: "Od 2.000 RSD",
    },
    {
      title: "Dušeci i jastuci",
      description: "Dubinsko pranje dušeka, jastuci i zaštitnih navlaka. Bezbedno za decu i alergičare.",
      icon: "Bed" as IconName,
      priceLabel: "Od 1.500 RSD",
    },
  ],
  beforeAfterItems: [
    {
      beforeSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      afterSrc: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      beforeAlt: "Garnitura pre dubinskog pranja",
      afterAlt: "Garnitura posle dubinskog pranja",
      label: "Garnitura",
    },
    {
      beforeSrc: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
      afterSrc: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
      beforeAlt: "Fotelja pre čišćenja",
      afterAlt: "Fotelja posle čišćenja",
      label: "Fotelja",
    },
  ],
  eduHighlights: [
    {
      id: "parni-cistac",
      title: "Parni čistač — šta je i kako radi",
      summary:
        "Parni čistač koristi vrelu paru pod pritiskom da prodre duboko u vlakna tkanine. Bez hemikalija, bez ostataka, bez mirisa. Efikasan na tekstilu, tepisima i tvrđim površinama.",
      image: {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Parni čistač na poslu",
      },
      imagePosition: "right" as const,
    },
    {
      id: "alergije",
      title: "Alergije i nameštaj — veza koja se ne vidi",
      summary:
        "Grinje, spore plesni i bakterije žive duboko u tkanini i ne mogu se ukloniti običnim usisivačem. Dubinsko pranje eliminiše uzročnike alergija i stvara bezbedan prostor za sve ukućane.",
      image: {
        src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        alt: "Čist dušek bez alergena",
      },
      imagePosition: "left" as const,
    },
    {
      id: "vizuelno-cisto",
      title: "Nameštaj može izgledati čisto — ali nije",
      summary:
        "Vidljive mrlje su samo jedan deo problema. Duboko u tkanini skupljaju se organski ostaci, prašina, alergeni i bakterije kojih nema na površini. Dubinsko pranje čisti ono što oko ne vidi.",
      image: {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
        alt: "Pre i posle dubinskog pranja garniture",
      },
      imagePosition: "right" as const,
    },
  ] as EduItem[],
  ctaBand: {
    title: "Pozovite ili pišite na WhatsApp za brz dogovor.",
    description: "Najbrži put do termina je direktan kontakt.",
  },
} as const;

export const servicesPage = {
  title: "Usluge",
  intro:
    "Radimo dubinsko pranje komada i površina koje najviše trpe svakodnevnu upotrebu u vašem domu.",
  categories: [
    {
      title: "Ugaone garniture i trosedi",
      description: "Kompletno pranje sa ekstraktorom — dubinsko usisavanje, tretman i ispiranje.",
      icon: "Armchair" as IconName,
    },
    {
      title: "Fotelje i stolice",
      description: "Pažljiv tretman prilagođen vrsti tkanine i stepenu zaprljanja.",
      icon: "Chair" as IconName,
    },
    {
      title: "Dušeci",
      description: "Uklanjamo grinje, bakterije i neprijatne mirise. Bezbedno za decu i alergičare.",
      icon: "Bed" as IconName,
    },
  ],
  processTitle: "Kako izgleda proces",
  processSteps: [
    "Pregled stanja i dogovor oko tretmana.",
    "Dubinsko izvlačenje nečistoće odgovarajućim sredstvima.",
    "Završna provera i preporuka za sušenje/održavanje.",
  ],
  steamCleaner: {
    title: "Parni čistač",
    intro:
      "Parni čistač je profesionalni uređaj koji čisti parom pod visokim pritiskom i temperaturom. Ne ostavlja ostatke sredstava, ne kvasi duboko i efikasan je na svim vrstama tkanine.",
    steps: [
      {
        title: "Pregled i priprema",
        description:
          "Procenjujemo vrstu materijala i stepen zaprljanja. Biramo odgovarajuću temperaturu i pritisak.",
      },
      {
        title: "Tretman parom",
        description:
          "Para prodire u vlakna tkanine, razgrađuje prljavštinu, uklanja mirise i ubija grinje i bakterije.",
      },
      {
        title: "Ekstrakcija",
        description:
          "Ekstraktor usisava razgrađenu prljavštinu i višak vlage. Materijal ostaje svež i suv za kratko vreme.",
      },
      {
        title: "Završna provera",
        description: "Proveravamo rezultat i dajemo preporuke za sušenje i dalje održavanje.",
      },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      alt: "Parni čistač u akciji",
    },
  },
  allergiesSection: {
    title: "Alergije i nameštaj",
    intro:
      "Grinje, spore plesni i bakterije žive duboko u vlaknima nameštaja i dušeka. Nisu vidljive, ali su stalni uzročnici alergija, kijanja i tegoba sa disanjem.",
    facts: [
      {
        icon: "Wind" as IconName,
        title: "Grinje i prljavština",
        description:
          "Prosečan dušek sadrži milione grinja. Hrane se odstranjenom kožom i skupljaju se u dubini vlakana.",
      },
      {
        icon: "HeartStraight" as IconName,
        title: "Alergije na disanje",
        description:
          "Grinje i spore plesni direktno uzrokuju alergijski rinitis, astmu i hronično kijanje.",
      },
      {
        icon: "ShieldCheck" as IconName,
        title: "Dubinsko pranje kao rešenje",
        description:
          "Profesionalno dubinsko pranje uklanja grinje, spore i organske ostatke kojih površinsko čišćenje ne dotiče.",
      },
      {
        icon: "Baby" as IconName,
        title: "Bezbedno za decu i alergičare",
        description:
          "Koristimo sredstva koja su netoksična i bezbedna za decu, kućne ljubimce i osetljive osobe.",
      },
    ],
  },
  visuallyCleanSection: {
    title: "Nameštaj može izgledati čisto — ali nije",
    intro:
      "Vidljive mrlje su samo vrh ledenog brega. Istinska čistoća zahteva tretman koji seže dublje od površine.",
    left: {
      heading: "Izgleda čisto",
      points: [
        "Površina je bez uočljivih mrlja.",
        "Miris je neutralan ili pokriven osvežavačem.",
        "Boja i tekstura izgledaju prihvatljivo.",
      ],
    },
    right: {
      heading: "Dubinski čisto",
      points: [
        "Vlakna su bez organskih ostataka i grinja.",
        "Prirodna svežina bez hemijskih maskiranja.",
        "Materijal je tretiran i zaštićen od ponovnog zaprljanja.",
      ],
    },
  },
} as const;

export const aboutPage = {
  title: "O nama",
  intro:
    "Čistunko je fokusiran na kvalitet, urednost i poverenje — bez prenaglašenih obećanja i bez generičkog pristupa.",
  points: [
    "Pouzdan dogovor i brz odgovor.",
    "Pažljiv tretman materijala i realna procena stanja.",
    "Rezultati koji se mogu pokazati stvarnim primerima rada.",
  ],
  values: [
    {
      icon: "Leaf" as IconName,
      title: "Ekološka sredstva",
      description: "Koristimo sredstva bezbedna za ljude, kućne ljubimce i sve vrste materijala.",
    },
    {
      icon: "Wrench" as IconName,
      title: "Profesionalna oprema",
      description: "Industrijska ekstraktor mašina za dubinsko usisavanje i ispiranje.",
    },
    {
      icon: "CheckCircle" as IconName,
      title: "Dokazani rezultati",
      description: "Svaki posao dokumentujemo pre/posle fotografijama — vidite razliku.",
    },
  ],
  storyImage: {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    alt: "Čistunko tim na terenu",
  },
} as const;

export { siteConfig };
```

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```

Expected: all existing tests pass (home-page test now finds "Dušeci i jastuci"). The `icon` fields now contain strings like `"Armchair"` instead of emoji — components still render them as text, which is harmless for now. Tests don't assert on icon content.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/lib/content.ts src/app/__tests__/home-page.test.tsx
git commit -m "feat: update content — remove auto, add new service and edu content

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 2: Icon component + replace emoji in all components

**Files:**
- Create: `src/components/ui/icon.tsx`
- Modify: `src/lib/content.ts` (replace inline `IconName` with import)
- Modify: `src/components/service-cards.tsx`
- Modify: `src/components/hero.tsx`
- Modify: `src/app/o-nama/page.tsx`
- Modify: `src/app/kontakt/page.tsx`

Note: `src/app/usluge/page.tsx` is intentionally deferred to Task 6, where it will be replaced entirely.

- [ ] **Step 1: Create src/components/ui/icon.tsx**

```tsx
// src/components/ui/icon.tsx
import {
  Armchair,
  Baby,
  Bed,
  Chair,
  CheckCircle,
  HeartStraight,
  InstagramLogo,
  Leaf,
  Phone,
  ShieldCheck,
  WhatsappLogo,
  Wind,
  Wrench,
} from "@phosphor-icons/react";

const ICON_MAP = {
  Armchair,
  Baby,
  Bed,
  Chair,
  CheckCircle,
  HeartStraight,
  InstagramLogo,
  Leaf,
  Phone,
  ShieldCheck,
  WhatsappLogo,
  Wind,
  Wrench,
} as const;

export type IconName = keyof typeof ICON_MAP;

type IconProps = {
  name: IconName;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
};

export function Icon({ name, size = 32, weight = "duotone", className }: IconProps) {
  const PhIcon = ICON_MAP[name];
  return <PhIcon size={size} weight={weight} className={className} aria-hidden="true" />;
}
```

- [ ] **Step 2: Update src/lib/content.ts — replace inline IconName with import**

At the top of `src/lib/content.ts`, replace:

```ts
// Inline type — matches icon.tsx after Task 2 is complete
export type IconName =
  | "Armchair"
  | "Bed"
  | "Chair"
  | "Leaf"
  | "Wrench"
  | "CheckCircle"
  | "Phone"
  | "WhatsappLogo"
  | "InstagramLogo"
  | "Wind"
  | "ShieldCheck"
  | "Baby"
  | "HeartStraight";
```

with:

```ts
export type { IconName } from "@/components/ui/icon";
```

(Remove the `export type IconName = ...` block and add the re-export line.)

- [ ] **Step 3: Replace src/components/service-cards.tsx**

```tsx
// src/components/service-cards.tsx
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/section-heading";

type ServiceCardItem = {
  title: string;
  description: string;
  icon: IconName;
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
                  <Icon name={item.icon} size={36} weight="duotone" className="text-[#3cc0cc]" />
                  <span className="rounded-full bg-[#f0fbfc] px-3 py-1 text-xs font-semibold text-[#0f2a35]">
                    {item.priceLabel}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0f2a35]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4a6a78]">{item.description}</p>
                <Link
                  href="/usluge"
                  className="mt-4 block text-xs font-semibold text-[#3cc0cc] transition-colors group-hover:text-[#189cb4]"
                >
                  Saznaj više →
                </Link>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Fix hero.tsx — remove ⭐ from trust chip**

In `src/components/hero.tsx`, change line 67:

```tsx
// FROM:
<div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#0f2a35] shadow-lg backdrop-blur">
  ⭐ {trustChip}
</div>

// TO:
<div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#0f2a35] shadow-lg backdrop-blur">
  {trustChip}
</div>
```

- [ ] **Step 5: Update o-nama/page.tsx — replace emoji span with Icon**

In `src/app/o-nama/page.tsx`:

Add to imports:
```tsx
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
```

Change line 45 (inside the values map):
```tsx
// FROM:
<span className="text-4xl">{value.icon}</span>

// TO:
<Icon name={value.icon as IconName} size={36} weight="duotone" className="text-[#3cc0cc]" />
```

- [ ] **Step 6: Update kontakt/page.tsx — replace emoji with Icon, fix contactLinks type**

Replace the `contactLinks` array and update the render in `src/app/kontakt/page.tsx`:

```tsx
// Add imports at top:
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";

// Replace contactLinks array:
const contactLinks = [
  {
    label: "Pozovi",
    href: siteConfig.phoneHref,
    description: siteConfig.phoneDisplay,
    icon: "Phone" as IconName,
    variant: "secondary" as const,
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsAppHref,
    description: "Brz dogovor i odgovor u poruci.",
    icon: "WhatsappLogo" as IconName,
    variant: "whatsapp" as const,
  },
  {
    label: "Instagram",
    href: siteConfig.instagramHref,
    description: "Pogledajte stvarne primere rada.",
    icon: "InstagramLogo" as IconName,
    variant: "secondary" as const,
  },
] as const;

// In the JSX map, replace:
// FROM: <span className="text-2xl">{link.icon}</span>
// TO:   <Icon name={link.icon} size={28} weight="duotone" className="text-[#3cc0cc]" />
```

- [ ] **Step 7: Run all tests**

```bash
npx vitest run
```

Expected: all existing tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/icon.tsx src/lib/content.ts src/components/service-cards.tsx src/components/hero.tsx src/app/o-nama/page.tsx src/app/kontakt/page.tsx
git commit -m "feat: add Icon component, replace emoji with Phosphor icons

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 3: Mobile navigation + skip-to-content

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/__tests__/layout-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/app/__tests__/layout-shell.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

describe("SiteHeader mobile nav", () => {
  it("renders a hamburger button that toggles the mobile nav", async () => {
    render(<SiteHeader />);

    const hamburger = screen.getByRole("button", { name: /otvori meni/i });
    expect(hamburger).toBeInTheDocument();

    // Mobile nav is hidden initially
    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(hamburger);
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();

    // Button label changes to close
    expect(screen.getByRole("button", { name: /zatvori meni/i })).toBeInTheDocument();

    // Click to close
    fireEvent.click(screen.getByRole("button", { name: /zatvori meni/i }));
    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run failing test**

```bash
npx vitest run src/app/__tests__/layout-shell.test.tsx
```

Expected: FAIL — "Unable to find an accessible element with the role 'button' and name /otvori meni/i"

- [ ] **Step 3: Replace src/components/site-header.tsx**

```tsx
// src/components/site-header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { navigationItems, siteConfig } from "@/lib/content";
import { PillButton } from "@/components/ui/pill-button";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#3cc0cc]/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[#0f2a35]"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-[#3cc0cc]">Čistunko</span>.rs
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navigationItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#4a6a78] transition-colors hover:text-[#3cc0cc]"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <PillButton href={siteConfig.whatsAppHref} variant="primary" className="px-5 py-2.5 text-xs">
            Zakažite
          </PillButton>
          <button
            className="rounded-lg p-2 text-[#0f2a35] transition-colors hover:bg-[#f0fbfc] md:hidden"
            aria-label={isOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen
              ? <X size={24} weight="bold" aria-hidden="true" />
              : <List size={24} weight="bold" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#3cc0cc]/10 bg-white px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#4a6a78] transition-colors hover:bg-[#f0fbfc] hover:text-[#3cc0cc]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Update src/app/layout.tsx — add skip link and id on main**

In `src/app/layout.tsx`, update the metadata description and body content:

```tsx
// Change the metadata description:
// FROM: description: "Dubinsko pranje za dom i automobil.",
// TO:   description: "Profesionalno dubinsko pranje nameštaja, garnitura i dušeci.",

// Replace the <body> content:
<body className="pb-28 md:pb-0" style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif" }}>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:rounded-xl focus:bg-white focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0f2a35] focus:shadow-lg focus:ring-2 focus:ring-[#3cc0cc]"
  >
    Preskoči na sadržaj
  </a>
  <SiteHeader />
  <main id="main-content">{children}</main>
  <SiteFooter />
  <StickyCta />
</body>
```

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```

Expected: all pass including the new layout-shell test.

- [ ] **Step 6: Commit**

```bash
git add src/components/site-header.tsx src/app/layout.tsx src/app/__tests__/layout-shell.test.tsx
git commit -m "feat: add mobile hamburger nav and skip-to-content link

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 4: Minor bug fixes

**Files:**
- Modify: `src/components/contact-form.tsx`
- Modify: `src/components/before-after-gallery.tsx`
- Modify: `src/app/kontakt/page.tsx`

- [ ] **Step 1: Fix focus ring opacity in contact-form.tsx**

In `src/components/contact-form.tsx`, there are 3 occurrences of `focus:ring-[#3cc0cc]/20` — one on each of the `name`, `phone`, and `message` inputs. Change all three:

```tsx
// FROM (3 occurrences):
focus:ring-[#3cc0cc]/20

// TO:
focus:ring-[#3cc0cc]/50
```

- [ ] **Step 2: Fix skeleton loading state in before-after-gallery.tsx**

In `src/components/before-after-gallery.tsx`, line 59:

```tsx
// FROM:
) : (
  <div style={{ height: "320px" }} aria-hidden="true" />
)}

// TO:
) : (
  <div
    className="animate-pulse bg-[#f0fbfc]"
    style={{ height: "320px" }}
    aria-hidden="true"
  />
)}
```

- [ ] **Step 3: Fix "Zona rada" heading in kontakt/page.tsx**

In `src/app/kontakt/page.tsx`, replace the Maps section opening:

```tsx
// FROM:
<section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
  <div className="mx-auto max-w-6xl px-6 py-16">
    <h2 className="mb-6 text-xl font-bold text-[#0f2a35]">Zona rada</h2>
    <div className="overflow-hidden rounded-2xl border border-[#3cc0cc]/15 shadow-md">

// TO:
<section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
  <div className="mx-auto max-w-6xl px-6 py-16">
    <AnimatedSection>
      <SectionHeading as="h2" title="Zona rada" />
    </AnimatedSection>
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#3cc0cc]/15 shadow-md">
```

(Both `AnimatedSection` and `SectionHeading` are already imported in that file from Task 2 changes — verify imports are present.)

- [ ] **Step 4: Run all tests**

```bash
npx vitest run
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/contact-form.tsx src/components/before-after-gallery.tsx src/app/kontakt/page.tsx
git commit -m "fix: focus ring opacity, skeleton loading state, Zona rada heading

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 5: EduHighlights component + homepage integration

**Files:**
- Create: `src/components/edu-highlights.tsx`
- Create: `src/components/__tests__/edu-highlights.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/__tests__/home-page.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/__tests__/edu-highlights.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EduHighlights } from "@/components/edu-highlights";
import type { EduItem } from "@/lib/content";

const mockItems: EduItem[] = [
  {
    id: "test-one",
    title: "Naslov jedan",
    summary: "Opis jedan.",
    image: { src: "https://example.com/one.jpg", alt: "Slika jedan" },
    imagePosition: "right",
  },
  {
    id: "test-two",
    title: "Naslov dva",
    summary: "Opis dva.",
    image: { src: "https://example.com/two.jpg", alt: "Slika dva" },
    imagePosition: "left",
  },
];

describe("EduHighlights", () => {
  it("renders all items with headings and summaries", () => {
    render(<EduHighlights items={mockItems} />);

    expect(screen.getByRole("heading", { name: "Naslov jedan" })).toBeInTheDocument();
    expect(screen.getByText("Opis jedan.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Naslov dva" })).toBeInTheDocument();
    expect(screen.getByText("Opis dva.")).toBeInTheDocument();
  });

  it("renders a link to the correct anchor for each item", () => {
    render(<EduHighlights items={mockItems} />);

    const links = screen.getAllByRole("link", { name: /saznaj više/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/usluge#test-one");
    expect(links[1]).toHaveAttribute("href", "/usluge#test-two");
  });
});
```

Update `src/app/__tests__/home-page.test.tsx` to add an edu section test:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("home page", () => {
  it("renders the homepage sections", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /moderan i pouzdan servis/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nameštaj i dušeci")).toBeInTheDocument();
    expect(screen.getByText("Dušeci i jastuci")).toBeInTheDocument();
    expect(screen.queryByText("Auto enterijer")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /before\/after/i })).toBeInTheDocument();
    expect(screen.getByText(/pozovite ili pišite na whatsapp/i)).toBeInTheDocument();
  });

  it("renders the edu highlights section with all 3 items", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /parni čistač/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /alergije i nameštaj/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /može izgledati čisto/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run failing tests**

```bash
npx vitest run src/components/__tests__/edu-highlights.test.tsx src/app/__tests__/home-page.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/edu-highlights'"

- [ ] **Step 3: Create src/components/edu-highlights.tsx**

```tsx
// src/components/edu-highlights.tsx
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";
import type { EduItem } from "@/lib/content";

type EduHighlightsProps = {
  items: EduItem[];
};

export function EduHighlights({ items }: EduHighlightsProps) {
  return (
    <section className="border-b border-[#3cc0cc]/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <AnimatedSection>
          <SectionHeading
            as="h2"
            title="Znanje koje čini razliku"
            description="Otkrijte zašto dubinsko pranje nije samo estetika — to je zdravlje vašeg doma."
          />
        </AnimatedSection>

        <div className="mt-16 space-y-20 md:space-y-28">
          {items.map((item) => (
            <AnimatedSection key={item.id}>
              <div className="grid animate-item gap-10 md:grid-cols-2 md:items-center md:gap-16">
                <div className={item.imagePosition === "right" ? "md:order-last" : ""}>
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={640}
                      height={420}
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="accent-line" />
                  <h3 className="text-2xl font-bold text-[#0f2a35] md:text-3xl">{item.title}</h3>
                  <p className="text-base leading-8 text-[#4a6a78]">{item.summary}</p>
                  <Link
                    href={`/usluge#${item.id}`}
                    className="inline-block text-sm font-semibold text-[#3cc0cc] transition-colors hover:text-[#189cb4]"
                  >
                    Saznaj više →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update src/app/page.tsx**

```tsx
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
      <ServiceCards items={homePage.serviceCards} />
      <BeforeAfterGallery items={homePage.beforeAfterItems} />
      <EduHighlights items={homePage.eduHighlights} />
      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
```

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```

Expected: all pass. Count should be prior total + 3 new tests (2 in edu-highlights.test + 1 new home-page test).

- [ ] **Step 6: Commit**

```bash
git add src/components/edu-highlights.tsx src/app/page.tsx src/components/__tests__/edu-highlights.test.tsx src/app/__tests__/home-page.test.tsx
git commit -m "feat: add EduHighlights component with 3 alternating rows on homepage

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 6: Usluge edu sections + auto removal

**Files:**
- Modify: `src/app/usluge/page.tsx`
- Modify: `src/app/__tests__/services-page.test.tsx`

- [ ] **Step 1: Write failing tests**

Replace `src/app/__tests__/services-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesPage from "@/app/usluge/page";

describe("services page", () => {
  it("renders the services content", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: /usluge/i })).toBeInTheDocument();
    expect(screen.getByText(/nameštaj/i)).toBeInTheDocument();
    expect(screen.getByText(/kako izgleda proces/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
  });

  it("does not render auto/car service categories", () => {
    render(<ServicesPage />);

    expect(screen.queryByText(/auto sedišta/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/auto enterijer/i)).not.toBeInTheDocument();
  });

  it("renders the parni čistač edu section with anchor ID", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: /parni čistač/i })).toBeInTheDocument();
    expect(document.getElementById("parni-cistac")).toBeInTheDocument();
  });

  it("renders the alergije edu section with anchor ID", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: /alergije i nameštaj/i })).toBeInTheDocument();
    expect(document.getElementById("alergije")).toBeInTheDocument();
  });

  it("renders the vizuelno čisto edu section with anchor ID", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: /može izgledati čisto/i })).toBeInTheDocument();
    expect(document.getElementById("vizuelno-cisto")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run failing tests**

```bash
npx vitest run src/app/__tests__/services-page.test.tsx
```

Expected: 3 FAIL — the 3 new edu section tests.

- [ ] **Step 3: Replace src/app/usluge/page.tsx**

```tsx
// src/app/usluge/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/ui/icon";
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
              title="Nameštaj i dušeci"
              description="Dubinsko pranje prilagođavamo vrsti komada, materijalu i stepenu zaprljanja."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {servicesPage.categories.map((category, i) => (
              <AnimatedSection key={category.title}>
                <article
                  className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <Icon name={category.icon} size={36} weight="duotone" className="text-[#3cc0cc]" />
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

      {/* Edu: Parni čistač */}
      <section id="parni-cistac" className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading
              as="h2"
              title={servicesPage.steamCleaner.title}
              description={servicesPage.steamCleaner.intro}
            />
          </AnimatedSection>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-start">
            <ol className="space-y-6">
              {servicesPage.steamCleaner.steps.map((step, index) => (
                <AnimatedSection key={step.title}>
                  <li
                    className="animate-item flex gap-5"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f2a35]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#4a6a78]">{step.description}</p>
                    </div>
                  </li>
                </AnimatedSection>
              ))}
            </ol>

            <div className="overflow-hidden rounded-2xl shadow-lg md:sticky md:top-28">
              <Image
                src={servicesPage.steamCleaner.image.src}
                alt={servicesPage.steamCleaner.image.alt}
                width={640}
                height={480}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Edu: Alergije */}
      <section id="alergije" style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading
              as="h2"
              title={servicesPage.allergiesSection.title}
              description={servicesPage.allergiesSection.intro}
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {servicesPage.allergiesSection.facts.map((fact, i) => (
              <AnimatedSection key={fact.title}>
                <article
                  className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-white p-8 shadow-sm"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <Icon name={fact.icon} size={36} weight="duotone" className="text-[#3cc0cc]" />
                  <h3 className="mt-4 text-lg font-bold text-[#0f2a35]">{fact.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a6a78]">{fact.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Edu: Vizuelno čisto */}
      <section id="vizuelno-cisto" className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading
              as="h2"
              title={servicesPage.visuallyCleanSection.title}
              description={servicesPage.visuallyCleanSection.intro}
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <AnimatedSection>
              <div className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-8">
                <h3 className="text-lg font-bold text-[#4a6a78]">
                  {servicesPage.visuallyCleanSection.left.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {servicesPage.visuallyCleanSection.left.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-7 text-[#4a6a78]">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4a6a78]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="animate-item rounded-2xl border border-[#3cc0cc]/15 bg-gradient-to-br from-[#3cc0cc]/10 to-[#189cb4]/10 p-8">
                <h3 className="text-lg font-bold text-[#0f2a35]">
                  {servicesPage.visuallyCleanSection.right.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {servicesPage.visuallyCleanSection.right.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-7 text-[#4a6a78]">
                      <span className="mt-1 text-[#3cc0cc]" aria-hidden="true">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
```

- [ ] **Step 4: Run all tests**

```bash
npx vitest run
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/usluge/page.tsx src/app/__tests__/services-page.test.tsx
git commit -m "feat: add parni čistač, alergije and vizuelno čisto edu sections to /usluge

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Final: TypeScript check + push

- [ ] **Step 1: Run full test suite and count**

```bash
npx vitest run --reporter verbose
```

Expected: all pass (≥26 tests across all files).

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```
