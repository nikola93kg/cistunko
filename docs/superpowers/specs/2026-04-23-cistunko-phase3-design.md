# Čistunko Phase 3 — Bug Fixes + Content Restructure

**Date:** 2026-04-23  
**Status:** Approved  
**Scope:** UX fixes from design review + remove car cleaning + add Instagram edu content

---

## Overview

Two goals:
1. Fix all issues found in design review (accessibility, mobile nav, contrast, etc.)
2. Restructure content — remove auto enterijer, add 3 educational sections based on real Instagram posts

---

## Part 1: Bug Fixes

### 1.1 Mobile Navigation (Blocker)

**Problem:** `<nav>` has `hidden md:flex` — mobile users cannot navigate beyond homepage.

**Fix:**
- Add hamburger toggle button to `SiteHeader` (visible only on mobile via `md:hidden`)
- Use `useState(false)` for `isOpen`
- When open: render full-width dropdown below header with all nav links + "Zakažite" CTA pill
- Hamburger icon: Phosphor `List` icon; close icon: Phosphor `X`
- Clicking any link closes the menu

**Affected file:** `src/components/site-header.tsx`

---

### 1.2 Replace All Emoji with Phosphor Icons

**Problem:** Decorative emoji are read by screen readers, inconsistent with SVG-based design system.

**Fix:** Install `@phosphor-icons/react`. Replace all emoji across the codebase.

**Icon mapping:**

| Emoji | Context | Phosphor Icon |
|---|---|---|
| 🛋️ | Nameštaj service card | `Armchair` |
| 🛏️ | Dušeci | `BedDouble` |
| 💺 | Fotelje/stolice | `Chair` |
| 🌿 | Ekološka sredstva | `Leaf` |
| ⚙️ | Profesionalna oprema | `Gear` |
| ✅ | Dokazani rezultati | `CheckCircle` |
| 📞 | Telefon (kontakt) | `Phone` |
| 💬 | WhatsApp | `WhatsappLogo` |
| 📸 | Instagram | `InstagramLogo` |
| ⭐ | Trust chip u hero | Ukloniti, ostaviti samo tekst |

All icon components: `weight="duotone"`, `size={36}`, `color` from brand tokens where appropriate.

**Affected files:** `content.ts`, `service-cards.tsx`, `usluge/page.tsx`, `o-nama/page.tsx`, `kontakt/page.tsx`, `hero.tsx`

---

### 1.3 Focus Ring Contrast

**Problem:** `focus:ring-[#3cc0cc]/20` is too transparent for WCAG 2.4.7.

**Fix:** Change to `focus:ring-[#3cc0cc]/50` in all inputs and textarea.

**Affected file:** `src/components/contact-form.tsx`

---

### 1.4 "Saznaj više →" — Make Clickable

**Problem:** `<p>` tag with arrow implies interactivity but is not a link.

**Fix:** Replace with `<Link href="/usluge" className="...">Saznaj više →</Link>`

**Affected file:** `src/components/service-cards.tsx`

---

### 1.5 Before/After Skeleton Loading State

**Problem:** Unmounted state renders invisible `<div>` — layout "hole" during SSR hydration.

**Fix:** Replace empty div with `<div className="animate-pulse bg-[#f0fbfc] rounded-2xl" style={{ height: "320px" }} />`

**Affected file:** `src/components/before-after-gallery.tsx`

---

### 1.6 Price Chip Contrast

**Problem:** `text-[#3cc0cc]` on `bg-[#f0fbfc]` = ~2.8:1 contrast ratio (WCAG AA requires 4.5:1 for small text).

**Fix:** Change to `text-[#0f2a35]` (dark text on light teal background) — contrast ~12:1.

**Affected file:** `src/components/service-cards.tsx`

---

### 1.7 "Zona rada" Heading Inconsistency

**Problem:** Kontakt page uses bare `<h2>` instead of `<SectionHeading>` component.

**Fix:** Replace with `<SectionHeading as="h2" title="Zona rada" />` wrapped in `<AnimatedSection>`.

**Affected file:** `src/app/kontakt/page.tsx`

---

## Part 2: Content Restructure

### 2.1 Remove Auto Enterijer

Remove all references to car/auto cleaning from the site.

