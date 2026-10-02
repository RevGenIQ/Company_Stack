"use client";

import { useState, use } from "react";
import Link from "next/link";
import { INITIAL_LEADS } from "@/lib/mock-store";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LeadStatus } from "@/types/database";
import { formatDate, formatDateTime } from "@/lib/utils";
import { toast } from "sonner";
import { ArrowLeft, Building2, Calendar, Mail, MessageSquare, Phone, UserCheck, Utensils, Globe, Tag, CheckCircle2 } from "lucide-react";

export default function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const initialLead = INITIAL_LEADS.find((l) => l.id === id) || INITIAL_LEADS[0];

  const [lead, setLead] = useState(initialLead);
  const [status, setStatus] = useState<LeadStatus>(lead ? lead.status : "NEW");
  const [owner, setOwner] = useState(lead?.owner_id || "unassigned");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([
    { id: "1", content: "Initial discovery email sent to prospect.", author: "Alex Vance", created_at: "2026-09-29T11:00:00Z" },
  ]);
  const [activities, setActivities] = useState([
    { id: "a1", title: "Lead Captured from Web Form", type: "FORM_SUBMIT", created_at: lead?.created_at || new Date().toISOString() },
  ]);

  if (!lead) {
    return <div className="p-8 text-white">Lead record not found.</div>;
  }

  const handleStatusChange = (newStatus: LeadStatus) => {
    setStatus(newStatus);
    setLead((prev) => prev ? { ...prev, status: newStatus } : prev);
    setActivities((prev) => [
      { id: `a-${Date.now()}`, title: `Status updated to ${newStatus}`, type: "STATUS_CHANGE", created_at: new Date().toISOString() },
      ...prev,
    ]);
    toast.success(`Lead status updated to ${newStatus}`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteObj = {
      id: `note-${Date.now()}`,
      content: newNote,
      author: "Admin User",
      created_at: new Date().toISOString(),
    };

    setNotes((prev) => [noteObj, ...prev]);
    setNewNote("");
    toast.success("Note added successfully");
  };

  const availableStatuses: LeadStatus[] = [
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "MEETING_BOOKED",
    "PROPOSAL",
    "WON",
    "LOST",
    "NURTURE",
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Lead Pipeline
      </Link>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white">{lead.full_name}</h1>
            <StatusBadge status={status} />
          </div>
          <p className="text-slate-400 text-xs flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lead.company}</span> • <span>Submitted {formatDateTime(lead.created_at)}</span>
          </p>
        </div>

        {/* Quick Status Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Change Status:</span>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            className="bg-slate-950 border border-slate-800 text-xs font-bold text-cyan-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
          >
            {availableStatuses.map((st) => (
              <option key={st} value={st}>
                {st.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact & Attribution Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Contact Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block font-semibold">Business Email</span>
                <a href={`mailto:${lead.business_email}`} className="text-cyan-400 font-medium hover:underline flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5" /> {lead.business_email}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block font-semibold">Phone Number</span>
                <span className="text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {lead.phone || "Not provided"}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block font-semibold">Company Website</span>
                <span className="text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> {lead.website || "Not provided"}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block font-semibold">Service Interest</span>
                <span className="text-cyan-300 font-semibold mt-0.5 block">{lead.service_interest}</span>
              </div>
            </div>

            {lead.message && (
              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-500 text-xs font-semibold block mb-1">Inquiry Message / Goals:</span>
                <p className="text-slate-300 text-xs p-3 rounded-lg bg-slate-950 border border-slate-800 leading-relaxed">
                  {lead.message}
                </p>
              </div>
            )}
          </div>

          {/* Attribution Metadata */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">UTM & Channel Attribution</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">UTM Source</span>
                <span className="text-cyan-400 font-bold">{lead.utm_source || "direct"}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">UTM Medium</span>
                <span className="text-slate-200">{lead.utm_medium || "none"}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">UTM Campaign</span>
                <span className="text-slate-200">{lead.utm_campaign || "none"}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Landing Page</span>
                <span className="text-slate-300 truncate block">{lead.landing_page || "/"}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Referrer</span>
                <span className="text-slate-300 truncate block">{lead.referrer || "direct"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notes & Activity Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Notes Section */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Internal Notes</h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <Textarea
                placeholder="Add meeting notes, SDR feedback, or follow-up tasks..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="text-xs"
                rows={3}
              />
              <Button type="submit" variant="glow" size="sm" className="w-full text-xs">
                Post Internal Note
              </Button>
            </form>

            <div className="space-y-3 pt-2">
              {notes.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-white">{n.author}</span>
                    <span>{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Activity Timeline</h3>

            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-200">{act.title}</p>
                    <p className="text-slate-500 text-[10px]">{formatDateTime(act.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
