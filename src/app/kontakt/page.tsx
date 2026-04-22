import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";

const contactLinks = [
  { label: "Pozovi", href: siteConfig.phoneHref, description: siteConfig.phoneDisplay },
  { label: "WhatsApp", href: siteConfig.whatsAppHref, description: "Brz dogovor i odgovor u poruci." },
  { label: "Instagram", href: siteConfig.instagramHref, description: "Pogledajte stvarne primere rada." },
] as const;

export default function ContactPage() {
  return (
    <div className="bg-zinc-50 text-black">
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading
            title="Kontakt"
            description="Poziv, WhatsApp ili email upit — izaberite kanal koji vam najviše odgovara."
          />
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1fr_1.2fr] md:py-20">
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-semibold text-black">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{link.description}</p>
              </a>
            ))}
          </div>

          <ContactForm email={siteConfig.email} />
        </div>
      </section>
    </div>
  );
}
