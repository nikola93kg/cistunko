import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact-form";

describe("ContactForm", () => {
  it("updates the mailto href as the user types", async () => {
    const user = userEvent.setup();
    render(<ContactForm email="kontakt@example.com" />);

    await user.type(screen.getByLabelText(/ime/i), "Petar Petrovic");
    await user.type(screen.getByLabelText(/telefon/i), "060 123 45 67");
    await user.type(screen.getByLabelText(/poruka/i), "Treba mi dubinsko pranje ugaone");

    const subject = "Upit sa sajta — Petar Petrovic";
    const body = [
      "Ime: Petar Petrovic",
      "Telefon: 060 123 45 67",
      "",
      "Poruka:",
      "Treba mi dubinsko pranje ugaone",
    ].join("\n");

    expect(screen.getByRole("link", { name: /pošalji email upit/i })).toHaveAttribute(
      "href",
      `mailto:kontakt@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  });
});
