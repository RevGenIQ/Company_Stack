"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();

    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
    }

    // Direct redirect or demo bypass
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-grid-pattern bg-glow-gradient" style={{ backgroundColor: "oklch(0.12 0.028 252)" }}>
      <div className="w-full max-w-md p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6 border" style={{ background: "oklch(0.15 0.028 252 / 0.90)", borderColor: "oklch(0.22 0.025 252)" }}>
        <div className="text-center space-y-2">
          <Logo className="justify-center" />
          <h2 className="text-xl font-bold text-white pt-2">Internal CMS Portal</h2>
          <p className="text-xs text-slate-400">Sign in to manage lead pipelines, articles & case studies</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email</label>
            <Input
              type="email"
              placeholder="admin@revgeniq.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} variant="glow" size="lg" className="w-full gap-2 text-sm">
            {loading ? "Authenticating..." : "Sign In to Admin Dashboard"}
            <ArrowRight className="w-4 h-4" />
          </Button>

          <p className="text-[11px] text-center text-slate-500 pt-2">
            Protected by Supabase Row Level Security & RBAC
          </p>
        </form>
      </div>
    </div>
  );
}
