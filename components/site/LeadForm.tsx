"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const leadSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  company: z.string().min(2, "Please enter your company name"),
  businessEmail: z.string().email("Please enter a valid business email address"),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select the service most relevant to your needs"),
  targetMarket: z.string().optional(),
  monthlyOutreach: z.string().optional(),
  companySize: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "Your consent is required to proceed"),
  // Anti-spam honeypot
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
  title = "Build Your Revenue Pipeline",
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
      consent: false,
      hpField: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    // Honeypot spam check
    if (data.hpField && data.hpField.length > 0) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const payload = { ...data, ...attribution };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit your request. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-8 rounded-2xl border border-emerald-500/30 bg-card/90 text-center space-y-4 backdrop-blur-xl shadow-2xl ${className}`}>
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Thank you — we&apos;ll be in touch.</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          Our team reviews every submission within one business day. We&apos;ll reach out to discuss your pipeline goals and outline a tailored approach.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  /* Label helper */
  const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
      {children} {required && <span className="text-rose-400">*</span>}
    </label>
  );

  const inputClass = "flex h-10 w-full rounded-md border border-border bg-background/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/60 focus-visible:border-amber-500/40 transition-colors";
  const errClass = "text-xs text-rose-400 mt-1 block";

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl space-y-6 ${className}`}>
      <div>
        <h3 className="text-2xl font-extrabold text-foreground">{title}</h3>
        <p className="text-muted-foreground/80 text-sm mt-1 leading-relaxed">{subtitle}</p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Anti-spam hidden field */}
        <input type="text" {...register("hpField")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        {/* Row 1: Name + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required>Full Name</Label>
            <Input
              className={inputClass}
              placeholder="Enter Full Name"
              {...register("fullName")}
            />
            {errors.fullName && <span className={errClass}>{errors.fullName.message}</span>}
          </div>
          <div>
            <Label required>Company Name</Label>
            <Input
              className={inputClass}
              placeholder="Enter Company Name"
              {...register("company")}
            />
            {errors.company && <span className={errClass}>{errors.company.message}</span>}
          </div>
        </div>

        {/* Row 2: Email + Job Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required>Business Email</Label>
            <Input
              type="email"
              className={inputClass}
              placeholder="Enter Business Email"
              {...register("businessEmail")}
            />
            {errors.businessEmail && <span className={errClass}>{errors.businessEmail.message}</span>}
          </div>
          <div>
            <Label>Job Title <span className="text-muted-foreground/60 font-normal">(optional)</span></Label>
            <Input
              className={inputClass}
              placeholder="Enter Your Designation"
              {...register("jobTitle")}
            />
          </div>
        </div>
        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required>
              Phone Number
            </Label>

            <Input
              type="tel"
              className={inputClass}
              placeholder="Enter Phone Number"
              {...register("phone")}
            />
          </div>

          <div>
            <Label>
              Company Website{" "}
              <span className="text-muted-foreground/60 font-normal">
                (optional)
              </span>
            </Label>

            <Input
              type="text"
              className={inputClass}
              placeholder="https://company.com"
              {...register("website")}
            />
          </div>
        </div>
        {/* Row 3: Service + Target Market */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required>Service Required</Label>
            <select
              {...register("serviceInterest")}
              className={inputClass}
            >
              <option value="">Select a service…</option>
              <option value="data-enrichment">B2B Data Extraction &amp; Intelligence</option>
              <option value="appointment-setting">Appointment Setting</option>
              <option value="sales-consulting">Sales Consulting</option>
              <option value="cold-calling">Cold Calling</option>
              <option value="sdr-services">SDR as a Service</option>
              <option value="email-outreach">Email Outreach</option>
              <option value="b2b-lead-generation">B2B Lead Generation</option>
              <option value="sales-outsourcing">Sales Outsourcing</option>
              <option value="not-sure">Not sure — help me choose</option>
            </select>
            {errors.serviceInterest && <span className={errClass}>{errors.serviceInterest.message}</span>}
          </div>
          <div>
            <Label>Target Market <span className="text-muted-foreground/60 font-normal">(optional)</span></Label>
            <Input
              className={inputClass}
              placeholder="Enter Target Market"
              {...register("targetMarket")}
            />
          </div>
        </div>

        {/* Row 4: Monthly outreach + Company size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Estimated Monthly Outreach Needs <span className="text-muted-foreground/60 font-normal">(optional)</span></Label>
            <select {...register("monthlyOutreach")} className={inputClass}>
              <option value="">Select range…</option>
              <option value="under-500">Under 500 contacts / month</option>
              <option value="500-2000">500 – 2,000 contacts / month</option>
              <option value="2000-5000">2,000 – 5,000 contacts / month</option>
              <option value="5000-plus">5,000+ contacts / month</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
          <div>
            <Label>Company Size <span className="text-muted-foreground/60 font-normal">(optional)</span></Label>
            <select {...register("companySize")} className={inputClass}>
              <option value="">Select…</option>
              <option value="1-10">1 – 10 employees</option>
              <option value="11-50">11 – 50 employees</option>
              <option value="51-200">51 – 200 employees</option>
              <option value="201-500">201 – 500 employees</option>
              <option value="500-plus">500+ employees</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <Label>Business Challenge or Message <span className="text-muted-foreground/60 font-normal">(optional)</span></Label>
          <Textarea
            rows={4}
            className={inputClass + " h-auto resize-none py-2"}
            placeholder="Tell us about your ideal customer profile, current pipeline situation or what you're trying to achieve in the next 90 days…"
            {...register("message")}
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="lead-consent"
            {...register("consent")}
            className="mt-0.5 w-4 h-4 rounded bg-background border-border/80 text-amber-500 focus:ring-amber-500/50 cursor-pointer"
          />
          <label htmlFor="lead-consent" className="text-xs text-muted-foreground/80 leading-snug cursor-pointer">
            I agree to allow RevGen IQ to process my information to arrange a consultation and send relevant sales intelligence content. You can unsubscribe at any time.
          </label>
        </div>
        {errors.consent && <span className={errClass}>{errors.consent.message}</span>}

        <Button
          type="submit"
          disabled={loading}
          variant="glow"
          size="lg"
          className="w-full gap-2 mt-2 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Request a Consultation
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-slate-600 pt-1">
          No commitment required. We respond within one business day.
        </p>
      </form>
    </div>
  );
}
