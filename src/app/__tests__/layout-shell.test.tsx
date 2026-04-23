// src/app/__tests__/layout-shell.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SiteHeader from "@/components/site-header";

describe("SiteHeader mobile nav", () => {
  it("shows a hamburger button on mobile", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: /meni/i })).toBeInTheDocument();
  });

  it("toggles mobile menu open and closed", () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: /meni/i });

    // menu hidden initially
    expect(screen.queryByRole("navigation", { name: /mobilna navigacija/i })).not.toBeInTheDocument();

    // open menu
    fireEvent.click(toggle);
    expect(screen.getByRole("navigation", { name: /mobilna navigacija/i })).toBeInTheDocument();

    // close menu
    fireEvent.click(toggle);
    expect(screen.queryByRole("navigation", { name: /mobilna navigacija/i })).not.toBeInTheDocument();
  });
});
