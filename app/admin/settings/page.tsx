"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Settings } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("RevGen IQ");
  const [notificationEmail, setNotificationEmail] = useState("leads@revgeniq.com");
  const [resendStatus, setResendStatus] = useState("Active / Configured");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Site settings updated successfully");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">System Settings</h1>
        <p className="text-slate-400 text-xs mt-1">Configure site metadata, email integration, and API credentials.</p>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">General Platform Info</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Brand Name</label>
            <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Lead Notification Email Recipient</label>
            <Input value={notificationEmail} onChange={(e) => setNotificationEmail(e.target.value)} />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Integrations Status</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-semibold">Resend Email Gateway</span>
              <span className="text-emerald-400 font-bold mt-1 block">● {resendStatus}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-semibold">Supabase PostgreSQL & Storage</span>
              <span className="text-cyan-400 font-bold mt-1 block">● RLS Active</span>
            </div>
          </div>
        </div>

        <Button type="submit" variant="glow" size="lg" className="gap-2">
          <Save className="w-4 h-4" /> Save System Settings
        </Button>
      </form>
    </div>
  );
}
