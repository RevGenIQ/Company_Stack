import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { LeadForm } from "@/components/site/LeadForm";
import { INITIAL_CASE_STUDIES } from "@/lib/mock-store";
import { constructMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft, Building2, Quote } from "lucide-react";

export async function generateStaticParams() {
  return INITIAL_CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = INITIAL_CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return constructMetadata({ title: "Case Study Not Found" });

  return constructMetadata({
    title: `${cs.title} | RevGen IQ Case Study`,
    description: cs.challenge,
    canonicalUrlRelative: `/case-studies/${cs.slug}`,
    ogImage: cs.featured_image,
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = INITIAL_CASE_STUDIES.find((c) => c.slug === slug);

  if (!cs) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Case Studies", item: "/case-studies" },
          { name: cs.client, item: `/case-studies/${cs.slug}` },
        ]}
      />

      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/80 hover:text-amber-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {cs.industry}
                  </span>
                  <span className="text-xs text-muted-foreground/80 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" /> {cs.client}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  {cs.title}
                </h1>
              </div>

              {/* Metrics Grid */}
              {cs.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-card border border-border">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <span className="text-3xl font-extrabold text-amber-400 block">{m.value}</span>
                      <span className="text-xs text-muted-foreground/80 font-medium mt-1 block">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Challenge & Solution */}
              <div className="space-y-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> The Business Challenge
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed p-4 rounded-xl bg-card/60 border border-border">
                    {cs.challenge}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Our Outbound Solution
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed p-4 rounded-xl bg-card/60 border border-border">
                    {cs.solution}
                  </p>
                </div>
              </div>

              {/* Services Deployed */}
              {cs.services && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/80">Services Deployed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cs.services.map((serv, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial Quote */}
              {cs.quote && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-amber-500/30 space-y-3 relative overflow-hidden">
                  <Quote className="w-8 h-8 text-amber-500/40 absolute top-4 right-4" />
                  <p className="text-foreground/90 text-lg italic leading-relaxed">
                    "{cs.quote.text}"
                  </p>
                  <div>
                    <p className="text-foreground font-bold text-sm">{cs.quote.author}</p>
                    <p className="text-amber-400 text-xs">{cs.quote.role}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <LeadForm title="Achieve Similar Outbound Scale" subtitle="Speak with our team to mirror these results for your B2B sales pipeline." />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
