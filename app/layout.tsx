import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import { constructMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ThemeProvider } from "@/components/site/ThemeProvider";
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
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('revgeniq-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  var html = document.documentElement;
                  if (theme === 'light') {
                    html.classList.add('light');
                    html.classList.remove('dark');
                  } else {
                    html.classList.add('dark');
                    html.classList.remove('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1 pt-20">{children}</main>
          <SiteFooter />
          <Toaster position="bottom-right" theme="dark" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
