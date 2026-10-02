"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/services",     label: "Services"     },
  { href: "/industries",   label: "Industries"   },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog",         label: "Insights"     },
  { href: "/about",        label: "About"        },
  { href: "/contact",      label: "Contact"      },
];

export function SiteHeader() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.12_0.028_252/0.92)] backdrop-blur-md border-b border-[oklch(0.22_0.025_252/0.8)] py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Nav — pill-shaped navy container */}
          <nav className="hidden md:flex items-center gap-1 bg-[oklch(0.16_0.028_252/0.7)] p-1.5 rounded-full border border-[oklch(0.22_0.025_252/0.8)] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-[oklch(0.75_0.15_75)] bg-[oklch(0.20_0.028_252)] shadow-sm"
                      : "text-[oklch(0.80_0.012_90)] hover:text-[oklch(0.96_0.008_90)] hover:bg-[oklch(0.20_0.028_252/0.6)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/book-a-call" className="hidden sm:inline-block">
              <Button variant="glow" size="sm" className="gap-2 group">
                Book a Call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[oklch(0.65_0.018_252)] hover:text-[oklch(0.96_0.008_90)] hover:bg-[oklch(0.20_0.028_252)] focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen
                ? <X    className="w-6 h-6" />
                : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-2xl bg-[oklch(0.14_0.028_252/0.98)] border border-[oklch(0.22_0.025_252)] backdrop-blur-xl flex flex-col gap-2 shadow-2xl animate-fade-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium rounded-lg text-[oklch(0.88_0.008_90)] hover:text-[oklch(0.75_0.15_75)] hover:bg-[oklch(0.20_0.028_252/0.6)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[oklch(0.22_0.025_252)] mt-2">
              <Link
                href="/book-a-call"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block"
              >
                <Button variant="glow" className="w-full gap-2 justify-center">
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
