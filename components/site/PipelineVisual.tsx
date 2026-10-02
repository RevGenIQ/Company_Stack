"use client";

import { useState } from "react";
import { CheckCircle2, PhoneCall, Mail, UserCheck, CalendarCheck2, Trophy } from "lucide-react";

export function PipelineVisual() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      step: 1,
      title: "ICP & List Building",
      icon: UserCheck,
      metric: "98.4% Accuracy",
      desc: "Custom account mapping, firmographic filtering & email + mobile phone verification.",
    },
    {
      step: 2,
      title: "Multi-Channel Outreach",
      icon: Mail,
      metric: "12.4% Reply Rate",
      desc: "Deliverability-first email sequences paired with LinkedIn touchpoints.",
    },
    {
      step: 3,
      title: "Cold Calling Pods",
      icon: PhoneCall,
      metric: "18% Connects",
      desc: "Senior callers handle objection handling live and qualify prospects.",
    },
    {
      step: 4,
      title: "Qualified Booking",
      icon: CalendarCheck2,
      metric: "87% Show-up Rate",
      desc: "Confirmed meetings land directly on your AE calendar with detailed briefs.",
    },
    {
      step: 5,
      title: "Closed Revenue",
      icon: Trophy,
      metric: "$42M+ Pipeline",
      desc: "High-value deals closed from sales-ready outbound opportunities.",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/80">
        <div>
          <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">Architecture Overview</span>
          <h3 className="text-2xl font-bold text-foreground mt-1">The RevGen Outbound Pipeline Architecture</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-time Outbound Execution</span>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.step;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${isActive
                ? "border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-foreground"
                : "border-border bg-background/40 text-muted-foreground/80 hover:border-border/80 hover:text-foreground/90"
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${isActive ? "text-amber-400" : "text-muted-foreground/60"}`}>
                  0{s.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-muted-foreground/60"}`} />
              </div>
              <p className="text-xs font-semibold leading-snug">{s.title}</p>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card */}
      {steps.find((s) => s.step === activeStep) && (
        <div className="p-6 rounded-xl bg-background/80 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Phase 0{activeStep} Strategy</span>
            </div>
            <h4 className="text-xl font-bold text-foreground">
              {steps[activeStep - 1]?.title}
            </h4>
            <p className="text-muted-foreground/80 text-sm leading-relaxed">
              {steps[activeStep - 1]?.desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border shrink-0 text-center sm:text-right w-full sm:w-auto">
            <span className="text-xs text-muted-foreground/80 block font-medium">Key Performance Indicator</span>
            <span className="text-2xl font-extrabold text-amber-400 block mt-1">
              {steps[activeStep - 1]?.metric}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
