import Link from "next/link";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { PipelineVisual } from "@/components/site/PipelineVisual";
import { PipelineVisualState } from "@/components/site/PipelineVisualState";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { BlogCard } from "@/components/site/BlogCard";
import { ProblemSelector } from "@/components/site/ProblemSelector";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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
  LineChart,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
  Activity,
  Layers,
  BrainCircuit,
  Radar,
  Gauge,
  CircleDollarSign,
  CalendarCheck,
  Headphones,
  Building2,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const logos = ["Northwind", "Helix", "Ledgerline", "Quantra", "Orbitly", "Fieldstone", "Cobalt&Co", "Meridian"];

const stats = [
  { value: "$42M+", label: "Pipeline Created", icon: CircleDollarSign },
  { value: "3.4×", label: "Avg Pipeline Lift", icon: TrendingUp },
  { value: "87%", label: "Meeting Show-Up", icon: CalendarCheck },
  { value: "96%+", label: "Email Deliverability", icon: ShieldCheck },
];

/* Fetch live data from Supabase, fall back to mock data */
async function getHomeData() {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) throw new Error("No client");

    const [
      { data: services },
      { data: industries },
      { data: caseStudies },
      { data: blogPosts },
      { data: testimonials },
    ] = await Promise.all([
      supabase.from("services").select("*").limit(6),
      supabase.from("industries").select("*"),
      supabase.from("case_studies").select("*").eq("status", "published").limit(3),
      supabase.from("blog_posts").select("*, category:blog_categories(id,slug,name)").eq("is_published", true).order("published_at", { ascending: false }).limit(3),
      supabase.from("testimonials").select("*").eq("is_featured", true),
    ]);

    return {
      services: services?.length ? services : INITIAL_SERVICES,
      industries: industries?.length ? industries : INITIAL_INDUSTRIES,
      caseStudies: caseStudies?.length ? caseStudies : INITIAL_CASE_STUDIES,
      blogPosts: blogPosts?.length ? blogPosts : INITIAL_BLOG_POSTS,
      testimonials: testimonials?.length ? testimonials : INITIAL_TESTIMONIALS,
    };
  } catch {
    return {
      services: INITIAL_SERVICES,
      industries: INITIAL_INDUSTRIES,
      caseStudies: INITIAL_CASE_STUDIES,
      blogPosts: INITIAL_BLOG_POSTS,
      testimonials: INITIAL_TESTIMONIALS,
    };
  }
}

