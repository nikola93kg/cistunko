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
  },
  serviceCards: [
    {
      title: "Nameštaj i dušeci",
      description: "Ugaone garniture, fotelje, stolice, dušeci i tapacirani komadi.",
    },
    {
      title: "Auto enterijer",
      description: "Sedišta, zadnja klupa, gepek i drugi tekstilni delovi enterijera.",
    },
  ],
  beforeAfterItems: [
    {
      src: "/images/proof/proof-1.jpg",
      alt: "Dubinski očišćena garnitura posle tretmana",
      label: "Garnitura — before/after",
    },
    {
      src: "/images/proof/proof-2.jpg",
      alt: "Dubinski očišćeno auto sedište posle tretmana",
      label: "Auto sedište — before/after",
    },
  ],
  ctaBand: {
    title: "Pozovite ili pišite na WhatsApp za brz dogovor.",
    description: "Najbrži put do termina je direktan kontakt.",
  },
} as const;

export { siteConfig };
