import Link from "next/link";
import { CaseStudyItem } from "@/types/database";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Building2, Quote } from "lucide-react";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudyItem }) {
  return (
    <Card className="group glass-panel glass-panel-hover flex flex-col justify-between h-full overflow-hidden">
      {/* Hero image */}
      <div
        className="relative h-48 w-full overflow-hidden"
        style={{ backgroundColor: "oklch(0.11 0.028 252)" }}
      >
        {caseStudy.featured_image ? (
          <img
            src={caseStudy.featured_image}
            alt={caseStudy.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-6 text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.14 0.028 252), oklch(0.11 0.028 252))" }}
          >
            <span className="text-xl font-bold" style={{ color: "oklch(0.30 0.020 252)" }}>
              {caseStudy.client}
            </span>
          </div>
        )}
        {/* Gradient scrim */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, oklch(0.12 0.028 252), oklch(0.12 0.028 252 / 0.3), transparent)" }}
        />
        {/* Industry badge — gold */}
        <div className="absolute top-4 left-4">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border"
            style={{
              background:  "oklch(0.75 0.15 75 / 0.15)",
              color:       "oklch(0.90 0.12 82)",
              borderColor: "oklch(0.75 0.15 75 / 0.40)",
            }}
          >
            {caseStudy.industry}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-2 pt-4">
        <div
          className="flex items-center gap-2 text-xs font-medium"
          style={{ color: "oklch(0.60 0.018 252)" }}
        >
          <Building2 className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.15 75)" }} />
          <span>{caseStudy.client}</span>
        </div>
        <CardTitle
          className="text-lg transition-colors line-clamp-2"
          style={{ color: "oklch(0.96 0.008 90)" }}
        >
          {caseStudy.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metrics grid */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div
            className="grid grid-cols-2 gap-2 p-3 rounded-lg border"
            style={{
              background:  "oklch(0.11 0.028 252 / 0.7)",
              borderColor: "oklch(0.20 0.025 252)",
            }}
          >
            {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx}>
                <span
                  className="text-lg font-extrabold block text-gradient-gold"
                >
                  {metric.value}
                </span>
                <span
                  className="text-[11px] block line-clamp-1"
                  style={{ color: "oklch(0.55 0.015 252)" }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {caseStudy.quote && (
          <p
            className="text-xs italic line-clamp-2 flex items-start gap-1.5"
            style={{ color: "oklch(0.60 0.018 252)" }}
          >
            <Quote
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: "oklch(0.75 0.15 75)" }}
            />
            &ldquo;{caseStudy.quote.text}&rdquo;
          </p>
        )}
      </CardContent>

      <CardFooter
        className="pt-4 border-t"
        style={{ borderColor: "oklch(0.22 0.025 252 / 0.6)" }}
      >
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold w-full justify-between transition-colors hover:text-[oklch(0.88_0.12_80)]"
          style={{ color: "oklch(0.75 0.15 75)" }}
        >
          <span>Read Full Case Study</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
