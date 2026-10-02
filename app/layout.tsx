import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import { constructMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="antialiased min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.12 0.028 252)", color: "oklch(0.96 0.008 90)" }}>
        <SiteHeader />
        <main className="flex-1 pt-24">{children}</main>
        <SiteFooter />
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
