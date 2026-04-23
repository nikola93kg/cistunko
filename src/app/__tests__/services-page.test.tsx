import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesPage from "@/app/usluge/page";

describe("services page", () => {
  it("renders the services page heading", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /usluge/i, level: 1 })).toBeInTheDocument();
  });

  it("renders the three service categories", () => {
    render(<ServicesPage />);
    expect(screen.getByText("Ugaone garniture i trosedi")).toBeInTheDocument();
    expect(screen.getByText("Fotelje i stolice")).toBeInTheDocument();
    expect(screen.getByText("Dušeci")).toBeInTheDocument();
  });

  it("renders the steam cleaner section with anchor id", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /parni čistač/i })).toBeInTheDocument();
    expect(document.getElementById("parni-cistac")).not.toBeNull();
  });

  it("renders the allergies section with anchor id", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /alergije i nameštaj/i })).toBeInTheDocument();
    expect(document.getElementById("alergije")).not.toBeNull();
  });

  it("renders the visually clean section with anchor id", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /nameštaj može izgledati/i })).toBeInTheDocument();
    expect(document.getElementById("vizuelno-cisto")).not.toBeNull();
  });

  it("does not render auto/car content", () => {
    render(<ServicesPage />);
    expect(screen.queryByText(/auto/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/automobil/i)).not.toBeInTheDocument();
  });
});
