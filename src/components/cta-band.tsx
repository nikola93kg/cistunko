import { siteConfig } from "@/lib/content";

type CtaBandProps = {
  title: string;
  description: string;
};

export function CtaBand({ title, description }: CtaBandProps) {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <p className="text-base leading-7 text-white/75">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-black"
          >
            Pozovite {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.whatsAppHref}
            className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-medium text-white"
          >
            Pišite na WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
