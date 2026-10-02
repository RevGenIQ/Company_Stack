"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_LEADS } from "@/lib/mock-store";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeadStatus } from "@/types/database";
import { Search, Filter, Eye, Phone, Mail, ExternalLink } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

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
      lead.full_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.business_email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Lead Pipeline Management</h1>
          <p className="text-slate-400 text-xs mt-1">Review, qualify, assign owners, and track lead attribution parameters.</p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {st.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950/80 border-slate-800 text-xs"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
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
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <Link href={`/admin/leads/${lead.id}`} className="font-bold text-white hover:text-cyan-400 transition-colors text-sm block">
                      {lead.full_name}
                    </Link>
                    <span className="text-slate-400 text-xs block">{lead.company} • {lead.business_email}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-semibold border border-slate-800">
                      {lead.service_interest}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="p-4">
                    <span className="text-slate-400 font-mono text-[11px]">
                      {lead.utm_source ? `${lead.utm_source} / ${lead.utm_medium || "direct"}` : "Direct Traffic"}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/leads/${lead.id}`}>
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" /> View Details
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
