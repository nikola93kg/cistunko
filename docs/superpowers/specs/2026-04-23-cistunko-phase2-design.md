# Čistunko Phase 2 — UI/UX Redesign Design Spec

**Date:** 2026-04-23  
**Status:** Approved  
**Scope:** Full visual redesign of all pages with brand palette, animations, responsive layout, interactive before/after slider, and Google Maps contact.

---

## 1. Goal

Replace the Phase 1 skeleton UI with a polished, brand-consistent marketing site that:
- Communicates Čistunko's services clearly and convincingly
- Reflects the brand's friendly-professional character
- Works beautifully on mobile, tablet, and desktop
- Animates smoothly without being distracting

---

## 2. Design System

### 2.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#3cc0cc` | Primary buttons, accents, links |
| `--color-primary-dark` | `#189cb4` | Gradient end, hover states |
| `--color-primary-bg` | `#f0fbfc` | Light section backgrounds |
| `--color-primary-bg-deep` | `#e6f8f9` | Alternate section backgrounds |
| `--color-accent-green` | `#a0c850` | WhatsApp button, leaf accents |
| `--color-dark` | `#0f2a35` | Headings, dark sections |
| `--color-text` | `#4a6a78` | Body text, muted content |
| `--color-white` | `#ffffff` | Card backgrounds, nav |

Primary gradient: `linear-gradient(135deg, #3cc0cc, #189cb4)`  
WhatsApp gradient: `linear-gradient(135deg, #a0c850, #7aab28)`

### 2.2 Typography

- **Font**: System stack — `Inter, -apple-system, BlinkMacSystemFont, sans-serif`
- **Headings**: `font-weight: 700`, tight tracking
- **Body**: `font-weight: 400`, `line-height: 1.7`
- **Size scale**: h1 `3rem→4rem`, h2 `2rem→2.5rem`, h3 `1.25rem`, body `1rem`

### 2.3 Button Styles

All buttons use `border-radius: 50px` (pill/capsule).

| Variant | Style |
|---------|-------|
| Primary | Teal gradient bg, white text, `padding: 14px 32px` |
| Secondary | Transparent bg, teal border `2px`, teal text |
| WhatsApp | Green gradient bg, white text |
| Icon | Round (`48px`), teal bg with white icon |

Hover: `translateY(-2px)` + `box-shadow` lift + `brightness(1.05)`

### 2.4 Elevation & Cards

- Cards: `background: white`, `border-radius: 16px`, `box-shadow: 0 4px 24px rgba(0,0,0,0.08)`
- Cards hover: `translateY(-4px)` + stronger shadow
- Dark sections: `background: #0f2a35`, white text

### 2.5 Animation — Style C: Slide + Accent Line (Scroll-Triggered)

All animatable elements start hidden and animate when they enter the viewport.

**IntersectionObserver settings:**  
- `threshold: 0.15`  
- Class toggle: `is-visible`

**Accent line animation:**
```css
.accent-line { width: 0; height: 3px; background: teal-gradient; transition: width 0.7s ease; }
.is-visible .accent-line { width: 48px; }
```

**Slide-in animation (staggered delays):**
```css
.animate-item { opacity: 0; transform: translateX(-16px); transition: opacity 0.6s ease, transform 0.6s ease; }
.is-visible .animate-item { opacity: 1; transform: translateX(0); }
```

**Stagger order within each section:**
1. Accent line — delay `0.1s`
2. Label/tag — delay `0.3s`
3. Heading — delay `0.45s`
4. Subheading/body — delay `0.6s`
5. CTA buttons — delay `0.75s`

**Hero exception:** Animates on page load after `300ms` (no scroll needed).

---

## 3. Page Architecture

### 3.1 Shared Shell

**Navbar** (sticky, `backdrop-filter: blur(20px)`, white/90% bg):
- Logo (left) — SVG wordmark using brand teal
- Nav links (center, desktop only): Usluge | O Nama | Kontakt
- CTA button (right): "Zakažite" → WhatsApp link

**Footer:**
- Dark bg (`#0f2a35`), white text
- Logo + tagline (left)
- Links: Usluge, O Nama, Kontakt
- Contact: phone, email, Instagram link
- Copyright line

**Sticky Mobile CTA bar** (`md:hidden`, fixed bottom):
- Full-width "Zakažite odmah" button with WhatsApp icon
- Only visible below `md` breakpoint

### 3.2 Homepage (`/`)

Sections in order:

1. **Hero** — Two-column layout (desktop: 50/50, mobile: stacked)
   - Left: accent line + label chip + h1 heading + subtext + 2 CTA buttons (Primary + Secondary)
   - Right: large main image + 2 smaller thumbnail images in a grid + floating "Pre i Posle" chip + trust badge
   - Background: subtle teal gradient tint

