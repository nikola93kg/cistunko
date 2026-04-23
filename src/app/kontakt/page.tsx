// src/app/kontakt/page.tsx
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt",
  description: "Poziv, WhatsApp ili email upit — izaberite kanal koji vam najviše odgovara.",
  path: "/kontakt",
});

const contactLinks: { label: string; href: string; description: string; icon: IconName; variant: "secondary" | "whatsapp" }[] = [
  {
    label: "Pozovi",
    href: siteConfig.phoneHref,
    description: siteConfig.phoneDisplay,
    icon: "Phone",
    variant: "secondary",
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsAppHref,
    description: "Brz dogovor i odgovor u poruci.",
    icon: "WhatsappLogo",
    variant: "whatsapp",
  },
  {
    label: "Instagram",
    href: siteConfig.instagramHref,
    description: "Pogledajte stvarne primere rada.",
    icon: "InstagramLogo",
    variant: "secondary",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Page hero */}
      <section
        className="border-b border-[#3cc0cc]/10"
        style={{ background: "linear-gradient(135deg, #f0fbfc 0%, #e6f9fa 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedSection>
            <SectionHeading
              title="Kontakt"
              description="Poziv, WhatsApp ili email upit — izaberite kanal koji vam najviše odgovara."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact grid: links + form */}
      <section className="border-b border-[#3cc0cc]/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:py-24">
          {/* Contact links */}
          <AnimatedSection>
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="animate-item flex items-center gap-4 rounded-2xl border border-[#3cc0cc]/15 bg-[#f0fbfc] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3cc0cc]/40 hover:shadow-md"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3cc0cc]/10 text-[#3cc0cc]">
                    <Icon name={link.icon} size={20} weight="regular" aria-hidden />
                  </div>
                  <div>
                    <p className="font-bold text-[#0f2a35]">{link.label}</p>
                    <p className="text-sm text-[#4a6a78]">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <ContactForm email={siteConfig.email} />
        </div>
      </section>

      {/* Google Maps */}
      <section style={{ background: "#f0fbfc" }} className="border-b border-[#3cc0cc]/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-6 text-xl font-bold text-[#0f2a35]">Zona rada</h2>
          <div className="overflow-hidden rounded-2xl border border-[#3cc0cc]/15 shadow-md">
            <iframe
              title="Čistunko — zona rada"
              src="https://maps.google.com/maps?q=Novi+Sad,+Serbia&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
