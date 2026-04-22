import { describe, expect, it } from "vitest";
import { homePage, navigationItems, siteConfig } from "@/lib/content";

describe("content model", () => {
  it("defines the expected navigation items", () => {
    expect(navigationItems).toEqual([
      { label: "Početna", href: "/" },
      { label: "Usluge", href: "/usluge" },
      { label: "O nama", href: "/o-nama" },
      { label: "Kontakt", href: "/kontakt" },
    ]);
  });

  it("defines the expected homepage content", () => {
    expect(homePage.hero).toEqual({
      eyebrow: "Dubinsko pranje",
      title: "Moderan i pouzdan servis dubinskog pranja za dom i automobil.",
      description:
        "Čistunko spaja premium rezultat, brz odgovor i autentičan dokaz rada kroz stvarne before/after primere.",
    });

    expect(homePage.serviceCards).toEqual([
      {
        title: "Nameštaj i dušeci",
        description: "Ugaone garniture, fotelje, stolice, dušeci i tapacirani komadi.",
      },
      {
        title: "Auto enterijer",
        description: "Sedišta, zadnja klupa, gepek i drugi tekstilni delovi enterijera.",
      },
    ]);

    expect(homePage.beforeAfterItems).toEqual([
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
    ]);

    expect(homePage.ctaBand).toEqual({
      title: "Pozovite ili pišite na WhatsApp za brz dogovor.",
      description: "Najbrži put do termina je direktan kontakt.",
    });
  });

  it("keeps CTA links in config", () => {
    expect(siteConfig.phoneHref).toMatch(/^tel:/);
    expect(siteConfig.whatsAppHref).toContain("wa.me");
  });
});