2. **Service Cards** — `#f0fbfc` background
   - Section header (accent line + h2)
   - 2-column grid (mobile: 1-col) of service cards
   - Each card: icon + service name + short description + price chip + "Saznaj više" link
   - Services: Dubinsko pranje nameštaja, Dubinsko pranje tepiha

3. **Before/After Gallery** — white background
   - Section header
   - 2 interactive before/after sliders using `react-compare-slider`
   - Each slider: `ReactCompareSlider` component with `ReactCompareSliderImage` for before/after images
   - Dummy images used until real photos are provided

4. **CTA Band** — dark (`#0f2a35`) background, centered
   - Large heading + subtext + WhatsApp CTA button
   - Light wave or diagonal separator at top

5. **Footer** (shared)

### 3.3 Services Page (`/usluge`)

- Hero section (single-column, smaller than homepage): service category heading
- Detailed service cards (full descriptions from `content.ts`)
- Pricing table or card grid
- CTA Band

### 3.4 About Page (`/o-nama`)

- Hero section with company story
- Values/differentiators grid (3 cards: ekološka sredstva, profesionalna oprema, iskustvo)
- Team or story photo section (dummy image)
- CTA Band

### 3.5 Contact Page (`/kontakt`)

- Contact form (existing `ContactForm` component, styled)
- Contact info: phone, email, WhatsApp button
- Google Maps embedded iframe (city/area map — placeholder coordinates until real address provided)
- CTA Band

---

## 4. Component Architecture

Phase 1 already created these components in `src/components/`. Phase 2 fully rewrites their markup and styles:

| Component | Phase 2 Changes |
|-----------|----------------|
| `hero.tsx` | Two-column layout (content left, images right), C-animation |
| `service-cards.tsx` | Icon + price chip + hover lift, teal palette |
| `before-after-gallery.tsx` | Replace static layout with `ReactCompareSlider` |
| `cta-band.tsx` | Dark bg, wave separator, pill WhatsApp button |
| `site-header.tsx` | Blur backdrop, pill CTA button, teal logo |
| `site-footer.tsx` | Dark bg, links, contact info |
| `sticky-cta.tsx` | Full-width pill button with WhatsApp icon |
| `section-heading.tsx` | AccentLine + stagger animation support |
| `contact-form.tsx` | Pill input styling, teal focus rings |

New utility components to add:

| Component | Purpose |
|-----------|---------|
| `ui/animated-section.tsx` | Wrapper: IntersectionObserver + `is-visible` class toggle |
| `ui/pill-button.tsx` | Pill button with `variant` prop (primary/secondary/whatsapp) |

### 4.1 AnimatedSection API

```tsx
<AnimatedSection delay={0.3} className="...">
  {children}
</AnimatedSection>
```

Adds `data-animate` attribute and triggers `is-visible` class on scroll entry.

### 4.2 BeforeAfter Component

Uses `react-compare-slider` package:
```tsx
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
<ReactCompareSlider
  itemOne={<ReactCompareSliderImage src={before} alt="Pre" />}
  itemTwo={<ReactCompareSliderImage src={after} alt="Posle" />}
/>
```

Slider handle styled with brand teal.

---

## 5. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react-compare-slider` | latest | Interactive before/after slider |

No other new dependencies needed.

---

## 6. Responsive Strategy

| Breakpoint | Behavior |
|------------|----------|
| Mobile `< 768px` | Single column, larger tap targets, sticky bottom CTA visible |
| Tablet `768–1024px` | 2-col grids, hero stacked |
| Desktop `> 1024px` | Full 2-col hero, all grids, sticky CTA hidden |

All spacing uses Tailwind's responsive prefix system (`sm:`, `md:`, `lg:`).

---

## 7. Images

All images use Unsplash dummy URLs until real photos are provided:
- `https://images.unsplash.com/photo-[id]?w=800&q=80`
- Alt text always in Serbian (e.g., `"Čišćenje sofe pre tretmana"`)
- `next/image` component with `width` and `height` for all images

Real images to be swapped in Phase 3 (or when client provides photos).

---

## 8. Content

All text content lives in `src/lib/content.ts`. Phase 2 adds:
- Service descriptions (short and long)
- Before/after section labels
- CTA Band heading/subtext
- Footer links and legal text

Phone number, WhatsApp, and email remain as placeholders in `site-config.ts` until real values are confirmed.

---

## 9. Testing

Existing 11 Vitest tests must continue to pass. No new tests added in Phase 2 (visual components have no business logic to test).

Build must succeed (`next build`) with no TypeScript errors before merge.

---

## 10. Out of Scope (Phase 2)

- Real photos (Phase 3)
- Real contact data — phone/email/address (Phase 3)
- Actual form submission / backend (Phase 3)
- Google Analytics 4 integration (Phase 3)
- Vercel deployment (Phase 3)
