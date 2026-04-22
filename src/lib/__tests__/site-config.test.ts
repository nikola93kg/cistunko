import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("defines the brand and primary CTA links", () => {
    expect(siteConfig.name).toBe("Cistunko");
    expect(siteConfig.domain).toBe("cistunko.rs");
    expect(siteConfig.phoneHref).toMatch(/^tel:/);
    expect(siteConfig.whatsAppHref).toContain("wa.me");
  });
});
