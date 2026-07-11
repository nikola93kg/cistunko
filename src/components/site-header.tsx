// src/components/site-header.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatCircleText, List, PhoneCall, WhatsappLogo, X } from "@phosphor-icons/react";
import { navigationItems, siteConfig } from "@/lib/content";
import { PillButton } from "@/components/ui/pill-button";

const navLinkBase =
  "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2";

const mobileNavLinkBase =
  "flex h-12 items-center justify-between rounded-[8px] px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const desktopNavigationItems = navigationItems.filter((item) => item.href !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[#3cc0cc]/15 bg-white/95 shadow-[0_10px_30px_rgba(15,42,53,0.06)] backdrop-blur-md">
      <div className="mx-auto flex h-[90px] max-w-[1480px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Čistunko početna"
          className="flex h-full shrink-0 items-center rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.webp"
            alt="Čistunko logo"
            width={90}
            height={90}
            sizes="90px"
            priority
            className="h-full w-auto object-contain"
          />
        </Link>

        <nav
          aria-label="Glavna navigacija"
          className="hidden items-center rounded-full border border-[#3cc0cc]/15 bg-[#f7fdfe]/85 p-1 shadow-sm md:flex"
        >
          {desktopNavigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  navLinkBase,
                  active
                    ? "bg-white text-[#0f2a35] shadow-sm"
                    : "text-[#4a6a78] hover:bg-white/80 hover:text-[#0f2a35]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="hidden h-11 items-center gap-2 rounded-full border border-[#3cc0cc]/20 bg-white px-4 text-sm font-semibold text-[#0f2a35] shadow-sm transition-colors hover:bg-[#f0fbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2 xl:inline-flex"
          >
            <PhoneCall size={18} weight="bold" aria-hidden />
            <span>{siteConfig.phoneDisplay}</span>
          </a>
          <PillButton href={siteConfig.whatsAppHref} variant="whatsapp" className="hidden h-11 px-5 py-0 text-sm md:inline-flex">
            <WhatsappLogo size={18} weight="bold" aria-hidden />
            WhatsApp
          </PillButton>
          <a
            href={siteConfig.viberHref}
            className="hidden h-11 items-center justify-center gap-2 rounded-full bg-[#7360f2] px-5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2 md:inline-flex"
          >
            <ChatCircleText size={18} weight="bold" aria-hidden />
            Viber
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#3cc0cc]/20 bg-white text-[#0f2a35] shadow-sm transition-colors hover:bg-[#f0fbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} weight="bold" aria-hidden /> : <List size={24} weight="bold" aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-[#3cc0cc]/15 bg-white/95 shadow-[0_18px_40px_rgba(15,42,53,0.12)] backdrop-blur-md md:hidden">
          <nav id="mobile-navigation" aria-label="Mobilna navigacija" className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6">
            <ul className="grid gap-1">
              {navigationItems.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        mobileNavLinkBase,
                        active ? "bg-[#f0fbfc] text-[#0f2a35]" : "text-[#4a6a78] hover:bg-[#f0fbfc] hover:text-[#0f2a35]",
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden
                        className={active ? "h-2 w-2 rounded-full bg-[#3cc0cc]" : "h-2 w-2 rounded-full bg-transparent"}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#3cc0cc]/10 pt-4">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-[#3cc0cc]/20 bg-white text-sm font-semibold text-[#0f2a35] shadow-sm transition-colors hover:bg-[#f0fbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <PhoneCall size={18} weight="bold" aria-hidden />
                Pozovi
              </a>
              <a
                href={siteConfig.whatsAppHref}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-gradient-to-br from-[#a0c850] to-[#7aab28] text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <WhatsappLogo size={18} weight="bold" aria-hidden />
                WhatsApp
              </a>
              <a
                href={siteConfig.viberHref}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#7360f2] text-sm font-semibold text-white shadow-md transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc] focus-visible:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <ChatCircleText size={18} weight="bold" aria-hidden />
                Viber
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
export { SiteHeader };