**Changes:**
- `content.ts` → `serviceCards`: remove "Auto enterijer" card, replace with **"Dušeci i jastuci"**
  ```ts
  { title: "Dušeci i jastuci", description: "Dubinsko čišćenje dušeca, jastuka i zaštitnih navlaka.", icon: "BedDouble", priceLabel: "Od 2.500 RSD" }
  ```
- `content.ts` → `servicesPage.categories`: remove "Auto sedišta i enterijer" (keep 3 categories)
- `content.ts` → `homePage.hero.thumbImages[1]`: replace auto seat Unsplash URL with a mattress/carpet image
- `usluge/page.tsx`: no changes needed (driven by content.ts)

---

## Part 3: New Homepage Edu Section

### 3.1 New Component: `EduHighlights`

**Location:** `src/components/edu-highlights.tsx`  
**Placement on homepage:** Between `BeforeAfterGallery` and `CtaBand`

**Layout:** 3 alternating rows (image ↔ text), each row is a teaser with a "Saznaj više →" link to the full section on `/usluge`.

**Props:**
```ts
type EduItem = {
  id: string;          // anchor on /usluge (e.g. "parni-cistac")
  title: string;
  summary: string;
  image: { src: string; alt: string };
  imagePosition: "left" | "right";
}
type EduHighlightsProps = { items: readonly EduItem[] }
```

**Layout per row:**
- `md:grid-cols-2`, `items-center`, `gap-12`, `py-20`
- Image side: `rounded-2xl`, `shadow-lg`, `aspect-[4/3]`, `object-cover`
- Text side: `accent-line animate-item` + `h3` title + paragraph + `<Link>` CTA
- `imagePosition` controls order: `md:order-first` / `md:order-last`
- Wrap each row in `<AnimatedSection>`
- Alternating background: row 1 `bg-white`, row 2 `bg-[#f0fbfc]`, row 3 `bg-white`

**Content in `content.ts`:**
```ts
homePage.eduHighlights = [
  {
    id: "parni-cistac",
    imagePosition: "left",
    title: "Šta je parni čistač i zašto ga koristimo?",
    summary: "Parni čistač koristi visoko-temperaturnu vodenu paru da dubinski ukloni nečistoće, bakterije i alergene — bez agresivnih hemikalija i sa kraćim vremenom sušenja od klasičnog pranja.",
    image: { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Parni čistač na delu" }
  },
  {
    id: "alergije",
    imagePosition: "right",
    title: "Alergije i nameštaj — veza koju mnogi previde",
    summary: "Tapacirani nameštaj je jedno od glavnih skrovišta grinja i alergena u domu. Redovno dubinsko pranje značajno smanjuje simptome alergija i stvara zdravije okruženje za celu porodicu.",
    image: { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", alt: "Čist nameštaj u zdravom domu" }
  },
  {
    id: "vizuelno-cisto",
    imagePosition: "left",
    title: "Nameštaj može izgledati čisto — ali nije uvek tako",
    summary: "Površinska čistoća vara. Duboko u vlaknima skupljaju se masne nečistoće, prljavština i mikroorganizmi koji se ne vide golim okom, a jedino ih dubinsko pranje zaista uklanja.",
    image: { src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80", alt: "Pre i posle dubinskog pranja" }
  }
]
```

---

## Part 4: New Sections on /usluge

Three new sections added after existing content (process steps), before `CtaBand`. Each section has an HTML `id` for anchor navigation from homepage teasers.

---

### 4.1 Section: Parni čistač (`id="parni-cistac"`)

**Title:** "Parni čistač — sve što treba znati"  
**Layout:** Numbered steps (left, `md:col-span-7`) + sticky image (right, `md:col-span-5`)  
**Background:** `bg-white`

**Steps (in `content.ts` → `servicesPage.steamCleaner`):**
```ts
{
  title: "Parni čistač — sve što treba znati",
  steps: [
    { title: "Šta je parni čistač?", body: "Uređaj koji zagrevom vode do 120–150°C stvara pritisak i suvu paru. Para prodire duboko u vlakna i rastvara nečistoće koje klasično usisavanje ne dostiže." },
    { title: "Kako funkcioniše?", body: "Para se upušta u tkaninu kroz specijalnu mlaznicu. Toplota razgrađuje masne naslage, ubija grinje i bakterije, a ekstraktor odmah usisava rastvorenu prljavštinu." },
    { title: "Zašto je bolji od klasičnog čišćenja?", body: "Manje hemikalija, brže sušenje (2–4h umesto 12+h), dublje prodiranje u vlakna i sigurniji za osetljive materijale i alergičare." },
    { title: "Kada se koristi?", body: "Za ugaone garniture, fotelje, dušece, jastuci, tepihe i sve tapacirane komade — bez obzira na vrstu tkanine." }
  ],
  image: { src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80", alt: "Parni čistač na garnituri" }
}
```

