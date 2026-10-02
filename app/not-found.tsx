import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | RevGen IQ",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-grid-pattern"
      style={{ backgroundColor: "oklch(0.12 0.028 252)" }}
    >
      {/* Gold radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "oklch(0.75 0.15 75 / 0.08)" }}
      />

      <Container size="sm">
        <div className="text-center space-y-8 relative">
          {/* 404 number */}
          <div className="space-y-2">
            <span
              className="block text-[8rem] sm:text-[10rem] font-black leading-none tracking-tighter text-gradient-gold"
            >
              404
            </span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold"
              style={{ color: "oklch(0.96 0.008 90)" }}
            >
              Page Not Found
            </h1>
            <p
              className="text-base max-w-sm mx-auto"
              style={{ color: "oklch(0.60 0.018 252)" }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="glow" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
