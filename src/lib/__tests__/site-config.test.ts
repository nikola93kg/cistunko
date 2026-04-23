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
    expect(homePage.hero).toMatchObject({
      eyebrow: "Dubinsko pranje",
      title: "Moderan i pouzdan servis dubinskog pranja za vaš dom.",
      description:
        "Čistunko spaja premium rezultat, brz odgovor i autentičan dokaz rada kroz stvarne before/after primere.",
    });

    expect(homePage.serviceCards[0]).toMatchObject({
      title: "Nameštaj i dušeci",
      description: "Ugaone garniture, fotelje, stolice, dušeci i tapacirani komadi.",
    });
    expect(homePage.serviceCards[1]).toMatchObject({
      title: "Dušeci i jastuci",
      description: "Dubinsko pranje dušeka, jastuka i zaštitnih navlaka. Bezbedno za decu i alergičare.",
    });

    expect(homePage.beforeAfterItems[0]).toMatchObject({ label: "Garnitura" });
    expect(homePage.beforeAfterItems[1]).toMatchObject({ label: "Fotelja" });

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
