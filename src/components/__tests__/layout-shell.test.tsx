import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";

describe("layout shell", () => {
  it("renders core navigation and contact links", () => {
    render(
      <>
        <SiteHeader />
        <StickyCta />
        <SiteFooter />
      </>,
    );

    expect(
      screen
        .getAllByRole("link", { name: "Početna" })
        .some((link) => link.getAttribute("href") === "/"),
    ).toBe(true);
    expect(screen.getAllByRole("link", { name: /whatsapp/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
  });
});
