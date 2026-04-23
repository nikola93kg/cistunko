// src/components/sticky-cta.tsx
import { siteConfig } from "@/lib/content";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#3cc0cc]/20 bg-white/95 p-4 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={siteConfig.phoneHref}
          className="flex-1 rounded-[50px] border-2 border-[#3cc0cc] px-4 py-3 text-center text-sm font-semibold text-[#3cc0cc] transition-all hover:-translate-y-0.5"
        >
          Pozovite
        </a>
        <a
          href={siteConfig.whatsAppHref}
          className="flex-1 rounded-[50px] bg-gradient-to-br from-[#a0c850] to-[#7aab28] px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
