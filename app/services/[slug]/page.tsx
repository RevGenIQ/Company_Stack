import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LeadForm } from "@/components/site/LeadForm";
import { INITIAL_SERVICES } from "@/lib/mock-store";
import { constructMetadata } from "@/lib/seo";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArrowLeft, CheckCircle2, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return INITIAL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);
  if (!service) return constructMetadata({ title: "Service Not Found" });

  return constructMetadata({
    title: `${service.name} | RevGen IQ Services`,
    description: service.short_description || service.summary,
    canonicalUrlRelative: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-20">
      <ServiceJsonLd name={service.name} description={service.summary} url={`https://revgeniq.com/services/${service.slug}`} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: service.name, item: `/services/${service.slug}` },
        ]}
      />

      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Zap className="w-3.5 h-3.5" /> Outbound Service Architecture
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {service.name}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed">
                {service.summary}
              </p>

              {service.metric && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white block">{service.metric.value}</span>
                    <span className="text-xs text-slate-400 font-medium">{service.metric.label}</span>
                  </div>
                </div>
              )}

              {/* Outcomes */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-lg font-bold text-white">Expected Outcomes & Deliverables</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-xs font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Steps */}
              {service.process && service.process.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-lg font-bold text-white">Execution Process</h3>
                  <div className="space-y-3">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-4">
                        <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/30">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{step.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <LeadForm defaultService={service.slug} title={`Get Started with ${service.name}`} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
