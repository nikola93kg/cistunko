// src/components/site-header.tsx
import Link from "next/link";
import { navigationItems, siteConfig } from "@/lib/content";
import { PillButton } from "@/components/ui/pill-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#3cc0cc]/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#0f2a35]">
          <span className="text-[#3cc0cc]">Čistunko</span>.rs
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navigationItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#4a6a78] transition-colors hover:text-[#3cc0cc]"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <PillButton href={siteConfig.whatsAppHref} variant="primary" className="px-5 py-2.5 text-xs">
          Zakažite
        </PillButton>
      </div>
    </header>
  );
}
