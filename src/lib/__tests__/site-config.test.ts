import { describe, expect, it } from "vitest";
import { homePage, navigationItems, siteConfig } from "@/lib/content";

describe("content model", () => {
  it("defines four navigation items", () => {
    expect(navigationItems.map((item) => item.href)).toEqual([
      "/",
      "/usluge",
      "/o-nama",
      "/kontakt",
    ]);
  });
  it("defines the homepage service-card content", () => {
    expect(homePage.serviceCards).toHaveLength(2);
    expect(homePage.beforeAfterItems.length).toBeGreaterThanOrEqual(2);
  });
  it("keeps CTA links in config", () => {
    expect(siteConfig.phoneHref).toMatch(/^tel:/);
    expect(siteConfig.whatsAppHref).toContain("wa.me");
  });
});
