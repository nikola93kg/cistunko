// src/test/setup.ts
import { afterEach } from "vitest";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(cleanup);

// AnimatedSection uses IntersectionObserver
(global as unknown as Record<string, unknown>).IntersectionObserver = vi
  .fn()
  .mockImplementation(function () {
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  });

// react-compare-slider uses ResizeObserver
(global as unknown as Record<string, unknown>).ResizeObserver = vi
  .fn()
  .mockImplementation(function () {
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  });

(global as unknown as Record<string, unknown>).CSS = {
  registerProperty: vi.fn(),
};