export default async function HomePage() {
  const { services, industries, caseStudies, blogPosts, testimonials } = await getHomeData();

  return (
    <div className="pb-20 overflow-x-hidden">

      {/* ================================================================
          1. HERO SECTION
      ================================================================ */}
      <section className="relative pt-10 lg:pt-20 lg:pb-28 overflow-hidden bg-grid-pattern bg-glow-gradient">
        {/* Ambient glow layers */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 78% 35%, rgba(31,68,125,0.28), transparent 38%), radial-gradient(circle at 15% 70%, rgba(15,42,78,0.20), transparent 40%)",
          }}
        />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] animate-float-slow" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[140px] animate-float-slower" aria-hidden="true" />

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left — Hero Copy */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner border animate-fade-in-up"
                style={{ background: "oklch(0.75 0.15 75 / 0.10)", color: "oklch(0.75 0.15 75)", borderColor: "oklch(0.75 0.15 75 / 0.25)" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen B2B Revenue Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-foreground tracking-tight leading-[1.08] animate-fade-in-up animation-delay-100">
                TURN DATA<br className="hidden sm:inline" />
                {" "}<span className="text-gradient">INTO REVENUE.</span>
              </h1>

              {/* What we do — visible in first screen */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                We identify the right prospects, create conversations and help your sales team convert opportunities into revenue.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 animate-fade-in-up animation-delay-300">
                <Link href="/book-a-call" className="w-full sm:w-auto group">
                  <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 text-base relative overflow-hidden px-7">
                    <span className="relative z-10 flex items-center gap-2">
                      Build My Pipeline
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </Button>
                </Link>

                <Link href="/services" className="w-full sm:w-auto group">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
                    Explore Services
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-muted-foreground/80 animate-fade-in-up animation-delay-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No long-term contracts
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Dedicated SDR pod
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Live in 14 days
                </span>
              </div>

              {/* Stats grid */}
              <div
                className="pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-500"
                style={{ borderColor: "oklch(0.22 0.025 252 / 0.6)" }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="group">
                    <stat.icon className="w-4 h-4 text-amber-400/60 mb-1.5 transition-colors group-hover:text-amber-400" />
                    <span className="text-2xl sm:text-3xl font-extrabold block text-gradient-gold">{stat.value}</span>
                    <span className="text-xs font-medium mt-0.5 block" style={{ color: "oklch(0.60 0.018 252)" }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Revenue Intelligence Visual */}
            <div className="lg:col-span-5 relative animate-fade-in-up animation-delay-300">
              <div
                className="absolute -inset-1 rounded-3xl blur-xl opacity-70 animate-gold-pulse"
                style={{ background: "linear-gradient(135deg, oklch(0.75 0.15 75 / 0.25), oklch(0.62 0.14 70 / 0.15))" }}
              />
              <PipelineVisualState />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          2. VERIFIED TRUST INDICATORS — Logo Marquee
      ================================================================ */}
      <section className="border-y bg-surface py-8">
        <div className="container-x flex flex-col items-center gap-6 md:flex-row">
          <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by revenue teams at
          </p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee flex w-max gap-14">
              {[...logos, ...logos].map((l, i) => (
                <span
                  key={i}
                  className="font-display text-xl font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. SERVICES OVERVIEW
      ================================================================ */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <SectionHeader
            badge="Full-Funnel Capability"
            title="Outbound Revenue Services Built to Scale"
            description="From data intelligence to booked discovery calls — select the modular service or end-to-end pod you need."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {(services as any[]).slice(0, 6).map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" className="gap-2 group">
                View All Services
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ================================================================
          4. WHAT ARE YOU TRYING TO SOLVE? — Interactive Problem Selector
      ================================================================ */}
      <section className="py-20 md:py-28 border-y" style={{ borderColor: "oklch(0.22 0.025 252 / 0.5)" }}>
        <Container size="xl">
          <SectionHeader
            badge="What are you trying to solve?"
            title="Choose your primary challenge to find the relevant RevGen IQ service."
            description="Every business has a different bottleneck. Select yours to see exactly how we fix it."
          />
          <ProblemSelector />
        </Container>
      </section>

      {/* ================================================================
          5. HOW OUR PROCESS WORKS — Pipeline Visualization
      ================================================================ */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <SectionHeader
            badge="Execution Playbook"
            title="How We Deliver Sales-Ready Meetings"
            description="Our structured 5-phase methodology ensures predictable pipeline velocity with zero ramp friction."
          />
          <PipelineVisual />
        </Container>
      </section>

      {/* ================================================================
          6. VERIFIED CASE STUDIES & METHODOLOGY
      ================================================================ */}
      <section className="py-20 md:py-28 bg-card/30 border-y border-border/80">
        <Container size="xl">
          <SectionHeader
            badge="Proven Outcomes"
            title="Real Client Results & Pipeline Lift"
            description="Explore how RevGen IQ generated millions in outbound opportunity pipeline for fast-growing B2B firms."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {(caseStudies as any[]).map((cs: any) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <SectionHeader
              badge="Client Endorsements"
              title="What Revenue Leaders Say"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {(testimonials as any[]).map((t: any) => (
                <div
                  key={t.id}
                  className="group p-6 rounded-2xl bg-card/60 border border-border flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-border/80 hover:-translate-y-1"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border/80 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 border border-amber-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-400">{t.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-foreground font-bold text-sm">{t.author}</p>
                      <p className="text-muted-foreground/80 text-xs">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          7. INDUSTRIES SERVED
      ================================================================ */}
      <section className="py-20 md:py-28">
        <Container size="xl">
          <SectionHeader
            badge="Industry Expertise"
            title="Tailored Outbound Programs by Industry"
            description="Proven messaging frameworks and account lists built for complex B2B sales cycles."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {(industries as any[]).map((ind: any) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group relative p-6 rounded-xl bg-card/60 border border-border hover:border-amber-500/40 transition-all duration-300 space-y-3 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/80 border border-border/80/50">
                      <Building2 className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-amber-400 transition-colors duration-300">
                      {ind.name}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/60 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <p className="text-muted-foreground/80 text-xs leading-relaxed relative z-10">{ind.blurb}</p>
                <div className="flex flex-wrap gap-1.5 pt-2 relative z-10">
                  {(ind.challenges as string[]).map((c, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-background text-muted-foreground/80 border border-border group-hover:border-border/80 transition-colors duration-300">
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          8. FINAL CONSULTATION CTA
      ================================================================ */}
      <section className="py-20 md:py-28">
        <Container size="lg">
          <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-8 sm:p-14 text-center space-y-6 overflow-hidden shadow-2xl">
            {/* Animated glow orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none animate-float-slow" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none animate-float-slower" />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Start Building Your Pipeline
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to Fill Your Sales Calendar with Qualified Buyers?
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Book a 30-minute strategy call with our revenue architects to get a custom ICP breakdown, list analysis, and projected meeting volume.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/book-a-call" className="w-full sm:w-auto group">
                  <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2 text-base relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Build My Pipeline
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                    Contact Sales Team
                  </Button>
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400/60" />
                  No commitment required
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400/60" />
                  Talk to a real strategist
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400/60" />
                  Custom playbook included
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          9. INSIGHTS / BLOG PREVIEW
      ================================================================ */}
      <section className="py-16 bg-card/30 border-y border-border/80">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">Outbound Intelligence</span>
              <h2 className="text-3xl font-extrabold text-foreground mt-1">Latest B2B Revenue Playbooks</h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2 group">
                View All Articles
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(blogPosts as any[]).slice(0, 3).map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}