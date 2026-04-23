// src/components/__tests__/edu-highlights.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EduHighlights } from "@/components/edu-highlights";
import { homePage } from "@/lib/content";

describe("EduHighlights", () => {
  it("renders all edu items", () => {
    render(<EduHighlights items={homePage.eduHighlights} />);
    expect(screen.getByText("Parni čistač — šta je i kako radi")).toBeInTheDocument();
    expect(screen.getByText("Alergije i nameštaj — veza koja se ne vidi")).toBeInTheDocument();
    expect(screen.getByText("Nameštaj može izgledati čisto — ali nije")).toBeInTheDocument();
  });

  it("renders anchor links to /usluge#id for each item", () => {
    render(<EduHighlights items={homePage.eduHighlights} />);
    const links = screen.getAllByRole("link", { name: /saznaj više/i });
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/usluge#parni-cistac");
    expect(links[1]).toHaveAttribute("href", "/usluge#alergije");
    expect(links[2]).toHaveAttribute("href", "/usluge#vizuelno-cisto");
  });
});
