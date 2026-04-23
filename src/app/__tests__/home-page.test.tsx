import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("home page", () => {
  it("renders the homepage sections", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /moderan i pouzdan servis/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nameštaj i dušeci")).toBeInTheDocument();
    expect(screen.getByText("Dušeci i jastuci")).toBeInTheDocument();
    expect(screen.queryByText("Auto enterijer")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /before\/after/i })).toBeInTheDocument();
    expect(screen.getByText(/pozovite ili pišite na whatsapp/i)).toBeInTheDocument();
  });
});
