# Čistunko Phase 2 — UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully restyle the Čistunko Next.js site with brand palette, scroll animations, two-column hero, interactive before/after slider, and Google Maps contact.

**Architecture:** All components already exist from Phase 1 — Phase 2 rewrites their markup/styles. Two new utility components are added (`AnimatedSection`, `PillButton`). Content model is extended with new fields. Browser API mocks are added to the test setup so existing 11 tests continue to pass.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, `react-compare-slider`, Vitest + jsdom

---

## Task 1: CSS Design Tokens + Inter Font + Image Config

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Replace globals.css**

```css
/* src/app/globals.css */
@import "tailwindcss";

@layer base {
  :root {
    color-scheme: light;
    --color-primary: #3cc0cc;
    --color-primary-dark: #189cb4;
    --color-primary-bg: #f0fbfc;
    --color-dark: #0f2a35;
    --color-text: #4a6a78;
    --gradient-primary: linear-gradient(135deg, #3cc0cc, #189cb4);
    --gradient-whatsapp: linear-gradient(135deg, #a0c850, #7aab28);
  }

  body {
    margin: 0;
    color: var(--color-text);
  }
}

/* Animation — Style C: Slide + Accent Line */
.animate-item {
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.is-visible .animate-item {
  opacity: 1;
  transform: translateX(0);
}

.accent-line {
  width: 0;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 9999px;
  transition: width 0.7s ease;
}

.is-visible .accent-line {
  width: 48px;
}

/* Hero page-load animations (CSS @keyframes, no JS needed) */
@keyframes heroSlideIn {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes heroAccentLine {
  from { width: 0; }
  to   { width: 48px; }
}

.hero-accent  { animation: heroAccentLine 0.7s ease 0.3s both; }
.hero-item-1  { animation: heroSlideIn 0.6s ease 0.45s both; }
.hero-item-2  { animation: heroSlideIn 0.6s ease 0.6s both; }
.hero-item-3  { animation: heroSlideIn 0.6s ease 0.75s both; }
.hero-item-4  { animation: heroSlideIn 0.6s ease 0.9s both; }
```

- [ ] **Step 2: Swap to Inter font in layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: "Cistunko",
  description: "Dubinsko pranje za dom i automobil.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={`${inter.variable} h-full antialiased`}>
      <body className="pb-28 md:pb-0" style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCta />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Add Unsplash to next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Run tests and build to confirm no regressions**

```bash
cd /Users/apple/Projects/cistunko-rs
npm test
```
Expected: 11/11 tests pass.

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx next.config.ts
git commit -m "feat: add design tokens, Inter font, Unsplash image config"
```

---

## Task 2: Update Test Setup (Browser API Mocks)

**Files:**
- Modify: `src/test/setup.ts`

`react-compare-slider` uses `ResizeObserver`. `AnimatedSection` uses `IntersectionObserver`. Neither exists in jsdom — mock both in the test setup so existing tests don't fail.

- [ ] **Step 1: Update setup.ts**

```ts
// src/test/setup.ts
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// AnimatedSection uses IntersectionObserver
(global as unknown as Record<string, unknown>).IntersectionObserver = vi
  .fn()
  .mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

// react-compare-slider uses ResizeObserver
(global as unknown as Record<string, unknown>).ResizeObserver = vi
  .fn()
  .mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
```

- [ ] **Step 2: Verify tests still pass**

```bash
npm test
```
Expected: 11/11 pass.

- [ ] **Step 3: Commit**

```bash
git add src/test/setup.ts
git commit -m "test: mock IntersectionObserver and ResizeObserver for browser API components"
```

---

## Task 3: AnimatedSection Utility Component

**Files:**
- Create: `src/components/ui/animated-section.tsx`

- [ ] **Step 1: Create the component**

```bash
mkdir -p /Users/apple/Projects/cistunko-rs/src/components/ui
```

```tsx
// src/components/ui/animated-section.tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`animate-section ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/animated-section.tsx
git commit -m "feat: add AnimatedSection scroll-trigger wrapper"
```

---

## Task 4: PillButton Utility Component

**Files:**
- Create: `src/components/ui/pill-button.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/ui/pill-button.tsx
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "whatsapp";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[50px] px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] text-white shadow-md hover:shadow-lg hover:brightness-105",
  secondary:
    "border-2 border-[#3cc0cc] bg-transparent text-[#3cc0cc] hover:bg-[#f0fbfc]",
  whatsapp:
    "bg-gradient-to-br from-[#a0c850] to-[#7aab28] text-white shadow-md hover:shadow-lg hover:brightness-105",
};

