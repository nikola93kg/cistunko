import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/ui/icon";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt",
  description: "Kontaktirajte Čistunko za zakazivanje dubinskog pranja.",
  path: "/kontakt",
});

const contactLinks = [
  {
    label: "Pozovi",
    href: siteConfig.phoneHref,
    icon: "Phone" as const,
    value: siteConfig.phoneDisplay,
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsAppHref,
    icon: "WhatsappLogo" as const,
    value: "Brz dogovor preko poruke",
  },
  {
    label: "Viber",
    href: siteConfig.viberHref,
    icon: "ChatCircleText" as const,
    value: "Zakazivanje i pitanja preko Vibera",
  },
  {
    label: "Instagram",
    href: siteConfig.instagramHref,
    icon: "InstagramLogo" as const,
    value: "@cistunko.dubinskopranje",
  },
] as const;

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-[#3cc0cc]/10 bg-[#f0fbfc]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-3xl space-y-4">
            <div className="accent-line hero-accent" />
            <h1 className="text-4xl font-bold tracking-tight text-[#0f2a35] md:text-5xl">Kontakt</h1>
            <p className="text-lg leading-8 text-[#4a6a78]">
              Najbrži put do termina je direktan poziv ili poruka. Pošaljite osnovne informacije i javljamo se sa prvim slobodnim terminom.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 rounded-2xl border border-[#3cc0cc]/15 bg-white p-5 shadow-sm transition-colors hover:bg-[#f0fbfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3cc0cc]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fbfc] text-[#3cc0cc]">
                  <Icon name={link.icon} size={24} weight="regular" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#0f2a35]">{link.label}</span>
                  <span className="mt-1 block text-sm text-[#4a6a78]">{link.value}</span>
                </span>
              </a>
            ))}
          </div>

          <ContactForm email={siteConfig.email} />
        </div>
      </section>
    </div>
  );
}
