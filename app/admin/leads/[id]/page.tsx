"use client";

import { useState, useEffect, use, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { LeadStatus } from "@/types/database";
import { formatDateTime } from "@/lib/utils";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  BriefcaseBusiness,
  Target,
  Users,
  Wallet,
} from "lucide-react";

type Lead = {
  id: string;
  full_name: string;
  company: string | null;
  business_email: string;
  job_title: string | null;
  phone: string | null;
  website: string | null;
  service_interest: string | null;
  target_market: string | null;
  monthly_outreach: string | null;
  company_size: string | null;
  message: string | null;

  status: LeadStatus;

  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  landing_page: string | null;
  referrer: string | null;
  page_url: string | null;

  owner_id?: string | null;
  created_at: string;
};

type Note = {
  id: string;
  content: string;
  author: string;
  created_at: string;
};

type Activity = {
  id: string;
  title: string;
  type: string;
  created_at: string;
};

export default function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const supabase = useMemo(() => createClient(), []);

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [newNote, setNewNote] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadLead() {
      setLoading(true);

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Error loading lead:", error);
        toast.error("Failed to load lead details.");
        setLead(null);
      } else if (!data) {
        setLead(null);
      } else {
        setLead(data as Lead);

        setActivities([
          {
            id: `capture-${data.id}`,
            title: "Lead Captured from Web Form",
            type: "FORM_SUBMIT",
            created_at: data.created_at,
          },
        ]);
      }

      setLoading(false);
    }

    loadLead();

    return () => {
      cancelled = true;
    };
  }, [id, supabase]);

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead || updatingStatus || newStatus === lead.status) {
      return;
    }

    setUpdatingStatus(true);

    const { data, error } = await supabase
      .from("leads")
      .update({
        status: newStatus,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Status update error:", error);
      toast.error("Could not update lead status.");
      setUpdatingStatus(false);
      return;
    }

    setLead(data as Lead);

    setActivities((prev) => [
      {
        id: `status-${Date.now()}`,
        title: `Status updated to ${newStatus.replace(/_/g, " ")}`,
        type: "STATUS_CHANGE",
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    setUpdatingStatus(false);

    toast.success("Lead status updated successfully.");
  };

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newNote.trim()) {
      return;
    }

    const note: Note = {
      id: `note-${Date.now()}`,
      content: newNote.trim(),
      author: "Admin User",
      created_at: new Date().toISOString(),
    };

    setNotes((prev) => [note, ...prev]);

    setNewNote("");

    toast.success("Note added successfully.");
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

  const websiteUrl =
    lead?.website &&
    (/^https?:\/\//i.test(lead.website)
      ? lead.website
      : `https://${lead.website}`);

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading lead details...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="space-y-4 p-8 text-foreground">
        <p>Lead record not found.</p>

        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lead Pipeline
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/80 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lead Pipeline
      </Link>

      {/* Header */}
      <div className="p-6 rounded-2xl bg-card/80 border border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-foreground">
              {lead.full_name}
            </h1>

            <StatusBadge status={lead.status} />
          </div>

          <p className="text-muted-foreground/80 text-xs flex items-center gap-2 flex-wrap">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />

            <span>
              {lead.company || "No company provided"}
            </span>

            <span>•</span>

            <span>
              Submitted {formatDateTime(lead.created_at)}
            </span>
          </p>
        </div>

        {/* Status Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground/80">
            Change Status:
          </span>

          <select
            value={lead.status}
            disabled={updatingStatus}
            onChange={(e) =>
              handleStatusChange(e.target.value as LeadStatus)
            }
            className="bg-background border border-border text-xs font-bold text-amber-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
          >
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {status.replace(/_/g, " ")}
              </option>
            ))}
          </select>

          {updatingStatus && (
            <span className="text-xs text-muted-foreground">
              Saving...
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6">

          {/* Contact Details */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border space-y-5">
            <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">

              {/* Name */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Full Name
                </span>

                <span className="text-foreground font-medium mt-1 block">
                  {lead.full_name}
                </span>
              </div>

              {/* Company */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Company
                </span>

                <span className="text-foreground font-medium mt-1 block">
                  {lead.company || "Not provided"}
                </span>
              </div>

              {/* Email */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Business Email
                </span>

                <a
                  href={`mailto:${lead.business_email}`}
                  className="text-amber-400 font-medium hover:underline flex items-center gap-1 mt-1 break-all"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {lead.business_email}
                </a>
              </div>

              {/* Phone */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Phone Number
                </span>

                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-amber-400 font-medium hover:underline flex items-center gap-1 mt-1"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    {lead.phone}
                  </a>
                ) : (
                  <span className="text-foreground/80 mt-1 block">
                    Not provided
                  </span>
                )}
              </div>

              {/* Job title */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Job Title / Designation
                </span>

                <span className="text-foreground font-medium mt-1 flex items-center gap-1">
                  <BriefcaseBusiness className="w-3.5 h-3.5 text-muted-foreground/70" />
                  {lead.job_title || "Not provided"}
                </span>
              </div>

              {/* Website */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Company Website
                </span>

                {websiteUrl ? (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 font-medium hover:underline flex items-center gap-1 mt-1 break-all"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    {lead.website}
                  </a>
                ) : (
                  <span className="text-foreground/80 mt-1 block">
                    Not provided
                  </span>
                )}
              </div>

              {/* Service */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Service Interest
                </span>

                <span className="text-amber-300 font-semibold mt-1 block">
                  {lead.service_interest || "Not specified"}
                </span>
              </div>

              {/* Target Market */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Target Market
                </span>

                <span className="text-foreground font-medium mt-1 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-muted-foreground/70" />
                  {lead.target_market || "Not provided"}
                </span>
              </div>

              {/* Company Size */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Company Size
                </span>

                <span className="text-foreground font-medium mt-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-muted-foreground/70" />
                  {lead.company_size || "Not provided"}
                </span>
              </div>

              {/* Monthly Outreach */}
              <div>
                <span className="text-muted-foreground/60 block font-semibold">
                  Monthly Outreach
                </span>

                <span className="text-foreground font-medium mt-1 block">
                  {lead.monthly_outreach || "Not provided"}
                </span>
              </div>
            </div>

            {/* Message */}
            {lead.message && (
              <div className="pt-4 border-t border-border">
                <span className="text-muted-foreground/60 text-xs font-semibold block mb-2">
                  Inquiry Message / Goals
                </span>

                <p className="text-muted-foreground text-xs p-3 rounded-lg bg-background border border-border leading-relaxed whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>
            )}
          </div>

          {/* Attribution */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border space-y-4">
            <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
              UTM & Channel Attribution
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-muted-foreground/60 text-[10px] block">
                  UTM Source
                </span>

                <span className="text-amber-400 font-bold">
                  {lead.utm_source || "direct"}
                </span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-muted-foreground/60 text-[10px] block">
                  UTM Medium
                </span>

                <span className="text-foreground/90">
                  {lead.utm_medium || "none"}
                </span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-muted-foreground/60 text-[10px] block">
                  UTM Campaign
                </span>

                <span className="text-foreground/90">
                  {lead.utm_campaign || "none"}
                </span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-muted-foreground/60 text-[10px] block">
                  UTM Term
                </span>

                <span className="text-foreground/90">
                  {lead.utm_term || "none"}
                </span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-muted-foreground/60 text-[10px] block">
                  UTM Content
                </span>

                <span className="text-foreground/90">
                  {lead.utm_content || "none"}
                </span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border">
                <span className="text-muted-foreground/60 text-[10px] block">
                  Landing Page
                </span>

                <span className="text-muted-foreground truncate block">
                  {lead.landing_page || "/"}
                </span>
              </div>

              <div className="p-2.5 rounded bg-background border border-border sm:col-span-2">
                <span className="text-muted-foreground/60 text-[10px] block">
                  Referrer
                </span>

                <span className="text-muted-foreground truncate block">
                  {lead.referrer || "direct"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 space-y-6">

          {/* Notes */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border space-y-4">
            <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
              Internal Notes
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <Textarea
                placeholder="Add meeting notes, SDR feedback, or follow-up tasks..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="text-xs"
                rows={3}
              />

              <Button
                type="submit"
                variant="glow"
                size="sm"
                className="w-full text-xs"
              >
                Post Internal Note
              </Button>
            </form>

            <div className="space-y-3 pt-2">
              {notes.length === 0 ? (
                <p className="text-xs text-muted-foreground/60">
                  No notes added yet.
                </p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl bg-background border border-border space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground/80 gap-2">
                      <span className="font-bold text-foreground">
                        {note.author}
                      </span>

                      <span>
                        {formatDateTime(note.created_at)}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity */}
          <div className="p-6 rounded-2xl bg-card/80 border border-border space-y-4">
            <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
              Activity Timeline
            </h3>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 text-xs"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />

                  <div>
                    <p className="font-bold text-foreground/90">
                      {activity.title}
                    </p>

                    <p className="text-muted-foreground/60 text-[10px]">
                      {formatDateTime(activity.created_at)}
                    </p>
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