import { describe, expect, it } from "vitest";
import { buildMetadata } from "@/lib/seo";

describe("buildMetadata", () => {
  it("builds canonical metadata for a content page", () => {
    const metadata = buildMetadata({
      title: "Usluge",
      description: "Opis usluga",
      path: "/usluge",
    });

    expect(metadata.title).toBe("Usluge | Cistunko");
    expect(metadata.alternates?.canonical).toBe("https://cistunko.rs/usluge");
  });
});