**Layout detail:**
- `md:grid-cols-12`, steps in `md:col-span-7`, image in `md:col-span-5 md:sticky md:top-28`
- Steps: each step has a teal numbered circle + `h3` title + body paragraph
- Consistent with existing `processSteps` styling

---

### 4.2 Section: Alergije i nameštaj (`id="alergije"`)

**Title:** "Alergije i nameštaj"  
**Layout:** Intro paragraph (full width) + 2-column fact boxes  
**Background:** `bg-[#f0fbfc]`

**Fact boxes (in `content.ts` → `servicesPage.allergiesSection`):**
```ts
{
  title: "Alergije i nameštaj",
  intro: "Tapacirani nameštaj je jedan od najvećih skrovišta grinja u domu — a grinje su vodeći uzrok alergija na prašinu. Ono što ne možete videti, može uticati na vaše zdravlje svaki dan.",
  facts: [
    { icon: "Wind", title: "Grinje i alergeni", body: "Prosečni dušec sadrži između 100.000 i 10 miliona grinja. Zagrevanje i vlaga ih podstiču na razmnožavanje." },
    { icon: "HeartBeat", title: "Simptomi koje pogoršava prljav nameštaj", body: "Kijanje, zapušen nos, svrab očiju, pogoršanje astme — sve ovo može biti direktno vezano za neopran tapacirani nameštaj." },
    { icon: "ShieldCheck", title: "Rešenje: dubinsko pranje", body: "Visoka temperatura pare (120°C+) ubija grinje i uništava alergene. Preporučujemo pranje svakih 6–12 meseci." },
    { icon: "Baby", title: "Posebno važno za decu i trudnice", body: "Deca provode više vremena na podu i nameštaju. Čist nameštaj smanjuje rizik od respiratornih problema." }
  ]
}
```

---

### 4.3 Section: Vizuelno čisto (`id="vizuelno-cisto"`)

**Title:** "Nameštaj može izgledati čisto — ali nije uvek tako"  
**Layout:** Intro + 2-column comparison (`Izgleda čisto` vs `Dubinski čisto`)  
**Background:** `bg-white`

**Content (in `content.ts` → `servicesPage.visuallyCleanSection`):**
```ts
{
  title: "Nameštaj može izgledati čisto — ali nije uvek tako",
  intro: "Vizuelna čistoća vas može prevariti. Površinski sloj tkanine može biti bez mrlja, ali duboko u vlaknima se skrivaju nečistoće koje standardno čišćenje ne doseže.",
  left: {
    heading: "Izgleda čisto",
    points: [
      "Nema vidljivih mrlja ni prljavštine",
      "Svež miris posle prskanja sredstvima",
      "Regularno usisavanje površine",
      "Čista navlaka ili pokrivač"
    ]
  },
  right: {
    heading: "Dubinski čisto",
    points: [
      "Uklonjena prljavština iz vlakana",
      "Neutralisani neprijatni mirisi iz dubine",
      "Uništene grinje i bakterije",
      "Produžen vek trajanja materijala"
    ]
  }
}
```

---

## Testing Requirements

All existing 20 tests must continue to pass. New tests:

- `edu-highlights.test.tsx` — renders all 3 edu items, checks titles and "Saznaj više" links point to correct `/usluge#id`
- `usluge/page.tsx` tests extended — checks for `parni-cistac`, `alergije`, `vizuelno-cisto` section IDs
- `service-cards.test.tsx` — no emoji in rendered output, "Saznaj više" is an `<a>` tag
- Mobile nav test in `layout-shell.test.tsx` — hamburger button exists, nav links accessible

---

## Implementation Order

1. Install `@phosphor-icons/react`
2. Update `content.ts` (remove auto, add new content shapes)
3. Fix `site-header.tsx` (mobile nav)
4. Fix all 6 minor bugs (focus, link, skeleton, contrast, heading)
5. Replace emoji with Phosphor icons across all components
6. New `EduHighlights` component + add to homepage
7. New `/usluge` edu sections
8. Tests for all new functionality
