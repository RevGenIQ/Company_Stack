"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { INITIAL_CASE_STUDIES } from "@/lib/mock-store";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

export default function AdminNewCaseStudyPage() {
  const router = useRouter();

  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("SaaS");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [metric1Value, setMetric1Value] = useState("3.1×");
  const [metric1Label, setMetric1Label] = useState("qualified pipeline");
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!client || !title) {
      toast.error("Please provide a client name and title.");
      return;
    }

    const newCs = {
      id: `cs-${Date.now()}`,
      client,
      industry,
      title,
      slug: slug || slugify(title),
      challenge,
      solution,
      services: ["B2B Lead Generation", "Cold Calling"],
      metrics: [{ value: metric1Value, label: metric1Label }],
      quote: { text: quoteText || "RevGen IQ tripled our sales meetings.", author: quoteAuthor || "Head of Sales", role: client },
      featured_image: featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      status: "published",
    };

    INITIAL_CASE_STUDIES.unshift(newCs as any);
    toast.success("Case study created successfully!");
    router.push("/admin/case-studies");
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <Link href="/admin/case-studies" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies List
        </Link>

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/case-studies")}>
            Cancel
          </Button>
          <Button type="submit" variant="glow" className="gap-2">
            <Save className="w-4 h-4" /> Publish Case Study
          </Button>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h1 className="text-2xl font-extrabold text-white">New Case Study</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
            <Input placeholder="e.g. Northwind Analytics" value={client} onChange={(e) => setClient(e.target.value)} required />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
            >
              <option value="SaaS">SaaS</option>
              <option value="IT & Technology">IT & Technology</option>
              <option value="FinTech">FinTech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Professional Services">Professional Services</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Case Study Headline *</label>
          <Input placeholder="e.g. Tripling qualified pipeline for a mid-market analytics platform" value={title} onChange={handleTitleChange} required />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Business Challenge</label>
          <Textarea rows={3} placeholder="Describe the initial bottleneck or problem..." value={challenge} onChange={(e) => setChallenge(e.target.value)} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">RevGen IQ Solution</label>
          <Textarea rows={3} placeholder="Describe the outbound strategy deployed..." value={solution} onChange={(e) => setSolution(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Metric Value (e.g. 3.4×)</label>
            <Input value={metric1Value} onChange={(e) => setMetric1Value(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Metric Label (e.g. pipeline lift)</label>
            <Input value={metric1Label} onChange={(e) => setMetric1Label(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Quote Text</label>
            <Textarea rows={2} placeholder="Quote from client leadership..." value={quoteText} onChange={(e) => setQuoteText(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Quote Author Role</label>
            <Input placeholder="e.g. Chief Revenue Officer" value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} />
          </div>
        </div>
      </div>
    </form>
  );
}
