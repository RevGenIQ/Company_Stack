import { BlogPost, CaseStudyItem, IndustryItem, Lead, ServiceItem, TestimonialItem } from "@/types/database";

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    slug: "b2b-lead-generation",
    name: "B2B Lead Generation",
    short_description: "Researched, verified prospects matched to your ICP — delivered into your pipeline every week.",
    summary: "We map your ideal customer profile, build target account lists, and run multi-channel outreach until qualified buyers raise their hand.",
    outcomes: ["ICP & persona definition", "Verified contact data", "Multi-touch sequences", "Weekly qualified lead delivery"],
    process: [
      { title: "Define", body: "Workshop your ICP, buying committee and disqualifiers." },
      { title: "Build", body: "Research accounts and verify decision-maker contacts." },
      { title: "Engage", body: "Run coordinated email, phone and LinkedIn touches." },
      { title: "Deliver", body: "Hand over sales-ready leads with full context." },
    ],
    metric: { value: "3.4×", label: "avg. pipeline lift in 90 days" },
  },
  {
    id: "serv-2",
    slug: "cold-calling",
    name: "Cold Calling",
    short_description: "Trained callers who open conversations with decision makers — not scripts that get hung up on.",
    summary: "Experienced B2B callers run research-backed conversations, handle objections and qualify interest live on the phone.",
    outcomes: ["Dedicated calling pods", "Call recordings & notes", "Live objection handling", "Real-time CRM logging"],
    process: [
      { title: "Prepare", body: "Talk tracks built around your value proposition." },
      { title: "Dial", body: "Focused calling blocks against verified numbers." },
      { title: "Qualify", body: "BANT-style qualification on every connect." },
      { title: "Report", body: "Daily dashboards on connects and conversations." },
    ],
    metric: { value: "18%", label: "avg. connect-to-conversation rate" },
  },
  {
    id: "serv-3",
    slug: "appointment-setting",
    name: "Appointment Setting",
    short_description: "Qualified meetings booked straight onto your AEs' calendars, with briefs attached.",
    summary: "We nurture interest into confirmed discovery calls — confirmed, reminded and briefed so your team shows up ready.",
    outcomes: ["Calendar integration", "Pre-meeting briefs", "Reminder & no-show recovery", "Meeting quality scoring"],
    process: [
      { title: "Qualify", body: "Confirm fit, need and timing before booking." },
      { title: "Book", body: "Schedule directly into your reps' calendars." },
      { title: "Brief", body: "Send context on the account and stakeholder." },
      { title: "Confirm", body: "Reminders reduce no-shows and reschedules." },
    ],
    metric: { value: "87%", label: "meeting show-up rate" },
  },
  {
    id: "serv-4",
    slug: "sdr-services",
    name: "SDR as a Service",
    short_description: "A fully managed outbound SDR team — hired, trained and run by us, measured on your pipeline.",
    summary: "Skip six months of hiring and ramping. Plug in a managed SDR pod with leadership, tooling and reporting included.",
    outcomes: ["Managed SDR pods", "Sales leadership oversight", "Tooling included", "Pipeline-based KPIs"],
    process: [
      { title: "Staff", body: "Assign SDRs matched to your market." },
      { title: "Ramp", body: "Two-week onboarding on product and ICP." },
      { title: "Run", body: "Daily outbound execution with QA." },
      { title: "Scale", body: "Add capacity as pipeline targets grow." },
    ],
    metric: { value: "2 wks", label: "to a fully ramped team" },
  },
  {
    id: "serv-5",
    slug: "data-enrichment",
    name: "B2B Data Extraction & Intelligence",
    short_description: "Identify, extract, enrich and validate the business data your sales team needs to reach the right companies and decision-makers.",
    summary: "We build precise, verified prospect intelligence covering company firmographics, decision-maker contacts, technology stacks, buying signals and market research — so your team reaches the right people with the right message.",
    outcomes: ["Decision-maker contact data", "Company & technographic intelligence", "Intent signal monitoring", "CRM data cleanup & enrichment", "Market & account research"],
    process: [
      { title: "Scope", body: "Define your ICP filters, target verticals and required data fields." },
      { title: "Extract", body: "Blend premium databases with manual research for precise targeting." },
      { title: "Verify", body: "Multi-step human and automated validation of every contact." },
      { title: "Sync", body: "Push clean, enriched records directly into your CRM." },
    ],
    metric: { value: "96%", label: "email deliverability guaranteed" },
  },
  {
    id: "serv-6",
    slug: "email-outreach",
    name: "Email Outreach",
    short_description: "Deliverability-first cold email programs that land in inboxes and start real conversations.",
    summary: "Infrastructure, copy and sequencing handled end to end — with domain health monitoring and reply management.",
    outcomes: ["Domain & inbox setup", "Personalised copywriting", "A/B tested sequences", "Reply handling"],
    process: [
      { title: "Infrastructure", body: "Warm domains and protect sender reputation." },
      { title: "Copy", body: "Write relevant, personalised sequences." },
      { title: "Send", body: "Throttled, monitored sending at scale." },
      { title: "Respond", body: "Manage replies and route hot leads fast." },
    ],
    metric: { value: "11%", label: "avg. positive reply rate" },
  },
  {
    id: "serv-7",
    slug: "sales-outsourcing",
    name: "Sales Outsourcing",
    short_description: "End-to-end outsourced revenue teams — from first touch to closed-won.",
    summary: "For companies entering new markets or scaling fast: we operate the full outbound motion as an extension of your team.",
    outcomes: ["Full-funnel coverage", "Market entry programs", "Revenue playbooks", "Executive reporting"],
    process: [
      { title: "Plan", body: "Market, message and motion strategy." },
      { title: "Launch", body: "Deploy the team, tooling and data." },
      { title: "Operate", body: "Run and optimise the revenue engine." },
      { title: "Transfer", body: "Optional handover to your in-house team." },
    ],
    metric: { value: "$42M", label: "pipeline generated for clients" },
  },
  {
    id: "serv-8",
    slug: "sales-consulting",
    name: "Sales Consulting",
    short_description: "From 'we need more leads' to 'we need a better sales engine.' Strategic advisory for revenue-focused leadership teams.",
    summary: "We help businesses assess their go-to-market strategy, improve sales processes and build a more structured approach to revenue generation. Not just more outreach — a better sales engine.",
    outcomes: ["Go-to-market (GTM) strategy", "Ideal Customer Profile (ICP) definition", "Sales process design", "Outbound strategy & playbooks", "CRM & pipeline architecture", "Sales team structure & hiring plan", "Lead qualification framework", "Revenue strategy & forecasting"],
    process: [
      { title: "Audit", body: "Assess current sales motion, ICP clarity, CRM hygiene and pipeline health." },
      { title: "Diagnose", body: "Identify the root causes of revenue leakage and pipeline gaps." },
      { title: "Design", body: "Build a structured GTM strategy, outbound playbook and qualification framework." },
      { title: "Enable", body: "Implement, train and optimise the new sales engine with your team." },
    ],
    metric: { value: "3.4×", label: "avg. pipeline lift after GTM realignment" },
  }
];

