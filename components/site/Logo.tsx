"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/site/ThemeProvider";
import markDark from "@/assets/revgen-mark.png";

export function Logo({ className = "" }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`.trim()}
      aria-label="RevGen IQ home"
    >
      {theme === "light" ? (
        /* Light theme: use dark SVG version */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/darkrevgen-mark.svg"
          alt="RevGen IQ Logo"
          className="h-7 w-auto"
          style={{ height: "28px" }}
        />
      ) : (
        <Image
          src={markDark}
          alt="RevGen IQ Logo"
          className="h-7 w-auto"
          height={28}
          priority
        />
      )}
      <span
        className={`font-display text-lg font-semibold tracking-tight transition-colors ${
          theme === "light" ? "text-[oklch(0.11_0.028_252)]" : "text-foreground"
        }`}
      >
        RevGen{" "}
        <span className={theme === "light" ? "text-[oklch(0.45_0.025_252)] font-light" : "font-light text-muted-foreground"}>|</span>{" "}
        <span className="font-light">IQ</span>
      </span>
    </Link>
  );
}