import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LeadForm } from "@/components/site/LeadForm";
import { constructMetadata } from "@/lib/seo";
import { ShieldCheck, Target, Users } from "lucide-react";

export const metadata = constructMetadata({
  title: "About RevGen IQ",
  description: "Learn about RevGen IQ's mission, team, research methodology, and outbound revenue infrastructure.",
  canonicalUrlRelative: "/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="About RevGen IQ"
            title="We Engineer High-Yield Outbound Sales Engines"
            description="RevGen IQ was founded to solve a fundamental B2B challenge: building predictable, research-backed outbound pipeline without the overhead and churn of internal SDR teams."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 rounded-2xl bg-card/60 border border-border space-y-4">
              <Target className="w-10 h-10 text-amber-400" />
              <h3 className="text-xl font-bold text-foreground">Precision ICP Target</h3>
              <p className="text-muted-foreground/80 text-sm leading-relaxed">
                We don't rely on broad, unverified list dumps. Every account is researched, filtered by technographics and intent signals, and double-verified.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/60 border border-border space-y-4">
              <Users className="w-10 h-10 text-blue-400" />
              <h3 className="text-xl font-bold text-foreground">Senior Sales Craft</h3>
              <p className="text-muted-foreground/80 text-sm leading-relaxed">
                Our calling pods and SDR leads bring years of commercial B2B experience. They run intelligent conversations rather than reading robotic scripts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/60 border border-border space-y-4">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              <h3 className="text-xl font-bold text-foreground">Infrastructure Health</h3>
              <p className="text-muted-foreground/80 text-sm leading-relaxed">
                We manage domain isolation, email authentication (SPF, DKIM, DMARC), and deliverability monitoring to ensure 96%+ inbox placement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team / Leadership */}
      <section className="py-12">
        <Container size="xl">
          <SectionHeader
            badge="Our Leadership"
            title="Run by Outbound Revenue Veterans"
            description="Our leadership team has scaled sales pipelines for over 120 B2B companies across SaaS, Tech Services, and FinTech."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alexander Vance", role: "Co-Founder & CEO", bio: "Former VP of Sales with 14+ years scaling outbound engines for enterprise software." },
              { name: "Elena Rostova", role: "Head of Operations & Data", bio: "Specialist in B2B data enrichment, deliverability architecture, and intent signal mapping." },
              { name: "Marcus Sterling", role: "Head of SDR Execution", bio: "Managed 50+ SDR pods and conducted over 200,000 B2B calling conversations." }
            ].map((member, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/60 border border-border space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xl flex items-center justify-center border border-amber-500/30">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-amber-400 text-xs font-semibold">{member.role}</p>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form CTA */}
      <section className="py-12">
        <Container size="md">
          <LeadForm title="Partner with RevGen IQ" subtitle="Let's build a dedicated outbound engine for your sales organization." />
        </Container>
      </section>
    </div>
  );
}
