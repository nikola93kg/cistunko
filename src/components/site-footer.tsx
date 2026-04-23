// src/components/site-footer.tsx
import Link from "next/link";
import { navigationItems, siteConfig } from "@/lib/content";

const contactLinks = [
  { label: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
  { label: "WhatsApp", href: siteConfig.whatsAppHref },
  { label: "Instagram", href: siteConfig.instagramHref },
] as const;

export function SiteFooter() {
  return (
    <footer style={{ background: "#0f2a35" }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[#3cc0cc]">Čistunko</span>.rs
          </Link>
          <p className="text-sm leading-7 text-white/60">
            Dubinsko pranje za dom i automobil uz brz odgovor i pouzdan dolazak.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 transition-colors hover:text-[#3cc0cc]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 transition-colors hover:text-[#3cc0cc]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Čistunko. Sva prava zadržana.
      </div>
    </footer>
  );
}
