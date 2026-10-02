import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import {
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  let leads: any[] = [];
  let blogPosts: any[] = [];
  let caseStudies: any[] = [];
  let testimonials: any[] = [];

  if (supabase) {
    const [leadsRes, postsRes, csRes, testimRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_posts").select("id,title,published_at,reading_time_minutes,is_published,category:blog_categories(name)").order("created_at", { ascending: false }).limit(6),
      supabase.from("case_studies").select("id,client,industry,title,metrics,status").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    ]);
    leads = leadsRes.data || [];
    blogPosts = postsRes.data || [];
    caseStudies = csRes.data || [];
    testimonials = testimRes.data || [];
  }

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const qualifiedLeads = leads.filter((l) => l.status === "QUALIFIED").length;
  const meetingsBooked = leads.filter((l) => l.status === "MEETING_BOOKED").length;
  const wonLeads = leads.filter((l) => l.status === "WON").length;
  const conversionRate = totalLeads > 0 ? Math.round(((qualifiedLeads + meetingsBooked + wonLeads) / totalLeads) * 100) : 0;

  const metrics = [
    { title: "Total Leads", value: totalLeads, change: "+12%", icon: "Users", subtext: "All-time captured" },
    { title: "New Leads", value: newLeads, change: "+4 new", icon: "UserPlus", subtext: "Action required" },
    { title: "Qualified", value: qualifiedLeads, change: "+25%", icon: "CheckCircle2", subtext: "ICP validated" },
    { title: "Meetings Booked", value: meetingsBooked, change: "88% show", icon: "CalendarCheck2", subtext: "Scheduled on AEs" },
    { title: "Deals Won", value: wonLeads, change: "$140k ARR", icon: "Trophy", subtext: "Closed opportunity" },
    { title: "Conversion Rate", value: `${conversionRate}%`, change: "+4.2%", icon: "TrendingUp", subtext: "Lead-to-Meeting" },
  ];

  const pipelineData = [
    { status: "NEW", count: newLeads },
    { status: "CONTACTED", count: leads.filter((l) => l.status === "CONTACTED").length },
    { status: "QUALIFIED", count: qualifiedLeads },
    { status: "MEETING", count: meetingsBooked },
    { status: "PROPOSAL", count: leads.filter((l) => l.status === "PROPOSAL").length },
    { status: "WON", count: wonLeads },
  ];

  return (
    <AdminDashboardClient
      metrics={metrics}
      pipelineData={pipelineData}
      recentLeads={leads.slice(0, 5)}
      blogPosts={blogPosts}
      caseStudies={caseStudies}
      testimonials={testimonials}
    />
  );
}
