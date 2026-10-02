import Link from "next/link";
import Image from "next/image";
import mark from "@/assets/revgen-mark.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 ${className}`.trim()}
      aria-label="RevGen IQ home"
    >
      <Image
        src={mark}
        alt="RevGen IQ Logo"
        className="h-6 w-auto"
        priority
      />
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        RevGen <span className="font-light text-muted-foreground">|</span>{" "}
        <span className="font-light">IQ</span>
      </span>
    </Link>
  );
}