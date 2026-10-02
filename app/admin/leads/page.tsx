"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeadStatus } from "@/types/database";
import { Search, Filter, Eye, Phone, Mail, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const supabase = createClient();

  useEffect(() => {
    async function loadLeads() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setLeads(data);
      setLoading(false);
    }
    loadLeads();
  }, [supabase]);

  const statuses: (LeadStatus | "ALL")[] = [
    "ALL",
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "MEETING_BOOKED",
    "PROPOSAL",
    "WON",
    "LOST",
    "NURTURE",
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase()) ||
      lead.business_email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Lead Pipeline Management</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">Review, qualify, assign owners, and track lead attribution parameters.</p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card/80 border border-border">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${statusFilter === st
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-background text-muted-foreground/80 border border-border hover:text-foreground"
                }`}
            >
              {st.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-muted-foreground/80 absolute left-3 top-3" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background/80 border-border text-xs"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-muted-foreground">
            <thead className="bg-background text-muted-foreground/80 font-semibold border-b border-border uppercase tracking-wider">
              <tr>
                <th className="p-4">Contact & Company</th>
                <th className="p-4">Service Interest</th>
                <th className="p-4">Status</th>
                <th className="p-4">Attribution Source</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground/60">Loading leads...</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground/60">No leads found.</td></tr>
              ) : filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4">
                    <Link href={`/admin/leads/${lead.id}`} className="font-bold text-foreground hover:text-amber-400 transition-colors text-sm block">
                      {lead.full_name}
                    </Link>
                    <span className="text-muted-foreground/80 text-xs block">{lead.company} • {lead.business_email}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-background text-amber-400 font-semibold border border-border">
                      {lead.service_interest}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground/80 font-mono text-[11px]">
                      {lead.utm_source ? `${lead.utm_source} / ${lead.utm_medium || "direct"}` : "Direct Traffic"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground/80">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/leads/${lead.id}`}>
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <Eye className="w-3.5 h-3.5 text-amber-400" /> View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
