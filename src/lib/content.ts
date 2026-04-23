// src/lib/content.ts
import { siteConfig } from "@/lib/site-config";

import type { IconName } from "@/components/ui/icon";
export type { IconName };

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
      description: "Dubinsko pranje dušeka, jastuka i zaštitnih navlaka. Bezbedno za decu i alergičare.",
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
