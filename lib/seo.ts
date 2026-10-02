import { Metadata } from "next";

export const SITE_NAME = "RevGen IQ";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://revgeniq.com";
export const DEFAULT_DESCRIPTION =
  "RevGen IQ is a premium B2B revenue-generation agency providing outbound lead generation, cold calling, appointment setting, SDR pods, prospect research and sales outsourcing.";

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrlRelative?: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrlRelative = "",
  ogImage = "/images/og-default.jpg",
  noIndex = false,
  type = "website",
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium B2B Revenue Generation & SDR Services`;
  const canonicalUrl = `${SITE_URL}${canonicalUrlRelative}`;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteOgImage],
      creator: "@revgeniq",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
