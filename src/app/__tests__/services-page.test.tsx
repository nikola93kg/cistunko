import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesPage from "@/app/usluge/page";

describe("services page", () => {
  it("renders the services content", () => {
    render(<ServicesPage />);

    expect(screen.getByRole("heading", { name: /usluge/i })).toBeInTheDocument();
    expect(screen.getByText(/nameštaj/i)).toBeInTheDocument();
    expect(screen.getByText(/kako izgleda proces/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
  });
});
