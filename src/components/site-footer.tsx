import Link from "next/link";
import { navigationItems, siteConfig } from "@/lib/content";

const contactLinks = [
  { label: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
  { label: "WhatsApp", href: siteConfig.whatsAppHref },
  { label: "Instagram", href: siteConfig.instagramHref },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="text-lg font-semibold text-black">
            Cistunko.rs
          </Link>
          <p className="text-sm text-black/70">
            Dubinsko pranje za dom i automobil uz brz odgovor i pouzdan dolazak.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-black/80">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          {contactLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-black/80">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
