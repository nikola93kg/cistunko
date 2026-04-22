import type { Metadata } from "next";

const siteName = "Cistunko";
const baseUrl = "https://cistunko.rs";
const defaultOgImage = "/images/og-default.jpg";

export const siteUrl = new URL(baseUrl);

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

function buildPageTitle(title: string) {
  return title === siteName ? siteName : `${title} | ${siteName}`;
}

function buildAbsoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const fullTitle = buildPageTitle(title);
  const canonicalUrl = buildAbsoluteUrl(path);

  return {
    metadataBase: siteUrl,
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      type: "website",
      images: [{ url: defaultOgImage }],
    },
  };
}
