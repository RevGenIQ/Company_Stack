import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LeadForm } from "@/components/site/LeadForm";
import { constructMetadata } from "@/lib/seo";
import { CalendarCheck2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "Book an Outbound Strategy Call | RevGen IQ",
  description: "Schedule a 30-minute discovery call with RevGen IQ growth architects for a custom ICP breakdown and pipeline model.",
  canonicalUrlRelative: "/book-a-call",
});

export default function BookACallPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="Interactive Strategy Session"
            title="Schedule Your 30-Minute Outbound Audit"
            description="We'll review your ICP, current outbound reply rates, target database size, and deliver a custom pipeline forecast."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <CalendarCheck2 className="w-4 h-4" /> What Happens On The Call
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">ICP & Disqualifier Analysis</h4>
                      <p className="text-xs text-slate-400 mt-0.5">We audit your ideal buying committee and set hard exclusion criteria.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Database Verification Sample</h4>
                      <p className="text-xs text-slate-400 mt-0.5">We show live deliverability and phone connect benchmarks for your vertical.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Custom Meeting Projection</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Calculate projected qualified discovery calls land on your AE calendars each month.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <LeadForm title="Reserve Strategy Consultation" subtitle="Select your preferred service interest and company details to confirm your slot." />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
