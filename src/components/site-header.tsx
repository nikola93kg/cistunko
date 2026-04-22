import Link from "next/link";
import { navigationItems, siteConfig } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-black">
          Cistunko.rs
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-black/80">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.phoneHref}
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Pozovite
        </a>
      </div>
    </header>
  );
}
