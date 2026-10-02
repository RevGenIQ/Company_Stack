"use client";

import Link from "next/link";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ArrowRight, FileText, Briefcase, MessageSquare, Users, UserPlus, CheckCircle2, CalendarCheck2, Trophy, TrendingUp } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Users, UserPlus, CheckCircle2, CalendarCheck2, Trophy, TrendingUp
};
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  metrics: { title: string; value: number | string; change: string; icon: any; subtext: string }[];
  pipelineData: { status: string; count: number }[];
  recentLeads: any[];
  blogPosts: any[];
  caseStudies: any[];
  testimonials: any[];
}

export function AdminDashboardClient({ metrics, pipelineData, recentLeads, blogPosts, caseStudies, testimonials }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Revenue Dashboard</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">Real-time pipeline analytics, lead activity &amp; CMS status — connected to Supabase.</p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg"
          style={{ background: "oklch(0.75 0.15 75)", color: "oklch(0.11 0.028 252)" }}
        >
          View Lead Pipeline <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.title} title={m.title} value={m.value} change={m.change} icon={ICON_MAP[m.icon as string] || Users} subtext={m.subtext} />
        ))}
      </div>

      {/* Chart + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pipeline Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold" style={{ color: "oklch(0.96 0.008 90)" }}>Pipeline Distribution</h3>
            <span className="text-xs" style={{ color: "oklch(0.60 0.018 252)" }}>Leads per Stage</span>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.025 252)" />
                <XAxis dataKey="status" stroke="oklch(0.55 0.015 252)" fontSize={11} />
                <YAxis stroke="oklch(0.55 0.015 252)" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "oklch(0.13 0.028 252)", borderColor: "oklch(0.22 0.025 252)", borderRadius: "8px", color: "oklch(0.96 0.008 90)" }}
                />
                <Bar dataKey="count" fill="oklch(0.75 0.15 75)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="lg:col-span-5 p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold" style={{ color: "oklch(0.96 0.008 90)" }}>Recent Leads</h3>
            <Link href="/admin/leads" className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>View All</Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-muted-foreground/60 text-xs py-4 text-center">No leads yet. Form submissions will appear here.</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="p-3.5 rounded-xl flex items-center justify-between text-xs border" style={{ background: "oklch(0.13 0.028 252 / 0.7)", borderColor: "oklch(0.20 0.025 252)" }}>
                  <div>
                    <Link href={`/admin/leads/${lead.id}`} className="font-bold transition-colors hover:text-[oklch(0.75_0.15_75)]" style={{ color: "oklch(0.96 0.008 90)" }}>
                      {lead.full_name}
                    </Link>
                    <p className="text-muted-foreground/80 text-[11px]">{lead.company} • {lead.business_email}</p>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CMS Quick Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blog Posts */}
        <div className="p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: "oklch(0.75 0.15 75)" }} />
              <h3 className="text-sm font-bold text-foreground">Blog Posts</h3>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/blog/new" className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>+ New</Link>
              <Link href="/admin/blog" className="text-xs font-semibold hover:underline text-muted-foreground/80">View all</Link>
            </div>
          </div>
          {blogPosts.length === 0 ? (
            <p className="text-muted-foreground/60 text-xs">No posts yet. <Link href="/admin/blog/new" className="underline text-amber-400">Create your first article.</Link></p>
          ) : (
            <div className="space-y-2">
              {blogPosts.slice(0, 4).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/60 text-xs">
                  <span className="text-foreground/90 line-clamp-1 flex-1 pr-2">{p.title}</span>
                  <span className={`shrink-0 font-semibold ${p.is_published ? "text-emerald-400" : "text-muted-foreground/60"}`}>
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Case Studies */}
        <div className="p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" style={{ color: "oklch(0.75 0.15 75)" }} />
              <h3 className="text-sm font-bold text-foreground">Case Studies</h3>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/case-studies/new" className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>+ New</Link>
              <Link href="/admin/case-studies" className="text-xs font-semibold hover:underline text-muted-foreground/80">View all</Link>
            </div>
          </div>
          {caseStudies.length === 0 ? (
            <p className="text-muted-foreground/60 text-xs">No case studies yet. <Link href="/admin/case-studies/new" className="underline text-amber-400">Add your first.</Link></p>
          ) : (
            <div className="space-y-2">
              {caseStudies.slice(0, 4).map((cs: any) => (
                <div key={cs.id} className="flex items-center justify-between py-2 border-b border-border/60 text-xs">
                  <div className="flex-1 pr-2">
                    <span className="text-foreground/90 line-clamp-1">{cs.client}</span>
                    <span className="text-muted-foreground/60 text-[11px]">{cs.industry}</span>
                  </div>
                  <span className={`shrink-0 font-semibold ${cs.status === "published" ? "text-emerald-400" : "text-muted-foreground/60"}`}>
                    {cs.status === "published" ? "Live" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" style={{ color: "oklch(0.75 0.15 75)" }} />
              <h3 className="text-sm font-bold text-foreground">Testimonials</h3>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/testimonials" className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>Manage</Link>
            </div>
          </div>
          {testimonials.length === 0 ? (
            <p className="text-muted-foreground/60 text-xs">No testimonials yet. <Link href="/admin/testimonials" className="underline text-amber-400">Add client quotes.</Link></p>
          ) : (
            <div className="space-y-2">
              {testimonials.slice(0, 4).map((t: any) => (
                <div key={t.id} className="py-2 border-b border-border/60 text-xs">
                  <p className="text-muted-foreground italic line-clamp-2">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-muted-foreground/60 mt-1">{t.author} · {t.company}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
