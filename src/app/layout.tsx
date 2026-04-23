import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: "Cistunko",
  description: "Dubinsko pranje za dom i automobil.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={`${inter.variable} h-full antialiased`}>
      <body className="pb-28 md:pb-0" style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#3cc0cc] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Preskoči na sadržaj
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <StickyCta />
      </body>
    </html>
  );
}
