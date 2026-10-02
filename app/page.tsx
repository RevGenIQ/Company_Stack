import Link from "next/link";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { PipelineVisual } from "@/components/site/PipelineVisual";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { BlogCard } from "@/components/site/BlogCard";
import {
  INITIAL_SERVICES,
  INITIAL_INDUSTRIES,
  INITIAL_CASE_STUDIES,
  INITIAL_BLOG_POSTS,
  INITIAL_TESTIMONIALS,
} from "@/lib/mock-store";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Database,
  Layers,
  LineChart,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-grid-pattern bg-glow-gradient">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] blur-[130px] rounded-full pointer-events-none animate-gold-pulse" style={{ background: "oklch(0.75 0.15 75 / 0.14)" }} />

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner border" style={{ background: "oklch(0.75 0.15 75 / 0.10)", color: "oklch(0.75 0.15 75)", borderColor: "oklch(0.75 0.15 75 / 0.25)" }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen B2B Outbound Revenue Infrastructure</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Predictable B2B Pipeline. <br className="hidden sm:inline" />
                <span className="text-gradient">Qualified Meetings Delivered.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                We engineer research-backed outbound SDR pods, cold calling, and email programs that connect your AEs with high-intent decision makers across target accounts.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/book-a-call" className="w-full sm:w-auto">
                  <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 text-base">
                    Book Outbound Audit
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

                <Link href="/case-studies" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
                    Explore Case Studies
                  </Button>
                </Link>
              </div>

              {/* Key Trust Stats Grid */}
              <div className="pt-8 border-t grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0" style={{ borderColor: "oklch(0.22 0.025 252 / 0.6)" }}>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold block text-gradient-gold">$42M+</span>
                  <span className="text-xs font-medium mt-0.5 block" style={{ color: "oklch(0.60 0.018 252)" }}>Pipeline Created</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold block" style={{ color: "oklch(0.96 0.008 90)" }}>3.4×</span>
                  <span className="text-xs font-medium mt-0.5 block" style={{ color: "oklch(0.60 0.018 252)" }}>Avg Pipeline Lift</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold block text-gradient-gold">87%</span>
                  <span className="text-xs font-medium mt-0.5 block" style={{ color: "oklch(0.60 0.018 252)" }}>Meeting Show-Up</span>
                </div>
              </div>
            </div>

            {/* Right Hero Lead Form Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-3xl blur-xl opacity-70 animate-gold-pulse" style={{ background: "linear-gradient(135deg, oklch(0.75 0.15 75 / 0.25), oklch(0.62 0.14 70 / 0.15))" }} />
              <LeadForm className="relative z-10" />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. TRUST / LOGO BANNER */}
      <section className="py-6 border-y border-slate-800/80 bg-slate-950/50">
        <Container size="xl">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Trusted by Growth Leaders at Mid-Market & Enterprise B2B Firms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            {["Northwind Analytics", "Helix Systems", "Ledgerline FinTech", "Apex Cloud", "CyberShield", "Acme Enterprise"].map((brand, i) => (
              <span key={i} className="text-slate-400 font-bold text-lg tracking-wider hover:text-cyan-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-12">
        <Container size="lg">
          <SectionHeader
            badge="The Outbound Bottleneck"
            title="Why Traditional In-House SDR Teams Struggle to Scale"
            description="High SDR churn, spam filters blocking emails, outdated database lists, and AEs wasting 60% of their time on manual prospecting."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-white">Burnt Domains & Spam Filters</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mass automated email blasts trigger domain blacklists and spam filters, killing deliverability before your buyers even see your message.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-white">Ramp Lag & High SDR Churn</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hiring, training, and equipping junior SDRs takes 4 to 6 months — and average SDR turnover hits 14 months, constantly resetting progress.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-white">Bad Prospect Lists</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Off-the-shelf B2B data providers deliver 25%+ bounce rates and outdated phone numbers, wasting call time on disconnected lines.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800/80">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Zap className="w-3.5 h-3.5" />
                The RevGen IQ Architecture
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                An Executive-Grade Outbound Revenue Engine Built for High-Growth B2B
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                We plug in fully managed outbound SDR pods, custom-researched target account data, deliverability-safe email infrastructure, and senior B2B callers to fill your AEs' calendars with qualified opportunities.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Multi-touch sequences combining email, phone, and LinkedIn",
                  "Human-verified contact data & intent-signal triggers",
                  "Dedicated SDR leadership & quality assurance on every call",
                  "Transparent reporting linked directly to your pipeline KPIs",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline" className="gap-2">
                    Learn How We Operate
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white text-sm">Active Account Campaign</span>
                </div>
                <span className="text-xs text-cyan-400 font-mono">LIVE FEED</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="font-semibold text-white">4,200 ICP Accounts Enriched</p>
                      <p className="text-slate-400 text-[11px]">Firmographics & Verified Emails</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">100% Verified</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="font-semibold text-white">Cold Calling Pod Connected</p>
                      <p className="text-slate-400 text-[11px]">VP of Engineering @ Mid-Market SaaS</p>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-bold">Discovery Booked</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <LineChart className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="font-semibold text-white">Weekly Pipeline Report</p>
                      <p className="text-slate-400 text-[11px]">18 Meetings Booked • $420k Opportunity Value</p>
                    </div>
                  </div>
                  <span className="text-purple-300 font-bold">Synced to CRM</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. SERVICES GRID */}
      <section className="py-12">
        <Container size="xl">
          <SectionHeader
            badge="Full-Funnel Capability"
            title="Outbound Revenue Services Built to Scale"
            description="From lead research to booked discovery calls — select the modular service or end-to-end pod you need."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_SERVICES.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" className="gap-2">
                View All Outbound Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 6. HOW IT WORKS / PIPELINE VISUALIZATION */}
      <section className="py-12">
        <Container size="xl">
          <SectionHeader
            badge="Execution Playbook"
            title="How We Deliver Sales-Ready Meetings"
            description="Our structured 5-phase methodology ensures predictable pipeline velocity with zero ramp friction."
          />
          <PipelineVisual />
        </Container>
      </section>

      {/* 7. WHY REVGEN IQ */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800/80">
        <Container size="xl">
          <SectionHeader
            badge="The RevGen Advantage"
            title="Why Enterprise Revenue Teams Choose RevGen IQ"
            description="We combine data rigor, phone craft, and deliverability infrastructure into a high-performance outbound engine."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">96%+ Deliverability Guarantee</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Dedicated secondary domain infrastructure, SPF/DKIM/DMARC setup, and strict throttled sending schedule.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <Users className="w-8 h-8 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Senior Caller Pods</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                No inexperienced telemarketers. Our callers have deep B2B context, objection handling expertise, and clear talk tracks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Real-Time CRM & Dashboards</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Full visibility into call recordings, prospect responses, qualification notes, and scheduled meeting briefs.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <Target className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Pipeline-Based KPIs</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We measure success on qualified sales-ready opportunities and show-ups — not vanity email opens or clicks.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. INDUSTRIES */}
      <section className="py-12">
        <Container size="xl">
          <SectionHeader
            badge="Industry Expertise"
            title="Tailored Outbound Programs by Industry"
            description="Proven messaging frameworks and account lists built for complex B2B sales cycles."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_INDUSTRIES.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {ind.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{ind.blurb}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {ind.challenges.map((c, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. CASE STUDIES */}
      <section className="py-12 bg-slate-900/30 border-y border-slate-800/80">
        <Container size="xl">
          <SectionHeader
            badge="Proven Outcomes"
            title="Real Client Results & Pipeline Lift"
            description="Explore how RevGen IQ generated millions in outbound opportunity pipeline for fast-growing B2B firms."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </Container>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-12">
        <Container size="lg">
          <SectionHeader
            badge="Client Endorsements"
            title="What Revenue Leaders Say"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
                <div className="pt-4 border-t border-slate-800/80">
                  <p className="text-white font-bold text-sm">{t.author}</p>
                  <p className="text-slate-400 text-xs">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 11. INSIGHTS / BLOG PREVIEW */}
      <section className="py-12 bg-slate-900/30 border-y border-slate-800/80">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">Outbound Intelligence</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Latest B2B Revenue Playbooks</h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_BLOG_POSTS.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-16">
        <Container size="lg">
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Start Building Your Pipeline
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
              Ready to Fill Your Sales Calendar with Qualified Buyers?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Book a 30-minute outbound audit with our lead strategists to get a custom ICP breakdown, list analysis, and projected meeting volume.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/book-a-call">
                <Button variant="glow" size="lg" className="gap-2 text-base">
                  Book Your Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-base">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