export const INITIAL_INDUSTRIES: IndustryItem[] = [
  { id: "ind-1", slug: "saas", name: "SaaS", blurb: "Book demos with product, ops and revenue leaders across mid-market and enterprise.", challenges: ["Long buying committees", "Crowded categories", "Trial-to-sales handoff"] },
  { id: "ind-2", slug: "technology", name: "IT & Technology", blurb: "Reach CIOs, IT directors and engineering heads for services and infrastructure.", challenges: ["Technical buyers", "Gatekept inboxes", "Complex solutions"] },
  { id: "ind-3", slug: "professional-services", name: "Professional Services", blurb: "Fill partner calendars for consulting, legal, accounting and advisory firms.", challenges: ["Relationship-driven sales", "Referral dependency", "Niche targeting"] },
  { id: "ind-4", slug: "healthcare", name: "Healthcare", blurb: "Compliant outreach to providers, payers and health-tech decision makers.", challenges: ["Regulation", "Hard-to-reach clinicians", "Long cycles"] },
  { id: "ind-5", slug: "fintech", name: "FinTech", blurb: "Engage CFOs, finance ops and banking leaders with credible, compliant messaging.", challenges: ["Trust barriers", "Compliance review", "Multiple stakeholders"] },
  { id: "ind-6", slug: "manufacturing", name: "Manufacturing", blurb: "Connect with plant, procurement and operations leaders across industrial markets.", challenges: ["Offline buyers", "Distributor channels", "Account-based deals"] }
];

