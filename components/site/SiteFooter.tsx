import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { ArrowUpRight, Mail, MapPin, Phone, Shield, Zap } from "lucide-react";

const solutions = [
  { href: "/services/b2b-lead-generation", label: "B2B Lead Generation" },
  { href: "/services/cold-calling", label: "Cold Calling" },
  { href: "/services/appointment-setting", label: "Appointment Setting" },
  { href: "/services/sdr-services", label: "SDR as a Service" },
  { href: "/services/email-outreach", label: "Email Outreach" },
  { href: "/services/sales-outsourcing", label: "Sales Outsourcing" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/industries", label: "Industries Served" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Insights & Articles" },
  { href: "/contact", label: "Contact Sales" },
];

export function SiteFooter() {
  return (
    <footer
      className="border-t pt-16 pb-12 relative overflow-hidden"
      style={{
        backgroundColor: "oklch(0.11 0.028 252)",
        borderColor: "oklch(0.22 0.025 252 / 0.6)",
      }}
    >
      {/* Gold glow bleed from bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none blur-[100px]"
        style={{ background: "oklch(0.75 0.15 75 / 0.07)" }}
      />

      <Container size="xl">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b"
          style={{ borderColor: "oklch(0.22 0.025 252 / 0.6)" }}
        >
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: "oklch(0.65 0.018 252)" }}>
              RevGen IQ is a modern B2B revenue-generation agency. We build,
              manage, and scale predictable outbound sales engines for
              fast-growth SaaS, tech, and enterprise services.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  background: "oklch(0.75 0.15 75 / 0.10)",
                  color: "oklch(0.75 0.15 75)",
                  borderColor: "oklch(0.75 0.15 75 / 0.25)",
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                Revenue Pipeline Engine™
              </span>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4
              className="font-semibold text-sm tracking-wider uppercase"
              style={{ color: "oklch(0.96 0.008 90)" }}
            >
              Solutions
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "oklch(0.65 0.018 252)" }}>
              {solutions.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-[oklch(0.75_0.15_75)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4
              className="font-semibold text-sm tracking-wider uppercase"
              style={{ color: "oklch(0.96 0.008 90)" }}
            >
              Company
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "oklch(0.65 0.018 252)" }}>
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-[oklch(0.75_0.15_75)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[oklch(0.75_0.15_75)]"
                >
                  Admin Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4
              className="font-semibold text-sm tracking-wider uppercase"
              style={{ color: "oklch(0.96 0.008 90)" }}
            >
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "oklch(0.65 0.018 252)" }}>
              <li className="flex items-center gap-2.5">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.75 0.15 75)" }}
                />
                <a
                  href="mailto:hello@revgeniq.com"
                  className="hover:text-[oklch(0.75_0.15_75)] transition-colors"
                >
                  hello@revgeniq.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.75 0.15 75)" }}
                />
                <span>+91 9205500230</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.75 0.15 75)" }}
                />
                <span>Sector 62, Noida, Uttar Pradesh, 201301</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
          style={{ color: "oklch(0.50 0.015 252)" }}
        >
          <p>© {new Date().getFullYear()} RevGen IQ Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition-colors hover:text-[oklch(0.75_0.15_75)]">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-[oklch(0.75_0.15_75)]">
              Terms of Service
            </Link>
            <span
              className="flex items-center gap-1"
              style={{ color: "oklch(0.65 0.018 252)" }}
            >
              <Shield className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.15 75)" }} />
              SOC2 Type II Certified
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
