import { siteConfig } from "@/lib/content";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 p-4 md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={siteConfig.phoneHref}
          className="flex-1 rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white"
        >
          Pozovite
        </a>
        <a
          href={siteConfig.whatsAppHref}
          className="flex-1 rounded-full border border-black/10 px-4 py-3 text-center text-sm font-medium text-black"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
