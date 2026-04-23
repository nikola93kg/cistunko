import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/o-nama/page";
import ContactPage from "@/app/kontakt/page";

describe("about and contact pages", () => {
  it("renders the about page content", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: /o nama/i })).toBeInTheDocument();
    expect(screen.getAllByText(/pouzdan/i)[0]).toBeInTheDocument();
  });

  it("renders the contact page actions and form", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: /pozovi/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /poruka/i })).toBeInTheDocument();
  });
});