export const INITIAL_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "cs-1",
    slug: "saas-platform-pipeline-3x",
    client: "Northwind Analytics",
    industry: "SaaS",
    title: "Tripling qualified pipeline for a mid-market analytics platform",
    challenge: "An in-house SDR team was burning through generic lists and booking meetings that rarely converted into opportunities.",
    solution: "We rebuilt the ICP, sourced 4,200 verified contacts and ran a coordinated email + calling program with tight qualification criteria.",
    services: ["B2B Lead Generation", "Cold Calling", "Appointment Setting"],
    metrics: [
      { value: "3.1×", label: "qualified pipeline" },
      { value: "142", label: "meetings in 6 months" },
      { value: "$2.8M", label: "pipeline created" },
    ],
    quote: { text: "RevGen IQ felt like an extension of our revenue team, not a vendor.", author: "Head of Sales", role: "Northwind Analytics" },
    status: "published",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "cs-2",
    slug: "it-services-market-entry",
    client: "Helix Systems",
    industry: "IT & Technology",
    title: "Launching a managed IT provider into the US mid-market",
    challenge: "No brand awareness or local contacts in a new geography, with an aggressive first-year revenue target.",
    solution: "A dedicated SDR pod, custom account research and a market-entry messaging playbook built from scratch.",
    services: ["SDR as a Service", "Data & List Building"],
    metrics: [
      { value: "64", label: "enterprise meetings" },
      { value: "9", label: "new logos in year one" },
      { value: "21 days", label: "to first booked meeting" },
    ],
    quote: { text: "They opened doors we couldn't have reached on our own.", author: "Managing Director", role: "Helix Systems" },
    status: "published",
    featured_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "cs-3",
    slug: "fintech-cfo-outreach",
    client: "Ledgerline",
    industry: "FinTech",
    title: "Reaching finance leaders with a compliant, high-trust outbound motion",
    challenge: "CFO audiences were ignoring generic outreach and compliance slowed every campaign change.",
    solution: "Deliverability-first email infrastructure, pre-approved messaging frameworks and senior callers for follow-up.",
    services: ["Email Outreach", "Cold Calling"],
    metrics: [
      { value: "12.4%", label: "positive reply rate" },
      { value: "88%", label: "meeting show-up" },
      { value: "4.2×", label: "ROI on program spend" },
    ],
    quote: { text: "Finally an outbound partner who understood finance buyers.", author: "VP Growth", role: "Ledgerline" },
    status: "published",
    featured_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "outbound-is-not-dead",
    title: "Outbound isn't dead. Lazy outbound is.",
    excerpt: "Why research-led, multi-channel outbound still outperforms every other B2B acquisition channel — when it's done right.",
    content: `
      <p>Every few months someone declares outbound dead. Meanwhile, the best B2B companies keep building predictable pipeline with it. The difference isn't the channel — it's the craft.</p>
      <h3>Volume was never the strategy</h3>
      <p>Blasting thousands of generic emails stopped working years ago. What works is relevance: the right account, the right person, the right reason to talk now.</p>
      <h3>Research is the multiplier</h3>
      <p>Teams that invest in account research see reply rates two to four times higher. A single relevant trigger — a hire, a funding round, a tech change — beats any clever subject line.</p>
      <h3>Multi-channel beats single-channel</h3>
      <p>Email, phone and LinkedIn work best together. Each touch makes the next one more recognisable, and buyers respond on the channel they prefer.</p>
    `,
    category_id: "cat-1",
    category: { id: "cat-1", slug: "strategy", name: "Strategy" },
    author_name: "RevGen IQ Team",
    published_at: "2026-09-18T10:00:00Z",
    reading_time_minutes: 7,
    is_featured: true,
    is_published: true,
    featured_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    seo_title: "Outbound Strategy in 2026 | RevGen IQ Insights",
    seo_description: "Discover why research-led B2B outbound lead generation continues to drive massive pipeline growth."
  },
  {
    id: "post-2",
    slug: "icp-workshop-guide",
    title: "The 90-minute ICP workshop that fixes your pipeline",
    excerpt: "A practical framework to define who you should — and shouldn't — be selling to.",
    content: `
      <p>Most pipeline problems are ICP problems in disguise. Here's the workshop framework we run with every new client.</p>
      <h3>Start with your best customers</h3>
      <p>List your ten best accounts by revenue, retention and ease of sale. Look for the patterns before you look at the broad market.</p>
      <h3>Define disqualifiers</h3>
      <p>Knowing who NOT to target saves more time than any intelligence tool. Write down the traits that predict churn or stalled deals.</p>
    `,
    category_id: "cat-2",
    category: { id: "cat-2", slug: "playbooks", name: "Playbooks" },
    author_name: "RevGen IQ Team",
    published_at: "2026-09-04T10:00:00Z",
    reading_time_minutes: 6,
    is_featured: false,
    is_published: true,
    featured_image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "post-3",
    slug: "cold-calling-openers",
    title: "Seven cold-call openers that earn the next 30 seconds",
    excerpt: "Tested openers from thousands of B2B calls — and why they work.",
    content: `
      <p>The first ten seconds of a cold call decide everything. These openers are built on permission, relevance and honesty.</p>
      <h3>Lead with the reason</h3>
      <p>Tell them why you're calling them specifically. Relevance buys attention faster than charm.</p>
    `,
    category_id: "cat-3",
    category: { id: "cat-3", slug: "cold-calling", name: "Cold Calling" },
    author_name: "RevGen IQ Team",
    published_at: "2026-08-21T10:00:00Z",
    reading_time_minutes: 5,
    is_featured: false,
    is_published: true,
    featured_image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  { id: "test-1", text: "Within one quarter our AEs stopped prospecting and started closing. The meetings were genuinely qualified.", author: "Chief Revenue Officer", role: "CRO", company: "B2B SaaS, 200 employees", is_featured: true },
  { id: "test-2", text: "Transparent reporting, sharp callers and a team that actually cares about pipeline quality.", author: "Founder & CEO", role: "CEO", company: "IT Services firm", is_featured: true },
  { id: "test-3", text: "The data quality alone was worth it. Our bounce rate went from 14% to under 3%.", author: "Head of Growth", role: "Head of Growth", company: "FinTech scale-up", is_featured: true }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-101",
    full_name: "Sarah Jenkins",
    company: "Acme Cloud Solutions",
    business_email: "s.jenkins@acmecloud.com",
    phone: "+1 415 555 0192",
    website: "acmecloud.com",
    service_interest: "sdr-services",
    company_size: "50-200",
    message: "Looking to launch an outbound SDR pod for our enterprise analytics tool in Q4.",
    consent: true,
    status: "QUALIFIED",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "b2b_sdr_q3",
    landing_page: "/services/sdr-services",
    created_at: "2026-09-28T14:32:00Z",
    updated_at: "2026-09-29T10:15:00Z"
  },
  {
    id: "lead-102",
    full_name: "Marcus Vance",
    company: "Vance Logistics",
    business_email: "marcus@vancelogistics.io",
    phone: "+1 212 555 0843",
    website: "vancelogistics.io",
    service_interest: "b2b-lead-generation",
    company_size: "10-50",
    message: "Need 200 verified logistics directors contacts per month with verified phone numbers.",
    consent: true,
    status: "NEW",
    utm_source: "linkedin",
    utm_medium: "social",
    utm_campaign: "leadgen_whitepaper",
    landing_page: "/book-a-call",
    created_at: "2026-10-01T09:12:00Z",
    updated_at: "2026-10-01T09:12:00Z"
  },
  {
    id: "lead-103",
    full_name: "Elena Rostova",
    company: "CyberShield Security",
    business_email: "elena@cybershield.net",
    phone: "+1 312 555 9921",
    website: "cybershield.net",
    service_interest: "cold-calling",
    company_size: "200-500",
    message: "Need experienced callers for CISOs in healthcare IT.",
    consent: true,
    status: "MEETING_BOOKED",
    utm_source: "direct",
    landing_page: "/contact",
    created_at: "2026-09-25T11:45:00Z",
    updated_at: "2026-09-26T16:00:00Z"
  }
];
