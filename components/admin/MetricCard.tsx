import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtext?: string;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtext,
}: MetricCardProps) {
  return (
    <div
      className="p-6 rounded-2xl space-y-3 backdrop-blur-md shadow-xl border"
      style={{
        background:  "oklch(0.16 0.028 252 / 0.85)",
        borderColor: "oklch(0.22 0.025 252)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.60 0.018 252)" }}
        >
          {title}
        </span>
        {/* Gold icon badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border"
          style={{
            background:  "oklch(0.75 0.15 75 / 0.12)",
            borderColor: "oklch(0.75 0.15 75 / 0.25)",
            color:       "oklch(0.75 0.15 75)",
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: "oklch(0.96 0.008 90)" }}
        >
          {value}
        </span>
        {change && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p
          className="text-xs font-medium"
          style={{ color: "oklch(0.50 0.015 252)" }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
