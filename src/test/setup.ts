// src/test/setup.ts
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

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
