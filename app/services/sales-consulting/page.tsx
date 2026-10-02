import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { constructMetadata } from "@/lib/seo";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Map,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Sales Consulting | Go-to-Market Strategy & Sales Process Design | RevGen IQ",
  description:
    "RevGen IQ Sales Consulting helps B2B businesses build structured revenue engines. GTM strategy, ICP definition, sales process design, outbound playbooks and CRM architecture.",
  canonicalUrlRelative: "/services/sales-consulting",
});

const services = [
  { icon: Compass,    label: "Go-to-market (GTM) strategy",         desc: "Define your market entry approach, positioning and competitive differentiation." },
  { icon: Target,     label: "Ideal Customer Profile (ICP) definition", desc: "Identify the exact buyer profile that generates the highest-value, longest-retention customers." },
  { icon: Map,        label: "Sales process design",                 desc: "Build a repeatable, documented sales methodology from first touch to close." },
  { icon: TrendingUp, label: "Outbound strategy & playbooks",        desc: "Design cold outreach sequences, messaging frameworks and qualification gates." },
  { icon: Users,      label: "Sales team structure & hiring plan",   desc: "Define SDR/AE ratios, territory design and the right hiring sequence." },
  { icon: BarChart3,  label: "CRM & pipeline architecture",          desc: "Set up stages, deal fields and reporting that reflect how your team actually sells." },
  { icon: Layers,     label: "Lead qualification framework",         desc: "Build BANT, MEDDIC or custom scoring models to separate signal from noise." },
  { icon: BrainCircuit, label: "Revenue strategy & forecasting",     desc: "Create a bottoms-up revenue model with realistic targets and milestone gates." },
];

const process = [
  {
    step: "01",
    title: "Sales Audit",
    body: "We review your current CRM data, sales collateral, ICP clarity, team structure and pipeline health to identify where revenue is leaking.",
  },
  {
    step: "02",
    title: "Diagnosis & Roadmap",
    body: "We present a prioritised diagnosis of your biggest revenue blockers and a 90-day roadmap to fix them.",
  },
  {
    step: "03",
    title: "Strategy Design",
    body: "We co-design your GTM strategy, ICP documentation, sales process and outbound playbook with your leadership team.",
  },
  {
    step: "04",
    title: "Implementation & Enablement",
    body: "We implement the strategy in your tools, train your team and track adoption through your first 60 days of execution.",
  },
];

const deliverables = [
  "Written GTM strategy document",
  "ICP profile with firmographic and psychographic detail",
  "Sales process flowchart and stage documentation",
  "Outbound sequence templates and talk tracks",
  "CRM configuration and pipeline stage definitions",
  "Sales qualification scorecard",
  "90-day revenue roadmap",
  "Optional follow-on advisory retainer",
];

export default function SalesConsultingPage() {
  return (
    <div className="pb-20 overflow-x-hidden">

      {/* ---- Hero ---- */}
      <section className="relative pt-16 lg:pt-24 pb-20 bg-grid-pattern bg-glow-gradient overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] animate-float-slow" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] animate-float-slower" />

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-7 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  Strategic Advisory
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
                Sales Consulting
                <br />
                <span className="text-gradient">From "we need more leads" to "we need a better sales engine."</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                We help businesses assess their go-to-market strategy, improve sales processes and build a more structured approach to revenue generation. Not just more outreach — a better sales engine.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="#consultation-form">
                  <Button variant="glow" size="lg" className="gap-2 group w-full sm:w-auto">
                    Talk to a Sales Strategist
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button variant="outline" size="lg" className="gap-2 group w-full sm:w-auto">
                    View Case Studies
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground/80">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />Structured deliverables</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />Senior strategist led</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />90-day roadmap included</span>
              </div>
            </div>

            {/* Right panel — value snapshot */}
            <div className="space-y-4 animate-fade-in-up animation-delay-200">
              <div className="p-6 rounded-2xl bg-card/80 border border-purple-500/20 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <BrainCircuit className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm">Who this is for</p>
                    <p className="text-muted-foreground/80 text-xs">Revenue leaders at B2B companies who need clarity, not just activity</p>
                  </div>
                </div>
                {[
                  "Revenue or sales leaders who feel stuck on a plateau",
                  "Founders building their first structured sales motion",
                  "Scale-ups entering new markets or segments",
                  "Companies with inconsistent pipeline quality",
                  "Teams where AEs are doing SDR work instead of closing",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-foreground/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-card/80 border border-border text-center">
                  <p className="text-2xl font-extrabold text-purple-400">3.4×</p>
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5">Avg pipeline lift</p>
                </div>
                <div className="p-4 rounded-xl bg-card/80 border border-border text-center">
                  <p className="text-2xl font-extrabold text-purple-400">90 days</p>
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5">To a structured revenue engine</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Scope of Work ---- */}
      <section className="py-20 md:py-28 border-y border-border/80">
        <Container size="xl">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
              <Layers className="w-3.5 h-3.5" />
              Scope of Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Services Included</h2>
            <p className="text-muted-foreground/80 text-base mt-3 max-w-2xl mx-auto">
              Every engagement is scoped to your business. Below is the full menu — we build your custom programme from these components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-card/60 border border-border hover:border-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 shrink-0">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{s.label}</p>
                    <p className="text-muted-foreground/80 text-xs mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---- Process ---- */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Engagement Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">How We Work Together</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div
                key={i}
                className="group relative p-7 rounded-2xl bg-card/60 border border-border hover:border-purple-500/30 transition-all duration-300 space-y-4 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="text-5xl font-black text-slate-800 group-hover:text-purple-900/40 transition-colors leading-none">{p.step}</span>
                <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Deliverables ---- */}
      <section className="py-20 md:py-28 bg-card/40 border-y border-border/80">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Expected Deliverables
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">What You Walk Away With</h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Every RevGen IQ consulting engagement produces tangible, actionable outputs — not slide decks that collect dust. You leave with a clear implementation plan your team can execute immediately.
              </p>
              <div className="space-y-3 pt-2">
                {deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                    <span className="text-foreground/90 text-sm font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-bold text-foreground text-sm">Typical Engagement Overview</span>
              </div>
              {[
                { label: "Discovery call",          duration: "30 minutes", color: "text-purple-400" },
                { label: "Sales audit & diagnosis",  duration: "Week 1–2",   color: "text-blue-400"   },
                { label: "Strategy design sessions", duration: "Week 3–4",   color: "text-amber-400"  },
                { label: "Document delivery",        duration: "Week 5",     color: "text-emerald-400"},
                { label: "Implementation support",   duration: "60 days",    color: "text-purple-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/60 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.duration}</span>
                </div>
              ))}
              <div className="pt-2">
                <Link href="#consultation-form">
                  <Button variant="glow" className="w-full gap-2 group">
                    Talk to a Sales Strategist
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Consultation Form ---- */}
      <section id="consultation-form" className="py-20 md:py-28">
        <Container size="md">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
              <BrainCircuit className="w-3.5 h-3.5" />
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Talk to a Sales Strategist</h2>
            <p className="text-muted-foreground/80 text-base mt-3 max-w-xl mx-auto">
              Tell us about your current sales motion. We will review your situation and respond within one business day with a recommended approach.
            </p>
          </div>

          <LeadForm
            defaultService="sales-consulting"
            title="Request a Sales Consulting Engagement"
            subtitle="Our senior strategists will review your revenue challenge and outline a tailored consulting approach."
          />
        </Container>
      </section>
    </div>
  );
}
