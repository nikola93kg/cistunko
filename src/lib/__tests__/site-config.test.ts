import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

describe("siteConfig", () => {
  it("defines the complete site config contract", () => {
    expect(siteConfig).toEqual({
      name: "Cistunko",
      domain: "cistunko.rs",
      phoneDisplay: "+381 6X XXX XX XX",
      phoneHref: "tel:+3816XXXXXXXX",
      whatsAppHref: "https://wa.me/3816XXXXXXXX",
      instagramHref: "https://www.instagram.com/cistunko.dubinskopranje/",
      email: "hello@cistunko.rs",
    });
  });
});
