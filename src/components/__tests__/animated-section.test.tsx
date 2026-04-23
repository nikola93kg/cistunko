import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AnimatedSection } from "@/components/ui/animated-section";

describe("AnimatedSection", () => {
  test("renders children inside animate-section wrapper", () => {
    render(<AnimatedSection><p>hello</p></AnimatedSection>);
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("hello").closest(".animate-section")).not.toBeNull();
  });

  test("applies additional className alongside animate-section", () => {
    render(<AnimatedSection className="my-class"><span>x</span></AnimatedSection>);
    const wrapper = screen.getByText("x").closest("div");
    expect(wrapper?.className).toContain("animate-section");
    expect(wrapper?.className).toContain("my-class");
  });

  test("does not produce trailing space when no className given", () => {
    render(<AnimatedSection><span>y</span></AnimatedSection>);
    const wrapper = screen.getByText("y").closest("div");
    expect(wrapper?.className).toBe("animate-section");
  });
});
