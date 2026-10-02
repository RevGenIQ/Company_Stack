import Link from "next/link";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { INITIAL_INDUSTRIES } from "@/lib/mock-store";
import { constructMetadata } from "@/lib/seo";
import { ChevronRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "B2B Industries Served | RevGen IQ",
  description: "Specialized outbound revenue strategies for SaaS, IT & Technology, FinTech, Healthcare, Manufacturing, and Professional Services.",
  canonicalUrlRelative: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="Targeted Vertical Focus"
            title="Industries We Scale Outbound For"
            description="Our outbound playbooks are customized around the specific buying personas, approval workflows, and compliance requirements of each B2B industry."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {INITIAL_INDUSTRIES.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-4 group glass-panel-hover"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {ind.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{ind.blurb}</p>
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-300 block mb-2">Primary Sales Challenges Solved:</span>
                  <div className="flex flex-wrap gap-2">
                    {ind.challenges.map((c, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-cyan-400 border border-slate-800">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
