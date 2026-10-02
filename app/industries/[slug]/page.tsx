import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { LeadForm } from "@/components/site/LeadForm";
import { INITIAL_INDUSTRIES, INITIAL_CASE_STUDIES } from "@/lib/mock-store";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { constructMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft, CheckCircle2, ShieldCheck, Target } from "lucide-react";

export async function generateStaticParams() {
  return INITIAL_INDUSTRIES.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = INITIAL_INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return constructMetadata({ title: "Industry Not Found" });

  return constructMetadata({
    title: `Outbound Strategy for ${industry.name} | RevGen IQ`,
    description: industry.blurb,
    canonicalUrlRelative: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = INITIAL_INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const relatedCaseStudies = INITIAL_CASE_STUDIES.filter(
    (cs) => cs.industry.toLowerCase() === industry.name.toLowerCase() || cs.industry.toLowerCase().includes(industry.slug)
  );

  return (
    <div className="space-y-16 pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Industries", item: "/industries" },
          { name: industry.name, item: `/industries/${industry.slug}` },
        ]}
      />

      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <Link href="/industries" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to All Industries
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Target className="w-3.5 h-3.5" /> Vertical Focus
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Outbound Pipeline Engine for {industry.name}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                {industry.blurb}
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white">Specific Market Challenges Solved</h3>
                <div className="space-y-2">
                  {industry.challenges.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-sm font-medium text-slate-200">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {relatedCaseStudies.length > 0 && (
                <div className="pt-8 space-y-4">
                  <h3 className="text-xl font-bold text-white">Featured Case Studies in {industry.name}</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {relatedCaseStudies.map((cs) => (
                      <CaseStudyCard key={cs.id} caseStudy={cs} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <LeadForm title={`Schedule a ${industry.name} Strategy Audit`} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
