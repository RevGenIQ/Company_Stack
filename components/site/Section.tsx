import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-foreground md:text-5xl">{title}</h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="bg-hero absolute inset-0" aria-hidden />
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="animate-rise mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] text-foreground md:text-6xl [animation-delay:80ms]">
          {title}
        </h1>
        {lead && (
          <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground [animation-delay:160ms]">
            {lead}
          </p>
        )}
        {children && <div className="animate-rise mt-8 [animation-delay:240ms]">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to build your pipeline?",
  lead = "Book a 30-minute strategy call. We'll map your ICP, audit your outbound and show you what a predictable pipeline looks like.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl border bg-surface-2 p-10 shadow-card md:p-16">
          <div className="bg-hero absolute inset-0 opacity-80" aria-hidden />
          <div className="relative grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">{lead}</p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/book-a-call">
                Book a Strategy Call <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
