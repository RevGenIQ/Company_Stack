import Link from "next/link";

/**
 * RevGen IQ — Brand Logotype
 * Mark: stylised "R" diamond in gold gradient
 * Wordmark: RevGen in ivory, "IQ" in gold
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight group ${className}`}
      aria-label="RevGen IQ — Home"
    >
      {/* Brand mark: gold diamond with "R" */}
      <div
        className="relative w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Outer gold gradient diamond */}
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGold" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="oklch(0.90 0.12 82)" />
              <stop offset="100%" stopColor="oklch(0.62 0.14 70)" />
            </linearGradient>
            <linearGradient id="logoGoldText" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="oklch(0.92 0.11 83)" />
              <stop offset="100%" stopColor="oklch(0.72 0.16 73)" />
            </linearGradient>
          </defs>
          {/* Gold rounded-square background */}
          <rect x="1" y="1" width="34" height="34" rx="8" fill="url(#logoGold)" />
          {/* Dark navy inner bg for depth */}
          <rect x="2.5" y="2.5" width="31" height="31" rx="6.5" fill="oklch(0.12 0.028 252)" />
          {/* "R" letterform in gold */}
          <text
            x="18"
            y="25"
            textAnchor="middle"
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            fill="url(#logoGoldText)"
          >
            R
          </text>
        </svg>
      </div>

      {/* Wordmark */}
      <span className="flex items-baseline gap-0.5">
        <span className="text-ivory font-extrabold tracking-tight" style={{ color: "oklch(0.96 0.008 90)" }}>
          RevGen
        </span>
        <span className="text-gradient-gold font-black tracking-widest">IQ</span>
      </span>
    </Link>
  );
}
