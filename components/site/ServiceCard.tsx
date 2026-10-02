import Link from "next/link";
import { ServiceItem } from "@/types/database";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Card className="group glass-panel glass-panel-hover flex flex-col justify-between h-full">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-center justify-between">
          {/* Gold icon badge */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-sm border"
            style={{
              background:  "oklch(0.75 0.15 75 / 0.12)",
              borderColor: "oklch(0.75 0.15 75 / 0.25)",
              color:       "oklch(0.75 0.15 75)",
            }}
          >
            R
          </div>
          {service.metric && (
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border"
              style={{
                color:       "oklch(0.75 0.15 75)",
                background:  "oklch(0.75 0.15 75 / 0.10)",
                borderColor: "oklch(0.75 0.15 75 / 0.25)",
              }}
            >
              <TrendingUp className="w-3 h-3" />
              {service.metric.value}
            </span>
          )}
        </div>
        <CardTitle
          className="text-xl transition-colors"
          style={{ color: "oklch(0.96 0.008 90)" }}
        >
          <span className="group-hover:text-gradient-gold">{service.name}</span>
        </CardTitle>
        <CardDescription
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "oklch(0.60 0.018 252)" }}
        >
          {service.short_description || service.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-2">
        <h4
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "oklch(0.55 0.015 252)" }}
        >
          Core Deliverables:
        </h4>
        <ul className="space-y-2 text-xs" style={{ color: "oklch(0.80 0.012 90)" }}>
          {service.outcomes?.slice(0, 3).map((outcome, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle2
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: "oklch(0.75 0.15 75)" }}
              />
              <span className="line-clamp-1">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter
        className="pt-4 border-t"
        style={{ borderColor: "oklch(0.22 0.025 252 / 0.6)" }}
      >
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold w-full justify-between transition-colors"
          style={{ color: "oklch(0.75 0.15 75)" }}
        >
          <span>Explore Service Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
