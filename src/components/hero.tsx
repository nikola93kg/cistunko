import { siteConfig } from "@/lib/content";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function Hero({ eyebrow, title, description }: HeroProps) {
  return (
    <section className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">{eyebrow}</p>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-black md:text-6xl">{title}</h1>
          <p className="text-lg leading-8 text-black/70 md:text-xl">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-black px-6 py-3 text-center text-sm font-medium text-white"
          >
            Pozovite {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.whatsAppHref}
            className="rounded-full border border-black/10 px-6 py-3 text-center text-sm font-medium text-black"
          >
            Pišite na WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
