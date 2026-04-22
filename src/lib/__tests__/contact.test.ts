import { describe, expect, it } from "vitest";
import { buildMailtoHref } from "@/lib/contact";

describe("buildMailtoHref", () => {
  it("encodes subject and body with encodeURIComponent semantics", () => {
    const subject = "Upit sa sajta — Petar Petrovic";
    const body = [
      "Ime: Petar Petrovic",
      "Telefon: 060 123 45 67",
      "",
      "Poruka:",
      "Treba mi dubinsko pranje ugaone",
    ].join("\n");

    expect(
      buildMailtoHref({
        name: "  Petar Petrovic  ",
        phone: "  060 123 45 67 ",
        message: "  Treba mi dubinsko pranje ugaone  ",
        email: "kontakt@example.com",
      }),
    ).toBe(
      `mailto:kontakt@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  });
});
