// src/components/site-header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { navigationItems, siteConfig } from "@/lib/content";
import { PillButton } from "@/components/ui/pill-button";

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#3cc0cc]/10 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[#0f2a35]"
          onClick={() => setOpen(false)}
        >
          <span className="text-[#3cc0cc]">Čistunko</span>.rs
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Glavna navigacija" className="hidden items-center gap-8 md:flex">
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

        <PillButton href={siteConfig.whatsAppHref} variant="primary" className="hidden px-5 py-2.5 text-xs md:flex">
          Zakažite
        </PillButton>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Otvori meni"
          aria-expanded={open}
          className="flex items-center justify-center rounded-lg p-2 text-[#0f2a35] hover:bg-[#f0fbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} aria-hidden /> : <List size={24} aria-hidden />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav aria-label="Mobilna navigacija" className="border-t border-[#3cc0cc]/10 bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#0f2a35] hover:bg-[#f0fbfc] hover:text-[#3cc0cc]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
export { SiteHeader };
