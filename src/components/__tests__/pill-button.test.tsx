import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PillButton } from "@/components/ui/pill-button";

describe("PillButton", () => {
  test("renders an anchor with the correct href", () => {
    render(<PillButton href="/test">Click</PillButton>);
    expect(screen.getByRole("link", { name: "Click" })).toHaveAttribute("href", "/test");
  });

  test("applies primary variant classes by default", () => {
    const { container } = render(<PillButton href="/">CTA</PillButton>);
    expect(container.firstChild).toHaveClass("from-[#3cc0cc]");
  });

  test("applies whatsapp variant classes", () => {
    const { container } = render(<PillButton href="/" variant="whatsapp">WA</PillButton>);
    expect(container.firstChild).toHaveClass("from-[#a0c850]");
  });

  test("forwards extra anchor props", () => {
    render(<PillButton href="/" target="_blank" rel="noopener noreferrer">Link</PillButton>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("className override merges without trailing space", () => {
    const { container } = render(<PillButton href="/"><span>x</span></PillButton>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toMatch(/ $/);
  });

  test("className override replaces conflicting Tailwind classes", () => {
    const { container } = render(
      <PillButton href="/" className="px-4">tight</PillButton>
    );
    const el = container.firstChild as HTMLElement;
    // twMerge should keep px-4, remove px-8 from BASE
    expect(el.className).toContain("px-4");
    expect(el.className).not.toContain("px-8");
  });
});
