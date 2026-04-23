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