type PillButtonProps = {
  variant?: Variant;
  href: string;
  className?: string;
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function PillButton({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: PillButtonProps) {
  return (
    <a href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/pill-button.tsx
git commit -m "feat: add PillButton component with primary/secondary/whatsapp variants"
```

---

## Task 5: Restyle SiteHeader

**Files:**
- Modify: `src/components/site-header.tsx`

- [ ] **Step 1: Rewrite SiteHeader**

```tsx
// src/components/site-header.tsx
import Link from "next/link";
import { navigationItems, siteConfig } from "@/lib/content";
import { PillButton } from "@/components/ui/pill-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#3cc0cc]/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#0f2a35]">
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

        <PillButton href={siteConfig.whatsAppHref} variant="primary" className="px-5 py-2.5 text-xs">
          Zakažite
        </PillButton>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (The "Početna" link remains in SiteFooter, which is also rendered in layout-shell test.)

- [ ] **Step 3: Commit**

```bash
git add src/components/site-header.tsx
git commit -m "feat: restyle SiteHeader with sticky blur, teal logo, pill CTA"
```

---

## Task 6: Restyle SiteFooter

**Files:**
- Modify: `src/components/site-footer.tsx`

- [ ] **Step 1: Rewrite SiteFooter**

```tsx
// src/components/site-footer.tsx
import Link from "next/link";
import { navigationItems, siteConfig } from "@/lib/content";

const contactLinks = [
  { label: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
  { label: "WhatsApp", href: siteConfig.whatsAppHref },
  { label: "Instagram", href: siteConfig.instagramHref },
] as const;

export function SiteFooter() {
  return (
    <footer style={{ background: "#0f2a35" }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[#3cc0cc]">Čistunko</span>.rs
          </Link>
          <p className="text-sm leading-7 text-white/60">
            Dubinsko pranje za dom i automobil uz brz odgovor i pouzdan dolazak.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 transition-colors hover:text-[#3cc0cc]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 transition-colors hover:text-[#3cc0cc]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Čistunko. Sva prava zadržana.
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/site-footer.tsx
git commit -m "feat: restyle SiteFooter with dark background and teal accents"
```

---

## Task 7: Restyle StickyCta

**Files:**
- Modify: `src/components/sticky-cta.tsx`

- [ ] **Step 1: Rewrite StickyCta**

```tsx
// src/components/sticky-cta.tsx
import { siteConfig } from "@/lib/content";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#3cc0cc]/20 bg-white/95 p-4 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={siteConfig.phoneHref}
          className="flex-1 rounded-[50px] border-2 border-[#3cc0cc] px-4 py-3 text-center text-sm font-semibold text-[#3cc0cc] transition-all hover:-translate-y-0.5"
        >
          Pozovite
        </a>
        <a
          href={siteConfig.whatsAppHref}
          className="flex-1 rounded-[50px] bg-gradient-to-br from-[#a0c850] to-[#7aab28] px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/sticky-cta.tsx
git commit -m "feat: restyle StickyCta with teal phone + green WhatsApp pill buttons"
```

---

## Task 8: Restyle SectionHeading (with AccentLine)

**Files:**
- Modify: `src/components/section-heading.tsx`

- [ ] **Step 1: Rewrite SectionHeading**

```tsx
// src/components/section-heading.tsx
type SectionHeadingProps = {
  title: string;
  description?: string;
  as?: "h1" | "h2";
  showAccentLine?: boolean;
  light?: boolean;
};

export function SectionHeading({
  title,
  description,
  as: Heading = "h1",
  showAccentLine = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {showAccentLine && <div className="accent-line animate-item" style={{ transitionDelay: "0.1s" }} />}
      <Heading
        className={`animate-item text-3xl font-bold tracking-tight md:text-4xl ${light ? "text-white" : "text-[#0f2a35]"}`}
        style={{ transitionDelay: "0.45s" }}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`animate-item text-base leading-7 md:text-lg ${light ? "text-white/70" : "text-[#4a6a78]"}`}
          style={{ transitionDelay: "0.6s" }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/section-heading.tsx
git commit -m "feat: add accent line and animate-item classes to SectionHeading"
```

---

## Task 9: Update content.ts with Phase 2 Content

**Files:**
- Modify: `src/lib/content.ts`

Phase 2 requires: service icons + price labels, hero image data, new before/after item shape (beforeSrc/afterSrc), and about page values array.

- [ ] **Step 1: Rewrite content.ts**

```ts
// src/lib/content.ts
import { siteConfig } from "@/lib/site-config";

export const navigationItems = [
  { label: "Početna", href: "/" },
  { label: "Usluge", href: "/usluge" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const homePage = {
  hero: {
    eyebrow: "Dubinsko pranje",
    title: "Moderan i pouzdan servis dubinskog pranja za dom i automobil.",
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
        src: "https://images.unsplash.com/photo-1449965408869-eefa2cae7dc9?w=400&q=80",
        alt: "Čisto auto sedište",
      },
    ],
  },
  serviceCards: [
    {
      title: "Nameštaj i dušeci",
      description: "Ugaone garniture, fotelje, stolice, dušeci i tapacirani komadi.",
      icon: "🛋️",
      priceLabel: "Od 2.000 RSD",
    },
    {
      title: "Auto enterijer",
      description: "Sedišta, zadnja klupa, gepek i drugi tekstilni delovi enterijera.",
      icon: "🚗",
      priceLabel: "Od 3.500 RSD",
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
      beforeAlt: "Auto sedište pre čišćenja",
      afterAlt: "Auto sedište posle čišćenja",
      label: "Auto sedište",
    },
  ],
  ctaBand: {
    title: "Pozovite ili pišite na WhatsApp za brz dogovor.",
    description: "Najbrži put do termina je direktan kontakt.",
  },
} as const;

export const servicesPage = {
  title: "Usluge",
  intro:
    "Radimo dubinsko pranje komada i površina koje najviše trpe svakodnevnu upotrebu u domu i automobilu.",
  categories: [
    {
      title: "Ugaone garniture i trosedi",
      description: "Kompletno pranje sa ekstraktorom — dubinsko usisavanje, tretman i ispiranje.",
      icon: "🛋️",
    },
    {
      title: "Fotelje i stolice",
      description: "Pažljiv tretman prilagođen vrsti tkanine i stepenu zaprljanja.",
      icon: "💺",
    },
    {
      title: "Dušeci",
      description: "Uklanjamo grinje, bakterije i neprijatne mirise. Bezbedno za decu i alergičare.",
      icon: "🛏️",
    },
    {
      title: "Auto sedišta i enterijer",
      description: "Dubinsko pranje svih tekstilnih površina u vozilu.",
      icon: "🚗",
    },
  ],
  processTitle: "Kako izgleda proces",
  processSteps: [
    "Pregled stanja i dogovor oko tretmana.",
    "Dubinsko izvlačenje nečistoće odgovarajućim sredstvima.",
    "Završna provera i preporuka za sušenje/održavanje.",
  ],
} as const;

export const aboutPage = {
  title: "O nama",
  intro:
    "Čistunko je fokusiran na kvalitet, urednost i poverenje — bez prenaglašenih obećanja i bez generičnog pristupa.",
  points: [
    "Pouzdan dogovor i brz odgovor.",
    "Pažljiv tretman materijala i realna procena stanja.",
    "Rezultati koji se mogu pokazati stvarnim primerima rada.",
  ],
  values: [
    {
      icon: "🌿",
      title: "Ekološka sredstva",
      description: "Koristimo sredstva bezbedna za ljude, kućne ljubimce i sve vrste materijala.",
    },
    {
      icon: "⚙️",
      title: "Profesionalna oprema",
      description: "Industrijska ekstraktor mašina za dubinsko usisavanje i ispiranje.",
    },
    {
      icon: "✅",
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

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Tests reference `homePage.serviceCards[0].title` via text "Nameštaj i dušeci" — still present. `beforeAfterItems` shape changed but tests only render the component, not check item props directly.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: extend content model with icons, prices, hero images, about values"
```

---

## Task 10: Restyle Hero (Two-Column Layout)

**Files:**
- Modify: `src/components/hero.tsx`

- [ ] **Step 1: Rewrite Hero**

```tsx
// src/components/hero.tsx
import Image from "next/image";
import { siteConfig } from "@/lib/content";
import { PillButton } from "@/components/ui/pill-button";

type HeroImage = { src: string; alt: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  trustChip: string;
  mainImage: HeroImage;
  thumbImages: readonly [HeroImage, HeroImage];
};

export function Hero({ eyebrow, title, description, trustChip, mainImage, thumbImages }: HeroProps) {
  return (
    <section
      className="overflow-hidden border-b border-[#3cc0cc]/10"
      style={{ background: "linear-gradient(135deg, #f0fbfc 0%, #e6f9fa 100%)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        {/* Left: Content */}
        <div className="space-y-6">
          <div className="hero-accent accent-line" />

          <p
            className="hero-item-1 inline-block rounded-full border border-[#3cc0cc]/30 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#3cc0cc]"
          >
            {eyebrow}
          </p>

          <h1
            className="hero-item-2 text-4xl font-bold leading-tight tracking-tight text-[#0f2a35] md:text-5xl"
          >
            {title}
          </h1>

          <p className="hero-item-3 text-lg leading-8 text-[#4a6a78]">
            {description}
          </p>

          <div className="hero-item-4 flex flex-col gap-3 sm:flex-row">
            <PillButton href={siteConfig.whatsAppHref} variant="whatsapp">
              Zakažite na WhatsApp
            </PillButton>
            <PillButton href={siteConfig.phoneHref} variant="secondary">
              {siteConfig.phoneDisplay}
            </PillButton>
          </div>
        </div>

        {/* Right: Image grid */}
        <div className="relative hidden md:block">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
            {/* Floating trust chip */}
            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#0f2a35] shadow-lg backdrop-blur">
              ⭐ {trustChip}
            </div>
          </div>

          {/* Two thumbnails */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {thumbImages.map((img) => (
              <div key={img.src} className="overflow-hidden rounded-xl shadow-md">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={200}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pre/Posle badge */}
          <div className="absolute -right-2 top-4 rounded-full bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] px-4 py-2 text-xs font-bold text-white shadow-lg">
            Pre & Posle ✓
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update home page to pass new hero props**

```tsx
// src/app/page.tsx
import { BeforeAfterGallery } from "@/components/before-after-gallery";
import { CtaBand } from "@/components/cta-band";
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
      <CtaBand {...homePage.ctaBand} />
    </div>
  );
}
```

- [ ] **Step 3: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (hero test looks for heading "moderan i pouzdan servis" — title is unchanged.)

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: restyle Hero with two-column layout and CSS page-load animation"
```

---

## Task 11: Restyle ServiceCards

**Files:**
- Modify: `src/components/service-cards.tsx`

- [ ] **Step 1: Rewrite ServiceCards**

```tsx
// src/components/service-cards.tsx
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";

type ServiceCardItem = {
  title: string;
  description: string;
  icon: string;
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
                  <span className="text-4xl">{item.icon}</span>
                  <span className="rounded-full bg-[#f0fbfc] px-3 py-1 text-xs font-semibold text-[#3cc0cc]">
                    {item.priceLabel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#0f2a35]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#4a6a78]">{item.description}</p>
                <p className="mt-4 text-xs font-semibold text-[#3cc0cc] transition-colors group-hover:text-[#189cb4]">
                  Saznaj više →
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. ("Nameštaj i dušeci" and "Auto enterijer" text still rendered.)

- [ ] **Step 3: Commit**

```bash
git add src/components/service-cards.tsx
git commit -m "feat: restyle ServiceCards with icons, price chips, hover lift"
```

---

## Task 12: Install react-compare-slider + Restyle BeforeAfterGallery

**Files:**
- Modify: `src/components/before-after-gallery.tsx`
- (package.json + package-lock.json updated by npm)

- [ ] **Step 1: Install react-compare-slider**

```bash
cd /Users/apple/Projects/cistunko-rs
npm install react-compare-slider
```
Expected: Package added to `dependencies`.

- [ ] **Step 2: Rewrite BeforeAfterGallery**

```tsx
// src/components/before-after-gallery.tsx
"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/section-heading";

type BeforeAfterItem = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
};

type BeforeAfterGalleryProps = {
  items: readonly BeforeAfterItem[];
};

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  return (
    <section className="border-b border-[#3cc0cc]/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <AnimatedSection>
          <SectionHeading
            as="h2"
            title="Before/After — vidite razliku"
            description="Stvarni primeri rada. Pomerite klizač da vidite rezultat dubinskog pranja."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <AnimatedSection key={item.label}>
              <figure className="animate-item overflow-hidden rounded-2xl border border-[#3cc0cc]/15 shadow-md">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={item.beforeSrc}
                      alt={item.beforeAlt}
                      style={{ objectFit: "cover" }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={item.afterSrc}
                      alt={item.afterAlt}
                      style={{ objectFit: "cover" }}
                    />
                  }
                  style={{ height: "320px" }}
                />
                <figcaption className="flex items-center justify-between bg-[#f0fbfc] px-5 py-3 text-sm font-semibold text-[#0f2a35]">
                  <span>{item.label}</span>
                  <span className="flex gap-3 text-xs text-[#4a6a78]">
                    <span>← Pre</span>
                    <span>Posle →</span>
                  </span>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Test looks for `heading` with `/before\/after/i` — the new title "Before/After — vidite razliku" matches. ResizeObserver mock from Task 2 prevents crashes.)

- [ ] **Step 4: Commit**

```bash
git add src/components/before-after-gallery.tsx package.json package-lock.json
git commit -m "feat: interactive before/after slider using react-compare-slider"
```

---

## Task 13: Restyle CtaBand

**Files:**
- Modify: `src/components/cta-band.tsx`

- [ ] **Step 1: Rewrite CtaBand**

```tsx
// src/components/cta-band.tsx
import { AnimatedSection } from "@/components/ui/animated-section";
import { PillButton } from "@/components/ui/pill-button";
import { siteConfig } from "@/lib/content";

type CtaBandProps = {
  title: string;
  description: string;
};

export function CtaBand({ title, description }: CtaBandProps) {
  return (
    <section style={{ background: "#0f2a35" }} className="relative overflow-hidden">
      {/* Wave separator at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3cc0cc]/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="accent-line animate-item mx-auto" style={{ transitionDelay: "0.1s" }} />
            <h2
              className="animate-item text-3xl font-bold tracking-tight text-white md:text-4xl"
              style={{ transitionDelay: "0.3s" }}
            >
              {title}
            </h2>
            <p
              className="animate-item text-base leading-7 text-white/70"
              style={{ transitionDelay: "0.45s" }}
            >
              {description}
            </p>
            <div
              className="animate-item flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ transitionDelay: "0.6s" }}
            >
              <PillButton href={siteConfig.whatsAppHref} variant="whatsapp">
                Pišite na WhatsApp
              </PillButton>
              <PillButton href={siteConfig.phoneHref} variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                {siteConfig.phoneDisplay}
              </PillButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Services page test looks for `link` with name `/whatsapp/i` from CtaBand → "Pišite na WhatsApp" matches.)

- [ ] **Step 3: Commit**

```bash
git add src/components/cta-band.tsx
git commit -m "feat: restyle CtaBand with dark bg, teal accent line, WhatsApp CTA"
```

---

## Task 14: Restyle ContactForm

**Files:**
- Modify: `src/components/contact-form.tsx`

- [ ] **Step 1: Rewrite ContactForm**

```tsx
// src/components/contact-form.tsx
"use client";

import { useState } from "react";
import { buildMailtoHref } from "@/lib/contact";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = buildMailtoHref({ name, phone, message, email });

  return (
    <form
      className="space-y-5 rounded-2xl border border-[#3cc0cc]/15 bg-white p-8 shadow-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-[#0f2a35]">
          Ime
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-[50px] border border-[#3cc0cc]/20 bg-[#f0fbfc] px-5 py-3 text-sm text-[#0f2a35] outline-none transition focus:border-[#3cc0cc] focus:ring-2 focus:ring-[#3cc0cc]/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-[#0f2a35]">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-[50px] border border-[#3cc0cc]/20 bg-[#f0fbfc] px-5 py-3 text-sm text-[#0f2a35] outline-none transition focus:border-[#3cc0cc] focus:ring-2 focus:ring-[#3cc0cc]/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-[#0f2a35]">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-2xl border border-[#3cc0cc]/20 bg-[#f0fbfc] px-5 py-3 text-sm text-[#0f2a35] outline-none transition focus:border-[#3cc0cc] focus:ring-2 focus:ring-[#3cc0cc]/20"
        />
      </div>

      <a
        href={mailtoHref}
        className="inline-flex rounded-[50px] bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Pošalji email upit
      </a>
    </form>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Labels "Ime", "Telefon", "Poruka" unchanged. Link text "Pošalji email upit" unchanged.)

- [ ] **Step 3: Commit**

```bash
git add src/components/contact-form.tsx
git commit -m "feat: restyle ContactForm with pill inputs and teal focus rings"
```

---

## Task 15: Restyle Services Page (/usluge)

**Files:**
- Modify: `src/app/usluge/page.tsx`

- [ ] **Step 1: Rewrite services page**

```tsx
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
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Test checks for heading "usluge", text "nameštaj", "kako izgleda proces", and WhatsApp link — all present.)

- [ ] **Step 3: Commit**

```bash
git add src/app/usluge/page.tsx
git commit -m "feat: restyle Services page with teal palette and animated cards"
```

---

## Task 16: Restyle About Page (/o-nama)

**Files:**
- Modify: `src/app/o-nama/page.tsx`

- [ ] **Step 1: Rewrite about page**

```tsx
// src/app/o-nama/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
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
                  <span className="text-4xl">{value.icon}</span>
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
                Pouzdan partner za čistoću
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
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Test checks heading "o nama" and text "pouzdan" — both present via `aboutPage.points[0]`.)

- [ ] **Step 3: Commit**

```bash
git add src/app/o-nama/page.tsx
git commit -m "feat: restyle About page with values grid and story section"
```

---

## Task 17: Restyle Contact Page (/kontakt) + Google Maps

**Files:**
- Modify: `src/app/kontakt/page.tsx`

- [ ] **Step 1: Rewrite contact page**

```tsx
// src/app/kontakt/page.tsx
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ContactForm } from "@/components/contact-form";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt",
  description: "Poziv, WhatsApp ili email upit — izaberite kanal koji vam najviše odgovara.",
  path: "/kontakt",
});

const contactLinks = [
  {
    label: "Pozovi",
    href: siteConfig.phoneHref,
    description: siteConfig.phoneDisplay,
    icon: "📞",
    variant: "secondary" as const,
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsAppHref,
    description: "Brz dogovor i odgovor u poruci.",
    icon: "💬",
    variant: "whatsapp" as const,
  },
  {
    label: "Instagram",
    href: siteConfig.instagramHref,
    description: "Pogledajte stvarne primere rada.",
    icon: "📸",
    variant: "secondary" as const,
  },
] as const;

export default function ContactPage() {
  return (
    <div>
      {/* Page hero */}
      <section
        className="border-b border-[#3cc0cc]/10"
        style={{ background: "linear-gradient(135deg, #f0fbfc 0%, #e6f9fa 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading
              title="Kontakt"
              description="Poziv, WhatsApp ili email upit — izaberite kanal koji vam najviše odgovara."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact grid: links + form */}
      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:py-24">
          {/* Contact links */}
          <AnimatedSection>
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="animate-item flex items-center gap-4 rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3cc0cc]/40 hover:shadow-md"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <div>
                    <p className="font-bold text-[#0f2a35]">{link.label}</p>
                    <p className="text-sm text-[#4a6a78]">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <ContactForm email={siteConfig.email} />
        </div>
      </section>

      {/* Google Maps */}
      <section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-xl font-bold text-[#0f2a35]">Zona rada</h2>
          <div className="overflow-hidden rounded-2xl border border-[#3cc0cc]/15 shadow-md">
            <iframe
              title="Čistunko — zona rada"
              src="https://maps.google.com/maps?q=Novi+Sad,+Serbia&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
npm test
```
Expected: 11/11 pass. (Test checks for links "pozovi", "whatsapp", "instagram", and textbox "poruka" — all present.)

- [ ] **Step 3: Commit**

```bash
git add src/app/kontakt/page.tsx
git commit -m "feat: restyle Contact page with Google Maps and teal layout"
```

---

## Task 18: Final Verification + Push

**Files:** None — verification only

- [ ] **Step 1: Run full test suite**

```bash
cd /Users/apple/Projects/cistunko-rs
npm test
```
Expected: 11/11 tests pass.

- [ ] **Step 2: Production build**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors and no missing image warnings.

- [ ] **Step 3: Start dev server and do a visual spot-check**

```bash
npm run dev
```
Open http://localhost:3000 and verify:
- Navbar: sticky, blur, teal logo, pill CTA
- Hero: two-column (desktop), animations on load
- Service cards: icons, price chips, hover lift
- Before/After: interactive slider
- CTA Band: dark bg, WhatsApp button
- Footer: dark bg, all links
- /usluge, /o-nama, /kontakt: all restyled

Stop server: Ctrl+C

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```

---

## File Map Summary

| File | Action | Reason |
|------|--------|--------|
| `next.config.ts` | Modify | Add Unsplash remotePatterns |
| `src/app/globals.css` | Modify | CSS design tokens + animation classes |
| `src/app/layout.tsx` | Modify | Swap Geist → Inter font |
| `src/test/setup.ts` | Modify | Mock IntersectionObserver + ResizeObserver |
| `src/lib/content.ts` | Modify | New fields: icons, prices, hero images, values |
| `src/components/ui/animated-section.tsx` | Create | IntersectionObserver scroll-trigger wrapper |
| `src/components/ui/pill-button.tsx` | Create | Pill button with primary/secondary/whatsapp variants |
| `src/components/site-header.tsx` | Modify | Sticky blur, teal logo, pill CTA |
| `src/components/site-footer.tsx` | Modify | Dark bg, teal accents |
| `src/components/sticky-cta.tsx` | Modify | Teal phone + green WhatsApp pills |
| `src/components/section-heading.tsx` | Modify | AccentLine + animate-item classes |
| `src/components/hero.tsx` | Modify | Two-column layout, CSS page-load animation |
| `src/components/service-cards.tsx` | Modify | Icons, price chips, hover lift |
| `src/components/before-after-gallery.tsx` | Modify | ReactCompareSlider integration |
| `src/components/cta-band.tsx` | Modify | Dark bg, animated heading, WhatsApp CTA |
| `src/components/contact-form.tsx` | Modify | Pill inputs, teal focus rings |
| `src/app/page.tsx` | Modify | Pass new hero props |
| `src/app/usluge/page.tsx` | Modify | Full Phase 2 restyle |
| `src/app/o-nama/page.tsx` | Modify | Values grid + story section |
| `src/app/kontakt/page.tsx` | Modify | Google Maps + contact layout |
