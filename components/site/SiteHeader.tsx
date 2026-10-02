"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useTheme } from "@/components/site/ThemeProvider";
import {
  Menu, X, ArrowRight, ChevronDown,
  Database, PhoneCall, CalendarCheck, Users, Mail,
  BarChart3, Building2, BookOpen, Info, BrainCircuit,
  TrendingUp,
} from "lucide-react";

/* ---- Navigation Data ---- */
const services = [
  { href: "/services/data-enrichment",      label: "B2B Data Extraction & Intelligence", icon: Database,      desc: "Identify, extract, enrich & validate prospect data" },
  { href: "/services/appointment-setting",  label: "Appointment Setting",                icon: CalendarCheck, desc: "Qualified meetings onto your AEs' calendars" },
  { href: "/services/sales-consulting",     label: "Sales Consulting",                   icon: BrainCircuit,  desc: "GTM strategy, ICP definition & sales process design" },
  { href: "/services/cold-calling",         label: "Cold Calling",                       icon: PhoneCall,     desc: "Trained B2B callers who open real conversations" },
  { href: "/services/sdr-services",         label: "SDR as a Service",                   icon: Users,         desc: "Fully managed, ramped outbound SDR pods" },
  { href: "/services/email-outreach",       label: "Email Outreach",                     icon: Mail,          desc: "Deliverability-first cold email programs" },
];

const solutions = [
  { href: "/services/b2b-lead-generation",  label: "B2B Lead Generation",   icon: TrendingUp,  desc: "End-to-end ICP targeting and qualified lead delivery" },
  { href: "/services/sales-outsourcing",    label: "Sales Outsourcing",      icon: BarChart3,   desc: "Full-funnel outsourced revenue teams" },
];

const topNavLinks = [
  { href: "/industries",   label: "Industries"   },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog",         label: "Insights"     },
  { href: "/about",        label: "About"        },
];

/* ---- Dropdown ---- */
function NavDropdown({
  label,
  items,
  isLight,
}: {
  label: string;
  items: typeof services;
  isLight: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const panelClass = isLight
    ? "bg-white border-slate-200 shadow-xl"
    : "bg-[oklch(0.14_0.028_252/0.98)] border-[oklch(0.22_0.025_252)] shadow-2xl";

  const itemHoverClass = isLight
    ? "hover:bg-slate-50"
    : "hover:bg-[oklch(0.18_0.028_252)]";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          isLight
            ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            : "text-[oklch(0.80_0.012_90)] hover:text-[oklch(0.96_0.008_90)] hover:bg-[oklch(0.20_0.028_252/0.6)]"
        }`}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-2 w-80 rounded-2xl border backdrop-blur-xl p-2 z-50 animate-slide-down ${panelClass}`}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors group ${itemHoverClass}`}
              >
                <div
                  className="p-1.5 rounded-lg shrink-0 mt-0.5"
                  style={{ background: "oklch(0.75 0.15 75 / 0.12)" }}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isLight ? "text-slate-800" : "text-foreground"}`}>
                    {item.label}
                  </p>
                  <p className={`text-xs mt-0.5 leading-snug ${isLight ? "text-muted-foreground/60" : "text-muted-foreground/80"}`}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---- Main Header ---- */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const [mobileSolOpen, setMobileSolOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const headerClass = scrolled
    ? isLight
      ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-md"
      : "bg-[oklch(0.12_0.028_252/0.96)] backdrop-blur-md border-b border-[oklch(0.22_0.025_252/0.8)] py-3 shadow-2xl"
    : `bg-transparent py-4`;

  const navContainerClass = isLight
    ? "bg-slate-100/90 border-slate-200 backdrop-blur-md"
    : "bg-[oklch(0.16_0.028_252/0.7)] border-[oklch(0.22_0.025_252/0.8)] backdrop-blur-md";

  const linkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    if (isLight) {
      return isActive
        ? "px-4 py-2 text-sm font-medium rounded-full text-amber-600 bg-amber-50 shadow-sm"
        : "px-4 py-2 text-sm font-medium rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors";
    }
    return isActive
      ? "px-4 py-2 text-sm font-medium rounded-full text-[oklch(0.75_0.15_75)] bg-[oklch(0.20_0.028_252)] shadow-sm"
      : "px-4 py-2 text-sm font-medium rounded-full text-[oklch(0.80_0.012_90)] hover:text-[oklch(0.96_0.008_90)] hover:bg-[oklch(0.20_0.028_252/0.6)] transition-colors";
  };

  const mobileMenuClass = isLight
    ? "bg-white border-slate-200"
    : "bg-[oklch(0.14_0.028_252/0.98)] border-[oklch(0.22_0.025_252)]";

  const mobileLinkClass = isLight
    ? "px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 rounded-lg transition-colors"
    : "px-4 py-2.5 text-base font-medium text-[oklch(0.88_0.008_90)] hover:text-[oklch(0.75_0.15_75)] hover:bg-[oklch(0.20_0.028_252/0.6)] rounded-lg transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <Container size="xl">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          {/* Desktop Nav */}
          <nav
            className={`hidden md:flex items-center gap-0.5 p-1.5 rounded-full border ${navContainerClass}`}
          >
            <NavDropdown label="Services" items={services} isLight={isLight} />
            <NavDropdown label="Solutions" items={solutions} isLight={isLight} />
            {topNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Theme Toggle + CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Link href="/book-a-call" className="hidden sm:inline-block">
              <Button
                variant="glow"
                size="sm"
                className="gap-2 group text-sm"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg focus:outline-none transition-colors ${
                isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-[oklch(0.65_0.018_252)] hover:text-[oklch(0.96_0.008_90)] hover:bg-[oklch(0.20_0.028_252)]"
              }`}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-3 p-4 rounded-2xl border backdrop-blur-xl flex flex-col gap-1 shadow-2xl animate-slide-down ${mobileMenuClass}`}
          >
            {/* Services accordion */}
            <button
              onClick={() => setMobileServOpen((o) => !o)}
              className={`${mobileLinkClass} flex items-center justify-between w-full`}
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServOpen && (
              <div className="pl-4 space-y-0.5 animate-slide-down">
                {services.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass + " block text-sm"}>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Solutions accordion */}
            <button
              onClick={() => setMobileSolOpen((o) => !o)}
              className={`${mobileLinkClass} flex items-center justify-between w-full`}
            >
              <span>Solutions</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileSolOpen && (
              <div className="pl-4 space-y-0.5 animate-slide-down">
                {solutions.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass + " block text-sm"}>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {topNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass + " block"}
              >
                {link.label}
              </Link>
            ))}

            <div className={`pt-2 border-t mt-1 ${isLight ? "border-slate-200" : "border-[oklch(0.22_0.025_252)]"}`}>
              <Link href="/book-a-call" onClick={() => setMobileMenuOpen(false)} className="w-full block">
                <Button variant="glow" className="w-full gap-2 justify-center">
                  Book a Consultation
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
