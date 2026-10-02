"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, CalendarCheck, BrainCircuit, CheckCircle2, ChevronRight } from "lucide-react";

const problems = [
  {
    id: "data",
    icon: Database,
    color: "amber",
    challenge: "I need better prospect data",
    service: "B2B Data Extraction & Intelligence",
    href: "/services/data-enrichment",
    body: "Your team can't close deals with bad or incomplete prospect lists. We identify, extract, enrich and verify the business data your sales team needs.",
    solution: "Human-verified contacts, firmographics, intent signals & CRM sync",
  },
  {
    id: "meetings",
    icon: CalendarCheck,
    color: "blue",
    challenge: "I need more qualified meetings",
    service: "Appointment Setting",
    href: "/services/appointment-setting",
    body: "Calendars fill up with calls that never convert. We qualify every prospect before booking so your AEs only talk to real opportunities.",
    solution: "BANT-qualified meetings, pre-meeting briefs & 87% show-up rate",
  },
  {
    id: "sales",
    icon: BrainCircuit,
    color: "purple",
    challenge: "I need help improving sales",
    service: "Sales Consulting",
    href: "/services/sales-consulting",
    body: "More leads won't help if the sales process is broken. We assess your go-to-market strategy and build a structured approach to revenue generation.",
    solution: "GTM strategy, ICP definition, sales process design & outbound playbooks",
  },
];

const colorMap: Record<string, { ring: string; icon: string; badge: string; bg: string; bar: string }> = {
  amber: {
    ring:  "border-amber-500/60 shadow-amber-500/10",
    icon:  "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    bg:    "bg-amber-500/5",
    bar:   "from-amber-400 to-amber-600",
  },
  blue: {
    ring:  "border-blue-500/60 shadow-blue-500/10",
    icon:  "text-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    bg:    "bg-blue-500/5",
    bar:   "from-blue-400 to-blue-600",
  },
  purple: {
    ring:  "border-purple-500/60 shadow-purple-500/10",
    icon:  "text-purple-400",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    bg:    "bg-purple-500/5",
    bar:   "from-purple-400 to-purple-600",
  },
};

export function ProblemSelector() {
  const [selected, setSelected] = useState<string>("data");

  const active = problems.find((p) => p.id === selected)!;
  const colors = colorMap[active.color];

  return (
    <div className="mt-14 space-y-8">
      {/* Selector tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {problems.map((p) => {
          const Icon = p.icon;
          const isActive = selected === p.id;
          const c = colorMap[p.color];
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`relative group flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? `${c.ring} ${c.bg} shadow-xl border-2`
                  : "border-border bg-card/50 hover:border-border/80 hover:bg-card/80"
              }`}
              aria-pressed={isActive}
            >
              {/* Animated bottom bar */}
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${c.bar} transition-all duration-500 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
              <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 transition-colors ${isActive ? c.badge.split(" ")[0] : "bg-secondary"} border ${isActive ? c.badge.split(" ")[2] : "border-border/80"}`}>
                <Icon className={`w-5 h-5 ${isActive ? c.icon : "text-muted-foreground/80"}`} />
              </div>
              <div>
                <p className={`text-sm font-semibold transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {p.challenge}
                </p>
                <p className={`text-xs mt-1 font-medium transition-colors ${isActive ? c.icon : "text-muted-foreground/60"}`}>
                  → {p.service}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        key={active.id}
        className={`rounded-2xl border-2 ${colors.ring} ${colors.bg} p-8 sm:p-10 animate-fade-in-up shadow-2xl`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${colors.badge}`}>
              <active.icon className="w-3.5 h-3.5" />
              {active.service}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
              {active.challenge}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {active.body}
            </p>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-foreground/90 text-sm font-medium">{active.solution}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={active.href}>
                <Button variant="glow" size="sm" className="gap-2 group">
                  Explore {active.service}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/book-a-call">
                <Button variant="outline" size="sm" className="gap-2 group">
                  Book a Consultation
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual stats side */}
          <div className="space-y-4">
            {active.id === "data" && (
              <>
                <div className="p-4 rounded-xl bg-card/80 border border-border space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Data Coverage</p>
                  {[["Company Intelligence", 97], ["Contact Verification", 96], ["Intent Signals", 84], ["Technographic Data", 91]].map(([label, pct]) => (
                    <div key={label as string}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-amber-400 font-bold">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-card/80 border border-border text-center">
                    <p className="text-2xl font-extrabold text-amber-400">96%+</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-0.5">Email deliverability</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card/80 border border-border text-center">
                    <p className="text-2xl font-extrabold text-amber-400">4.2M+</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-0.5">Contacts enriched</p>
                  </div>
                </div>
              </>
            )}

            {active.id === "meetings" && (
              <>
                <div className="p-4 rounded-xl bg-card/80 border border-border space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Meeting Qualification Rate</p>
                  {[["ICP Match", 94], ["Budget Confirmed", 88], ["Decision-Maker Present", 91], ["Show-Up Rate", 87]].map(([label, pct]) => (
                    <div key={label as string}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-blue-400 font-bold">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-card/80 border border-border text-center">
                    <p className="text-2xl font-extrabold text-blue-400">87%</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-0.5">Meeting show-up</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card/80 border border-border text-center">
                    <p className="text-2xl font-extrabold text-blue-400">142</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-0.5">Avg meetings / 6 mo</p>
                  </div>
                </div>
              </>
            )}

            {active.id === "sales" && (
              <>
                <div className="p-4 rounded-xl bg-card/80 border border-border space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Consulting Deliverables</p>
                  {["Go-to-market strategy", "Ideal Customer Profile definition", "Sales process design & documentation", "Outbound cadence & playbook", "CRM & pipeline architecture"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="text-muted-foreground text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-card/80 border border-border flex items-center gap-3">
                  <BrainCircuit className="w-8 h-8 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-foreground font-bold text-sm">Strategic Advisory</p>
                    <p className="text-muted-foreground/80 text-xs">From "we need more leads" to a structured revenue engine</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
