"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";

const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  company: z.string().min(2, "Company name is required"),
  businessEmail: z.string().email("Valid business email is required"),
  phone: z.string().optional(),
  website: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select a service interest"),
  companySize: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Consent is required"),
  // Honeypot anti-spam
  hpField: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  defaultService?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function LeadForm({
  defaultService = "b2b-lead-generation",
  className = "",
  title = "Accelerate Your Revenue Pipeline",
  subtitle = "Speak with our growth strategists to see how RevGen IQ can deliver verified, sales-ready meetings for your team.",
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [attribution, setAttribution] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landing_page: "",
    referrer: "",
    page_url: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setAttribution({
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        utm_term: urlParams.get("utm_term") || "",
        utm_content: urlParams.get("utm_content") || "",
        landing_page: window.location.pathname,
        referrer: document.referrer || "",
        page_url: window.location.href,
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      serviceInterest: defaultService,
      consent: true,
      hpField: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    // Spam check
    if (data.hpField && data.hpField.length > 0) {
      console.warn("Spam honeypot triggered");
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const payload = {
        ...data,
        ...attribution,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit lead request");
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-8 rounded-2xl border border-cyan-500/30 bg-slate-900/90 text-center space-y-4 backdrop-blur-xl shadow-2xl ${className}`}>
        <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white">Strategy Call Requested!</h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          Thank you. Our B2B pipeline architects are reviewing your details. We will reach out within 4 business hours with an outbound market audit and available times.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-6 ${className}`}>
      <div>

        <h3 className="text-2xl font-extrabold text-white">{title}</h3>
        <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Anti-spam hidden field */}
        <input type="text" {...register("hpField")} className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
            <Input placeholder="Jane Doe" {...register("fullName")} />
            {errors.fullName && <span className="text-xs text-rose-400 mt-1 block">{errors.fullName.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name *</label>
            <Input placeholder="Acme Inc." {...register("company")} />
            {errors.company && <span className="text-xs text-rose-400 mt-1 block">{errors.company.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email *</label>
            <Input type="email" placeholder="jane@acme.com" {...register("businessEmail")} />
            {errors.businessEmail && <span className="text-xs text-rose-400 mt-1 block">{errors.businessEmail.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
            <Input type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Service Interest *</label>
            <select
              {...register("serviceInterest")}
              className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
            >
              <option value="b2b-lead-generation">B2B Lead Generation</option>
              <option value="cold-calling">Cold Calling</option>
              <option value="appointment-setting">Appointment Setting</option>
              <option value="sdr-services">SDR as a Service</option>
              <option value="data-enrichment">Data & List Building</option>
              <option value="email-outreach">Email Outreach</option>
              <option value="sales-outsourcing">Sales Outsourcing</option>
            </select>
            {errors.serviceInterest && <span className="text-xs text-rose-400 mt-1 block">{errors.serviceInterest.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Company Size</label>
            <select
              {...register("companySize")}
              className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
            >
              <option value="1-10">1 - 10 employees</option>
              <option value="11-50">11 - 50 employees</option>
              <option value="51-200">51 - 200 employees</option>
              <option value="201-500">201 - 500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Company Website</label>
          <Input placeholder="https://acme.com" {...register("website")} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Outbound Goals / Message</label>
          <Textarea
            rows={3}
            placeholder="Tell us about your target accounts, ideal client profile, or current pipeline targets..."
            {...register("message")}
          />
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            id="consent"
            {...register("consent")}
            className="mt-1 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500/50"
          />
          <label htmlFor="consent" className="text-xs text-slate-400 leading-tight">
            I agree to allow RevGen IQ to process my information to schedule a consultation and send sales outreach insights.
          </label>
        </div>
        {errors.consent && <span className="text-xs text-rose-400 block">{errors.consent.message}</span>}

        <Button type="submit" disabled={loading} variant="glow" size="lg" className="w-full gap-2 mt-4 text-base">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Request...
            </>
          ) : (
            <>
              Schedule Pipeline Audit
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
