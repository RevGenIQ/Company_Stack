"use client";

import Link from "next/link";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { INITIAL_LEADS, INITIAL_BLOG_POSTS } from "@/lib/mock-store";
import { formatDate } from "@/lib/utils";
import {
  Users,
  UserPlus,
  CheckCircle2,
  CalendarCheck2,
  Trophy,
  TrendingUp,
  ArrowRight,
  FileText,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AdminDashboardPage() {
  const totalLeads = INITIAL_LEADS.length;
  const newLeads = INITIAL_LEADS.filter((l) => l.status === "NEW").length;
  const qualifiedLeads = INITIAL_LEADS.filter((l) => l.status === "QUALIFIED").length;
  const meetingsBooked = INITIAL_LEADS.filter((l) => l.status === "MEETING_BOOKED").length;
  const wonLeads = INITIAL_LEADS.filter((l) => l.status === "WON").length;

  const conversionRate = totalLeads > 0 ? Math.round(((qualifiedLeads + meetingsBooked + wonLeads) / totalLeads) * 100) : 0;

  const pipelineDistributionData = [
    { status: "NEW", count: newLeads },
    { status: "CONTACTED", count: 1 },
    { status: "QUALIFIED", count: qualifiedLeads },
    { status: "MEETING", count: meetingsBooked },
    { status: "PROPOSAL", count: 1 },
    { status: "WON", count: wonLeads },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Revenue Dashboard
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time pipeline analytics, lead activity & CMS status overview.
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg"
          style={{ background: "oklch(0.75 0.15 75)", color: "oklch(0.11 0.028 252)" }}
        >
          View Lead Pipeline
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard title="Total Leads" value={totalLeads} change="+12%" icon={Users} subtext="Captured all-time" />
        <MetricCard title="New Leads" value={newLeads} change="+4 new" icon={UserPlus} subtext="Action required" />
        <MetricCard title="Qualified" value={qualifiedLeads} change="+25%" icon={CheckCircle2} subtext="ICP validated" />
        <MetricCard title="Meetings Booked" value={meetingsBooked} change="88% show" icon={CalendarCheck2} subtext="Scheduled on AEs" />
        <MetricCard title="Deals Won" value={wonLeads} change="$140k ARR" icon={Trophy} subtext="Closed opportunity" />
        <MetricCard title="Conversion Rate" value={`${conversionRate}%`} change="+4.2%" icon={TrendingUp} subtext="Lead-to-Meeting" />
      </div>

      {/* Pipeline Distribution Chart & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recharts Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold" style={{ color: "oklch(0.96 0.008 90)" }}>Pipeline Distribution</h3>
            <span className="text-xs" style={{ color: "oklch(0.60 0.018 252)" }}>Leads per Status</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineDistributionData}>
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

        {/* Recent Leads Table Overview */}
        <div className="lg:col-span-5 p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold" style={{ color: "oklch(0.96 0.008 90)" }}>Recent Leads Captured</h3>
            <Link href="/admin/leads" className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_LEADS.slice(0, 4).map((lead) => (
              <div key={lead.id} className="p-3.5 rounded-xl flex items-center justify-between text-xs border" style={{ background: "oklch(0.13 0.028 252 / 0.7)", borderColor: "oklch(0.20 0.025 252)" }}>
                <div>
                  <Link href={`/admin/leads/${lead.id}`} className="font-bold transition-colors hover:text-[oklch(0.75_0.15_75)]" style={{ color: "oklch(0.96 0.008 90)" }}>
                    {lead.full_name}
                  </Link>
                  <p className="text-slate-400 text-[11px]">{lead.company} • {lead.business_email}</p>
                </div>
                <StatusBadge status={lead.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Blog CMS Activity */}
      <div className="p-6 rounded-2xl space-y-4 border" style={{ background: "oklch(0.16 0.028 252 / 0.85)", borderColor: "oklch(0.22 0.025 252)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" style={{ color: "oklch(0.75 0.15 75)" }} />
            <h3 className="text-base font-bold" style={{ color: "oklch(0.96 0.008 90)" }}>Recent Blog CMS Activity</h3>
          </div>
          <Link href="/admin/blog/new" className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>
            + Write New Article
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INITIAL_BLOG_POSTS.map((post) => (
            <div key={post.id} className="p-4 rounded-xl space-y-2 border" style={{ background: "oklch(0.13 0.028 252 / 0.7)", borderColor: "oklch(0.20 0.025 252)" }}>
              <span className="text-[10px] px-2 py-0.5 rounded font-semibold border" style={{ background: "oklch(0.75 0.15 75 / 0.12)", color: "oklch(0.75 0.15 75)", borderColor: "oklch(0.75 0.15 75 / 0.25)" }}>
                {post.category?.name || "Article"}
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1">{post.title}</h4>
              <p className="text-xs text-slate-400">{formatDate(post.published_at)} • {post.reading_time_minutes} min</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold">● Published</span>
                <Link href={`/admin/blog/${post.id}`} className="text-xs font-semibold hover:underline" style={{ color: "oklch(0.75 0.15 75)" }}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
